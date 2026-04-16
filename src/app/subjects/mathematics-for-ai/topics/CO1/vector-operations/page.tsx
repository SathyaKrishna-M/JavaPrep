'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMove, FiTarget, FiHash, FiClock } from 'react-icons/fi'

const VisualCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-8 shadow-xl">
        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-300">{title}</span>
        </div>
        <div className="p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[200px]">
            {children}
        </div>
    </div>
)

const content = {
    title: 'Vector Operations & Similarity',
    explanationSections: [
        {
            title: '1️⃣ Dot Product & Cosine Similarity',
            icon: <FiMove className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        The <strong>Dot Product</strong> multiplies two vectors to return a scalar. Geometrically, {"$\\( \\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos(\\theta) \\)$"}.
                    </p>
                    <p className="text-gray-300">
                        However, the Dot Product scales with vector length. To measure pure <em>directional alignment</em>, AI systems use <strong>Cosine Similarity</strong>.
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-center border border-slate-700 text-gray-200">
                        {"$\\text{Cosine Similarity}(\\mathbf{a}, \\mathbf{b}) = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\| \\|\\mathbf{b}\\|} = \\cos(\\theta)$"}
                    </div>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>1:</strong> Identical direction ( {"$\\( \\theta = 0^\\circ \\)"} )</li>
                        <li><strong>0:</strong> Orthogonal/Unrelated ( {"$\\( \\theta = 90^\\circ \\)"} )</li>
                        <li><strong>-1:</strong> Opposite direction</li>
                    </ul>
                </div>
            ),
        },
        {
            title: '2️⃣ Case Study: Movie Recommendation (Bag of Words)',
            icon: <FiTarget className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        A streaming platform wants to recommend movies with similar stories.
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-gray-400">
                        <li><strong>D1:</strong> "A young hero saves the world from aliens"</li>
                        <li><strong>D2:</strong> "A brave hero fights aliens to save Earth"</li>
                        <li><strong>D3:</strong> "A romantic story about love and friendship"</li>
                    </ul>
                    <p className="text-gray-300 mt-4">
                        We extract keywords and encode them functionally as binary presence vectors (1 = present, 0 = absent). Based on overlapping words, D1 and D2 share common themes (hero, aliens).
                    </p>
                    <div className="bg-gray-800 rounded p-4 font-mono text-xs overflow-x-auto text-gray-300 border border-gray-700">
                        D1: {"$\\( \\mathbf{v}_1 \\)"} = (1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0)<br/>
                        D2: {"$\\( \\mathbf{v}_2 \\)"} = (0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0)
                    </div>
                    <p className="text-gray-300">
                        Calculating similarity: {"$\\( \\mathbf{v}_1 \\cdot \\mathbf{v}_2 = 2 \\)$"} (words "hero", "aliens").<br/>
                        {"$\\( \\|\\mathbf{v}_1\\| = \\sqrt{5} \\)$"}, {"$\\( \\|\\mathbf{v}_2\\| = \\sqrt{5} \\)$"}.<br/>
                        Similarity(D1, D2) = {"$\\( 2 / (\\sqrt{5} \\cdot \\sqrt{5}) = 0.4 \\)$"}.
                    </p>
                </div>
            )
        },
        {
            title: '3️⃣ Advanced Similarity: TF-IDF',
            icon: <FiHash className="w-6 h-6" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-300">
                        Bag of Words treats "the" and "AI" as equally important. To fix this, AI search engines (like Google) use <strong>TF-IDF</strong> (Term Frequency – Inverse Document Frequency).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 border border-indigo-500 rounded text-sm text-gray-300">
                            <strong>TF (Term Frequency)</strong><br/>
                            How often a word appears in a <em>specific document</em>. Rare words in the document get low scores, frequent words get high scores.<br/>
                            <span className="font-mono text-indigo-400 mt-2 block">{"$\\text{TF}(t, d) = \\frac{\\text{Count}(t)}{\\text{Total Terms}}$"}</span>
                        </div>
                        <div className="bg-slate-800 p-4 border border-purple-500 rounded text-sm text-gray-300">
                            <strong>IDF (Inverse Document Frequency)</strong><br/>
                            How often a word appears across <em>ALL documents</em>. Common words ("is", "the", "AI") get penalized to 0. Rare unique words remain high.<br/>
                            <span className="font-mono text-purple-400 mt-2 block">{"$\\text{IDF}(t) = \\log\\left(\\frac{N}{\\text{DF}(t)}\\right)$"}</span>
                        </div>
                    </div>
                    <p className="text-gray-300">
                        <strong>Practical Note:</strong> If two documents share the word "AI" but they are both from an AI textbook, TF-IDF will zero out the contribution of "AI" because it appears everywhere! It correctly identifies that the documents might be lexically similar but conceptually different if there are no other unique overlaps.
                    </p>
                </div>
            )
        }
    ],
    practiceQuestions: [
        {
            question: "Why do we use Cosine Similarity instead of Euclidean Distance when matching full text documents?",
            solution: "Documents can vary wildly in length (magnitude). Exploring the angle (cosine similarity) evaluates the proportional distribution of terms irrespective of whether the document is 5 pages or 500 pages."
        },
        {
            question: "In TF-IDF, what happens to the IDF score of a word that appears in every single document in the corpus?",
            solution: "If a word appears in every document, DF(t) = N. The IDF formula becomes log(N / N) = log(1) = 0. Its importance is correctly zeroed out."
        }
    ],
    exampleProblems: [
        {
            problem: "Document 1: 'Mathematics is vital for AI'. Document 2: 'AI depends on mathematical models'. Using generic Bag of Words without TF-IDF, what is the Cosine Similarity after removing stopwords ('is', 'for', 'on') and tokenizing?",
            solution: "Cosine Similarity is 0.",
            steps: [
                {
                    step: 'Tokenize',
                    explanation: 'D1: {mathematics, vital, ai}. D2: {ai, depends, mathematical, models}'
                },
                {
                    step: 'Find Vocab and Dots',
                    explanation: 'The only exact repeating token is "ai". Thus D1 dot D2 = 1. Both have magnitudes of sqrt(3) and sqrt(4) respectively.'
                },
                {
                    step: 'Cosine Similarity',
                    explanation: '{"$\\( \\frac{1}{\\sqrt{3} \\cdot \\sqrt{4}} = \\frac{1}{3.46} = 0.288 \\)$"}.'
                }
            ]
        }
    ]
}

export default function VectorOperationsPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Mathematics for AI"
            subjectHref="/subjects/mathematics-for-ai"
        />
    )
}
