'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiHardDrive, FiDisc, FiZap } from 'react-icons/fi'

const content = {
    title: 'Storage Systems',
    explanationSections: [
        {
            title: '💾 Magnetic Disks (HDD)',
            icon: <FiHardDrive className="w-6 h-6" />,
            content: `<span class="text-blue-400 font-semibold">Hard Disk Drives (HDD)</span> use rotating magnetic platters to store data.
      
      <span class="text-amber-300 font-semibold">Key Metrics:</span>
      • <span class="text-cyan-300">Seek Time:</span> Time to move the head to the correct track.
      • <span class="text-cyan-300">Rotational Latency:</span> Time for the sector to rotate under the head.
      • <span class="text-cyan-300">Transfer Rate:</span> Speed of data reading/writing.`,
        },
        {
            title: 'RAID (Redundant Array of Independent Disks)',
            icon: <FiDisc className="w-6 h-6" />,
            content: `RAID combines multiple physical disks into a single logical unit for performance or redundancy.
      
      <span class="text-lime-300 font-semibold">Common Levels:</span>
      • <span class="text-cyan-300">RAID 0:</span> Striping (Performance, No Redundancy).
      • <span class="text-cyan-300">RAID 1:</span> Mirroring (Redundancy, Lower Capacity).
      • <span class="text-cyan-300">RAID 5:</span> Striping with Parity (Balance of Performance and Redundancy).`,
            mermaid: `graph TD
    subgraph "RAID 0 (Striping)"
    D1[Disk 1: Data A]
    D2[Disk 2: Data B]
    end
    
    subgraph "RAID 1 (Mirroring)"
    D3[Disk 1: Data A]
    D4[Disk 2: Data A]
    end`,
        },
        {
            title: 'Flash Memory (SSD)',
            icon: <FiZap className="w-6 h-6" />,
            content: `<span class="text-blue-400 font-semibold">Solid State Drives (SSD)</span> use NAND flash memory.
      • No moving parts.
      • Much faster access times than HDD.
      • Limited write endurance.`,
        },
    ],
    practiceQuestions: [
        {
            question: 'Which RAID level would you choose for a critical database server where data loss is unacceptable?',
            solution: 'RAID 1 (Mirroring) or RAID 10 (1+0) is preferred for critical data because it provides a complete copy of the data. If one drive fails, the data is safe on the other.',
        },
    ],
}

export default function StorageSystemsPage() {
    return <DSDTopicPage content={content} />
}
