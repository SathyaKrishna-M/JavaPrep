'use client'

import { motion } from 'framer-motion'
import ANDGate from './gates/ANDGate'
import ORGate from './gates/ORGate'
import XORGate from './gates/XORGate'
import NOTGate from './gates/NOTGate'
import NANDGate from './gates/NANDGate'
import NORGate from './gates/NORGate'

// Helper: Draws orthogonal lines (Manhattan routing)
const drawWire = (x1: number, y1: number, x2: number, y2: number, color = "#00b4ff") => {
  const midX = (x1 + x2) / 2;
  return (
    <path
      d={`M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

// Helper: Connection Junction Dot
const ConnectionDot = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r="3" fill="#00b4ff" />
);

// Helper: Text Label
const Label = ({ x, y, text, align = "middle" }: { x: number, y: number, text: string, align?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} fill="#00b4ff" fontSize="12" fontWeight="600" textAnchor={align}>{text}</text>
);

interface CircuitDiagramProps {
  type: string
  title?: string
  width?: number
  height?: number
}

const CIRCUIT_DIMENSIONS: Record<string, { width: number, height: number }> = {
  'half-adder': { width: 400, height: 250 },
  'half-subtractor': { width: 400, height: 250 },
  'full-adder': { width: 550, height: 300 },
  'full-adder-using-two-half-adders': { width: 700, height: 350 },
  'full-subtractor': { width: 750, height: 350 },
}

// Helper: Half Adder Block Component
const HalfAdderBlock = ({ x, y }: { x: number, y: number }) => (
  <g>
    {/* Main Box */}
    <rect x={x} y={y} width={100} height={80} fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
    <text x={x + 50} y={y - 10} fill="#000" fontSize="14" fontWeight="600" textAnchor="middle">Half Adder</text>
    <text x={x + 50} y={y + 45} fill="#1e3a8a" fontSize="16" fontWeight="bold" textAnchor="middle">HA</text>

    {/* Port Labels */}
    <text x={x + 95} y={y + 25} fill="#1e3a8a" fontSize="10" fontWeight="600" textAnchor="end">SUM</text>
    <text x={x + 95} y={y + 65} fill="#1e3a8a" fontSize="10" fontWeight="600" textAnchor="end">CARRY</text>
  </g>
);

export default function CircuitDiagram({ type, title, width: propWidth, height: propHeight }: CircuitDiagramProps) {
  // Use specific dimensions if available, otherwise fallback to props or defaults
  const dimensions = CIRCUIT_DIMENSIONS[type.toLowerCase()] || { width: propWidth || 600, height: propHeight || 400 }
  const width = dimensions.width
  const height = dimensions.height

  const renderCircuit = () => {
    switch (type.toLowerCase()) {
      // --- COMBINATIONAL LOGIC ---
      case 'half-adder':
        return (
          <g>
            {/* Title */}
            <text x={width / 2} y={30} fill="#00b4ff" fontSize="18" fontWeight="bold" textDecoration="underline" textAnchor="middle">Logic Diagram:</text>

            {/* Inputs */}
            <Label x={30} y={80} text="A" align="end" />
            <Label x={30} y={120} text="B" align="end" />

            {/* XOR Gate (Top) */}
            <XORGate x={180} y={90} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />

            {/* AND Gate (Bottom) */}
            <ANDGate x={180} y={180} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />

            {/* Wiring - A (Top Input) */}
            <line x1={40} y1={80} x2={180} y2={80} stroke="#00b4ff" strokeWidth="2" /> {/* A to XOR Top */}
            <line x1={100} y1={80} x2={100} y2={170} stroke="#00b4ff" strokeWidth="2" /> {/* Branch down */}
            <line x1={100} y1={170} x2={180} y2={170} stroke="#00b4ff" strokeWidth="2" /> {/* To AND Top */}
            <ConnectionDot x={100} y={80} />
            <circle cx={40} cy={80} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" /> {/* Input Terminal A */}

            {/* Wiring - B (Bottom Input) */}
            <line x1={40} y1={120} x2={130} y2={120} stroke="#00b4ff" strokeWidth="2" /> {/* B start */}
            <line x1={130} y1={120} x2={130} y2={100} stroke="#00b4ff" strokeWidth="2" /> {/* Up to XOR Bottom */}
            <line x1={130} y1={100} x2={180} y2={100} stroke="#00b4ff" strokeWidth="2" /> {/* To XOR Bottom */}

            <line x1={60} y1={120} x2={60} y2={190} stroke="#00b4ff" strokeWidth="2" /> {/* Branch down */}
            <line x1={60} y1={190} x2={180} y2={190} stroke="#00b4ff" strokeWidth="2" /> {/* To AND Bottom */}

            <ConnectionDot x={60} y={120} />
            <circle cx={40} cy={120} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" /> {/* Input Terminal B */}

            {/* Outputs */}
            {/* XOR Output */}
            <line x1={240} y1={90} x2={300} y2={90} stroke="#00b4ff" strokeWidth="2" />
            <circle cx={300} cy={90} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" />
            <Label x={310} y={95} text="A ⊕ B" align="start" />

            {/* AND Output */}
            <line x1={240} y1={180} x2={300} y2={180} stroke="#00b4ff" strokeWidth="2" />
            <circle cx={300} cy={180} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" />
            <Label x={310} y={185} text="AB" align="start" />
          </g>
        );

      case 'full-adder':
        return (
          <g>
            {/* Inputs */}
            <Label x={30} y={60} text="A" align="end" />
            <Label x={30} y={100} text="B" align="end" />
            <Label x={30} y={140} text="C" align="end" />

            {/* XOR1 (Top Left) */}
            <XORGate x={130} y={80} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />

            {/* AND2 (Bottom Left) */}
            <ANDGate x={130} y={240} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />

            {/* XOR2 (Top Right) */}
            <XORGate x={280} y={80} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />

            {/* AND1 (Middle Right) */}
            <ANDGate x={280} y={160} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />

            {/* OR (Bottom Right) */}
            <ORGate x={400} y={200} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />

            {/* Wiring A */}
            <line x1={40} y1={60} x2={130} y2={60} stroke="#00b4ff" strokeWidth="2" /> {/* To XOR1 Top */}
            <line x1={50} y1={60} x2={50} y2={230} stroke="#00b4ff" strokeWidth="2" /> {/* Branch down */}
            <line x1={50} y1={230} x2={130} y2={230} stroke="#00b4ff" strokeWidth="2" /> {/* To AND2 Top */}
            <ConnectionDot x={50} y={60} />
            <circle cx={40} cy={60} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" />

            {/* Wiring B */}
            <line x1={40} y1={100} x2={130} y2={100} stroke="#00b4ff" strokeWidth="2" /> {/* To XOR1 Bottom */}
            <line x1={60} y1={100} x2={60} y2={250} stroke="#00b4ff" strokeWidth="2" /> {/* Branch down */}
            <line x1={60} y1={250} x2={130} y2={250} stroke="#00b4ff" strokeWidth="2" /> {/* To AND2 Bottom */}
            <ConnectionDot x={60} y={100} />
            <circle cx={40} cy={100} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" />

            {/* Wiring C */}
            <line x1={40} y1={140} x2={260} y2={140} stroke="#00b4ff" strokeWidth="2" /> {/* Main C line */}
            <line x1={260} y1={140} x2={260} y2={100} stroke="#00b4ff" strokeWidth="2" /> {/* Up to XOR2 */}
            <line x1={260} y1={100} x2={280} y2={100} stroke="#00b4ff" strokeWidth="2" /> {/* To XOR2 Bottom */}

            <line x1={260} y1={140} x2={260} y2={170} stroke="#00b4ff" strokeWidth="2" /> {/* Down to AND1 */}
            <line x1={260} y1={170} x2={280} y2={170} stroke="#00b4ff" strokeWidth="2" /> {/* To AND1 Bottom */}

            <ConnectionDot x={260} y={140} />
            <circle cx={40} cy={140} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" />

            {/* Wiring XOR1 Output */}
            <line x1={190} y1={80} x2={240} y2={80} stroke="#00b4ff" strokeWidth="2" /> {/* Main Out */}
            <line x1={240} y1={80} x2={240} y2={60} stroke="#00b4ff" strokeWidth="2" /> {/* Up to XOR2 */}
            <line x1={240} y1={60} x2={280} y2={60} stroke="#00b4ff" strokeWidth="2" /> {/* To XOR2 Top */}

            <line x1={240} y1={80} x2={240} y2={150} stroke="#00b4ff" strokeWidth="2" /> {/* Down to AND1 */}
            <line x1={240} y1={150} x2={280} y2={150} stroke="#00b4ff" strokeWidth="2" /> {/* To AND1 Top */}
            <ConnectionDot x={240} y={80} />

            {/* Wiring AND1 Output */}
            <line x1={340} y1={160} x2={380} y2={160} stroke="#00b4ff" strokeWidth="2" />
            <line x1={380} y1={160} x2={380} y2={190} stroke="#00b4ff" strokeWidth="2" />
            <line x1={380} y1={190} x2={400} y2={190} stroke="#00b4ff" strokeWidth="2" /> {/* To OR Top */}

            {/* Wiring AND2 Output */}
            <line x1={190} y1={240} x2={380} y2={240} stroke="#00b4ff" strokeWidth="2" />
            <line x1={380} y1={240} x2={380} y2={210} stroke="#00b4ff" strokeWidth="2" />
            <line x1={380} y1={210} x2={400} y2={210} stroke="#00b4ff" strokeWidth="2" /> {/* To OR Bottom */}

            {/* Final Outputs */}
            {/* SUM */}
            <line x1={340} y1={80} x2={460} y2={80} stroke="#00b4ff" strokeWidth="2" />
            <Label x={470} y={85} text="SUM = A⊕B⊕C" align="start" />
            <circle cx={460} cy={80} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" />

            {/* CARRY */}
            <line x1={460} y1={200} x2={500} y2={200} stroke="#00b4ff" strokeWidth="2" />
            <Label x={510} y={205} text="CARRY" align="start" />
            <circle cx={500} cy={200} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" />

            {/* Intermediate Labels */}
            <Label x={360} y={150} text="C(A⊕B)" align="start" />
            <Label x={210} y={255} text="AB" align="start" />
          </g>
        );

      case 'full-adder-using-two-half-adders':
        return (
          <g>
            {/* Outer Dashed Box */}
            <rect x={20} y={20} width={660} height={310} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
            <text x={350} y={310} fill="#000" fontSize="16" fontWeight="bold" textAnchor="middle">Full Adder</text>

            {/* Inputs */}
            <Label x={50} y={100} text="A" align="end" />
            <Label x={50} y={140} text="B" align="end" />
            <Label x={50} y={220} text="Cin" align="end" />

            {/* Half Adder 1 */}
            <HalfAdderBlock x={120} y={80} />

            {/* Half Adder 2 */}
            <HalfAdderBlock x={350} y={80} />

            {/* OR Gate */}
            <ORGate x={550} y={240} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />
            <text x={570} y={245} fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">≥1</text>

            {/* Wiring - HA1 Inputs */}
            <line x1={60} y1={100} x2={120} y2={100} stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" /> {/* A */}
            <line x1={60} y1={140} x2={120} y2={140} stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" /> {/* B */}

            {/* Wiring - HA1 Outputs */}
            {/* Sum (Top) -> HA2 Top Input */}
            <line x1={220} y1={100} x2={350} y2={100} stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <Label x={285} y={95} text="A⊕B" align="middle" />

            {/* Carry (Bottom) -> OR Gate Bottom Input */}
            <line x1={220} y1={140} x2={260} y2={140} stroke="#00b4ff" strokeWidth="2" />
            <line x1={260} y1={140} x2={260} y2={260} stroke="#00b4ff" strokeWidth="2" />
            <line x1={260} y1={260} x2={550} y2={260} stroke="#00b4ff" strokeWidth="2" />
            <Label x={285} y={135} text="A.B" align="start" />

            {/* Wiring - HA2 Inputs */}
            {/* Cin -> HA2 Bottom Input */}
            <line x1={60} y1={220} x2={300} y2={220} stroke="#00b4ff" strokeWidth="2" />
            <line x1={300} y1={220} x2={300} y2={140} stroke="#00b4ff" strokeWidth="2" />
            <line x1={300} y1={140} x2={350} y2={140} stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Wiring - HA2 Outputs */}
            {/* Sum (Top) -> Final Sum */}
            <line x1={450} y1={100} x2={650} y2={100} stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <Label x={550} y={95} text="(A⊕B)⊕Cin" align="start" />
            <Label x={660} y={105} text="Sum" align="start" />

            {/* Carry (Bottom) -> OR Gate Top Input */}
            <line x1={450} y1={140} x2={500} y2={140} stroke="#00b4ff" strokeWidth="2" />
            <line x1={500} y1={140} x2={500} y2={220} stroke="#00b4ff" strokeWidth="2" />
            <line x1={500} y1={220} x2={550} y2={220} stroke="#00b4ff" strokeWidth="2" />
            <Label x={510} y={135} text="Cin(A⊕B)" align="start" />

            {/* Wiring - OR Gate Output */}
            <line x1={610} y1={240} x2={650} y2={240} stroke="#00b4ff" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <Label x={660} y={245} text="Cout" align="start" />
          </g>
        );

      case 'half-subtractor':
        return (
          <g>
            {/* Title */}
            <text x={width / 2} y={30} fill="#00b4ff" fontSize="18" fontWeight="bold" textDecoration="underline" textAnchor="middle">Logic Diagram:</text>

            {/* Inputs */}
            <Label x={30} y={80} text="A" align="end" />
            <Label x={30} y={120} text="B" align="end" />

            {/* XOR Gate (Top) */}
            <XORGate x={180} y={90} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />

            {/* NOT Gate (Middle) */}
            <NOTGate x={120} y={160} width={40} height={30} input="" output="" showLabel={false} hideWires={true} />

            {/* AND Gate (Bottom) */}
            <ANDGate x={180} y={180} width={60} height={50} inputs={['', '']} output="" showLabel={false} hideWires={true} />

            {/* Wiring - A (Top Input) */}
            <line x1={40} y1={80} x2={180} y2={80} stroke="#00b4ff" strokeWidth="2" /> {/* A to XOR Top */}
            <line x1={80} y1={80} x2={80} y2={160} stroke="#00b4ff" strokeWidth="2" /> {/* Branch down to NOT */}
            <line x1={80} y1={160} x2={120} y2={160} stroke="#00b4ff" strokeWidth="2" /> {/* To NOT Input */}
            <ConnectionDot x={80} y={80} />
            <circle cx={40} cy={80} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" /> {/* Input Terminal A */}

            {/* Wiring - NOT Output to AND Top */}
            {/* NOT width 40, bubble center at 120+40+5=165, edge at 170 */}
            <line x1={170} y1={160} x2={175} y2={160} stroke="#00b4ff" strokeWidth="2" />
            <line x1={175} y1={160} x2={175} y2={170} stroke="#00b4ff" strokeWidth="2" />
            <line x1={175} y1={170} x2={180} y2={170} stroke="#00b4ff" strokeWidth="2" />

            {/* Wiring - B (Bottom Input) */}
            <line x1={40} y1={120} x2={130} y2={120} stroke="#00b4ff" strokeWidth="2" /> {/* B start */}
            <line x1={130} y1={120} x2={130} y2={100} stroke="#00b4ff" strokeWidth="2" /> {/* Up to XOR Bottom */}
            <line x1={130} y1={100} x2={180} y2={100} stroke="#00b4ff" strokeWidth="2" /> {/* To XOR Bottom */}

            <line x1={60} y1={120} x2={60} y2={190} stroke="#00b4ff" strokeWidth="2" /> {/* Branch down */}
            <line x1={60} y1={190} x2={180} y2={190} stroke="#00b4ff" strokeWidth="2" /> {/* To AND Bottom */}

            <ConnectionDot x={60} y={120} />
            <circle cx={40} cy={120} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" /> {/* Input Terminal B */}

            {/* Outputs */}
            {/* XOR Output */}
            <line x1={240} y1={90} x2={300} y2={90} stroke="#00b4ff" strokeWidth="2" />
            <circle cx={300} cy={90} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" />
            <Label x={310} y={95} text="Difference" align="start" />

            {/* AND Output */}
            <line x1={240} y1={180} x2={300} y2={180} stroke="#00b4ff" strokeWidth="2" />
            <circle cx={300} cy={180} r="3" fill="none" stroke="#00b4ff" strokeWidth="2" />
            <Label x={310} y={185} text="Borrow" align="start" />
          </g>
        );

      case 'full-subtractor':
        return (
          <g>
            <Label x={20} y={80} text="A" />
            <Label x={20} y={120} text="B" />
            <Label x={20} y={160} text="Bin" />

            {/* First Half Subtractor (XOR1 for A, B) */}
            <XORGate x={120} y={100} width={50} height={40} inputs={['', '']} output="" hideWires={true} showLabel={false} />
            {drawWire(30, 80, 120, 90)}
            {drawWire(30, 120, 120, 110)}

            {/* NOT for A (for Borrow) */}
            <ConnectionDot x={60} y={80} /> {drawWire(60, 80, 120, 170)}
            <NOTGate x={120} y={160} width={40} height={30} input="" output="" showLabel={false} hideWires={true} />

            {/* AND1 (A'B) */}
            <ConnectionDot x={50} y={120} /> {drawWire(50, 120, 170, 190)}
            {drawWire(160, 160, 170, 180)}
            <ANDGate x={170} y={180} width={50} height={40} inputs={['', '']} output="" hideWires={true} showLabel={false} />

            {/* Second Half Subtractor (XOR2 for (A XOR B), Bin) */}
            <XORGate x={250} y={130} width={50} height={40} inputs={['', '']} output="" hideWires={true} showLabel={false} />
            {drawWire(170, 100, 250, 120)} {/* Output of XOR1 -> XOR2 */}
            {drawWire(30, 160, 250, 140)} {/* Bin -> XOR2 */}

            {/* NOT for (A XOR B) (for Borrow) */}
            <ConnectionDot x={190} y={100} /> {drawWire(190, 100, 250, 210)}
            <NOTGate x={250} y={200} width={40} height={30} input="" output="" showLabel={false} hideWires={true} />

            {/* AND2 ((A XOR B)' Bin) */}
            <ConnectionDot x={100} y={160} /> {drawWire(100, 160, 300, 230)}
            {drawWire(290, 200, 300, 220)}
            <ANDGate x={300} y={220} width={50} height={40} inputs={['', '']} output="" hideWires={true} showLabel={false} />

            {/* OR Gate (Borrow Out) */}
            <ORGate x={380} y={200} width={50} height={40} inputs={['', '']} output="" hideWires={true} showLabel={false} />
            {drawWire(220, 180, 380, 190)} {/* AND1 -> OR */}
            {drawWire(350, 220, 380, 210)} {/* AND2 -> OR */}

            {/* Outputs */}
            {drawWire(300, 130, 450, 130)}
            <Label x={460} y={135} text="DIFF" align="start" />
            {drawWire(430, 200, 450, 200)}
            <Label x={460} y={205} text="BORROW" align="start" />
          </g>
        );

      case 'mux4to1':
      case '4:1 mux':
        return (
          <g>
            {/* Select Lines S1, S0 */}
            <Label x={150} y={30} text="S1" /> <line x1={150} y1={40} x2={150} y2={300} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
            <Label x={250} y={30} text="S0" /> <line x1={250} y1={40} x2={250} y2={300} stroke="#334155" strokeWidth="1" strokeDasharray="4" />

            {/* NOT Gates for Selects */}
            <NOTGate x={180} y={60} width={30} height={20} input="" output="" hideWires={true} showLabel={false} />
            <ConnectionDot x={150} y={60} /> {drawWire(150, 60, 180, 60)}
            <line x1={210} y1={60} x2={210} y2={300} stroke="#334155" strokeWidth="1" strokeDasharray="4" /> {/* S1' */}

            <NOTGate x={280} y={60} width={30} height={20} input="" output="" hideWires={true} showLabel={false} />
            <ConnectionDot x={250} y={60} /> {drawWire(250, 60, 280, 60)}
            <line x1={310} y1={60} x2={310} y2={300} stroke="#334155" strokeWidth="1" strokeDasharray="4" /> {/* S0' */}

            {/* AND Gates */}
            {[0, 1, 2, 3].map((i) => {
              const y = 100 + i * 50;
              return (
                <g key={i}>
                  <Label x={50} y={y + 5} text={`D${i}`} align="end" />
                  <ANDGate x={350} y={y} width={40} height={30} inputs={['', '', '']} output="" hideWires={true} showLabel={false} />
                  {drawWire(60, y, 350, y)} {/* Data Input */}
                </g>
              )
            })}

            {/* Logic Connections (Manually mapped for visual clarity) */}
            {/* D0: S1' S0' */} <ConnectionDot x={210} y={90} /> {drawWire(210, 90, 350, 90)} <ConnectionDot x={310} y={110} /> {drawWire(310, 110, 350, 110)}
            {/* D1: S1' S0  */} <ConnectionDot x={210} y={140} /> {drawWire(210, 140, 350, 140)} <ConnectionDot x={250} y={160} /> {drawWire(250, 160, 350, 160)}
            {/* D2: S1  S0' */} <ConnectionDot x={150} y={190} /> {drawWire(150, 190, 350, 190)} <ConnectionDot x={310} y={210} /> {drawWire(310, 210, 350, 210)}
            {/* D3: S1  S0  */} <ConnectionDot x={150} y={240} /> {drawWire(150, 240, 350, 240)} <ConnectionDot x={250} y={260} /> {drawWire(250, 260, 350, 260)}

            {/* OR Gate */}
            <ORGate x={450} y={175} width={50} height={150} inputs={['', '', '', '']} output="" hideWires={true} showLabel={false} />
            {drawWire(390, 100, 450, 140)}
            {drawWire(390, 150, 450, 160)}
            {drawWire(390, 200, 450, 190)}
            {drawWire(390, 250, 450, 210)}

            <Label x={520} y={180} text="Y (Output)" align="start" />
            {drawWire(500, 175, 520, 175)}
          </g>
        );

      case 'decoder2to4':
      case '2:4 decoder':
        return (
          <g>
            {/* Inputs A1, A0 */}
            <Label x={50} y={50} text="A1" /> <line x1={50} y1={60} x2={50} y2={350} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
            <Label x={150} y={50} text="A0" /> <line x1={150} y1={60} x2={150} y2={350} stroke="#334155" strokeWidth="1" strokeDasharray="4" />

            {/* NOT Gates */}
            <NOTGate x={80} y={80} width={30} height={20} input="" output="" showLabel={false} hideWires={true} />
            <ConnectionDot x={50} y={80} /> {drawWire(50, 80, 80, 80)}
            <line x1={110} y1={80} x2={110} y2={350} stroke="#334155" strokeWidth="1" strokeDasharray="4" /> {/* A1' */}

            <NOTGate x={180} y={80} width={30} height={20} input="" output="" showLabel={false} hideWires={true} />
            <ConnectionDot x={150} y={80} /> {drawWire(150, 80, 180, 80)}
            <line x1={210} y1={80} x2={210} y2={350} stroke="#334155" strokeWidth="1" strokeDasharray="4" /> {/* A0' */}

            {/* AND Gates */}
            {[0, 1, 2, 3].map((i) => {
              const y = 120 + i * 60;
              return (
                <g key={i}>
                  <ANDGate x={250} y={y} width={40} height={30} inputs={['', '']} output="" showLabel={false} hideWires={true} />
                  {drawWire(290, y, 350, y)}
                  <Label x={360} y={y + 5} text={`Y${i}`} align="start" />
                </g>
              )
            })}

            {/* Connections */}
            {/* Y0 = A1'A0' */}
            <ConnectionDot x={110} y={110} /> {drawWire(110, 110, 250, 110)}
            <ConnectionDot x={210} y={130} /> {drawWire(210, 130, 250, 130)}

            {/* Y1 = A1'A0 */}
            <ConnectionDot x={110} y={170} /> {drawWire(110, 170, 250, 170)}
            <ConnectionDot x={150} y={190} /> {drawWire(150, 190, 250, 190)}

            {/* Y2 = A1A0' */}
            <ConnectionDot x={50} y={230} /> {drawWire(50, 230, 250, 230)}
            <ConnectionDot x={210} y={250} /> {drawWire(210, 250, 250, 250)}

            {/* Y3 = A1A0 */}
            <ConnectionDot x={50} y={290} /> {drawWire(50, 290, 250, 290)}
            <ConnectionDot x={150} y={310} /> {drawWire(150, 310, 250, 310)}
          </g>
        );

      // --- NEW SEQUENTIAL CIRCUITS (Requested) ---

      case 'sr-latch':
      case 'latch':
        return (
          <g>
            <Label x={50} y={100} text="S" align="end" />
            <Label x={50} y={200} text="R" align="end" />

            {/* Cross-coupled NOR Gates */}
            <NORGate x={150} y={100} width={60} height={50} inputs={['', '']} output="" hideWires={true} showLabel={false} />
            <NORGate x={150} y={200} width={60} height={50} inputs={['', '']} output="" hideWires={true} showLabel={false} />

            {/* Inputs */}
            {drawWire(60, 90, 150, 90)}
            {drawWire(60, 210, 150, 210)}

            {/* Feedback Loops */}
            {drawWire(210, 100, 250, 100)} {/* Q */}
            {drawWire(210, 200, 250, 200)} {/* Q' */}

            <path d="M 230 100 L 230 150 L 120 150 L 120 190 L 150 190" fill="none" stroke="#00b4ff" strokeWidth="2" />
            <path d="M 230 200 L 230 150 L 120 150 L 120 110 L 150 110" fill="none" stroke="#00b4ff" strokeWidth="2" />
            <ConnectionDot x={230} y={100} />
            <ConnectionDot x={230} y={200} />

            <Label x={260} y={105} text="Q" align="start" />
            <Label x={260} y={205} text="Q'" align="start" />
          </g>
        );

      case 'd-flip-flop':
        return (
          <g>
            <Label x={50} y={100} text="D" align="end" />
            <Label x={50} y={150} text="CLK" align="end" />

            {/* Logic Symbol for D-FF (Standard Representation) */}
            <rect x={150} y={80} width={100} height={120} fill="none" stroke="#00b4ff" strokeWidth="2" />

            {/* Inputs */}
            {drawWire(60, 100, 150, 100)}
            {drawWire(60, 150, 150, 150)}
            <path d="M 150 140 L 160 150 L 150 160" fill="none" stroke="#00b4ff" strokeWidth="2" /> {/* Clock triangle */}

            <Label x={165} y={105} text="D" align="start" />
            <Label x={165} y={155} text=">" align="start" />
            <Label x={235} y={105} text="Q" align="end" />
            <Label x={235} y={185} text="Q'" align="end" />

            {/* Outputs */}
            {drawWire(250, 100, 300, 100)}
            {drawWire(250, 180, 300, 180)}

            <Label x={310} y={105} text="Q" align="start" />
            <Label x={310} y={185} text="Q'" align="start" />
          </g>
        );

      case 'register':
      case 'siso-register':
        // 4-bit SISO Shift Register
        return (
          <g>
            <Label x={50} y={100} text="Serial In" align="end" />
            <Label x={50} y={200} text="Clock" align="end" />
            {drawWire(60, 200, 480, 200)} {/* Common Clock Line */}

            {[0, 1, 2, 3].map(i => {
              const x = 100 + i * 110;
              return (
                <g key={i}>
                  {/* D-FF Block */}
                  <rect x={x} y={80} width={60} height={80} fill="none" stroke="#00b4ff" strokeWidth="2" />
                  <text x={x + 30} y={120} fill="#00b4ff" fontSize="10" textAnchor="middle">D-FF {i}</text>

                  {/* Clock Connection */}
                  <ConnectionDot x={x + 10} y={200} />
                  {drawWire(x + 10, 200, x + 10, 160)}
                  <path d={`M ${x} 150 L ${x + 10} 160 L ${x + 20} 150`} fill="none" stroke="#00b4ff" strokeWidth="1" />

                  {/* Connection from prev Stage */}
                  {i === 0 ? drawWire(60, 100, x, 100) : drawWire(x - 50, 100, x, 100)}
                </g>
              )
            })}

            {/* Output */}
            {drawWire(500, 100, 550, 100)}
            <Label x={560} y={105} text="Serial Out" align="start" />
          </g>
        );

      default:
        return (
          <text x={width / 2} y={height / 2} fill="#00b4ff" textAnchor="middle">
            Circuit for {type} coming soon
          </text>
        );
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
