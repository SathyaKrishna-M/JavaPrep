'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'PLD & PROM',
  explanationSections: [
    {
      title: '🧠 Programmable Logic Devices (PLD)',
      icon: <FiBook className="w-6 h-6" />,
      content: `PLDs are <span class="text-blue-400 font-semibold">integrated circuits</span> that can be programmed to implement custom logic functions. They bridge the gap between fixed-function ICs and full custom chips.

<span class="text-amber-300 font-semibold">Characteristics:</span>
• <span class="text-cyan-300">Programmable:</span> Logic can be configured after manufacturing
• <span class="text-cyan-300">Reusable:</span> Can be reprogrammed (in some types like FPGA)
• <span class="text-cyan-300">Cost-effective:</span> For medium-volume production
• <span class="text-cyan-300">Flexible:</span> Can implement various logic functions
• <span class="text-cyan-300">Time-saving:</span> Faster than full custom design

<span class="text-lime-300 font-semibold">Types of PLDs:</span>
1. <span class="text-cyan-300">PROM</span> (Programmable Read-Only Memory)
2. <span class="text-cyan-300">PLA</span> (Programmable Logic Array)
3. <span class="text-cyan-300">PAL</span> (Programmable Array Logic)
4. <span class="text-cyan-300">CPLD</span> (Complex Programmable Logic Device)
5. <span class="text-cyan-300">FPGA</span> (Field-Programmable Gate Array)

<span class="text-pink-300 font-semibold">PLD Structure:</span>
PLDs typically consist of:
• <span class="text-cyan-300">AND array:</span> Generates product terms
• <span class="text-cyan-300">OR array:</span> Sums product terms
• <span class="text-cyan-300">Output logic:</span> May include flip-flops for sequential logic

<span class="text-cyan-300">Programming Technology:</span>
• <span class="text-cyan-300">Fuse-based:</span> One-time programmable (blow fuses)
• <span class="text-cyan-300">EPROM/EEPROM:</span> Erasable and reprogrammable
• <span class="text-cyan-300">SRAM-based:</span> Volatile, needs configuration on power-up`,
    },
    {
      title: '⚙️ PROM (Programmable Read-Only Memory)',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `PROM is a <span class="text-blue-400 font-semibold">one-time programmable</span> PLD with fixed AND array and programmable OR array.

<span class="text-amber-300 font-semibold">Structure:</span>
• <span class="text-cyan-300">Fixed AND array:</span> Generates all possible minterms (acts as decoder)
  - For n inputs, generates 2<sup>n</sup> minterms
  - Cannot be programmed
• <span class="text-cyan-300">Programmable OR array:</span> Selects which minterms to sum for each output
  - Fuses can be blown to connect/disconnect minterms
  - Once programmed, cannot be changed

<span class="text-lime-300 font-semibold">PROM Architecture:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
Inputs (n) → [Fixed AND Array] → 2^n Minterms → [Programmable OR Array] → Outputs
                    (Decoder)                          (Fuses)
</pre>

<span class="text-pink-300 font-semibold">Programming Process:</span>
1. Design the function in SOP canonical form
2. Identify which minterms make function = 1
3. Blow fuses to connect those minterms to output
4. Blow fuses to disconnect unused minterms

<span class="text-cyan-300">Example:</span> Implementing F = A'B + AB'
• Minterms: m<sub>1</sub> (A'B'C), m<sub>2</sub> (A'BC'), m<sub>4</sub> (AB'C'), m<sub>5</sub> (AB'C)
• Connect m<sub>1</sub>, m<sub>2</sub>, m<sub>4</sub>, m<sub>5</sub> to output F

<span class="text-amber-300 font-semibold">Advantages:</span>
• Simple structure
• All minterms available
• Good for implementing SOP functions
• Easy to program

<span class="text-amber-300 font-semibold">Limitations:</span>
• One-time programmable (cannot be changed)
• Fixed AND array may be inefficient (generates all minterms even if few are needed)
• Larger chip area for functions with few minterms
• Higher power consumption`,
    },
    {
      title: '📊 PROM Applications',
      icon: <FiTarget className="w-6 h-6" />,
      content: `PROMs are used for various applications in digital design computer orientation architecture.

<span class="text-amber-300 font-semibold">Function Implementation:</span>
• Implementing Boolean functions in SOP canonical form
• When all minterms might be needed
• Simple implementation preferred

<span class="text-lime-300 font-semibold">Code Conversion:</span>
• <span class="text-cyan-300">BCD to 7-segment:</span> Convert BCD code to 7-segment display code
• <span class="text-cyan-300">Binary to Gray code:</span> Convert binary to Gray code
• <span class="text-cyan-300">ASCII conversion:</span> Character encoding

<span class="text-pink-300 font-semibold">Lookup Tables:</span>
• Mathematical functions (sine, cosine, logarithm)
• Character generation (font ROM)
• Pattern matching
• Data transformation

<span class="text-cyan-300 font-semibold">Memory Applications:</span>
• Storing fixed data patterns
• Boot code storage
• Configuration data
• Microcode storage

<span class="text-amber-300 font-semibold">When to Use PROM:</span>
• Function is known and won't change
• All minterms might be needed
• Simple implementation is preferred
• One-time programming is acceptable
• Cost-effective for fixed functions`,
    },
    {
      title: '🧩 PROM vs Other PLDs',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `Understanding when PROM is suitable compared to other PLDs.

<span class="text-amber-300 font-semibold">PROM Characteristics:</span>
• Fixed AND array (decoder) - generates all minterms
• Programmable OR array
• One-time programmable
• Simple structure

<span class="text-lime-300 font-semibold">Comparison with PLA:</span>
• <span class="text-cyan-300">PLA:</span> Both arrays programmable - more flexible, only generates needed product terms
• <span class="text-cyan-300">PROM:</span> Fixed AND array - less flexible but simpler

<span class="text-lime-300 font-semibold">Comparison with PAL:</span>
• <span class="text-cyan-300">PAL:</span> Programmable AND, fixed OR - faster, less flexible
• <span class="text-cyan-300">PROM:</span> Fixed AND, programmable OR - all minterms available

<span class="text-pink-300 font-semibold">Efficiency Consideration:</span>
PROM is inefficient for functions with few minterms:
• Example: Function uses only 2 minterms out of 16 (for 4 inputs)
• PROM generates all 16 minterms
• 14 minterms are wasted
• Leads to larger chip area, higher power, higher cost

<span class="text-cyan-300">Better Alternatives:</span>
• Use PLA for functions with few minterms
• Use PAL for standard SOP implementations
• Use PROM when all minterms might be needed`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Understand</span> the concept and structure of Programmable Logic Devices
✓ <span class="text-cyan-300">Explain</span> the architecture of PROM (fixed AND, programmable OR)
✓ <span class="text-cyan-300">Design</span> functions using PROM
✓ <span class="text-cyan-300">Program</span> PROM to implement Boolean functions
✓ <span class="text-cyan-300">Apply</span> PROM in code conversion, lookup tables, and function implementation
✓ <span class="text-cyan-300">Analyze</span> the efficiency of PROM for different types of functions
✓ <span class="text-cyan-300">Compare</span> PROM with other PLDs (PLA, PAL)
✓ <span class="text-cyan-300">Identify</span> when PROM is the appropriate choice

Understanding PLDs is essential for modern digital design computer orientation architecture.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'What is the difference between the AND array and OR array in a PROM?',
      solution: 'AND Array (Fixed):\n- Generates all possible minterms from input variables\n- Acts like a decoder\n- For n inputs, generates 2^n minterms\n- Cannot be programmed\n\nOR Array (Programmable):\n- Selects which minterms to sum for each output\n- Can be programmed by blowing fuses\n- Implements the sum part of SOP form\n- Each output can be any sum of minterms\n\nTogether, they implement any function in SOP canonical form.',
    },
    {
      question: 'Why is PROM inefficient for functions with few minterms?',
      solution: 'PROM generates ALL 2^n minterms, even if the function uses only a few.\n\nExample: For a 4-input function that uses only 2 minterms:\n- PROM generates all 16 minterms\n- Only 2 are actually used\n- 14 minterms are wasted\n\nThis leads to:\n- Larger chip area\n- Higher power consumption\n- Slower operation\n- Higher cost\n\nPLA and PAL are more efficient as they have programmable AND arrays that generate only needed product terms.',
    },
    {
      question: 'How would you implement the function F = A\'B + AB\' using a PROM?',
      solution: 'Step 1: Express in canonical SOP form\nF = A\'B + AB\'\n\nStep 2: Identify minterms\nA\'B = A\'B(C\'+C) = A\'BC\' + A\'BC = m2 + m3 (assuming 3 variables)\nAB\' = AB\'(C\'+C) = AB\'C\' + AB\'C = m4 + m5\n\nFor 2 variables: F = m1 + m2\n\nStep 3: Program PROM\n- AND array generates: m0, m1, m2, m3\n- OR array connects m1 and m2 to output F\n- Blow fuses to disconnect m0 and m3\n\nResult: F = m1 + m2 = A\'B + AB\'',
    },
  ],
}

export default function PLDPROMPage() {
  return <DSDTopicPage content={content} />
}
