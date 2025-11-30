'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'inherit',
})

interface MermaidProps {
    chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svg, setSvg] = useState<string>('')

    useEffect(() => {
        const renderChart = async () => {
            if (containerRef.current) {
                try {
                    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
                    const { svg } = await mermaid.render(id, chart)
                    setSvg(svg)
                } catch (error) {
                    console.error('Mermaid render error:', error)
                    setSvg('<p class="text-red-500">Failed to render diagram</p>')
                }
            }
        }

        renderChart()
    }, [chart])

    return (
        <div
            ref={containerRef}
            className="mermaid-container flex justify-center p-4 bg-black/20 rounded-lg overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}
