export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

export const topics: Topic[] = [
  {
    id: 'input-output',
    title: 'Input/Output',
    description: 'Learn how to read and write data in Java',
    icon: '📥',
    href: '/topics/input-output',
  },
  {
    id: 'operators',
    title: 'Operators',
    description: 'Arithmetic, logical, and relational operators',
    icon: '🔢',
    href: '/topics/operators',
  },
  {
    id: 'conditionals',
    title: 'Conditionals',
    description: 'if, else, switch statements',
    icon: '🔀',
    href: '/topics/conditionals',
  },
  {
    id: 'loops',
    title: 'Loops',
    description: 'for, while, do-while loops',
    icon: '🔁',
    href: '/topics/loops',
  },
  {
    id: 'nested-loops',
    title: 'Nested Loops',
    description: 'Loops within loops',
    icon: '🌀',
    href: '/topics/nested-loops',
  },
  {
    id: 'patterns',
    title: 'Patterns',
    description: 'Star, number, and alphabet patterns',
    icon: '✨',
    href: '/topics/patterns',
  },
  {
    id: 'arrays1d',
    title: '1D Arrays',
    description: 'Single-dimensional arrays',
    icon: '📊',
    href: '/topics/arrays1d',
  },
  {
    id: 'arrays2d',
    title: '2D Arrays',
    description: 'Two-dimensional arrays',
    icon: '📈',
    href: '/topics/arrays2d',
  },
  {
    id: 'methods',
    title: 'Methods',
    description: 'Functions and methods in Java',
    icon: '⚙️',
    href: '/topics/methods',
  },
  {
    id: 'encapsulation',
    title: 'Encapsulation',
    description: 'Data hiding and access modifiers',
    icon: '🔒',
    href: '/topics/encapsulation',
  },
]

