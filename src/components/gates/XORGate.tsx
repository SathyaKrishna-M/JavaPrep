'use client'

interface XORGateProps {
  x: number
  y: number
  width?: number
  height?: number
  inputs?: string[]
  output?: string
  showLabel?: boolean
  hideWires?: boolean
}

export default function XORGate({
  x,
  y,
  width = 60,
  height = 50,
  inputs = ['A', 'B'],
  output = 'Y',
  showLabel = true,
  hideWires = false
}: XORGateProps) {
  const inputSpacing = height / (inputs.length + 1)
  const inputY = y - height / 2

  return (
    <g>
      {/* XOR Gate Shape - OR gate with curved input line */}
      {/* XOR Gate Shape - IEEE Standard */}
      <path
        d={`M ${x + 5} ${y - height / 2} Q ${x + width / 4 + 5} ${y} ${x + 5} ${y + height / 2} Q ${x + width / 2 + 5} ${y + height / 2} ${x + width} ${y} Q ${x + width / 2 + 5} ${y - height / 2} ${x + 5} ${y - height / 2} Z`}
        fill="#0d1117"
        stroke="#00b4ff"
        strokeWidth="2"
        className="drop-shadow-[0_0_8px_rgba(0,180,255,0.5)]"
      />

      {/* Extra Curve */}
      <path
        d={`M ${x - 5} ${y - height / 2} Q ${x + width / 4 - 5} ${y} ${x - 5} ${y + height / 2}`}
        fill="none"
        stroke="#00b4ff"
        strokeWidth="2"
      />

      {/* Input wires */}
      {!hideWires && inputs.map((label, i) => {
        if (!label) return null
        const inputYPos = inputY + (i + 1) * inputSpacing
        const isFirstInput = i === 0
        return (
          <g key={`input-${i}`}>
            <line
              x1={x - (isFirstInput ? 38 : 30)}
              y1={inputYPos}
              x2={x - (isFirstInput ? 8 : 0)}
              y2={inputYPos}
              stroke="#00b4ff"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <circle
              cx={x - (isFirstInput ? 8 : 0)}
              cy={inputYPos}
              r="3"
              fill="#00b4ff"
            />
            <text
              x={x - (isFirstInput ? 43 : 35)}
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
          XOR
        </text>
      )}
    </g>
  )
}

