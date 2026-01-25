'use client'

import DMTopicPage from '@/components/DMTopicPage'

const content = {
    title: 'Form Validation with JavaScript',
    explanationSections: [],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function FormValidationJsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
