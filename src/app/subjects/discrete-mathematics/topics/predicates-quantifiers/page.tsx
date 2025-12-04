'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiSearch } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Predicates & Quantifiers',
  explanationSections: [
    {
      title: '🔍 What is a Predicate?',
      icon: <FiSearch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">A predicate</span> is a statement containing variables that becomes a proposition when variables are replaced by specific values.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Notation:</p>
            <p className="text-gray-300">
              <MathRenderer math="P(x)" /> denotes a predicate with variable <MathRenderer math="x" />
            </p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-cyan-300"><MathRenderer math="P(x): x > 3" /></span>
                <ul className="list-disc list-inside ml-6 mt-1 text-gray-400">
                  <li><MathRenderer math="P(5): 5 > 3" /> (True)</li>
                  <li><MathRenderer math="P(2): 2 > 3" /> (False)</li>
                </ul>
              </li>
              <li>
                <span className="text-cyan-300"><MathRenderer math="Q(x, y): x + y = 10" /></span>
                <ul className="list-disc list-inside ml-6 mt-1 text-gray-400">
                  <li><MathRenderer math="Q(3, 7): 3 + 7 = 10" /> (True)</li>
                  <li><MathRenderer math="Q(1, 2): 1 + 2 = 10" /> (False)</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Key Point:</p>
            <p className="text-gray-300">
              A predicate is not a proposition until variables are assigned values.
            </p>
          </div>
        </div>
      ),
      formula: 'P(x): \\text{ statement with variable } x',
    },
    {
      title: '🌍 Universal Quantifier (∀)',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Universal Quantifier</span> (<MathRenderer math="\forall" />) means "for all" or "for every"
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Notation:</p>
            <p className="text-gray-300">
              <MathRenderer math="\forall x P(x)" /> means "P(x) is true for all x in the domain"
            </p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-cyan-300"><MathRenderer math="\forall x (x^2 \ge 0)" />:</span> "For all x, x squared is greater than or equal to 0"
                <p className="ml-6 text-gray-400">- True (for real numbers)</p>
              </li>
              <li>
                <span className="text-cyan-300"><MathRenderer math="\forall x (x > 0)" />:</span> "For all x, x is greater than 0"
                <p className="ml-6 text-gray-400">- False (x = -1 makes it false)</p>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
              <p className="text-pink-300 font-semibold mb-2">To Prove <MathRenderer math="\forall x P(x)" />:</p>
              <p className="text-gray-300">Show P(x) is true for every possible value of x</p>
            </div>
            <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
              <p className="text-pink-300 font-semibold mb-2">To Disprove <MathRenderer math="\forall x P(x)" />:</p>
              <p className="text-gray-300">Find a single counterexample where P(x) is false</p>
            </div>
          </div>
        </div>
      ),
      formula: '\\forall x \\, P(x)',
    },
    {
      title: '🔎 Existential Quantifier (∃)',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Existential Quantifier</span> (<MathRenderer math="\exists" />) means "there exists" or "for some"
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Notation:</p>
            <p className="text-gray-300">
              <MathRenderer math="\exists x P(x)" /> means "There exists at least one x such that P(x) is true"
            </p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-cyan-300"><MathRenderer math="\exists x (x^2 = 4)" />:</span> "There exists x such that x squared equals 4"
                <p className="ml-6 text-gray-400">- True (x = 2 or x = -2)</p>
              </li>
              <li>
                <span className="text-cyan-300"><MathRenderer math="\exists x (x < 0)" />:</span> "There exists x such that x is less than 0"
                <p className="ml-6 text-gray-400">- True (x = -1 works)</p>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
              <p className="text-pink-300 font-semibold mb-2">To Prove <MathRenderer math="\exists x P(x)" />:</p>
              <p className="text-gray-300">Find at least one specific value of x where P(x) is true</p>
            </div>
            <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
              <p className="text-pink-300 font-semibold mb-2">To Disprove <MathRenderer math="\exists x P(x)" />:</p>
              <p className="text-gray-300">Show P(x) is false for every possible value of x</p>
            </div>
          </div>
        </div>
      ),
      formula: '\\exists x \\, P(x)',
    },
    {
      title: '🔄 Negating Quantifiers',
      icon: <FiSearch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-blue-400 font-semibold">De Morgan's Laws for Quantifiers:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Negation of Universal:</p>
              <MathRenderer display math="\neg(\forall x P(x)) \equiv \exists x \neg P(x)" />
              <div className="mt-2">
                <p className="text-lime-300 font-semibold">Example:</p>
                <MathRenderer math="\neg(\forall x (x > 0)) \equiv \exists x (x \le 0)" />
                <p className="text-gray-400 text-sm mt-1">"Not all x are positive" <MathRenderer math="\equiv" /> "There exists x that is not positive"</p>
              </div>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Negation of Existential:</p>
              <MathRenderer display math="\neg(\exists x P(x)) \equiv \forall x \neg P(x)" />
              <div className="mt-2">
                <p className="text-lime-300 font-semibold">Example:</p>
                <MathRenderer math="\neg(\exists x (x^2 < 0)) \equiv \forall x (x^2 \ge 0)" />
                <p className="text-gray-400 text-sm mt-1">"There does not exist x such that x² {'<'} 0" <MathRenderer math="\equiv" /> "For all x, x² {'\\ge'} 0"</p>
              </div>
            </div>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30 text-center">
            <p className="text-pink-300 font-semibold mb-2">Key Rule:</p>
            <p className="text-gray-300">When negating, flip the quantifier and negate the predicate!</p>
          </div>
        </div>
      ),
      formula: '\\neg(\\forall x \\, P(x)) \\equiv \\exists x \\, \\neg P(x)',
    },
    {
      title: '📝 Translating English to Logic',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-cyan-400 font-semibold">Common Translations:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">"All students study":</p>
              <MathRenderer display math="\forall x (\text{Student}(x) \rightarrow \text{Studies}(x))" />
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">"Some students study":</p>
              <MathRenderer display math="\exists x (\text{Student}(x) \land \text{Studies}(x))" />
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">"No student studies":</p>
              <MathRenderer display math="\forall x (\text{Student}(x) \rightarrow \neg \text{Studies}(x))" />
              <p className="text-gray-400 text-sm mt-1">or equivalently: <MathRenderer math="\neg \exists x (\text{Student}(x) \land \text{Studies}(x))" /></p>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">"Not all students study":</p>
              <MathRenderer display math="\exists x (\text{Student}(x) \land \neg \text{Studies}(x))" />
            </div>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Important:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>"All A are B" <MathRenderer math="\to \forall x (A(x) \rightarrow B(x))" /></li>
              <li>"Some A are B" <MathRenderer math="\to \exists x (A(x) \land B(x))" /></li>
            </ul>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: 'Translate to logical notation: "Every student who studies passes"',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Let <MathRenderer math="S(x)" /> = "x is a student"
            <br />
            <MathRenderer math="P(x)" /> = "x studies"
            <br />
            <MathRenderer math="Q(x)" /> = "x passes"
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <p className="font-semibold text-cyan-400">Translation:</p>
            <MathRenderer display math="\forall x ((S(x) \land P(x)) \rightarrow Q(x))" />
          </div>
          <p className="text-gray-300">
            Or more simply, if domain is all students:
            <br />
            <MathRenderer math="\forall x (P(x) \rightarrow Q(x))" />
          </p>
        </div>
      ),
      formula: '\\forall x \\, ((S(x) \\land P(x)) \\rightarrow Q(x))',
    },
    {
      question: (
        <span>
          What is the negation of <MathRenderer math="\forall x (x > 0)" />?
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Using De Morgan's law:
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <MathRenderer display math="\neg(\forall x (x > 0)) \equiv \exists x \neg(x > 0) \equiv \exists x (x \le 0)" />
          </div>
          <p className="text-gray-300">
            Meaning: "There exists x such that x is not greater than 0"
          </p>
        </div>
      ),
      formula: '\\neg(\\forall x \\, (x > 0)) \\equiv \\exists x \\, (x \\leq 0)',
    },
    {
      question: 'Translate: "There exists a student who studies and passes"',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Let <MathRenderer math="S(x)" /> = "x is a student"
            <br />
            <MathRenderer math="P(x)" /> = "x studies"
            <br />
            <MathRenderer math="Q(x)" /> = "x passes"
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <p className="font-semibold text-cyan-400">Translation:</p>
            <MathRenderer display math="\exists x (S(x) \land P(x) \land Q(x))" />
          </div>
          <p className="text-gray-300">
            Or if domain is all students:
            <br />
            <MathRenderer math="\exists x (P(x) \land Q(x))" />
          </p>
        </div>
      ),
      formula: '\\exists x \\, (S(x) \\land P(x) \\land Q(x))',
    },
  ],
  exampleProblems: [
    {
      problem: 'Express in logical notation: "All positive integers are greater than zero"',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="\forall x (x > 0)" />
          <p className="text-gray-300">where domain is positive integers</p>
        </div>
      ),
      steps: [
        {
          step: 'Identify domain',
          explanation: 'Domain: positive integers',
        },
        {
          step: 'Identify predicate',
          explanation: (
            <MathRenderer math="P(x): x > 0" />
          ),
        },
        {
          step: 'Apply universal quantifier',
          explanation: (
            <MathRenderer math="\forall x (x > 0)" />
          ),
        },
      ],
      formula: '\\forall x \\, (x > 0)',
    },
  ],
}

export default function PredicatesQuantifiersPage() {
  return <DMTopicPage content={content} />
}
