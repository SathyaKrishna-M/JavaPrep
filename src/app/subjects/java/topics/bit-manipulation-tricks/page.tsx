'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiZap, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Bit Manipulation Tricks',
  explanationSections: [
    {
      title: 'Common Bit Tricks',
      icon: <FiZap className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Bit Tricks</span> solve problems efficiently using bit operations.

Tricks:
→ <span class="text-cyan-300">Even/Odd:</span> n & 1 == 0 (even)
→ <span class="text-cyan-300">Power of 2:</span> (n & (n-1)) == 0
→ <span class="text-cyan-300">Set bit:</span> n | (1 << i)
→ <span class="text-cyan-300">Clear bit:</span> n & ~(1 << i)
→ <span class="text-cyan-300">Toggle bit:</span> n ^ (1 << i)
→ <span class="text-cyan-300">Check bit:</span> (n >> i) & 1`,
      code: `public class BitTricks {
    // Check if even
    public static boolean isEven(int n) {
        return (n & 1) == 0;
    }
    
    // Check if power of 2
    public static boolean isPowerOf2(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
    
    // Set i-th bit
    public static int setBit(int n, int i) {
        return n | (1 << i);
    }
    
    // Clear i-th bit
    public static int clearBit(int n, int i) {
        return n & ~(1 << i);
    }
    
    public static void main(String[] args) {
        System.out.println("Is 8 power of 2? " + isPowerOf2(8));
        System.out.println("Set bit 2 of 5: " + setBit(5, 2));
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Check if a number is a power of 2 using bit manipulation.',
      solution: 'Use n & (n-1) == 0 for positive numbers.',
      solutionCode: `public class PowerOf2 {
    public static boolean isPowerOf2(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
    
    public static void main(String[] args) {
        System.out.println(isPowerOf2(8));   // true
        System.out.println(isPowerOf2(10));  // false
    }
}`,
    },
  ],
}

export default function BitManipulationTricksPage() {
  return <TopicPage content={content} />
}

