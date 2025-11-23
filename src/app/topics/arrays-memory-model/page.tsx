'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiCpu, FiTarget, FiCode } from 'react-icons/fi'

const content = {
  title: 'Arrays & Memory Model',
  explanationSections: [
    {
      title: 'Array Memory Layout',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Arrays</span> are stored as contiguous blocks of memory.

Memory Model:
→ <span class="text-cyan-300">Contiguous:</span> Elements stored next to each other
→ <span class="text-cyan-300">Index-based:</span> Access via index (0 to length-1)
→ <span class="text-cyan-300">Reference:</span> Array variable holds reference to memory
→ <span class="text-cyan-300">Heap:</span> Arrays stored in heap memory

Example:
→ <span class="text-blue-400">int[] arr = new int[5];</span>
→ <span class="text-cyan-300">Creates:</span> 5 consecutive int locations
→ <span class="text-cyan-300">Default values:</span> 0 for integers`,
      code: `public class ArrayMemory {
    public static void main(String[] args) {
        // Array declaration and memory allocation
        int[] arr = new int[5];
        
        // Memory layout: [0][0][0][0][0]
        // Index:         0  1  2  3  4
        
        // Assigning values
        arr[0] = 10;
        arr[1] = 20;
        arr[2] = 30;
        arr[3] = 40;
        arr[4] = 50;
        
        // Memory layout: [10][20][30][40][50]
        
        System.out.println("Array length: " + arr.length);
        System.out.println("First element: " + arr[0]);
        System.out.println("Last element: " + arr[4]);
    }
}`,
    },
    {
      title: 'Array References',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Array References</span> point to memory locations.

Key Points:
→ <span class="text-cyan-300">Reference variable:</span> Holds address, not values
→ <span class="text-cyan-300">Assignment:</span> Copies reference, not array
→ <span class="text-cyan-300">Multiple references:</span> Can point to same array
→ <span class="text-cyan-300">Null:</span> Reference can be null

Example:
→ <span class="text-blue-400">int[] arr1 = {1, 2, 3};</span>
→ <span class="text-blue-400">int[] arr2 = arr1;</span>
→ <span class="text-cyan-300">Both point to same array</span>`,
      code: `public class ArrayReferences {
    public static void main(String[] args) {
        int[] arr1 = {10, 20, 30};
        int[] arr2 = arr1;  // Both reference same array
        
        System.out.println("arr1[0]: " + arr1[0]);
        System.out.println("arr2[0]: " + arr2[0]);
        
        // Modifying through arr2 affects arr1
        arr2[0] = 100;
        System.out.println("After modification:");
        System.out.println("arr1[0]: " + arr1[0]);  // 100
        System.out.println("arr2[0]: " + arr2[0]);   // 100
        
        // Creating new array
        arr2 = new int[]{1, 2, 3};
        System.out.println("arr1[0]: " + arr1[0]);  // Still 100
        System.out.println("arr2[0]: " + arr2[0]);  // 1
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Explain how arrays are stored in memory. Create an array and trace its memory layout.',
      solution: 'Arrays are stored as contiguous blocks. Each element is stored at consecutive memory locations.',
      solutionCode: `public class MemoryLayout {
    public static void main(String[] args) {
        int[] arr = new int[3];
        arr[0] = 10;
        arr[1] = 20;
        arr[2] = 30;
        
        // Memory: [10][20][30]
        // Index:   0   1   2
        
        for (int i = 0; i < arr.length; i++) {
            System.out.println("arr[" + i + "] = " + arr[i]);
        }
    }
}`,
    },
  ],
}

export default function ArraysMemoryModelPage() {
  return <TopicPage content={content} />
}

