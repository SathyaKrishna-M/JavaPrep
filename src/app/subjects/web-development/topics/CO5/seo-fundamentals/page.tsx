'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiSearch, FiCode, FiMap, FiPlay, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

const content = {
    title: 'SEO Fundamentals',
    explanationSections: [
        {
            title: '1️⃣ What is SEO?',
            icon: <FiSearch className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Search Engine Optimization (SEO) is the process of improving your site's visibility on Google.
                        If Google can't read your code, you don't exist.
                    </p>
                </div>
            ),
        },
        {
            title: '2️⃣ Key Meta Tags',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Tags inside <code>&lt;head&gt;</code> that tell search engines what your page is about.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm border border-slate-700">
                        <span className="text-blue-300">&lt;title&gt;</span>Buy Shoes Online | Brand<span className="text-blue-300">&lt;/title&gt;</span><br />
                        <span className="text-blue-300">&lt;meta</span> <span className="text-purple-400">name</span>=<span className="text-green-300">"description"</span> <span className="text-purple-400">content</span>=<span className="text-green-300">"Best running shoes..."</span><span className="text-blue-300">&gt;</span>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Semantic HTML & Sitemaps',
            icon: <FiMap className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Using correct tags (<code>&lt;h1&gt;</code>, <code>&lt;article&gt;</code>) helps Google understand hierarchy.
                        A <strong>sitemap.xml</strong> file lists all pages on your site to ensure Google finds them.
                    </p>
                </div>
            ),
        },
        {
            title: '🚀 Hands-on Mini Example',
            icon: <FiPlay className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A tool to preview how your website would look on a Google Search Result page (SERP).
                    </p>

                    <a
                        href="/previews/fwd/seo-fundamentals.html"
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
                            <span><strong>Content is King</strong>: No amount of technical tricks can fix bad content.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span><strong>Mobile First</strong>: Google ranks the mobile version of your site, not the desktop version.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Why should you only have one <h1> per page?",
            solution: "The <h1> represents the main topic of the page. Having multiple confuses search engines about what the page is actually about.",
        },
    ],
    exampleProblems: [],
}

export default function SeoFundamentalsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
