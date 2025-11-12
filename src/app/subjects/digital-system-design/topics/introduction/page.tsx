'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Introduction to Digital System Design',
  explanationSections: [
    {
      title: '🧠 Number Systems and Conversions',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Digital systems</span> use different number systems to represent and process data. Understanding number system conversions is fundamental to digital logic design.

<span class="text-amber-300 font-semibold">Common Number Systems:</span>

• <span class="text-cyan-300">Binary (Base 2):</span> Uses digits {0, 1} - the foundation of all digital circuits
• <span class="text-cyan-300">Octal (Base 8):</span> Uses digits 0-7, convenient for representing binary in groups of 3
• <span class="text-cyan-300">Hexadecimal (Base 16):</span> Uses digits 0-9 and A-F, convenient for representing binary in groups of 4
• <span class="text-cyan-300">Decimal (Base 10):</span> Our everyday number system using digits 0-9

<span class="text-lime-300 font-semibold">Conversion Methods:</span>

<span class="text-cyan-300">Binary to Decimal:</span> Multiply each bit by 2<sup>position</sup> and sum
Example: 1011<sub>2</sub> = (1×2³) + (0×2²) + (1×2¹) + (1×2⁰) = 8 + 0 + 2 + 1 = 11<sub>10</sub>

<span class="text-cyan-300">Decimal to Binary:</span> Repeated division by 2, collect remainders
Example: 25<sub>10</sub> = 11001<sub>2</sub>

<span class="text-cyan-300">Binary to Hex:</span> Group bits in 4s, convert each group
Example: 1011 1100<sub>2</sub> = BC<sub>16</sub>`,
    },
    {
      title: '⚙️ AND Gate',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">AND gate</span> outputs 1 only when ALL inputs are 1. It implements logical conjunction.

<span class="text-amber-300 font-semibold">Characteristics:</span>
• <span class="text-cyan-300">Symbol:</span> A · B or AB
• <span class="text-cyan-300">Boolean Expression:</span> Y = A · B
• <span class="text-cyan-300">Operation:</span> Logical AND (multiplication in Boolean algebra)

<span class="text-lime-300 font-semibold">Applications:</span>
• Enable/disable control
• Data selection
• Address decoding
• Building complex logic functions`,
      circuitDiagram: { type: 'and', title: 'AND Gate Logic Diagram' },
      truthTable: {
        headers: ['A', 'B', 'Y'],
        rows: [
          ['0', '0', '0'],
          ['0', '1', '0'],
          ['1', '0', '0'],
          ['1', '1', '1'],
        ],
        title: 'AND Gate Truth Table',
      },
    },
    {
      title: '⚙️ OR Gate',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">OR gate</span> outputs 1 when ANY input is 1. It implements logical disjunction.

<span class="text-amber-300 font-semibold">Characteristics:</span>
• <span class="text-cyan-300">Symbol:</span> A + B
• <span class="text-cyan-300">Boolean Expression:</span> Y = A + B
• <span class="text-cyan-300">Operation:</span> Logical OR (addition in Boolean algebra)

<span class="text-lime-300 font-semibold">Applications:</span>
• Multiple condition checking
• Priority encoding
• Data routing
• Building complex logic functions`,
      circuitDiagram: { type: 'or', title: 'OR Gate Logic Diagram' },
      truthTable: {
        headers: ['A', 'B', 'Y'],
        rows: [
          ['0', '0', '0'],
          ['0', '1', '1'],
          ['1', '0', '1'],
          ['1', '1', '1'],
        ],
        title: 'OR Gate Truth Table',
      },
    },
    {
      title: '⚙️ NOT Gate',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `The <span class="text-blue-400 font-semibold">NOT gate</span> inverts the input, producing the complement. It implements logical negation.

<span class="text-amber-300 font-semibold">Characteristics:</span>
• <span class="text-cyan-300">Symbol:</span> A' or Ā
• <span class="text-cyan-300">Boolean Expression:</span> Y = A'
• <span class="text-cyan-300">Operation:</span> Logical NOT (complement)

<span class="text-lime-300 font-semibold">Applications:</span>
• Signal inversion
• Complement generation
• Building NAND, NOR gates
• Essential for all logic operations`,
      circuitDiagram: { type: 'not', title: 'NOT Gate Logic Diagram' },
      truthTable: {
        headers: ['A', 'Y'],
        rows: [
          ['0', '1'],
          ['1', '0'],
        ],
        title: 'NOT Gate Truth Table',
      },
    },
    {
      title: '⚙️ NAND & NOR Gates (Universal Gates)',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">NAND and NOR gates</span> are called universal gates because any Boolean function can be implemented using only NAND gates or only NOR gates.

<span class="text-amber-300 font-semibold">NAND Gate:</span>
• <span class="text-cyan-300">Symbol:</span> (AB)'
• <span class="text-cyan-300">Boolean Expression:</span> Y = (A · B)'
• <span class="text-cyan-300">Output:</span> 0 only when all inputs are 1

<span class="text-amber-300 font-semibold">NOR Gate:</span>
• <span class="text-cyan-300">Symbol:</span> (A+B)'
• <span class="text-cyan-300">Boolean Expression:</span> Y = (A + B)'
• <span class="text-cyan-300">Output:</span> 1 only when all inputs are 0

<span class="text-pink-300 font-semibold">Why Universal:</span>
Any logic function can be constructed using only NAND gates or only NOR gates, making them fundamental building blocks for integrated circuits.`,
      circuitDiagram: { type: 'nand', title: 'NAND Gate Logic Diagram' },
      truthTable: {
        headers: ['A', 'B', 'NAND', 'NOR'],
        rows: [
          ['0', '0', '1', '1'],
          ['0', '1', '1', '0'],
          ['1', '0', '1', '0'],
          ['1', '1', '0', '0'],
        ],
        title: 'NAND and NOR Gates Truth Table',
      },
    },
    {
      title: '⚙️ XOR & XNOR Gates',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `<span class="text-blue-400 font-semibold">XOR and XNOR gates</span> implement exclusive operations, useful for arithmetic and comparison.

<span class="text-amber-300 font-semibold">XOR Gate (Exclusive OR):</span>
• <span class="text-cyan-300">Symbol:</span> A ⊕ B
• <span class="text-cyan-300">Boolean Expression:</span> Y = A ⊕ B = A'B + AB'
• <span class="text-cyan-300">Output:</span> 1 when inputs differ

<span class="text-amber-300 font-semibold">XNOR Gate (Exclusive NOR):</span>
• <span class="text-cyan-300">Symbol:</span> (A ⊕ B)'
• <span class="text-cyan-300">Boolean Expression:</span> Y = (A ⊕ B)' = AB + A'B'
• <span class="text-cyan-300">Output:</span> 1 when inputs are same

<span class="text-lime-300 font-semibold">Applications:</span>
• Binary addition (XOR for sum)
• Parity checking
• Comparators
• Error detection`,
      circuitDiagram: { type: 'xor', title: 'XOR Gate Logic Diagram' },
      truthTable: {
        headers: ['A', 'B', 'XOR', 'XNOR'],
        rows: [
          ['0', '0', '0', '1'],
          ['0', '1', '1', '0'],
          ['1', '0', '1', '0'],
          ['1', '1', '0', '1'],
        ],
        title: 'XOR and XNOR Gates Truth Table',
      },
    },
    {
      title: '📊 Truth Tables and Logic Representation',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Truth Tables</span> provide a complete specification of a logic function by listing all possible input combinations and their corresponding outputs.

<span class="text-amber-300 font-semibold">Example: 3-Input AND Gate Truth Table</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
A | B | C | Y = ABC
--|---|---|--------
0 | 0 | 0 |   0
0 | 0 | 1 |   0
0 | 1 | 0 |   0
0 | 1 | 1 |   0
1 | 0 | 0 |   0
1 | 0 | 1 |   0
1 | 1 | 0 |   0
1 | 1 | 1 |   1
</pre>

<span class="text-lime-300 font-semibold">Logic Representation Methods:</span>

• <span class="text-cyan-300">Boolean Expression:</span> Algebraic form (e.g., F = AB + A'C)
• <span class="text-cyan-300">Truth Table:</span> Tabular form showing all input-output combinations
• <span class="text-cyan-300">Logic Diagram:</span> Graphical representation using gate symbols
• <span class="text-cyan-300">Timing Diagram:</span> Waveform representation showing signal changes over time

<span class="text-pink-300 font-semibold">Key Concepts:</span>

• <span class="text-cyan-300">Combinational Logic:</span> Output depends only on current inputs (no memory)
• <span class="text-cyan-300">Sequential Logic:</span> Output depends on current inputs AND previous state (has memory)
• <span class="text-cyan-300">Minterm:</span> Product term where all variables appear (e.g., A'BC)
• <span class="text-cyan-300">Maxterm:</span> Sum term where all variables appear (e.g., A+B'+C)`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Convert</span> numbers between binary, decimal, octal, and hexadecimal systems
✓ <span class="text-cyan-300">Understand</span> the operation and truth tables of basic logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR)
✓ <span class="text-cyan-300">Recognize</span> universal gates and their importance in circuit design
✓ <span class="text-cyan-300">Represent</span> logic functions using Boolean expressions, truth tables, and logic diagrams
✓ <span class="text-cyan-300">Distinguish</span> between combinational and sequential logic circuits
✓ <span class="text-cyan-300">Apply</span> fundamental concepts to analyze and design basic digital circuits

These foundational concepts are essential for understanding more advanced topics in digital system design.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Convert the binary number 1011 to decimal.',
      solution: 'To convert binary to decimal, multiply each bit by its corresponding power of 2 and sum:\n\n1011₂ = (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰)\n       = (1 × 8) + (0 × 4) + (1 × 2) + (1 × 1)\n       = 8 + 0 + 2 + 1\n       = 11₁₀\n\nTherefore, 1011₂ = 11₁₀',
    },
    {
      question: 'What is the output of an AND gate when inputs are A=1 and B=0?',
      solution: 'An AND gate outputs 1 only when ALL inputs are 1.\n\nGiven: A = 1, B = 0\n\nSince B = 0, the output will be 0.\n\nAnswer: Output = 0',
      circuitDiagram: { type: 'and', title: 'AND Gate Circuit' },
      truthTable: {
        headers: ['A', 'B', 'Y'],
        rows: [
          ['0', '0', '0'],
          ['0', '1', '0'],
          ['1', '0', '0'],
          ['1', '1', '1'],
        ],
        title: 'AND Gate Truth Table',
      },
    },
    {
      question: 'Convert the decimal number 25 to binary.',
      solution: 'To convert decimal to binary, repeatedly divide by 2 and note remainders:\n\n25 ÷ 2 = 12 remainder 1\n12 ÷ 2 = 6 remainder 0\n6 ÷ 2 = 3 remainder 0\n3 ÷ 2 = 1 remainder 1\n1 ÷ 2 = 0 remainder 1\n\nReading remainders from bottom to top: 11001\n\nTherefore, 25₁₀ = 11001₂',
    },
  ],
}

export default function IntroductionPage() {
  return <DSDTopicPage content={content} />
}

