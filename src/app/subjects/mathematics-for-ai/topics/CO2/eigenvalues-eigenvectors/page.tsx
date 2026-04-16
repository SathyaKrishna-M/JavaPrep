'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMaximize, FiActivity } from 'react-icons/fi'

const content = {
    title: 'Eigenvalues & Eigenvectors',
    explanationSections: [
        {
            title: '1️⃣ The Unchanging Directions',
            icon: <FiMaximize className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        When a matrix multiplies a vector, it typically changes both magnitude and direction. but for certain <strong>special vectors</strong>, the direction remains fundamentally unchanged—only the magnitude is scaled.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border-l-4 border-indigo-500 font-mono text-gray-200">
                        {"$ A\\mathbf{x} = \\lambda\\mathbf{x} $"}
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>{"$ \\mathbf{x} $"} (Eigenvector):</strong> The non-zero vector whose direction does not change under transformation.</li>
                        <li><strong>{"$ \\lambda $"} (Eigenvalue):</strong> The scaling factor by which it is stretched, shrunk or reversed.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '2️⃣ The Characteristic Equation',
            icon: <FiActivity className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        To find eigenvalues mathematically, we rearrange the equation to {"$ (A - \\lambda I)\\mathbf{x} = 0 $"}. Since {"$ \\mathbf{x} $"} cannot be zero, the determinant must be absolutely zero: {"$ \\det(A - \\lambda I) = 0 $"}.
                    </p>
                    <div className="bg-slate-800 p-4 rounded font-mono text-sm text-center text-gray-300 border border-gray-700">
                        For a 2x2 matrix:<br/>
                        <span className="text-pink-400 mt-2 block">{"$ \\lambda^2 - \\lambda(\\text{Trace of } A) + \\det(A) = 0 $"}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">
                        The Roots of this characteristic equation are the eigenvalues. To find the corresponding eigenvectors, you plug the lambda roots back into the equation.
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: 'What is the characteristic equation used to solve the eigenvalues for a 2x2 matrix?',
            solution: '$ \\lambda^2 - \\lambda(\\text{Trace}) + \\det = 0 $'
        },
        {
            question: "Why do we care about eigenvectors in AI?",
            solution: "Eigenvectors represent the fundamental axes of data variation. If a dataset is stretched significantly along an eigenvector with a huge eigenvalue, that axis carries immense information (signal), while tiny eigenvalues represent noise."
        }
    ],
    exampleProblems: [
        {
            problem: 'Calculate the characteristics equation and eigenvalues for Matrix A = $ \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix} $',
            solution: "Eigenvalues are 1 and 3.",
            steps: [
                {
                    step: 'Find Trace and Determinant',
                    explanation: 'Trace = 2 + 2 = 4. Det = (2)(2) - (1)(1) = 3.'
                },
                {
                    step: 'Formulate Equation',
                    explanation: '$ \\lambda^2 - 4\\lambda + 3 = 0 $.'
                },
                {
                    step: 'Solve for Lambda',
                    explanation: 'Factoring gives $ (\\lambda - 1)(\\lambda - 3) = 0 $, so $ \\lambda = 1 $ and $ \\lambda = 3 $.'
                }
            ]
        }
    ]
}

export default function EigenvaluesPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
