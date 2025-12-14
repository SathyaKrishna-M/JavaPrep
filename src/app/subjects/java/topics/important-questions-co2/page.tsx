'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DMTopicPage'
import { FiList } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Important Questions (CO2)',
    explanationSections: [
        {
            title: 'CO2 Important Practice Questions',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        This section contains a curated list of <span className="text-blue-400 font-semibold">12 Important Questions</span> covering <span className="text-yellow-400">Arrays (CO2)</span> in Java.
                        These questions cover both 1D Arrays (sorting, searching, stats) and 2D Arrays (matrix operations).
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>1D Array Operations</li>
                            <li>Sorting & Searching</li>
                            <li>Matrix Arithmetic (Add, Sub, Mul)</li>
                            <li>Matrix Properties (Transpose, Trace, Symmetric)</li>
                        </ul>
                    </div>
                </div>
            ),
        }
    ] as ExplanationSection[],
    practiceQuestions: [
        // 1D Arrays
        {
            question: '1. Develop a Java Program to find sum and average from the array of n given numbers',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class ArraySumAverage {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of elements (n): ");
        int n = sc.nextInt();
        
        int[] arr = new int[n];
        System.out.println("Enter the elements:");
        for(int i=0; i<n; i++) {
            arr[i] = sc.nextInt();
        }
        
        int sum = 0;
        for(int i=0; i<n; i++) {
            sum += arr[i];
        }
        
        double average = (double) sum / n;
        
        System.out.println("Sum: " + sum);
        System.out.println("Average: " + average);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter number of elements (n): 5<br />
                            Enter the elements:<br />
                            10 20 30 40 50<br />
                            Sum: 150<br />
                            Average: 30.0
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> We iterate through the array to calculate the <code>sum</code> of all elements. Then, <code>average = sum / n</code>. Note that we cast sum to `double` for accurate division.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '2. Develop a Java Program to implement bubble sort',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class BubbleSort {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        // Bubble Sort
        for(int i=0; i<n-1; i++) {
            for(int j=0; j<n-i-1; j++) {
                if(arr[j] > arr[j+1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }

        System.out.print("Sorted Array: ");
        for(int x : arr) System.out.print(x + " ");
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter size: 5<br />
                            Enter elements:<br />
                            64 34 25 12 22<br />
                            Sorted Array: 12 22 25 34 64
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> In Bubble Sort, we repeatedly swap adjacent elements if they are in the wrong order. The largest element &quot;bubbles up&quot; to the end in each pass. The nested loop runs <code>n-1</code> times.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '3. Develop a Java Program to implement linear search',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class LinearSearch {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        System.out.print("Enter key to search: ");
        int key = sc.nextInt();

        int index = -1;
        for(int i=0; i<n; i++) {
            if(arr[i] == key) {
                index = i;
                break;
            }
        }

        if(index != -1) {
            System.out.println("Element found at index: " + index);
        } else {
            System.out.println("Element not found");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter size: 5<br />
                            Enter elements: 10 50 30 70 80<br />
                            Enter key to search: 30<br />
                            Element found at index: 2
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> We traverse the array sequentially from the start. If we find an element matching the <code>key</code>, we verify its index and stop. If the loop completes without finding it, the element is not present.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '4. Develop a Java Program to find max and min values from the given array',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class MinMaxArray {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        int max = arr[0];
        int min = arr[0];

        for(int i=1; i<n; i++) {
            if(arr[i] > max) max = arr[i];
            if(arr[i] < min) min = arr[i];
        }

        System.out.println("Max Value: " + max);
        System.out.println("Min Value: " + min);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter size: 5<br />
                            Enter elements: 5 1 9 3 7<br />
                            Max Value: 9<br />
                            Min Value: 1
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Initialize <code>max</code> and <code>min</code> with the first element. Iterate through the rest; if an element is greater than <code>max</code>, update <code>max</code>. If smaller than <code>min</code>, update <code>min</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '5. Develop a Java Program to count number of positive, negative and neutral numbers in the given array',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class CountNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        int positive = 0, negative = 0, zero = 0;

        for(int x : arr) {
            if(x > 0) positive++;
            else if(x < 0) negative++;
            else zero++;
        }

        System.out.println("Positive Count: " + positive);
        System.out.println("Negative Count: " + negative);
        System.out.println("Zero Count: " + zero);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter size: 6<br />
                            Enter elements: 10 -5 0 20 -1 0<br />
                            Positive Count: 2<br />
                            Negative Count: 2<br />
                            Zero Count: 2
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Iterate through the array. Check if <code>element &gt; 0</code> (positive), <code>element &lt; 0</code> (negative), or <code>else</code> (zero) and increment respective counters.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '6. Develop a Java to Display the array in regular and in reverse order',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class ReverseArrayDisplay {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        
        System.out.println("Enter elements:");
        for(int i=0; i<n; i++) arr[i] = sc.nextInt();

        System.out.print("Original Order: ");
        for(int i=0; i<n; i++) System.out.print(arr[i] + " ");
        System.out.println();

        System.out.print("Reverse Order: ");
        for(int i=n-1; i>=0; i--) System.out.print(arr[i] + " ");
        System.out.println();
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter size: 5<br />
                            Enter elements: 1 2 3 4 5<br />
                            Original Order: 1 2 3 4 5 <br />
                            Reverse Order: 5 4 3 2 1
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> To display in regular order, loop from <code>i = 0 to n-1</code>. To display in reverse, loop from <code>i = n-1 down to 0</code>.</p>
                    </div>
                </div>
            ),
        },

        // 2D Arrays
        {
            question: '1. Develop a Java Program to perform addition and subtraction of 2 matrices',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class MatrixAddSub {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter rows and columns: ");
        int r = sc.nextInt();
        int c = sc.nextInt();

        int[][] a = new int[r][c];
        int[][] b = new int[r][c];

        System.out.println("Enter Matrix A:");
        for(int i=0; i<r; i++) for(int j=0; j<c; j++) a[i][j] = sc.nextInt();

        System.out.println("Enter Matrix B:");
        for(int i=0; i<r; i++) for(int j=0; j<c; j++) b[i][j] = sc.nextInt();

        System.out.println("Addition:");
        for(int i=0; i<r; i++) {
            for(int j=0; j<c; j++) System.out.print((a[i][j] + b[i][j]) + " ");
            System.out.println();
        }

        System.out.println("Subtraction:");
        for(int i=0; i<r; i++) {
            for(int j=0; j<c; j++) System.out.print((a[i][j] - b[i][j]) + " ");
            System.out.println();
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter rows and columns: 2 2<br />
                            Enter Matrix A:<br />
                            1 2<br />
                            3 4<br />
                            Enter Matrix B:<br />
                            5 6<br />
                            7 8<br />
                            Addition:<br />
                            6 8 <br />
                            10 12 <br />
                            Subtraction:<br />
                            -4 -4 <br />
                            -4 -4
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Check if dimensions match (assumed here). For element <code>(i, j)</code>, Sum = <code>A[i][j] + B[i][j]</code> and Diff = <code>A[i][j] - B[i][j]</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '2. Develop a Java Program to perform multiplication of 2 matrices',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class MatrixMul {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter rows/cols for Matrix A (r1 c1): ");
        int r1 = sc.nextInt(), c1 = sc.nextInt();
        System.out.print("Enter rows/cols for Matrix B (r2 c2): ");
        int r2 = sc.nextInt(), c2 = sc.nextInt();

        if (c1 != r2) {
            System.out.println("Multiplication not possible!");
            return;
        }

        int[][] a = new int[r1][c1];
        int[][] b = new int[r2][c2];
        int[][] res = new int[r1][c2];

        System.out.println("Enter Matrix A:");
        for(int i=0; i<r1; i++) for(int j=0; j<c1; j++) a[i][j] = sc.nextInt();

        System.out.println("Enter Matrix B:");
        for(int i=0; i<r2; i++) for(int j=0; j<c2; j++) b[i][j] = sc.nextInt();

        // Multiplication
        for(int i=0; i<r1; i++) {
            for(int j=0; j<c2; j++) {
                for(int k=0; k<c1; k++) {
                    res[i][j] += a[i][k] * b[k][j];
                }
            }
        }

        System.out.println("Result Matrix:");
        for(int i=0; i<r1; i++) {
            for(int j=0; j<c2; j++) System.out.print(res[i][j] + " ");
            System.out.println();
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter rows/cols for Matrix A (r1 c1): 2 2<br />
                            Enter rows/cols for Matrix B (r2 c2): 2 2<br />
                            Enter Matrix A:<br />
                            1 1<br />
                            1 1<br />
                            Enter Matrix B:<br />
                            2 2<br />
                            2 2<br />
                            Result Matrix:<br />
                            4 4 <br />
                            4 4
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Matrix multiplication is possible if <code>cols of A == rows of B</code>. The resulting element at <code>(i, j)</code> is the dot product of row <code>i</code> of A and column <code>j</code> of B.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '3. Develop a Java Program to Display the given matrix in transpose from',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class MatrixTranspose {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter rows and columns: ");
        int r = sc.nextInt();
        int c = sc.nextInt();

        int[][] mat = new int[r][c];

        System.out.println("Enter Matrix:");
        for(int i=0; i<r; i++) for(int j=0; j<c; j++) mat[i][j] = sc.nextInt();

        System.out.println("Original Matrix:");
        for(int i=0; i<r; i++) {
            for(int j=0; j<c; j++) System.out.print(mat[i][j] + " ");
            System.out.println();
        }

        System.out.println("Transpose Matrix:");
        for(int i=0; i<c; i++) {
            for(int j=0; j<r; j++) {
                System.out.print(mat[j][i] + " ");
            }
            System.out.println();
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter rows and columns: 2 3<br />
                            Enter Matrix:<br />
                            1 2 3<br />
                            4 5 6<br />
                            Transpose Matrix:<br />
                            1 4 <br />
                            2 5 <br />
                            3 6
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Transposing swaps rows and columns. We print <code>mat[j][i]</code> where <code>j</code> loops rows and <code>i</code> loops columns, effectively printing columns as rows.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '4. Develop a Java Program to Find the max and min Values (entire matrix, row wise, column wise)',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class MatrixMinMax {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter rows and columns: ");
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] mat = new int[r][c];

        System.out.println("Enter Matrix:");
        for(int i=0; i<r; i++) for(int j=0; j<c; j++) mat[i][j] = sc.nextInt();

        int overallMax = mat[0][0], overallMin = mat[0][0];

        // Row-wise
        System.out.println("Row-wise Min/Max:");
        for(int i=0; i<r; i++) {
            int rMax = mat[i][0], rMin = mat[i][0];
            for(int j=0; j<c; j++) {
                if(mat[i][j] > rMax) rMax = mat[i][j];
                if(mat[i][j] < rMin) rMin = mat[i][j];
                
                // Update overall
                if(mat[i][j] > overallMax) overallMax = mat[i][j];
                if(mat[i][j] < overallMin) overallMin = mat[i][j];
            }
            System.out.println("Row " + i + ": Min=" + rMin + ", Max=" + rMax);
        }

        // Column-wise
        System.out.println("Column-wise Min/Max:");
        for(int j=0; j<c; j++) {
            int cMax = mat[0][j], cMin = mat[0][j];
            for(int i=0; i<r; i++) {
                if(mat[i][j] > cMax) cMax = mat[i][j];
                if(mat[i][j] < cMin) cMin = mat[i][j];
            }
            System.out.println("Col " + j + ": Min=" + cMin + ", Max=" + cMax);
        }

        System.out.println("Entire Matrix: Min=" + overallMin + ", Max=" + overallMax);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter rows and columns: 2 2<br />
                            Enter Matrix:<br />
                            1 5<br />
                            2 8<br />
                            Row-wise Min/Max:<br />
                            Row 0: Min=1, Max=5<br />
                            Row 1: Min=2, Max=8<br />
                            Column-wise Min/Max:<br />
                            Col 0: Min=1, Max=2<br />
                            Col 1: Min=5, Max=8<br />
                            Entire Matrix: Min=1, Max=8
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> We iterate by fixing rows (for row-wise) or columns (for column-wise) and scan through the other dimension to find local min/max. We also track the global min/max during traversal.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '5. Develop a Java Program to implement the Trace of the matrix (Sum of the Principal Diagonal Elements)',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class MatrixTrace {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size (N for NxN matrix): ");
        int n = sc.nextInt();
        int[][] mat = new int[n][n];

        System.out.println("Enter Matrix:");
        for(int i=0; i<n; i++) for(int j=0; j<n; j++) mat[i][j] = sc.nextInt();

        int trace = 0;
        for(int i=0; i<n; i++) {
            trace += mat[i][i]; // Principal diagonal element is at [i][i]
        }

        System.out.println("Trace of the Matrix: " + trace);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter size (N for NxN): 3<br />
                            Enter Matrix:<br />
                            1 2 3<br />
                            4 5 6<br />
                            7 8 9<br />
                            Trace of the Matrix: 15
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> For a square matrix, the trace is the sum of elements on the main diagonal where the row index equals the column index (<code>mat[i][i]</code>).</p>
                    </div>
                </div>
            ),
        },
        {
            question: '6. Develop a Java Program to find the Given Matrix as Symmetric or not',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class SymmetricMatrix {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter size (N for NxN): ");
        int n = sc.nextInt();
        int[][] mat = new int[n][n];

        System.out.println("Enter Matrix:");
        for(int i=0; i<n; i++) for(int j=0; j<n; j++) mat[i][j] = sc.nextInt();

        boolean isSymmetric = true;
        for(int i=0; i<n; i++) {
            for(int j=0; j<n; j++) {
                if(mat[i][j] != mat[j][i]) {
                    isSymmetric = false;
                    break;
                }
            }
        }

        if(isSymmetric) System.out.println("Matrix is Symmetric");
        else System.out.println("Matrix is NOT Symmetric");
        
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter size: 3<br />
                            Enter Matrix:<br />
                            1 2 3<br />
                            2 4 5<br />
                            3 5 6<br />
                            Matrix is Symmetric
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> A matrix is symmetric if it equals its transpose, i.e., <code>mat[i][j] == mat[j][i]</code> for all indices. We check this condition; if any mismatch is found, it is not symmetric.</p>
                    </div>
                </div>
            ),
        },
    ] as PracticeQuestion[]
}

export default function Page() {
    return <DMTopicPage content={content} subjectName="Java" subjectHref="/subjects/java" />
}
