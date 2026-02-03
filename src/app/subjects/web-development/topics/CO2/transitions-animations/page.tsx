'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiPlay, FiRefreshCw } from 'react-icons/fi'

// Helper Component
const CodePreview = ({ title, code, children }: { title: string, code: string, children: React.ReactNode }) => (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-8 shadow-xl">
        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-300">{title}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-slate-950 p-4 border-b md:border-b-0 md:border-r border-slate-700 overflow-x-auto text-xs font-mono">
                <pre className="text-blue-300 whitespace-pre-wrap">{code}</pre>
            </div>
            <div className="bg-slate-900 p-4">
                <div className="p-6 bg-white rounded-lg text-slate-900 border border-slate-300 min-h-[150px] flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

const content = {
    title: 'Transitions & Animations',
    explanationSections: [
        {
            title: '1️⃣ CSS Transitions',
            icon: <FiRefreshCw className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>Transitions</strong> smooth out changes (like hover effects). Without them, changes are instant and jerky.
                    </p>

                    <CodePreview
                        title="Smooth Hover Effect"
                        code={`.btn {
  background: blue;
  transition: all 0.3s ease;
}

.btn:hover {
  background: green;
  transform: scale(1.1) rotate(5deg);
}`}
                    >
                        <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded shadow transition-all duration-300 ease-in-out hover:bg-green-600 hover:scale-110 hover:rotate-3">
                            Hover Me
                        </button>
                    </CodePreview>
                </div>
            ),
        },
        {
            title: '2️⃣ Keyframe Animations',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>@keyframes</strong> allow you to create complex, multi-step animations that run on their own loop.
                    </p>

                    <CodePreview
                        title="Infinite Bounce"
                        code={`@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.ball {
  animation: bounce 1s infinite;
}`}
                    >
                        <div className="w-12 h-12 bg-red-500 rounded-full shadow-lg animate-bounce"></div>
                    </CodePreview>
                </div>
            )
        }
    ],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function TransitionsAnimationsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
