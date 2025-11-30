'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiZap, FiLayers } from 'react-icons/fi'

const content = {
    title: 'Instruction Level Parallelism (ILP)',
    explanationSections: [
        {
            title: '⚡ What is ILP?',
            icon: <FiZap className="w-6 h-6" />,
            content: `<span class="text-blue-400 font-semibold">Instruction Level Parallelism (ILP)</span> is a measure of how many of the instructions in a computer program can be executed simultaneously.
      
      <span class="text-amber-300 font-semibold">Goal:</span> Increase the number of instructions executed per clock cycle (IPC).`,
        },
        {
            title: 'Techniques to Exploit ILP',
            icon: <FiLayers className="w-6 h-6" />,
            content: `<span class="text-lime-300 font-semibold">1. Pipelining:</span> Overlapping the execution of instructions.
      <span class="text-lime-300 font-semibold">2. Superscalar Execution:</span> Multiple execution units (ALUs) to execute more than one instruction per cycle.
      <span class="text-lime-300 font-semibold">3. Out-of-Order Execution:</span> Executing instructions as soon as their operands are available, rather than in program order.
      <span class="text-lime-300 font-semibold">4. Speculative Execution:</span> Guessing the outcome of branches to keep the pipeline full.`,
            mermaid: `graph TD
    subgraph "Sequential Execution"
    I1[Instr 1] --> I2[Instr 2] --> I3[Instr 3]
    end
    
    subgraph "ILP Execution"
    P1[Instr 1]
    P2[Instr 2]
    P3[Instr 3]
    end
    
    style P1 fill:#22c55e
    style P2 fill:#22c55e
    style P3 fill:#22c55e`,
        },
    ],
    practiceQuestions: [
        {
            question: 'What limits the amount of ILP that can be achieved?',
            solution: 'ILP is limited by:\n1. Data Dependencies (True, Output, Anti-dependencies).\n2. Control Dependencies (Branches).\n3. Resource Conflicts (Limited hardware units).\n4. Memory Latency.',
        },
    ],
}

export default function ILPPage() {
    return <DSDTopicPage content={content} />
}
