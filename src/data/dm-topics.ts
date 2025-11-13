export interface DMTopic {
  id: string
  title: string
  description: string
  icon: string
  href: string
  session: number
  co: 'CO-1' | 'CO-2'
}

export const dmTopics: DMTopic[] = [
  // CO-1 — Fundamentals of Discrete Mathematics
  {
    id: 'introduction-to-sets',
    title: 'Introduction to Sets',
    description: 'Definition of sets, types of sets, set operations, and Venn diagrams',
    icon: '📊',
    href: '/subjects/discrete-mathematics/topics/introduction-to-sets',
    session: 1,
    co: 'CO-1',
  },
  {
    id: 'relations-and-properties',
    title: 'Relations & Their Properties',
    description: 'Relation definition, types (reflexive, symmetric, transitive, equivalence), and representations',
    icon: '🔗',
    href: '/subjects/discrete-mathematics/topics/relations-and-properties',
    session: 3,
    co: 'CO-1',
  },
  {
    id: 'functions-and-types',
    title: 'Functions & Types of Functions',
    description: 'Domain, codomain, range, injective, surjective, bijective functions',
    icon: '⚙️',
    href: '/subjects/discrete-mathematics/topics/functions-and-types',
    session: 1,
    co: 'CO-1',
  },
  {
    id: 'graphs-of-functions',
    title: 'Introduction to Graphs of Functions',
    description: 'Graph representations, ceiling, floor, Boolean, and exponential functions',
    icon: '📈',
    href: '/subjects/discrete-mathematics/topics/graphs-of-functions',
    session: 6,
    co: 'CO-1',
  },
  {
    id: 'inverse-composite-functions',
    title: 'Inverse & Composite Functions',
    description: 'Finding inverses, verifying invertibility, and composite functions',
    icon: '🔄',
    href: '/subjects/discrete-mathematics/topics/inverse-composite-functions',
    session: 5,
    co: 'CO-1',
  },
  {
    id: 'properties-of-relations',
    title: 'Properties of Relations',
    description: 'Equivalence relations, partial orders, posets, chains, and antichains',
    icon: '🔐',
    href: '/subjects/discrete-mathematics/topics/properties-of-relations',
    session: 4,
    co: 'CO-1',
  },
  {
    id: 'lattices-hasse-diagrams',
    title: 'Lattices & Hasse Diagrams',
    description: 'Lattice definition, meet & join, distributive/modular/Boolean lattices',
    icon: '📐',
    href: '/subjects/discrete-mathematics/topics/lattices-hasse-diagrams',
    session: 7,
    co: 'CO-1',
  },
  // CO-2 — Logic, Logical Reasoning & Proof Methods
  {
    id: 'propositional-logic',
    title: 'Propositional Logic',
    description: 'Sentence vs proposition, logical operators, compound propositions',
    icon: '💭',
    href: '/subjects/discrete-mathematics/topics/propositional-logic',
    session: 7,
    co: 'CO-2',
  },
  {
    id: 'truth-tables',
    title: 'Truth Tables & Operators',
    description: 'Negation, conjunction, disjunction, conditional, biconditional truth tables',
    icon: '📋',
    href: '/subjects/discrete-mathematics/topics/truth-tables',
    session: 7,
    co: 'CO-2',
  },
  {
    id: 'logical-equivalence',
    title: 'Logical Equivalence',
    description: 'Laws of logical equivalence, converse, inverse, contrapositive',
    icon: '⚖️',
    href: '/subjects/discrete-mathematics/topics/logical-equivalence',
    session: 8,
    co: 'CO-2',
  },
  {
    id: 'rules-of-inference',
    title: 'Rules of Inference',
    description: 'Modus Ponens, Modus Tollens, hypothetical and disjunctive syllogism',
    icon: '🧠',
    href: '/subjects/discrete-mathematics/topics/rules-of-inference',
    session: 9,
    co: 'CO-2',
  },
  {
    id: 'predicates-quantifiers',
    title: 'Predicates & Quantifiers',
    description: 'Universal (∀) and existential (∃) quantifiers, translating English to logic',
    icon: '🔍',
    href: '/subjects/discrete-mathematics/topics/predicates-quantifiers',
    session: 11,
    co: 'CO-2',
  },
  {
    id: 'nested-quantifiers',
    title: 'Nested Quantifiers',
    description: 'Understanding nested quantifiers, domain definitions, predicate functions',
    icon: '🌀',
    href: '/subjects/discrete-mathematics/topics/nested-quantifiers',
    session: 11,
    co: 'CO-2',
  },
  {
    id: 'proof-as-quantified-statement',
    title: 'Proof as Quantified Statement',
    description: 'Direct proof, exhaustion, method of cases, constructive and non-constructive proofs',
    icon: '✅',
    href: '/subjects/discrete-mathematics/topics/proof-as-quantified-statement',
    session: 10,
    co: 'CO-2',
  },
]

export const co1Topics = dmTopics.filter(topic => topic.co === 'CO-1')
export const co2Topics = dmTopics.filter(topic => topic.co === 'CO-2')
