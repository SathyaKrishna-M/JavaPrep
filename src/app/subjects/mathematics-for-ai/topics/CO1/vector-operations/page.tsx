'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiPlus, FiMaximize2, FiMinimize2, FiTarget } from 'react-icons/fi'
import { FaCompressArrowsAlt } from 'react-icons/fa'

const content = {
    title: 'Vector Operations',
    explanationSections: [
        {
            title: '1️⃣ Basic Operations',
            icon: <FiPlus className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li><strong>Vector Addition:</strong> Adding corresponding elements. Geometrically, it's placing vectors head-to-tail.</li>
                        <li><strong>Scalar Multiplication:</strong> Scaling the magnitude of the vector without changing its direction (unless the scalar is negative, which reverses it).</li>
                    </ul>
                    <div className="p-3 bg-black/30 rounded font-mono text-sm text-green-300">
                        [1, 2] + [3, 4] = [4, 6] <br />
                        2 * [1, 2] = [2, 4]
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ The Dot Product',
            icon: <FiTarget className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The most critical operation in AI. It multiplies corresponding elements and sums them up.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <p className="text-indigo-300 font-bold mb-2">Geometric Interpretation</p>
                        <p className="text-gray-300 text-sm">
                            <code>a · b = |a| |b| cos(θ)</code>
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            It measures <strong>similarity</strong>. If two vectors point in the same direction, the dot product is maximized. If they are orthogonal (90 degrees), it is zero.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Projection & Noise Removal',
            icon: <FaCompressArrowsAlt className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Projection allows us to "squash" a vector onto another line. This is used in dimensionality reduction (PCA) and noise removal by discarding components of the data that don't align with the principal directions.
                    </p>
                </div>
            ),
        },
        {
            title: '4️⃣ AI Relevance',
            icon: <FiMaximize2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li><strong>Similarity Search:</strong> Finding similar images or documents by calculating the dot product (or Cosine Similarity) of their embeddings.</li>
                        <li><strong>Recommender Systems:</strong> Dot product of User Vector and Movie Vector predicts the rating.</li>
                    </ul>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "If two vectors are orthogonal, what is their dot product?",
            solution: "Zero. This means they are completely unrelated (perpendicular/uncorrelated) in that vector space.",
        },
        {
            question: "Why do we often normalize vectors before calculating similarity?",
            solution: "To remove the effect of magnitude. For example, a long document shouldn't be considered 'more similar' just because it has more words (larger vector magnitude). We care about the direction (topic).",
        }
    ],
    exampleProblems: [],
}

export default function VectorOperationsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
