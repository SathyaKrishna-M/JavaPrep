'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCpu, FiGrid, FiCode } from 'react-icons/fi'

const content = {
    title: 'Computer Representation of Sets',
    explanationSections: [
        {
            title: '💻 Bit String Representation',
            icon: <FiCpu className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Bit Strings</span> are an efficient way to represent finite sets in a computer.
      
Assume a universal set $U = \\{e_1, e_2, ..., e_n\\}$.
A subset $A \\subseteq U$ can be represented by a bit string of length $n$, where the $i$-th bit is 1 if $e_i \\in A$ and 0 otherwise.

<span class="text-lime-300 font-semibold">Example:</span>
Let $U = \\{1, 2, 3, 4, 5\\}$.
Subset $A = \\{1, 3, 5\\}$ corresponds to bit string **10101**.
Subset $B = \\{2, 3\\}$ corresponds to bit string **01100**.`,
        },
        {
            title: '⚙️ Set Operations with Bit Strings',
            icon: <FiCode className="w-6 h-6" />,
            content: `Set operations can be performed using bitwise logical operators:
      
• <span class="text-cyan-300">Union (A ∪ B):</span> Bitwise OR ($10101 \\lor 01100 = 11101$)
• <span class="text-cyan-300">Intersection (A ∩ B):</span> Bitwise AND ($10101 \\land 01100 = 00100$)
• <span class="text-cyan-300">Complement (A'):</span> Bitwise NOT ($\\neg 10101 = 01010$)
• <span class="text-cyan-300">Difference (A - B):</span> $A \\land (\\neg B)$`,
        },
    ],
    practiceQuestions: [
        {
            question: 'Let U = {a, b, c, d, e}. Find the bit string for A = {b, c, e}.',
            solution: 'Order of elements: a, b, c, d, e.\n\na: 0 (not in A)\nb: 1 (in A)\nc: 1 (in A)\nd: 0 (not in A)\ne: 1 (in A)\n\nBit string: 01101',
        },
        {
            question: 'Perform A ∪ B using bit strings if A = 1100 and B = 1010.',
            solution: '   1100 (A)\nOR 1010 (B)\n-------\n   1110 (A ∪ B)\n\nResult: 1110',
        },
    ],
    exampleProblems: [
        {
            problem: 'Given U = {1, 2, 3, 4, 5, 6, 7, 8}, A = {1, 3, 5, 7}, B = {2, 3, 4, 5}. Find A ∩ B using bit strings.',
            solution: 'Intersection is {3, 5}',
            steps: [
                {
                    step: 'Convert to Bit Strings',
                    explanation: 'A = 10101010 (odd numbers)\nB = 01111000 (2,3,4,5)',
                },
                {
                    step: 'Perform Bitwise AND',
                    explanation: '   10101010\nAND 01111000\n-----------\n   00101000',
                },
                {
                    step: 'Convert back to Set',
                    explanation: 'Positions 3 and 5 are 1.\nResult set = {3, 5}',
                },
            ],
        },
    ],
}

export default function ComputerRepresentationPage() {
    return <DMTopicPage content={content} />
}
