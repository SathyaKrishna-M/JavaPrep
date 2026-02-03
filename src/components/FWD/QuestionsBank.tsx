'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiActivity, FiSearch, FiFilter } from 'react-icons/fi'
import { fwdQuestions, FWDQuestion } from '@/data/fwd-questions'
import CodePreview from '@/components/FWD/CodePreview'

// --- Visual Components ---

const BoxModelVisual = () => (
    <div className="flex justify-center p-4">
        <div className="bg-orange-900/20 p-6 border-2 border-dashed border-orange-500/50 relative rounded flex flex-col items-center gap-2">
            <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Margin</span>
            <div className="bg-yellow-900/20 p-6 border-2 border-yellow-500/50 relative rounded flex flex-col items-center gap-2 w-full">
                <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">Border</span>
                <div className="bg-green-900/20 p-6 relative rounded w-full flex flex-col items-center gap-2">
                    <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Padding</span>
                    <div className="bg-blue-600/20 w-full h-10 flex items-center justify-center text-blue-300 font-bold text-xs rounded shadow-inner border border-blue-500/30">
                        Content
                    </div>
                </div>
            </div>
        </div>
    </div>
)

// Helpers for CO-based Styling
const getCOColors = (co: string) => {
    switch (co) {
        case 'CO1': return { border: 'border-l-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10', ring: 'group-hover:ring-blue-500/30' }
        case 'CO2': return { border: 'border-l-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10', ring: 'group-hover:ring-purple-500/30' }
        case 'CO3': return { border: 'border-l-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'group-hover:ring-emerald-500/30' }
        case 'CO4': return { border: 'border-l-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10', ring: 'group-hover:ring-amber-500/30' }
        case 'CO5': return { border: 'border-l-rose-500', text: 'text-rose-400', bg: 'bg-rose-500/10', ring: 'group-hover:ring-rose-500/30' }
        default: return { border: 'border-l-gray-500', text: 'text-gray-400', bg: 'bg-gray-500/10', ring: 'group-hover:ring-gray-500/30' }
    }
}

const QuestionCard = ({ question, index }: { question: FWDQuestion, index: number }) => {
    const [isOpen, setIsOpen] = useState(false)
    const colors = getCOColors(question.co)

    // Check if the answer is code (HTML)
    const isCode = question.type === 'code-snippet' || question.answer.trim().startsWith('<') || question.answer.trim().startsWith('<!DOCTYPE') || question.answer.includes('{')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`group flex flex-col bg-slate-900 border border-slate-800 rounded-lg overflow-hidden transition-all duration-200 border-l-4 ${colors.border} hover:shadow-lg ${isOpen ? 'shadow-lg' : ''} ${colors.ring}`}
        >
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-5 cursor-pointer select-none flex gap-4 items-start"
            >
                {/* Question Info */}
                <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2 items-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                            {question.co}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${question.difficulty === 'Easy' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' :
                            question.difficulty === 'Medium' ? 'bg-amber-500/5 text-amber-400 border-amber-500/20' :
                                'bg-rose-500/5 text-rose-400 border-rose-500/20'
                            }`}>
                            {question.difficulty}
                        </span>
                        {question.visualType && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 flex items-center gap-1">
                                <FiActivity className="w-3 h-3" /> Visual
                            </span>
                        )}
                        <span className="text-gray-600 text-xs font-mono ml-auto">
                            #{question.id.replace('q', '')}
                        </span>
                    </div>

                    <h3 className="text-gray-200 font-medium text-base md:text-lg leading-snug group-hover:text-white transition-colors">
                        {question.question}
                    </h3>
                </div>

                {/* Chevron */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className={`mt-1 p-1 rounded-full text-gray-500 ${colors.bg} group-hover:text-white transition-colors`}
                >
                    <FiChevronDown />
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="bg-slate-950/30 border-t border-slate-800/50"
                    >
                        <div className="p-5 pt-2">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2 mt-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                                Solution
                            </div>

                            {/* IF it's code, we show the CodePreview (Side-by-Side). IF NOT, just text. */}
                            {isCode ? (
                                <CodePreview
                                    title="Solution Code & Preview"
                                    code={question.answer}
                                >
                                    {question.visualType === 'box-model' ? <BoxModelVisual /> : null}
                                </CodePreview>
                            ) : (
                                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line pl-3.5 border-l border-slate-800">
                                    {question.answer}
                                </div>
                            )}

                            {/* Detailed Explanations for non-code */}
                            {question.detailedExplanation && !isCode && (
                                <div className={`mt-4 ${colors.bg} border-l-2 ${colors.border} pl-4 py-3 text-sm text-gray-300 italic rounded-r`}>
                                    {question.detailedExplanation}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function QuestionsBank() {
    const [filterCO, setFilterCO] = useState<string>('ALL')
    const [searchQuery, setSearchQuery] = useState('')

    // Memoized filters
    const filteredQuestions = useMemo(() => {
        let qs = fwdQuestions
        if (filterCO !== 'ALL') {
            qs = qs.filter(q => q.co === filterCO)
        }
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase()
            qs = qs.filter(q =>
                q.question.toLowerCase().includes(lowerQuery) ||
                q.answer.toLowerCase().includes(lowerQuery)
            )
        }
        return qs
    }, [filterCO, searchQuery])

    // Memoized counts
    const counts = useMemo(() => {
        return {
            ALL: fwdQuestions.length,
            CO1: fwdQuestions.filter(q => q.co === 'CO1').length,
            CO2: fwdQuestions.filter(q => q.co === 'CO2').length,
            CO3: fwdQuestions.filter(q => q.co === 'CO3').length,
            CO4: fwdQuestions.filter(q => q.co === 'CO4').length,
            CO5: fwdQuestions.filter(q => q.co === 'CO5').length,
        }
    }, [])

    return (
        <div className="min-h-screen">
            {/* Sticky Filter Header */}
            <div className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 mb-6 py-4 -mx-4 px-4 md:-mx-8 md:px-8 shadow-sm">
                <div className="w-full max-w-[95%] mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Filter Tabs */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar w-full md:w-auto mask-gradient">
                        {['ALL', 'CO1', 'CO2'].map((co) => (
                            <button
                                key={co}
                                onClick={() => setFilterCO(co)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap border border-b-2 ${filterCO === co
                                    ? 'bg-slate-800 text-white border-slate-600 border-b-indigo-500'
                                    : 'bg-transparent text-gray-400 border-transparent hover:bg-slate-900 border-b-transparent'
                                    }`}
                            >
                                {co === 'ALL' ? 'All Questions' : `${co}`}
                                <span className={`px-1.5 py-0.5 rounded text-[9px] ${filterCO === co ? 'bg-black/30' : 'bg-slate-800'
                                    }`}>
                                    {counts[co as keyof typeof counts] || 0}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-64 shrink-0">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Find a question..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded pl-9 pr-4 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Questions List (Full Width) */}
            <div className="w-full max-w-[95%] mx-auto space-y-3 pb-20">
                {filteredQuestions.map((q, i) => (
                    <QuestionCard key={q.id} question={q} index={i} />
                ))}

                {filteredQuestions.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <FiFilter className="w-8 h-8 mx-auto mb-2" />
                        <p>No questions found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
