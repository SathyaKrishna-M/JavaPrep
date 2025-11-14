'use client'

import TopicPage, { ExplanationSection, PracticeQuestion } from '@/components/TopicPage'
import { DryRunStep } from '@/components/DryRunVisualizer'
import { FiStar, FiType, FiHash, FiLayers, FiTriangle } from 'react-icons/fi'

const content = {
  title: 'Patterns',
  explanationSections: [
    {
      title: 'Introduction to Patterns',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Patterns</span> are arrangements of characters, numbers, or symbols that follow a specific rule or logic.

Patterns are essential for:
→ Understanding <span class="text-cyan-300">nested loop logic</span>
→ Strengthening <span class="text-cyan-300">problem-solving skills</span>
→ Visualizing <span class="text-cyan-300">iterative processes</span>
→ Preparing for <span class="text-cyan-300">coding interviews</span>

<span class="text-amber-300">Key Concept:</span> Patterns use <span class="text-blue-400">nested loops</span> where the outer loop controls rows and the inner loop controls columns. The number of elements per row depends on the relationship between loop variables.`,
      code: `public class PatternIntro {
    public static void main(String[] args) {
        int n = 5;
        // Left-aligned star pattern
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
      title: 'Left-Aligned Patterns',
      icon: <FiTriangle className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Left-aligned patterns</span> start from the left side and increase in width downward.

Characteristics:
→ Elements start from the <span class="text-cyan-300">left margin</span>
→ Number of elements <span class="text-cyan-300">increases</span> with each row
→ <span class="text-blue-400">Outer loop</span> controls row number (i)
→ <span class="text-blue-400">Inner loop</span> runs from 1 to i (current row number)

Logic:
→ Row 1: print 1 element
→ Row 2: print 2 elements
→ Row 3: print 3 elements
→ Row n: print n elements

<span class="text-amber-300">Pattern:</span>
<span class="text-cyan-300">*
**
***
****
*****</span>`,
      code: `public class LeftAlignedPattern {
    public static void main(String[] args) {
        int n = 5;
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
      title: 'Inverted Left-Aligned Patterns',
      icon: <FiTriangle className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Inverted left-aligned patterns</span> start wide at the top and decrease in width downward.

Characteristics:
→ Elements start from the <span class="text-cyan-300">left margin</span>
→ Number of elements <span class="text-cyan-300">decreases</span> with each row
→ <span class="text-blue-400">Outer loop</span> runs from n down to 1
→ <span class="text-blue-400">Inner loop</span> runs from 1 to i (current row number)

Logic:
→ Row 1: print n elements
→ Row 2: print (n-1) elements
→ Row 3: print (n-2) elements
→ Row n: print 1 element

<span class="text-amber-300">Pattern:</span>
<span class="text-cyan-300">*****
****
***
**
*</span>`,
      code: `public class InvertedLeftAligned {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Star Patterns - Left Aligned',
      icon: <FiStar className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Left-aligned star patterns</span> print stars starting from the left side, increasing downward.

Pattern:
<span class="text-cyan-300">*
**
***
****
*****</span>

Step-by-step logic:
→ <span class="text-blue-400">Outer loop (i):</span> Runs from 1 to n (rows)
→ <span class="text-blue-400">Inner loop (j):</span> Runs from 1 to i (stars per row)
→ <span class="text-cyan-300">Row 1:</span> i=1, print 1 star
→ <span class="text-cyan-300">Row 2:</span> i=2, print 2 stars
→ <span class="text-cyan-300">Row 3:</span> i=3, print 3 stars
→ <span class="text-cyan-300">Row n:</span> i=n, print n stars

<span class="text-amber-300">Key:</span> Number of stars = row number (j runs from 1 to i)`,
      code: `public class LeftStarPattern {
    public static void main(String[] args) {
        int n = 5;
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
      title: 'Star Patterns - Inverted Left Aligned',
      icon: <FiStar className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Inverted left-aligned star patterns</span> print stars starting from the left, decreasing downward.

Pattern:
<span class="text-cyan-300">*****
****
***
**
*</span>

Step-by-step logic:
→ <span class="text-blue-400">Outer loop (i):</span> Runs from n down to 1 (decreasing rows)
→ <span class="text-blue-400">Inner loop (j):</span> Runs from 1 to i (stars per row)
→ <span class="text-cyan-300">Row 1:</span> i=5, print 5 stars
→ <span class="text-cyan-300">Row 2:</span> i=4, print 4 stars
→ <span class="text-cyan-300">Row 3:</span> i=3, print 3 stars
→ <span class="text-cyan-300">Row n:</span> i=1, print 1 star

<span class="text-amber-300">Key:</span> Outer loop decrements (i--), number of stars decreases with each row`,
      code: `public class InvertedLeftStarPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Number Patterns - Left Aligned',
      icon: <FiHash className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Left-aligned number patterns</span> print numbers starting from the left, increasing sequentially.

Pattern:
<span class="text-cyan-300">1
12
123
1234
12345</span>

Step-by-step logic:
→ <span class="text-blue-400">Outer loop (i):</span> Runs from 1 to n (rows)
→ <span class="text-blue-400">Inner loop (j):</span> Runs from 1 to i, prints j (numbers)
→ <span class="text-cyan-300">Row 1:</span> Print numbers 1 to 1 → "1"
→ <span class="text-cyan-300">Row 2:</span> Print numbers 1 to 2 → "12"
→ <span class="text-cyan-300">Row 3:</span> Print numbers 1 to 3 → "123"
→ <span class="text-cyan-300">Row n:</span> Print numbers 1 to n → "123...n"

<span class="text-amber-300">Key:</span> Print inner loop variable (j) instead of star, j starts from 1`,
      code: `public class LeftNumberPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Number Patterns - Inverted Left Aligned',
      icon: <FiHash className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Inverted left-aligned number patterns</span> print numbers starting from the left, decreasing sequentially.

Pattern:
<span class="text-cyan-300">12345
1234
123
12
1</span>

Step-by-step logic:
→ <span class="text-blue-400">Outer loop (i):</span> Runs from n down to 1 (decreasing rows)
→ <span class="text-blue-400">Inner loop (j):</span> Runs from 1 to i, prints j (numbers)
→ <span class="text-cyan-300">Row 1:</span> Print numbers 1 to 5 → "12345"
→ <span class="text-cyan-300">Row 2:</span> Print numbers 1 to 4 → "1234"
→ <span class="text-cyan-300">Row 3:</span> Print numbers 1 to 3 → "123"
→ <span class="text-cyan-300">Row n:</span> Print number 1 → "1"

<span class="text-amber-300">Key:</span> Outer loop decrements, inner loop still prints from 1 to i`,
      code: `public class InvertedLeftNumberPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Alphabet Patterns - Left Aligned',
      icon: <FiType className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Left-aligned alphabet patterns</span> print letters starting from the left, increasing sequentially.

Pattern:
<span class="text-cyan-300">A
AB
ABC
ABCD
ABCDE</span>

Step-by-step logic:
→ <span class="text-blue-400">Outer loop (i):</span> Runs from 1 to n (rows)
→ <span class="text-blue-400">Inner loop (j):</span> Runs from 1 to i, prints character
→ <span class="text-cyan-300">Character conversion:</span> (char)('A' + j - 1)
→ <span class="text-cyan-300">Row 1:</span> Print A → "A"
→ <span class="text-cyan-300">Row 2:</span> Print A, B → "AB"
→ <span class="text-cyan-300">Row 3:</span> Print A, B, C → "ABC"
→ <span class="text-cyan-300">Row n:</span> Print A to nth letter → "ABC...N"

<span class="text-amber-300">Key:</span> Convert number to letter using ASCII: (char)('A' + j - 1)`,
      code: `public class LeftAlphabetPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print((char)('A' + j - 1));
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Alphabet Patterns - Inverted Left Aligned',
      icon: <FiType className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Inverted left-aligned alphabet patterns</span> print letters starting from the left, decreasing sequentially.

Pattern:
<span class="text-cyan-300">ABCDE
ABCD
ABC
AB
A</span>

Step-by-step logic:
→ <span class="text-blue-400">Outer loop (i):</span> Runs from n down to 1 (decreasing rows)
→ <span class="text-blue-400">Inner loop (j):</span> Runs from 1 to i, prints character
→ <span class="text-cyan-300">Character conversion:</span> (char)('A' + j - 1)
→ <span class="text-cyan-300">Row 1:</span> Print A to E → "ABCDE"
→ <span class="text-cyan-300">Row 2:</span> Print A to D → "ABCD"
→ <span class="text-cyan-300">Row 3:</span> Print A to C → "ABC"
→ <span class="text-cyan-300">Row n:</span> Print A → "A"

<span class="text-amber-300">Key:</span> Outer loop decrements, inner loop still prints from A to ith letter`,
      code: `public class InvertedLeftAlphabetPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print((char)('A' + j - 1));
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Mixed Patterns - Same Number Repeated',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Same number repeated pattern</span> prints the row number repeated in each row.

Pattern:
<span class="text-cyan-300">1
22
333
4444
55555</span>

Step-by-step logic:
→ <span class="text-blue-400">Outer loop (i):</span> Runs from 1 to n (rows)
→ <span class="text-blue-400">Inner loop (j):</span> Runs from 1 to i, prints i (row number)
→ <span class="text-cyan-300">Row 1:</span> Print "1" (i=1, repeated 1 time)
→ <span class="text-cyan-300">Row 2:</span> Print "22" (i=2, repeated 2 times)
→ <span class="text-cyan-300">Row 3:</span> Print "333" (i=3, repeated 3 times)
→ <span class="text-cyan-300">Row n:</span> Print "nnn...n" (i=n, repeated n times)

<span class="text-amber-300">Key:</span> Print outer loop variable (i) instead of inner loop variable (j)`,
      code: `public class SameNumberPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i);
            }
            System.out.println();
        }
    }
}`,
    },
    {
      title: 'Mixed Patterns - Alternating Characters',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Alternating character pattern</span> prints alternating characters in each row.

Pattern Example:
<span class="text-cyan-300">A
AB
ABA
ABAB
ABABA</span>

Step-by-step logic:
→ <span class="text-blue-400">Outer loop (i):</span> Runs from 1 to n (rows)
→ <span class="text-blue-400">Inner loop (j):</span> Runs from 1 to i, prints based on j%2
→ <span class="text-cyan-300">If j is odd:</span> Print 'A'
→ <span class="text-cyan-300">If j is even:</span> Print 'B'
→ <span class="text-cyan-300">Row 1:</span> j=1 (odd) → "A"
→ <span class="text-cyan-300">Row 2:</span> j=1,2 → "AB"
→ <span class="text-cyan-300">Row 3:</span> j=1,2,3 → "ABA"

<span class="text-amber-300">Key:</span> Use condition (j % 2 == 1) to alternate characters`,
      code: `public class AlternatingPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                if (j % 2 == 1) {
                    System.out.print("A");
                } else {
                    System.out.print("B");
                }
            }
            System.out.println();
        }
    }
}`,
    },
  ] as ExplanationSection[],
  exampleCode: `public class Patterns {
    public static void main(String[] args) {
        int n = 5;
        
        // Left-aligned star pattern
        System.out.println("Left-Aligned Star Pattern:");
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        
        // Inverted left-aligned star pattern
        System.out.println("\\nInverted Left-Aligned Star Pattern:");
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        
        // Left-aligned number pattern
        System.out.println("\\nLeft-Aligned Number Pattern:");
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
        
        // Inverted left-aligned number pattern
        System.out.println("\\nInverted Left-Aligned Number Pattern:");
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`,
  practiceQuestions: [
    {
      question: 'Print a left-aligned star pattern for n rows:\n*\n**\n***\n****\n*****',
      solution: 'Use nested loops where the outer loop controls rows (1 to n) and the inner loop prints stars (1 to i). The number of stars equals the row number.',
      solutionCode: `public class LeftStarPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class LeftStarPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5, i: 1 }, output: '', description: 'Outer loop: i = 1, condition (1 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 1, j: 1 }, output: '', description: 'Inner loop: j = 1, condition (1 <= 1 is true)' },
        { line: 5, vars: { n: 5, i: 1, j: 1 }, output: '*', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 1, j: 2 }, output: '*', description: 'Inner loop: j = 2, condition (2 <= 1 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 1 }, output: '*\\n', description: 'Printing newline after row 1' },
        { line: 3, vars: { n: 5, i: 2 }, output: '*\\n', description: 'Outer loop: i = 2, condition (2 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 2, j: 1 }, output: '*\\n', description: 'Inner loop: j = 1, condition (1 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 1 }, output: '*\\n*', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 2, j: 2 }, output: '*\\n*', description: 'Inner loop: j = 2, condition (2 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 2 }, output: '*\\n**', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 2, j: 3 }, output: '*\\n**', description: 'Inner loop: j = 3, condition (3 <= 2 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 2 }, output: '*\\n**\\n', description: 'Printing newline after row 2' },
        { line: 3, vars: { n: 5, i: 3 }, output: '*\\n**\\n', description: 'Outer loop: i = 3, condition (3 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 3, j: 1 }, output: '*\\n**\\n', description: 'Inner loop: j = 1, condition (1 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 1 }, output: '*\\n**\\n*', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 3, j: 2 }, output: '*\\n**\\n*', description: 'Inner loop: j = 2, condition (2 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 2 }, output: '*\\n**\\n**', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 3, j: 3 }, output: '*\\n**\\n**', description: 'Inner loop: j = 3, condition (3 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 3 }, output: '*\\n**\\n***', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 3, j: 4 }, output: '*\\n**\\n***', description: 'Inner loop: j = 4, condition (4 <= 3 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 3 }, output: '*\\n**\\n***\\n', description: 'Printing newline after row 3' },
      ] as DryRunStep[],
    },
    {
      question: 'Print an inverted left-aligned star pattern for n rows:\n*****\n****\n***\n**\n*',
      solution: 'Use nested loops where the outer loop runs from n down to 1 (decreasing) and the inner loop prints stars from 1 to i. The number of stars decreases with each row.',
      solutionCode: `public class InvertedLeftStarPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class InvertedLeftStarPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5, i: 5 }, output: '', description: 'Outer loop: i = 5, condition (5 >= 1 is true)' },
        { line: 4, vars: { n: 5, i: 5, j: 1 }, output: '', description: 'Inner loop: j = 1, condition (1 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 1 }, output: '*', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 5, j: 2 }, output: '*', description: 'Inner loop: j = 2, condition (2 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 2 }, output: '**', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 5, j: 3 }, output: '**', description: 'Inner loop: j = 3, condition (3 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 3 }, output: '***', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 5, j: 4 }, output: '***', description: 'Inner loop: j = 4, condition (4 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 4 }, output: '****', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 5, j: 5 }, output: '****', description: 'Inner loop: j = 5, condition (5 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 5 }, output: '*****', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 5, j: 6 }, output: '*****', description: 'Inner loop: j = 6, condition (6 <= 5 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 5 }, output: '*****\\n', description: 'Printing newline after row 1' },
        { line: 3, vars: { n: 5, i: 4 }, output: '*****\\n', description: 'Outer loop: i = 4, condition (4 >= 1 is true)' },
        { line: 4, vars: { n: 5, i: 4, j: 1 }, output: '*****\\n', description: 'Inner loop: j = 1, condition (1 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 1 }, output: '*****\\n*', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 4, j: 2 }, output: '*****\\n*', description: 'Inner loop: j = 2, condition (2 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 2 }, output: '*****\\n**', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 4, j: 3 }, output: '*****\\n**', description: 'Inner loop: j = 3, condition (3 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 3 }, output: '*****\\n***', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 4, j: 4 }, output: '*****\\n***', description: 'Inner loop: j = 4, condition (4 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 4 }, output: '*****\\n****', description: 'Printing: *' },
        { line: 4, vars: { n: 5, i: 4, j: 5 }, output: '*****\\n****', description: 'Inner loop: j = 5, condition (5 <= 4 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 4 }, output: '*****\\n****\\n', description: 'Printing newline after row 2' },
      ] as DryRunStep[],
    },
    {
      question: 'Print a left-aligned number pattern (Floyd\'s Triangle) for n rows:\n1\n12\n123\n1234\n12345',
      solution: 'Use nested loops where the outer loop controls rows (1 to n) and the inner loop prints numbers from 1 to i. Print the inner loop variable (j) instead of stars.',
      solutionCode: `public class LeftNumberPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class LeftNumberPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5, i: 1 }, output: '', description: 'Outer loop: i = 1, condition (1 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 1, j: 1 }, output: '', description: 'Inner loop: j = 1, condition (1 <= 1 is true)' },
        { line: 5, vars: { n: 5, i: 1, j: 1 }, output: '1', description: 'Printing: 1' },
        { line: 4, vars: { n: 5, i: 1, j: 2 }, output: '1', description: 'Inner loop: j = 2, condition (2 <= 1 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 1 }, output: '1\\n', description: 'Printing newline after row 1' },
        { line: 3, vars: { n: 5, i: 2 }, output: '1\\n', description: 'Outer loop: i = 2, condition (2 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 2, j: 1 }, output: '1\\n', description: 'Inner loop: j = 1, condition (1 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 1 }, output: '1\\n1', description: 'Printing: 1' },
        { line: 4, vars: { n: 5, i: 2, j: 2 }, output: '1\\n1', description: 'Inner loop: j = 2, condition (2 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 2 }, output: '1\\n12', description: 'Printing: 2' },
        { line: 4, vars: { n: 5, i: 2, j: 3 }, output: '1\\n12', description: 'Inner loop: j = 3, condition (3 <= 2 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 2 }, output: '1\\n12\\n', description: 'Printing newline after row 2' },
        { line: 3, vars: { n: 5, i: 3 }, output: '1\\n12\\n', description: 'Outer loop: i = 3, condition (3 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 3, j: 1 }, output: '1\\n12\\n', description: 'Inner loop: j = 1, condition (1 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 1 }, output: '1\\n12\\n1', description: 'Printing: 1' },
        { line: 4, vars: { n: 5, i: 3, j: 2 }, output: '1\\n12\\n1', description: 'Inner loop: j = 2, condition (2 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 2 }, output: '1\\n12\\n12', description: 'Printing: 2' },
        { line: 4, vars: { n: 5, i: 3, j: 3 }, output: '1\\n12\\n12', description: 'Inner loop: j = 3, condition (3 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 3 }, output: '1\\n12\\n123', description: 'Printing: 3' },
        { line: 4, vars: { n: 5, i: 3, j: 4 }, output: '1\\n12\\n123', description: 'Inner loop: j = 4, condition (4 <= 3 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 3 }, output: '1\\n12\\n123\\n', description: 'Printing newline after row 3' },
      ] as DryRunStep[],
    },
    {
      question: 'Print an inverted left-aligned number pattern for n rows:\n12345\n1234\n123\n12\n1',
      solution: 'Use nested loops where the outer loop runs from n down to 1 (decreasing) and the inner loop prints numbers from 1 to i. The number of digits decreases with each row.',
      solutionCode: `public class InvertedLeftNumberPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class InvertedLeftNumberPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5, i: 5 }, output: '', description: 'Outer loop: i = 5, condition (5 >= 1 is true)' },
        { line: 4, vars: { n: 5, i: 5, j: 1 }, output: '', description: 'Inner loop: j = 1, condition (1 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 1 }, output: '1', description: 'Printing: 1' },
        { line: 4, vars: { n: 5, i: 5, j: 2 }, output: '1', description: 'Inner loop: j = 2, condition (2 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 2 }, output: '12', description: 'Printing: 2' },
        { line: 4, vars: { n: 5, i: 5, j: 3 }, output: '12', description: 'Inner loop: j = 3, condition (3 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 3 }, output: '123', description: 'Printing: 3' },
        { line: 4, vars: { n: 5, i: 5, j: 4 }, output: '123', description: 'Inner loop: j = 4, condition (4 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 4 }, output: '1234', description: 'Printing: 4' },
        { line: 4, vars: { n: 5, i: 5, j: 5 }, output: '1234', description: 'Inner loop: j = 5, condition (5 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 5 }, output: '12345', description: 'Printing: 5' },
        { line: 4, vars: { n: 5, i: 5, j: 6 }, output: '12345', description: 'Inner loop: j = 6, condition (6 <= 5 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 5 }, output: '12345\\n', description: 'Printing newline after row 1' },
        { line: 3, vars: { n: 5, i: 4 }, output: '12345\\n', description: 'Outer loop: i = 4, condition (4 >= 1 is true)' },
        { line: 4, vars: { n: 5, i: 4, j: 1 }, output: '12345\\n', description: 'Inner loop: j = 1, condition (1 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 1 }, output: '12345\\n1', description: 'Printing: 1' },
        { line: 4, vars: { n: 5, i: 4, j: 2 }, output: '12345\\n1', description: 'Inner loop: j = 2, condition (2 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 2 }, output: '12345\\n12', description: 'Printing: 2' },
        { line: 4, vars: { n: 5, i: 4, j: 3 }, output: '12345\\n12', description: 'Inner loop: j = 3, condition (3 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 3 }, output: '12345\\n123', description: 'Printing: 3' },
        { line: 4, vars: { n: 5, i: 4, j: 4 }, output: '12345\\n123', description: 'Inner loop: j = 4, condition (4 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 4 }, output: '12345\\n1234', description: 'Printing: 4' },
        { line: 4, vars: { n: 5, i: 4, j: 5 }, output: '12345\\n1234', description: 'Inner loop: j = 5, condition (5 <= 4 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 4 }, output: '12345\\n1234\\n', description: 'Printing newline after row 2' },
      ] as DryRunStep[],
    },
    {
      question: 'Print a left-aligned alphabet pattern for n rows:\nA\nAB\nABC\nABCD\nABCDE',
      solution: 'Use nested loops where the outer loop controls rows (1 to n) and the inner loop prints letters from A to the ith letter. Convert numbers to letters using (char)(\'A\' + j - 1).',
      solutionCode: `public class LeftAlphabetPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print((char)('A' + j - 1));
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class LeftAlphabetPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print((char)('A' + j - 1));
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5, i: 1 }, output: '', description: 'Outer loop: i = 1, condition (1 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 1, j: 1 }, output: '', description: 'Inner loop: j = 1, condition (1 <= 1 is true)' },
        { line: 5, vars: { n: 5, i: 1, j: 1 }, output: 'A', description: 'Printing: (char)(\'A\' + 0) = A' },
        { line: 4, vars: { n: 5, i: 1, j: 2 }, output: 'A', description: 'Inner loop: j = 2, condition (2 <= 1 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 1 }, output: 'A\\n', description: 'Printing newline after row 1' },
        { line: 3, vars: { n: 5, i: 2 }, output: 'A\\n', description: 'Outer loop: i = 2, condition (2 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 2, j: 1 }, output: 'A\\n', description: 'Inner loop: j = 1, condition (1 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 1 }, output: 'A\\nA', description: 'Printing: (char)(\'A\' + 0) = A' },
        { line: 4, vars: { n: 5, i: 2, j: 2 }, output: 'A\\nA', description: 'Inner loop: j = 2, condition (2 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 2 }, output: 'A\\nAB', description: 'Printing: (char)(\'A\' + 1) = B' },
        { line: 4, vars: { n: 5, i: 2, j: 3 }, output: 'A\\nAB', description: 'Inner loop: j = 3, condition (3 <= 2 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 2 }, output: 'A\\nAB\\n', description: 'Printing newline after row 2' },
        { line: 3, vars: { n: 5, i: 3 }, output: 'A\\nAB\\n', description: 'Outer loop: i = 3, condition (3 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 3, j: 1 }, output: 'A\\nAB\\n', description: 'Inner loop: j = 1, condition (1 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 1 }, output: 'A\\nAB\\nA', description: 'Printing: (char)(\'A\' + 0) = A' },
        { line: 4, vars: { n: 5, i: 3, j: 2 }, output: 'A\\nAB\\nA', description: 'Inner loop: j = 2, condition (2 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 2 }, output: 'A\\nAB\\nAB', description: 'Printing: (char)(\'A\' + 1) = B' },
        { line: 4, vars: { n: 5, i: 3, j: 3 }, output: 'A\\nAB\\nAB', description: 'Inner loop: j = 3, condition (3 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 3 }, output: 'A\\nAB\\nABC', description: 'Printing: (char)(\'A\' + 2) = C' },
        { line: 4, vars: { n: 5, i: 3, j: 4 }, output: 'A\\nAB\\nABC', description: 'Inner loop: j = 4, condition (4 <= 3 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 3 }, output: 'A\\nAB\\nABC\\n', description: 'Printing newline after row 3' },
      ] as DryRunStep[],
    },
    {
      question: 'Print an inverted left-aligned alphabet pattern for n rows:\nABCDE\nABCD\nABC\nAB\nA',
      solution: 'Use nested loops where the outer loop runs from n down to 1 (decreasing) and the inner loop prints letters from A to the ith letter. The number of letters decreases with each row.',
      solutionCode: `public class InvertedLeftAlphabetPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print((char)('A' + j - 1));
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class InvertedLeftAlphabetPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print((char)('A' + j - 1));
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5, i: 5 }, output: '', description: 'Outer loop: i = 5, condition (5 >= 1 is true)' },
        { line: 4, vars: { n: 5, i: 5, j: 1 }, output: '', description: 'Inner loop: j = 1, condition (1 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 1 }, output: 'A', description: 'Printing: (char)(\'A\' + 0) = A' },
        { line: 4, vars: { n: 5, i: 5, j: 2 }, output: 'A', description: 'Inner loop: j = 2, condition (2 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 2 }, output: 'AB', description: 'Printing: (char)(\'A\' + 1) = B' },
        { line: 4, vars: { n: 5, i: 5, j: 3 }, output: 'AB', description: 'Inner loop: j = 3, condition (3 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 3 }, output: 'ABC', description: 'Printing: (char)(\'A\' + 2) = C' },
        { line: 4, vars: { n: 5, i: 5, j: 4 }, output: 'ABC', description: 'Inner loop: j = 4, condition (4 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 4 }, output: 'ABCD', description: 'Printing: (char)(\'A\' + 3) = D' },
        { line: 4, vars: { n: 5, i: 5, j: 5 }, output: 'ABCD', description: 'Inner loop: j = 5, condition (5 <= 5 is true)' },
        { line: 5, vars: { n: 5, i: 5, j: 5 }, output: 'ABCDE', description: 'Printing: (char)(\'A\' + 4) = E' },
        { line: 4, vars: { n: 5, i: 5, j: 6 }, output: 'ABCDE', description: 'Inner loop: j = 6, condition (6 <= 5 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 5 }, output: 'ABCDE\\n', description: 'Printing newline after row 1' },
        { line: 3, vars: { n: 5, i: 4 }, output: 'ABCDE\\n', description: 'Outer loop: i = 4, condition (4 >= 1 is true)' },
        { line: 4, vars: { n: 5, i: 4, j: 1 }, output: 'ABCDE\\n', description: 'Inner loop: j = 1, condition (1 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 1 }, output: 'ABCDE\\nA', description: 'Printing: (char)(\'A\' + 0) = A' },
        { line: 4, vars: { n: 5, i: 4, j: 2 }, output: 'ABCDE\\nA', description: 'Inner loop: j = 2, condition (2 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 2 }, output: 'ABCDE\\nAB', description: 'Printing: (char)(\'A\' + 1) = B' },
        { line: 4, vars: { n: 5, i: 4, j: 3 }, output: 'ABCDE\\nAB', description: 'Inner loop: j = 3, condition (3 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 3 }, output: 'ABCDE\\nABC', description: 'Printing: (char)(\'A\' + 2) = C' },
        { line: 4, vars: { n: 5, i: 4, j: 4 }, output: 'ABCDE\\nABC', description: 'Inner loop: j = 4, condition (4 <= 4 is true)' },
        { line: 5, vars: { n: 5, i: 4, j: 4 }, output: 'ABCDE\\nABCD', description: 'Printing: (char)(\'A\' + 3) = D' },
        { line: 4, vars: { n: 5, i: 4, j: 5 }, output: 'ABCDE\\nABCD', description: 'Inner loop: j = 5, condition (5 <= 4 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 4 }, output: 'ABCDE\\nABCD\\n', description: 'Printing newline after row 2' },
      ] as DryRunStep[],
    },
    {
      question: 'Print a pattern where each row repeats the row number:\n1\n22\n333\n4444\n55555',
      solution: 'Use nested loops where the outer loop controls rows (1 to n) and the inner loop prints the outer loop variable (i) from 1 to i times. Print i instead of j.',
      solutionCode: `public class SameNumberPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i);
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class SameNumberPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i);
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5, i: 1 }, output: '', description: 'Outer loop: i = 1, condition (1 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 1, j: 1 }, output: '', description: 'Inner loop: j = 1, condition (1 <= 1 is true)' },
        { line: 5, vars: { n: 5, i: 1, j: 1 }, output: '1', description: 'Printing: i = 1' },
        { line: 4, vars: { n: 5, i: 1, j: 2 }, output: '1', description: 'Inner loop: j = 2, condition (2 <= 1 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 1 }, output: '1\\n', description: 'Printing newline after row 1' },
        { line: 3, vars: { n: 5, i: 2 }, output: '1\\n', description: 'Outer loop: i = 2, condition (2 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 2, j: 1 }, output: '1\\n', description: 'Inner loop: j = 1, condition (1 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 1 }, output: '1\\n2', description: 'Printing: i = 2' },
        { line: 4, vars: { n: 5, i: 2, j: 2 }, output: '1\\n2', description: 'Inner loop: j = 2, condition (2 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 2 }, output: '1\\n22', description: 'Printing: i = 2' },
        { line: 4, vars: { n: 5, i: 2, j: 3 }, output: '1\\n22', description: 'Inner loop: j = 3, condition (3 <= 2 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 2 }, output: '1\\n22\\n', description: 'Printing newline after row 2' },
        { line: 3, vars: { n: 5, i: 3 }, output: '1\\n22\\n', description: 'Outer loop: i = 3, condition (3 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 3, j: 1 }, output: '1\\n22\\n', description: 'Inner loop: j = 1, condition (1 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 1 }, output: '1\\n22\\n3', description: 'Printing: i = 3' },
        { line: 4, vars: { n: 5, i: 3, j: 2 }, output: '1\\n22\\n3', description: 'Inner loop: j = 2, condition (2 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 2 }, output: '1\\n22\\n33', description: 'Printing: i = 3' },
        { line: 4, vars: { n: 5, i: 3, j: 3 }, output: '1\\n22\\n33', description: 'Inner loop: j = 3, condition (3 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 3 }, output: '1\\n22\\n333', description: 'Printing: i = 3' },
        { line: 4, vars: { n: 5, i: 3, j: 4 }, output: '1\\n22\\n333', description: 'Inner loop: j = 4, condition (4 <= 3 is false) - inner loop exits' },
        { line: 6, vars: { n: 5, i: 3 }, output: '1\\n22\\n333\\n', description: 'Printing newline after row 3' },
      ] as DryRunStep[],
    },
    {
      question: 'Print an alternating character pattern:\nA\nAB\nABA\nABAB\nABABA',
      solution: 'Use nested loops where the outer loop controls rows (1 to n) and the inner loop prints alternating characters based on whether j is odd or even. If j is odd, print \'A\', else print \'B\'.',
      solutionCode: `public class AlternatingPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                if (j % 2 == 1) {
                    System.out.print("A");
                } else {
                    System.out.print("B");
                }
            }
            System.out.println();
        }
    }
}`,
      dryRunCode: `public class AlternatingPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                if (j % 2 == 1) {
                    System.out.print("A");
                } else {
                    System.out.print("B");
                }
            }
            System.out.println();
        }
    }
}`,
      dryRunSteps: [
        { line: 3, vars: { n: 5, i: 1 }, output: '', description: 'Outer loop: i = 1, condition (1 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 1, j: 1 }, output: '', description: 'Inner loop: j = 1, condition (1 <= 1 is true)' },
        { line: 5, vars: { n: 5, i: 1, j: 1 }, output: '', description: 'Checking condition: j % 2 == 1 (1 % 2 == 1 is true)' },
        { line: 6, vars: { n: 5, i: 1, j: 1 }, output: 'A', description: 'Printing: A' },
        { line: 4, vars: { n: 5, i: 1, j: 2 }, output: 'A', description: 'Inner loop: j = 2, condition (2 <= 1 is false) - inner loop exits' },
        { line: 11, vars: { n: 5, i: 1 }, output: 'A\\n', description: 'Printing newline after row 1' },
        { line: 3, vars: { n: 5, i: 2 }, output: 'A\\n', description: 'Outer loop: i = 2, condition (2 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 2, j: 1 }, output: 'A\\n', description: 'Inner loop: j = 1, condition (1 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 1 }, output: 'A\\n', description: 'Checking condition: j % 2 == 1 (1 % 2 == 1 is true)' },
        { line: 6, vars: { n: 5, i: 2, j: 1 }, output: 'A\\nA', description: 'Printing: A' },
        { line: 4, vars: { n: 5, i: 2, j: 2 }, output: 'A\\nA', description: 'Inner loop: j = 2, condition (2 <= 2 is true)' },
        { line: 5, vars: { n: 5, i: 2, j: 2 }, output: 'A\\nA', description: 'Checking condition: j % 2 == 1 (2 % 2 == 1 is false)' },
        { line: 8, vars: { n: 5, i: 2, j: 2 }, output: 'A\\nAB', description: 'Printing: B' },
        { line: 4, vars: { n: 5, i: 2, j: 3 }, output: 'A\\nAB', description: 'Inner loop: j = 3, condition (3 <= 2 is false) - inner loop exits' },
        { line: 11, vars: { n: 5, i: 2 }, output: 'A\\nAB\\n', description: 'Printing newline after row 2' },
        { line: 3, vars: { n: 5, i: 3 }, output: 'A\\nAB\\n', description: 'Outer loop: i = 3, condition (3 <= 5 is true)' },
        { line: 4, vars: { n: 5, i: 3, j: 1 }, output: 'A\\nAB\\n', description: 'Inner loop: j = 1, condition (1 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 1 }, output: 'A\\nAB\\n', description: 'Checking condition: j % 2 == 1 (1 % 2 == 1 is true)' },
        { line: 6, vars: { n: 5, i: 3, j: 1 }, output: 'A\\nAB\\nA', description: 'Printing: A' },
        { line: 4, vars: { n: 5, i: 3, j: 2 }, output: 'A\\nAB\\nA', description: 'Inner loop: j = 2, condition (2 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 2 }, output: 'A\\nAB\\nA', description: 'Checking condition: j % 2 == 1 (2 % 2 == 1 is false)' },
        { line: 8, vars: { n: 5, i: 3, j: 2 }, output: 'A\\nAB\\nAB', description: 'Printing: B' },
        { line: 4, vars: { n: 5, i: 3, j: 3 }, output: 'A\\nAB\\nAB', description: 'Inner loop: j = 3, condition (3 <= 3 is true)' },
        { line: 5, vars: { n: 5, i: 3, j: 3 }, output: 'A\\nAB\\nAB', description: 'Checking condition: j % 2 == 1 (3 % 2 == 1 is true)' },
        { line: 6, vars: { n: 5, i: 3, j: 3 }, output: 'A\\nAB\\nABA', description: 'Printing: A' },
        { line: 4, vars: { n: 5, i: 3, j: 4 }, output: 'A\\nAB\\nABA', description: 'Inner loop: j = 4, condition (4 <= 3 is false) - inner loop exits' },
        { line: 11, vars: { n: 5, i: 3 }, output: 'A\\nAB\\nABA\\n', description: 'Printing newline after row 3' },
      ] as DryRunStep[],
    },
  ] as PracticeQuestion[],
}

export default function PatternsPage() {
  return <TopicPage content={content} />
}

