

import { notFound } from 'next/navigation'
import DMTopicPage from '@/components/DMTopicPage'
import { topics } from '@/data/java-topics'

// Generate static params for all topics
export function generateStaticParams() {
    return topics.map((topic) => ({
        slug: topic.id,
    }))
}

interface PageProps {
    params: {
        slug: string
    }
}

export default function JavaTopicPage({ params }: PageProps) {
    const topic = topics.find((t) => t.id === params.slug)

    if (!topic) {
        notFound()
    }

    const content = {
        title: topic.title,
        // Empty sections will trigger "Coming Soon" state in DMTopicPage
        explanationSections: [],
        practiceQuestions: [],
        exampleProblems: [],
    }

    return (
        <DMTopicPage
            content={content}
            subjectName="Java Programming"
            subjectHref="/subjects/java"
        />
    )
}
