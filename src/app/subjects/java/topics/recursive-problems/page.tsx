'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiRepeat, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Recursive Problems',
  explanationSections: [
    {
      title: 'Fibonacci Sequence',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Fibonacci</span> sequence: F(n) = F(n-1) + F(n-2).

Base Cases:
→ <span className="text-cyan-300">F(0) = 0</span>
→ <span className="text-cyan-300">F(1) = 1</span>

Recursive Case:
→ <span className="text-cyan-300">F(n) = F(n-1) + F(n-2)</span>`,
      code: `public class Fibonacci {
    public static int fibonacci(int n) {
        // Base cases
        if (n == 0) return 0;
        if (n == 1) return 1;
        
        // Recursive case
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        // Output: 0 1 1 2 3 5 8 13 21 34
    }
}`,
    },
    {
      title: 'Tower of Hanoi',
      icon: <FiRepeat className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Tower of Hanoi</span> moves disks from source to destination.

Algorithm:
→ <span className="text-cyan-300">Move n-1:</span> From source to auxiliary
→ <span className="text-cyan-300">Move 1:</span> From source to destination
→ <span className="text-cyan-300">Move n-1:</span> From auxiliary to destination`,
      code: `public class TowerOfHanoi {
    public static void hanoi(int n, char source, char dest, char aux) {
        if (n == 1) {
            System.out.println("Move disk 1 from " + source + " to " + dest);
            return;
        }
        hanoi(n - 1, source, aux, dest);
        System.out.println("Move disk " + n + " from " + source + " to " + dest);
        hanoi(n - 1, aux, dest, source);
    }
    
    public static void main(String[] args) {
        hanoi(3, 'A', 'C', 'B');
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Implement Fibonacci sequence using recursion.',
      solution: 'Base cases: F(0)=0, F(1)=1. Recursive: F(n)=F(n-1)+F(n-2).',
      solutionCode: `public class FibonacciDemo {
    public static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println("Fib(5) = " + fib(5));
    }
}`,
    },
  ],
}

export default function RecursiveProblemsPage() {
  return <TopicPage content={content} />
}

