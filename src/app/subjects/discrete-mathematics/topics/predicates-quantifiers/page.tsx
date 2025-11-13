'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiSearch } from 'react-icons/fi'

const content = {
  title: 'Predicates & Quantifiers',
  explanationSections: [
    {
      title: '🔍 What is a Predicate?',
      icon: <FiSearch className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">A predicate</span> is a statement containing variables that becomes a proposition when variables are replaced by specific values.

<span class="text-amber-300 font-semibold">Notation:</span>
P(x) denotes a predicate with variable x

<span class="text-lime-300 font-semibold">Examples:</span>

• <span class="text-cyan-300">P(x):</span> "x > 3"
  - P(5) = "5 > 3" (True)
  - P(2) = "2 > 3" (False)

• <span class="text-cyan-300">Q(x, y):</span> "x + y = 10"
  - Q(3, 7) = "3 + 7 = 10" (True)
  - Q(1, 2) = "1 + 2 = 10" (False)

<span class="text-pink-300 font-semibold">Key Point:</span>
A predicate is not a proposition until variables are assigned values.`,
      formula: 'P(x): \\text{ statement with variable } x',
    },
    {
      title: '🌍 Universal Quantifier (∀)',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Universal Quantifier</span> (∀) means "for all" or "for every"

<span class="text-amber-300 font-semibold">Notation:</span>
∀x P(x) means "P(x) is true for all x in the domain"

<span class="text-lime-300 font-semibold">Examples:</span>

• <span class="text-cyan-300">∀x (x² ≥ 0):</span> "For all x, x squared is greater than or equal to 0"
  - True (for real numbers)

• <span class="text-cyan-300">∀x (x > 0):</span> "For all x, x is greater than 0"
  - False (x = -1 makes it false)

<span class="text-pink-300 font-semibold">To Prove ∀x P(x):</span>
Show P(x) is true for every possible value of x

<span class="text-pink-300 font-semibold">To Disprove ∀x P(x):</span>
Find a single counterexample where P(x) is false`,
      formula: '\\forall x \\, P(x)',
    },
    {
      title: '🔎 Existential Quantifier (∃)',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Existential Quantifier</span> (∃) means "there exists" or "for some"

<span class="text-amber-300 font-semibold">Notation:</span>
∃x P(x) means "There exists at least one x such that P(x) is true"

<span class="text-lime-300 font-semibold">Examples:</span>

• <span class="text-cyan-300">∃x (x² = 4):</span> "There exists x such that x squared equals 4"
  - True (x = 2 or x = -2)

• <span class="text-cyan-300">∃x (x < 0):</span> "There exists x such that x is less than 0"
  - True (x = -1 works)

<span class="text-pink-300 font-semibold">To Prove ∃x P(x):</span>
Find at least one specific value of x where P(x) is true

<span class="text-pink-300 font-semibold">To Disprove ∃x P(x):</span>
Show P(x) is false for every possible value of x`,
      formula: '\\exists x \\, P(x)',
    },
    {
      title: '🔄 Negating Quantifiers',
      icon: <FiSearch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">De Morgan's Laws for Quantifiers:</span>

<span class="text-amber-300 font-semibold">Negation of Universal:</span>
¬(∀x P(x)) ≡ ∃x ¬P(x)

<span class="text-lime-300 font-semibold">Example:</span>
¬(∀x (x > 0)) ≡ ∃x (x ≤ 0)
"Not all x are positive" ≡ "There exists x that is not positive"

<span class="text-amber-300 font-semibold">Negation of Existential:</span>
¬(∃x P(x)) ≡ ∀x ¬P(x)

<span class="text-lime-300 font-semibold">Example:</span>
¬(∃x (x² < 0)) ≡ ∀x (x² ≥ 0)
"There does not exist x such that x² < 0" ≡ "For all x, x² ≥ 0"

<span class="text-pink-300 font-semibold">Key Rule:</span>
When negating, flip the quantifier and negate the predicate!`,
      formula: '\\neg(\\forall x \\, P(x)) \\equiv \\exists x \\, \\neg P(x)',
    },
    {
      title: '📝 Translating English to Logic',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Common Translations:</span>

<span class="text-amber-300 font-semibold">"All students study":</span>
∀x (Student(x) → Studies(x))

<span class="text-amber-300 font-semibold">"Some students study":</span>
∃x (Student(x) ∧ Studies(x))

<span class="text-amber-300 font-semibold">"No student studies":</span>
∀x (Student(x) → ¬Studies(x))
or equivalently: ¬∃x (Student(x) ∧ Studies(x))

<span class="text-amber-300 font-semibold">"Not all students study":</span>
∃x (Student(x) ∧ ¬Studies(x))

<span class="text-lime-300 font-semibold">Important:</span>
• "All A are B" → ∀x (A(x) → B(x))
• "Some A are B" → ∃x (A(x) ∧ B(x))`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Translate to logical notation: "Every student who studies passes"',
      solution: 'Let S(x) = "x is a student"\nP(x) = "x studies"\nQ(x) = "x passes"\n\nTranslation: ∀x ((S(x) ∧ P(x)) → Q(x))\n\nOr more simply, if domain is all students:\n∀x (P(x) → Q(x))',
      formula: '\\forall x \\, ((S(x) \\land P(x)) \\rightarrow Q(x))',
    },
    {
      question: 'What is the negation of ∀x (x > 0)?',
      solution: 'Using De Morgan\'s law:\n¬(∀x (x > 0)) ≡ ∃x ¬(x > 0) ≡ ∃x (x ≤ 0)\n\nMeaning: "There exists x such that x is not greater than 0"',
      formula: '\\neg(\\forall x \\, (x > 0)) \\equiv \\exists x \\, (x \\leq 0)',
    },
    {
      question: 'Translate: "There exists a student who studies and passes"',
      solution: 'Let S(x) = "x is a student"\nP(x) = "x studies"\nQ(x) = "x passes"\n\nTranslation: ∃x (S(x) ∧ P(x) ∧ Q(x))\n\nOr if domain is all students:\n∃x (P(x) ∧ Q(x))',
      formula: '\\exists x \\, (S(x) \\land P(x) \\land Q(x))',
    },
  ],
  exampleProblems: [
    {
      problem: 'Express in logical notation: "All positive integers are greater than zero"',
      solution: '∀x (x > 0), where domain is positive integers',
      steps: [
        {
          step: 'Identify domain',
          explanation: 'Domain: positive integers',
        },
        {
          step: 'Identify predicate',
          explanation: 'P(x): x > 0',
        },
        {
          step: 'Apply universal quantifier',
          explanation: '∀x (x > 0)',
        },
      ],
      formula: '\\forall x \\, (x > 0)',
    },
  ],
}

export default function PredicatesQuantifiersPage() {
  return <DMTopicPage content={content} />
}

