'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiNavigation, FiCode, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'
import GraphDiagram from '@/components/visuals/GraphDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: "Dijkstra's Algorithm",
  explanationSections: [
    {
      title: "1️⃣ What Dijkstra's Solves",
      icon: <FiNavigation className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Dijkstra's algorithm</span> finds the shortest path from a source vertex to all other vertices in a weighted graph with <em>non-negative edge weights</em>.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Key idea — Relaxation:</p>
            <p className="text-gray-300">if dist[u] + weight(u,v) &lt; dist[v]:</p>
            <p className="text-gray-300 ml-4">dist[v] = dist[u] + weight(u,v)  // update shortest path to v</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Greedy choice', 'Always extend the unvisited vertex with the smallest current distance', 'blue'],
              ['Priority Queue', 'Min-heap ensures O(log V) extraction of the next vertex to process', 'green'],
              ['No negative edges', 'Once a vertex is settled, its distance is optimal — only true with non-negative weights', 'amber'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <AlgoStepper
            title="Dijkstra from A — press ▶ Play to watch relaxation"
            interval={3000}
            steps={[
              {
                title: 'Init: dist[A]=0, all others=∞',
                description: 'Add A to priority queue with distance 0.',
                code: 'dist[A]=0; PQ.add({0,A});',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, highlight: true, distance: 0 },
                    { id: 'B', label: 'B', x: 210, y: 50,  color: 'slate', distance: '∞' },
                    { id: 'C', label: 'C', x: 390, y: 50,  color: 'slate', distance: '∞' },
                    { id: 'D', label: 'D', x: 210, y: 185, color: 'slate', distance: '∞' },
                    { id: 'E', label: 'E', x: 390, y: 185, color: 'slate', distance: '∞' },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', weight: 4 }, { from: 'A', to: 'D', weight: 2 },
                    { from: 'B', to: 'C', weight: 3 }, { from: 'D', to: 'E', weight: 6 },
                    { from: 'B', to: 'D', weight: 5 }, { from: 'C', to: 'E', weight: 1 },
                  ]}
                />,
              },
              {
                title: 'Process A (dist=0) → relax B and D',
                description: 'Edges A→B(4) and A→D(2) relaxed. dist[B]=4, dist[D]=2.',
                code: 'dist[B]=min(∞,0+4)=4, dist[D]=min(∞,0+2)=2',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true,  distance: 0 },
                    { id: 'B', label: 'B', x: 210, y: 50,  highlight: true, distance: 4 },
                    { id: 'C', label: 'C', x: 390, y: 50,  color: 'slate', distance: '∞' },
                    { id: 'D', label: 'D', x: 210, y: 185, highlight: true, distance: 2 },
                    { id: 'E', label: 'E', x: 390, y: 185, color: 'slate', distance: '∞' },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', weight: 4, highlight: true },
                    { from: 'A', to: 'D', weight: 2, highlight: true },
                    { from: 'B', to: 'C', weight: 3 }, { from: 'D', to: 'E', weight: 6 },
                    { from: 'B', to: 'D', weight: 5 }, { from: 'C', to: 'E', weight: 1 },
                  ]}
                />,
              },
              {
                title: 'Process D (dist=2, nearest) → relax E',
                description: 'D→E(6): dist[E]=2+6=8. D→B: 2+5=7 > 4, skip.',
                code: 'dist[E]=min(∞,2+6)=8. dist[B] stays 4.',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true,  distance: 0 },
                    { id: 'B', label: 'B', x: 210, y: 50,  color: 'violet', distance: 4 },
                    { id: 'C', label: 'C', x: 390, y: 50,  color: 'slate', distance: '∞' },
                    { id: 'D', label: 'D', x: 210, y: 185, visited: true,  distance: 2 },
                    { id: 'E', label: 'E', x: 390, y: 185, highlight: true, distance: 8 },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', weight: 4, highlight: true },
                    { from: 'A', to: 'D', weight: 2, highlight: true },
                    { from: 'B', to: 'C', weight: 3 },
                    { from: 'D', to: 'E', weight: 6, highlight: true },
                    { from: 'B', to: 'D', weight: 5 }, { from: 'C', to: 'E', weight: 1 },
                  ]}
                />,
              },
              {
                title: 'Process B (dist=4) → relax C',
                description: 'B→C(3): dist[C]=4+3=7.',
                code: 'dist[C]=min(∞,4+3)=7',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true, distance: 0 },
                    { id: 'B', label: 'B', x: 210, y: 50,  visited: true, distance: 4 },
                    { id: 'C', label: 'C', x: 390, y: 50,  highlight: true, distance: 7 },
                    { id: 'D', label: 'D', x: 210, y: 185, visited: true, distance: 2 },
                    { id: 'E', label: 'E', x: 390, y: 185, color: 'violet', distance: 8 },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', weight: 4, highlight: true },
                    { from: 'A', to: 'D', weight: 2, highlight: true },
                    { from: 'B', to: 'C', weight: 3, highlight: true },
                    { from: 'D', to: 'E', weight: 6, highlight: true },
                    { from: 'B', to: 'D', weight: 5 }, { from: 'C', to: 'E', weight: 1 },
                  ]}
                />,
              },
              {
                title: '✅ All vertices settled — final distances',
                description: 'Shortest paths from A: A=0, D=2, B=4, C=7, E=8.',
                code: 'Shortest path tree: A→D, A→B, B→C, D→E',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true, distance: 0 },
                    { id: 'B', label: 'B', x: 210, y: 50,  visited: true, distance: 4 },
                    { id: 'C', label: 'C', x: 390, y: 50,  visited: true, distance: 7 },
                    { id: 'D', label: 'D', x: 210, y: 185, visited: true, distance: 2 },
                    { id: 'E', label: 'E', x: 390, y: 185, visited: true, distance: 8 },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', weight: 4, highlight: true },
                    { from: 'A', to: 'D', weight: 2, highlight: true },
                    { from: 'B', to: 'C', weight: 3, highlight: true },
                    { from: 'D', to: 'E', weight: 6, highlight: true },
                    { from: 'B', to: 'D', weight: 5 }, { from: 'C', to: 'E', weight: 1 },
                  ]}
                />,
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Algorithm & Implementation',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <PyCode language="java">{`// Dijkstra's with min-heap — O((V+E) log V)
int[] dijkstra(List<int[]>[] adj, int src, int V) {
    // adj[u] = list of {v, weight}
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;

    // Min-heap: {dist, vertex}
    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0]-b[0]);
    pq.add(new int[]{0, src});

    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int d = cur[0], u = cur[1];

        if (d > dist[u]) continue;  // stale entry — skip

        for (int[] edge : adj[u]) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.add(new int[]{dist[v], v});
            }
        }
    }
    return dist;  // dist[i] = shortest distance from src to i
}`}</PyCode>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Trace Example (5-vertex graph)</p>
            <p className="text-gray-300 text-sm">Edges: 0→1(4), 0→2(1), 2→1(2), 2→3(5), 1→3(1), 3→4(3). src=0. Initial dist=[0,∞,∞,∞,∞]. Process 0: relax 1→4, 2→1. Process 2(d=1): relax 1→3, 3→6. Process 1(d=3): relax 3→4. Process 3(d=4): relax 4→7. Final: [0,3,1,4,7].</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Path Reconstruction',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <PyCode language="java">{`// Track parent to reconstruct path
int[] prev = new int[V];
Arrays.fill(prev, -1);

// Inside relaxation:
if (dist[u] + w < dist[v]) {
    dist[v] = dist[u] + w;
    prev[v] = u;  // track predecessor
    pq.add(new int[]{dist[v], v});
}

// Reconstruct path from src to target
List<Integer> getPath(int[] prev, int src, int target) {
    List<Integer> path = new ArrayList<>();
    for (int v = target; v != -1; v = prev[v])
        path.add(0, v);
    return path;  // returns [src, ..., target]
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Limitations',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            <p className="text-red-300 font-semibold mb-2">Fails with Negative Weights</p>
            <p className="text-gray-300 text-sm">Dijkstra's greedy assumption is: once a vertex is settled (popped from min-heap), its distance is final. With negative edges, a later path could be shorter — the settled distance may not be optimal. Use <strong>Bellman-Ford</strong> for negative weights.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Value</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Time (binary heap)', 'O((V + E) log V)'],
                  ['Time (Fibonacci heap)', 'O(E + V log V)'],
                  ['Time (simple array)', 'O(V²) — better for dense graphs'],
                  ['Space', 'O(V + E)'],
                  ['Handles negative weights', 'No — use Bellman-Ford'],
                  ['Handles negative cycles', 'No — undefined'],
                ].map(([p, v]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-amber-300 border border-slate-700 text-sm">{v}</td>
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
    { question: "Explain Dijkstra's algorithm in your own words.", solution: "Dijkstra's finds shortest paths from a source vertex by greedily always extending the closest unvisited vertex. It initializes all distances to ∞ except source=0. It uses a min-heap to efficiently get the vertex with smallest current distance. For each extracted vertex u, it relaxes all neighbours: if dist[u]+w(u,v) < dist[v], update dist[v]. Once a vertex is extracted, its distance is final (optimal)." },
    { question: "Why does Dijkstra's algorithm fail with negative edge weights?", solution: "Dijkstra's assumes: once vertex u is extracted from the min-heap, dist[u] is optimal. With negative edges, a later path could be shorter — e.g., going through a negative-weight edge found after u was already settled. The greedy property breaks. Example: 0→1(5), 0→2(3), 2→1(−4). Dijkstra gives dist[1]=5 but correct is 3+(−4)=−1." },
    { question: "What is edge relaxation in Dijkstra's?", solution: "Relaxation: for edge (u,v,w), if dist[u] + w < dist[v], update dist[v] = dist[u] + w and record prev[v] = u. This 'relaxes' the current estimate for v — we've found a shorter path. Dijkstra's repeatedly relaxes edges from the closest unvisited vertex until all vertices are settled." },
    { question: "MCQ: Dijkstra's time complexity with a binary min-heap is:\n A) O(V²)\n B) O(E log V)\n C) O((V+E) log V)\n D) O(V log V)", solution: "C) O((V+E) log V) — each vertex is extracted from the heap once: V extractions × O(log V) each. Each edge causes at most one heap insertion: E insertions × O(log V) each. Total O((V+E) log V)." },
    { question: "MCQ: Which algorithm should replace Dijkstra's when the graph has negative edge weights?\n A) BFS\n B) Prim's\n C) Bellman-Ford\n D) Kruskal's", solution: "C) Bellman-Ford — handles negative edge weights by relaxing all edges V−1 times. Detects negative cycles. Time O(VE) — slower than Dijkstra but correct for negative weights." },
    { question: "Find shortest paths from vertex 0: edges 0→1(2), 0→2(4), 1→2(1), 1→3(7), 2→4(3), 3→4(1).", solution: "Initial dist=[0,∞,∞,∞,∞]. Process 0: dist[1]=2, dist[2]=4. Process 1(d=2): dist[2]=min(4,2+1)=3, dist[3]=9. Process 2(d=3): dist[4]=6. Process 4(d=6): no improvement. Process 3(d=9): dist[4]=min(6,9+1)=6. Final dist=[0,2,3,9,6]. Path to 4: 0→1→2→4." },
    { question: "Interview: How would you modify Dijkstra's to find the K shortest paths?", solution: "Yen's algorithm: find 1st shortest path normally. For k=2..K: generate candidate paths by replacing each edge of the (k-1)th path with an alternative 'spur path' using Dijkstra on a modified graph (spur graph). Add candidates to a min-heap, extract smallest. Complexity: O(Kn(m + n log n)). Alternative: A* with a relaxed heuristic, or Bellman-Ford modified for k paths. K-shortest paths are used in network routing and speech recognition." },
  ],
  exampleProblems: [],
}

export default function DijkstraPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
