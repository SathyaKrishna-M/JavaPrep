'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiAlertTriangle, FiCpu, FiTerminal, FiTool, FiAlertCircle, FiSearch } from 'react-icons/fi'

const content = {
  title: 'Debugging Techniques',
  explanationSections: [
    {
      title: 'Introduction: The Mechanic',
      icon: <FiTool className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Debugging</span> is the art of fixing broken code.
            Think of yourself as a <span className="text-cyan-400 font-bold">Mechanic</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Diagnosis:</span> Listen to the engine (Read error messages).
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Inspection:</span> Check the parts (Check variables).
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Repair:</span> Replace the broken part (Fix the code).
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Types of "Car Trouble" (Errors)',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: `Not all errors are the same. identifying the type is half the battle.

1. <span className="text-red-400 font-semibold">Syntax Errors (Compile-Time):</span> The code grammar is wrong. The car won't even start.
   - <em>Example:</em> Missing semicolon \`;\`, mismatched brackets \`{}\`.

2. <span className="text-orange-400 font-semibold">Runtime Errors (Exceptions):</span> The car crashes while driving.
   - <em>Example:</em> <span className="text-cyan-300">DivisionByZero</span>, <span className="text-cyan-300">NullPointerException</span>, <span className="text-cyan-300">ArrayIndexOutOfBounds</span>.

3. <span className="text-yellow-400 font-semibold">Logical Errors:</span> The car drives perfectly but to the wrong destination.
   - <em>Example:</em> Calculating \`area = length + width\` instead of \`length * width\`.`,
      code: `public class ErrorTypes {
    public static void main(String[] args) {
        // Syntax Error (Won't compile)
        // int x = 10  // Missing semicolon
        
        // Runtime Error (Crashes)
        // int y = 10 / 0; 
        
        // Logical Error (Wrong answer)
        int a = 5, b = 10;
        System.out.println("Sum: " + (a * b)); // Oops, multiplied instead of added!
    }
}`,
    },
    {
      title: 'Tools of the Trade',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: `How to find the bug:

→ <span className="text-cyan-300">Print Debugging:</span> Add \`System.out.println()\` to check variable values at different points.
→ <span className="text-cyan-300">Rubber Ducking:</span> Explain your code line-by-line to a rubber duck (or friend). You'll often find the bug just by saying it aloud.
→ <span className="text-cyan-300">IDE Debugger:</span> Use breakpoints to pause code and inspect values memory.`,
      code: `// Print Debugging Example
public class FixMe {
    public static void main(String[] args) {
        int x = 5;
        System.out.println("DEBUG: x started as " + x);
        
        x = x * 2;
        System.out.println("DEBUG: x is now " + x); // Is this what I expected?
    }
}`,
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Fixing a Logic Error',
      solution: 'The average calculation returns 0 because of integer division. Fix it using double casting.',
      steps: [
        {
          step: '1. Identify the Bug',
          explanation: (
            <div className="font-mono text-sm">
              int sum = 9;<br />
              int count = 2;<br />
              double avg = sum / count; // Result is 4.0, not 4.5! Why?
            </div>
          )
        },
        {
          step: '2. Diagnose',
          explanation: 'Integer division (9 / 2) creates an integer result (4). The .5 is lost before assignment.'
        },
        {
          step: '3. Repair',
          explanation: 'Cast one operand to double forces floating-point division.'
        }
      ],
      code: `public class AverageFix {
    public static void main(String[] args) {
        int sum = 9;
        int count = 2;
        
        // OLD (Buggy): double avg = sum / count;
        
        // FIXED:
        double avg = (double) sum / count;
        
        System.out.println("Average: " + avg); // Prints 4.5
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Fix the Runtime Error (ArithmeticException).',
      solution: 'Check if the divisor is zero before dividing.',
      solutionCode: `public class SafeDivision {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        
        if (b != 0) {
            System.out.println(a / b);
        } else {
            System.out.println("Cannot divide by zero");
        }
    }
}`
    },
    {
      question: 'Fix the Logic Error: Loop doesn\'t run.',
      solution: 'The loop condition (i > 5) is initially false. Change it to (i <= 5).',
      solutionCode: `public class LoopFix {
    public static void main(String[] args) {
        // Buggy: for (int i = 1; i > 5; i++)
        // Fixed:
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class AverageFix {
    public static void main(String[] args) {
        int sum = 9;
        int count = 2;
        // Buggy Line tracing
        double avg = sum / count;
        System.out.println(avg);
    }
}`,
  dryRunSteps: [
    { line: 3, vars: { sum: 9 }, output: '', description: 'Initialize sum = 9' },
    { line: 4, vars: { sum: 9, count: 2 }, output: '', description: 'Initialize count = 2' },
    { line: 6, vars: { sum: 9, count: 2, avg: 4.0 }, output: '', description: 'sum / count = 9 / 2 = 4 (Integer Division). Then assigned to double (4.0)' },
    { line: 7, vars: { sum: 9, count: 2, avg: 4.0 }, output: '4.0\\n', description: 'Print 4.0 (Logic Error observed)' },
  ] as DryRunStep[]
}

export default function DebuggingTechniquesPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
