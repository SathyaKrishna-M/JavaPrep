'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiLayers, FiDatabase } from 'react-icons/fi'

const content = {
    title: 'Memory Hierarchy & Cache',
    explanationSections: [
        {
            title: '🧠 Memory Hierarchy',
            icon: <FiLayers className="w-6 h-6" />,
            content: `The <span class="text-blue-400 font-semibold">Memory Hierarchy</span> organizes memory to minimize access time and maximize capacity.
      
      <span class="text-amber-300 font-semibold">Levels (Fastest to Slowest):</span>
      1. <span class="text-cyan-300">Registers:</span> Inside CPU, fastest, smallest.
      2. <span class="text-cyan-300">Cache (L1, L2, L3):</span> SRAM, very fast, small.
      3. <span class="text-cyan-300">Main Memory (RAM):</span> DRAM, fast, large.
      4. <span class="text-cyan-300">Secondary Storage:</span> SSD/HDD, slow, very large.`,
            mermaid: `graph TD
    Reg[Registers]
    L1[L1 Cache]
    L2[L2 Cache]
    RAM[Main Memory]
    Disk[Secondary Storage]
    
    Reg --> L1
    L1 --> L2
    L2 --> RAM
    RAM --> Disk
    
    style Reg fill:#ef4444
    style L1 fill:#f97316
    style L2 fill:#eab308
    style RAM fill:#22c55e
    style Disk fill:#3b82f6`,
        },
        {
            title: 'Cache Mapping Techniques',
            icon: <FiDatabase className="w-6 h-6" />,
            content: `Cache mapping determines how a block from main memory is placed in the cache.
      
      <span class="text-lime-300 font-semibold">1. Direct Mapping:</span>
      • Each block maps to exactly one cache line.
      • Simple but high conflict miss rate.
      
      <span class="text-lime-300 font-semibold">2. Associative Mapping:</span>
      • A block can be placed in ANY cache line.
      • Flexible but complex hardware search.
      
      <span class="text-lime-300 font-semibold">3. Set-Associative Mapping:</span>
      • Compromise: Cache is divided into sets. A block maps to a specific set but can go anywhere within that set.`,
        },
    ],
    practiceQuestions: [
        {
            question: 'What is the Principle of Locality?',
            solution: 'The Principle of Locality states that programs tend to access a relatively small portion of their address space at any instant of time.\n\n• Temporal Locality: If an item is referenced, it will tend to be referenced again soon (e.g., loops).\n• Spatial Locality: If an item is referenced, items with nearby addresses will tend to be referenced soon (e.g., arrays).',
        },
    ],
}

export default function MemoryHierarchyCachePage() {
    return <DSDTopicPage content={content} />
}
