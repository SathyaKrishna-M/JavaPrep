'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Multiplexers & Demultiplexers',
  explanationSections: [
    {
      title: '🧠 Multiplexer (MUX)',
      icon: <FiBook className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">multiplexer</span> is a combinational circuit that selects one of many inputs and forwards it to a single output based on select lines.

<span class="text-amber-300 font-semibold">Structure:</span>
• <span class="text-cyan-300">2<sup>n</sup> data inputs:</span> D<sub>0</sub>, D<sub>1</sub>, ..., D<sub>2<sup>n</sup>-1</sub>
• <span class="text-cyan-300">n select lines:</span> S<sub>0</sub>, S<sub>1</sub>, ..., S<sub>n-1</sub> (control which input is selected)
• <span class="text-cyan-300">1 output:</span> Y (selected input value)
• <span class="text-cyan-300">Enable input:</span> Optional, controls MUX operation

<span class="text-lime-300 font-semibold">2:1 Multiplexer:</span>
Boolean Expression: Y = S'·D0 + S·D1

<span class="text-lime-300 font-semibold">4:1 Multiplexer:</span>
Boolean Expression: Y = S1'S0'·D0 + S1'S0·D1 + S1S0'·D2 + S1S0·D3

<span class="text-pink-300 font-semibold">Applications:</span>
• Data routing and selection
• Function generators (implementing Boolean functions)
• Parallel-to-serial conversion
• Data bus multiplexing
• Time division multiplexing`,
      circuitDiagram: { type: 'mux4to1', title: '4:1 Multiplexer Circuit Diagram', width: 500, height: 400 },
      truthTable: {
        headers: ['S1', 'S0', 'Y'],
        rows: [
          ['0', '0', 'D0'],
          ['0', '1', 'D1'],
          ['1', '0', 'D2'],
          ['1', '1', 'D3'],
        ],
        title: '4:1 Multiplexer Truth Table',
      },
    },
    {
      title: '⚙️ Demultiplexer (DEMUX)',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">demultiplexer</span> is the opposite of a multiplexer - it routes a single input to one of many outputs based on select lines.

<span class="text-amber-300 font-semibold">Structure:</span>
• <span class="text-cyan-300">1 data input:</span> D (input to be routed)
• <span class="text-cyan-300">n select lines:</span> S<sub>0</sub>, S<sub>1</sub>, ..., S<sub>n-1</sub> (control which output receives input)
• <span class="text-cyan-300">2<sup>n</sup> outputs:</span> Y<sub>0</sub>, Y<sub>1</sub>, ..., Y<sub>2<sup>n</sup>-1</sub> (only one is active)

<span class="text-lime-300 font-semibold">1:2 Demultiplexer:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
S | Y0 | Y1
--|----|----
0 |  D |  0
1 |  0 |  D

Boolean Expressions:
Y0 = S'·D
Y1 = S·D
</pre>

<span class="text-lime-300 font-semibold">1:4 Demultiplexer:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
S1 | S0 | Y0 | Y1 | Y2 | Y3
---|----|----|----|----|----
 0 |  0 |  D |  0 |  0 |  0
 0 |  1 |  0 |  D |  0 |  0
 1 |  0 |  0 |  0 |  D |  0
 1 |  1 |  0 |  0 |  0 |  D
</pre>

<span class="text-pink-300 font-semibold">Applications:</span>
• Serial-to-parallel conversion
• Data distribution
• Address decoding
• Memory selection
• Signal routing

<span class="text-cyan-300">Note:</span> DEMUX is essentially a decoder with an enable input. If input D is always 1, DEMUX behaves like a decoder.`,
    },
    {
      title: '📊 Implementation and Cascading',
      icon: <FiTarget className="w-6 h-6" />,
      content: `MUX and DEMUX can be implemented using basic gates and can be cascaded to create larger circuits.

<span class="text-amber-300 font-semibold">MUX Implementation:</span>
• <span class="text-cyan-300">2:1 MUX:</span> Requires 2 AND gates, 1 OR gate, 1 NOT gate
• <span class="text-cyan-300">4:1 MUX:</span> Requires 4 AND gates, 1 OR gate, 2 NOT gates
• <span class="text-cyan-300">8:1 MUX:</span> Can be built using two 4:1 MUXes and one 2:1 MUX

<span class="text-lime-300 font-semibold">Building 8:1 MUX from 4:1 MUXes:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
Step 1: Use S1, S0 to select within each 4:1 MUX
  - MUX1: D0-D3, controlled by S1, S0
  - MUX2: D4-D7, controlled by S1, S0

Step 2: Use S2 (MSB) to select between outputs
  - Final 2:1 MUX: Selects between MUX1 and MUX2 outputs

This creates a hierarchical structure.
</pre>

<span class="text-pink-300 font-semibold">MUX as Function Generator:</span>
MUX can implement any Boolean function:
• For n-variable function, use 2<sup>n</sup>:1 MUX
• Connect function inputs to select lines
• Connect function outputs (from truth table) to data inputs
• MUX output implements the function

<span class="text-cyan-300">Example:</span> Implementing F(A,B) = A'B + AB' using 4:1 MUX
• S1=A, S0=B
• D0=0, D1=1, D2=1, D3=0 (from truth table)
• Output Y = F(A,B)`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Understand</span> the operation of multiplexers and demultiplexers
✓ <span class="text-cyan-300">Design</span> 2:1, 4:1, and 8:1 multiplexers
✓ <span class="text-cyan-300">Implement</span> larger MUXes by cascading smaller ones
✓ <span class="text-cyan-300">Use</span> MUX as a function generator to implement Boolean functions
✓ <span class="text-cyan-300">Design</span> demultiplexers and understand their relationship to decoders
✓ <span class="text-cyan-300">Apply</span> MUX/DEMUX in data routing, conversion, and selection applications
✓ <span class="text-cyan-300">Analyze</span> the relationship between number of inputs, select lines, and outputs

MUX and DEMUX are fundamental building blocks in digital system design.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Design a 4:1 multiplexer. What are the inputs, select lines, and output?',
      solution: 'A 4:1 MUX has:\n\nInputs: D0, D1, D2, D3 (4 data inputs)\nSelect lines: S1, S0 (2 select lines, since 2² = 4)\nOutput: Y\n\nFunction:\nY = S1\'S0\'·D0 + S1\'S0·D1 + S1S0\'·D2 + S1S0·D3\n\nWhen S1S0 = 00, Y = D0\nWhen S1S0 = 01, Y = D1\nWhen S1S0 = 10, Y = D2\nWhen S1S0 = 11, Y = D3',
      circuitDiagram: { type: 'mux4to1', title: '4:1 Multiplexer Circuit', width: 500, height: 400 },
      truthTable: {
        headers: ['S1', 'S0', 'Y'],
        rows: [
          ['0', '0', 'D0'],
          ['0', '1', 'D1'],
          ['1', '0', 'D2'],
          ['1', '1', 'D3'],
        ],
        title: '4:1 Multiplexer Truth Table',
      },
    },
    {
      question: 'How can you build an 8:1 MUX using two 4:1 MUXes?',
      solution: 'To build an 8:1 MUX using two 4:1 MUXes:\n\nStep 1: Use S1 and S0 to select within each 4:1 MUX\nStep 2: Use S2 (MSB) to select between the two 4:1 MUX outputs\nStep 3: Connect:\n  - MUX1: D0-D3, controlled by S1, S0\n  - MUX2: D4-D7, controlled by S1, S0\n  - Final 2:1 MUX: Selects between MUX1 and MUX2 outputs using S2\n\nThis creates a hierarchical structure for larger multiplexers.',
    },
    {
      question: 'What is the relationship between a DEMUX and a decoder?',
      solution: 'A DEMUX is essentially a decoder with an enable input:\n\n- Decoder: n inputs → 2^n outputs (one output is active)\n- DEMUX: 1 input + n select lines → 2^n outputs (input routed to selected output)\n\nIf the DEMUX input is always 1, it behaves exactly like a decoder.\n\nBoth can be used for address decoding and data routing applications.',
    },
  ],
}

export default function MuxDemuxPage() {
  return <DSDTopicPage content={content} />
}
