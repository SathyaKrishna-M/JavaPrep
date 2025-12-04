'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiAlertTriangle, FiRepeat } from 'react-icons/fi'

const content = {
    title: 'Negation of Quantified Statements',
    explanationSections: [
        {
            title: '❗ De Morgan\'s Laws for Quantifiers',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Negating Quantifiers</span> involves switching the quantifier and negating the predicate.
      
<span class="text-amber-300 font-semibold">Rules:</span>
1. $\\neg \\forall x P(x) \\equiv \\exists x \\neg P(x)$
   "Not all x have property P" is equivalent to "There exists an x that does not have property P".

2. $\\neg \\exists x P(x) \\equiv \\forall x \\neg P(x)$
   "There does not exist an x with property P" is equivalent to "For all x, x does not have property P".`,
            formula: '\\neg \\forall x P(x) \\equiv \\exists x \\neg P(x)',
        },
        {
            title: '🌀 Negating Nested Quantifiers',
            icon: <FiRepeat className="w-6 h-6" />,
            content: `When negating nested quantifiers, move the negation from left to right, flipping each quantifier as you pass it.
      
<span class="text-lime-300 font-semibold">Example:</span>
$\\neg \\forall x \\exists y P(x, y)$
$\\equiv \\exists x \\neg \\exists y P(x, y)$
$\\equiv \\exists x \\forall y \\neg P(x, y)$`,
            formula: '\\neg \\forall x \\exists y P(x, y) \\equiv \\exists x \\forall y \\neg P(x, y)',
        },
    ],
    practiceQuestions: [
        {
            question: 'Negate the statement: "Every student in this class has taken a course in Java."',
            solution: 'Let S(x) be "x is a student in this class" and J(x) be "x has taken a course in Java".\nOriginal: ∀x (S(x) → J(x))\n\nNegation: ¬∀x (S(x) → J(x))\n≡ ∃x ¬(S(x) → J(x))\n≡ ∃x (S(x) ∧ ¬J(x))\n\nEnglish: "There is a student in this class who has NOT taken a course in Java."',
        },
        {
            question: 'Negate: "There is a politician who is honest."',
            solution: 'Original: ∃x (P(x) ∧ H(x))\n\nNegation: ¬∃x (P(x) ∧ H(x))\n≡ ∀x ¬(P(x) ∧ H(x))\n≡ ∀x (¬P(x) ∨ ¬H(x))\n\nEnglish: "For every person, they are either not a politician or not honest" (or "No politician is honest").',
        },
    ],
    exampleProblems: [
        {
            problem: 'Negate the definition of limit: ∀ε>0 ∃δ>0 ∀x (0 < |x-a| < δ → |f(x)-L| < ε)',
            solution: '∃ε>0 ∀δ>0 ∃x (0 < |x-a| < δ ∧ |f(x)-L| ≥ ε)',
            steps: [
                {
                    step: 'Negate first quantifier',
                    explanation: '¬∀ε>0 ... becomes ∃ε>0 ¬...',
                },
                {
                    step: 'Negate second quantifier',
                    explanation: '∃ε>0 ¬∃δ>0 ... becomes ∃ε>0 ∀δ>0 ¬...',
                },
                {
                    step: 'Negate third quantifier',
                    explanation: '∃ε>0 ∀δ>0 ¬∀x ... becomes ∃ε>0 ∀δ>0 ∃x ¬...',
                },
                {
                    step: 'Negate implication',
                    explanation: '¬(P → Q) ≡ P ∧ ¬Q.\nSo, ¬(0 < |x-a| < δ → |f(x)-L| < ε)\nbecomes (0 < |x-a| < δ ∧ |f(x)-L| ≥ ε).',
                },
            ],
            formula: '\\exists \\epsilon > 0 \\forall \\delta > 0 \\exists x (0 < |x-a| < \\delta \\land |f(x)-L| \\ge \\epsilon)',
        },
    ],
}

export default function NegationOfQuantifiedStatementsPage() {
    return <DMTopicPage content={content} />
}
