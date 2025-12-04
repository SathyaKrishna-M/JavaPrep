'use client'

import DMTopicPage, { TruthTableData } from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Logical Equivalence',
  explanationSections: [
    {
      title: '⚖️ Definition of Logical Equivalence',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Two propositions</span> are logically equivalent if they have the same truth value in every possible case.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Notation:</p>
            <p className="text-gray-300">
              <MathRenderer math="p \equiv q" /> or <MathRenderer math="p \Leftrightarrow q" /> means &quot;p is logically equivalent to q&quot;
            </p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Method to Prove:</p>
            <p className="text-gray-300">
              Construct truth tables for both propositions. If all rows match, they are equivalent.
            </p>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">
              <MathRenderer math="p \rightarrow q" /> is equivalent to <MathRenderer math="\neg p \lor q" />
            </p>
          </div>
        </div>
      ),
      formula: 'p \\equiv q \\text{ if } p \\leftrightarrow q \\text{ is a tautology}',
    },
    {
      title: '📐 Laws of Logical Equivalence',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-blue-400 font-semibold">Fundamental Laws:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Identity Laws:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><MathRenderer math="p \land T \equiv p" /></li>
                <li><MathRenderer math="p \lor F \equiv p" /></li>
              </ul>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Domination Laws:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><MathRenderer math="p \lor T \equiv T" /></li>
                <li><MathRenderer math="p \land F \equiv F" /></li>
              </ul>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Idempotent Laws:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><MathRenderer math="p \lor p \equiv p" /></li>
                <li><MathRenderer math="p \land p \equiv p" /></li>
              </ul>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Double Negation:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><MathRenderer math="\neg(\neg p) \equiv p" /></li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <p className="text-amber-300 font-semibold mb-2">Commutative Laws:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><MathRenderer math="p \lor q \equiv q \lor p" /></li>
                <li><MathRenderer math="p \land q \equiv q \land p" /></li>
              </ul>
            </div>
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <p className="text-amber-300 font-semibold mb-2">Associative Laws:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><MathRenderer math="(p \lor q) \lor r \equiv p \lor (q \lor r)" /></li>
                <li><MathRenderer math="(p \land q) \land r \equiv p \land (q \land r)" /></li>
              </ul>
            </div>
          </div>
          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
            <p className="text-amber-300 font-semibold mb-2">Distributive Laws:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)" /></li>
              <li><MathRenderer math="p \land (q \lor r) \equiv (p \land q) \lor (p \land r)" /></li>
            </ul>
          </div>
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            <p className="text-amber-300 font-semibold mb-2">De Morgan&apos;s Laws:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="\neg(p \land q) \equiv \neg p \lor \neg q" /></li>
              <li><MathRenderer math="\neg(p \lor q) \equiv \neg p \land \neg q" /></li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/30">
              <p className="text-amber-300 font-semibold mb-2">Absorption Laws:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><MathRenderer math="p \lor (p \land q) \equiv p" /></li>
                <li><MathRenderer math="p \land (p \lor q) \equiv p" /></li>
              </ul>
            </div>
            <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/30">
              <p className="text-amber-300 font-semibold mb-2">Negation Laws:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><MathRenderer math="p \lor \neg p \equiv T" /></li>
                <li><MathRenderer math="p \land \neg p \equiv F" /></li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '🔄 Converse, Inverse, Contrapositive',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">For the conditional <MathRenderer math="p \rightarrow q" />:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold">Original:</p>
              <MathRenderer display math="p \rightarrow q" />
              <p className="text-cyan-300 text-sm mt-1">&quot;If p then q&quot;</p>
            </div>
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <p className="text-amber-300 font-semibold">Converse:</p>
              <MathRenderer display math="q \rightarrow p" />
              <p className="text-cyan-300 text-sm mt-1">&quot;If q then p&quot;</p>
              <p className="text-red-400 text-xs mt-1">NOT equivalent to original</p>
            </div>
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <p className="text-amber-300 font-semibold">Inverse:</p>
              <MathRenderer display math="\neg p \rightarrow \neg q" />
              <p className="text-cyan-300 text-sm mt-1">&quot;If not p then not q&quot;</p>
              <p className="text-red-400 text-xs mt-1">NOT equivalent to original</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-amber-300 font-semibold">Contrapositive:</p>
              <MathRenderer display math="\neg q \rightarrow \neg p" />
              <p className="text-cyan-300 text-sm mt-1">&quot;If not q then not p&quot;</p>
              <p className="text-green-400 text-xs mt-1">EQUIVALENT to original</p>
            </div>
          </div>
          <div className="bg-lime-500/10 p-4 rounded-lg border border-lime-500/30">
            <p className="text-lime-300 font-semibold mb-2">Key Result:</p>
            <MathRenderer display math="p \rightarrow q \equiv \neg q \rightarrow \neg p" />
            <p className="text-gray-300 text-center">(Contrapositive is always equivalent)</p>
          </div>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p → q', 'q → p', '¬p → ¬q', '¬q → ¬p'],
        rows: [
          ['T', 'T', 'T', 'T', 'T', 'T'],
          ['T', 'F', 'F', 'T', 'T', 'F'],
          ['F', 'T', 'T', 'F', 'F', 'T'],
          ['F', 'F', 'T', 'T', 'T', 'T'],
        ],
        title: 'Truth Table Comparing Conditional Forms',
      },
      formula: 'p \\rightarrow q \\equiv \\neg q \\rightarrow \\neg p',
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          Prove using truth tables that <MathRenderer math="p \rightarrow q" /> is equivalent to <MathRenderer math="\neg p \lor q" />
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Construct truth tables for both:
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2 overflow-x-auto">
            <table className="min-w-full text-center text-gray-300">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="px-4 py-2">p</th>
                  <th className="px-4 py-2">q</th>
                  <th className="px-4 py-2"><MathRenderer math="p \rightarrow q" /></th>
                  <th className="px-4 py-2"><MathRenderer math="\neg p" /></th>
                  <th className="px-4 py-2"><MathRenderer math="\neg p \lor q" /></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>T</td><td>T</td><td>T</td><td>F</td><td>T</td></tr>
                <tr><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td></tr>
                <tr><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
                <tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-green-400">
            Since <MathRenderer math="p \rightarrow q" /> and <MathRenderer math="\neg p \lor q" /> have identical truth values in all rows, they are equivalent.
          </p>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p → q', '¬p', '¬p ∨ q'],
        rows: [
          ['T', 'T', 'T', 'F', 'T'],
          ['T', 'F', 'F', 'F', 'F'],
          ['F', 'T', 'T', 'T', 'T'],
          ['F', 'F', 'T', 'T', 'T'],
        ],
        title: 'Proving p → q ≡ ¬p ∨ q',
      },
      formula: 'p \\rightarrow q \\equiv \\neg p \\lor q',
    },
    {
      question: (
        <span>
          Prove De Morgan&apos;s Law: <MathRenderer math="\neg(p \land q) \equiv \neg p \lor \neg q" />
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Construct truth tables:
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2 overflow-x-auto">
            <table className="min-w-full text-center text-gray-300">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="px-4 py-2">p</th>
                  <th className="px-4 py-2">q</th>
                  <th className="px-4 py-2"><MathRenderer math="p \land q" /></th>
                  <th className="px-4 py-2"><MathRenderer math="\neg(p \land q)" /></th>
                  <th className="px-4 py-2"><MathRenderer math="\neg p" /></th>
                  <th className="px-4 py-2"><MathRenderer math="\neg q" /></th>
                  <th className="px-4 py-2"><MathRenderer math="\neg p \lor \neg q" /></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>T</td><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td></tr>
                <tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td></tr>
                <tr><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>F</td><td>T</td></tr>
                <tr><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-green-400">
            Since <MathRenderer math="\neg(p \land q)" /> and <MathRenderer math="\neg p \lor \neg q" /> match in all rows, they are equivalent.
          </p>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p ∧ q', '¬(p ∧ q)', '¬p', '¬q', '¬p ∨ ¬q'],
        rows: [
          ['T', 'T', 'T', 'F', 'F', 'F', 'F'],
          ['T', 'F', 'F', 'T', 'F', 'T', 'T'],
          ['F', 'T', 'F', 'T', 'T', 'F', 'T'],
          ['F', 'F', 'F', 'T', 'T', 'T', 'T'],
        ],
        title: 'Proving De Morgan\'s Law',
      },
    },
    {
      question: 'Find the contrapositive of "If it rains, then I stay home"',
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300">Original: &quot;If it rains, then I stay home&quot;</p>
            <p className="text-gray-300">Let <MathRenderer math="p" /> = &quot;it rains&quot;, <MathRenderer math="q" /> = &quot;I stay home&quot;</p>
            <p className="text-gray-300">Original: <MathRenderer math="p \rightarrow q" /></p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="font-semibold text-green-400">Contrapositive: <MathRenderer math="\neg q \rightarrow \neg p" /></p>
            <p className="text-gray-300">&quot;If I do not stay home, then it does not rain&quot;</p>
            <p className="text-green-300 text-sm mt-2">This is logically equivalent to the original statement.</p>
          </div>
        </div>
      ),
      formula: 'p \\rightarrow q \\equiv \\neg q \\rightarrow \\neg p',
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Simplify the expression: <MathRenderer math="(p \lor q) \land (p \lor \neg q)" />
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="(p \lor q) \land (p \lor \neg q) \equiv p" />
        </div>
      ),
      steps: [
        {
          step: 'Apply distributive law',
          explanation: (
            <MathRenderer math="(p \lor q) \land (p \lor \neg q) = p \lor (q \land \neg q)" />
          ),
        },
        {
          step: 'Apply negation law',
          explanation: (
            <span>
              <MathRenderer math="q \land \neg q = F" />, so <MathRenderer math="p \lor (q \land \neg q) = p \lor F" />
            </span>
          ),
        },
        {
          step: 'Apply identity law',
          explanation: (
            <MathRenderer math="p \lor F = p" />
          ),
        },
      ],
      formula: '(p \\lor q) \\land (p \\lor \\neg q) \\equiv p',
    },
  ],
}

export default function LogicalEquivalencePage() {
  return <DMTopicPage content={content} />
}

