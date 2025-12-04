'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiEdit3 } from 'react-icons/fi'

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
            question: '1. Roots of characteristic equation are 1, -2, -2, 4, 4, 7, 8. What is the form of the general solution?',
            solution: 'Roots:\n• 1 (multiplicity 1)\n• -2 (multiplicity 2)\n• 4 (multiplicity 2)\n• 7 (multiplicity 1)\n• 8 (multiplicity 1)\n\nGeneral Solution:\na_n = c_1(1)^n + (c_2 + c_3n)(-2)^n + (c_4 + c_5n)(4)^n + c_6(7)^n + c_7(8)^n',
            formula: 'a_n = c_1 + (c_2 + c_3n)(-2)^n + (c_4 + c_5n)4^n + c_6 7^n + c_7 8^n',
        },
        {
            question: '2. Solve a_n = -3a_{n-1} + 10a_{n-2} + 5 * 2^n with a_0 = 0, a_1 = 1.',
            solution: '1. Homogeneous Part: r² + 3r - 10 = 0 => (r+5)(r-2) = 0. Roots: -5, 2.\n   a_n^{(h)} = c_1(-5)^n + c_2(2)^n.\n\n2. Particular Solution: F(n) = 5 * 2^n. Since 2 is a root, guess a_n^{(p)} = A * n * 2^n.\n   Substitute into recurrence:\n   A n 2^n = -3 A (n-1) 2^{n-1} + 10 A (n-2) 2^{n-2} + 5 * 2^n\n   Divide by 2^{n-2}:\n   4An = -6A(n-1) + 10A(n-2) + 20\n   4An = -6An + 6A + 10An - 20A + 20\n   4An = 4An - 14A + 20\n   14A = 20 => A = 10/7.\n   So a_n^{(p)} = (10/7) n 2^n.\n\n3. General Solution: a_n = c_1(-5)^n + c_2(2)^n + (10/7)n 2^n.\n\n4. Initial Conditions:\n   a_0 = 0 => c_1 + c_2 = 0 => c_2 = -c_1.\n   a_1 = 1 => -5c_1 + 2c_2 + 20/7 = 1\n   -5c_1 - 2c_1 = 1 - 20/7 = -13/7\n   -7c_1 = -13/7 => c_1 = 13/49.\n   c_2 = -13/49.\n\nFinal Solution: a_n = (13/49)(-5)^n - (13/49)2^n + (10/7)n 2^n.',
            formula: 'a_n = \\frac{13}{49}(-5)^n - \\frac{13}{49}2^n + \\frac{10}{7}n 2^n',
        },
        {
            question: '3. Solve a_n = -2a_{n-1} + 15a_{n-2} for n ≥ 2 with a_0 = 1, a_1 = -1.',
            solution: 'Characteristic Eq: r² + 2r - 15 = 0\n(r+5)(r-3) = 0. Roots: -5, 3.\nGeneral Solution: a_n = c_1(-5)^n + c_2(3)^n.\n\nInitial Conditions:\na_0 = 1 => c_1 + c_2 = 1\na_1 = -1 => -5c_1 + 3c_2 = -1\nMultiply first eq by 5: 5c_1 + 5c_2 = 5\nAdd to second: 8c_2 = 4 => c_2 = 1/2.\nc_1 = 1 - 1/2 = 1/2.\n\nFinal Solution: a_n = (1/2)(-5)^n + (1/2)3^n.',
            formula: 'a_n = \\frac{1}{2}(-5)^n + \\frac{1}{2}3^n',
        },
        {
            question: '4. Solve a_n = 58 - 16a_{n-2} for n ≥ 2, with a_0 = 16, a_1 = 80.',
            solution: 'Wait, is it a_n = 58 - 16a_{n-2}? Or a_n + 16a_{n-2} = 58?\nAssuming a_n + 16a_{n-2} = 58.\nHomogeneous: r² + 16 = 0 => r = ±4i.\na_n^{(h)} = 4^n(A cos(nπ/2) + B sin(nπ/2)).\n\nParticular: F(n) = 58 (constant).\nGuess a_n^{(p)} = C.\nC + 16C = 58 => 17C = 58 => C = 58/17.\n\nGeneral: a_n = 4^n(A cos(nπ/2) + B sin(nπ/2)) + 58/17.\n\nInitial Conditions:\na_0 = 16 => A + 58/17 = 16 => A = 16 - 58/17 = (272-58)/17 = 214/17.\na_1 = 80 => 4(B) + 58/17 = 80 => 4B = 80 - 58/17 = (1360-58)/17 = 1302/17 => B = 651/34.\n\nSolution involves complex roots form.',
        },
        {
            question: '5. Find explicit formula for a_n = 8a_{n-1} + 10^{n-1} with a_0 = 1 using generating functions.',
            solution: 'Recurrence: a_n - 8a_{n-1} = 10^{n-1}.\nMultiply by x^n and sum from n=1:\nΣ(a_n x^n) - 8x Σ(a_{n-1} x^{n-1}) = x Σ(10^{n-1} x^{n-1})\nG(x) - a_0 - 8x G(x) = x / (1 - 10x)\nG(x)(1 - 8x) = 1 + x/(1-10x) = (1 - 10x + x) / (1-10x) = (1-9x)/(1-10x)\nG(x) = (1-9x) / [(1-8x)(1-10x)]\n\nPartial Fractions:\n(1-9x)/[(1-8x)(1-10x)] = A/(1-8x) + B/(1-10x)\n1-9x = A(1-10x) + B(1-8x)\nSet x = 1/8: 1 - 9/8 = -1/8 = A(1 - 10/8) = A(-2/8) => A = 1/2.\nSet x = 1/10: 1 - 9/10 = 1/10 = B(1 - 8/10) = B(2/10) => B = 1/2.\n\nG(x) = (1/2)/(1-8x) + (1/2)/(1-10x)\na_n = (1/2)8^n + (1/2)10^n.',
            formula: 'a_n = \\frac{1}{2}8^n + \\frac{1}{2}10^n',
        },
        {
            question: '6. Write the Incidence matrix of the following graph.',
            solution: 'Vertices: A, B, C, D, E (5 rows)\nEdges: E1, E2, E3, E4, E5, E6, E7, E8 (8 columns)\n\nMatrix M (5x8):\n   E1 E2 E3 E4 E5 E6 E7 E8\nA  1  1  1  0  0  0  0  0\nB  1  0  0  1  0  1  0  0\nC  0  1  0  0  1  0  0  0\nD  0  0  1  1  1  0  1  1\nE  0  0  0  0  0  1  1  0\n(Assuming undirected, 1 if incident. If directed, +1 start, -1 end. Diagram has arrows, so Directed Incidence Matrix).\n\nDirected Matrix (Out=+1, In=-1):\n   E1 E2 E3 E4 E5 E6 E7 E8\nA  1  1  1  0  0  0  0  0 (All outgoing? Arrows point away from A)\nB -1  0  0  1  0  1  0  0 (E1 in, E4 out, E6 out)\nC  0 -1  0  0  1  0  0  0 (E2 in, E5 out)\nD  0  0 -1 -1 -1  0  1  0 (E3 in, E4 in, E5 in, E7 out, E8 loop?)\nE  0  0  0  0  0 -1 -1  0 (E6 in, E7 in)\n(Note: E8 is a loop on D. Usually loops are 0 or special case in incidence matrix).',
        },
        {
            question: '7. Determine degrees and neighborhoods of vertices in graph H.',
            solution: 'Vertices: a, b, c, d, e.\n\nDegrees:\ndeg(a) = 4 (connected to b, d, e, d)\ndeg(b) = 4 (connected to a, c, d, e + loop? No, b has a circle, likely a loop. If loop, deg adds 2. Looks like loop.)\ndeg(c) = 1 (connected to b)\ndeg(d) = 4 (connected to a, b, e, a)\ndeg(e) = 3 (connected to a, b, d)\n\nNeighborhoods N(v):\nN(a) = {b, d, e}\nN(b) = {a, c, d, e, b} (if loop)\nN(c) = {b}\nN(d) = {a, b, e}\nN(e) = {a, b, d}',
        },
        {
            question: '8. Determine whether graphs G and G\' are isomorphic.',
            solution: 'G is a 5-pointed star (K_5? No, cycle C5 with chords? Inner pentagon). Vertices v1..v5.\nG\' is a pentagon C5. Vertices v\'1..v\'5.\n\nCheck Degrees:\nG: Each vertex has degree 2? No, v1 connected to v3, v4. v2 to v4, v5. All degrees are 2. So G is a cycle C5 (v1-v3-v5-v2-v4-v1).\nG\': Cycle C5.\nBoth are 2-regular graphs with 5 vertices. Both are single cycles of length 5.\nYes, they are isomorphic.',
        },
        {
            question: '9. Check whether graphs G and H are isomorphic.',
            solution: 'G: Bipartite? Looks like two squares connected. 8 vertices. 3-regular (cubic).\nH: 8 vertices. 3-regular.\nCheck cycles:\nG has 4-cycles (squares). u1-u2-u3-u4? No, u1-u2-u6-u5 is 4-cycle.\nH has 3-cycles (triangles)? v1-v2-v5? No. v1-v2-v3-v4 is outer square. Inner star.\nWait, H has v1-v2-v6-v5? No. v5 is center? No, v5, v6 inside.\nLet\'s count cycles.\nG has no triangles (bipartite).\nH has triangles? v1-v5-v2? If v1-v5 and v2-v5 exist. Diagram H shows v1-v5, v2-v5, v5-v6. v1-v2 is edge. So v1-v2-v5 is a triangle.\nSince H has a triangle (3-cycle) and G does not (bipartite, no odd cycles), they are NOT isomorphic.',
        },
        {
            question: '10. Determine Eulerian trail, Circuit, Hamiltonian cycle for G1, G2, G3.',
            solution: 'G1 (K5 minus edges?):\nVertices: a, b, c, d, e.\nDegrees: a(3), b(3), c(4), d(3), e(3). 4 odd degrees. No Euler Path or Circuit.\nHamiltonian? Yes, outer cycle a-b-c-d-e-a.\n\nG2 (Bowtie):\nDegrees: a(2), b(2), c(3), d(3). 2 odd degrees (c, d). Has Euler Path (start c, end d). No Circuit.\nHamiltonian? No, c is a cut vertex (articulation point). Visiting c twice? No, path must go a-b-c-d... stuck.\n\nG3 (H-shape with extra):\nDegrees: a(1), b(3), g(1), d(1), c(3), e(3), f(1).\nToo many odd degrees (a, g, d, f are degree 1). No Euler Path.\nHamiltonian? No, pendant vertices (degree 1) cannot be in a cycle.',
        },
        {
            question: '11. Is the following graph Hamiltonian? If so, draw cycle.',
            solution: 'Graph: Hypercube Q3 projection (cube within cube).\nVertices: 8. 3-regular.\nYes, Q3 is Hamiltonian.\nCycle: Outer square -> Inner square -> back.\nSequence: 1-2-3-4 (outer) -> 8-7-6-5 (inner) -> 1? No.\nValid Cycle: 1-2-6-5-8-7-3-4-1.',
        },
        {
            question: '12. Which graphs have Euler circuit? Construct it.',
            solution: 'Left Graph (Kite):\nDegrees: a(2), b(3), c(3), d(4), e(2). Odd degrees at b, c. No Euler Circuit. Has Euler Path.\n\nRight Graph (Envelope with arc):\nDegrees: a(4), b(4), c(4), d(4), e(4), f(4).\nAll degrees are even (4). Yes, has Euler Circuit.\nConstruction (Fleury\'s or Hierholzer\'s): a-b-c-d-b-f-e-d-a-f-e-c-a.',
        },
        {
            question: '13. Connected planar graph has 20 edges, 12 regions. Find vertices.',
            solution: 'Euler\'s Formula: r = e - v + 2\n12 = 20 - v + 2\n12 = 22 - v\nv = 22 - 12 = 10 vertices.',
            formula: 'v = e - r + 2 = 20 - 12 + 2 = 10',
        },
        {
            question: '14. Find chromatic number of K_{2,3}.',
            solution: 'K_{2,3} is a complete bipartite graph.\nVertices partitioned into sets of size 2 and 3.\nAll bipartite graphs are 2-colorable.\nChromatic number χ = 2.',
        },
        {
            question: '15. Apply Dijkstra\'s Algorithm to find shortest path from a to z.',
            solution: 'Nodes: a, b, c, d, e, z.\n\nStep 0: a=0, others=∞. Unvisited: {a,b,c,d,e,z}\nStep 1: Select a (0). Neighbors: b(4), c(2).\n   b=4, c=2.\nStep 2: Select c (2). Neighbors: b(1), d(8), e(10).\n   Dist to b via c: 2+1=3 < 4. Update b=3.\n   d=2+8=10.\n   e=2+10=12.\nStep 3: Select b (3). Neighbors: d(5).\n   Dist to d via b: 3+5=8 < 10. Update d=8.\nStep 4: Select d (8). Neighbors: z(6), e(2).\n   Dist to z via d: 8+6=14.\n   Dist to e via d: 8+2=10 < 12. Update e=10.\nStep 5: Select e (10). Neighbors: z(3).\n   Dist to z via e: 10+3=13 < 14. Update z=13.\nStep 6: Select z (13). Done.\n\nShortest Path Length = 13.\nPath: a -> c -> b -> d -> e -> z.',
        },
    ],
}

export default function HomeAssignmentsCO4Page() {
    return <DMTopicPage content={content} />
}
