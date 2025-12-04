'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCpu, FiGrid, FiCode } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'Computer Representation of Sets',
    explanationSections: [
        {
            title: '💻 Bit String Representation',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <span className="text-cyan-400 font-semibold text-lg">Bit Strings</span> are an efficient way to represent finite sets in a computer.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-gray-300">
                            Assume a universal set <MathRenderer math="U = \{e_1, e_2, ..., e_n\}" />.
                        </p>
                        <p className="text-gray-300">
                            A subset <MathRenderer math="A \subseteq U" /> can be represented by a bit string of length <MathRenderer math="n" />, where the <MathRenderer math="i" />-th bit is 1 if <MathRenderer math="e_i \in A" /> and 0 otherwise.
                        </p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <p className="text-lime-300 font-semibold mb-2">Example:</p>
                        <p className="text-gray-300">Let <MathRenderer math="U = \{1, 2, 3, 4, 5\}" />.</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Subset <MathRenderer math="A = \{1, 3, 5\}" /> corresponds to bit string <span className="font-mono text-cyan-300">10101</span>.</li>
                            <li>Subset <MathRenderer math="B = \{2, 3\}" /> corresponds to bit string <span className="font-mono text-cyan-300">01100</span>.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '⚙️ Set Operations with Bit Strings',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">Set operations can be performed using bitwise logical operators:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>
                                <span className="text-cyan-300">Union (<MathRenderer math="A \cup B" />):</span> Bitwise OR (<MathRenderer math="10101 \lor 01100 = 11101" />)
                            </li>
                            <li>
                                <span className="text-cyan-300">Intersection (<MathRenderer math="A \cap B" />):</span> Bitwise AND (<MathRenderer math="10101 \land 01100 = 00100" />)
                            </li>
                            <li>
                                <span className="text-cyan-300">Complement (<MathRenderer math="A'" />):</span> Bitwise NOT (<MathRenderer math="\neg 10101 = 01010" />)
                            </li>
                            <li>
                                <span className="text-cyan-300">Difference (<MathRenderer math="A - B" />):</span> <MathRenderer math="A \land (\neg B)" />
                            </li>
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
                    Let <MathRenderer math="U = \{a, b, c, d, e\}" />. Find the bit string for <MathRenderer math="A = \{b, c, e\}" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">Order of elements: a, b, c, d, e.</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <ul className="list-none text-gray-300 space-y-1">
                            <li>a: 0 (not in A)</li>
                            <li>b: 1 (in A)</li>
                            <li>c: 1 (in A)</li>
                            <li>d: 0 (not in A)</li>
                            <li>e: 1 (in A)</li>
                        </ul>
                    </div>
                    <p className="text-green-400 font-semibold">Bit string: 01101</p>
                </div>
            ),
        },
        {
            question: (
                <span>
                    Perform <MathRenderer math="A \cup B" /> using bit strings if <MathRenderer math="A = 1100" /> and <MathRenderer math="B = 1010" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 font-mono">
                        <p className="text-gray-300">&nbsp;&nbsp;1100 (A)</p>
                        <p className="text-gray-300">OR 1010 (B)</p>
                        <p className="text-gray-500">-------</p>
                        <p className="text-green-400">&nbsp;&nbsp;1110 (A ∪ B)</p>
                    </div>
                    <p className="text-green-400 font-semibold">Result: 1110</p>
                </div>
            ),
        },
    ],
    exampleProblems: [
        {
            problem: 'Given U = {1, 2, 3, 4, 5, 6, 7, 8}, A = {1, 3, 5, 7}, B = {2, 3, 4, 5}. Find A ∩ B using bit strings.',
            solution: (
                <div className="space-y-4">
                    <p className="text-green-400 font-semibold">Intersection is <MathRenderer math="\{3, 5\}" /></p>
                </div>
            ),
            steps: [
                {
                    step: 'Convert to Bit Strings',
                    explanation: (
                        <div className="space-y-2">
                            <p><MathRenderer math="A = 10101010" /> (odd numbers)</p>
                            <p><MathRenderer math="B = 01111000" /> (2,3,4,5)</p>
                        </div>
                    ),
                },
                {
                    step: 'Perform Bitwise AND',
                    explanation: (
                        <div className="font-mono bg-black/30 p-2 rounded">
                            <p>&nbsp;&nbsp;10101010</p>
                            <p>AND 01111000</p>
                            <p>-----------</p>
                            <p>&nbsp;&nbsp;00101000</p>
                        </div>
                    ),
                },
                {
                    step: 'Convert back to Set',
                    explanation: (
                        <span>
                            Positions 3 and 5 are 1.
                            <br />
                            Result set = <MathRenderer math="\{3, 5\}" />
                        </span>
                    ),
                },
            ],
        },
    ],
}

export default function ComputerRepresentationPage() {
    return <DMTopicPage content={content} />
}
