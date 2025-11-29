/**
 * Execution Test Scenarios
 * 
 * Test cases for validating execution and snapshot generation.
 * 
 * Each test expects a specific snapshot sequence and line number transitions.
 */

import { JavaInstrumenter } from '../../instrumenter/JavaInstrumenter'
import { JavaRunner } from '../JavaRunner'
import { ExecutionSnapshot } from '../../tracking/Snapshot'

export interface TestScenario {
  name: string
  description: string
  code: string
  expectedSnapshotCount: number
  expectedLineNumbers: number[]
  validate?: (snapshots: ExecutionSnapshot[]) => boolean
}

export const testScenarios: TestScenario[] = [
  {
    name: 'Simple Sequential Program',
    description: 'Basic variable declarations and assignments',
    code: `public class Simple {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        int sum = x + y;
        System.out.println(sum);
    }
}`,
    expectedSnapshotCount: 5, // 3 variables + 1 output + method entry/exit
    expectedLineNumbers: [2, 3, 4, 5, 6],
    validate: (snapshots) => {
      // Check that variables are tracked
      const varSnapshots = snapshots.filter(s => s.variables.length > 0)
      return varSnapshots.length >= 3
    },
  },
  {
    name: 'Loop with Variable Updates',
    description: 'For loop that updates a variable',
    code: `public class Loop {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.println(i);
        }
    }
}`,
    expectedSnapshotCount: 8, // Loop iterations + method boundaries
    expectedLineNumbers: [2, 3, 4, 3, 4, 3, 4, 3], // Loop repeats
    validate: (snapshots) => {
      // Check that i variable is tracked and changes
      const iSnapshots = snapshots.filter(s => 
        s.variables.some(v => v.name === 'i')
      )
      return iSnapshots.length > 0
    },
  },
  {
    name: 'Method Call Chain',
    description: 'Multiple method calls',
    code: `public class Methods {
    public static void method1() {
        System.out.println("Method 1");
    }
    
    public static void method2() {
        method1();
        System.out.println("Method 2");
    }
    
    public static void main(String[] args) {
        method2();
    }
}`,
    expectedSnapshotCount: 8, // Method calls + outputs
    expectedLineNumbers: [9, 6, 3, 4, 7, 8, 6, 9],
    validate: (snapshots) => {
      // Check call stack depth
      const maxStackDepth = Math.max(...snapshots.map(s => s.callStack.length))
      return maxStackDepth >= 2 // main -> method2 -> method1
    },
  },
  {
    name: 'Object Creation',
    description: 'Creating and using objects',
    code: `public class Objects {
    public static void main(String[] args) {
        String str = new String("Hello");
        System.out.println(str);
    }
}`,
    expectedSnapshotCount: 4,
    expectedLineNumbers: [2, 3, 4, 2],
    validate: (snapshots) => {
      // Check that objects are tracked in heap
      const heapSnapshots = snapshots.filter(s => s.heap.length > 0)
      return heapSnapshots.length > 0
    },
  },
  {
    name: 'Recursion (Factorial)',
    description: 'Recursive method call',
    code: `public class Recursion {
    public static int factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        int result = factorial(3);
        System.out.println(result);
    }
}`,
    expectedSnapshotCount: 12, // Recursive calls + returns
    expectedLineNumbers: [9, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4], // Multiple calls
    validate: (snapshots) => {
      // Check that call stack grows and shrinks
      const stackDepths = snapshots.map(s => s.callStack.length)
      const maxDepth = Math.max(...stackDepths)
      return maxDepth >= 3 // Multiple recursive calls
    },
  },
  {
    name: 'Nested Classes',
    description: 'Class with inner class',
    code: `public class Outer {
    static class Inner {
        public void innerMethod() {
            System.out.println("Inner");
        }
    }
    
    public static void main(String[] args) {
        Inner obj = new Inner();
        obj.innerMethod();
    }
}`,
    expectedSnapshotCount: 5,
    expectedLineNumbers: [8, 9, 10, 3, 4],
    validate: (snapshots) => {
      // Check that inner class methods are tracked
      const methodSnapshots = snapshots.filter(s => 
        s.callStack.some(f => f.methodName.includes('innerMethod'))
      )
      return methodSnapshots.length > 0
    },
  },
  {
    name: 'Conditional Statements',
    description: 'If/else with different paths',
    code: `public class Conditional {
    public static void main(String[] args) {
        int num = 10;
        if (num > 5) {
            System.out.println("Greater");
        } else {
            System.out.println("Less");
        }
    }
}`,
    expectedSnapshotCount: 5,
    expectedLineNumbers: [2, 3, 4, 5, 2],
    validate: (snapshots) => {
      // Check that condition result is tracked (if implemented)
      return snapshots.length >= 4
    },
  },
]

/**
 * Runs a test scenario
 */
export async function runTestScenario(scenario: TestScenario): Promise<{
  success: boolean
  message: string
  snapshots: ExecutionSnapshot[]
  details?: any
}> {
  try {
    // Instrument code
    const instrumented = JavaInstrumenter.instrument(scenario.code)

    // Run code
    const runner = new JavaRunner()
    await runner.initializeRuntime()

    const snapshots: ExecutionSnapshot[] = []
    runner.onSnapshot((snapshot) => {
      snapshots.push(snapshot)
    })

    const executionSnapshots = await runner.run(instrumented, {
      maxSteps: 1000,
      timeout: 10000,
    })

    // Validate results
    const snapshotCountMatch = executionSnapshots.length === scenario.expectedSnapshotCount
    const lineNumbersMatch = executionSnapshots.every((s, i) => 
      scenario.expectedLineNumbers[i] === undefined || 
      s.lineNumber === scenario.expectedLineNumbers[i]
    )
    const customValidation = scenario.validate 
      ? scenario.validate(executionSnapshots)
      : true

    const success = snapshotCountMatch && lineNumbersMatch && customValidation

    return {
      success,
      message: success 
        ? `Test "${scenario.name}" passed`
        : `Test "${scenario.name}" failed: snapshot count or line numbers mismatch`,
      snapshots: executionSnapshots,
      details: {
        expectedCount: scenario.expectedSnapshotCount,
        actualCount: executionSnapshots.length,
        expectedLines: scenario.expectedLineNumbers,
        actualLines: executionSnapshots.map(s => s.lineNumber),
      },
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Test "${scenario.name}" failed with error: ${error.message}`,
      snapshots: [],
      details: { error: error.stack },
    }
  }
}

/**
 * Runs all test scenarios
 */
export async function runAllTests(): Promise<{
  passed: number
  failed: number
  results: Array<{ name: string; success: boolean; message: string }>
}> {
  const results = []
  let passed = 0
  let failed = 0

  for (const scenario of testScenarios) {
    const result = await runTestScenario(scenario)
    results.push({
      name: scenario.name,
      success: result.success,
      message: result.message,
    })

    if (result.success) {
      passed++
    } else {
      failed++
    }
  }

  return { passed, failed, results }
}

