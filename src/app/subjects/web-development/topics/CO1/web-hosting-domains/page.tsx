'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCloud, FiGlobe, FiDatabase, FiServer, FiSettings } from 'react-icons/fi'

const content = {
    title: 'Web Hosting & Domains',
    explanationSections: [
        {
            title: '1️⃣ Web Hosting',
            icon: <FiServer className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Web Hosting is a service that allows you to post a website or web page on the Internet. A <strong>Web Host</strong> provides the technologies and services needed for the website to be viewed in the Internet.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <h5 className="font-bold text-blue-400 mb-2">Shared Hosting</h5>
                            <div className="text-xs text-gray-400 mb-2">Think: Apartment Building</div>
                            <p className="text-sm text-gray-300">Lots of websites live on one server. Cheap, but if one site gets huge traffic, yours might slow down.</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <h5 className="font-bold text-green-400 mb-2">VPS (Virtual Private Server)</h5>
                            <div className="text-xs text-gray-400 mb-2">Think: Townhouse</div>
                            <p className="text-sm text-gray-300">Still one physical server, but better isolated sections. More control and power than shared.</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <h5 className="font-bold text-purple-400 mb-2">Dedicated Server</h5>
                            <div className="text-xs text-gray-400 mb-2">Think: Your Own House</div>
                            <p className="text-sm text-gray-300">You rent the entire physical machine. Maximum performance, expensive.</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <h5 className="font-bold text-cyan-400 mb-2">Cloud Hosting</h5>
                            <div className="text-xs text-gray-400 mb-2">Think: Airbnb Network</div>
                            <p className="text-sm text-gray-300">Your site runs on a network of connected servers. Very scalable (AWS, Azure, Google Cloud).</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Domain Names & Structure',
            icon: <FiGlobe className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A domain name is your address on the internet (e.g., <code>google.com</code>). It's easier for humans to remember than IP addresses (142.250.72.238).
                    </p>

                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
                        <div className="text-2xl md:text-4xl font-mono font-bold tracking-wider inline-flex items-end gap-1">
                            <div className="flex flex-col items-center group relative">
                                <span className="text-gray-500 text-sm mb-2">Subdomain</span>
                                <span className="text-yellow-400 border-b-2 border-transparent group-hover:border-yellow-400 transition-colors">www</span>
                                <span className="text-gray-600 self-end font-sans text-lg">.</span>
                            </div>
                            <div className="flex flex-col items-center group relative">
                                <span className="text-gray-500 text-sm mb-2">SLD</span>
                                <span className="text-blue-400 border-b-2 border-transparent group-hover:border-blue-400 transition-colors">klh</span>
                                <span className="text-gray-600 self-end font-sans text-lg">.</span>
                            </div>
                            <div className="flex flex-col items-center group relative">
                                <span className="text-gray-500 text-sm mb-2">TLD</span>
                                <span className="text-green-400 border-b-2 border-transparent group-hover:border-green-400 transition-colors">edu.in</span>
                            </div>
                        </div>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-left">
                            <div>
                                <strong className="text-green-400">TLD (Top Level Domain)</strong>
                                <p className="text-gray-400 mt-1">The suffix. <code>.com</code>, <code>.org</code>, <code>.edu.in</code>.</p>
                            </div>
                            <div>
                                <strong className="text-blue-400">SLD (Second Level Domain)</strong>
                                <p className="text-gray-400 mt-1">The unique name. <code>google</code>, <code>klh</code>.</p>
                            </div>
                            <div>
                                <strong className="text-yellow-400">Subdomain</strong>
                                <p className="text-gray-400 mt-1">A distinct section. <code>www</code>, <code>blog</code>, <code>mail</code>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ DNS (Domain Name System)',
            icon: <FiDatabase className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-slate-800 p-4 border-l-4 border-purple-500 rounded-r-lg">
                        <h4 className="font-bold text-purple-300">The Phonebook of the Internet</h4>
                        <p className="text-sm text-gray-300 mt-1">
                            Computers don't know "google.com". They only know IP addresses.
                            <strong>DNS</strong> translates the name you type into the IP address the computer needs.
                        </p>
                    </div>
                    <ul className="list-decimal list-inside space-y-2 text-sm text-gray-300 bg-slate-900/50 p-4 rounded-lg">
                        <li>You type <code>google.com</code></li>
                        <li>Browser checks its cache.</li>
                        <li>If not found, it asks the <strong>ISP (Internet Service Provider)</strong>.</li>
                        <li>If ISP doesn't know, it asks the <strong>Root DNS Servers</strong>.</li>
                        <li>Eventually, an IP (142.250.72.238) is returned.</li>
                        <li>Your browser connects to that IP.</li>
                    </ul>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "What is a TLD? Give examples.",
            solution: "TLD stands for Top-Level Domain. It's the last part of a domain name. Examples: .com, .org, .net, .edu, .gov.",
        },
        {
            question: "Why does a website need hosting?",
            solution: "Because website files (HTML, CSS, Images, Databases) need to be stored on a computer (Server) that is connected to the internet 24/7 so people can access it anytime.",
        },
    ],
    exampleProblems: [],
}

export default function WebHostingPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
