'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiRefreshCw, FiAlertCircle, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import GraphDiagram from '@/components/visuals/GraphDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Bellman-Ford Algorithm',
  explanationSections: [
    {
      title: '1️⃣ Why Bellman-Ford?',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Bellman-Ford</span> finds shortest paths from a single source and handles <em>negative edge weights</em> — unlike Dijkstra's. It also detects <em>negative weight cycles</em>.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Negative edges OK', 'Bellman-Ford correctly handles negative-weight edges. Example: financial networks, arbitrage detection.', 'green'],
              ['Negative cycle detection', 'If a path can be made arbitrarily short by looping, Bellman-Ford detects it and reports "no solution".', 'red'],
              ['Slower than Dijkstra', 'O(VE) vs O((V+E) log V). Use Bellman-Ford only when negative edges exist.', 'amber'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <GraphDiagram
            title="Graph with negative edge weight — Bellman-Ford handles this, Dijkstra does NOT"
            width={480} height={220}
            nodes={[
              { id: '0', label: '0', x: 80,  y: 110, color: 'amber', highlight: true, distance: 0  },
              { id: '1', label: '1', x: 220, y: 60,  color: 'cyan',  visited: true,   distance: -1 },
              { id: '2', label: '2', x: 360, y: 60,  color: 'cyan',  visited: true,   distance: 2  },
              { id: '3', label: '3', x: 360, y: 175, color: 'green', visited: true,   distance: 1  },
            ]}
            edges={[
              { from: '0', to: '1', weight: -1, directed: true, highlight: true },
              { from: '0', to: '2', weight: 4,  directed: true },
              { from: '1', to: '2', weight: 3,  directed: true, highlight: true },
              { from: '1', to: '3', weight: 2,  directed: true, highlight: true },
              { from: '3', to: '1', weight: 1,  directed: true },
            ]}
          />
          <AlgoStepper
            title="Bellman-Ford pass-by-pass relaxation from node 0"
            steps={[
              { title: 'Init: dist[0]=0, rest=∞', description: 'Source is vertex 0. All other distances are infinity.', code: 'Arrays.fill(dist, MAX); dist[0] = 0;' },
              { title: 'Pass 1 — relax all edges', description: 'Edge 0→1(−1): dist[1]=−1. Edge 0→2(4): dist[2]=4. Edge 1→2(3): −1+3=2 < 4 → dist[2]=2. Edge 1→3(2): dist[3]=1.', code: 'dist: [0, -1, 2, 1]' },
              { title: 'Pass 2 — no improvements', description: 'Edge 3→1(1): 1+1=2 > −1. No updates. Algorithm converged early.', code: 'if (!updated) break; // early termination' },
              { title: 'Pass V (cycle check) — no negative cycle', description: 'Run one more pass. No distances decrease → no negative cycle. Solution valid.', code: 'Final: 0→0=0, 0→1=−1, 0→2=2, 0→3=1' },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Algorithm — Relax All Edges V−1 Times',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Key insight: in a shortest path with no cycles, at most V−1 edges are used. After i iterations of relaxing all edges, we know shortest paths using at most i edges.</p>
          <PyCode language="java">{`// Bellman-Ford — O(VE)
int[] bellmanFord(int[][] edges, int V, int E, int src) {
    // edges[i] = {u, v, weight}
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;

    // Relax all edges V-1 times
    for (int i = 1; i <= V - 1; i++) {
        boolean updated = false;
        for (int[] e : edges) {
            int u = e[0], v = e[1], w = e[2];
            if (dist[u] != Integer.MAX_VALUE
                    && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                updated = true;
            }
        }
        if (!updated) break;  // early termination — converged
    }

    // Detect negative weight cycles
    for (int[] e : edges) {
        int u = e[0], v = e[1], w = e[2];
        if (dist[u] != Integer.MAX_VALUE
                && dist[u] + w < dist[v]) {
            System.out.println("Negative cycle detected!");
            return null;
        }
    }

    return dist;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Why V−1 Iterations?',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The longest simple path (no repeated vertices) in a V-vertex graph has at most V−1 edges. After the i-th relaxation pass, all paths using at most i edges have been correctly computed. By pass V−1, all shortest paths are correct.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">After pass i</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">What's guaranteed correct</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['1', 'Shortest paths using ≤ 1 edge (direct neighbours)'],
                  ['2', 'Shortest paths using ≤ 2 edges'],
                  ['k', 'Shortest paths using ≤ k edges'],
                  ['V−1', 'All shortest simple paths (correct final answer)'],
                  ['V (extra check)', 'If any distance still improves → negative cycle exists'],
                ].map(([i, g]) => (
                  <tr key={i}>
                    <td className="px-4 py-2 text-violet-300 font-mono border border-slate-700">{i}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Negative Cycle Detection',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            <p className="text-red-300 font-semibold mb-2">Negative Cycle</p>
            <p className="text-gray-300 text-sm">A cycle whose total edge weights sum to a negative value. Shortest paths become undefined (infinitely short) for vertices reachable via the cycle. After V−1 passes, run a V-th pass — if any distance updates, a negative cycle is reachable.</p>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Real Application: Currency Arbitrage</p>
            <p className="text-gray-300 text-sm">Model currencies as vertices, exchange rates as negative-log edge weights. A negative cycle → arbitrage opportunity (cycle of trades that profits). Bellman-Ford detects this.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Algorithm</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Dijkstra</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Bellman-Ford</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Time', 'O((V+E) log V)', 'O(VE)'],
                  ['Negative weights', 'No', 'Yes'],
                  ['Negative cycles', 'No', 'Detects them'],
                  ['Source type', 'Single source', 'Single source'],
                ].map(([p, d, b]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{d}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{b}</td>
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
    { question: 'How does Bellman-Ford handle negative edge weights?', solution: 'Unlike Dijkstra\'s (which greedily settles vertices), Bellman-Ford relaxes all edges V−1 times. It does not assume distances are final until all passes are done. With negative edges, later passes can still improve paths — Bellman-Ford correctly finds the optimal by exhausting all V−1-edge paths.' },
    { question: 'Why does Bellman-Ford run exactly V−1 relaxation passes?', solution: 'The shortest simple path in a V-vertex graph uses at most V−1 edges (no vertex repeated). After i passes, all optimal paths using ≤ i edges are found. After V−1 passes, all shortest paths are found. A V-th pass that still improves a distance means a negative cycle exists.' },
    { question: 'How does Bellman-Ford detect a negative weight cycle?', solution: 'After V−1 relaxation passes (which find all shortest simple paths), run a V-th pass over all edges. If any edge (u,v,w) still satisfies dist[u]+w < dist[v], a vertex\'s distance can still be reduced — only possible if a negative cycle exists that\'s reachable from the source.' },
    { question: 'MCQ: Bellman-Ford\'s time complexity is:\n A) O(V log V)\n B) O(E log V)\n C) O(VE)\n D) O(V²)', solution: 'C) O(VE) — V−1 passes × E edges relaxed per pass = O(VE). For sparse graphs this is acceptable; for dense graphs (E≈V²) it becomes O(V³).' },
    { question: "MCQ: Compared to Dijkstra's, Bellman-Ford is:\n A) Faster always\n B) Faster for dense graphs\n C) Slower but handles negative edges\n D) Slower and cannot handle negative edges", solution: "C) Slower (O(VE) vs O((V+E) log V)) but correctly handles negative edge weights and detects negative cycles. Choose Dijkstra's when all weights are non-negative." },
    { question: 'Trace Bellman-Ford: 4 vertices, src=0. Edges: (0,1,−1), (0,2,4), (1,2,3), (1,3,2), (1,4,2), (3,2,5), (3,1,1), (4,3,−3). Find shortest paths.', solution: 'Initial dist=[0,∞,∞,∞,∞]. Pass 1: dist[1]=−1, dist[2]=4. From 1: dist[2]=2, dist[3]=1, dist[4]=1. Pass 2: From 3(d=1): dist[1]=2 — no (−1<2). From 4(d=1): dist[3]=−2. Pass 3: From 3(d=−2): dist[1]=−1, dist[2]=3. No improvement over dist[1]=−1. Final: [0,−1,2,−2,1]. Check for negative cycle: extra pass shows no improvement — no negative cycle.' },
    { question: 'Interview: Explain currency arbitrage detection with Bellman-Ford.', solution: 'Model as a directed graph: vertices = currencies, edges = exchange rates. Convert rate r to edge weight −log(r). A profitable arbitrage cycle: r₁ × r₂ × ... × rₖ > 1 → log(r₁)+...+log(rₖ) > 0 → −log(r₁)−...−log(rₖ) < 0 → negative cycle. Run Bellman-Ford; if a negative cycle is detected, a profitable trade sequence exists. This is used by high-frequency trading systems to detect arbitrage opportunities across currency pairs.' },
  ],
  exampleProblems: [],
}

export default function BellmanFordPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
