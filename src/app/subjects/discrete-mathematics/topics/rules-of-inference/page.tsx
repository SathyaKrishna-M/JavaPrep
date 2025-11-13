'use client'

import DMTopicPage, { TruthTableData } from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Rules of Inference',
  explanationSections: [
    {
      title: '🧠 What are Rules of Inference?',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Rules of inference</span> are valid argument forms that allow us to derive conclusions from premises.

<span class="text-amber-300 font-semibold">Structure:</span>
Premise 1
Premise 2
...
Premise n
∴ Conclusion

<span class="text-lime-300 font-semibold">Valid Argument:</span>
An argument is valid if whenever all premises are true, the conclusion must also be true.

<span class="text-pink-300 font-semibold">Key Point:</span>
If premises are true, conclusion is guaranteed to be true (but premises may be false).`,
    },
    {
      title: '✅ Modus Ponens',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Modus Ponens</span> (Affirming the Antecedent)

<span class="text-amber-300 font-semibold">Form:</span>
p → q
p
∴ q

<span class="text-lime-300 font-semibold">Example:</span>
If it rains, then the ground is wet.
It is raining.
Therefore, the ground is wet.

<span class="text-cyan-300 font-semibold">Why it works:</span>
If p → q is true and p is true, then q must be true (by definition of implication).`,
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
      content: `<span class="text-cyan-400 font-semibold">Modus Tollens</span> (Denying the Consequent)

<span class="text-amber-300 font-semibold">Form:</span>
p → q
¬q
∴ ¬p

<span class="text-lime-300 font-semibold">Example:</span>
If it rains, then the ground is wet.
The ground is not wet.
Therefore, it is not raining.

<span class="text-cyan-300 font-semibold">Why it works:</span>
If p → q is true and q is false, then p must be false (contrapositive).`,
      formula: '\\frac{p \\rightarrow q, \\quad \\neg q}{\\therefore \\neg p}',
    },
    {
      title: '🔗 Hypothetical Syllogism',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Hypothetical Syllogism</span> (Chain Rule)

<span class="text-amber-300 font-semibold">Form:</span>
p → q
q → r
∴ p → r

<span class="text-lime-300 font-semibold">Example:</span>
If I study, then I pass.
If I pass, then I graduate.
Therefore, if I study, then I graduate.

<span class="text-cyan-300 font-semibold">Why it works:</span>
Transitivity of implication.`,
      formula: '\\frac{p \\rightarrow q, \\quad q \\rightarrow r}{\\therefore p \\rightarrow r}',
    },
    {
      title: '🔀 Disjunctive Syllogism',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Disjunctive Syllogism</span>

<span class="text-amber-300 font-semibold">Form:</span>
p ∨ q
¬p
∴ q

<span class="text-lime-300 font-semibold">Example:</span>
Either I study or I fail.
I am not studying.
Therefore, I will fail.

<span class="text-cyan-300 font-semibold">Why it works:</span>
If p ∨ q is true and p is false, then q must be true.`,
      formula: '\\frac{p \\lor q, \\quad \\neg p}{\\therefore q}',
    },
    {
      title: '➕ Addition',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Addition</span>

<span class="text-amber-300 font-semibold">Form:</span>
p
∴ p ∨ q

<span class="text-lime-300 font-semibold">Example:</span>
It is sunny.
Therefore, it is sunny or it is raining.

<span class="text-cyan-300 font-semibold">Why it works:</span>
If p is true, then p ∨ q is always true.`,
      formula: '\\frac{p}{\\therefore p \\lor q}',
    },
    {
      title: '✂️ Simplification',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Simplification</span>

<span class="text-amber-300 font-semibold">Form:</span>
p ∧ q
∴ p

<span class="text-lime-300 font-semibold">Example:</span>
It is sunny and warm.
Therefore, it is sunny.

<span class="text-cyan-300 font-semibold">Why it works:</span>
If p ∧ q is true, then both p and q are true.`,
      formula: '\\frac{p \\land q}{\\therefore p}',
    },
  ],
  practiceQuestions: [
    {
      question: 'Identify the rule of inference used:\n\nIf it snows, then school is closed.\nIt is snowing.\nTherefore, school is closed.',
      solution: 'This is <span class="text-cyan-300 font-semibold">Modus Ponens</span>.\n\nForm:\np → q (If it snows, then school is closed)\np (It is snowing)\n∴ q (Therefore, school is closed)',
      formula: '\\frac{p \\rightarrow q, \\quad p}{\\therefore q}',
    },
    {
      question: 'Use rules of inference to derive the conclusion:\n\nPremises:\n1. p → q\n2. q → r\n3. r → s\n\nConclusion: p → s',
      solution: 'Step 1: Apply Hypothetical Syllogism to (1) and (2)\np → q, q → r\n∴ p → r\n\nStep 2: Apply Hypothetical Syllogism to result and (3)\np → r, r → s\n∴ p → s\n\nTherefore, p → s follows from the premises.',
    },
    {
      question: 'Is this argument valid?\n\nIf I study, I pass.\nI did not pass.\nTherefore, I did not study.',
      solution: 'Yes, this is valid. It uses <span class="text-cyan-300 font-semibold">Modus Tollens</span>.\n\nForm:\np → q (If I study, I pass)\n¬q (I did not pass)\n∴ ¬p (Therefore, I did not study)\n\nThis is a valid form of reasoning.',
      formula: '\\frac{p \\rightarrow q, \\quad \\neg q}{\\therefore \\neg p}',
    },
  ],
  exampleProblems: [
    {
      problem: 'Prove the following argument using rules of inference:\n\nPremises:\n1. p ∨ q\n2. p → r\n3. q → s\n\nConclusion: r ∨ s',
      solution: 'r ∨ s',
      steps: [
        {
          step: 'Given premises',
          explanation: 'p ∨ q, p → r, q → s',
        },
        {
          step: 'Case 1: Assume p',
          explanation: 'If p, then by Modus Ponens with (2): r\nTherefore r ∨ s',
        },
        {
          step: 'Case 2: Assume q',
          explanation: 'If q, then by Modus Ponens with (3): s\nTherefore r ∨ s',
        },
        {
          step: 'Conclusion',
          explanation: 'Since p ∨ q is true, at least one case holds, so r ∨ s is true',
        },
      ],
    },
  ],
}

export default function RulesOfInferencePage() {
  return <DMTopicPage content={content} />
}

