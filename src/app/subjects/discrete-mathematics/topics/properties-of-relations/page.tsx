'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Properties of Relations',
  explanationSections: [
    {
      title: '🔄 Equivalence Relations',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">An equivalence relation</span> is a relation that is reflexive, symmetric, and transitive.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Reflexive:</span> <MathRenderer math="(a, a) \in R" /> for all <MathRenderer math="a \in A" /></li>
              <li><span className="text-cyan-300">Symmetric:</span> If <MathRenderer math="(a, b) \in R" />, then <MathRenderer math="(b, a) \in R" /></li>
              <li><span className="text-cyan-300">Transitive:</span> If <MathRenderer math="(a, b) \in R" /> and <MathRenderer math="(b, c) \in R" />, then <MathRenderer math="(a, c) \in R" /></li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Equivalence Classes:</p>
            <p className="text-gray-300">If <MathRenderer math="\sim" /> is an equivalence relation on <MathRenderer math="A" />, the equivalence class of <MathRenderer math="a \in A" /> is:</p>
            <MathRenderer display math="[a] = \{x \in A \mid x \sim a\}" />
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Partition:</p>
            <p className="text-gray-300">Equivalence classes partition the set A into disjoint subsets.</p>
          </div>
        </div>
      ),
      formula: '[a] = \\{x \\in A \\mid x \\sim a\\}',
    },
    {
      title: '📐 Partial Order Relations',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">A partial order</span> is a relation that is reflexive, antisymmetric, and transitive.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Reflexive:</span> <MathRenderer math="(a, a) \in R" /> for all <MathRenderer math="a" /></li>
              <li><span className="text-cyan-300">Antisymmetric:</span> If <MathRenderer math="(a, b) \in R" /> and <MathRenderer math="(b, a) \in R" />, then <MathRenderer math="a = b" /></li>
              <li><span className="text-cyan-300">Transitive:</span> If <MathRenderer math="(a, b) \in R" /> and <MathRenderer math="(b, c) \in R" />, then <MathRenderer math="(a, c) \in R" /></li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Notation:</p>
            <p className="text-gray-300">Often denoted by <MathRenderer math="\le" /> or <MathRenderer math="\subseteq" /></p>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Divisibility relation on positive integers</li>
              <li>Subset relation on power set</li>
              <li>Less than or equal on real numbers</li>
            </ul>
          </div>
        </div>
      ),
      formula: 'a \\leq b \\text{ if } a \\mid b',
    },
    {
      title: '🔗 Posets (Partially Ordered Sets)',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">A poset</span> is a set together with a partial order relation.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Comparable:</span> Elements a and b are comparable if <MathRenderer math="a \le b" /> or <MathRenderer math="b \le a" /></li>
              <li><span className="text-cyan-300">Incomparable:</span> Elements that are not comparable</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300"><MathRenderer math="(\mathbb{Z}, \le)" />:</span> All integers are comparable</li>
              <li><span className="text-cyan-300"><MathRenderer math="(P(A), \subseteq)" />:</span> Not all subsets are comparable</li>
              <li className="ml-4 text-sm text-gray-400"><MathRenderer math="\{1,2\}" /> and <MathRenderer math="\{2,3\}" /> are incomparable (neither is subset of the other)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '⛓️ Chains and Antichains',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-400 font-semibold">Chain:</p>
            <p className="text-gray-300">A subset of a poset where every pair of elements is comparable.</p>
            <p className="text-amber-300 font-semibold mt-2">Example:</p>
            <p className="text-gray-300">In <MathRenderer math="(\mathbb{Z}, \le)" />, the set <MathRenderer math="\{1, 2, 3, 4, 5\}" /> is a chain.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-blue-400 font-semibold">Antichain:</p>
            <p className="text-gray-300">A subset of a poset where no two distinct elements are comparable.</p>
            <p className="text-amber-300 font-semibold mt-2">Example:</p>
            <p className="text-gray-300">In <MathRenderer math="(P(\{1,2,3\}), \subseteq)" />, the set <MathRenderer math="\{\{1\}, \{2\}, \{3\}\}" /> is an antichain.</p>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-lime-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Maximum chain length = height of poset</li>
              <li>Maximum antichain size = width of poset</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          Determine if the relation <MathRenderer math="R = \{(1,1), (2,2), (3,3), (1,2), (2,1)\}" /> on <MathRenderer math="A = \{1, 2, 3\}" /> is an equivalence relation.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Check each property:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Reflexive:</p>
            <p className="text-gray-300"><MathRenderer math="(1,1), (2,2), (3,3) \in R" /> ✓</p>
            <p className="text-gray-300">All elements are related to themselves.</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Symmetric:</p>
            <p className="text-gray-300"><MathRenderer math="(1,2) \in R" /> and <MathRenderer math="(2,1) \in R" /> ✓</p>
            <p className="text-gray-300">The relation is symmetric.</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Transitive:</p>
            <p className="text-gray-300"><MathRenderer math="(1,2) \in R" /> and <MathRenderer math="(2,1) \in R" />, but we need <MathRenderer math="(1,1) \in R" /> ✓</p>
            <p className="text-gray-300"><MathRenderer math="(1,1)" /> is in R, so transitive property holds.</p>
          </div>
          <p className="text-green-400 font-semibold">Since R is reflexive, symmetric, and transitive, it is an equivalence relation.</p>
        </div>
      ),
    },
    {
      question: 'Prove that the relation &quot;divides&quot; (|) on positive integers is a partial order.',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">We need to show reflexivity, antisymmetry, and transitivity.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Reflexive:</p>
            <p className="text-gray-300">For any positive integer a, <MathRenderer math="a \mid a" /> because <MathRenderer math="a = a \times 1" />. ✓</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Antisymmetric:</p>
            <p className="text-gray-300">If <MathRenderer math="a \mid b" /> and <MathRenderer math="b \mid a" />, then there exist integers k, m such that:</p>
            <p className="text-gray-300"><MathRenderer math="b = ak" /> and <MathRenderer math="a = bm" /></p>
            <p className="text-gray-300">Substituting: <MathRenderer math="a = (ak)m = a(km)" /></p>
            <p className="text-gray-300">Since <MathRenderer math="a \neq 0" />, we have <MathRenderer math="km = 1" />, so <MathRenderer math="k = m = 1" /> (for positive integers)</p>
            <p className="text-green-400">Therefore, <MathRenderer math="a = b" />. ✓</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Transitive:</p>
            <p className="text-gray-300">If <MathRenderer math="a \mid b" /> and <MathRenderer math="b \mid c" />, then:</p>
            <p className="text-gray-300"><MathRenderer math="b = ak" /> and <MathRenderer math="c = bm" /> for some integers k, m</p>
            <p className="text-gray-300"><MathRenderer math="c = (ak)m = a(km)" /></p>
            <p className="text-green-400">Therefore, <MathRenderer math="a \mid c" />. ✓</p>
          </div>
          <p className="text-gray-300">Since all three properties hold, &quot;divides&quot; is a partial order.</p>
        </div>
      ),
    },
    {
      question: (
        <span>
          Find the equivalence classes of the relation R on <MathRenderer math="\mathbb{Z}" /> defined by <MathRenderer math="a R b" /> if <MathRenderer math="a - b" /> is divisible by 3.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">This is the &quot;congruence modulo 3&quot; relation.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Equivalence classes:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><MathRenderer math="[0] = \{..., -6, -3, 0, 3, 6, ...\}" /> (numbers ≡ 0 mod 3)</li>
              <li><MathRenderer math="[1] = \{..., -5, -2, 1, 4, 7, ...\}" /> (numbers ≡ 1 mod 3)</li>
              <li><MathRenderer math="[2] = \{..., -4, -1, 2, 5, 8, ...\}" /> (numbers ≡ 2 mod 3)</li>
            </ul>
          </div>
          <p className="text-green-400">These three classes partition <MathRenderer math="\mathbb{Z}" /> into disjoint subsets.</p>
        </div>
      ),
      formula: '[a] = \\{b \\in \\mathbb{Z} \\mid a \\equiv b \\pmod{3}\\}',
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Prove that the relation R on <MathRenderer math="\mathbb{R}" /> defined by <MathRenderer math="x R y" /> if <MathRenderer math="|x| = |y|" /> is an equivalence relation.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-green-400 font-semibold">R is an equivalence relation</p>
        </div>
      ),
      steps: [
        {
          step: 'Prove reflexive',
          explanation: (
            <MathRenderer math="\text{For any } x \in \mathbb{R}, |x| = |x|, \text{ so } (x, x) \in R. \checkmark" />
          ),
        },
        {
          step: 'Prove symmetric',
          explanation: (
            <MathRenderer math="\text{If } (x, y) \in R, \text{ then } |x| = |y|, \text{ so } |y| = |x|, \text{ therefore } (y, x) \in R. \checkmark" />
          ),
        },
        {
          step: 'Prove transitive',
          explanation: (
            <MathRenderer math="\text{If } (x, y) \in R \text{ and } (y, z) \in R, \text{ then } |x| = |y| \text{ and } |y| = |z|, \text{ so } |x| = |z|, \text{ therefore } (x, z) \in R. \checkmark" />
          ),
        },
        {
          step: 'Conclusion',
          explanation: 'Since R is reflexive, symmetric, and transitive, R is an equivalence relation.',
        },
      ],
    },
  ],
}

export default function PropertiesOfRelationsPage() {
  return <DMTopicPage content={content} />
}
