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
]

