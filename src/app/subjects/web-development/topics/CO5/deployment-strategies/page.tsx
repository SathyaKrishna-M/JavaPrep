'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCloud, FiServer, FiGlobe, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'Deployment Strategies',
    explanationSections: [
        {
            title: '1️⃣ Traditional vs Modern',
            icon: <FiServer className="w-6 h-6" />,
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-gray-500">
                        <h5 className="font-bold text-gray-400 mb-2">Traditional (FTP)</h5>
                        <p className="text-xs text-gray-400">Manually dragging files to a server folder. Slow, error-prone.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
                        <h5 className="font-bold text-blue-400 mb-2">Modern (CI/CD)</h5>
                        <p className="text-xs text-gray-400">Push to git -&gt; Server detects change -&gt; Automatically builds and deploys.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Where to Deploy?',
            icon: <FiCloud className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                        <li><strong>Vercel / Netlify:</strong> Perfect for frontend & static sites. Free tier is generous. Easiest to use.</li>
                        <li><strong>Heroku / Railway:</strong> Good for full-stack apps (Node.js backends).</li>
                        <li><strong>AWS / DigitalOcean:</strong> Professional grade. More complex, total control.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '3️⃣ The Process',
            icon: <FiGlobe className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Modern deployment is usually just "Connecting your GitHub repo".
                    </p>
                    <div className="flex gap-2 items-center text-sm text-gray-400">
                        <span className="bg-gray-800 p-2 rounded">Code</span>
                        <span>→</span>
                        <span className="bg-gray-800 p-2 rounded">Push to GitHub</span>
                        <span>→</span>
                        <span className="bg-blue-900 text-blue-200 p-2 rounded">Vercel Builds</span>
                        <span>→</span>
                        <span className="bg-green-900 text-green-200 p-2 rounded">Live Site</span>
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
                        Simulating the logs you see when deploying a site to Vercel or Netlify.
                    </p>

                    <a
                        href="/previews/fwd/deployment-strategies.html"
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
                            <span><strong>CI/CD</strong>: Continuous Integration / Continuous Deployment. The automation of the release process.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>Always test your "Production Build" locally (<code>npm run build</code>) before pushing.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is a Domain Name?",
            solution: "The human-readable address (google.com) that points to your server's IP address.",
        },
    ],
    exampleProblems: [],
}

export default function DeploymentStrategiesPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
