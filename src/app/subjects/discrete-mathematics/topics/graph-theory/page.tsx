'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiShare2, FiMap, FiHexagon, FiLayout, FiGitMerge, FiNavigation } from 'react-icons/fi'

const content = {
    title: 'Graph Theory',
    explanationSections: [
        {
            title: '🕸️ Introduction to Graphs',
            icon: <FiShare2 className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Definition:</span>
A **Graph** <i>G = (V, E)</i> consists of:
• A non-empty set of **vertices** (or nodes) <i>V</i>.
• A set of **edges** <i>E</i>, where each edge connects a pair of vertices.

<span class="text-amber-300 font-semibold">Terminology:</span>
• **Adjacent:** Two vertices are adjacent if they are connected by an edge.
• **Degree of a Vertex (deg(v)):** The number of edges incident with it. (Loops count twice).
• **Path:** A sequence of edges traveling from vertex <i>u</i> to <i>v</i>.
• **Cycle:** A path that starts and ends at the same vertex.
• **Connected Graph:** There is a path between every pair of distinct vertices.

<span class="text-lime-300 font-semibold">Handshaking Theorem:</span>
In any undirected graph, the sum of degrees of all vertices is twice the number of edges.
<i>&sum; deg(v) = 2|E|</i>
*Corollary:* An undirected graph has an even number of vertices of odd degree.

<span class="text-amber-300 font-semibold">Representation:</span>
1. **Adjacency List:** Lists neighbors for each vertex. Good for sparse graphs.
2. **Adjacency Matrix:** A binary matrix <i>A</i> where <i>A[i][j] = 1</i> if edge <i>(i, j)</i> exists. Good for dense graphs.
3. **Incidence Matrix:** Rows are vertices, columns are edges.`,
            hasseDiagram: {
                elements: [
                    { id: 'a', label: 'A' },
                    { id: 'b', label: 'B' },
                    { id: 'c', label: 'C' },
                    { id: 'd', label: 'D' },
                ],
                relations: [
                    { from: 'a', to: 'b' },
                    { from: 'b', to: 'c' },
                    { from: 'c', to: 'd' },
                    { from: 'd', to: 'a' },
                    { from: 'a', to: 'c' },
                ],
            },
        },
        {
            title: '📊 Types of Graphs',
            icon: <FiLayout className="w-6 h-6" />,
            content: `
<div class="overflow-x-auto">
  <table class="min-w-full text-left text-sm whitespace-nowrap">
    <thead class="uppercase tracking-wider border-b-2 border-slate-700">
      <tr>
        <th scope="col" class="px-6 py-4 text-cyan-400">Type</th>
        <th scope="col" class="px-6 py-4 text-cyan-400">Description</th>
        <th scope="col" class="px-6 py-4 text-cyan-400">Key Property</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Simple Graph</td>
        <td class="px-6 py-4 text-slate-300">Undirected, no loops, no multiple edges</td>
        <td class="px-6 py-4 text-slate-300">Max edges = <i>n(n-1)/2</i></td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Complete Graph (<i>Kₙ</i>)</td>
        <td class="px-6 py-4 text-slate-300">Every pair of distinct vertices is connected</td>
        <td class="px-6 py-4 text-slate-300">Regular of degree <i>n-1</i></td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Bipartite Graph</td>
        <td class="px-6 py-4 text-slate-300">Vertices partitioned into two sets <i>V₁, V₂</i>; edges only between sets</td>
        <td class="px-6 py-4 text-slate-300">No odd cycles; 2-colorable</td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Regular Graph</td>
        <td class="px-6 py-4 text-slate-300">All vertices have the same degree <i>k</i></td>
        <td class="px-6 py-4 text-slate-300"><i>k</i>-regular</td>
      </tr>
      <tr class="border-b border-slate-700">
        <td class="px-6 py-4 font-medium text-white">Weighted Graph</td>
        <td class="px-6 py-4 text-slate-300">Edges have assigned weights/costs</td>
        <td class="px-6 py-4 text-slate-300">Used for shortest path problems</td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
            title: '🔄 Graph Isomorphism',
            icon: <FiHexagon className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Definition:</span>
Two graphs <i>G₁ = (V₁, E₁)</i> and <i>G₂ = (V₂, E₂)</i> are **isomorphic** if there exists a bijection <i>f: V₁ &rarr; V₂</i> such that vertices <i>u</i> and <i>v</i> are adjacent in <i>G₁</i> if and only if <i>f(u)</i> and <i>f(v)</i> are adjacent in <i>G₂</i>.

Basically, they are the "same" graph drawn differently.

<span class="text-amber-300 font-semibold">Isomorphism Invariants (Necessary Conditions):</span>
If <i>G₁ &cong; G₂</i>, they MUST have:
1. Same number of vertices.
2. Same number of edges.
3. Same degree sequence (list of degrees sorted).
4. Same number of cycles of any length <i>k</i>.

*Note:* These conditions are necessary but NOT sufficient. To prove isomorphism, you must find the mapping <i>f</i>. To disprove, show an invariant is violated.`,
        },
        {
            title: '🚶 Euler & Hamiltonian Graphs',
            icon: <FiMap className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Euler Paths & Circuits:</span>
• **Euler Circuit:** A simple circuit containing every edge of <i>G</i>.
  - **Condition:** Connected graph with **every vertex of even degree**.
• **Euler Path:** A simple path containing every edge of <i>G</i>.
  - **Condition:** Connected graph with **exactly 2 vertices of odd degree** (start and end points).

<span class="text-cyan-400 font-semibold text-lg">Hamiltonian Paths & Circuits:</span>
• **Hamiltonian Circuit:** A simple circuit that passes through every vertex exactly once.
• **Hamiltonian Path:** A simple path that passes through every vertex exactly once.
• **Conditions:** No simple necessary and sufficient conditions (NP-Complete).
  - *Dirac's Theorem:* If <i>n &ge; 3</i> and every vertex has degree <i>&ge; n/2</i>, then <i>G</i> has a Hamiltonian circuit.`,
        },
        {
            title: '🛣️ Shortest Path Algorithms',
            icon: <FiNavigation className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Dijkstra's Algorithm:</span>
Finds the shortest path from a source node to all other nodes in a weighted graph (non-negative weights).
**Steps:**
1. Set distance to source = 0, all others = &infin;.
2. Mark all nodes unvisited.
3. Select unvisited node with smallest distance (current).
4. For each neighbor, calculate tentative distance (current dist + edge weight). If smaller than known dist, update it.
5. Mark current node visited. Repeat until destination reached.

<span class="text-cyan-400 font-semibold text-lg">Bellman-Ford Algorithm:</span>
Computes shortest paths from a source node to all other nodes, even with **negative edge weights**.
**Key Idea:** Relax all edges <i>|V|-1</i> times.
• **Relaxation:** If <i>dist(u) + weight(u, v) < dist(v)</i>, update <i>dist(v)</i>.
• **Negative Cycles:** If changes occur after <i>|V|-1</i> iterations, a negative weight cycle exists.

<span class="text-cyan-400 font-semibold text-lg">Breadth-First Search (BFS):</span>
Finds shortest path in **unweighted** graphs. Explores layer by layer.`,
        },
        {
            title: '🎨 Planar Graphs & Coloring',
            icon: <FiGitMerge className="w-6 h-6" />,
            content: `<span class="text-cyan-400 font-semibold text-lg">Planar Graphs:</span>
A graph is **planar** if it can be drawn in the plane without edges crossing.
• **Euler's Formula:** For a connected planar simple graph: <i>r = e - v + 2</i> (where <i>r</i> is regions).
• **Kuratowski's Theorem:** A graph is non-planar iff it contains a subgraph homeomorphic to <i>K₅</i> or <i>K₃,₃</i>.

<span class="text-cyan-400 font-semibold text-lg">Graph Coloring:</span>
Assigning colors to vertices such that adjacent vertices have different colors.
• **Chromatic Number &chi;(G):** The minimum number of colors needed.
• **Greedy Coloring:** Order vertices, assign first available color. Not always optimal.
• **Four Color Theorem:** Any planar graph is 4-colorable (&chi;(G) &le; 4).`,
            formula: 'r = e - v + 2',
        },
    ],
    practiceQuestions: [
        {
            question: 'Determine if a graph with degree sequence 3, 3, 3, 3, 2 is possible.',
            solution: 'Sum of degrees = 3 + 3 + 3 + 3 + 2 = 14.\nHandshaking Theorem: Sum of degrees = 2 × |E|.\nSince 14 is even, such a graph is possible (e.g., a "house" graph with one diagonal removed? No, 5 vertices. K4 minus an edge has degrees 3,3,2,2. Wait. 5 vertices. Cycle C5 has 2,2,2,2,2. Add chords. It is possible).',
        },
        {
            question: 'Does the complete graph K5 have an Euler circuit?',
            solution: 'In K5, every vertex is connected to every other vertex.\nDegree of each vertex = n - 1 = 5 - 1 = 4.\nSince every vertex has an even degree (4), K5 has an Euler circuit.',
        },
        {
            question: 'What is the chromatic number of K_n?',
            solution: 'In a complete graph K_n, every vertex is adjacent to every other vertex.\nTherefore, every vertex must have a unique color.\nChromatic number χ(K_n) = n.',
            formula: '\\chi(K_n) = n',
        },
        {
            question: 'Is the complete bipartite graph K_{3,3} planar?',
            solution: 'No. By Kuratowski\'s Theorem, K_{3,3} is one of the fundamental non-planar graphs.\nAlso, using Euler\'s formula corollary for bipartite graphs: e ≤ 2v - 4.\nHere v=6, e=9. 9 ≤ 2(6) - 4 = 8. False. So not planar.',
        },
    ],
    exampleProblems: [
        {
            problem: 'Find the shortest path from A to Z in the weighted graph.',
            solution: 'Using Dijkstra\'s Algorithm.',
            steps: [
                {
                    step: 'Initialize',
                    explanation: 'Set distance to A = 0, all others = ∞.',
                },
                {
                    step: 'Visit neighbors',
                    explanation: 'Update tentative distances to neighbors of current node.',
                },
                {
                    step: 'Select min distance',
                    explanation: 'Move to unvisited node with smallest tentative distance.',
                },
                {
                    step: 'Repeat',
                    explanation: 'Continue until Z is reached.',
                },
            ],
        },
    ],
}

export default function GraphTheoryPage() {
    return <DMTopicPage content={content} />
}
