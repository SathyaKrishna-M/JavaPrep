'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiBox, FiCpu } from 'react-icons/fi'
import { FaTools, FaCogs } from 'react-icons/fa'

const content = {
    title: 'Mathematical Construction of AI Blocks',
    explanationSections: [
        {
            title: '1️⃣ Forward Pass',
            icon: <FiArrowRight className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The journey of data from input to output.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm text-green-300">
                        y = Activation( W · x + b )
                    </div>
                    <p className="text-gray-300 text-sm">
                        Where W is the weight matrix, x is the input, b is the bias, and Activation is a non-linear function (like ReLU).
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ Manual Gradient Computation',
            icon: <FaTools className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Understanding "Backpropagation" by doing it by hand using the Chain Rule.
                    </p>
                    <p className="text-gray-300 text-sm">
                        If y = f(u) and u = g(x), then dy/dx = dy/du * du/dx. This simple rule allows us to propagate errors back through deep networks.
                    </p>
                </div>
            ),
        },
        {
            title: '3️⃣ Building a Neural Network from Scratch',
            icon: <FaCogs className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The ultimate test of understanding. Implementing a simple Multi-Layer Perceptron (MLP) using only NumPy (or basic lists).
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm">
                        <li>Initialize Weights (Randomly)</li>
                        <li>Forward Pass (Prediction)</li>
                        <li>Calculate Loss (Error)</li>
                        <li>Backward Pass (Gradients)</li>
                        <li>Update Weights (Optimization)</li>
                    </ul>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "What is the purpose of the Bias term 'b' in Wx + b?",
            solution: "Without bias, the neuron 'activates' only based on the angle of the input. Bias allows the activation function to shift left or right, effectively setting a 'threshold' for activation.",
        },
        {
            question: "Why do we initialize weights randomly instead of setting them all to zero?",
            solution: "If all weights are zero (or identical), all neurons in a layer will learn the exact same thing (symmetry). Random initialization breaks this symmetry.",
        },
        {
            question: "What is the 'Vanishing Gradient' problem?",
            solution: "In deep networks, gradients can become tiny as they are multiplied back through layers (especially with Sigmoid/Tanh functions), causing earlier layers to stop learning. ReLU helps mitigate this.",
        }
    ],
    exampleProblems: [],
}

import { FiArrowRight } from 'react-icons/fi'

export default function BuildingBlocksPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
