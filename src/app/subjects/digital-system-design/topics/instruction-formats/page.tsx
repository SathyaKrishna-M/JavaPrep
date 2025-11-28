'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiCpu, FiDatabase, FiSettings } from 'react-icons/fi'

const content = {
  title: 'Instruction Formats',
  explanationSections: [
    {
      title: '📖 Need for Instruction Formats',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Instruction Formats</span> define the structure and organization of machine instructions. They specify how instructions are encoded in binary and how the CPU interprets them.

<span class="text-amber-300 font-semibold">Why Instruction Formats are Needed:</span>

<span class="text-cyan-300">1. Standardization:</span>
• Provides a consistent structure for all instructions
• Makes instruction decoding predictable and efficient
• Enables hardware designers to build efficient decoders

<span class="text-cyan-300">2. Efficient Encoding:</span>
• Optimizes instruction size and memory usage
• Balances between instruction length and functionality
• Reduces code size for better performance

<span class="text-cyan-300">3. Hardware Implementation:</span>
• Simplifies instruction decoding circuitry
• Enables parallel instruction processing
• Reduces CPU complexity

<span class="text-cyan-300">4. Flexibility:</span>
• Supports different types of operations
• Accommodates various operand addressing modes
• Allows for instruction set expansion

<span class="text-cyan-300">5. Performance Optimization:</span>
• Shorter instructions = faster fetch and decode
• Fixed-length formats enable pipelining
• Variable-length formats save memory

<span class="text-lime-300 font-semibold">Instruction Format Components:</span>

A typical instruction format consists of:
• <span class="text-yellow-300">Opcode:</span> Operation code specifying what operation to perform
• <span class="text-yellow-300">Operand Fields:</span> Specify source and destination operands
• <span class="text-yellow-300">Addressing Mode Bits:</span> Indicate how operands are addressed
• <span class="text-yellow-300">Control Bits:</span> Additional control information

<span class="text-pink-300 font-semibold">Key Considerations:</span>

• <span class="text-cyan-300">Instruction Length:</span> Fixed vs variable length
• <span class="text-cyan-300">Number of Operands:</span> Zero, one, two, or three address fields
• <span class="text-cyan-300">Register vs Memory:</span> Where operands are located
• <span class="text-cyan-300">Code Density:</span> How efficiently instructions use memory space`,
    },
    {
      title: '0️⃣ Zero-Address Format',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Zero-Address Format</span> uses an implicit stack for operands. All operations are performed on the top elements of the stack.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Operands are implicitly on the stack
• Operations pop operands from stack, perform operation, push result
• Stack Pointer (SP) manages the stack
• No explicit operand fields in instruction

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┐
│  Opcode  │
└──────────┘
   (only)

Example: ADD
┌──────┐
│ ADD  │
└──────┘

Operation:
  Pop two operands from stack
  Add them
  Push result back on stack

Stack Operation:
Before:  [5]  ← Top (SP)
         [3]
         [2]

After:   [8]  ← Top (SP) (result: 5 + 3)
         [2]
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
PUSH 5        ; Push 5 onto stack
PUSH 3        ; Push 3 onto stack
ADD           ; Pop 5 and 3, add them, push 8
POP  R1       ; Pop result (8) into register R1

; Expression: (5 + 3) * 2
PUSH 5
PUSH 3
ADD           ; Stack: [8]
PUSH 2
MUL           ; Stack: [16]
POP  R1       ; R1 = 16
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>

• <span class="text-cyan-300">Compact Instructions:</span> Very short instructions (only opcode)
• <span class="text-cyan-300">Simple Hardware:</span> Simple instruction decoding
• <span class="text-cyan-300">Efficient for Expressions:</span> Natural for postfix notation
• <span class="text-cyan-300">No Register Conflicts:</span> Stack automatically manages operands
• <span class="text-cyan-300">Code Density:</span> Very efficient memory usage

<span class="text-pink-300 font-semibold">Limitations:</span>

• <span class="text-cyan-300">Stack Management Overhead:</span> Push/pop operations add overhead
• <span class="text-cyan-300">Limited Flexibility:</span> Cannot directly access arbitrary operands
• <span class="text-cyan-300">Stack Overflow Risk:</span> Must manage stack size carefully
• <span class="text-cyan-300">Not Intuitive:</span> Reverse Polish notation is less readable
• <span class="text-cyan-300">Performance:</span> Stack operations may be slower than register operations

<span class="text-lime-300 font-semibold">Use Cases:</span>
• Stack-based virtual machines (Java Virtual Machine)
• Postfix expression evaluation
• Calculators and interpreters`,
    },
    {
      title: '1️⃣ One-Address Format',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">One-Address Format</span> uses an accumulator as an implicit operand. One operand is specified explicitly, the other is the accumulator.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Accumulator (ACC) is implicit source and destination
• One explicit operand field in instruction
• Result is stored back in accumulator
• Common in early computers

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────────┐
│  Opcode  │   Operand    │
└──────────┴──────────────┘

Example: ADD 1000
┌──────┬──────────┐
│ ADD  │   1000   │
└──────┴──────────┘

Operation:
  ACC = ACC + Memory[1000]

Before:  ACC = 5
         Memory[1000] = 3

After:   ACC = 8 (5 + 3)
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
LOAD  1000        ; ACC = Memory[1000]
ADD   1001        ; ACC = ACC + Memory[1001]
SUB   1002        ; ACC = ACC - Memory[1002]
STORE 1003        ; Memory[1003] = ACC

; Expression: A + B - C
LOAD  A           ; ACC = A
ADD   B           ; ACC = A + B
SUB   C           ; ACC = A + B - C
STORE RESULT      ; RESULT = A + B - C
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>

• <span class="text-cyan-300">Simple Design:</span> Only one operand field needed
• <span class="text-cyan-300">Short Instructions:</span> Compact instruction encoding
• <span class="text-cyan-300">Easy to Implement:</span> Simple hardware design
• <span class="text-cyan-300">Memory Efficient:</span> Good code density
• <span class="text-cyan-300">Historical Significance:</span> Used in early computers

<span class="text-pink-300 font-semibold">Limitations:</span>

• <span class="text-cyan-300">Accumulator Bottleneck:</span> All operations go through accumulator
• <span class="text-cyan-300">Register Spills:</span> Must save/restore accumulator frequently
• <span class="text-cyan-300">Limited Parallelism:</span> Cannot perform independent operations
• <span class="text-cyan-300">Inefficient for Complex Expressions:</span> Many instructions needed
• <span class="text-cyan-300">Not Modern:</span> Rarely used in modern processors

<span class="text-lime-300 font-semibold">Use Cases:</span>
• Early computers (1940s-1960s)
• Simple microcontrollers
• Educational purposes`,
    },
    {
      title: '2️⃣ Two-Address Format',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Two-Address Format</span> specifies two operands. The first operand is both source and destination, the second is source only.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Two operand fields: destination and source
• Destination operand is also a source
• Result overwrites the destination operand
• Most common format in modern processors

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┬──────────┐
│  Opcode  │  Dest    │  Source  │
└──────────┴──────────┴──────────┘

Example: ADD R1, R2
┌──────┬──────┬──────┐
│ ADD  │  R1  │  R2  │
└──────┴──────┴──────┘

Operation:
  R1 = R1 + R2

Before:  R1 = 5
         R2 = 3

After:   R1 = 8 (5 + 3)
         R2 = 3 (unchanged)
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
ADD  R1, R2        ; R1 = R1 + R2
SUB  R3, R4        ; R3 = R3 - R4
MUL  R5, R6        ; R5 = R5 * R6
MOV  R1, R2        ; R1 = R2 (copy)
ADD  R1, #10       ; R1 = R1 + 10 (immediate)

; Expression: A = A + B
ADD  A, B          ; A = A + B

; Expression: X = Y + Z
MOV  X, Y          ; X = Y
ADD  X, Z           ; X = X + Z (X = Y + Z)
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>

• <span class="text-cyan-300">Flexible:</span> Can use registers or memory for operands
• <span class="text-cyan-300">Efficient:</span> Good balance between instruction size and functionality
• <span class="text-cyan-300">Common Format:</span> Used in x86, ARM, and many processors
• <span class="text-cyan-300">Preserves Source:</span> Source operand remains unchanged
• <span class="text-cyan-300">Good Code Density:</span> Reasonable memory usage

<span class="text-pink-300 font-semibold">Limitations:</span>

• <span class="text-cyan-300">Destroys Destination:</span> Original value of destination is lost
• <span class="text-cyan-300">Copy Needed:</span> Must copy before operation if original needed
• <span class="text-cyan-300">Limited for Complex Expressions:</span> May need temporary storage
• <span class="text-cyan-300">Instruction Size:</span> Larger than one-address format

<span class="text-lime-300 font-semibold">Use Cases:</span>
• x86 architecture (Intel/AMD processors)
• ARM processors
• Most modern RISC and CISC processors
• General-purpose computing`,
    },
    {
      title: '3️⃣ Three-Address Format',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Three-Address Format</span> specifies three operands: two sources and one destination. All operands are preserved.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Three operand fields: two sources and one destination
• Both source operands remain unchanged
• Result stored in separate destination
• Most flexible format

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┬──────────┬──────────┐
│  Opcode  │  Dest    │ Source1  │ Source2  │
└──────────┴──────────┴──────────┴──────────┘

Example: ADD R1, R2, R3
┌──────┬──────┬──────┬──────┐
│ ADD  │  R1  │  R2  │  R3  │
└──────┴──────┴──────┴──────┘

Operation:
  R1 = R2 + R3

Before:  R1 = 0
         R2 = 5
         R3 = 3

After:   R1 = 8 (5 + 3)
         R2 = 5 (unchanged)
         R3 = 3 (unchanged)
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
ADD  R1, R2, R3        ; R1 = R2 + R3
SUB  R4, R5, R6        ; R4 = R5 - R6
MUL  R7, R8, R9        ; R7 = R8 * R9
ADD  R1, R2, #10       ; R1 = R2 + 10

; Expression: A = B + C
ADD  A, B, C           ; A = B + C (all preserved)

; Complex expression: X = (A + B) * C
ADD  T1, A, B          ; T1 = A + B
MUL  X, T1, C          ; X = T1 * C
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>

• <span class="text-cyan-300">Preserves Operands:</span> Source operands remain unchanged
• <span class="text-cyan-300">Flexible:</span> Can use any combination of registers/memory
• <span class="text-cyan-300">Efficient Expressions:</span> Direct representation of expressions
• <span class="text-cyan-300">No Temporary Storage:</span> Don't need to save operands
• <span class="text-cyan-300">Compiler Friendly:</span> Easy to generate code from expressions
• <span class="text-cyan-300">Parallel Execution:</span> Better for instruction-level parallelism

<span class="text-pink-300 font-semibold">Limitations:</span>

• <span class="text-cyan-300">Larger Instructions:</span> Requires more bits for three operands
• <span class="text-cyan-300">Memory Usage:</span> Instructions take more memory space
• <span class="text-cyan-300">Complex Decoding:</span> More complex instruction decoder
• <span class="text-cyan-300">Limited by Instruction Size:</span> May need fixed instruction length
• <span class="text-cyan-300">Register Pressure:</span> Requires more registers

<span class="text-lime-300 font-semibold">Use Cases:</span>
• MIPS architecture
• RISC-V processors
• Modern RISC processors
• High-performance computing
• Compiler-generated code`,
    },
    {
      title: '📚 Stack-Based Format',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Stack-Based Format</span> uses a stack data structure for all operands. Operations are performed on stack top elements.

<span class="text-amber-300 font-semibold">How it Works:</span>

• All operands are on the stack
• Operations pop operands, compute, push result
• Stack Pointer (SP) tracks top of stack
• Implicit operand access

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┐
│  Opcode  │
└──────────┘
(no operand fields)

Stack Structure:
┌─────────┐
│   5     │ ← Top (SP points here)
├─────────┤
│   3     │
├─────────┤
│   2     │
└─────────┘

Example: ADD
┌──────┐
│ ADD  │
└──────┘

Operation:
  1. Pop operand1 (5)
  2. Pop operand2 (3)
  3. Compute: 5 + 3 = 8
  4. Push result (8)

After ADD:
┌─────────┐
│   8     │ ← Top (SP)
├─────────┤
│   2     │
└─────────┘
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
PUSH 5        ; Stack: [5]
PUSH 3        ; Stack: [3, 5]
ADD           ; Stack: [8] (5 + 3)
PUSH 2        ; Stack: [2, 8]
MUL           ; Stack: [16] (8 * 2)

; Expression: (5 + 3) * 2
PUSH 5
PUSH 3
ADD           ; Stack: [8]
PUSH 2
MUL           ; Stack: [16]
POP  R1       ; R1 = 16
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>

• <span class="text-cyan-300">Ultra-Compact:</span> Shortest possible instructions
• <span class="text-cyan-300">Natural for Postfix:</span> Perfect for reverse Polish notation
• <span class="text-cyan-300">No Register Conflicts:</span> Stack manages operands automatically
• <span class="text-cyan-300">Simple Decoding:</span> Only opcode needs decoding
• <span class="text-cyan-300">Memory Efficient:</span> Excellent code density
• <span class="text-cyan-300">Recursive Friendly:</span> Natural for recursive calls

<span class="text-pink-300 font-semibold">Limitations:</span>

• <span class="text-cyan-300">Stack Overhead:</span> Push/pop operations add latency
• <span class="text-cyan-300">Limited Random Access:</span> Cannot directly access stack elements
• <span class="text-cyan-300">Stack Management:</span> Must carefully manage stack size
• <span class="text-cyan-300">Not Intuitive:</span> Postfix notation less readable
• <span class="text-cyan-300">Performance:</span> Stack operations slower than registers
• <span class="text-cyan-300">Debugging:</span> Harder to debug stack-based code

<span class="text-lime-300 font-semibold">Use Cases:</span>
• Java Virtual Machine (JVM)
• Forth programming language
• PostScript interpreters
• Stack-based calculators
• Virtual machines and interpreters`,
    },
    {
      title: '📊 Accumulator-Based Format',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Accumulator-Based Format</span> uses a special accumulator register as an implicit operand. One operand is explicit, accumulator is implicit.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Accumulator (ACC) is implicit source and destination
• One explicit operand in instruction
• All operations involve accumulator
• Result always stored in accumulator

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────────┐
│  Opcode  │   Operand    │
└──────────┴──────────────┘

Accumulator (ACC):
┌─────────┐
│   ACC  │ ← Implicit operand
└─────────┘

Example: ADD 1000
┌──────┬──────────┐
│ ADD  │   1000   │
└──────┴──────────┘

Operation:
  ACC = ACC + Memory[1000]

Before:  ACC = 5
         Memory[1000] = 3

After:   ACC = 8
         Memory[1000] = 3 (unchanged)
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
LOAD  1000        ; ACC = Memory[1000]
ADD   1001        ; ACC = ACC + Memory[1001]
SUB   1002        ; ACC = ACC - Memory[1002]
MUL   1003        ; ACC = ACC * Memory[1003]
STORE 1004        ; Memory[1004] = ACC

; Expression: A + B - C
LOAD  A           ; ACC = A
ADD   B           ; ACC = A + B
SUB   C           ; ACC = A + B - C
STORE RESULT      ; RESULT = ACC
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>

• <span class="text-cyan-300">Simple Design:</span> Only one operand field needed
• <span class="text-cyan-300">Short Instructions:</span> Compact encoding
• <span class="text-cyan-300">Easy Implementation:</span> Simple hardware
• <span class="text-cyan-300">Memory Efficient:</span> Good code density
• <span class="text-cyan-300">Historical:</span> Used in early computers

<span class="text-pink-300 font-semibold">Limitations:</span>

• <span class="text-cyan-300">Accumulator Bottleneck:</span> All operations through one register
• <span class="text-cyan-300">Frequent Spills:</span> Must save/restore accumulator
• <span class="text-cyan-300">No Parallelism:</span> Cannot execute independent operations
• <span class="text-cyan-300">Inefficient:</span> Many instructions for complex expressions
• <span class="text-cyan-300">Outdated:</span> Not used in modern processors

<span class="text-lime-300 font-semibold">Use Cases:</span>
• Early computers (1940s-1960s)
• Simple microcontrollers
• Educational processors
• Historical computer architecture`,
    },
    {
      title: '🔧 Register-Based Format',
      icon: <FiSettings className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Register-Based Format</span> uses general-purpose registers for operands. Multiple registers can be used as operands.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Operands are in general-purpose registers
• Multiple registers available (R0, R1, R2, ...)
• Fast access (registers are in CPU)
• Flexible operand specification

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┬──────────┬──────────┐
│  Opcode  │  Dest    │ Source1  │ Source2  │
└──────────┴──────────┴──────────┴──────────┘

Register File:
┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
│ R0  │  │ R1  │  │ R2  │  │ R3  │
│  5  │  │  3  │  │  2  │  │  1  │
└─────┘  └─────┘  └─────┘  └─────┘

Example: ADD R1, R2, R3
┌──────┬──────┬──────┬──────┐
│ ADD  │  R1  │  R2  │  R3  │
└──────┴──────┴──────┴──────┘

Operation:
  R1 = R2 + R3

Before:  R1 = 0
         R2 = 5
         R3 = 3

After:   R1 = 8
         R2 = 5 (unchanged)
         R3 = 3 (unchanged)
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
ADD  R1, R2, R3        ; R1 = R2 + R3
SUB  R4, R5, R6        ; R4 = R5 - R6
MUL  R7, R8, R9        ; R7 = R8 * R9
MOV  R1, R2            ; R1 = R2
ADD  R1, R2, #10       ; R1 = R2 + 10

; Expression: A = B + C (assuming A=R1, B=R2, C=R3)
ADD  R1, R2, R3        ; R1 = R2 + R3

; Complex: X = (A + B) * C
ADD  R10, R1, R2       ; R10 = A + B
MUL  R11, R10, R3      ; R11 = R10 * C
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>

• <span class="text-cyan-300">Fast Access:</span> Registers are fastest storage
• <span class="text-cyan-300">Flexible:</span> Can use any register combination
• <span class="text-cyan-300">Parallel Execution:</span> Multiple operations can run in parallel
• <span class="text-cyan-300">Efficient:</span> No memory access overhead
• <span class="text-cyan-300">Modern:</span> Used in all modern processors
• <span class="text-cyan-300">Compiler Friendly:</span> Easy to allocate registers

<span class="text-pink-300 font-semibold">Limitations:</span>

• <span class="text-cyan-300">Limited Registers:</span> Only 8-32 registers available
• <span class="text-cyan-300">Register Spills:</span> May need to spill to memory
• <span class="text-cyan-300">Instruction Size:</span> Larger instructions (register encoding)
• <span class="text-cyan-300">Register Allocation:</span> Compiler must manage registers
• <span class="text-cyan-300">Context Switching:</span> Must save/restore registers

<span class="text-lime-300 font-semibold">Use Cases:</span>
• Modern RISC processors (MIPS, ARM, RISC-V)
• CISC processors (x86 with register operands)
• High-performance computing
• All modern general-purpose processors
• Embedded systems`,
    },
    {
      title: '📊 Instruction Format Comparison',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Comparison Table</span> of all instruction formats with their characteristics, advantages, and use cases.

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Format</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Operands</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instruction Size</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Speed</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Use Case</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Zero-Address</span></td>
<td class="border border-gray-600 px-3 py-2">0 (stack)</td>
<td class="border border-gray-600 px-3 py-2">Smallest</td>
<td class="border border-gray-600 px-3 py-2">Medium</td>
<td class="border border-gray-600 px-3 py-2">Stack machines, VMs</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">One-Address</span></td>
<td class="border border-gray-600 px-3 py-2">1 (ACC implicit)</td>
<td class="border border-gray-600 px-3 py-2">Small</td>
<td class="border border-gray-600 px-3 py-2">Medium</td>
<td class="border border-gray-600 px-3 py-2">Early computers</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Two-Address</span></td>
<td class="border border-gray-600 px-3 py-2">2 (dest+src)</td>
<td class="border border-gray-600 px-3 py-2">Medium</td>
<td class="border border-gray-600 px-3 py-2">Fast</td>
<td class="border border-gray-600 px-3 py-2">x86, ARM</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Three-Address</span></td>
<td class="border border-gray-600 px-3 py-2">3 (dest+src1+src2)</td>
<td class="border border-gray-600 px-3 py-2">Largest</td>
<td class="border border-gray-600 px-3 py-2">Fastest</td>
<td class="border border-gray-600 px-3 py-2">MIPS, RISC-V</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Stack-Based</span></td>
<td class="border border-gray-600 px-3 py-2">0 (stack)</td>
<td class="border border-gray-600 px-3 py-2">Smallest</td>
<td class="border border-gray-600 px-3 py-2">Medium</td>
<td class="border border-gray-600 px-3 py-2">JVM, Forth</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Accumulator-Based</span></td>
<td class="border border-gray-600 px-3 py-2">1 (ACC implicit)</td>
<td class="border border-gray-600 px-3 py-2">Small</td>
<td class="border border-gray-600 px-3 py-2">Medium</td>
<td class="border border-gray-600 px-3 py-2">Historical</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Register-Based</span></td>
<td class="border border-gray-600 px-3 py-2">2-3 (registers)</td>
<td class="border border-gray-600 px-3 py-2">Medium-Large</td>
<td class="border border-gray-600 px-3 py-2">Fastest</td>
<td class="border border-gray-600 px-3 py-2">Modern RISC/CISC</td>
</tr>
</tbody>
</table>

<span class="text-lime-300 font-semibold">Code Density Comparison:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Format</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Example Expression</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instructions</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Bytes</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2">Stack</td>
<td class="border border-gray-600 px-3 py-2 font-mono text-xs">A + B</td>
<td class="border border-gray-600 px-3 py-2">PUSH A, PUSH B, ADD</td>
<td class="border border-gray-600 px-3 py-2">3</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2">One-Address</td>
<td class="border border-gray-600 px-3 py-2 font-mono text-xs">A + B</td>
<td class="border border-gray-600 px-3 py-2">LOAD A, ADD B</td>
<td class="border border-gray-600 px-3 py-2">4</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2">Two-Address</td>
<td class="border border-gray-600 px-3 py-2 font-mono text-xs">A = A + B</td>
<td class="border border-gray-600 px-3 py-2">ADD A, B</td>
<td class="border border-gray-600 px-3 py-2">3</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2">Three-Address</td>
<td class="border border-gray-600 px-3 py-2 font-mono text-xs">A = B + C</td>
<td class="border border-gray-600 px-3 py-2">ADD A, B, C</td>
<td class="border border-gray-600 px-3 py-2">4</td>
</tr>
</tbody>
</table>

<span class="text-pink-300 font-semibold">Selection Criteria:</span>

• <span class="text-cyan-300">Performance:</span> Register-based > Two-address > Three-address > Stack-based
• <span class="text-cyan-300">Code Size:</span> Stack-based > One-address > Two-address > Three-address
• <span class="text-cyan-300">Flexibility:</span> Three-address > Register-based > Two-address > Stack-based
• <span class="text-cyan-300">Complexity:</span> Stack-based < One-address < Two-address < Three-address`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Understand</span> the need for instruction formats in computer architecture
✓ <span class="text-cyan-300">Identify</span> different instruction format types
✓ <span class="text-cyan-300">Explain</span> zero-address, one-address, two-address, and three-address formats
✓ <span class="text-cyan-300">Understand</span> stack-based, accumulator-based, and register-based formats
✓ <span class="text-cyan-300">Compare</span> instruction formats in terms of size, speed, and flexibility
✓ <span class="text-cyan-300">Analyze</span> advantages and limitations of each format
✓ <span class="text-cyan-300">Select</span> appropriate format for given applications
✓ <span class="text-cyan-300">Understand</span> the relationship between instruction formats and processor design

This topic is essential for understanding how processors encode and execute instructions efficiently.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Compare zero-address and three-address instruction formats. What are the advantages and disadvantages of each?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Zero-Address Format:</span>

<span class="text-lime-300">Advantages:</span>
• Ultra-compact instructions (only opcode)
• Excellent code density
• Simple instruction decoding
• Natural for postfix notation
• No register conflicts

<span class="text-pink-300">Disadvantages:</span>
• Stack overhead (push/pop operations)
• Limited flexibility
• Not intuitive (postfix notation)
• Slower than register operations
• Stack management complexity

<span class="text-yellow-300">Three-Address Format:</span>

<span class="text-lime-300">Advantages:</span>
• Preserves all operands
• Most flexible format
• Efficient for complex expressions
• Better for parallel execution
• Compiler-friendly

<span class="text-pink-300">Disadvantages:</span>
• Larger instructions (more bits)
• More memory usage
• Complex instruction decoding
• Requires more registers

<span class="text-cyan-300">Comparison:</span>
• Code Size: Zero-address wins (smaller)
• Speed: Three-address wins (faster)
• Flexibility: Three-address wins
• Simplicity: Zero-address wins`,
    },
    {
      question: 'Explain how a two-address format instruction works. Give an example and show the operation.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Two-Address Format:</span>
Specifies two operands where the first operand is both source and destination.

<span class="text-cyan-300">Instruction Format:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
┌──────────┬──────────┬──────────┐
│  Opcode  │  Dest    │  Source  │
└──────────┴──────────┴──────────┘
</pre>

<span class="text-cyan-300">Example:</span> <span class="font-mono">ADD R1, R2</span>

<span class="text-lime-300">Operation:</span>
• R1 is both source and destination
• R2 is source only
• Result: R1 = R1 + R2

<span class="text-cyan-300">Step-by-Step:</span>

<span class="text-yellow-300">Before:</span>
• R1 = 5
• R2 = 3

<span class="text-yellow-300">Execution:</span>
1. Read R1 (value: 5)
2. Read R2 (value: 3)
3. Compute: 5 + 3 = 8
4. Write result to R1

<span class="text-yellow-300">After:</span>
• R1 = 8 (updated)
• R2 = 3 (unchanged)

<span class="text-pink-300">Note:</span> The original value of R1 (5) is lost and replaced with the result (8).`,
    },
    {
      question: 'What is the difference between accumulator-based and register-based instruction formats?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Accumulator-Based Format:</span>
• Uses a single special register (accumulator) as implicit operand
• One explicit operand in instruction
• All operations involve accumulator
• Result always stored in accumulator

<span class="text-cyan-300">Example:</span> <span class="font-mono">ADD 1000</span>
• Operation: ACC = ACC + Memory[1000]
• Accumulator is implicit source and destination

<span class="text-yellow-300">Register-Based Format:</span>
• Uses multiple general-purpose registers
• Two or three explicit operands
• Any register can be used
• Result can be stored in any register

<span class="text-cyan-300">Example:</span> <span class="font-mono">ADD R1, R2, R3</span>
• Operation: R1 = R2 + R3
• All registers are explicit

<span class="text-lime-300">Key Differences:</span>

<table class="w-full mt-2 border-collapse text-xs">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-2 py-1 text-left">Aspect</th>
<th class="border border-gray-600 px-2 py-1 text-left">Accumulator</th>
<th class="border border-gray-600 px-2 py-1 text-left">Register</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Registers</td>
<td class="border border-gray-600 px-2 py-1">1 (ACC only)</td>
<td class="border border-gray-600 px-2 py-1">Multiple (R0-Rn)</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Operands</td>
<td class="border border-gray-600 px-2 py-1">1 explicit</td>
<td class="border border-gray-600 px-2 py-1">2-3 explicit</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Flexibility</td>
<td class="border border-gray-600 px-2 py-1">Low</td>
<td class="border border-gray-600 px-2 py-1">High</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Parallelism</td>
<td class="border border-gray-600 px-2 py-1">No</td>
<td class="border border-gray-600 px-2 py-1">Yes</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Use</td>
<td class="border border-gray-600 px-2 py-1">Historical</td>
<td class="border border-gray-600 px-2 py-1">Modern</td>
</tr>
</tbody>
</table>`,
    },
    {
      question: 'Show how the expression A = (B + C) * D would be implemented using stack-based format.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Stack-Based Implementation:</span>

<span class="text-cyan-300">Expression:</span> A = (B + C) * D

<span class="text-lime-300">Step-by-Step:</span>

<pre class="bg-black/30 p-3 rounded mt-2 text-xs font-mono">
Instruction          Stack State          Description
─────────────────────────────────────────────────────
PUSH B              [B]                  Push B onto stack
PUSH C              [C, B]               Push C onto stack
ADD                 [B+C]                Pop C and B, add, push result
PUSH D              [D, B+C]             Push D onto stack
MUL                 [(B+C)*D]            Pop D and (B+C), multiply, push result
POP A               []                   Pop result and store in A
</pre>

<span class="text-cyan-300">Detailed Execution:</span>

<span class="text-yellow-300">1. PUSH B:</span>
• Stack: [B]
• SP points to B

<span class="text-yellow-300">2. PUSH C:</span>
• Stack: [C, B]
• SP points to C

<span class="text-yellow-300">3. ADD:</span>
• Pop C (top element)
• Pop B (next element)
• Compute: B + C
• Push result: [B+C]
• Stack: [B+C]

<span class="text-yellow-300">4. PUSH D:</span>
• Stack: [D, B+C]
• SP points to D

<span class="text-yellow-300">5. MUL:</span>
• Pop D (top element)
• Pop (B+C) (next element)
• Compute: (B+C) * D
• Push result: [(B+C)*D]
• Stack: [(B+C)*D]

<span class="text-yellow-300">6. POP A:</span>
• Pop result from stack
• Store in variable A
• A = (B+C) * D
• Stack: [] (empty)

<span class="text-pink-300">Note:</span> This uses postfix notation, which is natural for stack-based execution.`,
    },
    {
      question: 'Why is three-address format preferred in modern RISC processors?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Three-Address Format Advantages for RISC:</span>

<span class="text-cyan-300">1. Operand Preservation:</span>
• Both source operands remain unchanged
• No need to save/restore operands
• Enables better register allocation

<span class="text-cyan-300">2. Expression Efficiency:</span>
• Direct representation of expressions
• Example: <span class="font-mono">ADD R1, R2, R3</span> directly represents R1 = R2 + R3
• No intermediate storage needed

<span class="text-cyan-300">3. Compiler Optimization:</span>
• Easy to generate efficient code
• Better register allocation
• Enables instruction scheduling
• Supports optimization techniques

<span class="text-cyan-300">4. Parallel Execution:</span>
• Multiple independent operations can execute in parallel
• Better instruction-level parallelism (ILP)
• Enables pipelining and superscalar execution

<span class="text-cyan-300">5. Fixed Instruction Length:</span>
• RISC processors use fixed-length instructions
• Three-address format fits well in fixed-size instruction word
• Simplifies instruction fetch and decode

<span class="text-cyan-300">6. Register File Design:</span>
• RISC processors have large register files
• Three-address format utilizes multiple registers efficiently
• Reduces memory access

<span class="text-lime-300">Example (MIPS - RISC processor):</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
ADD $t0, $t1, $t2    ; $t0 = $t1 + $t2
SUB $t3, $t4, $t5    ; $t3 = $t4 - $t5
</pre>
Both instructions can execute in parallel since they use different registers.

<span class="text-pink-300">Trade-off:</span>
• Larger instructions (more bits)
• But benefits outweigh the cost in modern processors`,
    },
  ],
}

export default function InstructionFormatsPage() {
  return <DSDTopicPage content={content} />
}


