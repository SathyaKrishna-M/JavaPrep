'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiMinimize2, FiCheckSquare } from 'react-icons/fi'

const content = {
    title: 'Comparators',
    explanationSections: [
        {
            title: '⚖️ Introduction to Comparators',
            icon: <FiMinimize2 className="w-6 h-6" />,
            content: `A <span class="text-blue-400 font-semibold">Comparator</span> is a combinational logic circuit that compares two binary numbers (A and B) and determines their relative magnitude.
      
      <span class="text-amber-300 font-semibold">Outputs:</span>
      It typically has three outputs:
      • <span class="text-cyan-300">A > B</span> (Greater than)
      • <span class="text-cyan-300">A = B</span> (Equal to)
      • <span class="text-cyan-300">A < B</span> (Less than)
      
      Comparators are fundamental in CPUs for arithmetic operations and in sorting algorithms.`,
            mermaid: `graph LR
    A[Input A] --> Comp[Comparator]
    B[Input B] --> Comp
    Comp --> G[A > B]
    Comp --> E[A = B]
    Comp --> L[A < B]
    style Comp fill:#1e293b,stroke:#3b82f6,stroke-width:2px
    style G fill:#064e3b,stroke:#10b981
    style E fill:#1e3a8a,stroke:#3b82f6
    style L fill:#7f1d1d,stroke:#ef4444`,
        },
        {
            title: '1-Bit Magnitude Comparator',
            icon: <FiCheckSquare className="w-6 h-6" />,
            content: `A <span class="text-blue-400 font-semibold">1-Bit Comparator</span> compares two single bits, A and B.
      
      <span class="text-lime-300 font-semibold">Logic Equations:</span>
      • <span class="text-cyan-300">A = B:</span> A XNOR B (A ⊙ B)
      • <span class="text-cyan-300">A > B:</span> A · B'
      • <span class="text-cyan-300">A < B:</span> A' · B`,
            mermaid: `graph TD
    A((A)) --> NOTA[NOT]
    B((B)) --> NOTB[NOT]
    
    A --> AND1[AND (A>B)]
    NOTB --> AND1
    
    A --> XNOR[XNOR (A=B)]
    B --> XNOR
    
    NOTA --> AND2[AND (A<B)]
    B --> AND2
    
    AND1 --> G[A > B]
    XNOR --> E[A = B]
    AND2 --> L[A < B]`,
            truthTable: {
                headers: ['A', 'B', 'A > B', 'A = B', 'A < B'],
                rows: [
                    ['0', '0', '0', '1', '0'],
                    ['0', '1', '0', '0', '1'],
                    ['1', '0', '1', '0', '0'],
                    ['1', '1', '0', '1', '0'],
                ],
                title: '1-Bit Comparator Truth Table',
            },
        },
        {
            title: '2-Bit Magnitude Comparator',
            content: `A <span class="text-blue-400 font-semibold">2-Bit Comparator</span> compares two 2-bit numbers, A (A₁A₀) and B (B₁B₀).
      
      <span class="text-amber-300 font-semibold">Comparison Logic:</span>
      1. Compare the Most Significant Bits (MSB) A₁ and B₁.
      2. If A₁ ≠ B₁, the relationship is determined by the MSBs.
      3. If A₁ = B₁, then compare the Least Significant Bits (LSB) A₀ and B₀.`,
        },
    ],
    practiceQuestions: [
        {
            question: 'Design a logic circuit for A > B in a 1-bit comparator.',
            solution: 'For A > B, the output is 1 only when A=1 and B=0.\n\nBoolean Expression: Y = A · B\'\n\nThis can be implemented using one NOT gate (for B) and one AND gate.',
            mermaid: `graph LR
    A[A] --> AND[AND]
    B[B] --> NOT[NOT]
    NOT --> AND
    AND --> Y[Y = A.B']`,
        },
    ],
}

export default function ComparatorsPage() {
    return <DSDTopicPage content={content} />
}
