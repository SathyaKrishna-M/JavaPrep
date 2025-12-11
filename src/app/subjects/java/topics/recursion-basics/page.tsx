'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiRepeat, FiTarget, FiLayers, FiMinimize } from 'react-icons/fi'

const content = {
  title: 'Recursion Basics',
  explanationSections: [
    {
      title: 'Introduction: Russian Nesting Dolls',
      icon: <FiRepeat className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Recursion</span> is when a solution depends on solutions to smaller instances of the same problem.
            Think of it like <span className="text-cyan-400 font-bold">Russian Nesting Dolls</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Recursive Step (Opening a Doll):</span> You open a big doll to find a slightly smaller one inside. The process repeats.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Base Case (The Smallest Doll):</span> Eventually, you reach a tiny solid doll that <span className="text-amber-300">cannot</span> be opened. This stops the process.
              </li>
              <li>
                <span className="text-red-400 font-semibold">Stack Overflow:</span> If the smallest doll didn&apos;t exist, you&apos;d be opening dolls forever until you ran out of space (StackOverflowError).
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Anatomy of Recursion',
      icon: <FiLayers className="w-6 h-6" />,
      content: `Every recursive function NEEDS two parts:

1. <span className="text-green-400 font-semibold">Base Case:</span> The stopping condition.
   - <em>&quot;If n is 1, stop.&quot;</em>
   - Without this, the code loops infinitely.

2. <span className="text-blue-400 font-semibold">Recursive Case:</span> The logic that calls the function again with a <em>smaller</em> input.
   - <em>&quot;Return n multiplied by factorial of (n-1).&quot;</em>`,
      code: `public class Factorial {
    public static int fact(int n) {
        // 1. BASE CASE
        if (n <= 1) {
            return 1;
        }
        
        // 2. RECURSIVE CASE
        return n * fact(n - 1);
    }
    
    public static void main(String[] args) {
        System.out.println(fact(5)); // Output: 120
    }
}`
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Countdown Timer',
      solution: 'Print numbers from n down to 1 using recursion.',
      steps: [
        {
          step: '1. Base Case',
          explanation: 'If n is 0, print &quot;Blastoff!&quot; and stops.'
        },
        {
          step: '2. Recursive Step',
          explanation: 'Print current n, then call countdown(n - 1).'
        }
      ],
      code: `public class Countdown {
    static void timer(int n) {
        if (n == 0) {
            System.out.println("Blastoff!");
            return;
        }
        System.out.println(n);
        timer(n - 1);
    }
    
    public static void main(String[] args) {
        timer(3); 
        // Prints:
        // 3
        // 2
        // 1
        // Blastoff!
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Write a recursive method to find the sum of first N natural numbers.',
      solution: 'Base case: n=1 return 1. Else return n + sum(n-1).',
      solutionCode: `public class SumRec {
    int sum(int n) {
        if (n <= 1) return 1;
        return n + sum(n - 1);
    }
}`
    },
    {
      question: 'Write a recursive method to calculate x to the power of y (x^y).',
      solution: 'Base case: y=0 return 1. Else return x * power(x, y-1).',
      solutionCode: `public class Power {
    int power(int x, int y) {
        if (y == 0) return 1;
        return x * power(x, y - 1);
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class Main {
    static int fact(int n) {
        if (n <= 1) return 1;
        return n * fact(n - 1);
    }
    public static void main(String[] args) {
        int res = fact(3);
        System.out.println(res);
    }
}`,
  dryRunSteps: [
    { line: 6, vars: {}, output: '', description: 'Main calls fact(3)' },
    { line: 2, vars: { n: 3 }, output: '', description: 'fact(3): n is 3. Not base case.' },
    { line: 3, vars: { n: 3 }, output: '', description: 'fact(3) calls 3 * fact(2)... PAUSED' },
    { line: 2, vars: { n: 2 }, output: '', description: 'fact(2): n is 2. Not base case.' },
    { line: 3, vars: { n: 2 }, output: '', description: 'fact(2) calls 2 * fact(1)... PAUSED' },
    { line: 2, vars: { n: 1 }, output: '', description: 'fact(1): n is 1. BASE CASE!' },
    { line: 2, vars: { n: 1 }, output: '', description: 'fact(1) returns 1.' },
    { line: 3, vars: { n: 2, 'fact(1)': 1 }, output: '', description: 'fact(2) resumes: 2 * 1 = 2. Returns 2.' },
    { line: 3, vars: { n: 3, 'fact(2)': 2 }, output: '', description: 'fact(3) resumes: 3 * 2 = 6. Returns 6.' },
    { line: 7, vars: { res: 6 }, output: '6\\n', description: 'Main prints result.' },
  ] as DryRunStep[]
}

export default function RecursionBasicsPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
