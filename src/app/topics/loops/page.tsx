'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiRepeat, FiRotateCw, FiRefreshCw, FiArrowRight } from 'react-icons/fi'

const content = {
  title: 'Loops',
  explanationSections: [
    {
      title: 'For Loop',
      icon: <FiRepeat className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">for</span> loop is used when you know the number of iterations in advance.

Structure:
→ <span class="text-cyan-300">Syntax:</span> <span class="text-blue-400">for</span> (initialization; condition; update) { ... }
→ All three parts are optional but semicolons are required
→ <span class="text-blue-400">Initialization:</span> executed once at the start
→ <span class="text-blue-400">Condition:</span> checked before each iteration
→ <span class="text-blue-400">Update:</span> executed after each iteration

<span class="text-amber-300">Perfect for:</span> Iterating a known number of times, like printing numbers from 1 to 10.`,
      code: `public class ForLoop {
    public static void main(String[] args) {
        // Print numbers from 1 to 5
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        // Output: 1 2 3 4 5
    }
}`,
    },
    {
      title: 'While Loop',
      icon: <FiRotateCw className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">while</span> loop is used when the condition is checked before execution.

Key Points:
→ <span class="text-cyan-300">Syntax:</span> <span class="text-blue-400">while</span> (condition) { ... }
→ May execute zero times if condition is <span class="text-cyan-300">false</span> initially
→ Condition is checked before each iteration
→ <span class="text-amber-300">Important:</span> Must ensure condition becomes <span class="text-cyan-300">false</span> to avoid infinite loops

<span class="text-amber-300">Use when:</span> You don't know the exact number of iterations, like reading input until a sentinel value.`,
      code: `public class WhileLoop {
    public static void main(String[] args) {
        int i = 1;
        while (i <= 5) {
            System.out.print(i + " ");
            i++;
        }
        // Output: 1 2 3 4 5
    }
}`,
    },
    {
      title: 'Do-While Loop',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">do-while</span> loop executes at least once, even if the condition is <span class="text-cyan-300">false</span>.

Structure:
→ <span class="text-cyan-300">Syntax:</span> <span class="text-blue-400">do</span> { ... } <span class="text-blue-400">while</span> (condition);
→ Condition is checked <span class="text-amber-300">after</span> execution
→ <span class="text-amber-300">Guarantees:</span> At least one execution
→ Useful for menu-driven programs

<span class="text-amber-300">Use when:</span> You need to execute the loop body at least once, like displaying a menu.`,
      code: `public class DoWhileLoop {
    public static void main(String[] args) {
        int i = 1;
        do {
            System.out.print(i + " ");
            i++;
        } while (i <= 5);
        // Output: 1 2 3 4 5
    }
}`,
    },
    {
      title: 'Enhanced For Loop (For-Each)',
      icon: <FiArrowRight className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">enhanced for loop</span> (for-each) is used to iterate over arrays and collections.

Benefits:
→ <span class="text-cyan-300">Syntax:</span> <span class="text-blue-400">for</span> (type variable : array) { ... }
→ Simpler syntax than traditional <span class="text-blue-400">for</span> loop
→ Automatically handles iteration
→ <span class="text-amber-300">No index management needed</span>

<span class="text-amber-300">Use when:</span> You need to iterate through all elements of an array or collection.`,
      code: `public class EnhancedForLoop {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        // Output: 10 20 30 40 50
    }
}`,
    },
    {
      title: 'Loop Control Statements',
      content: `Java provides <span class="text-blue-400 font-semibold">control statements</span> to manage loop execution:

→ <span class="text-blue-400">break:</span> Exits the loop immediately
→ <span class="text-blue-400">continue:</span> Skips the current iteration and continues
→ <span class="text-amber-300">Important:</span> Avoid infinite loops by ensuring condition becomes <span class="text-cyan-300">false</span>
→ <span class="text-cyan-300">Loop variables</span> are only accessible within loop scope (<span class="text-blue-400">for</span> loop)

<span class="text-amber-300">Benefit:</span> These control statements give you fine-grained control over loop execution.`,
      code: `public class LoopControl {
    public static void main(String[] args) {
        // Using break
        for (int i = 1; i <= 10; i++) {
            if (i == 5) break; // Exit when i is 5
            System.out.print(i + " ");
        }
        // Output: 1 2 3 4
        
        // Using continue
        for (int i = 1; i <= 5; i++) {
            if (i == 3) continue; // Skip 3
            System.out.print(i + " ");
        }
        // Output: 1 2 4 5
    }
}`,
    },
  ] as ExplanationSection[],
  exampleCode: `public class Loops {
    public static void main(String[] args) {
        // for loop
        System.out.println("For loop:");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        // while loop
        System.out.println("While loop:");
        int j = 1;
        while (j <= 5) {
            System.out.print(j + " ");
            j++;
        }
        System.out.println();
        
        // do-while loop
        System.out.println("Do-while loop:");
        int k = 1;
        do {
            System.out.print(k + " ");
            k++;
        } while (k <= 5);
        System.out.println();
        
        // Enhanced for loop
        System.out.println("Enhanced for loop:");
        int[] numbers = {10, 20, 30, 40, 50};
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Write a program to print the multiplication table of 5 (from 1 to 10).',
      solution: 'Use a for loop to iterate from 1 to 10 and multiply each number by 5.',
      solutionCode: `public class MultiplicationTable {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
    }
}`,
      flowNodes: [
        { id: '1', label: 'Start', type: 'start' },
        { id: '2', label: 'Initialize n = 5', type: 'process' },
        { id: '3', label: 'Initialize i = 1', type: 'process' },
        { id: '4', label: 'i <= 10?', type: 'decision' },
        { id: '5', label: 'Print n x i = result', type: 'io' },
        { id: '6', label: 'Increment i++', type: 'process' },
        { id: '7', label: 'End', type: 'end' },
      ],
      flowEdges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5', label: 'Yes' },
        { id: 'e5-6', source: '5', target: '6' },
        { id: 'e6-4', source: '6', target: '4', label: 'Loop' },
        { id: 'e4-7', source: '4', target: '7', label: 'No' },
      ],
      dryRunCode: `public class MultiplicationTable {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5 }, output: '', description: 'Initializing n = 5' },
        { line: 4, vars: { n: 5, i: 1 }, output: '', description: 'Loop: i = 1, condition (1 <= 10 is true)' },
        { line: 5, vars: { n: 5, i: 1 }, output: '5 x 1 = 5\\n', description: 'Printing: 5 x 1 = 5' },
        { line: 4, vars: { n: 5, i: 2 }, output: '5 x 1 = 5\\n', description: 'Loop: i = 2, condition (2 <= 10 is true)' },
        { line: 5, vars: { n: 5, i: 2 }, output: '5 x 1 = 5\\n5 x 2 = 10\\n', description: 'Printing: 5 x 2 = 10' },
        { line: 4, vars: { n: 5, i: 3 }, output: '5 x 1 = 5\\n5 x 2 = 10\\n', description: 'Loop: i = 3, condition (3 <= 10 is true)' },
        { line: 5, vars: { n: 5, i: 3 }, output: '5 x 1 = 5\\n5 x 2 = 10\\n5 x 3 = 15\\n', description: 'Printing: 5 x 3 = 15' },
        { line: 4, vars: { n: 5, i: 5 }, output: '5 x 1 = 5\\n5 x 2 = 10\\n5 x 3 = 15\\n5 x 4 = 20\\n', description: 'Loop: i = 5, condition (5 <= 10 is true)' },
        { line: 5, vars: { n: 5, i: 5 }, output: '5 x 1 = 5\\n5 x 2 = 10\\n5 x 3 = 15\\n5 x 4 = 20\\n5 x 5 = 25\\n', description: 'Printing: 5 x 5 = 25' },
        { line: 4, vars: { n: 5, i: 10 }, output: '5 x 1 = 5\\n5 x 2 = 10\\n5 x 3 = 15\\n5 x 4 = 20\\n5 x 5 = 25\\n5 x 6 = 30\\n5 x 7 = 35\\n5 x 8 = 40\\n5 x 9 = 45\\n', description: 'Loop: i = 10, condition (10 <= 10 is true)' },
        { line: 5, vars: { n: 5, i: 10 }, output: '5 x 1 = 5\\n5 x 2 = 10\\n5 x 3 = 15\\n5 x 4 = 20\\n5 x 5 = 25\\n5 x 6 = 30\\n5 x 7 = 35\\n5 x 8 = 40\\n5 x 9 = 45\\n5 x 10 = 50\\n', description: 'Printing: 5 x 10 = 50' },
        { line: 4, vars: { n: 5, i: 11 }, output: '5 x 1 = 5\\n5 x 2 = 10\\n5 x 3 = 15\\n5 x 4 = 20\\n5 x 5 = 25\\n5 x 6 = 30\\n5 x 7 = 35\\n5 x 8 = 40\\n5 x 9 = 45\\n5 x 10 = 50\\n', description: 'Loop: i = 11, condition (11 <= 10 is false) - exiting loop' },
      ] as DryRunStep[],
    },
    {
      question: 'Write a program to calculate the sum of numbers from 1 to 100.',
      solution: 'Use a for loop to iterate from 1 to 100 and accumulate the sum.',
      flowSteps: [
        { id: '1', label: 'Start', type: 'start' },
        { id: '2', label: 'Initialize sum = 0', type: 'process' },
        { id: '3', label: 'Initialize i = 1', type: 'process' },
        { id: '4', label: 'i <= 100?', type: 'decision' },
        { id: '5', label: 'sum = sum + i', type: 'process' },
        { id: '6', label: 'Increment i++', type: 'process' },
        { id: '7', label: 'Print sum', type: 'io' },
        { id: '8', label: 'End', type: 'end' },
      ],
      solutionCode: `public class SumNumbers {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        System.out.println("Sum: " + sum);
    }
}`,
      dryRunCode: `public class SumNumbers {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("Sum: " + sum);
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { sum: 0 }, output: '', description: 'Initializing sum = 0' },
        { line: 4, vars: { sum: 0, i: 1 }, output: '', description: 'Loop: i = 1, condition (1 <= 10 is true)' },
        { line: 5, vars: { sum: 1, i: 1 }, output: '', description: 'sum += i: sum = 0 + 1 = 1' },
        { line: 4, vars: { sum: 1, i: 2 }, output: '', description: 'Loop: i = 2, condition (2 <= 10 is true)' },
        { line: 5, vars: { sum: 3, i: 2 }, output: '', description: 'sum += i: sum = 1 + 2 = 3' },
        { line: 4, vars: { sum: 3, i: 3 }, output: '', description: 'Loop: i = 3, condition (3 <= 10 is true)' },
        { line: 5, vars: { sum: 6, i: 3 }, output: '', description: 'sum += i: sum = 3 + 3 = 6' },
        { line: 4, vars: { sum: 6, i: 5 }, output: '', description: 'Loop: i = 5, condition (5 <= 10 is true)' },
        { line: 5, vars: { sum: 15, i: 5 }, output: '', description: 'sum += i: sum = 10 + 5 = 15' },
        { line: 4, vars: { sum: 15, i: 10 }, output: '', description: 'Loop: i = 10, condition (10 <= 10 is true)' },
        { line: 5, vars: { sum: 55, i: 10 }, output: '', description: 'sum += i: sum = 45 + 10 = 55' },
        { line: 4, vars: { sum: 55, i: 11 }, output: '', description: 'Loop: i = 11, condition (11 <= 10 is false) - exiting loop' },
        { line: 7, vars: { sum: 55, i: 11 }, output: 'Sum: 55\\n', description: 'Printing final sum: 55' },
      ] as DryRunStep[],
    },
    {
      question: 'Write a program to print all even numbers from 1 to 50.',
      solution: 'Use a for loop and check if the number is even using the modulus operator.',
      solutionCode: `public class EvenNumbers {
    public static void main(String[] args) {
        for (int i = 1; i <= 50; i++) {
            if (i % 2 == 0) {
                System.out.print(i + " ");
            }
        }
    }
}`,
      dryRunCode: `public class EvenNumbers {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                System.out.print(i + " ");
            }
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { i: 1 }, output: '', description: 'Loop: i = 1, condition (1 <= 10 is true)' },
        { line: 4, vars: { i: 1 }, output: '', conditionResult: false, description: 'Checking if (1 % 2 == 0) is false - skipping print' },
        { line: 3, vars: { i: 2 }, output: '', description: 'Loop: i = 2, condition (2 <= 10 is true)' },
        { line: 4, vars: { i: 2 }, output: '', conditionResult: true, description: 'Checking if (2 % 2 == 0) is true' },
        { line: 5, vars: { i: 2 }, output: '2 ', description: 'Printing: 2' },
        { line: 3, vars: { i: 3 }, output: '2 ', description: 'Loop: i = 3, condition (3 <= 10 is true)' },
        { line: 4, vars: { i: 3 }, output: '2 ', conditionResult: false, description: 'Checking if (3 % 2 == 0) is false - skipping print' },
        { line: 3, vars: { i: 4 }, output: '2 ', description: 'Loop: i = 4, condition (4 <= 10 is true)' },
        { line: 4, vars: { i: 4 }, output: '2 ', conditionResult: true, description: 'Checking if (4 % 2 == 0) is true' },
        { line: 5, vars: { i: 4 }, output: '2 4 ', description: 'Printing: 4' },
        { line: 3, vars: { i: 10 }, output: '2 4 6 8 ', description: 'Loop: i = 10, condition (10 <= 10 is true)' },
        { line: 4, vars: { i: 10 }, output: '2 4 6 8 ', conditionResult: true, description: 'Checking if (10 % 2 == 0) is true' },
        { line: 5, vars: { i: 10 }, output: '2 4 6 8 10 ', description: 'Printing: 10' },
        { line: 3, vars: { i: 11 }, output: '2 4 6 8 10 ', description: 'Loop: i = 11, condition (11 <= 10 is false) - exiting loop' },
      ] as DryRunStep[],
    },
    {
      question: 'Write a program to find the factorial of a number using a while loop.',
      solution: 'Use a while loop to multiply numbers from 1 to n.',
      flowNodes: [
        { id: '1', label: 'Start', type: 'start' },
        { id: '2', label: 'Input n', type: 'io' },
        { id: '3', label: 'Initialize factorial = 1', type: 'process' },
        { id: '4', label: 'Initialize i = 1', type: 'process' },
        { id: '5', label: 'i <= n?', type: 'decision' },
        { id: '6', label: 'factorial = factorial * i', type: 'process' },
        { id: '7', label: 'Increment i++', type: 'process' },
        { id: '8', label: 'Print factorial', type: 'io' },
        { id: '9', label: 'End', type: 'end' },
      ],
      flowEdges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6', label: 'Yes' },
        { id: 'e6-7', source: '6', target: '7' },
        { id: 'e7-5', source: '7', target: '5', label: 'Loop' },
        { id: 'e5-8', source: '5', target: '8', label: 'No' },
        { id: 'e8-9', source: '8', target: '9' },
      ],
      solutionCode: `public class Factorial {
    public static void main(String[] args) {
        int n = 5;
        int factorial = 1;
        int i = 1;
        
        while (i <= n) {
            factorial *= i;
            i++;
        }
        
        System.out.println("Factorial of " + n + " = " + factorial);
    }
}`,
      dryRunCode: `public class Factorial {
    public static void main(String[] args) {
        int n = 5;
        int factorial = 1;
        int i = 1;
        
        while (i <= n) {
            factorial *= i;
            i++;
        }
        
        System.out.println("Factorial of " + n + " = " + factorial);
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5 }, output: '', description: 'Initializing n = 5' },
        { line: 4, vars: { n: 5, factorial: 1 }, output: '', description: 'Initializing factorial = 1' },
        { line: 5, vars: { n: 5, factorial: 1, i: 1 }, output: '', description: 'Initializing i = 1' },
        { line: 7, vars: { n: 5, factorial: 1, i: 1 }, output: '', conditionResult: true, description: 'While: condition (1 <= 5 is true)' },
        { line: 8, vars: { n: 5, factorial: 1, i: 1 }, output: '', description: 'factorial *= i: factorial = 1 * 1 = 1' },
        { line: 9, vars: { n: 5, factorial: 1, i: 2 }, output: '', description: 'i++: i = 2' },
        { line: 7, vars: { n: 5, factorial: 1, i: 2 }, output: '', conditionResult: true, description: 'While: condition (2 <= 5 is true)' },
        { line: 8, vars: { n: 5, factorial: 2, i: 2 }, output: '', description: 'factorial *= i: factorial = 1 * 2 = 2' },
        { line: 9, vars: { n: 5, factorial: 2, i: 3 }, output: '', description: 'i++: i = 3' },
        { line: 7, vars: { n: 5, factorial: 2, i: 3 }, output: '', conditionResult: true, description: 'While: condition (3 <= 5 is true)' },
        { line: 8, vars: { n: 5, factorial: 6, i: 3 }, output: '', description: 'factorial *= i: factorial = 2 * 3 = 6' },
        { line: 9, vars: { n: 5, factorial: 6, i: 4 }, output: '', description: 'i++: i = 4' },
        { line: 7, vars: { n: 5, factorial: 6, i: 4 }, output: '', conditionResult: true, description: 'While: condition (4 <= 5 is true)' },
        { line: 8, vars: { n: 5, factorial: 24, i: 4 }, output: '', description: 'factorial *= i: factorial = 6 * 4 = 24' },
        { line: 9, vars: { n: 5, factorial: 24, i: 5 }, output: '', description: 'i++: i = 5' },
        { line: 7, vars: { n: 5, factorial: 24, i: 5 }, output: '', conditionResult: true, description: 'While: condition (5 <= 5 is true)' },
        { line: 8, vars: { n: 5, factorial: 120, i: 5 }, output: '', description: 'factorial *= i: factorial = 24 * 5 = 120' },
        { line: 9, vars: { n: 5, factorial: 120, i: 6 }, output: '', description: 'i++: i = 6' },
        { line: 7, vars: { n: 5, factorial: 120, i: 6 }, output: '', conditionResult: false, description: 'While: condition (6 <= 5 is false) - exiting loop' },
        { line: 12, vars: { n: 5, factorial: 120, i: 6 }, output: 'Factorial of 5 = 120\\n', description: 'Printing: Factorial of 5 = 120' },
      ] as DryRunStep[],
    },
    {
      question: 'Write a program to print numbers from 10 to 1 in descending order.',
      solution: 'Use a for loop starting from 10 and decrementing to 1.',
      solutionCode: `public class DescendingNumbers {
    public static void main(String[] args) {
        for (int i = 10; i >= 1; i--) {
            System.out.print(i + " ");
        }
    }
}`,
      dryRunCode: `public class DescendingNumbers {
    public static void main(String[] args) {
        for (int i = 10; i >= 1; i--) {
            System.out.print(i + " ");
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { i: 10 }, output: '', description: 'Loop: i = 10, condition (10 >= 1 is true)' },
        { line: 4, vars: { i: 10 }, output: '10 ', description: 'Printing: 10' },
        { line: 3, vars: { i: 9 }, output: '10 ', description: 'Loop: i = 9, condition (9 >= 1 is true)' },
        { line: 4, vars: { i: 9 }, output: '10 9 ', description: 'Printing: 9' },
        { line: 3, vars: { i: 8 }, output: '10 9 ', description: 'Loop: i = 8, condition (8 >= 1 is true)' },
        { line: 4, vars: { i: 8 }, output: '10 9 8 ', description: 'Printing: 8' },
        { line: 3, vars: { i: 5 }, output: '10 9 8 7 6 ', description: 'Loop: i = 5, condition (5 >= 1 is true)' },
        { line: 4, vars: { i: 5 }, output: '10 9 8 7 6 5 ', description: 'Printing: 5' },
        { line: 3, vars: { i: 1 }, output: '10 9 8 7 6 5 4 3 2 ', description: 'Loop: i = 1, condition (1 >= 1 is true)' },
        { line: 4, vars: { i: 1 }, output: '10 9 8 7 6 5 4 3 2 1 ', description: 'Printing: 1' },
        { line: 3, vars: { i: 0 }, output: '10 9 8 7 6 5 4 3 2 1 ', description: 'Loop: i = 0, condition (0 >= 1 is false) - exiting loop' },
      ] as DryRunStep[],
    },
  ] as PracticeQuestion[],
  dryRunCode: `public class Loops {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
  dryRunSteps: [
    {
      line: 3,
      vars: { i: 1 },
      output: '',
      description: 'Initializing loop: i = 1, checking condition (1 <= 5 is true)',
    },
    {
      line: 4,
      vars: { i: 1 },
      output: '1 ',
      description: 'First iteration: printing i = 1',
    },
    {
      line: 3,
      vars: { i: 2 },
      output: '1 ',
      description: 'Updating i to 2, checking condition (2 <= 5 is true)',
    },
    {
      line: 4,
      vars: { i: 2 },
      output: '1 2 ',
      description: 'Second iteration: printing i = 2',
    },
    {
      line: 3,
      vars: { i: 3 },
      output: '1 2 ',
      description: 'Updating i to 3, checking condition (3 <= 5 is true)',
    },
    {
      line: 4,
      vars: { i: 3 },
      output: '1 2 3 ',
      description: 'Third iteration: printing i = 3',
    },
    {
      line: 3,
      vars: { i: 4 },
      output: '1 2 3 ',
      description: 'Updating i to 4, checking condition (4 <= 5 is true)',
    },
    {
      line: 4,
      vars: { i: 4 },
      output: '1 2 3 4 ',
      description: 'Fourth iteration: printing i = 4',
    },
    {
      line: 3,
      vars: { i: 5 },
      output: '1 2 3 4 ',
      description: 'Updating i to 5, checking condition (5 <= 5 is true)',
    },
    {
      line: 4,
      vars: { i: 5 },
      output: '1 2 3 4 5 ',
      description: 'Fifth iteration: printing i = 5',
    },
    {
      line: 3,
      vars: { i: 6 },
      output: '1 2 3 4 5 ',
      description: 'Updating i to 6, checking condition (6 <= 5 is false) - exiting loop',
    },
    {
      line: 5,
      vars: {},
      output: '1 2 3 4 5 \\n',
      description: 'Printing newline after loop completes',
    },
  ] as DryRunStep[],
}

export default function LoopsPage() {
  return <TopicPage content={content} />
}
