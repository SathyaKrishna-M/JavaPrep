'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiGrid, FiLayers, FiPlus, FiTable } from 'react-icons/fi'

const content = {
  title: '2D Arrays',
  explanationSections: [
    {
      title: 'Introduction to 2D Arrays',
      icon: <FiGrid className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">2D arrays</span> are arrays of arrays, representing a <span class="text-cyan-300">matrix</span> or <span class="text-cyan-300">table</span> structure.

Key Concepts:
→ Think of it as <span class="text-blue-400">rows</span> and <span class="text-blue-400">columns</span>
→ First index is <span class="text-cyan-300">row</span>, second index is <span class="text-cyan-300">column</span>
→ <span class="text-cyan-300">matrix[row][column]</span> to access elements
→ <span class="text-cyan-300">matrix.length</span> gives number of rows
→ <span class="text-cyan-300">matrix[i].length</span> gives columns in row i

Use Cases:
→ Matrices in mathematics
→ Grid-based games
→ <span class="text-amber-300">Tables of data</span>`,
      code: `public class TwoDArrayIntro {
    public static void main(String[] args) {
        // Declaration
        int[][] matrix = new int[3][4];  // 3 rows, 4 columns
        
        // Initialization with values
        int[][] arr = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Rows: " + arr.length);        // 3
        System.out.println("Columns in row 0: " + arr[0].length);  // 3
    }
}`,
    },
    {
      title: 'Accessing 2D Array Elements',
      icon: <FiTable className="w-6 h-6" />,
      content: `Accessing elements in a 2D array using <span class="text-blue-400 font-semibold">row and column indices</span>.

Syntax:
→ <span class="text-cyan-300">matrix[row][column]</span>
→ First index: <span class="text-cyan-300">row number</span> (0 to rows-1)
→ Second index: <span class="text-cyan-300">column number</span> (0 to columns-1)

<span class="text-amber-300">Important:</span> Always check bounds for both row and column indices.`,
      code: `public class Access2DArray {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Accessing elements
        System.out.println("Element at [0][0]: " + matrix[0][0]);  // 1
        System.out.println("Element at [1][2]: " + matrix[1][2]);  // 6
        System.out.println("Element at [2][1]: " + matrix[2][1]);  // 8
        
        // Modifying elements
        matrix[0][0] = 10;
        System.out.println("After modification: " + matrix[0][0]);  // 10
    }
}`,
    },
    {
      title: 'Traversing 2D Arrays',
      icon: <FiLayers className="w-6 h-6" />,
      content: `Iterating through all elements of a 2D array using <span class="text-blue-400 font-semibold">nested loops</span>.

Methods:
→ <span class="text-cyan-300">Traditional nested loops:</span> <span class="text-blue-400">for</span> (int i = 0; i < matrix.length; i++)
→ <span class="text-cyan-300">Enhanced for loop:</span> <span class="text-blue-400">for</span> (int[] row : matrix)

Pattern:
→ <span class="text-blue-400">Outer loop:</span> iterate through rows
→ <span class="text-blue-400">Inner loop:</span> iterate through columns in each row`,
      code: `public class Traverse2D {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Method 1: Traditional nested loops
        System.out.println("Traditional method:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        
        // Method 2: Enhanced for loop
        System.out.println("\\nEnhanced for loop:");
        for (int[] row : matrix) {
            for (int num : row) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Matrix Operations',
      icon: <FiPlus className="w-6 h-6" />,
      content: `Performing <span class="text-blue-400 font-semibold">operations</span> on 2D arrays like addition, subtraction, and multiplication.

Common Operations:
→ <span class="text-cyan-300">Matrix Addition:</span> Add corresponding elements
→ <span class="text-cyan-300">Matrix Subtraction:</span> Subtract corresponding elements
→ <span class="text-cyan-300">Matrix Multiplication:</span> Dot product of rows and columns
→ <span class="text-cyan-300">Transpose:</span> Swap rows and columns

<span class="text-amber-300">Important:</span> For addition/subtraction, matrices must have same dimensions.`,
      code: `public class MatrixOperations {
    public static void main(String[] args) {
        int[][] a = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] b = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
        int[][] c = new int[3][3];
        
        // Matrix Addition
        System.out.println("Matrix Addition:");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                c[i][j] = a[i][j] + b[i][j];
                System.out.print(c[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
    },
  ] as ExplanationSection[],
  exampleCode: `public class Arrays2D {
    public static void main(String[] args) {
        // Declaration and initialization
        int[][] matrix = new int[3][4];
        
        // Assigning values
        matrix[0][0] = 1;
        matrix[0][1] = 2;
        matrix[0][2] = 3;
        matrix[0][3] = 4;
        matrix[1][0] = 5;
        matrix[1][1] = 6;
        matrix[1][2] = 7;
        matrix[1][3] = 8;
        matrix[2][0] = 9;
        matrix[2][1] = 10;
        matrix[2][2] = 11;
        matrix[2][3] = 12;
        
        // Alternative initialization
        int[][] arr = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Traversing 2D array
        System.out.println("Matrix:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + "\\t");
            }
            System.out.println();
        }
        
        // Enhanced for loop
        System.out.println("\\nArr:");
        for (int[] row : arr) {
            for (int num : row) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Write a program to add two 3x3 matrices.',
      solution: 'Use nested loops to iterate through both matrices and add corresponding elements. Store the result in a third matrix.',
      flowSteps: [
        { id: '1', label: 'Start', type: 'start' },
        { id: '2', label: 'Initialize matrices a, b, c', type: 'process' },
        { id: '3', label: 'Initialize i = 0', type: 'process' },
        { id: '4', label: 'i < 3?', type: 'decision' },
        { id: '5', label: 'Initialize j = 0', type: 'process' },
        { id: '6', label: 'j < 3?', type: 'decision' },
        { id: '7', label: 'c[i][j] = a[i][j] + b[i][j]', type: 'process' },
        { id: '8', label: 'Print c[i][j]', type: 'io' },
        { id: '9', label: 'Increment j++', type: 'process' },
        { id: '10', label: 'Print newline', type: 'io' },
        { id: '11', label: 'Increment i++', type: 'process' },
        { id: '12', label: 'End', type: 'end' },
      ],
      solutionCode: `public class MatrixAddition {
    public static void main(String[] args) {
        int[][] a = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] b = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
        int[][] c = new int[3][3];
        
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                c[i][j] = a[i][j] + b[i][j];
                System.out.print(c[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class MatrixAddition {
    public static void main(String[] args) {
        int[][] a = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] b = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
        int[][] c = new int[3][3];
        
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                c[i][j] = a[i][j] + b[i][j];
                System.out.print(c[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: {}, output: '', description: 'Initializing matrix a = {{1,2,3}, {4,5,6}, {7,8,9}}' },
        { line: 4, vars: {}, output: '', description: 'Initializing matrix b = {{9,8,7}, {6,5,4}, {3,2,1}}' },
        { line: 5, vars: {}, output: '', description: 'Initializing matrix c = new int[3][3]' },
        { line: 7, vars: { i: 0 }, output: '', description: 'Outer loop: i = 0, condition (0 < 3 is true)' },
        { line: 8, vars: { i: 0, j: 0 }, output: '', description: 'Inner loop: j = 0, condition (0 < 3 is true)' },
        { line: 9, vars: { i: 0, j: 0 }, output: '', description: 'c[0][0] = a[0][0] + b[0][0] = 1 + 9 = 10' },
        { line: 10, vars: { i: 0, j: 0 }, output: '10 ', description: 'Printing: 10' },
        { line: 8, vars: { i: 0, j: 1 }, output: '10 ', description: 'Inner loop: j = 1, condition (1 < 3 is true)' },
        { line: 9, vars: { i: 0, j: 1 }, output: '10 ', description: 'c[0][1] = a[0][1] + b[0][1] = 2 + 8 = 10' },
        { line: 10, vars: { i: 0, j: 1 }, output: '10 10 ', description: 'Printing: 10' },
        { line: 8, vars: { i: 0, j: 2 }, output: '10 10 ', description: 'Inner loop: j = 2, condition (2 < 3 is true)' },
        { line: 9, vars: { i: 0, j: 2 }, output: '10 10 ', description: 'c[0][2] = a[0][2] + b[0][2] = 3 + 7 = 10' },
        { line: 10, vars: { i: 0, j: 2 }, output: '10 10 10 ', description: 'Printing: 10' },
        { line: 8, vars: { i: 0, j: 3 }, output: '10 10 10 ', description: 'Inner loop: j = 3, condition (3 < 3 is false) - inner loop exits' },
        { line: 11, vars: { i: 0 }, output: '10 10 10 \\n', description: 'Printing newline after row 0' },
        { line: 7, vars: { i: 1 }, output: '10 10 10 \\n', description: 'Outer loop: i = 1, condition (1 < 3 is true)' },
        { line: 8, vars: { i: 1, j: 0 }, output: '10 10 10 \\n', description: 'Inner loop: j = 0, condition (0 < 3 is true)' },
        { line: 9, vars: { i: 1, j: 0 }, output: '10 10 10 \\n', description: 'c[1][0] = a[1][0] + b[1][0] = 4 + 6 = 10' },
        { line: 10, vars: { i: 1, j: 0 }, output: '10 10 10 \\n10 ', description: 'Printing: 10' },
        { line: 8, vars: { i: 1, j: 1 }, output: '10 10 10 \\n10 ', description: 'Inner loop: j = 1, condition (1 < 3 is true)' },
        { line: 9, vars: { i: 1, j: 1 }, output: '10 10 10 \\n10 ', description: 'c[1][1] = a[1][1] + b[1][1] = 5 + 5 = 10' },
        { line: 10, vars: { i: 1, j: 1 }, output: '10 10 10 \\n10 10 ', description: 'Printing: 10' },
        { line: 8, vars: { i: 1, j: 2 }, output: '10 10 10 \\n10 10 ', description: 'Inner loop: j = 2, condition (2 < 3 is true)' },
        { line: 9, vars: { i: 1, j: 2 }, output: '10 10 10 \\n10 10 ', description: 'c[1][2] = a[1][2] + b[1][2] = 6 + 4 = 10' },
        { line: 10, vars: { i: 1, j: 2 }, output: '10 10 10 \\n10 10 10 ', description: 'Printing: 10' },
        { line: 8, vars: { i: 1, j: 3 }, output: '10 10 10 \\n10 10 10 ', description: 'Inner loop: j = 3, condition (3 < 3 is false) - inner loop exits' },
        { line: 11, vars: { i: 1 }, output: '10 10 10 \\n10 10 10 \\n', description: 'Printing newline after row 1' },
        { line: 7, vars: { i: 2 }, output: '10 10 10 \\n10 10 10 \\n', description: 'Outer loop: i = 2, condition (2 < 3 is true)' },
        { line: 8, vars: { i: 2, j: 0 }, output: '10 10 10 \\n10 10 10 \\n', description: 'Inner loop: j = 0, condition (0 < 3 is true)' },
        { line: 9, vars: { i: 2, j: 0 }, output: '10 10 10 \\n10 10 10 \\n', description: 'c[2][0] = a[2][0] + b[2][0] = 7 + 3 = 10' },
        { line: 10, vars: { i: 2, j: 0 }, output: '10 10 10 \\n10 10 10 \\n10 ', description: 'Printing: 10' },
        { line: 8, vars: { i: 2, j: 1 }, output: '10 10 10 \\n10 10 10 \\n10 ', description: 'Inner loop: j = 1, condition (1 < 3 is true)' },
        { line: 9, vars: { i: 2, j: 1 }, output: '10 10 10 \\n10 10 10 \\n10 ', description: 'c[2][1] = a[2][1] + b[2][1] = 8 + 2 = 10' },
        { line: 10, vars: { i: 2, j: 1 }, output: '10 10 10 \\n10 10 10 \\n10 10 ', description: 'Printing: 10' },
        { line: 8, vars: { i: 2, j: 2 }, output: '10 10 10 \\n10 10 10 \\n10 10 ', description: 'Inner loop: j = 2, condition (2 < 3 is true)' },
        { line: 9, vars: { i: 2, j: 2 }, output: '10 10 10 \\n10 10 10 \\n10 10 ', description: 'c[2][2] = a[2][2] + b[2][2] = 9 + 1 = 10' },
        { line: 10, vars: { i: 2, j: 2 }, output: '10 10 10 \\n10 10 10 \\n10 10 10 ', description: 'Printing: 10' },
        { line: 8, vars: { i: 2, j: 3 }, output: '10 10 10 \\n10 10 10 \\n10 10 10 ', description: 'Inner loop: j = 3, condition (3 < 3 is false) - inner loop exits' },
        { line: 11, vars: { i: 2 }, output: '10 10 10 \\n10 10 10 \\n10 10 10 \\n', description: 'Printing newline after row 2' },
        { line: 7, vars: { i: 3 }, output: '10 10 10 \\n10 10 10 \\n10 10 10 \\n', description: 'Outer loop: i = 3, condition (3 < 3 is false) - outer loop exits' },
      ] as DryRunStep[],
    },
  ] as PracticeQuestion[],
}

export default function Arrays2DPage() {
  return <TopicPage content={content} />
}
