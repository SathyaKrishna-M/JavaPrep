'use client'

import React, { useState } from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import { FiCheckSquare, FiAlertCircle, FiCode, FiType, FiCheck } from 'react-icons/fi'

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
            <div className="bg-slate-950 p-4 border-b md:border-b-0 md:border-r border-slate-700 overflow-x-auto text-xs font-mono">
                <div className="text-gray-500 mb-2 font-sans uppercase tracking-wider text-[10px]">Source Code</div>
                <pre className="text-blue-300 whitespace-pre-wrap">{code}</pre>
            </div>
            {/* Preview Side */}
            <div className="bg-slate-900 p-4 relative">
                <div className="text-gray-500 mb-2 font-sans uppercase tracking-wider text-[10px]">Live Preview</div>
                <div className="p-6 bg-white rounded-lg text-slate-900 border border-slate-300 h-full min-h-[150px] flex flex-col justify-center">
                    {children}
                </div>
            </div>
        </div>
    </div>
)

const FormPlayground = () => {
    const [formData, setFormData] = useState({ name: '', email: '', type: 'student' })
    const [touched, setTouched] = useState({ name: false, email: false })

    const isEmailValid = formData.email.includes('@') && formData.email.includes('.')

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FiCheckSquare className="text-green-400" /> Interactive Validator
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    {/* Name Field */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1">Name (required)</label>
                        <input
                            type="text"
                            className={`w-full bg-slate-800 border p-2 rounded text-white text-sm focus:outline-none focus:ring-2 ${touched.name && !formData.name ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:ring-blue-500/50'
                                }`}
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            onBlur={() => setTouched({ ...touched, name: true })}
                        />
                        {touched.name && !formData.name && (
                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <FiAlertCircle /> Name is required
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1">Email (type="email")</label>
                        <input
                            type="email"
                            className={`w-full bg-slate-800 border p-2 rounded text-white text-sm focus:outline-none focus:ring-2 ${touched.email && !isEmailValid ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:ring-blue-500/50'
                                }`}
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            onBlur={() => setTouched({ ...touched, email: true })}
                        />
                        {touched.email && !isEmailValid && (
                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <FiAlertCircle /> Invalid email format
                            </p>
                        )}
                        {touched.email && isEmailValid && (
                            <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                                <FiCheck /> Looks good!
                            </p>
                        )}
                    </div>

                    {/* Radio Field */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1">Role</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={formData.type === 'student'}
                                    onChange={() => setFormData({ ...formData, type: 'student' })}
                                    className="accent-blue-500"
                                /> Student
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="teacher"
                                    checked={formData.type === 'teacher'}
                                    onChange={() => setFormData({ ...formData, type: 'teacher' })}
                                    className="accent-blue-500"
                                /> Teacher
                            </label>
                        </div>
                    </div>
                </form>

                {/* State Visualizer */}
                <div className="bg-black/30 p-4 rounded-lg font-mono text-xs text-gray-400 border border-slate-800">
                    <div className="uppercase tracking-widest text-[10px] mb-2 text-gray-600">Form State</div>
                    <div>{`{`}</div>
                    <div className="pl-4">
                        <span className="text-blue-400">"name"</span>: <span className="text-green-300">"{formData.name}"</span>,
                    </div>
                    <div className="pl-4">
                        <span className="text-blue-400">"email"</span>: <span className="text-green-300">"{formData.email}"</span>,
                    </div>
                    <div className="pl-4">
                        <span className="text-blue-400">"role"</span>: <span className="text-green-300">"{formData.type}"</span>
                    </div>
                    <div>{`}`}</div>

                    <div className="mt-4 border-t border-slate-800 pt-4">
                        <div className="uppercase tracking-widest text-[10px] mb-2 text-gray-600">Validation</div>
                        <div className={isEmailValid && formData.name ? "text-green-400" : "text-orange-400"}>
                            Status: {isEmailValid && formData.name ? "VALID ✅" : "INVALID ❌"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const content = {
    title: 'HTML Forms & Inputs',
    explanationSections: [
        {
            title: '1️⃣ The <form> Container',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Forms allow users to send data to the server. The <code>&lt;form&gt;</code> tag allows you to bundle inputs together.
                    </p>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
                        <code className="text-sm font-mono text-blue-300">
                            &lt;form action="/submit-data" method="POST"&gt;
                            <br /><span className="text-gray-500 ml-4">&lt;!-- Inputs go here --&gt;</span>
                            <br />&lt;/form&gt;
                        </code>
                        <div className="mt-3 text-xs text-gray-400 grid grid-cols-2 gap-2">
                            <div><span className="text-yellow-400 font-bold">action</span>: URL where data is sent.</div>
                            <div><span className="text-green-400 font-bold">method</span>: GET (in URL) or POST (hidden body).</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Interactive Input Types',
            icon: <FiType className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The <code>&lt;input&gt;</code> tag is the most versatile form element. Changing the <code>type</code> attribute changes its behavior entirely.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CodePreview
                            title="Text & Password"
                            code={`User: <input type="text" />
Pass: <input type="password" />`}
                        >
                            <div className="space-y-2">
                                <div className="text-xs">User: <input type="text" className="border px-1 border-gray-400 rounded w-24" placeholder="Name" /></div>
                                <div className="text-xs">Pass: <input type="password" className="border px-1 border-gray-400 rounded w-24" placeholder="••••" /></div>
                            </div>
                        </CodePreview>

                        <CodePreview
                            title="Checkbox & Radio"
                            code={`<!-- Checkbox (Multiple) -->
<input type="checkbox" /> Agree

<!-- Radio (Single Choice) -->
<input type="radio" name="x" /> A
<input type="radio" name="x" /> B`}
                        >
                            <div className="space-y-2">
                                <div className="text-xs flex items-center gap-1"><input type="checkbox" /> Agree to Terms</div>
                                <div className="text-xs flex items-center gap-2 border-t pt-2 mt-2">
                                    <span>Pick One:</span>
                                    <label><input type="radio" name="demo_radio" /> A</label>
                                    <label><input type="radio" name="demo_radio" /> B</label>
                                </div>
                            </div>
                        </CodePreview>
                    </div>

                    <CodePreview
                        title="HTML5 Special Inputs"
                        code={`<input type="color" />
<input type="date" />
<input type="range" />`}
                    >
                        <div className="flex flex-col gap-3 items-start">
                            <div className="flex items-center gap-2"><input type="color" className="h-8 w-8" /> <span className="text-xs text-gray-500">Color Picker</span></div>
                            <div className="flex items-center gap-2"><input type="date" className="border p-1 rounded text-xs" /> <span className="text-xs text-gray-500">Date Picker</span></div>
                            <div className="flex items-center gap-2 w-full"><input type="range" className="w-1/2" /> <span className="text-xs text-gray-500">Slider</span></div>
                        </div>
                    </CodePreview>
                </div>
            ),
        },
        {
            title: '3️⃣ Validation & State Playground',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Try typing in the form below. Notice how the visual feedback changes based on what you type (Validation).
                    </p>
                    <FormPlayground />
                </div>
            ),
        }
    ],
    practiceQuestions: [
        {
            question: "When should you use 'radio' buttons vs 'checkboxes'?",
            solution: "Use Radio buttons when the user must select EXACTLY ONE option from a group (e.g., Gender). Use Checkboxes when the user can select ZERO, ONE, or MULTIPLE options (e.g., Hobbies).",
        },
        {
            question: "What is the purpose of the 'required' attribute?",
            solution: "It prevents the form from being submitted if the field is empty. The browser will automatically show a popup error message.",
        }
    ],
    exampleProblems: [],
}

export default function HTMLFormsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
