'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiCpu, FiZap } from 'react-icons/fi'

const content = {
    title: 'I/O Organization',
    explanationSections: [
        {
            title: '🔌 I/O Interface',
            icon: <FiCpu className="w-6 h-6" />,
            content: `The <span class="text-blue-400 font-semibold">I/O Interface</span> connects peripheral devices to the CPU and Memory. It handles data format conversion, synchronization, and device control.
      
      <span class="text-amber-300 font-semibold">Data Transfer Modes:</span>
      1. <span class="text-cyan-300">Programmed I/O:</span> CPU constantly checks status (Polling). Slow, wastes CPU time.
      2. <span class="text-cyan-300">Interrupt-Driven I/O:</span> Device interrupts CPU when ready. Efficient.
      3. <span class="text-cyan-300">DMA (Direct Memory Access):</span> Device transfers data directly to memory without CPU intervention. Fastest.`,
        },
        {
            title: 'DMA Controller',
            icon: <FiZap className="w-6 h-6" />,
            content: `The <span class="text-blue-400 font-semibold">DMA Controller</span> takes control of the system bus to transfer blocks of data.
      
      <span class="text-lime-300 font-semibold">Operation:</span>
      1. CPU initializes DMA (source, dest, count).
      2. DMA requests bus (Bus Request).
      3. CPU grants bus (Bus Grant).
      4. DMA transfers data.
      5. DMA interrupts CPU when done.`,
            mermaid: `graph TD
    CPU[CPU] --Bus Grant--> DMA[DMA Controller]
    DMA --Bus Request--> CPU
    DMA --Control--> RAM[Memory]
    DMA --Control--> IO[I/O Device]
    IO --Data--> RAM`,
        },
    ],
    practiceQuestions: [
        {
            question: 'Why is DMA faster for large data transfers?',
            solution: 'DMA is faster because it bypasses the CPU for data movement. In Programmed or Interrupt I/O, data must pass through the CPU registers (Memory -> CPU -> I/O or vice versa). DMA allows direct transfer between Memory and I/O, and the CPU can execute other tasks in parallel (if it has cache) or just wait for the bus.',
        },
    ],
}

export default function IOOrganizationPage() {
    return <DSDTopicPage content={content} />
}
