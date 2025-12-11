'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiAward, FiTarget } from 'react-icons/fi'

const content = {
  title: 'CodeChef-Style Problem Solving',
  explanationSections: [
    {
      title: 'Competitive Programming Strategies',
      icon: <FiAward className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Competitive Programming</span> requires efficient problem-solving.

Strategies:
→ <span className="text-cyan-300">Read carefully:</span> Understand constraints
→ <span className="text-cyan-300">Think algorithm:</span> Choose right approach
→ <span className="text-cyan-300">Optimize:</span> Consider time/space complexity
→ <span className="text-cyan-300">Test:</span> Check edge cases

Common Patterns:
→ <span className="text-amber-300">Two pointers</span>
→ <span className="text-amber-300">Sliding window</span>
→ <span className="text-amber-300">Prefix sum</span>
→ <span className="text-amber-300">Greedy algorithms</span>`,
      code: `// Example: Find maximum subarray sum
public class CompetitiveProgramming {
    public static int maxSubarraySum(int[] arr) {
        int maxSum = arr[0];
        int currentSum = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            currentSum = Math.max(arr[i], currentSum + arr[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
    
    public static void main(String[] args) {
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Max sum: " + maxSubarraySum(arr));
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Solve: Given an array, find the maximum sum of any contiguous subarray.',
      solution: 'Use Kadane\'s algorithm to find maximum subarray sum in O(n).',
      solutionCode: `public class MaxSubarray {
    public static int maxSum(int[] arr) {
        int max = arr[0], current = arr[0];
        for (int i = 1; i < arr.length; i++) {
            current = Math.max(arr[i], current + arr[i]);
            max = Math.max(max, current);
        }
        return max;
    }
    
    public static void main(String[] args) {
        int[] arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Max: " + maxSum(arr));
    }
}`,
    },
  ],
}

export default function CompetitiveProgrammingPage() {
  return <TopicPage content={content} />
}

