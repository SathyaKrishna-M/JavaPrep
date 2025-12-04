'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Introduction to Sets',
  explanationSections: [
    {
      title: '📊 Sets and Set Notation',
      icon: <FiBook className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">A set</span> is a collection of distinct objects, called elements or members. Sets are fundamental building blocks in discrete mathematics.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Set Notation:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-cyan-300">Roster Method:</span> <MathRenderer math="A = \{1, 2, 3, 4, 5\}" />
              </li>
              <li>
                <span className="text-cyan-300">Set Builder Notation:</span> <MathRenderer math="A = \{x \mid x \text{ is a positive integer and } x \le 5\}" />
              </li>
              <li>
                <span className="text-cyan-300">Empty Set:</span> <MathRenderer math="\emptyset" /> or <MathRenderer math="\{\}" /> (contains no elements)
              </li>
              <li>
                <span className="text-cyan-300">Universal Set:</span> <MathRenderer math="U" /> (contains all elements under consideration)
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Key Concepts:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-cyan-300">Cardinality:</span> <MathRenderer math="|A|" /> denotes the number of elements in set <MathRenderer math="A" />
              </li>
              <li>
                <span className="text-cyan-300">Membership:</span> <MathRenderer math="x \in A" /> means <MathRenderer math="x" /> is an element of <MathRenderer math="A" />; <MathRenderer math="x \notin A" /> means <MathRenderer math="x" /> is not an element of <MathRenderer math="A" />
              </li>
              <li>
                <span className="text-cyan-300">Equality:</span> Two sets are equal if they contain exactly the same elements
              </li>
            </ul>
          </div>
        </div>
      ),
      formula: 'A = \\{x \\mid P(x)\\}',
    },
    {
      title: '🔗 Subsets',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">A subset</span> <MathRenderer math="B" /> (denoted <MathRenderer math="A \subseteq B" />) if every element of <MathRenderer math="A" /> is also an element of <MathRenderer math="B" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Types of Subsets:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="text-cyan-300">Proper Subset:</span> <MathRenderer math="A \subset B" /> means <MathRenderer math="A \subseteq B" /> and <MathRenderer math="A \neq B" />
              </li>
              <li>
                <span className="text-cyan-300">Power Set:</span> <MathRenderer math="P(A)" /> is the set of all subsets of <MathRenderer math="A" />
              </li>
              <li>
                <span className="text-cyan-300">Number of Subsets:</span> If <MathRenderer math="|A| = n" />, then <MathRenderer math="|P(A)| = 2^n" />
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">If <MathRenderer math="A = \{1, 2\}" />, then <MathRenderer math="P(A) = \{\emptyset, \{1\}, \{2\}, \{1, 2\}\}" /></p>
            <p className="text-gray-300">The power set has <MathRenderer math="2^2 = 4" /> elements.</p>
          </div>
        </div>
      ),
      formula: '|P(A)| = 2^{|A|}',
    },
    {
      title: '🎨 Venn Diagrams',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Venn diagrams</span> are visual representations of sets using circles or other shapes to show relationships between sets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-amber-300 font-semibold mb-2">Uses:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Visualize set relationships</li>
                <li>Understand set operations</li>
                <li>Solve problems involving multiple sets</li>
                <li>Illustrate intersections and unions</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-lime-300 font-semibold mb-2">Common Regions:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><span className="text-cyan-300">Intersection:</span> Elements in both sets (<MathRenderer math="A \cap B" />)</li>
                <li><span className="text-cyan-300">Union:</span> Elements in either set (<MathRenderer math="A \cup B" />)</li>
                <li><span className="text-cyan-300">Difference:</span> Elements in A but not in B (<MathRenderer math="A - B" />)</li>
                <li><span className="text-cyan-300">Complement:</span> Elements not in A (<MathRenderer math="A'" />)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
        ],
        regions: [
          { label: 'A ∩ B', sets: ['A', 'B'] },
        ],
      },
    },
    {
      title: '⚙️ Set Operations',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-blue-400 font-semibold">Set operations</span> allow us to combine and manipulate sets.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Basic Operations:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Union (<MathRenderer math="A \cup B" />):</span> All elements in A or B or both</li>
              <li><span className="text-cyan-300">Intersection (<MathRenderer math="A \cap B" />):</span> Elements common to both A and B</li>
              <li><span className="text-cyan-300">Difference (<MathRenderer math="A - B" />):</span> Elements in A but not in B</li>
              <li><span className="text-cyan-300">Complement (<MathRenderer math="A'" />):</span> Elements in U but not in A</li>
              <li><span className="text-cyan-300">Symmetric Difference (<MathRenderer math="A \oplus B" />):</span> Elements in A or B but not in both</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Commutative:</span> <MathRenderer math="A \cup B = B \cup A, A \cap B = B \cap A" /></li>
              <li><span className="text-cyan-300">Associative:</span> <MathRenderer math="(A \cup B) \cup C = A \cup (B \cup C)" /></li>
              <li><span className="text-cyan-300">Distributive:</span> <MathRenderer math="A \cup (B \cap C) = (A \cup B) \cap (A \cup C)" /></li>
            </ul>
          </div>
        </div>
      ),
      formula: 'A \\cup B = \\{x \\mid x \\in A \\text{ or } x \\in B\\}',
    },
    {
      title: '📦 Cartesian Product',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Cartesian Product</span> <MathRenderer math="A \times B" /> is the set of all ordered pairs <MathRenderer math="(a, b)" /> where <MathRenderer math="a \in A" /> and <MathRenderer math="b \in B" />.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Cardinality:</span> <MathRenderer math="|A \times B| = |A| \times |B|" /></li>
              <li><span className="text-cyan-300">Order Matters:</span> <MathRenderer math="(a, b) \neq (b, a)" /> if <MathRenderer math="a \neq b" /></li>
              <li><span className="text-cyan-300">n-ary Product:</span> <MathRenderer math="A_1 \times A_2 \times ... \times A_n" /> for n sets</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Example:</p>
            <p className="text-gray-300">If <MathRenderer math="A = \{1, 2\}" /> and <MathRenderer math="B = \{a, b\}" />, then:</p>
            <p className="text-gray-300"><MathRenderer math="A \times B = \{(1, a), (1, b), (2, a), (2, b)\}" /></p>
            <p className="text-gray-300"><MathRenderer math="|A \times B| = 2 \times 2 = 4" /></p>
          </div>
        </div>
      ),
      formula: 'A \\times B = \\{(a, b) \\mid a \\in A \\text{ and } b \\in B\\}',
    },
  ],
  practiceQuestions: [
    {
      question: (
        <span>
          Find the power set of <MathRenderer math="A = \{a, b, c\}" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">The power set <MathRenderer math="P(A)" /> contains all subsets of <MathRenderer math="A" />.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Subsets:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="\emptyset" /> (empty set)</li>
              <li><MathRenderer math="\{a\}" /></li>
              <li><MathRenderer math="\{b\}" /></li>
              <li><MathRenderer math="\{c\}" /></li>
              <li><MathRenderer math="\{a, b\}" /></li>
              <li><MathRenderer math="\{a, c\}" /></li>
              <li><MathRenderer math="\{b, c\}" /></li>
              <li><MathRenderer math="\{a, b, c\}" /></li>
            </ol>
          </div>
          <p className="text-gray-300">Therefore, <MathRenderer math="P(A) = \{\emptyset, \{a\}, \{b\}, \{c\}, \{a, b\}, \{a, c\}, \{b, c\}, \{a, b, c\}\}" /></p>
          <p className="text-green-400">Note: <MathRenderer math="|P(A)| = 2^3 = 8" />, which matches our count.</p>
        </div>
      ),
    },
    {
      question: (
        <span>
          If <MathRenderer math="A = \{1, 2, 3\}" /> and <MathRenderer math="B = \{2, 3, 4\}" />, find <MathRenderer math="A \cup B" />, <MathRenderer math="A \cap B" />, and <MathRenderer math="A - B" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold"><MathRenderer math="A \cup B" /> (Union):</p>
            <p className="text-gray-300">All elements in A or B or both</p>
            <p className="text-green-400 font-semibold"><MathRenderer math="A \cup B = \{1, 2, 3, 4\}" /></p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold"><MathRenderer math="A \cap B" /> (Intersection):</p>
            <p className="text-gray-300">Elements common to both sets</p>
            <p className="text-green-400 font-semibold"><MathRenderer math="A \cap B = \{2, 3\}" /></p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-300 font-semibold"><MathRenderer math="A - B" /> (Difference):</p>
            <p className="text-gray-300">Elements in A but not in B</p>
            <p className="text-green-400 font-semibold"><MathRenderer math="A - B = \{1\}" /></p>
          </div>
        </div>
      ),
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
        ],
        regions: [
          { label: '1', sets: ['A'] },
          { label: '2, 3', sets: ['A', 'B'] },
          { label: '4', sets: ['B'] },
        ],
      },
    },
    {
      question: (
        <span>
          If <MathRenderer math="|A| = 5" /> and <MathRenderer math="|B| = 3" />, what is <MathRenderer math="|A \times B|" />?
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">The cardinality of the Cartesian product is the product of the cardinalities of the individual sets.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <MathRenderer display math="|A \times B| = |A| \times |B|" />
            <MathRenderer display math="|A \times B| = 5 \times 3 = 15" />
          </div>
          <p className="text-green-400">Therefore, <MathRenderer math="A \times B" /> contains 15 ordered pairs.</p>
        </div>
      ),
      formula: '|A \\times B| = |A| \\times |B| = 5 \\times 3 = 15',
    },
    {
      question: (
        <span>
          Prove that <MathRenderer math="A \cup (B \cap C) = (A \cup B) \cap (A \cup C)" /> using set builder notation.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">We need to show that both sets contain the same elements.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Left side: <MathRenderer math="A \cup (B \cap C)" /></p>
            <MathRenderer display math="= \{x \mid x \in A \text{ or } x \in (B \cap C)\}" />
            <MathRenderer display math="= \{x \mid x \in A \text{ or } (x \in B \text{ and } x \in C)\}" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Right side: <MathRenderer math="(A \cup B) \cap (A \cup C)" /></p>
            <MathRenderer display math="= \{x \mid x \in (A \cup B) \text{ and } x \in (A \cup C)\}" />
            <MathRenderer display math="= \{x \mid (x \in A \text{ or } x \in B) \text{ and } (x \in A \text{ or } x \in C)\}" />
          </div>
          <p className="text-gray-300">Using distributive law of logic:</p>
          <MathRenderer display math="= \{x \mid x \in A \text{ or } (x \in B \text{ and } x \in C)\}" />
          <p className="text-green-400">Both sides are equal, proving the distributive property.</p>
        </div>
      ),
      formula: 'A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)',
    },
    {
      question: 'How many subsets does a set with n elements have?',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">A set with <MathRenderer math="n" /> elements has <MathRenderer math="2^n" /> subsets.</p>
          <p className="text-gray-300">This can be proven by considering that for each element, we have two choices: include it in a subset or exclude it.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
            <p className="text-amber-300 font-semibold mb-2">For n elements:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Element 1: 2 choices (include/exclude)</li>
              <li>Element 2: 2 choices</li>
              <li>...</li>
              <li>Element n: 2 choices</li>
            </ul>
          </div>
          <p className="text-gray-300">Total subsets = <MathRenderer math="2 \times 2 \times ... \times 2" /> (n times) = <MathRenderer math="2^n" /></p>
          <p className="text-green-400">This includes the empty set (all elements excluded) and the set itself (all elements included).</p>
        </div>
      ),
      formula: '|P(A)| = 2^{|A|} = 2^n',
    },
    {
      question: (
        <span>
          If <MathRenderer math="A = \{x, y, z\}" /> and <MathRenderer math="B = \{1, 2\}" />, find <MathRenderer math="A \times B" /> and <MathRenderer math="B \times A" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <MathRenderer display math="A \times B = \{(a, b) \mid a \in A \text{ and } b \in B\}" />
            <MathRenderer display math="A \times B = \{(x, 1), (x, 2), (y, 1), (y, 2), (z, 1), (z, 2)\}" />
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <MathRenderer display math="B \times A = \{(b, a) \mid b \in B \text{ and } a \in A\}" />
            <MathRenderer display math="B \times A = \{(1, x), (1, y), (1, z), (2, x), (2, y), (2, z)\}" />
          </div>
          <p className="text-gray-300">Note: <MathRenderer math="A \times B \neq B \times A" /> (Cartesian product is not commutative)</p>
          <p className="text-green-400"><MathRenderer math="|A \times B| = |B \times A| = 3 \times 2 = 6" /></p>
        </div>
      ),
    },
    {
      question: 'Draw a Venn diagram for three sets A, B, and C showing all possible regions.',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">A three-set Venn diagram has 8 regions:</p>
          <ol className="list-decimal list-inside text-gray-300 space-y-1">
            <li>A only (not in B or C)</li>
            <li>B only (not in A or C)</li>
            <li>C only (not in A or B)</li>
            <li><MathRenderer math="A \cap B" /> only (not in C)</li>
            <li><MathRenderer math="A \cap C" /> only (not in B)</li>
            <li><MathRenderer math="B \cap C" /> only (not in A)</li>
            <li><MathRenderer math="A \cap B \cap C" /> (in all three)</li>
            <li>None (outside all three sets)</li>
          </ol>
          <p className="text-green-400">Each region represents a unique combination of membership in the three sets.</p>
        </div>
      ),
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
          { label: 'C', color: '#f59e0b' },
        ],
      },
    },
    {
      question: (
        <span>
          If <MathRenderer math="A \subseteq B" /> and <MathRenderer math="B \subseteq C" />, prove that <MathRenderer math="A \subseteq C" />.
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">We need to show that every element of A is also an element of C.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Given:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><MathRenderer math="A \subseteq B" /> means: if <MathRenderer math="x \in A" />, then <MathRenderer math="x \in B" /></li>
              <li><MathRenderer math="B \subseteq C" /> means: if <MathRenderer math="x \in B" />, then <MathRenderer math="x \in C" /></li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Proof:</p>
            <p className="text-gray-300">Let <MathRenderer math="x" /> be an arbitrary element of <MathRenderer math="A" />.</p>
            <p className="text-gray-300">Since <MathRenderer math="A \subseteq B" />, we have <MathRenderer math="x \in B" />.</p>
            <p className="text-gray-300">Since <MathRenderer math="B \subseteq C" /> and <MathRenderer math="x \in B" />, we have <MathRenderer math="x \in C" />.</p>
          </div>
          <p className="text-gray-300">Therefore, for any <MathRenderer math="x \in A" />, we have <MathRenderer math="x \in C" />.</p>
          <p className="text-green-400">This proves that <MathRenderer math="A \subseteq C" />.</p>
          <p className="text-gray-400 italic">This demonstrates the transitive property of subset relation.</p>
        </div>
      ),
    },
  ],
  exampleProblems: [
    {
      problem: 'Find the power set of {1, 2, 3} and verify its cardinality.',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="P(\{1, 2, 3\}) = \{\emptyset, \{1\}, \{2\}, \{3\}, \{1, 2\}, \{1, 3\}, \{2, 3\}, \{1, 2, 3\}\}" />
        </div>
      ),
      steps: [
        {
          step: 'List all subsets',
          explanation: 'Start with the empty set, then single elements, then pairs, then the full set.',
        },
        {
          step: 'Count elements',
          explanation: 'We have 8 subsets: 1 empty set, 3 single-element sets, 3 two-element sets, and 1 three-element set.',
        },
        {
          step: 'Verify using formula',
          explanation: (
            <MathRenderer math="|P(A)| = 2^3 = 8, \text{ which matches our count.}" />
          ),
        },
      ],
      formula: '|P(A)| = 2^{|A|} = 2^3 = 8',
    },
    {
      problem: 'Given A = {1, 2, 3, 4, 5}, B = {3, 4, 5, 6, 7}, and C = {5, 6, 7, 8, 9}, find (A ∪ B) ∩ C.',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="(A \cup B) \cap C = \{5, 6, 7\}" />
        </div>
      ),
      steps: [
        {
          step: 'Find A ∪ B',
          explanation: (
            <MathRenderer math="A \cup B = \{1, 2, 3, 4, 5, 6, 7\} \text{ (all elements in A or B)}" />
          ),
        },
        {
          step: 'Find intersection with C',
          explanation: (
            <MathRenderer math="(A \cup B) \cap C = \{5, 6, 7\} \text{ (elements in both (A ∪ B) and C)}" />
          ),
        },
      ],
      vennDiagram: {
        sets: [
          { label: 'A', color: '#3b82f6' },
          { label: 'B', color: '#10b981' },
          { label: 'C', color: '#f59e0b' },
        ],
      },
    },
    {
      problem: 'If A has 4 elements and B has 5 elements, and |A ∩ B| = 2, find |A ∪ B|.',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="|A \cup B| = 7" />
        </div>
      ),
      steps: [
        {
          step: 'Apply inclusion-exclusion principle',
          explanation: (
            <MathRenderer math="|A \cup B| = |A| + |B| - |A \cap B|" />
          ),
        },
        {
          step: 'Substitute values',
          explanation: (
            <MathRenderer math="|A \cup B| = 4 + 5 - 2 = 7" />
          ),
        },
      ],
      formula: '|A \\cup B| = |A| + |B| - |A \\cap B| = 4 + 5 - 2 = 7',
    },
    {
      problem: 'Find the Cartesian product of A = {a, b} and B = {1, 2, 3}.',
      solution: (
        <div className="space-y-4">
          <MathRenderer display math="A \times B = \{(a, 1), (a, 2), (a, 3), (b, 1), (b, 2), (b, 3)\}" />
        </div>
      ),
      steps: [
        {
          step: 'List all ordered pairs',
          explanation: 'For each element in A, pair it with each element in B.',
        },
        {
          step: 'Verify cardinality',
          explanation: (
            <MathRenderer math="|A \times B| = |A| \times |B| = 2 \times 3 = 6, \text{ which matches our 6 ordered pairs.}" />
          ),
        },
      ],
    },
  ],
}

export default function SetsAndSubsetsPage() {
  return <DMTopicPage content={content} />
}
