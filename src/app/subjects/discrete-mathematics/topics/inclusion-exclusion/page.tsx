'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiPlus, FiMinus, FiUsers } from 'react-icons/fi'

const content = {
  title: 'Inclusion-Exclusion Principle',
  explanationSections: [
    {
      title: '➕ Introduction',
      icon: <FiPlus className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">The Inclusion-Exclusion Principle</span> is a counting technique which generalizes the familiar method of obtaining the number of elements in the union of two finite sets.
      
For two sets A and B:
|A ∪ B| = |A| + |B| - |A ∩ B|

<span class="text-amber-300 font-semibold">Why subtract?</span>
When we sum |A| and |B|, we count the elements in the intersection |A ∩ B| twice. Subtracting it once corrects this overcounting.`,
      formula: '|A \\cup B| = |A| + |B| - |A \\cap B|',
    },
    {
      title: '🔢 Three Sets',
      icon: <FiUsers className="w-6 h-6" />,
      content: `For three sets A, B, and C, the principle extends as follows:
      
|A ∪ B ∪ C| = |A| + |B| + |C|
- (|A ∩ B| + |A ∩ C| + |B ∩ C|)
+ |A ∩ B ∩ C|

<span class="text-lime-300 font-semibold">General Rule:</span>
1. Include (add) cardinalities of single sets.
2. Exclude (subtract) cardinalities of pairwise intersections.
3. Include (add) cardinalities of triple intersections.
4. Continue alternating signs...`,
      formula: '|A \\cup B \\cup C| = \\sum |A_i| - \\sum |A_i \\cap A_j| + |A \\cap B \\cap C|',
    },
  ],
  practiceQuestions: [
    {
      question: 'In a class of 50 students, 30 take Math, 25 take Physics, and 10 take both. How many take at least one?',
      solution: 'Using Inclusion-Exclusion:\n|M ∪ P| = |M| + |P| - |M ∩ P|\n|M ∪ P| = 30 + 25 - 10\n|M ∪ P| = 45\n\nSo, 45 students take at least one subject.',
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
      problem: 'Find the number of positive integers ≤ 100 divisible by 2, 3, or 5.',
      solution: 'Total = 74',
      steps: [
        {
          step: 'Define Sets',
          explanation: 'Let A, B, C be sets of numbers divisible by 2, 3, 5 respectively.\n|A| = ⌊100/2⌋ = 50\n|B| = ⌊100/3⌋ = 33\n|C| = ⌊100/5⌋ = 20',
        },
        {
          step: 'Pairwise Intersections',
          explanation: '|A ∩ B| (div by 6) = ⌊100/6⌋ = 16\n|A ∩ C| (div by 10) = ⌊100/10⌋ = 10\n|B ∩ C| (div by 15) = ⌊100/15⌋ = 6',
        },
        {
          step: 'Triple Intersection',
          explanation: '|A ∩ B ∩ C| (div by 30) = ⌊100/30⌋ = 3',
        },
        {
          step: 'Apply Formula',
          explanation: '50 + 33 + 20 - (16 + 10 + 6) + 3\n= 103 - 32 + 3\n= 74',
        },
      ],
    },
  ],
}

export default function InclusionExclusionPage() {
  return <DMTopicPage content={content} />
}
