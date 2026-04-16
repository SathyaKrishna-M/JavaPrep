'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBookOpen, FiImage, FiTrendingUp, FiCrosshair } from 'react-icons/fi'

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
    title: 'Vectors as Data Representations',
    explanationSections: [
        {
            title: '1️⃣ Definition of Vectors in n-Dimensional Space',
            icon: <FiBookOpen className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A vector in {"$\\( \\mathbb{R}^n \\)$"} is formally defined as an ordered n-tuple of real numbers.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border-l-4 border-indigo-500 font-mono text-gray-200">
                        {"$\\( \\mathbf{x} = (x_1, x_2, x_3, \\dots , x_n), \\text{ where } x_i \\in \\mathbb{R} \\)$"}
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>Dimension (n):</strong> A positive integer indicating the space the vector lives in (e.g., 2D, 3D).</li>
                        <li><strong>Component:</strong> Each {"$\\( x_i \\)$"} is called a component or coordinate.</li>
                    </ul>
                    <p className="text-gray-300 font-bold mt-4">Geometric vs Algebraic Interpretation</p>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>Geometric ({"$\\( \\mathbb{R}^2 \\)"} / {"$\\( \\mathbb{R}^3 \\)"}):</strong> Represents a physical point or a directed line segment (arrow) in space.</li>
                        <li><strong>Algebraic ({"$\\( \\mathbb{R}^n, n > 3 \\)"}):</strong> Vectors in higher-dimensional spaces cannot be visualized directly but are manipulated algebraically. They are the core of AI feature tracking.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '2️⃣ Vector Operations: Addition & Scalar Multiplication',
            icon: <FiTrendingUp className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A space only qualifies as a "Vector Space" if it is equipped with Vector Addition and Scalar Multiplication.
                    </p>
                    <h4 className="font-bold text-indigo-400">Vector Addition in {"$\\( \\mathbb{R}^n \\)"}</h4>
                    <p className="text-gray-400">
                        Let {"$\\( \\mathbf{u} = (x_1, \\dots, x_n) \\)$"} and {"$\\( \\mathbf{v} = (y_1, \\dots, y_n) \\)$"}. Their sum is computed component-wise:
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg flex justify-center items-center font-mono text-white text-sm">
                        {"$\\mathbf{u} + \\mathbf{v} = (x_1 + y_1, \\dots, x_n + y_n)$"}
                    </div>
                    <p className="text-gray-400 text-sm italic">Example: A drone flies 3 km east and 4 km north. The displacement is {"$\\( (3, 4) \\)$"}.</p>
                </div>
            )
        },
        {
            title: '3️⃣ Vector Norms & Distance',
            icon: <FiCrosshair className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The <strong>Euclidean Norm</strong> represents the magnitude or length of a vector.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg text-center font-mono text-white text-sm border border-slate-700">
                        {"$\\| \\mathbf{v} \\| = \\sqrt{\\sum_{i=1}^{n} y_i^2}$"}
                    </div>

                    <VisualCard title="Norm Calculation Code">
                        <div className="w-full text-left bg-slate-900 border border-slate-700 rounded p-4 font-mono text-sm">
                            <span className="text-pink-400">import</span> numpy <span className="text-pink-400">as</span> np<br/><br/>
                            <span className="text-gray-500"># Let v = (1, -2, 2, 1)</span><br/>
                            v = np.array([1, -2, 2, 1])<br/>
                            <br/>
                            <span className="text-gray-500"># Euclidean Norm (L2)</span><br/>
                            norm = np.linalg.norm(v)<br/>
                            <span className="text-blue-400">print</span>(norm) <span className="text-gray-500"># Output: sqrt(1 + 4 + 4 + 1) = sqrt(10) = 3.16</span>
                        </div>
                    </VisualCard>
                </div>
            )
        },
        {
            title: '4️⃣ Projections',
            icon: <FiImage className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The projection of a vector {"$\\( \\mathbf{u} \\)$"} onto another vector {"$\\( \\mathbf{v} \\)$"} is the vector component of {"$\\( \\mathbf{u} \\)$"} that perfectly lines up with {"$\\( \\mathbf{v} \\)$"}.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg text-center font-mono text-white text-sm">
                        {"$\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\left( \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\mathbf{v} \\cdot \\mathbf{v}} \\right) \\mathbf{v}$"}
                    </div>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: 'Find the Euclidean norm of {"$\\( \\mathbf{v} = (1, -2, 2, 1) \\)$"}.',
            solution: 'The norm is {"$\\( \\sqrt{1^2 + (-2)^2 + 2^2 + 1^2} = \\sqrt{1 + 4 + 4 + 1} = \\sqrt{10} \\approx 3.16 \\)$"}.'
        },
        {
            question: 'Let {"$\\( \\mathbf{v} = (x, 2x, 3x) \\)$"}. Find {"$\\( \\| \\mathbf{v} \\| \\)$"} in terms of x.',
            solution: '{"$\\( \\sqrt{x^2 + (2x)^2 + (3x)^2} = \\sqrt{x^2 + 4x^2 + 9x^2} = \\sqrt{14x^2} = |x|\\sqrt{14} \\)$"}.'
        }
    ],
    exampleProblems: [
        {
            problem: 'Three feature embeddings are {"$\\( e_1 = (1,2,3), e_2 = (2,-1,1), e_3 = (-1,1,2) \\)$"}. Find the combined embedding vector and its magnitude.',
            solution: 'Combined embedding = (2, 2, 6). Magnitude = 6.63.',
            steps: [
                {
                    step: 'Add the vectors component-wise',
                    explanation: '{"$\\( R = (1+2-1)i + (2-1+1)j + (3+1+2)k = (2, 2, 6) \\)$"}'
                },
                {
                    step: 'Calculate Magnitude',
                    explanation: '{"$\\( |R| = \\sqrt{2^2 + 2^2 + 6^2} = \\sqrt{4 + 4 + 36} = \\sqrt{44} \\approx 6.63 \\)$"}'
                }
            ]
        }
    ]
}

export default function VectorsDataRepresentationPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
