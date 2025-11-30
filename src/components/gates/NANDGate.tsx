'use client'

import ANDGate from './ANDGate'
import NOTGate from './NOTGate'

interface NANDGateProps {
  x: number
  y: number
  width?: number
  height?: number
  inputs?: string[]
  output?: string
  showLabel?: boolean
  hideWires?: boolean
}

export default function NANDGate({
  x,
  y,
  width = 60,
  height = 50,
  inputs = ['A', 'B'],
  output = 'Y',
  showLabel = true,
  hideWires = false
}: NANDGateProps) {
  const inputSpacing = height / (inputs.length + 1)
  const inputY = y - height / 2

  return (
    <g>
      {/* NAND Gate Shape - IEEE Standard */}
      <path
        d={`M ${x} ${y - height / 2} L ${x + width / 2} ${y - height / 2} A ${height / 2} ${height / 2} 0 0 1 ${x + width / 2} ${y + height / 2} L ${x} ${y + height / 2} Z`}
        fill="#0d1117"
        stroke="#00b4ff"
        strokeWidth="2"
        className="drop-shadow-[0_0_8px_rgba(0,180,255,0.5)]"
      />

      {/* Bubble */}
      <circle
        cx={x + width / 2 + height / 2 + 5}
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
              x2={x}
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
            x1={x + width / 2 + height / 2 + 10}
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
          x={x + width / 4}
          y={y + 5}
          fill="#ffffff"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          NAND
        </text>
      )}
    </g>
  )
}

