'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGitBranch, FiGitCommit, FiGithub, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Git & Version Control',
    explanationSections: [
        {
            title: '1️⃣ What is Git?',
            icon: <FiGitBranch className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Git is a <span className="text-cyan-400">Version Control System</span>. It acts like a "Save Game" feature for your code.
                        You can create checkpoints (commits) and go back to them if you break something.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">git</span> init <span className="text-gray-500">// Start specific project</span><br />
                        <span className="text-blue-300">git</span> add . <span className="text-gray-500">// Stage changes</span><br />
                        <span className="text-blue-300">git</span> commit -m <span className="text-green-300">"Fixed login bug"</span> <span className="text-gray-500">// Save changes</span>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ GitHub vs Git',
            icon: <FiGithub className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-orange-500">
                        <h5 className="font-bold text-orange-400 mb-2">Git (Tool)</h5>
                        <p className="text-xs text-gray-400">Software running on your local computer.</p>
                        <p className="text-sm text-gray-300 mt-2">Like "Microsoft Word".</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                        <h5 className="font-bold text-purple-400 mb-2">GitHub (Platform)</h5>
                        <p className="text-xs text-gray-400">Website to host your Git repositories online.</p>
                        <p className="text-sm text-gray-300 mt-2">Like "Google Drive" for code.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Common Commands',
            icon: <FiGitCommit className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><code>git status</code>: What files changed?</li>
                        <li><code>git log</code>: View history of commits.</li>
                        <li><code>git push origin main</code>: Upload to GitHub.</li>
                        <li><code>git pull origin main</code>: Download updates from GitHub.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '🚀 Hands-on Mini Example',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A visual simulator of how Commits build a project timeline.
                    </p>

                    <a
                        href="/previews/fwd/git-version-control.html"
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
                            <span><strong>Commit often</strong>. Small commits are easier to fix than one giant "Complete Project" commit.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Never commit <code>node_modules</code> or API keys (Use <code>.gitignore</code>).</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What does `git clone` do?",
            solution: "It copies an entire repository from a remote source (like GitHub) to your local machine.",
        },
    ],
    exampleProblems: [],
}

export default function GitVersionControlPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
