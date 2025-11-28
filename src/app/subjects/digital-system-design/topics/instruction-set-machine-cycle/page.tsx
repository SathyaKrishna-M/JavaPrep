'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiCpu, FiDatabase, FiSettings, FiArrowRight } from 'react-icons/fi'

const content = {
  title: 'Instruction Set and Machine Cycle',
  explanationSections: [
    {
      title: '📖 Introduction to Instruction Set',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Instruction Set</span> is the collection of all instructions that a processor can execute. It defines the operations that the CPU can perform and how they are encoded.

<span class="text-amber-300 font-semibold">What is an Instruction Set?</span>

An <span class="text-cyan-300">instruction set</span> is the interface between software and hardware. It includes:
• All operations the processor can perform
• How operands are specified
• How results are stored
• Instruction encoding format

<span class="text-lime-300 font-semibold">Instruction Set Architecture (ISA):</span>

• <span class="text-cyan-300">Defines:</span> What operations are available
• <span class="text-cyan-300">Specifies:</span> How instructions are encoded
• <span class="text-cyan-300">Determines:</span> How operands are accessed
• <span class="text-cyan-300">Influences:</span> Processor performance and complexity

<span class="text-pink-300 font-semibold">Machine Cycle:</span>

A <span class="text-cyan-300">machine cycle</span> is the basic operation performed by the CPU to execute an instruction. Different types of cycles handle different operations like fetching instructions, reading/writing memory, I/O operations, and handling interrupts.`,
    },
    {
      title: '📚 Instruction Set Classification',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Instruction Set Classification</span> categorizes instructions based on their function. Understanding instruction categories helps in designing efficient programs and understanding processor capabilities.

<span class="text-amber-300 font-semibold">Instruction Categories:</span>

Instructions are classified into seven main categories based on their operation:
1. Data Transfer Instructions
2. Arithmetic Instructions
3. Logical Instructions
4. Shift Instructions
5. Branch/Control Transfer Instructions
6. I/O Instructions
7. Stack Instructions`,
    },
    {
      title: '1️⃣ Data Transfer Instructions',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Data Transfer Instructions</span> move data between registers, memory, and I/O devices without modifying the data.

<span class="text-amber-300 font-semibold">Purpose:</span>
• Copy data from one location to another
• Load data into registers
• Store data from registers to memory
• Transfer data between different storage locations

<span class="text-lime-300 font-semibold">Common Data Transfer Instructions:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instruction</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Description</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Example</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">MOV</td>
<td class="border border-gray-600 px-3 py-2">Move/copy data</td>
<td class="border border-gray-600 px-3 py-2 font-mono">MOV R1, R2</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">LOAD</td>
<td class="border border-gray-600 px-3 py-2">Load from memory to register</td>
<td class="border border-gray-600 px-3 py-2 font-mono">LOAD R1, [1000]</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">STORE</td>
<td class="border border-gray-600 px-3 py-2">Store from register to memory</td>
<td class="border border-gray-600 px-3 py-2 font-mono">STORE R1, [2000]</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">PUSH</td>
<td class="border border-gray-600 px-3 py-2">Push onto stack</td>
<td class="border border-gray-600 px-3 py-2 font-mono">PUSH R1</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">POP</td>
<td class="border border-gray-600 px-3 py-2">Pop from stack</td>
<td class="border border-gray-600 px-3 py-2 font-mono">POP R1</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">LDA</td>
<td class="border border-gray-600 px-3 py-2">Load accumulator</td>
<td class="border border-gray-600 px-3 py-2 font-mono">LDA 1000</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">STA</td>
<td class="border border-gray-600 px-3 py-2">Store accumulator</td>
<td class="border border-gray-600 px-3 py-2 font-mono">STA 2000</td>
</tr>
</tbody>
</table>

<span class="text-pink-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
MOV  R1, R2           ; Copy R2 to R1 (R1 = R2)
LOAD R1, [1000]       ; Load memory[1000] into R1
STORE R1, [2000]      ; Store R1 to memory[2000]
MOV  R1, #25          ; Load immediate value 25 into R1
PUSH R1               ; Push R1 onto stack
POP  R2               ; Pop from stack into R2
</pre>

<span class="text-lime-300 font-semibold">Characteristics:</span>
• Do not modify data (only move it)
• Essential for all programs
• Most frequently used instructions
• Support various addressing modes`,
    },
    {
      title: '2️⃣ Arithmetic Instructions',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Arithmetic Instructions</span> perform mathematical operations on numeric data.

<span class="text-amber-300 font-semibold">Purpose:</span>
• Perform addition, subtraction, multiplication, division
• Handle signed and unsigned numbers
• Update status flags (carry, zero, overflow, sign)
• Support various data types (integer, floating-point)

<span class="text-lime-300 font-semibold">Common Arithmetic Instructions:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instruction</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Description</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Example</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">ADD</td>
<td class="border border-gray-600 px-3 py-2">Addition</td>
<td class="border border-gray-600 px-3 py-2 font-mono">ADD R1, R2, R3</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">SUB</td>
<td class="border border-gray-600 px-3 py-2">Subtraction</td>
<td class="border border-gray-600 px-3 py-2 font-mono">SUB R1, R2, R3</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">MUL</td>
<td class="border border-gray-600 px-3 py-2">Multiplication</td>
<td class="border border-gray-600 px-3 py-2 font-mono">MUL R1, R2, R3</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">DIV</td>
<td class="border border-gray-600 px-3 py-2">Division</td>
<td class="border border-gray-600 px-3 py-2 font-mono">DIV R1, R2, R3</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">INC</td>
<td class="border border-gray-600 px-3 py-2">Increment by 1</td>
<td class="border border-gray-600 px-3 py-2 font-mono">INC R1</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">DEC</td>
<td class="border border-gray-600 px-3 py-2">Decrement by 1</td>
<td class="border border-gray-600 px-3 py-2 font-mono">DEC R1</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">NEG</td>
<td class="border border-gray-600 px-3 py-2">Negate (two's complement)</td>
<td class="border border-gray-600 px-3 py-2 font-mono">NEG R1</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">CMP</td>
<td class="border border-gray-600 px-3 py-2">Compare (subtract, set flags, don't store)</td>
<td class="border border-gray-600 px-3 py-2 font-mono">CMP R1, R2</td>
</tr>
</tbody>
</table>

<span class="text-pink-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
ADD  R1, R2, R3       ; R1 = R2 + R3
SUB  R1, R2, R3       ; R1 = R2 - R3
MUL  R1, R2, R3       ; R1 = R2 * R3
DIV  R1, R2, R3       ; R1 = R2 / R3
INC  R1               ; R1 = R1 + 1
DEC  R1               ; R1 = R1 - 1
ADD  R1, R2, #10      ; R1 = R2 + 10 (immediate)
CMP  R1, R2           ; Compare R1 and R2, set flags
</pre>

<span class="text-lime-300 font-semibold">Status Flags Updated:</span>
• <span class="text-cyan-300">Zero (Z):</span> Set if result is zero
• <span class="text-cyan-300">Carry (C):</span> Set if operation produces carry/borrow
• <span class="text-cyan-300">Overflow (V):</span> Set if signed overflow occurs
• <span class="text-cyan-300">Sign (S/N):</span> Set if result is negative`,
    },
    {
      title: '3️⃣ Logical Instructions',
      icon: <FiSettings className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Logical Instructions</span> perform bitwise logical operations on binary data.

<span class="text-amber-300 font-semibold">Purpose:</span>
• Perform bitwise AND, OR, XOR, NOT operations
• Manipulate individual bits
• Set, clear, or toggle specific bits
• Perform masking operations

<span class="text-lime-300 font-semibold">Common Logical Instructions:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instruction</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Description</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Example</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">AND</td>
<td class="border border-gray-600 px-3 py-2">Bitwise AND</td>
<td class="border border-gray-600 px-3 py-2 font-mono">AND R1, R2, R3</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">OR</td>
<td class="border border-gray-600 px-3 py-2">Bitwise OR</td>
<td class="border border-gray-600 px-3 py-2 font-mono">OR R1, R2, R3</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">XOR</td>
<td class="border border-gray-600 px-3 py-2">Bitwise XOR (exclusive OR)</td>
<td class="border border-gray-600 px-3 py-2 font-mono">XOR R1, R2, R3</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">NOT</td>
<td class="border border-gray-600 px-3 py-2">Bitwise NOT (complement)</td>
<td class="border border-gray-600 px-3 py-2 font-mono">NOT R1, R2</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">NAND</td>
<td class="border border-gray-600 px-3 py-2">Bitwise NAND</td>
<td class="border border-gray-600 px-3 py-2 font-mono">NAND R1, R2, R3</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">NOR</td>
<td class="border border-gray-600 px-3 py-2">Bitwise NOR</td>
<td class="border border-gray-600 px-3 py-2 font-mono">NOR R1, R2, R3</td>
</tr>
</tbody>
</table>

<span class="text-pink-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
AND  R1, R2, R3       ; R1 = R2 AND R3 (bitwise)
OR   R1, R2, R3       ; R1 = R2 OR R3
XOR  R1, R2, R3       ; R1 = R2 XOR R3
NOT  R1, R2           ; R1 = NOT R2 (complement)
AND  R1, R2, #0xFF    ; Mask lower 8 bits
OR   R1, R2, #0x80    ; Set bit 7
XOR  R1, R1, R1       ; Clear R1 (R1 = 0)
</pre>

<span class="text-lime-300 font-semibold">Common Applications:</span>
• <span class="text-cyan-300">Masking:</span> Extract specific bits using AND
• <span class="text-cyan-300">Setting Bits:</span> Set bits using OR
• <span class="text-cyan-300">Toggling Bits:</span> Toggle bits using XOR
• <span class="text-cyan-300">Clearing:</span> Clear register using XOR with itself
• <span class="text-cyan-300">Bit Manipulation:</span> Control individual bits`,
    },
    {
      title: '4️⃣ Shift Instructions',
      icon: <FiArrowRight className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Shift Instructions</span> move bits left or right within a register or memory location.

<span class="text-amber-300 font-semibold">Purpose:</span>
• Multiply or divide by powers of 2
• Extract or insert bits
• Perform bit manipulation
• Fast arithmetic operations

<span class="text-lime-300 font-semibold">Types of Shift Instructions:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instruction</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Description</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Example</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">SHL/SLL</td>
<td class="border border-gray-600 px-3 py-2">Logical left shift</td>
<td class="border border-gray-600 px-3 py-2 font-mono">SHL R1, R2, #2</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">SHR/SRL</td>
<td class="border border-gray-600 px-3 py-2">Logical right shift</td>
<td class="border border-gray-600 px-3 py-2 font-mono">SHR R1, R2, #2</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">SAR</td>
<td class="border border-gray-600 px-3 py-2">Arithmetic right shift</td>
<td class="border border-gray-600 px-3 py-2 font-mono">SAR R1, R2, #2</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">ROL</td>
<td class="border border-gray-600 px-3 py-2">Rotate left</td>
<td class="border border-gray-600 px-3 py-2 font-mono">ROL R1, R2, #1</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">ROR</td>
<td class="border border-gray-600 px-3 py-2">Rotate right</td>
<td class="border border-gray-600 px-3 py-2 font-mono">ROR R1, R2, #1</td>
</tr>
</tbody>
</table>

<span class="text-pink-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
SHL  R1, R2, #2       ; R1 = R2 << 2 (multiply by 4)
SHR  R1, R2, #3       ; R1 = R2 >> 3 (divide by 8)
SAR  R1, R2, #1       ; R1 = R2 >> 1 (signed divide by 2)
ROL  R1, R2, #1       ; Rotate R2 left by 1, store in R1
ROR  R1, R2, #1       ; Rotate R2 right by 1, store in R1
</pre>

<span class="text-lime-300 font-semibold">Shift Types:</span>

<span class="text-cyan-300">Logical Shift:</span>
• Left (SHL): Shift left, fill with 0s, MSB → Carry
• Right (SHR): Shift right, fill with 0s, LSB → Carry
• Used for unsigned numbers

<span class="text-cyan-300">Arithmetic Shift:</span>
• Right (SAR): Shift right, preserve sign bit, LSB → Carry
• Used for signed numbers (division by 2^n)

<span class="text-cyan-300">Rotate:</span>
• Left (ROL): Shift left, MSB → LSB and Carry
• Right (ROR): Shift right, LSB → MSB and Carry
• No bits lost, circular shift`,
    },
    {
      title: '5️⃣ Branch/Control Transfer Instructions',
      icon: <FiArrowRight className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Branch/Control Transfer Instructions</span> change the program flow by modifying the Program Counter (PC).

<span class="text-amber-300 font-semibold">Purpose:</span>
• Implement conditional execution (if-else)
• Create loops (for, while)
• Call subroutines/functions
• Handle program flow control

<span class="text-lime-300 font-semibold">Types of Branch Instructions:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instruction</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Description</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Example</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">JMP</td>
<td class="border border-gray-600 px-3 py-2">Unconditional jump</td>
<td class="border border-gray-600 px-3 py-2 font-mono">JMP label</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">JE/JZ</td>
<td class="border border-gray-600 px-3 py-2">Jump if equal/zero</td>
<td class="border border-gray-600 px-3 py-2 font-mono">JE label</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">JNE/JNZ</td>
<td class="border border-gray-600 px-3 py-2">Jump if not equal/not zero</td>
<td class="border border-gray-600 px-3 py-2 font-mono">JNE label</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">JG/JGT</td>
<td class="border border-gray-600 px-3 py-2">Jump if greater</td>
<td class="border border-gray-600 px-3 py-2 font-mono">JG label</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">JL/JLT</td>
<td class="border border-gray-600 px-3 py-2">Jump if less</td>
<td class="border border-gray-600 px-3 py-2 font-mono">JL label</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">CALL</td>
<td class="border border-gray-600 px-3 py-2">Call subroutine</td>
<td class="border border-gray-600 px-3 py-2 font-mono">CALL func</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">RET</td>
<td class="border border-gray-600 px-3 py-2">Return from subroutine</td>
<td class="border border-gray-600 px-3 py-2 font-mono">RET</td>
</tr>
</tbody>
</table>

<span class="text-pink-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
JMP  label           ; Unconditional jump to label
JE   label           ; Jump if zero flag set
JNE  label           ; Jump if zero flag not set
JG   label           ; Jump if greater (signed)
JL   label           ; Jump if less (signed)
CALL func            ; Call function/subroutine
RET                  ; Return from function

; Example: if (R1 == 0) goto label
CMP  R1, #0
JE   label

; Example: while (R1 > 0) { ... }
loop:
  CMP  R1, #0
  JLE  end
  ; ... loop body ...
  DEC  R1
  JMP  loop
end:
</pre>

<span class="text-lime-300 font-semibold">Conditional Branches:</span>
• Based on status flags (Zero, Carry, Sign, Overflow)
• Enable decision-making in programs
• Implement control structures`,
    },
    {
      title: '6️⃣ I/O Instructions',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">I/O Instructions</span> transfer data between the CPU and input/output devices.

<span class="text-amber-300 font-semibold">Purpose:</span>
• Read data from input devices (keyboard, mouse, sensors)
• Write data to output devices (display, printer, actuators)
• Control I/O device operations
• Handle device status

<span class="text-lime-300 font-semibold">Common I/O Instructions:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instruction</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Description</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Example</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">IN</td>
<td class="border border-gray-600 px-3 py-2">Input from I/O port</td>
<td class="border border-gray-600 px-3 py-2 font-mono">IN R1, PORT1</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">OUT</td>
<td class="border border-gray-600 px-3 py-2">Output to I/O port</td>
<td class="border border-gray-600 px-3 py-2 font-mono">OUT PORT1, R1</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">INB</td>
<td class="border border-gray-600 px-3 py-2">Input byte</td>
<td class="border border-gray-600 px-3 py-2 font-mono">INB R1, PORT1</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">OUTB</td>
<td class="border border-gray-600 px-3 py-2">Output byte</td>
<td class="border border-gray-600 px-3 py-2 font-mono">OUTB PORT1, R1</td>
</tr>
</tbody>
</table>

<span class="text-pink-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
IN   R1, PORT1        ; Read from I/O port 1 into R1
OUT  PORT2, R1        ; Write R1 to I/O port 2
INB  R1, KEYBOARD     ; Read byte from keyboard
OUTB DISPLAY, R1      ; Write byte to display

; Read status register
IN   R1, STATUS_PORT
; Check if device ready
AND  R1, #0x01
JNZ  ready            ; Jump if ready bit set
</pre>

<span class="text-lime-300 font-semibold">I/O Methods:</span>
• <span class="text-cyan-300">Port-Mapped I/O:</span> Separate I/O address space
• <span class="text-cyan-300">Memory-Mapped I/O:</span> I/O devices mapped to memory addresses
• <span class="text-cyan-300">DMA:</span> Direct Memory Access (bypasses CPU)`,
    },
    {
      title: '7️⃣ Stack Instructions',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Stack Instructions</span> manipulate the stack data structure for function calls, parameter passing, and local storage.

<span class="text-amber-300 font-semibold">Purpose:</span>
• Push data onto stack
• Pop data from stack
• Manage function call frames
• Store return addresses
• Pass parameters

<span class="text-lime-300 font-semibold">Common Stack Instructions:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instruction</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Description</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Example</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">PUSH</td>
<td class="border border-gray-600 px-3 py-2">Push onto stack</td>
<td class="border border-gray-600 px-3 py-2 font-mono">PUSH R1</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">POP</td>
<td class="border border-gray-600 px-3 py-2">Pop from stack</td>
<td class="border border-gray-600 px-3 py-2 font-mono">POP R1</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">PUSHA</td>
<td class="border border-gray-600 px-3 py-2">Push all registers</td>
<td class="border border-gray-600 px-3 py-2 font-mono">PUSHA</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">POPA</td>
<td class="border border-gray-600 px-3 py-2">Pop all registers</td>
<td class="border border-gray-600 px-3 py-2 font-mono">POPA</td>
</tr>
</tbody>
</table>

<span class="text-pink-300 font-semibold">Examples:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
PUSH R1              ; Push R1 onto stack
POP  R2              ; Pop from stack into R2
PUSH #25             ; Push immediate value
PUSHA                ; Save all registers
POPA                 ; Restore all registers

; Function call example
CALL func            ; Automatically pushes return address
  ; Inside function
  PUSH R1            ; Save R1
  ; ... function code ...
  POP  R1            ; Restore R1
RET                  ; Automatically pops return address
</pre>

<span class="text-lime-300 font-semibold">Stack Operations:</span>
• <span class="text-cyan-300">LIFO:</span> Last In, First Out structure
• <span class="text-cyan-300">Stack Pointer (SP):</span> Points to top of stack
• <span class="text-cyan-300">Push:</span> Decrement SP, store data
• <span class="text-cyan-300">Pop:</span> Read data, increment SP`,
    },
    {
      title: '🔄 Machine Cycle Overview',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Machine Cycle</span> is the basic operation performed by the CPU. Different cycles handle different types of operations.

<span class="text-amber-300 font-semibold">Types of Machine Cycles:</span>

1. <span class="text-cyan-300">Fetch Cycle:</span> Retrieves instruction from memory
2. <span class="text-cyan-300">Memory Read Cycle:</span> Reads data from memory
3. <span class="text-cyan-300">Memory Write Cycle:</span> Writes data to memory
4. <span class="text-cyan-300">I/O Read Cycle:</span> Reads data from I/O device
5. <span class="text-cyan-300">I/O Write Cycle:</span> Writes data to I/O device
6. <span class="text-cyan-300">Interrupt Cycle:</span> Handles interrupt requests

<span class="text-lime-300 font-semibold">Cycle Components:</span>

Each machine cycle consists of:
• <span class="text-cyan-300">T1 State:</span> Address setup
• <span class="text-cyan-300">T2 State:</span> Data transfer
• <span class="text-cyan-300">T3 State:</span> Completion/acknowledgment
• <span class="text-cyan-300">T4 State:</span> Idle/wait (if needed)`,
    },
    {
      title: '1️⃣ Fetch Cycle',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Fetch Cycle</span> retrieves an instruction from memory and loads it into the Instruction Register (IR).

<span class="text-amber-300 font-semibold">Steps:</span>

1. <span class="text-cyan-300">PC → MAR:</span> Copy Program Counter to Memory Address Register
2. <span class="text-cyan-300">Memory Read:</span> Send read signal, memory places instruction on data bus
3. <span class="text-cyan-300">MDR ← Data Bus:</span> Load instruction into Memory Data Register
4. <span class="text-cyan-300">IR ← MDR:</span> Transfer instruction to Instruction Register
5. <span class="text-cyan-300">PC = PC + 1:</span> Increment Program Counter

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Fetch Cycle Flow:
┌─────┐
│ PC  │ = 1000
└──┬──┘
   │
   ▼
┌─────┐
│ MAR │ = 1000
└──┬──┘
   │ Address Bus
   ▼
┌─────────┐
│ Memory  │
│ [1000]  │ = Instruction
└──┬──────┘
   │ Data Bus
   ▼
┌─────┐
│ MDR │ = Instruction
└──┬──┘
   │
   ▼
┌─────┐
│ IR  │ = Instruction
└─────┘

PC = PC + 1 = 1001
</pre>

<span class="text-lime-300 font-semibold">Timing Diagram:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Clock:     ──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐
             └──┘  └──┘  └──┘  └──┘  └──

T1:        ────┐              ┌────
               └──────────────┘
Address:   ────[  1000  ]────────────
           ────┐              ┌────
T2:            └──────────────┘
Read:      ────┐              ┌────
               └──────────────┘
Data Bus:  ────[ Instruction ]──────
           ────┐              ┌────
T3:            └──────────────┘
IR Load:   ────┐              ┌────
               └──────────────┘
PC Update: ───────────────────┐  ┌──
                                └──┘
</pre>

<span class="text-pink-300 font-semibold">Control Signals:</span>
• <span class="text-cyan-300">MREQ:</span> Memory Request (active)
• <span class="text-cyan-300">RD:</span> Read signal (active)
• <span class="text-cyan-300">Address Bus:</span> Contains PC value
• <span class="text-cyan-300">Data Bus:</span> Carries instruction`,
    },
    {
      title: '2️⃣ Memory Read Cycle',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Memory Read Cycle</span> reads data from a memory location into a CPU register.

<span class="text-amber-300 font-semibold">Steps:</span>

1. <span class="text-cyan-300">Address → MAR:</span> Place memory address in MAR
2. <span class="text-cyan-300">Memory Read:</span> Send read signal on control bus
3. <span class="text-cyan-300">Data → MDR:</span> Memory places data on data bus, load into MDR
4. <span class="text-cyan-300">MDR → Register:</span> Transfer data from MDR to destination register

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Memory Read Cycle Flow:
┌─────┐
│Address│ = 2000
└──┬───┘
   │
   ▼
┌─────┐
│ MAR │ = 2000
└──┬──┘
   │ Address Bus
   ▼
┌─────────┐
│ Memory │
│ [2000] │ = Data (42)
└──┬──────┘
   │ Data Bus
   ▼
┌─────┐
│ MDR │ = 42
└──┬──┘
   │
   ▼
┌─────┐
│ R1  │ = 42
└─────┘
</pre>

<span class="text-lime-300 font-semibold">Timing Diagram:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Clock:     ──┐  ┌──┐  ┌──┐  ┌──┐
             └──┘  └──┘  └──┘  └──

T1:        ────┐        ┌────
               └────────┘
Address:   ────[  2000  ]──────
           ────┐        ┌────
T2:            └────────┘
MREQ:      ────┐        ┌────
               └────────┘
RD:        ────┐        ┌────
               └────────┘
Data Bus:  ────[   42   ]──────
           ────┐        ┌────
T3:            └────────┘
MDR Load:  ────┐        ┌────
               └────────┘
</pre>

<span class="text-pink-300 font-semibold">Control Signals:</span>
• <span class="text-cyan-300">MREQ:</span> Memory Request (active)
• <span class="text-cyan-300">RD:</span> Read signal (active)
• <span class="text-cyan-300">Address Bus:</span> Contains memory address
• <span class="text-cyan-300">Data Bus:</span> Carries data from memory`,
    },
    {
      title: '3️⃣ Memory Write Cycle',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Memory Write Cycle</span> writes data from a CPU register to a memory location.

<span class="text-amber-300 font-semibold">Steps:</span>

1. <span class="text-cyan-300">Address → MAR:</span> Place memory address in MAR
2. <span class="text-cyan-300">Data → MDR:</span> Place data to be written in MDR
3. <span class="text-cyan-300">Memory Write:</span> Send write signal on control bus
4. <span class="text-cyan-300">Data → Memory:</span> Data from MDR written to memory location

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Memory Write Cycle Flow:
┌─────┐
│ R1  │ = 75 (data to write)
└──┬──┘
   │
   ▼
┌─────┐
│ MDR │ = 75
└──┬──┘
   │ Data Bus
   ▼
┌─────────┐
│ Memory │
│ [2000] │ ← 75 (written)
└─────────┘
   ▲
   │ Address Bus
┌─────┐
│ MAR │ = 2000 (address)
└─────┘
</pre>

<span class="text-lime-300 font-semibold">Timing Diagram:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Clock:     ──┐  ┌──┐  ┌──┐  ┌──┐
             └──┘  └──┘  └──┘  └──

T1:        ────┐        ┌────
               └────────┘
Address:   ────[  2000  ]──────
           ────┐        ┌────
T2:            └────────┘
MDR:       ────[   75   ]──────
           ────┐        ┌────
T3:            └────────┘
MREQ:      ────┐        ┌────
               └────────┘
WR:        ────┐        ┌────
               └────────┘
Data Bus:  ────[   75   ]──────
           ────┐        ┌────
T4:            └────────┘
Write Complete
</pre>

<span class="text-pink-300 font-semibold">Control Signals:</span>
• <span class="text-cyan-300">MREQ:</span> Memory Request (active)
• <span class="text-cyan-300">WR:</span> Write signal (active)
• <span class="text-cyan-300">Address Bus:</span> Contains memory address
• <span class="text-cyan-300">Data Bus:</span> Carries data to memory`,
    },
    {
      title: '4️⃣ I/O Read Cycle',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">I/O Read Cycle</span> reads data from an input/output device into a CPU register.

<span class="text-amber-300 font-semibold">Steps:</span>

1. <span class="text-cyan-300">I/O Address → Address Bus:</span> Place I/O port address on address bus
2. <span class="text-cyan-300">I/O Read:</span> Send I/O read signal on control bus
3. <span class="text-cyan-300">Data → MDR:</span> I/O device places data on data bus, load into MDR
4. <span class="text-cyan-300">MDR → Register:</span> Transfer data from MDR to destination register

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
I/O Read Cycle Flow:
┌─────┐
│Port │ = 0x10 (I/O port address)
└──┬──┘
   │
   ▼
┌─────┐
│ MAR │ = 0x10
└──┬──┘
   │ Address Bus
   ▼
┌─────────┐
│ I/O     │
│ Device  │ = Data (key pressed: 'A')
└──┬──────┘
   │ Data Bus
   ▼
┌─────┐
│ MDR │ = 'A' (0x41)
└──┬──┘
   │
   ▼
┌─────┐
│ R1  │ = 'A'
└─────┘
</pre>

<span class="text-lime-300 font-semibold">Timing Diagram:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Clock:     ──┐  ┌──┐  ┌──┐  ┌──┐
             └──┘  └──┘  └──┘  └──

T1:        ────┐        ┌────
               └────────┘
Address:   ────[ 0x10  ]──────
           ────┐        ┌────
T2:            └────────┘
IORQ:      ────┐        ┌────
               └────────┘
RD:        ────┐        ┌────
               └────────┘
Data Bus:  ────[  0x41  ]────── ('A')
           ────┐        ┌────
T3:            └────────┘
MDR Load:  ────┐        ┌────
               └────────┘
</pre>

<span class="text-pink-300 font-semibold">Control Signals:</span>
• <span class="text-cyan-300">IORQ:</span> I/O Request (active)
• <span class="text-cyan-300">RD:</span> Read signal (active)
• <span class="text-cyan-300">Address Bus:</span> Contains I/O port address
• <span class="text-cyan-300">Data Bus:</span> Carries data from I/O device`,
    },
    {
      title: '5️⃣ I/O Write Cycle',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">I/O Write Cycle</span> writes data from a CPU register to an output device.

<span class="text-amber-300 font-semibold">Steps:</span>

1. <span class="text-cyan-300">I/O Address → Address Bus:</span> Place I/O port address on address bus
2. <span class="text-cyan-300">Data → MDR:</span> Place data to be written in MDR
3. <span class="text-cyan-300">I/O Write:</span> Send I/O write signal on control bus
4. <span class="text-cyan-300">Data → I/O Device:</span> Data from MDR written to I/O device

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
I/O Write Cycle Flow:
┌─────┐
│ R1  │ = 'B' (0x42) (data to write)
└──┬──┘
   │
   ▼
┌─────┐
│ MDR │ = 0x42
└──┬──┘
   │ Data Bus
   ▼
┌─────────┐
│ I/O     │
│ Device  │ ← 'B' (written to display)
└─────────┘
   ▲
   │ Address Bus
┌─────┐
│ MAR │ = 0x20 (I/O port address)
└─────┘
</pre>

<span class="text-lime-300 font-semibold">Timing Diagram:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Clock:     ──┐  ┌──┐  ┌──┐  ┌──┐
             └──┘  └──┘  └──┘  └──

T1:        ────┐        ┌────
               └────────┘
Address:   ────[ 0x20  ]──────
           ────┐        ┌────
T2:            └────────┘
MDR:       ────[  0x42  ]────── ('B')
           ────┐        ┌────
T3:            └────────┘
IORQ:      ────┐        ┌────
               └────────┘
WR:        ────┐        ┌────
               └────────┘
Data Bus:  ────[  0x42  ]──────
           ────┐        ┌────
T4:            └────────┘
Write Complete
</pre>

<span class="text-pink-300 font-semibold">Control Signals:</span>
• <span class="text-cyan-300">IORQ:</span> I/O Request (active)
• <span class="text-cyan-300">WR:</span> Write signal (active)
• <span class="text-cyan-300">Address Bus:</span> Contains I/O port address
• <span class="text-cyan-300">Data Bus:</span> Carries data to I/O device`,
    },
    {
      title: '6️⃣ Interrupt Cycle',
      icon: <FiSettings className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Interrupt Cycle</span> handles interrupt requests from I/O devices or other sources.

<span class="text-amber-300 font-semibold">Steps:</span>

1. <span class="text-cyan-300">Interrupt Request:</span> Device sends interrupt signal (INT)
2. <span class="text-cyan-300">Interrupt Acknowledge:</span> CPU acknowledges interrupt (INTA)
3. <span class="text-cyan-300">Save State:</span> Save PC and status flags to stack
4. <span class="text-cyan-300">Get Vector:</span> Read interrupt vector from device
5. <span class="text-cyan-300">Jump to ISR:</span> Load ISR address into PC

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Interrupt Cycle Flow:
┌─────────┐
│ I/O     │
│ Device  │ ──INT──> CPU
└─────────┘

CPU Response:
1. Complete current instruction
2. Save PC and Flags to stack
   ┌─────┐
   │ PC  │ ──> Stack
   │Flags│ ──> Stack
   └─────┘

3. Get interrupt vector
   ┌─────┐
   │Vector│ = ISR address
   └─────┘

4. Jump to Interrupt Service Routine (ISR)
   PC = ISR_address
</pre>

<span class="text-lime-300 font-semibold">Timing Diagram:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Clock:     ──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐
             └──┘  └──┘  └──┘  └──┘  └──

INT:       ───────────────┐  ┌────
                          └──┘
                          ────┐        ┌────
T1:                            └────────┘
Complete:  ────────────────────[Current Instruction]
           ────┐        ┌────
T2:            └────────┘
INTA:      ────┐        ┌────
               └────────┘
Save:      ────┐        ┌────
  PC ──> Stack
  Flags ─> Stack
           ────┐        ┌────
T3:            └────────┘
Vector:    ────[  ISR  ]──────
           ────┐        ┌────
T4:            └────────┘
Jump:      ────┐        ┌────
  PC = ISR_addr
               └────────┘
</pre>

<span class="text-pink-300 font-semibold">Interrupt Types:</span>
• <span class="text-cyan-300">Hardware Interrupt:</span> From I/O devices
• <span class="text-cyan-300">Software Interrupt:</span> From program (INT instruction)
• <span class="text-cyan-300">Exception:</span> From CPU (division by zero, etc.)

<span class="text-lime-300 font-semibold">Interrupt Handling:</span>
• <span class="text-cyan-300">Maskable:</span> Can be disabled (IF flag)
• <span class="text-cyan-300">Non-Maskable:</span> Cannot be disabled (NMI)
• <span class="text-cyan-300">Priority:</span> Higher priority interrupts can interrupt lower ones`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Classify</span> instructions into data transfer, arithmetic, logical, shift, branch, I/O, and stack categories
✓ <span class="text-cyan-300">Identify</span> and use different instruction types with examples
✓ <span class="text-cyan-300">Understand</span> the purpose and operation of each instruction category
✓ <span class="text-cyan-300">Explain</span> different machine cycles (fetch, memory read/write, I/O read/write, interrupt)
✓ <span class="text-cyan-300">Trace</span> the steps of each machine cycle
✓ <span class="text-cyan-300">Interpret</span> timing diagrams for machine cycles
✓ <span class="text-cyan-300">Understand</span> control signals used in each cycle
✓ <span class="text-cyan-300">Apply</span> knowledge of instruction sets and machine cycles to analyze program execution

This topic provides comprehensive understanding of how processors execute instructions and interact with memory and I/O devices.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Classify the following instructions into their categories: ADD R1, R2, R3; MOV R1, R2; JMP label; PUSH R1; AND R1, R2, R3.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">1. ADD R1, R2, R3</span>
• <span class="text-cyan-300">Category:</span> Arithmetic Instruction
• <span class="text-cyan-300">Operation:</span> Addition (R1 = R2 + R3)
• <span class="text-cyan-300">Updates:</span> Status flags (Zero, Carry, Overflow, Sign)

<span class="text-yellow-300">2. MOV R1, R2</span>
• <span class="text-cyan-300">Category:</span> Data Transfer Instruction
• <span class="text-cyan-300">Operation:</span> Copy data (R1 = R2)
• <span class="text-cyan-300">Note:</span> Does not modify data, only moves it

<span class="text-yellow-300">3. JMP label</span>
• <span class="text-cyan-300">Category:</span> Branch/Control Transfer Instruction
• <span class="text-cyan-300">Operation:</span> Unconditional jump to label
• <span class="text-cyan-300">Effect:</span> Changes Program Counter (PC)

<span class="text-yellow-300">4. PUSH R1</span>
• <span class="text-cyan-300">Category:</span> Stack Instruction
• <span class="text-cyan-300">Operation:</span> Push R1 onto stack
• <span class="text-cyan-300">Effect:</span> Decrements Stack Pointer (SP), stores R1

<span class="text-yellow-300">5. AND R1, R2, R3</span>
• <span class="text-cyan-300">Category:</span> Logical Instruction
• <span class="text-cyan-300">Operation:</span> Bitwise AND (R1 = R2 AND R3)
• <span class="text-cyan-300">Note:</span> Performs bitwise operation on each bit`,
    },
    {
      question: 'Explain the fetch cycle step by step with timing information.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Fetch Cycle Steps:</span>

<span class="text-cyan-300">Step 1: PC → MAR (T1 State)</span>
• Copy Program Counter value to Memory Address Register
• Example: If PC = 1000, then MAR = 1000
• Address placed on address bus

<span class="text-cyan-300">Step 2: Memory Read (T2 State)</span>
• CPU sends memory request (MREQ) signal
• CPU sends read (RD) signal
• Memory unit places instruction at address MAR on data bus
• Example: Memory[1000] = 0011 1100 appears on data bus

<span class="text-cyan-300">Step 3: MDR ← Data Bus (T2-T3 State)</span>
• Instruction on data bus is loaded into Memory Data Register
• Example: MDR = 0011 1100

<span class="text-cyan-300">Step 4: IR ← MDR (T3 State)</span>
• Instruction is transferred from MDR to Instruction Register
• Example: IR = 0011 1100
• Instruction is now ready for decoding

<span class="text-cyan-300">Step 5: PC = PC + 1 (T3-T4 State)</span>
• Increment Program Counter to point to next instruction
• Example: PC = 1000 + 1 = 1001
• Prepares for next instruction fetch

<span class="text-lime-300">Timing:</span>
• T1: Address setup
• T2: Memory access and data transfer
• T3: Register updates and PC increment
• Total: Typically 3-4 clock cycles`,
    },
    {
      question: 'What is the difference between memory read cycle and I/O read cycle?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Memory Read Cycle:</span>

<span class="text-cyan-300">Purpose:</span> Read data from main memory

<span class="text-cyan-300">Control Signals:</span>
• MREQ (Memory Request) - active
• RD (Read) - active
• IORQ - not used

<span class="text-cyan-300">Address Space:</span>
• Uses memory address space
• Example: Address 0x0000 to 0xFFFF

<span class="text-cyan-300">Example:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
LOAD R1, [2000]
MREQ = 1, RD = 1, IORQ = 0
Address = 2000 (memory address)
</pre>

<span class="text-yellow-300">I/O Read Cycle:</span>

<span class="text-cyan-300">Purpose:</span> Read data from I/O device

<span class="text-cyan-300">Control Signals:</span>
• IORQ (I/O Request) - active
• RD (Read) - active
• MREQ - not used

<span class="text-cyan-300">Address Space:</span>
• Uses I/O address space (separate from memory)
• Example: Port addresses 0x00 to 0xFF

<span class="text-cyan-300">Example:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
IN R1, PORT1
IORQ = 1, RD = 1, MREQ = 0
Address = PORT1 (I/O port address)
</pre>

<span class="text-lime-300">Key Differences:</span>

<table class="w-full mt-2 border-collapse text-xs">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-2 py-1 text-left">Aspect</th>
<th class="border border-gray-600 px-2 py-1 text-left">Memory Read</th>
<th class="border border-gray-600 px-2 py-1 text-left">I/O Read</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Control Signal</td>
<td class="border border-gray-600 px-2 py-1">MREQ</td>
<td class="border border-gray-600 px-2 py-1">IORQ</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Address Space</td>
<td class="border border-gray-600 px-2 py-1">Memory</td>
<td class="border border-gray-600 px-2 py-1">I/O Ports</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Data Source</td>
<td class="border border-gray-600 px-2 py-1">RAM/ROM</td>
<td class="border border-gray-600 px-2 py-1">I/O Device</td>
</tr>
</tbody>
</table>`,
    },
    {
      question: 'Explain what happens during an interrupt cycle when an I/O device requests service.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Interrupt Cycle Process:</span>

<span class="text-cyan-300">Step 1: Interrupt Request (INT)</span>
• I/O device sends interrupt signal (INT) to CPU
• Signal indicates device needs service
• Example: Keyboard has data ready, printer needs more data

<span class="text-cyan-300">Step 2: CPU Response</span>
• CPU checks if interrupts are enabled (IF flag)
• If enabled, CPU completes current instruction
• CPU cannot be interrupted in middle of instruction

<span class="text-cyan-300">Step 3: Interrupt Acknowledge (INTA)</span>
• CPU sends interrupt acknowledge signal
• Indicates CPU is ready to handle interrupt
• Device can now provide interrupt vector

<span class="text-cyan-300">Step 4: Save Current State</span>
• Push Program Counter (PC) onto stack
• Push Status Flags onto stack
• Preserves current execution context
• Allows return to interrupted program

<span class="text-cyan-300">Step 5: Get Interrupt Vector</span>
• CPU reads interrupt vector from device
• Vector contains address of Interrupt Service Routine (ISR)
• Different devices have different vectors

<span class="text-cyan-300">Step 6: Jump to ISR</span>
• Load ISR address into Program Counter
• CPU begins executing interrupt service routine
• ISR handles the device request

<span class="text-cyan-300">Step 7: Return from Interrupt</span>
• ISR executes RETI (Return from Interrupt) instruction
• Pop flags from stack
• Pop PC from stack
• Resume execution of interrupted program

<span class="text-lime-300">Example Flow:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
1. Keyboard sends INT signal
2. CPU completes current instruction
3. CPU sends INTA
4. Save: PC → Stack, Flags → Stack
5. Get vector: ISR_address = 0x0040
6. Jump: PC = 0x0040
7. Execute ISR (read keyboard data)
8. RETI: Restore PC and Flags
9. Continue interrupted program
</pre>`,
    },
    {
      question: 'Compare arithmetic and logical instructions. Give examples of each.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Arithmetic Instructions:</span>

<span class="text-cyan-300">Purpose:</span> Perform mathematical operations on numeric values

<span class="text-cyan-300">Operations:</span> Addition, subtraction, multiplication, division

<span class="text-cyan-300">Examples:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
ADD  R1, R2, R3       ; R1 = R2 + R3 (arithmetic addition)
SUB  R1, R2, R3       ; R1 = R2 - R3 (arithmetic subtraction)
MUL  R1, R2, R3       ; R1 = R2 * R3 (arithmetic multiplication)
DIV  R1, R2, R3       ; R1 = R2 / R3 (arithmetic division)
</pre>

<span class="text-cyan-300">Flags Updated:</span> Zero, Carry, Overflow, Sign

<span class="text-cyan-300">Use:</span> Mathematical calculations, numeric processing

<span class="text-yellow-300">Logical Instructions:</span>

<span class="text-cyan-300">Purpose:</span> Perform bitwise operations on binary data

<span class="text-cyan-300">Operations:</span> AND, OR, XOR, NOT (bitwise)

<span class="text-cyan-300">Examples:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
AND  R1, R2, R3       ; R1 = R2 AND R3 (bitwise AND)
OR   R1, R2, R3       ; R1 = R2 OR R3 (bitwise OR)
XOR  R1, R2, R3       ; R1 = R2 XOR R3 (bitwise XOR)
NOT  R1, R2           ; R1 = NOT R2 (bitwise complement)
</pre>

<span class="text-cyan-300">Flags Updated:</span> Zero, Sign (sometimes)

<span class="text-cyan-300">Use:</span> Bit manipulation, masking, setting/clearing bits

<span class="text-lime-300">Comparison:</span>

<table class="w-full mt-2 border-collapse text-xs">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-2 py-1 text-left">Aspect</th>
<th class="border border-gray-600 px-2 py-1 text-left">Arithmetic</th>
<th class="border border-gray-600 px-2 py-1 text-left">Logical</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Operation</td>
<td class="border border-gray-600 px-2 py-1">Numeric (+, -, ×, ÷)</td>
<td class="border border-gray-600 px-2 py-1">Bitwise (AND, OR, XOR, NOT)</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Data Type</td>
<td class="border border-gray-600 px-2 py-1">Numbers</td>
<td class="border border-gray-600 px-2 py-1">Bits</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Carry Flag</td>
<td class="border border-gray-600 px-2 py-1">Yes (for add/sub)</td>
<td class="border border-gray-600 px-2 py-1">No</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Use Case</td>
<td class="border border-gray-600 px-2 py-1">Calculations</td>
<td class="border border-gray-600 px-2 py-1">Bit manipulation</td>
</tr>
</tbody>
</table>`,
    },
  ],
}

export default function InstructionSetMachineCyclePage() {
  return <DSDTopicPage content={content} />
}


