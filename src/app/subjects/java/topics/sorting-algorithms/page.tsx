'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiMove, FiTarget, FiCode } from 'react-icons/fi'

const content = {
  title: 'Sorting Algorithms',
  explanationSections: [
    {
      title: 'Bubble Sort',
      icon: <FiMove className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Bubble Sort</span> repeatedly swaps adjacent elements if in wrong order.

Algorithm:
→ <span class="text-cyan-300">Compare:</span> Adjacent elements
→ <span class="text-cyan-300">Swap:</span> If out of order
→ <span class="text-cyan-300">Repeat:</span> Until no swaps needed

Time Complexity:
→ <span class="text-amber-300">Best:</span> O(n) - already sorted
→ <span class="text-amber-300">Average:</span> O(n²)
→ <span class="text-amber-300">Worst:</span> O(n²)

Space Complexity: O(1)`,
      code: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        System.out.println("Sorted: " + java.util.Arrays.toString(arr));
    }
}`,
    },
    {
      title: 'Selection Sort',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Selection Sort</span> finds minimum and places at beginning.

Algorithm:
→ <span class="text-cyan-300">Find minimum:</span> In unsorted portion
→ <span class="text-cyan-300">Swap:</span> With first unsorted element
→ <span class="text-cyan-300">Repeat:</span> For remaining elements

Time Complexity: O(n²) for all cases
Space Complexity: O(1)`,
      code: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        System.out.println("Sorted: " + java.util.Arrays.toString(arr));
    }
}`,
    },
    {
      title: 'Quick Sort',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Quick Sort</span> uses divide and conquer with pivot.

Algorithm:
→ <span class="text-cyan-300">Choose pivot:</span> Usually last element
→ <span class="text-cyan-300">Partition:</span> Elements < pivot left, > pivot right
→ <span class="text-cyan-300">Recurse:</span> Sort left and right partitions

Time Complexity:
→ <span class="text-amber-300">Best/Average:</span> O(n log n)
→ <span class="text-amber-300">Worst:</span> O(n²) - already sorted

Space Complexity: O(log n)`,
      code: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        quickSort(arr, 0, arr.length - 1);
        System.out.println("Sorted: " + java.util.Arrays.toString(arr));
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Implement bubble sort to sort an array in ascending order.',
      solution: 'Compare adjacent elements and swap if out of order.',
      solutionCode: `public class BubbleSortDemo {
    public static void sort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {5, 2, 8, 1, 9};
        sort(arr);
        System.out.println(java.util.Arrays.toString(arr));
    }
}`,
    },
  ],
}

export default function SortingAlgorithmsPage() {
  return <TopicPage content={content} />
}

