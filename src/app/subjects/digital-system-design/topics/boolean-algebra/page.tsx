'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Boolean Algebra',
  explanationSections: [
    {
      title: '🧠 Basic Laws of Boolean Algebra',
      icon: <FiBook className="w-6 h-6" />,
      content: `Boolean algebra uses binary variables {0, 1} and logical operations like AND, OR, and NOT. It follows specific <span class="text-blue-400 font-semibold">laws and theorems</span> that enable simplification of logic expressions.

<span class="text-amber-300 font-semibold">Fundamental Laws:</span>

<span class="text-cyan-300">1. Identity Laws:</span>
   • A + 0 = A (OR with 0 gives A)
   • A · 1 = A (AND with 1 gives A)

<span class="text-cyan-300">2. Domination Laws:</span>
   • A + 1 = 1 (OR with 1 always gives 1)
   • A · 0 = 0 (AND with 0 always gives 0)

<span class="text-cyan-300">3. Idempotent Laws:</span>
   • A + A = A (OR with itself gives itself)
   • A · A = A (AND with itself gives itself)

<span class="text-cyan-300">4. Complement Laws:</span>
   • A + A' = 1 (Variable OR its complement equals 1)
   • A · A' = 0 (Variable AND its complement equals 0)

<span class="text-cyan-300">5. Double Complement Law:</span>
   • (A')' = A (Complement of complement is original)

<span class="text-cyan-300">6. Involution Law:</span>
   • A'' = A (Same as double complement)`,
    },
    {
      title: '⚙️ Boolean Theorems and Properties',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `Important theorems in Boolean algebra enable manipulation and simplification of complex expressions.

<span class="text-amber-300 font-semibold">Commutative Laws:</span>
   • A + B = B + A (Order doesn't matter for OR)
   • A · B = B · A (Order doesn't matter for AND)

<span class="text-amber-300 font-semibold">Associative Laws:</span>
   • (A + B) + C = A + (B + C) (Grouping doesn't matter for OR)
   • (A · B) · C = A · (B · C) (Grouping doesn't matter for AND)

<span class="text-amber-300 font-semibold">Distributive Laws:</span>
   • A · (B + C) = (A · B) + (A · C) (AND distributes over OR)
   • A + (B · C) = (A + B) · (A + C) (OR distributes over AND)

<span class="text-lime-300 font-semibold">De Morgan's Theorems:</span>
   • (A + B)' = A' · B' (Complement of OR equals AND of complements)
   • (A · B)' = A' + B' (Complement of AND equals OR of complements)
   
   <span class="text-cyan-300">Generalized De Morgan's:</span>
   • (A + B + C + ...)' = A' · B' · C' · ...
   • (A · B · C · ...)' = A' + B' + C' + ...

<span class="text-pink-300 font-semibold">Absorption Laws:</span>
   • A + (A · B) = A
   • A · (A + B) = A`,
    },
    {
      title: '📊 Example Simplification',
      icon: <FiTarget className="w-6 h-6" />,
      content: `Boolean expressions can be <span class="text-blue-400 font-semibold">simplified</span> using algebraic manipulation to reduce circuit complexity and cost.

<span class="text-amber-300 font-semibold">Example 1: Simplify F = A'B + AB' + AB</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
F = A'B + AB' + AB
  = A'B + A(B' + B)        [Distributive Law]
  = A'B + A(1)              [Complement Law: B' + B = 1]
  = A'B + A                 [Identity Law: A · 1 = A]
  = A + A'B                 [Commutative Law]
  = A + B                   [Absorption Law]
</pre>

<span class="text-lime-300 font-semibold">Example 2: Simplify F = (A + B)(A + C)</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
F = (A + B)(A + C)
  = A + (B · C)             [Distributive Law: A + (B·C) = (A+B)(A+C)]
</pre>

<span class="text-pink-300 font-semibold">Simplification Techniques:</span>

• <span class="text-cyan-300">Absorption:</span> A + (A · B) = A, A · (A + B) = A
• <span class="text-cyan-300">Consensus:</span> (A · B) + (A' · C) + (B · C) = (A · B) + (A' · C)
• <span class="text-cyan-300">Expansion:</span> Breaking complex expressions into simpler terms
• <span class="text-cyan-300">Factoring:</span> Combining common terms using distributive laws
• <span class="text-cyan-300">De Morgan's:</span> Converting between AND and OR forms

<span class="text-cyan-300">Benefits of Simplification:</span>
→ Reduced number of gates
→ Lower power consumption
→ Faster circuit operation
→ Lower manufacturing cost`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Apply</span> Boolean laws and theorems to manipulate expressions
✓ <span class="text-cyan-300">Simplify</span> complex Boolean expressions using algebraic methods
✓ <span class="text-cyan-300">Use</span> De Morgan's theorems to convert between AND/OR forms
✓ <span class="text-cyan-300">Recognize</span> opportunities for applying absorption, consensus, and other simplification techniques
✓ <span class="text-cyan-300">Design</span> minimal logic circuits by reducing Boolean expressions
✓ <span class="text-cyan-300">Verify</span> simplifications using truth tables or algebraic proofs

Mastery of Boolean algebra is essential for efficient digital circuit design.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Simplify the expression: A · B + A · B\'',
      solution: 'Using the distributive law:\n\nA · B + A · B\' = A · (B + B\')\n\nSince B + B\' = 1 (complement law):\n\nA · (B + B\') = A · 1 = A\n\nTherefore, A · B + A · B\' = A',
      kMap: {
        type: '2var' as const,
        values: [0, 1, 0, 1],
        title: 'K-map for A·B + A·B\' = A (shows A is independent of B)',
        highlightedGroups: [
          { cells: [1, 3], color: 'rgba(0, 180, 255, 0.4)' }
        ],
      },
      truthTable: {
        headers: ['A', 'B', 'A·B', 'A·B\'', 'A·B + A·B\'', 'A'],
        rows: [
          ['0', '0', '0', '0', '0', '0'],
          ['0', '1', '0', '0', '0', '0'],
          ['1', '0', '0', '1', '1', '1'],
          ['1', '1', '1', '0', '1', '1'],
        ],
        title: 'Truth Table showing A·B + A·B\' = A',
      },
    },
    {
      question: 'Apply De Morgan\'s theorem to (A + B + C)\'',
      solution: 'De Morgan\'s theorem states: (A + B)\' = A\' · B\'\n\nFor three variables, we can apply it step by step:\n\n(A + B + C)\' = ((A + B) + C)\'\n              = (A + B)\' · C\'\n              = (A\' · B\') · C\'\n              = A\' · B\' · C\'\n\nTherefore, (A + B + C)\' = A\' · B\' · C\'',
    },
    {
      question: 'Simplify: A + A\' · B',
      solution: 'Using the distributive law:\n\nA + A\' · B = (A + A\') · (A + B)\n\nSince A + A\' = 1:\n\n(A + A\') · (A + B) = 1 · (A + B) = A + B\n\nTherefore, A + A\' · B = A + B',
    },
  ],
}

export default function BooleanAlgebraPage() {
  return <DSDTopicPage content={content} />
}

