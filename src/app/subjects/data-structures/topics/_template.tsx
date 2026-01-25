import React from 'react'

const Page = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Topic Content
                </h1>
                <p className="text-gray-400 mt-2">
                    This topic is part of the reorganized syllabus. Content is coming soon.
                </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Under Construction</h3>
                <p className="text-gray-400 max-w-md">
                    We are currently working on this topic to align with the new Course Outcomes (CO1-CO6).
                </p>
            </div>
        </div>
    )
}

export default Page
