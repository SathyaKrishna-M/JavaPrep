'use client'

import React from 'react'
import DMTopicPage from '@/components/DMTopicPage'
import QuestionsBank from '@/components/FWD/QuestionsBank'
import { FiBookOpen } from 'react-icons/fi'

const content = {
    title: 'Question Bank (Full)',
    explanationSections: [
        {
            title: '🎓 Exam Prep & Interview Questions',
            icon: <FiBookOpen className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        This collection includes high-frequency questions from previous exams, lab viva questions, and concept checkers.
                        Use the filters below to narrow down by module (CO1, CO2, etc.).
                    </p>
                    <QuestionsBank />
                </div>
            ),
        }
    ],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function QuestionBankPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
