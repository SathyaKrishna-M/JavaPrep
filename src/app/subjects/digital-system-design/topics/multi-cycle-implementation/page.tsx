'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiRefreshCw, FiClock } from 'react-icons/fi'

const content = {
    title: 'Multi-cycle Implementation',
    explanationSections: [
        {
            title: '🔄 Concept',
            icon: <FiRefreshCw className="w-6 h-6" />,
            content: `In a <span class="text-blue-400 font-semibold">Multi-cycle Implementation</span>, an instruction is broken down into a series of steps, with each step taking one clock cycle.
      
      <span class="text-amber-300 font-semibold">Advantages over Single-cycle:</span>
      • <span class="text-cyan-300">Efficiency:</span> Different instructions can take a different number of cycles. Complex instructions don't slow down simple ones.
      • <span class="text-cyan-300">Hardware Reuse:</span> Functional units (like ALU) can be reused within the same instruction execution.
      • <span class="text-cyan-300">Higher Clock Speed:</span> The clock cycle is determined by the longest *step*, not the longest *instruction*.`,
        },
        {
            title: 'State Machine Control',
            icon: <FiClock className="w-6 h-6" />,
            content: `The control unit is implemented as a <span class="text-lime-300 font-semibold">Finite State Machine (FSM)</span>.
      
      <span class="text-cyan-300">Typical States:</span>
      1. <span class="text-white">Instruction Fetch (IF)</span>
      2. <span class="text-white">Instruction Decode & Register Fetch (ID)</span>
      3. <span class="text-white">Execution (EX)</span>
      4. <span class="text-white">Memory Access (MEM)</span>
      5. <span class="text-white">Write Back (WB)</span>`,
            mermaid: `stateDiagram-v2
    [*] --> IF: Start
    IF --> ID: Fetch Complete
    ID --> EX: Decode Complete
    EX --> MEM: Execute Complete
    MEM --> WB: Memory Access Complete
    WB --> IF: Write Back Complete
    
    ID --> IF: Error/Reset`,
        },
    ],
    practiceQuestions: [
        {
            question: 'Why does a multi-cycle implementation allow for a faster clock than a single-cycle implementation?',
            solution: 'In a single-cycle implementation, the clock period must be long enough to accommodate the slowest instruction (critical path). In a multi-cycle implementation, the clock period is determined by the longest individual *stage* (e.g., ALU operation or Memory access), which is much shorter than the time for a full instruction. This allows for a higher clock frequency.',
        },
    ],
}

export default function MultiCycleImplementationPage() {
    return <DSDTopicPage content={content} />
}
