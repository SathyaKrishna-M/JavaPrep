'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Encoders & Decoders',
  explanationSections: [
    {
      title: '🧠 Encoders',
      icon: <FiBook className="w-6 h-6" />,
      content: `An <span class="text-blue-400 font-semibold">encoder</span> converts 2<sup>n</sup> inputs into n outputs, where only one input is active at a time. It performs the inverse operation of a decoder.

<span class="text-amber-300 font-semibold">Types of Encoders:</span>

<span class="text-cyan-300">1. Binary Encoder:</span>
• <span class="text-cyan-300">Structure:</span> 2<sup>n</sup> inputs → n outputs
• <span class="text-cyan-300">Assumption:</span> Only one input is active at a time
• <span class="text-cyan-300">Example - 4:2 Encoder:</span>
  - 4 inputs (I<sub>0</sub>, I<sub>1</sub>, I<sub>2</sub>, I<sub>3</sub>)
  - 2 outputs (Y<sub>1</sub>, Y<sub>0</sub>)
  - When I<sub>2</sub> is active: Y<sub>1</sub>=1, Y<sub>0</sub>=0 (binary 10 = decimal 2)

<span class="text-cyan-300">Boolean Expressions:</span>
• Y<sub>1</sub> = I<sub>2</sub> + I<sub>3</sub>
• Y<sub>0</sub> = I<sub>1</sub> + I<sub>3</sub>

<span class="text-cyan-300">2. Priority Encoder:</span>
• <span class="text-cyan-300">Handles multiple active inputs</span> simultaneously
• <span class="text-cyan-300">Encodes the highest priority</span> active input
• <span class="text-cyan-300">Has a "valid" output</span> to indicate if any input is active
• <span class="text-cyan-300">Higher-numbered inputs have higher priority</span>

<span class="text-pink-300 font-semibold">Applications:</span>
• Keyboard encoding (key press → ASCII code)
• Address encoding
• Data compression
• Interrupt handling`,
      truthTable: {
        headers: ['I3', 'I2', 'I1', 'I0', 'Y1', 'Y0'],
        rows: [
          ['0', '0', '0', '1', '0', '0'],
          ['0', '0', '1', '0', '0', '1'],
          ['0', '1', '0', '0', '1', '0'],
          ['1', '0', '0', '0', '1', '1'],
        ],
        title: '4:2 Encoder Truth Table',
      },
    },
    {
      title: '⚙️ Decoders',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">decoder</span> converts n inputs into 2<sup>n</sup> outputs, where exactly one output is active. It performs the inverse operation of an encoder.

<span class="text-amber-300 font-semibold">Structure:</span>
• <span class="text-cyan-300">n inputs:</span> Binary code (A<sub>0</sub>, A<sub>1</sub>, ..., A<sub>n-1</sub>)
• <span class="text-cyan-300">2<sup>n</sup> outputs:</span> Only one output is active (Y<sub>0</sub>, Y<sub>1</sub>, ..., Y<sub>2<sup>n</sup>-1</sub>)
• <span class="text-cyan-300">Enable input:</span> Optional, controls decoder operation

<span class="text-cyan-300">Boolean Expressions:</span>
• Y<sub>0</sub> = A<sub>1</sub>' · A<sub>0</sub>'
• Y<sub>1</sub> = A<sub>1</sub>' · A<sub>0</sub>
• Y<sub>2</sub> = A<sub>1</sub> · A<sub>0</sub>'
• Y<sub>3</sub> = A<sub>1</sub> · A<sub>0</sub>

<span class="text-pink-300 font-semibold">Applications:</span>
• Address decoding (memory selection)
• Function generators (implementing Boolean functions)
• Data demultiplexing
• Control unit design
• Display drivers (7-segment, etc.)

<span class="text-cyan-300">Note:</span> Decoder with enable input behaves like a demultiplexer when enable is used as data input.`,
      circuitDiagram: { type: 'decoder2to4', title: '2:4 Decoder Circuit Diagram', width: 500, height: 400 },
      truthTable: {
        headers: ['A1', 'A0', 'Y0', 'Y1', 'Y2', 'Y3'],
        rows: [
          ['0', '0', '1', '0', '0', '0'],
          ['0', '1', '0', '1', '0', '0'],
          ['1', '0', '0', '0', '1', '0'],
          ['1', '1', '0', '0', '0', '1'],
        ],
        title: '2:4 Decoder Truth Table',
      },
    },
    {
      title: '📊 Priority Encoders',
      icon: <FiTarget className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">priority encoder</span> handles cases where multiple inputs can be active simultaneously by encoding the highest priority input.

<span class="text-amber-300 font-semibold">Features:</span>
• <span class="text-cyan-300">Priority:</span> Higher-numbered inputs have higher priority
• <span class="text-cyan-300">Valid output (V):</span> Indicates if any input is active (V=1) or no input is active (V=0)
• <span class="text-cyan-300">Output:</span> Encodes the highest priority active input

<span class="text-cyan-300">Priority Rules:</span>
• If I<sub>3</sub>=1: Output = 11 (highest priority, regardless of others)
• If I<sub>3</sub>=0, I<sub>2</sub>=1: Output = 10
• If I<sub>3</sub>=0, I<sub>2</sub>=0, I<sub>1</sub>=1: Output = 01
• If only I<sub>0</sub>=1: Output = 00

<span class="text-pink-300 font-semibold">Boolean Expressions:</span>
• Y<sub>1</sub> = I<sub>3</sub> + I<sub>2</sub>
• Y<sub>0</sub> = I<sub>3</sub> + I<sub>2</sub>'I<sub>1</sub>
• V = I<sub>0</sub> + I<sub>1</sub> + I<sub>2</sub> + I<sub>3</sub>

<span class="text-cyan-300">Use Cases:</span>
• Interrupt handling (highest priority interrupt is encoded)
• Bus arbitration
• Keyboard scanning
• Error handling systems`,
      truthTable: {
        headers: ['I3', 'I2', 'I1', 'I0', 'Y1', 'Y0', 'V'],
        rows: [
          ['0', '0', '0', '0', 'X', 'X', '0'],
          ['0', '0', '0', '1', '0', '0', '1'],
          ['0', '0', '1', 'X', '0', '1', '1'],
          ['0', '1', 'X', 'X', '1', '0', '1'],
          ['1', 'X', 'X', 'X', '1', '1', '1'],
        ],
        title: '4:2 Priority Encoder Truth Table (X = don\'t care)',
      },
    },
    {
      title: '🧩 Decoder as Function Generator',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `A decoder with n inputs generates all 2<sup>n</sup> minterms, making it useful for implementing Boolean functions.

<span class="text-amber-300 font-semibold">Method:</span>
1. Write function F in SOP form (sum of minterms)
2. Use a decoder to generate all minterms
3. OR together the minterms that make F = 1

<span class="text-lime-300 font-semibold">Example: Implement F(A,B) = Σ(1,2,3)</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
Step 1: Use 2:4 decoder to generate minterms m0, m1, m2, m3
Step 2: OR together outputs Y1, Y2, Y3
Step 3: F = Y1 + Y2 + Y3 = m1 + m2 + m3

This implements F = A'B + AB' + AB
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Can implement any function with n variables using n:2<sup>n</sup> decoder + OR gate
• Simple and systematic approach
• Easy to modify (just change OR connections)

<span class="text-cyan-300">Multiple Functions:</span> One decoder can generate multiple functions by ORing different combinations of outputs.`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Design</span> binary encoders and decoders
✓ <span class="text-cyan-300">Understand</span> the difference between regular and priority encoders
✓ <span class="text-cyan-300">Implement</span> priority encoders with valid output
✓ <span class="text-cyan-300">Use</span> decoders as function generators
✓ <span class="text-cyan-300">Apply</span> encoders and decoders in address decoding, keyboard encoding, and data routing
✓ <span class="text-cyan-300">Recognize</span> the relationship between decoders and demultiplexers
✓ <span class="text-cyan-300">Design</span> circuits using encoders and decoders for various applications

Encoders and decoders are essential components in digital system design.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Design a 2:4 decoder. Show the truth table and logic implementation.',
      solution: 'Truth Table:\nA1 | A0 | Y0 | Y1 | Y2 | Y3\n0  | 0  | 1  | 0  | 0  | 0\n0  | 1  | 0  | 1  | 0  | 0\n1  | 0  | 0  | 0  | 1  | 0\n1  | 1  | 0  | 0  | 0  | 1\n\nLogic Implementation:\nY0 = A1\' · A0\'\nY1 = A1\' · A0\nY2 = A1 · A0\'\nY3 = A1 · A0',
      circuitDiagram: { type: 'decoder2to4', title: '2:4 Decoder Circuit', width: 500, height: 400 },
      truthTable: {
        headers: ['A1', 'A0', 'Y0', 'Y1', 'Y2', 'Y3'],
        rows: [
          ['0', '0', '1', '0', '0', '0'],
          ['0', '1', '0', '1', '0', '0'],
          ['1', '0', '0', '0', '1', '0'],
          ['1', '1', '0', '0', '0', '1'],
        ],
        title: '2:4 Decoder Truth Table',
      },
    },
    {
      question: 'What is the difference between a regular encoder and a priority encoder?',
      solution: 'Regular Encoder:\n- Assumes only ONE input is active at a time\n- If multiple inputs are active, output is undefined\n- Simpler implementation\n\nPriority Encoder:\n- Can handle MULTIPLE active inputs\n- Encodes the highest priority active input\n- Has a "valid" output to indicate if any input is active\n- More complex but more robust\n\nPriority encoders are used when multiple inputs can be active simultaneously (e.g., interrupt requests).',
    },
    {
      question: 'How can a decoder be used to implement a Boolean function?',
      solution: 'A decoder with n inputs generates all 2^n minterms.\n\nTo implement a function F:\n1. Write F in SOP form (sum of minterms)\n2. Use a decoder to generate all minterms\n3. OR together the minterms that make F = 1\n\nExample: F(A,B) = Σ(1,2,3)\n- Use 2:4 decoder to generate minterms m0, m1, m2, m3\n- OR together outputs Y1, Y2, Y3\n- This implements F = m1 + m2 + m3\n\nThis is useful for implementing arbitrary functions using decoders and OR gates.',
    },
  ],
}

export default function EncoderDecoderPage() {
  return <DSDTopicPage content={content} />
}
