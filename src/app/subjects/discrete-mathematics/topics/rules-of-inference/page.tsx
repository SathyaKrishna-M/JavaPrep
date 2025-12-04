'use client'

import DMTopicPage, { TruthTableData } from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Rules of Inference',
  explanationSections: [
    {
      title: '🧠 What are Rules of Inference?',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Rules of inference</span> are valid argument forms that allow us to derive conclusions from premises.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Structure:</p>
            <p className="text-gray-300">Premise 1</p>
            <p className="text-gray-300">Premise 2</p>
            <p className="text-gray-300">...</p>
            <p className="text-gray-300">Premise n</p>
            <div className="border-t border-gray-500 my-1 w-24"></div>
            <p className="text-gray-300"><MathRenderer math="\therefore" /> Conclusion</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Valid Argument:</p>
            <p className="text-gray-300">An argument is valid if whenever all premises are true, the conclusion must also be true.</p>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Key Point:</p>
            <p className="text-gray-300">If premises are true, conclusion is guaranteed to be true (but premises may be false).</p>
          </div>
        </div>
      ),
    },
    {
      title: '✅ Modus Ponens',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-blue-400 font-semibold">Modus Ponens (Affirming the Antecedent)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Form:</p>
              <MathRenderer display math="\begin{aligned} & p \rightarrow q \\ & p \\ \hline \therefore \ & q \end{aligned}" />
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-lime-300 font-semibold mb-2">Example:</p>
              <p className="text-gray-300">If it rains, then the ground is wet.</p>
              <p className="text-gray-300">It is raining.</p>
              <p className="text-gray-300 border-t border-gray-500 mt-1 pt-1">Therefore, the ground is wet.</p>
            </div>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-2">Why it works:</p>
            <p className="text-gray-300">
              If <MathRenderer math="p \rightarrow q" /> is true and <MathRenderer math="p" /> is true, then <MathRenderer math="q" /> must be true (by definition of implication).
            </p>
          </div>
        </div>
      ),
      truthTable: {
        headers: ['p', 'q', 'p → q', 'Valid?'],
        rows: [
          ['T', 'T', 'T', '✓'],
          ['T', 'F', 'F', '✗'],
          ['F', 'T', 'T', 'N/A'],
          ['F', 'F', 'T', 'N/A'],
        ],
        title: 'Modus Ponens Validity',
      },
      formula: '\\frac{p \\rightarrow q, \\quad p}{\\therefore q}',
    },
    {
      title: '❌ Modus Tollens',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">Modus Tollens (Denying the Consequent)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Form:</p>
              <MathRenderer display math="\begin{aligned} & p \rightarrow q \\ & \neg q \\ \hline \therefore \ & \neg p \end{aligned}" />
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-lime-300 font-semibold mb-2">Example:</p>
              <p className="text-gray-300">If it rains, then the ground is wet.</p>
              <p className="text-gray-300">The ground is not wet.</p>
              <p className="text-gray-300 border-t border-gray-500 mt-1 pt-1">Therefore, it is not raining.</p>
            </div>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-2">Why it works:</p>
            <p className="text-gray-300">
              If <MathRenderer math="p \rightarrow q" /> is true and <MathRenderer math="q" /> is false, then <MathRenderer math="p" /> must be false (contrapositive).
            </p>
          </div>
        </div>
      ),
      formula: '\\frac{p \\rightarrow q, \\quad \\neg q}{\\therefore \\neg p}',
    },
    {
      title: '🔗 Hypothetical Syllogism',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-blue-400 font-semibold">Hypothetical Syllogism (Chain Rule)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Form:</p>
              <MathRenderer display math="\begin{aligned} & p \rightarrow q \\ & q \rightarrow r \\ \hline \therefore \ & p \rightarrow r \end{aligned}" />
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-lime-300 font-semibold mb-2">Example:</p>
              <p className="text-gray-300">If I study, then I pass.</p>
              <p className="text-gray-300">If I pass, then I graduate.</p>
              <p className="text-gray-300 border-t border-gray-500 mt-1 pt-1">Therefore, if I study, then I graduate.</p>
            </div>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-2">Why it works:</p>
            <p className="text-gray-300">Transitivity of implication.</p>
          </div>
        </div>
      ),
      formula: '\\frac{p \\rightarrow q, \\quad q \\rightarrow r}{\\therefore p \\rightarrow r}',
    },
    {
      title: '🔀 Disjunctive Syllogism',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">Disjunctive Syllogism</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Form:</p>
              <MathRenderer display math="\begin{aligned} & p \lor q \\ & \neg p \\ \hline \therefore \ & q \end{aligned}" />
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-lime-300 font-semibold mb-2">Example:</p>
              <p className="text-gray-300">Either I study or I fail.</p>
              <p className="text-gray-300">I am not studying.</p>
              <p className="text-gray-300 border-t border-gray-500 mt-1 pt-1">Therefore, I will fail.</p>
            </div>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-2">Why it works:</p>
            <p className="text-gray-300">
              If <MathRenderer math="p \lor q" /> is true and <MathRenderer math="p" /> is false, then <MathRenderer math="q" /> must be true.
            </p>
          </div>
        </div>
      ),
      formula: '\\frac{p \\lor q, \\quad \\neg p}{\\therefore q}',
    },
    {
      title: '➕ Addition',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-blue-400 font-semibold">Addition</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Form:</p>
              <MathRenderer display math="\begin{aligned} & p \\ \hline \therefore \ & p \lor q \end{aligned}" />
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-lime-300 font-semibold mb-2">Example:</p>
              <p className="text-gray-300">It is sunny.</p>
              <p className="text-gray-300 border-t border-gray-500 mt-1 pt-1">Therefore, it is sunny or it is raining.</p>
            </div>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-2">Why it works:</p>
            <p className="text-gray-300">
              If <MathRenderer math="p" /> is true, then <MathRenderer math="p \lor q" /> is always true.
            </p>
          </div>
        </div>
      ),
      formula: '\\frac{p}{\\therefore p \\lor q}',
    },
    {
      title: '✂️ Simplification',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">Simplification</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Form:</p>
              <MathRenderer display math="\begin{aligned} & p \land q \\ \hline \therefore \ & p \end{aligned}" />
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-lime-300 font-semibold mb-2">Example:</p>
              <p className="text-gray-300">It is sunny and warm.</p>
              <p className="text-gray-300 border-t border-gray-500 mt-1 pt-1">Therefore, it is sunny.</p>
            </div>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-2">Why it works:</p>
            <p className="text-gray-300">
              If <MathRenderer math="p \land q" /> is true, then both <MathRenderer math="p" /> and <MathRenderer math="q" /> are true.
            </p>
          </div>
        </div>
      ),
      formula: '\\frac{p \\land q}{\\therefore p}',
    },
  ],
  practiceQuestions: [
    {
      question: 'Identify the rule of inference used:\n\nIf it snows, then school is closed.\nIt is snowing.\nTherefore, school is closed.',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            This is <span className="text-cyan-300 font-semibold">Modus Ponens</span>.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Form:</p>
            <p className="text-gray-300"><MathRenderer math="p \rightarrow q" /> (If it snows, then school is closed)</p>
            <p className="text-gray-300"><MathRenderer math="p" /> (It is snowing)</p>
            <div className="border-t border-gray-500 my-1 w-full"></div>
            <p className="text-gray-300"><MathRenderer math="\therefore q" /> (Therefore, school is closed)</p>
          </div>
        </div>
      ),
      formula: '\\frac{p \\rightarrow q, \\quad p}{\\therefore q}',
    },
    {
      question: 'Use rules of inference to derive the conclusion:\n\nPremises:\n1. p → q\n2. q → r\n3. r → s\n\nConclusion: p → s',
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <p className="font-semibold text-cyan-400">Step 1: Apply Hypothetical Syllogism to (1) and (2)</p>
            <MathRenderer display math="\begin{aligned} & p \rightarrow q \\ & q \rightarrow r \\ \hline \therefore \ & p \rightarrow r \end{aligned}" />
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <p className="font-semibold text-cyan-400">Step 2: Apply Hypothetical Syllogism to result and (3)</p>
            <MathRenderer display math="\begin{aligned} & p \rightarrow r \\ & r \rightarrow s \\ \hline \therefore \ & p \rightarrow s \end{aligned}" />
          </div>
          <p className="text-green-400">Therefore, <MathRenderer math="p \rightarrow s" /> follows from the premises.</p>
        </div>
      ),
    },
    {
      question: 'Is this argument valid?\n\nIf I study, I pass.\nI did not pass.\nTherefore, I did not study.',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Yes, this is valid. It uses <span className="text-cyan-300 font-semibold">Modus Tollens</span>.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Form:</p>
            <p className="text-gray-300"><MathRenderer math="p \rightarrow q" /> (If I study, I pass)</p>
            <p className="text-gray-300"><MathRenderer math="\neg q" /> (I did not pass)</p>
            <div className="border-t border-gray-500 my-1 w-full"></div>
            <p className="text-gray-300"><MathRenderer math="\therefore \neg p" /> (Therefore, I did not study)</p>
          </div>
          <p className="text-green-400">This is a valid form of reasoning.</p>
        </div>
      ),
      formula: '\\frac{p \\rightarrow q, \\quad \\neg q}{\\therefore \\neg p}',
    },
  ],
  exampleProblems: [
    {
      problem: 'Prove the following argument using rules of inference:\n\nPremises:\n1. p ∨ q\n2. p → r\n3. q → s\n\nConclusion: r ∨ s',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="r \lor s" />
        </div>
      ),
      steps: [
        {
          step: 'Given premises',
          explanation: (
            <MathRenderer math="p \lor q, \quad p \rightarrow r, \quad q \rightarrow s" />
          ),
        },
        {
          step: 'Case 1: Assume p',
          explanation: (
            <span>
              If <MathRenderer math="p" />, then by Modus Ponens with (2): <MathRenderer math="r" />
              <br />
              Therefore <MathRenderer math="r \lor s" /> (Addition)
            </span>
          ),
        },
        {
          step: 'Case 2: Assume q',
          explanation: (
            <span>
              If <MathRenderer math="q" />, then by Modus Ponens with (3): <MathRenderer math="s" />
              <br />
              Therefore <MathRenderer math="r \lor s" /> (Addition)
            </span>
          ),
        },
        {
          step: 'Conclusion',
          explanation: (
            <span>
              Since <MathRenderer math="p \lor q" /> is true, at least one case holds, so <MathRenderer math="r \lor s" /> is true (Proof by Cases)
            </span>
          ),
        },
      ],
    },
  ],
}

export default function RulesOfInferencePage() {
  return <DMTopicPage content={content} />
}
