'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMousePointer, FiMonitor, FiZap, FiPlay, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Event Handling',
    explanationSections: [
        {
            title: '1️⃣ What are Events?',
            icon: <FiZap className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Events are things that happen to HTML elements. JS can "listen" for these events and react.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Mouse:</strong> click, dblclick, mouseover.</li>
                        <li><strong>Keyboard:</strong> keydown, keyup.</li>
                        <li><strong>Form:</strong> submit, change, focus.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '2️⃣ Event Listeners',
            icon: <FiMousePointer className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The best way to handle events is using <code>addEventListener</code>. It keeps your HTML clean (no `onclick="...`).
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">const</span> <span className="text-orange-300">btn</span> = <span className="text-blue-300">document</span>.querySelector(<span className="text-green-300">"#myBtn"</span>);<br /><br />
                        <span className="text-orange-300">btn</span>.addEventListener(<span className="text-green-300">"click"</span>, () <span className="text-purple-400">={'>'}</span> {'{'}<br />
                        &nbsp;&nbsp;console.log(<span className="text-green-300">"Button Clicked!"</span>);<br />
                        {'}'});
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ The Event Object',
            icon: <FiMonitor className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        When an event happens, the browser passes an <code>event</code> object to your function containing details about what happened.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">input</span>.addEventListener(<span className="text-green-300">"keyup"</span>, (<span className="text-orange-300">e</span>) <span className="text-purple-400">={'>'}</span> {'{'}<br />
                        &nbsp;&nbsp;console.log(<span className="text-orange-300">e</span>.key); <span className="text-gray-500">// Returns "Enter", "a", "Esc"</span><br />
                        {'}'});
                    </div>
                </div>
            ),
        },
        {
            title: '🚀 Hands-on Mini Example',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Interact with the box (Click) and the input field (Type) to see events in action.
                    </p>

                    <a
                        href="/previews/fwd/event-handling.html"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/20"
                    >
                        <FiPlay className="w-4 h-4" />
                        ▶ Preview Output
                    </a>
                </div>
            ),
        },
        {
            title: '🧠 Quick Revision',
            icon: <FiCheckCircle className="w-6 h-6" />,
            content: (
                <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span><strong>Separation of Concerns</strong>: Keep JS logic in your script file, not in your HTML attributes.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>You can attach multiple listeners to the same element.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "How do you stop a form from refreshing the page on submit?",
            solution: "Use `event.preventDefault()` inside the submit event listener.",
        },
    ],
    exampleProblems: [],
}

export default function EventHandlingPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
