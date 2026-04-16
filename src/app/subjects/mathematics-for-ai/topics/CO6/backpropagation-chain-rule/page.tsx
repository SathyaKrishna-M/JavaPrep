'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCpu } from 'react-icons/fi'

const content = {
    title: 'Backpropagation Chain Rule',
    explanationSections: [
        {
            title: '1️⃣ The Mathematical Backbone of AI',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        To update neural network weights, we need the Gradient {"$ \\frac{\\partial L}{\\partial W} $"}. However, a deep neural network has activation functions nested inside linear layers nested inside other layers. To extract the gradient deep inside the network, we apply Calculus's <strong>Chain Rule</strong> recursively. This algorithmic process is <strong>Backpropagation</strong>.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border-l-4 border-indigo-500 font-mono text-gray-200 overflow-x-auto">
                        {"$ \\frac{\\partial L}{\\partial W_1} = \\frac{\\partial L}{\\partial \\hat{Y}} \\times \\frac{\\partial \\hat{Y}}{\\partial Z_2} \\times \\frac{\\partial Z_2}{\\partial A_1} \\times \\frac{\\partial A_1}{\\partial Z_1} \\times \\frac{\\partial Z_1}{\\partial W_1} $"}
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400 mt-4 text-sm">
                        <li>Each term in the multiplication chain represents a local derivative computed during the backward pass.</li>
                        <li>By storing the forward pass values in memory, we simply multiply backwards through the computation graph.</li>
                    </ul>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Which specific calculus rule forms the entire mathematical algorithm of Backpropagation?",
            solution: "The Multivariate Chain Rule. It allows us to decompose highly complex nested derivatives (like how a weight matrix in the very 1st layer affects the final Loss output 50 layers later) into simple, easily computable multiplied factors."
        }
    ],
    exampleProblems: [
        {
            problem: "Apply the mathematical chain rule explicitly to $ f(g(x)) $ where $ g(x) = x^2 $ and $ f(u) = e^u $.",
            solution: "$ 2x e^{x^2} $",
            steps: [
                {
                    step: "Identify nested variables",
                    explanation: "$ f(g(x)) = e^{x^2} $. Let $ u = x^2 $."
                },
                {
                    step: "Compute local derivatives",
                    explanation: "$ \\frac{df}{du} = e^u $ and $ \\frac{du}{dx} = 2x $."
                },
                {
                    step: "Multiply using the Chain Rule",
                    explanation: "$ \\frac{df}{dx} = \\frac{df}{du} \\times \\frac{du}{dx} = e^u \\times 2x = 2x e^{x^2} $."
                }
            ]
        }
    ]
}

export default function BackpropagationPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
