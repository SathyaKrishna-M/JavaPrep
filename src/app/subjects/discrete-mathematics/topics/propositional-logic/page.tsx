'use client'

import DMTopicPage, { TruthTableData } from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiCode } from 'react-icons/fi'

const content = {
  title: 'Propositional Logic',
  explanationSections: [
    {
      title: '💭 Sentence vs Proposition',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">A proposition</span> is a declarative sentence that is either true or false, but not both.

<span class="text-amber-300 font-semibold">Key Characteristics:</span>

• <span class="text-cyan-300">Declarative:</span> Makes a statement (not a question or command)
• <span class="text-cyan-300">Truth Value:</span> Has a definite truth value (True or False)
• <span class="text-cyan-300">Not Ambiguous:</span> Clear meaning

<span class="text-lime-300 font-semibold">Examples:</span>

<span class="text-green-400">Propositions:</span>
• "2 + 2 = 4" (True)
• "The sky is blue" (True in normal conditions)
• "Paris is the capital of France" (True)

<span class="text-red-400">Not Propositions:</span>
• "What time is it?" (Question)
• "Close the door!" (Command)
• "x + 1 = 5" (Not a proposition until x is specified)`,
    },
    {
      title: '⚙️ Logical Operators',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Logical operators</span> combine propositions to form compound propositions.

<span class="text-amber-300 font-semibold">Basic Operators:</span>

• <span class="text-cyan-300">NOT (¬):</span> Negation - reverses truth value
• <span class="text-cyan-300">AND (∧):</span> Conjunction - true only when both are true
• <span class="text-cyan-300">OR (∨):</span> Disjunction - true when at least one is true
• <span class="text-cyan-300">→ (Implication):</span> If-then - false only when premise is true and conclusion is false
• <span class="text-cyan-300">↔ (Biconditional):</span> If and only if - true when both have same truth value

<span class="text-lime-300 font-semibold">Notation:</span>
• p ∧ q: "p and q"
• p ∨ q: "p or q"
• ¬p: "not p"
• p → q: "if p then q" or "p implies q"
• p ↔ q: "p if and only if q"`,
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
      content: `<span class="text-cyan-400 font-semibold">Compound propositions</span> are formed by combining simple propositions using logical operators.

<span class="text-amber-300 font-semibold">Examples:</span>

• <span class="text-cyan-300">(p ∧ q) → r:</span> "If p and q, then r"
• <span class="text-cyan-300">¬(p ∨ q):</span> "Not (p or q)" - equivalent to "neither p nor q"
• <span class="text-cyan-300">(p → q) ∧ (q → p):</span> "p if and only if q"

<span class="text-lime-300 font-semibold">Precedence:</span>
1. Negation (¬) - highest
2. Conjunction (∧) and Disjunction (∨)
3. Implication (→)
4. Biconditional (↔) - lowest

<span class="text-pink-300 font-semibold">Example Evaluation:</span>
Let p = True, q = False, r = True

(p ∧ q) → r = (T ∧ F) → T = F → T = True`,
      formula: '(p \\land q) \\rightarrow r',
    },
  ],
  practiceQuestions: [
    {
      question: 'Which of the following are propositions? (a) "It is raining" (b) "What is your name?" (c) "2 + 3 = 5" (d) "x > 0"',
      solution: '(a) "It is raining" - Proposition (has truth value, depends on weather)\n\n(b) "What is your name?" - Not a proposition (question, not declarative)\n\n(c) "2 + 3 = 5" - Proposition (True)\n\n(d) "x > 0" - Not a proposition (no truth value until x is specified)',
    },
    {
      question: 'Construct a truth table for (p → q) ∧ (q → p)',
      solution: 'This is the biconditional p ↔ q.\n\nTruth table:\np | q | p → q | q → p | (p → q) ∧ (q → p)\n--|---|-------|-------|-------------------\nT | T |   T   |   T   |         T\nT | F |   F   |   T   |         F\nF | T |   T   |   F   |         F\nF | F |   T   |   T   |         T',
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
      question: 'Evaluate ¬(p ∨ q) when p = True and q = False',
      solution: 'Step 1: Evaluate p ∨ q\np ∨ q = T ∨ F = True\n\nStep 2: Apply negation\n¬(p ∨ q) = ¬(True) = False\n\nTherefore, ¬(p ∨ q) = False when p = True and q = False.',
      formula: '\\neg(p \\lor q) = \\neg(T \\lor F) = \\neg T = F',
    },
  ],
  exampleProblems: [
    {
      problem: 'Let p = "It is sunny" and q = "I go to the beach". Express "If it is sunny, then I go to the beach" and "I go to the beach if and only if it is sunny" in logical notation.',
      solution: 'If it is sunny, then I go to the beach: p → q\n\nI go to the beach if and only if it is sunny: q ↔ p (or p ↔ q)',
      steps: [
        {
          step: 'Identify propositions',
          explanation: 'p = "It is sunny", q = "I go to the beach"',
        },
        {
          step: 'Translate "if...then"',
          explanation: '"If p then q" is written as p → q',
        },
        {
          step: 'Translate "if and only if"',
          explanation: '"q if and only if p" is written as q ↔ p',
        },
      ],
      formula: 'p \\rightarrow q, \\quad q \\leftrightarrow p',
    },
  ],
}

export default function PropositionalLogicPage() {
  return <DMTopicPage content={content} />
}

