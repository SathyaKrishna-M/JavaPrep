'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DMTopicPage'
import { FiList } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Important Questions (CO3)',
    explanationSections: [
        {
            title: 'CO3 Important Practice Questions',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        This section contains a curated list of <span className="text-blue-400 font-semibold">12 Important Questions</span> covering <span className="text-yellow-400">CO3</span> (Strings, Recursion, and Bitwise Operators).
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>String Manupulation (String vs StringBuffer, Palindrome, Frequency)</li>
                            <li>Recursion (Sum of Natural Numbers / Array / Digits, Factorial, Power)</li>
                            <li>Bitwise Operations (Swapping, Types of Operators)</li>
                        </ul>
                    </div>
                </div>
            ),
        }
    ] as ExplanationSection[],
    practiceQuestions: [
        // Strings
        {
            question: '1. Differentiate between String and StringBuffer Classes',
            solution: (
                <div className="space-y-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300 border-collapse border border-gray-700">
                            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 border border-gray-700">Feature</th>
                                    <th className="px-6 py-3 border border-gray-700">String</th>
                                    <th className="px-6 py-3 border border-gray-700">StringBuffer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Mutability</td>
                                    <td className="px-6 py-4 border-r border-gray-700">Immutable (cannot be changed once created)</td>
                                    <td className="px-6 py-4">Mutable (can be modified)</td>
                                </tr>
                                <tr className="bg-gray-800 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Performance</td>
                                    <td className="px-6 py-4 border-r border-gray-700">Slower for frequent modifications (creates new objects)</td>
                                    <td className="px-6 py-4">Faster for concatenations and modifications</td>
                                </tr>
                                <tr className="bg-gray-900 border-b border-gray-700">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Storage</td>
                                    <td className="px-6 py-4 border-r border-gray-700">String Constant Pool (usually)</td>
                                    <td className="px-6 py-4">Heap Memory</td>
                                </tr>
                                <tr className="bg-gray-800">
                                    <td className="px-6 py-4 border-r border-gray-700 font-medium text-white">Thread Safety</td>
                                    <td className="px-6 py-4 border-r border-gray-700">Thread-safe (due to immutability)</td>
                                    <td className="px-6 py-4">Thread-safe (Synchronized methods)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p><strong>Example:</strong></p>
                        <CodeBlock code={`public class StringDiff {
    public static void main(String[] args) {
        // String (Immutable)
        String s = "Hello";
        s.concat(" World"); 
        System.out.println(s); // Prints "Hello" because s was not changed

        // StringBuffer (Mutable)
        StringBuffer sb = new StringBuffer("Hello");
        sb.append(" World");
        System.out.println(sb); // Prints "Hello World"
    }
}`} />
                    </div>
                </div>
            ),
        },
        {
            question: '2. Develop a Java Program to Count the Vowels, Consonants and Digits in the Given string',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class CharCounter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a string:");
        String str = sc.nextLine().toLowerCase();

        int vowels = 0, consonants = 0, digits = 0;

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            
            if (ch >= '0' && ch <= '9') {
                digits++;
            } else if (ch >= 'a' && ch <= 'z') {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }

        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
        System.out.println("Digits: " + digits);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a string:<br />
                            Java 21 Programming<br />
                            Vowels: 5<br />
                            Consonants: 10<br />
                            Digits: 2
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> We iterate through the string char by char. We check if <code>ch</code> is a digit using ASCII range (<code>&apos;0&apos;-&apos;9&apos;</code>). If it&apos;s a letter (<code>&apos;a&apos;-&apos;z&apos;</code>), we check if it matches vowels (a,e,i,o,u); otherwise, it is a consonant.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '3. Develop a Java Program to Count the Words in the Given string',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class WordCount {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a string:");
        String str = sc.nextLine();

        if (str == null || str.isEmpty()) {
            System.out.println("Words: 0");
            return;
        }

        // Split by whitespace
        String[] words = str.trim().split("\\\s+");
        
        System.out.println("Number of words: " + words.length);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a string:<br />
                            Java is  fun<br />
                            Number of words: 3
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> The <code>split(&quot;\\\\s+&quot;)</code> method splits the string based on one or more whitespace characters. The length of the resulting array gives the word count. We verify the string is not empty first.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '4. Develop a Java Program to Check the Given string is Palindrome or Not',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class StringPalindrome {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String str = sc.nextLine();

        String reversed = "";
        for (int i = str.length() - 1; i >= 0; i--) {
            reversed += str.charAt(i);
        }

        if (str.equalsIgnoreCase(reversed)) {
            System.out.println(str + " is a Palindrome");
        } else {
            System.out.println(str + " is not a Palindrome");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a string: Madam<br />
                            Madam is a Palindrome
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Reverse the string by iterating backwards and appending characters. Compare the original and reversed strings using <code>equalsIgnoreCase()</code> to ignore case sensitivity.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '5. Develop a Java Program to Convert the Given String From Lower Case to Upper Case and Vice-A-Versa. (Do not Use Pre-Defined Methods)',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class CaseConverter {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        char[] str = sc.nextLine().toCharArray();

        for(int i=0; i<str.length; i++) {
            if(str[i] >= 'a' && str[i] <= 'z') {
                // Convert lower to upper (Subtract 32)
                str[i] = (char) (str[i] - 32);
            } else if(str[i] >= 'A' && str[i] <= 'Z') {
                // Convert upper to lower (Add 32)
                str[i] = (char) (str[i] + 32);
            }
        }

        System.out.println("Converted String: " + new String(str));
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a string: Hello World<br />
                            Converted String: hELLO wORLD
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> ASCII values: &#39;A&#39;=65, &#39;a&#39;=97. The difference is 32. To convert lowercase to uppercase, subtract 32. To convert uppercase to lowercase, add 32. We modify the char array directly.</p>
                    </div>
                </div>
            ),
        },

        // Recursion
        {
            question: '1. Develop a Java Program to Find the Sum of First N Natural Numbers using the Recursion',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`public class RecursiveSum {
    static int sum(int n) {
        if (n == 0) return 0; // Base case
        return n + sum(n - 1); // Recursive call
    }

    public static void main(String[] args) {
        int n = 5;
        System.out.println("Sum of first " + n + " numbers: " + sum(n));
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Sum of first 5 numbers: 15
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Recurrence relation: <code>sum(n) = n + sum(n-1)</code>. Base case: <code>sum(0) = 0</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '2. Develop a Java Program to Find the Sum of the Elements of an Array using the Recursion',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`public class ArraySumRec {
    static int sumArray(int[] arr, int index) {
        if (index == arr.length) return 0; // Base case: end of array
        return arr[index] + sumArray(arr, index + 1);
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        System.out.println("Array Sum: " + sumArray(arr, 0));
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Array Sum: 15
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> <code>sum(index) = arr[index] + sum(index + 1)</code>. We stop when <code>index == arr.length</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '3. Develop a Java Program to Find the Sum of the Digits of a Given Number using the Recursion',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`public class DigitSumRec {
    static int sumDigits(int n) {
        if (n == 0) return 0; // Base case
        return (n % 10) + sumDigits(n / 10);
    }

    public static void main(String[] args) {
        int num = 1234;
        System.out.println("Sum of digits of " + num + ": " + sumDigits(num));
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Sum of digits of 1234: 10
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> <code>sum(n) = lastDigit + sum(restOfNumber)</code>. i.e., <code>(n % 10) + sum(n / 10)</code>. Base case is when <code>n</code> becomes 0.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '4. Develop a Java Program to Find the Factorial Value of the Given Number using the Recursion',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`public class FactorialRec {
    static int factorial(int n) {
        if (n == 0 || n == 1) return 1; // Base case
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        int num = 5;
        System.out.println("Factorial of " + num + ": " + factorial(num));
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Factorial of 5: 120
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> <code>fact(n) = n * fact(n-1)</code>. Base case: <code>fact(0) = 1</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '5. Develop a Java Program to Find the Given Base to the Given Power Value using the Recursion',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`public class PowerRec {
    static int power(int base, int exp) {
        if (exp == 0) return 1; // Base case
        return base * power(base, exp - 1);
    }

    public static void main(String[] args) {
        int base = 2, exp = 3;
        System.out.println(base + "^" + exp + " = " + power(base, exp));
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            2^3 = 8
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> <code>power(base, exp) = base * power(base, exp-1)</code>. Base case: <code>exp = 0</code> returns 1.</p>
                    </div>
                </div>
            ),
        },

        // Bitwise Operators
        {
            question: '1. Develop a Java Program to Swap any two Given Numbers Using Bitwise Operators',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class BitwiseSwap {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a: ");
        int a = sc.nextInt();
        System.out.print("Enter b: ");
        int b = sc.nextInt();

        // XOR Swap Algorithm
        a = a ^ b;
        b = a ^ b;
        a = a ^ b;

        System.out.println("After swapping: a = " + a + ", b = " + b);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a: 5<br />
                            Enter b: 7<br />
                            After swapping: a = 7, b = 5
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> XOR property: <code>x^x = 0</code> and <code>x^0 = x</code>. <br />
                            1. <code>a = a ^ b</code> (a holds mix of a and b)<br />
                            2. <code>b = a ^ b</code> (cancels out original b, leaving original a)<br />
                            3. <code>a = a ^ b</code> (cancels out new b (original a), leaving original b)</p>
                    </div>
                </div>
            ),
        },
        {
            question: '2. Explain about the Different Types of Bitwise Operators with Suitable Examples',
            solution: (
                <div className="space-y-4">
                    <div className="space-y-4 text-gray-300">
                        <p>Java supports several bitwise operators that work directly on binary bits of integers.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h4 className="font-bold text-blue-400 mb-2">1. Bitwise AND (&)</h4>
                                <p className="text-sm mb-2">Returns 1 if both bits are 1.</p>
                                <pre className="text-xs font-mono bg-black/30 p-2 rounded">
                                    5 (0101) & 3 (0011) = 1 (0001)
                                </pre>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h4 className="font-bold text-blue-400 mb-2">2. Bitwise OR (|)</h4>
                                <p className="text-sm mb-2">Returns 1 if at least one bit is 1.</p>
                                <pre className="text-xs font-mono bg-black/30 p-2 rounded">
                                    5 (0101) | 3 (0011) = 7 (0111)
                                </pre>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h4 className="font-bold text-blue-400 mb-2">3. Bitwise XOR (^)</h4>
                                <p className="text-sm mb-2">Returns 1 if bits are different.</p>
                                <pre className="text-xs font-mono bg-black/30 p-2 rounded">
                                    5 (0101) ^ 3 (0011) = 6 (0110)
                                </pre>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h4 className="font-bold text-blue-400 mb-2">4. Bitwise Complement (~)</h4>
                                <p className="text-sm mb-2">Inverts all bits.</p>
                                <pre className="text-xs font-mono bg-black/30 p-2 rounded">
                                    ~5 (000...0101) = -6 (111...1010)
                                </pre>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h4 className="font-bold text-blue-400 mb-2">5. Left Shift (&lt;&lt;)</h4>
                                <p className="text-sm mb-2">Shifts bits left (Multiplies by 2^n).</p>
                                <pre className="text-xs font-mono bg-black/30 p-2 rounded">
                                    5 &lt;&lt; 1 = 10 (1010)
                                </pre>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h4 className="font-bold text-blue-400 mb-2">6. Right Shift (&gt;&gt;)</h4>
                                <p className="text-sm mb-2">Shifts bits right (Divides by 2^n).</p>
                                <pre className="text-xs font-mono bg-black/30 p-2 rounded">
                                    5 &gt;&gt; 1 = 2 (0010)
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ] as PracticeQuestion[]
}

export default function Page() {
    return <DMTopicPage content={content} subjectName="Java" subjectHref="/subjects/java" />
}
