'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiCpu, FiDatabase, FiSettings } from 'react-icons/fi'

const content = {
  title: 'Microcomputer Architecture',
  explanationSections: [
    {
      title: '📖 Introduction to Microcomputer',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Microcomputer</span> is a complete computer system built around a microprocessor. It is a small, low-cost computer designed for individual use, containing all the essential components needed to perform computing tasks.

<span class="text-amber-300 font-semibold">Definition:</span>

A <span class="text-cyan-300">microcomputer</span> is a computer system that uses a microprocessor as its central processing unit (CPU). It integrates the CPU, memory, input/output interfaces, and system buses into a single unit capable of executing programs and processing data.

<span class="text-lime-300 font-semibold">Basic Components:</span>

• <span class="text-cyan-300">Central Processing Unit (CPU):</span> The brain of the computer that executes instructions
• <span class="text-cyan-300">Memory:</span> Stores programs and data (RAM for temporary storage, ROM for permanent storage)
• <span class="text-cyan-300">Input/Output (I/O) Modules:</span> Interface between the computer and external devices
• <span class="text-cyan-300">System Bus:</span> Communication pathway connecting all components
• <span class="text-cyan-300">Clock:</span> Synchronizes all operations within the system

<span class="text-pink-300 font-semibold">Characteristics:</span>

• Small size and low power consumption
• Cost-effective for individual users
• Capable of executing complex programs
• Used in personal computers, embedded systems, and microcontrollers`,
    },
    {
      title: '🏗️ Block Diagram of a Microcomputer',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Block Diagram</span> shows the interconnection of major components in a microcomputer system. All components communicate through the system bus.

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
┌─────────────────────────────────────────────────────────────┐
│                    MICROCOMPUTER SYSTEM                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────┐  │
│  │              │      │              │      │          │  │
│  │     CPU      │◄────►│    Memory    │◄────►│   I/O    │  │
│  │              │      │              │      │ Modules  │  │
│  │  ┌────────┐  │      │  ┌────────┐  │      │          │  │
│  │  │  ALU   │  │      │  │  RAM   │  │      │ Keyboard │  │
│  │  └────────┘  │      │  └────────┘  │      │ Display  │  │
│  │  ┌────────┐  │      │  ┌────────┐  │      │ Printer  │  │
│  │  │   CU   │  │      │  │  ROM   │  │      │   etc.   │  │
│  │  └────────┘  │      │  └────────┘  │      │          │  │
│  │  ┌────────┐  │      └──────────────┘      └──────────┘  │
│  │  │Registers│  │                                            │
│  │  └────────┘  │                                            │
│  └──────┬───────┘                                            │
│         │                                                     │
│         └────────────────────────────────────┐               │
│                                              │               │
│                    SYSTEM BUS                │               │
│         ┌──────────┬──────────┬──────────┐  │               │
│         │   Data   │ Address  │ Control  │  │               │
│         │   Bus    │   Bus    │   Bus    │  │               │
│         └──────────┴──────────┴──────────┘  │               │
│                                              │               │
└──────────────────────────────────────────────┴───────────────┘
</pre>

<span class="text-amber-300 font-semibold">Component Descriptions:</span>

<span class="text-cyan-300">1. CPU (Central Processing Unit):</span>
• Executes instructions stored in memory
• Performs arithmetic and logic operations
• Controls the operation of the entire system
• Contains ALU, Control Unit, and Registers

<span class="text-cyan-300">2. Memory:</span>
• <span class="text-yellow-300">RAM (Random Access Memory):</span> Volatile memory for storing programs and data during execution
• <span class="text-yellow-300">ROM (Read-Only Memory):</span> Non-volatile memory containing permanent programs (BIOS, bootloader)

<span class="text-cyan-300">3. I/O Modules:</span>
• Interface between CPU and external devices
• Handle data transfer between computer and peripherals
• Examples: Keyboard, Mouse, Display, Printer, Storage devices

<span class="text-cyan-300">4. System Bus:</span>
• Communication pathway connecting all components
• Consists of Data Bus, Address Bus, and Control Bus
• Enables data transfer and control signals`,
    },
    {
      title: '⚙️ CPU Architecture',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">CPU Architecture</span> defines the internal structure and organization of the Central Processing Unit. The CPU is the heart of the microcomputer, responsible for executing instructions and controlling system operations.

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
┌─────────────────────────────────────────────────────┐
│                  CPU INTERNAL STRUCTURE              │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────────────────────────────────────┐  │
│  │           CONTROL UNIT (CU)                  │  │
│  │  • Decodes instructions                       │  │
│  │  • Generates control signals                  │  │
│  │  • Coordinates all operations                 │  │
│  └──────────────────┬───────────────────────────┘  │
│                     │                                │
│  ┌──────────────────▼───────────────────────────┐  │
│  │      ARITHMETIC LOGIC UNIT (ALU)             │  │
│  │  • Performs arithmetic operations (+, -, ×) │  │
│  │  • Performs logic operations (AND, OR, NOT)  │  │
│  │  • Generates status flags                     │  │
│  └──────────────────┬───────────────────────────┘  │
│                     │                                │
│  ┌──────────────────▼───────────────────────────┐  │
│  │              REGISTERS                      │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │  │
│  │  │  PC  │ │  IR  │ │ MAR  │ │ MDR  │      │  │
│  │  └──────┘ └──────┘ └──────┘ └──────┘      │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │  │
│  │  │ ACC  │ │  R1  │ │  R2  │ │  R3  │      │  │
│  │  └──────┘ └──────┘ └──────┘ └──────┘      │  │
│  │  ┌──────────────────────────────────────┐  │  │
│  │  │      STATUS/FLAG REGISTER            │  │  │
│  │  │  [Z] [N] [C] [V] [P] [I] [D] [O]   │  │  │
│  │  └──────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
└───────────────────────────────────────────────────┘
</pre>

<span class="text-amber-300 font-semibold">CPU Components:</span>

<span class="text-cyan-300">1. ALU (Arithmetic Logic Unit):</span>
• Performs all arithmetic operations (addition, subtraction, multiplication, division)
• Performs logical operations (AND, OR, NOT, XOR)
• Compares values and generates comparison results
• Produces status flags (Zero, Carry, Overflow, Sign)

<span class="text-cyan-300">2. CU (Control Unit):</span>
• Fetches instructions from memory
• Decodes instructions to determine operation
• Generates control signals to coordinate all components
• Manages the instruction execution cycle
• Controls data flow between CPU components

<span class="text-cyan-300">3. Registers:</span>
• High-speed storage locations inside CPU
• Store data, addresses, and control information
• Much faster than main memory
• Different types serve specific purposes

<span class="text-lime-300 font-semibold">Register Descriptions:</span>

<table class="w-full mt-3 border-collapse">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Register</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Full Name</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Purpose</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Size</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-mono">PC</span></td>
<td class="border border-gray-600 px-3 py-2">Program Counter</td>
<td class="border border-gray-600 px-3 py-2">Holds address of next instruction to be executed</td>
<td class="border border-gray-600 px-3 py-2">16/32 bits</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-mono">IR</span></td>
<td class="border border-gray-600 px-3 py-2">Instruction Register</td>
<td class="border border-gray-600 px-3 py-2">Stores current instruction being executed</td>
<td class="border border-gray-600 px-3 py-2">16/32 bits</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-mono">MAR</span></td>
<td class="border border-gray-600 px-3 py-2">Memory Address Register</td>
<td class="border border-gray-600 px-3 py-2">Holds memory address for read/write operations</td>
<td class="border border-gray-600 px-3 py-2">16/32 bits</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-mono">MDR</span></td>
<td class="border border-gray-600 px-3 py-2">Memory Data Register</td>
<td class="border border-gray-600 px-3 py-2">Temporarily stores data being read from or written to memory</td>
<td class="border border-gray-600 px-3 py-2">8/16/32 bits</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-mono">ACC</span></td>
<td class="border border-gray-600 px-3 py-2">Accumulator</td>
<td class="border border-gray-600 px-3 py-2">Stores result of ALU operations; primary working register</td>
<td class="border border-gray-600 px-3 py-2">8/16/32 bits</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-mono">R1-Rn</span></td>
<td class="border border-gray-600 px-3 py-2">General-Purpose Registers</td>
<td class="border border-gray-600 px-3 py-2">Store operands, intermediate results, and addresses</td>
<td class="border border-gray-600 px-3 py-2">8/16/32 bits</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300 font-mono">FLAGS</span></td>
<td class="border border-gray-600 px-3 py-2">Status/Flag Register</td>
<td class="border border-gray-600 px-3 py-2">Stores condition codes (Zero, Carry, Overflow, Sign, Parity)</td>
<td class="border border-gray-600 px-3 py-2">8 bits</td>
</tr>
</tbody>
</table>

<span class="text-pink-300 font-semibold">Status/Flag Register Bits:</span>

• <span class="text-cyan-300">Z (Zero Flag):</span> Set to 1 if result of operation is zero
• <span class="text-cyan-300">N (Negative/Sign Flag):</span> Set to 1 if result is negative (MSB = 1)
• <span class="text-cyan-300">C (Carry Flag):</span> Set to 1 if operation produces a carry/borrow
• <span class="text-cyan-300">V (Overflow Flag):</span> Set to 1 if signed arithmetic overflow occurs
• <span class="text-cyan-300">P (Parity Flag):</span> Set to 1 if result has even number of 1s
• <span class="text-cyan-300">I (Interrupt Flag):</span> Controls interrupt enable/disable
• <span class="text-cyan-300">D (Direction Flag):</span> Controls string operation direction
• <span class="text-cyan-300">O (Overflow Flag):</span> Alternative overflow indication`,
    },
    {
      title: '🚌 Types of Buses',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">System Bus</span> is a communication pathway that connects all major components of a microcomputer. It consists of three types of buses, each serving a specific purpose.

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
                    SYSTEM BUS
    ┌─────────────────────────────────────┐
    │                                     │
    │  ┌──────────┐  ┌──────────┐       │
    │  │   DATA   │  │  ADDRESS │       │
    │  │   BUS    │  │   BUS    │       │
    │  └──────────┘  └──────────┘       │
    │                                     │
    │  ┌──────────┐                      │
    │  │ CONTROL  │                      │
    │  │   BUS    │                      │
    │  └──────────┘                      │
    │                                     │
    └─────────────────────────────────────┘
</pre>

<span class="text-amber-300 font-semibold">1. Data Bus:</span>

<span class="text-cyan-300">Purpose:</span> Transfers data between CPU, memory, and I/O devices

<span class="text-cyan-300">Characteristics:</span>
• <span class="text-yellow-300">Width:</span> Typically 8, 16, 32, or 64 bits
• <span class="text-yellow-300">Direction:</span> Bidirectional (can transfer data in both directions)
• <span class="text-yellow-300">Use:</span> Carries actual data being processed

<span class="text-lime-300">Examples:</span>
• 8-bit data bus: Can transfer 1 byte at a time
• 16-bit data bus: Can transfer 2 bytes at a time
• 32-bit data bus: Can transfer 4 bytes at a time

<span class="text-pink-300">Note:</span> Wider data bus = faster data transfer = better performance

<span class="text-amber-300 font-semibold">2. Address Bus:</span>

<span class="text-cyan-300">Purpose:</span> Carries memory addresses from CPU to memory and I/O devices

<span class="text-cyan-300">Characteristics:</span>
• <span class="text-yellow-300">Width:</span> Typically 16, 20, 24, or 32 bits
• <span class="text-yellow-300">Direction:</span> Unidirectional (CPU → Memory/I/O only)
• <span class="text-yellow-300">Use:</span> Specifies which memory location or I/O port to access

<span class="text-lime-300">Addressable Memory Calculation:</span>
• 16-bit address bus: 2¹⁶ = 65,536 locations (64 KB)
• 20-bit address bus: 2²⁰ = 1,048,576 locations (1 MB)
• 24-bit address bus: 2²⁴ = 16,777,216 locations (16 MB)
• 32-bit address bus: 2³² = 4,294,967,296 locations (4 GB)

<span class="text-pink-300">Note:</span> Wider address bus = more memory can be addressed

<span class="text-amber-300 font-semibold">3. Control Bus:</span>

<span class="text-cyan-300">Purpose:</span> Carries control signals that coordinate and synchronize operations

<span class="text-cyan-300">Characteristics:</span>
• <span class="text-yellow-300">Width:</span> Variable (multiple control lines)
• <span class="text-yellow-300">Direction:</span> Bidirectional (signals flow both ways)
• <span class="text-yellow-300">Use:</span> Carries timing and control information

<span class="text-lime-300">Common Control Signals:</span>
• <span class="text-cyan-300">Read (RD):</span> Indicates read operation from memory/I/O
• <span class="text-cyan-300">Write (WR):</span> Indicates write operation to memory/I/O
• <span class="text-cyan-300">Memory Request (MREQ):</span> Indicates memory access
• <span class="text-cyan-300">I/O Request (IORQ):</span> Indicates I/O access
• <span class="text-cyan-300">Clock (CLK):</span> Synchronization signal
• <span class="text-cyan-300">Reset (RESET):</span> System reset signal
• <span class="text-cyan-300">Interrupt Request (INT):</span> Interrupt signal
• <span class="text-cyan-300">Bus Request (BUSRQ):</span> Request for bus control
• <span class="text-cyan-300">Bus Acknowledge (BUSAK):</span> Acknowledgment of bus control

<span class="text-pink-300 font-semibold">Bus Comparison Table:</span>

<table class="w-full mt-3 border-collapse">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Bus Type</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Direction</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Typical Width</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Function</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Data Bus</span></td>
<td class="border border-gray-600 px-3 py-2">Bidirectional</td>
<td class="border border-gray-600 px-3 py-2">8, 16, 32, 64 bits</td>
<td class="border border-gray-600 px-3 py-2">Transfers data</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Address Bus</span></td>
<td class="border border-gray-600 px-3 py-2">Unidirectional</td>
<td class="border border-gray-600 px-3 py-2">16, 20, 24, 32 bits</td>
<td class="border border-gray-600 px-3 py-2">Carries addresses</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2"><span class="text-yellow-300">Control Bus</span></td>
<td class="border border-gray-600 px-3 py-2">Bidirectional</td>
<td class="border border-gray-600 px-3 py-2">Variable (multiple lines)</td>
<td class="border border-gray-600 px-3 py-2">Carries control signals</td>
</tr>
</tbody>
</table>`,
    },
    {
      title: '🔄 Instruction Cycle (Fetch–Decode–Execute)',
      icon: <FiSettings className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Instruction Cycle</span> is the fundamental process by which a CPU executes instructions. Every instruction goes through three main phases: Fetch, Decode, and Execute.

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
                    INSTRUCTION CYCLE
    ┌─────────────────────────────────────────┐
    │                                         │
    │         ┌──────────────────┐           │
    │         │   START / RESET  │           │
    │         └────────┬─────────┘           │
    │                  │                      │
    │                  ▼                      │
    │         ┌──────────────────┐           │
    │         │   FETCH PHASE     │           │
    │         │ 1. PC → MAR      │           │
    │         │ 2. Memory[MAR]    │           │
    │         │ 3. MDR → IR      │           │
    │         │ 4. PC = PC + 1   │           │
    │         └────────┬─────────┘           │
    │                  │                      │
    │                  ▼                      │
    │         ┌──────────────────┐           │
    │         │   DECODE PHASE    │           │
    │         │ 1. IR → CU       │           │
    │         │ 2. Decode opcode │           │
    │         │ 3. Identify      │           │
    │         │    operands      │           │
    │         └────────┬─────────┘           │
    │                  │                      │
    │                  ▼                      │
    │         ┌──────────────────┐           │
    │         │  EXECUTE PHASE   │           │
    │         │ 1. Perform       │           │
    │         │    operation     │           │
    │         │ 2. Update flags  │           │
    │         │ 3. Store result  │           │
    │         └────────┬─────────┘           │
    │                  │                      │
    │                  ▼                      │
    │         ┌──────────────────┐           │
    │         │  More           │           │
    │         │  Instructions?  │           │
    │         └────────┬─────────┘           │
    │                  │                      │
    │         ┌─────────┴─────────┐           │
    │         │ YES              │ NO        │
    │         │                  │           │
    │         ▼                  ▼           │
    │    (Continue)         (HALT/END)       │
    │                                         │
    └─────────────────────────────────────────┘
</pre>

<span class="text-amber-300 font-semibold">Phase 1: FETCH</span>

The CPU retrieves the instruction from memory.

<span class="text-cyan-300">Step-by-Step Process:</span>

1. <span class="text-yellow-300">PC → MAR:</span> Copy Program Counter value to Memory Address Register
2. <span class="text-yellow-300">Memory Read:</span> CPU sends read signal on control bus, memory places instruction on data bus
3. <span class="text-yellow-300">MDR ← Data Bus:</span> Instruction loaded into Memory Data Register
4. <span class="text-yellow-300">IR ← MDR:</span> Instruction transferred from MDR to Instruction Register
5. <span class="text-yellow-300">PC = PC + 1:</span> Increment Program Counter to point to next instruction

<span class="text-lime-300">Example:</span>
• PC = 1000 (address of instruction)
• Memory[1000] = 0011 1100 (instruction code)
• After fetch: IR = 0011 1100, PC = 1001

<span class="text-amber-300 font-semibold">Phase 2: DECODE</span>

The CPU interprets the instruction to determine what operation to perform.

<span class="text-cyan-300">Step-by-Step Process:</span>

1. <span class="text-yellow-300">IR → Control Unit:</span> Instruction Register content sent to Control Unit
2. <span class="text-yellow-300">Opcode Extraction:</span> Control Unit extracts opcode (operation code) from instruction
3. <span class="text-yellow-300">Operand Identification:</span> Control Unit identifies source and destination operands
4. <span class="text-yellow-300">Control Signal Generation:</span> Control Unit generates appropriate control signals

<span class="text-lime-300">Example:</span>
• Instruction: 0011 1100
• Opcode: 0011 (ADD operation)
• Operands: 1100 (register C and accumulator)

<span class="text-amber-300 font-semibold">Phase 3: EXECUTE</span>

The CPU performs the actual operation specified by the instruction.

<span class="text-cyan-300">Step-by-Step Process:</span>

1. <span class="text-yellow-300">Operand Fetch:</span> If needed, fetch operands from memory or registers
2. <span class="text-yellow-300">Operation Execution:</span> ALU performs the operation (ADD, SUB, AND, etc.)
3. <span class="text-yellow-300">Flag Update:</span> Update status flags based on result (Zero, Carry, Overflow, etc.)
4. <span class="text-yellow-300">Result Storage:</span> Store result in destination (register or memory)

<span class="text-lime-300">Example (ADD Instruction):</span>
• Fetch operands: ACC = 5, Register C = 3
• ALU performs: 5 + 3 = 8
• Update flags: Clear Zero flag, Clear Carry flag
• Store result: ACC = 8

<span class="text-pink-300 font-semibold">Complete Example: ADD Instruction</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-xs text-gray-100 font-mono">
Instruction: ADD A, B  (Add contents of register B to accumulator A)

FETCH:
  PC = 2000 → MAR
  Memory[2000] = "ADD A, B" → MDR → IR
  PC = PC + 1 = 2001

DECODE:
  Opcode = "ADD" → Control Unit
  Source operand = Register B
  Destination = Accumulator A
  Generate control signals for ALU

EXECUTE:
  Fetch: A = 10, B = 5
  ALU: 10 + 5 = 15
  Update flags: Z=0 (not zero), C=0 (no carry)
  Store: A = 15
</pre>

<span class="text-amber-300 font-semibold">Timing Diagram:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-xs text-gray-100 font-mono">
Clock:  ──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐
          └──┘  └──┘  └──┘  └──┘  └──┘  └──┘  └──┘  └──

FETCH:   ────[PC→MAR]──[Read]──[MDR→IR]──[PC++]────
DECODE:  ───────────────────[Decode]────────────────
EXECUTE: ────────────────────────[Operate]────────────
</pre>

<span class="text-lime-300 font-semibold">Key Points:</span>

• Each instruction cycle consists of Fetch, Decode, and Execute phases
• Fetch phase is common to all instructions
• Decode phase determines what operation to perform
• Execute phase varies based on instruction type
• Multiple clock cycles may be needed for complex instructions
• Pipeline processors can overlap phases of different instructions for better performance`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Define</span> microcomputer and identify its basic components
✓ <span class="text-cyan-300">Understand</span> the block diagram of a microcomputer system
✓ <span class="text-cyan-300">Explain</span> the architecture and components of CPU (ALU, CU, Registers)
✓ <span class="text-cyan-300">Identify</span> and describe the function of each CPU register (PC, IR, MAR, MDR, ACC, general-purpose registers)
✓ <span class="text-cyan-300">Understand</span> the purpose and characteristics of different types of buses (Data, Address, Control)
✓ <span class="text-cyan-300">Calculate</span> addressable memory based on address bus width
✓ <span class="text-cyan-300">Trace</span> the instruction cycle (Fetch–Decode–Execute) step by step
✓ <span class="text-cyan-300">Analyze</span> how instructions are processed in a microcomputer

This topic provides the foundation for understanding how computers execute programs and process data at the hardware level.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'What are the three main types of buses in a microcomputer system? Explain the purpose and direction of each.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

The three main types of buses are:

<span class="text-yellow-300">1. Data Bus:</span>
• <span class="text-cyan-300">Purpose:</span> Transfers data between CPU, memory, and I/O devices
• <span class="text-cyan-300">Direction:</span> Bidirectional (data can flow both ways)
• <span class="text-cyan-300">Width:</span> Typically 8, 16, 32, or 64 bits

<span class="text-yellow-300">2. Address Bus:</span>
• <span class="text-cyan-300">Purpose:</span> Carries memory addresses from CPU to memory and I/O devices
• <span class="text-cyan-300">Direction:</span> Unidirectional (CPU → Memory/I/O only)
• <span class="text-cyan-300">Width:</span> Typically 16, 20, 24, or 32 bits
• <span class="text-cyan-300">Note:</span> Determines maximum addressable memory (2^width)

<span class="text-yellow-300">3. Control Bus:</span>
• <span class="text-cyan-300">Purpose:</span> Carries control signals that coordinate operations
• <span class="text-cyan-300">Direction:</span> Bidirectional (signals flow both ways)
• <span class="text-cyan-300">Signals:</span> Read, Write, Memory Request, I/O Request, Clock, Reset, Interrupt, etc.`,
    },
    {
      question: 'Explain the function of the following CPU registers: PC, IR, MAR, MDR, and ACC.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">PC (Program Counter):</span>
• Holds the address of the next instruction to be executed
• Automatically incremented after each instruction fetch
• Essential for sequential program execution

<span class="text-yellow-300">IR (Instruction Register):</span>
• Stores the current instruction being executed
• Holds the instruction fetched from memory
• Provides input to the Control Unit for decoding

<span class="text-yellow-300">MAR (Memory Address Register):</span>
• Holds the memory address for read/write operations
• Connected to the address bus
• Specifies which memory location to access

<span class="text-yellow-300">MDR (Memory Data Register):</span>
• Temporarily stores data being read from or written to memory
• Acts as buffer between CPU and memory
• Connected to the data bus

<span class="text-yellow-300">ACC (Accumulator):</span>
• Primary working register for arithmetic and logic operations
• Stores one operand and receives the result of ALU operations
• Most frequently used register in many CPU architectures`,
    },
    {
      question: 'Trace through the Fetch phase of the instruction cycle step by step.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

The Fetch phase retrieves an instruction from memory. Here are the steps:

<span class="text-yellow-300">Step 1:</span> PC → MAR
• Copy the value in Program Counter to Memory Address Register
• Example: If PC = 1000, then MAR = 1000

<span class="text-yellow-300">Step 2:</span> Memory Read Operation
• CPU sends read signal on control bus
• Memory unit places the instruction at address MAR onto the data bus
• Example: Memory[1000] = 0011 1100 appears on data bus

<span class="text-yellow-300">Step 3:</span> MDR ← Data Bus
• Instruction on data bus is loaded into Memory Data Register
• Example: MDR = 0011 1100

<span class="text-yellow-300">Step 4:</span> IR ← MDR
• Instruction is transferred from MDR to Instruction Register
• Example: IR = 0011 1100

<span class="text-yellow-300">Step 5:</span> PC = PC + 1
• Increment Program Counter to point to next instruction
• Example: PC = 1000 + 1 = 1001

After these steps, the instruction is ready for the Decode phase.`,
    },
    {
      question: 'If a microcomputer has a 20-bit address bus, what is the maximum addressable memory?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

To calculate maximum addressable memory:

<span class="text-yellow-300">Formula:</span> Maximum Memory = 2^(address bus width)

<span class="text-yellow-300">Given:</span> Address bus width = 20 bits

<span class="text-yellow-300">Calculation:</span>
Maximum Memory = 2²⁰
              = 1,048,576 locations

<span class="text-yellow-300">In different units:</span>
• 1,048,576 bytes = 1,024 KB = 1 MB

<span class="text-cyan-300">Therefore:</span> A 20-bit address bus can address up to 1 MB of memory.

<span class="text-lime-300">Note:</span> Each memory location typically stores 1 byte (8 bits) of data.`,
    },
    {
      question: 'What is the difference between RAM and ROM in a microcomputer system?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">RAM (Random Access Memory):</span>
• <span class="text-cyan-300">Type:</span> Volatile memory (loses data when power is off)
• <span class="text-cyan-300">Access:</span> Both read and write operations
• <span class="text-cyan-300">Purpose:</span> Stores programs and data during execution
• <span class="text-cyan-300">Speed:</span> Fast access time
• <span class="text-cyan-300">Use:</span> Temporary storage, working memory

<span class="text-yellow-300">ROM (Read-Only Memory):</span>
• <span class="text-cyan-300">Type:</span> Non-volatile memory (retains data when power is off)
• <span class="text-cyan-300">Access:</span> Read-only operations (data written during manufacturing)
• <span class="text-cyan-300">Purpose:</span> Stores permanent programs (BIOS, bootloader, firmware)
• <span class="text-cyan-300">Speed:</span> Generally slower than RAM
• <span class="text-cyan-300">Use:</span> Permanent storage of critical system programs

<span class="text-lime-300">Key Difference:</span> RAM is volatile and writable, while ROM is non-volatile and read-only.`,
    },
  ],
}

export default function MicrocomputerArchitecturePage() {
  return <DSDTopicPage content={content} />
}


