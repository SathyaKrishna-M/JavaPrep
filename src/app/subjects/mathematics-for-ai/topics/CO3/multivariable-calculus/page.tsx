'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTrendingUp, FiTrendingDown, FiMap } from 'react-icons/fi'
import { FaMountain, FaWaveSquare } from 'react-icons/fa'

const content = {
    title: 'Multivariable Calculus for AI',
    explanationSections: [
        {
            title: '1️⃣ Functions of Multiple Variables',
            icon: <FaMountain className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        In AI, loss functions rarely depend on just one variable. They depend on millions of parameters (weights).
                    </p>
                    <p className="text-gray-300 text-sm">
                        <em>Analogy:</em> Imagine standing on a hilly terrain (loss landscape). Your height is the loss, and your latitude/longitude are the parameters.
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ The Gradient Vector (∇)',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The <span className="text-indigo-400 font-semibold">Gradient</span> is a vector containing all partial derivatives of a function.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <p className="text-gray-300 mb-2">It points in the direction of steepest ascent.</p>
                        <ul className="list-disc list-inside text-gray-300 text-sm">
                            <li>To minimize loss, we move in the opposite direction (-∇).</li>
                            <li><strong>Partial Derivative:</strong> Seeing how the function changes when we wiggle just one variable, holding others constant.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Hessian Matrix',
            icon: <FaWaveSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The Hessian describes the <span className="text-indigo-400 font-semibold">curvature</span> of the function.
                    </p>
                    <p className="text-gray-300 text-sm">
                        It tells us if we are in a valley (local minimum), a peak (local maximum), or a saddle point. It consists of second-order partial derivatives.
                    </p>
                </div>
            ),
        },
        {
            title: '4️⃣ Taylor Series',
            icon: <FiMap className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Approximating a complex function near a point using polynomials. In Deep Learning, we often assume the loss surface is locally quadratic to optimize it.
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why do we move in the simplified direction of the negative gradient?",
            solution: "The gradient points in the direction of steepest ascent (increasing loss). To minimize the loss, we must move in the opposite direction (steepest descent).",
        },
        {
            question: "What is a Saddle Point and why is it problematic?",
            solution: "A saddle point is where the gradient is zero (flat), but it's not a minimum extreme. It curves up in one direction and down in another. It can trap basic optimization algorithms.",
        },
        {
            question: "How is the Jacobian Matrix different from the Hessian?",
            solution: "The Jacobian matrix contains first-order partial derivatives for vector-valued functions (e.g., a layer output). The Hessian matrix contains second-order partial derivatives for scalar-valued functions (e.g., the loss function).",
        }
    ],
    exampleProblems: [],
}

export default function MultivariableCalculusPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
