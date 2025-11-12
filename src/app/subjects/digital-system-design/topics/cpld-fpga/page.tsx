'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'CPLD & FPGA',
  explanationSections: [
    {
      title: '🧠 CPLD (Complex Programmable Logic Device)',
      icon: <FiBook className="w-6 h-6" />,
      content: `CPLD is a <span class="text-blue-400 font-semibold">collection of PAL-like blocks</span> connected via programmable interconnect. It provides higher density than simple PLDs.

<span class="text-amber-300 font-semibold">Architecture:</span>
• <span class="text-cyan-300">Logic Blocks:</span> Multiple PAL-like blocks (macrocells)
  - Each block contains AND array, OR array, and flip-flops
  - Typically 16-64 macrocells per block
  - Coarse-grained structure
• <span class="text-cyan-300">Interconnect:</span> Programmable routing between blocks
  - Global routing matrix
  - Predictable timing
  - Fixed routing delays
• <span class="text-cyan-300">I/O Blocks:</span> Programmable input/output pins
  - Can be configured as input, output, or bidirectional
  - Various I/O standards supported
• <span class="text-cyan-300">Global Routing:</span> Predictable timing characteristics

<span class="text-lime-300 font-semibold">CPLD Structure:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
[Logic Block 1] ←→ [Global Interconnect] ←→ [Logic Block 2]
     ↓                      ↓                      ↓
[I/O Block]          [I/O Block]            [I/O Block]
</pre>

<span class="text-pink-300 font-semibold">Characteristics:</span>
• <span class="text-cyan-300">Non-volatile configuration:</span> Retains program when powered off (flash/EEPROM)
• <span class="text-cyan-300">Predictable timing:</span> Fixed routing delays
• <span class="text-cyan-300">Lower density:</span> Thousands of gates (typically 1K-10K)
• <span class="text-cyan-300">Fast power-up:</span> No configuration loading needed
• <span class="text-cyan-300">Good for control logic:</span> Address decoding, glue logic

<span class="text-cyan-300">Use Cases:</span>
• Control logic
• Address decoding
• Glue logic
• State machines
• Interface logic`,
    },
    {
      title: '⚙️ FPGA (Field-Programmable Gate Array)',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `FPGA is a <span class="text-blue-400 font-semibold">high-density programmable device</span> with fine-grained architecture. It provides the highest flexibility and density among PLDs.

<span class="text-amber-300 font-semibold">Architecture:</span>
• <span class="text-cyan-300">Logic Blocks (CLBs/LUTs):</span> Small configurable blocks
  - Typically 4-6 input Look-Up Tables (LUTs)
  - Each block contains LUT, flip-flop, and multiplexers
  - Fine-grained structure
  - Thousands to millions of blocks
• <span class="text-cyan-300">Interconnect:</span> Extensive programmable routing
  - Hierarchical routing (local, intermediate, global)
  - Variable routing delays
  - Complex routing structure
• <span class="text-cyan-300">I/O Blocks:</span> High-speed I/O with various standards
  - LVTTL, LVCMOS, PCI, DDR, etc.
  - Programmable drive strength, slew rate
• <span class="text-cyan-300">Memory Blocks:</span> Embedded RAM blocks
  - Block RAM (BRAM)
  - Distributed RAM
  - FIFO support
• <span class="text-cyan-300">DSP Blocks:</span> Hardware multipliers and adders
  - Fast arithmetic operations
  - Signal processing applications

<span class="text-lime-300 font-semibold">FPGA Structure:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
[CLB] [CLB] [CLB] ←→ [Programmable Interconnect] ←→ [CLB] [CLB] [CLB]
  ↓      ↓      ↓                                      ↓      ↓      ↓
[I/O]  [I/O]  [I/O]                                  [I/O]  [I/O]  [I/O]
  ↓      ↓      ↓                                      ↓      ↓      ↓
[BRAM] [DSP] [BRAM]                                  [BRAM] [DSP] [BRAM]
</pre>

<span class="text-pink-300 font-semibold">Characteristics:</span>
• <span class="text-cyan-300">Volatile configuration:</span> Must be loaded on power-up (SRAM-based)
• <span class="text-cyan-300">Very high density:</span> Millions of gates (1M-10M+)
• <span class="text-cyan-300">Variable timing:</span> Depends on routing
• <span class="text-cyan-300">Complex routing:</span> Requires sophisticated tools
• <span class="text-cyan-300">Good for data processing:</span> Complex systems, DSP, parallel processing

<span class="text-cyan-300">Use Cases:</span>
• Complex digital systems
• Digital signal processing (DSP)
• Prototyping before ASIC
• ASIC replacement
• High-performance computing
• Image/video processing`,
    },
    {
      title: '📊 CPLD vs FPGA Comparison',
      icon: <FiTarget className="w-6 h-6" />,
      content: `Understanding the differences between CPLD and FPGA helps in selecting the appropriate device.

<span class="text-amber-300 font-semibold">Density:</span>
• <span class="text-cyan-300">CPLD:</span> Lower density (thousands of gates: 1K-10K)
• <span class="text-cyan-300">FPGA:</span> Higher density (millions of gates: 1M-10M+)

<span class="text-lime-300 font-semibold">Architecture:</span>
• <span class="text-cyan-300">CPLD:</span> Coarse-grained (PAL-like blocks/macrocells)
• <span class="text-cyan-300">FPGA:</span> Fine-grained (small CLBs/LUTs)

<span class="text-pink-300 font-semibold">Timing:</span>
• <span class="text-cyan-300">CPLD:</span> Predictable, fixed routing delays
• <span class="text-cyan-300">FPGA:</span> Variable, depends on routing

<span class="text-cyan-300 font-semibold">Configuration:</span>
• <span class="text-cyan-300">CPLD:</span> Non-volatile (flash/EEPROM) - retains program when powered off
• <span class="text-cyan-300">FPGA:</span> Volatile (SRAM) - must be loaded from external memory on power-up

<span class="text-amber-300 font-semibold">Power-up:</span>
• <span class="text-cyan-300">CPLD:</span> Fast (no configuration loading)
• <span class="text-cyan-300">FPGA:</span> Slower (must load configuration)

<span class="text-lime-300 font-semibold">Use Cases:</span>
• <span class="text-cyan-300">CPLD:</span> Control logic, address decoding, glue logic, simple state machines
• <span class="text-cyan-300">FPGA:</span> Complex systems, DSP, data processing, prototyping, ASIC replacement

<span class="text-pink-300 font-semibold">Cost:</span>
• <span class="text-cyan-300">CPLD:</span> Lower cost for simple applications
• <span class="text-cyan-300">FPGA:</span> Higher cost but more capable`,
    },
    {
      title: '🧩 Configuration and Programming',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `CPLD and FPGA use different configuration technologies and methods.

<span class="text-amber-300 font-semibold">CPLD Configuration:</span>
• <span class="text-cyan-300">Technology:</span> Flash or EEPROM (non-volatile)
• <span class="text-cyan-300">Storage:</span> Configuration stored in device
• <span class="text-cyan-300">Power-up:</span> Instant (no loading needed)
• <span class="text-cyan-300">Reprogramming:</span> Can be reprogrammed (flash-based)
• <span class="text-cyan-300">External memory:</span> Not needed

<span class="text-lime-300 font-semibold">FPGA Configuration:</span>
• <span class="text-cyan-300">Technology:</span> SRAM (volatile)
• <span class="text-cyan-300">Storage:</span> Configuration lost when powered off
• <span class="text-cyan-300">Power-up:</span> Must load from external memory
• <span class="text-cyan-300">External memory:</span> Required (flash, PROM, or processor)
• <span class="text-cyan-300">Configuration modes:</span>
  - Master Serial: FPGA reads from serial PROM
  - Slave Serial: External controller programs FPGA
  - JTAG: Boundary scan interface

<span class="text-pink-300 font-semibold">Design Flow:</span>
1. <span class="text-cyan-300">Design Entry:</span> HDL (VHDL/Verilog) or schematic
2. <span class="text-cyan-300">Synthesis:</span> Convert to netlist
3. <span class="text-cyan-300">Place & Route:</span> Map to device resources
4. <span class="text-cyan-300">Timing Analysis:</span> Verify timing constraints
5. <span class="text-cyan-300">Bitstream Generation:</span> Create configuration file
6. <span class="text-cyan-300">Programming:</span> Load into device

<span class="text-cyan-300">Modern Tools:</span> Xilinx Vivado, Intel Quartus, Lattice Diamond, etc.`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Understand</span> the architecture of CPLD and FPGA
✓ <span class="text-cyan-300">Distinguish</span> between coarse-grained and fine-grained architectures
✓ <span class="text-cyan-300">Compare</span> CPLD and FPGA in terms of density, speed, and applications
✓ <span class="text-cyan-300">Understand</span> volatile vs non-volatile configuration
✓ <span class="text-cyan-300">Select</span> appropriate device (CPLD or FPGA) for given applications
✓ <span class="text-cyan-300">Understand</span> the design flow for programmable devices
✓ <span class="text-cyan-300">Recognize</span> the role of embedded memory and DSP blocks in FPGAs
✓ <span class="text-cyan-300">Analyze</span> timing characteristics and routing complexity

CPLD and FPGA are essential for modern digital system design, offering flexibility and high performance.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'What is the main architectural difference between CPLD and FPGA?',
      solution: 'The main architectural difference is granularity:\n\nCPLD (Coarse-grained):\n- Uses large PAL-like blocks (macrocells)\n- Each block contains multiple product terms and flip-flops\n- Blocks are connected via programmable interconnect\n- Similar to multiple PALs on one chip\n\nFPGA (Fine-grained):\n- Uses small configurable logic blocks (CLBs/LUTs)\n- Each block is typically a 4-6 input LUT with a flip-flop\n- Many small blocks connected via extensive routing\n- More flexible but more complex routing\n\nThis difference affects density, speed, and application suitability.',
    },
    {
      question: 'Why does FPGA need external configuration memory while CPLD doesn\'t?',
      solution: 'This is due to the configuration technology:\n\nCPLD:\n- Uses non-volatile memory (flash or EEPROM)\n- Configuration is stored permanently\n- Retains program when power is removed\n- No external memory needed\n\nFPGA:\n- Uses volatile SRAM for configuration\n- Configuration is lost when power is removed\n- Must be loaded from external memory on power-up\n- Typically uses external flash or PROM\n\nNon-volatile FPGA options exist but are less common and more expensive.',
    },
    {
      question: 'When would you choose CPLD over FPGA for a design?',
      solution: 'Choose CPLD when:\n\n1. Simple to medium complexity logic\n2. Predictable timing is critical\n3. Non-volatile configuration needed\n4. Lower power consumption required\n5. Cost-sensitive applications\n6. Control logic, address decoding, or glue logic\n7. Fast power-up time needed\n8. Lower density is sufficient\n\nChoose FPGA when:\n\n1. High complexity designs\n2. Need maximum density\n3. Data processing or DSP applications\n4. Prototyping before ASIC\n5. Need embedded memory or multipliers\n6. Can tolerate variable timing\n7. Configuration can be loaded at startup',
    },
  ],
}

export default function CPLDFPGAPage() {
  return <DSDTopicPage content={content} />
}
