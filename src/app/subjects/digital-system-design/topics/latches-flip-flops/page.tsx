'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiRefreshCw, FiLayers } from 'react-icons/fi'

const content = {
    title: 'Latches & Flip-Flops',
    explanationSections: [
        {
            title: '🔄 Latches vs. Flip-Flops',
            icon: <FiRefreshCw className="w-6 h-6" />,
            content: `Both <span class="text-blue-400 font-semibold">Latches</span> and <span class="text-blue-400 font-semibold">Flip-Flops</span> are bistable multivibrators used as memory elements.
      
      <span class="text-amber-300 font-semibold">Key Differences:</span>
      <table class="w-full mt-4 text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-700 text-cyan-300">
            <th class="p-2">Feature</th>
            <th class="p-2">Latch</th>
            <th class="p-2">Flip-Flop</th>
          </tr>
        </thead>
        <tbody class="text-gray-300">
          <tr class="border-b border-gray-800">
            <td class="p-2">Triggering</td>
            <td class="p-2">Level-triggered</td>
            <td class="p-2">Edge-triggered</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="p-2">Clock</td>
            <td class="p-2">No clock (usually Enable)</td>
            <td class="p-2">Has Clock input</td>
          </tr>
          <tr>
            <td class="p-2">Sync</td>
            <td class="p-2">Asynchronous</td>
            <td class="p-2">Synchronous</td>
          </tr>
        </tbody>
      </table>`,
        },
        {
            title: 'SR Flip-Flop',
            icon: <FiLayers className="w-6 h-6" />,
            content: `The <span class="text-blue-400 font-semibold">SR (Set-Reset) Flip-Flop</span> has two inputs: Set (S) and Reset (R).
      
      • <span class="text-cyan-300">S=1, R=0:</span> Sets Q to 1
      • <span class="text-cyan-300">S=0, R=1:</span> Resets Q to 0
      • <span class="text-cyan-300">S=0, R=0:</span> No Change (Hold)
      • <span class="text-red-400">S=1, R=1:</span> Invalid/Undefined state`,
            mermaid: `graph LR
    S[S] --> NAND1
    R[R] --> NAND2
    CLK[Clock] --> NAND1
    CLK --> NAND2
    NAND1 --> NAND3
    NAND2 --> NAND4
    NAND3 --Q--> NAND4
    NAND4 --Q'--> NAND3
    NAND3 --> Q[Q]
    NAND4 --> Qbar[Q']`,
            truthTable: {
                headers: ['CLK', 'S', 'R', 'Q(next)', 'State'],
                rows: [
                    ['↑', '0', '0', 'Q', 'No Change'],
                    ['↑', '0', '1', '0', 'Reset'],
                    ['↑', '1', '0', '1', 'Set'],
                    ['↑', '1', '1', '?', 'Invalid'],
                ],
                title: 'SR Flip-Flop Truth Table',
            },
        },
        {
            title: 'JK Flip-Flop',
            content: `The <span class="text-blue-400 font-semibold">JK Flip-Flop</span> improves the SR flip-flop by handling the invalid state (1,1).
      
      • <span class="text-cyan-300">J=1, K=1:</span> Toggles the output (Q becomes Q')`,
            mermaid: `graph LR
    J[J] --> AND1
    K[K] --> AND2
    CLK[Clock] --> AND1
    CLK --> AND2
    Qbar_fb[Q' feedback] --> AND1
    Q_fb[Q feedback] --> AND2
    AND1 --> FF[SR Latch Logic]
    AND2 --> FF
    FF --> Q[Q]
    FF --> Qbar[Q']`,
        },
        {
            title: 'D Flip-Flop',
            content: `The <span class="text-blue-400 font-semibold">D (Data) Flip-Flop</span> ensures that S and R are never equal. It captures the value of D at the clock edge.
      
      • Used for data storage and delay lines.`,
            mermaid: `graph LR
    D[D] --> NAND1
    D --> NOT[NOT] --> NAND2
    CLK[Clock] --> NAND1
    CLK --> NAND2
    NAND1 --> Latch[Latch]
    NAND2 --> Latch
    Latch --> Q[Q]
    Latch --> Qbar[Q']`,
        },
    ],
    practiceQuestions: [
        {
            question: 'What is the "Race Around Condition" in JK Flip-Flops?',
            solution: 'The Race Around Condition occurs in a level-triggered JK flip-flop when J=1, K=1, and the clock pulse width is longer than the propagation delay of the flip-flop. The output toggles multiple times within a single clock pulse.\n\nSolution: Use Master-Slave JK Flip-Flop or Edge-Triggering.',
        },
    ],
}

export default function LatchesFlipFlopsPage() {
    return <DSDTopicPage content={content} />
}
