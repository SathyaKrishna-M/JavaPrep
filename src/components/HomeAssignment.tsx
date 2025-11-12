'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp, FiBook, FiCpu, FiGitBranch, FiTarget } from 'react-icons/fi'
import CircuitDiagram from './CircuitDiagram'
import TruthTable from './TruthTable'
import KMap from './KMap'

interface AssignmentQuestion {
  id: number
  question: string
  icon?: React.ReactNode
  subQuestions?: string[]
  solution?: React.ReactNode
}

const questions: AssignmentQuestion[] = [
  {
    id: 1,
    question: 'Use multiplexer circuit to Implement the function: F(A, B, C) = Σm(0, 2, 4, 5, 6)',
    icon: <FiCpu className="w-5 h-5" />,
    solution: (
      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          To implement F(A, B, C) = Σm(0, 2, 4, 5, 6) using a 4:1 MUX, we use A and B as select lines (S₁, S₀) and C as the data input.
        </p>
        <p className="text-gray-300 leading-relaxed font-semibold">Step 1: Truth Table</p>
        <TruthTable
          headers={['A', 'B', 'C', 'F']}
          rows={[
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 1, 0, 1],
            [0, 1, 1, 0],
            [1, 0, 0, 1],
            [1, 0, 1, 1],
            [1, 1, 0, 1],
            [1, 1, 1, 0],
          ]}
          title="Truth Table for F(A, B, C)"
        />
        <p className="text-gray-300 leading-relaxed">
          <strong>Step 2: MUX Implementation</strong><br />
          For AB = 00: F = C&apos; (m0=1, m1=0) → I₀ = C&apos;<br />
          For AB = 01: F = C&apos; (m2=1, m3=0) → I₁ = C&apos;<br />
          For AB = 10: F = 1 (m4=1, m5=1) → I₂ = 1<br />
          For AB = 11: F = C&apos; (m6=1, m7=0) → I₃ = C&apos;
        </p>
        <CircuitDiagram type="mux4to1" title="4:1 MUX Implementation" />
        <p className="text-gray-300 leading-relaxed">
          <strong>Solution:</strong> Connect I₀ = C&apos;, I₁ = C&apos;, I₂ = 1, I₃ = C&apos; to the 4:1 MUX with A and B as select lines.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    question: 'Explain the half subtractor principle with truth table, output equations, and logic diagram.',
    icon: <FiGitBranch className="w-5 h-5" />,
    solution: (
      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          A <strong>Half Subtractor</strong> is a combinational circuit that subtracts two bits and produces a difference bit and a borrow bit.
        </p>
        <p className="text-gray-300 leading-relaxed font-semibold">Truth Table:</p>
        <TruthTable
          headers={['A', 'B', 'Difference', 'Borrow']}
          rows={[
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [1, 0, 1, 0],
            [1, 1, 0, 0],
          ]}
          title="Half Subtractor Truth Table"
        />
        <p className="text-gray-300 leading-relaxed font-semibold">Output Equations:</p>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 font-mono">
            Difference = A ⊕ B<br />
            Borrow = A&apos; · B
          </p>
        </div>
        <p className="text-gray-300 leading-relaxed font-semibold">Logic Diagram:</p>
        <CircuitDiagram type="half-subtractor" title="Half Subtractor Circuit" />
        <p className="text-gray-300 leading-relaxed">
          <strong>Explanation:</strong> The difference output is the XOR of A and B, while the borrow output is A&apos;B (A complement AND B), indicating when we need to borrow from the next higher bit.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    question: 'Utilize Boolean Laws to simplify the following expressions:',
    icon: <FiBook className="w-5 h-5" />,
    subQuestions: [
      '(a) F = A·B + A·(C·D + C·D\')',
      '(b) F = A·B·C + A\' + A·C·B\'',
    ],
    solution: (
      <div className="space-y-6">
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">(a) F = A·B + A·(C·D + C·D&apos;)</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 space-y-2 font-mono text-gray-300">
            <p>F = A·B + A·(C·D + C·D&apos;)</p>
            <p>F = A·B + A·C·(D + D&apos;)  <span className="text-cyan-400">{/* Factor out C */} Factor out C</span></p>
            <p>F = A·B + A·C·1  <span className="text-cyan-400">{/* D + D' = 1 */} D + D&apos; = 1</span></p>
            <p>F = A·B + A·C  <span className="text-cyan-400">{/* A·C·1 = A·C */} A·C·1 = A·C</span></p>
            <p>F = A·(B + C)  <span className="text-cyan-400">{/* Factor out A */} Factor out A</span></p>
          </div>
          <p className="text-gray-300 leading-relaxed mt-2">
            <strong>Answer:</strong> F = A·(B + C)
          </p>
        </div>
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">(b) F = A·B·C + A&apos; + A·C·B&apos;</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 space-y-2 font-mono text-gray-300">
            <p>F = A·B·C + A&apos; + A·C·B&apos;</p>
            <p>F = A·B·C + A&apos; + A·B&apos;·C  <span className="text-cyan-400">{/* Rearrange */} Rearrange</span></p>
            <p>F = A·C·(B + B&apos;) + A&apos;  <span className="text-cyan-400">{/* Factor out A·C */} Factor out A·C</span></p>
            <p>F = A·C·1 + A&apos;  <span className="text-cyan-400">{/* B + B' = 1 */} B + B&apos; = 1</span></p>
            <p>F = A·C + A&apos;  <span className="text-cyan-400">{/* A·C·1 = A·C */} A·C·1 = A·C</span></p>
            <p>F = A&apos; + A·C  <span className="text-cyan-400">{/* Rearrange */} Rearrange</span></p>
            <p>F = A&apos; + C  <span className="text-cyan-400">{/* Absorption */} Absorption: A&apos; + A·C = A&apos; + C</span></p>
          </div>
          <p className="text-gray-300 leading-relaxed mt-2">
            <strong>Answer:</strong> F = A&apos; + C
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    question: 'Explain any two practical applications where an encoder is commonly used.',
    icon: <FiTarget className="w-5 h-5" />,
    solution: (
      <div className="space-y-4">
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">1. Keyboard Encoder</p>
          <p className="text-gray-300 leading-relaxed">
            In computer keyboards, an encoder converts the pressed key into a binary code (ASCII/Unicode). 
            When a key is pressed, the encoder generates a unique binary output that represents that character. 
            This is essential for input devices to communicate with computers.
          </p>
        </div>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">2. Priority Encoder in Interrupt Systems</p>
          <p className="text-gray-300 leading-relaxed">
            In microprocessor systems, priority encoders are used to handle multiple interrupt requests. 
            When multiple devices request service simultaneously, the priority encoder determines which 
            interrupt has the highest priority and encodes it into a binary address for the interrupt handler. 
            This ensures critical interrupts are processed first.
          </p>
        </div>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">Other Applications:</p>
          <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-1">
            <li>Analog-to-Digital Converters (ADC)</li>
            <li>Position encoders in robotics and automation</li>
            <li>Barcode readers</li>
            <li>Remote control systems</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    question: 'Describe the applications of PLA & PAL models.',
    icon: <FiCpu className="w-5 h-5" />,
    solution: (
      <div className="space-y-4">
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">PLA (Programmable Logic Array) Applications:</p>
          <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Custom Logic Implementation:</strong> Used to implement complex combinational logic functions with multiple inputs and outputs</li>
            <li><strong>Code Converters:</strong> Converting between different number systems (BCD to binary, Gray to binary)</li>
            <li><strong>Arithmetic Circuits:</strong> Implementing adders, multipliers, and ALU components</li>
            <li><strong>Control Units:</strong> Designing state machines and control logic for processors</li>
            <li><strong>Data Path Optimization:</strong> Optimizing multiple output functions simultaneously</li>
          </ul>
        </div>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">PAL (Programmable Array Logic) Applications:</p>
          <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Simple Combinational Logic:</strong> Implementing standard logic functions with fixed OR array</li>
            <li><strong>Address Decoders:</strong> Memory address decoding in computer systems</li>
            <li><strong>Interface Circuits:</strong> Connecting different digital systems with different signal levels</li>
            <li><strong>Glue Logic:</strong> Connecting major components in digital systems</li>
            <li><strong>Prototyping:</strong> Quick prototyping of digital circuits before ASIC design</li>
            <li><strong>Cost-Effective Solutions:</strong> Cheaper alternative to custom ICs for medium-scale production</li>
          </ul>
        </div>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 leading-relaxed">
            <strong>Key Difference:</strong> PLA has both programmable AND and OR arrays, making it more flexible but slower. 
            PAL has a programmable AND array but fixed OR array, making it faster and simpler but less flexible.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    question: 'Make and explain a Full Adder circuit utilizing a decoder and OR gates.',
    icon: <FiGitBranch className="w-5 h-5" />,
    solution: (
      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          A Full Adder can be implemented using a 3-to-8 decoder and OR gates. The decoder generates minterms, 
          and OR gates combine the appropriate minterms for SUM and CARRY outputs.
        </p>
        <p className="text-gray-300 leading-relaxed font-semibold">Full Adder Truth Table:</p>
        <TruthTable
          headers={['A', 'B', 'Cin', 'SUM', 'CARRY']}
          rows={[
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 0, 1],
            [1, 0, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1],
          ]}
          title="Full Adder Truth Table"
        />
        <p className="text-gray-300 leading-relaxed font-semibold">Boolean Expressions:</p>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 font-mono">
            SUM = Σm(1, 2, 4, 7) = m₁ + m₂ + m₄ + m₇<br />
            CARRY = Σm(3, 5, 6, 7) = m₃ + m₅ + m₆ + m₇
          </p>
        </div>
        <p className="text-gray-300 leading-relaxed font-semibold">Circuit Implementation:</p>
        <CircuitDiagram type="decoder2to4" title="3-to-8 Decoder" />
        <p className="text-gray-300 leading-relaxed">
          <strong>Explanation:</strong> The 3-to-8 decoder takes A, B, and Cin as inputs and generates all 8 minterms (m₀ to m₇). 
          The SUM output is obtained by ORing minterms 1, 2, 4, and 7. The CARRY output is obtained by ORing minterms 3, 5, 6, and 7.
        </p>
        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
          <p className="text-gray-300 leading-relaxed">
            <strong>Advantages:</strong> This implementation is modular and easy to understand. The decoder handles input decoding, 
            and OR gates simply combine the required minterms.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    question: 'Realize a Full Adder output circuit using a Programmable Logic Array (PLA).',
    icon: <FiCpu className="w-5 h-5" />,
    solution: (
      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          A PLA can implement both SUM and CARRY outputs of a Full Adder simultaneously using its programmable AND and OR arrays.
        </p>
        <p className="text-gray-300 leading-relaxed font-semibold">Full Adder Truth Table:</p>
        <TruthTable
          headers={['A', 'B', 'Cin', 'SUM', 'CARRY']}
          rows={[
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 0, 1],
            [1, 0, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1],
          ]}
          title="Full Adder Truth Table"
        />
        <p className="text-gray-300 leading-relaxed font-semibold">Boolean Expressions:</p>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 font-mono">
            SUM = A&apos;B&apos;Cin + A&apos;BCin&apos; + AB&apos;Cin&apos; + ABCin<br />
            CARRY = A&apos;BCin + AB&apos;Cin + ABCin&apos; + ABCin
          </p>
        </div>
        <p className="text-gray-300 leading-relaxed font-semibold">PLA Structure:</p>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 leading-relaxed">
            <strong>AND Array (Product Terms):</strong><br />
            P₁ = A&apos;B&apos;Cin<br />
            P₂ = A&apos;BCin&apos;<br />
            P₃ = AB&apos;Cin&apos;<br />
            P₄ = ABCin<br />
            P₅ = A&apos;BCin<br />
            P₆ = AB&apos;Cin<br />
            P₇ = ABCin&apos;
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            <strong>OR Array (Output Functions):</strong><br />
            SUM = P₁ + P₂ + P₃ + P₄<br />
            CARRY = P₅ + P₆ + P₇ + P₄
          </p>
        </div>
        <p className="text-gray-300 leading-relaxed">
          <strong>Explanation:</strong> The PLA&apos;s programmable AND array generates the required product terms, 
          and the programmable OR array combines them to produce SUM and CARRY outputs. This allows both outputs 
          to share common product terms (like ABCin), making the implementation efficient.
        </p>
      </div>
    ),
  },
  {
    id: 8,
    question: 'Design the circuit with a PLA having three inputs and two outputs:',
    icon: <FiGitBranch className="w-5 h-5" />,
    subQuestions: [
      'i) F₁(A, B, C) = Σm(1, 2, 6, 7)',
      'ii) F₂(A, B, C) = Σm(1, 3, 5, 7)',
    ],
    solution: (
      <div className="space-y-6">
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">Given Functions:</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300 font-mono">
              F₁(A, B, C) = Σm(1, 2, 6, 7)<br />
              F₂(A, B, C) = Σm(1, 3, 5, 7)
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">Step 1: Truth Table</p>
          <TruthTable
            headers={['A', 'B', 'C', 'F₁', 'F₂']}
            rows={[
              [0, 0, 0, 0, 0],
              [0, 0, 1, 1, 1],
              [0, 1, 0, 1, 0],
              [0, 1, 1, 0, 1],
              [1, 0, 0, 0, 0],
              [1, 0, 1, 0, 1],
              [1, 1, 0, 1, 0],
              [1, 1, 1, 1, 1],
            ]}
            title="Truth Table for F₁ and F₂"
          />
        </div>
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">Step 2: Boolean Expressions</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300 font-mono">
              F₁ = A&apos;B&apos;C + A&apos;BC&apos; + ABC&apos; + ABC<br />
              F₂ = A&apos;B&apos;C + A&apos;BC + AB&apos;C + ABC
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">Step 3: Optimized Product Terms</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300 leading-relaxed">
              <strong>AND Array (Product Terms):</strong><br />
              P₁ = A&apos;B&apos;C (used by F₁, F₂)<br />
              P₂ = A&apos;BC&apos; (used by F₁)<br />
              P₃ = ABC&apos; (used by F₁)<br />
              P₄ = ABC (used by F₁, F₂)<br />
              P₅ = A&apos;BC (used by F₂)<br />
              P₆ = AB&apos;C (used by F₂)
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              <strong>OR Array (Output Functions):</strong><br />
              F₁ = P₁ + P₂ + P₃ + P₄<br />
              F₂ = P₁ + P₄ + P₅ + P₆
            </p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          <strong>Explanation:</strong> The PLA uses 6 product terms in the AND array. Both F₁ and F₂ share 
          product terms P₁ (A&apos;B&apos;C) and P₄ (ABC), making the implementation efficient. The OR array 
          connects the appropriate product terms to each output.
        </p>
      </div>
    ),
  },
  {
    id: 9,
    question: 'Illustrate the internal structure of CPLD & FPGA with necessary diagrams.',
    icon: <FiCpu className="w-5 h-5" />,
    solution: (
      <div className="space-y-4">
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">CPLD (Complex Programmable Logic Device) Structure:</p>
          <p className="text-gray-300 leading-relaxed mb-2">
            <strong>Architecture:</strong> CPLD consists of multiple PAL-like blocks (Macrocells) connected via a programmable interconnect matrix.
          </p>
          <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>Macrocells:</strong> Each contains AND-OR array, flip-flops, and I/O buffers</li>
            <li><strong>Programmable Interconnect:</strong> Connects macrocells and I/O pins</li>
            <li><strong>I/O Blocks:</strong> Interface between internal logic and external pins</li>
            <li><strong>Clock Distribution:</strong> Global and local clock networks</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-2">
            <strong>Characteristics:</strong> Predictable timing, non-volatile configuration, lower density, suitable for control logic.
          </p>
        </div>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">FPGA (Field Programmable Gate Array) Structure:</p>
          <p className="text-gray-300 leading-relaxed mb-2">
            <strong>Architecture:</strong> FPGA consists of an array of Configurable Logic Blocks (CLBs) connected via programmable routing resources.
          </p>
          <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-1">
            <li><strong>CLBs (Configurable Logic Blocks):</strong> Contain Look-Up Tables (LUTs), flip-flops, and multiplexers</li>
            <li><strong>Programmable Interconnect:</strong> Switch boxes and routing channels connect CLBs</li>
            <li><strong>I/O Blocks:</strong> Programmable I/O pads with various standards</li>
            <li><strong>Block RAM:</strong> Distributed and block memory resources</li>
            <li><strong>DSP Slices:</strong> Dedicated multipliers and arithmetic units</li>
            <li><strong>Clock Management:</strong> PLLs/DCMs for clock generation and distribution</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-2">
            <strong>Characteristics:</strong> High density, volatile configuration (SRAM-based), flexible routing, suitable for complex designs.
          </p>
        </div>
        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">Key Differences:</p>
          <table className="w-full text-gray-300 text-sm">
            <thead>
              <tr className="border-b border-cyan-500/30">
                <th className="text-left p-2">Feature</th>
                <th className="text-left p-2">CPLD</th>
                <th className="text-left p-2">FPGA</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-cyan-500/20">
                <td className="p-2">Density</td>
                <td className="p-2">Low to Medium</td>
                <td className="p-2">High</td>
              </tr>
              <tr className="border-b border-cyan-500/20">
                <td className="p-2">Configuration</td>
                <td className="p-2">Non-volatile (Flash)</td>
                <td className="p-2">Volatile (SRAM)</td>
              </tr>
              <tr className="border-b border-cyan-500/20">
                <td className="p-2">Timing</td>
                <td className="p-2">Predictable</td>
                <td className="p-2">Route-dependent</td>
              </tr>
              <tr className="border-b border-cyan-500/20">
                <td className="p-2">Applications</td>
                <td className="p-2">Control logic, glue logic</td>
                <td className="p-2">Complex systems, DSP, processors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    question: 'Solve the following using K-Map:',
    icon: <FiTarget className="w-5 h-5" />,
    subQuestions: [
      '(a) F(W, X, Y, Z) = Σm(1, 3, 4, 5, 6, 7, 11, 14, 15)',
      '(b) F(W, X, Y, Z) = Σm(1, 3, 7, 11, 15) + d(0, 2, 5)',
      '(c) F(A, B, C) = AB\'C + A\'B\'C + A\'BC + A\'B\'C\' + AB\'C\'',
      '(d) F(A, B, C, D) = Σm(0, 1, 4, 5, 6, 10, 13) + d(2, 3)',
    ],
    solution: (
      <div className="space-y-6">
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">(a) F(W, X, Y, Z) = Σm(1, 3, 4, 5, 6, 7, 11, 14, 15)</p>
          <KMap
            type="4var"
            values={[0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1]}
            title="4-Variable K-Map for F(W, X, Y, Z)"
            highlightedGroups={[
              { cells: [4, 5, 6, 7], color: '#00b4ff' },
              { cells: [1, 3], color: '#00ff88' },
              { cells: [11, 15], color: '#ff6b6b' },
              { cells: [14, 15], color: '#ffd93d' },
            ]}
          />
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 mt-4">
            <p className="text-gray-300 font-mono">
              F = W&apos;X + WX&apos;Y&apos; + WXY + WYZ&apos;
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">(b) F(W, X, Y, Z) = Σm(1, 3, 7, 11, 15) + d(0, 2, 5)</p>
          <KMap
            type="4var"
            values={[-1, 1, -1, 1, 0, -1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]}
            title="4-Variable K-Map with Don't Cares"
            highlightedGroups={[
              { cells: [0, 1, 3], color: '#00b4ff' },
              { cells: [1, 3, 5, 7], color: '#00ff88' },
              { cells: [3, 7, 11, 15], color: '#ff6b6b' },
            ]}
          />
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 mt-4">
            <p className="text-gray-300 font-mono">
              F = W&apos;X&apos; + YZ + WZ
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">(c) F(A, B, C) = AB&apos;C + A&apos;B&apos;C + A&apos;BC + A&apos;B&apos;C&apos; + AB&apos;C&apos;</p>
          <p className="text-gray-300 leading-relaxed mb-2">Converting to minterms: Σm(0, 1, 3, 5)</p>
          <KMap
            type="3var"
            values={[1, 1, 0, 1, 0, 1, 0, 0]}
            title="3-Variable K-Map for F(A, B, C)"
            highlightedGroups={[
              { cells: [0, 1], color: '#00b4ff' },
              { cells: [1, 3], color: '#00ff88' },
              { cells: [1, 5], color: '#ff6b6b' },
            ]}
          />
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 mt-4">
            <p className="text-gray-300 font-mono">
              F = A&apos;B&apos; + B&apos;C + A&apos;C
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-300 leading-relaxed font-semibold mb-2">(d) F(A, B, C, D) = Σm(0, 1, 4, 5, 6, 10, 13) + d(2, 3)</p>
          <KMap
            type="4var"
            values={[1, 1, -1, -1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0]}
            title="4-Variable K-Map with Don't Cares"
            highlightedGroups={[
              { cells: [0, 1, 2, 3], color: '#00b4ff' },
              { cells: [4, 5, 6], color: '#00ff88' },
              { cells: [10], color: '#ff6b6b' },
              { cells: [13], color: '#ffd93d' },
            ]}
          />
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 mt-4">
            <p className="text-gray-300 font-mono">
              F = A&apos;B&apos; + A&apos;C + B&apos;CD&apos; + ABC&apos;D
            </p>
          </div>
        </div>
      </div>
    ),
  },
]

export default function HomeAssignment() {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())

  const toggleQuestion = (id: number) => {
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      {/* Section Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-3xl">🏠</span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Home Assignment-1
          </h2>
        </motion.div>
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {questions.map((q, index) => {
          const isExpanded = expandedQuestions.has(q.id)
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card border-2 border-blue-500/30 hover:border-blue-500/50 transition-all overflow-hidden"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleQuestion(q.id)}
                className="w-full text-left p-5 flex items-start gap-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex-shrink-0 mt-1 text-blue-400">
                  {q.icon || <FiBook className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-cyan-400">Q{q.id}.</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-blue-400"
                    >
                      {isExpanded ? (
                        <FiChevronUp className="w-5 h-5" />
                      ) : (
                        <FiChevronDown className="w-5 h-5" />
                      )}
                    </motion.div>
                  </div>
                  <p className="text-gray-200 text-base font-medium leading-relaxed">
                    {q.question}
                  </p>
                  {q.subQuestions && q.subQuestions.length > 0 && !isExpanded && (
                    <p className="text-sm text-gray-400 mt-2">
                      {q.subQuestions.length} sub-question{q.subQuestions.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 border-t border-blue-500/20">
                      {q.subQuestions && q.subQuestions.length > 0 && (
                        <div className="mt-4 space-y-2 mb-4">
                          {q.subQuestions.map((subQ, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="pl-4 py-2 rounded-lg bg-blue-500/10 border-l-2 border-blue-400/50"
                            >
                              <p className="text-gray-300 text-sm font-medium">{subQ}</p>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      {/* Solution Content */}
                      <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                        <h4 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                          <FiTarget className="w-5 h-5" />
                          Solution
                        </h4>
                        {q.solution}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
