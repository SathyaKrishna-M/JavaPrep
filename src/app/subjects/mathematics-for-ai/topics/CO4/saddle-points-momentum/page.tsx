'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiFastForward, FiTarget } from 'react-icons/fi'

const content = {
    title: 'Saddle Points & Momentum',
    explanationSections: [
        {
            title: '1️⃣ Overcoming Saddle Points',
            icon: <FiTarget className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A mathematically precise <strong>Saddle Point</strong> is an unstable geometric location across a neural network loss topology where the vector gradient registers exactly as zero ($ \\nabla f(x^*) = 0 $), but the absolute target point mathematically curves strictly down in one orthogonal direction and violently up in another.
                    </p>
                    <p className="text-gray-300">
                        Standard pure gradient descent violently hits a mathematical dead-zone directly at the center of the Saddle Point because the 0.0 gradient entirely halts the mathematical weight updates, destroying training momentum permanently.
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ Momentum Optimizer',
            icon: <FiFastForward className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Inspired intensely by physical mechanical inertia, <strong>Momentum</strong> mathematically allows the optimization algorithm strictly to "remember" its accumulation of deep past gradients. Similarly to exactly how a heavy steel ball rolling massively down a steep valley builds tremendous deep physical velocity perfectly resisting friction.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm text-center text-gray-200 border border-slate-700">
                        {"$ v_{k+1} = \\beta v_k + \\eta \\nabla J(\\theta_k) $"}<br/>
                        {"$ \\theta_{k+1} = \\theta_k - v_{k+1} $"}
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400 text-sm mt-3">
                        <li>$ \\beta $ is strictly defined globally as the mathematical momentum decay parameter (typically initialized strictly to 0.9).</li>
                        <li>It structurally accumulates past gradients constantly, drastically canceling lateral chaotic oscillations entirely inside narrow steep valleys.</li>
                        <li>It dynamically allows the optimizer loop fundamentally to blast uninterrupted completely past the zero-gradient zones (saddles) using pure stored algorithmic "velocity".</li>
                    </ul>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why exactly does Momentum critically accelerate descent inside highly narrow mathematical valleys?",
            solution: "In a steep narrow loss valley, plain gradients oscillate incredibly chaotically purely across the walls. Momentum stores past directional vectors. Opposing transverse gradients mathematical cancel out perfectly to zero, while the weak but fully consistent longitudinal gradients pointing down the valley systematically accumulate rapidly into a massive velocity vector."
        }
    ],
    exampleProblems: [
        {
            problem: 'Evaluating an advanced Momentum mathematical algorithm: decay parameter β = 0.9, algorithm learning rate η = 0.1, currently tracked gradient = 2.0, and previously tracked algorithm velocity = 1.0. Calculate the dynamically updated new mathematical tracking velocity.',
            solution: "1.1",
            steps: [
                {
                    step: 'Extract Momentum Formula Matrix',
                    explanation: '$ v_{new} = \\beta(v_{old}) + \\eta(\\text{current gradient}) $'
                },
                {
                    step: 'Substitute Mathematical Scalars',
                    explanation: '$ v_{new} = 0.9(1.0) + 0.1(2.0) = 0.9 + 0.2 = 1.1 $'
                }
            ]
        }
    ]
}

export default function SaddlePointsMomentumPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
