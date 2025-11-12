'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'PLA & PAL',
  explanationSections: [
    {
      title: '🧠 PLA (Programmable Logic Array)',
      icon: <FiBook className="w-6 h-6" />,
      content: `PLA has <span class="text-blue-400 font-semibold">both AND and OR arrays programmable</span>, providing maximum flexibility in implementing logic functions.

<span class="text-amber-300 font-semibold">Structure:</span>
• <span class="text-cyan-300">Programmable AND array:</span> Generates product terms (not all minterms)
  - Can create any product term needed
  - Limited number of product terms available
  - More efficient than PROM
• <span class="text-cyan-300">Programmable OR array:</span> Selects which product terms to sum
  - Each output can sum any combination of product terms
  - Product terms can be shared across multiple outputs
• <span class="text-cyan-300">Fixed number:</span> Limited product terms (typically 8-16 for small PLAs)

<span class="text-lime-300 font-semibold">PLA Architecture:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
Inputs (n) → [Programmable AND Array] → Product Terms → [Programmable OR Array] → Outputs
                    (Fuses)              (Limited)            (Fuses)
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• <span class="text-cyan-300">Maximum flexibility:</span> Both arrays programmable
• <span class="text-cyan-300">Efficient:</span> Only generates needed product terms
• <span class="text-cyan-300">Product term sharing:</span> Same product term can be used by multiple outputs
• <span class="text-cyan-300">Can implement both SOP and POS:</span> Very versatile
• <span class="text-cyan-300">Better resource utilization:</span> No wasted minterms

<span class="text-amber-300 font-semibold">Limitations:</span>
• <span class="text-cyan-300">More complex programming:</span> Both arrays need to be programmed
• <span class="text-cyan-300">Slower:</span> Programmable OR array adds delay
• <span class="text-cyan-300">Limited product terms:</span> May not fit complex functions
• <span class="text-cyan-300">Higher cost:</span> More complex than PAL`,
    },
    {
      title: '⚙️ PAL (Programmable Array Logic)',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `PAL has <span class="text-blue-400 font-semibold">programmable AND array and fixed OR array</span>, providing a good balance between flexibility and speed.

<span class="text-amber-300 font-semibold">Structure:</span>
• <span class="text-cyan-300">Programmable AND array:</span> Generates product terms
  - Can create any product term needed
  - Limited number of product terms per output
• <span class="text-cyan-300">Fixed OR array:</span> Each output has fixed OR connections
  - Each output can OR a fixed set of product terms
  - Cannot share product terms across outputs
  - Simpler and faster than programmable OR
• <span class="text-cyan-300">Output structure:</span> May include flip-flops for sequential logic
  - Registered outputs available
  - Can implement sequential circuits

<span class="text-lime-300 font-semibold">PAL Architecture:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
Inputs (n) → [Programmable AND Array] → Product Terms → [Fixed OR Array] → Outputs
                    (Fuses)              (Per output)         (Fixed)
</pre>

<span class="text-pink-300 font-semibold">Advantages:</span>
• <span class="text-cyan-300">Faster:</span> Fixed OR array is faster than programmable OR
• <span class="text-cyan-300">Simpler:</span> Easier to program than PLA
• <span class="text-cyan-300">Good for SOP:</span> Ideal for standard SOP implementations
• <span class="text-cyan-300">Sequential logic:</span> Can include flip-flops
• <span class="text-cyan-300">Lower cost:</span> Simpler structure than PLA

<span class="text-amber-300 font-semibold">Limitations:</span>
• <span class="text-cyan-300">Less flexible:</span> Fixed OR structure limits function complexity per output
• <span class="text-cyan-300">No product term sharing:</span> Cannot share product terms across outputs
• <span class="text-cyan-300">Fixed structure:</span> May waste product terms if structure doesn't match function`,
    },
    {
      title: '📊 PLA vs PAL Comparison',
      icon: <FiTarget className="w-6 h-6" />,
      content: `Understanding the key differences between PLA and PAL helps in selecting the appropriate device.

<span class="text-amber-300 font-semibold">Flexibility:</span>
• <span class="text-cyan-300">PLA:</span> Both arrays programmable - maximum flexibility
• <span class="text-cyan-300">PAL:</span> Only AND array programmable - less flexible

<span class="text-lime-300 font-semibold">Speed:</span>
• <span class="text-cyan-300">PLA:</span> Slower (programmable OR array adds delay)
• <span class="text-cyan-300">PAL:</span> Faster (fixed OR array)

<span class="text-pink-300 font-semibold">Complexity:</span>
• <span class="text-cyan-300">PLA:</span> More complex programming (both arrays)
• <span class="text-cyan-300">PAL:</span> Simpler programming (only AND array)

<span class="text-cyan-300 font-semibold">Product Term Sharing:</span>
• <span class="text-cyan-300">PLA:</span> Can share product terms across outputs
• <span class="text-cyan-300">PAL:</span> Cannot share (fixed OR per output)

<span class="text-amber-300 font-semibold">Use Cases:</span>
• <span class="text-cyan-300">PLA:</span> Complex functions, both SOP and POS, product term sharing needed
• <span class="text-cyan-300">PAL:</span> Standard SOP implementations, speed-critical, simpler designs

<span class="text-lime-300 font-semibold">Cost:</span>
• <span class="text-cyan-300">PLA:</span> Higher cost (more complex)
• <span class="text-cyan-300">PAL:</span> Lower cost (simpler structure)`,
    },
    {
      title: '🧩 Programming and Implementation',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `Both PLA and PAL are programmed using fuse technology or other programmable methods.

<span class="text-amber-300 font-semibold">Programming Process:</span>
1. <span class="text-cyan-300">Design function:</span> Write Boolean expression in SOP form
2. <span class="text-cyan-300">Minimize:</span> Use K-map or other methods to minimize
3. <span class="text-cyan-300">Map to device:</span> Assign product terms to AND array
4. <span class="text-cyan-300">Program fuses:</span> Blow fuses to create connections
5. <span class="text-cyan-300">Verify:</span> Test the programmed device

<span class="text-lime-300 font-semibold">Example: Implementing F = A'B + AB' using PAL</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
Step 1: Identify product terms
  - P1 = A'B
  - P2 = AB'

Step 2: Program AND array
  - Create P1 and P2

Step 3: Connect to fixed OR
  - Output F = P1 + P2 (if PAL has 2+ product terms per output)
</pre>

<span class="text-pink-300 font-semibold">Output Options:</span>
• <span class="text-cyan-300">Combinational:</span> Direct output from OR array
• <span class="text-cyan-300">Registered:</span> Output through flip-flop (for sequential logic)
• <span class="text-cyan-300">Programmable polarity:</span> Inverted or non-inverted output

<span class="text-cyan-300">Modern PLDs:</span> Often use EEPROM or flash technology instead of fuses, allowing reprogramming.`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Understand</span> the architecture of PLA and PAL
✓ <span class="text-cyan-300">Distinguish</span> between programmable and fixed arrays
✓ <span class="text-cyan-300">Compare</span> PLA and PAL in terms of flexibility, speed, and complexity
✓ <span class="text-cyan-300">Select</span> appropriate device (PLA or PAL) for given applications
✓ <span class="text-cyan-300">Design</span> functions using PLA and PAL
✓ <span class="text-cyan-300">Understand</span> product term sharing and its implications
✓ <span class="text-cyan-300">Program</span> PLA and PAL to implement Boolean functions
✓ <span class="text-cyan-300">Analyze</span> trade-offs between flexibility and speed

PLA and PAL are important PLDs that offer different trade-offs for digital circuit implementation.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'What is the key structural difference between PLA and PAL?',
      solution: 'The key difference is in the programmability of the OR array:\n\nPLA (Programmable Logic Array):\n- AND array: Programmable\n- OR array: Programmable\n- Maximum flexibility\n\nPAL (Programmable Array Logic):\n- AND array: Programmable\n- OR array: Fixed\n- Faster but less flexible\n\nThis structural difference affects:\n- Flexibility of function implementation\n- Speed of operation\n- Programming complexity\n- Cost',
    },
    {
      question: 'When would you choose PLA over PAL?',
      solution: 'Choose PLA when:\n\n1. Function requires complex OR combinations\n2. Need to share product terms across multiple outputs\n3. Implementing both SOP and POS forms\n4. Maximum flexibility is needed\n5. Speed is not critical\n\nChoose PAL when:\n\n1. Standard SOP implementation is sufficient\n2. Speed is critical (fixed OR is faster)\n3. Simpler programming is preferred\n4. Cost is a concern (PAL is typically cheaper)\n5. Function fits within fixed OR structure',
    },
    {
      question: 'How does the fixed OR array in PAL limit its functionality?',
      solution: 'The fixed OR array in PAL limits functionality in several ways:\n\n1. Fixed Connections:\n   - Each output can only OR a fixed set of product terms\n   - Cannot share product terms flexibly across outputs\n\n2. Limited Complexity:\n   - Complex functions requiring many product terms per output may not fit\n   - Cannot dynamically allocate product terms\n\n3. Less Efficient:\n   - May waste product terms if fixed OR structure doesn\'t match function\n   - Cannot optimize product term sharing\n\n4. Single Output Structure:\n   - Each output has its own fixed OR connections\n   - Cannot easily combine outputs\n\nHowever, the fixed structure makes PAL faster and simpler to program.',
    },
  ],
}

export default function PLAPALPage() {
  return <DSDTopicPage content={content} />
}
