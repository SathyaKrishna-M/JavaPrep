'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Relations & Their Properties',
  explanationSections: [
    {
      title: '🔗 Relations',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">A relation</span> <MathRenderer math="R" /> from set <MathRenderer math="A" /> to set <MathRenderer math="B" /> is a subset of <MathRenderer math="A \times B" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Notation:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><MathRenderer math="(a, b) \in R" /> means a is related to b</li>
              <li>We write <MathRenderer math="a R b" /></li>
              <li><MathRenderer math="R \subseteq A \times B" /></li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Types of Relations:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Reflexive:</span> <MathRenderer math="(a, a) \in R" /> for all <MathRenderer math="a \in A" /></li>
              <li><span className="text-cyan-300">Symmetric:</span> If <MathRenderer math="(a, b) \in R" />, then <MathRenderer math="(b, a) \in R" /></li>
              <li><span className="text-cyan-300">Transitive:</span> If <MathRenderer math="(a, b) \in R" /> and <MathRenderer math="(b, c) \in R" />, then <MathRenderer math="(a, c) \in R" /></li>
              <li><span className="text-cyan-300">Antisymmetric:</span> If <MathRenderer math="(a, b) \in R" /> and <MathRenderer math="(b, a) \in R" />, then <MathRenderer math="a = b" /></li>
            </ul>
          </div>
        </div>
      ),
      formula: 'R \\subseteq A \\times B',
    },
    {
      title: '⚙️ Functions',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">A function</span> <MathRenderer math="f: A \rightarrow B" /> is a relation where each element of <MathRenderer math="A" /> maps to exactly one element of <MathRenderer math="B" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Domain:</span> Set <MathRenderer math="A" /> (all possible inputs)</li>
              <li><span className="text-cyan-300">Codomain:</span> Set <MathRenderer math="B" /> (all possible outputs)</li>
              <li><span className="text-cyan-300">Range:</span> <MathRenderer math="\{f(a) \mid a \in A\} \subseteq B" /> (actual outputs)</li>
              <li><span className="text-cyan-300">One-to-One (Injective):</span> <MathRenderer math="f(a_1) = f(a_2) \implies a_1 = a_2" /></li>
              <li><span className="text-cyan-300">Onto (Surjective):</span> For every <MathRenderer math="b \in B" />, there exists <MathRenderer math="a \in A" /> such that <MathRenderer math="f(a) = b" /></li>
              <li><span className="text-cyan-300">Bijective:</span> Both one-to-one and onto</li>
            </ul>
          </div>
        </div>
      ),
      formula: 'f: A \\rightarrow B, \\quad \\forall a \\in A, \\exists! b \\in B: f(a) = b',
    },
    {
      title: '🔄 Equivalence Relations',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">An equivalence relation</span> is a relation that is reflexive, symmetric, and transitive.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Reflexive:</span> <MathRenderer math="a \sim a" /> for all <MathRenderer math="a" /></li>
              <li><span className="text-cyan-300">Symmetric:</span> If <MathRenderer math="a \sim b" />, then <MathRenderer math="b \sim a" /></li>
              <li><span className="text-cyan-300">Transitive:</span> If <MathRenderer math="a \sim b" /> and <MathRenderer math="b \sim c" />, then <MathRenderer math="a \sim c" /></li>
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
      title: '📊 Partial Orders',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">A partial order</span> is a relation that is reflexive, antisymmetric, and transitive.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Notation:</p>
            <p className="text-gray-300">Often denoted by <MathRenderer math="\le" /> or <MathRenderer math="\subseteq" /></p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Reflexive:</span> <MathRenderer math="a \le a" /></li>
              <li><span className="text-cyan-300">Antisymmetric:</span> If <MathRenderer math="a \le b" /> and <MathRenderer math="b \le a" />, then <MathRenderer math="a = b" /></li>
              <li><span className="text-cyan-300">Transitive:</span> If <MathRenderer math="a \le b" /> and <MathRenderer math="b \le c" />, then <MathRenderer math="a \le c" /></li>
            </ul>
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
      question: (
        <span>
          Is the function <MathRenderer math="f: \mathbb{R} \rightarrow \mathbb{R}" /> defined by <MathRenderer math="f(x) = x^2" /> one-to-one? Onto?
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">One-to-One (Injective)?</p>
            <p className="text-red-400">No. For example, <MathRenderer math="f(2) = 4" /> and <MathRenderer math="f(-2) = 4" />, so different inputs map to the same output.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">Onto (Surjective)?</p>
            <p className="text-red-400">No. There is no real number x such that <MathRenderer math="f(x) = -1" />, since <MathRenderer math="x^2 \ge 0" /> for all <MathRenderer math="x \in \mathbb{R}" />.</p>
          </div>
          <p className="text-gray-300">Therefore, f is neither one-to-one nor onto.</p>
        </div>
      ),
      functionGraph: {
        type: 'quadratic' as const,
        title: 'Graph of f(x) = x²',
      },
    },
    {
      question: (
        <span>
          Define an equivalence relation on <MathRenderer math="\mathbb{Z}" /> by <MathRenderer math="a \sim b" /> if <MathRenderer math="a - b" /> is divisible by 3. Find the equivalence classes.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">This is the "congruence modulo 3" relation.</p>
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
    {
      question: 'Prove that the relation "divides" (|) on positive integers is a partial order.',
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
            <p className="text-gray-300">Since <MathRenderer math="a \neq 0" />, we have <MathRenderer math="km = 1" />, so <MathRenderer math="k = m = 1" /> (or -1, but we're dealing with positive integers)</p>
            <p className="text-green-400">Therefore, <MathRenderer math="a = b" />. ✓</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Transitive:</p>
            <p className="text-gray-300">If <MathRenderer math="a \mid b" /> and <MathRenderer math="b \mid c" />, then:</p>
            <p className="text-gray-300"><MathRenderer math="b = ak" /> and <MathRenderer math="c = bm" /> for some integers k, m</p>
            <p className="text-gray-300"><MathRenderer math="c = (ak)m = a(km)" /></p>
            <p className="text-green-400">Therefore, <MathRenderer math="a \mid c" />. ✓</p>
          </div>
          <p className="text-gray-300">Since all three properties hold, "divides" is a partial order.</p>
        </div>
      ),
    },
    {
      question: (
        <span>
          How many functions are there from a set A with 3 elements to a set B with 4 elements?
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">For each element in A, we can choose any of the 4 elements in B as its image.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Element 1: 4 choices</li>
              <li>Element 2: 4 choices</li>
              <li>Element 3: 4 choices</li>
            </ul>
          </div>
          <p className="text-gray-300">Total functions = <MathRenderer math="4 \times 4 \times 4 = 4^3 = 64" /></p>
          <p className="text-green-400">In general, if <MathRenderer math="|A| = m" /> and <MathRenderer math="|B| = n" />, there are <MathRenderer math="n^m" /> functions from A to B.</p>
        </div>
      ),
      formula: '|B|^{|A|} = 4^3 = 64',
    },
    {
      question: (
        <span>
          Determine if <MathRenderer math="R = \{(a,b) \mid a \text{ and } b \text{ are students in the same class}\}" /> is an equivalence relation.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Check each property:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Reflexive:</p>
            <p className="text-gray-300">Is every student in the same class as themselves? Yes, by definition. ✓</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Symmetric:</p>
            <p className="text-gray-300">If student a is in the same class as student b, is b in the same class as a? Yes, "same class" is symmetric. ✓</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Transitive:</p>
            <p className="text-gray-300">If a is in the same class as b, and b is in the same class as c, is a in the same class as c? Yes, if they share a class with b, they must all be in that same class. ✓</p>
          </div>
          <p className="text-green-400 font-semibold">Therefore, R is an equivalence relation.</p>
          <p className="text-gray-300">The equivalence classes are the different classes, and each class is an equivalence class.</p>
        </div>
      ),
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Let <MathRenderer math="A = \{1, 2, 3\}" /> and <MathRenderer math="B = \{a, b\}" />. List all functions from A to B.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">There are <MathRenderer math="2^3 = 8" /> functions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <ul className="list-none text-gray-300 space-y-1">
                <li><MathRenderer math="f_1: 1 \to a, 2 \to a, 3 \to a" /></li>
                <li><MathRenderer math="f_2: 1 \to a, 2 \to a, 3 \to b" /></li>
                <li><MathRenderer math="f_3: 1 \to a, 2 \to b, 3 \to a" /></li>
                <li><MathRenderer math="f_4: 1 \to a, 2 \to b, 3 \to b" /></li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <ul className="list-none text-gray-300 space-y-1">
                <li><MathRenderer math="f_5: 1 \to b, 2 \to a, 3 \to a" /></li>
                <li><MathRenderer math="f_6: 1 \to b, 2 \to a, 3 \to b" /></li>
                <li><MathRenderer math="f_7: 1 \to b, 2 \to b, 3 \to a" /></li>
                <li><MathRenderer math="f_8: 1 \to b, 2 \to b, 3 \to b" /></li>
              </ul>
            </div>
          </div>
        </div>
      ),
      steps: [
        {
          step: 'Count total functions',
          explanation: (
            <MathRenderer math="\text{For each of 3 elements in A, choose 1 of 2 elements in B: } 2^3 = 8" />
          ),
        },
        {
          step: 'List all combinations',
          explanation: 'Systematically list all possible mappings.',
        },
      ],
      formula: '|B|^{|A|} = 2^3 = 8',
    },
    {
      problem: (
        <span>
          Find the equivalence classes of the relation R on <MathRenderer math="\mathbb{Z}" /> defined by <MathRenderer math="a R b" /> if <MathRenderer math="|a| = |b|" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Equivalence classes:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <ul className="list-none text-gray-300 space-y-1">
              <li><MathRenderer math="[0] = \{0\}" /></li>
              <li><MathRenderer math="[1] = \{-1, 1\}" /></li>
              <li><MathRenderer math="[2] = \{-2, 2\}" /></li>
              <li><MathRenderer math="[3] = \{-3, 3\}" /></li>
              <li>...</li>
              <li><MathRenderer math="[n] = \{-n, n\} \text{ for } n > 0" /></li>
            </ul>
          </div>
        </div>
      ),
      steps: [
        {
          step: 'Check it\'s an equivalence relation',
          explanation: (
            <div className="space-y-1">
              <p>Reflexive: <MathRenderer math="|a| = |a|" /> ✓</p>
              <p>Symmetric: If <MathRenderer math="|a| = |b|" />, then <MathRenderer math="|b| = |a|" /> ✓</p>
              <p>Transitive: If <MathRenderer math="|a| = |b|" /> and <MathRenderer math="|b| = |c|" />, then <MathRenderer math="|a| = |c|" /> ✓</p>
            </div>
          ),
        },
        {
          step: 'Find equivalence classes',
          explanation: 'Each class contains a number and its negative (except 0).',
        },
      ],
    },
  ],
}

export default function RelationsFunctionsEquivalencePage() {
  return <DMTopicPage content={content} />
}
