'use client'

import DMTopicPage, { TruthTableData } from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiCode } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Propositional Logic',
  explanationSections: [
    {
      title: '💭 Sentence vs Proposition',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">A proposition</span> is a declarative sentence that is either true or false, but not both.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Key Characteristics:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-300">Declarative:</span> Makes a statement (not a question or command)</li>
              <li><span className="text-cyan-300">Truth Value:</span> Has a definite truth value (True or False)</li>
              <li><span className="text-cyan-300">Not Ambiguous:</span> Clear meaning</li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-400 font-semibold mb-2">Propositions:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>"2 + 2 = 4" (True)</li>
                <li>"The sky is blue" (True in normal conditions)</li>
                <li>"Paris is the capital of France" (True)</li>
              </ul>
            </div>
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <p className="text-red-400 font-semibold mb-2">Not Propositions:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>"What time is it?" (Question)</li>
                <li>"Close the door!" (Command)</li>
                <li>"x + 1 = 5" (Not a proposition until x is specified)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '⚙️ Logical Operators',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Logical operators</span> combine propositions to form compound propositions.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Basic Operators:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-300">NOT (<MathRenderer math="\neg" />):</span> Negation - reverses truth value</li>
              <li><span className="text-cyan-300">AND (<MathRenderer math="\land" />):</span> Conjunction - true only when both are true</li>
              <li><span className="text-cyan-300">OR (<MathRenderer math="\lor" />):</span> Disjunction - true when at least one is true</li>
              <li><span className="text-cyan-300"><MathRenderer math="\rightarrow" /> (Implication):</span> If-then - false only when premise is true and conclusion is false</li>
              <li><span className="text-cyan-300"><MathRenderer math="\leftrightarrow" /> (Biconditional):</span> If and only if - true when both have same truth value</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Notation:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="p \land q" />: "p and q"</li>
              <li><MathRenderer math="p \lor q" />: "p or q"</li>
              <li><MathRenderer math="\neg p" />: "not p"</li>
              <li><MathRenderer math="p \rightarrow q" />: "if p then q" or "p implies q"</li>
              <li><MathRenderer math="p \leftrightarrow q" />: "p if and only if q"</li>
            </ul>
          </div>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', '¬p', 'p ∧ q', 'p ∨ q', 'p → q', 'p ↔ q'],
        rows: [
          ['T', 'T', 'F', 'T', 'T', 'T', 'T'],
          ['T', 'F', 'F', 'F', 'T', 'F', 'F'],
          ['F', 'T', 'T', 'F', 'T', 'T', 'F'],
          ['F', 'F', 'T', 'F', 'F', 'T', 'T'],
        ],
        title: 'Truth Table for Basic Logical Operators',
      },
    },
    {
      title: '🔗 Compound Propositions',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Compound propositions</span> are formed by combining simple propositions using logical operators.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="(p \land q) \rightarrow r" />: "If p and q, then r"</li>
              <li><MathRenderer math="\neg(p \lor q)" />: "Not (p or q)" - equivalent to "neither p nor q"</li>
              <li><MathRenderer math="(p \rightarrow q) \land (q \rightarrow p)" />: "p if and only if q"</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Precedence:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Negation (<MathRenderer math="\neg" />) - highest</li>
              <li>Conjunction (<MathRenderer math="\land" />) and Disjunction (<MathRenderer math="\lor" />)</li>
              <li>Implication (<MathRenderer math="\rightarrow" />)</li>
              <li>Biconditional (<MathRenderer math="\leftrightarrow" />) - lowest</li>
            </ol>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Example Evaluation:</p>
            <p className="text-gray-300">
              Let <MathRenderer math="p = \text{True}, q = \text{False}, r = \text{True}" />
              <br />
              <MathRenderer math="(p \land q) \rightarrow r = (T \land F) \rightarrow T = F \rightarrow T = \text{True}" />
            </p>
          </div>
        </div>
      ),
      formula: '(p \\land q) \\rightarrow r',
    },
  ],
  practiceQuestions: [
    {
      question: 'Which of the following are propositions? (a) "It is raining" (b) "What is your name?" (c) "2 + 3 = 5" (d) "x > 0"',
      solution: (
        <div className="space-y-4">
          <ul className="list-none space-y-2 text-gray-300">
            <li>(a) "It is raining" - <span className="text-green-400">Proposition</span> (has truth value, depends on weather)</li>
            <li>(b) "What is your name?" - <span className="text-red-400">Not a proposition</span> (question, not declarative)</li>
            <li>(c) "2 + 3 = 5" - <span className="text-green-400">Proposition</span> (True)</li>
            <li>(d) "x &gt; 0" - <span className="text-red-400">Not a proposition</span> (no truth value until x is specified)</li>
          </ul>
        </div>
      ),
    },
    {
      question: (
        <span>
          Construct a truth table for <MathRenderer math="(p \rightarrow q) \land (q \rightarrow p)" />
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            This is the biconditional <MathRenderer math="p \leftrightarrow q" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2 overflow-x-auto">
            <table className="min-w-full text-center text-gray-300">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="px-4 py-2">p</th>
                  <th className="px-4 py-2">q</th>
                  <th className="px-4 py-2"><MathRenderer math="p \rightarrow q" /></th>
                  <th className="px-4 py-2"><MathRenderer math="q \rightarrow p" /></th>
                  <th className="px-4 py-2"><MathRenderer math="(p \rightarrow q) \land (q \rightarrow p)" /></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
                <tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td></tr>
                <tr><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td></tr>
                <tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p → q', 'q → p', '(p → q) ∧ (q → p)'],
        rows: [
          ['T', 'T', 'T', 'T', 'T'],
          ['T', 'F', 'F', 'T', 'F'],
          ['F', 'T', 'T', 'F', 'F'],
          ['F', 'F', 'T', 'T', 'T'],
        ],
        title: 'Truth Table for (p → q) ∧ (q → p)',
      },
    },
    {
      question: (
        <span>
          Evaluate <MathRenderer math="\neg(p \lor q)" /> when <MathRenderer math="p = \text{True}" /> and <MathRenderer math="q = \text{False}" />
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <p className="font-semibold text-cyan-400">Step 1: Evaluate p ∨ q</p>
            <MathRenderer display math="p \lor q = T \lor F = \text{True}" />
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <p className="font-semibold text-cyan-400">Step 2: Apply negation</p>
            <MathRenderer display math="\neg(p \lor q) = \neg(\text{True}) = \text{False}" />
          </div>
          <p className="text-gray-300">
            Therefore, <MathRenderer math="\neg(p \lor q) = \text{False}" /> when <MathRenderer math="p = \text{True}" /> and <MathRenderer math="q = \text{False}" />.
          </p>
        </div>
      ),
      formula: '\\neg(p \\lor q) = \\neg(T \\lor F) = \\neg T = F',
    },
  ],
  exampleProblems: [
    {
      problem: 'Let p = "It is sunny" and q = "I go to the beach". Express "If it is sunny, then I go to the beach" and "I go to the beach if and only if it is sunny" in logical notation.',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            If it is sunny, then I go to the beach: <MathRenderer math="p \rightarrow q" />
            <br />
            I go to the beach if and only if it is sunny: <MathRenderer math="q \leftrightarrow p" /> (or <MathRenderer math="p \leftrightarrow q" />)
          </p>
        </div>
      ),
      steps: [
        {
          step: 'Identify propositions',
          explanation: (
            <span>
              <MathRenderer math="p" /> = "It is sunny", <MathRenderer math="q" /> = "I go to the beach"
            </span>
          ),
        },
        {
          step: 'Translate "if...then"',
          explanation: (
            <span>
              "If p then q" is written as <MathRenderer math="p \rightarrow q" />
            </span>
          ),
        },
        {
          step: 'Translate "if and only if"',
          explanation: (
            <span>
              "q if and only if p" is written as <MathRenderer math="q \leftrightarrow p" />
            </span>
          ),
        },
      ],
      formula: 'p \\rightarrow q, \\quad q \\leftrightarrow p',
    },
  ],
}

export default function PropositionalLogicPage() {
  return <DMTopicPage content={content} />
}

