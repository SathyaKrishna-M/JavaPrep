export interface SearchItem {
  id: string
  title: string
  type: 'topic' | 'subtopic' | 'question' | 'important_question' | 'pattern'
  subject: 'Java' | 'DSD' | 'DM'
  content: string
  url: string
  anchorId?: string
}

// Java Topics
const javaTopics = [
  { id: 'input-output', title: 'Input/Output', description: 'Learn how to read and write data in Java', href: '/topics/input-output' },
  { id: 'operators', title: 'Operators', description: 'Arithmetic, logical, and relational operators', href: '/topics/operators' },
  { id: 'conditionals', title: 'Conditionals', description: 'if, else, switch statements', href: '/topics/conditionals' },
  { id: 'loops', title: 'Loops', description: 'for, while, do-while loops', href: '/topics/loops' },
  { id: 'nested-loops', title: 'Nested Loops', description: 'Loops within loops', href: '/topics/nested-loops' },
  { id: 'patterns', title: 'Patterns', description: 'Star, number, and alphabet patterns', href: '/topics/patterns' },
  { id: 'arrays1d', title: '1D Arrays', description: 'Single-dimensional arrays', href: '/topics/arrays1d' },
  { id: 'arrays2d', title: '2D Arrays', description: 'Two-dimensional arrays', href: '/topics/arrays2d' },
  { id: 'methods', title: 'Methods', description: 'Functions and methods in Java', href: '/topics/methods' },
  { id: 'encapsulation', title: 'Encapsulation', description: 'Data hiding and access modifiers', href: '/topics/encapsulation' },
]

// DSD Topics
const dsdTopics = [
  { id: 'introduction', title: 'Introduction', description: 'Number systems, logic gates, and basic concepts', href: '/subjects/digital-system-design/topics/introduction' },
  { id: 'boolean-algebra', title: 'Boolean Algebra', description: 'Laws, theorems, and algebraic manipulation', href: '/subjects/digital-system-design/topics/boolean-algebra' },
  { id: 'sop-pos-optimization', title: 'SOP & POS Optimization', description: 'K-maps and simplification techniques', href: '/subjects/digital-system-design/topics/sop-pos-optimization' },
  { id: 'adders-subtractors', title: 'Adders & Subtractors', description: 'Half & full adders/subtractors', href: '/subjects/digital-system-design/topics/adders-subtractors' },
  { id: 'mux-demux', title: 'MUX & DEMUX', description: 'Multiplexers and demultiplexers', href: '/subjects/digital-system-design/topics/mux-demux' },
  { id: 'encoder-decoder', title: 'Encoder & Decoder', description: 'Encoders and decoders', href: '/subjects/digital-system-design/topics/encoder-decoder' },
  { id: 'pld-prom', title: 'PLD & PROM', description: 'Programmable Logic Devices and PROM', href: '/subjects/digital-system-design/topics/pld-prom' },
  { id: 'pla-pal', title: 'PLA & PAL', description: 'Advanced PLD comparison', href: '/subjects/digital-system-design/topics/pla-pal' },
  { id: 'cpld-fpga', title: 'CPLD & FPGA', description: 'CPLD and FPGA architecture', href: '/subjects/digital-system-design/topics/cpld-fpga' },
  { id: 'reversible-gates', title: 'Reversible Gates', description: 'Reversible logic gates', href: '/subjects/digital-system-design/topics/reversible-gates' },
  { id: 'important-questions', title: 'Important Questions', description: 'Selected important questions with detailed solutions', href: '/subjects/digital-system-design/topics/important-questions' },
]

// DM Topics
const dmTopics = [
  { id: 'introduction-to-sets', title: 'Introduction to Sets', description: 'Definition of sets, types of sets, set operations, and Venn diagrams', href: '/subjects/discrete-mathematics/topics/introduction-to-sets' },
  { id: 'relations-and-properties', title: 'Relations & Their Properties', description: 'Relation definition, types (reflexive, symmetric, transitive, equivalence), and representations', href: '/subjects/discrete-mathematics/topics/relations-and-properties' },
  { id: 'functions-and-types', title: 'Functions & Types of Functions', description: 'Domain, codomain, range, injective, surjective, bijective functions', href: '/subjects/discrete-mathematics/topics/functions-and-types' },
  { id: 'graphs-of-functions', title: 'Introduction to Graphs of Functions', description: 'Graph representations, ceiling, floor, Boolean, and exponential functions', href: '/subjects/discrete-mathematics/topics/graphs-of-functions' },
  { id: 'inverse-composite-functions', title: 'Inverse & Composite Functions', description: 'Finding inverses, verifying invertibility, and composite functions', href: '/subjects/discrete-mathematics/topics/inverse-composite-functions' },
  { id: 'properties-of-relations', title: 'Properties of Relations', description: 'Equivalence relations, partial orders, posets, chains, and antichains', href: '/subjects/discrete-mathematics/topics/properties-of-relations' },
  { id: 'lattices-hasse-diagrams', title: 'Lattices & Hasse Diagrams', description: 'Lattice definition, meet & join, distributive/modular/Boolean lattices', href: '/subjects/discrete-mathematics/topics/lattices-hasse-diagrams' },
  { id: 'propositional-logic', title: 'Propositional Logic', description: 'Sentence vs proposition, logical operators, compound propositions', href: '/subjects/discrete-mathematics/topics/propositional-logic' },
  { id: 'truth-tables', title: 'Truth Tables & Operators', description: 'Negation, conjunction, disjunction, conditional, biconditional truth tables', href: '/subjects/discrete-mathematics/topics/truth-tables' },
  { id: 'logical-equivalence', title: 'Logical Equivalence', description: 'Laws of logical equivalence, converse, inverse, contrapositive', href: '/subjects/discrete-mathematics/topics/logical-equivalence' },
  { id: 'rules-of-inference', title: 'Rules of Inference', description: 'Modus Ponens, Modus Tollens, hypothetical and disjunctive syllogism', href: '/subjects/discrete-mathematics/topics/rules-of-inference' },
  { id: 'predicates-quantifiers', title: 'Predicates & Quantifiers', description: 'Universal (∀) and existential (∃) quantifiers, translating English to logic', href: '/subjects/discrete-mathematics/topics/predicates-quantifiers' },
  { id: 'nested-quantifiers', title: 'Nested Quantifiers', description: 'Understanding nested quantifiers, domain definitions, predicate functions', href: '/subjects/discrete-mathematics/topics/nested-quantifiers' },
  { id: 'proof-as-quantified-statement', title: 'Proof as Quantified Statement', description: 'Direct proof, exhaustion, method of cases, constructive and non-constructive proofs', href: '/subjects/discrete-mathematics/topics/proof-as-quantified-statement' },
]

// Java Explanation Sections
const javaSubtopicSections: SearchItem[] = [
  // Input/Output
  { id: 'io-scanner', title: 'Scanner Class', type: 'subtopic', subject: 'Java', content: 'Reading input using Scanner class', url: '/topics/input-output', anchorId: 'scanner-class' },
  { id: 'io-print', title: 'Print Statements', type: 'subtopic', subject: 'Java', content: 'System.out.println and System.out.print', url: '/topics/input-output', anchorId: 'print-statements' },
  
  // Operators
  { id: 'op-arithmetic', title: 'Arithmetic Operators', type: 'subtopic', subject: 'Java', content: 'Addition, subtraction, multiplication, division, modulus', url: '/topics/operators', anchorId: 'arithmetic-operators' },
  { id: 'op-relational', title: 'Relational Operators', type: 'subtopic', subject: 'Java', content: 'Comparison operators: ==, !=, <, >, <=, >=', url: '/topics/operators', anchorId: 'relational-operators' },
  { id: 'op-logical', title: 'Logical Operators', type: 'subtopic', subject: 'Java', content: 'AND (&&), OR (||), NOT (!)', url: '/topics/operators', anchorId: 'logical-operators' },
  
  // Conditionals
  { id: 'cond-if', title: 'If Statement', type: 'subtopic', subject: 'Java', content: 'Conditional execution with if statement', url: '/topics/conditionals', anchorId: 'if-statement' },
  { id: 'cond-if-else', title: 'If-Else Statement', type: 'subtopic', subject: 'Java', content: 'If-else conditional branching', url: '/topics/conditionals', anchorId: 'if-else-statement' },
  { id: 'cond-switch', title: 'Switch Statement', type: 'subtopic', subject: 'Java', content: 'Multi-way branching with switch case', url: '/topics/conditionals', anchorId: 'switch-statement' },
  
  // Loops
  { id: 'loop-for', title: 'For Loop', type: 'subtopic', subject: 'Java', content: 'Iterating with for loop', url: '/topics/loops', anchorId: 'for-loop' },
  { id: 'loop-while', title: 'While Loop', type: 'subtopic', subject: 'Java', content: 'Conditional iteration with while loop', url: '/topics/loops', anchorId: 'while-loop' },
  { id: 'loop-do-while', title: 'Do-While Loop', type: 'subtopic', subject: 'Java', content: 'Post-condition loop with do-while', url: '/topics/loops', anchorId: 'do-while-loop' },
  
  // Nested Loops
  { id: 'nested-intro', title: 'Introduction to Nested Loops', type: 'subtopic', subject: 'Java', content: 'Loops inside other loops', url: '/topics/nested-loops', anchorId: 'introduction-to-nested-loops' },
  { id: 'nested-pattern', title: 'Pattern Printing', type: 'subtopic', subject: 'Java', content: 'Printing patterns using nested loops', url: '/topics/nested-loops', anchorId: 'pattern-printing' },
  
  // Patterns
  { id: 'pattern-intro', title: 'Introduction to Patterns', type: 'pattern', subject: 'Java', content: 'Understanding pattern printing with nested loops', url: '/topics/patterns', anchorId: 'introduction-to-patterns' },
  { id: 'pattern-left', title: 'Left-Aligned Patterns', type: 'pattern', subject: 'Java', content: 'Left-aligned star, number, and alphabet patterns', url: '/topics/patterns', anchorId: 'left-aligned-patterns' },
  { id: 'pattern-inverted', title: 'Inverted Left-Aligned Patterns', type: 'pattern', subject: 'Java', content: 'Inverted left-aligned patterns', url: '/topics/patterns', anchorId: 'inverted-left-aligned-patterns' },
  { id: 'pattern-star', title: 'Star Patterns', type: 'pattern', subject: 'Java', content: 'Left-aligned and inverted star patterns', url: '/topics/patterns', anchorId: 'star-patterns' },
  { id: 'pattern-number', title: 'Number Patterns', type: 'pattern', subject: 'Java', content: 'Left-aligned and inverted number patterns', url: '/topics/patterns', anchorId: 'number-patterns' },
  { id: 'pattern-alphabet', title: 'Alphabet Patterns', type: 'pattern', subject: 'Java', content: 'Left-aligned and inverted alphabet patterns', url: '/topics/patterns', anchorId: 'alphabet-patterns' },
  { id: 'pattern-mixed', title: 'Mixed Patterns', type: 'pattern', subject: 'Java', content: 'Same number repeated, alternating characters', url: '/topics/patterns', anchorId: 'mixed-patterns' },
  
  // Arrays 1D
  { id: 'array1d-declare', title: 'Array Declaration and Initialization', type: 'subtopic', subject: 'Java', content: 'Declaring and initializing 1D arrays', url: '/topics/arrays1d', anchorId: 'array-declaration-and-initialization' },
  { id: 'array1d-access', title: 'Array Indexing and Access', type: 'subtopic', subject: 'Java', content: 'Accessing array elements using indices', url: '/topics/arrays1d', anchorId: 'array-indexing-and-access' },
  { id: 'array1d-traverse', title: 'Array Traversal', type: 'subtopic', subject: 'Java', content: 'Iterating through array elements', url: '/topics/arrays1d', anchorId: 'array-traversal' },
  { id: 'array1d-max-min', title: 'Finding Maximum and Minimum', type: 'subtopic', subject: 'Java', content: 'Finding largest and smallest elements', url: '/topics/arrays1d', anchorId: 'finding-maximum-and-minimum' },
  
  // Arrays 2D
  { id: 'array2d-intro', title: 'Introduction to 2D Arrays', type: 'subtopic', subject: 'Java', content: 'Two-dimensional arrays and matrices', url: '/topics/arrays2d', anchorId: 'introduction-to-2d-arrays' },
  { id: 'array2d-access', title: 'Accessing 2D Array Elements', type: 'subtopic', subject: 'Java', content: 'Accessing elements using row and column indices', url: '/topics/arrays2d', anchorId: 'accessing-2d-array-elements' },
  { id: 'array2d-traverse', title: 'Traversing 2D Arrays', type: 'subtopic', subject: 'Java', content: 'Iterating through 2D arrays with nested loops', url: '/topics/arrays2d', anchorId: 'traversing-2d-arrays' },
  { id: 'array2d-operations', title: 'Matrix Operations', type: 'subtopic', subject: 'Java', content: 'Matrix addition, subtraction, multiplication', url: '/topics/arrays2d', anchorId: 'matrix-operations' },
  
  // Methods
  { id: 'method-intro', title: 'Introduction to Methods', type: 'subtopic', subject: 'Java', content: 'Understanding methods and their benefits', url: '/topics/methods', anchorId: 'introduction-to-methods' },
  { id: 'method-params', title: 'Method Parameters and Return Types', type: 'subtopic', subject: 'Java', content: 'Methods with parameters and return values', url: '/topics/methods', anchorId: 'method-parameters-and-return-types' },
  { id: 'method-overload', title: 'Method Overloading', type: 'subtopic', subject: 'Java', content: 'Multiple methods with same name but different parameters', url: '/topics/methods', anchorId: 'method-overloading' },
  { id: 'method-static', title: 'Static vs Instance Methods', type: 'subtopic', subject: 'Java', content: 'Difference between static and instance methods', url: '/topics/methods', anchorId: 'static-vs-instance-methods' },
  
  // Encapsulation
  { id: 'encap-intro', title: 'Introduction to Encapsulation', type: 'subtopic', subject: 'Java', content: 'Data hiding and encapsulation principles', url: '/topics/encapsulation', anchorId: 'introduction-to-encapsulation' },
  { id: 'encap-modifiers', title: 'Access Modifiers', type: 'subtopic', subject: 'Java', content: 'private, default, protected, public modifiers', url: '/topics/encapsulation', anchorId: 'access-modifiers' },
  { id: 'encap-getter-setter', title: 'Getter and Setter Methods', type: 'subtopic', subject: 'Java', content: 'Controlled access to private variables', url: '/topics/encapsulation', anchorId: 'getter-and-setter-methods' },
  { id: 'encap-validation', title: 'Data Validation in Setters', type: 'subtopic', subject: 'Java', content: 'Validating data in setter methods', url: '/topics/encapsulation', anchorId: 'data-validation-in-setters' },
]

// Practice Questions (Sample - will be expanded)
const javaPracticeQuestions: SearchItem[] = [
  { id: 'pq-io-sum', title: 'Sum of Two Numbers', type: 'question', subject: 'Java', content: 'Write a program to read two numbers and display their sum', url: '/topics/input-output', anchorId: 'practice-0' },
  { id: 'pq-loops-factorial', title: 'Factorial of a Number', type: 'question', subject: 'Java', content: 'Find factorial using methods', url: '/topics/methods', anchorId: 'practice-0' },
  { id: 'pq-array-max', title: 'Find Maximum in Array', type: 'question', subject: 'Java', content: 'Find highest value in 1D array using methods', url: '/topics/arrays1d', anchorId: 'practice-1' },
  { id: 'pq-array-sum', title: 'Sum of Array Elements', type: 'question', subject: 'Java', content: 'Find sum of array elements using method', url: '/topics/arrays1d', anchorId: 'practice-3' },
  { id: 'pq-array-reverse', title: 'Reverse Array Elements', type: 'question', subject: 'Java', content: 'Reverse array elements using void method', url: '/topics/arrays1d', anchorId: 'practice-2' },
  { id: 'pq-array-bubble', title: 'Bubble Sort', type: 'question', subject: 'Java', content: 'Sort array using bubble sort technique', url: '/topics/arrays1d', anchorId: 'practice-4' },
  { id: 'pq-2d-sum', title: 'Sum of 2D Array', type: 'question', subject: 'Java', content: 'Find sum of 2D array elements using method', url: '/topics/arrays2d', anchorId: 'practice-3' },
  { id: 'pq-2d-diagonal', title: 'Sum of Principal Diagonal', type: 'question', subject: 'Java', content: 'Find sum of principal diagonal elements', url: '/topics/arrays2d', anchorId: 'practice-2' },
  { id: 'pq-encap-car', title: 'Car Class with Encapsulation', type: 'question', subject: 'Java', content: 'Create Car class with private attributes Regno, OwnerName, Model, FuelUsed, EngineNumber', url: '/topics/encapsulation', anchorId: 'practice-0' },
  { id: 'pq-encap-employee', title: 'Employee Class', type: 'question', subject: 'Java', content: 'Create Employee class with Id, name, designation, Salary', url: '/topics/encapsulation', anchorId: 'practice-7' },
  { id: 'pq-encap-bill', title: 'Bill Calculation Class', type: 'question', subject: 'Java', content: 'Create Bill class with discount and GST calculation', url: '/topics/encapsulation', anchorId: 'practice-6' },
  { id: 'pq-pattern-star', title: 'Left-Aligned Star Pattern', type: 'question', subject: 'Java', content: 'Print left-aligned star pattern for n rows', url: '/topics/patterns', anchorId: 'practice-0' },
  { id: 'pq-pattern-number', title: 'Floyd\'s Triangle', type: 'question', subject: 'Java', content: 'Print left-aligned number pattern (Floyd\'s Triangle)', url: '/topics/patterns', anchorId: 'practice-2' },
  { id: 'pq-pattern-alphabet', title: 'Alphabet Pattern', type: 'question', subject: 'Java', content: 'Print left-aligned alphabet pattern', url: '/topics/patterns', anchorId: 'practice-4' },
]

// DSD Important Questions
const dsdImportantQuestions: SearchItem[] = [
  { id: 'dsd-iq-1', title: 'Number System Conversion', type: 'important_question', subject: 'DSD', content: 'Convert (358)₁₀ into binary, octal and hexadecimal', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-1' },
  { id: 'dsd-iq-2', title: 'Binary to Decimal Conversion', type: 'important_question', subject: 'DSD', content: 'Convert (11010011)₂ into Decimal, octal and hexadecimal', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-2' },
  { id: 'dsd-iq-3', title: 'Logic Gate Implementation', type: 'important_question', subject: 'DSD', content: 'Implement logic gates and truth tables', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-3' },
  { id: 'dsd-iq-4', title: 'Boolean Algebra Simplification', type: 'important_question', subject: 'DSD', content: 'Simplify Boolean expressions using laws and theorems', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-4' },
  { id: 'dsd-iq-5', title: 'K-Map Optimization', type: 'important_question', subject: 'DSD', content: 'Optimize SOP and POS using K-maps', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-5' },
  { id: 'dsd-iq-6', title: 'Half and Full Adder', type: 'important_question', subject: 'DSD', content: 'Design half adder and full adder circuits', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-6' },
  { id: 'dsd-iq-7', title: 'MUX and DEMUX', type: 'important_question', subject: 'DSD', content: 'Multiplexer and demultiplexer design and applications', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-7' },
  { id: 'dsd-iq-8', title: 'Encoder and Decoder', type: 'important_question', subject: 'DSD', content: 'Encoder and decoder circuit implementation', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-8' },
]

// Build search index
export const searchIndex: SearchItem[] = [
  // Java Topics
  ...javaTopics.map(topic => ({
    id: topic.id,
    title: topic.title,
    type: 'topic' as const,
    subject: 'Java' as const,
    content: topic.description,
    url: topic.href,
  })),
  
  // DSD Topics
  ...dsdTopics.map(topic => ({
    id: topic.id,
    title: topic.title,
    type: 'topic' as const,
    subject: 'DSD' as const,
    content: topic.description,
    url: topic.href,
  })),
  
  // DM Topics
  ...dmTopics.map(topic => ({
    id: topic.id,
    title: topic.title,
    type: 'topic' as const,
    subject: 'DM' as const,
    content: topic.description,
    url: topic.href,
  })),
  
  // Java Subtopic Sections
  ...javaSubtopicSections,
  
  // Java Practice Questions
  ...javaPracticeQuestions,
  
  // DSD Important Questions
  ...dsdImportantQuestions,
]

// Trending searches
export const trendingSearches = [
  'Arrays',
  'Boolean Algebra',
  'Bubble Sort',
  'Patterns',
  'Relations & Functions',
  'Encapsulation',
  'Methods',
  'Loops',
  'K-Map',
  'Logic Gates',
]


