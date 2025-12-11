'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiLayers, FiMap, FiGitCommit, FiCornerDownRight, FiBox, FiCircle, FiHexagon } from 'react-icons/fi'

const content = {
  title: 'Flowchart Design',
  explanationSections: [
    {
      title: 'Introduction: The Blueprint',
      icon: <FiMap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            A <span className="text-blue-400 font-semibold">Flowchart</span> is a visual roadmap of your code.
            Just as an architect draws a <span className="text-cyan-400 font-bold">blueprint</span> before building a house, programmers draw flowcharts before coding complex logic.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Map out logic:</span> See the path of execution clearly.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Catch errors early:</span> Find &quot;dead ends&quot; or infinite loops before writing a single line of code.
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Communicate:</span> Explain your algorithm to others easily.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Standard Symbols',
      icon: <FiBox className="w-6 h-6" />,
      content: `We use specific shapes to represent different actions.

Shapes:
→ <span className="text-cyan-300">Oval (Start/Stop):</span> Represents the beginning and end of the program.
→ <span className="text-cyan-300">Parallelogram (Input/Output):</span> Getting data (Scanner) or printing results (System.out).
→ <span className="text-cyan-300">Rectangle (Process):</span> Calculations, variable assignments (e.g., sum = a + b).
→ <span className="text-cyan-300">Diamond (Decision):</span> Yes/No questions (if-else, loops). Splits the path.
→ <span className="text-cyan-300">Arrows:</span> Show the direction of flow.`,
      code: `// Symbol Mapping Example:
// Oval: Start
// Parallelogram: Input x
// Diamond: Is x > 0?
//   -> Yes: Rectangle (y = x * 2)
//   -> No: Rectangle (y = 0)
// Parallelogram: Print y
// Oval: Stop`,
    },
    {
      title: 'Flow Control Structures',
      icon: <FiCornerDownRight className="w-6 h-6" />,
      content: `How to represent basic logic:

1. <span className="text-blue-400">Sequence:</span> Arrows connect shapes in a straight line (Step A → Step B).
2. <span className="text-blue-400">Selection (If-Else):</span> A Diamond splits into two paths (True/False) which eventually merge back.
3. <span className="text-blue-400">Iteration (Loops):</span> An arrow from the end of a block points BACK to a previous Decision Diamond (creating a cycle).`,
      code: `// Loop Flowchart Logic:
// 1. Initialize i = 0 (Rectangle)
// 2. Is i < 5? (Diamond)
//    -> Yes: Print i (Parallelogram) -> i++ (Rectangle) -> Loop back to Step 2
//    -> No: Exit Loop`,
    }
  ] as ExplanationSection[],
  exampleProblems: [
    {
      problem: 'Login System Logic',
      solution: 'Design a flow for verifying a user password.',
      steps: [
        {
          step: '1. Start',
          explanation: 'Begin the process.'
        },
        {
          step: '2. Input',
          explanation: 'User enters Username and Password.'
        },
        {
          step: '3. Decision',
          explanation: 'Check: Is Password Correct? (Yes/No)'
        },
        {
          step: '4. Action (Yes)',
          explanation: 'Grant Access -> Show Dashboard.'
        },
        {
          step: '5. Action (No)',
          explanation: 'Deny Access -> Show "Wrong Password" error.'
        },
        {
          step: '6. End',
          explanation: 'Stop process.'
        }
      ],
      code: `public class LoginFlow {
    public static void main(String[] args) {
        // Simulation of the flowchart path
        String password = "secure123";
        String input = "secure123";
        
        if (input.equals(password)) {
            System.out.println("Access Granted");
        } else {
            System.out.println("Access Denied");
        }
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Design a flowchart to check if a number is Positive, Negative, or Zero.',
      solution: 'Start -> Input N -> Is N > 0? (Yes: Positive) -> No: Is N < 0? (Yes: Negative) -> No: Zero -> End.',
      solutionCode: `public class PosNegZero {
    public static void main(String[] args) {
        int n = -5;
        if (n > 0) {
            System.out.println("Positive");
        } else if (n < 0) {
            System.out.println("Negative");
        } else {
            System.out.println("Zero");
        }
    }
}`,
    },
    {
      question: 'Design a flowchart for an ATM Withdrawal.',
      solution: 'Input PIN -> Valid? -> Input Amount -> Balance >= Amount? -> Dispense Cash -> Deduct Balance -> End.',
      solutionCode: `public class ATM {
    public static void main(String[] args) {
        int balance = 1000;
        int amount = 500;
        
        if (balance >= amount) {
            balance -= amount;
            System.out.println("Dispensing " + amount);
            System.out.println("New Balance: " + balance);
        } else {
            System.out.println("Insufficient Funds");
        }
    }
}`
    }
  ] as PracticeQuestion[],
  dryRunCode: `public class ATM {
    public static void main(String[] args) {
        int balance = 1000;
        int amount = 500;
        
        if (balance >= amount) {
            balance -= amount;
            System.out.println("Dispensing " + amount);
            System.out.println("New Balance: " + balance);
        } else {
            System.out.println("Insufficient Funds");
        }
    }
}`,
  dryRunSteps: [
    { line: 3, vars: { balance: 1000 }, output: '', description: 'Initialize Balance = 1000' },
    { line: 4, vars: { balance: 1000, amount: 500 }, output: '', description: 'Input Amount = 500' },
    { line: 6, vars: { balance: 1000, amount: 500 }, output: '', conditionResult: true, description: 'Decision: 1000 >= 500? (True)' },
    { line: 7, vars: { balance: 500, amount: 500 }, output: '', description: 'Process: Deduct Amount (1000 - 500 = 500)' },
    { line: 8, vars: { balance: 500, amount: 500 }, output: 'Dispensing 500\\n', description: 'Output: Dispense Cash' },
    { line: 9, vars: { balance: 500, amount: 500 }, output: 'Dispensing 500\\nNew Balance: 500\\n', description: 'Output: Show Balance' },
  ] as DryRunStep[]
}

export default function FlowchartDesignPage() {
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
