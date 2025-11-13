'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface MathRendererProps {
  math: string
  display?: boolean
}

export default function MathRenderer({ math, display = false }: MathRendererProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(math, ref.current, {
          throwOnError: false,
          displayMode: display,
        })
      } catch (error) {
        console.error('KaTeX rendering error:', error)
        if (ref.current) {
          ref.current.textContent = math
        }
      }
    }
  }, [math, display])

  return <span ref={ref} className={display ? 'block my-4' : 'inline'} />
}

