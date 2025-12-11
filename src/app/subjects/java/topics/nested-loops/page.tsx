'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiLayers, FiGrid, FiTriangle, FiBox, FiClock } from 'react-icons/fi'

const content = {
  title: 'Nested Loops',
  explanationSections: [
    {
      title: 'Introduction: The Clockwork',
      icon: <FiClock className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p>
            <span className="text-blue-400 font-semibold">Nested Loops</span> are loops placed inside other loops.
            Think of a <span className="text-cyan-400 font-bold">digital clock</span>.
          </p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-yellow-400 font-semibold">Outer Loop (Hours):</span> Moves slowly (0 to 23).
              </li>
              <li>
                <span className="text-yellow-400 font-semibold">Inner Loop (Minutes):</span> Must complete 60 iterations (0 to 59) for <span className="text-amber-300">every single</span> iteration of the Hour loop.
              </li>
              <li>
                <span className="text-purple-400">Result:</span> The minute hand spins continuously while the hour hand ticks step-by-step.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Basic Structure',
      icon: <FiLayers className="w-6 h-6" />,
      content: `The <span className="text-blue-400 font-semibold">inner loop</span> completes all its iterations for each single iteration of the <span className="text-blue-400">outer loop</span>.

Common Uses:
→ Working with <span className="text-cyan-300">2D arrays</span> (Rows & Columns)
→ Printing patterns (Stars, Pyramids)
→ Generating combinations

<span className="text-amber-300">Key rule:</span> Does the inner loop depend on the outer loop index? (e.g., in a triangle pattern, yes; in a rectangle, no).`,
      code: `public class NestedLoopsIntro {
    public static void main(String[] args) {
        // Outer loop: rows
        for (int i = 1; i <= 3; i++) {
            System.out.print("Row " + i + ": ");
            
            // Inner loop: columns
            for (int j = 1; j <= 3; j++) {
                System.out.print(j + " ");
            }
            System.out.println(); // New line after inner loop finishes
        }
    }
}`,
    },
    {
      title: 'Pattern Printing - Right Triangle',
      icon: <FiTriangle className="w-6 h-6" />,
      content: `Print patterns where the number of elements increases or decreases per row.

Pattern:
<span className="text-cyan-300">*
**
***
****</span>

Key Points:
→ <span className="text-blue-400">Outer loop (i)</span> controls the number of rows.
→ <span className="text-blue-400">Inner loop (j)</span> runs <span className="text-cyan-300">i</span> times.
→ <span className="text-amber-300">Dependency:</span> The limit of j depends on i.`,
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
      content: `Print <span className="text-blue-400 font-semibold">rectangular patterns</span> where each row has the same number of elements.

Pattern:
<span className="text-cyan-300">****
****
****</span>

Key Points:
→ Same number of columns in each row.
→ Both loops have <span className="text-cyan-300">fixed limits</span>.
→ <span className="text-amber-300">No Dependency:</span> Inner loop runs a fixed number of times regardless of outer loop.`,
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
      title: 'Time Complexity Warning',
      icon: <FiGrid className="w-6 h-6" />,
      content: `Nested loops multiply the number of operations.

Analysis:
→ <span className="text-cyan-300">Two nested loops:</span> <span className="text-blue-400">O(n²)</span> (Quadratic)
→ <span className="text-cyan-300">Three nested loops:</span> <span className="text-blue-400">O(n³)</span> (Cubic)

<span className="text-red-300">Calculate iterations:</span> Outer Limit × Inner Limit.
Example: 5 rows × 3 columns = 15 total iterations.`,
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
  exampleProblems: [
    {
      problem: 'Digital Clock Simulator',
      solution: 'Simulate a clock\'s hour and minute changes using nested loops.',
      steps: [
        {
          step: '1. Outer Loop (Hours)',
          explanation: 'Iterates from 0 to 23 (representing hours).'
        },
        {
          step: '2. Inner Loop (Minutes)',
          explanation: 'Iterates from 0 to 59 (representing minutes). Runs fully for every hour.'
        },
        {
          step: '3. Formatting',
          explanation: (
            <div className="font-mono text-sm">
              for (int h = 0; h &lt; 24; h++) &#123;<br />
              &nbsp;&nbsp;for (int m = 0; m &lt; 60; m++) &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;System.out.printf(&quot;%02d:%02d\\n&quot;, h, m);<br />
              &nbsp;&nbsp;&#125;<br />
              &#125;
            </div>
          )
        }
      ],
      code: `public class DigitalClock {
    public static void main(String[] args) {
        // Just showing 0-2 hours and 0-2 minutes for brevity
        for (int h = 0; h < 3; h++) {
            for (int m = 0; m < 3; m++) {
                System.out.println(h + ":" + m);
            }
        }
    }
}`
    }
  ] as ExampleProblem[],
  practiceQuestions: [
    {
      question: 'Print a Right Triangle Star Pattern.',
      solution: 'Use nested loops where the outer loop controls rows and inner loop prints stars. The number of stars per row equals the row number.',
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
    },
    {
      question: 'Print an Inverted Right Triangle.',
      solution: 'Outer loop runs from N down to 1. Inner loop runs from 1 to i.',
      solutionCode: `public class InvertedStar {
    public static void main(String[] args) {
        for (int i = 4; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`
    },
    {
      question: 'Print a Multiplication Table Grid (1 to 3).',
      solution: 'Print a 3x3 grid where each cell is row * column.',
      solutionCode: `public class GridMultiplication {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.print((i * j) + "\\t");
            }
            System.out.println();
        }
    }
}`
    }
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
  return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
