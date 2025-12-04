'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiPlus, FiMinus, FiUsers } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Inclusion-Exclusion Principle',
  explanationSections: [
    {
      title: '➕ Introduction',
      icon: <FiPlus className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">The Inclusion-Exclusion Principle</span> is a counting technique which generalizes the familiar method of obtaining the number of elements in the union of two finite sets.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300">For two sets A and B:</p>
            <MathRenderer display math="|A \cup B| = |A| + |B| - |A \cap B|" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Why subtract?</p>
            <p className="text-gray-300">
              When we sum <MathRenderer math="|A|" /> and <MathRenderer math="|B|" />, we count the elements in the intersection <MathRenderer math="|A \cap B|" /> twice. Subtracting it once corrects this overcounting.
            </p>
          </div>
        </div>
      ),
      formula: '|A \\cup B| = |A| + |B| - |A \\cap B|',
    },
    {
      title: '🔢 Three Sets',
      icon: <FiUsers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">For three sets A, B, and C, the principle extends as follows:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <MathRenderer display math="|A \cup B \cup C| = |A| + |B| + |C| - (|A \cap B| + |A \cap C| + |B \cap C|) + |A \cap B \cap C|" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">General Rule:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Include (add) cardinalities of single sets.</li>
              <li>Exclude (subtract) cardinalities of pairwise intersections.</li>
              <li>Include (add) cardinalities of triple intersections.</li>
              <li>Continue alternating signs...</li>
            </ol>
          </div>
        </div>
      ),
      formula: '|A \\cup B \\cup C| = \\sum |A_i| - \\sum |A_i \\cap A_j| + |A \\cap B \\cap C|',
    },
  ],
  practiceQuestions: [
    {
      question: 'In a class of 50 students, 30 take Math, 25 take Physics, and 10 take both. How many take at least one?',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Using Inclusion-Exclusion:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <MathRenderer display math="|M \cup P| = |M| + |P| - |M \cap P|" />
            <MathRenderer display math="|M \cup P| = 30 + 25 - 10" />
            <MathRenderer display math="|M \cup P| = 45" />
          </div>
          <p className="text-green-400 font-semibold">So, 45 students take at least one subject.</p>
        </div>
      ),
      vennDiagram: {
        sets: [
          { label: 'Math', color: '#3b82f6' },
          { label: 'Physics', color: '#10b981' },
        ],
        regions: [
          { label: '20', sets: ['Math'] },
          { label: '10', sets: ['Math', 'Physics'] },
          { label: '15', sets: ['Physics'] },
        ],
      },
    },
  ],
  exampleProblems: [
    {
      problem: (
        <span>
          Find the number of positive integers <MathRenderer math="\le 100" /> divisible by 2, 3, or 5.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-green-400 font-semibold">Total = 74</p>
        </div>
      ),
      steps: [
        {
          step: 'Define Sets',
          explanation: (
            <div className="space-y-2">
              <p>Let A, B, C be sets of numbers divisible by 2, 3, 5 respectively.</p>
              <p><MathRenderer math="|A| = \lfloor 100/2 \rfloor = 50" /></p>
              <p><MathRenderer math="|B| = \lfloor 100/3 \rfloor = 33" /></p>
              <p><MathRenderer math="|C| = \lfloor 100/5 \rfloor = 20" /></p>
            </div>
          ),
        },
        {
          step: 'Pairwise Intersections',
          explanation: (
            <div className="space-y-2">
              <p><MathRenderer math="|A \cap B|" /> (div by 6) <MathRenderer math="= \lfloor 100/6 \rfloor = 16" /></p>
              <p><MathRenderer math="|A \cap C|" /> (div by 10) <MathRenderer math="= \lfloor 100/10 \rfloor = 10" /></p>
              <p><MathRenderer math="|B \cap C|" /> (div by 15) <MathRenderer math="= \lfloor 100/15 \rfloor = 6" /></p>
            </div>
          ),
        },
        {
          step: 'Triple Intersection',
          explanation: (
            <p><MathRenderer math="|A \cap B \cap C|" /> (div by 30) <MathRenderer math="= \lfloor 100/30 \rfloor = 3" /></p>
          ),
        },
        {
          step: 'Apply Formula',
          explanation: (
            <div className="space-y-2">
              <MathRenderer display math="50 + 33 + 20 - (16 + 10 + 6) + 3" />
              <MathRenderer display math="= 103 - 32 + 3" />
              <MathRenderer display math="= 74" />
            </div>
          ),
        },
      ],
    },
  ],
}

export default function InclusionExclusionPage() {
  return <DMTopicPage content={content} />
}
