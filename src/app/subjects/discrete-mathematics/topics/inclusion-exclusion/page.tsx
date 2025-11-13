'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget } from 'react-icons/fi'

const content = {
  title: 'Inclusion–Exclusion Principle',
  explanationSections: [
    {
      title: '📊 Two-Set Inclusion-Exclusion',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">The Inclusion-Exclusion Principle</span> is a counting technique that helps find the number of elements in the union of sets by accounting for overlaps.

<span class="text-amber-300 font-semibold">For Two Sets:</span>

The principle states that to count elements in A ∪ B, we:
1. Add elements in A
2. Add elements in B
3. Subtract elements counted twice (in A ∩ B)

<span class="text-lime-300 font-semibold">Formula:</span>
|A ∪ B| = |A| + |B| - |A ∩ B|

<span class="text-pink-300 font-semibold">Why Subtract?</span>
Elements in A ∩ B are counted in both |A| and |B|, so we subtract |A ∩ B| to avoid double-counting.`,
      formula: '|A \\cup B| = |A| + |B| - |A \\cap B|',
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
        ],
        regions: [
          { label: 'A only', sets: ['A'] },
          { label: 'A ∩ B', sets: ['A', 'B'] },
          { label: 'B only', sets: ['B'] },
        ],
      },
    },
    {
      title: '🔢 Three-Set Inclusion-Exclusion',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">For Three Sets:</span>

The principle extends to three sets A, B, and C:

|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|

<span class="text-amber-300 font-semibold">Explanation:</span>

1. Add |A| + |B| + |C| (count all elements)
2. Subtract |A ∩ B| + |A ∩ C| + |B ∩ C| (remove double-counted pairs)
3. Add |A ∩ B ∩ C| (add back triple-counted elements)

<span class="text-lime-300 font-semibold">Pattern:</span>
Alternate between adding and subtracting intersections of increasing sizes.`,
      formula: '|A \\cup B \\cup C| = |A| + |B| + |C| - |A \\cap B| - |A \\cap C| - |B \\cap C| + |A \\cap B \\cap C|',
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
          { label: 'C', color: '#f59e0b' },
        ],
      },
    },
    {
      title: '📐 General Inclusion-Exclusion',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold">For n Sets:</span>

The general formula for sets A₁, A₂, ..., Aₙ:

|A₁ ∪ A₂ ∪ ... ∪ Aₙ| = Σ|Aᵢ| - Σ|Aᵢ ∩ Aⱼ| + Σ|Aᵢ ∩ Aⱼ ∩ Aₖ| - ... + (-1)ⁿ⁺¹|A₁ ∩ A₂ ∩ ... ∩ Aₙ|

<span class="text-amber-300 font-semibold">Pattern:</span>

• Sum of single sets (add)
• Sum of pairs (subtract)
• Sum of triples (add)
• Sum of quadruples (subtract)
• Continue alternating...

<span class="text-lime-300 font-semibold">Applications:</span>

• Counting problems with overlapping conditions
• Probability calculations
• Combinatorics problems
• Survey analysis`,
      formula: '|\\bigcup_{i=1}^{n} A_i| = \\sum_{i} |A_i| - \\sum_{i<j} |A_i \\cap A_j| + \\sum_{i<j<k} |A_i \\cap A_j \\cap A_k| - \\cdots',
    },
    {
      title: '💡 Complementary Counting',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">Complementary Principle:</span>

Sometimes it's easier to count what we don't want, then subtract from the total.

|A| = |U| - |A'|

where A' is the complement of A in the universal set U.

<span class="text-amber-300 font-semibold">Example:</span>
If we want to count numbers from 1 to 100 that are divisible by 2 or 3, we can:
1. Count numbers divisible by 2
2. Count numbers divisible by 3
3. Subtract numbers divisible by both (6)
4. Use inclusion-exclusion: |A ∪ B| = |A| + |B| - |A ∩ B|`,
    },
  ],
  practiceQuestions: [
    {
      question: 'In a class of 50 students, 30 study Math, 25 study Physics, and 15 study both. How many study at least one subject?',
      solution: 'Using inclusion-exclusion principle:\n\n|M ∪ P| = |M| + |P| - |M ∩ P|\n|M ∪ P| = 30 + 25 - 15 = 40\n\nTherefore, 40 students study at least one subject (Math or Physics or both).',
      formula: '|M \\cup P| = |M| + |P| - |M \\cap P| = 30 + 25 - 15 = 40',
    },
    {
      question: 'Out of 100 people, 60 like coffee, 50 like tea, and 30 like both. How many like neither?',
      solution: 'First, find how many like at least one:\n|C ∪ T| = |C| + |T| - |C ∩ T|\n|C ∪ T| = 60 + 50 - 30 = 80\n\nPeople who like neither = Total - People who like at least one\n= 100 - 80 = 20\n\nTherefore, 20 people like neither coffee nor tea.',
      vennDiagram: {
        sets: [
          { label: 'Coffee', color: '#3b82f6' },
          { label: 'Tea', color: '#10b981' },
        ],
        regions: [
          { label: '30', sets: ['Coffee', 'Tea'] },
          { label: '30', sets: ['Coffee'] },
          { label: '20', sets: ['Tea'] },
        ],
      },
    },
    {
      question: 'In a survey of 200 students: 120 play football, 90 play basketball, 70 play cricket, 50 play football and basketball, 40 play football and cricket, 30 play basketball and cricket, and 20 play all three. How many play at least one sport?',
      solution: 'Using three-set inclusion-exclusion:\n\n|F ∪ B ∪ C| = |F| + |B| + |C| - |F ∩ B| - |F ∩ C| - |B ∩ C| + |F ∩ B ∩ C|\n\n|F ∪ B ∪ C| = 120 + 90 + 70 - 50 - 40 - 30 + 20\n|F ∪ B ∪ C| = 280 - 120 + 20 = 180\n\nTherefore, 180 students play at least one sport.',
      formula: '|F \\cup B \\cup C| = 120 + 90 + 70 - 50 - 40 - 30 + 20 = 180',
    },
    {
      question: 'How many integers from 1 to 100 are divisible by 2, 3, or 5?',
      solution: 'Let A = numbers divisible by 2\nB = numbers divisible by 3\nC = numbers divisible by 5\n\n|A| = ⌊100/2⌋ = 50\n|B| = ⌊100/3⌋ = 33\n|C| = ⌊100/5⌋ = 20\n\n|A ∩ B| = ⌊100/6⌋ = 16 (divisible by 2 and 3 = divisible by 6)\n|A ∩ C| = ⌊100/10⌋ = 10 (divisible by 2 and 5 = divisible by 10)\n|B ∩ C| = ⌊100/15⌋ = 6 (divisible by 3 and 5 = divisible by 15)\n\n|A ∩ B ∩ C| = ⌊100/30⌋ = 3 (divisible by 2, 3, and 5 = divisible by 30)\n\n|A ∪ B ∪ C| = 50 + 33 + 20 - 16 - 10 - 6 + 3 = 74\n\nTherefore, 74 integers from 1 to 100 are divisible by 2, 3, or 5.',
    },
    {
      question: 'In a group of 80 people, 45 speak English, 35 speak French, and 25 speak Spanish. If 15 speak English and French, 10 speak English and Spanish, 8 speak French and Spanish, and 5 speak all three, how many speak at least one language?',
      solution: 'Using three-set inclusion-exclusion:\n\n|E ∪ F ∪ S| = |E| + |F| + |S| - |E ∩ F| - |E ∩ S| - |F ∩ S| + |E ∩ F ∩ S|\n\n|E ∪ F ∪ S| = 45 + 35 + 25 - 15 - 10 - 8 + 5\n|E ∪ F ∪ S| = 105 - 33 + 5 = 77\n\nTherefore, 77 people speak at least one language.',
      formula: '|E \\cup F \\cup S| = 45 + 35 + 25 - 15 - 10 - 8 + 5 = 77',
    },
    {
      question: 'A class has 60 students. 40 passed Math, 35 passed Science, and 30 passed English. If 20 passed both Math and Science, 15 passed both Math and English, 12 passed both Science and English, and 10 passed all three, how many passed at least one subject?',
      solution: 'Using inclusion-exclusion:\n\n|M ∪ S ∪ E| = |M| + |S| + |E| - |M ∩ S| - |M ∩ E| - |S ∩ E| + |M ∩ S ∩ E|\n\n|M ∪ S ∪ E| = 40 + 35 + 30 - 20 - 15 - 12 + 10\n|M ∪ S ∪ E| = 105 - 47 + 10 = 68\n\nTherefore, 68 students passed at least one subject.',
    },
  ],
  exampleProblems: [
    {
      problem: 'In a school of 200 students, 80 take Math, 70 take Physics, and 50 take Chemistry. If 30 take Math and Physics, 25 take Math and Chemistry, 20 take Physics and Chemistry, and 15 take all three, find how many take at least one subject.',
      solution: '68 students take at least one subject',
      steps: [
        {
          step: 'Identify sets and their sizes',
          explanation: 'M = Math students (80), P = Physics students (70), C = Chemistry students (50)',
        },
        {
          step: 'Identify intersections',
          explanation: 'M ∩ P = 30, M ∩ C = 25, P ∩ C = 20, M ∩ P ∩ C = 15',
        },
        {
          step: 'Apply inclusion-exclusion formula',
          explanation: '|M ∪ P ∪ C| = 80 + 70 + 50 - 30 - 25 - 20 + 15 = 140',
        },
        {
          step: 'Calculate result',
          explanation: '|M ∪ P ∪ C| = 140 students take at least one subject',
        },
      ],
      formula: '|M \\cup P \\cup C| = 80 + 70 + 50 - 30 - 25 - 20 + 15 = 140',
    },
    {
      problem: 'How many positive integers from 1 to 1000 are divisible by 3, 5, or 7?',
      solution: '543 integers are divisible by 3, 5, or 7',
      steps: [
        {
          step: 'Count divisible by each number',
          explanation: '|A| = ⌊1000/3⌋ = 333, |B| = ⌊1000/5⌋ = 200, |C| = ⌊1000/7⌋ = 142',
        },
        {
          step: 'Count divisible by pairs',
          explanation: '|A ∩ B| = ⌊1000/15⌋ = 66, |A ∩ C| = ⌊1000/21⌋ = 47, |B ∩ C| = ⌊1000/35⌋ = 28',
        },
        {
          step: 'Count divisible by all three',
          explanation: '|A ∩ B ∩ C| = ⌊1000/105⌋ = 9',
        },
        {
          step: 'Apply inclusion-exclusion',
          explanation: '|A ∪ B ∪ C| = 333 + 200 + 142 - 66 - 47 - 28 + 9 = 543',
        },
      ],
      formula: '|A \\cup B \\cup C| = 333 + 200 + 142 - 66 - 47 - 28 + 9 = 543',
    },
  ],
}

export default function InclusionExclusionPage() {
  return <DMTopicPage content={content} />
}

