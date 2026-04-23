'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiWind, FiCode, FiMap, FiCheckCircle } from 'react-icons/fi'
import GraphDiagram from '@/components/visuals/GraphDiagram'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'BFS Graph Traversal',
  explanationSections: [
    {
      title: '1️⃣ BFS Algorithm',
      icon: <FiWind className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Breadth-First Search (BFS)</span> explores a graph level by level from a source vertex — all neighbours before their neighbours. Uses a <em>queue</em> (FIFO).</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Algorithm:</p>
            <p className="text-gray-300">1. Enqueue source; mark visited</p>
            <p className="text-gray-300">2. While queue not empty:</p>
            <p className="text-gray-300">   a. Dequeue vertex u</p>
            <p className="text-gray-300">   b. Process u</p>
            <p className="text-gray-300">   c. Enqueue all unvisited neighbours of u; mark them visited</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Why Queue?</p>
            <p className="text-gray-300 text-sm">Queue ensures FIFO — vertices found first are explored first. This guarantees that vertices are visited in order of increasing distance from the source (level order).</p>
          </div>
          <AlgoStepper
            title="BFS from node A — press ▶ Play to watch the traversal"
            interval={3000}
            steps={[
              {
                title: 'Enqueue source A, mark visited',
                description: 'Queue = [A]. dist[A]=0, all others = ∞.',
                code: 'queue.add(A); visited[A] = true; dist[A] = 0;',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, highlight: true, distance: 0 },
                    { id: 'B', label: 'B', x: 200, y: 50,  color: 'slate', distance: '∞' },
                    { id: 'C', label: 'C', x: 380, y: 50,  color: 'slate', distance: '∞' },
                    { id: 'D', label: 'D', x: 200, y: 185, color: 'slate', distance: '∞' },
                    { id: 'E', label: 'E', x: 380, y: 185, color: 'slate', distance: '∞' },
                  ]}
                  edges={[
                    { from: 'A', to: 'B' }, { from: 'A', to: 'D' },
                    { from: 'B', to: 'C' }, { from: 'D', to: 'E' },
                    { from: 'B', to: 'D' }, { from: 'C', to: 'E' },
                  ]}
                />,
              },
              {
                title: 'Dequeue A → discover B and D',
                description: 'Queue = [B, D]. dist[B]=1, dist[D]=1.',
                code: 'for (v : adj[A]) if (!visited[v]) { queue.add(v); dist[v]=1; }',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true,  distance: 0 },
                    { id: 'B', label: 'B', x: 200, y: 50,  highlight: true, distance: 1 },
                    { id: 'C', label: 'C', x: 380, y: 50,  color: 'slate', distance: '∞' },
                    { id: 'D', label: 'D', x: 200, y: 185, highlight: true, distance: 1 },
                    { id: 'E', label: 'E', x: 380, y: 185, color: 'slate', distance: '∞' },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true },
                    { from: 'A', to: 'D', highlight: true },
                    { from: 'B', to: 'C' }, { from: 'D', to: 'E' },
                    { from: 'B', to: 'D' }, { from: 'C', to: 'E' },
                  ]}
                />,
              },
              {
                title: 'Dequeue B → discover C',
                description: 'D already visited. Queue = [D, C]. dist[C]=2.',
                code: 'dist[C] = dist[B] + 1 = 2;',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true, distance: 0 },
                    { id: 'B', label: 'B', x: 200, y: 50,  visited: true, distance: 1 },
                    { id: 'C', label: 'C', x: 380, y: 50,  highlight: true, distance: 2 },
                    { id: 'D', label: 'D', x: 200, y: 185, color: 'violet', distance: 1 },
                    { id: 'E', label: 'E', x: 380, y: 185, color: 'slate', distance: '∞' },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true },
                    { from: 'A', to: 'D', highlight: true },
                    { from: 'B', to: 'C', highlight: true },
                    { from: 'D', to: 'E' },
                    { from: 'B', to: 'D' }, { from: 'C', to: 'E' },
                  ]}
                />,
              },
              {
                title: 'Dequeue D → discover E',
                description: 'Queue = [C, E]. dist[E]=2.',
                code: 'dist[E] = dist[D] + 1 = 2;',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true, distance: 0 },
                    { id: 'B', label: 'B', x: 200, y: 50,  visited: true, distance: 1 },
                    { id: 'C', label: 'C', x: 380, y: 50,  color: 'violet', distance: 2 },
                    { id: 'D', label: 'D', x: 200, y: 185, visited: true, distance: 1 },
                    { id: 'E', label: 'E', x: 380, y: 185, highlight: true, distance: 2 },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true },
                    { from: 'A', to: 'D', highlight: true },
                    { from: 'B', to: 'C', highlight: true },
                    { from: 'D', to: 'E', highlight: true },
                    { from: 'B', to: 'D' }, { from: 'C', to: 'E' },
                  ]}
                />,
              },
              {
                title: '✅ BFS complete — all nodes visited',
                description: 'Queue empties. BFS tree (amber edges) is the shortest-path tree.',
                code: 'queue.isEmpty() → BFS done! Distances: A=0, B=1, D=1, C=2, E=2',
                visual: <GraphDiagram width={460} height={220}
                  nodes={[
                    { id: 'A', label: 'A', x: 80,  y: 110, visited: true, distance: 0 },
                    { id: 'B', label: 'B', x: 200, y: 50,  visited: true, distance: 1 },
                    { id: 'C', label: 'C', x: 380, y: 50,  visited: true, distance: 2 },
                    { id: 'D', label: 'D', x: 200, y: 185, visited: true, distance: 1 },
                    { id: 'E', label: 'E', x: 380, y: 185, visited: true, distance: 2 },
                  ]}
                  edges={[
                    { from: 'A', to: 'B', highlight: true },
                    { from: 'A', to: 'D', highlight: true },
                    { from: 'B', to: 'C', highlight: true },
                    { from: 'D', to: 'E', highlight: true },
                    { from: 'B', to: 'D' }, { from: 'C', to: 'E' },
                  ]}
                />,
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ BFS Implementation',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <PyCode language="java">{`import java.util.*;

void bfs(List<Integer>[] adj, int source, int V) {
    boolean[] visited = new boolean[V];
    int[] dist = new int[V];
    Arrays.fill(dist, -1);

    Queue<Integer> queue = new LinkedList<>();
    queue.add(source);
    visited[source] = true;
    dist[source] = 0;

    while (!queue.isEmpty()) {
        int u = queue.poll();
        System.out.print(u + " ");  // process vertex u

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                dist[v] = dist[u] + 1;  // distance from source
                queue.add(v);
            }
        }
    }
}

// BFS gives shortest path (hop count) in unweighted graphs
// dist[v] = minimum number of edges from source to v`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ BFS Applications',
      icon: <FiMap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              ['Shortest Path (unweighted)', 'BFS gives the shortest path in hop count. dist[v] = minimum edges from source. E.g., social network degrees of separation.'],
              ['Connected Components', 'Run BFS from each unvisited vertex. Each BFS call discovers one connected component.'],
              ['Bipartite Check', 'Color vertices alternately (0 and 1) during BFS. If any same-color neighbours exist, graph is not bipartite.'],
              ['Level Order Tree Traversal', 'BFS on a tree gives level-order traversal — used in serialising/deserialising binary trees.'],
              ['Web Crawling', 'BFS from seed URLs — explore links level by level, staying within a depth limit.'],
            ].map(([t, d]) => (
              <div key={t} className="border-l-4 border-cyan-500 pl-4">
                <p className="text-cyan-300 font-semibold">{t}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Complexity',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Time Complexity</p>
              <p className="text-gray-300 text-sm font-mono">O(V + E)</p>
              <p className="text-gray-400 text-xs mt-1">Each vertex enqueued once: O(V). Each edge examined once (both endpoints): O(E).</p>
            </div>
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
              <p className="text-violet-300 font-semibold mb-2">Space Complexity</p>
              <p className="text-gray-300 text-sm font-mono">O(V)</p>
              <p className="text-gray-400 text-xs mt-1">Queue can hold up to O(V) vertices. Visited array: O(V). Distance array: O(V).</p>
            </div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">BFS vs DFS at a Glance</p>
            <p className="text-gray-300 text-sm">BFS uses a queue — explores wide. DFS uses a stack/recursion — explores deep. BFS finds shortest paths in unweighted graphs; DFS is better for cycle detection, topological sort, and maze solving with backtracking.</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What data structure does BFS use and why?', solution: 'BFS uses a queue (FIFO). The queue ensures vertices found first (at shorter distances) are processed first, which naturally produces a level-by-level exploration from the source. This is what guarantees shortest paths in unweighted graphs.' },
    { question: 'What is the time complexity of BFS using an adjacency list?', solution: 'O(V + E) — each vertex is enqueued and dequeued exactly once (O(V)), and each edge is examined exactly twice for undirected graphs (once from each endpoint), giving O(E). Total: O(V + E). With adjacency matrix it is O(V²) because listing neighbours takes O(V) per vertex.' },
    { question: 'How does BFS find the shortest path in an unweighted graph?', solution: 'BFS explores vertices in order of increasing hop distance from source. When vertex v is first dequeued, it has been discovered via the shortest path (fewest edges). dist[v] = dist[u] + 1 when v is discovered from u. This gives exact hop-count shortest paths but NOT correct shortest paths for weighted graphs (use Dijkstra for that).' },
    { question: 'MCQ: BFS visits vertices in order of:\n A) Decreasing distance from source\n B) Increasing distance from source\n C) Random order\n D) Alphabetical order', solution: 'B) Increasing distance from source — BFS processes all vertices at distance 1 before distance 2, all distance 2 before distance 3, etc. This is the level-order property.' },
    { question: 'MCQ: What is the space complexity of BFS?\n A) O(1)\n B) O(log V)\n C) O(V)\n D) O(V²)', solution: 'C) O(V) — the queue holds at most one complete level of vertices, which in the worst case (star graph) is V−1 vertices. The visited array also takes O(V).' },
    { question: 'Trace BFS on the graph: 0-1, 0-2, 1-3, 1-4, 2-5. Starting from vertex 0.', solution: 'Queue: [0], visited={0}. Process 0: enqueue 1,2. Queue:[1,2], dist={0:0,1:1,2:1}. Process 1: enqueue 3,4. Queue:[2,3,4], dist={3:2,4:2}. Process 2: enqueue 5. Queue:[3,4,5], dist={5:2}. Process 3,4,5: no unvisited neighbours. Order: 0,1,2,3,4,5. Distances: 0→0:0, 1:1, 2:1, 3:2, 4:2, 5:2.' },
    { question: 'Interview: How would you use BFS to check if a graph is bipartite?', solution: 'Color vertices with two colors (0 and 1) during BFS. When processing vertex u (color c): for each neighbour v — if unvisited, assign color 1-c and enqueue; if visited and has same color as u, graph is NOT bipartite. If BFS completes without conflict, graph IS bipartite. This detects odd cycles (which prevent bipartiteness). Run from each connected component. Time: O(V+E).' },
  ],
  exampleProblems: [],
}

export default function BFSTraversalPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
