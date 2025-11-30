'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiFastForward, FiAlertTriangle } from 'react-icons/fi'

const content = {
    title: 'Pipelining & Hazards',
    explanationSections: [
        {
            title: '🚀 Instruction Pipelining',
            icon: <FiFastForward className="w-6 h-6" />,
            content: `<span class="text-blue-400 font-semibold">Pipelining</span> is a technique where multiple instructions are overlapped in execution. It increases the throughput of the CPU.
      
      <span class="text-amber-300 font-semibold">5-Stage Pipeline (Classic RISC):</span>
      1. <span class="text-cyan-300">IF:</span> Instruction Fetch
      2. <span class="text-cyan-300">ID:</span> Instruction Decode
      3. <span class="text-cyan-300">EX:</span> Execute
      4. <span class="text-cyan-300">MEM:</span> Memory Access
      5. <span class="text-cyan-300">WB:</span> Write Back`,
            mermaid: `gantt
    title 5-Stage Pipeline Execution
    dateFormat X
    axisFormat %s
    
    section Instr 1
    IF : 0, 1
    ID : 1, 2
    EX : 2, 3
    MEM : 3, 4
    WB : 4, 5
    
    section Instr 2
    IF : 1, 2
    ID : 2, 3
    EX : 3, 4
    MEM : 4, 5
    WB : 5, 6
    
    section Instr 3
    IF : 2, 3
    ID : 3, 4
    EX : 4, 5
    MEM : 5, 6
    WB : 6, 7`,
        },
        {
            title: '⚠️ Pipeline Hazards',
            icon: <FiAlertTriangle className="w-6 h-6" />,
            content: `Hazards prevent the next instruction from executing in the following clock cycle.
      
      <span class="text-lime-300 font-semibold">Types of Hazards:</span>
      1. <span class="text-cyan-300">Structural Hazard:</span> Hardware resource conflict (e.g., two instructions need memory at the same time).
      2. <span class="text-cyan-300">Data Hazard:</span> Data dependency (e.g., an instruction needs the result of a previous instruction that hasn't finished).
         - RAW (Read After Write)
         - WAR (Write After Read)
         - WAW (Write After Write)
      3. <span class="text-cyan-300">Control Hazard (Branch Hazard):</span> Caused by branch instructions changing the PC.`,
        },
    ],
    practiceQuestions: [
        {
            question: 'How can Data Hazards be resolved?',
            solution: 'Data hazards can be resolved by:\n1. Forwarding (Bypassing): Feeding the result directly to the next instruction before writing to register.\n2. Stalling (Bubbling): Inserting NOPs (No Operation) to wait for the data.\n3. Reordering: Compiler reorders instructions to separate dependent instructions.',
        },
    ],
}

export default function PipeliningHazardsPage() {
    return <DSDTopicPage content={content} />
}
