'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'SOP & POS Optimization',
  explanationSections: [
    {
      title: '🧠 Sum of Products (SOP) Form',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">SOP form</span> is a canonical representation where the function is expressed as the sum (OR) of product (AND) terms.

<span class="text-amber-300 font-semibold">Characteristics:</span>

• <span class="text-cyan-300">Minterms:</span> Each product term is called a minterm
• <span class="text-cyan-300">Standard Form:</span> All variables appear in each minterm (in true or complemented form)
• <span class="text-cyan-300">Canonical SOP:</span> Sum of all minterms where function equals 1
• <span class="text-cyan-300">Example:</span> F = A'B'C + A'BC + ABC' + ABC

<span class="text-lime-300 font-semibold">Minterm Notation:</span>
For 3 variables (A, B, C):
• m<sub>0</sub> = A'B'C' (000)
• m<sub>1</sub> = A'B'C (001)
• m<sub>2</sub> = A'BC' (010)
• m<sub>3</sub> = A'BC (011)
• m<sub>4</sub> = AB'C' (100)
• m<sub>5</sub> = AB'C (101)
• m<sub>6</sub> = ABC' (110)
• m<sub>7</sub> = ABC (111)

<span class="text-cyan-300">Compact Notation:</span> F = Σ(1, 3, 6, 7) means F = m<sub>1</sub> + m<sub>3</sub> + m<sub>6</sub> + m<sub>7</sub>

<span class="text-pink-300 font-semibold">Implementation:</span> SOP is ideal for implementing functions with AND-OR logic (two-level logic).`,
    },
    {
      title: '⚙️ Product of Sums (POS) Form',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">POS form</span> is another canonical representation where the function is expressed as the product (AND) of sum (OR) terms.

<span class="text-amber-300 font-semibold">Characteristics:</span>

• <span class="text-cyan-300">Maxterms:</span> Each sum term is called a maxterm
• <span class="text-cyan-300">Standard Form:</span> All variables appear in each maxterm (in true or complemented form)
• <span class="text-cyan-300">Canonical POS:</span> Product of all maxterms where function equals 0
• <span class="text-cyan-300">Example:</span> F = (A+B+C') · (A+B'+C) · (A'+B+C)

<span class="text-lime-300 font-semibold">Maxterm Notation:</span>
For 3 variables (A, B, C):
• M<sub>0</sub> = A+B+C (000)
• M<sub>1</sub> = A+B+C' (001)
• M<sub>2</sub> = A+B'+C (010)
• M<sub>3</sub> = A+B'+C' (011)
• M<sub>4</sub> = A'+B+C (100)
• M<sub>5</sub> = A'+B+C' (101)
• M<sub>6</sub> = A'+B'+C (110)
• M<sub>7</sub> = A'+B'+C' (111)

<span class="text-cyan-300">Compact Notation:</span> F = Π(0, 2, 5) means F = M<sub>0</sub> · M<sub>2</sub> · M<sub>5</sub>

<span class="text-pink-300 font-semibold">Implementation:</span> POS is ideal for implementing functions with OR-AND logic (two-level logic).

<span class="text-cyan-300">Note:</span> Minterms and maxterms are complements: m<sub>i</sub> = M<sub>i</sub>'`,
    },
    {
      title: '📊 Karnaugh Maps (K-maps)',
      icon: <FiTarget className="w-6 h-6" />,
      content: `K-maps are a <span class="text-blue-400 font-semibold">graphical method</span> for simplifying Boolean expressions. They make simplification visual and systematic.

<span class="text-amber-300 font-semibold">K-map Structure:</span>

<span class="text-cyan-300">2-Variable K-map:</span>
Grid with 4 cells representing minterms m0, m1, m2, m3

<span class="text-cyan-300">3-Variable K-map:</span>
Grid with 8 cells representing minterms m0 through m7

<span class="text-lime-300 font-semibold">Simplification Process:</span>

1. <span class="text-cyan-300">Create K-map:</span> Grid with cells representing all minterms/maxterms
2. <span class="text-cyan-300">Mark 1s:</span> Place 1s in cells where function is true (for SOP)
3. <span class="text-cyan-300">Group adjacent 1s:</span> Form groups of 1, 2, 4, 8, 16, etc. cells
   • Groups must be rectangular
   • Groups can wrap around edges (top-bottom, left-right)
   • Each group should be as large as possible
4. <span class="text-cyan-300">Write simplified expression:</span> Each group represents a product term
   • Variables that don't change in the group are included
   • Variables that change are eliminated

<span class="text-cyan-300">K-map Advantages:</span>
→ Visual and intuitive
→ Systematic approach
→ Minimizes human error
→ Easy to verify`,
      kMap: {
        type: '3var',
        values: [0, 1, 0, 1, 0, 1, 0, 1],
        title: 'Example: F = Σ(1, 3, 5, 7) - All 1s form one group where C=1 → F = C',
        highlightedGroups: [
          { cells: [1, 3, 5, 7], color: 'rgba(0, 180, 255, 0.4)' }
        ],
      },
    },
    {
      title: '📊 K-map Examples',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Example 1: 2-Variable K-map</span>

Simplify F = Σ(0, 1)

<span class="text-cyan-300">Solution:</span>
Group m0 and m1 together (they differ only in B).
Result: F = A' (B is eliminated)

<span class="text-blue-400 font-semibold">Example 2: 3-Variable K-map</span>

Simplify F = Σ(0, 2, 5, 7)

<span class="text-cyan-300">Solution:</span>
Group m0 and m2: A'C'
Group m5 and m7: AC
Result: F = A'C' + AC

<span class="text-blue-400 font-semibold">Example 3: 4-Variable K-map</span>

Simplify F = Σ(0, 1, 2, 3, 8, 9, 10, 11)

<span class="text-cyan-300">Solution:</span>
All 1s form one large group covering A'B' and AB'.
Result: F = B' (A and C are eliminated)`,
      kMap: {
        type: '2var',
        values: [1, 1, 0, 0],
        title: 'Example: F = Σ(0, 1) - Group m0 and m1 → F = A\'',
        highlightedGroups: [
          { cells: [0, 1], color: 'rgba(0, 180, 255, 0.4)' }
        ],
      },
    },
    {
      title: '🧩 K-map Grouping Rules',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Grouping Rules</span> for K-maps ensure optimal simplification.

<span class="text-amber-300 font-semibold">Essential Rules:</span>

1. <span class="text-cyan-300">Group Size:</span> Groups must contain 2<sup>n</sup> cells (1, 2, 4, 8, 16, ...)
2. <span class="text-cyan-300">Adjacency:</span> Cells must be adjacent horizontally or vertically (not diagonally)
3. <span class="text-cyan-300">Wrapping:</span> K-maps wrap around edges (top-bottom, left-right)
4. <span class="text-cyan-300">Overlap:</span> Groups can overlap - a cell can be in multiple groups
5. <span class="text-cyan-300">Maximize Size:</span> Make groups as large as possible
6. <span class="text-cyan-300">Cover All 1s:</span> Every 1 must be in at least one group

<span class="text-lime-300 font-semibold">Don't Care Conditions:</span>

• <span class="text-cyan-300">X or d:</span> Represents don't care (can be 0 or 1)
• <span class="text-cyan-300">Use X:</span> Include in groups if it helps make larger groups
• <span class="text-cyan-300">Ignore X:</span> Don't include if it doesn't help
• <span class="text-cyan-300">Example:</span> F = Σ(1, 3) + d(5, 7) means minterms 1,3 are 1, 5,7 are don't care

<span class="text-pink-300 font-semibold">Prime Implicants:</span>

• <span class="text-cyan-300">Prime Implicant:</span> Largest possible group that cannot be expanded
• <span class="text-cyan-300">Essential Prime Implicant:</span> Covers at least one minterm not covered by any other group
• <span class="text-cyan-300">Minimal Cover:</span> Select essential prime implicants and minimum additional groups`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Convert</span> between SOP and POS canonical forms
✓ <span class="text-cyan-300">Use</span> minterm and maxterm notation to represent functions
✓ <span class="text-cyan-300">Construct</span> K-maps for 2, 3, and 4 variable functions
✓ <span class="text-cyan-300">Apply</span> K-map grouping rules to simplify expressions
✓ <span class="text-cyan-300">Handle</span> don't care conditions in K-maps
✓ <span class="text-cyan-300">Identify</span> prime implicants and essential prime implicants
✓ <span class="text-cyan-300">Derive</span> minimal SOP and POS expressions from K-maps
✓ <span class="text-cyan-300">Implement</span> optimized logic circuits using simplified expressions

K-map optimization is essential for designing efficient digital circuits with minimal gate count.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Simplify the SOP expression: A\'B\'C + A\'BC + ABC\' + ABC using K-map',
      solution: 'Step 1: Create a 3-variable K-map\nStep 2: Mark minterms: A\'B\'C (001), A\'BC (011), ABC\' (110), ABC (111)\nStep 3: Group adjacent 1s:\n  - Group 1: A\'B\'C + A\'BC = A\'C\n  - Group 2: ABC\' + ABC = AB\n\nSimplified expression: F = A\'C + AB',
      kMap: {
        type: '3var',
        values: [0, 1, 0, 1, 0, 0, 1, 1],
        title: 'K-map for F = A\'B\'C + A\'BC + ABC\' + ABC = A\'C + AB',
        highlightedGroups: [
          { cells: [1, 3], color: 'rgba(0, 180, 255, 0.4)' },
          { cells: [6, 7], color: 'rgba(0, 255, 180, 0.4)' }
        ],
      },
    },
    {
      question: 'Convert the function F = Σ(0, 2, 5, 7) to POS form',
      solution: 'F = Σ(0, 2, 5, 7) means minterms 0, 2, 5, 7 are 1\n\nMaxterms are where F = 0: Π(1, 3, 4, 6)\n\nPOS form: F = (A+B+C\') · (A+B\'+C\') · (A\'+B+C) · (A\'+B\'+C)',
      kMap: {
        type: '3var',
        values: [1, 0, 1, 0, 0, 1, 0, 1],
        title: 'K-map for F = Σ(0, 2, 5, 7) - 1s shown, 0s are maxterms',
        highlightedGroups: [
          { cells: [0, 2], color: 'rgba(0, 180, 255, 0.4)' },
          { cells: [5, 7], color: 'rgba(0, 255, 180, 0.4)' }
        ],
      },
      truthTable: {
        headers: ['A', 'B', 'C', 'F', 'Maxterm'],
        rows: [
          ['0', '0', '0', '1', '-'],
          ['0', '0', '1', '0', 'M1'],
          ['0', '1', '0', '1', '-'],
          ['0', '1', '1', '0', 'M3'],
          ['1', '0', '0', '0', 'M4'],
          ['1', '0', '1', '1', '-'],
          ['1', '1', '0', '0', 'M6'],
          ['1', '1', '1', '1', '-'],
        ],
        title: 'Truth Table: F = Σ(0,2,5,7) = Π(1,3,4,6)',
      },
    },
    {
      question: 'What is the simplified form of F = A\'B + AB\' using K-map?',
      solution: 'This is already a simplified SOP form.\n\nK-map would show:\n  - A\'B corresponds to minterm 2 (010)\n  - AB\' corresponds to minterm 6 (110)\n\nThese cannot be grouped together, so the expression is already minimal:\nF = A\'B + AB\' (which is also A ⊕ B, the XOR function)',
      kMap: {
        type: '3var',
        values: [0, 0, 1, 0, 0, 0, 1, 0],
        title: 'K-map for F = A\'B + AB\' (XOR function - cannot be simplified further)',
        highlightedGroups: [
          { cells: [2], color: 'rgba(0, 180, 255, 0.4)' },
          { cells: [6], color: 'rgba(0, 180, 255, 0.4)' }
        ],
      },
      circuitDiagram: { type: 'xor', title: 'XOR Gate: F = A\'B + AB\'' },
      truthTable: {
        headers: ['A', 'B', 'A\'B', 'AB\'', 'F = A\'B + AB\''],
        rows: [
          ['0', '0', '0', '0', '0'],
          ['0', '1', '1', '0', '1'],
          ['1', '0', '0', '1', '1'],
          ['1', '1', '0', '0', '0'],
        ],
        title: 'Truth Table for F = A\'B + AB\' (XOR)',
      },
    },
  ],
}

export default function SOPPOSOptimizationPage() {
  return <DSDTopicPage content={content} />
}
