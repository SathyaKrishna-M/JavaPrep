'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiZap, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Bitwise Operators',
  explanationSections: [
    {
      title: 'Bitwise Operators',
      icon: <FiZap className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Bitwise Operators</span> operate on individual bits.

Operators:
→ <span class="text-cyan-300">& (AND):</span> Both bits 1 → result 1
→ <span class="text-cyan-300">| (OR):</span> Either bit 1 → result 1
→ <span class="text-cyan-300">^ (XOR):</span> Different bits → result 1
→ <span class="text-cyan-300">~ (NOT):</span> Flip all bits
→ <span class="text-cyan-300"><< (Left shift):</span> Shift left, multiply by 2
→ <span class="text-cyan-300">>> (Right shift):</span> Shift right, divide by 2`,
      code: `public class BitwiseOperators {
    public static void main(String[] args) {
        int a = 5;  // 101
        int b = 3;  // 011
        
        System.out.println("a & b: " + (a & b));  // 001 = 1
        System.out.println("a | b: " + (a | b));  // 111 = 7
        System.out.println("a ^ b: " + (a ^ b));  // 110 = 6
        System.out.println("~a: " + (~a));       // -6
        System.out.println("a << 1: " + (a << 1));  // 10 (multiply by 2)
        System.out.println("a >> 1: " + (a >> 1));  // 2 (divide by 2)
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Use bitwise operators to check if a number is even or odd.',
      solution: 'Use & operator with 1. If result is 0, number is even, else odd.',
      solutionCode: `public class EvenOddBitwise {
    public static boolean isEven(int n) {
        return (n & 1) == 0;
    }
    
    public static void main(String[] args) {
        System.out.println("Is 10 even? " + isEven(10));
        System.out.println("Is 7 even? " + isEven(7));
    }
}`,
    },
  ],
}

export default function BitwiseOperatorsPage() {
  return <TopicPage content={content} />
}

