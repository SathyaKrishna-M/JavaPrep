'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMaximize, FiCpu, FiCamera, FiEye } from 'react-icons/fi'

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
    title: 'Eigenvalues, PCA & Tensors',
    explanationSections: [
        {
            title: '1️⃣ Eigenvalues & Eigenvectors',
            icon: <FiMaximize className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        When a matrix multiplies a vector, it typically changes both magnitude and direction. but for certain <strong>special vectors</strong>, the direction remains the same—only the magnitude is scaled.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border-l-4 border-indigo-500 font-mono text-gray-200">
                        {"$\\( A\\mathbf{x} = \\lambda\\mathbf{x} \\)$"}
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>{"$\\( \\mathbf{x} \\)$"} (Eigenvector):</strong> The non-zero vector whose direction does not change.</li>
                        <li><strong>{"$\\( \\lambda \\)$"} (Eigenvalue):</strong> The scaling factor.</li>
                    </ul>
                    <p className="text-gray-300 mt-4 font-bold text-indigo-400">The Characteristic Equation</p>
                    <p className="text-gray-400 text-sm">
                        To find eigenvalues, we solve {"$\\( \\det(A - \\lambda I) = 0 \\)$"}. For a 2x2 matrix, this expands to:<br/>
                        <span className="font-mono text-rose-300 mt-2 block">{"$\\( \\lambda^2 - \\lambda(\\text{Trace of } A) + \\det(A) = 0 \\)$"}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ Principal Component Analysis (PCA)',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>PCA</strong> is a statistical dimensionality reduction technique. It transforms correlated variables into uncorrelated variables called principal components, ordered by the variation they retain.
                    </p>
                    <div className="bg-slate-800 p-4 border border-purple-500 rounded text-sm text-gray-300">
                        Mathematically, Principal Components are the <strong>eigenvectors of the covariance matrix</strong> of the data, and the <strong>eigenvalues represent the amount of variance</strong> explained by each component. Large eigenvalues mean the pattern is highly important; small eigenvalues represent noise.
                    </div>
                </div>
            )
        },
        {
            title: '3️⃣ Case Study: Face Recognition (Eigenfaces)',
            icon: <FiCamera className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A university wants to build a secure access system processing 64x64 pixel faces. Storing and matching raw 4096-dimensional vectors is slow and redundant. We use PCA (Eigenfaces).
                    </p>
                    <ol className="list-decimal ml-6 space-y-2 text-gray-400 text-sm">
                        <li><strong className="text-white">Vectorization:</strong> Flatten the 64x64 image into a 4096-dimensional column vector.</li>
                        <li><strong className="text-white">Mean Subtraction:</strong> Compute the "mean face" across all training images and subtract it to center the dataset.</li>
                        <li><strong className="text-white">Covariance Matrix:</strong> Compute {"$\\( C = \\frac{1}{n} X_{\\text{centered}}^T X_{\\text{centered}} \\)$"} to capture pixel relationships.</li>
                        <li><strong className="text-white">Eigen Decomposition:</strong> Solve {"$\\( CX = \\lambda X \\)$"}. The Eigenvectors are the <em>Eigenfaces</em> (facial patterns: eyes, nose structures).</li>
                        <li><strong className="text-white">Feature Selection:</strong> Sort by Eigenvalues. Drop the small eigenvalue components. Project faces into this k-D Eigenspace.</li>
                    </ol>
                    <p className="text-gray-300 mt-4">
                        To test a new face, we subtract the mean, project it into the Eigenspace, and find the minimum distance to recognized training faces. Accuracy is heavily increased with tiny memory footprint.
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "In Principal Component Analysis (PCA), what do the Eigenvalues of the covariance matrix represent?",
            solution: "The Eigenvalues represent the amount of variance (information) captured by their corresponding Eigenvector (Principal Component). Dropping small eigenvalues eliminates noise."
        },
        {
            question: 'What is the characteristic equation used to solve the eigenvalues for a 2x2 matrix?',
            solution: '{"$\\( \\lambda^2 - \\lambda(\\text{Trace}) + \\det = 0 \\)$"}'
        }
    ],
    exampleProblems: [
        {
            problem: 'Calculate the characteristics equation and eigenvalues for Matrix A = {"$\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$"}',
            solution: "Eigenvalues are 1 and 3.",
            steps: [
                {
                    step: 'Find Trace and Determinant',
                    explanation: 'Trace = 2 + 2 = 4. Det = (2)(2) - (1)(1) = 3.'
                },
                {
                    step: 'Formulate Equation',
                    explanation: '{"$\\( \\lambda^2 - 4\\lambda + 3 = 0 \\)$"}.'
                },
                {
                    step: 'Solve for Lambda',
                    explanation: 'Factoring gives {"$\\( (\\lambda - 1)(\\lambda - 3) = 0 \\)$"}, so {"$\\( \\lambda = 1 \\)$"} and {"$\\( \\lambda = 3 \\)$"}.'
                }
            ]
        }
    ]
}

export default function TensorsShapesPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
