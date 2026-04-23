'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiGlobe, FiGrid, FiList, FiCheckCircle } from 'react-icons/fi'
import GraphDiagram from '@/components/visuals/GraphDiagram'

const content = {
  title: 'Graph Fundamentals & Representations',
  explanationSections: [
    {
      title: '1️⃣ Graph Terminology',
      icon: <FiGlobe className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">graph G = (V, E)</span> is a set of vertices V and edges E connecting pairs of vertices. Graphs model networks, relationships, maps, dependencies, and more.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Undirected Graph', 'Edges have no direction — (u,v) = (v,u). Example: road map, social friends.', 'blue'],
              ['Directed Graph (Digraph)', 'Edges have direction — (u,v) ≠ (v,u). Example: web links, task dependencies.', 'violet'],
              ['Weighted Graph', 'Each edge has a numeric weight. Example: road distances, network bandwidth.', 'green'],
              ['Sparse vs Dense', 'Sparse: |E| ≪ |V|². Dense: |E| ≈ |V|². Determines best representation.', 'amber'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              ['Degree', 'Number of edges incident to a vertex. In-degree (directed): edges coming in. Out-degree: edges going out.'],
              ['Path', 'A sequence of vertices where each consecutive pair is connected by an edge.'],
              ['Cycle', 'A path that starts and ends at the same vertex.'],
              ['Connected Graph', 'Every pair of vertices has a path between them. Digraph: strongly connected if path exists in BOTH directions.'],
              ['DAG', 'Directed Acyclic Graph — directed graph with no cycles. Used for dependency graphs, scheduling.'],
            ].map(([t, d]) => (
              <div key={t} className="border-l-4 border-cyan-500 pl-3">
                <span className="text-cyan-300 font-semibold text-sm">{t}:</span>
                <span className="text-gray-300 text-sm ml-2">{d}</span>
              </div>
            ))}
          </div>
          <GraphDiagram
            title="Undirected weighted graph — 5 nodes, 6 edges"
            width={480} height={250}
            nodes={[
              { id: 'A', label: 'A', x: 80,  y: 125 },
              { id: 'B', label: 'B', x: 200, y: 55  },
              { id: 'C', label: 'C', x: 380, y: 55  },
              { id: 'D', label: 'D', x: 200, y: 200 },
              { id: 'E', label: 'E', x: 380, y: 200 },
            ]}
            edges={[
              { from: 'A', to: 'B', weight: 4 },
              { from: 'A', to: 'D', weight: 2 },
              { from: 'B', to: 'C', weight: 3 },
              { from: 'B', to: 'D', weight: 5 },
              { from: 'C', to: 'E', weight: 1 },
              { from: 'D', to: 'E', weight: 6 },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Adjacency Matrix',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">|V| × |V| matrix</span> where matrix[u][v] = 1 (or weight) if edge (u,v) exists, else 0.</p>
          <PyCode language="java">{`int V = 5;
int[][] adjMatrix = new int[V][V];

// Add edge (undirected, unweighted)
void addEdge(int u, int v) {
    adjMatrix[u][v] = 1;
    adjMatrix[v][u] = 1;  // omit for directed graph
}

// Check if edge (u,v) exists — O(1)
boolean hasEdge(int u, int v) {
    return adjMatrix[u][v] == 1;
}

// Get all neighbours of u — O(V)
void neighbors(int u) {
    for (int v = 0; v < V; v++)
        if (adjMatrix[u][v] != 0)
            System.out.print(v + " ");
}`}</PyCode>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30 text-sm">
              <p className="text-green-300 font-semibold mb-1">Pros</p>
              <p className="text-gray-300">O(1) edge check. Simple. Good for dense graphs.</p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/30 text-sm">
              <p className="text-red-300 font-semibold mb-1">Cons</p>
              <p className="text-gray-300">O(V²) space — wasteful for sparse graphs. O(V) to list neighbours.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Adjacency List',
      icon: <FiList className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">An <span className="text-cyan-400 font-semibold">array of lists</span> where adj[u] contains all vertices adjacent to u. Most practical for sparse graphs.</p>
          <PyCode language="java">{`import java.util.*;

int V = 5;
List<Integer>[] adj = new ArrayList[V];
for (int i = 0; i < V; i++)
    adj[i] = new ArrayList<>();

// Add edge (undirected)
void addEdge(int u, int v) {
    adj[u].add(v);
    adj[v].add(u);  // omit for directed
}

// For weighted graphs:
// List<int[]>[] adj where int[] = {neighbor, weight}
List<int[]>[] wAdj = new ArrayList[V];
for (int i = 0; i < V; i++) wAdj[i] = new ArrayList<>();

void addWeightedEdge(int u, int v, int w) {
    wAdj[u].add(new int[]{v, w});
    wAdj[v].add(new int[]{u, w});
}

// Iterate neighbours of u — O(degree(u))
for (int v : adj[u]) System.out.print(v + " ");`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Comparison & When to Use Each',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Adjacency Matrix</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Adjacency List</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Space', 'O(V²)', 'O(V + E)'],
                  ['Edge check (u,v)', 'O(1)', 'O(degree(u))'],
                  ['List all neighbours', 'O(V)', 'O(degree(u))'],
                  ['Add edge', 'O(1)', 'O(1)'],
                  ['Best for', 'Dense graphs, Floyd-Warshall', 'Sparse graphs, BFS/DFS'],
                  ['Real-world example', 'V=100 cities, all pairs', 'Social network V=1M, avg 200 friends'],
                ].map(([p, m, l]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{m}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is a graph? Define V, E, directed, undirected, weighted.', solution: 'A graph G=(V,E) consists of a set of vertices V and edges E ⊆ V×V. Undirected: edges are unordered pairs {u,v}. Directed: edges are ordered pairs (u,v) — only u→v. Weighted: each edge has a numeric cost/weight. A social network is undirected; a web link graph is directed; a road distance map is weighted undirected.' },
    { question: 'Compare adjacency matrix and adjacency list in space complexity.', solution: 'Adjacency matrix: O(V²) space — always. Adjacency list: O(V+E) space. For a sparse graph (E ≪ V²), the list is dramatically better. For V=1M vertices with average degree 100: matrix = 10¹² bits (125GB); list = ~10⁸ entries (manageable).' },
    { question: 'What is the time complexity to check if edge (u,v) exists in each representation?', solution: 'Adjacency matrix: O(1) — direct array lookup matrix[u][v]. Adjacency list: O(degree(u)) — scan u\'s neighbour list. For dense graphs this difference is negligible; for sparse graphs with large V, the O(1) matrix check is faster per lookup but the O(V²) space cost may be prohibitive.' },
    { question: 'MCQ: Which representation is best for running BFS/DFS on a sparse graph?\n A) Adjacency matrix\n B) Adjacency list\n C) Both are equal\n D) Edge list', solution: 'B) Adjacency list — BFS/DFS iterate over all neighbours of each vertex. With adjacency list, listing neighbours of u takes O(degree(u)) total. With adjacency matrix, it takes O(V) per vertex, making the total BFS/DFS O(V²) instead of O(V+E).' },
    { question: 'MCQ: A DAG is a graph that is:\n A) Disconnected\n B) Directed with no cycles\n C) Directed with all cycles\n D) Undirected and acyclic', solution: 'B) Directed Acyclic Graph — directed edges with no directed cycles. Used in task scheduling (make dependencies), build systems, course prerequisites, and topological sorting.' },
    { question: 'Represent the graph with edges {(1,2), (1,3), (2,4), (3,4)} as both adjacency matrix and list.', solution: 'Matrix (4×4): [0,1,1,0; 1,0,0,1; 1,0,0,1; 0,1,1,0] (undirected). List: 1→[2,3], 2→[1,4], 3→[1,4], 4→[2,3]. List uses 4+8=12 slots vs 16 matrix entries.' },
    { question: 'Interview: How would you represent a graph with 1 million users and average 200 friends (Facebook-like)?', solution: 'Adjacency list is the only viable choice. Matrix would require 10¹² bits (125GB) — impossible. List requires V + 2E = 10⁶ + 2×10⁸ ≈ 200M slots (about 1.6GB for 8-byte pointers) — feasible. In practice, use HashMap<Integer, List<Integer>> for non-sequential IDs, or compressed adjacency array (CSR format) for best cache performance in graph processing systems like Pregel/Spark GraphX.' },
  ],
  exampleProblems: [],
}

export default function GraphFundamentalsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
