'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayers, FiActivity } from 'react-icons/fi'

const content = {
    title: 'Jacobian & Hessian Matrices',
    explanationSections: [
        {
            title: '1️⃣ The Jacobian Matrix',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        If we have a <strong>vector-valued</strong> function $ \\mathbf&#123;F&#125;: \\mathbb&#123;R&#125;^n \\rightarrow \\mathbb&#123;R&#125;^m $, the first-order partial derivatives form an extremely critical $ m \\times n $ matrix known as the <strong>Jacobian</strong>.
                    </p>
                    <div className="bg-slate-800 p-4 rounded font-mono text-xs overflow-x-auto text-gray-300 border border-gray-700">
                        {"$ J = \\begin{bmatrix} \\frac{\\partial f_1}{\\partial x_1} & \\dots & \\frac{\\partial f_1}{\\partial x_n} \\\\ \\dots & \\dots & \\dots \\\\ \\frac{\\partial f_m}{\\partial x_1} & \\dots & \\frac{\\partial f_m}{\\partial x_n} \\end{bmatrix} $"}
                    </div>
                    <p className="text-gray-300 mt-2">
                        The Jacobian generalizes the derivative spanning multivariable vector functions. It fundamentally powers the multivariable chain rule, making it the mathematical engine behind <strong>Backpropagation in Deep Neural Networks</strong>.
                    </p>
                </div>
            )
        },
        {
            title: '2️⃣ The Hessian Matrix',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        When evaluating a twice-differentiable <strong>scalar</strong> function $ f: \\mathbb&#123;R&#125;^n \\rightarrow \\mathbb&#123;R&#125; $, the exhaustive matrix of all <em>second-order</em> partial derivatives is the <strong>Hessian</strong>.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 border border-blue-500 rounded text-sm text-gray-300">
                            <strong>Shape & Symmetry Structure</strong><br/>
                            It forms an $ n \\times n $ perfect square matrix. If mathematical mixed partials remain continuous, it is absolutely symmetric across the diagonal.
                        </div>
                        <div className="bg-slate-800 p-4 border border-green-500 rounded text-sm text-gray-300">
                            <strong>Loss Curvature</strong><br/>
                            The Hessian describes the localized curvature of an artificial neural network loss surface. It classifies whether a zero-gradient point is a local minimum, local maximum, or unstable saddle point!
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What is the core difference between the Jacobian and the Hessian?",
            solution: "The Jacobian organizes precisely first-order derivatives for vector-valued computational blocks. The Hessian organizes strictly second-order derivatives exclusively for scalar-valued functions (like a unified Loss Function), fundamentally describing its local curvature."
        },
        {
            question: "Why is the Jacobian computationally necessary for Neural Networks?",
            solution: "A neural layer takes an n-dimensional vector input directly to an m-dimensional vector output. The Jacobian cleanly connects how infinitesimally changing any input node globally impacts every individual output node."
        }
    ],
    exampleProblems: [
        {
            problem: 'Find the evaluated Hessian of $ f(x, y) = x^3 + y^3 $.',
            solution: '$ \\begin{bmatrix} 6x & 0 \\\\ 0 & 6y \\end{bmatrix} $',
            steps: [
                {
                    step: 'Calculate First Derivatives',
                    explanation: '$ f_x = 3x^2 $ and $ f_y = 3y^2 $'
                },
                {
                    step: 'Extract Second Derivatives',
                    explanation: '$ f_{xx} = 6x $, $ f_{yy} = 6y $, $ f_{xy} = 0 $'
                },
                {
                    step: 'Populate the Matrix',
                    explanation: 'Assemble them rigidly into the 2x2 grid form: $ \\begin{bmatrix} 6x & 0 \\\\ 0 & 6y \\end{bmatrix} $.'
                }
            ]
        }
    ]
}

export default function JacobianHessianPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
