'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiClock, FiFastForward } from 'react-icons/fi'

const content = {
    title: 'Registers & Counters',
    explanationSections: [
        {
            title: '📦 Registers',
            icon: <FiFastForward className="w-6 h-6" />,
            content: `A <span class="text-blue-400 font-semibold">Register</span> is a group of flip-flops used to store binary data. An n-bit register consists of n flip-flops.
      
      <span class="text-amber-300 font-semibold">Types of Shift Registers:</span>
      • <span class="text-cyan-300">SISO:</span> Serial In Serial Out
      • <span class="text-cyan-300">SIPO:</span> Serial In Parallel Out
      • <span class="text-cyan-300">PISO:</span> Parallel In Serial Out
      • <span class="text-cyan-300">PIPO:</span> Parallel In Parallel Out`,
            mermaid: `graph LR
    subgraph "4-Bit SISO Shift Register"
    In[Serial Input] --> FF1[D FF]
    FF1 --> FF2[D FF]
    FF2 --> FF3[D FF]
    FF3 --> FF4[D FF]
    FF4 --> Out[Serial Output]
    CLK[Clock] --> FF1
    CLK --> FF2
    CLK --> FF3
    CLK --> FF4
    end`,
        },
        {
            title: '⏱️ Counters',
            icon: <FiClock className="w-6 h-6" />,
            content: `A <span class="text-blue-400 font-semibold">Counter</span> is a sequential circuit that goes through a prescribed sequence of states upon the application of input pulses.
      
      <span class="text-lime-300 font-semibold">Types:</span>
      1. <span class="text-cyan-300">Asynchronous (Ripple) Counter:</span> Flip-flops are not clocked simultaneously. The output of one FF drives the clock of the next.
      2. <span class="text-cyan-300">Synchronous Counter:</span> All flip-flops are clocked simultaneously by a common clock pulse.`,
            mermaid: `graph LR
    subgraph "2-Bit Ripple Counter"
    CLK[Clock] --> FF0[JK FF 0]
    FF0 --Q0--> FF1[JK FF 1]
    FF1 --Q1--> Out
    High[Logic 1] --> J0
    High --> K0
    High --> J1
    High --> K1
    end`,
        },
        {
            title: 'Special Counters',
            content: `• <span class="text-cyan-300">Ring Counter:</span> A shift register with the output of the last FF connected to the input of the first.
      • <span class="text-cyan-300">Johnson Counter:</span> A shift register with the inverted output of the last FF connected to the input of the first.`,
        },
    ],
    practiceQuestions: [
        {
            question: 'How many flip-flops are required for a MOD-10 counter?',
            solution: 'A MOD-N counter requires n flip-flops such that 2^n >= N.\n\nFor MOD-10 (N=10):\n2^3 = 8 (too small)\n2^4 = 16 (sufficient)\n\nTherefore, 4 flip-flops are required.',
        },
    ],
}

export default function RegistersCountersPage() {
    return <DSDTopicPage content={content} />
}
