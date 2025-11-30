'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiGrid, FiZap } from 'react-icons/fi'

const content = {
    title: 'Parallel Architectures',
    explanationSections: [
        {
            title: '⚡ Types of Parallelism',
            icon: <FiGrid className="w-6 h-6" />,
            content: `Parallel architecture aims to perform multiple operations simultaneously.
      
      <span class="text-amber-300 font-semibold">Flynn's Taxonomy:</span>
      • <span class="text-cyan-300">SISD:</span> Single Instruction, Single Data (Uniprocessor).
      • <span class="text-cyan-300">SIMD:</span> Single Instruction, Multiple Data (Vector processors, GPUs).
      • <span class="text-cyan-300">MISD:</span> Multiple Instruction, Single Data (Rare).
      • <span class="text-cyan-300">MIMD:</span> Multiple Instruction, Multiple Data (Multicore processors).`,
            mermaid: `graph TD
    subgraph SIMD
    CU[Control Unit] --> PU1[PU 1]
    CU --> PU2[PU 2]
    CU --> PU3[PU 3]
    Data1 --> PU1
    Data2 --> PU2
    Data3 --> PU3
    end`,
        },
        {
            title: 'Advanced Techniques',
            icon: <FiZap className="w-6 h-6" />,
            content: `• <span class="text-cyan-300">Superscalar:</span> Issues multiple instructions per clock cycle to multiple execution units.
      • <span class="text-cyan-300">VLIW (Very Long Instruction Word):</span> Compiler packs multiple operations into a single long instruction.
      • <span class="text-cyan-300">Multithreading:</span> Switching between threads to hide latency.`,
        },
    ],
    practiceQuestions: [
        {
            question: 'What is the main difference between Superscalar and VLIW?',
            solution: 'In Superscalar processors, the hardware (scheduler) decides which instructions to execute in parallel at runtime. In VLIW processors, the compiler decides which instructions to execute in parallel at compile time.',
        },
    ],
}

export default function ParallelArchitecturesPage() {
    return <DSDTopicPage content={content} />
}
