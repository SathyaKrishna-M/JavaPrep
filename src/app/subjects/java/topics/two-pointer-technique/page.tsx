'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiMove, FiTarget, FiCode } from 'react-icons/fi'

const content = {
  title: 'Two-Pointer Technique',
  explanationSections: [
    {
      title: 'Introduction to Two Pointers',
      icon: <FiMove className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Two-Pointer Technique</span> uses two pointers to traverse array efficiently.

Types:
→ <span className="text-cyan-300">Opposite ends:</span> Start and end pointers
→ <span className="text-cyan-300">Same direction:</span> Fast and slow pointers
→ <span className="text-cyan-300">Sliding window:</span> Left and right boundaries

Benefits:
→ <span className="text-amber-300">Efficiency:</span> O(n) instead of O(n²)
→ <span className="text-amber-300">Space:</span> O(1) extra space
→ <span className="text-amber-300">Simple:</span> Easy to implement`,
      code: `public class TwoPointerIntro {
    // Example: Find pair with given sum
    public static boolean hasPair(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            int sum = arr[left] + arr[right];
            if (sum == target) {
                return true;
            } else if (sum < target) {
                left++;  // Need larger sum
            } else {
                right--;  // Need smaller sum
            }
        }
        return false;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6};
        System.out.println("Has pair sum 9: " + hasPair(arr, 9));
    }
}`,
    },
    {
      title: 'Opposite Ends Pattern',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Opposite Ends</span> pattern uses pointers from start and end.

Use Cases:
→ <span className="text-cyan-300">Pair sum:</span> Find two numbers with target sum
→ <span className="text-cyan-300">Reverse:</span> Reverse array
→ <span className="text-cyan-300">Palindrome:</span> Check if array is palindrome

Algorithm:
→ <span className="text-amber-300">left = 0, right = n-1</span>
→ <span className="text-amber-300">Move pointers based on condition</span>
→ <span className="text-amber-300">Stop when left >= right</span>`,
      code: `public class OppositeEnds {
    // Reverse array using two pointers
    public static void reverse(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left < right) {
            // Swap
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            
            left++;
            right--;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        reverse(arr);
        System.out.println("Reversed: " + java.util.Arrays.toString(arr));
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Use two pointers to find if array contains a pair with given sum.',
      solution: 'Use left and right pointers, move based on current sum.',
      solutionCode: `public class PairSum {
    public static boolean findPair(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int sum = arr[left] + arr[right];
            if (sum == target) return true;
            if (sum < target) left++;
            else right--;
        }
        return false;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        System.out.println(findPair(arr, 7));
    }
}`,
    },
  ],
}

export default function TwoPointerTechniquePage() {
  return <TopicPage content={content} />
}

