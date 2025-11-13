'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiCode } from 'react-icons/fi'

const content = {
  title: 'Functions & Types of Functions',
  explanationSections: [
    {
      title: '⚙️ Function Definition',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">A function</span> f: A → B is a relation where each element of A maps to exactly one element of B.

<span class="text-amber-300 font-semibold">Key Properties:</span>

• <span class="text-cyan-300">Domain:</span> Set A (all possible inputs)
• <span class="text-cyan-300">Codomain:</span> Set B (all possible outputs)
• <span class="text-cyan-300">Range:</span> {f(a) | a ∈ A} ⊆ B (actual outputs)
• <span class="text-cyan-300">Well-defined:</span> Each input has exactly one output

<span class="text-lime-300 font-semibold">Notation:</span>
f: A → B means "f is a function from A to B"
f(a) = b means "f maps a to b"`,
      formula: 'f: A \\rightarrow B, \\quad \\forall a \\in A, \\exists! b \\in B: f(a) = b',
    },
    {
      title: '🔍 Injective (One-to-One) Functions',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">A function is injective</span> (one-to-one) if different inputs map to different outputs.

<span class="text-amber-300 font-semibold">Definition:</span>
f: A → B is injective if f(a₁) = f(a₂) implies a₁ = a₂

<span class="text-amber-300 font-semibold">Alternative:</span>
If a₁ ≠ a₂, then f(a₁) ≠ f(a₂)

<span class="text-lime-300 font-semibold">Examples:</span>

• <span class="text-cyan-300">f(x) = x²:</span> Not injective (f(2) = f(-2) = 4)
• <span class="text-cyan-300">f(x) = 2x:</span> Injective (different x give different outputs)
• <span class="text-cyan-300">f(x) = x³:</span> Injective

<span class="text-pink-300 font-semibold">Horizontal Line Test:</span>
A function is injective if every horizontal line intersects the graph at most once.`,
      formula: '\\forall a_1, a_2 \\in A: f(a_1) = f(a_2) \\Rightarrow a_1 = a_2',
    },
    {
      title: '📤 Surjective (Onto) Functions',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">A function is surjective</span> (onto) if every element in the codomain has at least one preimage.

<span class="text-amber-300 font-semibold">Definition:</span>
f: A → B is surjective if for every b ∈ B, there exists a ∈ A such that f(a) = b

<span class="text-amber-300 font-semibold">Alternative:</span>
Range(f) = Codomain(f)

<span class="text-lime-300 font-semibold">Examples:</span>

• <span class="text-cyan-300">f: ℝ → ℝ, f(x) = x²:</span> Not surjective (negative numbers have no preimage)
• <span class="text-cyan-300">f: ℝ → [0,∞), f(x) = x²:</span> Surjective
• <span class="text-cyan-300">f: ℝ → ℝ, f(x) = 2x + 1:</span> Surjective

<span class="text-pink-300 font-semibold">Key Point:</span>
Surjectivity depends on the codomain!`,
      formula: '\\forall b \\in B, \\exists a \\in A: f(a) = b',
    },
    {
      title: '🎯 Bijective Functions',
      icon: <FiCode className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">A function is bijective</span> if it is both injective and surjective (one-to-one and onto).

<span class="text-amber-300 font-semibold">Properties:</span>
• Every element in domain maps to unique element in codomain
• Every element in codomain has exactly one preimage
• Function has an inverse

<span class="text-lime-300 font-semibold">Examples:</span>

• <span class="text-cyan-300">f: ℝ → ℝ, f(x) = 2x + 1:</span> Bijective
• <span class="text-cyan-300">f: ℝ → ℝ, f(x) = x³:</span> Bijective
• <span class="text-cyan-300">f: ℝ → ℝ, f(x) = x²:</span> Not bijective (not injective or surjective)

<span class="text-pink-300 font-semibold">Importance:</span>
Bijective functions establish a one-to-one correspondence between sets.`,
      formula: 'f \\text{ is bijective } \\Leftrightarrow f \\text{ is injective and surjective}',
    },
    {
      title: '📊 Many-One and Into Functions',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Many-One Function:</span>
A function that is NOT injective (multiple inputs map to same output)

<span class="text-amber-300 font-semibold">Example:</span>
f(x) = x² is many-one because f(2) = f(-2) = 4

<span class="text-cyan-400 font-semibold">Into Function:</span>
A function that is NOT surjective (range is proper subset of codomain)

<span class="text-amber-300 font-semibold">Example:</span>
f: ℝ → ℝ, f(x) = x² is into because range is [0,∞) ⊂ ℝ

<span class="text-lime-300 font-semibold">Summary:</span>
• <span class="text-cyan-300">One-One:</span> Injective
• <span class="text-cyan-300">Onto:</span> Surjective
• <span class="text-cyan-300">Many-One:</span> Not injective
• <span class="text-cyan-300">Into:</span> Not surjective`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Determine if f: ℝ → ℝ defined by f(x) = 3x - 2 is injective, surjective, or bijective.',
      solution: '<span class="text-cyan-300 font-semibold">Injective?</span>\nLet f(a) = f(b). Then:\n3a - 2 = 3b - 2\n3a = 3b\na = b\n\nTherefore, f is injective. ✓\n\n<span class="text-cyan-300 font-semibold">Surjective?</span>\nFor any b ∈ ℝ, we need to find a such that f(a) = b.\nf(a) = 3a - 2 = b\n3a = b + 2\na = (b + 2)/3\n\nSince (b + 2)/3 ∈ ℝ for any b ∈ ℝ, f is surjective. ✓\n\n<span class="text-cyan-300 font-semibold">Bijective?</span>\nSince f is both injective and surjective, f is bijective. ✓',
      formula: 'f(x) = 3x - 2 \\text{ is bijective}',
    },
    {
      question: 'Is f: ℤ → ℤ defined by f(n) = n² injective? Surjective?',
      solution: '<span class="text-cyan-300 font-semibold">Injective?</span>\nNo. f(2) = 4 and f(-2) = 4, so different inputs map to same output.\nTherefore, f is NOT injective. ✗\n\n<span class="text-cyan-300 font-semibold">Surjective?</span>\nNo. For example, there is no integer n such that f(n) = 3 (since n² = 3 has no integer solution).\nTherefore, f is NOT surjective. ✗',
    },
    {
      question: 'How many functions are there from a set with 3 elements to a set with 4 elements? How many are injective?',
      solution: '<span class="text-cyan-300 font-semibold">Total Functions:</span>\nFor each of 3 elements, choose 1 of 4 outputs: 4³ = 64 functions\n\n<span class="text-cyan-300 font-semibold">Injective Functions:</span>\nFor injective function, we need to assign 3 distinct outputs from 4 available.\nNumber of ways = P(4,3) = 4 × 3 × 2 = 24\n\nTherefore, there are 64 total functions and 24 injective functions.',
      formula: '|B|^{|A|} = 4^3 = 64, \\quad P(4,3) = 24',
    },
  ],
  exampleProblems: [
    {
      problem: 'Prove that f: ℝ → ℝ defined by f(x) = 2x + 3 is bijective.',
      solution: 'f is bijective (both injective and surjective)',
      steps: [
        {
          step: 'Prove injective',
          explanation: 'Assume f(a) = f(b). Then 2a + 3 = 2b + 3, so 2a = 2b, therefore a = b. ✓',
        },
        {
          step: 'Prove surjective',
          explanation: 'For any b ∈ ℝ, let a = (b - 3)/2. Then f(a) = 2((b-3)/2) + 3 = b. ✓',
        },
        {
          step: 'Conclusion',
          explanation: 'Since f is both injective and surjective, f is bijective.',
        },
      ],
      formula: 'f(x) = 2x + 3 \\text{ is bijective}',
    },
  ],
}

export default function FunctionsAndTypesPage() {
  return <DMTopicPage content={content} />
}

