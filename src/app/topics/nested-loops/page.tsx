'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiLayers, FiGrid, FiTriangle, FiBox } from 'react-icons/fi'

const content = {
  title: 'Nested Loops',
  explanationSections: [
    {
      title: 'Introduction to Nested Loops',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Nested loops</span> are loops inside other loops. They are essential for:

→ Working with <span class="text-cyan-300">2D arrays</span> and matrices
→ Printing patterns (stars, numbers, shapes)
→ Processing grid-based data
→ Generating combinations and permutations

<span class="text-amber-300">Key Concept:</span> The <span class="text-blue-400">inner loop</span> completes all its iterations for each single iteration of the <span class="text-blue-400">outer loop</span>.`,
      code: `public class NestedLoopsIntro {
    public static void main(String[] args) {
        // Outer loop: rows
        for (int i = 1; i <= 3; i++) {
            // Inner loop: columns
            for (int j = 1; j <= 3; j++) {
                System.out.print(i + "," + j + " ");
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Pattern Printing - Right Triangle',
      icon: <FiTriangle className="w-6 h-6" />,
      content: `Print patterns where the number of elements increases or decreases per row.

Pattern:
<span class="text-cyan-300">*
**
***
****</span>

Key Points:
→ <span class="text-blue-400">Outer loop</span> controls the number of rows
→ <span class="text-blue-400">Inner loop</span> controls the number of stars per row
→ <span class="text-amber-300">Inner loop condition</span> depends on outer loop variable`,
      code: `public class RightTriangle {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Pattern Printing - Rectangle',
      icon: <FiBox className="w-6 h-6" />,
      content: `Print <span class="text-blue-400 font-semibold">rectangular patterns</span> where each row has the same number of elements.

Pattern:
<span class="text-cyan-300">****
****
****</span>

Key Points:
→ Same number of columns in each row
→ Both loops have <span class="text-cyan-300">fixed limits</span>
→ <span class="text-amber-300">Simple nested loop structure</span>`,
      code: `public class Rectangle {
    public static void main(String[] args) {
        int rows = 3, cols = 4;
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Number Patterns',
      icon: <FiGrid className="w-6 h-6" />,
      content: `Print <span class="text-blue-400 font-semibold">number patterns</span> using nested loops.

Common Patterns:
→ <span class="text-cyan-300">Number pyramid:</span> 1, 12, 123, 1234
→ <span class="text-cyan-300">Reverse number:</span> 1234, 123, 12, 1
→ <span class="text-cyan-300">Same number per row:</span> 1111, 2222, 3333

Key Points:
→ Use <span class="text-blue-400">outer loop variable</span> for row number
→ Use <span class="text-blue-400">inner loop variable</span> for column number
→ <span class="text-amber-300">Print numbers</span> based on loop variables`,
      code: `public class NumberPatterns {
    public static void main(String[] args) {
        // Pattern 1: Number pyramid
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
        
        // Pattern 2: Same number per row
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 4; j++) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Time Complexity',
      content: `Understanding the <span class="text-blue-400 font-semibold">efficiency</span> of nested loops.

Complexity Analysis:
→ <span class="text-cyan-300">Two nested loops:</span> <span class="text-blue-400">O(n²)</span> - quadratic time
→ <span class="text-cyan-300">Three nested loops:</span> <span class="text-blue-400">O(n³)</span> - cubic time
→ <span class="text-amber-300">Total iterations</span> = outer iterations × inner iterations

Example: If outer loop runs <span class="text-cyan-300">5</span> times and inner loop runs <span class="text-cyan-300">3</span> times, total iterations = <span class="text-cyan-300">5 × 3 = 15</span>

<span class="text-amber-300">Important:</span> Be mindful of nested loop complexity in performance-critical applications.`,
      code: `public class Complexity {
    public static void main(String[] args) {
        int count = 0;
        // O(n²) complexity
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                count++;  // This executes 3 × 3 = 9 times
            }
        }
        System.out.println("Total iterations: " + count);
    }
}`,
    },
  ] as ExplanationSection[],
  exampleCode: `public class NestedLoops {
    public static void main(String[] args) {
        // Pattern 1: Rectangle
        System.out.println("Rectangle:");
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 4; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        
        // Pattern 2: Right Triangle
        System.out.println("\\nRight Triangle:");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        
        // Pattern 3: Number Pyramid
        System.out.println("\\nNumber Pyramid:");
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Print the following star pattern using nested loops:\n*\n**\n***\n****',
      solution: 'Use nested loops where the outer loop controls rows and inner loop prints stars. The number of stars per row equals the row number.',
      flowSteps: [
        { id: '1', label: 'Start', type: 'start' },
        { id: '2', label: 'Initialize i = 1', type: 'process' },
        { id: '3', label: 'i <= 4?', type: 'decision' },
        { id: '4', label: 'Initialize j = 1', type: 'process' },
        { id: '5', label: 'j <= i?', type: 'decision' },
        { id: '6', label: 'Print *', type: 'io' },
        { id: '7', label: 'Increment j++', type: 'process' },
        { id: '8', label: 'Print newline', type: 'io' },
        { id: '9', label: 'Increment i++', type: 'process' },
        { id: '10', label: 'End', type: 'end' },
      ],
      solutionCode: `public class StarPattern {
    public static void main(String[] args) {
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class StarPattern {
    public static void main(String[] args) {
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { i: 1 }, output: '', description: 'Outer loop: i = 1, condition (1 <= 4 is true)' },
        { line: 4, vars: { i: 1, j: 1 }, output: '', description: 'Inner loop: j = 1, condition (1 <= 1 is true)' },
        { line: 5, vars: { i: 1, j: 1 }, output: '*', description: 'Printing: *' },
        { line: 4, vars: { i: 1, j: 2 }, output: '*', description: 'Inner loop: j = 2, condition (2 <= 1 is false) - inner loop exits' },
        { line: 6, vars: { i: 1 }, output: '*\\n', description: 'Printing newline after row 1' },
        { line: 3, vars: { i: 2 }, output: '*\\n', description: 'Outer loop: i = 2, condition (2 <= 4 is true)' },
        { line: 4, vars: { i: 2, j: 1 }, output: '*\\n', description: 'Inner loop: j = 1, condition (1 <= 2 is true)' },
        { line: 5, vars: { i: 2, j: 1 }, output: '*\\n*', description: 'Printing: *' },
        { line: 4, vars: { i: 2, j: 2 }, output: '*\\n*', description: 'Inner loop: j = 2, condition (2 <= 2 is true)' },
        { line: 5, vars: { i: 2, j: 2 }, output: '*\\n**', description: 'Printing: *' },
        { line: 4, vars: { i: 2, j: 3 }, output: '*\\n**', description: 'Inner loop: j = 3, condition (3 <= 2 is false) - inner loop exits' },
        { line: 6, vars: { i: 2 }, output: '*\\n**\\n', description: 'Printing newline after row 2' },
        { line: 3, vars: { i: 3 }, output: '*\\n**\\n', description: 'Outer loop: i = 3, condition (3 <= 4 is true)' },
        { line: 4, vars: { i: 3, j: 1 }, output: '*\\n**\\n', description: 'Inner loop: j = 1, condition (1 <= 3 is true)' },
        { line: 5, vars: { i: 3, j: 1 }, output: '*\\n**\\n*', description: 'Printing: *' },
        { line: 4, vars: { i: 3, j: 2 }, output: '*\\n**\\n*', description: 'Inner loop: j = 2, condition (2 <= 3 is true)' },
        { line: 5, vars: { i: 3, j: 2 }, output: '*\\n**\\n**', description: 'Printing: *' },
        { line: 4, vars: { i: 3, j: 3 }, output: '*\\n**\\n**', description: 'Inner loop: j = 3, condition (3 <= 3 is true)' },
        { line: 5, vars: { i: 3, j: 3 }, output: '*\\n**\\n***', description: 'Printing: *' },
        { line: 4, vars: { i: 3, j: 4 }, output: '*\\n**\\n***', description: 'Inner loop: j = 4, condition (4 <= 3 is false) - inner loop exits' },
        { line: 6, vars: { i: 3 }, output: '*\\n**\\n***\\n', description: 'Printing newline after row 3' },
        { line: 3, vars: { i: 4 }, output: '*\\n**\\n***\\n', description: 'Outer loop: i = 4, condition (4 <= 4 is true)' },
        { line: 4, vars: { i: 4, j: 1 }, output: '*\\n**\\n***\\n', description: 'Inner loop: j = 1, condition (1 <= 4 is true)' },
        { line: 5, vars: { i: 4, j: 1 }, output: '*\\n**\\n***\\n*', description: 'Printing: *' },
        { line: 4, vars: { i: 4, j: 2 }, output: '*\\n**\\n***\\n*', description: 'Inner loop: j = 2, condition (2 <= 4 is true)' },
        { line: 5, vars: { i: 4, j: 2 }, output: '*\\n**\\n***\\n**', description: 'Printing: *' },
        { line: 4, vars: { i: 4, j: 3 }, output: '*\\n**\\n***\\n**', description: 'Inner loop: j = 3, condition (3 <= 4 is true)' },
        { line: 5, vars: { i: 4, j: 3 }, output: '*\\n**\\n***\\n***', description: 'Printing: *' },
        { line: 4, vars: { i: 4, j: 4 }, output: '*\\n**\\n***\\n***', description: 'Inner loop: j = 4, condition (4 <= 4 is true)' },
        { line: 5, vars: { i: 4, j: 4 }, output: '*\\n**\\n***\\n****', description: 'Printing: *' },
        { line: 4, vars: { i: 4, j: 5 }, output: '*\\n**\\n***\\n****', description: 'Inner loop: j = 5, condition (5 <= 4 is false) - inner loop exits' },
        { line: 6, vars: { i: 4 }, output: '*\\n**\\n***\\n****\\n', description: 'Printing newline after row 4' },
        { line: 3, vars: { i: 5 }, output: '*\\n**\\n***\\n****\\n', description: 'Outer loop: i = 5, condition (5 <= 4 is false) - outer loop exits' },
      ] as DryRunStep[],
    },
  ] as PracticeQuestion[],
  dryRunCode: `public class NestedLoops {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.print(i + "," + j + " ");
            }
            System.out.println();
        }
    }
}`,
  dryRunSteps: [
    {
      line: 3,
      vars: { i: 1 },
      output: '',
      description: 'Outer loop: i = 1, condition (1 <= 3 is true)',
    },
    {
      line: 4,
      vars: { i: 1, j: 1 },
      output: '',
      description: 'Inner loop: j = 1, condition (1 <= 3 is true)',
    },
    {
      line: 5,
      vars: { i: 1, j: 1 },
      output: '1,1 ',
      description: 'Printing i=1, j=1',
    },
    {
      line: 4,
      vars: { i: 1, j: 2 },
      output: '1,1 ',
      description: 'Inner loop: j = 2, condition (2 <= 3 is true)',
    },
    {
      line: 5,
      vars: { i: 1, j: 2 },
      output: '1,1 1,2 ',
      description: 'Printing i=1, j=2',
    },
    {
      line: 4,
      vars: { i: 1, j: 3 },
      output: '1,1 1,2 ',
      description: 'Inner loop: j = 3, condition (3 <= 3 is true)',
    },
    {
      line: 5,
      vars: { i: 1, j: 3 },
      output: '1,1 1,2 1,3 ',
      description: 'Printing i=1, j=3',
    },
    {
      line: 4,
      vars: { i: 1, j: 4 },
      output: '1,1 1,2 1,3 ',
      description: 'Inner loop: j = 4, condition (4 <= 3 is false) - inner loop exits',
    },
    {
      line: 6,
      vars: { i: 1 },
      output: '1,1 1,2 1,3 \\n',
      description: 'Printing newline after inner loop completes',
    },
    {
      line: 3,
      vars: { i: 2 },
      output: '1,1 1,2 1,3 \\n',
      description: 'Outer loop: i = 2, condition (2 <= 3 is true)',
    },
    {
      line: 4,
      vars: { i: 2, j: 1 },
      output: '1,1 1,2 1,3 \\n',
      description: 'Inner loop: j = 1, condition (1 <= 3 is true)',
    },
    {
      line: 5,
      vars: { i: 2, j: 1 },
      output: '1,1 1,2 1,3 \\n2,1 ',
      description: 'Printing i=2, j=1',
    },
    {
      line: 4,
      vars: { i: 2, j: 2 },
      output: '1,1 1,2 1,3 \\n2,1 ',
      description: 'Inner loop: j = 2, condition (2 <= 3 is true)',
    },
    {
      line: 5,
      vars: { i: 2, j: 2 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 ',
      description: 'Printing i=2, j=2',
    },
    {
      line: 4,
      vars: { i: 2, j: 3 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 ',
      description: 'Inner loop: j = 3, condition (3 <= 3 is true)',
    },
    {
      line: 5,
      vars: { i: 2, j: 3 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 ',
      description: 'Printing i=2, j=3',
    },
    {
      line: 4,
      vars: { i: 2, j: 4 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 ',
      description: 'Inner loop: j = 4, condition (4 <= 3 is false) - inner loop exits',
    },
    {
      line: 6,
      vars: { i: 2 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n',
      description: 'Printing newline after inner loop completes',
    },
    {
      line: 3,
      vars: { i: 3 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n',
      description: 'Outer loop: i = 3, condition (3 <= 3 is true)',
    },
    {
      line: 4,
      vars: { i: 3, j: 1 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n',
      description: 'Inner loop: j = 1, condition (1 <= 3 is true)',
    },
    {
      line: 5,
      vars: { i: 3, j: 1 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n3,1 ',
      description: 'Printing i=3, j=1',
    },
    {
      line: 4,
      vars: { i: 3, j: 2 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n3,1 ',
      description: 'Inner loop: j = 2, condition (2 <= 3 is true)',
    },
    {
      line: 5,
      vars: { i: 3, j: 2 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n3,1 3,2 ',
      description: 'Printing i=3, j=2',
    },
    {
      line: 4,
      vars: { i: 3, j: 3 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n3,1 3,2 ',
      description: 'Inner loop: j = 3, condition (3 <= 3 is true)',
    },
    {
      line: 5,
      vars: { i: 3, j: 3 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n3,1 3,2 3,3 ',
      description: 'Printing i=3, j=3',
    },
    {
      line: 4,
      vars: { i: 3, j: 4 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n3,1 3,2 3,3 ',
      description: 'Inner loop: j = 4, condition (4 <= 3 is false) - inner loop exits',
    },
    {
      line: 6,
      vars: { i: 3 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n3,1 3,2 3,3 \\n',
      description: 'Printing newline after inner loop completes',
    },
    {
      line: 3,
      vars: { i: 4 },
      output: '1,1 1,2 1,3 \\n2,1 2,2 2,3 \\n3,1 3,2 3,3 \\n',
      description: 'Outer loop: i = 4, condition (4 <= 3 is false) - outer loop exits',
    },
  ] as DryRunStep[],
}

export default function NestedLoopsPage() {
  return <TopicPage content={content} />
}
