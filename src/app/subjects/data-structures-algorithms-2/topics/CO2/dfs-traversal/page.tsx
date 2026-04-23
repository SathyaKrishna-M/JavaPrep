'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiNavigation, FiCode, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import GraphDiagram from '@/components/visuals/GraphDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'DFS Graph Traversal',
  explanationSections: [
    {
      title: '1️⃣ DFS Algorithm',
      icon: <FiNavigation className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Depth-First Search (DFS)</span> explores as far as possible along each branch before backtracking. Uses a <em>stack</em> (implicit via recursion, or explicit).</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">DFS (Recursive)</p>
              <PyCode language="java">{`void dfs(List<Integer>[] adj,
         boolean[] visited, int u) {
    visited[u] = true;
    System.out.print(u + " ");
    for (int v : adj[u])
        if (!visited[v])
            dfs(adj, visited, v);
}`}</PyCode>
            </div>
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
              <p className="text-violet-300 font-semibold mb-2">DFS (Iterative/Stack)</p>
              <PyCode language="java">{`void dfsIter(List<Integer>[] adj,
             int src, int V) {
    boolean[] vis = new boolean[V];
    Stack<Integer> st = new Stack<>();
    st.push(src);
    while (!st.isEmpty()) {
        int u = st.pop();
        if (!vis[u]) {
            vis[u] = true;
            System.out.print(u + " ");
            for (int v : adj[u])
                if (!vis[v]) st.push(v);
        }
    }
}`}</PyCode>
            </div>
          </div>
          <AlgoStepper
            title="DFS from node A — press ▶ Play to watch depth-first traversal"
            interval={3000}
            steps={[
              {
                title: 'Visit A (discovery=1)',
                description: 'Mark A visited. Explore neighbours: pick B first.',
                code: 'dfs(A) → visited[A]=true, disc[A]=1',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, highlight: true },
                    { id: 'B', label: 'B', x: 200, y: 50,  color: 'slate' },
                    { id: 'C', label: 'C', x: 380, y: 50,  color: 'slate' },
                    { id: 'D', label: 'D', x: 200, y: 185, color: 'slate' },
                    { id: 'E', label: 'E', x: 380, y: 185, color: 'slate' },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true }, { from: 'B', to: 'C' },
                    { from: 'C', to: 'E' }, { from: 'E', to: 'D' },
                    { from: 'A', to: 'D' }, { from: 'B', to: 'D' },
                  ]}
                />,
              },
              {
                title: 'Visit B (discovery=2)',
                description: 'From A→B. Mark B visited. Explore B\'s neighbours: C.',
                code: 'dfs(B) → visited[B]=true, disc[B]=2',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true },
                    { id: 'B', label: 'B', x: 200, y: 50,  highlight: true },
                    { id: 'C', label: 'C', x: 380, y: 50,  color: 'slate' },
                    { id: 'D', label: 'D', x: 200, y: 185, color: 'slate' },
                    { id: 'E', label: 'E', x: 380, y: 185, color: 'slate' },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true }, { from: 'B', to: 'C', highlight: true },
                    { from: 'C', to: 'E' }, { from: 'E', to: 'D' },
                    { from: 'A', to: 'D' }, { from: 'B', to: 'D' },
                  ]}
                />,
              },
              {
                title: 'Visit C (discovery=3)',
                description: 'From B→C. C has unvisited neighbour E — recurse.',
                code: 'dfs(C) → visited[C]=true, disc[C]=3',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true },
                    { id: 'B', label: 'B', x: 200, y: 50,  visited: true },
                    { id: 'C', label: 'C', x: 380, y: 50,  highlight: true },
                    { id: 'D', label: 'D', x: 200, y: 185, color: 'slate' },
                    { id: 'E', label: 'E', x: 380, y: 185, color: 'slate' },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true }, { from: 'B', to: 'C', highlight: true },
                    { from: 'C', to: 'E', highlight: true }, { from: 'E', to: 'D' },
                    { from: 'A', to: 'D' }, { from: 'B', to: 'D' },
                  ]}
                />,
              },
              {
                title: 'Visit E (discovery=4)',
                description: 'From C→E. E\'s neighbour D is unvisited — recurse.',
                code: 'dfs(E) → visited[E]=true, disc[E]=4',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true },
                    { id: 'B', label: 'B', x: 200, y: 50,  visited: true },
                    { id: 'C', label: 'C', x: 380, y: 50,  visited: true },
                    { id: 'D', label: 'D', x: 200, y: 185, color: 'slate' },
                    { id: 'E', label: 'E', x: 380, y: 185, highlight: true },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true }, { from: 'B', to: 'C', highlight: true },
                    { from: 'C', to: 'E', highlight: true }, { from: 'E', to: 'D', highlight: true },
                    { from: 'A', to: 'D' }, { from: 'B', to: 'D' },
                  ]}
                />,
              },
              {
                title: 'Visit D (discovery=5) → backtrack',
                description: 'D\'s neighbours A,B already visited. Finish D, then backtrack E→C→B→A.',
                code: 'dfs(D) → finish[D]=6, backtrack all',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true },
                    { id: 'B', label: 'B', x: 200, y: 50,  visited: true },
                    { id: 'C', label: 'C', x: 380, y: 50,  visited: true },
                    { id: 'D', label: 'D', x: 200, y: 185, highlight: true },
                    { id: 'E', label: 'E', x: 380, y: 185, visited: true },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true }, { from: 'B', to: 'C', highlight: true },
                    { from: 'C', to: 'E', highlight: true }, { from: 'E', to: 'D', highlight: true },
                    { from: 'A', to: 'D' }, { from: 'B', to: 'D' },
                  ]}
                />,
              },
              {
                title: '✅ DFS complete — tree: A→B→C→E→D',
                description: 'All 5 nodes visited. Amber edges form the DFS spanning tree.',
                code: 'Discovery order: A,B,C,E,D. finish[A]=10 ✓',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true },
                    { id: 'B', label: 'B', x: 200, y: 50,  visited: true },
                    { id: 'C', label: 'C', x: 380, y: 50,  visited: true },
                    { id: 'D', label: 'D', x: 200, y: 185, visited: true },
                    { id: 'E', label: 'E', x: 380, y: 185, visited: true },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true }, { from: 'B', to: 'C', highlight: true },
                    { from: 'C', to: 'E', highlight: true }, { from: 'E', to: 'D', highlight: true },
                    { from: 'A', to: 'D' }, { from: 'B', to: 'D' },
                  ]}
                />,
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Discovery & Finish Times',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">DFS tracks <span className="text-cyan-400 font-semibold">discovery time</span> (when a vertex is first visited) and <span className="text-cyan-400 font-semibold">finish time</span> (when all descendants are explored). These enable cycle detection and topological sort.</p>
          <PyCode language="java">{`int time = 0;
int[] disc = new int[V], fin = new int[V];
// Edge classification:
// Tree edge: u discovers v (v unvisited)
// Back edge: u→v where v is ancestor (CYCLE in directed graph!)
// Forward edge: u→v where disc[u] < disc[v] (directed only)
// Cross edge: remaining (directed only)

void dfsTime(int u, boolean[] visited,
             List<Integer>[] adj) {
    visited[u] = true;
    disc[u] = ++time;

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfsTime(v, visited, adj);  // tree edge
        } else if (disc[v] < disc[u] && fin[v] == 0) {
            System.out.println("Back edge: " + u + "→" + v + " (cycle!)");
        }
    }
    fin[u] = ++time;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ DFS Applications',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              ['Cycle Detection', 'In a directed graph: if DFS finds a back edge (to an ancestor still in recursion stack), a cycle exists. In undirected: any revisit of a non-parent vertex indicates a cycle.'],
              ['Connected Components', 'Run DFS from each unvisited vertex. Each DFS call discovers one connected component. Count = number of DFS calls needed.'],
              ['Topological Ordering', 'Add vertices to a stack in order of finish times. The stack gives the topological order (only for DAGs).'],
              ['Strongly Connected Components (SCC)', "Kosaraju's: run DFS, push to stack by finish time → transpose graph → DFS in stack order. Each new DFS = one SCC."],
              ['Maze / Puzzle Solving', 'DFS with backtracking explores all paths — natural fit for puzzles, N-Queens, Sudoku solving.'],
            ].map(([t, d]) => (
              <div key={t} className="border-l-4 border-violet-500 pl-4">
                <p className="text-violet-300 font-semibold">{t}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ BFS vs DFS Comparison',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">BFS</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">DFS</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Data structure', 'Queue (FIFO)', 'Stack / Recursion'],
                  ['Time complexity', 'O(V + E)', 'O(V + E)'],
                  ['Space complexity', 'O(V) — can be large for wide graphs', 'O(h) — height/depth of search'],
                  ['Shortest path', 'Yes — unweighted graphs', 'No'],
                  ['Cycle detection', 'Yes', 'Yes (more natural)'],
                  ['Topological sort', 'Yes (Kahn\'s)', 'Yes (finish times)'],
                  ['Memory for deep graphs', 'May overflow queue', 'Stack overflow possible (recursion)'],
                ].map(([p, b, d]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{b}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{d}</td>
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
    { question: 'What data structure underlies DFS, and how does it differ from BFS?', solution: 'DFS uses a stack (LIFO) — either an explicit stack or the call stack via recursion. BFS uses a queue (FIFO). The stack causes DFS to go deep before wide; the queue causes BFS to go wide before deep. Both have O(V+E) time and O(V) space.' },
    { question: 'What are discovery and finish times in DFS, and what do they tell us?', solution: 'Discovery time disc[u]: timestamp when u is first visited. Finish time fin[u]: timestamp when u\'s DFS subtree is fully explored. For any descendant v of u: disc[u] < disc[v] < fin[v] < fin[u]. Back edges (to ancestors) indicate directed cycles. The finish time order gives topological sort (reverse of finish times).' },
    { question: 'How does DFS detect a cycle in a directed graph?', solution: 'Maintain a "currently in recursion stack" array (or color: WHITE/GRAY/BLACK). If DFS encounters a GRAY vertex (currently being processed = ancestor in recursion stack), a back edge is found → cycle exists. If it encounters only BLACK (fully processed) or WHITE vertices, no cycle from current path.' },
    { question: 'MCQ: DFS on a disconnected graph with V=5, E=3:\n A) Only visits 3 vertices\n B) Visits all vertices if run from each unvisited vertex\n C) Cannot handle disconnected graphs\n D) Has O(E) time complexity', solution: 'B) To handle disconnected graphs, run DFS from each unvisited vertex in an outer loop: for (int i=0; i<V; i++) if (!visited[i]) dfs(adj, visited, i). Each call explores one connected component.' },
    { question: 'MCQ: Edge (u,v) is a back edge in DFS if:\n A) v is undiscovered\n B) v is discovered and v is an ancestor of u\n C) v is discovered and v is a descendant of u\n D) v is discovered and v is in a different component', solution: 'B) Back edge: v is an ancestor of u (still in the current DFS path / recursion stack). This creates a cycle in a directed graph.' },
    { question: 'Trace DFS on: 0-1, 0-2, 1-3, 2-3, 3-4. Start from 0.', solution: 'Call dfs(0): visit 0, recurse to 1. Call dfs(1): visit 1, recurse to 3. Call dfs(3): visit 3, recurse to 2 (if not visited), then 4. Call dfs(2): visit 2, 0 already visited. Return. Call dfs(4): visit 4, return. Order: 0, 1, 3, 2, 4 (or varies by adjacency list order).' },
    { question: 'Interview: Explain Kosaraju\'s algorithm for finding Strongly Connected Components.', solution: 'Step 1: Run DFS on original graph. Push vertices to a stack in order of finish time (latest finish = top of stack). Step 2: Transpose the graph (reverse all edge directions). Step 3: Process stack top to bottom — for each unvisited vertex, run DFS on the transposed graph. Each DFS in step 3 discovers exactly one SCC. Intuition: if there\'s a path u→v in original and v→u in transposed, u and v are in the same SCC. Time: O(V+E).' },
  ],
  exampleProblems: [],
}

export default function DFSTraversalPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
