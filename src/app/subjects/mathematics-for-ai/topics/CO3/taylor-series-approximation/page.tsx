'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayers, FiMapPin, FiActivity } from 'react-icons/fi'

const content = {
    title: 'Taylor Series Approximation',
    explanationSections: [
        {
            title: '1️⃣ Maclaurin & Taylor Series for Two Variables',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The <strong>Taylor Series</strong> allows mathematicians and systems to approximate highly complex, non-linear equations iteratively using cleanly generated polynomials derived straight from partial derivatives.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm border-l-4 border-indigo-500 font-mono text-gray-200 overflow-x-auto">
                        {"$ f(x, y) \\approx f(a, b) + f_x(x-a) + f_y(y-b) + \\frac{1}{2}\\left( f_{xx}(x-a)^2 + 2f_{xy}(x-a)(y-b) + f_{yy}(y-b)^2 \\right) $"}
                    </div>
                    <p className="text-gray-400 text-sm mt-3">A Maclaurin Series is identical, but fixed exclusively at expansion point $ (a=0, b=0) $.</p>
                </div>
            ),
        },
        {
            title: '2️⃣ Case Study: GPS Position Estimation',
            icon: <FiMapPin className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        GPS satellites naturally compute ranging distances leveraging a highly non-linear geometric equation loaded with extreme square roots: $ r = \\sqrt&#123;(x-x_s)^2 + (y-y_s)^2&#125; $. Attempting to solve millions of these exact roots directly utterly stretches mobile smartphone processors.
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>Linearization Strategy:</strong> GPS positional networks mathematically expand the ranging formula tightly into a First-Order Taylor series.</li>
                        <li><strong>High Efficiency:</strong> Utilizing this systematically zeroes out repeated square-root bottlenecking, magically converting them perfectly to pure scalar/matrix-based additions.</li>
                        <li><strong>Iterative Precision:</strong> The receiver starts at an incredibly rough estimate $ (x_0, y_0) $ and converges massively to the true atomic location via rapid repeated linear approximations.</li>
                    </ul>
                </div>
            )
        },
        {
            title: '3️⃣ Examining Loss Curvature in Optimization',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>Mathematical Curvature</strong> dictates exactly how violently quickly the slope (gradient) of a loss function changes. The pure second-order terms of the Taylor Series (forming the Hessian matrix array) provide this paramount curvature telemetry.
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why do AI Optimization Algorithms structurally need to drastically adjust tuning rates heavily based on mathematical Curvature?",
            solution: "Because if the network geometry surface possesses incredibly high curvature (vertical steep narrow valleys), the isolated gradient violently spikes or alters trajectory instantly per step. A rigid, large numerical learning rate brutally overshoots the deep optimal minimum, comprehensively obliterating training stability."
        }
    ],
    exampleProblems: [
        {
            problem: 'If an advanced Taylor polynomial algorithm evaluates the isolated coefficient parameter of $ (w_1 - 1)^2 $ strictly as mathematically 1, and $ (w_2 - 1)^2 $ strictly as 4, what is the geometric shape of the loss surface?',
            solution: "It structurally forms a highly steep elliptical bowl.",
            steps: [
                {
                    step: 'Extrapolate Curve Variables',
                    explanation: 'The mathematical expression corresponding strictly to w2 has an exact coefficient multiplier mathematically 4x significantly larger than numerical w1.'
                },
                {
                    step: 'Determine True Curvature',
                    explanation: 'The loss descent consequently drops exactly 4x violently faster moving along w2 versus w1 (exhibiting steep vertical drops strictly across w2, flat wide slopes crossing w1).'
                }
            ]
        }
    ]
}

export default function TaylorSeriesPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
