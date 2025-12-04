'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiShield, FiAlertTriangle, FiRepeat, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Proof Methods',
  explanationSections: [
    {
      title: '🛡️ Direct Proof',
      icon: <FiShield className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Direct Proof</span> is the most common form of proof. It assumes that the hypothesis <i>p</i> is true and shows that the conclusion <i>q</i> must also be true.
      
<span class="text-amber-300 font-semibold">Structure:</span>
1. Assume <i>p</i> is true.
2. Use axioms, definitions, and previously proven theorems.
3. Deduce that <i>q</i> is true.

<span class="text-lime-300 font-semibold">Example:</span>
Prove that if <i>n</i> is an odd integer, then <i>n²</i> is odd.
<span class="text-gray-400 italic">Proof:</span> Assume <i>n</i> is odd. Then <i>n = 2k + 1</i> for some integer <i>k</i>.
<i>n² = (2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1</i>.
Since <i>2k² + 2k</i> is an integer, <i>n²</i> is odd.`,
    },
    {
      title: '⚠️ Proof by Contraposition',
      icon: <FiRepeat className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Proof by Contraposition</span> is an indirect proof method. To prove <i>p &rarr; q</i>, we prove its contrapositive <i>&not;q &rarr; &not;p</i>.
      
<span class="text-amber-300 font-semibold">Logic:</span>
<i>p &rarr; q &equiv; &not;q &rarr; &not;p</i>

<span class="text-lime-300 font-semibold">Example:</span>
Prove that if <i>3n + 2</i> is odd, then <i>n</i> is odd.
<span class="text-gray-400 italic">Proof (by Contraposition):</span> Assume <i>n</i> is even (negation of conclusion).
Then <i>n = 2k</i>.
<i>3n + 2 = 3(2k) + 2 = 6k + 2 = 2(3k + 1)</i>.
This is even, which contradicts the hypothesis that <i>3n + 2</i> is odd? No, we showed that if <i>n</i> is even, then <i>3n+2</i> is even.
Thus, <i>&not;q &rarr; &not;p</i> is true, so <i>p &rarr; q</i> is true.`,
      truthTable: {
        title: 'Truth Table: Contrapositive Equivalence',
        headers: ['p', 'q', 'p → q', '¬q', '¬p', '¬q → ¬p'],
        rows: [
          ['T', 'T', 'T', 'F', 'F', 'T'],
          ['T', 'F', 'F', 'T', 'F', 'F'],
          ['F', 'T', 'T', 'F', 'T', 'T'],
          ['F', 'F', 'T', 'T', 'T', 'T'],
        ],
      },
    },
    {
      title: '🚫 Proof by Contradiction',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Proof by Contradiction</span> (Reductio ad Absurdum) assumes the statement to be proven is false and shows that this assumption leads to a contradiction (a statement that is always false, like <i>1=0</i> or <i>r &land; &not;r</i>).
      
<span class="text-amber-300 font-semibold">Structure:</span>
1. Assume <i>&not;p</i> is true.
2. Derive a contradiction <i>q &land; &not;q</i>.
3. Conclude that <i>&not;p</i> is false, so <i>p</i> must be true.

<span class="text-lime-300 font-semibold">Example:</span>
Prove that &radic;2 is irrational.
<span class="text-gray-400 italic">Proof:</span> Assume &radic;2 is rational. Then &radic;2 = <i>a/b</i> where <i>a, b</i> have no common factors.
<i>2 = a²/b² &implies; 2b² = a²</i>. So <i>a²</i> is even, implying <i>a</i> is even (<i>a=2k</i>).
<i>2b² = (2k)² = 4k² &implies; b² = 2k²</i>. So <i>b²</i> is even, implying <i>b</i> is even.
Contradiction: <i>a</i> and <i>b</i> have a common factor of 2.
Thus, &radic;2 is irrational.`,
    },
    {
      title: '✅ Comparison of Methods',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: `
<div class="overflow-x-auto">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="uppercase tracking-wider border-b-2 border-slate-700">
      <tr>
        <th scope="col" class="px-6 py-4 text-cyan-400">Method</th>
        <th scope="col" class="px-6 py-4 text-cyan-400">Strategy</th>
        <th scope="col" class="px-6 py-4 text-cyan-400">Use When</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Direct Proof</td>
        <td class="px-6 py-4 text-slate-300">Assume <i>p</i>, derive <i>q</i></td>
        <td class="px-6 py-4 text-slate-300">Direct implication is clear</td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Contraposition</td>
        <td class="px-6 py-4 text-slate-300">Assume <i>&not;q</i>, derive <i>&not;p</i></td>
        <td class="px-6 py-4 text-slate-300">"Not <i>q</i>" gives more info than <i>p</i></td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Contradiction</td>
        <td class="px-6 py-4 text-slate-300">Assume <i>&not;p</i>, derive contradiction</td>
        <td class="px-6 py-4 text-slate-300">Proving non-existence or irrationality</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Prove that the sum of two odd integers is even.',
      solution: 'Direct Proof:\nLet m and n be two odd integers.\nBy definition, m = 2k + 1 and n = 2j + 1 for some integers k, j.\nm + n = (2k + 1) + (2j + 1)\n= 2k + 2j + 2\n= 2(k + j + 1)\nSince k + j + 1 is an integer, 2(k + j + 1) is even.\nTherefore, the sum of two odd integers is even.',
    },
    {
      question: 'Prove that if n² is even, then n is even.',
      solution: 'Proof by Contraposition:\nWe want to prove p → q where p: "n² is even" and q: "n is even".\nContrapositive: ¬q → ¬p ("If n is odd, then n² is odd").\n\nAssume n is odd.\nThen n = 2k + 1.\nn² = (2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.\nThis is in the form 2m + 1, so n² is odd.\n\nSince we proved the contrapositive, the original statement is true.',
    },
    {
      question: 'Prove that there is no largest prime number.',
      solution: 'Proof by Contradiction:\nAssume there is a largest prime number, say P.\nLet S be the set of all primes {p₁, p₂, ..., P}.\nConsider the number N = (p₁ × p₂ × ... × P) + 1.\n\nN is clearly larger than P.\nN is not divisible by any prime in S (it leaves a remainder of 1 when divided by any pᵢ).\nTherefore, N is either prime itself or divisible by a prime larger than P.\nIn either case, there exists a prime larger than P.\n\nContradiction! Our assumption that P is the largest prime is false.\nTherefore, there is no largest prime number.',
    },
  ],
  exampleProblems: [
    {
      problem: 'Prove that for all integers n, if 3n + 2 is even, then n is even.',
      solution: 'We will use proof by contraposition.',
      steps: [
        {
          step: 'State the contrapositive',
          explanation: 'Original: If 3n + 2 is even (p), then n is even (q).\nContrapositive: If n is odd (¬q), then 3n + 2 is odd (¬p).',
        },
        {
          step: 'Assume hypothesis of contrapositive',
          explanation: 'Assume n is odd. So n = 2k + 1 for some integer k.',
        },
        {
          step: 'Substitute and simplify',
          explanation: '3n + 2 = 3(2k + 1) + 2 = 6k + 3 + 2 = 6k + 5 = 6k + 4 + 1 = 2(3k + 2) + 1.',
        },
        {
          step: 'Conclusion',
          explanation: '2(3k + 2) + 1 is an odd integer. Thus, 3n + 2 is odd. Since the contrapositive is true, the original statement is true.',
        },
      ],
    },
  ],
}

export default function ProofMethodsPage() {
  return <DMTopicPage content={content} />
}
