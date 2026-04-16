'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiStar, FiTarget, FiTrendingUp, FiCheckCircle, FiCode } from 'react-icons/fi'

const content = {
  title: 'Informed Search — A* & Greedy Best-First',
  explanationSections: [
    {
      title: '1️⃣ Best-First Search Framework',
      icon: <FiStar className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Informed search</span> uses problem-specific knowledge beyond the problem definition itself. The key idea: use an <span className="text-violet-400 font-semibold">evaluation function f(n)</span> to rank nodes in the frontier, always expanding the node with the lowest f-value.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Key Functions</p>
            <div className="space-y-2 font-mono text-sm">
              <div><span className="text-cyan-300">g(n)</span> <span className="text-gray-400"> = cost from start to node n (known exactly)</span></div>
              <div><span className="text-amber-300">h(n)</span> <span className="text-gray-400"> = estimated cost from n to goal (heuristic)</span></div>
              <div><span className="text-green-300">f(n)</span> <span className="text-gray-400"> = overall evaluation of node n</span></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Greedy Best-First Search',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Greedy BFS</span> uses <code className="text-green-300">f(n) = h(n)</code> — it always expands the node that appears closest to the goal according to the heuristic. It is greedy: it never looks back at the path cost already paid.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Pros</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Very fast when heuristic is good</li>
                <li>Finds solutions quickly in practice</li>
                <li>Complete in finite spaces (with explored set)</li>
              </ul>
            </div>
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <p className="text-red-300 font-semibold mb-2">Cons</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Not optimal — ignores path cost paid so far</li>
                <li>Can follow misleading heuristic into long paths</li>
                <li>Not complete in infinite spaces</li>
              </ul>
            </div>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`import heapq

def greedy_bfs(graph, start, goal, h):
    frontier = [(h(start), start)]
    explored = set()
    parent = {start: None}

    while frontier:
        _, node = heapq.heappop(frontier)
        if node == goal:
            return reconstruct_path(parent, start, goal)
        if node in explored:
            continue
        explored.add(node)
        for neighbor, cost in graph.get(node, []):
            if neighbor not in explored:
                parent.setdefault(neighbor, node)
                heapq.heappush(frontier, (h(neighbor), neighbor))
    return None`}</pre>
        </div>
      ),
    },
    {
      title: '3️⃣ A* Search Algorithm',
      icon: <FiStar className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">A*</span> combines the actual cost g(n) with the heuristic h(n): <code className="text-green-300 font-mono">f(n) = g(n) + h(n)</code>. It expands nodes in order of increasing f-value. When h is <em>admissible</em>, A* is <strong>optimal</strong>.
          </p>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-2">Optimality Proof Sketch</p>
            <p className="text-gray-300 text-sm">When A* selects a goal node G from the frontier, its f(G) = g(G) (since h(goal)=0). Any unexpanded node n on an optimal path has f(n) = g(n) + h(n) ≤ g(n) + h*(n) = C* (because h is admissible). So A* would have expanded n before G if G were suboptimal. Contradiction → G is optimal.</p>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`import heapq

def astar(graph, start, goal, h):
    # frontier: (f, g, state)
    frontier = [(h(start), 0, start)]
    explored = set()
    g = {start: 0}
    parent = {start: None}

    while frontier:
        f, cost, node = heapq.heappop(frontier)
        if node == goal:
            return reconstruct_path(parent, start, goal), cost
        if node in explored:
            continue
        explored.add(node)

        for neighbor, step_cost in graph.get(node, []):
            new_g = g[node] + step_cost
            if neighbor not in g or new_g < g[neighbor]:
                g[neighbor] = new_g
                parent[neighbor] = node
                f_val = new_g + h(neighbor)
                heapq.heappush(frontier, (f_val, new_g, neighbor))
    return None, float('inf')`}</pre>
        </div>
      ),
    },
    {
      title: '4️⃣ A* Trace: Romania (Arad → Bucharest)',
      icon: <FiTrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Straight-line distance heuristic h_SLD (from AIMA). Trace of A* with g, h, f values:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Step</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Expand</th>
                <th className="px-4 py-2 text-green-400 border border-slate-700">g(n)</th>
                <th className="px-4 py-2 text-amber-400 border border-slate-700">h(n)</th>
                <th className="px-4 py-2 text-violet-400 border border-slate-700">f(n)</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['1', 'Arad', '0', '366', '366'],
                  ['2', 'Sibiu', '140', '253', '393'],
                  ['3', 'Rimnicu Vilcea', '220', '193', '413'],
                  ['4', 'Fagaras', '239', '176', '415'],
                  ['5', 'Pitesti', '317', '100', '417'],
                  ['6', 'Bucharest ✓', '418', '0', '418'],
                ].map(([s,n,g,h,f]) => (
                  <tr key={s} className={n.includes('✓') ? 'bg-green-500/10' : ''}>
                    <td className="px-4 py-2 text-gray-400 border border-slate-700">{s}</td>
                    <td className="px-4 py-2 text-white font-semibold border border-slate-700">{n}</td>
                    <td className="px-4 py-2 text-green-300 border border-slate-700">{g}</td>
                    <td className="px-4 py-2 text-amber-300 border border-slate-700">{h}</td>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm">Optimal cost = 418 km. A* finds this with far fewer node expansions than BFS or UCS.</p>
        </div>
      ),
    },
    {
      title: '5️⃣ Comparison: Greedy vs A* vs UCS',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead><tr className="bg-slate-800/50">
              {['Algorithm','f(n)','Complete','Optimal','Time','Space'].map(h => (
                <th key={h} className="px-4 py-2 text-cyan-400 border border-slate-700">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-slate-700">
              {[
                ['Greedy BFS','h(n)','Yes*','No','O(b^m)','O(b^m)'],
                ['A*','g(n)+h(n)','Yes*','Yes (admissible h)','O(b^d)','O(b^d)'],
                ['UCS','g(n)','Yes','Yes','O(b^(C*/ε))','O(b^(C*/ε))'],
              ].map(([alg,...rest]) => (
                <tr key={alg}>
                  <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{alg}</td>
                  {rest.map((v,i) => <td key={i} className="px-4 py-2 text-gray-300 border border-slate-700 text-xs">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-gray-400 text-xs mt-2">* Complete in finite state spaces with explored set. h(n) = 0 makes A* identical to UCS.</p>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the evaluation function used in A* search?', solution: 'f(n) = g(n) + h(n), where g(n) is the actual cost from start to node n, and h(n) is the heuristic estimate of cost from n to goal.' },
    { question: 'Under what condition is A* guaranteed to find an optimal solution?', solution: 'When the heuristic h(n) is admissible — it never overestimates the true cost h*(n) to reach the goal. Formally: h(n) ≤ h*(n) for all n.' },
    { question: 'Why is Greedy Best-First Search not optimal?', solution: 'Greedy BFS uses only h(n) and ignores g(n) (cost already paid). It can take an apparently closer path that actually has a higher total cost. Example: a path with h=5 but g=100 is worse than h=10 but g=20, yet Greedy prefers the first.' },
    { question: 'What happens to A* when h(n) = 0 for all nodes?', solution: 'A* degenerates to UCS (Uniform Cost Search), since f(n) = g(n) + 0 = g(n). It still finds optimal solutions but loses the benefit of the heuristic.' },
    { question: 'MCQ: In A* with h_SLD (straight-line distance), what is f(Sibiu) when coming from Arad?\n A) 140\n B) 253\n C) 393\n D) 366', solution: 'C) 393 — g(Sibiu)=140, h(Sibiu)=253, f=140+253=393.' },
    { question: 'MCQ: Which search uses f(n) = h(n)?\n A) UCS\n B) A*\n C) Greedy BFS\n D) BFS', solution: 'C) Greedy BFS — it ranks purely by heuristic estimate, ignoring path cost.' },
    { question: 'What is the key advantage of A* over BFS?', solution: 'A* uses the heuristic h(n) to guide the search toward the goal, dramatically reducing the number of nodes expanded. BFS expands nodes level by level with no guidance, leading to O(b^d) nodes. A* can find optimal solutions with far fewer expansions when h is informative.' },
    { question: 'Trace A* on a simple graph: S→A(cost 1), S→B(cost 4), A→G(cost 3), B→G(cost 1). h(S)=4, h(A)=3, h(B)=1, h(G)=0. What is the optimal path found?', solution: 'f(S)=4. Expand S: f(A)=1+3=4, f(B)=4+1=5. Expand A (f=4): f(G via A)=4+0=4. Expand G (f=4): goal found! Path: S→A→G, cost=4. Note: S→B→G has cost 5, so A* correctly finds S→A→G.' },
    { question: 'Interview: Why does A* have exponential space complexity and how can this be improved?', solution: 'A* keeps all generated nodes in memory (frontier + explored). In the worst case this is O(b^d). IDA* (Iterative Deepening A*) improves this to O(bd) space by using DFS with an f-limit threshold, at the cost of re-expanding nodes. It trades time for space.' },
  ],
  exampleProblems: [],
}

export default function InformedSearchPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
