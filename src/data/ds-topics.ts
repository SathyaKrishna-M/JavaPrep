export interface Topic {
    id: string
    title: string
    description: string
    icon: string
    href: string
    co?: string
}

export const topics: Topic[] = [
    // CO1 — Foundations, Algorithm Analysis, Searching & Sorting
    {
        id: 'intro-data-structures',
        title: '1. Introduction to Data Structures',
        description: 'Definition, classification (Primitive/Non-Primitive, Linear/Non-Linear, Static/Dynamic), ADTs, and applications',
        icon: '📚',
        href: '/subjects/data-structures/topics/CO1/intro-data-structures',
        co: 'CO1',
    },
    {
        id: 'mathematical-background',
        title: '2. Mathematical Background',
        description: 'Logarithms, summations, growth of functions, and recurrence relations for algorithm analysis',
        icon: 'ab',
        href: '/subjects/data-structures/topics/CO1/mathematical-background',
        co: 'CO1',
    },
    {
        id: 'algorithm-analysis',
        title: '3. Algorithm Analysis',
        description: 'Time & Space Complexity, Best/Average/Worst case analysis, Asymptotic Notations (Big-O, Ω, Θ), running time calculations',
        icon: '⏱️',
        href: '/subjects/data-structures/topics/CO1/algorithm-analysis',
        co: 'CO1',
    },
    {
        id: 'searching-algorithms',
        title: '4. Searching Algorithms',
        description: 'Linear Search, Binary Search (Iterative/Recursive), and complexity analysis',
        icon: '🔍',
        href: '/subjects/data-structures/topics/CO1/searching-algorithms',
        co: 'CO1',
    },
    {
        id: 'sorting-techniques',
        title: '5. Sorting Techniques',
        description: 'Bubble, Selection, Insertion, Merge, Quick Sort, stability, in-place sorting, and complexity analysis',
        icon: '📶',
        href: '/subjects/data-structures/topics/CO1/sorting-techniques',
        co: 'CO1',
    },

    // CO2 — Lists & Linked Lists (ADT-based)
    {
        id: 'list-adt',
        title: '1. List ADT & Introduction',
        description: 'Abstract Data Types, List ADT, Array vs Linked List implementation trade-offs',
        icon: '📝',
        href: '/subjects/data-structures/topics/CO2/list-adt',
        co: 'CO2',
    },
    {
        id: 'singly-linked-list',
        title: '2. Singly Linked List',
        description: 'Node structure, creation, insertion, deletion, searching, reversing, cycle detection',
        icon: '➡️',
        href: '/subjects/data-structures/topics/CO2/singly-linked-list',
        co: 'CO2',
    },
    {
        id: 'doubly-linked-list',
        title: '3. Doubly Linked List',
        description: 'Two-way traversal, insertion, deletion, searching, reversing strategies',
        icon: '↔️',
        href: '/subjects/data-structures/topics/CO2/doubly-linked-list',
        co: 'CO2',
    },
    {
        id: 'circular-linked-list',
        title: '4. Circular Linked List',
        description: 'Circular Singly & Doubly Lists, Round-Robin scheduling applications',
        icon: '🔄',
        href: '/subjects/data-structures/topics/CO2/circular-linked-list',
        co: 'CO2',
    },
    {
        id: 'polynomial-adt',
        title: '5. Polynomial ADT',
        description: 'Representation, addition, and multiplication of polynomials using Linked Lists',
        icon: '➗',
        href: '/subjects/data-structures/topics/CO2/polynomial-adt',
        co: 'CO2',
    },

    // CO3 — Stacks, Queues, Heaps & Priority Queues
    {
        id: 'stack-adt',
        title: '1. Stack ADT & Operations',
        description: 'LIFO principle, push/pop operations, array vs linked list implementation',
        icon: '📚',
        href: '/subjects/data-structures/topics/CO3/stack-adt',
        co: 'CO3',
    },
    {
        id: 'expression-evaluation',
        title: '2. Expression Evaluation',
        description: 'Infix to Postfix conversion, Postfix evaluation, Balancing symbols/parentheses',
        icon: '🔢',
        href: '/subjects/data-structures/topics/CO3/expression-evaluation',
        co: 'CO3',
    },
    {
        id: 'queue-adt',
        title: '3. Queue ADT & Operations',
        description: 'FIFO principle, enqueue/dequeue, array vs linked list implementation',
        icon: '🚶',
        href: '/subjects/data-structures/topics/CO3/queue-adt',
        co: 'CO3',
    },
    {
        id: 'circular-queue',
        title: '4. Circular Queue',
        description: 'Overcoming linear queue limitations, modular arithmetic',
        icon: '⭕',
        href: '/subjects/data-structures/topics/CO3/circular-queue',
        co: 'CO3',
    },
    {
        id: 'deque',
        title: '5. Deque (Double Ended Queue)',
        description: 'Insertion and deletion at both ends, input-restricted vs output-restricted',
        icon: '↔️',
        href: '/subjects/data-structures/topics/CO3/deque',
        co: 'CO3',
    },
    {
        id: 'priority-queues-heaps',
        title: '6. Priority Queues & Heaps',
        description: 'Min/Max Heap model, Heapify, Heap Sort, Priority Queue applications',
        icon: '🔝',
        href: '/subjects/data-structures/topics/CO3/priority-queues-heaps',
        co: 'CO3',
    },

    // CO4 — Hashing Techniques & Hash Tables
    {
        id: 'hashing-introduction',
        title: '1. Introduction to Hashing',
        description: 'Hash tables, keys, values, and the need for constant time access',
        icon: '#️⃣',
        href: '/subjects/data-structures/topics/CO4/hashing-introduction',
        co: 'CO4',
    },
    {
        id: 'hash-functions',
        title: '2. Hash Functions',
        description: 'Division, Mid-square, Folding, Multiplication methods',
        icon: 'ƒ',
        href: '/subjects/data-structures/topics/CO4/hash-functions',
        co: 'CO4',
    },
    {
        id: 'collision-resolution',
        title: '3. Collision Resolution',
        description: 'Separate Chaining vs Open Addressing (Linear/Quadratic Probing, Double Hashing)',
        icon: '💥',
        href: '/subjects/data-structures/topics/CO4/collision-resolution',
        co: 'CO4',
    },
    {
        id: 'rehashing-extendible',
        title: '4. Rehashing & Extendible Hashing',
        description: 'Dynamic resizing, load factor, and conceptual extendible hashing',
        icon: '🔁',
        href: '/subjects/data-structures/topics/CO4/rehashing-extendible',
        co: 'CO4',
    },

    // CO5 — Applications of Linear Data Structures
    {
        id: 'linear-ds-applications',
        title: '1. Real-World Applications',
        description: 'Practical use cases of Arrays, Lists, Stacks, and Queues effectively',
        icon: '🌍',
        href: '/subjects/data-structures/topics/CO5/linear-ds-applications',
        co: 'CO5',
    },
    {
        id: 'comparative-evaluation',
        title: '2. Comparative Evaluation',
        description: 'Choosing the right Linear DS based on time/space trade-offs',
        icon: '⚖️',
        href: '/subjects/data-structures/topics/CO5/comparative-evaluation',
        co: 'CO5',
    },

    // CO6 — Skill-based Implementation & Mini Projects
    {
        id: 'micro-projects',
        title: '1. Micro-Projects',
        description: 'Student Search System, Benchmarking, Library Book Finder, Playlist Management, etc.',
        icon: '💻',
        href: '/subjects/data-structures/topics/CO6/micro-projects',
        co: 'CO6',
    },
    {
        id: 'benchmarking-performance',
        title: '2. Benchmarking & Performance',
        description: 'Measuring actual runtime of algorithms for different input sizes',
        icon: '🏎️',
        href: '/subjects/data-structures/topics/CO6/benchmarking-performance',
        co: 'CO6',
    },
]
