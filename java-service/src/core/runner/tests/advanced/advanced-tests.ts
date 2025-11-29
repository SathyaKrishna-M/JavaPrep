/**
 * Advanced Execution Test Scenarios
 * 
 * Test cases for Milestone D advanced features:
 * - Exceptions
 * - Object graphs
 * - Collections
 * - OOP
 * - Recursion
 * - Static initializers
 */

import { JavaInstrumenter } from '../../../instrumenter/JavaInstrumenter'
import { JavaRunner } from '../../JavaRunner'
import { ExecutionSnapshot } from '../../../tracking/Snapshot'

export interface AdvancedTestScenario {
  name: string
  description: string
  code: string
  validate: (snapshots: ExecutionSnapshot[]) => {
    success: boolean
    message: string
    details?: any
  }
}

export const advancedTestScenarios: AdvancedTestScenario[] = [
  {
    name: 'Exception Propagation & Caught Exception',
    description: 'Try/catch with finally block',
    code: `public class ExceptionTest {
    public static void main(String[] args) {
        try {
            int x = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("Finally executed");
        }
    }
}`,
    validate: (snapshots) => {
      const exceptionSnapshots = snapshots.filter(s => s.exception !== null && s.exception !== undefined)
      const hasException = exceptionSnapshots.length > 0
      const hasTryCatch = snapshots.some(s => s.activeTryId !== null)
      const hasFinally = snapshots.some(s => s.activeFinallyId !== null)

      return {
        success: hasException && hasTryCatch && hasFinally,
        message: hasException && hasTryCatch && hasFinally
          ? 'Exception test passed'
          : `Missing: exception=${hasException}, try=${hasTryCatch}, finally=${hasFinally}`,
        details: {
          exceptionCount: exceptionSnapshots.length,
          hasTryCatch,
          hasFinally,
        },
      }
    },
  },
  {
    name: 'Object Graph with Circular References',
    description: 'Objects referencing each other',
    code: `public class ObjectGraph {
    static class Node {
        Node next;
        int value;
        
        Node(int v) {
            this.value = v;
        }
    }
    
    public static void main(String[] args) {
        Node n1 = new Node(1);
        Node n2 = new Node(2);
        n1.next = n2;
        n2.next = n1; // Circular
    }
}`,
    validate: (snapshots) => {
      const lastSnapshot = snapshots[snapshots.length - 1]
      const heapObjects = lastSnapshot?.heap || []
      const hasObjects = heapObjects.length >= 2
      const hasReferences = heapObjects.some(obj => obj.references && obj.references.length > 0)

      return {
        success: hasObjects && hasReferences,
        message: hasObjects && hasReferences
          ? 'Object graph test passed'
          : `Missing: objects=${hasObjects}, references=${hasReferences}`,
        details: {
          objectCount: heapObjects.length,
          hasReferences,
        },
      }
    },
  },
  {
    name: 'Nested Collections',
    description: 'Map with List values',
    code: `import java.util.*;
public class Collections {
    public static void main(String[] args) {
        Map<String, List<Integer>> map = new HashMap<>();
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        map.put("key", list);
    }
}`,
    validate: (snapshots) => {
      const lastSnapshot = snapshots[snapshots.length - 1]
      const collections = lastSnapshot?.collectionsPreview
      const hasCollections = !!(collections && collections.size > 0)
      const hasMap = Array.from(collections?.values() || []).some(c => c.type.includes('Map'))
      const hasList = Array.from(collections?.values() || []).some(c => c.type.includes('List'))
      const success = hasCollections && hasMap && hasList

      return {
        success,
        message: success
          ? 'Collections test passed'
          : `Missing: collections=${hasCollections}, map=${hasMap}, list=${hasList}`,
        details: {
          collectionCount: collections?.size || 0,
          hasMap,
          hasList,
        },
      }
    },
  },
  {
    name: 'OOP Dynamic Dispatch',
    description: 'Base class with override method',
    code: `public class OOP {
    static class Base {
        void method() {
            System.out.println("Base");
        }
    }
    
    static class Derived extends Base {
        void method() {
            System.out.println("Derived");
        }
    }
    
    public static void main(String[] args) {
        Base obj = new Derived();
        obj.method();
    }
}`,
    validate: (snapshots) => {
      const hasObjects = snapshots.some(s => s.heap.length > 0)
      const hasThisRef = snapshots.some(s => s.thisReference !== null && s.thisReference !== undefined)
      const hasMethodCalls = snapshots.some(s => s.callStack.length > 1)

      return {
        success: hasObjects && hasMethodCalls,
        message: hasObjects && hasMethodCalls
          ? 'OOP test passed'
          : `Missing: objects=${hasObjects}, methodCalls=${hasMethodCalls}`,
        details: {
          hasObjects,
          hasThisRef,
          hasMethodCalls,
        },
      }
    },
  },
  {
    name: 'Recursion (Factorial)',
    description: 'Recursive method with stack expansion',
    code: `public class Recursion {
    public static int factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        int result = factorial(5);
        System.out.println(result);
    }
}`,
    validate: (snapshots) => {
      const recursiveSnapshots = snapshots.filter(s => s.recursionInfo?.isRecursive === true)
      const hasRecursion = recursiveSnapshots.length > 0
      const maxStackDepth = Math.max(...snapshots.map(s => s.callStack.length), 0)
      const hasReturnValues = snapshots.some(s => s.lastReturn !== null)

      return {
        success: hasRecursion && maxStackDepth >= 5 && hasReturnValues,
        message: hasRecursion && maxStackDepth >= 5 && hasReturnValues
          ? 'Recursion test passed'
          : `Missing: recursion=${hasRecursion}, depth=${maxStackDepth}, returns=${hasReturnValues}`,
        details: {
          recursiveSnapshotCount: recursiveSnapshots.length,
          maxStackDepth,
          hasReturnValues,
        },
      }
    },
  },
  {
    name: 'Static Initializer',
    description: 'Static block execution',
    code: `public class StaticInit {
    static {
        System.out.println("Static block");
    }
    
    static int value = 10;
    
    public static void main(String[] args) {
        System.out.println(value);
    }
}`,
    validate: (snapshots) => {
      const hasStaticInits = snapshots.some(s => s.staticInits && s.staticInits.length > 0)
      const staticInitSnapshots = snapshots.filter(s => s.staticInits && s.staticInits.length > 0)
      const hasCompleted = staticInitSnapshots.some(s =>
        s.staticInits?.some(init => init.status === 'completed')
      )

      return {
        success: hasStaticInits && hasCompleted,
        message: hasStaticInits && hasCompleted
          ? 'Static init test passed'
          : `Missing: staticInits=${hasStaticInits}, completed=${hasCompleted}`,
        details: {
          hasStaticInits,
          hasCompleted,
          initCount: staticInitSnapshots.length,
        },
      }
    },
  },
]

/**
 * Runs an advanced test scenario
 */
export async function runAdvancedTest(scenario: AdvancedTestScenario): Promise<{
  success: boolean
  message: string
  snapshots: ExecutionSnapshot[]
  details?: any
}> {
  try {
    const instrumented = JavaInstrumenter.instrument(scenario.code)
    const runner = new JavaRunner()
    await runner.initializeRuntime()

    const executionSnapshots = await runner.run(instrumented, {
      maxSteps: 1000,
      timeout: 10000,
    })

    const validation = scenario.validate(executionSnapshots)

    return {
      success: validation.success,
      message: validation.message,
      snapshots: executionSnapshots,
      details: validation.details,
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Test "${scenario.name}" failed: ${error.message}`,
      snapshots: [],
      details: { error: error.stack },
    }
  }
}

/**
 * Runs all advanced tests
 */
export async function runAllAdvancedTests(): Promise<{
  passed: number
  failed: number
  results: Array<{ name: string; success: boolean; message: string }>
}> {
  const results = []
  let passed = 0
  let failed = 0

  for (const scenario of advancedTestScenarios) {
    const result = await runAdvancedTest(scenario)
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

