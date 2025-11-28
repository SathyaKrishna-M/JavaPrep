/**
 * Test Fixtures for Instrumentation
 * 
 * Contains sample Java programs for testing instrumentation.
 */

export interface TestFixture {
  name: string
  description: string
  input: string
  expectedOutput?: string // Placeholder - will be generated during actual testing
  expectedHooks?: number
  expectedWarnings?: string[]
}

export const testFixtures: TestFixture[] = [
  {
    name: 'Simple Sequential Program',
    description: 'Basic variable declarations and assignments',
    input: `public class Simple {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        int sum = x + y;
        System.out.println(sum);
    }
}`,
    expectedHooks: 5, // 3 variables + 1 output + 1 step
  },
  {
    name: 'Loop',
    description: 'For loop with variable tracking',
    input: `public class Loop {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }
    }
}`,
    expectedHooks: 4,
  },
  {
    name: 'If/Else',
    description: 'Conditional statements',
    input: `public class Conditional {
    public static void main(String[] args) {
        int num = 15;
        if (num > 10) {
            System.out.println("Greater");
        } else {
            System.out.println("Less");
        }
    }
}`,
    expectedHooks: 5,
  },
  {
    name: 'Nested Loops',
    description: 'Multiple nested loops',
    input: `public class Nested {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(i * j + " ");
            }
            System.out.println();
        }
    }
}`,
    expectedHooks: 6,
    expectedWarnings: ['Deeply nested loop'],
  },
  {
    name: 'Recursion',
    description: 'Recursive method call',
    input: `public class Recursion {
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
    expectedHooks: 8,
    expectedWarnings: ['Possible recursion'],
  },
  {
    name: 'Class with Fields & Methods',
    description: 'OOP with class fields and methods',
    input: `public class Calculator {
    private int value;
    
    public Calculator(int initial) {
        this.value = initial;
    }
    
    public void add(int n) {
        this.value += n;
    }
    
    public int getValue() {
        return this.value;
    }
    
    public static void main(String[] args) {
        Calculator calc = new Calculator(10);
        calc.add(5);
        System.out.println(calc.getValue());
    }
}`,
    expectedHooks: 10,
  },
  {
    name: 'Array Manipulation',
    description: 'Array operations',
    input: `public class Arrays {
    public static void main(String[] args) {
        int[] arr = new int[5];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = i * 2;
        }
        System.out.println(arr[2]);
    }
}`,
    expectedHooks: 6,
  },
  {
    name: 'Object Creation',
    description: 'Multiple object instantiations',
    input: `public class Objects {
    public static void main(String[] args) {
        String str = new String("Hello");
        StringBuilder sb = new StringBuilder();
        sb.append("World");
        System.out.println(str + " " + sb.toString());
    }
}`,
    expectedHooks: 6,
  },
  {
    name: 'Multi-Line Statement',
    description: 'Statement spanning multiple lines',
    input: `public class MultiLine {
    public static void main(String[] args) {
        int result = 
            10 + 
            20 + 
            30;
        System.out.println(result);
    }
}`,
    expectedHooks: 3,
  },
  {
    name: 'Method Overloading',
    description: 'Multiple methods with same name',
    input: `public class Overload {
    public static void print(int x) {
        System.out.println("int: " + x);
    }
    
    public static void print(String s) {
        System.out.println("String: " + s);
    }
    
    public static void main(String[] args) {
        print(5);
        print("test");
    }
}`,
    expectedHooks: 6,
  },
]

/**
 * Gets a test fixture by name
 */
export function getFixture(name: string): TestFixture | undefined {
  return testFixtures.find(f => f.name === name)
}

/**
 * Gets all fixtures
 */
export function getAllFixtures(): TestFixture[] {
  return testFixtures
}

