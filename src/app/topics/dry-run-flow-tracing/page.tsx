'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiSearch, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Dry Run & Flow Tracing',
  explanationSections: [
    {
      title: 'Introduction to Dry Run',
      icon: <FiSearch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Dry Run</span> is manually tracing code execution step-by-step.

Process:
→ <span class="text-cyan-300">Line by line:</span> Execute each statement
→ <span class="text-cyan-300">Track variables:</span> Note variable values
→ <span class="text-cyan-300">Track flow:</span> Follow control flow
→ <span class="text-cyan-300">Table format:</span> Create execution table

Benefits:
→ <span class="text-amber-300">Understand logic:</span> See how code works
→ <span class="text-amber-300">Find errors:</span> Identify bugs
→ <span class="text-amber-300">Debug:</span> Trace execution`,
      code: `public class DryRunExample {
    public static void main(String[] args) {
        int a = 5;
        int b = 10;
        int sum = a + b;
        System.out.println("Sum: " + sum);
    }
}

// Dry Run Table:
// Line | Variable | Value | Output
// 3    | a        | 5     |
// 4    | b        | 10    |
// 5    | sum      | 15    |
// 6    |          |       | Sum: 15`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Perform a dry run of code that calculates the factorial of 5.',
      solution: 'Trace execution step-by-step, tracking variable values in a table.',
      solutionCode: `public class FactorialDryRun {
    public static void main(String[] args) {
        int n = 5;
        int fact = 1;
        for (int i = 1; i <= n; i++) {
            fact = fact * i;
        }
        System.out.println("Factorial: " + fact);
    }
}

// Dry Run:
// i | fact | fact = fact * i
// 1 | 1    | 1 * 1 = 1
// 2 | 1    | 1 * 2 = 2
// 3 | 2    | 2 * 3 = 6
// 4 | 6    | 6 * 4 = 24
// 5 | 24   | 24 * 5 = 120`,
    },
  ],
}

export default function DryRunFlowTracingPage() {
  return <TopicPage content={content} />
}

