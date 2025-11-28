'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiCpu, FiDatabase, FiSettings, FiArrowRight } from 'react-icons/fi'

const content = {
  title: 'Subroutine Call and Return Mechanism',
  explanationSections: [
    {
      title: '📖 What is a Subroutine',
      icon: <FiBook className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Subroutine</span> (also called function, procedure, or method) is a reusable block of code that performs a specific task. It can be called from multiple places in a program.

<span class="text-amber-300 font-semibold">Definition:</span>

A <span class="text-cyan-300">subroutine</span> is a sequence of program instructions that:
• Performs a specific, well-defined task
• Can be called (invoked) from other parts of the program
• Returns control to the calling program after execution
• Can accept parameters (arguments) as input
• Can return values as output

<span class="text-lime-300 font-semibold">Benefits of Subroutines:</span>

• <span class="text-cyan-300">Code Reusability:</span> Write once, use many times
• <span class="text-cyan-300">Modularity:</span> Break complex programs into manageable pieces
• <span class="text-cyan-300">Maintainability:</span> Easier to update and debug
• <span class="text-cyan-300">Abstraction:</span> Hide implementation details
• <span class="text-cyan-300">Code Organization:</span> Better program structure

<span class="text-pink-300 font-semibold">Subroutine Structure:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
subroutine_name:
    ; Save registers (if needed)
    ; Subroutine body
    ; Process parameters
    ; Perform task
    ; Return result (if any)
    ; Restore registers
    RET  ; Return to caller
</pre>

<span class="text-lime-300 font-semibold">Example:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
; Main program
MOV  R1, #10
MOV  R2, #20
CALL add_numbers    ; Call subroutine
; Result in R3

; Subroutine
add_numbers:
    ADD  R3, R1, R2  ; R3 = R1 + R2
    RET              ; Return to caller
</pre>`,
    },
    {
      title: '📞 Call Mechanism',
      icon: <FiCpu className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Call Mechanism</span> is the process of transferring control from the calling program to a subroutine. It involves several important steps to ensure proper execution and return.

<span class="text-amber-300 font-semibold">Call Mechanism Steps:</span>

When a subroutine is called, the following steps occur:

<span class="text-cyan-300">1. Save Return Address</span>
• Current Program Counter (PC) value is saved
• This is the address of the instruction after CALL
• Allows subroutine to return to correct location

<span class="text-cyan-300">2. Save Registers</span>
• Save registers that will be modified by subroutine
• Prevents loss of caller's data
• Can be done by caller (caller-save) or callee (callee-save)

<span class="text-cyan-300">3. Pass Parameters</span>
• Transfer input data to subroutine
• Can use registers, stack, or memory
• Parameters must be accessible to subroutine

<span class="text-cyan-300">4. Transfer Control</span>
• Jump to subroutine starting address
• Update Program Counter (PC) to subroutine address
• Begin executing subroutine code

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Call Mechanism Flow:
┌─────────────────────────────────────┐
│      CALLING PROGRAM                │
│                                     │
│  Instruction N                     │
│  CALL subroutine    ←────┐         │
│  Instruction N+1    │     │         │
│  Instruction N+2    │     │         │
└─────────────────────┼─────┘         │
                      │               │
                      │ 1. Save PC    │
                      │    (N+1)      │
                      │               │
                      │ 2. Save       │
                      │    Registers  │
                      │               │
                      │ 3. Pass       │
                      │    Parameters │
                      │               │
                      │ 4. Jump to    │
                      │    Subroutine │
                      ▼               │
┌─────────────────────────────────────┐
│      SUBROUTINE                     │
│                                     │
│  subroutine:                        │
│    ; Subroutine code                │
│    RET  ←──────────────────────────┘
└─────────────────────────────────────┘
</pre>

<span class="text-lime-300 font-semibold">Detailed Steps:</span>

<span class="text-yellow-300">Step 1: Save Return Address</span>
• PC contains address of instruction after CALL
• Push PC onto stack
• This address will be used by RET instruction

<span class="text-yellow-300">Step 2: Save Registers</span>
• Push registers that contain important data
• Prevents subroutine from overwriting caller's data
• Common practice: Save all registers or only those used

<span class="text-yellow-300">Step 3: Pass Parameters</span>
• Transfer arguments to subroutine
• Methods: Registers, Stack, Memory locations
• Subroutine must know where to find parameters

<span class="text-yellow-300">Step 4: Transfer Control</span>
• Load subroutine address into PC
• CPU begins executing subroutine instructions
• Caller's execution is suspended`,
    },
    {
      title: '💾 Saving Registers',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Saving Registers</span> preserves the caller's register values so they can be restored after the subroutine returns.

<span class="text-amber-300 font-semibold">Why Save Registers?</span>

• Subroutine may modify registers
• Caller's data must be preserved
• Ensures correct program execution after return
• Prevents data corruption

<span class="text-lime-300 font-semibold">Saving Methods:</span>

<span class="text-cyan-300">1. Caller-Save Convention:</span>
• Caller saves registers before CALL
• Caller restores registers after return
• Subroutine can freely use registers

<span class="text-cyan-300">2. Callee-Save Convention:</span>
• Subroutine saves registers it will use
• Subroutine restores registers before return
• Caller's registers are always preserved

<span class="text-pink-300 font-semibold">Example - Caller-Save:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
; Caller saves registers
PUSH R1
PUSH R2
PUSH R3
CALL subroutine
POP  R3
POP  R2
POP  R1
</pre>

<span class="text-pink-300 font-semibold">Example - Callee-Save:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
subroutine:
    PUSH R1    ; Save registers subroutine will use
    PUSH R2
    ; Subroutine code (can modify R1, R2)
    POP  R2    ; Restore before return
    POP  R1
    RET
</pre>

<span class="text-lime-300 font-semibold">Register Saving Strategy:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Convention</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Who Saves</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Advantages</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Disadvantages</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2">Caller-Save</td>
<td class="border border-gray-600 px-3 py-2">Caller</td>
<td class="border border-gray-600 px-3 py-2">Subroutine is simpler, faster for leaf functions</td>
<td class="border border-gray-600 px-3 py-2">Caller must know which registers to save</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2">Callee-Save</td>
<td class="border border-gray-600 px-3 py-2">Subroutine</td>
<td class="border border-gray-600 px-3 py-2">Caller doesn't need to worry about registers</td>
<td class="border border-gray-600 px-3 py-2">Subroutine overhead, slower for leaf functions</td>
</tr>
</tbody>
</table>`,
    },
    {
      title: '📤 Passing Parameters',
      icon: <FiArrowRight className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Passing Parameters</span> transfers input data from the caller to the subroutine.

<span class="text-amber-300 font-semibold">Parameter Passing Methods:</span>

<span class="text-cyan-300">1. Register Passing:</span>
• Parameters passed in CPU registers
• Fast and efficient
• Limited by number of registers

<span class="text-cyan-300">2. Stack Passing:</span>
• Parameters pushed onto stack
• Flexible, can pass many parameters
• Slightly slower than registers

<span class="text-cyan-300">3. Memory Passing:</span>
• Parameters stored in memory locations
• Can pass large data structures
• Slower due to memory access

<span class="text-lime-300 font-semibold">Register Passing Example:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
; Caller
MOV  R1, #10      ; Parameter 1
MOV  R2, #20      ; Parameter 2
CALL add_numbers  ; Call subroutine
; Result in R3

; Subroutine
add_numbers:
    ADD  R3, R1, R2  ; Use parameters from R1, R2
    RET              ; Return result in R3
</pre>

<span class="text-lime-300 font-semibold">Stack Passing Example:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
; Caller
PUSH #20         ; Push parameter 2
PUSH #10         ; Push parameter 1
CALL add_numbers ; Call subroutine
; Stack cleaned up by caller or callee

; Subroutine
add_numbers:
    POP  R1      ; Pop parameter 1
    POP  R2      ; Pop parameter 2
    ADD  R3, R1, R2
    RET
</pre>

<span class="text-pink-300 font-semibold">Parameter Passing Comparison:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Method</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Speed</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Flexibility</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Use Case</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2">Register</td>
<td class="border border-gray-600 px-3 py-2">Fastest</td>
<td class="border border-gray-600 px-3 py-2">Limited (4-8 params)</td>
<td class="border border-gray-600 px-3 py-2">Small number of parameters</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2">Stack</td>
<td class="border border-gray-600 px-3 py-2">Fast</td>
<td class="border border-gray-600 px-3 py-2">High (unlimited)</td>
<td class="border border-gray-600 px-3 py-2">Many parameters, recursive calls</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2">Memory</td>
<td class="border border-gray-600 px-3 py-2">Slower</td>
<td class="border border-gray-600 px-3 py-2">Very High</td>
<td class="border border-gray-600 px-3 py-2">Large data structures</td>
</tr>
</tbody>
</table>`,
    },
    {
      title: '📍 Saving Return Address',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Saving Return Address</span> is critical for the subroutine to know where to return after execution.

<span class="text-amber-300 font-semibold">Why Save Return Address?</span>

• Subroutine must return to instruction after CALL
• Program Counter (PC) will be changed to subroutine address
• Original PC value must be preserved
• RET instruction uses saved address to return

<span class="text-lime-300 font-semibold">How Return Address is Saved:</span>

<span class="text-cyan-300">Automatic Saving (CALL instruction):</span>
• CALL instruction automatically saves PC
• PC contains address of instruction after CALL
• Saved address pushed onto stack
• RET instruction automatically pops and uses it

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Return Address Saving:

Before CALL:
  PC = 1000
  Instruction at 1000: CALL subroutine
  Instruction at 1001: (next instruction - return point)

During CALL:
  1. PC = 1001 (points to return address)
  2. Push PC onto stack
     Stack: [1001]  ← Return address
  3. PC = subroutine_address
     PC = 2000 (subroutine starts here)

After RET:
  1. Pop return address from stack
     Stack: [] (empty)
  2. PC = 1001 (return to caller)
  3. Continue execution from 1001
</pre>

<span class="text-pink-300 font-semibold">Manual Return Address Saving:</span>

In some architectures, return address must be saved manually:

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
; Manual saving (if CALL doesn't auto-save)
PUSH PC          ; Save current PC
JMP  subroutine  ; Jump to subroutine

; In subroutine
subroutine:
    ; ... code ...
    POP  PC      ; Restore PC (return)
</pre>

<span class="text-lime-300 font-semibold">Return Address Stack:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Stack Growth (Multiple Calls):

Call 1:          Call 2:          Call 3:
┌─────┐          ┌─────┐          ┌─────┐
│ 1001│ ← SP    │ 2001│ ← SP    │ 3001│ ← SP
└─────┘          ├─────┤          ├─────┤
                 │ 1001│          │ 2001│
                 └─────┘          ├─────┤
                                  │ 1001│
                                  └─────┘

Each CALL pushes return address
Each RET pops return address
LIFO (Last In, First Out) order
</pre>`,
    },
    {
      title: '📚 Call Stack Explanation',
      icon: <FiDatabase className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Call Stack</span> is a stack data structure that stores information about active subroutine calls, including return addresses, saved registers, and local variables.

<span class="text-amber-300 font-semibold">What is a Call Stack?</span>

The <span class="text-cyan-300">call stack</span> (also called execution stack or runtime stack) is:
• A LIFO (Last In, First Out) data structure
• Used to manage subroutine calls and returns
• Stores activation records (stack frames)
• Managed by Stack Pointer (SP) register

<span class="text-lime-300 font-semibold">Stack Frame Contents:</span>

Each subroutine call creates a <span class="text-cyan-300">stack frame</span> containing:

1. <span class="text-yellow-300">Return Address:</span> Where to return after subroutine
2. <span class="text-yellow-300">Saved Registers:</span> Registers preserved by caller/callee
3. <span class="text-yellow-300">Parameters:</span> Input arguments to subroutine
4. <span class="text-yellow-300">Local Variables:</span> Variables used within subroutine
5. <span class="text-yellow-300">Frame Pointer:</span> Reference to current frame

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Stack Frame Structure:

High Address
┌─────────────────┐
│  Local Vars     │ ← Current SP
├─────────────────┤
│  Saved Regs     │
├─────────────────┤
│  Parameters     │
├─────────────────┤
│  Return Address │
├─────────────────┤
│  Previous FP    │ ← Frame Pointer (FP)
└─────────────────┘
Low Address
</pre>

<span class="text-pink-300 font-semibold">Stack Operations:</span>

<span class="text-cyan-300">Stack Growth:</span>
• Stack grows downward (toward lower addresses)
• PUSH decrements Stack Pointer (SP)
• POP increments Stack Pointer (SP)

<span class="text-cyan-300">Stack Pointer (SP):</span>
• Points to top of stack
• Automatically managed by PUSH/POP instructions
• Must be initialized at program start

<span class="text-lime-300 font-semibold">Example Stack Usage:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
; Initialize stack
MOV  SP, #0x1000    ; Set stack pointer

; Call subroutine
PUSH R1             ; Save register
PUSH R2             ; Save register
CALL func           ; Push return address
; Stack now contains: [R1, R2, return_addr]

; In subroutine
func:
    PUSH R3         ; Save another register
    ; ... code ...
    POP  R3         ; Restore register
    RET             ; Pop return address, return
</pre>`,
    },
    {
      title: '🔄 Return Mechanism',
      icon: <FiSettings className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Return Mechanism</span> transfers control back from the subroutine to the calling program and restores the execution environment.

<span class="text-amber-300 font-semibold">Return Mechanism Steps:</span>

When a subroutine executes RET (Return), the following steps occur:

<span class="text-cyan-300">1. Restore Registers</span>
• Pop saved registers from stack
• Restore caller's register values
• Ensures caller's data is intact

<span class="text-cyan-300">2. Restore Program Counter (PC)</span>
• Pop return address from stack
• Load return address into PC
• Transfer control back to caller

<span class="text-cyan-300">3. Clean Up Stack</span>
• Remove subroutine's stack frame
• Restore stack to pre-call state
• Stack Pointer (SP) returns to original value

<span class="text-cyan-300">4. Resume Execution</span>
• Continue execution from instruction after CALL
• Caller's program resumes normally

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Return Mechanism Flow:
┌─────────────────────────────────────┐
│      SUBROUTINE                      │
│                                     │
│  ; Subroutine code                   │
│  POP  R3    ←───┐                    │
│  POP  R2    ←───┤                    │
│  RET         │  │                    │
└──────────────┼──┼────────────────────┘
               │  │
               │  │ 1. Restore Registers
               │  │
               │  │ 2. Pop Return Address
               │  │
               │  │ 3. PC = Return Address
               │  │
               │  │ 4. Transfer Control
               │  │
               ▼  ▼
┌─────────────────────────────────────┐
│      CALLING PROGRAM                │
│                                     │
│  CALL subroutine                    │
│  Instruction N+1  ←─── Return here  │
│  Instruction N+2                    │
└─────────────────────────────────────┘
</pre>

<span class="text-lime-300 font-semibold">RET Instruction Operation:</span>

<span class="text-yellow-300">Automatic Return (RET):</span>
• Automatically pops return address from stack
• Loads address into PC
• Transfers control to caller

<span class="text-yellow-300">Manual Return:</span>
• Pop return address manually
• Load into PC
• Jump to that address`,
    },
    {
      title: '📊 Stack Diagrams',
      icon: <FiTarget className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Stack Diagrams</span> show the state of the stack at different points during subroutine call and return.

<span class="text-amber-300 font-semibold">1. Before CALL:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Stack State Before CALL:

High Address (0x1000)
┌─────────┐
│         │
│         │
│         │
│         │
│         │
│         │ ← SP (Stack Pointer)
└─────────┘
Low Address

Stack is empty or contains previous data.
SP points to top of stack (or bottom if empty).
</pre>

<span class="text-amber-300 font-semibold">2. During CALL (After Saving):</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Stack State During CALL:

High Address (0x1000)
┌─────────┐
│         │
│         │
│         │
│  Param2 │ ← Pushed by caller
├─────────┤
│  Param1 │ ← Pushed by caller
├─────────┤
│   R1    │ ← Saved register
├─────────┤
│   R2    │ ← Saved register
├─────────┤
│ 1001    │ ← Return address (pushed by CALL)
│         │    (address of instruction after CALL)
└─────────┘
Low Address
         ↑
        SP (Stack Pointer)

Stack contains:
1. Return address (1001)
2. Saved registers (R1, R2)
3. Parameters (Param1, Param2)
</pre>

<span class="text-amber-300 font-semibold">3. After RETURN:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Stack State After RETURN:

High Address (0x1000)
┌─────────┐
│         │
│         │
│         │
│         │
│         │
│         │ ← SP (Stack Pointer)
└─────────┘
Low Address

Stack is restored to pre-call state.
All items popped in reverse order:
1. Parameters popped
2. Registers restored
3. Return address used to return
4. SP back to original position
</pre>

<span class="text-lime-300 font-semibold">Complete Example - Stack Evolution:</span>

<pre class="bg-black/30 p-4 rounded-lg mt-3 text-sm text-gray-100 font-mono overflow-x-auto">
Program Execution:

1. Before CALL:
   Stack: [empty]
   SP = 0x1000

2. Caller saves registers:
   PUSH R1
   PUSH R2
   Stack: [R2, R1]
   SP = 0x0FFC

3. Caller passes parameters:
   PUSH #20
   PUSH #10
   Stack: [10, 20, R2, R1]
   SP = 0x0FF8

4. CALL subroutine:
   (CALL automatically pushes return address)
   Stack: [1001, 10, 20, R2, R1]
   SP = 0x0FF4
   PC = subroutine_address

5. Subroutine saves its registers:
   PUSH R3
   Stack: [R3, 1001, 10, 20, R2, R1]
   SP = 0x0FF0

6. Subroutine uses parameters:
   POP R1  ; Get parameter 1 (10)
   POP R2  ; Get parameter 2 (20)
   Stack: [R3, 1001, R2, R1]
   SP = 0x0FF8

7. Subroutine returns:
   POP R3  ; Restore register
   RET     ; Pop return address, return
   Stack: [R2, R1]
   SP = 0x0FFC
   PC = 1001

8. Caller restores registers:
   POP R2
   POP R1
   Stack: [empty]
   SP = 0x1000
</pre>`,
    },
    {
      title: '🔧 Instructions: CALL, RET, PUSH, POP',
      icon: <FiSettings className="w-6 h-6" />,
      content: `<span class="text-cyan-400 font-semibold text-lg">Subroutine Instructions</span> are the fundamental instructions used for calling and returning from subroutines.

<span class="text-amber-300 font-semibold">1. CALL Instruction</span>

<span class="text-cyan-300">Syntax:</span> <span class="font-mono">CALL address</span> or <span class="font-mono">CALL label</span>

<span class="text-cyan-300">Operation:</span>
• Push Program Counter (PC) onto stack
• Load subroutine address into PC
• Transfer control to subroutine

<span class="text-lime-300">Example:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
CALL add_numbers

; Equivalent to:
PUSH PC          ; Save return address
JMP  add_numbers ; Jump to subroutine
</pre>

<span class="text-pink-300">What CALL Does:</span>
1. SP = SP - 1 (or SP = SP - 2 for 16-bit address)
2. Stack[SP] = PC (save return address)
3. PC = subroutine_address (jump to subroutine)

<span class="text-amber-300 font-semibold">2. RET Instruction</span>

<span class="text-cyan-300">Syntax:</span> <span class="font-mono">RET</span> or <span class="font-mono">RETI</span> (Return from Interrupt)

<span class="text-cyan-300">Operation:</span>
• Pop return address from stack
• Load address into Program Counter (PC)
• Transfer control back to caller

<span class="text-lime-300">Example:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
subroutine:
    ; ... code ...
    RET  ; Return to caller

; Equivalent to:
POP  PC  ; Restore return address
; (Jump to that address)
</pre>

<span class="text-pink-300">What RET Does:</span>
1. PC = Stack[SP] (get return address)
2. SP = SP + 1 (or SP = SP + 2 for 16-bit address)
3. Continue execution from PC

<span class="text-amber-300 font-semibold">3. PUSH Instruction</span>

<span class="text-cyan-300">Syntax:</span> <span class="font-mono">PUSH source</span>

<span class="text-cyan-300">Operation:</span>
• Decrement Stack Pointer (SP)
• Store source value at stack location
• Used to save registers, pass parameters

<span class="text-lime-300">Example:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
PUSH R1        ; Push register R1
PUSH #25       ; Push immediate value 25
PUSH [1000]    ; Push memory value

; Operation:
; SP = SP - 1
; Stack[SP] = source
</pre>

<span class="text-pink-300">What PUSH Does:</span>
1. SP = SP - 1 (decrement stack pointer)
2. Stack[SP] = source (store value on stack)

<span class="text-amber-300 font-semibold">4. POP Instruction</span>

<span class="text-cyan-300">Syntax:</span> <span class="font-mono">POP destination</span>

<span class="text-cyan-300">Operation:</span>
• Load value from stack location
• Increment Stack Pointer (SP)
• Used to restore registers, get parameters

<span class="text-lime-300">Example:</span>

<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
POP  R1        ; Pop into register R1
POP  [1000]    ; Pop into memory location

; Operation:
; destination = Stack[SP]
; SP = SP + 1
</pre>

<span class="text-pink-300">What POP Does:</span>
1. destination = Stack[SP] (get value from stack)
2. SP = SP + 1 (increment stack pointer)

<span class="text-lime-300 font-semibold">Instruction Summary Table:</span>

<table class="w-full mt-3 border-collapse text-sm">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Instruction</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Operation</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Stack Change</th>
<th class="border border-gray-600 px-3 py-2 text-left text-cyan-300">Use</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">CALL</td>
<td class="border border-gray-600 px-3 py-2">Push PC, jump to address</td>
<td class="border border-gray-600 px-3 py-2">SP = SP - 1</td>
<td class="border border-gray-600 px-3 py-2">Call subroutine</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">RET</td>
<td class="border border-gray-600 px-3 py-2">Pop PC, return to caller</td>
<td class="border border-gray-600 px-3 py-2">SP = SP + 1</td>
<td class="border border-gray-600 px-3 py-2">Return from subroutine</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-3 py-2 font-mono">PUSH</td>
<td class="border border-gray-600 px-3 py-2">Decrement SP, store value</td>
<td class="border border-gray-600 px-3 py-2">SP = SP - 1</td>
<td class="border border-gray-600 px-3 py-2">Save data on stack</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-3 py-2 font-mono">POP</td>
<td class="border border-gray-600 px-3 py-2">Load value, increment SP</td>
<td class="border border-gray-600 px-3 py-2">SP = SP + 1</td>
<td class="border border-gray-600 px-3 py-2">Restore data from stack</td>
</tr>
</tbody>
</table>`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Define</span> subroutine and understand its purpose and benefits
✓ <span class="text-cyan-300">Explain</span> the call mechanism and its steps (saving registers, passing parameters, saving return address)
✓ <span class="text-cyan-300">Understand</span> the call stack and stack frame structure
✓ <span class="text-cyan-300">Trace</span> the return mechanism and register/PC restoration
✓ <span class="text-cyan-300">Draw</span> and interpret stack diagrams (before CALL, during CALL, after RETURN)
✓ <span class="text-cyan-300">Use</span> CALL, RET, PUSH, and POP instructions correctly
✓ <span class="text-cyan-300">Understand</span> caller-save vs callee-save conventions
✓ <span class="text-cyan-300">Compare</span> different parameter passing methods (register, stack, memory)
✓ <span class="text-cyan-300">Implement</span> subroutines with proper call and return sequences

This topic is essential for understanding how programs organize code into reusable modules and manage execution flow.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Explain the complete call mechanism step by step when a subroutine is called.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Call Mechanism Steps:</span>

<span class="text-cyan-300">Step 1: Save Registers (Optional but Recommended)</span>
• Caller saves registers that contain important data
• Prevents subroutine from overwriting caller's values
• Example: <span class="font-mono">PUSH R1, PUSH R2</span>

<span class="text-cyan-300">Step 2: Pass Parameters</span>
• Transfer input arguments to subroutine
• Can use registers, stack, or memory
• Example: <span class="font-mono">MOV R1, #10</span> or <span class="font-mono">PUSH #10</span>

<span class="text-cyan-300">Step 3: Save Return Address (Automatic)</span>
• CALL instruction automatically saves PC
• PC contains address of instruction after CALL
• Pushed onto stack
• Example: If CALL is at address 1000, return address 1001 is saved

<span class="text-cyan-300">Step 4: Transfer Control</span>
• CALL instruction loads subroutine address into PC
• CPU begins executing subroutine code
• Caller's execution is suspended

<span class="text-lime-300">Complete Example:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
; At address 1000
PUSH R1          ; Step 1: Save register
PUSH R2          ; Step 1: Save register
MOV  R1, #10     ; Step 2: Pass parameter 1
MOV  R2, #20     ; Step 2: Pass parameter 2
CALL add_nums    ; Step 3 & 4: Save return address (1005) and jump
; Address 1005 (return point)
POP  R2          ; Restore register
POP  R1          ; Restore register
</pre>`,
    },
    {
      question: 'Draw the stack state before CALL, during CALL, and after RETURN for a subroutine that takes 2 parameters.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">1. Before CALL:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
Stack:
┌─────────┐
│         │ ← SP
└─────────┘
(Empty or contains previous data)
</pre>

<span class="text-yellow-300">2. During CALL (after all setup):</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
Stack:
┌─────────┐
│  Param2 │ ← Pushed by caller
├─────────┤
│  Param1 │ ← Pushed by caller
├─────────┤
│   R1    │ ← Saved register
├─────────┤
│   R2    │ ← Saved register
├─────────┤
│ 1005    │ ← Return address (pushed by CALL)
└─────────┘
         ↑
        SP

Stack contains:
- Return address (1005)
- Saved registers (R1, R2)
- Parameters (Param1, Param2)
</pre>

<span class="text-yellow-300">3. After RETURN:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
Stack:
┌─────────┐
│         │ ← SP
└─────────┘
(Back to original state)

All items popped in reverse order:
1. Parameters popped (if not cleaned by caller)
2. Registers restored by caller
3. Return address used by RET
4. SP restored to original position
</pre>

<span class="text-lime-300">Note:</span> The exact stack state depends on whether the caller or callee cleans up parameters.`,
    },
    {
      question: 'What is the difference between CALL and JMP instructions?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">CALL Instruction:</span>

<span class="text-cyan-300">Operation:</span>
• Saves return address on stack
• Jumps to target address
• Allows return to calling location

<span class="text-cyan-300">Syntax:</span> <span class="font-mono">CALL address</span>

<span class="text-cyan-300">What it does:</span>
1. Push PC onto stack (save return address)
2. PC = target_address (jump)
3. Execute subroutine
4. RET instruction can return

<span class="text-cyan-300">Use:</span> Calling subroutines/functions

<span class="text-yellow-300">JMP Instruction:</span>

<span class="text-cyan-300">Operation:</span>
• Simply jumps to target address
• Does NOT save return address
• Cannot return to original location

<span class="text-cyan-300">Syntax:</span> <span class="font-mono">JMP address</span>

<span class="text-cyan-300">What it does:</span>
1. PC = target_address (jump)
2. Continue execution from new location
3. No way to automatically return

<span class="text-cyan-300">Use:</span> Unconditional branching, loops, goto

<span class="text-lime-300">Comparison:</span>

<table class="w-full mt-2 border-collapse text-xs">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-2 py-1 text-left">Aspect</th>
<th class="border border-gray-600 px-2 py-1 text-left">CALL</th>
<th class="border border-gray-600 px-2 py-1 text-left">JMP</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Return Address</td>
<td class="border border-gray-600 px-2 py-1">Saved on stack</td>
<td class="border border-gray-600 px-2 py-1">Not saved</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Stack Usage</td>
<td class="border border-gray-600 px-2 py-1">Uses stack</td>
<td class="border border-gray-600 px-2 py-1">No stack usage</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Return</td>
<td class="border border-gray-600 px-2 py-1">Can return with RET</td>
<td class="border border-gray-600 px-2 py-1">Must manually return</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Use Case</td>
<td class="border border-gray-600 px-2 py-1">Subroutine calls</td>
<td class="border border-gray-600 px-2 py-1">Branches, loops</td>
</tr>
</tbody>
</table>`,
    },
    {
      question: 'Explain the return mechanism. What happens when RET is executed?',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Return Mechanism Steps:</span>

<span class="text-cyan-300">Step 1: Restore Registers (if saved by callee)</span>
• Pop saved registers from stack
• Restore caller's register values
• Example: <span class="font-mono">POP R3, POP R2</span>

<span class="text-cyan-300">Step 2: Restore Program Counter</span>
• Pop return address from stack
• Load address into PC
• This is the address of instruction after CALL

<span class="text-cyan-300">Step 3: Transfer Control</span>
• CPU continues execution from restored PC
• Caller's program resumes
• Subroutine execution ends

<span class="text-lime-300">RET Instruction Operation:</span>

<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
RET instruction:
1. PC = Stack[SP]     ; Get return address from stack
2. SP = SP + 1        ; Increment stack pointer
3. Continue from PC    ; Jump to return address
</pre>

<span class="text-lime-300">Complete Example:</span>

<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
subroutine:
    PUSH R3        ; Save register (callee-save)
    ; ... code ...
    POP  R3        ; Step 1: Restore register
    RET            ; Step 2 & 3: Pop return address, return

; What RET does:
; 1. PC = Stack[SP]  (get return address, e.g., 1005)
; 2. SP = SP + 1     (remove return address from stack)
; 3. Continue from PC (jump to address 1005)
</pre>

<span class="text-pink-300">Important Points:</span>
• RET must be executed in the subroutine
• Return address must be on top of stack
• Stack must be properly balanced
• Registers should be restored before RET`,
    },
    {
      question: 'Compare register passing and stack passing for parameters. Give examples of each.',
      solution: `<span class="text-cyan-300 font-semibold">Answer:</span>

<span class="text-yellow-300">Register Passing:</span>

<span class="text-cyan-300">Method:</span> Parameters passed in CPU registers

<span class="text-cyan-300">Example:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
; Caller
MOV  R1, #10      ; Parameter 1 in R1
MOV  R2, #20      ; Parameter 2 in R2
CALL add_numbers  ; Call subroutine
; Result in R3

; Subroutine
add_numbers:
    ADD  R3, R1, R2  ; Use parameters from R1, R2
    RET              ; Return result in R3
</pre>

<span class="text-cyan-300">Advantages:</span>
• Fastest method (registers are in CPU)
• Simple and direct
• No stack manipulation needed

<span class="text-cyan-300">Disadvantages:</span>
• Limited by number of registers (typically 4-8 parameters)
• Registers may need to be saved/restored

<span class="text-yellow-300">Stack Passing:</span>

<span class="text-cyan-300">Method:</span> Parameters pushed onto stack

<span class="text-cyan-300">Example:</span>
<pre class="bg-black/30 p-2 rounded mt-2 text-xs font-mono">
; Caller
PUSH #20         ; Push parameter 2 (last parameter first)
PUSH #10         ; Push parameter 1
CALL add_numbers ; Call subroutine
ADD  SP, #2      ; Clean up stack (remove parameters)

; Subroutine
add_numbers:
    POP  R1      ; Pop parameter 1
    POP  R2      ; Pop parameter 2
    ADD  R3, R1, R2
    RET
</pre>

<span class="text-cyan-300">Advantages:</span>
• Can pass unlimited parameters
• Supports recursive calls
• Flexible and standard method

<span class="text-cyan-300">Disadvantages:</span>
• Slightly slower (stack access)
• Requires stack management
• Must clean up parameters

<span class="text-lime-300">Comparison:</span>

<table class="w-full mt-2 border-collapse text-xs">
<thead>
<tr class="bg-blue-600/30">
<th class="border border-gray-600 px-2 py-1 text-left">Aspect</th>
<th class="border border-gray-600 px-2 py-1 text-left">Register</th>
<th class="border border-gray-600 px-2 py-1 text-left">Stack</th>
</tr>
</thead>
<tbody>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Speed</td>
<td class="border border-gray-600 px-2 py-1">Fastest</td>
<td class="border border-gray-600 px-2 py-1">Fast</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Parameter Limit</td>
<td class="border border-gray-600 px-2 py-1">4-8 parameters</td>
<td class="border border-gray-600 px-2 py-1">Unlimited</td>
</tr>
<tr class="bg-gray-800/50">
<td class="border border-gray-600 px-2 py-1">Recursion</td>
<td class="border border-gray-600 px-2 py-1">Limited</td>
<td class="border border-gray-600 px-2 py-1">Full support</td>
</tr>
<tr class="bg-gray-800/30">
<td class="border border-gray-600 px-2 py-1">Complexity</td>
<td class="border border-gray-600 px-2 py-1">Simple</td>
<td class="border border-gray-600 px-2 py-1">Moderate</td>
</tr>
</tbody>
</table>`,
    },
  ],
}

export default function SubroutineCallReturnPage() {
  return <DSDTopicPage content={content} />
}


