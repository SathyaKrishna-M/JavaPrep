'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiHash, FiGrid, FiUsers, FiLayers } from 'react-icons/fi'

const content = {
    title: 'Counting Principles',
    explanationSections: [
        {
            title: '🔢 Basics of Counting',
            icon: <FiHash className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Fundamental Counting Principles</span> form the basis of combinatorics.
      
<span class="text-amber-300 font-semibold">Product Rule:</span>
If a task can be broken down into a sequence of <i>k</i> subtasks, where subtask <i>i</i> can be performed in <i>n<sub>i</sub></i> ways, then the total number of ways to perform the task is <i>n₁ &times; n₂ &times; ... &times; nₖ</i>.
<span class="text-gray-400 italic">Example:</span> 3 shirts and 4 pants = 3 &times; 4 = 12 outfits.

<span class="text-amber-300 font-semibold">Sum Rule:</span>
If a task can be done in either one of <i>n₁</i> ways or one of <i>n₂</i> ways, where none of the set of <i>n₁</i> ways is the same as any of the set of <i>n₂</i> ways, then there are <i>n₁ + n₂</i> ways to do the task.
<span class="text-gray-400 italic">Example:</span> Pick a project from 3 biology projects or 4 chemistry projects = 3 + 4 = 7 choices.`,
        },
        {
            title: '🕊️ Pigeonhole Principle',
            icon: <FiGrid className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">The Pigeonhole Principle</span> states that if <i>k+1</i> or more objects are placed into <i>k</i> boxes, then there is at least one box containing two or more objects.
      
<span class="text-amber-300 font-semibold">Generalized Pigeonhole Principle:</span>
If <i>N</i> objects are placed into <i>k</i> boxes, then there is at least one box containing at least &lceil;<i>N/k</i>&rceil; objects.

<span class="text-lime-300 font-semibold">Application:</span>
In a group of 367 people, there must be at least two people with the same birthday (since there are only 366 possible birthdays).`,
        },
        {
            title: '🔄 Permutations',
            icon: <FiLayers className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Permutations</span> refer to the arrangement of objects in a specific order.
      
<span class="text-amber-300 font-semibold">Formula:</span>
The number of permutations of <i>n</i> distinct objects taken <i>r</i> at a time is:
<i>P(n, r) = n! / (n-r)!</i>

<span class="text-lime-300 font-semibold">Key Points:</span>
• Order matters (ABC &ne; CBA)
• Repetition is not allowed (in standard permutations)
• <i>P(n, n) = n!</i> (arranging all <i>n</i> objects)`,
            formula: 'P(n, r) = \\frac{n!}{(n-r)!}',
        },
        {
            title: '👥 Combinations',
            icon: <FiUsers className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Combinations</span> refer to the selection of objects where order does not matter.
      
<span class="text-amber-300 font-semibold">Formula:</span>
The number of combinations of <i>n</i> distinct objects taken <i>r</i> at a time is:
<i>C(n, r) = n! / (r!(n-r)!)</i>

<span class="text-lime-300 font-semibold">Key Points:</span>
• Order does not matter (ABC = CBA)
• Useful for forming teams, committees, or hands of cards
• <i>C(n, r) = C(n, n-r)</i>`,
            formula: 'C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}',
        },
        {
            title: '⚖️ Permutations vs Combinations',
            icon: <FiLayers className="w-6 h-6" />,
            content: `
<div class="overflow-x-auto">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="uppercase tracking-wider border-b-2 border-slate-700">
      <tr>
        <th scope="col" class="px-6 py-4 text-cyan-400">Feature</th>
        <th scope="col" class="px-6 py-4 text-cyan-400">Permutations (Order Matters)</th>
        <th scope="col" class="px-6 py-4 text-cyan-400">Combinations (Order Doesn't Matter)</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Keywords</td>
        <td class="px-6 py-4 text-slate-300">Arrange, Order, Schedule, Rank</td>
        <td class="px-6 py-4 text-slate-300">Choose, Select, Group, Committee</td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Example</td>
        <td class="px-6 py-4 text-slate-300">Password, Race winners (1st, 2nd, 3rd)</td>
        <td class="px-6 py-4 text-slate-300">Lottery numbers, Team members</td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Formula</td>
        <td class="px-6 py-4 text-slate-300"><i>P(n, r) = n! / (n-r)!</i></td>
        <td class="px-6 py-4 text-slate-300"><i>C(n, r) = n! / (r!(n-r)!)</i></td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Relationship</td>
        <td class="px-6 py-4 text-slate-300"><i>P(n, r) = C(n, r) &times; r!</i></td>
        <td class="px-6 py-4 text-slate-300"><i>C(n, r) = P(n, r) / r!</i></td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
    ],
    practiceQuestions: [
        {
            question: 'How many different 5-letter passwords can be made from the English alphabet if repetition is allowed?',
            solution: 'We have 26 choices for each of the 5 positions.\nBy the Product Rule:\nTotal passwords = 26 × 26 × 26 × 26 × 26 = 26⁵ = 11,881,376.',
        },
        {
            question: 'In a class of 10 students, how many ways can we select a president, vice-president, and treasurer?',
            solution: 'Order matters here (President ≠ Treasurer).\nWe are selecting 3 students from 10.\nUsing Permutations:\nP(10, 3) = 10! / (10-3)! = 10! / 7! = 10 × 9 × 8 = 720 ways.',
            formula: 'P(10, 3) = 10 \\times 9 \\times 8 = 720',
        },
        {
            question: 'In a class of 10 students, how many ways can we select a committee of 3 students?',
            solution: 'Order does not matter here (Committee {A, B, C} is same as {C, B, A}).\nWe are selecting 3 students from 10.\nUsing Combinations:\nC(10, 3) = 10! / (3! × 7!) = (10 × 9 × 8) / (3 × 2 × 1) = 720 / 6 = 120 ways.',
            formula: 'C(10, 3) = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120',
        },
        {
            question: 'Show that among any group of 5 integers, there are two with the same remainder when divided by 4.',
            solution: 'Possible remainders when divided by 4 are {0, 1, 2, 3}.\nThere are k = 4 boxes (remainders).\nThere are N = 5 objects (integers).\nBy Pigeonhole Principle, at least one remainder must be shared by ⌈5/4⌉ = 2 integers.',
        },
    ],
    exampleProblems: [
        {
            problem: 'How many bit strings of length 8 contain exactly three 1s?',
            solution: 'We need to choose 3 positions out of 8 to place the 1s. The order of selection doesn\'t matter (all 1s are identical).',
            steps: [
                {
                    step: 'Identify the problem type',
                    explanation: 'Selection of positions without order -> Combinations.',
                },
                {
                    step: 'Apply formula',
                    explanation: 'C(8, 3) = 8! / (3! × 5!)',
                },
                {
                    step: 'Calculate',
                    explanation: '(8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56.',
                },
            ],
            formula: 'C(8, 3) = 56',
        },
    ],
}

export default function CountingPrinciplesPage() {
    return <DMTopicPage content={content} />
}
