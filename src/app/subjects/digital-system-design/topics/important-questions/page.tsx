/* eslint-disable react/no-unescaped-entities */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiBook } from 'react-icons/fi'
import TruthTable from '@/components/TruthTable'
import KMap from '@/components/KMap'

export default function ImportantQuestionsPage() {
  return (
    <div className="space-y-8">
      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/subjects/digital-system-design"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-4"
        >
          <FiArrowRight className="w-4 h-4 rotate-180" />
          Back to DSD Topics
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Important Questions & Solutions
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Comprehensive collection of important DSD questions with detailed solutions
        </p>
      </motion.div>

      {/* Category 1: Number Systems & Gates */}
      <CategorySection
        title="📘 Number Systems & Logic Gates"
        icon="🔢"
        description="Number system conversions and basic logic gate operations"
      >
        {/* Question 1 */}
        <QuestionCard
          number={1}
          question="Convert the number (358)₁₀ into binary, octal and hexadecimal number format."
        >
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p><b>Decimal to Binary:</b></p>
            <pre className="bg-black/30 p-3 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`358 ÷ 2 = 179 remainder 0
179 ÷ 2 = 89 remainder 1
89 ÷ 2 = 44 remainder 1
44 ÷ 2 = 22 remainder 0
22 ÷ 2 = 11 remainder 0
11 ÷ 2 = 5 remainder 1
5 ÷ 2 = 2 remainder 1
2 ÷ 2 = 1 remainder 0
1 ÷ 2 = 0 remainder 1

Reading remainders from bottom to top:
Binary = (101100110)₂`}
            </pre>
            <p><b>Decimal to Octal:</b></p>
            <pre className="bg-black/30 p-3 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`358 ÷ 8 = 44 remainder 6
44 ÷ 8 = 5 remainder 4
5 ÷ 8 = 0 remainder 5

Reading remainders from bottom to top:
Octal = (546)₈`}
            </pre>
            <p><b>Decimal to Hexadecimal:</b></p>
            <pre className="bg-black/30 p-3 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`358 ÷ 16 = 22 remainder 6
22 ÷ 16 = 1 remainder 6
1 ÷ 16 = 0 remainder 1

Reading remainders from bottom to top:
Hexadecimal = (166)₁₆`}
            </pre>
            <p className="text-cyan-300 font-semibold mt-4">
              Answer: Binary = (101100110)₂, Octal = (546)₈, Hexadecimal = (166)₁₆
            </p>
          </div>
        </QuestionCard>

        {/* Question 2 */}
        <QuestionCard
          number={2}
          question="Convert the number (11010011)₂ into Decimal, octal and hexadecimal number format."
        >
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p><b>Binary to Decimal:</b></p>
            <pre className="bg-black/30 p-3 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`(11010011)₂ = 1×2⁷ + 1×2⁶ + 0×2⁵ + 1×2⁴ + 0×2³ + 0×2² + 1×2¹ + 1×2⁰
             = 128 + 64 + 0 + 16 + 0 + 0 + 2 + 1
             = 211

Decimal = (211)₁₀`}
            </pre>
            <p><b>Binary to Octal:</b> (Group bits in groups of 3 from right)</p>
            <pre className="bg-black/30 p-3 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`011 010 011
 3   2   3

Octal = (323)₈`}
            </pre>
            <p><b>Binary to Hexadecimal:</b> (Group bits in groups of 4 from right)</p>
            <pre className="bg-black/30 p-3 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`1101 0011
 D    3

Hexadecimal = (D3)₁₆`}
            </pre>
            <p className="text-cyan-300 font-semibold mt-4">
              Answer: Decimal = (211)₁₀, Octal = (323)₈, Hexadecimal = (D3)₁₆
            </p>
          </div>
        </QuestionCard>

        {/* Question 3 */}
        <QuestionCard
          number={3}
          question="Explain the basic operations of all the logic gates with their truth tables."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">1. AND Gate</p>
              <p className="mb-2">Output is 1 only when ALL inputs are 1.</p>
              <p className="mb-2">Boolean Expression: Y = A · B</p>
              <TruthTable
                headers={['A', 'B', 'Y']}
                rows={[
                  ['0', '0', '0'],
                  ['0', '1', '0'],
                  ['1', '0', '0'],
                  ['1', '1', '1'],
                ]}
                title="AND Gate Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">2. OR Gate</p>
              <p className="mb-2">Output is 1 when ANY input is 1.</p>
              <p className="mb-2">Boolean Expression: Y = A + B</p>
              <TruthTable
                headers={['A', 'B', 'Y']}
                rows={[
                  ['0', '0', '0'],
                  ['0', '1', '1'],
                  ['1', '0', '1'],
                  ['1', '1', '1'],
                ]}
                title="OR Gate Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">3. NOT Gate</p>
              <p className="mb-2">Output is the complement (inverse) of input.</p>
              <p className="mb-2">Boolean Expression: Y = A'</p>
              <TruthTable
                headers={['A', 'Y']}
                rows={[
                  ['0', '1'],
                  ['1', '0'],
                ]}
                title="NOT Gate Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">4. NAND Gate</p>
              <p className="mb-2">Output is 0 only when ALL inputs are 1 (AND followed by NOT).</p>
              <p className="mb-2">Boolean Expression: Y = (A · B)'</p>
              <TruthTable
                headers={['A', 'B', 'Y']}
                rows={[
                  ['0', '0', '1'],
                  ['0', '1', '1'],
                  ['1', '0', '1'],
                  ['1', '1', '0'],
                ]}
                title="NAND Gate Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">5. NOR Gate</p>
              <p className="mb-2">Output is 1 only when ALL inputs are 0 (OR followed by NOT).</p>
              <p className="mb-2">Boolean Expression: Y = (A + B)'</p>
              <TruthTable
                headers={['A', 'B', 'Y']}
                rows={[
                  ['0', '0', '1'],
                  ['0', '1', '0'],
                  ['1', '0', '0'],
                  ['1', '1', '0'],
                ]}
                title="NOR Gate Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">6. XOR Gate (Exclusive OR)</p>
              <p className="mb-2">Output is 1 when inputs are different.</p>
              <p className="mb-2">Boolean Expression: Y = A ⊕ B = A'B + AB'</p>
              <TruthTable
                headers={['A', 'B', 'Y']}
                rows={[
                  ['0', '0', '0'],
                  ['0', '1', '1'],
                  ['1', '0', '1'],
                  ['1', '1', '0'],
                ]}
                title="XOR Gate Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">7. XNOR Gate (Exclusive NOR)</p>
              <p className="mb-2">Output is 1 when inputs are same.</p>
              <p className="mb-2">Boolean Expression: Y = (A ⊕ B)' = AB + A'B'</p>
              <TruthTable
                headers={['A', 'B', 'Y']}
                rows={[
                  ['0', '0', '1'],
                  ['0', '1', '0'],
                  ['1', '0', '0'],
                  ['1', '1', '1'],
                ]}
                title="XNOR Gate Truth Table"
              />
            </div>
          </div>
        </QuestionCard>
      </CategorySection>

      {/* Category 2: Boolean Algebra */}
      <CategorySection
        title="📐 Boolean Algebra & Simplification"
        icon="🧮"
        description="DeMorgan's laws, Boolean simplification, and canonical forms"
      >
        {/* Question 4 */}
        <QuestionCard
          number={4}
          question="State DeMorgan's laws and provide their significance in Boolean algebra."
        >
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p className="text-lg font-semibold text-amber-300 mb-2">DeMorgan's Laws:</p>
            <div className="space-y-3">
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-cyan-300 font-semibold mb-2">First Law (AND to OR):</p>
                <p className="text-xl font-mono">(A · B)' = A' + B'</p>
                <p className="text-sm text-gray-300 mt-2">The complement of AND is equal to OR of complements</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-cyan-300 font-semibold mb-2">Second Law (OR to AND):</p>
                <p className="text-xl font-mono">(A + B)' = A' · B'</p>
                <p className="text-sm text-gray-300 mt-2">The complement of OR is equal to AND of complements</p>
              </div>
            </div>
            <p className="text-lg font-semibold text-amber-300 mt-4 mb-2">Significance:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li>Used for <span className="text-cyan-300">Boolean expression simplification</span></li>
              <li>Essential for <span className="text-cyan-300">NAND/NOR implementations</span> - any logic function can be implemented using only NAND or only NOR gates</li>
              <li>Helps in <span className="text-cyan-300">converting between SOP and POS forms</span></li>
              <li>Used in <span className="text-cyan-300">circuit optimization</span> and reducing gate count</li>
              <li>Important for <span className="text-cyan-300">logic synthesis</span> in digital design</li>
            </ul>
          </div>
        </QuestionCard>

        {/* Question 5 */}
        <QuestionCard
          number={5}
          question="Simplify the following expressions using Boolean laws: (i) F = A·B + A·(C·D+C·D') (ii) F = A·B·C + A' + A·C·B'"
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(i) F = A·B + A·(C·D + C·D')</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Step 1: Apply Distributive Law
F = A·B + A·(C·D + C·D')

Step 2: Simplify (C·D + C·D') using Complement Law
C·D + C·D' = C·(D + D') = C·1 = C

Step 3: Substitute back
F = A·B + A·C

Step 4: Factor out A
F = A·(B + C)

Final Answer: F = A·(B + C)`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(ii) F = A·B·C + A' + A·C·B'</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Step 1: Rearrange terms
F = A·B·C + A·C·B' + A'

Step 2: Factor C from first two terms
F = A·C·(B + B') + A'

Step 3: Simplify (B + B') using Complement Law
B + B' = 1
F = A·C·1 + A'
F = A·C + A'

Step 4: Factor A' from second term (using Absorption)
A' = A'·1 = A'·(1 + C) = A' + A'·C
F = A·C + A' + A'·C

Step 5: Apply Absorption Law
Since A'·C is absorbed by A·C in some cases, but more directly:
F = A' + A·C  (by consensus or direct simplification)

Final Answer: F = A' + A·C`}
              </pre>
            </div>
          </div>
        </QuestionCard>

        {/* Question 6 */}
        <QuestionCard
          number={6}
          question="Illustrate the term 'Canonical form' in Boolean algebra. Convert following functions into canonical form: (i) F(A,B,C) = A'B + BC + A'C (ii) F(A,B,C) = (A+B)(B+C')(A+C')"
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold text-amber-300 mb-2">Canonical Form:</p>
              <p className="text-gray-300 mb-2">
                Canonical form is a standardized way of representing Boolean functions where <span className="text-cyan-300">all variables appear in each term</span>.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                <li><span className="text-cyan-300">SOP Canonical Form (Sum of Minterms):</span> Each product term contains all variables</li>
                <li><span className="text-cyan-300">POS Canonical Form (Product of Maxterms):</span> Each sum term contains all variables</li>
                <li>Each minterm represents one row of the truth table where output is 1</li>
                <li>Each maxterm represents one row of the truth table where output is 0</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(i) F(A,B,C) = A'B + BC + A'C</p>
              <p className="text-gray-300 mb-2">Convert to SOP Canonical Form (Sum of Minterms):</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Step 1: Expand A'B
A'B = A'B(C + C') = A'BC + A'BC' = m₃ + m₂

Step 2: Expand BC
BC = (A + A')BC = ABC + A'BC = m₇ + m₃

Step 3: Expand A'C
A'C = A'C(B + B') = A'BC + A'B'C = m₃ + m₁

Step 4: Combine all minterms
F = m₁ + m₂ + m₃ + m₇

Step 5: Write in canonical form
F(A,B,C) = Σm(1,2,3,7)
F(A,B,C) = A'B'C + A'BC' + A'BC + ABC`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(ii) F(A,B,C) = (A+B)(B+C')(A+C')</p>
              <p className="text-gray-300 mb-2">Convert to POS Canonical Form (Product of Maxterms):</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Step 1: Expand (A+B)
(A+B) = (A+B+C)(A+B+C') = M₄·M₅

Step 2: Expand (B+C')
(B+C') = (A+B+C')(A'+B+C') = M₅·M₁

Step 3: Expand (A+C')
(A+C') = (A+B+C')(A+B'+C') = M₅·M₃

Step 4: Combine all maxterms
F = M₁·M₃·M₄·M₅

Step 5: Write in canonical form
F(A,B,C) = ΠM(1,3,4,5)
F(A,B,C) = (A+B+C')(A+B'+C')(A'+B'+C)(A'+B'+C')`}
              </pre>
            </div>
          </div>
        </QuestionCard>
      </CategorySection>

      {/* Category 3: K-Map Simplification */}
      <CategorySection
        title="🗺️ K-Map Simplification"
        icon="📊"
        description="Karnaugh map simplification for 3 and 4 variable functions"
      >
        {/* Question 7 */}
        <QuestionCard
          number={7}
          question="Simplify the following functions using 3-variable K-map: (a) F(A,B,C) = A'C + A'B + AB'C + BC (b) F(A,B,C) = AB'C + A'B'C + A'BC + A'B'C' + AB'C' (c) F(x,y,z) = Σm(0,1,6,7)"
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(a) F(A,B,C) = A'C + A'B + AB'C + BC</p>
              <p className="text-gray-300 mb-2">First, convert to minterm notation:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto mb-3">
{`A'C = A'C(B+B') = A'BC + A'B'C = m₃ + m₁
A'B = A'B(C+C') = A'BC + A'BC' = m₃ + m₂
AB'C = m₅
BC = BC(A+A') = ABC + A'BC = m₇ + m₃

F = Σm(1,2,3,5,7)`}
              </pre>
              <p className="text-gray-300 mb-2">K-Map grouping:</p>
              <KMap
                type="3var"
                values={[1, 2, 3, 5, 7]}
                title="3-Variable K-Map for F(A,B,C)"
                highlightedGroups={[
                  { cells: [1, 3], color: 'rgba(0, 255, 150, 0.3)' }, // A'C
                  { cells: [2, 3], color: 'rgba(255, 150, 0, 0.3)' }, // A'B
                  { cells: [5], color: 'rgba(150, 0, 255, 0.3)' }, // AB'C
                  { cells: [3, 7], color: 'rgba(0, 150, 255, 0.3)' }, // BC
                ]}
              />
              <p className="text-gray-300 mt-3">Simplified: <span className="text-cyan-300 font-mono">F = A'B'C + A'BC' + BC</span></p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(b) F(A,B,C) = AB'C + A'B'C + A'BC + A'B'C' + AB'C'</p>
              <p className="text-gray-300 mb-2">Minterms: F = Σm(0,1,3,5)</p>
              <KMap
                type="3var"
                values={[0, 1, 3, 5]}
                title="3-Variable K-Map for F(A,B,C)"
                highlightedGroups={[
                  { cells: [0, 1], color: 'rgba(0, 255, 150, 0.3)' }, // A'B'
                  { cells: [1, 3], color: 'rgba(255, 150, 0, 0.3)' }, // A'C
                  { cells: [1, 5], color: 'rgba(150, 0, 255, 0.3)' }, // B'C
                ]}
              />
              <p className="text-gray-300 mt-3">Simplified: <span className="text-cyan-300 font-mono">F = A'B' + A'C + B'C</span></p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(c) F(x,y,z) = Σm(0,1,6,7)</p>
              <KMap
                type="3var"
                values={[0, 1, 6, 7]}
                title="3-Variable K-Map for F(x,y,z)"
                highlightedGroups={[
                  { cells: [0, 1], color: 'rgba(0, 255, 150, 0.3)' }, // x'y'
                  { cells: [6, 7], color: 'rgba(255, 150, 0, 0.3)' }, // xy
                ]}
              />
              <p className="text-gray-300 mt-3">Simplified: <span className="text-cyan-300 font-mono">F = x'y' + xy</span></p>
              <p className="text-gray-300 mt-2">Or equivalently: <span className="text-cyan-300 font-mono">F = A'B' + AB</span></p>
            </div>
          </div>
        </QuestionCard>

        {/* Question 8 */}
        <QuestionCard
          number={8}
          question="Simplify the following functions using 4-variable K-map: (a) F = A'B'C' + B'CD' + A'BCD' + AB'C' (b) F(w,x,y,z) = Σm(0,1,3,8,9,10,11,12,13,14,15) (c) F(a,b,c,d) = Σm(0,3,8,11,12,13,15)"
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(a) F = A'B'C' + B'CD' + A'BCD' + AB'C'</p>
              <p className="text-gray-300 mb-2">Convert to minterms: F = Σm(0,2,6,8,9)</p>
              <p className="text-gray-300 mb-3">K-Map simplification:</p>
              <p className="text-gray-300">Simplified: <span className="text-cyan-300 font-mono">F = A'B'C' + B'CD' + AB'C'</span></p>
              <p className="text-gray-300 text-sm mt-2">Note: Further simplification possible depending on grouping</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(b) F(w,x,y,z) = Σm(0,1,3,8,9,10,11,12,13,14,15)</p>
              <p className="text-gray-300 mb-2">4-variable K-Map with multiple groups:</p>
              <p className="text-gray-300 mb-3">Grouping strategy:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Quad: m(12,13,14,15) → w</li>
                <li>Quad: m(8,9,10,11) → wx'</li>
                <li>Pair: m(0,1) → w'x'y'</li>
                <li>Pair: m(1,3) → w'x'z</li>
              </ul>
              <p className="text-gray-300 mt-3">Simplified: <span className="text-cyan-300 font-mono">F = w + wx' + w'x'y' + w'x'z</span></p>
              <p className="text-gray-300 text-sm mt-2">Further simplified: <span className="text-cyan-300 font-mono">F = w + x' + w'x'y'</span></p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(c) F(a,b,c,d) = Σm(0,3,8,11,12,13,15)</p>
              <p className="text-gray-300 mb-2">4-variable K-Map grouping:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Quad: m(12,13,15) → ab</li>
                <li>Pair: m(8,12) → ab'c'</li>
                <li>Pair: m(3,11) → b'cd</li>
                <li>Single: m(0) → a'b'c'd'</li>
              </ul>
              <p className="text-gray-300 mt-3">Simplified: <span className="text-cyan-300 font-mono">F = ab + ab'c' + b'cd + a'b'c'd'</span></p>
            </div>
          </div>
        </QuestionCard>

        {/* Question 9 */}
        <QuestionCard
          number={9}
          question="Simplify the following functions using K-map with don't care conditions: (a) F(a,b,c) = Σm(0,2,4) + Σd(3,6) (b) F(A,B,C,D) = Σm(0,1,4,5,6,10,13) + d(2,3) (c) F(w,x,y,z) = Σ(4,5,6,7,12), d(w,x,y,z) = Σ(0,8,13)"
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p className="text-gray-300 mb-3">
              Don't care conditions (d) can be used as either 0 or 1 to maximize grouping and simplify the function.
            </p>
            
            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(a) F(a,b,c) = Σm(0,2,4) + Σd(3,6)</p>
              <p className="text-gray-300 mb-2">Minterms: 0,2,4 | Don't cares: 3,6</p>
              <p className="text-gray-300 mb-3">K-Map strategy: Use d(3) and d(6) to form larger groups</p>
              <KMap
                type="3var"
                values={[0, 2, 4]}
                title="3-Variable K-Map with Don't Cares"
              />
              <p className="text-gray-300 mt-3">Using don't cares optimally:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Group m(0,2,4,6) using d(6) → b'</li>
                <li>Group m(2,3,6) using d(3) and d(6) → bc'</li>
              </ul>
              <p className="text-gray-300 mt-3">Simplified: <span className="text-cyan-300 font-mono">F = b' + bc'</span></p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(b) F(A,B,C,D) = Σm(0,1,4,5,6,10,13) + d(2,3)</p>
              <p className="text-gray-300 mb-2">4-variable K-Map with don't cares:</p>
              <p className="text-gray-300 mb-3">Use d(2,3) to maximize grouping:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Quad: m(0,1,2,3) using d(2,3) → A'B'</li>
                <li>Quad: m(4,5,6) → AB'</li>
                <li>Pair: m(10,13) → BCD'</li>
              </ul>
              <p className="text-gray-300 mt-3">Simplified: <span className="text-cyan-300 font-mono">F = A'B' + AB' + BCD'</span></p>
              <p className="text-gray-300 text-sm mt-2">Further simplified: <span className="text-cyan-300 font-mono">F = B' + BCD'</span></p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">(c) F(w,x,y,z) = Σ(4,5,6,7,12), d(w,x,y,z) = Σ(0,8,13)</p>
              <p className="text-gray-300 mb-2">4-variable K-Map:</p>
              <p className="text-gray-300 mb-3">Minterms: 4,5,6,7,12 | Don't cares: 0,8,13</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Quad: m(4,5,6,7) → wx'</li>
                <li>Pair: m(12,13) using d(13) → wxy</li>
                <li>Optional: m(0,4,8,12) using d(0,8) → yz'</li>
              </ul>
              <p className="text-gray-300 mt-3">Simplified: <span className="text-cyan-300 font-mono">F = wx' + wxy</span></p>
              <p className="text-gray-300 text-sm mt-2">Or: <span className="text-cyan-300 font-mono">F = wx' + wy</span></p>
            </div>
          </div>
        </QuestionCard>
      </CategorySection>

      {/* Category 4: Adders & Subtractors */}
      <CategorySection
        title="➕ Adders & Subtractors"
        icon="🔢"
        description="Half adders, full adders, half subtractors, full subtractors, and parallel adders"
      >
        {/* Question 10 */}
        <QuestionCard
          number={10}
          question="Outline the half adder working principle with its truth table, output equations and logic diagram."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Half Adder:</p>
              <p className="text-gray-300 mb-2">
                A half adder is a combinational circuit that adds two single-bit binary numbers. It produces a sum (S) and a carry (C).
              </p>
              <p className="text-gray-300"><b>Inputs:</b> A, B (two bits to be added)</p>
              <p className="text-gray-300"><b>Outputs:</b> S (Sum), C (Carry)</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Truth Table:</p>
              <TruthTable
                headers={['A', 'B', 'Sum (S)', 'Carry (C)']}
                rows={[
                  ['0', '0', '0', '0'],
                  ['0', '1', '1', '0'],
                  ['1', '0', '1', '0'],
                  ['1', '1', '0', '1'],
                ]}
                title="Half Adder Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Output Equations:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Sum (S) = A ⊕ B = A'B + AB'
Carry (C) = A · B`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Logic Diagram:</p>
              <p className="text-gray-300 mb-2">
                Half adder can be implemented using:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>One XOR gate for Sum (S)</li>
                <li>One AND gate for Carry (C)</li>
              </ul>
              <p className="text-gray-300 mt-3 text-sm">
                Block diagram: [A] → [XOR] → [S]
                              [B] ↗        ↘
                              [A] → [AND] → [C]
                              [B] ↗
              </p>
            </div>
          </div>
        </QuestionCard>

        {/* Question 11 */}
        <QuestionCard
          number={11}
          question="Elaborate on the full adder principle with truth table, output equations and logic diagram."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Full Adder:</p>
              <p className="text-gray-300 mb-2">
                A full adder is a combinational circuit that adds three single-bit binary numbers. It includes a carry input from the previous stage.
              </p>
              <p className="text-gray-300"><b>Inputs:</b> A, B, C_in (carry from previous stage)</p>
              <p className="text-gray-300"><b>Outputs:</b> S (Sum), C_out (Carry to next stage)</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Truth Table:</p>
              <TruthTable
                headers={['A', 'B', 'C_in', 'Sum (S)', 'C_out']}
                rows={[
                  ['0', '0', '0', '0', '0'],
                  ['0', '0', '1', '1', '0'],
                  ['0', '1', '0', '1', '0'],
                  ['0', '1', '1', '0', '1'],
                  ['1', '0', '0', '1', '0'],
                  ['1', '0', '1', '0', '1'],
                  ['1', '1', '0', '0', '1'],
                  ['1', '1', '1', '1', '1'],
                ]}
                title="Full Adder Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Output Equations:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Sum (S) = A ⊕ B ⊕ C_in
Carry (C_out) = AB + BC_in + AC_in
            = AB + C_in(A ⊕ B)`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Logic Diagram:</p>
              <p className="text-gray-300 mb-2">
                Full adder can be implemented using:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Two XOR gates for Sum (S)</li>
                <li>Three AND gates and one OR gate for Carry (C_out)</li>
                <li>Or using two half adders and one OR gate</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        {/* Question 12 */}
        <QuestionCard
          number={12}
          question="Outline the half subtractor working principle with its truth table, output equations and logic diagram."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Half Subtractor:</p>
              <p className="text-gray-300 mb-2">
                A half subtractor is a combinational circuit that subtracts two single-bit binary numbers. It produces a difference (D) and a borrow (B_out).
              </p>
              <p className="text-gray-300"><b>Inputs:</b> A (minuend), B (subtrahend)</p>
              <p className="text-gray-300"><b>Outputs:</b> D (Difference), B_out (Borrow)</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Truth Table:</p>
              <TruthTable
                headers={['A', 'B', 'Difference (D)', 'Borrow (B_out)']}
                rows={[
                  ['0', '0', '0', '0'],
                  ['0', '1', '1', '1'],
                  ['1', '0', '1', '0'],
                  ['1', '1', '0', '0'],
                ]}
                title="Half Subtractor Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Output Equations:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Difference (D) = A ⊕ B = A'B + AB'
Borrow (B_out) = A' · B`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Logic Diagram:</p>
              <p className="text-gray-300 mb-2">
                Half subtractor can be implemented using:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>One XOR gate for Difference (D)</li>
                <li>One AND gate with A' input for Borrow (B_out)</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        {/* Question 13 */}
        <QuestionCard
          number={13}
          question="Elaborate on the full subtractor principle with truth table, output equations and logic diagram."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Full Subtractor:</p>
              <p className="text-gray-300 mb-2">
                A full subtractor is a combinational circuit that subtracts three single-bit binary numbers. It includes a borrow input from the previous stage.
              </p>
              <p className="text-gray-300"><b>Inputs:</b> A (minuend), B (subtrahend), B_in (borrow from previous stage)</p>
              <p className="text-gray-300"><b>Outputs:</b> D (Difference), B_out (Borrow to next stage)</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Truth Table:</p>
              <TruthTable
                headers={['A', 'B', 'B_in', 'Difference (D)', 'B_out']}
                rows={[
                  ['0', '0', '0', '0', '0'],
                  ['0', '0', '1', '1', '1'],
                  ['0', '1', '0', '1', '1'],
                  ['0', '1', '1', '0', '1'],
                  ['1', '0', '0', '1', '0'],
                  ['1', '0', '1', '0', '0'],
                  ['1', '1', '0', '0', '0'],
                  ['1', '1', '1', '1', '1'],
                ]}
                title="Full Subtractor Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Output Equations:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Difference (D) = A ⊕ B ⊕ B_in
Borrow (B_out) = A'B + A'B_in + BB_in
              = A'B + B_in(A' + B)
              = A'B + B_in(A ⊕ B)'`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Logic Diagram:</p>
              <p className="text-gray-300 mb-2">
                Full subtractor can be implemented using:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Two XOR gates for Difference (D)</li>
                <li>Three AND gates and one OR gate for Borrow (B_out)</li>
                <li>Or using two half subtractors and one OR gate</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        {/* Question 14 */}
        <QuestionCard
          number={14}
          question="Explore the fundamental principle of a binary parallel adder and its advantages over other types of adders."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Binary Parallel Adder:</p>
              <p className="text-gray-300 mb-2">
                A binary parallel adder is a combinational circuit that adds two n-bit binary numbers simultaneously. It consists of n full adders connected in cascade, where each full adder handles one bit position.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Principle:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Cascade Connection:</span> Full adders are connected such that the carry output of one stage becomes the carry input of the next higher-order stage</li>
                <li><span className="text-cyan-300">Bit-wise Addition:</span> Each full adder adds corresponding bits from both numbers along with the carry from the previous stage</li>
                <li><span className="text-cyan-300">Parallel Processing:</span> All bits are processed simultaneously, making it faster than serial adders</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Block Diagram (4-bit Parallel Adder):</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`A₃ B₃ → [FA₃] → S₃
         ↓ C_out
A₂ B₂ → [FA₂] → S₂
         ↓ C_out
A₁ B₁ → [FA₁] → S₁
         ↓ C_out
A₀ B₀ → [FA₀] → S₀
         ↓ C_out
         C_final`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Advantages:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Speed:</span> All bits are added simultaneously (parallel processing), making it much faster than serial adders</li>
                <li><span className="text-cyan-300">Efficiency:</span> Suitable for high-speed arithmetic operations</li>
                <li><span className="text-cyan-300">Scalability:</span> Can easily extend to any number of bits by adding more full adders</li>
                <li><span className="text-cyan-300">Simplicity:</span> Simple cascading connection, easy to design and implement</li>
                <li><span className="text-cyan-300">Real-time Processing:</span> Provides results in a single clock cycle (for combinational version)</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Limitations:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-red-300">Carry Propagation Delay:</span> The carry must propagate through all stages, causing delay (ripple carry adder)</li>
                <li><span className="text-red-300">Delay Increases:</span> Total delay increases linearly with the number of bits</li>
                <li><span className="text-cyan-300">Solution:</span> Use carry look-ahead adder (CLA) to reduce delay</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        {/* Question 15 */}
        <QuestionCard
          number={15}
          question="Realize the full adder using two half adders."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Full Adder using Two Half Adders:</p>
              <p className="text-gray-300 mb-2">
                A full adder can be constructed using two half adders and one OR gate.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Construction:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">First Half Adder (HA₁):</span> Adds A and B to produce partial sum S₁ = A ⊕ B and carry C₁ = AB</li>
                <li><span className="text-cyan-300">Second Half Adder (HA₂):</span> Adds S₁ and C_in to produce final sum S = S₁ ⊕ C_in = A ⊕ B ⊕ C_in and carry C₂ = S₁ · C_in</li>
                <li><span className="text-cyan-300">OR Gate:</span> Combines C₁ and C₂ to produce final carry C_out = C₁ + C₂ = AB + (A ⊕ B) · C_in</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Block Diagram:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`         A ──┐
              ├─→ [HA₁] ──→ S₁ ──┐
         B ──┘        ↓ C₁      │
                      │         ├─→ [HA₂] ──→ S (Sum)
         C_in ────────┴─────────┘        ↓ C₂
                                         │
                                         └─→ [OR] ──→ C_out
                      C₁ ────────────────┘`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Verification:</p>
              <p className="text-gray-300 mb-2">Output equations:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`S = S₁ ⊕ C_in = (A ⊕ B) ⊕ C_in = A ⊕ B ⊕ C_in ✓

C_out = C₁ + C₂ = AB + (A ⊕ B) · C_in
      = AB + (A'B + AB') · C_in
      = AB + A'BC_in + AB'C_in
      = AB(1 + C_in) + C_in(A ⊕ B)
      = AB + C_in(A ⊕ B)
      = AB + BC_in + AC_in ✓`}
              </pre>
              <p className="text-gray-300 mt-3">The outputs match the full adder specifications.</p>
            </div>
          </div>
        </QuestionCard>
      </CategorySection>

      {/* Category 5: MUX & DEMUX */}
      <CategorySection
        title="🔀 Multiplexers & Demultiplexers"
        icon="⚙️"
        description="Multiplexers (MUX), demultiplexers (DEMUX), and their applications"
      >
        {/* Question 16 */}
        <QuestionCard
          number={16}
          question="Provide a thorough description of the architecture of a 4:1 multiplexer, including its input lines, control lines, and output."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">4:1 Multiplexer (MUX):</p>
              <p className="text-gray-300 mb-2">
                A 4:1 multiplexer is a combinational circuit that selects one of four input lines and routes it to a single output line based on the control signals.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Architecture:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Input Lines:</span> 4 input lines (I₀, I₁, I₂, I₃)</li>
                <li><span className="text-cyan-300">Control Lines (Select Lines):</span> 2 select lines (S₁, S₀) to select one of 4 inputs</li>
                <li><span className="text-cyan-300">Output Line:</span> 1 output line (Y)</li>
                <li><span className="text-cyan-300">Enable Input (optional):</span> Enable signal to activate the MUX</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Truth Table:</p>
              <TruthTable
                headers={['S₁', 'S₀', 'Y']}
                rows={[
                  ['0', '0', 'I₀'],
                  ['0', '1', 'I₁'],
                  ['1', '0', 'I₂'],
                  ['1', '1', 'I₃'],
                ]}
                title="4:1 MUX Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Boolean Expression:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Y = S₁'S₀'I₀ + S₁'S₀I₁ + S₁S₀'I₂ + S₁S₀I₃`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Block Diagram:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`I₀ ──┐
I₁ ──┤
I₂ ──┤ → [4:1 MUX] → Y
I₃ ──┘
        ↑
    S₁, S₀ (Select)`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Implementation:</p>
              <p className="text-gray-300 mb-2">
                4:1 MUX can be implemented using:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Four AND gates (one for each input)</li>
                <li>Two NOT gates (for complementing select lines)</li>
                <li>One OR gate (to combine all AND outputs)</li>
                <li>Or using two 2:1 MUX and one 2:1 MUX (tree structure)</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        {/* Question 17 */}
        <QuestionCard
          number={17}
          question="Implement the function F(A,B,C) = Σm(0,2,5,6,7) using suitable multiplexer."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Function: F(A,B,C) = Σm(0,2,5,6,7)</p>
              <p className="text-gray-300 mb-2">We need 3 variables, so we'll use an 8:1 MUX with A, B, C as select lines.</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Truth Table:</p>
              <TruthTable
                headers={['A', 'B', 'C', 'F']}
                rows={[
                  ['0', '0', '0', '1'],
                  ['0', '0', '1', '0'],
                  ['0', '1', '0', '1'],
                  ['0', '1', '1', '0'],
                  ['1', '0', '0', '0'],
                  ['1', '0', '1', '1'],
                  ['1', '1', '0', '1'],
                  ['1', '1', '1', '1'],
                ]}
                title="Truth Table for F(A,B,C)"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Implementation using 8:1 MUX:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Select Lines:</span> A, B, C (connected to S₂, S₁, S₀)</li>
                <li><span className="text-cyan-300">Input Connections:</span>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>I₀ = 1 (for m(0))</li>
                    <li>I₁ = 0 (for m(1))</li>
                    <li>I₂ = 1 (for m(2))</li>
                    <li>I₃ = 0 (for m(3))</li>
                    <li>I₄ = 0 (for m(4))</li>
                    <li>I₅ = 1 (for m(5))</li>
                    <li>I₆ = 1 (for m(6))</li>
                    <li>I₇ = 1 (for m(7))</li>
                  </ul>
                </li>
                <li><span className="text-cyan-300">Output:</span> F = Y (MUX output)</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Block Diagram:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`1 ──→ I₀
0 ──→ I₁
1 ──→ I₂
0 ──→ I₃ → [8:1 MUX] → F
0 ──→ I₄        ↑
1 ──→ I₅    A,B,C (Select)
1 ──→ I₆
1 ──→ I₇`}
              </pre>
            </div>
          </div>
        </QuestionCard>

        {/* Question 18 */}
        <QuestionCard
          number={18}
          question="Design the function F(A,B,C) = Σm(1,4,6,7) using 4X1 MUX considering 'C' as Input line and A, B as selection lines."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Function: F(A,B,C) = Σm(1,4,6,7)</p>
              <p className="text-gray-300 mb-2">Using 4:1 MUX with A, B as select lines and C as input variable.</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Method:</p>
              <p className="text-gray-300 mb-2">Group minterms by A, B combinations:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`When A=0, B=0: F = m(0) = 0, m(1) = 1 → F = C
When A=0, B=1: F = m(2) = 0, m(3) = 0 → F = 0
When A=1, B=0: F = m(4) = 1, m(5) = 0 → F = C'
When A=1, B=1: F = m(6) = 1, m(7) = 1 → F = 1`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">4:1 MUX Connections:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Select Lines:</span> A → S₁, B → S₀</li>
                <li><span className="text-cyan-300">Input Lines:</span>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>I₀ = C (when AB=00, F=C)</li>
                    <li>I₁ = 0 (when AB=01, F=0)</li>
                    <li>I₂ = C' (when AB=10, F=C')</li>
                    <li>I₃ = 1 (when AB=11, F=1)</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Implementation:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`C ──→ I₀
0 ──→ I₁ → [4:1 MUX] → F
C' ──→ I₂     ↑
1 ──→ I₃   A,B (Select)`}
              </pre>
            </div>
          </div>
        </QuestionCard>

        {/* Question 19 */}
        <QuestionCard
          number={19}
          question="Design the function F(A,B,C) = Σm(1,4,5,7) using 4X1 MUX considering 'A' as Input line and B, C as selection lines."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Function: F(A,B,C) = Σm(1,4,5,7)</p>
              <p className="text-gray-300 mb-2">Using 4:1 MUX with B, C as select lines and A as input variable.</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Method:</p>
              <p className="text-gray-300 mb-2">Group minterms by B, C combinations:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`When B=0, C=0: F = m(0) = 0, m(4) = 1 → F = A
When B=0, C=1: F = m(1) = 1, m(5) = 1 → F = 1
When B=1, C=0: F = m(2) = 0, m(6) = 0 → F = 0
When B=1, C=1: F = m(3) = 0, m(7) = 1 → F = A'`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">4:1 MUX Connections:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Select Lines:</span> B → S₁, C → S₀</li>
                <li><span className="text-cyan-300">Input Lines:</span>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>I₀ = A (when BC=00, F=A)</li>
                    <li>I₁ = 1 (when BC=01, F=1)</li>
                    <li>I₂ = 0 (when BC=10, F=0)</li>
                    <li>I₃ = A' (when BC=11, F=A')</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Implementation:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`A ──→ I₀
1 ──→ I₁ → [4:1 MUX] → F
0 ──→ I₂     ↑
A' ──→ I₃   B,C (Select)`}
              </pre>
            </div>
          </div>
        </QuestionCard>

        {/* Question 20 */}
        <QuestionCard
          number={20}
          question="Illustrate the construction of an Arithmetic Logic Unit (ALU) employing 4-to-1 Multiplexer."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">ALU using 4:1 MUX:</p>
              <p className="text-gray-300 mb-2">
                An ALU performs arithmetic and logic operations. A 4:1 MUX can select between different operations based on control signals.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Basic ALU Operations:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Operation 0 (00):</span> AND (A · B)</li>
                <li><span className="text-cyan-300">Operation 1 (01):</span> OR (A + B)</li>
                <li><span className="text-cyan-300">Operation 2 (10):</span> XOR (A ⊕ B)</li>
                <li><span className="text-cyan-300">Operation 3 (11):</span> NOT A (A')</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Implementation:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`A·B ──→ I₀
A+B ──→ I₁ → [4:1 MUX] → Output
A⊕B ──→ I₂     ↑
A'  ──→ I₃   S₁, S₀ (Operation Select)

Control Lines:
S₁ S₀ | Operation
------|----------
0  0  | AND
0  1  | OR
1  0  | XOR
1  1  | NOT`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Extended ALU:</p>
              <p className="text-gray-300 mb-2">
                For arithmetic operations (addition, subtraction), we need additional circuitry:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>Use multiple 4:1 MUX to select between different arithmetic/logic operations</li>
                <li>Include full adders for arithmetic operations</li>
                <li>Use control signals to select operation type</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        {/* Question 21 */}
        <QuestionCard
          number={21}
          question="Provide two practical scenarios or applications where multiplexers are commonly used."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Application 1: Data Routing in Communication Systems</p>
              <div className="bg-black/30 p-4 rounded-lg mb-3">
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-300">Scenario:</span> In telecommunication systems, multiple data channels need to be transmitted over a single communication line.
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-300">How MUX is used:</span>
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                  <li>Multiple input data streams are connected to MUX inputs</li>
                  <li>Control signals select which channel to transmit at any given time</li>
                  <li>Single output line carries the selected data</li>
                  <li>At the receiver end, a DEMUX separates the channels</li>
                </ul>
                <p className="text-gray-300 mt-2">
                  <span className="text-cyan-300">Example:</span> Time Division Multiplexing (TDM) in telephone systems
                </p>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Application 2: Memory Address Selection in Computers</p>
              <div className="bg-black/30 p-4 rounded-lg mb-3">
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-300">Scenario:</span> In computer systems, the CPU needs to access different memory locations or I/O devices.
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-300">How MUX is used:</span>
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                  <li>Multiple memory addresses or device addresses are connected to MUX inputs</li>
                  <li>Address decoder provides control signals to select the desired memory location</li>
                  <li>MUX routes the selected address to the address bus</li>
                  <li>Enables efficient memory access and I/O operations</li>
                </ul>
                <p className="text-gray-300 mt-2">
                  <span className="text-cyan-300">Example:</span> Memory address multiplexing in microprocessors
                </p>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Other Applications:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li><span className="text-cyan-300">Data Acquisition Systems:</span> Selecting inputs from multiple sensors</li>
                <li><span className="text-cyan-300">Function Generators:</span> Selecting different waveform types</li>
                <li><span className="text-cyan-300">ALU Design:</span> Selecting different arithmetic/logic operations</li>
                <li><span className="text-cyan-300">Digital Displays:</span> Multiplexing display segments</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        {/* Question 22 */}
        <QuestionCard
          number={22}
          question="Design a 8:1 multiplexer using two 4:1 mux and one 2:1 mux."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">8:1 MUX using 4:1 MUX and 2:1 MUX:</p>
              <p className="text-gray-300 mb-2">
                We need 3 select lines (S₂, S₁, S₀) to select one of 8 inputs. We'll use S₂ to select between two 4:1 MUX, and S₁, S₀ to select within each 4:1 MUX.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Design Strategy:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">First 4:1 MUX (MUX₁):</span> Handles inputs I₀ to I₃, uses S₁ and S₀ as select lines</li>
                <li><span className="text-cyan-300">Second 4:1 MUX (MUX₂):</span> Handles inputs I₄ to I₇, uses S₁ and S₀ as select lines</li>
                <li><span className="text-cyan-300">2:1 MUX (MUX₃):</span> Selects output from MUX₁ or MUX₂ based on S₂</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Block Diagram:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`I₀ ──┐
I₁ ──┤
I₂ ──┤ → [4:1 MUX₁] ──┐
I₃ ──┘        ↑       │
           S₁, S₀      │
                       │
I₄ ──┐                 │
I₅ ──┤                 ├─→ [2:1 MUX₃] → Y
I₆ ──┤ → [4:1 MUX₂] ──┘        ↑
I₇ ──┘        ↑              S₂
           S₁, S₀`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Truth Table:</p>
              <p className="text-gray-300 mb-2">Selection logic:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>When S₂=0: Output from MUX₁ (I₀ to I₃ selected by S₁, S₀)</li>
                <li>When S₂=1: Output from MUX₂ (I₄ to I₇ selected by S₁, S₀)</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Verification:</p>
              <p className="text-gray-300 mb-2">For S₂S₁S₀ = 000:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>MUX₁ selects I₀ (S₁S₀=00)</li>
                <li>MUX₃ selects MUX₁ output (S₂=0)</li>
                <li>Final output = I₀ ✓</li>
              </ul>
              <p className="text-gray-300 mt-2 mb-2">For S₂S₁S₀ = 101:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>MUX₂ selects I₅ (S₁S₀=01)</li>
                <li>MUX₃ selects MUX₂ output (S₂=1)</li>
                <li>Final output = I₅ ✓</li>
              </ul>
            </div>
          </div>
        </QuestionCard>
      </CategorySection>

      {/* Category 6: Encoders & Decoders */}
      <CategorySection
        title="🔐 Encoders & Decoders"
        icon="📡"
        description="Encoders, decoders, and their applications in digital systems"
      >
        {/* Question 23 */}
        <QuestionCard
          number={23}
          question="Examine the functionality and design of 8-to-3 encoder in digital circuitry including the input and output lines & truth table."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">8-to-3 Encoder:</p>
              <p className="text-gray-300 mb-2">
                An 8-to-3 encoder is a combinational circuit that converts 8 input lines into 3 output lines representing the binary equivalent of the active input.
              </p>
              <p className="text-gray-300"><b>Inputs:</b> 8 input lines (I₀ to I₇)</p>
              <p className="text-gray-300"><b>Outputs:</b> 3 output lines (Y₂, Y₁, Y₀) representing binary code</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Truth Table:</p>
              <TruthTable
                headers={['I₇', 'I₆', 'I₅', 'I₄', 'I₃', 'I₂', 'I₁', 'I₀', 'Y₂', 'Y₁', 'Y₀']}
                rows={[
                  ['0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0'],
                  ['0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1'],
                  ['0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0'],
                  ['0', '0', '0', '0', '1', '0', '0', '0', '0', '1', '1'],
                  ['0', '0', '0', '1', '0', '0', '0', '0', '1', '0', '0'],
                  ['0', '0', '1', '0', '0', '0', '0', '0', '1', '0', '1'],
                  ['0', '1', '0', '0', '0', '0', '0', '0', '1', '1', '0'],
                  ['1', '0', '0', '0', '0', '0', '0', '0', '1', '1', '1'],
                ]}
                title="8-to-3 Encoder Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Output Equations:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Y₂ = I₄ + I₅ + I₆ + I₇
Y₁ = I₂ + I₃ + I₆ + I₇
Y₀ = I₁ + I₃ + I₅ + I₇`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Characteristics:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Priority Encoder:</span> Assumes only one input is active at a time (standard encoder)</li>
                <li><span className="text-cyan-300">Application:</span> Keyboard encoding, interrupt request encoding</li>
                <li><span className="text-cyan-300">Limitation:</span> If multiple inputs are active, output is undefined (unless priority encoder is used)</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        {/* Question 24 */}
        <QuestionCard
          number={24}
          question="Examine the functionality and design of 3-to-8 decoder in digital circuitry including the input and output lines & truth table."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">3-to-8 Decoder:</p>
              <p className="text-gray-300 mb-2">
                A 3-to-8 decoder is a combinational circuit that converts 3 input lines into 8 output lines, where exactly one output is active (one-hot output).
              </p>
              <p className="text-gray-300"><b>Inputs:</b> 3 input lines (A, B, C)</p>
              <p className="text-gray-300"><b>Outputs:</b> 8 output lines (Y₀ to Y₇)</p>
              <p className="text-gray-300"><b>Enable Input (optional):</b> Enable signal to activate the decoder</p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Truth Table:</p>
              <TruthTable
                headers={['A', 'B', 'C', 'Y₀', 'Y₁', 'Y₂', 'Y₃', 'Y₄', 'Y₅', 'Y₆', 'Y₇']}
                rows={[
                  ['0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0'],
                  ['0', '0', '1', '0', '1', '0', '0', '0', '0', '0', '0'],
                  ['0', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0'],
                  ['0', '1', '1', '0', '0', '0', '1', '0', '0', '0', '0'],
                  ['1', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0'],
                  ['1', '0', '1', '0', '0', '0', '0', '0', '1', '0', '0'],
                  ['1', '1', '0', '0', '0', '0', '0', '0', '0', '1', '0'],
                  ['1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '1'],
                ]}
                title="3-to-8 Decoder Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Output Equations:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Y₀ = A'B'C'
Y₁ = A'B'C
Y₂ = A'BC'
Y₃ = A'BC
Y₄ = AB'C'
Y₅ = AB'C
Y₆ = ABC'
Y₇ = ABC`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Implementation:</p>
              <p className="text-gray-300 mb-2">
                3-to-8 decoder can be implemented using:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li>8 AND gates (one for each output)</li>
                <li>3 NOT gates (for complementing input lines)</li>
                <li>Each AND gate receives appropriate combination of A, B, C and their complements</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Applications:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li><span className="text-cyan-300">Memory Address Decoding:</span> Selecting memory locations</li>
                <li><span className="text-cyan-300">I/O Port Selection:</span> Selecting I/O devices</li>
                <li><span className="text-cyan-300">Function Implementation:</span> Implementing Boolean functions using OR gates</li>
                <li><span className="text-cyan-300">Seven-Segment Display:</span> Driving display segments</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        {/* Question 25 */}
        <QuestionCard
          number={25}
          question="Design a Full Adder circuit utilizing an appropriate decoder and OR gates."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">Full Adder using 3-to-8 Decoder:</p>
              <p className="text-gray-300 mb-2">
                A full adder can be implemented using a 3-to-8 decoder and OR gates. The decoder generates minterms, and OR gates combine them to produce Sum and Carry outputs.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Full Adder Truth Table:</p>
              <TruthTable
                headers={['A', 'B', 'C_in', 'Sum (S)', 'C_out']}
                rows={[
                  ['0', '0', '0', '0', '0'],
                  ['0', '0', '1', '1', '0'],
                  ['0', '1', '0', '1', '0'],
                  ['0', '1', '1', '0', '1'],
                  ['1', '0', '0', '1', '0'],
                  ['1', '0', '1', '0', '1'],
                  ['1', '1', '0', '0', '1'],
                  ['1', '1', '1', '1', '1'],
                ]}
                title="Full Adder Truth Table"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Minterm Representation:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Sum (S) = Σm(1,2,4,7)
        = m₁ + m₂ + m₄ + m₇
        = A'B'C_in + A'BC_in' + AB'C_in' + ABC_in

Carry (C_out) = Σm(3,5,6,7)
              = m₃ + m₅ + m₆ + m₇
              = A'BC_in + AB'C_in + ABC_in' + ABC_in`}
              </pre>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Implementation:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">3-to-8 Decoder:</span> Inputs A, B, C_in generate outputs Y₀ to Y₇ (minterms m₀ to m₇)</li>
                <li><span className="text-cyan-300">Sum OR Gate:</span> OR(Y₁, Y₂, Y₄, Y₇) → Sum</li>
                <li><span className="text-cyan-300">Carry OR Gate:</span> OR(Y₃, Y₅, Y₆, Y₇) → C_out</li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Block Diagram:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`A ──┐
B ──┤ → [3-to-8 Decoder] → Y₀, Y₁, Y₂, Y₃, Y₄, Y₅, Y₆, Y₇
C_in─┘
            Y₁, Y₂, Y₄, Y₇ ──→ [OR] → Sum
            Y₃, Y₅, Y₆, Y₇ ──→ [OR] → C_out`}
              </pre>
            </div>
          </div>
        </QuestionCard>

        {/* Question 26 */}
        <QuestionCard
          number={26}
          question="Name any two practical applications where an encoder is commonly used."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            
            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Application 1: Keyboard Encoding</p>
              <div className="bg-black/30 p-4 rounded-lg mb-3">
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-300">Scenario:</span> In computer keyboards, each key press needs to be converted into a binary code that the computer can understand.
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-300">How Encoder is used:</span>
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                  <li>Each key is connected to one input line of the encoder</li>
                  <li>When a key is pressed, the corresponding input becomes active</li>
                  <li>Encoder converts the active key into a binary code (ASCII or scan code)</li>
                  <li>The binary code is sent to the computer for processing</li>
                </ul>
                <p className="text-gray-300 mt-2">
                  <span className="text-cyan-300">Example:</span> 104-key keyboard uses encoders to generate scan codes for each key
                </p>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Application 2: Interrupt Request Encoding</p>
              <div className="bg-black/30 p-4 rounded-lg mb-3">
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-300">Scenario:</span> In computer systems, multiple devices can generate interrupt requests simultaneously. The processor needs to identify which device requested the interrupt.
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-300">How Encoder is used:</span>
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                  <li>Each interrupt source is connected to one input line of the encoder</li>
                  <li>Priority encoder determines the highest priority interrupt</li>
                  <li>Encoder outputs binary code representing the interrupt number</li>
                  <li>Processor uses this code to jump to the appropriate interrupt service routine</li>
                </ul>
                <p className="text-gray-300 mt-2">
                  <span className="text-cyan-300">Example:</span> Interrupt controller in microprocessors uses priority encoders to handle multiple interrupt requests
                </p>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Other Applications:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                <li><span className="text-cyan-300">Analog-to-Digital Conversion:</span> Encoding analog signal levels into digital codes</li>
                <li><span className="text-cyan-300">Position Encoding:</span> Encoding position of rotary switches or sliders</li>
                <li><span className="text-cyan-300">Data Compression:</span> Encoding frequently occurring patterns with shorter codes</li>
                <li><span className="text-cyan-300">Error Detection:</span> Encoding data with error detection codes</li>
              </ul>
            </div>
          </div>
        </QuestionCard>
      </CategorySection>

      {/* Category 7: PLD, PROM, PLA, PAL */}
      <CategorySection
        title="💾 PLD, PROM, PLA & PAL"
        icon="⚡"
        description="Programmable Logic Devices: PROM, PLA, PAL, and their applications"
      >
        {/* Questions 27-38 will be added here - condensed for space */}
        <QuestionCard
          number={27}
          question="What are the key characteristics of PLD's?"
        >
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
              <li><span className="text-cyan-300">Programmability:</span> Logic functions can be programmed after manufacturing</li>
              <li><span className="text-cyan-300">Reconfigurability:</span> Can be reprogrammed multiple times (depending on type)</li>
              <li><span className="text-cyan-300">Integration:</span> Multiple logic functions in a single chip</li>
              <li><span className="text-cyan-300">Cost-effective:</span> Reduces design time and manufacturing costs</li>
              <li><span className="text-cyan-300">Flexibility:</span> Easy to modify designs without changing hardware</li>
              <li><span className="text-cyan-300">Standardization:</span> Uses standard programming interfaces</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard
          number={28}
          question="Provide a concise classification of Programmable Logic Devices (PLDs)."
        >
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg">
              <p className="text-lg font-semibold text-amber-300 mb-2">PLD Classification:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">PROM (Programmable Read-Only Memory):</span> Fixed AND array, programmable OR array</li>
                <li><span className="text-cyan-300">PLA (Programmable Logic Array):</span> Programmable AND array, programmable OR array</li>
                <li><span className="text-cyan-300">PAL (Programmable Array Logic):</span> Programmable AND array, fixed OR array</li>
                <li><span className="text-cyan-300">CPLD (Complex PLD):</span> Multiple PAL blocks with programmable interconnect</li>
                <li><span className="text-cyan-300">FPGA (Field Programmable Gate Array):</span> Configurable Logic Blocks (CLB) with programmable interconnect</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        <QuestionCard
          number={29}
          question="List the applications of PROM."
        >
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
              <li><span className="text-cyan-300">Code Storage:</span> Storing firmware, boot code, and system initialization programs</li>
              <li><span className="text-cyan-300">Function Lookup Tables:</span> Implementing mathematical functions, trigonometric tables</li>
              <li><span className="text-cyan-300">Character Generation:</span> Storing font data for displays</li>
              <li><span className="text-cyan-300">Logic Implementation:</span> Implementing combinational logic functions</li>
              <li><span className="text-cyan-300">Microcode Storage:</span> Storing microcode for processors</li>
              <li><span className="text-cyan-300">Data Conversion:</span> Code conversion tables (BCD to binary, etc.)</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard
          number={30}
          question="Provide a brief overview of the typical architecture of a PROM, including its input structure and programmable logic diagram."
        >
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-lg font-semibold text-amber-300 mb-2">PROM Architecture:</p>
              <p className="text-gray-300 mb-2">
                PROM consists of two main parts: a fixed AND array (decoder) and a programmable OR array.
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Structure:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Fixed AND Array:</span> Generates all possible minterms (2^n for n inputs)</li>
                <li><span className="text-cyan-300">Programmable OR Array:</span> Selects minterms to form output functions</li>
                <li><span className="text-cyan-300">Input:</span> n address lines (input variables)</li>
                <li><span className="text-cyan-300">Output:</span> m output lines (output functions)</li>
              </ul>
            </div>
            <div>
              <p className="text-lg font-semibold text-amber-300 mb-2">Block Diagram:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Inputs → [Fixed AND Array] → [Programmable OR Array] → Outputs
         (Decoder: 2^n minterms)   (Fuses: Select minterms)`}
              </pre>
            </div>
          </div>
        </QuestionCard>

        {/* Questions 31-38 continue here */}
        <QuestionCard number={31} question="Design the full adder outputs using PROM and relevant decoder.">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p className="text-gray-300">Full adder has 3 inputs (A, B, C_in) and 2 outputs (Sum, C_out).</p>
            <p className="text-gray-300">Use 3-to-8 decoder (PROM decoder) to generate minterms, then program OR array:</p>
            <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Sum = Σm(1,2,4,7) = m₁ + m₂ + m₄ + m₇
C_out = Σm(3,5,6,7) = m₃ + m₅ + m₆ + m₇

PROM Structure:
- Fixed AND array: 3-to-8 decoder (generates m₀ to m₇)
- Programmable OR array: Select minterms for Sum and C_out`}
            </pre>
          </div>
        </QuestionCard>

        <QuestionCard number={32} question="Design the following Boolean functions using PROM: A(X,Y,Z) = Σm(5,6,7), B(X,Y,Z) = Σm(3,5,6,7)">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p className="text-gray-300">PROM with 3 inputs, 2 outputs:</p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
              <li>Fixed AND array: 3-to-8 decoder generates m₀ to m₇</li>
              <li>Programmable OR array for A: Connect m₅, m₆, m₇</li>
              <li>Programmable OR array for B: Connect m₃, m₅, m₆, m₇</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard number={33} question="Explore the applications of PLA & PAL models.">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
              <li><span className="text-cyan-300">Logic Implementation:</span> Implementing combinational and sequential logic</li>
              <li><span className="text-cyan-300">Prototyping:</span> Rapid prototyping of digital circuits</li>
              <li><span className="text-cyan-300">Custom Logic:</span> Custom logic functions without custom ICs</li>
              <li><span className="text-cyan-300">Code Conversion:</span> BCD to binary, binary to Gray code conversion</li>
              <li><span className="text-cyan-300">Arithmetic Circuits:</span> Adders, multipliers, comparators</li>
              <li><span className="text-cyan-300">Control Logic:</span> State machines, control units</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard number={34} question="A combinational circuit is defined by F1(A,B,C) = Σ(3,5,6,7) and F2(A,B,C) = Σ(0,2,4,7). Design with a PLA having three inputs, four product terms, and two outputs.">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p className="text-gray-300">PLA with programmable AND and OR arrays:</p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
              <li>Programmable AND array: Generate product terms</li>
              <li>F1 = Σm(3,5,6,7) = ABC + AB'C + ABC' + ABC = AB + AC</li>
              <li>F2 = Σm(0,2,4,7) = A'B'C' + A'BC' + AB'C' + ABC</li>
              <li>Product terms: P₁=ABC, P₂=AB'C, P₃=ABC', P₄=A'B'C'</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard number={35} question="Implement using PAL: A = XY' + X'Z + YZ', B = XY' + YZ' + YZ'">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p className="text-gray-300">PAL with programmable AND array and fixed OR array:</p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
              <li>A = XY' + X'Z + YZ'</li>
              <li>B = XY' + YZ' (simplified from given)</li>
              <li>Program AND array to generate product terms, fixed OR array combines them</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard number={36} question="Design a full adder using Programmable Array Logic (PAL).">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p className="text-gray-300">Full adder: Sum = A⊕B⊕C_in, C_out = AB + BC_in + AC_in</p>
            <p className="text-gray-300">PAL implementation:</p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
              <li>Programmable AND array generates product terms</li>
              <li>Fixed OR array combines terms for Sum and C_out</li>
              <li>Sum requires: A'B'C_in, A'BC_in', AB'C_in', ABC_in</li>
              <li>C_out requires: AB, BC_in, AC_in</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard number={37} question="Implement a full adder output using Programmable Logic Array (PLA).">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p className="text-gray-300">PLA with programmable AND and OR arrays:</p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
              <li>Program AND array to generate product terms</li>
              <li>Program OR array for Sum: Combine m(1,2,4,7)</li>
              <li>Program OR array for C_out: Combine m(3,5,6,7)</li>
              <li>More flexible than PAL as both arrays are programmable</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard number={38} question="Compare and contrast PROM, PAL & PLA using schematic diagrams.">
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-amber-300 font-semibold mb-2">PROM</p>
                <p className="text-gray-300 text-sm">Fixed AND (decoder), Programmable OR</p>
                <p className="text-cyan-300 text-sm mt-2">All minterms generated</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-amber-300 font-semibold mb-2">PLA</p>
                <p className="text-gray-300 text-sm">Programmable AND, Programmable OR</p>
                <p className="text-cyan-300 text-sm mt-2">Most flexible</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-amber-300 font-semibold mb-2">PAL</p>
                <p className="text-gray-300 text-sm">Programmable AND, Fixed OR</p>
                <p className="text-cyan-300 text-sm mt-2">Faster, less flexible</p>
              </div>
            </div>
          </div>
        </QuestionCard>
      </CategorySection>

      {/* Category 8: CPLD & FPGA */}
      <CategorySection
        title="🔧 CPLD & FPGA"
        icon="⚙️"
        description="Complex Programmable Logic Devices and Field Programmable Gate Arrays"
      >
        <QuestionCard number={39} question="Explore the applications of CPLD in the circuit design.">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
              <li><span className="text-cyan-300">Interface Logic:</span> Bus interfaces, protocol converters</li>
              <li><span className="text-cyan-300">State Machines:</span> Control logic, finite state machines</li>
              <li><span className="text-cyan-300">Glue Logic:</span> Interconnecting components</li>
              <li><span className="text-cyan-300">Timing Control:</span> Clock generation, delay circuits</li>
              <li><span className="text-cyan-300">I/O Expansion:</span> Expanding I/O ports</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard number={40} question="Elaborate on the architecture of a CPLD with neat diagram.">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-amber-300 font-semibold mb-2">CPLD Architecture:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Macro-cells:</span> Basic logic units (PAL-like blocks)</li>
                <li><span className="text-cyan-300">Programmable Interconnect:</span> Connects macro-cells</li>
                <li><span className="text-cyan-300">I/O Blocks:</span> Interface with external signals</li>
                <li><span className="text-cyan-300">Clock Distribution:</span> Global and local clocks</li>
              </ul>
            </div>
            <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`[I/O Block] → [Macro-cell] → [Interconnect] → [Macro-cell] → [I/O Block]
                ↓                ↓                ↓
            [PAL Block]    [Switch Matrix]   [PAL Block]`}
            </pre>
          </div>
        </QuestionCard>

        <QuestionCard number={41} question="Draw & present insights of FPGA architecture, focusing on Configurable Logic Blocks (CLB) and Look Up Tables (LUT).">
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-amber-300 font-semibold mb-2">FPGA Architecture:</p>
              <p className="text-gray-300 mb-2">FPGA consists of:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">CLB (Configurable Logic Block):</span> Basic logic unit containing LUTs and flip-flops</li>
                <li><span className="text-cyan-300">LUT (Look-Up Table):</span> Implements combinational logic functions</li>
                <li><span className="text-cyan-300">Programmable Interconnect:</span> Connects CLBs</li>
                <li><span className="text-cyan-300">I/O Blocks:</span> Interface with external signals</li>
                <li><span className="text-cyan-300">Block RAM:</span> On-chip memory</li>
              </ul>
            </div>
            <div>
              <p className="text-amber-300 font-semibold mb-2">CLB Structure:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`CLB:
  [LUT] → [MUX] → [Flip-flop] → Output
  [LUT] ↗         (D-FF)
  Inputs`}
              </pre>
            </div>
            <div>
              <p className="text-amber-300 font-semibold mb-2">LUT (2-input example):</p>
              <p className="text-gray-300 text-sm">LUT stores truth table values. For 2-input LUT: 4 memory cells store function values for all input combinations.</p>
            </div>
          </div>
        </QuestionCard>

        <QuestionCard number={42} question="Design the function F = x₁x₃x₆' + x₁x₄x₅x₆' + x₂x₃x₇ + x₂x₄x₅x₇ using CPLD and flip-flops.">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <p className="text-gray-300">Function has 7 variables. CPLD implementation:</p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
              <li>Decompose into product terms: P₁=x₁x₃x₆', P₂=x₁x₄x₅x₆', P₃=x₂x₃x₇, P₄=x₂x₄x₅x₇</li>
              <li>Use macro-cells to implement each product term</li>
              <li>OR gates combine product terms</li>
              <li>Flip-flops for sequential logic if needed</li>
            </ul>
          </div>
        </QuestionCard>

        <QuestionCard number={43} question="Expand the acronyms CPLD & FPGA and Compare them emphasizing their distinct characteristics.">
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-amber-300 font-semibold mb-2">Acronyms:</p>
              <p className="text-gray-300"><span className="text-cyan-300">CPLD:</span> Complex Programmable Logic Device</p>
              <p className="text-gray-300"><span className="text-cyan-300">FPGA:</span> Field Programmable Gate Array</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-amber-300 font-semibold mb-2">CPLD</p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1 text-sm">
                  <li>PAL-based architecture</li>
                  <li>Non-volatile configuration</li>
                  <li>Predictable timing</li>
                  <li>Lower capacity</li>
                  <li>Faster for simple logic</li>
                </ul>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-amber-300 font-semibold mb-2">FPGA</p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1 text-sm">
                  <li>LUT-based architecture</li>
                  <li>Volatile configuration</li>
                  <li>Less predictable timing</li>
                  <li>Higher capacity</li>
                  <li>More flexible</li>
                </ul>
              </div>
            </div>
          </div>
        </QuestionCard>

        <QuestionCard number={44} question="The CPLDs are designed with thousands of compact cells to implement both combinational and sequential circuits. With neat diagram illustrate these compact cells in CPLDs & demonstrate the role of each block.">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-amber-300 font-semibold mb-2">Macro-cell Structure:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">AND Array:</span> Generates product terms</li>
                <li><span className="text-cyan-300">OR Gate:</span> Combines product terms</li>
                <li><span className="text-cyan-300">XOR Gate:</span> Optional complement</li>
                <li><span className="text-cyan-300">Flip-flop:</span> Sequential logic (D-FF)</li>
                <li><span className="text-cyan-300">MUX:</span> Selects combinational or registered output</li>
                <li><span className="text-cyan-300">I/O Buffer:</span> Interface with external signals</li>
              </ul>
            </div>
            <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Macro-cell:
Inputs → [AND Array] → [OR] → [XOR] → [MUX] → Output
                          ↓            ↑
                      [Flip-flop] ─────┘
                          ↓
                      [I/O Buffer]`}
            </pre>
          </div>
        </QuestionCard>

        <QuestionCard number={45} question="Explain the construction of Configurable Logic Blocks (CLB) with diagram.">
          <div className="mt-3 text-gray-200 space-y-3">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-amber-300 font-semibold mb-2">CLB Structure:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">LUTs:</span> Implement combinational logic (typically 4-6 inputs)</li>
                <li><span className="text-cyan-300">MUX:</span> Selects LUT outputs</li>
                <li><span className="text-cyan-300">Flip-flops:</span> Store state (D-FF, T-FF, etc.)</li>
                <li><span className="text-cyan-300">Clock:</span> Clock input for flip-flops</li>
                <li><span className="text-cyan-300">Enable:</span> Enable signal for flip-flops</li>
              </ul>
            </div>
            <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`CLB:
  [LUT₁] ──┐
  [LUT₂] ──┼─→ [MUX] → [Flip-flop] → Output
  [LUT₃] ──┘         ↑
                     Clock`}
            </pre>
          </div>
        </QuestionCard>

        <QuestionCard number={46} question="What is Look-UP Table (LUT). Explain the structure of 2-input LUT.">
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-amber-300 font-semibold mb-2">Look-Up Table (LUT):</p>
              <p className="text-gray-300 mb-2">
                A LUT is a memory-based circuit that implements combinational logic functions by storing truth table values in memory cells.
              </p>
            </div>
            <div>
              <p className="text-amber-300 font-semibold mb-2">2-input LUT Structure:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Memory Cells:</span> 4 cells (2²) storing function values</li>
                <li><span className="text-cyan-300">Address Decoder:</span> 2-to-4 decoder selects memory cell</li>
                <li><span className="text-cyan-300">Output:</span> Value from selected memory cell</li>
              </ul>
            </div>
            <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`2-input LUT:
A,B → [2-to-4 Decoder] → Select memory cell
                        ↓
                    [Memory: 4 cells]
                        ↓
                      Output`}
            </pre>
            <p className="text-gray-300 text-sm mt-2">Example: For F(A,B) = A+B, memory stores [0,1,1,1] for inputs [00,01,10,11]</p>
          </div>
        </QuestionCard>
      </CategorySection>

      {/* Category 9: Reversible Gates */}
      <CategorySection
        title="🔄 Reversible Gates"
        icon="🔁"
        description="Reversible logic gates and their applications in low-power design"
      >
        <QuestionCard number={47} question="Describe the concept of reversible gates. List out the advantages and applications of reversible logic gates.">
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-amber-300 font-semibold mb-2">Reversible Gates:</p>
              <p className="text-gray-300 mb-2">
                Reversible gates are logic gates where the input can be uniquely determined from the output. They have the same number of inputs and outputs, and the input-output mapping is bijective (one-to-one).
              </p>
            </div>
            <div>
              <p className="text-amber-300 font-semibold mb-2">Advantages:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Low Power Dissipation:</span> No information loss means no energy dissipation (Landauer's principle)</li>
                <li><span className="text-cyan-300">No Information Loss:</span> Input can be recovered from output</li>
                <li><span className="text-cyan-300">Quantum Computing:</span> Essential for quantum circuits</li>
                <li><span className="text-cyan-300">Error Correction:</span> Easier error detection and correction</li>
                <li><span className="text-cyan-300">Heat Reduction:</span> Reduced heat generation in circuits</li>
              </ul>
            </div>
            <div>
              <p className="text-amber-300 font-semibold mb-2">Applications:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Quantum Computing:</span> Quantum circuits require reversible operations</li>
                <li><span className="text-cyan-300">Low-Power Design:</span> Energy-efficient digital circuits</li>
                <li><span className="text-cyan-300">Nanotechnology:</span> Nano-scale circuits with minimal power</li>
                <li><span className="text-cyan-300">Cryptography:</span> Reversible encryption algorithms</li>
                <li><span className="text-cyan-300">Optical Computing:</span> Optical logic circuits</li>
              </ul>
            </div>
          </div>
        </QuestionCard>

        <QuestionCard number={48} question="With block diagram and truth table, demonstrate the construction of Feynman Gate and explain how it can be termed as reversible gate.">
          <div className="mt-3 text-gray-200 space-y-4">
            <p><b className="text-cyan-400">Solution:</b></p>
            <div className="bg-black/30 p-4 rounded-lg mb-3">
              <p className="text-amber-300 font-semibold mb-2">Feynman Gate (CNOT Gate):</p>
              <p className="text-gray-300 mb-2">
                Feynman gate is a 2×2 reversible gate with 2 inputs (A, B) and 2 outputs (P, Q).
              </p>
              <p className="text-gray-300"><b>Outputs:</b> P = A, Q = A ⊕ B</p>
            </div>
            <div>
              <p className="text-amber-300 font-semibold mb-2">Truth Table:</p>
              <TruthTable
                headers={['A', 'B', 'P', 'Q']}
                rows={[
                  ['0', '0', '0', '0'],
                  ['0', '1', '0', '1'],
                  ['1', '0', '1', '1'],
                  ['1', '1', '1', '0'],
                ]}
                title="Feynman Gate Truth Table"
              />
            </div>
            <div>
              <p className="text-amber-300 font-semibold mb-2">Block Diagram:</p>
              <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-100 font-mono overflow-x-auto">
{`Feynman Gate:
A ──→ [─] ──→ P = A
      │
B ──→ [⊕] ──→ Q = A⊕B
      ↑
      A`}
              </pre>
            </div>
            <div>
              <p className="text-amber-300 font-semibold mb-2">Reversibility:</p>
              <p className="text-gray-300 mb-2">
                Feynman gate is reversible because:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li><span className="text-cyan-300">Same number of inputs and outputs:</span> 2 inputs, 2 outputs</li>
                <li><span className="text-cyan-300">Bijective mapping:</span> Each input combination maps to a unique output combination</li>
                <li><span className="text-cyan-300">Input recovery:</span> From outputs P and Q, inputs A and B can be recovered:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                    <li>A = P</li>
                    <li>B = P ⊕ Q = A ⊕ (A ⊕ B) = B</li>
                  </ul>
                </li>
                <li><span className="text-cyan-300">Function:</span> P copies A, Q is XOR of A and B (used for copying signals)</li>
              </ul>
            </div>
          </div>
        </QuestionCard>
      </CategorySection>
    </div>
  )
}

// Category Section Component
function CategorySection({
  title,
  icon,
  description,
  children,
}: {
  title: string
  icon: string
  description: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="glass-card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </motion.div>
  )
}

// Question Card Component
function QuestionCard({
  number,
  question,
  children,
}: {
  number: number
  question: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 mb-4 hover:border-cyan-400/50 transition-all duration-300"
    >
      <details className="group">
        <summary className="cursor-pointer text-cyan-400 font-semibold text-lg mb-2 list-none flex items-start gap-2 hover:text-cyan-300 transition-colors">
          <span className="text-amber-400 font-bold">{number}️⃣</span>
          <span className="flex-1">{question}</span>
          <span className="text-gray-400 group-open:hidden">▼</span>
          <span className="text-gray-400 hidden group-open:inline">▲</span>
        </summary>
        <div className="mt-4 pt-4 border-t border-white/10">
          {children}
        </div>
      </details>
    </motion.div>
  )
}

