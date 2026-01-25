'use client'

import DMTopicPage from '@/components/DMTopicPage'

const content = {
    title: 'Web Security & Deployment',
    explanationSections: [],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function WebSecurityDeploymentPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
