'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCamera, FiCpu, FiGrid } from 'react-icons/fi'

const content = {
    title: 'Principal Component Analysis',
    explanationSections: [
        {
            title: '1️⃣ Defining PCA',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>Principal Component Analysis (PCA)</strong> is a statistical dimensionality reduction technique. It transforms a massive, highly correlated dataset into completely uncorrelated variables called Principal Components. 
                    </p>
                    <div className="bg-slate-800 p-4 border border-purple-500 rounded text-sm text-gray-300">
                        Mathematically, Principal Components are the exact <strong>eigenvectors of the covariance matrix</strong> of the input data, and the <strong>eigenvalues represent the amount of variance</strong> explained by each component. Large eigenvalues correspond to the most critical patterns; small eigenvalues correspond to noise to be discarded.
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Case Study: Face Recognition (Eigenfaces)',
            icon: <FiCamera className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A secure access system processes 64x64 pixel faces. Storing and matching raw 4096-dimensional vectors is impossibly slow and horribly redundant. We use PCA (Eigenfaces Method).
                    </p>
                    <ol className="list-decimal ml-6 space-y-2 text-gray-400 text-sm">
                        <li><strong className="text-white">Vectorization:</strong> Flatten the 64x64 image into a 4096-dimensional column vector.</li>
                        <li><strong className="text-white">Mean Subtraction:</strong> Compute the "mean face" across all training images and subtract it to center the dataset around the origin.</li>
                        <li><strong className="text-white">Covariance Matrix:</strong> Compute {"$ C = \\frac{1}{n} X_{\\text{centered}}^T X_{\\text{centered}} $"} to capture complex pixel relationships.</li>
                        <li><strong className="text-white">Eigen Decomposition:</strong> Solve {"$ CX = \\lambda X $"}. The resulting Eigenvectors are the <em>Eigenfaces</em> (fundamental facial patterns: eyes, nose structures).</li>
                        <li><strong className="text-white">Feature Selection:</strong> Sort by Eigenvalues. Drop all the tiny eigenvalue components. Project faces into this newly compressed k-D Eigenspace.</li>
                    </ol>
                </div>
            )
        },
        {
            title: '3️⃣ Projection and Matching',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        To test a brand new face:
                        <br/>
                        1. Center it by subtracting the training mean.
                        <br/>
                        2. Multiply it by the top Eigenfaces to compress it from 4096 dimensions down to roughly 100 dimensions.
                        <br/>
                        3. Find the lowest mathematical distance to the recognized training faces. Accuracy skyrockets while memory footprint collapses.
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "In Principal Component Analysis (PCA), what do the Eigenvalues of the covariance matrix represent?",
            solution: "The Eigenvalues quantitatively represent the exact amount of variance (information) captured by their corresponding Eigenvector (Principal Component). Dropping small eigenvalues cleanly eliminates noise."
        },
        {
            question: "Why do we subtract the 'Mean Face' across the entire dataset?",
            solution: "Mean subtraction centers the dataset exactly around the origin in the mathematical coordinate space, which is an absolute mathematical requirement before computing the Covariance Matrix for variance extraction."
        }
    ],
    exampleProblems: [
        {
            problem: 'You have a 100x100 pixel facial image database. What is the raw starting dimension before PCA?',
            solution: "10,000 dimensions.",
            steps: [
                {
                    step: 'Flattening',
                    explanation: 'A 100x100 2D matrix is flattened column-by-column into a 1D Vector, resulting in 10,000 numerical elements (pixels) per face.'
                }
            ]
        }
    ]
}

export default function PrincipalComponentAnalysisPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
