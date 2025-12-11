'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import {
    FiPlus,
    FiArrowRight,
    FiCheckCircle,
    FiArrowUp,
    FiCode,
    FiBook,
    FiCpu
} from 'react-icons/fi'

const content = {
    title: 'Operators',
    explanationSections: [
        {
            title: 'Introduction: The Verbs of Programming',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        If variables are the <span className="text-blue-400 font-bold">nouns</span> (data) of a program, then operators are the <span className="text-cyan-400 font-bold">verbs</span> (actions).
                        They allow us to manipulate data, make decisions, and perform calculations.
                    </p>
                    <p>
                        Imagine a toolbox:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                        <li><strong>Arithmetic Tools:</strong> Hammer and saw for building (Calculations like +, -)</li>
                        <li><strong>Measuring Tools:</strong> Tape measure for comparing (Relations like &lt;, &gt;)</li>
                        <li><strong>Logic Tools:</strong> Blueprints for decision making (Logic like &&, ||)</li>
                    </ul>
                </div>
            )
        },
        {
            title: 'Arithmetic Operators',
            icon: <FiPlus className="w-6 h-6" />,
            content: `Perform mathematical operations on numeric values.

Operators:
→ <span className="text-blue-400 font-semibold">+</span> (addition) - Adds two values
→ <span className="text-blue-400 font-semibold">-</span> (subtraction) - Subtracts second value from first
→ <span className="text-blue-400 font-semibold">*</span> (multiplication) - Multiplies two values
→ <span className="text-blue-400 font-semibold">/</span> (division) - Divides first value by second
→ <span className="text-blue-400 font-semibold">%</span> (modulus) - Returns remainder after division

<span className="text-amber-300">Note:</span> These operators work with integers, floating-point numbers, and can be used in expressions.`,
            code: `public class ArithmeticOperators {
    public static void main(String[] args) {
        int a = 10, b = 3;
        
        System.out.println("a + b = " + (a + b));  // 13
        System.out.println("a - b = " + (a - b));  // 7
        System.out.println("a * b = " + (a * b));  // 30
        System.out.println("a / b = " + (a / b));  // 3 (Integer division)
        System.out.println("a % b = " + (a % b));  // 1 (Remainder)
    }
}`,
        },
        {
            title: 'Relational Operators',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: `Compare two values and return a <span className="text-cyan-300">boolean</span> result (<span className="text-cyan-300">true</span> or <span className="text-cyan-300">false</span>).

Operators:
→ <span className="text-blue-400 font-semibold">==</span> (equal to) - Checks if two values are equal
→ <span className="text-blue-400 font-semibold">!=</span> (not equal to) - Checks if two values are not equal
→ <span className="text-blue-400 font-semibold">&gt;</span> (greater than) - Checks if first value is greater
→ <span className="text-blue-400 font-semibold">&lt;</span> (less than) - Checks if first value is smaller
→ <span className="text-blue-400 font-semibold">&gt;=</span> (greater/equal) - Checks if first value is greater or equal
→ <span className="text-blue-400 font-semibold">&lt;=</span> (less/equal) - Checks if first value is smaller or equal

<span className="text-amber-300">Used in:</span> Conditional statements and loops to make decisions.`,
            code: `public class RelationalOperators {
    public static void main(String[] args) {
        int a = 10, b = 5;
        
        System.out.println("a > b: " + (a > b));    // true
        System.out.println("a < b: " + (a < b));    // false
        System.out.println("a == b: " + (a == b));  // false
    }
}`,
        },
        {
            title: 'Logical Operators',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: `Combine or negate <span className="text-cyan-300">boolean</span> expressions.

Operators:
→ <span className="text-blue-400 font-semibold">&&</span> (logical AND) - Returns <span className="text-cyan-300">true</span> only if **both** conditions are <span className="text-cyan-300">true</span>
→ <span className="text-blue-400 font-semibold">||</span> (logical OR) - Returns <span className="text-cyan-300">true</span> if **at least one** condition is <span className="text-cyan-300">true</span>
→ <span className="text-blue-400 font-semibold">!</span> (logical NOT) - Reverses the boolean value

<span className="text-amber-300">Essential for:</span> Complex conditional logic and decision-making in programs.`,
            code: `public class LogicalOperators {
    public static void main(String[] args) {
        boolean hasLicense = true;
        boolean hasCar = false;
        
        // Logical AND
        if (hasLicense && hasCar) {
            System.out.println("Can drive");
        } else {
            System.out.println("Cannot drive"); // This prints
        }
        
        // Logical OR
        if (hasLicense || hasCar) {
             System.out.println("Has at least one requirement"); // This prints
        }
    }
}`,
        },
        {
            title: 'Ternary Operator',
            icon: <FiBook className="w-6 h-6" />,
            content: `A shorthand for <span className="text-cyan-300">if-else</span> statements that returns a value.

Syntax:
→ <span className="text-blue-400 font-semibold">condition ? valueIfTrue : valueIfFalse</span>

The ternary operator evaluates the condition:
→ If <span className="text-cyan-300">true</span>, returns <span className="text-cyan-300">valueIfTrue</span>
→ If <span className="text-cyan-300">false</span>, returns <span className="text-cyan-300">valueIfFalse</span>`,
            code: `public class TernaryOperator {
    public static void main(String[] args) {
        int age = 18;
        String status = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Status: " + status);
    }
}`,
        },
        {
            title: 'Operator Precedence',
            icon: <FiArrowUp className="w-6 h-6" />,
            content: `The order in which operators are evaluated. Like BODMAS in math.

1. <span className="text-blue-400">()</span> Parentheses
2. <span className="text-blue-400">++, --, !</span> (Unary)
3. <span className="text-blue-400">*, /, %</span> (Multiplicative)
4. <span className="text-blue-400">+, -</span> (Additive)
5. <span className="text-blue-400">&gt;, &lt;, &gt;=, &lt;=</span> (Relational)
6. <span className="text-blue-400">==, !=</span> (Equality)
7. <span className="text-blue-400">&&</span> (Logical AND)
8. <span className="text-blue-400">||</span> (Logical OR)
9. <span className="text-blue-400">=</span> (Assignment)

<span className="text-amber-300">Tip:</span> When in doubt, use parentheses to ensure correct order!`,
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Calculate Simple Interest',
            solution: 'Simple Interest = (Principal * Rate * Time) / 100.',
            steps: [
                {
                    step: '1. Input Variables',
                    explanation: 'Define principal (P), rate (R), and time (T) as double or float.'
                },
                {
                    step: '2. Apply Formula',
                    explanation: (
                        <div className="font-mono text-sm">
                            double p = 10000; <br />
                            double r = 5.5; <br />
                            double t = 2; <br />
                            double interest = (p * r * t) / 100;
                        </div>
                    )
                },
                {
                    step: '3. Output',
                    explanation: 'System.out.println("Interest: " + interest);'
                }
            ]
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Write a program to check whether a number is positive or negative using relational operators.',
            solution: 'Use relational operators to compare the number with 0. If num > 0, it\'s positive; otherwise, it\'s negative.',
            solutionCode: `public class PositiveNegative {
    public static void main(String[] args) {
        int num = -5;
        
        if (num > 0) {
            System.out.println("Positive");
        } else {
            System.out.println("Negative");
        }
    }
}`,
        },
        {
            question: 'Leap Year Checker',
            solution: 'A year is a leap year if it is divisible by 4 AND (not divisible by 100 OR divisible by 400).',
            solutionCode: `public class LeapYear {
    public static void main(String[] args) {
        int year = 2024;
        
        // Logic: (divisible by 4 AND not 100) OR (divisible by 400)
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            System.out.println(year + " is a Leap Year");
        } else {
            System.out.println(year + " is NOT a Leap Year");
        }
    }
}`
        }
    ] as PracticeQuestion[],
}

export default function OperatorsPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
