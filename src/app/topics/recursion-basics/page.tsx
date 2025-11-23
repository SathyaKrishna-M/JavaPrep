'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiRepeat, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Recursion Basics',
  explanationSections: [
    {
      title: 'Introduction to Recursion',
      icon: <FiRepeat className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Recursion</span> is a function calling itself.

Key Components:
→ <span class="text-cyan-300">Base case:</span> Stopping condition
→ <span class="text-cyan-300">Recursive case:</span> Function calls itself
→ <span class="text-cyan-300">Stack frames:</span> Each call creates new frame

Structure:
→ <span class="text-blue-400">if (base case) return value;</span>
→ <span class="text-blue-400">else return recursive call;</span>`,
      code: `public class RecursionBasics {
    // Factorial using recursion
    public static int factorial(int n) {
        // Base case
        if (n == 0 || n == 1) {
            return 1;
        }
        // Recursive case
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));  // 120
    }
}`,
    },
    {
      title: 'Stack Frames',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Stack Frames</span> track recursive calls.

Process:
→ <span class="text-cyan-300">Call:</span> New frame pushed onto stack
→ <span class="text-cyan-300">Return:</span> Frame popped from stack
→ <span class="text-cyan-300">Memory:</span> Each frame stores local variables

Example (factorial(3)):
→ <span class="text-amber-300">factorial(3) → factorial(2) → factorial(1)</span>
→ <span class="text-amber-300">Returns: 1 → 2 → 6</span>`,
      code: `public class StackFrames {
    public static int factorial(int n) {
        System.out.println("Calling factorial(" + n + ")");
        if (n <= 1) {
            System.out.println("Base case reached");
            return 1;
        }
        int result = n * factorial(n - 1);
        System.out.println("Returning " + result);
        return result;
    }
    
    public static void main(String[] args) {
        System.out.println("Result: " + factorial(3));
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Implement factorial using recursion with base case.',
      solution: 'Base case: n <= 1 returns 1. Recursive case: n * factorial(n-1).',
      solutionCode: `public class FactorialRecursion {
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
    }
}`,
    },
  ],
}

export default function RecursionBasicsPage() {
  return <TopicPage content={content} />
}

