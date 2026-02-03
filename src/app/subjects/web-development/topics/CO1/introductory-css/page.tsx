'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLayout, FiHash, FiBox, FiDroplet, FiCode, FiType } from 'react-icons/fi'

// Helper Component for Code + Preview
const CodePreview = ({ title, code, children }: { title: string, code: string, children: React.ReactNode }) => (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-8 shadow-xl">
        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <FiCode className="text-blue-400" /> {title}
            </span>
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Code Side */}
            <div className="bg-slate-950 p-4 border-b md:border-b-0 md:border-r border-slate-700 overflow-x-auto">
                <div className="text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">Source Code</div>
                <pre className="font-mono text-sm text-blue-300 whitespace-pre-wrap">
                    {code}
                </pre>
            </div>
            {/* Preview Side */}
            <div className="bg-slate-900 p-4 relative">
                <div className="text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">Browser Preview</div>
                <div className="p-6 bg-white rounded-lg text-slate-900 border border-slate-300 h-full min-h-[150px] flex flex-col justify-center">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

const content = {
    title: 'Introductory CSS',
    explanationSections: [
        {
            title: '1️⃣ What is CSS?',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <strong>Cascading Style Sheets (CSS)</strong> controls the <em>design</em> and <em>presentation</em> of the page (Colors, Fonts, Layouts).
                    </p>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg font-mono text-sm">
                        <span className="text-yellow-400">h1</span> <span className="text-white">{`{`}</span>
                        <div className="pl-4">
                            <span className="text-blue-400">color</span>: <span className="text-green-300">blue</span>;<br />
                            <span className="text-blue-400">font-size</span>: <span className="text-green-300">20px</span>;
                        </div>
                        <span className="text-white">{`}`}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-400 mt-2">
                        <div><span className="text-yellow-400">Selector</span>: Who to style (h1)</div>
                        <div><span className="text-blue-400">Property</span>: What to change (color)</div>
                        <div><span className="text-green-300">Value</span>: How to change it (blue)</div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Ways to Apply CSS',
            icon: <FiHash className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-800 p-3 rounded border border-slate-700">
                            <h5 className="font-bold text-red-400 mb-1">Inline</h5>
                            <code className="block text-xs text-gray-400 bg-black/30 p-1 rounded mb-2">style="color:red;"</code>
                            <p className="text-xs text-gray-500">Inside the HTML tag. Avoid this (hard to manage).</p>
                        </div>
                        <div className="bg-slate-800 p-3 rounded border border-slate-700">
                            <h5 className="font-bold text-yellow-400 mb-1">Internal</h5>
                            <code className="block text-xs text-gray-400 bg-black/30 p-1 rounded mb-2">&lt;style&gt;...&lt;/style&gt;</code>
                            <p className="text-xs text-gray-500">In the <code>head</code> section. Good for single-page sites.</p>
                        </div>
                        <div className="bg-slate-800 p-3 rounded border border-slate-700">
                            <h5 className="font-bold text-green-400 mb-1">External</h5>
                            <code className="block text-xs text-gray-400 bg-black/30 p-1 rounded mb-2">&lt;link href="..."&gt;</code>
                            <p className="text-xs text-gray-500">Separate .css file. <strong>Best Practice</strong>.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ CSS Selectors',
            icon: <FiHash className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">How do we tell CSS which element to style?</p>

                    <CodePreview
                        title="Selector Playground"
                        code={`/* Element Slector */
p { color: gray; }

/* Class Selector */
.btn { background: blue; color: white; padding: 5px; }

/* ID Selector */
#special { border: 2px solid red; }`}
                    >
                        <div className="space-y-4">
                            <p className="text-gray-500">I am a standard paragraph (&lt;p&gt;).</p>
                            <button className="bg-blue-600 text-white px-3 py-1 rounded">I am class .btn</button>
                            <div className="border-2 border-red-500 p-2 text-red-900 inline-block">I am ID #special</div>
                        </div>
                    </CodePreview>

                    <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-800">
                                <tr>
                                    <th className="p-3 text-gray-200">Selector</th>
                                    <th className="p-3 text-gray-200">Syntax</th>
                                    <th className="p-3 text-gray-200">Targets</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                <tr>
                                    <td className="p-3"><span className="text-blue-400">Element</span></td>
                                    <td className="p-3 font-mono">p {`{ }`}</td>
                                    <td className="p-3 text-gray-400">All <code>&lt;p&gt;</code> tags</td>
                                </tr>
                                <tr>
                                    <td className="p-3"><span className="text-green-400">Class</span></td>
                                    <td className="p-3 font-mono">.btn {`{ }`}</td>
                                    <td className="p-3 text-gray-400">Elements with <code>class="btn"</code>. (Reuseable)</td>
                                </tr>
                                <tr>
                                    <td className="p-3"><span className="text-purple-400">ID</span></td>
                                    <td className="p-3 font-mono">#header {`{ }`}</td>
                                    <td className="p-3 text-gray-400">Element with <code>id="header"</code>. (Unique)</td>
                                </tr>
                                <tr>
                                    <td className="p-3"><span className="text-orange-400">Wildcard</span></td>
                                    <td className="p-3 font-mono">* {`{ }`}</td>
                                    <td className="p-3 text-gray-400">Everything.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Colors & Typography',
            icon: <FiDroplet className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">Making things look good with colors and fonts.</p>

                    <CodePreview
                        title="Colors & Fonts"
                        code={`h1 {
  color: #ff0000; /* Hex Code */
  font-family: 'Courier New';
}

p {
  color: rgb(0, 128, 0); /* RGB */
  font-weight: bold;
}`}
                    >
                        <h1 className="text-red-600 font-mono text-2xl mb-2">I am Red & Mono</h1>
                        <p className="text-green-700 font-bold">I am Green & Bold</p>
                    </CodePreview>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-slate-800 rounded border border-slate-700 text-center">
                            <div className="w-full h-8 bg-red-500 rounded mb-2"></div>
                            <code className="text-xs text-gray-400">red / #ff0000</code>
                        </div>
                        <div className="p-3 bg-slate-800 rounded border border-slate-700 text-center">
                            <div className="w-full h-8 bg-blue-500 rounded mb-2"></div>
                            <code className="text-xs text-gray-400">blue / #0000ff</code>
                        </div>
                        <div className="p-3 bg-slate-800 rounded border border-slate-700 text-center">
                            <div className="w-full h-8 bg-green-500 rounded mb-2"></div>
                            <code className="text-xs text-gray-400">green</code>
                        </div>
                        <div className="p-3 bg-slate-800 rounded border border-slate-700 text-center">
                            <div className="w-full h-8 bg-purple-500 rounded mb-2"></div>
                            <code className="text-xs text-gray-400">purple</code>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '5️⃣ The Box Model',
            icon: <FiBox className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Every element in HTML is a rectangular "box". The CSS Box Model wraps around it.
                    </p>

                    <CodePreview
                        title="Box Model in Action"
                        code={`.box {
  width: 200px;
  padding: 20px;   /* Inside space */
  border: 5px solid black;
  margin: 20px;    /* Outside space */
  background: lightblue;
}`}
                    >
                        <div className="bg-yellow-100 p-4 border border-dashed border-yellow-500 text-yellow-800 text-xs">
                            Container (To show margin)
                            <div className="w-[200px] p-[20px] m-[20px] border-[5px] border-black bg-blue-200 text-black font-bold">
                                I am the Content
                            </div>
                        </div>
                    </CodePreview>

                    <div className="flex justify-center py-6">
                        <div className="relative bg-orange-400/20 p-8 border-2 border-dashed border-orange-400 text-center rounded w-72 h-72 flex items-center justify-center shadow-lg">
                            <span className="absolute top-2 left-2 text-xs text-orange-400 font-bold uppercase">Margin</span>

                            <div className="relative bg-yellow-400/20 p-8 border-2 border-yellow-400 w-full h-full flex items-center justify-center rounded">
                                <span className="absolute top-2 left-2 text-xs text-yellow-400 font-bold uppercase">Border</span>

                                <div className="relative bg-green-400/20 p-8 border-2 border-dashed border-green-400 w-full h-full flex items-center justify-center rounded">
                                    <span className="absolute top-2 left-2 text-xs text-green-400 font-bold uppercase">Padding</span>

                                    <div className="bg-blue-500 text-white w-full h-full flex items-center justify-center font-bold rounded shadow-inner">
                                        Content
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "What is the difference between class and ID?",
            solution: "A class (.) can be used on multiple elements (e.g., many buttons styled the same). An ID (#) is unique and can only be used on ONE element per page.",
        },
        {
            question: "In the Box Model, which property creates space outside the border?",
            solution: "Margin. (Padding is inside, Border is the line itself).",
        }
    ],
    exampleProblems: [],
}

export default function IntroductoryCSSPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
