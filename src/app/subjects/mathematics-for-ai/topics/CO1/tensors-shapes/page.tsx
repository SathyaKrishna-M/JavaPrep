'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayers, FiBox, FiTrendingUp } from 'react-icons/fi'
import { FaCubes } from 'react-icons/fa'

const content = {
    title: 'Tensors & Shapes',
    explanationSections: [
        {
            title: '1️⃣ What is a Tensor?',
            icon: <FaCubes className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        In Physics, tensors are complex geometric objects. In AI/CS, a Tensor is simply a <span className="text-indigo-400 font-semibold">multi-dimensional array</span>.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm bg-slate-800/30 p-4 rounded-lg">
                        <li><strong>0D Tensor:</strong> Scalar (Magnitude)</li>
                        <li><strong>1D Tensor:</strong> Vector (List)</li>
                        <li><strong>2D Tensor:</strong> Matrix (Table/Grayscale Image)</li>
                        <li><strong>3D Tensor:</strong> RGB Image (Height, Width, Channels)</li>
                        <li><strong>4D Tensor:</strong> Batch of Images (Batch Size, H, W, C)</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '2️⃣ Tensor Shapes & Broadcasting',
            icon: <FiBox className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The "Shape" tells you how many dimensions and how large they are (e.g., [64, 3, 224, 224]).
                    </p>
                    <div className="bg-indigo-900/10 p-4 rounded border border-indigo-500/20">
                        <h4 className="text-indigo-300 font-semibold mb-2">Broadcasting (Intuition)</h4>
                        <p className="text-gray-300 text-sm">
                            Deep Learning frameworks are smart. If you try to add a scalar (1D) to a matrix (2D), the framework "stretches" (broadcasts) the scalar to match the matrix shape so the operation works.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ AI Relevance: PyTorch / TensorFlow',
            icon: <FiLayers className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Modern libraries like PyTorch and TensorFlow are essentially "Numpy on steroids" (GPU accelerated). They operate almost exclusively on Tensors.
                    </p>
                    <p className="text-gray-300 text-sm">
                        Debugging deep learning models is 90% checking tensor shapes. If your shapes don't align (e.g., trying to multiply [32, 100] with [50, 10]), your code crashes.
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why do we use the 'Batch Dimension'?",
            solution: "Training on one sample at a time is slow (inefficient use of GPU parallelism) and noisy. We stack multiple samples into a 'batch' (4D tensor for images) to process them simultaneously.",
        },
        {
            question: "If a tensor has shape [10, 5] and another has shape [5, 2], what is the shape of their matrix product?",
            solution: "The result will be [10, 2]. The inner dimensions (5 and 5) must match, and they 'cancel out' to leave the outer dimensions.",
        }
    ],
    exampleProblems: [],
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
