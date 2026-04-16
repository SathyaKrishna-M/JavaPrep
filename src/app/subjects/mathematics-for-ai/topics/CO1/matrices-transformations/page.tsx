'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGrid, FiLayers, FiActivity, FiCpu } from 'react-icons/fi'

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
    title: 'Linear Independence, Rank & Basis',
    explanationSections: [
        {
            title: '1️⃣ Linearly Independent & Dependent Vectors',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A set of vectors is <strong>linearly independent</strong> if no vector in the set can be written as a combination of the others. Mathematically, the only way to write:
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border-l-4 border-indigo-500 font-mono text-gray-200">
                        {"$\\( c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + \\dots + c_n\\mathbf{v}_n = \\mathbf{0} \\)$"}
                    </div>
                    <p className="text-gray-300">
                        is when {"$\\( c_1 = c_2 = \\dots = c_n = 0 \\)$"}.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 border border-green-500 rounded text-sm text-gray-300">
                            <strong>Independent Example</strong><br/>
                            {"$\\( \\mathbf{v}_1 = (1,0), \\mathbf{v}_2 = (0,1) \\)$"}<br/>
                            They point in orthogonal directions. You cannot make (0,1) by scaling (1,0).
                        </div>
                        <div className="bg-slate-800 p-4 border border-rose-500 rounded text-sm text-gray-300">
                            <strong>Dependent Example</strong><br/>
                            {"$\\( \\mathbf{v}_1 = (1,2), \\mathbf{v}_2 = (2,4) \\)$"}<br/>
                            Since {"$\\( \\mathbf{v}_2 = 2\\mathbf{v}_1 \\)$"}, they are dependent. They carry redundant information.
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Rank of a Matrix & Basis',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The <strong>Rank</strong> of a matrix is the maximum number of linearly independent rows or columns. It represents the amount of non-redundant information in a dataset.
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>Rank = dimension of the column space</strong></li>
                        <li><strong>High Rank:</strong> More independent info.</li>
                        <li><strong>Low Rank:</strong> Redundancy present.</li>
                    </ul>
                    <p className="text-gray-300 mt-4">
                        A <strong>Basis</strong> is the minimum set of vectors needed to represent all vectors in the space. They must be independent AND span the space.
                    </p>
                </div>
            )
        },
        {
            title: '3️⃣ Case Study: Removing Redundant Sensors in Smart City AQI',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A smart city uses sensors to record six features every hour. We want to reduce storage by dropping redundant features without losing info.
                    </p>
                    <ol className="list-decimal ml-6 space-y-2 text-gray-400 text-sm">
                        <li>{"$\\( f_1 \\)$"}: Carbon Monoxide (CO)</li>
                        <li>{"$\\( f_2 \\)$"}: Nitrogen Oxides (NO)</li>
                        <li>{"$\\( f_3 \\)$"}: Air Quality Index (AQI) — <em>Computed from CO & NO</em></li>
                        <li>{"$\\( f_4 \\)$"}: Weighted pollution score — <em>Combination of AQI and pollutants</em></li>
                        <li>{"$\\( f_5 \\)$"}: Temperature</li>
                        <li>{"$\\( f_6 \\)$"}: Heat index — <em>Computed from Temperature</em></li>
                    </ol>
                    <div className="bg-slate-800 p-4 rounded text-sm text-gray-300">
                        <strong>Mathematical Solution:</strong><br/>
                        The vectors form a linearly dependent set. The <strong>Rank</strong> of this system is 3, meaning the true dimensionality is just 3. We choose a <strong>Basis</strong>: <code className="text-pink-400">{"$\\{f_1, f_2, f_5\\}$"}</code>. By keeping only these orthogonal base sensors, we drop {"$\\( f_3, f_4, f_6 \\)$"} and save 50% storage cost.
                    </div>
                </div>
            )
        },
        {
            title: '4️⃣ Case Study: Detecting Redundant Sensor Matrix Readings',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        An industrial system records data into Matrix A where each column is a sensor {"$\\( S_1, S_2, S_3, S_4 \\)$"}.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg flex justify-center items-center">
                         <div className="text-lg text-white font-mono">
                            {"$A = \\begin{bmatrix} 1 & 2 & 3 & 1 \\\\ 2 & 4 & 6 & 2 \\\\ 1 & 2 & 3 & 1 \\end{bmatrix}$"}
                         </div>
                    </div>
                    <p className="text-gray-300">
                        Observe that Col 2 = 2 * Col 1, Col 3 = 3 * Col 1, and Col 4 = Col 1. The <strong>Rank(A) = 1</strong>. Thus, sensors S2, S3, S4 are completely redundant. 1 sensor is sufficient!
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What does it signify if the Rank of a data matrix is much smaller than its number of columns?",
            solution: "It signifies that there is high redundancy/multicollinearity in the data. Many columns (features) can be expressed as linear combinations of others."
        },
        {
            question: 'Are vectors {"$\\( \\mathbf{v} = (1,2) \\)$"} and {"$\\( \\mathbf{w} = (2,-1) \\)$"} orthogonal?',
            solution: 'Yes. The dot product is {"$\\( (1)(2) + (2)(-1) = 2 - 2 = 0 \\)$"}. Orthogonal vectors represent non-overlapping information.'
        }
    ],
    exampleProblems: [
        {
            problem: 'Determine the rank of Matrix B: {"$\\begin{bmatrix} 1 & 0 & 2 \\\\ 0 & 1 & 3 \\\\ 0 & 0 & 0 \\end{bmatrix}$"}',
            solution: "Rank = 2.",
            steps: [
                {
                    step: 'Analyze the rows',
                    explanation: 'The first two rows are non-zero and independent. The third row is entirely zero.'
                },
                {
                    step: 'Conclusion',
                    explanation: 'There are exactly two independent directions. Therefore, Rank(B) = 2.'
                }
            ]
        }
    ]
}

export default function MatricesTransformationsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
