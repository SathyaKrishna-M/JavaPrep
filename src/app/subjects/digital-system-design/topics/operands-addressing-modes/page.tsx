'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiCpu, FiDatabase, FiSettings } from 'react-icons/fi'

const content = {
  title: 'Operands and Addressing Modes',
  explanationSections: [
    {
      title: '📖 Introduction to Operands',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Operands</span> are the data values or memory locations that instructions operate upon. Every instruction requires operands to specify what data to process and where to store results.

<span class="text-amber-300 font-semibold">What are Operands?</span>

An <span class="text-cyan-300">operand</span> is a value or location that an instruction operates on. Instructions typically have:
• <span class="text-yellow-300">Source Operands:</span> Data used as input for the operation
• <span class="text-yellow-300">Destination Operand:</span> Location where the result is stored

<span class="text-lime-300 font-semibold">Example Instruction Format:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
ADD  Destination, Source1, Source2
     └─────────┘  └──────┘  └──────┘
       operand     operand   operand
</pre>

<span class="text-pink-300 font-semibold">Key Concepts:</span>

• Operands specify the data to be processed
• Different operand types require different addressing methods
• The way operands are specified is called <span class="text-cyan-300">addressing mode</span>
• Efficient operand specification improves code size and execution speed`,
    },
    {
      title: '🔢 Types of Operands',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Operand Types</span> determine how data is accessed and used in instructions. Understanding operand types is essential for understanding addressing modes.

<span class="text-amber-300 font-semibold">1. Immediate Operand</span>

<span class="text-cyan-300">Definition:</span> The actual data value is part of the instruction itself.

<span class="text-lime-300">Characteristics:</span>
• Data is embedded directly in the instruction
• No memory access required to get the value
• Fastest to access (no memory read)
• Limited by instruction size

<span class="text-yellow-300">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
MOV  R1, #25        ; Load immediate value 25 into register R1
ADD  ACC, #10       ; Add immediate value 10 to accumulator
CMP  R2, #0         ; Compare register R2 with immediate value 0
</pre>

<span class="text-pink-300">Notation:</span> Usually prefixed with # or $ to indicate immediate value

<span class="text-amber-300 font-semibold">2. Register Operand</span>

<span class="text-cyan-300">Definition:</span> The operand is stored in a CPU register.

<span class="text-lime-300">Characteristics:</span>
• Fastest access (registers are inside CPU)
• Limited number of registers available
• Register names are encoded in instruction
• No memory access required

<span class="text-yellow-300">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
MOV  R1, R2         ; Copy contents of R2 to R1
ADD  R3, R1, R2     ; Add R1 and R2, store result in R3
SUB  ACC, R5        ; Subtract R5 from accumulator
</pre>

<span class="text-pink-300">Notation:</span> Register names like R1, R2, ACC, PC, etc.

<span class="text-amber-300 font-semibold">3. Memory Operand</span>

<span class="text-cyan-300">Definition:</span> The operand is stored in main memory at a specific address.

<span class="text-lime-300">Characteristics:</span>
• Requires memory access (slower than registers)
• Can access large amounts of data
• Address must be specified or calculated
• Different addressing modes determine how address is obtained

<span class="text-yellow-300">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
LOAD  R1, [1000]      ; Load data from memory address 1000 into R1
STORE R2, [2000]      ; Store contents of R2 to memory address 2000
ADD   R3, [R1]        ; Add data from address in R1 to R3
</pre>

<span class="text-pink-300">Notation:</span> Usually enclosed in brackets [ ] to indicate memory access

<span class="text-amber-300 font-semibold">4. Constant Operand</span>

<span class="text-cyan-300">Definition:</span> A fixed value that doesn't change during program execution (similar to immediate, but may be stored in memory).

<span class="text-lime-300">Characteristics:</span>
• Value is fixed and known at compile time
• May be stored in read-only memory
• Can be larger than immediate operands
• Used for constants, lookup tables, etc.

<span class="text-yellow-300">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
PI = 3.14159         ; Mathematical constant
MAX_SIZE = 1000      ; Program constant
MASK = 0xFF00        ; Bit mask constant
</pre>

<span class="text-pink-300 font-semibold">Operand Type Comparison:</span>

<table class="w-full mt-3 border-collapse">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Type</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Speed</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Size Limit</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Access Method</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Register</span></td>
<td class="border border-gray-600 px-3 py-2">Fastest</td>
<td class="border border-gray-600 px-3 py-2">Limited (8-32 registers)</td>
<td class="border border-gray-600 px-3 py-2">Direct CPU access</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Immediate</span></td>
<td class="border border-gray-600 px-3 py-2">Very Fast</td>
<td class="border border-gray-600 px-3 py-2">Small (8-16 bits)</td>
<td class="border border-gray-600 px-3 py-2">Embedded in instruction</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Memory</span></td>
<td class="border border-gray-600 px-3 py-2">Slower</td>
<td class="border border-gray-600 px-3 py-2">Large (entire memory)</td>
<td class="border border-gray-600 px-3 py-2">Memory access required</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Constant</span></td>
<td class="border border-gray-600 px-3 py-2">Fast (if in cache)</td>
<td class="border border-gray-600 px-3 py-2">Large</td>
<td class="border border-gray-600 px-3 py-2">Memory/ROM access</td>
</tr>
</tbody>
</table>`,
    },
    {
      title: '📍 Addressing Modes',
      icon: <FiSettings className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Addressing Modes</span> specify how the address of an operand is determined. Different addressing modes provide flexibility in accessing data and enable efficient code generation.

<span class="text-amber-300 font-semibold">Why Addressing Modes?</span>

• <span class="text-cyan-300">Flexibility:</span> Different ways to access data
• <span class="text-cyan-300">Efficiency:</span> Optimize code size and execution speed
• <span class="text-cyan-300">Power:</span> Enable complex data structures and algorithms
• <span class="text-cyan-300">Portability:</span> Support different programming paradigms

<span class="text-lime-300 font-semibold">Effective Address:</span>

The <span class="text-cyan-300">Effective Address (EA)</span> is the actual memory address where the operand is located. Different addressing modes calculate the effective address in different ways.`,
    },
    {
      title: '1️⃣ Immediate Addressing Mode',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Immediate Addressing</span> uses the operand value directly from the instruction. The data is part of the instruction itself.

<span class="text-amber-300 font-semibold">How it Works:</span>

• The operand value is embedded in the instruction
• No memory access needed to fetch the operand
• Effective Address = Not applicable (no memory address)
• Operand value = Value in instruction

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────────┐
│  Opcode  │  Immediate   │
│          │    Value     │
└──────────┴──────────────┘

Example: MOV R1, #25
┌──────┬──────┬──────────┐
│ MOV  │  R1  │    25    │
│(op)  │(dest)│ (immediate)│
└──────┴──────┴──────────┘
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
MOV  R1, #25        ; R1 = 25 (load immediate value)
ADD  ACC, #10       ; ACC = ACC + 10
CMP  R2, #0         ; Compare R2 with 0
SUB  R3, #5         ; R3 = R3 - 5
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Fast execution (no memory access)
• Simple and direct
• Good for constants and small values

<span class="text-pink-300 font-semibold">Disadvantages:</span>
• Limited value range (constrained by instruction size)
• Cannot be used for variable data
• Increases instruction size`,
    },
    {
      title: '2️⃣ Register Addressing Mode',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Register Addressing</span> uses a CPU register as the operand. The register contains the data value.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Register name is specified in instruction
• Data is stored in the register
• Effective Address = Not applicable (register, not memory)
• Operand value = Contents of specified register

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┬──────────┐
│  Opcode  │ Register │ Register │
│          │  (src)   │  (dest)  │
└──────────┴──────────┴──────────┘

Example: ADD R1, R2, R3
┌──────┬──────┬──────┬──────┐
│ ADD  │  R1  │  R2  │  R3  │
│(op)  │(dest)│(src1)│(src2)│
└──────┴──────┴──────┴──────┘
        R1 = R2 + R3
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
MOV  R1, R2         ; R1 = R2 (copy register)
ADD  R3, R1, R2     ; R3 = R1 + R2
SUB  ACC, R5        ; ACC = ACC - R5
MUL  R4, R2         ; R4 = R4 × R2
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Fastest access (registers are in CPU)
• Short instruction encoding
• Efficient for frequently used data

<span class="text-pink-300 font-semibold">Disadvantages:</span>
• Limited number of registers
• Cannot access large data structures directly`,
    },
    {
      title: '3️⃣ Direct Addressing Mode',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Direct Addressing</span> specifies the memory address directly in the instruction. The address is part of the instruction.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Memory address is embedded in instruction
• Effective Address = Address specified in instruction
• Operand value = Memory[Effective Address]
• Requires one memory access to get operand

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────────┐
│  Opcode  │ Memory Address│
│          │   (direct)   │
└──────────┴──────────────┘

Example: LOAD R1, [1000]
┌──────┬──────┬──────────┐
│ LOAD │  R1  │   1000   │
│(op)  │(dest)│ (address) │
└──────┴──────┴──────────┘
        R1 = Memory[1000]

Memory:
Address  Value
  1000     42  ← Operand
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
LOAD  R1, [1000]      ; R1 = Memory[1000]
STORE R2, [2000]      ; Memory[2000] = R2
ADD   R3, [3000]      ; R3 = R3 + Memory[3000]
MOV   [4000], #50     ; Memory[4000] = 50
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Simple and straightforward
• Direct access to any memory location
• Easy to understand

<span class="text-pink-300 font-semibold">Disadvantages:</span>
• Limited address range (constrained by instruction size)
• Instruction size increases with address size
• Not suitable for relocatable code`,
    },
    {
      title: '4️⃣ Indirect Addressing Mode',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Indirect Addressing</span> uses a register that contains the memory address. The register points to the actual operand location.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Register contains the address of the operand
• Effective Address = Contents of specified register
• Operand value = Memory[Effective Address]
• Requires two memory accesses: one to get address, one to get data

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┐
│  Opcode  │ Register │
│          │ (points  │
│          │ to addr) │
└──────────┴──────────┘

Example: LOAD R1, [R2]
┌──────┬──────┬──────┐
│ LOAD │  R1  │  R2  │
│(op)  │(dest)│(addr)│
└──────┴──────┴──────┘

Step 1: EA = R2 (get address from register)
Step 2: R1 = Memory[EA] (get data from memory)

Memory:
Address  Value
  2000     75  ← Operand
  1000   2000  ← R2 contains address 2000

Register:
R2 = 2000 (points to address)
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
LOAD  R1, [R2]       ; R1 = Memory[R2]
STORE R3, [R4]       ; Memory[R4] = R3
ADD   R5, [R6]       ; R5 = R5 + Memory[R6]
MOV   [R1], R2       ; Memory[R1] = R2
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Flexible - can access different addresses using same instruction
• Useful for pointers and dynamic addressing
• Enables efficient array access
• Supports relocatable code

<span class="text-pink-300 font-semibold">Disadvantages:</span>
• Slower (requires two memory accesses)
• More complex than direct addressing`,
    },
    {
      title: '5️⃣ Indexed Addressing Mode',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Indexed Addressing</span> adds an index value to a base address. The base address is in a register, and the index is specified in the instruction.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Base address stored in register
• Index value specified in instruction
• Effective Address = Base Register + Index
• Operand value = Memory[Effective Address]

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┬──────────┐
│  Opcode  │ Register │  Index   │
│          │  (base)  │  (offset)│
└──────────┴──────────┴──────────┘

Example: LOAD R1, [R2 + 10]
┌──────┬──────┬──────┬──────┐
│ LOAD │  R1  │  R2  │  10  │
│(op)  │(dest)│(base)│(index)│
└──────┴──────┴──────┴──────┘

EA = R2 + 10
R1 = Memory[EA]

If R2 = 1000:
EA = 1000 + 10 = 1010
R1 = Memory[1010]
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
LOAD  R1, [R2 + 5]     ; R1 = Memory[R2 + 5]
STORE R3, [R4 + 8]     ; Memory[R4 + 8] = R3
ADD   R5, [R6 + 12]    ; R5 = R5 + Memory[R6 + 12]

; Array access example:
; R2 = base address of array
; Access array[5]: LOAD R1, [R2 + 5]
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Excellent for array and structure access
• Efficient for sequential data access
• Base register can be modified for different arrays
• Index can be a constant or variable

<span class="text-pink-300 font-semibold">Disadvantages:</span>
• Requires addition operation (slight overhead)
• More complex than direct addressing`,
    },
    {
      title: '6️⃣ Based Addressing Mode',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Based Addressing</span> is similar to indexed, but uses a base register plus an offset. The base register typically points to the start of a data structure.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Base register contains base address
• Offset specified in instruction
• Effective Address = Base Register + Offset
• Operand value = Memory[Effective Address]

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┬──────────┐
│  Opcode  │ Register │  Offset │
│          │  (base)  │         │
└──────────┴──────────┴──────────┘

Example: LOAD R1, [BP + 4]
┌──────┬──────┬──────┬──────┐
│ LOAD │  R1  │  BP  │   4  │
│(op)  │(dest)│(base)│(offset)│
└──────┴──────┴──────┴──────┘

EA = BP + 4
R1 = Memory[EA]

If BP (Base Pointer) = 2000:
EA = 2000 + 4 = 2004
R1 = Memory[2004]
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
LOAD  R1, [BP + 4]      ; Access local variable at offset 4
STORE R2, [SP + 8]      ; Store at stack offset 8
ADD   R3, [FP + 12]     ; Add frame pointer offset 12

; Stack frame access:
; BP points to base of current stack frame
; Local variables accessed via BP + offset
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Ideal for stack frames and local variables
• Supports relocatable code segments
• Efficient for accessing structured data
• Base register can be changed for different contexts

<span class="text-pink-300 font-semibold">Disadvantages:</span>
• Requires base register setup
• Similar to indexed addressing`,
    },
    {
      title: '7️⃣ PC-Relative Addressing Mode',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">PC-Relative Addressing</span> calculates the effective address relative to the Program Counter (PC). Used primarily for branch instructions.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Offset specified in instruction
• Effective Address = PC + Offset
• Operand value = Memory[Effective Address] (for data) or target address (for branches)
• PC points to current instruction

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┐
│  Opcode  │  Offset  │
│          │ (relative│
│          │  to PC)  │
└──────────┴──────────┘

Example: JMP PC + 20
┌──────┬──────────┐
│ JMP  │    20    │
│(op)  │ (offset) │
└──────┴──────────┘

If PC = 1000:
Target Address = 1000 + 20 = 1020
Jump to address 1020

Memory Layout:
Address  Instruction
  1000    JMP +20
  1002    ...
  1020    (target) ← Jump here
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
JMP  PC + 20         ; Jump forward 20 bytes
BEQ  PC - 10         ; Branch if equal, backward 10 bytes
LOAD R1, [PC + 8]    ; Load data 8 bytes ahead
CALL PC + 50         ; Call subroutine 50 bytes ahead
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Position-independent code (relocatable)
• Shorter instruction encoding (small offset)
• Efficient for local branches
• Supports code sharing

<span class="text-pink-300 font-semibold">Disadvantages:</span>
• Limited range (offset size constraint)
• Cannot access distant addresses directly`,
    },
    {
      title: '8️⃣ Auto-Increment Addressing Mode',
      icon: <FiSettings className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Auto-Increment Addressing</span> uses a register as a pointer, accesses the data, then automatically increments the register. Useful for sequential data access.

<span class="text-amber-300 font-semibold">How it Works:</span>

• Register contains address
• Effective Address = Contents of register
• Operand value = Memory[Effective Address]
• After access: Register = Register + 1 (or +n)

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┐
│  Opcode  │ Register │
│          │   (auto  │
│          │ increment)│
└──────────┴──────────┘

Example: LOAD R1, [R2]+
┌──────┬──────┬──────┐
│ LOAD │  R1  │  R2  │
│(op)  │(dest)│(ptr+)│
└──────┴──────┴──────┘

Before: R2 = 1000
Step 1: EA = R2 = 1000
Step 2: R1 = Memory[1000]
Step 3: R2 = R2 + 1 = 1001 (auto-increment)

After: R1 = Memory[1000], R2 = 1001
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
LOAD  R1, [R2]+       ; Load from R2, then R2 = R2 + 1
STORE R3, [R4]+       ; Store to R4, then R4 = R4 + 1
LOAD  R5, [R6]+2      ; Load from R6, then R6 = R6 + 2

; Array traversal:
; R2 points to array start
; Loop: LOAD R1, [R2]+  ; Process each element
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Efficient for sequential access (arrays, strings)
• Automatic pointer advancement
• Reduces instruction count in loops
• Common in stack operations

<span class="text-pink-300 font-semibold">Disadvantages:</span>
• Modifies register (side effect)
• Must be careful with register reuse
• Not suitable for random access`,
    },
    {
      title: '9️⃣ Auto-Decrement Addressing Mode',
      icon: <FiSettings className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Auto-Decrement Addressing</span> first decrements the register, then uses it as a pointer. Useful for stack operations and reverse traversal.

<span class="text-amber-300 font-semibold">How it Works:</span>

• First: Register = Register - 1 (or -n)
• Then: Effective Address = Contents of register
• Operand value = Memory[Effective Address]

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Instruction Format:
┌──────────┬──────────┐
│  Opcode  │ Register │
│          │   (auto  │
│          │ decrement)│
└──────────┴──────────┘

Example: LOAD R1, -[R2]
┌──────┬──────┬──────┐
│ LOAD │  R1  │  R2  │
│(op)  │(dest)│(-ptr)│
└──────┴──────┴──────┘

Before: R2 = 1000
Step 1: R2 = R2 - 1 = 999 (auto-decrement first)
Step 2: EA = R2 = 999
Step 3: R1 = Memory[999]

After: R1 = Memory[999], R2 = 999
</pre>

<span class="text-lime-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
LOAD  R1, -[R2]       ; R2 = R2 - 1, then load from R2
STORE R3, -[SP]       ; SP = SP - 1, then store to SP (push)
POP   R4, -[SP]       ; Pop from stack (decrement then load)

; Stack push operation:
; STORE R1, -[SP]  ; Decrement stack pointer, then store
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• Perfect for stack operations (push/pop)
• Efficient for reverse array traversal
• Automatic pointer management
• Common in LIFO data structures

<span class="text-pink-300 font-semibold">Disadvantages:</span>
• Modifies register before use
• Must ensure register is initialized correctly
• Can cause errors if register wraps around`,
    },
    {
      title: '📊 Addressing Modes Comparison Table',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Comparison Table</span> of all addressing modes with descriptions, examples, and effective address calculations.

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Addressing Mode</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Description</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Example</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Effective Address Calculation</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-semibold">Immediate</span></td>
<td class="border border-gray-600 px-3 py-2">Operand value is in instruction</td>
<td class="border border-gray-600 px-3 py-2 font-mono">MOV R1, #25</td>
<td class="border border-gray-600 px-3 py-2">EA = N/A (no memory access)<br/>Value = 25</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-semibold">Register</span></td>
<td class="border border-gray-600 px-3 py-2">Operand is in CPU register</td>
<td class="border border-gray-600 px-3 py-2 font-mono">ADD R1, R2</td>
<td class="border border-gray-600 px-3 py-2">EA = N/A (register access)<br/>Value = R2</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-semibold">Direct</span></td>
<td class="border border-gray-600 px-3 py-2">Address is in instruction</td>
<td class="border border-gray-600 px-3 py-2 font-mono">LOAD R1, [1000]</td>
<td class="border border-gray-600 px-3 py-2">EA = 1000<br/>Value = Memory[1000]</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-semibold">Indirect</span></td>
<td class="border border-gray-600 px-3 py-2">Register contains address</td>
<td class="border border-gray-600 px-3 py-2 font-mono">LOAD R1, [R2]</td>
<td class="border border-gray-600 px-3 py-2">EA = R2<br/>Value = Memory[R2]</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-semibold">Indexed</span></td>
<td class="border border-gray-600 px-3 py-2">Base register + index</td>
<td class="border border-gray-600 px-3 py-2 font-mono">LOAD R1, [R2 + 10]</td>
<td class="border border-gray-600 px-3 py-2">EA = R2 + 10<br/>Value = Memory[R2 + 10]</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-semibold">Based</span></td>
<td class="border border-gray-600 px-3 py-2">Base register + offset</td>
<td class="border border-gray-600 px-3 py-2 font-mono">LOAD R1, [BP + 4]</td>
<td class="border border-gray-600 px-3 py-2">EA = BP + 4<br/>Value = Memory[BP + 4]</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-semibold">PC-Relative</span></td>
<td class="border border-gray-600 px-3 py-2">PC + offset</td>
<td class="border border-gray-600 px-3 py-2 font-mono">JMP PC + 20</td>
<td class="border border-gray-600 px-3 py-2">EA = PC + 20<br/>Target = PC + 20</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-semibold">Auto-Increment</span></td>
<td class="border border-gray-600 px-3 py-2">Use register, then increment</td>
<td class="border border-gray-600 px-3 py-2 font-mono">LOAD R1, [R2]+</td>
<td class="border border-gray-600 px-3 py-2">EA = R2<br/>Then: R2 = R2 + 1<br/>Value = Memory[R2]</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-semibold">Auto-Decrement</span></td>
<td class="border border-gray-600 px-3 py-2">Decrement register, then use</td>
<td class="border border-gray-600 px-3 py-2 font-mono">LOAD R1, -[R2]</td>
<td class="border border-gray-600 px-3 py-2">First: R2 = R2 - 1<br/>Then: EA = R2<br/>Value = Memory[R2]</td>
</tr>
</tbody>
</table>

<span class="text-lime-300 font-semibold">Memory Access Summary:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Addressing Mode</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Memory Accesses</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Speed</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2">Immediate</td>
<td class="border border-gray-600 px-3 py-2">0</td>
<td class="border border-gray-600 px-3 py-2">Fastest</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2">Register</td>
<td class="border border-gray-600 px-3 py-2">0</td>
<td class="border border-gray-600 px-3 py-2">Fastest</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2">Direct</td>
<td class="border border-gray-600 px-3 py-2">1</td>
<td class="border border-gray-600 px-3 py-2">Fast</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2">Indirect</td>
<td class="border border-gray-600 px-3 py-2">2</td>
<td class="border border-gray-600 px-3 py-2">Slower</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2">Indexed/Based</td>
<td class="border border-gray-600 px-3 py-2">1</td>
<td class="border border-gray-600 px-3 py-2">Fast</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2">PC-Relative</td>
<td class="border border-gray-600 px-3 py-2">1</td>
<td class="border border-gray-600 px-3 py-2">Fast</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2">Auto-Increment/Decrement</td>
<td class="border border-gray-600 px-3 py-2">1</td>
<td class="border border-gray-600 px-3 py-2">Fast</td>
</tr>
</tbody>
</table>`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Identify</span> different types of operands (Immediate, Register, Memory, Constant)
✓ <span class="text-cyan-300">Understand</span> the concept of addressing modes and effective address
✓ <span class="text-cyan-300">Explain</span> each addressing mode with examples
✓ <span class="text-cyan-300">Calculate</span> effective addresses for different addressing modes
✓ <span class="text-cyan-300">Compare</span> addressing modes in terms of speed, flexibility, and use cases
✓ <span class="text-cyan-300">Select</span> appropriate addressing mode for given scenarios
✓ <span class="text-cyan-300">Apply</span> addressing modes in assembly language programming
✓ <span class="text-cyan-300">Understand</span> the relationship between addressing modes and instruction encoding

This topic is fundamental for understanding how processors access data and execute instructions efficiently.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'What is the difference between immediate and direct addressing modes? Give examples.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Immediate Addressing Mode:</span>
• The operand value is embedded directly in the instruction
• No memory access required
• Example: <span class="font-mono">MOV R1, #25</span>
  - The value 25 is part of the instruction
  - R1 receives the value 25 directly

<span class="text-yellow-300">Direct Addressing Mode:</span>
• The memory address is embedded in the instruction
• One memory access required to get the operand
• Example: <span class="font-mono">LOAD R1, [1000]</span>
  - The address 1000 is part of the instruction
  - CPU accesses Memory[1000] to get the actual value
  - R1 receives the value stored at address 1000

<span class="text-lime-300">Key Difference:</span>
• Immediate: Value is in instruction (no memory access)
• Direct: Address is in instruction (one memory access to get value)`,
    },
    {
      question: 'Calculate the effective address for the instruction: LOAD R1, [R2 + 15] where R2 = 2000.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

This is <span class="text-yellow-300">Indexed Addressing Mode</span>.

<span class="text-cyan-300">Given:</span>
• Instruction: <span class="font-mono">LOAD R1, [R2 + 15]</span>
• R2 = 2000
• Index = 15

<span class="text-cyan-300">Effective Address Calculation:</span>
EA = Base Register + Index
EA = R2 + 15
EA = 2000 + 15
EA = 2015

<span class="text-cyan-300">Result:</span>
• Effective Address = 2015
• R1 will be loaded with the value stored at Memory[2015]

<span class="text-lime-300">Note:</span> This addressing mode is useful for array access where R2 points to the base of the array and 15 is the index.`,
    },
    {
      question: 'Explain how auto-increment addressing mode works with an example.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Auto-Increment Addressing Mode</span> uses a register as a pointer, accesses the data at that address, then automatically increments the register.

<span class="text-cyan-300">Example:</span> <span class="font-mono">LOAD R1, [R2]+</span>

<span class="text-lime-300">Step-by-Step Process:</span>

<span class="text-yellow-300">Before execution:</span>
• R2 = 1000 (points to memory address 1000)

<span class="text-yellow-300">Step 1: Calculate Effective Address</span>
• EA = R2 = 1000

<span class="text-yellow-300">Step 2: Access Memory</span>
• R1 = Memory[1000]
• Assume Memory[1000] = 42
• So R1 = 42

<span class="text-yellow-300">Step 3: Auto-Increment</span>
• R2 = R2 + 1
• R2 = 1000 + 1 = 1001

<span class="text-yellow-300">After execution:</span>
• R1 = 42 (loaded value)
• R2 = 1001 (incremented pointer)

<span class="text-pink-300">Use Case:</span>
This is perfect for sequential array access:
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
; R2 points to start of array
Loop:
  LOAD R1, [R2]+    ; Load element, advance pointer
  ; Process R1
  ; R2 now points to next element
</pre>`,
    },
    {
      question: 'What is the effective address for PC-relative addressing if PC = 5000 and offset = -100?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

This is <span class="text-yellow-300">PC-Relative Addressing Mode</span>.

<span class="text-cyan-300">Given:</span>
• PC = 5000
• Offset = -100

<span class="text-cyan-300">Effective Address Calculation:</span>
EA = PC + Offset
EA = 5000 + (-100)
EA = 5000 - 100
EA = 4900

<span class="text-cyan-300">Result:</span>
• Effective Address = 4900
• This allows branching backward 100 bytes from the current instruction

<span class="text-lime-300">Note:</span> PC-relative addressing is commonly used for:
• Branch instructions (forward and backward jumps)
• Position-independent code
• Local jumps within a program segment`,
    },
    {
      question: 'Compare indirect addressing with indexed addressing. When would you use each?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Indirect Addressing:</span>
• Effective Address = Contents of register
• Example: <span class="font-mono">LOAD R1, [R2]</span>
• EA = R2 (register contains the address)
• Requires 2 memory accesses (get address, then get data)

<span class="text-yellow-300">Indexed Addressing:</span>
• Effective Address = Base Register + Index
• Example: <span class="font-mono">LOAD R1, [R2 + 10]</span>
• EA = R2 + 10 (register + constant)
• Requires 1 memory access (after address calculation)

<span class="text-lime-300">Comparison:</span>

<table class="w-full mt-2 border-collapse text-xs">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-2 py-1 text-left">Aspect</th>
<th class="border border-gray-600 px-2 py-1 text-left">Indirect</th>
<th class="border border-gray-600 px-2 py-1 text-left">Indexed</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Speed</td>
<td class="border border-gray-600 px-2 py-1">Slower (2 memory accesses)</td>
<td class="border border-gray-600 px-2 py-1">Faster (1 memory access)</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Flexibility</td>
<td class="border border-gray-600 px-2 py-1">High (pointer can point anywhere)</td>
<td class="border border-gray-600 px-2 py-1">High (base + offset)</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Use Case</td>
<td class="border border-gray-600 px-2 py-1">Pointers, dynamic addressing</td>
<td class="border border-gray-600 px-2 py-1">Arrays, structures</td>
</tr>
</tbody>
</table>

<span class="text-pink-300">When to Use:</span>

<span class="text-cyan-300">Use Indirect Addressing when:</span>
• Working with pointers
• Address is stored in a variable
• Dynamic memory allocation
• Linked data structures

<span class="text-cyan-300">Use Indexed Addressing when:</span>
• Accessing array elements
• Accessing structure fields
• Sequential data access
• Base address is known, offset is constant`,
    },
  ],
}

export default function OperandsAddressingModesPage() {
  return <DSDTopicPage content={content} />
}


