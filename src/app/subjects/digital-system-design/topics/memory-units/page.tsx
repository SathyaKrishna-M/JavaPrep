'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiDatabase, FiGrid } from 'react-icons/fi'

const content = {
    title: 'Memory Units',
    explanationSections: [
        {
            title: '💾 Memory Organization',
            icon: <FiDatabase className="w-6 h-6" />,
            content: `Memory is a collection of storage cells together with associated circuits needed to transfer information in and out of storage.
      
      <span class="text-amber-300 font-semibold">Key Concepts:</span>
      • <span class="text-cyan-300">Word:</span> The basic unit of data access (e.g., 8-bit, 16-bit, 32-bit).
      • <span class="text-cyan-300">Address:</span> A unique identifier for a memory location.
      • <span class="text-cyan-300">Capacity:</span> Total bits = Number of Words × Word Size.`,
            mermaid: `graph TD
    CPU[CPU] <--> Bus[System Bus]
    Bus <--> RAM[RAM]
    Bus <--> ROM[ROM]
    Bus <--> IO[I/O Interface]
    
    subgraph "Memory Unit"
    RAM
    ROM
    end`,
        },
        {
            title: 'RAM vs ROM',
            icon: <FiGrid className="w-6 h-6" />,
            content: `<table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-700 text-cyan-300">
            <th class="p-2">Feature</th>
            <th class="p-2">RAM (Random Access Memory)</th>
            <th class="p-2">ROM (Read Only Memory)</th>
          </tr>
        </thead>
        <tbody class="text-gray-300">
          <tr class="border-b border-gray-800">
            <td class="p-2">Volatility</td>
            <td class="p-2">Volatile (loses data on power off)</td>
            <td class="p-2">Non-volatile</td>
          </tr>
          <tr class="border-b border-gray-800">
            <td class="p-2">Operation</td>
            <td class="p-2">Read and Write</td>
            <td class="p-2">Read Only (mostly)</td>
          </tr>
          <tr>
            <td class="p-2">Types</td>
            <td class="p-2">SRAM, DRAM</td>
            <td class="p-2">PROM, EPROM, EEPROM</td>
          </tr>
        </tbody>
      </table>`,
        },
        {
            title: 'Memory Decoding',
            content: `Memory decoding is the process of selecting a specific memory chip or location based on the address bits.
      
      • <span class="text-cyan-300">Address Bus:</span> Carries the address.
      • <span class="text-cyan-300">Decoder:</span> Decodes the higher-order address bits to generate Chip Select (CS) signals.`,
            mermaid: `graph LR
    Addr[Address Bus] --> Decoder[2-to-4 Decoder]
    Decoder --CS0--> RAM1[RAM Module 1]
    Decoder --CS1--> RAM2[RAM Module 2]
    Decoder --CS2--> RAM3[RAM Module 3]
    Decoder --CS3--> RAM4[RAM Module 4]`,
        },
    ],
    practiceQuestions: [
        {
            question: 'Calculate the number of address lines required for a 4KB memory.',
            solution: '4KB = 4 × 1024 bytes = 4096 bytes.\n\n4096 = 2^12.\n\nTherefore, 12 address lines are required to address 4096 locations.',
        },
    ],
}

export default function MemoryUnitsPage() {
    return <DSDTopicPage content={content} />
}
