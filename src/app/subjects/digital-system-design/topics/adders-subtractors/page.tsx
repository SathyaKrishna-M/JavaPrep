'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'
import { FlowStep, FlowEdge } from '@/components/AnimatedFlowchart'

const content = {
  title: 'Adders & Subtractors',
  explanationSections: [
    {
      title: '🧠 Half Adder',
      icon: <FiBook className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">half adder</span> is a combinational logic circuit that performs the arithmetic addition of two bits. Such a circuit has two inputs that represent the two bits to be added and two outputs, with one producing the SUM output and the other producing the CARRY.

<span class="text-amber-300 font-semibold">Inputs and Outputs:</span>
• <span class="text-cyan-300">Inputs:</span> A, B (two bits to be added)
• <span class="text-cyan-300">Outputs:</span> SUM (S), CARRY (C)

<span class="text-pink-300 font-semibold">Boolean Expressions:</span>
• <span class="text-cyan-300">Sum:</span> S = A'B + AB' = A ⊕ B
• <span class="text-cyan-300">Carry:</span> C = A · B

<span class="text-cyan-300">Logic Implementation:</span>
• Sum requires 1 XOR gate (A ⊕ B)
• Carry requires 1 AND gate (A · B)

<span class="text-amber-300 font-semibold">Limitation:</span> Cannot handle carry from previous stage, making it unsuitable for multi-bit addition.`,
      circuitDiagram: { type: 'half-adder', title: 'Half Adder Logic Diagram', width: 500, height: 300 },
      truthTable: {
        headers: ['A', 'B', 'SUM', 'CARRY'],
        rows: [
          ['0', '0', '0', '0'],
          ['0', '1', '1', '0'],
          ['1', '0', '1', '0'],
          ['1', '1', '0', '1'],
        ],
        title: 'Half Adder Truth Table',
      },
    },
    {
      title: '⚙️ Full Adder',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">full adder</span> is an arithmetic circuit block that can be used to add three bits to produce a SUM and a CARRY output. Two of the input variables A and B represent the two significant bits to be added and the third input C (or C<sub>in</sub>) represents the carry from the previous lower significant position.

<span class="text-amber-300 font-semibold">Inputs and Outputs:</span>
• <span class="text-cyan-300">Inputs:</span> A, B, C (or C<sub>in</sub> - carry-in from previous stage)
• <span class="text-cyan-300">Outputs:</span> SUM (S), CARRY (C<sub>out</sub> or CY)

<span class="text-pink-300 font-semibold">Sum-of-Minterms Expressions:</span>
• <span class="text-cyan-300">Sum:</span> S = Σm(1, 2, 4, 7) = A'B'C + A'BC' + AB'C' + ABC
• <span class="text-cyan-300">Carry:</span> CARRY = Σm(3, 5, 6, 7) = A'BC + AB'C + ABC' + ABC

<span class="text-pink-300 font-semibold">Simplified Boolean Expressions:</span>
• <span class="text-cyan-300">Sum (S):</span> S = A ⊕ B ⊕ C = C'(A'B + AB') + C(AB + A'B')
• <span class="text-cyan-300">Carry (CARRY):</span> CARRY = AB + C(A ⊕ B) = C(A'B + AB') + AB(C + C')

<span class="text-cyan-300">Logic Implementation:</span>
• Sum: Two XOR gates in cascade (A ⊕ B, then result ⊕ C)
• Carry: Two AND gates and one OR gate (AB, C(A ⊕ B), then OR them)`,
      circuitDiagram: { type: 'full-adder', title: 'Full Adder Logic Diagram', width: 700, height: 400 },
      truthTable: {
        headers: ['A', 'B', 'C', 'S', 'CY'],
        rows: [
          ['0', '0', '0', '0', '0'],
          ['0', '0', '1', '1', '0'],
          ['0', '1', '0', '1', '0'],
          ['0', '1', '1', '0', '1'],
          ['1', '0', '0', '1', '0'],
          ['1', '0', '1', '0', '1'],
          ['1', '1', '0', '0', '1'],
          ['1', '1', '1', '1', '1'],
        ],
        title: 'Full Adder Truth Table',
      },
    },
    {
      title: '🔧 Full Adder Using Two Half Adders',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `A full adder can indeed be constructed using two half adders and an additional OR gate.

<span class="text-amber-300 font-semibold">Construction Steps:</span>

<span class="text-cyan-300">1. Using Two Half Adders:</span>
• First, use one half adder to add the two input bits (A and B). This produces a partial sum (S<sub>1</sub> = A ⊕ B) and a carry (C<sub>1</sub> = A · B).
• Then, use another half adder to add the partial sum (S<sub>1</sub>) from the first half adder and the third input bit (C<sub>in</sub>). This produces the final sum (S = (A ⊕ B) ⊕ C<sub>in</sub>) and another carry (C<sub>2</sub> = C<sub>in</sub>(A ⊕ B)).

<span class="text-cyan-300">2. Using an OR Gate:</span>
• Finally, combine the carry outputs (C<sub>1</sub> and C<sub>2</sub>) from the two half adders using an OR gate to obtain the overall carry-out (C<sub>out</sub> = A · B + C<sub>in</sub>(A ⊕ B)) from the full adder.

<span class="text-lime-300 font-semibold">Result:</span>
The resulting circuit effectively adds three input bits (A, B, and C<sub>in</sub>), producing a sum output (S) and a carry-out (C<sub>out</sub>). This arrangement allows for the construction of a full adder using only two half adders and an OR gate, making it a simple and efficient implementation of the full adder functionality.`,
      circuitDiagram: { type: 'full-adder-half-adders', title: 'Full Adder using Two Half Adders and OR Gate', width: 700, height: 400 },
    },
    {
      title: '📊 Ripple Carry Adder',
      icon: <FiTarget className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">ripple carry adder</span> connects multiple full adders to add multi-bit numbers.

<span class="text-amber-300 font-semibold">Structure:</span>
• Connect n full adders in cascade
• C<sub>out</sub> of each stage connects to C<sub>in</sub> of next stage
• First stage can use half adder (C<sub>in</sub> = 0) or full adder with C<sub>in</sub> = 0

<span class="text-lime-300 font-semibold">Example: 4-bit Ripple Carry Adder</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
    A3 A2 A1 A0
  + B3 B2 B1 B0
  ------------
    S3 S2 S1 S0

FA3 → FA2 → FA1 → FA0
 |      |      |      |
Cout   Cout   Cout   Cout
</pre>

<span class="text-pink-300 font-semibold">Characteristics:</span>
• <span class="text-cyan-300">Delay:</span> Propagation delay = n × (delay of one full adder)
• <span class="text-cyan-300">Speed:</span> Slower for large n due to ripple effect
• <span class="text-cyan-300">Complexity:</span> Simple design, easy to implement
• <span class="text-cyan-300">Cost:</span> Low gate count

<span class="text-cyan-300">Applications:</span> Used in ALUs, processors, and arithmetic units where moderate speed is acceptable.`,
    },
    {
      title: '🧩 Half Subtractor',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">half subtractor</span> performs binary subtraction of two single-bit numbers.

<span class="text-amber-300 font-semibold">Inputs and Outputs:</span>
• <span class="text-cyan-300">Inputs:</span> A (minuend), B (subtrahend)
• <span class="text-cyan-300">Outputs:</span> Difference (D), Borrow (B<sub>out</sub>)

<span class="text-cyan-300">Boolean Expressions:</span>
• D = A ⊕ B
• B<sub>out</sub> = A' · B

<span class="text-lime-300 font-semibold">Logic Implementation:</span>
• Difference requires 1 XOR gate
• Borrow requires 1 AND gate (with A' input)`,
      truthTable: {
        headers: ['A', 'B', 'D (Difference)', 'Bout (Borrow)'],
        rows: [
          ['0', '0', '0', '0'],
          ['0', '1', '1', '1'],
          ['1', '0', '1', '0'],
          ['1', '1', '0', '0'],
        ],
        title: 'Half Subtractor Truth Table',
      },
    },
    {
      title: '🧩 Full Subtractor',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">full subtractor</span> subtracts three bits: two input bits and a borrow-in from the previous stage.

<span class="text-amber-300 font-semibold">Inputs and Outputs:</span>
• <span class="text-cyan-300">Inputs:</span> A, B, B<sub>in</sub> (borrow-in)
• <span class="text-cyan-300">Outputs:</span> Difference (D), B<sub>out</sub> (borrow-out)

<span class="text-cyan-300">Boolean Expressions:</span>
• D = A ⊕ B ⊕ B<sub>in</sub>
• B<sub>out</sub> = A'B + A'B<sub>in</sub> + BB<sub>in</sub>

<span class="text-pink-300 font-semibold">Alternative Method:</span>
Subtraction can also be performed using adders with 2's complement representation:
• A - B = A + (-B) = A + (2's complement of B)
• This method is more efficient and commonly used in digital systems.`,
      truthTable: {
        headers: ['A', 'B', 'Bin', 'D', 'Bout'],
        rows: [
          ['0', '0', '0', '0', '0'],
          ['0', '0', '1', '1', '1'],
          ['0', '1', '0', '1', '1'],
          ['0', '1', '1', '0', '1'],
          ['1', '0', '0', '1', '0'],
          ['1', '0', '1', '0', '0'],
          ['1', '1', '0', '0', '0'],
          ['1', '1', '1', '1', '1'],
        ],
        title: 'Full Subtractor Truth Table',
      },
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Design</span> half adder and full adder circuits
✓ <span class="text-cyan-300">Understand</span> the truth tables and Boolean expressions for adders
✓ <span class="text-cyan-300">Implement</span> full adder using half adders
✓ <span class="text-cyan-300">Construct</span> multi-bit ripple carry adders
✓ <span class="text-cyan-300">Design</span> half subtractor and full subtractor circuits
✓ <span class="text-cyan-300">Understand</span> the relationship between adders and subtractors
✓ <span class="text-cyan-300">Apply</span> 2's complement method for subtraction using adders
✓ <span class="text-cyan-300">Analyze</span> propagation delay in ripple carry adders

Adders and subtractors are fundamental components in arithmetic logic units (ALUs) and processors.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Design a full adder using two half adders and an OR gate.',
      solution: 'Step 1: First half adder adds A and B\n  S1 = A ⊕ B\n  C1 = A · B\n\nStep 2: Second half adder adds S1 and Cin\n  S = S1 ⊕ Cin = (A ⊕ B) ⊕ Cin\n  C2 = S1 · Cin = (A ⊕ B) · Cin\n\nStep 3: OR gate combines carries\n  Cout = C1 + C2 = AB + (A ⊕ B) · Cin\n\nThis implements the full adder functionality.',
      circuitDiagram: { type: 'full-adder', title: 'Full Adder using Half Adders', width: 700, height: 400 },
    },
    {
      question: 'What is the output of a full adder when A=1, B=1, Cin=1?',
      solution: 'Given: A = 1, B = 1, Cin = 1\n\nSum (S) = A ⊕ B ⊕ Cin = 1 ⊕ 1 ⊕ 1 = 0 ⊕ 1 = 1\n\nCarry-out (Cout) = AB + BCin + ACin\n                 = (1·1) + (1·1) + (1·1)\n                 = 1 + 1 + 1\n                 = 1\n\nAnswer: S = 1, Cout = 1',
      truthTable: {
        headers: ['A', 'B', 'Cin', 'S', 'Cout'],
        rows: [
          ['0', '0', '0', '0', '0'],
          ['0', '0', '1', '1', '0'],
          ['0', '1', '0', '1', '0'],
          ['0', '1', '1', '0', '1'],
          ['1', '0', '0', '1', '0'],
          ['1', '0', '1', '0', '1'],
          ['1', '1', '0', '0', '1'],
          ['1', '1', '1', '1', '1'],
        ],
        title: 'Full Adder Truth Table (highlighted row: A=1, B=1, Cin=1)',
      },
    },
    {
      question: 'How many full adders are needed to add two 4-bit numbers?',
      solution: 'To add two 4-bit numbers, we need:\n\n- 4 full adders (one for each bit position)\n- The carry-out from each stage connects to the carry-in of the next stage\n- The first stage can use a half adder (Cin = 0) or full adder with Cin = 0\n\nAnswer: 4 full adders (or 3 full adders + 1 half adder)',
    },
  ],
  flowchartNodes: [
    { id: 'start', label: 'Start: Input A, B, Cin', type: 'start' },
    { id: 'xor1', label: 'S1 = A ⊕ B', type: 'process' },
    { id: 'and1', label: 'C1 = A · B', type: 'process' },
    { id: 'xor2', label: 'S = S1 ⊕ Cin', type: 'process' },
    { id: 'and2', label: 'C2 = S1 · Cin', type: 'process' },
    { id: 'or', label: 'Cout = C1 + C2', type: 'process' },
    { id: 'end', label: 'Output: S, Cout', type: 'end' },
  ] as FlowStep[],
  flowchartEdges: [
    { id: 'e1', source: 'start', target: 'xor1' },
    { id: 'e2', source: 'start', target: 'and1' },
    { id: 'e3', source: 'xor1', target: 'xor2' },
    { id: 'e4', source: 'xor1', target: 'and2' },
    { id: 'e5', source: 'and1', target: 'or' },
    { id: 'e6', source: 'and2', target: 'or' },
    { id: 'e7', source: 'xor2', target: 'end' },
    { id: 'e8', source: 'or', target: 'end' },
  ] as FlowEdge[],
}

export default function AddersSubtractorsPage() {
  return <DSDTopicPage content={content} />
}
