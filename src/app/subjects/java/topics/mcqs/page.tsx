'use client'

import { useState } from 'react'
import QuizComponent from '@/components/QuizComponent'
import { javaMcqs } from '@/data/java-mcqs'
import { motion } from 'framer-motion'
import { FiBook, FiCpu, FiCode, FiLayers, FiDatabase, FiAlertTriangle } from 'react-icons/fi'

const outcomes = [
    { id: 'co1', label: 'CO1: Fundamentals', icon: FiBook },
    { id: 'co2', label: 'CO2: Arrays & Memory', icon: FiCpu },
    { id: 'co3', label: 'CO3: Strings & Recursion', icon: FiCode },
    { id: 'co4', label: 'CO4: OOP Basics', icon: FiLayers },
    { id: 'co5', label: 'CO5: Inheritance & Poly', icon: FiDatabase },
    { id: 'co6', label: 'CO6: Exceptions & Files', icon: FiAlertTriangle },
]

export default function McqsPage() {
    const [activeTab, setActiveTab] = useState('co1')

    const activeQuestions = javaMcqs[activeTab] || []

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-100 p-8 pt-24">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Java Practice MCQs
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Test your knowledge across all Course Outcomes
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 justify-center bg-white/5 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                    {outcomes.map((co) => {
                        const Icon = co.icon
                        const isActive = activeTab === co.id
                        return (
                            <button
                                key={co.id}
                                onClick={() => setActiveTab(co.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-blue-600/20 text-blue-200 shadow-lg shadow-blue-500/10 border border-blue-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={isActive ? 'text-blue-400' : 'text-gray-500'} />
                                {co.label}
                            </button>
                        )
                    })}
                </div>

                {/* Content Area */}
                <div className="min-h-[400px]">
                    {activeQuestions.length > 0 ? (
                        <QuizComponent key={activeTab} questions={activeQuestions} />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-12 text-center"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiBook className="w-8 h-8 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-300 mb-2">Content Coming Soon</h3>
                            <p className="text-gray-500">
                                Multiple choice questions for {outcomes.find(o => o.id === activeTab)?.label} are currently being prepared.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
