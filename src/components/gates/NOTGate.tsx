'use client'

interface NOTGateProps {
  x: number
  y: number
  width?: number
  height?: number
  input?: string
  output?: string
  showLabel?: boolean
}

export default function NOTGate({ 
  x, 
  y, 
  width = 50, 
  height = 40, 
  input = 'A', 
  output = 'Y',
  showLabel = true 
}: NOTGateProps) {
  return (
    <g>
      {/* NOT Gate Shape - Triangle */}
      <path
        d={`M ${x} ${y - height/2} L ${x + width} ${y} L ${x} ${y + height/2} Z`}
        fill="none"
        stroke="#00b4ff"
        strokeWidth="2"
        className="drop-shadow-[0_0_8px_rgba(0,180,255,0.5)]"
      />
      
      {/* Inversion Circle */}
      <circle
        cx={x + width + 5}
        cy={y}
        r="5"
        fill="none"
        stroke="#00b4ff"
        strokeWidth="2"
      />
      
      {/* Input wire */}
      <line
        x1={x - 30}
        y1={y}
        x2={x}
        y2={y}
        stroke="#00b4ff"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <circle
        cx={x}
        cy={y}
        r="3"
        fill="#00b4ff"
      />
      <text
        x={x - 35}
        y={y + 5}
        fill="#00b4ff"
        fontSize="14"
        fontWeight="600"
        textAnchor="end"
      >
        {input}
      </text>
      
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
          NOT
        </text>
      )}
    </g>
  )
}

