'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiEdit3 } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
    title: 'CO-4 Home Assignments',
    explanationSections: [
        {
            title: '📝 Assignment Overview',
            icon: <FiEdit3 className="w-6 h-6" />,
            content: `This section contains solutions to the Home Assignment problems for **CO-4: Recurrence Relations & Graph Theory**.
      
<span class="text-amber-300 font-semibold">Topics Covered:</span>
• Linear Homogeneous Recurrence Relations
• Generating Functions
• Graph Incidence Matrices & Degrees
• Isomorphism & Connectivity
• Euler & Hamiltonian Paths
• Planar Graphs & Coloring
• Dijkstra's Algorithm`,
        },
    ],
    practiceQuestions: [
        {
            question: (
                <span>
                    1. Roots of characteristic equation are 1, -2, -2, 4, 4, 7, 8. What is the form of the general solution?
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Roots & Multiplicities:</p>
                    <ul className="list-disc list-inside text-gray-300">
                        <li>1 (multiplicity 1)</li>
                        <li>-2 (multiplicity 2)</li>
                        <li>4 (multiplicity 2)</li>
                        <li>7 (multiplicity 1)</li>
                        <li>8 (multiplicity 1)</li>
                    </ul>
                    <p className="font-semibold text-cyan-400">General Solution:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="a_n = c_1(1)^n + (c_2 + c_3n)(-2)^n + (c_4 + c_5n)(4)^n + c_6(7)^n + c_7(8)^n" />
                    </div>
                </div>
            ),
            formula: 'a_n = c_1 + (c_2 + c_3n)(-2)^n + (c_4 + c_5n)4^n + c_6 7^n + c_7 8^n',
        },
        {
            question: (
                <span>
                    2. Solve <MathRenderer math="a_n = -3a_{n-1} + 10a_{n-2} + 5 \cdot 2^n" /> with <MathRenderer math="a_0 = 0, a_1 = 1" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">1. Homogeneous Part:</p>
                    <p className="text-gray-300">
                        <MathRenderer math="r^2 + 3r - 10 = 0 \implies (r+5)(r-2) = 0" />. Roots: -5, 2.
                        <br />
                        <MathRenderer math="a_n^{(h)} = c_1(-5)^n + c_2(2)^n" />.
                    </p>
                    <p className="font-semibold text-cyan-400">2. Particular Solution:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <MathRenderer math="F(n) = 5 \cdot 2^n" />. Since 2 is a root, guess <MathRenderer math="a_n^{(p)} = A \cdot n \cdot 2^n" />.
                            <br />
                            Substitute into recurrence:
                            <br />
                            <MathRenderer display math="A n 2^n = -3 A (n-1) 2^{n-1} + 10 A (n-2) 2^{n-2} + 5 \cdot 2^n" />
                            Divide by <MathRenderer math="2^{n-2}" />:
                            <br />
                            <MathRenderer display math="4An = -6A(n-1) + 10A(n-2) + 20" />
                            <MathRenderer display math="4An = -6An + 6A + 10An - 20A + 20" />
                            <MathRenderer display math="4An = 4An - 14A + 20" />
                            <MathRenderer display math="14A = 20 \implies A = 10/7" />
                            <br />
                            So <MathRenderer math="a_n^{(p)} = \frac{10}{7} n 2^n" />.
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">3. General Solution:</p>
                    <p className="text-gray-300">
                        <MathRenderer math="a_n = c_1(-5)^n + c_2(2)^n + \frac{10}{7}n 2^n" />.
                    </p>
                    <p className="font-semibold text-cyan-400">4. Initial Conditions:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <MathRenderer math="a_0 = 0 \implies c_1 + c_2 = 0 \implies c_2 = -c_1" />.
                            <br />
                            <MathRenderer math="a_1 = 1 \implies -5c_1 + 2c_2 + 20/7 = 1" />
                            <br />
                            <MathRenderer math="-5c_1 - 2c_1 = 1 - 20/7 = -13/7" />
                            <br />
                            <MathRenderer math="-7c_1 = -13/7 \implies c_1 = 13/49" />.
                            <br />
                            <MathRenderer math="c_2 = -13/49" />.
                        </p>
                    </div>
                    <p className="font-semibold text-green-400">Final Solution:</p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <MathRenderer display math="a_n = \frac{13}{49}(-5)^n - \frac{13}{49}2^n + \frac{10}{7}n 2^n" />
                    </div>
                </div>
            ),
            formula: 'a_n = \\frac{13}{49}(-5)^n - \\frac{13}{49}2^n + \\frac{10}{7}n 2^n',
        },
        {
            question: (
                <span>
                    3. Solve <MathRenderer math="a_n = -2a_{n-1} + 15a_{n-2}" /> for <MathRenderer math="n \ge 2" /> with <MathRenderer math="a_0 = 1, a_1 = -1" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Characteristic Equation:</p>
                    <p className="text-gray-300">
                        <MathRenderer math="r^2 + 2r - 15 = 0 \implies (r+5)(r-3) = 0" />. Roots: -5, 3.
                        <br />
                        General Solution: <MathRenderer math="a_n = c_1(-5)^n + c_2(3)^n" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Initial Conditions:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <MathRenderer math="a_0 = 1 \implies c_1 + c_2 = 1" />
                            <br />
                            <MathRenderer math="a_1 = -1 \implies -5c_1 + 3c_2 = -1" />
                            <br />
                            Multiply first eq by 5: <MathRenderer math="5c_1 + 5c_2 = 5" />
                            <br />
                            Add to second: <MathRenderer math="8c_2 = 4 \implies c_2 = 1/2" />.
                            <br />
                            <MathRenderer math="c_1 = 1 - 1/2 = 1/2" />.
                        </p>
                    </div>
                    <p className="font-semibold text-green-400">Final Solution:</p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <MathRenderer display math="a_n = \frac{1}{2}(-5)^n + \frac{1}{2}3^n" />
                    </div>
                </div>
            ),
            formula: 'a_n = \\frac{1}{2}(-5)^n + \\frac{1}{2}3^n',
        },
        {
            question: (
                <span>
                    4. Solve <MathRenderer math="a_n = 58 - 16a_{n-2}" /> for <MathRenderer math="n \ge 2" />, with <MathRenderer math="a_0 = 16, a_1 = 80" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Assuming <MathRenderer math="a_n + 16a_{n-2} = 58" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Homogeneous Part:</p>
                    <p className="text-gray-300">
                        <MathRenderer math="r^2 + 16 = 0 \implies r = \pm 4i" />.
                        <br />
                        <MathRenderer math="a_n^{(h)} = 4^n(A \cos(n\pi/2) + B \sin(n\pi/2))" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Particular Solution:</p>
                    <p className="text-gray-300">
                        <MathRenderer math="F(n) = 58" /> (constant). Guess <MathRenderer math="a_n^{(p)} = C" />.
                        <br />
                        <MathRenderer math="C + 16C = 58 \implies 17C = 58 \implies C = 58/17" />.
                    </p>
                    <p className="font-semibold text-cyan-400">General Solution:</p>
                    <p className="text-gray-300">
                        <MathRenderer math="a_n = 4^n(A \cos(n\pi/2) + B \sin(n\pi/2)) + 58/17" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Initial Conditions:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <MathRenderer math="a_0 = 16 \implies A + 58/17 = 16 \implies A = 16 - 58/17 = 214/17" />.
                            <br />
                            <MathRenderer math="a_1 = 80 \implies 4(B) + 58/17 = 80 \implies 4B = 80 - 58/17 = 1302/17 \implies B = 651/34" />.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            question: (
                <span>
                    5. Find explicit formula for <MathRenderer math="a_n = 8a_{n-1} + 10^{n-1}" /> with <MathRenderer math="a_0 = 1" /> using generating functions.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Recurrence: <MathRenderer math="a_n - 8a_{n-1} = 10^{n-1}" />.
                        <br />
                        Multiply by <MathRenderer math="x^n" /> and sum from <MathRenderer math="n=1" />:
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="\sum_{n=1}^\infty a_n x^n - 8x \sum_{n=1}^\infty a_{n-1} x^{n-1} = x \sum_{n=1}^\infty 10^{n-1} x^{n-1}" />
                        <MathRenderer display math="G(x) - a_0 - 8x G(x) = \frac{x}{1 - 10x}" />
                        <MathRenderer display math="G(x)(1 - 8x) = 1 + \frac{x}{1-10x} = \frac{1 - 10x + x}{1-10x} = \frac{1-9x}{1-10x}" />
                        <MathRenderer display math="G(x) = \frac{1-9x}{(1-8x)(1-10x)}" />
                    </div>
                    <p className="font-semibold text-cyan-400">Partial Fractions:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="\frac{1-9x}{(1-8x)(1-10x)} = \frac{A}{1-8x} + \frac{B}{1-10x}" />
                        <MathRenderer display math="1-9x = A(1-10x) + B(1-8x)" />
                        <p className="text-gray-300 mt-2">
                            Set <MathRenderer math="x = 1/8" />: <MathRenderer math="1 - 9/8 = -1/8 = A(1 - 10/8) = A(-2/8) \implies A = 1/2" />.
                            <br />
                            Set <MathRenderer math="x = 1/10" />: <MathRenderer math="1 - 9/10 = 1/10 = B(1 - 8/10) = B(2/10) \implies B = 1/2" />.
                        </p>
                    </div>
                    <p className="text-gray-300">
                        <MathRenderer math="G(x) = \frac{1/2}{1-8x} + \frac{1/2}{1-10x}" />
                        <br />
                        <MathRenderer math="a_n = \frac{1}{2}8^n + \frac{1}{2}10^n" />.
                    </p>
                </div>
            ),
            formula: 'a_n = \\frac{1}{2}8^n + \\frac{1}{2}10^n',
        },
        {
            question: '6. Write the Incidence matrix of the following graph.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Vertices: A, B, C, D, E (5 rows)
                        <br />
                        Edges: E1, E2, E3, E4, E5, E6, E7, E8 (8 columns)
                    </p>
                    <p className="font-semibold text-cyan-400">Directed Incidence Matrix (Out=+1, In=-1):</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2 overflow-x-auto">
                        <MathRenderer display math="\begin{bmatrix} 
                        & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 \\
                        A & 1 & 1 & 1 & 0 & 0 & 0 & 0 & 0 \\
                        B & -1 & 0 & 0 & 1 & 0 & 1 & 0 & 0 \\
                        C & 0 & -1 & 0 & 0 & 1 & 0 & 0 & 0 \\
                        D & 0 & 0 & -1 & -1 & -1 & 0 & 1 & 0 \\
                        E & 0 & 0 & 0 & 0 & 0 & -1 & -1 & 0
                        \end{bmatrix}" />
                    </div>
                    <p className="text-gray-300 text-sm italic">
                        (Note: E8 is a loop on D. Loops are typically represented as 0 in incidence matrix or special case depending on convention).
                    </p>
                </div>
            ),
        },
        {
            question: '7. Determine degrees and neighborhoods of vertices in graph H.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">Vertices: a, b, c, d, e.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                            <p className="font-semibold text-cyan-400 mb-2">Degrees:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                <li><MathRenderer math="\deg(a) = 4" /> (connected to b, d, e, d)</li>
                                <li><MathRenderer math="\deg(b) = 4" /> (connected to a, c, d, e + loop)</li>
                                <li><MathRenderer math="\deg(c) = 1" /> (connected to b)</li>
                                <li><MathRenderer math="\deg(d) = 4" /> (connected to a, b, e, a)</li>
                                <li><MathRenderer math="\deg(e) = 3" /> (connected to a, b, d)</li>
                            </ul>
                        </div>
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                            <p className="font-semibold text-purple-400 mb-2">Neighborhoods N(v):</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                <li><MathRenderer math="N(a) = \{b, d, e\}" /></li>
                                <li><MathRenderer math="N(b) = \{a, c, d, e, b\}" /></li>
                                <li><MathRenderer math="N(c) = \{b\}" /></li>
                                <li><MathRenderer math="N(d) = \{a, b, e\}" /></li>
                                <li><MathRenderer math="N(e) = \{a, b, d\}" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            question: (
                <span>
                    8. Determine whether graphs <MathRenderer math="G" /> and <MathRenderer math="G'" /> are isomorphic.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <MathRenderer math="G" /> is a 5-pointed star (inner pentagon). Vertices <MathRenderer math="v_1 \dots v_5" />.
                        <br />
                        <MathRenderer math="G'" /> is a pentagon <MathRenderer math="C_5" />. Vertices <MathRenderer math="v'_1 \dots v'_5" />.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">Check Degrees:</p>
                        <p className="text-gray-300">
                            <MathRenderer math="G" />: All vertices have degree 2. It forms a cycle <MathRenderer math="v_1-v_3-v_5-v_2-v_4-v_1" /> (Length 5).
                            <br />
                            <MathRenderer math="G'" />: Cycle <MathRenderer math="C_5" />. All vertices degree 2.
                        </p>
                    </div>
                    <p className="text-gray-300">
                        Both are 2-regular graphs with 5 vertices. Both are single cycles of length 5.
                        <br />
                        <span className="font-bold text-green-400">Yes, they are isomorphic.</span>
                    </p>
                </div>
            ),
        },
        {
            question: (
                <span>
                    9. Check whether graphs <MathRenderer math="G" /> and <MathRenderer math="H" /> are isomorphic.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <MathRenderer math="G" />: Bipartite (two squares connected). 8 vertices. 3-regular.
                        <br />
                        <MathRenderer math="H" />: 8 vertices. 3-regular.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">Check Cycles:</p>
                        <p className="text-gray-300">
                            <MathRenderer math="G" /> has no triangles (3-cycles) because it is bipartite (no odd cycles).
                            <br />
                            <MathRenderer math="H" /> has triangles? <MathRenderer math="v_1-v_2-v_5" /> is a triangle (3-cycle).
                        </p>
                    </div>
                    <p className="text-gray-300">
                        Since <MathRenderer math="H" /> has a triangle and <MathRenderer math="G" /> does not, they are <span className="font-bold text-red-400">NOT isomorphic</span>.
                    </p>
                </div>
            ),
        },
        {
            question: (
                <span>
                    10. Determine Eulerian trail, Circuit, Hamiltonian cycle for <MathRenderer math="G_1, G_2, G_3" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">G1:</p>
                        <p className="text-gray-300">
                            Degrees: a(3), b(3), c(4), d(3), e(3). 4 odd degrees.
                            <br />
                            <span className="text-red-300">No Euler Path or Circuit.</span>
                            <br />
                            Hamiltonian? <span className="text-green-300">Yes</span>, outer cycle a-b-c-d-e-a.
                        </p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">G2 (Bowtie):</p>
                        <p className="text-gray-300">
                            Degrees: a(2), b(2), c(3), d(3). 2 odd degrees (c, d).
                            <br />
                            <span className="text-green-300">Has Euler Path</span> (start c, end d). No Circuit.
                            <br />
                            Hamiltonian? <span className="text-red-300">No</span>, c is a cut vertex.
                        </p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">G3:</p>
                        <p className="text-gray-300">
                            Too many odd degrees (degree 1 vertices).
                            <br />
                            <span className="text-red-300">No Euler Path.</span>
                            <br />
                            Hamiltonian? <span className="text-red-300">No</span>, pendant vertices cannot be in a cycle.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            question: '11. Is the following graph Hamiltonian? If so, draw cycle.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Graph: Hypercube <MathRenderer math="Q_3" /> projection.
                        <br />
                        <span className="font-bold text-green-400">Yes, Q3 is Hamiltonian.</span>
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">Cycle:</p>
                        <p className="text-gray-300">
                            1-2-6-5-8-7-3-4-1
                        </p>
                    </div>
                </div>
            ),
        },
        {
            question: '12. Which graphs have Euler circuit? Construct it.',
            solution: (
                <div className="space-y-4">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="font-semibold text-cyan-400">Left Graph (Kite):</p>
                        <p className="text-gray-300">
                            Degrees: a(2), b(3), c(3), d(4), e(2). Odd degrees at b, c.
                            <br />
                            <span className="text-red-300">No Euler Circuit.</span> Has Euler Path.
                        </p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <p className="font-semibold text-green-400">Right Graph:</p>
                        <p className="text-gray-300">
                            Degrees: a(4), b(4), c(4), d(4), e(4), f(4).
                            <br />
                            All degrees are even. <span className="font-bold">Yes, has Euler Circuit.</span>
                            <br />
                            Construction: a-b-c-d-b-f-e-d-a-f-e-c-a.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            question: '13. Connected planar graph has 20 edges, 12 regions. Find vertices.',
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Euler's Formula:</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="r = e - v + 2" />
                        <MathRenderer display math="12 = 20 - v + 2" />
                        <MathRenderer display math="12 = 22 - v" />
                        <MathRenderer display math="v = 22 - 12 = 10 \text{ vertices}" />
                    </div>
                </div>
            ),
            formula: 'v = e - r + 2 = 20 - 12 + 2 = 10',
        },
        {
            question: (
                <span>
                    14. Find chromatic number of <MathRenderer math="K_{2,3}" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <MathRenderer math="K_{2,3}" /> is a complete bipartite graph.
                        <br />
                        Vertices partitioned into sets of size 2 and 3.
                        <br />
                        All bipartite graphs are 2-colorable.
                    </p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <p className="text-green-300">
                            Chromatic number <MathRenderer math="\chi = 2" />.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            question: (
                <span>
                    15. Apply Dijkstra's Algorithm to find shortest path from <MathRenderer math="a" /> to <MathRenderer math="z" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">Nodes: a, b, c, d, e, z.</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <ul className="list-none space-y-2 text-gray-300">
                            <li><strong>Step 0:</strong> a=0, others=∞. Unvisited: {`{a,b,c,d,e,z}`}</li>
                            <li><strong>Step 1:</strong> Select a (0). Neighbors: b(4), c(2). <br /> &nbsp;&nbsp; b=4, c=2.</li>
                            <li><strong>Step 2:</strong> Select c (2). Neighbors: b(1), d(8), e(10). <br /> &nbsp;&nbsp; Dist to b via c: 2+1=3 &lt; 4. Update b=3. <br /> &nbsp;&nbsp; d=2+8=10. e=2+10=12.</li>
                            <li><strong>Step 3:</strong> Select b (3). Neighbors: d(5). <br /> &nbsp;&nbsp; Dist to d via b: 3+5=8 &lt; 10. Update d=8.</li>
                            <li><strong>Step 4:</strong> Select d (8). Neighbors: z(6), e(2). <br /> &nbsp;&nbsp; Dist to z via d: 8+6=14. <br /> &nbsp;&nbsp; Dist to e via d: 8+2=10 &lt; 12. Update e=10.</li>
                            <li><strong>Step 5:</strong> Select e (10). Neighbors: z(3). <br /> &nbsp;&nbsp; Dist to z via e: 10+3=13 &lt; 14. Update z=13.</li>
                            <li><strong>Step 6:</strong> Select z (13). Done.</li>
                        </ul>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <p className="font-semibold text-green-400">Result:</p>
                        <p className="text-gray-300">
                            Shortest Path Length = 13.
                            <br />
                            Path: <MathRenderer math="a \to c \to b \to d \to e \to z" />.
                        </p>
                    </div>
                </div>
            ),
        },
    ],
}

export default function HomeAssignmentsCO4Page() {
    return <DMTopicPage content={content} />
}
