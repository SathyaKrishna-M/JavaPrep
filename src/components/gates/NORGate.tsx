'use client'

import ORGate from './ORGate'

interface NORGateProps {
  x: number
  y: number
  width?: number
  height?: number
  inputs?: string[]
  output?: string
  showLabel?: boolean
}

export default function NORGate({ 
  x, 
  y, 
  width = 60, 
  height = 50, 
  inputs = ['A', 'B'], 
  output = 'Y',
  showLabel = true 
}: NORGateProps) {
  return (
    <g>
      {/* OR Gate part */}
      <ORGate 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        inputs={inputs} 
        output="" 
        showLabel={false}
      />
      
      {/* NOT Gate part (inversion bubble) */}
      <circle
        cx={x + width + 5}
        cy={y}
        r="5"
        fill="none"
        stroke="#00b4ff"
        strokeWidth="2"
      />
      
      {/* Output wire */}
      <line
        x1={x + width + 10}
        y1={y}
        x2={x + width + 40}
        y2={y}
        stroke="#00b4ff"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <circle
        cx={x + width + 10}
        cy={y}
        r="3"
        fill="#00b4ff"
      />
      <text
        x={x + width + 45}
        y={y + 5}
        fill="#00b4ff"
        fontSize="14"
        fontWeight="600"
        textAnchor="start"
      >
        {output}
      </text>
      
      {/* Gate Label */}
      {showLabel && (
        <text
          x={x + width / 2}
          y={y + 5}
          fill="#ffffff"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          NOR
        </text>
      )}
    </g>
  )
}

