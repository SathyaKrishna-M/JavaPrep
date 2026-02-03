'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiSmartphone, FiMonitor, FiTablet } from 'react-icons/fi'

// Helper Component
const CodePreview = ({ title, code, children }: { title: string, code: string, children: React.ReactNode }) => (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-8 shadow-xl">
        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-300">{title}</span>
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
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
    title: 'Responsive Design',
    explanationSections: [
        {
            title: '1️⃣ Media Queries',
            icon: <FiMonitor className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        <strong>Responsive Design</strong> means your website adapts to look good on all devices (Phones, Tablets, Desktops). We use <code>@media</code> queries to apply different styles at different widths.
                    </p>

                    {/* Visual Breakpoint Bar */}
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                        <h5 className="font-bold text-gray-300 mb-4 text-center">Common Breakpoints (Width)</h5>
                        <div className="flex text-xs text-white font-bold text-center h-12 rounded overflow-hidden">
                            <div className="w-1/3 bg-red-500 flex flex-col justify-center items-center border-r border-red-600">
                                <FiSmartphone className="text-lg" />
                                &lt; 768px
                            </div>
                            <div className="w-1/3 bg-blue-500 flex flex-col justify-center items-center border-r border-blue-600">
                                <FiTablet className="text-lg" />
                                768px - 1024px
                            </div>
                            <div className="w-1/3 bg-green-500 flex flex-col justify-center items-center">
                                <FiMonitor className="text-lg" />
                                &gt; 1024px
                            </div>
                        </div>
                        <div className="flex text-[10px] text-gray-500 text-center mt-2 px-2">
                            <div className="w-1/3">Mobile (Phones)</div>
                            <div className="w-1/3">Tablets</div>
                            <div className="w-1/3">Desktop</div>
                        </div>
                    </div>

                    <CodePreview
                        title="Mobile First Example"
                        code={`/* Default = Mobile */
.box {
  background-color: red;
}

/* Tablet & Up */
@media (min-width: 768px) {
  .box {
    background-color: blue;
  }
}`}
                    >
                        <div className="w-full">
                            <div className="p-4 bg-red-500 text-white font-bold text-center md:hidden rounded">
                                I am RED on Mobile
                            </div>
                            <div className="p-4 bg-blue-500 text-white font-bold text-center hidden md:block rounded">
                                I am BLUE on Desktop/Tablet
                            </div>
                            <p className="text-[10px] text-gray-500 text-center mt-2">Resize your browser window to see this change!</p>
                        </div>
                    </CodePreview>
                </div>
            ),
        }
    ],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function ResponsiveDesignPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
