'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiCpu, FiGitMerge } from 'react-icons/fi'

const content = {
    title: 'Mini-project: Processor Subsystems Integration',
    explanationSections: [
        {
            title: '🏗️ Project Overview',
            icon: <FiCpu className="w-6 h-6" />,
            content: `This mini-project involves integrating the various subsystems designed throughout the course to create a simple, functioning processor.
      
      <span class="text-amber-300 font-semibold">Subsystems to Integrate:</span>
      1. <span class="text-cyan-300">ALU (Arithmetic Logic Unit):</span> Performs calculations.
      2. <span class="text-cyan-300">Register File:</span> Stores temporary data.
      3. <span class="text-cyan-300">Control Unit:</span> Decodes instructions and manages signals.
      4. <span class="text-cyan-300">Memory Interface:</span> Connects to instruction and data memory.`,
        },
        {
            title: 'Integration Datapath',
            icon: <FiGitMerge className="w-6 h-6" />,
            content: `The datapath connects these components using buses. The Control Unit drives the select signals for MUXes and enable signals for registers.`,
            mermaid: `graph TD
    PC[Program Counter] --> IM[Instruction Memory]
    IM --> IR[Instruction Register]
    IR --> CU[Control Unit]
    
    CU --> RegFile[Register File]
    CU --> ALU[ALU]
    CU --> DataMem[Data Memory]
    
    RegFile --> ALU
    ALU --> DataMem
    DataMem --> RegFile
    
    style CU fill:#f59e0b
    style ALU fill:#ef4444
    style RegFile fill:#3b82f6`,
        },
        {
            title: 'Implementation Steps',
            icon: <FiList className="w-6 h-6" />,
            content: `1. <span class="text-lime-300">Define ISA:</span> Choose a simple instruction set (e.g., MIPS subset).
      2. <span class="text-lime-300">Design Components:</span> Write Verilog/VHDL for ALU, RegFile, etc.
      3. <span class="text-lime-300">Build Datapath:</span> Connect components.
      4. <span class="text-lime-300">Design Control:</span> Implement FSM for the Control Unit.
      5. <span class="text-lime-300">Simulate:</span> Run test programs to verify functionality.`,
        },
    ],
    practiceQuestions: [
        {
            question: 'What is the most critical part of the integration process?',
            solution: 'Timing analysis is critical. Ensuring that control signals arrive at the correct time relative to the clock edge and that data has propagated through the combinational logic (ALU) before setup time violations occur is essential for a working processor.',
        },
    ],
}

import { FiList } from 'react-icons/fi'

export default function ProcessorIntegrationProjectPage() {
    return <DSDTopicPage content={content} />
}
