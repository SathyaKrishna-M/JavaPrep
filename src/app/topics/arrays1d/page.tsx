'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiList, FiHash, FiSearch, FiMaximize } from 'react-icons/fi'

const content = {
  title: '1D Arrays',
  explanationSections: [
    {
      title: 'Array Declaration and Initialization',
      icon: <FiList className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Arrays</span> store multiple values of the same type in a single variable.

Declaration Methods:
→ <span class="text-cyan-300">int[] arr;</span> or <span class="text-cyan-300">int arr[];</span> (declaration only)
→ <span class="text-cyan-300">int[] arr = new int[5];</span> (size <span class="text-cyan-300">5</span>, default values are <span class="text-cyan-300">0</span>)
→ <span class="text-cyan-300">int[] arr = {1, 2, 3, 4, 5};</span> (initialized with values)

Key Points:
→ Arrays are <span class="text-blue-400">zero-indexed</span> (first element at index <span class="text-cyan-300">0</span>)
→ Last element is at index <span class="text-cyan-300">length-1</span>
→ <span class="text-amber-300">Length is fixed</span> after creation`,
      code: `public class ArrayDeclaration {
    public static void main(String[] args) {
        // Method 1: Declaration and initialization
        int[] numbers = new int[5];
        
        // Method 2: Initialize with values
        int[] arr = {10, 20, 30, 40, 50};
        
        // Assigning values
        numbers[0] = 1;
        numbers[1] = 2;
        numbers[2] = 3;
        numbers[3] = 4;
        numbers[4] = 5;
        
        System.out.println("Array length: " + arr.length);  // 5
    }
}`,
    },
    {
      title: 'Array Indexing and Access',
      icon: <FiHash className="w-6 h-6" />,
      content: `Accessing array elements using <span class="text-blue-400 font-semibold">indices</span>.

Key Concepts:
→ Arrays are <span class="text-blue-400">zero-indexed</span> (start from <span class="text-cyan-300">0</span>)
→ Access elements: <span class="text-cyan-300">arr[index]</span>
→ Valid indices: <span class="text-cyan-300">0</span> to <span class="text-cyan-300">length-1</span>
→ <span class="text-amber-300">ArrayIndexOutOfBoundsException</span> occurs for invalid indices

<span class="text-amber-300">Important:</span> Always check bounds before accessing array elements.`,
      code: `public class ArrayAccess {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        
        // Accessing elements
        System.out.println("First element: " + arr[0]);   // 10
        System.out.println("Second element: " + arr[1]);  // 20
        System.out.println("Last element: " + arr[4]);    // 50
        System.out.println("Length: " + arr.length);      // 5
        
        // Valid indices: 0 to 4 (length-1)
    }
}`,
    },
    {
      title: 'Array Traversal',
      icon: <FiSearch className="w-6 h-6" />,
      content: `Iterating through all elements of an array.

Methods:
→ <span class="text-cyan-300">Traditional for loop:</span> <span class="text-blue-400">for</span> (int i = 0; i < arr.length; i++)
→ <span class="text-cyan-300">Enhanced for loop:</span> <span class="text-blue-400">for</span> (int num : arr)

Use Cases:
→ Printing all elements
→ Searching for a value
→ <span class="text-amber-300">Processing each element</span>`,
      code: `public class ArrayTraversal {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        
        // Method 1: Traditional for loop
        System.out.println("Traditional loop:");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        
        // Method 2: Enhanced for loop
        System.out.println("Enhanced for loop:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
    },
    {
      title: 'Finding Maximum and Minimum',
      icon: <FiMaximize className="w-6 h-6" />,
      content: `Finding the <span class="text-blue-400 font-semibold">largest or smallest</span> element in an array.

Algorithm:
→ Initialize <span class="text-cyan-300">max/min</span> with first element
→ Traverse array and compare each element
→ Update <span class="text-cyan-300">max/min</span> if current element is larger/smaller

<span class="text-amber-300">Time Complexity:</span> <span class="text-blue-400">O(n)</span> - linear time`,
      code: `public class FindMaxMin {
    public static void main(String[] args) {
        int[] arr = {10, 25, 8, 32, 15};
        
        // Find maximum
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        System.out.println("Maximum: " + max);  // 32
        
        // Find minimum
        int min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        System.out.println("Minimum: " + min);  // 8
    }
}`,
    },
    {
      title: 'Common Array Operations',
      content: `<span class="text-blue-400 font-semibold">Essential operations</span> for working with arrays.

Operations:
→ <span class="text-cyan-300">Sum of all elements:</span> Traverse and add each element
→ <span class="text-cyan-300">Average:</span> Sum divided by length
→ <span class="text-cyan-300">Search:</span> Linear search through array
→ <span class="text-cyan-300">Count:</span> Count elements matching a condition

<span class="text-amber-300">Important:</span> Arrays have fixed size and cannot be resized.`,
      code: `public class ArrayOperations {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        
        // Sum of elements
        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        System.out.println("Sum: " + sum);  // 150
        
        // Average
        double average = (double) sum / arr.length;
        System.out.println("Average: " + average);  // 30.0
        
        // Count even numbers
        int count = 0;
        for (int num : arr) {
            if (num % 2 == 0) {
                count++;
            }
        }
        System.out.println("Even numbers: " + count);  // 5
    }
}`,
    },
  ] as ExplanationSection[],
  exampleCode: `public class Arrays1D {
    public static void main(String[] args) {
        // Declaration and initialization
        int[] numbers = new int[5];
        
        // Assigning values
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        numbers[3] = 40;
        numbers[4] = 50;
        
        // Alternative initialization
        int[] arr = {1, 2, 3, 4, 5};
        
        // Traversing array
        System.out.println("Numbers array:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();
        
        // Enhanced for loop
        System.out.println("Arr array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // Finding maximum
        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        System.out.println("Maximum: " + max);
    }
}`,
  practiceQuestions: [
    {
      question: 'Write a program to find the largest element in an array.',
      solution: 'Initialize max with the first element, then traverse the array and update max if you find a larger element.',
      flowSteps: [
        { id: '1', label: 'Start', type: 'start' },
        { id: '2', label: 'Initialize array', type: 'process' },
        { id: '3', label: 'max = arr[0]', type: 'process' },
        { id: '4', label: 'Initialize i = 1', type: 'process' },
        { id: '5', label: 'i < arr.length?', type: 'decision' },
        { id: '6', label: 'arr[i] > max?', type: 'decision' },
        { id: '7', label: 'max = arr[i]', type: 'process' },
        { id: '8', label: 'Increment i++', type: 'process' },
        { id: '9', label: 'Print max', type: 'io' },
        { id: '10', label: 'End', type: 'end' },
      ],
      solutionCode: `public class FindLargest {
    public static void main(String[] args) {
        int[] arr = {10, 25, 8, 32, 15};
        int max = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        
        System.out.println("Largest: " + max);
    }
}`,
      dryRunCode: `public class FindLargest {
    public static void main(String[] args) {
        int[] arr = {10, 25, 8, 32, 15};
        int max = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        
        System.out.println("Largest: " + max);
    }
}`,
      dryRunSteps: [
        { line: 3, vars: {}, output: '', arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25 }, { index: 2, value: 8 }, { index: 3, value: 32 }, { index: 4, value: 15 }], description: 'Initializing array with values' },
        { line: 4, vars: { max: 10 }, output: '', arrayState: [{ index: 0, value: 10, highlighted: true }, { index: 1, value: 25 }, { index: 2, value: 8 }, { index: 3, value: 32 }, { index: 4, value: 15 }], description: 'Initializing max = arr[0] = 10' },
        { line: 6, vars: { max: 10, i: 1 }, output: '', arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25, highlighted: true }, { index: 2, value: 8 }, { index: 3, value: 32 }, { index: 4, value: 15 }], description: 'Loop: i = 1, condition (1 < 5 is true), accessing arr[1] = 25' },
        { line: 7, vars: { max: 10, i: 1 }, output: '', conditionResult: true, arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25, highlighted: true }, { index: 2, value: 8 }, { index: 3, value: 32 }, { index: 4, value: 15 }], description: 'Checking if (25 > 10) is true' },
        { line: 8, vars: { max: 25, i: 1 }, output: '', arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25, highlighted: true }, { index: 2, value: 8 }, { index: 3, value: 32 }, { index: 4, value: 15 }], description: 'Updating max = 25' },
        { line: 6, vars: { max: 25, i: 2 }, output: '', arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25 }, { index: 2, value: 8, highlighted: true }, { index: 3, value: 32 }, { index: 4, value: 15 }], description: 'Loop: i = 2, condition (2 < 5 is true), accessing arr[2] = 8' },
        { line: 7, vars: { max: 25, i: 2 }, output: '', conditionResult: false, arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25 }, { index: 2, value: 8, highlighted: true }, { index: 3, value: 32 }, { index: 4, value: 15 }], description: 'Checking if (8 > 25) is false - skipping update' },
        { line: 6, vars: { max: 25, i: 3 }, output: '', arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25 }, { index: 2, value: 8 }, { index: 3, value: 32, highlighted: true }, { index: 4, value: 15 }], description: 'Loop: i = 3, condition (3 < 5 is true), accessing arr[3] = 32' },
        { line: 7, vars: { max: 25, i: 3 }, output: '', conditionResult: true, arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25 }, { index: 2, value: 8 }, { index: 3, value: 32, highlighted: true }, { index: 4, value: 15 }], description: 'Checking if (32 > 25) is true' },
        { line: 8, vars: { max: 32, i: 3 }, output: '', arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25 }, { index: 2, value: 8 }, { index: 3, value: 32, highlighted: true }, { index: 4, value: 15 }], description: 'Updating max = 32' },
        { line: 6, vars: { max: 32, i: 4 }, output: '', arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25 }, { index: 2, value: 8 }, { index: 3, value: 32 }, { index: 4, value: 15, highlighted: true }], description: 'Loop: i = 4, condition (4 < 5 is true), accessing arr[4] = 15' },
        { line: 7, vars: { max: 32, i: 4 }, output: '', conditionResult: false, arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25 }, { index: 2, value: 8 }, { index: 3, value: 32 }, { index: 4, value: 15, highlighted: true }], description: 'Checking if (15 > 32) is false - skipping update' },
        { line: 6, vars: { max: 32, i: 5 }, output: '', arrayState: [{ index: 0, value: 10 }, { index: 1, value: 25 }, { index: 2, value: 8 }, { index: 3, value: 32 }, { index: 4, value: 15 }], description: 'Loop: i = 5, condition (5 < 5 is false) - exiting loop' },
        { line: 12, vars: { max: 32, i: 5 }, output: 'Largest: 32\\n', description: 'Printing: Largest: 32' },
      ] as DryRunStep[],
    },
  ] as PracticeQuestion[],
  dryRunCode: `public class Arrays1D {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}`,
  dryRunSteps: [
    {
      line: 3,
      vars: {},
      output: '',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20 },
        { index: 2, value: 30 },
        { index: 3, value: 40 },
        { index: 4, value: 50 },
      ],
      description: 'Initializing array with values',
    },
    {
      line: 5,
      vars: { i: 0 },
      output: '',
      arrayState: [
        { index: 0, value: 10, highlighted: true },
        { index: 1, value: 20 },
        { index: 2, value: 30 },
        { index: 3, value: 40 },
        { index: 4, value: 50 },
      ],
      description: 'Loop: i = 0, condition (0 < 5 is true), accessing arr[0]',
    },
    {
      line: 6,
      vars: { i: 0 },
      output: '10 ',
      arrayState: [
        { index: 0, value: 10, highlighted: true },
        { index: 1, value: 20 },
        { index: 2, value: 30 },
        { index: 3, value: 40 },
        { index: 4, value: 50 },
      ],
      description: 'Printing arr[0] = 10',
    },
    {
      line: 5,
      vars: { i: 1 },
      output: '10 ',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20, highlighted: true },
        { index: 2, value: 30 },
        { index: 3, value: 40 },
        { index: 4, value: 50 },
      ],
      description: 'Loop: i = 1, condition (1 < 5 is true), accessing arr[1]',
    },
    {
      line: 6,
      vars: { i: 1 },
      output: '10 20 ',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20, highlighted: true },
        { index: 2, value: 30 },
        { index: 3, value: 40 },
        { index: 4, value: 50 },
      ],
      description: 'Printing arr[1] = 20',
    },
    {
      line: 5,
      vars: { i: 2 },
      output: '10 20 ',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20 },
        { index: 2, value: 30, highlighted: true },
        { index: 3, value: 40 },
        { index: 4, value: 50 },
      ],
      description: 'Loop: i = 2, condition (2 < 5 is true), accessing arr[2]',
    },
    {
      line: 6,
      vars: { i: 2 },
      output: '10 20 30 ',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20 },
        { index: 2, value: 30, highlighted: true },
        { index: 3, value: 40 },
        { index: 4, value: 50 },
      ],
      description: 'Printing arr[2] = 30',
    },
    {
      line: 5,
      vars: { i: 3 },
      output: '10 20 30 ',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20 },
        { index: 2, value: 30 },
        { index: 3, value: 40, highlighted: true },
        { index: 4, value: 50 },
      ],
      description: 'Loop: i = 3, condition (3 < 5 is true), accessing arr[3]',
    },
    {
      line: 6,
      vars: { i: 3 },
      output: '10 20 30 40 ',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20 },
        { index: 2, value: 30 },
        { index: 3, value: 40, highlighted: true },
        { index: 4, value: 50 },
      ],
      description: 'Printing arr[3] = 40',
    },
    {
      line: 5,
      vars: { i: 4 },
      output: '10 20 30 40 ',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20 },
        { index: 2, value: 30 },
        { index: 3, value: 40 },
        { index: 4, value: 50, highlighted: true },
      ],
      description: 'Loop: i = 4, condition (4 < 5 is true), accessing arr[4]',
    },
    {
      line: 6,
      vars: { i: 4 },
      output: '10 20 30 40 50 ',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20 },
        { index: 2, value: 30 },
        { index: 3, value: 40 },
        { index: 4, value: 50, highlighted: true },
      ],
      description: 'Printing arr[4] = 50',
    },
    {
      line: 5,
      vars: { i: 5 },
      output: '10 20 30 40 50 ',
      arrayState: [
        { index: 0, value: 10 },
        { index: 1, value: 20 },
        { index: 2, value: 30 },
        { index: 3, value: 40 },
        { index: 4, value: 50 },
      ],
      description: 'Loop: i = 5, condition (5 < 5 is false) - exiting loop',
    },
  ] as DryRunStep[],
}

export default function Arrays1DPage() {
  return <TopicPage content={content} />
}
