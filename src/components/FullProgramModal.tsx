'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface FullProgramExplanation {
    lines: number[]; // e.g., [1, 2, 3] or [1]
    content: React.ReactNode | string;
}

export interface FullProgram {
    code: string;
    explanations: FullProgramExplanation[];
}

interface FullProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
    program: FullProgram;
    language?: string;
}

export default function FullProgramModal({ isOpen, onClose, program, language = 'java' }: FullProgramModalProps) {
    const [activeLines, setActiveLines] = useState<number[]>([]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-slate-900 border border-slate-700 rounded-2xl w-full h-full max-w-7xl flex flex-col overflow-hidden shadow-2xl relative"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50 flex-shrink-0">
                            <h3 className="text-xl font-bold text-cyan-400">Full Program View</h3>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
                                aria-label="Close modal"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Split */}
                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
                            {/* Left Panel: Code */}
                            <div className="w-full md:w-1/2 md:border-r border-slate-700 h-1/2 md:h-full overflow-y-auto bg-slate-900 p-4">
                                <SyntaxHighlighter
                                    language={language}
                                    style={oneDark}
                                    customStyle={{
                                        margin: 0,
                                        padding: 0,
                                        background: 'transparent',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.6',
                                    }}
                                    lineProps={(lineNumber) => {
                                        const isHighlighted = activeLines.includes(lineNumber);
                                        return {
                                            style: {
                                                backgroundColor: isHighlighted ? 'rgba(0, 180, 255, 0.15)' : 'transparent',
                                                display: 'block',
                                                borderLeft: isHighlighted ? '3px solid rgba(0, 180, 255, 0.8)' : '3px solid transparent',
                                                transition: 'all 0.2s ease',
                                                paddingLeft: '0.5rem',
                                                marginLeft: '-0.5rem',
                                            }
                                        }
                                    }}
                                    showLineNumbers
                                    wrapLines
                                >
                                    {program.code}
                                </SyntaxHighlighter>
                            </div>

                            {/* Right Panel: Explanations */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto p-6 bg-slate-800/30">
                                <h4 className="text-lg font-semibold text-gray-200 mb-6">Line-by-Line Explanation</h4>
                                <ol className="space-y-6 list-decimal list-outside ml-4 text-gray-300">
                                    {program.explanations.map((exp, index) => {
                                        let lineLabel = "";
                                        if (exp.lines.length === 1) {
                                            lineLabel = "Line: " + exp.lines[0];
                                        } else if (exp.lines.length > 1) {
                                            const sorted = [...exp.lines].sort((a, b) => a - b);
                                            lineLabel = "Lines: " + sorted[0] + " - " + sorted[sorted.length - 1];
                                        }

                                        return (
                                            <li
                                                key={index}
                                                className="pl-2"
                                                onMouseEnter={() => setActiveLines(exp.lines)}
                                                onMouseLeave={() => setActiveLines([])}
                                            >
                                                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-colors cursor-default">
                                                    {lineLabel && (
                                                        <div className="text-xs font-mono text-cyan-400 mb-2">
                                                            {lineLabel}
                                                        </div>
                                                    )}
                                                    <div className="text-sm text-gray-300">
                                                        {exp.content}
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
