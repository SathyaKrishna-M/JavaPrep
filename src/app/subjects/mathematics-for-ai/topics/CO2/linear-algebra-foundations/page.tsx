'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGrid, FiTarget, FiSearch, FiLayers, FiMinimize } from 'react-icons/fi'
import { FaProjectDiagram, FaVectorSquare, FaChartBar, FaCogs } from 'react-icons/fa'

const content = {
    title: 'Matrix Algebra for AI Applications',
    explanationSections: [
        {
            title: 'BTL-2: Illustrate Matrix Algebra Operations',
            icon: <FaVectorSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Before applying them, we must visualize the core operations that power AI algorithms.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-blue-500/20">
                            <h4 className="text-blue-300 font-bold mb-2 flex items-center gap-2"><FiTarget /> Dot Product & Orthogonality</h4>
                            <p className="text-gray-400 text-sm mb-2"> Measures alignment. If <code>A · B = 0</code>, vectors are <strong>Orthogonal</strong> (independent/uncorrelated).</p>
                            <div className="bg-black/30 p-2 rounded text-xs text-gray-400 text-center">
                                Used in: Correlation analysis, finding distinctive features.
                            </div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                            <h4 className="text-purple-300 font-bold mb-2 flex items-center gap-2"><FaProjectDiagram /> Projections</h4>
                            <p className="text-gray-400 text-sm mb-2">"Casting a shadow" of one vector onto another. Used to decompose data.</p>
                            <div className="bg-black/30 p-2 rounded text-xs text-gray-400 text-center">
                                Used in: PCA (Dimensionality Reduction).
                            </div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-green-500/20">
                            <h4 className="text-green-300 font-bold mb-2 flex items-center gap-2"><FiGrid /> Rank of a Matrix</h4>
                            <p className="text-gray-400 text-sm mb-2">The number of linearly independent rows/columns. Tells us the "true" information content.</p>
                            <div className="bg-black/30 p-2 rounded text-xs text-gray-400 text-center">
                                Low Rank = High Redundancy (good for compression).
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'BTL-3: Apply to AI Tasks',
            icon: <FaCogs className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        We apply these abstract operations to build functional AI components.
                    </p>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-4 bg-indigo-900/10 rounded-xl border border-indigo-500/20">
                            <div className="text-indigo-400 mt-1"><FiSearch className="w-6 h-6" /></div>
                            <div>
                                <h4 className="text-indigo-300 font-bold">Similarity Search</h4>
                                <p className="text-gray-400 text-sm">
                                    <strong>Operation:</strong> Normalized Dot Product (Cosine Similarity).<br />
                                    <strong>Application:</strong> Search engines, Recommender Systems (Finding movies similar to "The Matrix").
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-emerald-900/10 rounded-xl border border-emerald-500/20">
                            <div className="text-emerald-400 mt-1"><FaChartBar className="w-6 h-6" /></div>
                            <div>
                                <h4 className="text-emerald-300 font-bold">Feature Engineering</h4>
                                <p className="text-gray-400 text-sm">
                                    <strong>Operation:</strong> Matrix Multiplication (Interaction terms) & Projections.<br />
                                    <strong>Application:</strong> Creating new features from raw data (e.g., combining "height" and "weight" into "BMI").
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-pink-900/10 rounded-xl border border-pink-500/20">
                            <div className="text-pink-400 mt-1"><FiLayers className="w-6 h-6" /></div>
                            <div>
                                <h4 className="text-pink-300 font-bold">Linear Layers (Neural Networks)</h4>
                                <p className="text-gray-400 text-sm">
                                    <strong>Operation:</strong> Matrix Multiplication (Wx + b).<br />
                                    <strong>Application:</strong> The fundamental building block of Deep Learning that transforms input space into output classes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "BTL-2: If the dot product of a user vector and an item vector is 0, what does it imply for a Recommender System?",
            solution: "It implies Orthogonality. The user's preferences have zero overlap with the item's features, so the system should NOT recommend this item (Similarity score = 0).",
        },
        {
            question: "BTL-3: Why do we often want Low-Rank matrices in AI Model Compression?",
            solution: "A Low-Rank matrix implies that many rows/columns are redundant (linearly dependent). We can factorize this matrix into smaller matrices (e.g., LoRA - Low Rank Adaptation) to drastically reduce the number of parameters without losing much information.",
        },
        {
            question: "BTL-3: How is a Linear Layer in PyTorch/TensorFlow implemented mathematically?",
            solution: "It is implemented as 'y = xA^T + b', where 'x' is the input batch, 'A' is the weight matrix, and 'b' is the bias. It's a direct application of Matrix Multiplication and Vector Addition.",
        }
    ],
    exampleProblems: [
        {
            problem: "BTL-3: Implementing Similarity Search",
            solution: "Most Similar: Doc B",
            steps: [
                {
                    step: "Scenario",
                    explanation: "Query Vector Q = [1, 0]. Doc A = [0, 1]. Doc B = [0.9, 0.1]."
                },
                {
                    step: "Calculate Dot Products",
                    explanation: "Q · A = (1*0) + (0*1) = 0 (Orthogonal/Unrelated). \n Q · B = (1*0.9) + (0*0.1) = 0.9 (High Similarity)."
                },
                {
                    step: "Apply Selection",
                    explanation: "Since 0.9 > 0, the search engine ranks Doc B higher than Doc A."
                }
            ]
        },
        {
            problem: "BTL-2: Analyzing Rank",
            solution: "Rank = 1",
            steps: [
                {
                    step: "Matrix Definition",
                    explanation: "M = [[1, 2], [2, 4]]."
                },
                {
                    step: "Analysis",
                    explanation: "Row 2 is exactly 2 times Row 1. ( [2, 4] = 2 * [1, 2] )."
                },
                {
                    step: "Conclusion",
                    explanation: "The rows are linearly dependent. There is only 1 independent row. Therefore, Rank(M) = 1. This matrix squashes 2D space onto a 1D line."
                }
            ]
        }
    ],
}

export default function LinearAlgebraFoundationsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
