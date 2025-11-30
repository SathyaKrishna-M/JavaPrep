'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiSmartphone, FiLock } from 'react-icons/fi'

const content = {
    title: 'Real-world Applications',
    explanationSections: [
        {
            title: '💡 Digital Systems in Daily Life',
            icon: <FiSmartphone className="w-6 h-6" />,
            content: `Digital systems are everywhere.
      
      <span class="text-amber-300 font-semibold">Examples:</span>
      • <span class="text-cyan-300">Smartphones:</span> Processors, memory, display drivers.
      • <span class="text-cyan-300">Automobiles:</span> ECUs (Engine Control Units), ABS, infotainment.
      • <span class="text-cyan-300">Home Automation:</span> Smart lights, thermostats, security cameras.`,
        },
        {
            title: 'Security System Logic',
            icon: <FiLock className="w-6 h-6" />,
            content: `A simple home security system can be modeled using digital logic.
      
      <span class="text-lime-300 font-semibold">Scenario:</span>
      Alarm sounds (A=1) if the System is Armed (S=1) AND (Door is Open (D=1) OR Motion Detected (M=1)).
      
      <span class="text-cyan-300">Boolean Expression:</span> A = S · (D + M)`,
            mermaid: `graph LR
    D[Door Open] --> OR
    M[Motion] --> OR
    OR --> AND
    S[System Armed] --> AND
    AND --> Alarm[Alarm Sound]`,
            truthTable: {
                headers: ['S', 'D', 'M', 'Alarm'],
                rows: [
                    ['0', 'X', 'X', '0'],
                    ['1', '0', '0', '0'],
                    ['1', '0', '1', '1'],
                    ['1', '1', '0', '1'],
                    ['1', '1', '1', '1'],
                ],
                title: 'Security System Truth Table',
            },
        },
    ],
    practiceQuestions: [
        {
            question: 'Design a logic circuit for a voting machine with 3 judges. The decision is approved if the majority (2 or more) vote YES.',
            solution: 'Let inputs be A, B, C. Output Y = 1 if 2 or 3 inputs are 1.\n\nBoolean Expression: Y = AB + BC + CA\n\nThis is the Majority Function.',
        },
    ],
}

export default function DigitalApplicationsPage() {
    return <DSDTopicPage content={content} />
}
