'use client'

import DMTopicPage, { ExplanationSection, PracticeQuestion, ExampleProblem } from '@/components/DMTopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiLayers, FiGrid, FiTriangle, FiStar, FiHash, FiType } from 'react-icons/fi'

const content = {
    title: 'Patterns',
    explanationSections: [
        {
            title: 'Introduction: The Digital Architect',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p>
                        <span className="text-blue-400 font-semibold">Pattern Programming</span> is about mastering loops.
                        Think of it as <span className="text-cyan-400 font-bold">Digital Origami</span>. You are folding code into shapes.
                    </p>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-yellow-400 font-semibold">The Grid:</span> Your console is a 2D grid. The Outer Loop controls <span className="text-amber-300">Rows</span> (Y-axis). The Inner Loop controls <span className="text-amber-300">Columns</span> (X-axis).
                            </li>
                            <li>
                                <span className="text-yellow-400 font-semibold">The Logic:</span> You decide what to print at each coordinate (row, col). A star? A number? A space?
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: 'Triangle Patterns',
            icon: <FiTriangle className="w-6 h-6" />,
            content: `The most common patterns. Use the relationship between <span className="text-cyan-300">i</span> (row) and <span className="text-cyan-300">j</span> (col).

1. <span className="text-blue-400 font-semibold">Right-Angled Triangle:</span>
   - Logic: Print star if \`j <= i\`
   - Result:
     *
     **
     ***

2. <span className="text-blue-400 font-semibold">Inverted Triangle:</span>
   - Logic: Outer loop counts down (n to 1) OR Inner loop \`j <= (n - i + 1)\`
   - Result:
     ***
     **
     *`,
            code: `public class Triangles {
    public static void main(String[] args) {
        int n = 3;
        // Right Triangle
        for (int i=1; i<=n; i++) {
            for (int j=1; j<=i; j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
        },
        {
            title: 'Pyramid Patterns (Advanced)',
            icon: <FiStar className="w-6 h-6" />,
            content: `A pyramid needs <span className="text-blue-400 font-semibold">Spaces</span> before Stars.

Logic for Row \`i\` (assuming Total Rows \`n\`):
1. Print <span className="text-cyan-300">n - i</span> spaces.
2. Print <span className="text-cyan-300">2*i - 1</span> stars.

Example (n=3):
Row 1: 2 spaces, 1 star  (  *  )
Row 2: 1 space, 3 stars  ( *** )
Row 3: 0 spaces, 5 stars (*****)`,
            code: `public class Pyramid {
    public static void main(String[] args) {
        int n = 3;
        for (int i=1; i<=n; i++) {
            // Spaces
            for (int s=1; s<=n-i; s++) System.out.print(" ");
            // Stars
            for (int k=1; k <= 2*i-1; k++) System.out.print("*");
            
            System.out.println();
        }
    }
}`,
        }
    ] as ExplanationSection[],
    exampleProblems: [
        {
            problem: 'Diamond Pattern',
            solution: 'Combine an upright pyramid and an inverted pyramid.',
            steps: [
                {
                    step: '1. Upper Half',
                    explanation: 'Print a standard pyramid for n rows.'
                },
                {
                    step: '2. Lower Half',
                    explanation: 'Print an inverted pyramid for n-1 rows (to avoid duplicating the middle row).'
                }
            ],
            code: `public class Diamond {
    public static void main(String[] args) {
        int n = 3;
        // Upper
        for (int i=1; i<=n; i++) {
             for (int s=1; s<=n-i; s++) System.out.print(" ");
             for (int k=1; k<=2*i-1; k++) System.out.print("*");
             System.out.println();
        }
        // Lower
        for (int i=n-1; i>=1; i--) {
             for (int s=1; s<=n-i; s++) System.out.print(" ");
             for (int k=1; k<=2*i-1; k++) System.out.print("*");
             System.out.println();
        }
    }
}`
        }
    ] as ExampleProblem[],
    practiceQuestions: [
        {
            question: 'Print a Number Triangle: \n1\n12\n123',
            solution: 'Use nested loops: Inner loop prints j.',
            solutionCode: `public class NumTriangle {
    public static void main(String[] args) {
        for (int i=1; i<=3; i++) {
            for (int j=1; j<=i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`
        },
        {
            question: 'Print Floyd\'s Triangle:\n1\n2 3\n4 5 6',
            solution: 'Use a separate counter variable that increments every time you print.',
            solutionCode: `public class Floyds {
    public static void main(String[] args) {
        int count = 1;
        for (int i=1; i<=3; i++) {
            for (int j=1; j<=i; j++) {
                System.out.print(count + " ");
                count++;
            }
            System.out.println();
        }
    }
}`
        }
    ] as PracticeQuestion[],
    dryRunCode: `public class NumTriangle {
    public static void main(String[] args) {
        for (int i=1; i<=3; i++) {
            for (int j=1; j<=i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`,
    dryRunSteps: [
        { line: 3, vars: { i: 1 }, output: '', description: 'Outer i=1' },
        { line: 4, vars: { i: 1, j: 1 }, output: '', description: 'Inner j=1' },
        { line: 5, vars: { i: 1, j: 1 }, output: '1', description: 'Print 1' },
        { line: 4, vars: { i: 1, j: 2 }, output: '', description: 'Inner Exit (2>1)' },
        { line: 7, vars: { i: 1 }, output: '1\\n', description: 'Newline' },
        { line: 3, vars: { i: 2 }, output: '', description: 'Outer i=2' },
        { line: 4, vars: { i: 2, j: 1 }, output: '', description: 'Inner j=1' },
        { line: 5, vars: { i: 2, j: 1 }, output: '1\\n1', description: 'Print 1' },
        { line: 4, vars: { i: 2, j: 2 }, output: '', description: 'Inner j=2' },
        { line: 5, vars: { i: 2, j: 2 }, output: '1\\n12', description: 'Print 2' },
        { line: 4, vars: { i: 2, j: 3 }, output: '', description: 'Inner Exit (3>2)' },
        { line: 7, vars: { i: 2 }, output: '1\\n12\\n', description: 'Newline' },
    ] as DryRunStep[]
}

export default function PatternsPage() {
    return <DMTopicPage content={content} subjectHref="/subjects/java" subjectName="Java Programming" />
}
