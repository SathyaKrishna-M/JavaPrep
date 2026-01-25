'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiRefreshCw, FiDatabase, FiMaximize2, FiCheckSquare } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'
import CodeBlock from '@/components/CodeBlock'

const content = {
    title: 'Rehashing & Extendible Hashing',
    explanationSections: [
        {
            title: '1️⃣ The Need for Dynamic Hashing',
            icon: <FiDatabase className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        In Static Hashing, as the table fills up, collisions increase, and performance drops (<MathRenderer math="\alpha \rightarrow 1" />).
                        We need strategies to handle growing datasets dynamically.
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ Rehashing',
            icon: <FiRefreshCw className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <strong>Rehashing</strong> is the process of increasing the size of the hash table (usually doubling it) and re-inserting all existing items into the new table.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Trigger:</strong> When Load Factor <MathRenderer math="\alpha" /> exceeds a threshold (e.g., 0.75).</li>
                            <li><strong>New Size:</strong> Typically <MathRenderer math="2 \times \text{Current Size}" /> (often next prime).</li>
                            <li><strong>Cost:</strong> <MathRenderer math="O(n)" /> (Expensive, but amortized cost is <MathRenderer math="O(1)" />).</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Extendible Hashing',
            icon: <FiMaximize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A dynamic hashing technique designed for disk-based databases. It avoids rehashing the entire table by using a <strong>Directory</strong> and splitting only the overflowing buckets.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold mb-2">Key Concepts:</p>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                            <li><strong>Directory:</strong> An array of pointers to data buckets. indexed by the first <MathRenderer math="d" /> bits of the hash (Global Depth).</li>
                            <li><strong>Buckets:</strong> Blocks that hold actual records. Each bucket has Local Depth <MathRenderer math="d'" />.</li>
                            <li><strong>Splitting:</strong> When a bucket overflows, only that bucket splits. Directory size doubles only if <MathRenderer math="d' < d" />.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Linear Hashing (Brief Note)',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Another dynamic method that splits buckets in a linear order (0, 1, 2...) rather than waiting for specific overflow.
                        It avoids the "stop-the-world" directory doubling of Extendible Hashing but is slightly more complex to manage.
                    </p>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "Why is Rehashing expensive?",
            solution: "It requires allocating a new, larger array and then re-computing hash indices for EVERY existing element and inserting them again. This is an O(n) operation.",
        },
        {
            question: "What happens to Global Depth in Extendible Hashing when directory doubles?",
            solution: "Global Depth increases by 1. This means we use one additional bit of the hash key to index the directory.",
        },
        {
            question: "Difference between Rehashing and Extendible Hashing?",
            solution: "Rehashing is for in-memory hash tables (like HashMap). Extendible Hashing is optimized for disk storage where minimizing I/O is critical.",
        }
    ],
    exampleProblems: [],
}

export default function RehashingExtendiblePage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
