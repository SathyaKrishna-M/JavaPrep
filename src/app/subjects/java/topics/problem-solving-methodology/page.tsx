'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiTarget, FiCode, FiLayers, FiCoffee, FiCheckSquare, FiAlertCircle } from 'react-icons/fi'

const content = {
    title: 'Problem-Solving Methodology',
    explanationSections: [
        {
            title: 'Introduction: The Chef\'s Recipe',
            icon: <FiCoffee className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        Solving a programming problem is like <span className="text-cyan-400 font-bold">cooking a meal</span>.
                        You don&apos;t just throw everything in a pot and hope for the best!
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">1. Understand (Ingredients):</span> What inputs do I have? What output do I need? (e.g., Do I have eggs and flour to make a cake?)
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">2. Plan (Recipe):</span> Write down the steps (Algorithm/Pseudocode) before turning on the stove (Computer).
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">3. Code (Cook):</span> Translate your plan into Java syntax.
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">4. Test (Taste):</span> Run with different inputs. Does it work for standard cases? Edge cases?
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Step 1: Understand the Problem',
            icon: <FiTarget className="w-6 h-6" />,
            content: `Before coding, ask these questions:

→ <span className="text-amber-300">Input:</span> What is the data? (Integer, String, Array?)
→ <span className="text-amber-300">Output:</span> What is the result? (Print to screen, return a value?)
→ <span className="text-amber-300">Constraints:</span> Are there limits? (Only positive numbers? Max value?)
→ <span className="text-amber-300">Edge Cases:</span> What about 0? Negative numbers? Null?`,
            code: `// Problem: Find the maximum of three numbers.
// Input: 3 integers (a, b, c) -> 5, 10, 3
// Output: 1 integer (max) -> 10
// Constraints: Integers can be negative.`,
        },
        {
            title: 'Step 2: Plan (Algorithm)',
            icon: <FiLayers className="w-6 h-6" />,
            content: `Create a logical path. This can be <span className="text-blue-400 font-semibold">Pseudocode</span> (plain English steps) or a <span className="text-blue-400 font-semibold">Flowchart</span>.

Example Plan:
1. Compare A and B. Let's say Max is the larger one.
2. Compare Max and C. Update Max if C is larger.
3. Print Max.`,
            code: `// Pseudocode:
// Set max = a
// If b > max, set max = b
// If c > max, set max = c
// Return max`,
        },
        {
            title: 'Step 3: Code (Implementation)',
            icon: <FiCode className="w-6 h-6" />,
            content: `Translate your plan into syntax. Focus on logic first, syntax details second.`,
            code: `public class MaxFinder {
    public static int findMax(int a, int b, int c) {
        int max = a;
        if (b > max) max = b;
        if (c > max) max = c;
        return max;
    }
}`,
        },
        {
            title: 'Step 4 & 5: Test and Debug',
            icon: <FiAlertCircle className="w-6 h-6" />,
            content: `Verify your solution.
      
→ <span className="text-cyan-300">Dry Run:</span> Manually trace the code with a value (e.g., a=5, b=10, c=3).
→ <span className="text-cyan-300">Test Cases:</span>
  - Normal: 1, 2, 3
  - Edge: 0, 0, 0
  - Negative: -1, -5, -2
→ <span className="text-cyan-300">Debug:</span> If output is wrong, check logic flow, not just syntax.`,
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Sum of Digits',
            solution: 'Find the sum of all digits in a given number (e.g., 123 -> 6).',
            steps: [
                {
                    step: '1. Understand',
                    explanation: 'Input: 123. Output: 1+2+3 = 6. We need to process each digit individually.'
                },
                {
                    step: '2. Plan',
                    explanation: (
                        <div className="font-mono text-sm">
                            Loop while number &gt; 0:<br />
                            &nbsp;&nbsp;1. Extract last digit (num % 10)<br />
                            &nbsp;&nbsp;2. Add to sum<br />
                            &nbsp;&nbsp;3. Remove last digit (num / 10)
                        </div>
                    )
                },
                {
                    step: '3. Test (Dry Run)',
                    explanation: 'Start: 123. Sum: 0 -> Dig: 3, Sum: 3, Num: 12 -> Dig: 2, Sum: 5, Num: 1 -> Dig: 1, Sum: 6, Num: 0. Stop.'
                }
            ],
            code: `public class SumOfDigits {
    public static void main(String[] args) {
        int num = 123;
        int sum = 0;
        
        while (num > 0) {
            int digit = num % 10; // Extract last digit
            sum += digit;         // Add to sum
            num /= 10;            // Remove last digit
        }
        System.out.println("Sum: " + sum);
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Apply problem-solving: Reverse a Number.',
            solution: 'Understand (Input 123 -> 321), Plan (Extract digit, build new number * 10 + digit), Code.',
            solutionCode: `public class ReverseNumber {
    public static void main(String[] args) {
        int num = 1234;
        int reversed = 0;
        
        while (num > 0) {
            int digit = num % 10;
            reversed = reversed * 10 + digit;
            num /= 10;
        }
        System.out.println("Reversed: " + reversed);
    }
}`
        },
        {
            question: 'Apply problem-solving: Check Prime Number.',
            solution: 'Plan: Loop from 2 to sqrt(n). If divisible, not prime. Else, prime.',
            solutionCode: `public class PrimeCheck {
    public static void main(String[] args) {
        int n = 17;
        boolean isPrime = true;
        
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }
        
        if (isPrime && n > 1) 
            System.out.println(n + " is Prime");
        else 
            System.out.println(n + " is Not Prime");
    }
}`
        }
    ] as PracticeQuestion[],
    dryRunCode: `public class SumOfDigits {
    public static void main(String[] args) {
        int num = 123;
        int sum = 0;
        
        while (num > 0) {
            int digit = num % 10;
            sum += digit;
            num /= 10;
        }
        System.out.println("Sum: " + sum);
    }
}`,
    dryRunSteps: [
        { line: 3, vars: { num: 123 }, output: '', description: 'Initialize num = 123' },
        { line: 4, vars: { num: 123, sum: 0 }, output: '', description: 'Initialize sum = 0' },
        { line: 6, vars: { num: 123, sum: 0 }, output: '', conditionResult: true, description: 'Loop: 123 > 0 is true' },
        { line: 7, vars: { num: 123, sum: 0, digit: 3 }, output: '', description: 'digit = 123 % 10 = 3' },
        { line: 8, vars: { num: 123, sum: 3, digit: 3 }, output: '', description: 'sum = 0 + 3 = 3' },
        { line: 9, vars: { num: 12, sum: 3, digit: 3 }, output: '', description: 'num = 123 / 10 = 12' },
        { line: 6, vars: { num: 12, sum: 3 }, output: '', conditionResult: true, description: 'Loop: 12 > 0 is true' },
        { line: 7, vars: { num: 12, sum: 3, digit: 2 }, output: '', description: 'digit = 12 % 10 = 2' },
        { line: 8, vars: { num: 12, sum: 5, digit: 2 }, output: '', description: 'sum = 3 + 2 = 5' },
        { line: 9, vars: { num: 1, sum: 5, digit: 2 }, output: '', description: 'num = 12 / 10 = 1' },
        { line: 6, vars: { num: 1, sum: 5 }, output: '', conditionResult: true, description: 'Loop: 1 > 0 is true' },
        { line: 7, vars: { num: 1, sum: 5, digit: 1 }, output: '', description: 'digit = 1 % 10 = 1' },
        { line: 8, vars: { num: 1, sum: 6, digit: 1 }, output: '', description: 'sum = 5 + 1 = 6' },
        { line: 9, vars: { num: 0, sum: 6, digit: 1 }, output: '', description: 'num = 1 / 10 = 0' },
        { line: 6, vars: { num: 0, sum: 6 }, output: '', conditionResult: false, description: 'Loop: 0 > 0 is false. Exit.' },
        { line: 11, vars: { num: 0, sum: 6 }, output: 'Sum: 6\\n', description: 'Print final sum' },
    ] as DryRunStep[]
}

export default function ProblemSolvingMethodologyPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
