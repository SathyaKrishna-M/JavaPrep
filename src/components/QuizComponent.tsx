'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX, FiAlertCircle } from 'react-icons/fi'
import CodeBlock from './CodeBlock'

export interface Question {
    id: number
    question: string
    options: string[]
    correctIndex: number
    explanation: string
    relatedTopic?: string
    codeSnippet?: string
}

interface QuizComponentProps {
    questions: Question[]
}

export default function QuizComponent({ questions }: QuizComponentProps) {
    // Track selected option for each question: { [questionId]: optionIndex }
    const [selections, setSelections] = useState<{ [key: number]: number }>({})

    const handleOptionSelect = (questionId: number, optionIndex: number) => {
        setSelections(prev => ({ ...prev, [questionId]: optionIndex }))
    }

    return (
        <div className="space-y-8">
            {questions.map((q, index) => {
                const userSelected = selections[q.id]
                const isAnswered = userSelected !== undefined
                const isCorrect = userSelected === q.correctIndex
                const showRevision = isAnswered && !isCorrect && q.relatedTopic

                return (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 overflow-hidden"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono text-sm font-bold border border-blue-500/20">
                                {index + 1}
                            </span>
                            <h3 className="text-lg font-medium text-gray-200 leading-tight pt-1">
                                {q.question}
                            </h3>
                        </div>

                        {q.codeSnippet && (
                            <div className="ml-12 mb-6">
                                <CodeBlock code={q.codeSnippet} language="java" />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                            {q.options.map((option, optIdx) => {
                                let optionClass = "p-3 rounded-lg border text-sm transition-all duration-200 text-left flex items-center justify-between group "
                                const isSelected = userSelected === optIdx
                                const isThisCorrect = q.correctIndex === optIdx

                                if (isAnswered) {
                                    if (isThisCorrect) {
                                        optionClass += "bg-green-500/20 border-green-500/50 text-green-200"
                                    } else if (isSelected && !isCorrect) {
                                        optionClass += "bg-red-500/20 border-red-500/50 text-red-200"
                                    } else {
                                        optionClass += "bg-white/5 border-white/5 text-gray-500 opacity-50"
                                    }
                                } else {
                                    optionClass += "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white cursor-pointer"
                                }

                                return (
                                    <button
                                        key={optIdx}
                                        onClick={() => !isAnswered && handleOptionSelect(q.id, optIdx)}
                                        disabled={isAnswered}
                                        className={optionClass}
                                    >
                                        <span>{option}</span>
                                        {isAnswered && isThisCorrect && <FiCheck className="w-5 h-5 text-green-400" />}
                                        {isAnswered && isSelected && !isCorrect && <FiX className="w-5 h-5 text-red-400" />}
                                    </button>
                                )
                            })}
                        </div>

                        <AnimatePresence>
                            {isAnswered && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="ml-12 mt-4"
                                >
                                    <div className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-500/10 border-green-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-start gap-2">
                                                <FiAlertCircle className={`w-5 h-5 mt-0.5 ${isCorrect ? 'text-green-400' : 'text-blue-400'}`} />
                                                <div>
                                                    <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-400' : 'text-blue-400'}`}>
                                                        {isCorrect ? 'Correct!' : 'Explanation:'}
                                                    </p>
                                                    <p className="text-gray-300 text-sm leading-relaxed">
                                                        {q.explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )
            })}
        </div>
    )
}
