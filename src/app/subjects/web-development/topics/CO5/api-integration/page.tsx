'use client'

import DMTopicPage from '@/components/DMTopicPage'

const content = {
    title: 'API Integration',
    explanationSections: [],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function ApiIntegrationPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
