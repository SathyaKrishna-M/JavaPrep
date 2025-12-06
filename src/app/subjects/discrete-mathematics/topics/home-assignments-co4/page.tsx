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
                    <p className="font-semibold text-cyan-400">Step 1: Analyze Roots and Multiplicities</p>
                    <p className="text-gray-300">
                        We list each distinct root and how many times it appears (multiplicity <MathRenderer math="m" />).
                    </p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                        <li><strong>Root 1:</strong> Appears once (<MathRenderer math="m=1" />). Term: <MathRenderer math="c_1(1)^n" /></li>
                        <li><strong>Root -2:</strong> Appears twice (<MathRenderer math="m=2" />). Terms: <MathRenderer math="(c_2 + c_3n)(-2)^n" /></li>
                        <li><strong>Root 4:</strong> Appears twice (<MathRenderer math="m=2" />). Terms: <MathRenderer math="(c_4 + c_5n)(4)^n" /></li>
                        <li><strong>Root 7:</strong> Appears once (<MathRenderer math="m=1" />). Term: <MathRenderer math="c_6(7)^n" /></li>
                        <li><strong>Root 8:</strong> Appears once (<MathRenderer math="m=1" />). Term: <MathRenderer math="c_7(8)^n" /></li>
                    </ul>
                    <p className="font-semibold text-cyan-400">Step 2: Combine into General Solution</p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
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
                    <p className="font-semibold text-cyan-400">Step 1: Solve Homogeneous Part</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            Equation: <MathRenderer math="a_n + 3a_{n-1} - 10a_{n-2} = 0" />
                            <br />
                            Characteristic Eq: <MathRenderer math="r^2 + 3r - 10 = 0" />
                            <br />
                            Factor: <MathRenderer math="(r+5)(r-2) = 0" />
                            <br />
                            Roots: <MathRenderer math="r = -5, r = 2" />
                            <br />
                            <MathRenderer math="a_n^{(h)} = c_1(-5)^n + c_2(2)^n" />
                        </p>
                    </div>

                    <p className="font-semibold text-cyan-400">Step 2: Find Particular Solution</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <MathRenderer math="F(n) = 5 \cdot 2^n" />.
                            <br />
                            Normally we guess <MathRenderer math="A \cdot 2^n" />.
                            <br />
                            <span className="text-yellow-300">Conflict!</span> 2 is already a root of the homogeneous equation.
                            <br />
                            Multiply guess by <MathRenderer math="n" />: <MathRenderer math="a_n^{(p)} = A \cdot n \cdot 2^n" />.
                        </p>
                        <p className="text-gray-300 mt-2">
                            Substitute into original recurrence:
                            <br />
                            <MathRenderer display math="A n 2^n = -3 A (n-1) 2^{n-1} + 10 A (n-2) 2^{n-2} + 5 \cdot 2^n" />
                            Divide whole equation by <MathRenderer math="2^{n-2}" /> to simplify:
                            <br />
                            <MathRenderer display math="A n \cdot 2^2 = -3 A (n-1) \cdot 2^1 + 10 A (n-2) + 5 \cdot 2^2" />
                            <MathRenderer display math="4An = -6A(n-1) + 10A(n-2) + 20" />
                            <MathRenderer display math="4An = -6An + 6A + 10An - 20A + 20" />
                            <MathRenderer display math="4An = 4An - 14A + 20" />
                            <MathRenderer display math="14A = 20 \implies A = 20/14 = 10/7" />
                            <br />
                            So, <MathRenderer math="a_n^{(p)} = \frac{10}{7} n 2^n" />.
                        </p>
                    </div>

                    <p className="font-semibold text-cyan-400">Step 3: General Solution</p>
                    <p className="text-gray-300">
                        <MathRenderer math="a_n = c_1(-5)^n + c_2(2)^n + \frac{10}{7}n 2^n" />.
                    </p>

                    <p className="font-semibold text-cyan-400">Step 4: Solve for Constants</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            For <MathRenderer math="n=0" />: <MathRenderer math="c_1 + c_2 = 0 \implies c_2 = -c_1" />.
                            <br />
                            For <MathRenderer math="n=1" />: <MathRenderer math="-5c_1 + 2c_2 + \frac{10}{7}(1)(2) = 1" />
                            <br />
                            Sub <MathRenderer math="c_2 = -c_1" />: <MathRenderer math="-5c_1 - 2c_1 + 20/7 = 1" />
                            <br />
                            <MathRenderer math="-7c_1 = 1 - 20/7 = -13/7" />
                            <br />
                            <MathRenderer math="c_1 = 13/49" />. Hence <MathRenderer math="c_2 = -13/49" />.
                        </p>
                    </div>

                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <p className="font-semibold text-green-400">Final Answer:</p>
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
                    <p className="font-semibold text-cyan-400">Step 1: Characteristic Equation</p>
                    <p className="text-gray-300">
                        Rewrite recurrence: <MathRenderer math="a_n + 2a_{n-1} - 15a_{n-2} = 0" />.
                        <br />
                        Characteristic Eq: <MathRenderer math="r^2 + 2r - 15 = 0" />.
                        <br />
                        Factor: <MathRenderer math="(r+5)(r-3) = 0" />.
                        <br />
                        Roots: <MathRenderer math="r_1 = -5, r_2 = 3" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: General Form</p>
                    <p className="text-gray-300">
                        <MathRenderer math="a_n = c_1(-5)^n + c_2(3)^n" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 3: Apply Initial Conditions</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            1. <MathRenderer math="a_0 = 1 \implies c_1 + c_2 = 1" />
                            <br />
                            2. <MathRenderer math="a_1 = -1 \implies -5c_1 + 3c_2 = -1" />
                            <br />
                            <br />
                            Solve system:
                            <br />
                            Multiply Eq 1 by 5: <MathRenderer math="5c_1 + 5c_2 = 5" />.
                            <br />
                            Add to Eq 2: <MathRenderer math="(5c_1 - 5c_1) + (5c_2 + 3c_2) = 5 - 1" />
                            <br />
                            <MathRenderer math="8c_2 = 4 \implies c_2 = 1/2" />.
                            <br />
                            Substitute back: <MathRenderer math="c_1 + 1/2 = 1 \implies c_1 = 1/2" />.
                        </p>
                    </div>
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
                    <p className="font-semibold text-cyan-400">Step 1: Homogeneous Part</p>
                    <p className="text-gray-300">
                        Rearrange: <MathRenderer math="a_n + 16a_{n-2} = 58" />.
                        <br />
                        Homogeneous: <MathRenderer math="r^2 + 16 = 0 \implies r^2 = -16 \implies r = \pm 4i" />.
                        <br />
                        Complex roots <MathRenderer math="0 \pm 4i" />. Modulus <MathRenderer math="R=4" />, Angle <MathRenderer math="\theta = \pi/2" />.
                        <br />
                        <MathRenderer math="a_n^{(h)} = 4^n(A \cos(n\pi/2) + B \sin(n\pi/2))" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 2: Particular Solution</p>
                    <p className="text-gray-300">
                        RHS is constant (58). Guess <MathRenderer math="a_n^{(p)} = C" /> (constant).
                        <br />
                        Substitute: <MathRenderer math="C + 16C = 58 \implies 17C = 58 \implies C = 58/17" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 3: Initial Conditions</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            General: <MathRenderer math="a_n = 4^n(A \cos(n\pi/2) + B \sin(n\pi/2)) + 58/17" />.
                            <br />
                            <br />
                            <MathRenderer math="n=0: a_0 = 16" />.
                            <br />
                            <MathRenderer math="4^0(A(1) + B(0)) + 58/17 = 16" />
                            <br />
                            <MathRenderer math="A = 16 - 58/17 = \frac{272-58}{17} = \frac{214}{17}" />.
                            <br />
                            <br />
                            <MathRenderer math="n=1: a_1 = 80" />.
                            <br />
                            <MathRenderer math="4^1(A(0) + B(1)) + 58/17 = 80" />
                            <br />
                            <MathRenderer math="4B = 80 - 58/17 = \frac{1360-58}{17} = \frac{1302}{17}" />
                            <br />
                            <MathRenderer math="B = \frac{1302}{17 \times 4} = \frac{651}{34}" />.
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
                    <p className="font-semibold text-cyan-400">Step 1: Setup Generating Function</p>
                    <p className="text-gray-300">
                        Let <MathRenderer math="G(x) = \sum_{n=0}^{\infty} a_n x^n" />.
                        <br />
                        Multiply recurrence <MathRenderer math="a_n - 8a_{n-1} = 10^{n-1}" /> by <MathRenderer math="x^n" /> and sum from <MathRenderer math="n=1" />.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="\sum_{n=1}^\infty a_n x^n - 8x \sum_{n=1}^\infty a_{n-1} x^{n-1} = x \sum_{n=1}^\infty 10^{n-1} x^{n-1}" />
                        <p className="text-gray-300 mt-2">
                            Recall: <MathRenderer math="\sum_{n=1} a_n x^n = G(x) - a_0" />.
                            <br />
                            Recall: <MathRenderer math="\sum_{k=0} r^k x^k = \frac{1}{1-rx}" />.
                            <br />
                            <br />
                            Substitute:
                            <br />
                            <MathRenderer math="(G(x) - 1) - 8x G(x) = \frac{x}{1-10x}" />.
                        </p>
                    </div>
                    <p className="font-semibold text-cyan-400">Step 2: Solve for G(x)</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <MathRenderer display math="G(x)(1 - 8x) = 1 + \frac{x}{1-10x}" />
                        <MathRenderer display math="= \frac{1-10x + x}{1-10x} = \frac{1-9x}{1-10x}" />
                        <MathRenderer display math="G(x) = \frac{1-9x}{(1-8x)(1-10x)}" />
                    </div>
                    <p className="font-semibold text-cyan-400">Step 3: Partial Fractions</p>
                    <p className="text-gray-300">
                        Decompose: <MathRenderer math="\frac{A}{1-8x} + \frac{B}{1-10x} = \frac{1-9x}{(1-8x)(1-10x)}" />.
                        <br />
                        Solving for constants gives <MathRenderer math="A=1/2, B=1/2" />.
                    </p>
                    <p className="font-semibold text-cyan-400">Step 4: Inverse Transform</p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <MathRenderer display math="a_n = \frac{1}{2}(8)^n + \frac{1}{2}(10)^n" />
                    </div>
                </div>
            ),
            formula: 'a_n = \\frac{1}{2}8^n + \\frac{1}{2}10^n',
        },
        {
            question: '6. Write the Incidence matrix of the following graph.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        An Incidence Matrix has Rows = Vertices and Columns = Edges.
                        <br />
                        For directed graphs:
                        <ul className="list-disc list-inside ml-4">
                            <li><strong>+1</strong>: Edge leaves vertex (Out)</li>
                            <li><strong>-1</strong>: Edge enters vertex (In)</li>
                            <li><strong>0</strong>: Vertex not involved</li>
                        </ul>
                    </p>
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
                </div>
            ),
        },
        {
            question: '7. Determine degrees and neighborhoods of vertices in graph H.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        <strong>Degree:</strong> Number of edges touching a vertex. Loops count twice.
                        <br />
                        <strong>Neighborhood:</strong> Set of adjacent vertices.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                            <p className="font-semibold text-cyan-400 mb-2">Detailed Degrees:</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                <li><strong>a:</strong> Edges to b, d, e, d (Parallel edge). Sum = 4.</li>
                                <li><strong>b:</strong> Edges to a, c, d, e + Loop unique to b. Sum = 4.</li>
                                <li><strong>c:</strong> Pendant vertex (only to b). Sum = 1.</li>
                                <li><strong>d:</strong> Edges to a, b, e, a. Sum = 4.</li>
                                <li><strong>e:</strong> Edges to a, b, d. Sum = 3.</li>
                            </ul>
                        </div>
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                            <p className="font-semibold text-purple-400 mb-2">Neighborhoods N(v):</p>
                            <p className="text-gray-300 text-sm mb-2">Vertices connected directly by an edge.</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                <li><MathRenderer math="N(a) = \{b, d, e\}" /></li>
                                <li><MathRenderer math="N(b) = \{a, c, d, e, b\}" /> (Self-loop includes b)</li>
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
                    <p className="font-semibold text-cyan-400">Step 1: Invariants Check</p>
                    <ul className="list-disc list-inside text-gray-300">
                        <li>Vertices: Both have 5.</li>
                        <li>Edges: Both have 5.</li>
                        <li>Degrees: Every vertex in G is degree 2. Every vertex in G&apos; is degree 2.</li>
                    </ul>
                    <p className="font-semibold text-cyan-400">Step 2: Structural Analysis</p>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 my-2">
                        <p className="text-gray-300">
                            <MathRenderer math="G" /> (Star): Follow edges <MathRenderer math="1 \to 3 \to 5 \to 2 \to 4 \to 1" />. It is a single cycle of length 5 (<MathRenderer math="C_5" />).
                            <br />
                            <MathRenderer math="G'" /> (Pentagon): It is clearly a cycle of length 5 (<MathRenderer math="C_5" />).
                        </p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <p className="text-gray-300">
                            Since both graphs are essentially a single Cycle <MathRenderer math="C_5" /> merely drawn differently, they are isomorphic.
                        </p>
                        <p className="text-green-400 font-bold">Verdict: Isomorphic</p>
                    </div>
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
                    <p className="font-semibold text-cyan-400">Step 1: Check Invariants</p>
                    <p className="text-gray-300">Both graphs have 8 vertices and are 3-regular (degree 3 everywhere).</p>
                    <p className="font-semibold text-cyan-400">Step 2: Check Cycles (Substructures)</p>
                    <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30 my-2">
                        <p className="text-gray-300">
                            Look at Graph <MathRenderer math="H" />: There is a triangle (<MathRenderer math="C_3" />) formed by <MathRenderer math="v_1, v_2, v_5" />.
                            <br />
                            Look at Graph <MathRenderer math="G" />: It is bipartite (can be colored with 2 colors). Bipartite graphs DO NOT have odd cycles (no triangles).
                        </p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <p className="text-gray-300">
                            One graph contains a triangle, the other does not. Structural property mismatch.
                        </p>
                        <p className="text-red-400 font-bold">Verdict: Not Isomorphic</p>
                    </div>
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
                    <p className="text-gray-300 text-sm">
                        <strong>Euler Circuit:</strong> All degrees even.
                        <br />
                        <strong>Euler Path:</strong> Exactly 0 or 2 odd degrees.
                        <br />
                        <strong>Hamiltonian:</strong> Visits every vertex exactly once (HARD to find).
                    </p>
                    <div className="space-y-3">
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                            <p className="font-semibold text-cyan-400">Graph G1</p>
                            <p className="text-gray-300 text-sm">
                                Odd degrees at 4 vertices. <span className="text-red-300">No Euler Path/Circuit.</span>
                                <br />
                                Hamiltonian? <span className="text-green-300">Yes</span> (Outer boundary cycle).
                            </p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                            <p className="font-semibold text-cyan-400">Graph G2 (Bowtie)</p>
                            <p className="text-gray-300 text-sm">
                                2 odd degrees (center knots). <span className="text-green-300">Has Euler Path</span>.
                                <br />
                                Hamiltonian? <span className="text-red-300">No</span> (Cut vertex in middle must be visited twice to cross).
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            question: '11. Is the following graph Hamiltonian? If so, draw cycle.',
            solution: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        This is the <strong>Hypercube <MathRenderer math="Q_3" /></strong> (Cube projection).
                    </p>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <p className="font-semibold text-green-400">Yes, it is Hamiltonian.</p>
                        <p className="text-gray-300 mt-2">
                            To find the cycle, trace the edges of a cube visiting every corner once:
                            <br />
                            <br />
                            Start <MathRenderer math="\to" /> 1-2-6-5-8-7-3-4 <MathRenderer math="\to" /> Back to 1.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            question: (
                <span>
                    15. Apply Dijkstra&apos;s Algorithm to find shortest path from <MathRenderer math="a" /> to <MathRenderer math="z" />.
                </span>
            ),
            solution: (
                <div className="space-y-4">
                    <p className="font-semibold text-cyan-400">Trace Table:</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-gray-300 border-collapse border border-slate-700">
                            <thead className="bg-slate-800 text-cyan-400">
                                <tr>
                                    <th className="border border-slate-700 p-2">Step</th>
                                    <th className="border border-slate-700 p-2">Selected Node (u)</th>
                                    <th className="border border-slate-700 p-2">Unvisited Set Distance Updates</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-slate-700 p-2">Init</td>
                                    <td className="border border-slate-700 p-2">-</td>
                                    <td className="border border-slate-700 p-2">a=0, others=∞</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-700 p-2">1</td>
                                    <td className="border border-slate-700 p-2"><strong>a (0)</strong></td>
                                    <td className="border border-slate-700 p-2">
                                        Update neighbors of a:<br />
                                        b: min(∞, 0+4) = 4<br />
                                        c: min(∞, 0+2) = 2
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-700 p-2">2</td>
                                    <td className="border border-slate-700 p-2"><strong>c (2)</strong></td>
                                    <td className="border border-slate-700 p-2">
                                        Update neighbors of c:<br />
                                        b: min(4, 2+1) = 3 (Updated)<br />
                                        d: min(∞, 2+8) = 10<br />
                                        e: min(∞, 2+10) = 12
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-700 p-2">3</td>
                                    <td className="border border-slate-700 p-2"><strong>b (3)</strong></td>
                                    <td className="border border-slate-700 p-2">
                                        Neighbors of b:<br />
                                        d: min(10, 3+5) = 8 (Updated)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-700 p-2">4</td>
                                    <td className="border border-slate-700 p-2"><strong>d (8)</strong></td>
                                    <td className="border border-slate-700 p-2">
                                        Neighbors of d:<br />
                                        e: min(12, 8+2) = 10 (Updated)<br />
                                        z: min(∞, 8+6) = 14
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-700 p-2">5</td>
                                    <td className="border border-slate-700 p-2"><strong>e (10)</strong></td>
                                    <td className="border border-slate-700 p-2">
                                        Neighbors of e:<br />
                                        z: min(14, 10+3) = 13 (Updated)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-700 p-2">6</td>
                                    <td className="border border-slate-700 p-2"><strong>z (13)</strong></td>
                                    <td className="border border-slate-700 p-2">Target reached.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 my-2">
                        <p className="font-semibold text-green-400">Final Path:</p>
                        <p className="text-gray-300">
                            Path: <MathRenderer math="a \to c \to b \to d \to e \to z" />
                            <br />
                            Total Weight: 13
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
