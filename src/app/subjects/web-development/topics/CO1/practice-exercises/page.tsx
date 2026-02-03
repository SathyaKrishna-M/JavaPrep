'use client'

import React, { useState } from 'react'
import DMTopicPage from '@/components/DMTopicPage' // Assuming this component exists or handles standard topic layouts
import { FiCode, FiCheckSquare, FiAward, FiCpu } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'

// Custom component for "Problem Cards" to be used inside the content
const ProblemCard = ({ title, desc, difficulty, tags, children }: { title: string, desc: string, difficulty: 'Easy' | 'Medium' | 'Hard', tags: string[], children: React.ReactNode }) => (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-6">
        <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-start">
            <div>
                <h4 className="font-bold text-lg text-gray-100">{title}</h4>
                <p className="text-sm text-gray-400 mt-1">{desc}</p>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-bold ${difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                    difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                }`}>
                {difficulty}
            </span>
        </div>
        <div className="p-4">
            <div className="mb-4 flex gap-2">
                {tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-800 text-gray-400 text-xs rounded border border-slate-700">
                        #{tag}
                    </span>
                ))}
            </div>
            {children}
        </div>
    </div>
)

const content = {
    title: 'Practice Exercises',
    explanationSections: [
        {
            title: '🎯 Overview',
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        This section contains hands-on coding tasks. <strong>Coding is a skill, not just knowledge.</strong> You must type these out to learn.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <h5 className="font-bold text-blue-300 flex items-center gap-2">
                                <FiCheckSquare /> Class Tasks
                            </h5>
                            <p className="text-sm text-gray-400 mt-1">Mandatory exercises covered in sessions. Great for basics.</p>
                        </div>
                        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <h5 className="font-bold text-purple-300 flex items-center gap-2">
                                <FiAward /> Practice Challenges
                            </h5>
                            <p className="text-sm text-gray-400 mt-1">Extra problems to test your skills and prepare for exams.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '📝 Class Tasks (Beginner)',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div>
                    <ProblemCard
                        title="Task 1: The Bio Page"
                        desc="Create a simple HTML page about yourself."
                        difficulty="Easy"
                        tags={['html', 'structure', 'lists']}
                    >
                        <div className="space-y-4">
                            <div className="text-sm text-gray-300">
                                <strong className="text-gray-100">Requirements:</strong>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                                    <li>Use <code>h1</code> for your name.</li>
                                    <li>Use a paragraph for a short intro.</li>
                                    <li>Add an unordered list of 3 hobbies.</li>
                                    <li>Add a <code>hr</code> line at the bottom.</li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <div className="text-xs text-gray-500 mb-2 font-mono uppercase">Solution Hint</div>
                                <CodeBlock code={`<h1>John Doe</h1>
<p>I am a student learning Web Dev.</p>
<h3>Hobbies:</h3>
<ul>
    <li>Coding</li>
    <li>Gaming</li>
    <li>Reading</li>
</ul>
<hr>`} language="html" />
                            </div>
                        </div>
                    </ProblemCard>

                    <ProblemCard
                        title="Task 2: The Time Table"
                        desc="Create a class schedule using tables."
                        difficulty="Medium"
                        tags={['html', 'tables', 'attributes']}
                    >
                        <div className="space-y-4">
                            <div className="text-sm text-gray-300">
                                <strong className="text-gray-100">Requirements:</strong>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                                    <li>Create a table with headers: Day, 9-10AM, 10-11AM.</li>
                                    <li>Add rows for Monday and Tuesday.</li>
                                    <li>Use <code>border="1"</code> attribute to see lines.</li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <div className="text-xs text-gray-500 mb-2 font-mono uppercase">Solution Hint</div>
                                <CodeBlock code={`<table border="1">
    <tr>
        <th>Day</th> <th>9-10 AM</th> <th>10-11 AM</th>
    </tr>
    <tr>
        <td>Monday</td> <td>Math</td> <td>Physics</td>
    </tr>
    <tr>
        <td>Tuesday</td> <td>CS</td> <td>English</td>
    </tr>
</table>`} language="html" />
                            </div>
                        </div>
                    </ProblemCard>

                    <ProblemCard
                        title="Task 3: Registration Form"
                        desc="Build a user signup form."
                        difficulty="Medium"
                        tags={['html', 'forms', 'inputs']}
                    >
                        <div className="space-y-4">
                            <div className="text-sm text-gray-300">
                                <strong className="text-gray-100">Requirements:</strong>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                                    <li>Input for Name (text).</li>
                                    <li>Input for Email (email).</li>
                                    <li>Radio buttons for Gender (Male/Female).</li>
                                    <li>A Submit button.</li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <div className="text-xs text-gray-500 mb-2 font-mono uppercase">Solution Hint</div>
                                <CodeBlock code={`<form>
    <label>Name:</label> <input type="text" placeholder="Your Name" /> <br/>
    <label>Email:</label> <input type="email" /> <br/>
    
    <label>Gender:</label>
    <input type="radio" name="gender" value="m"> Male
    <input type="radio" name="gender" value="f"> Female
    
    <br/>
    <button type="submit">Register</button>
</form>`} language="html" />
                            </div>
                        </div>
                    </ProblemCard>
                </div>
            ),
        },
        {
            title: '🚀 Practice Exercises (Advanced)',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div>
                    <ProblemCard
                        title="Challenge 1: The Blog Post"
                        desc="Combine text formatting and semantics."
                        difficulty="Medium"
                        tags={['html5', 'semantic', 'css-intro']}
                    >
                        <div className="space-y-4">
                            <p className="text-sm text-gray-400">
                                Create a blog post structure using semantic tags: <code>&lt;article&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;section&gt;</code>, and <code>&lt;footer&gt;</code>.
                                <br />Include a title, a date, large text, and an 'About Author' footer.
                            </p>
                        </div>
                    </ProblemCard>

                    <ProblemCard
                        title="Challenge 2: CSS Box Model Card"
                        desc="Style a profile card."
                        difficulty="Hard"
                        tags={['css', 'box-model', 'colors']}
                    >
                        <div className="space-y-4">
                            <p className="text-sm text-gray-400">
                                Create a <code>div</code> with class <code>card</code>.
                                <br /> - Give it a width of 300px.
                                <br /> - Add 20px padding (internal space).
                                <br /> - Add 5px solid blue border.
                                <br /> - Add 10px margin (external space).
                                <br /> - Set background color to light gray.
                            </p>
                            <div className="mt-4">
                                <div className="text-xs text-gray-500 mb-2 font-mono uppercase">CSS Snippet</div>
                                <CodeBlock code={`.card {
    width: 300px;
    padding: 20px;
    border: 5px solid blue;
    margin: 10px;
    background-color: #f0f0f0;
}`} language="css" />
                            </div>
                        </div>
                    </ProblemCard>
                </div>
            )
        }
    ],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function PracticeExercisesPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
