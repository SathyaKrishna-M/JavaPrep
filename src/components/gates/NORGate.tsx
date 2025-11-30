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
  hideWires?: boolean
}

export default function NORGate({
  x,
  y,
  width = 60,
  height = 50,
  inputs = ['A', 'B'],
  output = 'Y',
  showLabel = true,
  hideWires = false
}: NORGateProps) {
  const inputSpacing = height / (inputs.length + 1)
  const inputY = y - height / 2

  return (
    <g>
      {/* NOR Gate Shape - IEEE Standard */}
      <path
        d={`M ${x} ${y - height / 2} Q ${x + width / 4} ${y} ${x} ${y + height / 2} Q ${x + width / 2} ${y + height / 2} ${x + width} ${y} Q ${x + width / 2} ${y - height / 2} ${x} ${y - height / 2} Z`}
        fill="#0d1117"
        stroke="#00b4ff"
        strokeWidth="2"
        className="drop-shadow-[0_0_8px_rgba(0,180,255,0.5)]"
      />

      {/* Bubble */}
      <circle
        cx={x + width + 5}
        cy={y}
        r="5"
        fill="#0d1117"
        stroke="#00b4ff"
        strokeWidth="2"
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
              x2={x + width / 8}
              y2={inputYPos}
              stroke="#00b4ff"
              strokeWidth="2"
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
            x1={x + width + 10}
            y1={y}
            x2={x + width + 40}
            y2={y}
            stroke="#00b4ff"
            strokeWidth="2"
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
          NOR
        </text>
      )}
    </g>
  )
}

