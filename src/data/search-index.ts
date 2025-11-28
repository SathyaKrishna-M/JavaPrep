export interface SearchItem {
  id: string
  title: string
  type: 'topic' | 'subtopic' | 'question' | 'important_question' | 'pattern'
  subject: 'Java' | 'DDCOA' | 'DM'
  content: string
  url: string
  anchorId?: string
  co?: string
}

// Java Topics (ordered by CO structure)
const javaTopics = [
  // CO1 — Basic Java Programming Constructs (BTL-2 → BTL-3)
  { id: 'variables-data-types', title: 'Variables and Data Types', description: 'Syntax, data types, variables, operators', href: '/topics/variables-data-types', co: 'CO1' },
  { id: 'operators', title: 'Operators', description: 'Arithmetic, logical, and relational operators', href: '/topics/operators', co: 'CO1' },
  { id: 'type-casting', title: 'Type Casting', description: 'Converting between different data types', href: '/topics/type-casting', co: 'CO1' },
  { id: 'input-output', title: 'Input/Output', description: 'Learn how to read and write data in Java', href: '/topics/input-output', co: 'CO1' },
  { id: 'conditionals', title: 'Conditionals', description: 'if, else, switch statements', href: '/topics/conditionals', co: 'CO1' },
  { id: 'loops', title: 'Loops', description: 'for, while, do-while loops', href: '/topics/loops', co: 'CO1' },
  { id: 'nested-loops', title: 'Nested Loops', description: 'Loops within loops', href: '/topics/nested-loops', co: 'CO1' },
  { id: 'dry-run-flow-tracing', title: 'Dry Run & Flow Tracing', description: 'Manually tracing code execution step-by-step', href: '/topics/dry-run-flow-tracing', co: 'CO1' },
  { id: 'debugging-techniques', title: 'Debugging Techniques', description: 'Finding and fixing errors in code', href: '/topics/debugging-techniques', co: 'CO1' },
  { id: 'patterns', title: 'Patterns', description: 'Star, number, and alphabet patterns', href: '/topics/patterns', co: 'CO1' },
  { id: 'problem-solving-methodology', title: 'Problem-Solving Methodology', description: 'Systematic approach to solving programming problems', href: '/topics/problem-solving-methodology', co: 'CO1' },
  { id: 'flowchart-design', title: 'Flowchart Design', description: 'Visual representation of algorithms using flowcharts', href: '/topics/flowchart-design', co: 'CO1' },
  
  // CO2 — Arrays & Algorithmic Problem Solving (BTL-2 → BTL-4)
  { id: 'arrays-memory-model', title: 'Arrays & Memory Model', description: 'How arrays are stored in memory, references, and memory allocation', href: '/topics/arrays-memory-model', co: 'CO2' },
  { id: 'arrays1d', title: '1D Arrays', description: 'Single-dimensional arrays - creation, traversal, memory layout', href: '/topics/arrays1d', co: 'CO2' },
  { id: 'searching-algorithms', title: 'Searching Algorithms', description: 'Linear search and binary search algorithms', href: '/topics/searching-algorithms', co: 'CO2' },
  { id: 'sorting-algorithms', title: 'Sorting Algorithms', description: 'Bubble, Selection, Insertion, Merge, and Quick Sort', href: '/topics/sorting-algorithms', co: 'CO2' },
  { id: 'arrays2d', title: '2D Arrays', description: 'Two-dimensional arrays and matrix algorithms', href: '/topics/arrays2d', co: 'CO2' },
  { id: 'matrix-algorithms', title: 'Matrix Algorithms', description: 'Matrix transpose, rotation, diagonal operations, and spiral traversal', href: '/topics/matrix-algorithms', co: 'CO2' },
  { id: 'prefix-sum-sliding-window', title: 'Prefix Sum & Sliding Window', description: 'Prefix sum for range queries and sliding window technique', href: '/topics/prefix-sum-sliding-window', co: 'CO2' },
  { id: 'two-pointer-technique', title: 'Two-Pointer Technique', description: 'Efficient array traversal using two pointers', href: '/topics/two-pointer-technique', co: 'CO2' },
  { id: 'competitive-programming', title: 'CodeChef-Style Problem Solving', description: 'Quantitative array problems and competitive programming strategies', href: '/topics/competitive-programming', co: 'CO2' },
  
  // CO3 — Recursion, Bitwise & String-Based Problem Solving (BTL-2 → BTL-4)
  { id: 'recursion-basics', title: 'Recursion Basics', description: 'Understanding recursion, stack frames, base cases, and recursive thinking', href: '/topics/recursion-basics', co: 'CO3' },
  { id: 'bitwise-operators', title: 'Bitwise Operators', description: 'AND, OR, XOR, NOT, and shift operators for bit manipulation', href: '/topics/bitwise-operators', co: 'CO3' },
  { id: 'bit-manipulation-tricks', title: 'Bit Manipulation Tricks', description: 'Even/odd check, power of 2, subset generation, and bit tricks', href: '/topics/bit-manipulation-tricks', co: 'CO3' },
  { id: 'strings-immutability', title: 'Strings and Immutability', description: 'String class, immutability, and common string operations', href: '/topics/strings-immutability', co: 'CO3' },
  { id: 'stringbuilder-stringbuffer', title: 'StringBuilder & StringBuffer', description: 'Mutable string classes for efficient string manipulation', href: '/topics/stringbuilder-stringbuffer', co: 'CO3' },
  { id: 'string-problems', title: 'String Problems', description: 'Palindrome, anagram, substring, and frequency count problems', href: '/topics/string-problems', co: 'CO3' },
  { id: 'regex-pattern-matching', title: 'Regex - Pattern Matching & Validation', description: 'Regular expressions for pattern matching and validation', href: '/topics/regex-pattern-matching', co: 'CO3' },
  { id: 'recursive-problems', title: 'Recursive Problems', description: 'Fibonacci, backtracking, Tower of Hanoi, and other recursive problems', href: '/topics/recursive-problems', co: 'CO3' },
  { id: 'quantitative-logic-problems', title: 'Quantitative Logic Problems', description: 'Number series, prime numbers, perfect numbers, and mathematical sequences', href: '/topics/quantitative-logic-problems', co: 'CO3' },
  
  // CO4 — OOP Foundations & Modularization (BTL-2 → BTL-4)
  { id: 'classes-objects', title: 'Classes & Objects', description: 'Class definition, object creation, instance variables, and instance methods', href: '/topics/classes-objects', co: 'CO4' },
  { id: 'constructors-this', title: 'Constructors & this Keyword', description: 'Default and parameterized constructors, constructor overloading, and this keyword', href: '/topics/constructors-this', co: 'CO4' },
  { id: 'methods', title: 'Methods', description: 'Functions and methods in Java - overloading and modularization', href: '/topics/methods', co: 'CO4' },
  { id: 'static-members', title: 'Static Members', description: 'Static variables, static methods, static blocks, and when to use static', href: '/topics/static-members', co: 'CO4' },
  { id: 'encapsulation', title: 'Encapsulation', description: 'Data hiding, access modifiers, getters and setters', href: '/topics/encapsulation', co: 'CO4' },
  { id: 'abstraction', title: 'Abstraction', description: 'Hiding implementation details, data abstraction, and method abstraction', href: '/topics/abstraction', co: 'CO4' },
  { id: 'modular-program-structure', title: 'Modular Program Structure', description: 'Breaking code into classes, organizing modules, and class design principles', href: '/topics/modular-program-structure', co: 'CO4' },
  { id: 'analyzing-class-design', title: 'Analyzing Class Design', description: 'Single responsibility, cohesion, coupling, encapsulation analysis, and design patterns', href: '/topics/analyzing-class-design', co: 'CO4' },
  
  // CO5 — Advanced OOP & System Architecture (BTL-2 → BTL-5)
  { id: 'inheritance', title: 'Inheritance', description: 'Class inheritance, IS-A relationship, method overriding, and code reuse', href: '/topics/inheritance', co: 'CO5' },
  { id: 'method-overriding-super-final', title: 'Method Overriding, super & final', description: 'Method overriding, super keyword, final keyword, and runtime polymorphism', href: '/topics/method-overriding-super-final', co: 'CO5' },
  { id: 'interfaces', title: 'Interfaces', description: 'Interface definition, multiple inheritance, default methods, and static methods', href: '/topics/interfaces', co: 'CO5' },
  { id: 'abstract-classes', title: 'Abstract Classes', description: 'Abstract classes, abstract methods, partial abstraction, and template pattern', href: '/topics/abstract-classes', co: 'CO5' },
  { id: 'polymorphism', title: 'Polymorphism', description: 'Compile-time and runtime polymorphism, method overloading and overriding', href: '/topics/polymorphism', co: 'CO5' },
  { id: 'reflection-api', title: 'Reflection API', description: 'Runtime class inspection, dynamic method invocation, and field access', href: '/topics/reflection-api', co: 'CO5' },
  { id: 'design-patterns', title: 'Design Patterns', description: 'Factory, Singleton, Strategy, Template Method patterns and best practices', href: '/topics/design-patterns', co: 'CO5' },
  { id: 'domain-system-modeling', title: 'Domain System Modeling', description: 'Entity identification, relationship modeling, and complete domain models', href: '/topics/domain-system-modeling', co: 'CO5' },
  
  // CO6 — Robust & Scalable Java Applications (BTL-2 → BTL-4)
  { id: 'exception-handling', title: 'Exception Handling', description: 'try-catch-finally, throw, throws, common exceptions, and error handling', href: '/topics/exception-handling', co: 'CO6' },
  { id: 'custom-exceptions', title: 'Custom Exceptions', description: 'Creating custom exceptions, checked vs unchecked, and exception chaining', href: '/topics/custom-exceptions', co: 'CO6' },
  { id: 'file-io-streams', title: 'File I/O Streams', description: 'File reading and writing, FileReader, FileWriter, BufferedReader, BufferedWriter', href: '/topics/file-io-streams', co: 'CO6' },
  { id: 'serialization', title: 'Serialization', description: 'Object serialization, deserialization, Serializable interface, and transient keyword', href: '/topics/serialization', co: 'CO6' },
  { id: 'generics', title: 'Generics', description: 'Generic classes, methods, type parameters, type safety, and wildcards', href: '/topics/generics', co: 'CO6' },
  { id: 'collections-framework', title: 'Collections Framework', description: 'List, Set, Map, Queue interfaces, ArrayList, HashSet, HashMap, and common operations', href: '/topics/collections-framework', co: 'CO6' },
  { id: 'lambda-expressions', title: 'Lambda Expressions', description: 'Lambda syntax, functional interfaces, method references, and concise code', href: '/topics/lambda-expressions', co: 'CO6' },
  { id: 'stream-api', title: 'Stream API', description: 'Stream operations, filter, map, reduce, collect, and functional programming', href: '/topics/stream-api', co: 'CO6' },
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
  { id: 'microcomputer-architecture', title: 'Microcomputer Architecture', description: 'CPU architecture, buses, registers, and instruction cycle', href: '/subjects/digital-system-design/topics/microcomputer-architecture' },
  { id: 'operands-addressing-modes', title: 'Operands and Addressing Modes', description: 'Operand types and addressing modes (immediate, register, direct, indirect, indexed, etc.)', href: '/subjects/digital-system-design/topics/operands-addressing-modes' },
  { id: 'instruction-formats', title: 'Instruction Formats', description: 'Zero-address, one-address, two-address, three-address, stack-based, accumulator-based, register-based formats', href: '/subjects/digital-system-design/topics/instruction-formats' },
  { id: 'instruction-set-machine-cycle', title: 'Instruction Set and Machine Cycle', description: 'Instruction classification, machine cycles (fetch, memory read/write, I/O read/write, interrupt)', href: '/subjects/digital-system-design/topics/instruction-set-machine-cycle' },
  { id: 'subroutine-call-return', title: 'Subroutine Call and Return Mechanism', description: 'Subroutine concepts, call mechanism, return mechanism, call stack, stack diagrams', href: '/subjects/digital-system-design/topics/subroutine-call-return' },
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
  { id: 'dsd-iq-1', title: 'Number System Conversion', type: 'important_question', subject: 'DDCOA', content: 'Convert (358)₁₀ into binary, octal and hexadecimal', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-1' },
  { id: 'dsd-iq-2', title: 'Binary to Decimal Conversion', type: 'important_question', subject: 'DDCOA', content: 'Convert (11010011)₂ into Decimal, octal and hexadecimal', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-2' },
  { id: 'dsd-iq-3', title: 'Logic Gate Implementation', type: 'important_question', subject: 'DDCOA', content: 'Implement logic gates and truth tables', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-3' },
  { id: 'dsd-iq-4', title: 'Boolean Algebra Simplification', type: 'important_question', subject: 'DDCOA', content: 'Simplify Boolean expressions using laws and theorems', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-4' },
  { id: 'dsd-iq-5', title: 'K-Map Optimization', type: 'important_question', subject: 'DDCOA', content: 'Optimize SOP and POS using K-maps', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-5' },
  { id: 'dsd-iq-6', title: 'Half and Full Adder', type: 'important_question', subject: 'DDCOA', content: 'Design half adder and full adder circuits', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-6' },
  { id: 'dsd-iq-7', title: 'MUX and DEMUX', type: 'important_question', subject: 'DDCOA', content: 'Multiplexer and demultiplexer design and applications', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-7' },
  { id: 'dsd-iq-8', title: 'Encoder and Decoder', type: 'important_question', subject: 'DDCOA', content: 'Encoder and decoder circuit implementation', url: '/subjects/digital-system-design/topics/important-questions', anchorId: 'question-8' },
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
    co: topic.co,
  })),
  
  // DSD Topics
  ...dsdTopics.map(topic => ({
    id: topic.id,
    title: topic.title,
    type: 'topic' as const,
    subject: 'DDCOA' as const,
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


