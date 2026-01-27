'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMinimize, FiEye, FiCpu } from 'react-icons/fi'
import { FaBrain, FaLayerGroup } from 'react-icons/fa'

const content = {
    title: 'Mathematics Behind Advanced AI',
    explanationSections: [
        {
            title: '1️⃣ Attention Mechanism (Transformers)',
            icon: <FaBrain className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The core of ChatGPT and modern NLP.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h4 className="text-indigo-300 font-semibold mb-2">Query, Key, Value</h4>
                        <p className="text-gray-300 text-sm mb-2">Think of it like a database retrieval.</p>
                        <ul className="list-disc list-inside text-gray-300 text-sm">
                            <li><strong>Query (Q):</strong> What I am looking for.</li>
                            <li><strong>Key (K):</strong> What defines the data.</li>
                            <li><strong>Value (V):</strong> The actual content.</li>
                        </ul>
                        <div className="mt-2 p-2 bg-black/30 rounded font-mono text-xs text-green-300">
                            Attention(Q, K, V) = softmax(QK^T / √d) V
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Convolution',
            icon: <FiEye className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The mathematical operation behind finding patterns in images.
                    </p>
                    <p className="text-gray-300 text-sm">
                        It involves sliding a small "filter" (kernel) over an image and computing the dot product at each position. This detects edges, textures, and shapes.
                    </p>
                </div>
            ),
        },
        {
            title: '3️⃣ Softmax Transformation',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Turning raw numbers (logits) into probabilities.
                    </p>
                    <p className="text-gray-300 text-sm">
                        It ensures that all outputs sum to 1.0, making them interpretable as confidence scores.
                    </p>
                </div>
            ),
        },
        {
            title: '4️⃣ NLP Vector Arithmetic',
            icon: <FaLayerGroup className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Words live in a high-dimensional vector space where semantic meaning is preserved geometrically.
                    </p>
                    <div className="p-3 bg-indigo-900/20 rounded border border-indigo-500/20 text-center">
                        <span className="text-cyan-300 text-lg">King - Man + Woman ≈ Queen</span>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why do we divide by the square root of dimension d in the Attention formula?",
            solution: "To prevent the dot products from becoming too large. Large values would push the Softmax function into regions where gradients are extremely small (vanishing gradients), killing the learning process.",
        },
        {
            question: "What is the difference between Convolution and fully connected layers?",
            solution: "Convolution leverages 'local connectivity' and 'weight sharing' (using the same filter everywhere), making it translation invariant and much more efficient for images than fully connected layers.",
        },
        {
            question: "Can Softmax handle negative inputs?",
            solution: "Yes! The exponential function e^x ensures that all outputs are positive, even if the input logits are negative.",
        }
    ],
    exampleProblems: [],
}

export default function AdvancedAIMathPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
