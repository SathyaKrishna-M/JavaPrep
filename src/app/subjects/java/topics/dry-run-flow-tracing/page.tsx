'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiSearch, FiTarget, FiList, FiEye, FiActivity } from 'react-icons/fi'

const content = {
  title: 'Dry Run & Flow Tracing',
  explanationSections: [
    {
      title: 'Introduction: The Detective Work',
      icon: <FiSearch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Dry Run</span> is the process of manually stepping through your code to track the values of variables.
            Think of it as being a <span className="text-cyan-400 font-bold">detective</span> replaying a scene in slow motion.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">See the invisible:</span> Code runs fast. Dry runs freeze time so you can see <span class="text-amber-300">every single change</span>.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Find the Bug:</span> Did a loop run one too many times? Did a variable not update? A dry run catches this.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">No Computer Needed:</span> You can do this with just pen and paper.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'How to Trace Flow',
      icon: <FiList className="w-6 h-6" />,
      content: `Use a <span class="text-blue-400 font-semibold">Trace Table</span> to track execution.

Columns:
→ <span class="text-cyan-300">Line #:</span> The number of the line being executed.
→ <span class="text-cyan-300">Variables:</span> One column for each variable (x, y, i, sum).
→ <span class="text-cyan-300">Output:</span> What is printed to the console?
→ <span class="text-cyan-300">Comments:</span> Notes on logic (True/False checks).`,
      code: `// Example Code:
// 1. int x = 5;
// 2. int y = 2;
// 3. x = x + y;
// 4. System.out.println(x);

// Trace Table:
// Line | x  | y  | Output
// 1    | 5  | -  |
// 2    | 5  | 2  |
// 3    | 7  | 2  |
// 4    | 7  | 2  | 7`,
    },
    {
      title: 'Tracing Loops',
      icon: <FiActivity className="w-6 h-6" />,
      content: `Loops are the most common place for bugs (Off-by-one errors). Tracing them requires patience.

Key Strategy:
→ Update the loop variable <span class="text-amber-300">row by row</span>.
→ Check the condition <span class="text-amber-300">every iteration</span>.
→ Mark when the loop exits.`,
      code: `public class LoopTrace {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 3; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}
// Trace:
// Line | sum | i | Condition (i<=3) | Action
// 3    | 0   | 1 | True             | Enter Loop
// 4    | 1   | 1 | -                | sum = 0 + 1
// 3    | 1   | 2 | True             | i++, Enter Loop
// 4    | 3   | 2 | -                | sum = 1 + 2
// 3    | 3   | 3 | True             | i++, Enter Loop
// 4    | 6   | 3 | -                | sum = 3 + 3
// 3    | 6   | 4 | False            | i++, Exit Loop
// 6    | 6   | 4 | -                | Print 6`,
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Trace: Loop with If-Else',
      solution: 'Trace a loop that prints "Even" or "Odd" for numbers 1 to 3.',
      steps: [
        {
          step: '1. Setup Table',
          explanation: 'Columns: Line, i, Output.'
        },
        {
          step: '2. Iteration 1 (i=1)',
          explanation: '1 % 2 != 0. Print "Odd".'
        },
        {
          step: '3. Iteration 2 (i=2)',
          explanation: '2 % 2 == 0. Print "Even".'
        },
        {
          step: '4. Iteration 3 (i=3)',
          explanation: '3 % 2 != 0. Print "Odd".'
        },
        {
          step: '5. Exit',
          explanation: 'i becomes 4. Loop ends.'
        }
      ],
      code: `public class EvenOddTrace {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            if (i % 2 == 0) {
                System.out.print("Even ");
            } else {
                System.out.print("Odd ");
            }
        }
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Perform a dry run for: Factorial of 4.',
      solution: 'Trace the multiplication: 1 * 1 * 2 * 3 * 4 = 24.',
      solutionCode: `public class Factorial {
    public static void main(String[] args) {
        int fact = 1;
        for (int i = 1; i <= 4; i++) {
            fact *= i;
        }
        System.out.println(fact);
    }
}`,
      dryRunCode: `public class Factorial {
    public static void main(String[] args) {
        int fact = 1;
        for (int i = 1; i <= 4; i++) {
            fact *= i;
        }
        System.out.println(fact);
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { fact: 1 }, output: '', description: 'Init fact=1' },
        { line: 4, vars: { fact: 1, i: 1 }, output: '', description: 'Loop i=1' },
        { line: 5, vars: { fact: 1, i: 1 }, output: '', description: 'fact = 1 * 1 = 1' },
        { line: 4, vars: { fact: 1, i: 2 }, output: '', description: 'Loop i=2' },
        { line: 5, vars: { fact: 2, i: 2 }, output: '', description: 'fact = 1 * 2 = 2' },
        { line: 4, vars: { fact: 2, i: 3 }, output: '', description: 'Loop i=3' },
        { line: 5, vars: { fact: 6, i: 3 }, output: '', description: 'fact = 2 * 3 = 6' },
        { line: 4, vars: { fact: 6, i: 4 }, output: '', description: 'Loop i=4' },
        { line: 5, vars: { fact: 24, i: 4 }, output: '', description: 'fact = 6 * 4 = 24' },
        { line: 4, vars: { fact: 24, i: 5 }, output: '', description: 'Loop i=5 (Exit)' },
        { line: 7, vars: { fact: 24, i: 5 }, output: '24\\n', description: 'Print 24' },
      ] as DryRunStep[]
    },
    {
      question: 'Trace the following Nested Loop.',
      solution: 'Trace i=1 (j=1,2), then i=2 (j=1,2). Total 4 outputs.',
      solutionCode: `public class NestedTrace {
    public static void main(String[] args) {
        for (int i = 1; i <= 2; i++) {
            for (int j = 1; j <= 2; j++) {
                System.out.print(i + j + " ");
            }
        }
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class DryRunExample {
    public static void main(String[] args) {
        int a = 5;
        int b = 10;
        int sum = a + b;
        System.out.println("Sum: " + sum);
    }
}`,
  dryRunSteps: [
    { line: 3, vars: { a: 5 }, output: '', description: 'Initialize a = 5' },
    { line: 4, vars: { a: 5, b: 10 }, output: '', description: 'Initialize b = 10' },
    { line: 5, vars: { a: 5, b: 10, sum: 15 }, output: '', description: 'Calculate sum = 5 + 10 = 15' },
    { line: 6, vars: { a: 5, b: 10, sum: 15 }, output: 'Sum: 15\\n', description: 'Print Sum' }
  ] as DryRunStep[]
}

export default function DryRunFlowTracingPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
