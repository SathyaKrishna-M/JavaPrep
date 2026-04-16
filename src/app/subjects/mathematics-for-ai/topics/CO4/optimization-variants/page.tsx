'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayers, FiActivity } from 'react-icons/fi'

const content = {
    title: 'Optimization Variants',
    explanationSections: [
        {
            title: '1️⃣ Batch Gradient Descent',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Strict traditional Batch Gradient Descent mathematically computes precisely the absolute gradient over the <strong>entire</strong> multi-million image training dataset simultaneously per single step.
                    </p>
                    <div className="bg-slate-800 p-4 border border-blue-500 rounded text-sm text-gray-300">
                        <strong className="text-blue-400">Mathematical Precision vs Scale</strong><br/>
                        It physically guarantees an incredibly pure, noise-less gradient pointing mathematically perfectly down the loss surface vector. However, doing 10 million mathematical integrations for one single weight update step forces GPUs completely out of VRAM memory and utterly destroys algorithmic horizontal scaling.
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Stochastic & Mini-Batch Algorithms',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        To solve the data-scale catastrophe natively, we mathematically slice the massive dataset structurally into smaller uniformly randomized matrices.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 border border-rose-500 rounded text-sm text-gray-300">
                            <strong className="text-rose-400">Stochastic Gradient Descent (SGD)</strong><br/>
                            Calculates the true gradient processing exactly <strong>one single data point</strong> per step. It moves infinitely faster, but the vector trajectory behaves wildly chaotic, aggressively bouncing heavily everywhere down the valley wall.
                        </div>
                        <div className="bg-slate-800 p-4 border border-purple-500 rounded text-sm text-gray-300">
                            <strong className="text-purple-400">Mini-Batch GD</strong><br/>
                            The ultimate industry mathematical compromise. It processes cleanly localized chunks (e.g., exactly 64 images mathematically per step). It heavily exploits massive GPU parallel matrix calculations while maintaining remarkably smooth gradient stability trajectory vectors.
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why typically mathematically does Mini-Batch Gradient Descent perform fundamentally better on actual GPU chips than standard one-by-one SGD?",
            solution: "Modern GPUs are explicitly designed at the architecture hardware level to execute gigantic parallel block matrix algebra perfectly. Processing 64 images simultaneously uses the identically exact same clock time as computing exactly 1 image sequentially."
        },
        {
            question: "What is an epoch versus a mathematical batch?",
            solution: "A discrete batch structurally is simply the exact small isolated subset of data completely run through the network to physically execute exactly one vector weight update. An epoch mathematically strictly signifies sequentially processing every single data point precisely once across the entire comprehensive dataset."
        }
    ],
    exampleProblems: [
        {
            problem: 'Exactly how many specific mathematical weight updates exist actively inside exactly 1 Epoch if your overall training dataset structurally contains mathematically 10,000 images uniformly parsed into a fixed localized Mini-Batch batch size of purely 50?',
            solution: "200 iterative update steps.",
            steps: [
                {
                    step: 'Calculate Update Loop Iterations',
                    explanation: 'The iteration cycle structurally is absolutely 10,000 total data metrics strictly divided entirely by the batch slice parameter. 10000 / 50 = 200 mathematical iterations algorithmically executed.'
                }
            ]
        }
    ]
}

export default function OptimizationVariantsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
