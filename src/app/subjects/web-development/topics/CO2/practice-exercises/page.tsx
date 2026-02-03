'use client'

import React from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import { FiCheckSquare, FiGrid, FiLayout, FiCode } from 'react-icons/fi'
import CodeBlock from '@/components/CodeBlock'

// Custom component for "Problem Cards"
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
    title: 'Practice Exercises (CO2)',
    explanationSections: [
        {
            title: '🎯 Form Challenges',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: (
                <div>
                    <ProblemCard
                        title="Task 1: Student Registration Form"
                        desc="Create a comprehensive form with various input types."
                        difficulty="Medium"
                        tags={['forms', 'inputs', 'validation']}
                    >
                        <div className="space-y-4">
                            <div className="text-sm text-gray-300">
                                <strong className="text-gray-100">Requirements:</strong>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                                    <li><strong>Personal Info:</strong> First Name, Last Name, Gender (Radio).</li>
                                    <li><strong>Academic:</strong> Course (Select Dropdown), Subjects (Checkboxes).</li>
                                    <li><strong>Feedback:</strong> Comments (Textarea).</li>
                                    <li><strong>Submit:</strong> Button that sends data.</li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <div className="text-xs text-gray-500 mb-2 font-mono uppercase">Reference Snippet</div>
                                <CodeBlock code={`<form>
  <!-- Dropdown -->
  <select name="course">
    <option value="cs">Computer Science</option>
    <option value="mech">Mechanical</option>
  </select>

  <!-- Textarea -->
  <textarea placeholder="Your comments..."></textarea>
</form>`} language="html" />
                            </div>
                        </div>
                    </ProblemCard>
                </div>
            ),
        },
        {
            title: '🎯 Table Challenges',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div>
                    <ProblemCard
                        title="Task 2: Complex Timetable"
                        desc="Use rowspan and colspan to merge cells."
                        difficulty="Hard"
                        tags={['tables', 'rowspan', 'colspan']}
                    >
                        <div className="space-y-4">
                            <p className="text-sm text-gray-400">
                                Create a school timetable where "Lunch Break" spans across all days (colspan) and "Lab Session" spans across 3 hours (rowspan).
                            </p>
                            <div className="mt-4">
                                <div className="text-xs text-gray-500 mb-2 font-mono uppercase">Hint</div>
                                <CodeBlock code={`<!-- Spans 3 columns (Left to Right) -->
<td colspan="3">Lunch Break</td>

<!-- Spans 2 rows (Top to Bottom) -->
<td rowspan="2">Physics Lab</td>`} language="html" />
                            </div>
                        </div>
                    </ProblemCard>
                </div>
            ),
        },
        {
            title: '🎯 Layout Challenges',
            icon: <FiLayout className="w-6 h-6" />,
            content: (
                <div>
                    <ProblemCard
                        title="Task 3: The Navigation Bar"
                        desc="Build a horizontal menu using Flexbox."
                        difficulty="Easy"
                        tags={['css', 'flexbox', 'nav']}
                    >
                        <div className="space-y-4">
                            <p className="text-sm text-gray-400">
                                Create a <code>&lt;nav&gt;</code> with a logo on the left and links (Home, About, Contact) on the right.
                            </p>
                            <div className="mt-4">
                                <div className="text-xs text-gray-500 mb-2 font-mono uppercase">CSS Snippet</div>
                                <CodeBlock code={`.nav {
  display: flex;
  justify-content: space-between; /* Pushes items to edges */
  align-items: center;
  padding: 10px;
}`} language="css" />
                            </div>
                        </div>
                    </ProblemCard>
                </div>
            ),
        }
    ],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function PracticeExercisesCO2Page() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
