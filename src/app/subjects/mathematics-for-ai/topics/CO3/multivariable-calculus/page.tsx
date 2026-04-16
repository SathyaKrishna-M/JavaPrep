'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMapPin, FiActivity, FiLayers, FiMinimize } from 'react-icons/fi'

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
    title: 'Taylor Series & Curvature',
    explanationSections: [
        {
            title: '1️⃣ Maclaurin & Taylor Series for Two Variables',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The Taylor Series allows us to approximate complex, non-linear equations iteratively using polynomials derived from partial derivatives.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm border-l-4 border-indigo-500 font-mono text-gray-200 overflow-x-auto">
                        {"$f(x, y) \\approx f(a, b) + f_x(x-a) + f_y(y-b) + \\frac{1}{2}\\left( f_{xx}(x-a)^2 + 2f_{xy}(x-a)(y-b) + f_{yy}(y-b)^2 \\right)$"}
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Case Study: GPS Position Estimation',
            icon: <FiMapPin className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        GPS satellites compute distances using a highly non-linear equation containing square roots: {"$\\( r = \\sqrt{(x-x_s)^2 + (y-y_s)^2} \\)$"}. Solving this directly stretches smartphone processors.
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>Linearization:</strong> GPS systems expand the distance formula into a First-Order Taylor series.</li>
                        <li><strong>Efficiency:</strong> This eliminates repeated square-root calculations converting them to matrix-based additions and multiplications.</li>
                        <li><strong>Iteration:</strong> The receiver starts at an estimate {"$\\( (x_0, y_0) \\)$"} and rapidly converges to the true location via repeated linear approximations.</li>
                    </ul>
                </div>
            )
        },
        {
            title: '3️⃣ Loss Surface Curvature in Optimization',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Curvature describes how quickly the slope (gradient) of a loss function changes. The second-order terms of the Taylor Series (the Hessian matrix) provide the curvature information.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 border border-rose-500 rounded text-sm text-gray-300">
                            <strong>High Curvature (Sharp Valleys)</strong><br/>
                            Gradient changes rapidly. A large learning rate causes overshooting and oscillation. <em>Requires a small learning rate.</em>
                        </div>
                        <div className="bg-slate-800 p-4 border border-green-500 rounded text-sm text-gray-300">
                            <strong>Low Curvature (Flat Regions)</strong><br/>
                            Gradient changes slowly. A small learning rate crawls forever. <em>Requires a larger learning rate.</em>
                        </div>
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why do optimization algorithms need to adjust learning rate based on curvature?",
            solution: "If the surface has high curvature (steep narrow valleys), the gradient drops or changes instantly. A fixed large learning rate would overshoot the minimum, completely destabilizing training."
        },
        {
            question: "What is a Maclaurin series?",
            solution: "A Taylor Series expansion evaluated directly at the origin (a=0, b=0)."
        }
    ],
    exampleProblems: [
        {
            problem: 'If a Taylor polynomial evaluates the coefficient of $\\( (w_1 - 1)^2 \\)$ as 1, and $\\( (w_2 - 1)^2 \\)$ as 4, what is the shape of the surface?',
            solution: "It forms an elliptical bowl.",
            steps: [
                {
                    step: 'Evaluate terms',
                    explanation: 'The term for w2 has a coefficient 4x larger than w1.'
                },
                {
                    step: 'Understand curvature',
                    explanation: 'This means the loss changes 4x faster along w2 than w1 (steeper in w2, flatter in w1).'
                }
            ]
        }
    ]
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
