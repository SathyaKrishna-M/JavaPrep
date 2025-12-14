'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DMTopicPage'
import { FiList } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Important Questions (CO1)',
    explanationSections: [
        {
            title: 'CO1 Important Practice Questions',
            icon: <FiList className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        This section contains a curated list of <span className="text-blue-400 font-semibold">19 Important Questions</span> covering the fundamentals of Java (CO1).
                        These questions range from basic arithmetic and conditional logic to loops and pattern printing.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Basic Inputs & Arithmetic</li>
                            <li>Conditional Statements (if-else, switch)</li>
                            <li>Looping Constructs (for, while)</li>
                            <li>Number Theory (Prime, Perfect, Armstrong)</li>
                            <li>Pattern Printing</li>
                        </ul>
                    </div>
                </div>
            ),
        }
    ] as ExplanationSection[],
    practiceQuestions: [
        {
            question: '1. Develop a Java Program to check the Given Number is Even or Odd',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class EvenOdd {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        if (num % 2 == 0) {
            System.out.println(num + " is Even");
        } else {
            System.out.println(num + " is Odd");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a number: 10<br />
                            10 is Even
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> A number is even if it is perfectly divisible by 2 (remainder is 0). Otherwise, it is odd. We use the modulo operator <code>%</code> to find the remainder.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '2. Develop a Java Program to Implement Simple Arithmetic Calculator using Switch-Case',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double num1 = sc.nextDouble();

        System.out.print("Enter second number: ");
        double num2 = sc.nextDouble();

        System.out.print("Enter operator (+, -, *, /): ");
        char operator = sc.next().charAt(0);

        double result = 0;

        switch (operator) {
            case '+':
                result = num1 + num2;
                System.out.println("Result: " + result);
                break;
            case '-':
                result = num1 - num2;
                System.out.println("Result: " + result);
                break;
            case '*':
                result = num1 * num2;
                System.out.println("Result: " + result);
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                    System.out.println("Result: " + result);
                } else {
                    System.out.println("Error: Division by zero");
                }
                break;
            default:
                System.out.println("Invalid Operator");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter first number: 10<br />
                            Enter second number: 5<br />
                            Enter operator (+, -, *, /): *<br />
                            Result: 50.0
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> We take two operands and one operator char as input. A <code>switch</code> statement checks the operator and executes the corresponding case (Add, Subtract, Multiply, Divide).</p>
                    </div>
                </div>
            ),
        },
        {
            question: '3. Develop a Java Program to check the Given Year is Leap Year or Not',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class LeapYear {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a year: ");
        int year = sc.nextInt();

        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            System.out.println(year + " is a Leap Year");
        } else {
            System.out.println(year + " is not a Leap Year");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a year: 2024<br />
                            2024 is a Leap Year
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> A year is a leap year if:</p>
                        <ul className="list-disc list-inside text-gray-400 ml-2">
                            <li>It is divisible by 4 AND NOT divisible by 100, OR</li>
                            <li>It is divisible by 400.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            question: '4. Develop a Java Program to Check the Given Number is Positive or Negative',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class PositiveNegative {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        if (num > 0) {
            System.out.println("Positive Number");
        } else if (num < 0) {
            System.out.println("Negative Number");
        } else {
            System.out.println("The number is Zero");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a number: -5<br />
                            Negative Number
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> We use an <code>if-else if</code> ladder. If number &gt; 0, it is Positive. If number &lt; 0, it is Negative. Else, it is Zero.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '5. Develop a Java program to find Total Surface area of a Cylinder for the given radius and height as input.(total surface area = 2*3.14*r*r*h)',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class CylinderArea {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter radius (r): ");
        double r = sc.nextDouble();
        
        System.out.print("Enter height (h): ");
        double h = sc.nextDouble();

        // Formula given: 2 * 3.14 * r * r * h
        double area = 2 * 3.14 * r * r * h;

        System.out.println("Total Surface Area: " + area);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter radius (r): 5<br />
                            Enter height (h): 10<br />
                            Total Surface Area: 1570.0
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> The problem provides the formula: <code>Area = 2 * 3.14 * r * r * h</code>. We take <code>r</code> (radius) and <code>h</code> (height) as <code>double</code> inputs and applying the formula.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '6. Develop a Java program to swap the Given 2 integers using 3rd Variable and without using 3rd Variable',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class SwapNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter first number (a): ");
        int a = sc.nextInt();
        System.out.print("Enter second number (b): ");
        int b = sc.nextInt();
        
        // Method 1: Using 3rd Variable
        int temp = a;
        int a1 = b;
        int b1 = temp;
        System.out.println("After swapping (with temp): a = " + a1 + ", b = " + b1);

        // Method 2: Without 3rd Variable
        a = a + b;
        b = a - b;
        a = a - b;
        System.out.println("After swapping (without temp): a = " + a + ", b = " + b);
        
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter first number (a): 10<br />
                            Enter second number (b): 20<br />
                            After swapping (with temp): a = 20, b = 10<br />
                            After swapping (without temp): a = 20, b = 10
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong></p>
                        <ul className="list-disc list-inside text-gray-400 ml-2">
                            <li><strong>With temp:</strong> Store <code>a</code> in <code>temp</code>, assign <code>b</code> to <code>a</code>, then assign <code>temp</code> to <code>b</code>.</li>
                            <li><strong>Without temp:</strong> Use arithmetic tricks: <code>a = a + b</code> (sum), <code>b = a - b</code> (original a), <code>a = a - b</code> (original b).</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            question: '7. Develop a Java Program to Print the Greatest Number of the Given Two Numbers',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class GreatestNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two numbers: ");
        int num1 = sc.nextInt();
        int num2 = sc.nextInt();

        if (num1 > num2) {
            System.out.println(num1 + " is greater");
        } else if (num2 > num1) {
            System.out.println(num2 + " is greater");
        } else {
            System.out.println("Both numbers are equal");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter two numbers: 15 25<br />
                            25 is greater
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Compare the two numbers using <code>if (num1 &gt; num2)</code>. If true, num1 is greatest. If <code>num2 &gt; num1</code>, num2 is greatest. Otherwise, they are equal.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '8. Develop a Java Program to Find the Area and Perimeter of a Circle, Accept Radius value from the user, use Pi=3.14',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class CircleProperties {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter radius: ");
        double r = sc.nextDouble();

        double pi = 3.14;
        double area = pi * r * r;
        double perimeter = 2 * pi * r;

        System.out.println("Area: " + area);
        System.out.println("Perimeter: " + perimeter);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter radius: 7<br />
                            Area: 153.86<br />
                            Perimeter: 43.96
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Formulas:</p>
                        <ul className="list-disc list-inside text-gray-400 ml-2">
                            <li>Area = <code>3.14 * r * r</code></li>
                            <li>Perimeter = <code>2 * 3.14 * r</code></li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            question: '9. Develop a Java Program to Find the Area and Perimeter of a Rectangle, Accept L and B values from the user, use Area=L*B and Perimeter=2*(L+B)',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class RectangleProperties {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Length (L): ");
        double L = sc.nextDouble();
        System.out.print("Enter Breadth (B): ");
        double B = sc.nextDouble();

        double area = L * B;
        double perimeter = 2 * (L + B);

        System.out.println("Area: " + area);
        System.out.println("Perimeter: " + perimeter);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter Length (L): 10<br />
                            Enter Breadth (B): 5<br />
                            Area: 50.0<br />
                            Perimeter: 30.0
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Direct application of geometric formulas using inputs for length (L) and breadth (B).</p>
                    </div>
                </div>
            ),
        },
        {
            question: '10. Develop a Java Program to Find the Sum of First N Natural Numbers using For Loop',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class SumNatural {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter N: ");
        int n = sc.nextInt();

        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }

        System.out.println("Sum of first " + n + " natural numbers: " + sum);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter N: 10<br />
                            Sum of first 10 natural numbers: 55
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Initialize <code>sum = 0</code>. Run a loop from <code>i = 1</code> to <code>N</code>. In each iteration, add <code>i</code> to <code>sum</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '11. Develop a Java Program to find the Given Number is Perfect Number or not',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class PerfectNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        int sum = 0;
        for (int i = 1; i < num; i++) {
            if (num % i == 0) {
                sum += i;
            }
        }

        if (sum == num && num > 0) {
            System.out.println(num + " is a Perfect Number");
        } else {
            System.out.println(num + " is not a Perfect Number");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a number: 28<br />
                            28 is a Perfect Number
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> A Perfect Number equates to the sum of its proper divisors. We loop from 1 to <code>num/2</code>, check divisibility, and sum the factors. If sum equals the original number, it is Perfect.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '12. Develop a Java Program to find the Sum of the Digits of the Given Number',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class SumDigits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        int sum = 0;
        int temp = num;
        while (temp != 0) {
            sum += temp % 10;
            temp /= 10;
        }

        System.out.println("Sum of digits of " + num + " is: " + sum);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a number: 1234<br />
                            Sum of digits of 1234 is: 10
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Use a loop to process the number digit by digit until it becomes 0:</p>
                        <ul className="list-decimal list-inside text-gray-400 ml-2">
                            <li>Get last digit using <code>num % 10</code>.</li>
                            <li>Add to sum.</li>
                            <li>Remove last digit using <code>num / 10</code>.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            question: '13. Develop a Java Program to find the First Number to the Power of Second Number using a Loop. (Do not use Math.Pow)',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class PowerCalculation {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter base: ");
        int base = sc.nextInt();
        System.out.print("Enter exponent: ");
        int exponent = sc.nextInt();

        long result = 1;
        for (int i = 1; i <= exponent; i++) {
            result *= base;
        }

        System.out.println(base + "^" + exponent + " = " + result);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter base: 2<br />
                            Enter exponent: 5<br />
                            2^5 = 32
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> To find base^exponent, we start with result = 1. We multiply result by the base <code>exponent</code> times using a loop.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '14. Develop a Java Program to find Reverse Number of the Given Number',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class ReverseNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        int reversed = 0;
        while (num != 0) {
            int digit = num % 10;
            reversed = reversed * 10 + digit;
            num /= 10;
        }

        System.out.println("Reversed Number: " + reversed);
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a number: 54321<br />
                            Reversed Number: 12345
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Extract digits using <code>% 10</code>. Reconstruct the reverse number by: <code>reversed = reversed * 10 + digit</code>. This shifts existing digits to the left and adds the new digit.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '15. Develop a Java Program to find the Given number is Palindrome or not',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class PalindromeCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        int original = num;
        int reversed = 0;
        while (num != 0) {
            int digit = num % 10;
            reversed = reversed * 10 + digit;
            num /= 10;
        }

        if (original == reversed) {
            System.out.println(original + " is a Palindrome");
        } else {
            System.out.println(original + " is not a Palindrome");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a number: 121<br />
                            121 is a Palindrome
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> A Palindrome is a number that reads the same backward as forward. We calculate the reverse of the number and check if <code>original == reverse</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '16. Develop a Java Program to find the Given Number is Prime Number or not',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class PrimeCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        int count = 0;
        for (int i = 1; i <= num; i++) {
            if (num % i == 0) {
                count++;
            }
        }

        if (count == 2) {
            System.out.println(num + " is a Prime Number");
        } else {
            System.out.println(num + " is not a Prime Number");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a number: 17<br />
                            17 is a Prime Number
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> A Prime number has exactly two factors: 1 and itself. We count the number of divisors from 1 to N. If count is 2, it is Prime.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '17. Develop a Java Program to find the Given Number is Armstrong Number or not',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class ArmstrongCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        int original = num;
        int sum = 0;

        while (num > 0) {
            int digit = num % 10;
            sum += digit * digit * digit;
            num /= 10;
        }

        if (sum == original) {
            System.out.println(original + " is an Armstrong Number");
        } else {
            System.out.println(original + " is not an Armstrong Number");
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter a number: 153<br />
                            153 is an Armstrong Number
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> An Armstrong number (assuming 3 digits) is a number equal to the sum of the cubes of its digits (e.g., 153 = 1³ + 5³ + 3³). We isolate digits, cube them, and sum them up.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '18. Develop a Java Program to print the Fibonacci series up to the given N Values',
            solution: (
                <div className="space-y-4">
                    <CodeBlock code={`import java.util.Scanner;

public class Fibonacci {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter N (number of terms): ");
        int n = sc.nextInt();

        int first = 0, second = 1;
        
        System.out.print("Fibonacci Series: ");
        for (int i = 1; i <= n; i++) {
            System.out.print(first + " ");
            int next = first + second;
            first = second;
            second = next;
        }
        sc.close();
    }
}`} />
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                        <p className="text-sm font-mono text-gray-300"><strong>Output:</strong></p>
                        <pre className="text-green-400 font-mono text-sm mt-1">
                            Enter N (number of terms): 7<br />
                            Fibonacci Series: 0 1 1 2 3 5 8
                        </pre>
                    </div>
                    <div>
                        <p><strong>Logic:</strong> Fibonacci series starts with 0 and 1. The next term is the sum of the previous two. We update variables: <code>first = second</code>, <code>second = next</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            question: '19. Develop a Java Program to Print the Following Patterns for the Given N Rows',
            solution: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Pattern printing involves nested loops. The outer loop typically controls the rows (i), and the inner loop controls the columns (j) for printing data or spaces.
                    </p>

                    {/* Pattern 1 */}
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">Pattern 1: Right-Angled Number Triangle</h4>
                        <CodeBlock code={`public class Pattern1 {
    public static void main(String[] args) {
        int n = 5;
        for(int i=1; i<=n; i++) {
            for(int j=1; j<=i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`} />
                        <div className="mt-3 bg-black/30 p-3 rounded border border-white/10">
                            <p className="text-xs font-mono text-gray-300 mb-1">Output (N=5):</p>
                            <pre className="text-green-400 font-mono text-xs">
                                1 <br />
                                1 2 <br />
                                1 2 3 <br />
                                1 2 3 4 <br />
                                1 2 3 4 5
                            </pre>
                        </div>
                    </div>

                    {/* Pattern 2 */}
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">Pattern 2: Alphabet Triangle</h4>
                        <CodeBlock code={`public class Pattern2 {
    public static void main(String[] args) {
        int n = 5;
        for(int i=1; i<=n; i++) {
            char ch = 'A';
            for(int j=1; j<=i; j++) {
                System.out.print(ch + " ");
                ch++;
            }
            System.out.println();
        }
    }
}`} />
                        <div className="mt-3 bg-black/30 p-3 rounded border border-white/10">
                            <p className="text-xs font-mono text-gray-300 mb-1">Output (N=5):</p>
                            <pre className="text-green-400 font-mono text-xs">
                                A <br />
                                A B <br />
                                A B C <br />
                                A B C D <br />
                                A B C D E
                            </pre>
                        </div>
                    </div>

                    {/* Pattern 3 */}
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">Pattern 3: Floyd's Triangle</h4>
                        <CodeBlock code={`public class Pattern3 {
    public static void main(String[] args) {
        int n = 5;
        int count = 1;
        for(int i=1; i<=n; i++) {
            for(int j=1; j<=i; j++) {
                System.out.print(count + " ");
                count++;
            }
            System.out.println();
        }
    }
}`} />
                        <div className="mt-3 bg-black/30 p-3 rounded border border-white/10">
                            <p className="text-xs font-mono text-gray-300 mb-1">Output (N=4):</p>
                            <pre className="text-green-400 font-mono text-xs">
                                1 <br />
                                2 3 <br />
                                4 5 6 <br />
                                7 8 9 10
                            </pre>
                        </div>
                    </div>

                    {/* Pattern 4 */}
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">Pattern 4: Repeated Number Row</h4>
                        <CodeBlock code={`public class Pattern4 {
    public static void main(String[] args) {
        int n = 5;
        for(int i=1; i<=n; i++) {
            for(int j=1; j<=i; j++) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }
}`} />
                        <div className="mt-3 bg-black/30 p-3 rounded border border-white/10">
                            <p className="text-xs font-mono text-gray-300 mb-1">Output (N=5):</p>
                            <pre className="text-green-400 font-mono text-xs">
                                1 <br />
                                2 2 <br />
                                3 3 3 <br />
                                4 4 4 4 <br />
                                5 5 5 5 5
                            </pre>
                        </div>
                    </div>

                    {/* Pattern 5 */}
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">Pattern 5: Star Triangle</h4>
                        <CodeBlock code={`public class Pattern5 {
    public static void main(String[] args) {
        int n = 5;
        for(int i=1; i<=n; i++) {
            for(int j=1; j<=i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`} />
                        <div className="mt-3 bg-black/30 p-3 rounded border border-white/10">
                            <p className="text-xs font-mono text-gray-300 mb-1">Output (N=5):</p>
                            <pre className="text-green-400 font-mono text-xs">
                                * <br />
                                * * <br />
                                * * * <br />
                                * * * * <br />
                                * * * * *
                            </pre>
                        </div>
                    </div>

                    {/* Pattern 6: Right-Aligned Number Triangle */}
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">Pattern 6: Right-Aligned Number Triangle</h4>
                        <CodeBlock code={`public class Pattern6 {
    public static void main(String[] args) {
        int n = 5;
        for(int i=1; i<=n; i++) {
            // Print leading spaces
            for(int s=1; s<=n-i; s++) {
                System.out.print("  "); // Double space to align with single digit + space
            }
            // Print numbers
            for(int j=1; j<=i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`} />
                        <div className="mt-3 bg-black/30 p-3 rounded border border-white/10">
                            <p className="text-xs font-mono text-gray-300 mb-1">Output (N=5):</p>
                            <pre className="text-green-400 font-mono text-xs">
                                {`        1
      1 2
    1 2 3
  1 2 3 4
1 2 3 4 5`}
                            </pre>
                        </div>
                    </div>

                    {/* Pattern 7: Right-Aligned Star Triangle */}
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">Pattern 7: Right-Aligned Star Triangle</h4>
                        <CodeBlock code={`public class Pattern7 {
    public static void main(String[] args) {
        int n = 5;
        for(int i=1; i<=n; i++) {
            // Print leading spaces
            for(int s=1; s<=n-i; s++) {
                System.out.print("  ");
            }
            // Print stars
            for(int j=1; j<=i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`} />
                        <div className="mt-3 bg-black/30 p-3 rounded border border-white/10">
                            <p className="text-xs font-mono text-gray-300 mb-1">Output (N=5):</p>
                            <pre className="text-green-400 font-mono text-xs">
                                {`        *
      * *
    * * *
  * * * *
* * * * *`}
                            </pre>
                        </div>
                    </div>

                    {/* Pattern 8: Right-Aligned Alphabet Triangle */}
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">Pattern 8: Right-Aligned Alphabet Triangle</h4>
                        <CodeBlock code={`public class Pattern8 {
    public static void main(String[] args) {
        int n = 5;
        for(int i=1; i<=n; i++) {
            // Print leading spaces
            for(int s=1; s<=n-i; s++) {
                System.out.print("  ");
            }
            // Print alphabets
            char ch = 'A';
            for(int j=1; j<=i; j++) {
                System.out.print(ch + " ");
                ch++;
            }
            System.out.println();
        }
    }
}`} />
                        <div className="mt-3 bg-black/30 p-3 rounded border border-white/10">
                            <p className="text-xs font-mono text-gray-300 mb-1">Output (N=5):</p>
                            <pre className="text-green-400 font-mono text-xs">
                                {`        A
      A B
    A B C
  A B C D
A B C D E`}
                            </pre>
                        </div>
                    </div>



                </div>
            ),
        }
    ] as PracticeQuestion[]
}

export default function Page() {
    return <DMTopicPage content={content} subjectName="Java" subjectHref="/subjects/java" />
}
