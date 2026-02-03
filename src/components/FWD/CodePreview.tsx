'use client'

import React from 'react'
import { FiCode } from 'react-icons/fi'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodePreviewProps {
    title?: string
    code: string
    children?: React.ReactNode
    previewHeight?: string
}

export default function CodePreview({ title = "Example", code, children, previewHeight = "min-h-[150px]" }: CodePreviewProps) {
    // Determine if we should show the preview section. 
    // If children provides a preview, use it.
    // If NOT, we try to use the code itself as the HTML for the preview (if it's HTML)
    const showPreview = !!children || code.trim().startsWith('<')

    return (
        <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl overflow-hidden mb-6 shadow-lg mt-4">
            {/* Header */}
            <div className="bg-[#252526] px-4 py-2 border-b border-[#333] flex justify-between items-center">
                <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <FiCode className="text-blue-400" /> {title}
                </span>
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
            </div>

            <div className={`grid grid-cols-1 ${showPreview ? 'md:grid-cols-2' : ''}`}>
                {/* Code Side */}
                <div className={`bg-[#1e1e1e] md:border-b-0 ${showPreview ? 'md:border-r border-[#333]' : ''} overflow-x-auto relative group`}>
                    <div className="absolute top-0 right-0 p-2 z-10">
                        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider bg-[#252526] px-2 py-1 rounded">HTML</span>
                    </div>

                    <SyntaxHighlighter
                        language="html"
                        style={vscDarkPlus}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            background: 'transparent',
                            fontSize: '0.875rem',
                            lineHeight: '1.5',
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>

                {/* Preview Side */}
                {showPreview && (
                    <div className="bg-[#1e1e1e] p-4 relative flex flex-col">
                        <div className="text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider pl-1">Browser Preview</div>
                        <div className={`p-1 bg-white rounded text-slate-900 border border-slate-600 h-full ${previewHeight} flex flex-col justify-center overflow-auto`}>
                            <div className="w-full h-full rounded overflow-hidden relative">
                                {/* If children exist (custom preview), render them. Otherwise render the code as raw HTML */}
                                {children ? children : (
                                    <iframe
                                        srcDoc={code}
                                        className="w-full h-full border-0"
                                        title="preview"
                                        sandbox="allow-scripts"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
