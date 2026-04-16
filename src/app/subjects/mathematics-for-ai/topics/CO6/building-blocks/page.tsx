'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiPlay } from 'react-icons/fi'

const content = {
    title: 'AI Training Loop Code',
    explanationSections: [
        {
            title: '1️⃣ The Standard 5-Step Code Implementation',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Modern frameworks like PyTorch strictly handle the immensely complicated backward-pass calculus automatically using <code>loss.backward()</code>. Here is the beautifully simple conceptual flow that identically governs almost every neural network in existence:
                    </p>

                    <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden text-sm">
                        <pre className="p-4 text-emerald-400 font-mono overflow-x-auto">
{`for epoch in range(NUM_EPOCHS):
   # 1. Forward Pass to Predict
   y_pred = model(X_train)
   
   # 2. Calculate Loss function (e.g., MSE or CrossEntropy)
   loss = criterion(y_pred, Y_true)
   
   # 3. Clear old tracked accumulated gradients
   optimizer.zero_grad()
   
   # 4. Backpropagation (Automatic Calculus Chain Rule)
   loss.backward()
   
   # 5. Gradient Descent Optimizer step!
   optimizer.step()
`}
                        </pre>
                    </div>
                    <ul className="list-decimal ml-6 space-y-2 text-gray-400 text-sm mt-4">
                        <li><strong>Forward:</strong> Push data rigidly through purely mathematical matrix transformations.</li>
                        <li><strong>Loss:</strong> Calculate exactly how wrong the prediction vector mathematically was at the very end.</li>
                        <li><strong>Zero Grad:</strong> Reset the calculus memory so derivatives don't endlessly accumulate across batches.</li>
                        <li><strong>Backward:</strong> Traverse backwards applying the Chain Rule rigidly to attribute explicit exact mathematical blame to every individual weight.</li>
                        <li><strong>Step:</strong> Update the explicit weights in the precisely calculated opposite explicit direction of the gradient.</li>
                    </ul>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why specifically must we execute `optimizer.zero_grad()` explicitly before calling `loss.backward()` in popular AI PyTorch loops?",
            solution: "PyTorch systematically accumulates explicitly and mathematically adds gradients strictly across multiple backward passes by explicit pure structural design (useful perfectly for Recurrent Networks). If we don't manually clear the purely stored gradients, the explicitly new batch explicitly calculates exactly upon identically explicitly accumulated expressly corrupted mathematical derivatives."
        }
    ],
    exampleProblems: [
        {
            problem: "Identify explicitly which line mathematically updates identically uniquely specifically the explicit network parameters logically structurally.",
            solution: "optimizer.step()",
            steps: [
                {
                    step: 'Understand the Optimizer engine',
                    explanation: 'The loss.backward() strictly recursively solely calculates perfectly identically exactly the mathematical gradients. The optimizer identically specifically uses exactly those perfectly explicitly computed gradient vectors logically structurally to specifically adjust directly exactly those weights uniquely relying fully on explicit defined parameters exactly like identically learning identically identical rate metrics explicitly specifically structurally exactly precisely identical.'
                }
            ]
        }
    ]
}

export default function BuildingBlocksPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
