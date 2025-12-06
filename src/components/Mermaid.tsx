'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
    chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
    const [svg, setSvg] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Initialize mermaid only on client side
        mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'inherit',
        })

        const renderChart = async () => {
            try {
                setError(null)
                // Generate a valid ID that starts with a letter
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

                // Check if chart content is valid
                if (!chart) {
                    return
                }

                const { svg } = await mermaid.render(id, chart)
                setSvg(svg)
            } catch (err) {
                console.error('Mermaid render error:', err)
                setError('Failed to render diagram')
                // Keep the previous SVG if possible, or clear it
                if (err instanceof Error) {
                    setError(`Error: ${err.message}`)
                }
            }
        }

        renderChart()
    }, [chart])

    if (error) {
        return (
            <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-lg text-red-400 text-sm font-mono">
                {error}
                <pre className="mt-2 text-xs opacity-50 overflow-x-auto">{chart}</pre>
            </div>
        )
    }

    return (
        <div
            className="mermaid-container flex justify-center p-4 bg-black/20 rounded-lg overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}
