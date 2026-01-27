'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGrid, FiRotateCw, FiMove } from 'react-icons/fi'
import { FaLayerGroup, FaNetworkWired } from 'react-icons/fa'

const content = {
    title: 'Matrices as Transformations',
    explanationSections: [
        {
            title: '1️⃣ Matrix as a Transformation',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Don't just think of a matrix as a table of numbers. Think of it as a <span className="text-indigo-400 font-semibold">machine</span> that takes a vector as input and spits out a new, transformed vector.
                    </p>
                    <div className="p-3 bg-indigo-900/20 rounded border border-indigo-500/20 text-center font-mono text-cyan-300">
                        Input Vector (x) → [ Matrix A ] → Output Vector (Ax)
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Types of Transformations',
            icon: <FiRotateCw className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-3 rounded">
                            <h4 className="text-purple-300 font-bold mb-1">Scaling</h4>
                            <p className="text-gray-400 text-sm">Stretching or shrinking space. Represented by diagonal matrices.</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded">
                            <h4 className="text-purple-300 font-bold mb-1">Rotation</h4>
                            <p className="text-gray-400 text-sm">Spinning the vector around the origin.</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded">
                            <h4 className="text-purple-300 font-bold mb-1">Shearing</h4>
                            <p className="text-gray-400 text-sm">Slanting the grid lines (like pushing a deck of cards).</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded">
                            <h4 className="text-purple-300 font-bold mb-1">Composition</h4>
                            <p className="text-gray-400 text-sm">Multiplying matrices (AB) combines their effects (Transformed by B, then A).</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ AI Relevance: Neural Layers',
            icon: <FaNetworkWired className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        This is the secret sauce of Deep Learning. A "Fully Connected Layer" (Linear Layer) is simply a matrix multiplication.
                    </p>
                    <p className="text-gray-300 text-sm">
                        The network learns the numbers in the matrix (weights) so that it transforms the input (image of a cat) into a simpler space where "catness" is easily separable from "dogness".
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Does the order of matrix multiplication matter? (Is AB = BA?)",
            solution: "No, generally AB ≠ BA. Applying a rotation then a shear is different from applying a shear then a rotation. Matrix multiplication is non-commutative.",
        },
        {
            question: "What does an Identity Matrix do?",
            solution: "It leaves the vector unchanged. It's the equivalent of multiplying a number by 1.",
        }
    ],
    exampleProblems: [],
}

export default function MatricesTransformationsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
