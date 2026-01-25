'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMinimize2, FiLayers, FiPercent, FiCpu, FiCheckSquare } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Hash Functions',
    explanationSections: [
        {
            title: '1️⃣ What makes a Good Hash Function?',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A hash function <code>h(k)</code> maps a large key to a small index. A good hash function should:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        <li><strong>Be fast to compute:</strong> <MathRenderer math="O(1)" />.</li>
                        <li><strong>Minimize collisions:</strong> Distribute keys uniformly across the table.</li>
                        <li><strong>Use all input data:</strong> Every bit of the key should affect the hash.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '2️⃣ Division Method',
            icon: <FiPercent className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The simplest method. Map a key <code>k</code> into one of <code>m</code> slots by taking the remainder of <code>k</code> divided by <code>m</code>.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-center">
                        <MathRenderer math="h(k) = k \mod m" />
                    </div>
                    <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30 text-sm text-yellow-200">
                        <strong>Tip:</strong> Choose <code>m</code> to be a <strong>prime number</strong> not close to a power of 2 to minimize collisions.
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Mid-Square Method',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ol className="list-decimal list-inside text-gray-300 space-y-2 text-sm">
                        <li>Square the key <code>k</code> (i.e., <MathRenderer math="k^2" />).</li>
                        <li>Extract the <strong>middle</strong> <MathRenderer math="r" /> digits as the hash value.</li>
                    </ol>
                    <p className="text-gray-300 text-sm mt-2">
                        Example: If <MathRenderer math="k = 123" />, then <MathRenderer math="k^2 = 15129" />. If we need 2 digits, mid is <code>51</code> or <code>12</code>.
                    </p>
                    <p className="text-sm text-gray-400">Good because middle digits depend on all digits of the original key.</p>
                </div>
            ),
        },
        {
            title: '4️⃣ Folding Method',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Divide the key into parts (partitions) and add them together to get the hash.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        <li><strong>Shift Folding:</strong> Simply add parts. <br />Example: 123456 <MathRenderer math="\rightarrow" /> 12 + 34 + 56 = 102.</li>
                        <li><strong>Boundary Folding:</strong> Reverse boundary parts before adding. <br />Example: 123456 <MathRenderer math="\rightarrow" /> 21 + 34 + 65 = 120.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '5️⃣ Multiplication Method',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Multiply key <code>k</code> by a constant <code>A</code> (where <MathRenderer math="0 < A < 1" />), extract fractional part, multiply by table size <code>m</code>.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-center">
                        <MathRenderer math="h(k) = \lfloor m (k A \mod 1) \rfloor" />
                    </div>
                    <p className="text-sm text-gray-400">Knuth suggests <MathRenderer math="A \approx (\sqrt{5}-1)/2 \approx 0.618033" />.</p>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "Which method is sensitive to the choice of table size 'm'?",
            solution: "Division Method. If 'm' is a power of 2, the hash only depends on the lower bits of 'k'. That's why primes are preferred.",
        },
        {
            question: "When is Folding Method useful?",
            solution: "When the key is very large (e.g., SSN, phone numbers) and we want to preserve information from all parts of the key.",
        },
        {
            question: "How to hash strings?",
            solution: "Polynomial rolling hash. h(s) = (s[0]*p^0 + s[1]*p^1 + ... ) mod m. This treats the string as a number in base p.",
        }
    ],
    exampleProblems: [],
}

export default function HashFunctionsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
