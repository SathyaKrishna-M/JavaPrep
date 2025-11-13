'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Inverse & Composite Functions',
  explanationSections: [
    {
      title: '🔄 Composite Functions',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">The composition</span> of functions f: A → B and g: B → C is denoted (g ∘ f): A → C.

<span class="text-amber-300 font-semibold">Definition:</span>
(g ∘ f)(x) = g(f(x))

<span class="text-lime-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Associative:</span> (h ∘ g) ∘ f = h ∘ (g ∘ f)
• <span class="text-cyan-300">Identity:</span> f ∘ I = I ∘ f = f, where I is the identity function
• <span class="text-cyan-300">Composition of bijections:</span> If f and g are bijective, then g ∘ f is bijective

<span class="text-pink-300 font-semibold">Note:</span>
For composition to be defined, the codomain of f must match the domain of g.`,
      formula: '(g \\circ f)(x) = g(f(x))',
    },
    {
      title: '↩️ Inverse Functions',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">The inverse</span> of a bijective function f: A → B is f⁻¹: B → A such that:

f⁻¹(f(a)) = a for all a ∈ A
f(f⁻¹(b)) = b for all b ∈ B

<span class="text-amber-300 font-semibold">Existence:</span>
A function has an inverse if and only if it is bijective (one-to-one and onto).

<span class="text-lime-300 font-semibold">Properties:</span>

• <span class="text-cyan-300">Uniqueness:</span> If an inverse exists, it is unique
• <span class="text-cyan-300">Inverse of inverse:</span> (f⁻¹)⁻¹ = f
• <span class="text-cyan-300">Inverse of composition:</span> (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹`,
      formula: 'f^{-1}(f(a)) = a, \\quad f(f^{-1}(b)) = b',
    },
    {
      title: '📐 Finding Inverses',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">Method to find inverse:</span>

For a function f: A → B:

1. Verify f is bijective
2. Set y = f(x)
3. Solve for x in terms of y
4. Replace y with x to get f⁻¹(x)

<span class="text-amber-300 font-semibold">Example:</span>
f(x) = 2x + 3

Step 1: f is bijective (linear function with non-zero slope)
Step 2: y = 2x + 3
Step 3: y - 3 = 2x, so x = (y - 3)/2
Step 4: f⁻¹(x) = (x - 3)/2

<span class="text-lime-300 font-semibold">Verification:</span>
f⁻¹(f(x)) = f⁻¹(2x + 3) = ((2x + 3) - 3)/2 = x ✓`,
      formula: 'f(x) = 2x + 3 \\Rightarrow f^{-1}(x) = \\frac{x - 3}{2}',
    },
    {
      title: '🔗 Composition with Inverses',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Key Relationships:</span>

• <span class="text-cyan-300">Identity:</span> f ∘ f⁻¹ = I_B and f⁻¹ ∘ f = I_A
• <span class="text-cyan-300">Inverse of composition:</span> (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹

<span class="text-amber-300 font-semibold">Note the order reversal:</span>
The inverse of g ∘ f is f⁻¹ ∘ g⁻¹ (not g⁻¹ ∘ f⁻¹)

<span class="text-lime-300 font-semibold">Example:</span>
If f(x) = x + 1 and g(x) = 2x, then:
(g ∘ f)(x) = g(f(x)) = g(x + 1) = 2(x + 1) = 2x + 2

(g ∘ f)⁻¹(x) = f⁻¹(g⁻¹(x)) = f⁻¹(x/2) = x/2 - 1

Verification: (g ∘ f)⁻¹((g ∘ f)(x)) = (g ∘ f)⁻¹(2x + 2) = (2x + 2)/2 - 1 = x ✓`,
    },
  ],
  practiceQuestions: [
    {
      question: 'If f(x) = 3x - 2 and g(x) = x², find (g ∘ f)(x) and (f ∘ g)(x).',
      solution: '(g ∘ f)(x) = g(f(x)) = g(3x - 2) = (3x - 2)² = 9x² - 12x + 4\n\n(f ∘ g)(x) = f(g(x)) = f(x²) = 3(x²) - 2 = 3x² - 2\n\nNote: (g ∘ f) ≠ (f ∘ g), so composition is not commutative.',
      formula: '(g \\circ f)(x) = 9x^2 - 12x + 4, \\quad (f \\circ g)(x) = 3x^2 - 2',
    },
    {
      question: 'Find the inverse of f(x) = (2x + 1)/(x - 3), where x ≠ 3.',
      solution: 'Step 1: Verify f is bijective (one-to-one and onto its range)\n\nStep 2: Set y = (2x + 1)/(x - 3)\n\nStep 3: Solve for x:\ny(x - 3) = 2x + 1\nyx - 3y = 2x + 1\nyx - 2x = 3y + 1\nx(y - 2) = 3y + 1\nx = (3y + 1)/(y - 2), where y ≠ 2\n\nStep 4: f⁻¹(x) = (3x + 1)/(x - 2), where x ≠ 2\n\nVerification:\nf⁻¹(f(x)) = f⁻¹((2x + 1)/(x - 3)) = (3(2x + 1)/(x - 3) + 1)/((2x + 1)/(x - 3) - 2)\nAfter simplification, this equals x. ✓',
      formula: 'f^{-1}(x) = \\frac{3x + 1}{x - 2}, \\quad x \\neq 2',
    },
    {
      question: 'If f: A → B and g: B → C are both bijective, prove that g ∘ f is bijective.',
      solution: 'We need to show g ∘ f is both one-to-one and onto.\n\nOne-to-one (Injective):\nAssume (g ∘ f)(a₁) = (g ∘ f)(a₂)\nThen g(f(a₁)) = g(f(a₂))\nSince g is one-to-one, f(a₁) = f(a₂)\nSince f is one-to-one, a₁ = a₂\nTherefore, g ∘ f is one-to-one. ✓\n\nOnto (Surjective):\nLet c ∈ C. Since g is onto, there exists b ∈ B such that g(b) = c.\nSince f is onto, there exists a ∈ A such that f(a) = b.\nTherefore, (g ∘ f)(a) = g(f(a)) = g(b) = c\nSo g ∘ f is onto. ✓\n\nSince g ∘ f is both one-to-one and onto, it is bijective.',
    },
    {
      question: 'If f(x) = x + 5 and g(x) = 2x, find (f ∘ g)⁻¹(x).',
      solution: 'Method 1: Find composition first, then inverse\n(f ∘ g)(x) = f(g(x)) = f(2x) = 2x + 5\n\nTo find inverse: y = 2x + 5, so x = (y - 5)/2\nTherefore, (f ∘ g)⁻¹(x) = (x - 5)/2\n\nMethod 2: Use (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹\nf⁻¹(x) = x - 5\ng⁻¹(x) = x/2\n\n(f ∘ g)⁻¹(x) = g⁻¹(f⁻¹(x)) = g⁻¹(x - 5) = (x - 5)/2\n\nBoth methods give the same result.',
      formula: '(f \\circ g)^{-1}(x) = \\frac{x - 5}{2}',
    },
    {
      question: 'Determine if f(x) = x² has an inverse on ℝ. If not, find a domain where it does.',
      solution: 'f(x) = x² is not one-to-one on ℝ because f(2) = f(-2) = 4.\nTherefore, f does not have an inverse on ℝ.\n\nHowever, if we restrict the domain to [0, ∞) (non-negative reals), then f is one-to-one and onto [0, ∞).\n\nOn this restricted domain:\nf⁻¹(x) = √x (the positive square root)\n\nVerification:\nf⁻¹(f(x)) = f⁻¹(x²) = √(x²) = x for x ≥ 0 ✓\nf(f⁻¹(x)) = f(√x) = (√x)² = x for x ≥ 0 ✓',
      functionGraph: {
        type: 'quadratic' as const,
        title: 'Graph of f(x) = x²',
      },
    },
  ],
  exampleProblems: [
    {
      problem: 'Given f(x) = 2x + 1 and g(x) = x² - 3, find (f ∘ g)(x) and (g ∘ f)(x).',
      solution: '(f ∘ g)(x) = 2x² - 5, (g ∘ f)(x) = 4x² + 4x - 2',
      steps: [
        {
          step: 'Find (f ∘ g)(x)',
          explanation: '(f ∘ g)(x) = f(g(x)) = f(x² - 3) = 2(x² - 3) + 1 = 2x² - 6 + 1 = 2x² - 5',
        },
        {
          step: 'Find (g ∘ f)(x)',
          explanation: '(g ∘ f)(x) = g(f(x)) = g(2x + 1) = (2x + 1)² - 3 = 4x² + 4x + 1 - 3 = 4x² + 4x - 2',
        },
        {
          step: 'Note',
          explanation: 'Composition is not commutative: (f ∘ g) ≠ (g ∘ f)',
        },
      ],
      formula: '(f \\circ g)(x) = 2x^2 - 5, \\quad (g \\circ f)(x) = 4x^2 + 4x - 2',
    },
    {
      problem: 'Find the inverse of f(x) = (x + 2)/(x - 1), where x ≠ 1.',
      solution: 'f⁻¹(x) = (x + 2)/(x - 1), where x ≠ 1',
      steps: [
        {
          step: 'Set y = f(x)',
          explanation: 'y = (x + 2)/(x - 1)',
        },
        {
          step: 'Solve for x',
          explanation: 'y(x - 1) = x + 2\nyx - y = x + 2\nyx - x = y + 2\nx(y - 1) = y + 2\nx = (y + 2)/(y - 1), where y ≠ 1',
        },
        {
          step: 'Replace y with x',
          explanation: 'f⁻¹(x) = (x + 2)/(x - 1), where x ≠ 1',
        },
        {
          step: 'Verify',
          explanation: 'f⁻¹(f(x)) = f⁻¹((x + 2)/(x - 1)) = x ✓',
        },
      ],
      formula: 'f^{-1}(x) = \\frac{x + 2}{x - 1}, \\quad x \\neq 1',
    },
  ],
}

export default function InverseAndCompositeFunctionsPage() {
  return <DMTopicPage content={content} />
}

