'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiGlobe, FiCode, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import GraphDiagram from '@/components/visuals/GraphDiagram'

const content = {
  title: 'Minimum Spanning Trees',
  explanationSections: [
    {
      title: '1️⃣ What is an MST?',
      icon: <FiGlobe className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">Minimum Spanning Tree (MST)</span> of a connected weighted undirected graph is a spanning tree (connects all V vertices with V−1 edges, no cycles) with the minimum total edge weight.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Properties</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Always has exactly V−1 edges</li>
                <li>No cycles (it is a tree)</li>
                <li>Connects all vertices</li>
                <li>May not be unique (when equal edge weights exist)</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Real Applications</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Minimum cost network wiring</li>
                <li>Cluster analysis (remove max-weight MST edges)</li>
                <li>Approximation for TSP</li>
                <li>Routing protocols (OSPF)</li>
              </ul>
            </div>
          </div>
          <GraphDiagram
            title="Weighted graph — highlighted edges = minimum spanning tree (cost=10)"
            width={480} height={240}
            nodes={[
              { id: 'A', label: 'A', x: 80,  y: 120, color: 'cyan'   },
              { id: 'B', label: 'B', x: 200, y: 55,  color: 'cyan'   },
              { id: 'C', label: 'C', x: 380, y: 55,  color: 'cyan'   },
              { id: 'D', label: 'D', x: 200, y: 200, color: 'cyan'   },
              { id: 'E', label: 'E', x: 380, y: 200, color: 'cyan'   },
            ]}
            edges={[
              { from: 'A', to: 'D', weight: 2,  highlight: true  },
              { from: 'B', to: 'C', weight: 3,  highlight: true  },
              { from: 'A', to: 'B', weight: 4,  highlight: true  },
              { from: 'C', to: 'E', weight: 1,  highlight: true  },
              { from: 'B', to: 'D', weight: 5                    },
              { from: 'D', to: 'E', weight: 6                    },
            ]}
          />
          <p className="text-gray-500 text-xs text-center">MST edges (amber): C-E(1) + A-D(2) + B-C(3) + A-B(4) = 10. Skipped: B-D(5), D-E(6) — would form cycles.</p>
        </div>
      ),
    },
    {
      title: "2️⃣ Kruskal's Algorithm",
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Kruskal's</span>: sort all edges by weight, then greedily add edges — skip any that would form a cycle. Uses <em>Union-Find</em> to detect cycles in O(α(n)) per operation.</p>
          <PyCode language="java">{`// Union-Find for cycle detection
int[] parent, rank;

void makeSet(int n) {
    parent = new int[n]; rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
}

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);  // path compression
    return parent[x];
}

boolean union(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return false;  // same component — cycle!
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
}

// Kruskal's MST
int kruskal(int V, int[][] edges) {  // edges: [u, v, weight]
    Arrays.sort(edges, (a, b) -> a[2] - b[2]);  // sort by weight
    makeSet(V);
    int totalWeight = 0, edgesUsed = 0;
    for (int[] e : edges) {
        if (union(e[0], e[1])) {
            totalWeight += e[2];
            edgesUsed++;
            if (edgesUsed == V - 1) break;  // MST complete
        }
    }
    return totalWeight;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: "3️⃣ Prim's Algorithm",
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Prim's</span>: grow the MST one vertex at a time. Start from any vertex; always add the cheapest edge connecting the current MST to a new vertex. Uses a <em>min-heap priority queue</em>.</p>
          <PyCode language="java">{`// Prim's with priority queue — O((V+E) log V)
int prim(List<int[]>[] adj, int V) {
    // adj[u] = list of {v, weight}
    boolean[] inMST = new boolean[V];
    int[] key = new int[V];   // min edge weight to MST
    Arrays.fill(key, Integer.MAX_VALUE);
    key[0] = 0;               // start from vertex 0

    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0]-b[0]);
    pq.add(new int[]{0, 0});  // {key, vertex}

    int totalWeight = 0;
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int u = cur[1];
        if (inMST[u]) continue;
        inMST[u] = true;
        totalWeight += cur[0];

        for (int[] edge : adj[u]) {
            int v = edge[0], w = edge[1];
            if (!inMST[v] && w < key[v]) {
                key[v] = w;
                pq.add(new int[]{w, v});
            }
        }
    }
    return totalWeight;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: "4️⃣ Kruskal's vs Prim's",
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Kruskal's</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Prim's</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Approach', 'Global edge sort + Union-Find', 'Greedy vertex expansion'],
                  ['Data structure', 'Sort + Union-Find', 'Min-Heap priority queue'],
                  ['Time', 'O(E log E)', 'O((V+E) log V) with binary heap'],
                  ['Space', 'O(V + E)', 'O(V + E)'],
                  ['Better for', 'Sparse graphs (E ≈ V)', 'Dense graphs (E ≈ V²)'],
                  ['Handles disconnected?', 'Yes — gives forest', 'No — needs connected graph'],
                ].map(([p, k, pr]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{k}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{pr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-300 font-semibold mb-1">Cut Property (why greedy works)</p>
            <p className="text-gray-300 text-sm">For any cut (partition of V into two sets), the minimum weight edge crossing the cut is in SOME MST. This is the theoretical basis for both Kruskal's and Prim's greedy choices.</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is a Minimum Spanning Tree?', solution: 'An MST of a connected weighted undirected graph is a spanning tree (V vertices, V−1 edges, no cycles, all connected) with the minimum possible total edge weight. It may not be unique when edges have equal weights.' },
    { question: "Explain Kruskal's algorithm step by step.", solution: '1. Sort all edges by weight (ascending). 2. Initialize Union-Find for V components. 3. For each edge (u,v,w) in sorted order: if find(u) ≠ find(v) (different components), add edge to MST and union(u,v). Skip if same component (would form cycle). 4. Stop when V−1 edges added. Time: O(E log E) for sorting + O(E·α(V)) for Union-Find.' },
    { question: "What is the role of Union-Find in Kruskal's algorithm?", solution: 'Union-Find efficiently tracks connected components. find(x) returns the root of x\'s component (with path compression, nearly O(1) amortised). union(x,y) merges x and y\'s components. Before adding edge (u,v), check if find(u)==find(v) — if yes, adding the edge would create a cycle, so skip it.' },
    { question: "MCQ: Kruskal's algorithm is preferred over Prim's when:\n A) The graph is dense (E ≈ V²)\n B) The graph is sparse (E ≈ V)\n C) The graph is unweighted\n D) The graph is directed", solution: "B) Sparse graphs — Kruskal's sorts E edges (O(E log E)). For sparse E≈V, this is O(V log V). Prim's with a binary heap runs O((V+E) log V) — similar for sparse but slower for dense. Kruskal's is simpler to implement for sparse graphs." },
    { question: 'MCQ: How many edges does an MST of a graph with V vertices have?\n A) V\n B) V+1\n C) V−1\n D) E/2', solution: 'C) V−1 — any spanning tree on V vertices has exactly V−1 edges. More edges would create a cycle; fewer would leave some vertices disconnected.' },
    { question: "Trace Kruskal's on: edges (0,1,4), (0,2,3), (1,2,1), (1,3,2), (2,3,4). Find MST.", solution: 'Sort by weight: (1,2,1), (1,3,2), (0,2,3), (0,1,4), (2,3,4). Add (1,2,1): MST={1-2}. Add (1,3,2): MST={1-2,1-3}. Add (0,2,3): no cycle, MST={1-2,1-3,0-2}. 3=V-1=4-1 edges done. Skip (0,1) — cycle. Total weight = 1+2+3 = 6.' },
    { question: "Interview: Why does Prim's algorithm use a priority queue? Could you use a simple array instead?", solution: "Yes — Prim's with a simple array (O(V²)) is actually better than with a binary heap (O((V+E) log V)) for dense graphs where E≈V². Array scan: O(V) per vertex × V vertices = O(V²). Heap: O(log V) per edge × E edges = O(E log V) — worse when E≈V². Most textbooks teach the heap version for clarity, but the array version (like Dijkstra's original) is better for dense graphs. Fibonacci heap achieves O(E + V log V) — theoretically optimal." },
  ],
  exampleProblems: [],
}

export default function MSTPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
