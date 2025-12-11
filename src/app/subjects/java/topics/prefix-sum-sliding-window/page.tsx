'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiLayers, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Prefix Sum & Sliding Window',
  explanationSections: [
    {
      title: 'Prefix Sum',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Prefix Sum</span> stores cumulative sum for range queries.

Concept:
→ <span className="text-cyan-300">prefix[i]:</span> Sum of elements from 0 to i
→ <span className="text-cyan-300">Range sum:</span> prefix[j] - prefix[i-1] for sum from i to j
→ <span className="text-cyan-300">Efficient:</span> O(1) range queries after O(n) preprocessing

Use Cases:
→ <span className="text-amber-300">Range sum queries</span>
→ <span className="text-amber-300">Subarray problems</span>`,
      code: `public class PrefixSum {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int[] prefix = new int[arr.length];
        
        // Build prefix sum
        prefix[0] = arr[0];
        for (int i = 1; i < arr.length; i++) {
            prefix[i] = prefix[i - 1] + arr[i];
        }
        
        // Range sum from index 1 to 3
        int sum = prefix[3] - prefix[0];
        System.out.println("Sum from index 1 to 3: " + sum);
    }
}`,
    },
    {
      title: 'Sliding Window',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Sliding Window</span> maintains a window of elements.

Technique:
→ <span className="text-cyan-300">Fixed window:</span> Window of size k
→ <span className="text-cyan-300">Variable window:</span> Window size changes
→ <span className="text-cyan-300">Efficient:</span> O(n) instead of O(n²)

Use Cases:
→ <span className="text-amber-300">Maximum sum subarray of size k</span>
→ <span className="text-amber-300">Longest substring with condition</span>`,
      code: `public class SlidingWindow {
    // Maximum sum of subarray of size k
    public static int maxSum(int[] arr, int k) {
        int maxSum = 0;
        int windowSum = 0;
        
        // First window
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        maxSum = windowSum;
        
        // Slide window
        for (int i = k; i < arr.length; i++) {
            windowSum = windowSum - arr[i - k] + arr[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 4, 2, 10, 2, 3, 1, 0, 20};
        System.out.println("Max sum: " + maxSum(arr, 4));
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Implement prefix sum to answer range sum queries efficiently.',
      solution: 'Build prefix array, then use prefix[j] - prefix[i-1] for range sum.',
      solutionCode: `public class PrefixSumDemo {
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10};
        int[] prefix = new int[arr.length];
        prefix[0] = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            prefix[i] = prefix[i - 1] + arr[i];
        }
        
        // Sum from index 1 to 3
        int sum = prefix[3] - (1 > 0 ? prefix[0] : 0);
        System.out.println("Sum: " + sum);
    }
}`,
    },
  ],
}

export default function PrefixSumSlidingWindowPage() {
  return <TopicPage content={content} />
}

