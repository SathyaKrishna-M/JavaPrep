'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTrendingDown, FiActivity, FiFastForward, FiAlertCircle } from 'react-icons/fi'

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
    title: 'Optimization, Momentum & Saddle Points',
    explanationSections: [
        {
            title: '1️⃣ Gradient Descent & Learning Rate',
            icon: <FiTrendingDown className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Optimization in machine learning is the process of minimizing an objective function (Loss) by adjusting model parameters. We do this by moving in the direction of the <strong>steepest descent</strong> (negative gradient).
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border-l-4 border-indigo-500 font-mono text-gray-200">
                        {"$\\theta_{\\text{new}} = \\theta_{\\text{old}} - \\eta \\nabla L(\\theta_{\\text{old}})$"}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 border border-rose-500 rounded text-sm text-gray-300">
                            <strong>Large Learning Rate ({"$\\( \\eta \\)$"})</strong><br/>
                            Fast movement, but extremely high risk of <strong>overshooting</strong> the minimum. Can cause the model to diverge and never settle.
                        </div>
                        <div className="bg-slate-800 p-4 border border-green-500 rounded text-sm text-gray-300">
                            <strong>Small Learning Rate ({"$\\( \\eta \\)$"})</strong><br/>
                            Stable movement with less chance of overshooting, but extremely <strong>slow convergence</strong>. Can take too long to finish.
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Saddle Points & Narrow Valleys',
            icon: <FiAlertCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A <strong>Saddle Point</strong> is a location where the gradient is zero ({"$\\( \\nabla f(x^*) = 0 \\)$"}), but the point is neither a local minimum nor a maximum. It curves down in one direction and up in another.
                    </p>
                    <p className="text-gray-300 bg-slate-800 p-4 rounded border border-yellow-500">
                        <strong>Problem in Deep Learning:</strong> A highly elongated, bowl-shaped surface creates a "narrow valley". Standard gradient descent takes massive steps crossing the steep valley walls, while moving incredibly slowly along the flat valley floor. This results in heavy <strong>zig-zagging oscillations</strong>.
                    </p>
                </div>
            )
        },
        {
            title: '3️⃣ Momentum in Optimization',
            icon: <FiFastForward className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Inspired by physics, <strong>Momentum</strong> allows the algorithm to "remember" past gradients. Just like a heavy ball rolling down a valley builds velocity, Momentum averages out the zig-zagging and accelerates in the consistent downhill direction.
                    </p>
                    <div className="bg-slate-800 p-4 rounded font-mono text-sm text-center text-gray-300 border border-gray-700">
                        {"$v_{k+1} = \\beta v_k + \\eta \\nabla L(\\theta_k)$"}<br/>
                        {"$\\theta_{k+1} = \\theta_k - v_{k+1}$"}
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400 text-sm">
                        <li>{"$\\( \\beta \\)$"} is the momentum parameter (typically 0.9).</li>
                        <li>It accumulates gradients, drastically reducing oscillations in narrow valleys.</li>
                        <li>It allows the optimizer to blast past small local minima and saddle points.</li>
                    </ul>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why does standard Gradient Descent struggle in elongated, narrow valley loss surfaces?",
            solution: "Because the gradient is massive in the steep direction causing oscillations (zig-zags) across the walls, but the gradient is tiny along the valley floor, causing maddeningly slow convergence toward the actual minimum."
        },
        {
            question: "How does Momentum solve the oscillation problem?",
            solution: "Momentum acts as an exponentially weighted moving average of past gradients. The oscillating steep gradients cancel each other out over time, while the consistent gradients pointing down the valley accumulate, smoothing out the descent path."
        }
    ],
    exampleProblems: [
        {
            problem: "Given momentum parameter β = 0.9, learning rate η = 0.1, current gradient = 2, and previous velocity = 1. What is the new velocity?",
            solution: "1.1",
            steps: [
                {
                    step: 'Apply Momentum Update Rule',
                    explanation: '{"$\\( v = \\beta(v_{\\text{old}}) + \\eta(\\text{gradient}) \\)$"}'
                },
                {
                    step: 'Substitute values',
                    explanation: '{"$\\( v = 0.9(1) + 0.1(2) \\)$"} = 0.9 + 0.2 = 1.1'
                }
            ]
        }
    ]
}

export default function OptimizationBasicsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
