'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiGrid, FiCode, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import DPGrid from '@/components/visuals/DPGrid'

const content = {
  title: 'Floyd-Warshall Algorithm',
  explanationSections: [
    {
      title: '1️⃣ All-Pairs Shortest Path',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Floyd-Warshall</span> computes the shortest paths between <em>all pairs</em> of vertices simultaneously. It uses dynamic programming on the adjacency matrix.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Input', 'Weighted directed or undirected graph (can have negative edges, but not negative cycles)', 'blue'],
              ['Output', 'dist[i][j] = shortest path from i to j, for all pairs (i,j)', 'green'],
              ['Complexity', 'O(V³) time, O(V²) space — acceptable for small/medium V', 'violet'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <DPGrid
            title="Final dist[][] matrix after Floyd-Warshall — 4-node graph (∞ = no direct path initially)"
            rowHeaders={['0','1','2','3']}
            colHeaders={['','0','1','2','3']}
            data={[
              [{value:'0',color:'result'}, {value:'3',color:'highlight'}, {value:'5',color:'highlight'}, {value:'6',color:'highlight'}],
              [{value:'8',color:'highlight'}, {value:'0',color:'result'}, {value:'2',color:'highlight'}, {value:'3',color:'highlight'}],
              [{value:'5',color:'highlight'}, {value:'8',color:'highlight'}, {value:'0',color:'result'}, {value:'1',color:'highlight'}],
              [{value:'2',color:'highlight'}, {value:'5',color:'highlight'}, {value:'7',color:'highlight'}, {value:'0',color:'result'}],
            ]}
            caption="Each cell dist[i][j] = shortest path from i to j through any intermediate vertices"
          />
        </div>
      ),
    },
    {
      title: '2️⃣ DP Recurrence',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Define <span className="text-cyan-400 font-semibold">dist[k][i][j]</span> = shortest path from i to j using only vertices {'{0,1,...,k}'} as intermediate nodes.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Recurrence:</p>
            <p className="text-gray-300">dist[k][i][j] = min(</p>
            <p className="text-gray-300 ml-4">dist[k−1][i][j],           // don't use vertex k</p>
            <p className="text-gray-300 ml-4">dist[k−1][i][k] + dist[k−1][k][j]  // go through k</p>
            <p className="text-gray-300">)</p>
          </div>
          <PyCode language="java">{`// Floyd-Warshall — O(V³) time, O(V²) space
int[][] floydWarshall(int[][] graph, int V) {
    // Initialize dist[][] = graph[][]
    int[][] dist = new int[V][V];
    for (int i = 0; i < V; i++)
        dist[i] = graph[i].clone();

    // For each intermediate vertex k
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != Integer.MAX_VALUE
                        && dist[k][j] != Integer.MAX_VALUE
                        && dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    // Detect negative cycles: dist[i][i] < 0
    for (int i = 0; i < V; i++)
        if (dist[i][i] < 0) {
            System.out.println("Negative cycle detected!");
            return null;
        }

    return dist;  // dist[i][j] = shortest i→j distance
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Worked Example',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">4-vertex graph: 0→1(3), 0→3(7), 1→0(8), 1→2(2), 2→0(5), 2→3(1), 3→0(2).</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">After k=</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">dist[0][2]</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">dist[3][1]</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Key update</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Initial', '∞', '∞', 'Direct edges only'],
                  ['k=0 (via 0)', '∞', '2+3=5', '3→0→1 = 5'],
                  ['k=1 (via 0,1)', '3+2=5', '5', '0→1→2 = 5'],
                  ['k=2 (via 0,1,2)', '5', '5+1=6 → no', 'Check k=2 paths'],
                  ['k=3 (via 0,1,2,3)', '5', '5', 'Final: all paths'],
                ].map(([k, d02, d31, note]) => (
                  <tr key={k}>
                    <td className="px-4 py-2 text-violet-300 font-mono border border-slate-700">{k}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700">{d02}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700">{d31}</td>
                    <td className="px-4 py-2 text-gray-400 border border-slate-700 text-sm">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Applications & Comparison',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              ['Transitive Closure', 'Set weight=1 for all edges. After Floyd-Warshall, dist[i][j] < ∞ iff j is reachable from i.'],
              ['Network routing', 'Compute routing tables for all router pairs — used in small networks.'],
              ['Arbitrage detection', 'With log-transformed weights, negative diagonal means profitable currency cycle.'],
            ].map(([t, d]) => (
              <div key={t} className="border-l-4 border-cyan-500 pl-3">
                <span className="text-cyan-300 font-semibold text-sm">{t}:</span>
                <span className="text-gray-300 text-sm ml-2">{d}</span>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Algorithm</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Time</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Negative weights</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">All-pairs</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ["Dijkstra's ×V", 'O(V(V+E) log V)', 'No', 'Yes (run V times)'],
                  ['Bellman-Ford ×V', 'O(V²E)', 'Yes', 'Yes (run V times)'],
                  ['Floyd-Warshall', 'O(V³)', 'Yes', 'Yes (single run)'],
                ].map(([a, t, n, ap]) => (
                  <tr key={a}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{a}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700">{t}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{n}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{ap}</td>
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
    { question: 'What is the DP recurrence of Floyd-Warshall?', solution: 'dist[k][i][j] = min(dist[k−1][i][j], dist[k−1][i][k] + dist[k−1][k][j]). Interpreted: the shortest path from i to j using only {0..k} as intermediates is either: (1) the path not using k (dist[k−1][i][j]), or (2) the path going through k (dist[k−1][i][k] + dist[k−1][k][j]).' },
    { question: 'Why is Floyd-Warshall O(V³)?', solution: 'Three nested loops: outer loop over k (V iterations), inner loops over all pairs i,j (V² iterations each). Each iteration does O(1) work (one comparison and possible update). Total: O(V³).' },
    { question: 'How does Floyd-Warshall detect negative cycles?', solution: 'After the algorithm runs, check the diagonal: if dist[i][i] < 0 for any i, then vertex i is on a negative cycle. This is because the algorithm computed a path from i back to i through some intermediates, and found it shorter than 0 (the initial direct value).' },
    { question: 'MCQ: Floyd-Warshall requires how much space?\n A) O(V)\n B) O(VE)\n C) O(V²)\n D) O(V³)', solution: 'C) O(V²) — the algorithm uses a V×V distance matrix. The k dimension can be eliminated by updating in-place (the standard 2D implementation).' },
    { question: 'MCQ: Floyd-Warshall is preferred over running Dijkstra V times when:\n A) The graph is sparse and has no negative edges\n B) The graph is dense and has negative edges\n C) The graph is very large (V > 10,000)\n D) Only one pair\'s shortest path is needed', solution: 'B) Dense graphs with negative edges — for dense graphs E≈V², running Dijkstra×V costs O(V³ log V) vs Floyd-Warshall O(V³). Floyd-Warshall also handles negative edges (but not negative cycles).' },
    { question: 'How would you use Floyd-Warshall to compute transitive closure?', solution: 'Initialize reach[i][j] = true if there\'s a direct edge (i,j), else false. Run Floyd-Warshall with OR instead of min: reach[k][i][j] = reach[k-1][i][j] OR (reach[k-1][i][k] AND reach[k-1][k][j]). After all k, reach[i][j]=true iff vertex j is reachable from i.' },
    { question: 'Interview: When would you use Floyd-Warshall in a production system?', solution: 'Floyd-Warshall is practical when V is small (≤ a few thousand). Use cases: (1) Routing tables in small enterprise networks — compute all-pairs paths for efficient packet routing; (2) Social network analysis — compute shortest path between all user pairs for "degrees of separation" features (but only for small subgraphs); (3) Game AI pathfinding when the map has a small number of waypoints; (4) Transitive closure computation in compilers (reaching definition analysis). For large sparse graphs, run Dijkstra from each source instead.' },
  ],
  exampleProblems: [],
}

export default function FloydWarshallPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
