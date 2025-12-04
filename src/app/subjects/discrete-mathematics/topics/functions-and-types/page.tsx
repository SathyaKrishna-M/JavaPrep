'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiCode } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Functions & Types of Functions',
  explanationSections: [
    {
      title: '⚙️ Function Definition',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">A function</span> <MathRenderer math="f: A \rightarrow B" /> is a relation where each element of <MathRenderer math="A" /> maps to exactly one element of <MathRenderer math="B" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Key Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Domain:</span> Set <MathRenderer math="A" /> (all possible inputs)</li>
              <li><span className="text-cyan-300">Codomain:</span> Set <MathRenderer math="B" /> (all possible outputs)</li>
              <li><span className="text-cyan-300">Range:</span> <MathRenderer math="\{f(a) \mid a \in A\} \subseteq B" /> (actual outputs)</li>
              <li><span className="text-cyan-300">Well-defined:</span> Each input has exactly one output</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Notation:</p>
            <p className="text-gray-300"><MathRenderer math="f: A \rightarrow B" /> means "f is a function from A to B"</p>
            <p className="text-gray-300"><MathRenderer math="f(a) = b" /> means "f maps a to b"</p>
          </div>
        </div>
      ),
      formula: 'f: A \\rightarrow B, \\quad \\forall a \\in A, \\exists! b \\in B: f(a) = b',
    },
    {
      title: '🔍 Injective (One-to-One) Functions',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">A function is injective</span> (one-to-one) if different inputs map to different outputs.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Definition:</p>
            <MathRenderer display math="f: A \rightarrow B \text{ is injective if } f(a_1) = f(a_2) \implies a_1 = a_2" />
            <p className="text-gray-300 mt-2"><span className="text-amber-300 font-semibold">Alternative:</span> If <MathRenderer math="a_1 \neq a_2" />, then <MathRenderer math="f(a_1) \neq f(a_2)" /></p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300"><MathRenderer math="f(x) = x^2" />:</span> Not injective (<MathRenderer math="f(2) = f(-2) = 4" />)</li>
              <li><span className="text-cyan-300"><MathRenderer math="f(x) = 2x" />:</span> Injective (different x give different outputs)</li>
              <li><span className="text-cyan-300"><MathRenderer math="f(x) = x^3" />:</span> Injective</li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Horizontal Line Test:</p>
            <p className="text-gray-300">A function is injective if every horizontal line intersects the graph at most once.</p>
          </div>
        </div>
      ),
      formula: '\\forall a_1, a_2 \\in A: f(a_1) = f(a_2) \\Rightarrow a_1 = a_2',
    },
    {
      title: '📤 Surjective (Onto) Functions',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">A function is surjective</span> (onto) if every element in the codomain has at least one preimage.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Definition:</p>
            <MathRenderer display math="f: A \rightarrow B \text{ is surjective if } \forall b \in B, \exists a \in A \text{ such that } f(a) = b" />
            <p className="text-gray-300 mt-2"><span className="text-amber-300 font-semibold">Alternative:</span> <MathRenderer math="\text{Range}(f) = \text{Codomain}(f)" /></p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300"><MathRenderer math="f: \mathbb{R} \rightarrow \mathbb{R}, f(x) = x^2" />:</span> Not surjective (negative numbers have no preimage)</li>
              <li><span className="text-cyan-300"><MathRenderer math="f: \mathbb{R} \rightarrow [0,\infty), f(x) = x^2" />:</span> Surjective</li>
              <li><span className="text-cyan-300"><MathRenderer math="f: \mathbb{R} \rightarrow \mathbb{R}, f(x) = 2x + 1" />:</span> Surjective</li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Key Point:</p>
            <p className="text-gray-300">Surjectivity depends on the codomain!</p>
          </div>
        </div>
      ),
      formula: '\\forall b \\in B, \\exists a \\in A: f(a) = b',
    },
    {
      title: '🎯 Bijective Functions',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">A function is bijective</span> if it is both injective and surjective (one-to-one and onto).
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Every element in domain maps to unique element in codomain</li>
              <li>Every element in codomain has exactly one preimage</li>
              <li>Function has an inverse</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Examples:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300"><MathRenderer math="f: \mathbb{R} \rightarrow \mathbb{R}, f(x) = 2x + 1" />:</span> Bijective</li>
              <li><span className="text-cyan-300"><MathRenderer math="f: \mathbb{R} \rightarrow \mathbb{R}, f(x) = x^3" />:</span> Bijective</li>
              <li><span className="text-cyan-300"><MathRenderer math="f: \mathbb{R} \rightarrow \mathbb{R}, f(x) = x^2" />:</span> Not bijective (not injective or surjective)</li>
            </ul>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Importance:</p>
            <p className="text-gray-300">Bijective functions establish a one-to-one correspondence between sets.</p>
          </div>
        </div>
      ),
      formula: 'f \\text{ is bijective } \\Leftrightarrow f \\text{ is injective and surjective}',
    },
    {
      title: '📊 Many-One and Into Functions',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-400 font-semibold">Many-One Function:</p>
            <p className="text-gray-300">A function that is NOT injective (multiple inputs map to same output)</p>
            <p className="text-amber-300 font-semibold mt-2">Example:</p>
            <p className="text-gray-300"><MathRenderer math="f(x) = x^2" /> is many-one because <MathRenderer math="f(2) = f(-2) = 4" /></p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-400 font-semibold">Into Function:</p>
            <p className="text-gray-300">A function that is NOT surjective (range is proper subset of codomain)</p>
            <p className="text-amber-300 font-semibold mt-2">Example:</p>
            <p className="text-gray-300"><MathRenderer math="f: \mathbb{R} \rightarrow \mathbb{R}, f(x) = x^2" /> is into because range is <MathRenderer math="[0,\infty) \subset \mathbb{R}" /></p>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-lime-300 font-semibold mb-2">Summary:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-300">One-One:</span> Injective</li>
              <li><span className="text-cyan-300">Onto:</span> Surjective</li>
              <li><span className="text-cyan-300">Many-One:</span> Not injective</li>
              <li><span className="text-cyan-300">Into:</span> Not surjective</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          Determine if <MathRenderer math="f: \mathbb{R} \rightarrow \mathbb{R}" /> defined by <MathRenderer math="f(x) = 3x - 2" /> is injective, surjective, or bijective.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Injective?</p>
            <p className="text-gray-300">Let <MathRenderer math="f(a) = f(b)" />. Then:</p>
            <MathRenderer display math="3a - 2 = 3b - 2 \implies 3a = 3b \implies a = b" />
            <p className="text-green-400">Therefore, f is injective. ✓</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">Surjective?</p>
            <p className="text-gray-300">For any <MathRenderer math="b \in \mathbb{R}" />, we need to find <MathRenderer math="a" /> such that <MathRenderer math="f(a) = b" />.</p>
            <MathRenderer display math="f(a) = 3a - 2 = b \implies 3a = b + 2 \implies a = \frac{b + 2}{3}" />
            <p className="text-gray-300">Since <MathRenderer math="(b + 2)/3 \in \mathbb{R}" /> for any <MathRenderer math="b \in \mathbb{R}" />, f is surjective. ✓</p>
          </div>
          <p className="text-green-400 font-semibold">Bijective? Since f is both injective and surjective, f is bijective. ✓</p>
        </div>
      ),
      formula: 'f(x) = 3x - 2 \\text{ is bijective}',
    },
    {
      question: (
        <span>
          Is <MathRenderer math="f: \mathbb{Z} \rightarrow \mathbb{Z}" /> defined by <MathRenderer math="f(n) = n^2" /> injective? Surjective?
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Injective?</p>
            <p className="text-red-400">No. <MathRenderer math="f(2) = 4" /> and <MathRenderer math="f(-2) = 4" />, so different inputs map to same output.</p>
            <p className="text-gray-300">Therefore, f is NOT injective. ✗</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">Surjective?</p>
            <p className="text-red-400">No. For example, there is no integer <MathRenderer math="n" /> such that <MathRenderer math="f(n) = 3" /> (since <MathRenderer math="n^2 = 3" /> has no integer solution).</p>
            <p className="text-gray-300">Therefore, f is NOT surjective. ✗</p>
          </div>
        </div>
      ),
    },
    {
      question: 'How many functions are there from a set with 3 elements to a set with 4 elements? How many are injective?',
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold">Total Functions:</p>
            <p className="text-gray-300">For each of 3 elements, choose 1 of 4 outputs: <MathRenderer math="4^3 = 64" /> functions</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-300 font-semibold">Injective Functions:</p>
            <p className="text-gray-300">For injective function, we need to assign 3 distinct outputs from 4 available.</p>
            <p className="text-gray-300">Number of ways = <MathRenderer math="P(4,3) = 4 \times 3 \times 2 = 24" /></p>
          </div>
          <p className="text-green-400 font-semibold">Therefore, there are 64 total functions and 24 injective functions.</p>
        </div>
      ),
      formula: '|B|^{|A|} = 4^3 = 64, \\quad P(4,3) = 24',
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Prove that <MathRenderer math="f: \mathbb{R} \rightarrow \mathbb{R}" /> defined by <MathRenderer math="f(x) = 2x + 3" /> is bijective.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-green-400 font-semibold">f is bijective (both injective and surjective)</p>
        </div>
      ),
      steps: [
        {
          step: 'Prove injective',
          explanation: (
            <span>
              Assume <MathRenderer math="f(a) = f(b)" />. Then <MathRenderer math="2a + 3 = 2b + 3" />, so <MathRenderer math="2a = 2b" />, therefore <MathRenderer math="a = b" />. ✓
            </span>
          ),
        },
        {
          step: 'Prove surjective',
          explanation: (
            <span>
              For any <MathRenderer math="b \in \mathbb{R}" />, let <MathRenderer math="a = (b - 3)/2" />. Then <MathRenderer math="f(a) = 2((b-3)/2) + 3 = b" />. ✓
            </span>
          ),
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
