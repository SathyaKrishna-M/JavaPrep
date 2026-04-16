'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTrendingUp, FiActivity, FiLayers, FiMinimize } from 'react-icons/fi'

const VisualCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-8 shadow-xl">
        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-300">{title}</span>
        </div>
        <div className="p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[200px]">
            {children}
        </div>
    </div>
)

const content = {
    title: 'Gradients, Jacobian & Hessian',
    explanationSections: [
        {
            title: '1️⃣ Partial Derivatives & The Gradient Vector',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        For a function {"$\\( f(x,y) \\)$"}, partial derivatives {"$\\( \\frac{\\partial f}{\\partial x} \\)$"} and {"$\\( \\frac{\\partial f}{\\partial y} \\)$"} represent the rate of change of {"$\\( f \\)$"} with respect to one variable while treating the other as a constant.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border-l-4 border-indigo-500 font-mono text-gray-200">
                        {"$\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1} \\\\ \\dots \\\\ \\frac{\\partial f}{\\partial x_n} \\end{bmatrix}$"}
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>Gradient Direction:</strong> Always points in the direction of the <em>steepest ascent</em> (fastest increase).</li>
                        <li><strong>Negative Gradient:</strong> Points in the direction of steepest <em>decrease</em>. Used in Gradient Descent!</li>
                        <li><strong>Magnitude:</strong> Indicates how rapidly the function is changing.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '2️⃣ Cost Function Minimization in Machine Learning',
            icon: <FiMinimize className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A cost function like Mean Squared Error (MSE) measures the error between a model's predictions and actual targets. To minimize this error, we iteratively update parameters using <strong>Gradient Descent</strong>:
                    </p>
                    <div className="bg-slate-800 p-4 border border-rose-500 rounded text-sm text-center text-white font-mono">
                        {"$\\theta_{\\text{new}} = \\theta_{\\text{old}} - \\eta \\nabla L(\\theta)$"}
                    </div>
                    <p className="text-gray-300">
                        Where {"$\\( \\eta \\)$"} is the learning rate. We compute the gradient {"$\\( \\nabla L \\)$"} and move in the <em>opposite</em> direction to reach the minimum error.
                    </p>
                </div>
            )
        },
        {
            title: '3️⃣ The Jacobian Matrix',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        If we have a <strong>vector-valued</strong> function {"$\\( \\mathbf{F}: \\mathbb{R}^n \\rightarrow \\mathbb{R}^m \\)$"}, the first-order partial derivatives form an {"$\\( m \\times n \\)$"} matrix known as the <strong>Jacobian</strong>.
                    </p>
                    <div className="bg-slate-800 p-4 rounded font-mono text-xs overflow-x-auto text-gray-300 border border-gray-700">
                        {"$J = \\begin{bmatrix} \\frac{\\partial f_1}{\\partial x_1} & \\dots & \\frac{\\partial f_1}{\\partial x_n} \\\\ \\dots & \\dots & \\dots \\\\ \\frac{\\partial f_m}{\\partial x_1} & \\dots & \\frac{\\partial f_m}{\\partial x_n} \\end{bmatrix}$"}
                    </div>
                    <p className="text-gray-300">
                        The Jacobian is essential in the multivariable chain rule and is the foundation for <strong>Backpropagation</strong> in Neural Networks.
                    </p>
                </div>
            )
        },
        {
            title: '4️⃣ The Hessian Matrix',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        For a twice-differentiable <strong>scalar</strong> function {"$\\( f: \\mathbb{R}^n \\rightarrow \\mathbb{R} \\)$"}, the matrix of <em>second-order</em> partial derivatives is the <strong>Hessian</strong>.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 border border-blue-500 rounded text-sm text-gray-300">
                            <strong>Shape & Symmetry</strong><br/>
                            It is an {"$\\( n \\times n \\)$"} square matrix. If mixed partials are continuous, it is perfectly symmetric.
                        </div>
                        <div className="bg-slate-800 p-4 border border-green-500 rounded text-sm text-gray-300">
                            <strong>Curvature</strong><br/>
                            The Hessian describes the local curvature of the loss surface. It tells us if a point is a minimum, maximum, or saddle point (using Newton's Method).
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What is the key difference between the Jacobian and the Hessian?",
            solution: "The Jacobian contains first-order derivatives for a vector-valued function. The Hessian contains second-order derivatives for a scalar-valued function (like a Loss Function), describing its curvature."
        },
        {
            question: 'Find the partial derivative of {"$\\( f(x, y) = x^2y + \\sin x + \\cos y \\)$"} with respect to x.',
            solution: 'Treating y as a constant: {"$\\( 2xy + \\cos x \\)$"}.'
        }
    ],
    exampleProblems: [
        {
            problem: 'Find the Hessian of {"$\\( f(x, y) = x^3 + y^3 \\)$"}.',
            solution: '{"$\\begin{bmatrix} 6x & 0 \\\\ 0 & 6y \\end{bmatrix}$"}',
            steps: [
                {
                    step: 'Find First Derivatives',
                    explanation: '{"$\\( f_x = 3x^2 \\)$"} and {"$\\( f_y = 3y^2 \\)$"}'
                },
                {
                    step: 'Find Second Derivatives',
                    explanation: '{"$\\( f_{xx} = 6x \\)$"}, {"$\\( f_{yy} = 6y \\)$"}, {"$\\( f_{xy} = 0 \\)$"}'
                },
                {
                    step: 'Form Matrix',
                    explanation: 'Place them in the 2x2 grid: {"$\\begin{bmatrix} 6x & 0 \\\\ 0 & 6y \\end{bmatrix}$"}.'
                }
            ]
        }
    ]
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
