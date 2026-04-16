'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTrendingUp, FiMapPin } from 'react-icons/fi'

const content = {
    title: 'Partial Derivatives & Gradients',
    explanationSections: [
        {
            title: '1️⃣ Defining the Partial Derivative',
            icon: <FiMapPin className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        In single-variable calculus, the derivative shows the rock-bottom rate of change. In Multivariable Calculus, the <strong>Partial Derivative</strong> {"$ \\frac{\\partial f}{\\partial x} $"} isolates perfectly the rate of change of {"$ f $"} with respect to one single variable while artificially "freezing" all other variables as absolute constants.
                    </p>
                    <div className="bg-slate-800 p-4 border border-rose-500 rounded text-sm text-gray-300 font-mono">
                        Given {"$ f(x,y) = x^2 y + \\sin(x) + \\cos(y) $"}<br/><br/>
                        {"$ \\frac{\\partial f}{\\partial x} = 2xy + \\cos(x) $"} (treating y as constant number)<br/>
                        {"$ \\frac{\\partial f}{\\partial y} = x^2 - \\sin(y) $"} (treating x as constant number)
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ The Gradient Vector',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        When you package every single partial derivative equation into a unified column vector, you get the <strong>Gradient Vector</strong>.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border-l-4 border-indigo-500 font-mono text-gray-200">
                        {"$ \\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1} \\\\ \\dots \\\\ \\frac{\\partial f}{\\partial x_n} \\end{bmatrix} $"}
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>Gradient Direction:</strong> Always acts as a multidimensional compass pointing identically in the direction of the <em>steepest ascent</em> (fastest incline).</li>
                        <li><strong>Gradient Magnitude:</strong> The length of the vector indicates precisely how rapidly the mountain inclines in that direction.</li>
                    </ul>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why do we subtract the gradient during Gradient Descent instead of adding it?",
            solution: "Because the raw mathematical gradient points flawlessly in the direction of steepest INCREASE (ascent). By multiplying it by a negative sign, we reverse the compass direction to walk 180 degrees backwards toward steepest DECREASE (minimum loss)."
        },
        {
            question: 'Find the partial derivative of {"$ f(x, y) = x^2y + \\sin x + \\cos y $"} with respect to y.',
            solution: 'Treating x as a constant: $ x^2 - \\sin y $.'
        }
    ],
    exampleProblems: [
        {
            problem: 'Find the evaluated gradient vector for $ f(x, y) = x^2 y + x $ at point (1, 2).',
            solution: '$ \\begin{bmatrix} 5 \\\\ 1 \\end{bmatrix} $',
            steps: [
                {
                    step: 'Compute Partials',
                    explanation: '$ f_x = 2xy + 1 $ and $ f_y = x^2 $'
                },
                {
                    step: 'Evaluate at Coordinates',
                    explanation: 'Substitute x=1 and y=2. $ f_x(1,2) = 2(1)(2) + 1 = 5 $. $ f_y(1,2) = 1^2 = 1 $.'
                },
                {
                    step: 'Assemble Vector',
                    explanation: 'The finalized mathematical direction of peak ascent from position coordinate (1,2) is $ \\begin{bmatrix} 5 \\\\ 1 \\end{bmatrix} $.'
                }
            ]
        }
    ]
}

export default function GradientsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
