'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTrendingDown, FiAlertCircle } from 'react-icons/fi'

const content = {
    title: 'Gradient Descent Basics',
    explanationSections: [
        {
            title: '1️⃣ The Mechanics of Optimization',
            icon: <FiTrendingDown className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        In Machine Learning, optimization relies strictly on locating the absolute smallest error possible across an incredibly high-dimensional loss surface. The standard method used by almost all Deep Neural Networks is <strong>Gradient Descent</strong>.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border-l-4 border-indigo-500 font-mono text-gray-200">
                        {"$ \\theta_{\\text{new}} = \\theta_{\\text{old}} - \\eta \\nabla f(\\theta_{\\text{old}}) $"}
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ The Impact of Learning Rate (η)',
            icon: <FiAlertCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The learning rate mathematically determines the multiplier size of the step the algorithm forces the parameters to take downhill. Choosing an optimal learning rate is computationally critical.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 border border-rose-500 rounded text-sm text-gray-300">
                            <strong>Large Learning Rate</strong><br/>
                            Fast initial movement, but an extremely high mathematical risk of violent <strong>overshooting</strong>. The algorithm can constantly miss the deep valley minimum, drastically oscillating and completely diverging towards infinity.
                        </div>
                        <div className="bg-slate-800 p-4 border border-green-500 rounded text-sm text-gray-300">
                            <strong>Small Learning Rate</strong><br/>
                            Highly stable precision movement with almost zero chance of catastrophic overshooting. However, it results in brutally <strong>slow convergence</strong>, forcing GPUs to process infinite computations to reach the end.
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Geometrically, what happens if standard Gradient Descent uses a Learning Rate that is magnitudes too high?",
            solution: "The gradient step will drastically multiply the weight vector, mathematically blasting it completely over the loss surface valley to an even higher steep cliff on the opposite side. The network error instantly diverges."
        }
    ],
    exampleProblems: [
        {
            problem: 'Given an extremely simple 1D loss tracking function $ L(w) = (w - 3)^2 $, find the exactly updated mathematical weight $ w $ after exactly one iteration of gradient descent with learning rate $ \\eta = 0.1 $ and an initial starting metric weight $ w = 0 $.',
            solution: "0.6",
            steps: [
                {
                    step: 'Compute the Gradient',
                    explanation: 'The mathematical derivative evaluates to $ \\frac{dL}{dw} = 2(w - 3) $. Substituting standard starting w=0 directly yields the gradient mathematically equal to -6.0'
                },
                {
                    step: 'Apply mathematical Update Rule',
                    explanation: '$ w_{\\text{new}} = w_{\\text{old}} - \\eta(\\text{Gradient}) = 0 - (0.1)(-6) = 0 + 0.6 = 0.6 $'
                }
            ]
        }
    ]
}

export default function GradientDescentBasicsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
