'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiCpu, FiActivity } from 'react-icons/fi'

const content = {
    title: 'CISC vs RISC Architecture',
    explanationSections: [
        {
            title: '⚖️ Architecture Comparison',
            icon: <FiCpu className="w-6 h-6" />,
            content: `Comparison between <span class="text-blue-400 font-semibold">CISC (Complex Instruction Set Computer)</span> and <span class="text-blue-400 font-semibold">RISC (Reduced Instruction Set Computer)</span>.
      
      <table class="w-full mt-4 text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-700 text-cyan-300">
            <th class="p-2">Feature</th>
            <th class="p-2">CISC</th>
            <th class="p-2">RISC</th>
          </tr>
        </thead>
        <tbody class="text-gray-300">
          <tr class="border-b border-gray-800">
            <td class="p-2">Instruction Set</td>
            <td class="p-2">Large, complex, variable length</td>
            <td class="p-2">Small, simple, fixed length</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="p-2">Cycles per Instruction</td>
            <td class="p-2">Multiple cycles</td>
            <td class="p-2">Single cycle (mostly)</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="p-2">Hardware/Software</td>
            <td class="p-2">Hardware emphasis</td>
            <td class="p-2">Software (Compiler) emphasis</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="p-2">Registers</td>
            <td class="p-2">Few</td>
            <td class="p-2">Many (large register file)</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="p-2">Addressing Modes</td>
            <td class="p-2">Many, complex</td>
            <td class="p-2">Few, simple</td>
          </tr>
          <tr>
            <td class="p-2">Examples</td>
            <td class="p-2">x86, VAX, Motorola 68000</td>
            <td class="p-2">ARM, MIPS, RISC-V</td>
          </tr>
        </tbody>
      </table>`,
        },
        {
            title: 'Design Philosophy',
            icon: <FiActivity className="w-6 h-6" />,
            content: `<span class="text-amber-300 font-semibold">CISC Philosophy:</span>
      "Make hardware complex to simplify the compiler."
      • Instructions can perform complex tasks (e.g., load from memory, add, store back).
      • Code density is high (smaller program size).
      
      <span class="text-amber-300 font-semibold">RISC Philosophy:</span>
      "Make hardware simple and fast; let the compiler handle complexity."
      • Load/Store architecture: Only Load and Store instructions access memory.
      • Operations are performed on registers.
      • Pipelining is easier to implement.`,
            mermaid: `graph TD
    subgraph CISC
    C_Mem[Memory] <--> C_CU[Control Unit (Microcode)]
    C_CU <--> C_ALU[ALU]
    C_ALU <--> C_Reg[Few Registers]
    end
    
    subgraph RISC
    R_Mem[Memory] <--> R_CU[Hardwired Control]
    R_CU --> R_ALU[ALU]
    R_ALU <--> R_Reg[Many Registers]
    end`,
        },
    ],
    practiceQuestions: [
        {
            question: 'Why is pipelining easier in RISC?',
            solution: 'Pipelining is easier in RISC because instructions are of fixed length and simple format. This allows the fetch, decode, and execute stages to be uniform and predictable, minimizing pipeline hazards and stalls.',
        },
    ],
}

export default function CiscRiscPage() {
    return <DSDTopicPage content={content} />
}
