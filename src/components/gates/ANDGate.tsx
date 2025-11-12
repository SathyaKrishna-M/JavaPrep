'use client'

interface ANDGateProps {
  x: number
  y: number
  width?: number
  height?: number
  inputs?: string[]
  output?: string
  showLabel?: boolean
  hideWires?: boolean
}

export default function ANDGate({ 
  x, 
  y, 
  width = 60, 
  height = 50, 
  inputs = ['A', 'B'], 
  output = 'Y',
  showLabel = true,
  hideWires = false
}: ANDGateProps) {
  const inputSpacing = height / (inputs.length + 1)
  const inputY = y - height / 2

  return (
    <g>
      {/* AND Gate Shape - Curved rectangle with rounded right edge */}
      <path
        d={`M ${x} ${y - height/2} L ${x + width - 15} ${y - height/2} Q ${x + width} ${y - height/2} ${x + width} ${y} Q ${x + width} ${y + height/2} ${x + width - 15} ${y + height/2} L ${x} ${y + height/2} Z`}
        fill="none"
        stroke="#00b4ff"
        strokeWidth="2"
        className="drop-shadow-[0_0_8px_rgba(0,180,255,0.5)]"
      />
      
      {/* Input wires */}
      {!hideWires && inputs.map((label, i) => {
        if (!label) return null
        const inputYPos = inputY + (i + 1) * inputSpacing
        return (
          <g key={`input-${i}`}>
            <line
              x1={x - 30}
              y1={inputYPos}
              x2={x}
              y2={inputYPos}
              stroke="#00b4ff"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <circle
              cx={x}
              cy={inputYPos}
              r="3"
              fill="#00b4ff"
            />
            <text
              x={x - 35}
              y={inputYPos + 5}
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
      
      {/* Output wire */}
      {!hideWires && output && (
        <>
          <line
            x1={x + width}
            y1={y}
            x2={x + width + 30}
            y2={y}
            stroke="#00b4ff"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <circle
            cx={x + width}
            cy={y}
            r="3"
            fill="#00b4ff"
          />
          <text
            x={x + width + 35}
            y={y + 5}
            fill="#00b4ff"
            fontSize="14"
            fontWeight="600"
            textAnchor="start"
          >
            {output}
          </text>
        </>
      )}
      
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
          AND
        </text>
      )}
    </g>
  )
}

