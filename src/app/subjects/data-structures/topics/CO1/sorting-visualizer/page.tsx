'use client'

import DMTopicPage from '@/components/DMTopicPage'
import SortingVisualizer from '@/components/SortingVisualizer'
import { FiActivity, FiPlayCircle, FiEye } from 'react-icons/fi'

const content = {
    title: 'Sorting Visualizer',
    explanationSections: [
        {
            title: '1️⃣ Algorithm Lab',
            icon: <FiEye className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Welcome to the <strong>interactive sorting lab</strong>! Use the controls below to visualize how different sorting algorithms process data step-by-step.
                    </p>

                    <div className="my-6">
                        <SortingVisualizer />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h4 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                                <FiPlayCircle /> How to use?
                            </h4>
                            <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                                <li>Select an algorithm from the dropdown.</li>
                                <li>Adjust the speed slider (Right is faster).</li>
                                <li>Click <strong>Play</strong> to start animation.</li>
                                <li>Use <strong>Reset</strong> or <strong>Randomize</strong> to start fresh.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                                <FiActivity /> Key Colors
                            </h4>
                            <ul className="text-gray-400 text-sm space-y-1">
                                <li><span className="text-yellow-400 font-bold">Yellow:</span> Comparing two elements.</li>
                                <li><span className="text-red-500 font-bold">Red:</span> Swapping or Overwriting.</li>
                                <li><span className="text-purple-500 font-bold">Purple:</span> Pivot or specialized marker.</li>
                                <li><span className="text-green-500 font-bold">Green:</span> Element is Sorted.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function SortingVisualizerPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Data Structures in Java"
            subjectHref="/subjects/data-structures"
        />
    )
}
