'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTrendingDown, FiActivity, FiRefreshCw } from 'react-icons/fi'
import { FaRunning, FaBalanceScale } from 'react-icons/fa'

const content = {
    title: 'Optimization & Learning Dynamics',
    explanationSections: [
        {
            title: '1️⃣ Loss Functions',
            icon: <FaBalanceScale className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The scorekeeper of AI. It tells us how "wrong" the model is.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                            <h4 className="text-red-300 font-semibold text-sm">MSE (Mean Squared Error)</h4>
                            <p className="text-gray-400 text-xs">Used for Regression. Penalizes large errors heavily.</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                            <h4 className="text-red-300 font-semibold text-sm">Cross-Entropy</h4>
                            <p className="text-gray-400 text-xs">Used for Classification. Measures divergence between predicted probability and actual label.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Gradient Descent',
            icon: <FiTrendingDown className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The workhorse of modern AI.
                    </p>
                    <div className="bg-indigo-900/20 p-4 rounded border border-indigo-500/20">
                        <p className="text-gray-300 font-mono text-sm">w_new = w_old - learning_rate * gradient</p>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Optimizers & Variants',
            icon: <FaRunning className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li><strong>SGD (Stochastic Gradient Descent):</strong> Updates weights using one sample at a time. Noisy but fast.</li>
                        <li><strong>Mini-batch GD:</strong> The sweet spot. Updates using a small batch (e.g., 32, 64) of samples.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '4️⃣ Advanced Optimizers',
            icon: <FiRefreshCw className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Standard GD can get stuck. Advanced methods help.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li><strong>Momentum:</strong> Accumulates past gradients to push through flat regions.</li>
                        <li><strong>Adam:</strong> Adaptive learning rates for each parameter. The default choice for most tasks.</li>
                    </ul>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What happens if the learning rate is too high?",
            solution: "The model might overshoot the minimum and diverge (loss increases to infinity) or oscillate around the minimum without settling.",
        },
        {
            question: "What happens if the learning rate is too low?",
            solution: "Training becomes extremely slow, and the model might get stuck in a local minimum early on.",
        },
        {
            question: "Why do we use Mini-batches instead of the full dataset?",
            solution: "The full dataset might not fit in memory (RAM/VRAM). Mini-batches provide a good approximation of the true gradient while allowing for parallel computation.",
        }
    ],
    exampleProblems: [],
}

export default function OptimizationBasicsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
