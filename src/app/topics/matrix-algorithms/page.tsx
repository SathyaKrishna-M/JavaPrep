'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { FiGrid, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Matrix Algorithms',
  explanationSections: [
    {
      title: 'Matrix Transpose',
      icon: <FiGrid className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Transpose</span> swaps rows and columns.

Algorithm:
→ <span class="text-cyan-300">Swap:</span> matrix[i][j] with matrix[j][i]
→ <span class="text-cyan-300">Diagonal:</span> Elements on diagonal stay same
→ <span class="text-cyan-300">Result:</span> Rows become columns

Time Complexity: O(n²)
Space Complexity: O(1) for in-place`,
      code: `public class MatrixTranspose {
    public static void transpose(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Swap
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
    }
    
    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        transpose(matrix);
        // Result: {{1, 4, 7}, {2, 5, 8}, {3, 6, 9}}
    }
}`,
    },
    {
      title: 'Matrix Rotation',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Matrix Rotation</span> rotates matrix by 90 degrees.

Algorithm:
→ <span class="text-cyan-300">Transpose:</span> First transpose matrix
→ <span class="text-cyan-300">Reverse rows:</span> Reverse each row
→ <span class="text-cyan-300">Result:</span> 90° clockwise rotation

Time Complexity: O(n²)
Space Complexity: O(1)`,
      code: `public class MatrixRotation {
    public static void rotate90(int[][] matrix) {
        int n = matrix.length;
        
        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        
        // Reverse each row
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
    
    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        rotate90(matrix);
    }
}`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Implement matrix transpose algorithm.',
      solution: 'Swap matrix[i][j] with matrix[j][i] for all i < j.',
      solutionCode: `public class TransposeDemo {
    public static void transpose(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            for (int j = i + 1; j < matrix[i].length; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
    }
    
    public static void main(String[] args) {
        int[][] matrix = {{1, 2}, {3, 4}};
        transpose(matrix);
    }
}`,
    },
  ],
}

export default function MatrixAlgorithmsPage() {
  return <TopicPage content={content} />
}

