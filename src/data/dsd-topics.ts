export interface DSDTopic {
  id: string
  title: string
  description: string
  icon: string
  href: string
  session: number
}

export const dsdTopics: DSDTopic[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    description: 'Number systems, logic gates, and basic concepts',
    icon: '🔢',
    href: '/subjects/digital-system-design/topics/introduction',
    session: 1,
  },
  {
    id: 'boolean-algebra',
    title: 'Boolean Algebra',
    description: 'Laws, theorems, and algebraic manipulation',
    icon: '📐',
    href: '/subjects/digital-system-design/topics/boolean-algebra',
    session: 2,
  },
  {
    id: 'sop-pos-optimization',
    title: 'SOP & POS Optimization',
    description: 'K-maps and simplification techniques',
    icon: '🗺️',
    href: '/subjects/digital-system-design/topics/sop-pos-optimization',
    session: 3,
  },
  {
    id: 'adders-subtractors',
    title: 'Adders & Subtractors',
    description: 'Half & full adders/subtractors',
    icon: '➕',
    href: '/subjects/digital-system-design/topics/adders-subtractors',
    session: 4,
  },
  {
    id: 'mux-demux',
    title: 'MUX & DEMUX',
    description: 'Multiplexers and demultiplexers',
    icon: '🔀',
    href: '/subjects/digital-system-design/topics/mux-demux',
    session: 5,
  },
  {
    id: 'encoder-decoder',
    title: 'Encoder & Decoder',
    description: 'Encoders and decoders',
    icon: '🔐',
    href: '/subjects/digital-system-design/topics/encoder-decoder',
    session: 6,
  },
  {
    id: 'pld-prom',
    title: 'PLD & PROM',
    description: 'Programmable Logic Devices and PROM',
    icon: '💾',
    href: '/subjects/digital-system-design/topics/pld-prom',
    session: 7,
  },
  {
    id: 'pla-pal',
    title: 'PLA & PAL',
    description: 'Advanced PLD comparison',
    icon: '⚡',
    href: '/subjects/digital-system-design/topics/pla-pal',
    session: 8,
  },
  {
    id: 'cpld-fpga',
    title: 'CPLD & FPGA',
    description: 'CPLD and FPGA architecture',
    icon: '🔧',
    href: '/subjects/digital-system-design/topics/cpld-fpga',
    session: 9,
  },
  {
    id: 'reversible-gates',
    title: 'Reversible Gates',
    description: 'Reversible logic gates',
    icon: '🔄',
    href: '/subjects/digital-system-design/topics/reversible-gates',
    session: 11,
  },
  {
    id: 'microcomputer-architecture',
    title: 'Microcomputer Architecture',
    description: 'CPU architecture, buses, registers, and instruction cycle',
    icon: '💻',
    href: '/subjects/digital-system-design/topics/microcomputer-architecture',
    session: 12,
  },
  {
    id: 'operands-addressing-modes',
    title: 'Operands and Addressing Modes',
    description: 'Operand types and addressing modes (immediate, register, direct, indirect, indexed, etc.)',
    icon: '📍',
    href: '/subjects/digital-system-design/topics/operands-addressing-modes',
    session: 13,
  },
  {
    id: 'instruction-formats',
    title: 'Instruction Formats',
    description: 'Zero-address, one-address, two-address, three-address, stack-based, accumulator-based, register-based formats',
    icon: '📋',
    href: '/subjects/digital-system-design/topics/instruction-formats',
    session: 14,
  },
  {
    id: 'instruction-set-machine-cycle',
    title: 'Instruction Set and Machine Cycle',
    description: 'Instruction classification, machine cycles (fetch, memory read/write, I/O read/write, interrupt)',
    icon: '⚙️',
    href: '/subjects/digital-system-design/topics/instruction-set-machine-cycle',
    session: 15,
  },
  {
    id: 'subroutine-call-return',
    title: 'Subroutine Call and Return Mechanism',
    description: 'Subroutine concepts, call mechanism, return mechanism, call stack, stack diagrams',
    icon: '📞',
    href: '/subjects/digital-system-design/topics/subroutine-call-return',
    session: 16,
  },
  {
    id: 'important-questions',
    title: 'Important Questions',
    description: 'Selected important questions with detailed solutions',
    icon: '📚',
    href: '/subjects/digital-system-design/topics/important-questions',
    session: 0,
  },
]

