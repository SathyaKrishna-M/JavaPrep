'use client'

import DSDTopicPage from '@/components/DSDTopicPage'
import { FiCode, FiCpu } from 'react-icons/fi'

const content = {
    title: 'HDL Basics',
    explanationSections: [
        {
            title: '📝 Introduction to HDL',
            icon: <FiCode className="w-6 h-6" />,
            content: `<span class="text-blue-400 font-semibold">HDL (Hardware Description Language)</span> is used to model and simulate digital systems.
      
      <span class="text-amber-300 font-semibold">Popular HDLs:</span>
      • <span class="text-cyan-300">Verilog:</span> C-like syntax, widely used in industry.
      • <span class="text-cyan-300">VHDL:</span> Ada-like syntax, strongly typed.`,
        },
        {
            title: 'Verilog Example: Full Adder',
            icon: <FiCpu className="w-6 h-6" />,
            content: `A Full Adder adds three bits (A, B, Cin) and produces Sum and Carry.`,
            code: `module full_adder (
    input a, b, cin,
    output sum, cout
);
    assign sum = a ^ b ^ cin;
    assign cout = (a & b) | (b & cin) | (a & cin);
endmodule`,
            mermaid: `graph LR
    A[a] --> XOR1
    B[b] --> XOR1
    XOR1 --> XOR2
    Cin[cin] --> XOR2
    XOR2 --> Sum[sum]
    
    A --> AND1
    B --> AND1
    
    B --> AND2
    Cin --> AND2
    
    A --> AND3
    Cin --> AND3
    
    AND1 --> OR
    AND2 --> OR
    AND3 --> OR
    OR --> Cout[cout]`,
        },
    ],
    practiceQuestions: [
        {
            question: 'What is the difference between "assign" and "always" blocks in Verilog?',
            solution: '"assign" is used for continuous assignment (combinational logic) and updates immediately when inputs change. "always" blocks are used for procedural assignment (sequential or combinational) and trigger based on a sensitivity list (e.g., clock edge or signal change).',
        },
    ],
}

export default function HDLBasicsPage() {
    return <DSDTopicPage content={content} />
}
