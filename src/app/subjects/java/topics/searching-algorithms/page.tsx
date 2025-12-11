'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiSearch, FiTarget, FiCode } from 'react-icons/fi'

const content = {
  title: 'Searching Algorithms',
  explanationSections: [
    {
      title: 'Linear Search',
      icon: <FiSearch className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Linear Search</span> checks each element sequentially.

Algorithm:
→ <span className="text-cyan-300">Start:</span> From first element
→ <span className="text-cyan-300">Compare:</span> Each element with target
→ <span className="text-cyan-300">Found:</span> Return index
→ <span className="text-cyan-300">Not found:</span> Return -1

Time Complexity:
→ <span className="text-amber-300">Best:</span> O(1) - first element
→ <span className="text-amber-300">Average:</span> O(n)
→ <span className="text-amber-300">Worst:</span> O(n) - last element or not found

Space Complexity: O(1)`,
      code: `public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // Found at index i
            }
        }
        return -1;  // Not found
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        int target = 30;
        int index = linearSearch(arr, target);
        
        if (index != -1) {
            System.out.println("Found at index: " + index);
        } else {
            System.out.println("Not found");
        }
    }
}`,
    },
    {
      title: 'Binary Search',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span className="text-blue-400 font-semibold">Binary Search</span> works on sorted arrays by dividing search space.

Algorithm:
→ <span className="text-cyan-300">Requirement:</span> Array must be sorted
→ <span className="text-cyan-300">Compare:</span> Target with middle element
→ <span className="text-cyan-300">Left half:</span> If target < middle
→ <span className="text-cyan-300">Right half:</span> If target > middle
→ <span className="text-cyan-300">Repeat:</span> Until found or search space empty

Time Complexity:
→ <span className="text-amber-300">Best:</span> O(1) - middle element
→ <span className="text-amber-300">Average:</span> O(log n)
→ <span className="text-amber-300">Worst:</span> O(log n)

Space Complexity: O(1)`,
      code: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;  // Found
            } else if (arr[mid] < target) {
                left = mid + 1;  // Search right half
            } else {
                right = mid - 1;  // Search left half
            }
        }
        return -1;  // Not found
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50, 60, 70};
        int target = 40;
        int index = binarySearch(arr, target);
        
        if (index != -1) {
            System.out.println("Found at index: " + index);
        } else {
            System.out.println("Not found");
        }
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Implement linear search to find an element in an array.',
      solution: 'Traverse array sequentially and compare each element with target.',
      solutionCode: `public class LinearSearchDemo {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {5, 10, 15, 20, 25};
        int result = search(arr, 15);
        System.out.println("Index: " + result);
    }
}`,
    },
    {
      question: 'Implement binary search on a sorted array.',
      solution: 'Use divide and conquer approach on sorted array.',
      solutionCode: `public class BinarySearchDemo {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13};
        System.out.println("Index: " + search(arr, 7));
    }
}`,
    },
  ],
}

export default function SearchingAlgorithmsPage() {
  return <TopicPage content={content} />
}

