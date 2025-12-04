'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiRefreshCw, FiActivity, FiCode, FiLayers, FiCpu } from 'react-icons/fi'

const content = {
  title: 'Recurrence Relations',
  explanationSections: [
    {
      title: '🔄 Introduction to Recurrence Relations',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Definition:</span>
A **recurrence relation** for a sequence <i>{aₙ}</i> is an equation that expresses <i>aₙ</i> in terms of one or more of the previous terms of the sequence, namely, <i>a₀, a₁, ..., aₙ₋₁</i>, for all integers <i>n</i> with <i>n &ge; n₀</i>, where <i>n₀</i> is a nonnegative integer.

A sequence is called a **solution** of a recurrence relation if its terms satisfy the recurrence relation.

<span class="text-amber-300 font-semibold">Key Concepts:</span>
• **Order of Recurrence:** The difference between the highest and lowest subscripts of the terms in the relation.
  - Example: <i>aₙ = aₙ₋₁ + aₙ₋₂</i> is of order 2 (since <i>n - (n-2) = 2</i>).
• **Initial Conditions:** The values of the first few terms required to define a unique sequence. For a relation of order <i>k</i>, we typically need <i>k</i> initial conditions.

<span class="text-lime-300 font-semibold">Real-World Applications:</span>
1.  **Compound Interest:** <i>Aₙ = (1 + r)Aₙ₋₁</i> (Order 1).
2.  **Fibonacci Sequence:** Modeling rabbit populations (Order 2).
3.  **Tower of Hanoi:** <i>Hₙ = 2Hₙ₋₁ + 1</i> (Order 1).
4.  **Algorithm Analysis:** Merge Sort complexity <i>T(n) = 2T(n/2) + n</i>.`,
    },
    {
      title: '📈 Linear Homogeneous Recurrence Relations',
      icon: <FiActivity className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Definition:</span>
A **linear homogeneous recurrence relation of degree k with constant coefficients** is a recurrence relation of the form:
<i>aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + ... + cₖaₙ₋ₖ</i>
where <i>c₁, c₂, ..., cₖ</i> are real numbers and <i>cₖ &ne; 0</i>.

• **Linear:** The RHS is a sum of previous terms multiplied by constants (no squares, cubes, etc.).
• **Homogeneous:** No term depends only on <i>n</i> (i.e., no extra function <i>F(n)</i> added).
• **Constant Coefficients:** The <i>cᵢ</i> are constants, not functions of <i>n</i>.

<span class="text-amber-300 font-semibold">The Characteristic Roots Method:</span>
This method is used to solve linear homogeneous recurrence relations.

**Step 1: Form the Characteristic Equation**
Assume the solution is of the form <i>aₙ = rⁿ</i>. Substitute this into the recurrence:
<i>rⁿ = c₁rⁿ⁻¹ + c₂rⁿ⁻² + ... + cₖrⁿ⁻ₖ</i>
Divide by <i>rⁿ⁻ₖ</i> to get the **Characteristic Equation**:
<i>rᵏ - c₁rᵏ⁻¹ - c₂rᵏ⁻² - ... - cₖ = 0</i>

**Step 2: Find the Roots**
Solve the equation for <i>r</i>. Let the roots be <i>r₁, r₂, ..., rₖ</i>.

**Step 3: Form the General Solution**
There are three cases based on the nature of the roots:

<div class="overflow-x-auto mt-4">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="uppercase tracking-wider border-b-2 border-slate-700">
      <tr>
        <th scope="col" class="px-6 py-4 text-cyan-400">Case</th>
        <th scope="col" class="px-6 py-4 text-cyan-400">Nature of Roots</th>
        <th scope="col" class="px-6 py-4 text-cyan-400">General Solution Form</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">1</td>
        <td class="px-6 py-4 text-slate-300">Distinct Real Roots (<i>r₁ &ne; r₂ &ne; ...</i>)</td>
        <td class="px-6 py-4 text-slate-300"><i>aₙ = &alpha;₁r₁ⁿ + &alpha;₂r₂ⁿ + ...</i></td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">2</td>
        <td class="px-6 py-4 text-slate-300">Repeated Real Roots (<i>r₁</i> with multiplicity <i>m</i>)</td>
        <td class="px-6 py-4 text-slate-300"><i>aₙ = (&alpha;₁ + &alpha;₂n + ... + &alpha;ₘnᵐ⁻¹)r₁ⁿ</i></td>
Generating functions transform problems about sequences into problems about functions, allowing us to use algebra and calculus.

<span class="text-amber-300 font-semibold">Solving Recurrence Relations with Generating Functions:</span>
**Step 1:** Multiply the recurrence relation by <i>xⁿ</i> and sum over all valid <i>n</i>.
**Step 2:** Express the sum in terms of <i>G(x)</i>.
**Step 3:** Solve the resulting equation for <i>G(x)</i>.
**Step 4:** Expand <i>G(x)</i> into a power series to find the coefficient of <i>xⁿ</i>, which is <i>aₙ</i>.

<span class="text-lime-300 font-semibold">Common Series Expansions:</span>
• <i>1/(1-x) = 1 + x + x² + ... = &sum; xⁿ</i>
• <i>1/(1-x)² = 1 + 2x + 3x² + ... = &sum; (n+1)xⁿ</i>
• <i>(1+x)ⁿ = &sum; C(n,k)xᵏ</i> (Binomial Theorem)`,
      formula: 'G(x) = \\sum_{n=0}^{\\infty} a_n x^n',
    },
    {
      title: '🏗️ Applications & Examples',
      icon: <FiLayers className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">1. The Tower of Hanoi</span>
**Problem:** Move <i>n</i> disks from peg 1 to peg 3, using peg 2 as auxiliary, without placing a larger disk on a smaller one.
**Recurrence:** Let <i>Hₙ</i> be the number of moves.
1. Move top <i>n-1</i> disks from 1 to 2: <i>Hₙ₋₁</i> moves.
2. Move largest disk from 1 to 3: 1 move.
3. Move <i>n-1</i> disks from 2 to 3: <i>Hₙ₋₁</i> moves.
Total: <i>Hₙ = 2Hₙ₋₁ + 1</i> with <i>H₁ = 1</i>.
**Solution:** <i>Hₙ = 2ⁿ - 1</i>.

<span class="text-cyan-400 font-semibold text-lg">2. Binary Strings without Consecutive 0s</span>
**Problem:** Find the number of binary strings of length <i>n</i> that do not contain two consecutive zeros.
**Recurrence:** Let <i>aₙ</i> be the number of such strings.
• If string ends in 1: The preceding <i>n-1</i> bits can be any valid string. (Count: <i>aₙ₋₁</i>)
• If string ends in 0: The bit before must be 1. The preceding <i>n-2</i> bits can be any valid string. (Count: <i>aₙ₋₂</i>)
Total: <i>aₙ = aₙ₋₁ + aₙ₋₂</i>.
**Initial Conditions:** <i>a₁ = 2</i> ("0", "1"), <i>a₂ = 3</i> ("01", "10", "11").
This is related to the Fibonacci sequence!`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Solve a_n = 6a_{n-1} - 9a_{n-2} with a_0 = 1, a_1 = 6.',
      solution: '1. Characteristic Eq: r² - 6r + 9 = 0\n2. Factor: (r - 3)² = 0\n3. Roots: r = 3 (multiplicity 2)\n4. General Solution: a_n = (α₁ + α₂n)3ⁿ\n5. Initial Conditions:\n   n=0: (α₁ + 0) = 1 => α₁ = 1\n   n=1: (1 + α₂)3 = 6 => 1 + α₂ = 2 => α₂ = 1\n6. Final Solution: a_n = (1 + n)3ⁿ',
      formula: 'a_n = (1+n)3^n',
    },
    {
      question: 'Find the generating function for a_n = 3^n.',
      solution: 'G(x) = Σ (3x)ⁿ = 1 + 3x + (3x)² + ...\nThis is a geometric series with ratio 3x.\nG(x) = 1 / (1 - 3x).',
      formula: 'G(x) = \\frac{1}{1-3x}',
    },
    {
      question: 'Solve a_n - 3a_{n-1} = 5 * 3^n using generating functions.',
      solution: 'Multiply by xⁿ and sum:\nΣaₙxⁿ - 3xΣaₙ₋₁xⁿ⁻¹ = 5Σ3ⁿxⁿ\nG(x) - a₀ - 3xG(x) = 5 * (3x)/(1-3x) ... (assuming n starts at 1)\nThis gets complex. Let\'s simplify:\nG(x)(1-3x) = a₀ + ...\nBasically, we transform the recurrence into an algebraic equation in G(x).',
    },
  ],
  exampleProblems: [
    {
      problem: 'Solve the Fibonacci recurrence F_n = F_{n-1} + F_{n-2} with F_0 = 0, F_1 = 1.',
      solution: 'F_n = (1/√5) * (((1+√5)/2)ⁿ - ((1-√5)/2)ⁿ)',
      steps: [
        {
          step: 'Characteristic Equation',
          explanation: 'r² - r - 1 = 0',
        },
        {
          step: 'Find Roots',
          explanation: 'Using quadratic formula: r = (1 ± √5) / 2.\nLet φ = (1+√5)/2 and ψ = (1-√5)/2.',
        },
        {
          step: 'General Solution',
          explanation: 'F_n = α₁φⁿ + α₂ψⁿ',
        },
        {
          step: 'Solve for constants',
          explanation: 'F₀ = 0 => α₁ + α₂ = 0 => α₂ = -α₁\nF₁ = 1 => α₁φ + α₂ψ = 1 => α₁(φ - ψ) = 1\nφ - ψ = √5\nSo α₁ = 1/√5, α₂ = -1/√5',
        },
      ],
      formula: 'F_n = \\frac{1}{\\sqrt{5}} \\left[ \\left(\\frac{1+\\sqrt{5}}{2}\\right)^n - \\left(\\frac{1-\\sqrt{5}}{2}\\right)^n \\right]',
    },
  ],
}

export default function RecurrenceRelationsPage() {
  return <DMTopicPage content={content} />
}
