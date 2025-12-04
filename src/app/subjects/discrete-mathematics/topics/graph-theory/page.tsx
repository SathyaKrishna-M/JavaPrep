'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiShare2, FiMap, FiHexagon, FiLayout, FiGitMerge, FiNavigation } from 'react-icons/fi'
import MathRenderer from '@/components/MathRenderer'

const content = {
  title: 'Graph Theory',
  explanationSections: [
    {
      title: '🕸️ Introduction to Graphs',
      icon: <FiShare2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Definition:</span> A <span className="text-white font-semibold">Graph</span> <MathRenderer math="G = (V, E)" /> consists of:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>A non-empty set of <span className="text-cyan-300">vertices</span> (or nodes) <MathRenderer math="V" />.</li>
            <li>A set of <span className="text-cyan-300">edges</span> <MathRenderer math="E" />, where each edge connects a pair of vertices.</li>
          </ul>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Terminology:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><span className="text-cyan-300">Adjacent:</span> Two vertices are adjacent if they are connected by an edge.</li>
              <li><span className="text-cyan-300">Degree (deg(v)):</span> Number of edges incident with v. (Loops count twice).</li>
              <li><span className="text-cyan-300">Path:</span> Sequence of edges traveling from vertex u to v.</li>
              <li><span className="text-cyan-300">Cycle:</span> Path that starts and ends at the same vertex.</li>
              <li><span className="text-cyan-300">Connected:</span> Path exists between every pair of distinct vertices.</li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-lime-300 font-semibold mb-2">Handshaking Theorem:</p>
            <p className="text-gray-300">In any undirected graph, the sum of degrees is twice the number of edges.</p>
            <MathRenderer display math="\sum_{v \in V} \deg(v) = 2|E|" />
            <p className="text-gray-300 mt-2"><span className="text-pink-300">Corollary:</span> An undirected graph has an even number of vertices of odd degree.</p>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-amber-300 font-semibold mb-2">Representation:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-300">Adjacency List:</span> Lists neighbors for each vertex. (Sparse graphs)</li>
              <li><span className="text-cyan-300">Adjacency Matrix:</span> Binary matrix <MathRenderer math="A" /> where <MathRenderer math="A[i][j] = 1" /> if edge exists. (Dense graphs)</li>
              <li><span className="text-cyan-300">Incidence Matrix:</span> Rows are vertices, columns are edges.</li>
            </ol>
          </div>
        </div>
      ),
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
      formula: '\\sum \\deg(v) = 2|E|',
    },
    {
      title: '📊 Types of Graphs',
      icon: <FiLayout className="w-6 h-6" />,
      content: (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b-2 border-slate-700">
              <tr>
                <th scope="col" className="px-6 py-4 text-cyan-400">Type</th>
                <th scope="col" className="px-6 py-4 text-cyan-400">Description</th>
                <th scope="col" className="px-6 py-4 text-cyan-400">Key Property</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">Simple Graph</td>
                <td className="px-6 py-4 text-slate-300">Undirected, no loops, no multiple edges</td>
                <td className="px-6 py-4 text-slate-300">Max edges = <MathRenderer math="n(n-1)/2" /></td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">Complete Graph (<MathRenderer math="K_n" />)</td>
                <td className="px-6 py-4 text-slate-300">Every pair of distinct vertices is connected</td>
                <td className="px-6 py-4 text-slate-300">Regular of degree <MathRenderer math="n-1" /></td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">Bipartite Graph</td>
                <td className="px-6 py-4 text-slate-300">Vertices partitioned into <MathRenderer math="V_1, V_2" />; edges only between sets</td>
                <td className="px-6 py-4 text-slate-300">No odd cycles; 2-colorable</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">Regular Graph</td>
                <td className="px-6 py-4 text-slate-300">All vertices have the same degree <MathRenderer math="k" /></td>
                <td className="px-6 py-4 text-slate-300"><MathRenderer math="k" />-regular</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-6 py-4 font-medium text-white">Weighted Graph</td>
                <td className="px-6 py-4 text-slate-300">Edges have assigned weights/costs</td>
                <td className="px-6 py-4 text-slate-300">Used for shortest path problems</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: '🔄 Graph Isomorphism',
      icon: <FiHexagon className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold text-lg">Definition:</span> Two graphs <MathRenderer math="G_1 = (V_1, E_1)" /> and <MathRenderer math="G_2 = (V_2, E_2)" /> are <span className="text-white font-semibold">isomorphic</span> if there exists a bijection <MathRenderer math="f: V_1 \rightarrow V_2" /> such that vertices <MathRenderer math="u, v" /> are adjacent in <MathRenderer math="G_1" /> if and only if <MathRenderer math="f(u), f(v)" /> are adjacent in <MathRenderer math="G_2" />.
          </p>
          <p className="text-gray-300">Basically, they are the "same" graph drawn differently.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Isomorphism Invariants (Necessary Conditions):</p>
            <p className="text-gray-300">If <MathRenderer math="G_1 \cong G_2" />, they MUST have:</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1 mt-2">
              <li>Same number of vertices</li>
              <li>Same number of edges</li>
              <li>Same degree sequence (list of degrees sorted)</li>
              <li>Same number of cycles of any length k</li>
            </ol>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-pink-300 font-semibold mb-2">Note:</p>
            <p className="text-gray-300">These conditions are necessary but NOT sufficient. To prove isomorphism, you must find the mapping f. To disprove, show an invariant is violated.</p>
          </div>
        </div>
      ),
      formula: 'G_1 \\cong G_2 \\iff \\exists f: V_1 \\to V_2',
    },
    {
      title: '🚶 Euler & Hamiltonian Graphs',
      icon: <FiMap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-400 font-semibold text-lg">Euler Paths & Circuits:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
              <li><span className="text-cyan-300">Euler Circuit:</span> A simple circuit containing every edge of G.
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Condition: Connected graph with <span className="text-white">every vertex of even degree</span>.</li>
                </ul>
              </li>
              <li><span className="text-cyan-300">Euler Path:</span> A simple path containing every edge of G.
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Condition: Connected graph with <span className="text-white">exactly 2 vertices of odd degree</span>.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-400 font-semibold text-lg">Hamiltonian Paths & Circuits:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
              <li><span className="text-cyan-300">Hamiltonian Circuit:</span> A simple circuit that passes through every vertex exactly once.</li>
              <li><span className="text-cyan-300">Hamiltonian Path:</span> A simple path that passes through every vertex exactly once.</li>
              <li><span className="text-cyan-300">Conditions:</span> No simple necessary and sufficient conditions (NP-Complete).</li>
              <li className="ml-4 text-gray-400"><span className="text-amber-300">Dirac&apos;s Theorem:</span> If <MathRenderer math="n \ge 3" /> and every vertex has degree <MathRenderer math="\ge n/2" />, then G has a Hamiltonian circuit.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '🛣️ Shortest Path Algorithms',
      icon: <FiNavigation className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-400 font-semibold text-lg">Dijkstra&apos;s Algorithm:</p>
            <p className="text-gray-300">Finds shortest path from source to all nodes in weighted graph (non-negative weights).</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1 mt-2">
              <li>Set distance to source = 0, others = <MathRenderer math="\infty" /></li>
              <li>Mark all nodes unvisited</li>
              <li>Select unvisited node with smallest distance</li>
              <li>Update neighbors: if <MathRenderer math="dist(u) + w(u,v) < dist(v)" />, update <MathRenderer math="dist(v)" /></li>
              <li>Mark visited, repeat</li>
            </ol>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-400 font-semibold text-lg">Bellman-Ford Algorithm:</p>
            <p className="text-gray-300">Works with <span className="text-white">negative edge weights</span>.</p>
            <p className="text-gray-300 mt-2"><span className="text-amber-300">Key Idea:</span> Relax all edges <MathRenderer math="|V|-1" /> times.</p>
            <p className="text-gray-300">Detects negative cycles if changes occur after <MathRenderer math="|V|-1" /> iterations.</p>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
            <p className="text-cyan-400 font-semibold text-lg">Breadth-First Search (BFS):</p>
            <p className="text-gray-300">Finds shortest path in <span className="text-white">unweighted</span> graphs. Explores layer by layer.</p>
          </div>
        </div>
      ),
    },
    {
      title: '🎨 Planar Graphs & Coloring',
      icon: <FiGitMerge className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-400 font-semibold text-lg">Planar Graphs:</p>
            <p className="text-gray-300">A graph is <span className="text-white">planar</span> if it can be drawn without edges crossing.</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
              <li><span className="text-cyan-300">Euler&apos;s Formula:</span> For connected planar simple graph: <MathRenderer math="r = e - v + 2" /></li>
              <li><span className="text-cyan-300">Kuratowski&apos;s Theorem:</span> Non-planar iff contains subgraph homeomorphic to <MathRenderer math="K_5" /> or <MathRenderer math="K_{3,3}" /></li>
            </ul>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-cyan-400 font-semibold text-lg">Graph Coloring:</p>
            <p className="text-gray-300">Assigning colors to vertices such that adjacent vertices have different colors.</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
              <li><span className="text-cyan-300">Chromatic Number <MathRenderer math="\chi(G)" />:</span> Min colors needed.</li>
              <li><span className="text-cyan-300">Four Color Theorem:</span> Any planar graph is 4-colorable (<MathRenderer math="\chi(G) \le 4" />).</li>
            </ul>
          </div>
        </div>
      ),
      formula: 'r = e - v + 2',
    },
  ],
  practiceQuestions: [
    {
      question: 'Determine if a graph with degree sequence 3, 3, 3, 3, 2 is possible.',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Sum of degrees = <MathRenderer math="3 + 3 + 3 + 3 + 2 = 14" />.</p>
          <p className="text-gray-300">Handshaking Theorem: Sum of degrees = <MathRenderer math="2|E|" />.</p>
          <p className="text-green-400">Since 14 is even, such a graph is possible.</p>
          <p className="text-gray-300 text-sm">(Example: A graph with 5 vertices where 4 have degree 3 and 1 has degree 2 is possible).</p>
        </div>
      ),
      formula: '\\sum \\deg(v) = 14',
    },
    {
      question: (
        <span>
          Does the complete graph <MathRenderer math="K_5" /> have an Euler circuit?
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">In <MathRenderer math="K_5" />, every vertex is connected to every other vertex.</p>
          <p className="text-gray-300">Degree of each vertex = <MathRenderer math="n - 1 = 5 - 1 = 4" />.</p>
          <p className="text-green-400">Since every vertex has an even degree (4), <MathRenderer math="K_5" /> has an Euler circuit.</p>
        </div>
      ),
    },
    {
      question: (
        <span>
          What is the chromatic number of <MathRenderer math="K_n" />?
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">In a complete graph <MathRenderer math="K_n" />, every vertex is adjacent to every other vertex.</p>
          <p className="text-gray-300">Therefore, every vertex must have a unique color.</p>
          <p className="text-green-400">Chromatic number <MathRenderer math="\chi(K_n) = n" />.</p>
        </div>
      ),
      formula: '\\chi(K_n) = n',
    },
    {
      question: (
        <span>
          Is the complete bipartite graph <MathRenderer math="K_{3,3}" /> planar?
        </span>
      ),
      solution: (
        <div className="space-y-4">
          <p className="text-red-400 font-semibold">No.</p>
          <p className="text-gray-300">By Kuratowski&apos;s Theorem, <MathRenderer math="K_{3,3}" /> is one of the fundamental non-planar graphs.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-gray-300">Also, using Euler&apos;s formula corollary for bipartite graphs: <MathRenderer math="e \le 2v - 4" />.</p>
            <p className="text-gray-300">Here <MathRenderer math="v=6, e=9" />.</p>
            <p className="text-gray-300"><MathRenderer math="9 \le 2(6) - 4 = 8" />. False.</p>
            <p className="text-gray-300">So not planar.</p>
          </div>
        </div>
      ),
    },
  ],
  exampleProblems: [
    {
      problem: 'Find the shortest path from A to Z in the weighted graph.',
      solution: (
        <div className="space-y-4">
          <p className="text-gray-300">Using Dijkstra&apos;s Algorithm.</p>
        </div>
      ),
      steps: [
        {
          step: 'Initialize',
          explanation: (
            <span>
              Set distance to A = 0, all others = <MathRenderer math="\infty" />.
            </span>
          ),
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
