'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTrendingUp, FiActivity } from 'react-icons/fi'

const content = {
    title: 'Forward Pass & Activations',
    explanationSections: [
        {
            title: '1️⃣ The Mathematical Forward Pass',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The <strong>Forward Pass</strong> constitutes the numerical sequence of mathematical execution pushing raw inputs through successive layers to map inputs into predictions.
                    </p>
                    <div className="bg-slate-800 p-4 rounded text-sm text-gray-200 border border-slate-700 text-center font-mono space-y-2">
                        <div>1. {"$ Z = W \\cdot X + b $"} (Linear Transformation)</div>
                        <div>2. {"$ A = \\text{ReLU}(Z) $"} (Activation / Non-Linearity)</div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ The Absolute Necessity of Activation Functions',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A fundamentally critical component of deep learning models is the Non-Linear Activation function. Without it, deep networks mathematically fail to learn complex patterns.
                    </p>
                    <div className="bg-slate-800 p-4 border border-rose-500 rounded text-sm text-gray-300">
                        <strong>The Linear Collapse Paradigm</strong><br/>
                        Without non-linear activations (like ReLU or Sigmoid), stacking 100 dense layers simply collapses into a single linear matrix transformation ({"$ W_3(W_2(W_1 X)) = W_{\\text{final}} X $"}). Non-linearities prevent this collapse, allowing networks to bend decision boundaries and solve complex problems like XOR.
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What mathematical property prevents a 50-layer network from collapsing into a simple linear regression?",
            solution: "The element-wise application of Non-Linear Activation functions (such as ReLU) between every single linear matrix multiplication layer. This guarantees the mathematical transformation cannot be simplified algebraically."
        }
    ],
    exampleProblems: [
        {
            problem: 'Calculate the Forward Pass output of a single neuron with Weights W=[-2, 1], Inputs X=[-1, 2], Bias b=0, and a standard ReLU activation function.',
            solution: "4",
            steps: [
                {
                    step: 'Linear Transformation (Z)',
                    explanation: '$ Z = (W \\cdot X) + b = (-2 \\times -1) + (1 \\times 2) + 0 = 2 + 2 = 4 $.'
                },
                {
                    step: 'Non-Linear Activation (A)',
                    explanation: '$ A = \\text{ReLU}(4) = \\max(0, 4) = 4 $.'
                }
            ]
        }
    ]
}

export default function ForwardPassPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
