'use client'

import DMTopicPage from '@/components/DMTopicPage'

const content = {
    title: 'ES6 Modules',
    explanationSections: [],
    practiceQuestions: [],
    exampleProblems: [],
}

export default function Es6ModulesPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Fundamentals of Web Development"
            subjectHref="/subjects/web-development"
        />
    )
}
