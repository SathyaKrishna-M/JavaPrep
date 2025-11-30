'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiBattery, FiActivity } from 'react-icons/fi'

const content = {
    title: 'Low Power Techniques',
    explanationSections: [
        {
            title: '🔋 Power Dissipation',
            icon: <FiBattery className="w-6 h-6" />,
            content: `Power consumption is a critical design constraint in modern digital systems.
      
      <span class="text-amber-300 font-semibold">Types of Power:</span>
      1. <span class="text-cyan-300">Dynamic Power:</span> Consumed during switching (charging/discharging capacitance).
         P_dynamic = α · C · V² · f
      2. <span class="text-cyan-300">Static Power:</span> Leakage current when transistor is off.`,
        },
        {
            title: 'Reduction Techniques',
            icon: <FiActivity className="w-6 h-6" />,
            content: `<span class="text-lime-300 font-semibold">1. Clock Gating:</span>
      • Disabling the clock signal to blocks that are idle.
      • Reduces dynamic power significantly.
      
      <span class="text-lime-300 font-semibold">2. DVFS (Dynamic Voltage and Frequency Scaling):</span>
      • Adjusting voltage and frequency based on workload.
      • Lower V and f reduce power quadratically.
      
      <span class="text-lime-300 font-semibold">3. Power Gating:</span>
      • Shutting off power supply to idle blocks.
      • Reduces static (leakage) power.`,
            mermaid: `graph TD
    subgraph "Clock Gating Logic"
    Clk[System Clock] --> AND[AND Gate]
    En[Enable Signal] --> Latch[Latch]
    Latch --> AND
    AND --> Block[Logic Block]
    end`,
        },
    ],
    practiceQuestions: [
        {
            question: 'Which parameter has the most impact on dynamic power?',
            solution: 'Voltage (V) has the most impact because dynamic power is proportional to the square of the voltage (V²). Reducing voltage yields quadratic power savings.',
        },
    ],
}

export default function LowPowerTechniquesPage() {
    return <DSDTopicPage content={content} />
}
