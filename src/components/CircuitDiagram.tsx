'use client'

import { motion } from 'framer-motion'
import ANDGate from './gates/ANDGate'
import ORGate from './gates/ORGate'
import XORGate from './gates/XORGate'
import NOTGate from './gates/NOTGate'
import NANDGate from './gates/NANDGate'
import NORGate from './gates/NORGate'

interface CircuitDiagramProps {
  type: string
  title?: string
  width?: number
  height?: number
}

export default function CircuitDiagram({ type, title, width = 600, height = 400 }: CircuitDiagramProps) {
  const renderCircuit = () => {
    switch (type.toLowerCase()) {
      case 'and':
        return (
          <g>
            <ANDGate x={width/2 - 30} y={height/2} inputs={['A', 'B']} output="Y" />
          </g>
        )
      
      case 'or':
        return (
          <g>
            <ORGate x={width/2 - 30} y={height/2} inputs={['A', 'B']} output="Y" />
          </g>
        )
      
      case 'not':
        return (
          <g>
            <NOTGate x={width/2 - 25} y={height/2} input="A" output="Y" />
          </g>
        )
      
      case 'xor':
        return (
          <g>
            <XORGate x={width/2 - 30} y={height/2} inputs={['A', 'B']} output="Y" />
          </g>
        )
      
      case 'nand':
        return (
          <g>
            <NANDGate x={width/2 - 30} y={height/2} inputs={['A', 'B']} output="Y" />
          </g>
        )
      
      case 'nor':
        return (
          <g>
            <NORGate x={width/2 - 30} y={height/2} inputs={['A', 'B']} output="Y" />
          </g>
        )
      
      case 'half-adder':
        return (
          <g>
            {/* Input A */}
            <text x="10" y={height/2 - 20} fill="#00b4ff" fontSize="16" fontWeight="600">A</text>
            <line x1="25" y1={height/2 - 20} x2="100" y2={height/2 - 20} stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1={height/2 - 20} x2="25" y2={height/2 + 40} stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1={height/2 + 40} x2="100" y2={height/2 + 40} stroke="#00b4ff" strokeWidth="2" />
            <circle cx="100" cy={height/2 - 20} r="3" fill="#00b4ff" />
            <circle cx="100" cy={height/2 + 40} r="3" fill="#00b4ff" />
            
            {/* Input B */}
            <text x="10" y={height/2 + 20} fill="#00b4ff" fontSize="16" fontWeight="600">B</text>
            <line x1="25" y1={height/2 + 20} x2="100" y2={height/2 + 20} stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1={height/2 + 20} x2="25" y2={height/2 + 40} stroke="#00b4ff" strokeWidth="2" />
            <circle cx="100" cy={height/2 + 20} r="3" fill="#00b4ff" />
            
            {/* XOR Gate for SUM */}
            <XORGate x={100} y={height/2 - 20} width={60} height={50} inputs={['', '']} output="SUM" showLabel={true} />
            
            {/* AND Gate for CARRY */}
            <ANDGate x={100} y={height/2 + 40} width={60} height={50} inputs={['', '']} output="CARRY" showLabel={true} />
            
            {/* Output labels */}
            <text x="200" y={height/2 - 20} fill="#00b4ff" fontSize="14" fontWeight="600">SUM = A⊕B</text>
            <text x="200" y={height/2 + 40} fill="#00b4ff" fontSize="14" fontWeight="600">CARRY = AB</text>
          </g>
        )
      
      case 'full-adder':
        return (
          <g>
            {/* Input A */}
            <text x="10" y="60" fill="#00b4ff" fontSize="16" fontWeight="600">A</text>
            <line x1="25" y1="60" x2="100" y2="60" stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1="60" x2="25" y2="180" stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1="180" x2="100" y2="180" stroke="#00b4ff" strokeWidth="2" />
            <circle cx="100" cy="60" r="3" fill="#00b4ff" />
            <circle cx="100" cy="180" r="3" fill="#00b4ff" />
            
            {/* Input B */}
            <text x="10" y="120" fill="#00b4ff" fontSize="16" fontWeight="600">B</text>
            <line x1="25" y1="120" x2="100" y2="120" stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1="120" x2="25" y2="180" stroke="#00b4ff" strokeWidth="2" />
            <circle cx="100" cy="120" r="3" fill="#00b4ff" />
            
            {/* Input C */}
            <text x="10" y="180" fill="#00b4ff" fontSize="16" fontWeight="600">C</text>
            <line x1="25" y1="180" x2="220" y2="180" stroke="#00b4ff" strokeWidth="2" />
            <line x1="220" y1="90" x2="220" y2="180" stroke="#00b4ff" strokeWidth="2" />
            <line x1="220" y1="90" x2="280" y2="90" stroke="#00b4ff" strokeWidth="2" />
            <line x1="220" y1="210" x2="280" y2="210" stroke="#00b4ff" strokeWidth="2" />
            <circle cx="220" cy="90" r="3" fill="#00b4ff" />
            <circle cx="220" cy="180" r="3" fill="#00b4ff" />
            <circle cx="220" cy="210" r="3" fill="#00b4ff" />
            
            {/* XOR Gate 1 (A ⊕ B) */}
            <XORGate x={100} y={90} width={60} height={50} inputs={['', '']} output="" showLabel={true} hideWires={true} />
            <line x1="160" y1="90" x2="220" y2="90" stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="185" y="80" fill="#00b4ff" fontSize="12" fontWeight="600">A⊕B</text>
            
            {/* XOR Gate 2 (Sum = A⊕B⊕C) */}
            <XORGate x={280} y={90} width={60} height={50} inputs={['', '']} output="" showLabel={true} hideWires={true} />
            <line x1="340" y1="110" x2="400" y2="110" stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <circle cx="340" cy="110" r="3" fill="#00b4ff" />
            <text x="405" y="115" fill="#00b4ff" fontSize="14" fontWeight="600">SUM</text>
            
            {/* AND Gate 1 (A·B) */}
            <ANDGate x={100} y={180} width={60} height={50} inputs={['', '']} output="" showLabel={true} hideWires={true} />
            <line x1="160" y1="180" x2="210" y2="180" stroke="#00b4ff" strokeWidth="2" />
            <line x1="210" y1="180" x2="210" y2="240" stroke="#00b4ff" strokeWidth="2" />
            <line x1="210" y1="240" x2="330" y2="240" stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <circle cx="160" cy="180" r="3" fill="#00b4ff" />
            <circle cx="210" cy="180" r="3" fill="#00b4ff" />
            <circle cx="210" cy="240" r="3" fill="#00b4ff" />
            <text x="180" y="195" fill="#00b4ff" fontSize="12" fontWeight="600">AB</text>
            
            {/* AND Gate 2 (C(A⊕B)) */}
            <ANDGate x={280} y={210} width={60} height={50} inputs={['', '']} output="" showLabel={true} hideWires={true} />
            <line x1="340" y1="210" x2="330" y2="210" stroke="#00b4ff" strokeWidth="2" />
            <line x1="330" y1="210" x2="330" y2="240" stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <circle cx="340" cy="210" r="3" fill="#00b4ff" />
            <circle cx="330" cy="210" r="3" fill="#00b4ff" />
            <text x="300" y="225" fill="#00b4ff" fontSize="12" fontWeight="600">C(A⊕B)</text>
            
            {/* OR Gate (Carry) */}
            <ORGate x={330} y={240} width={60} height={50} inputs={['', '']} output="" showLabel={true} hideWires={true} />
            <line x1="390" y1="240" x2="450" y2="240" stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <circle cx="390" cy="240" r="3" fill="#00b4ff" />
            <text x="455" y="245" fill="#00b4ff" fontSize="14" fontWeight="600">CARRY</text>
            
            {/* Title */}
            <text x={width/2} y="20" fill="#00b4ff" fontSize="16" fontWeight="600" textAnchor="middle">
              Full Adder Logic Diagram
            </text>
            <text x="220" y="280" fill="#00b4ff" fontSize="12" fontWeight="600">CARRY = AB + C(A⊕B)</text>
          </g>
        )
      
      case 'half-subtractor':
        return (
          <g>
            {/* Input A */}
            <text x="10" y={height/2 - 20} fill="#00b4ff" fontSize="16" fontWeight="600">A</text>
            <line x1="25" y1={height/2 - 20} x2="100" y2={height/2 - 20} stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1={height/2 - 20} x2="25" y2={height/2 + 40} stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1={height/2 + 40} x2="100" y2={height/2 + 40} stroke="#00b4ff" strokeWidth="2" />
            <circle cx="100" cy={height/2 - 20} r="3" fill="#00b4ff" />
            <circle cx="100" cy={height/2 + 40} r="3" fill="#00b4ff" />
            
            {/* Input B */}
            <text x="10" y={height/2 + 20} fill="#00b4ff" fontSize="16" fontWeight="600">B</text>
            <line x1="25" y1={height/2 + 20} x2="100" y2={height/2 + 20} stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1={height/2 + 20} x2="25" y2={height/2 + 40} stroke="#00b4ff" strokeWidth="2" />
            <circle cx="100" cy={height/2 + 20} r="3" fill="#00b4ff" />
            
            {/* XOR Gate for DIFFERENCE */}
            <XORGate x={100} y={height/2 - 20} width={60} height={50} inputs={['', '']} output="DIFF" showLabel={true} />
            
            {/* AND Gate with NOT for BORROW */}
            <ANDGate x={100} y={height/2 + 40} width={60} height={50} inputs={['', '']} output="" showLabel={true} />
            <NOTGate x={170} y={height/2 + 40} width={30} height={30} input="" output="BORROW" showLabel={false} />
            
            {/* Output labels */}
            <text x="250" y={height/2 - 20} fill="#00b4ff" fontSize="14" fontWeight="600">DIFFERENCE = A⊕B</text>
            <text x="250" y={height/2 + 40} fill="#00b4ff" fontSize="14" fontWeight="600">BORROW = A'B</text>
          </g>
        )
      
      case 'full-subtractor':
        return (
          <g>
            {/* Similar to full adder but with borrow logic */}
            <text x="10" y="60" fill="#00b4ff" fontSize="16" fontWeight="600">A</text>
            <text x="10" y="120" fill="#00b4ff" fontSize="16" fontWeight="600">B</text>
            <text x="10" y="180" fill="#00b4ff" fontSize="16" fontWeight="600">Bin</text>
            
            {/* XOR Gate 1 (A ⊕ B) */}
            <XORGate x={100} y={90} width={60} height={50} inputs={['', '']} output="" showLabel={true} />
            
            {/* XOR Gate 2 (Difference) */}
            <XORGate x={280} y={90} width={60} height={50} inputs={['', '']} output="DIFF" showLabel={true} />
            
            {/* AND Gate 1 (A'B) */}
            <ANDGate x={100} y={180} width={60} height={50} inputs={['', '']} output="" showLabel={true} />
            
            {/* AND Gate 2 (Bin(A⊕B)') */}
            <ANDGate x={280} y={210} width={60} height={50} inputs={['', '']} output="" showLabel={true} />
            
            {/* OR Gate (Borrow) */}
            <ORGate x={330} y={240} width={60} height={50} inputs={['', '']} output="BORROW" showLabel={true} />
            
            {/* Wire connections */}
            <line x1="25" y1="60" x2="100" y2="60" stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1="120" x2="100" y2="120" stroke="#00b4ff" strokeWidth="2" />
            <line x1="25" y1="180" x2="220" y2="180" stroke="#00b4ff" strokeWidth="2" />
            <line x1="160" y1="90" x2="220" y2="90" stroke="#00b4ff" strokeWidth="2" />
            <line x1="160" y1="90" x2="220" y2="210" stroke="#00b4ff" strokeWidth="2" />
            
            <text x={width/2} y="20" fill="#00b4ff" fontSize="16" fontWeight="600" textAnchor="middle">
              Full Subtractor Logic Diagram
            </text>
          </g>
        )
      
      case 'mux4to1':
      case '4:1 mux':
        return (
          <g>
            {/* MUX Box */}
            <rect
              x={width/2 - 100}
              y={height/2 - 80}
              width="200"
              height="160"
              fill="none"
              stroke="#00b4ff"
              strokeWidth="2"
              rx="5"
              className="drop-shadow-[0_0_8px_rgba(0,180,255,0.5)]"
            />
            <text
              x={width/2}
              y={height/2}
              fill="#ffffff"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
            >
              4:1 MUX
            </text>
            
            {/* Inputs D0-D3 */}
            {['D0', 'D1', 'D2', 'D3'].map((label, i) => {
              const yPos = height/2 - 60 + i * 40
              return (
                <g key={label}>
                  <line
                    x1={width/2 - 100}
                    y1={yPos}
                    x2={width/2 - 150}
                    y2={yPos}
                    stroke="#00b4ff"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <circle
                    cx={width/2 - 100}
                    cy={yPos}
                    r="3"
                    fill="#00b4ff"
                  />
                  <text
                    x={width/2 - 155}
                    y={yPos + 5}
                    fill="#00b4ff"
                    fontSize="14"
                    fontWeight="600"
                    textAnchor="end"
                  >
                    {label}
                  </text>
                </g>
              )
            })}
            
            {/* Select Lines S1, S0 */}
            <line
              x1={width/2 - 50}
              y1={height/2 - 80}
              x2={width/2 - 50}
              y2={height/2 - 120}
              stroke="#00b4ff"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <circle
              cx={width/2 - 50}
              cy={height/2 - 80}
              r="3"
              fill="#00b4ff"
            />
            <text
              x={width/2 - 55}
              y={height/2 - 125}
              fill="#00b4ff"
              fontSize="14"
              fontWeight="600"
              textAnchor="end"
            >
              S1
            </text>
            
            <line
              x1={width/2 + 50}
              y1={height/2 - 80}
              x2={width/2 + 50}
              y2={height/2 - 120}
              stroke="#00b4ff"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <circle
              cx={width/2 + 50}
              cy={height/2 - 80}
              r="3"
              fill="#00b4ff"
            />
            <text
              x={width/2 + 55}
              y={height/2 - 125}
              fill="#00b4ff"
              fontSize="14"
              fontWeight="600"
              textAnchor="start"
            >
              S0
            </text>
            
            {/* Output Y */}
            <line
              x1={width/2 + 100}
              y1={height/2}
              x2={width/2 + 150}
              y2={height/2}
              stroke="#00b4ff"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <circle
              cx={width/2 + 100}
              cy={height/2}
              r="3"
              fill="#00b4ff"
            />
            <text
              x={width/2 + 155}
              y={height/2 + 5}
              fill="#00b4ff"
              fontSize="14"
              fontWeight="600"
              textAnchor="start"
            >
              Y
            </text>
          </g>
        )
      
      case 'decoder2to4':
      case '2:4 decoder':
        return (
          <g>
            {/* Decoder Box */}
            <rect
              x={width/2 - 100}
              y={height/2 - 100}
              width="200"
              height="200"
              fill="none"
              stroke="#00b4ff"
              strokeWidth="2"
              rx="5"
              className="drop-shadow-[0_0_8px_rgba(0,180,255,0.5)]"
            />
            <text
              x={width/2}
              y={height/2}
              fill="#ffffff"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
            >
              2:4 DECODER
            </text>
            
            {/* Inputs A1, A0 */}
            <line
              x1={width/2 - 100}
              y1={height/2 - 50}
              x2={width/2 - 150}
              y2={height/2 - 50}
              stroke="#00b4ff"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <circle
              cx={width/2 - 100}
              cy={height/2 - 50}
              r="3"
              fill="#00b4ff"
            />
            <text
              x={width/2 - 155}
              y={height/2 - 45}
              fill="#00b4ff"
              fontSize="14"
              fontWeight="600"
              textAnchor="end"
            >
              A1
            </text>
            
            <line
              x1={width/2 - 100}
              y1={height/2 + 50}
              x2={width/2 - 150}
              y2={height/2 + 50}
              stroke="#00b4ff"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <circle
              cx={width/2 - 100}
              cy={height/2 + 50}
              r="3"
              fill="#00b4ff"
            />
            <text
              x={width/2 - 155}
              y={height/2 + 55}
              fill="#00b4ff"
              fontSize="14"
              fontWeight="600"
              textAnchor="end"
            >
              A0
            </text>
            
            {/* Outputs Y0-Y3 */}
            {['Y0', 'Y1', 'Y2', 'Y3'].map((label, i) => {
              const yPos = height/2 - 75 + i * 50
              return (
                <g key={label}>
                  <line
                    x1={width/2 + 100}
                    y1={yPos}
                    x2={width/2 + 150}
                    y2={yPos}
                    stroke="#00b4ff"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <circle
                    cx={width/2 + 100}
                    cy={yPos}
                    r="3"
                    fill="#00b4ff"
                  />
                  <text
                    x={width/2 + 155}
                    y={yPos + 5}
                    fill="#00b4ff"
                    fontSize="14"
                    fontWeight="600"
                    textAnchor="start"
                  >
                    {label}
                  </text>
                </g>
              )
            })}
          </g>
        )
      
      default:
        return (
          <text x={width/2} y={height/2} fill="#ffffff" fontSize="16" textAnchor="middle">
            Circuit diagram for {type}
          </text>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="my-6 flex flex-col items-center"
    >
      <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl w-full max-w-4xl">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3, 0 6"
                fill="#00b4ff"
              />
            </marker>
          </defs>
          {renderCircuit()}
        </svg>
        {title && (
          <p className="text-center text-cyan-400 text-sm mt-4 font-semibold">{title}</p>
        )}
      </div>
    </motion.div>
  )
}
