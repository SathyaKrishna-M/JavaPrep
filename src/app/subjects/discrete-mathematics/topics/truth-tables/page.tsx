'use client'

import DMTopicPage, { TruthTableData } from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiTable } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Truth Tables & Operators',
  explanationSections: [
    {
      title: '📋 Truth Table Basics',
      icon: <FiTable className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">A truth table</span> systematically lists all possible truth value combinations for propositional variables and shows the resulting truth value of a compound proposition.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Structure:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Input columns:</span> All propositional variables (p, q, r, ...)</li>
              <li><span className="text-cyan-300">Output column:</span> The compound proposition being evaluated</li>
              <li><span className="text-cyan-300">Rows:</span> All possible combinations (<MathRenderer math="2^n" /> rows for n variables)</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">For n variables:</p>
            <p className="text-gray-300">Number of rows = <MathRenderer math="2^n" /></p>
            <p className="text-gray-300 mt-2">Example: 2 variables = 4 rows, 3 variables = 8 rows</p>
          </div>
        </div>
      ),
      formula: '\\text{Number of rows} = 2^n',
    },
    {
      title: '🔢 Negation (NOT)',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Negation</span> (<MathRenderer math="\neg" />) reverses the truth value of a proposition.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><MathRenderer math="\neg(\neg p) = p" /> (Double negation)</li>
              <li><MathRenderer math="\neg T = F" /></li>
              <li><MathRenderer math="\neg F = T" /></li>
            </ul>
          </div>
          <p className="text-lime-300 font-semibold">Truth Table:</p>
        </div>
      ),
      truthTable: {
        headers: ['p', '¬p'],
        rows: [
          ['T', 'F'],
          ['F', 'T'],
        ],
        title: 'Truth Table for Negation',
      },
    },
    {
      title: '➕ Conjunction (AND)',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Conjunction</span> (<MathRenderer math="\land" />) is true only when both propositions are true.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><MathRenderer math="p \land q = q \land p" /> (Commutative)</li>
              <li><MathRenderer math="p \land T = p" /></li>
              <li><MathRenderer math="p \land F = F" /></li>
              <li><MathRenderer math="p \land p = p" /></li>
            </ul>
          </div>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p ∧ q'],
        rows: [
          ['T', 'T', 'T'],
          ['T', 'F', 'F'],
          ['F', 'T', 'F'],
          ['F', 'F', 'F'],
        ],
        title: 'Truth Table for Conjunction',
      },
    },
    {
      title: '🔀 Disjunction (OR)',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Disjunction</span> (<MathRenderer math="\lor" />) is true when at least one proposition is true.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><MathRenderer math="p \lor q = q \lor p" /> (Commutative)</li>
              <li><MathRenderer math="p \lor T = T" /></li>
              <li><MathRenderer math="p \lor F = p" /></li>
              <li><MathRenderer math="p \lor p = p" /></li>
            </ul>
          </div>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p ∨ q'],
        rows: [
          ['T', 'T', 'T'],
          ['T', 'F', 'T'],
          ['F', 'T', 'T'],
          ['F', 'F', 'F'],
        ],
        title: 'Truth Table for Disjunction',
      },
    },
    {
      title: '➡️ Conditional (Implication)',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Conditional</span> (<MathRenderer math="\rightarrow" />) is false only when the premise is true and conclusion is false.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Key Point:</p>
            <p className="text-gray-300"><MathRenderer math="p \rightarrow q" /> is false ONLY when <MathRenderer math="p = T" /> and <MathRenderer math="q = F" />. In all other cases, it is true.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Equivalent Forms:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><MathRenderer math="p \rightarrow q \equiv \neg p \lor q" /></li>
              <li>"If p then q" means "not p, or q"</li>
            </ul>
          </div>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p → q'],
        rows: [
          ['T', 'T', 'T'],
          ['T', 'F', 'F'],
          ['F', 'T', 'T'],
          ['F', 'F', 'T'],
        ],
        title: 'Truth Table for Conditional',
      },
      formula: 'p \\rightarrow q \\equiv \\neg p \\lor q',
    },
    {
      title: '↔️ Biconditional',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Biconditional</span> (<MathRenderer math="\leftrightarrow" />) is true when both propositions have the same truth value.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><MathRenderer math="p \leftrightarrow q \equiv q \leftrightarrow p" /> (Commutative)</li>
              <li><MathRenderer math="p \leftrightarrow q \equiv (p \rightarrow q) \land (q \rightarrow p)" /></li>
              <li><MathRenderer math="p \leftrightarrow T \equiv p" /></li>
              <li><MathRenderer math="p \leftrightarrow F \equiv \neg p" /></li>
            </ul>
          </div>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p ↔ q'],
        rows: [
          ['T', 'T', 'T'],
          ['T', 'F', 'F'],
          ['F', 'T', 'F'],
          ['F', 'F', 'T'],
        ],
        title: 'Truth Table for Biconditional',
      },
      formula: 'p \\leftrightarrow q \\equiv (p \\rightarrow q) \\land (q \\rightarrow p)',
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          Construct a truth table for <MathRenderer math="(p \land q) \rightarrow (p \lor q)" />
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Truth table:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap border-collapse border border-slate-700">
              <thead>
                <tr>
                  <th className="border border-slate-700 px-2 py-1">p</th>
                  <th className="border border-slate-700 px-2 py-1">q</th>
                  <th className="border border-slate-700 px-2 py-1">p ∧ q</th>
                  <th className="border border-slate-700 px-2 py-1">p ∨ q</th>
                  <th className="border border-slate-700 px-2 py-1">(p ∧ q) → (p ∨ q)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">T</td></tr>
                <tr><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">T</td></tr>
                <tr><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">T</td></tr>
                <tr><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-green-400 font-semibold mt-2">This is a tautology (always true).</p>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p ∧ q', 'p ∨ q', '(p ∧ q) → (p ∨ q)'],
        rows: [
          ['T', 'T', 'T', 'T', 'T'],
          ['T', 'F', 'F', 'T', 'T'],
          ['F', 'T', 'F', 'T', 'T'],
          ['F', 'F', 'F', 'F', 'T'],
        ],
        title: 'Truth Table for (p ∧ q) → (p ∨ q)',
      },
    },
    {
      question: 'How many rows are needed for a truth table with 3 variables?',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">For n variables, we need <MathRenderer math="2^n" /> rows.</p>
          <p className="text-gray-300">For 3 variables: <MathRenderer math="2^3 = 8" /> rows</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>1 variable: 2 rows</li>
              <li>2 variables: 4 rows</li>
              <li>3 variables: 8 rows</li>
              <li>n variables: <MathRenderer math="2^n" /> rows</li>
            </ul>
          </div>
        </div>
      ),
      formula: '2^n = 2^3 = 8',
    },
    {
      question: (
        <span>
          Construct a truth table for <MathRenderer math="\neg(p \rightarrow q)" />
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">First, construct <MathRenderer math="p \rightarrow q" />, then negate it:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap border-collapse border border-slate-700">
              <thead>
                <tr>
                  <th className="border border-slate-700 px-2 py-1">p</th>
                  <th className="border border-slate-700 px-2 py-1">q</th>
                  <th className="border border-slate-700 px-2 py-1">p → q</th>
                  <th className="border border-slate-700 px-2 py-1">¬(p → q)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">F</td></tr>
                <tr><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">T</td></tr>
                <tr><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">F</td></tr>
                <tr><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">F</td><td className="border border-slate-700 px-2 py-1">T</td><td className="border border-slate-700 px-2 py-1">F</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-green-400 font-semibold mt-2">Note: <MathRenderer math="\neg(p \rightarrow q)" /> is true only when <MathRenderer math="p = T" /> and <MathRenderer math="q = F" />.</p>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p → q', '¬(p → q)'],
        rows: [
          ['T', 'T', 'T', 'F'],
          ['T', 'F', 'F', 'T'],
          ['F', 'T', 'T', 'F'],
          ['F', 'F', 'T', 'F'],
        ],
        title: 'Truth Table for ¬(p → q)',
      },
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Construct a complete truth table for the compound proposition: <MathRenderer math="(p \lor q) \land \neg r" />
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Truth table with 8 rows (<MathRenderer math="2^3 = 8" /> for 3 variables):</p>
        </div>
      ),
      steps: [
        {
          step: 'List all combinations',
          explanation: (
            <span>
              For 3 variables (p, q, r), we have <MathRenderer math="2^3 = 8" /> combinations.
            </span>
          ),
        },
        {
          step: 'Evaluate p ∨ q',
          explanation: 'True when at least one of p or q is true.',
        },
        {
          step: 'Evaluate ¬r',
          explanation: 'Negation of r.',
        },
        {
          step: 'Evaluate (p ∨ q) ∧ ¬r',
          explanation: (
            <span>
              True only when both <MathRenderer math="(p \lor q)" /> and <MathRenderer math="\neg r" /> are true.
            </span>
          ),
        },
      ],
      truthTable: {
        headers: ['p', 'q', 'r', 'p ∨ q', '¬r', '(p ∨ q) ∧ ¬r'],
        rows: [
          ['T', 'T', 'T', 'T', 'F', 'F'],
          ['T', 'T', 'F', 'T', 'T', 'T'],
          ['T', 'F', 'T', 'T', 'F', 'F'],
          ['T', 'F', 'F', 'T', 'T', 'T'],
          ['F', 'T', 'T', 'T', 'F', 'F'],
          ['F', 'T', 'F', 'T', 'T', 'T'],
          ['F', 'F', 'T', 'F', 'F', 'F'],
          ['F', 'F', 'F', 'F', 'T', 'F'],
        ],
        title: 'Truth Table for (p ∨ q) ∧ ¬r',
      },
    },
  ],
}

export default function TruthTablesPage() {
  return <DMTopicPage content={content} />
}
