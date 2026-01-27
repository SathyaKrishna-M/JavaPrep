'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGrid, FiActivity, FiLayers, FiCpu } from 'react-icons/fi'
import { FaShapes, FaCalculator, FaNetworkWired } from 'react-icons/fa'

const content = {
    title: 'Vectors, Matrices & Tensors in AI',
    explanationSections: [
        {
            title: 'BTL-2: Understand Fundamental Objects',
            icon: <FaShapes className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        To build AI, we first need to understand the mathematical objects used to represent data. These are the containers that hold the world's information.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-blue-500/20">
                            <h4 className="text-blue-300 font-bold mb-2">Vectors (1D)</h4>
                            <div className="text-gray-400 text-sm mb-2">An ordered list of numbers representing a single data point's features.</div>
                            <code className="bg-black/30 px-2 py-1 rounded text-green-300 text-xs block text-center">[Height, Weight, Age]</code>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                            <h4 className="text-purple-300 font-bold mb-2">Matrices (2D)</h4>
                            <div className="text-gray-400 text-sm mb-2">A grid of numbers representing a dataset or an image.</div>
                            <div className="flex justify-center">
                                <span className="text-xs bg-black/30 p-2 rounded font-mono text-purple-200">
                                    [ [255, 0],<br />
                                    &nbsp;&nbsp;[0, 255] ]
                                </span>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-orange-500/20">
                            <h4 className="text-orange-300 font-bold mb-2">Tensors (N-D)</h4>
                            <div className="text-gray-400 text-sm mb-2">Multi-dimensional arrays generalizing vectors and matrices.</div>
                            <div className="text-center text-xs text-orange-200 mt-2">batch_size × channels × height × width</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'BTL-3: Apply Operations for Computation',
            icon: <FaCalculator className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Once we have data in these objects, we apply operations to compute outputs. This is the "thinking" part of an AI model.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-indigo-900/10 p-4 rounded-lg border border-indigo-500/20">
                            <h5 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2"><FiActivity /> Dot Product</h5>
                            <p className="text-sm text-gray-400 mb-2">Calculates similarity between two vectors.</p>
                            <code className="block bg-black/30 p-2 rounded text-xs text-green-300">Similarity = A · B</code>
                        </div>
                        <div className="bg-pink-900/10 p-4 rounded-lg border border-pink-500/20">
                            <h5 className="text-pink-300 font-semibold mb-2 flex items-center gap-2"><FiLayers /> Matrix Multiplication</h5>
                            <p className="text-sm text-gray-400 mb-2">Transforms input vectors into new representations (e.g., layers in a Neural Net).</p>
                            <code className="block bg-black/30 p-2 rounded text-xs text-green-300">Output = Input × Weights</code>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'BTL-4: Analyze Structural Roles',
            icon: <FaNetworkWired className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        We must analyze <strong>why</strong> these structures shape model behavior. The structure (shape) of the data dictates the architecture of the model.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 bg-slate-800/30 p-4 rounded-lg">
                        <li><strong>Shape Compatibility:</strong> A model designed for 10-feature vectors cannot process a 100-pixel image without reshaping.</li>
                        <li><strong>Linear Transformations:</strong> Matrices stretch, rotate, and skew the data space, allowing the model to "separate" classes (e.g., cats vs dogs).</li>
                        <li><strong>Broadcasting:</strong> Tensors allow efficient parallel processing of batches, shaping the speed and throughput of AI training.</li>
                    </ul>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why is a matrix used to represent a grayscale image?",
            solution: "A grayscale image is a 2D grid of pixels. A matrix provides a direct mathematical structure (rows for height, columns for width) where each element stores the pixel intensity.",
        },
        {
            question: "Apply the Dot Product: Calculate A · B given A=[2, 0, 1] and B=[3, 5, 2].",
            solution: "(2*3) + (0*5) + (1*2) = 6 + 0 + 2 = 8.",
        },
        {
            question: "Analyze: How does matrix multiplication fundamentally change a vector?",
            solution: "It transforms the vector from one dimensional space to another. It can change its direction (rotation), magnitude (scaling), and even its dimensionality (projection), effectively 'extracting' new features.",
        }
    ],
    exampleProblems: [
        {
            problem: "BTL-3: Basic Computation",
            solution: "Vector y = [3, 7]",
            steps: [
                {
                    step: "Problem",
                    explanation: "Given Input x = [1, 2], Weights W = [[1, 1], [0, 1]], and Bias b = [2, 3]. Calculate y = Wx + b."
                },
                {
                    step: "Matrix-Vector Multiplication (Wx)",
                    explanation: "[ (1*1 + 1*2), (0*1 + 1*2) ] = [3, 2]"
                },
                {
                    step: "Add Bias (+b)",
                    explanation: "[3, 2] + [2, 3] = [5, 5] (Correction: 1*1+1*2 = 3, 0*1+1*2=2. Result is [3,2]. Add bias [2,3] -> [5,5]. Wait, let's re-verify simple math example for user clarity. Let's start with very simple identity. W=[[1,0],[0,1]] -> Wx=[1,2]. + b=[2,3] = [3,5]. Let's stick to the prompt values. Wx = [1(1)+1(2), 0(1)+1(2)] = [3, 2]. [3,2] + [2,3] = [5, 5]. Correct."
                },
                {
                    step: "Result",
                    explanation: "The transformed vector is [5, 5]."
                }
            ]
        },
        {
            problem: "BTL-4: Structural Analysis",
            solution: "Shape Mismatch Error",
            steps: [
                {
                    step: "Scenario",
                    explanation: "You have a matrix A of shape (3, 2) and a vector x of shape (3, 1). You try to compute A multiplied by x (Matrix-Vector product)."
                },
                {
                    step: "Analysis",
                    explanation: "Matrix multiplication rules state that inner dimensions must match. (3, 2) × (3, 1). The '2' and '3' do not match."
                },
                {
                    step: "Conclusion",
                    explanation: "The operation is mathematically undefined and will cause a runtime error in any AI framework. The vector x represents data with 3 features, but the matrix A expects input with 2 features."
                }
            ]
        }
    ],
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
