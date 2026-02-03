'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiBox } from 'react-icons/fi'

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
                <div className="p-6 bg-white rounded-lg text-slate-900 border border-slate-300 min-h-[150px] flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

const content = {
    title: 'Modern CSS',
    explanationSections: [
        {
            title: '1️⃣ CSS Variables (Custom Properties)',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>Variables</strong> let you store values (like colors or sizes) in one place and reuse them. If you change the variable, it updates everywhere!
                    </p>

                    <CodePreview
                        title="Using Variables"
                        code={`:root {
  --main-color: #3b82f6; /* Blue */
  --padding: 20px;
}

.box {
  background-color: var(--main-color);
  padding: var(--padding);
  color: white;
}`}
                    >
                        <div className="bg-blue-500 p-5 text-white rounded font-bold">
                            I am using var(--main-color)
                        </div>
                    </CodePreview>
                </div>
            ),
        }
    ],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function ModernCSSPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
