'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBox, FiLayers, FiMinimize } from 'react-icons/fi'

const content = {
    title: 'Tensors & Shapes',
    explanationSections: [
        {
            title: '1️⃣ Understanding Dimensions',
            icon: <FiBox className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A Tensor is a mathematical object that generalizes scalars, vectors, and matrices to higher dimensions. It is the fundamental data structure in Deep Learning.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-800 p-4 border border-blue-500 rounded text-sm text-center text-gray-300">
                            <strong>0D Tensor</strong><br/>Scalar (Magnitude)
                        </div>
                        <div className="bg-slate-800 p-4 border border-green-500 rounded text-sm text-center text-gray-300">
                            <strong>1D Tensor</strong><br/>Vector (Array)
                        </div>
                        <div className="bg-slate-800 p-4 border border-purple-500 rounded text-sm text-center text-gray-300">
                            <strong>2D Tensor</strong><br/>Matrix (Table)
                        </div>
                        <div className="bg-slate-800 p-4 border border-rose-500 rounded text-sm text-center text-gray-300">
                            <strong>3D Tensor</strong><br/>Data Cube (Image RGB)
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Tensor Operations & Broadcasting',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Tensors can be mathematically manipulated. Basic operations like addition and multiplication require matching shapes. If shapes do not rigidly match, frameworks automatically apply <strong>Broadcasting</strong> to expand the smaller tensor across the larger one.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg text-sm border-l-4 border-indigo-500 font-mono text-gray-200">
                        {"$ \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} + 5 = \\begin{bmatrix} 1+5 \\\\ 2+5 \\end{bmatrix} = \\begin{bmatrix} 6 \\\\ 7 \\end{bmatrix} $"}
                    </div>
                    <p className="text-gray-400 text-sm">Here the scalar 5 is "broadcasted" into a 2x1 tensor behind the scenes.</p>
                </div>
            )
        },
        {
            title: '3️⃣ Tensor Dimensions in Vision',
            icon: <FiMinimize className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A single colored image is represented as a 3D Tensor: <code className="text-pink-400 font-bold">(Height, Width, Channels)</code>. For instance, a 1080p image is <code>(1080, 1920, 3)</code> where 3 indicates Red, Green, and Blue intensities. A batch of 32 such images processed together by a GPU becomes a <strong>4D Tensor</strong>: <code>(32, 1080, 1920, 3)</code>.
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "What is the rank (dimension) of a single grayscale image tensor vs an RGB colored image tensor?",
            solution: "A grayscale image is a 2D Tensor (Height x Width) because it only needs 1 channel for intensity. An RGB image is a 3D Tensor (Height x Width x 3 channels)."
        },
        {
            question: "How do hardware accelerators like GPUs benefit from Tensorial data structures?",
            solution: "Tensors force data into unified, massive blocks of numerical arrays that can be operated on simultaneously via immense parallel processing, instead of looping through individual elements in Python."
        }
    ],
    exampleProblems: [
        {
            problem: 'Add Matrix A: {"$ \\begin{bmatrix} 2 & 2 \\\\ 3 & 3 \\end{bmatrix} $"} and Vector B: {"$ [1, 2] $"} via broadcasting along rows.',
            solution: '{"$ \\begin{bmatrix} 3 & 4 \\\\ 4 & 5 \\end{bmatrix} $"}',
            steps: [
                {
                    step: 'Understand Broadcasting',
                    explanation: 'The 1D vector B is replicated to form a 2x2 matrix {"$ \\begin{bmatrix} 1 & 2 \\\\ 1 & 2 \\end{bmatrix} $"} to match A.'
                },
                {
                    step: 'Element-wise Addition',
                    explanation: 'Top row: 2+1=3, 2+2=4. Bottom row: 3+1=4, 3+2=5.'
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
