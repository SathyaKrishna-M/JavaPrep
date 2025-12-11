'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiHash, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Quantitative Logic Problems',
  explanationSections: [
    {
      title: 'Number Series',
      icon: <FiHash className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Number Series</span> problems find patterns in sequences.

Common Patterns:
→ <span className="text-cyan-300">Arithmetic:</span> Add/subtract constant
→ <span className="text-cyan-300">Geometric:</span> Multiply/divide constant
→ <span className="text-cyan-300">Fibonacci:</span> Sum of previous two
→ <span className="text-cyan-300">Prime:</span> Prime numbers sequence`,
      code: `public class NumberSeries {
    // Generate arithmetic series
    public static void arithmeticSeries(int start, int diff, int n) {
        for (int i = 0; i < n; i++) {
            System.out.print((start + i * diff) + " ");
        }
    }
    
    // Generate geometric series
    public static void geometricSeries(int start, int ratio, int n) {
        for (int i = 0; i < n; i++) {
            System.out.print((start * (int)Math.pow(ratio, i)) + " ");
        }
    }
    
    public static void main(String[] args) {
        arithmeticSeries(2, 3, 5);  // 2 5 8 11 14
        System.out.println();
        geometricSeries(2, 2, 5);  // 2 4 8 16 32
    }
}`,
    },
    {
      title: 'Prime Numbers',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Prime Numbers</span> are divisible only by 1 and itself.

Algorithm:
→ <span className="text-cyan-300">Check divisibility:</span> From 2 to sqrt(n)
→ <span className="text-cyan-300">If divisible:</span> Not prime
→ <span className="text-cyan-300">Otherwise:</span> Prime`,
      code: `public class PrimeNumbers {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        for (int i = 2; i <= 20; i++) {
            if (isPrime(i)) {
                System.out.print(i + " ");
            }
        }
        // Output: 2 3 5 7 11 13 17 19
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Check if a number is prime.',
      solution: 'Check divisibility from 2 to sqrt(n).',
      solutionCode: `public class PrimeCheck {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println("Is 17 prime? " + isPrime(17));
    }
}`,
    },
  ],
}

export default function QuantitativeLogicProblemsPage() {
  return <TopicPage content={content} />
}

