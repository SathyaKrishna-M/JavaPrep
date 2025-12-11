'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiCheckCircle, FiArrowRight, FiLayers, FiCode, FiGitBranch } from 'react-icons/fi'

const content = {
    title: 'Conditionals',
    explanationSections: [
        {
            title: 'Introduction: The Crossroads',
            icon: <FiGitBranch className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Conditionals</span> allow your program to make decisions.
                        Think of your code as a <span className="text-cyan-400 font-bold">driver on a road</span>.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">Straight Road (No Condition):</span> Execute lines one by one.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Fork in the Road (if-else):</span> If the sign says &quot;Construction Ahead&quot; (True), take the detour. Else (False), keep going straight.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">Roundabout (Switch):</span> Take exit 1, exit 2, or exit 3 depending on your destination.
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'if Statement',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: `The <span className="text-blue-400 font-semibold">if</span> statement executes a code block if the condition is <span className="text-cyan-300">true</span>.

Syntax:
→ <span className="text-cyan-300">if (condition) { ... }</span>

Key Points:
→ Condition must evaluate to <span className="text-cyan-300">boolean</span> (<span className="text-cyan-300">true</span> or <span className="text-cyan-300">false</span>)
→ Use <span className="text-cyan-300">{}</span> for multiple statements
→ Optional for single statement

<span className="text-amber-300">Use when:</span> You need to execute code only when a condition is true.`,
            code: `public class IfStatement {
    public static void main(String[] args) {
        int age = 18;
        
        if (age >= 18) {
            System.out.println("You are an adult");
        }
    }
}`,
        },
        {
            title: 'if-else Statement',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: `The <span className="text-blue-400 font-semibold">if-else</span> statement executes one block if condition is <span className="text-cyan-300">true</span>, another if <span className="text-cyan-300">false</span>.

Syntax:
→ <span className="text-cyan-300">if (condition) { ... } else { ... }</span>

Key Points:
→ Always executes one of the two blocks
→ <span className="text-cyan-300">else</span> block executes when condition is <span className="text-cyan-300">false</span>
→ Useful for binary decisions

<span className="text-amber-300">Use when:</span> You need to handle both true and false cases.`,
            code: `public class IfElse {
    public static void main(String[] args) {
        int num = 5;
        
        if (num % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
    }
}`,
        },
        {
            title: 'if-else-if Ladder',
            icon: <FiLayers className="w-6 h-6" />,
            content: `The <span className="text-blue-400 font-semibold">if-else-if</span> ladder checks multiple conditions in sequence.

Syntax:
→ <span className="text-cyan-300">if (condition1) { ... } else if (condition2) { ... } else { ... }</span>

Key Points:
→ Conditions are checked <span className="text-amber-300">top to bottom</span>
→ First <span className="text-cyan-300">true</span> condition executes its block
→ <span className="text-cyan-300">else</span> block is optional
→ Only one block executes

<span className="text-amber-300">Use when:</span> You have multiple mutually exclusive conditions.`,
            code: `public class IfElseIf {
    public static void main(String[] args) {
        int score = 85;
        
        if (score >= 90) {
            System.out.println("Grade A");
        } else if (score >= 80) {
            System.out.println("Grade B");
        } else if (score >= 70) {
            System.out.println("Grade C");
        } else {
            System.out.println("Grade F");
        }
    }
}`,
        },
        {
            title: 'Nested if',
            icon: <FiLayers className="w-6 h-6" />,
            content: `<span className="text-blue-400 font-semibold">Nested if</span> statements are if statements inside other if statements.

Key Points:
→ Allows checking multiple conditions in sequence
→ Inner <span className="text-cyan-300">if</span> executes only if outer <span className="text-cyan-300">if</span> is <span className="text-cyan-300">true</span>
→ Can nest multiple levels deep
→ Useful for complex decision trees

<span className="text-amber-300">Use when:</span> You need to check conditions that depend on previous conditions.`,
            code: `public class NestedIf {
    public static void main(String[] args) {
        int age = 20;
        boolean hasLicense = true;
        
        if (age >= 18) {
            if (hasLicense) {
                System.out.println("You can drive");
            } else {
                System.out.println("Get a license first");
            }
        } else {
            System.out.println("Too young to drive");
        }
    }
}`,
        },
        {
            title: 'switch Statement',
            icon: <FiCode className="w-6 h-6" />,
            content: `The <span className="text-blue-400 font-semibold">switch</span> statement is an alternative to if-else-if for multiple conditions.

Syntax:
→ <span className="text-cyan-300">switch (variable) { case value1: ... break; default: ... }</span>

Key Points:
→ Compares variable against multiple <span className="text-cyan-300">case</span> values
→ Use <span className="text-cyan-300">break</span> to prevent fall-through
→ <span className="text-cyan-300">default</span> case is optional but recommended
→ Can use <span className="text-cyan-300">String</span> (Java 7+), <span className="text-cyan-300">int</span>, <span className="text-cyan-300">char</span>, etc.

<span className="text-amber-300">Use when:</span> You have multiple values to compare against a single variable.`,
            code: `public class SwitchStatement {
    public static void main(String[] args) {
        int day = 3;
        
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}`,
        },
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Grade Classification System',
            solution: 'Determine the grade based on a score using an if-else-if ladder.',
            steps: [
                {
                    step: '1. Understand the Logic',
                    explanation: 'We evaluate conditions in order. Once a condition is met, we assign the grade and skip the rest.'
                },
                {
                    step: '2. Implementation',
                    explanation: (
                        <div className="font-mono text-sm">
                            int score = 85;<br />
                            char grade;<br /><br />

                            if (score &gt;= 90) grade = &apos;A&apos;; <br />
                            else if (score &gt;= 80) grade = &apos;B&apos;; // This runs (85 &gt;= 80)<br />
                            else if (score &gt;= 70) grade = &apos;C&apos;;<br />
                            else grade = &apos;F&apos;;
                        </div>
                    )
                }
            ],
            code: `public class GradingSystem {
    public static void main(String[] args) {
        int score = 85;
        char grade;
        
        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 70) {
            grade = 'C';
        } else {
            grade = 'F';
        }
        
        System.out.println("Score: " + score);
        System.out.println("Grade: " + grade);
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Write a program to check if a year is a leap year.',
            solution: 'A year is a leap year if it is divisible by 4, but not by 100, OR if it is divisible by 400.',
            solutionCode: `public class LeapYear {
    public static void main(String[] args) {
        int year = 2024;
        
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            System.out.println(year + " is a leap year");
        } else {
            System.out.println(year + " is not a leap year");
        }
    }
}`,
        },
        {
            question: 'Write a program to find the largest of three numbers.',
            solution: 'Use nested if-else or an if-else-if ladder to compare three integers.',
            solutionCode: `public class MaxOfThree {
    public static void main(String[] args) {
        int a = 10, b = 25, c = 15;
        
        if (a >= b && a >= c) {
            System.out.println(a + " is the largest");
        } else if (b >= a && b >= c) {
            System.out.println(b + " is the largest");
        } else {
            System.out.println(c + " is the largest");
        }
    }
}`
        },
        {
            question: 'Check if a character is a Vowel or Consonant using switch.',
            solution: 'Use a switch statement to check for a, e, i, o, u (both cases).',
            solutionCode: `public class VowelCheck {
    public static void main(String[] args) {
        char ch = 'e';
        
        switch (Character.toLowerCase(ch)) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                System.out.println(ch + " is a vowel");
                break;
            default:
                System.out.println(ch + " is a consonant");
        }
    }
}`
        }
    ] as PracticeQuestion[],
    dryRunCode: `public class Conditionals {
    public static void main(String[] args) {
        int score = 85;
        char grade;
        
        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else {
            grade = 'F';
        }
        
        System.out.println("Score: " + score);
        System.out.println("Grade: " + grade);
    }
}`,
    dryRunSteps: [
        {
            line: 3,
            vars: { score: 85 },
            output: '',
            description: 'Initializing score variable',
        },
        {
            line: 4,
            vars: { score: 85, grade: undefined },
            output: '',
            description: 'Declaring grade variable',
        },
        {
            line: 6,
            vars: { score: 85, grade: undefined },
            output: '',
            conditionResult: false,
            description: 'Checking if score >= 90 (85 >= 90 is false)',
        },
        {
            line: 8, // Corrected line number for 'else if'
            vars: { score: 85, grade: undefined },
            output: '',
            conditionResult: true,
            description: 'Checking if score >= 80 (85 >= 80 is true)',
        },
        {
            line: 9,
            vars: { score: 85, grade: 'B' },
            output: '',
            description: 'Assigning grade = B',
        },
        {
            line: 13, // Adjusted line number for output
            vars: { score: 85, grade: 'B' },
            output: 'Score: 85\\n',
            description: 'Displaying score',
        },
        {
            line: 14,
            vars: { score: 85, grade: 'B' },
            output: 'Score: 85\\nGrade: B\\n',
            description: 'Displaying grade',
        }
    ] as DryRunStep[],
}

export default function ConditionalsPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
