'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCpu, FiZap, FiCode, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Memory-Bounded & Advanced Search',
  explanationSections: [
    {
      title: '1️⃣ The Memory Problem with A*',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A* is optimal and complete, but it stores <span className="text-cyan-400 font-semibold">all generated nodes</span> in memory. For problems with large state spaces, this quickly becomes infeasible.</p>
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            <p className="text-red-300 font-semibold mb-2">Example: 15-Puzzle</p>
            <p className="text-gray-300 text-sm">The 15-puzzle has 10¹³ reachable states. At 10 bytes per node, A* would need 100 terabytes of RAM — clearly impossible. We need memory-bounded alternatives.</p>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ IDA* — Iterative Deepening A*',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">IDA*</span> performs DFS with an f-value threshold. Each iteration increases the threshold to the minimum f-value that exceeded the previous threshold.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Advantages</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Space: O(bd) — only current path in memory</li>
                <li>Optimal if h is admissible</li>
                <li>Complete</li>
              </ul>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-semibold mb-2">Disadvantages</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Re-expands nodes on each iteration</li>
                <li>Slow on graphs with many distinct f-values</li>
                <li>Not suitable if repeated states are common</li>
              </ul>
            </div>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`def ida_star(start, goal, h):
    threshold = h(start)
    path = [start]

    while True:
        result = dfs_contour(path, 0, threshold, goal, h)
        if result == 'FOUND':
            return path
        if result == float('inf'):
            return None  # no solution
        threshold = result  # increase threshold

def dfs_contour(path, g, threshold, goal, h):
    node = path[-1]
    f = g + h(node)
    if f > threshold:
        return f  # exceeded threshold — return new minimum
    if node == goal:
        return 'FOUND'

    minimum = float('inf')
    for neighbor, cost in successors(node):
        if neighbor not in path:  # avoid cycles on path
            path.append(neighbor)
            result = dfs_contour(path, g + cost, threshold, goal, h)
            if result == 'FOUND':
                return 'FOUND'
            if result < minimum:
                minimum = result
            path.pop()
    return minimum`}</pre>
        </div>
      ),
    },
    {
      title: '3️⃣ Bidirectional Search',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Bidirectional search</span> runs two simultaneous searches — one forward from start, one backward from goal — stopping when the two frontiers meet.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Complexity Advantage</p>
            <p className="text-gray-300 text-sm">Each search explores O(b^(d/2)) nodes. Total: 2 × b^(d/2). Compare to b^d for one-directional BFS. For b=10, d=6: BFS = 10⁶ = 1,000,000 nodes vs Bidir = 2×10³ = 2,000 nodes — 500× speedup!</p>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-2">Challenge</p>
            <p className="text-gray-300 text-sm">Requires predecessors to be efficiently computable (applicable when actions are reversible). Also tricky to implement correctly for optimal solutions — simply detecting intersection is not sufficient for optimality in weighted graphs.</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Graph Search vs Tree Search',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The critical implementation choice: do we track visited states?</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Tree Search</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Graph Search</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Explores set', 'No', 'Yes (closed/explored)'],
                  ['Re-expansion', 'May re-expand states', 'Never re-expands'],
                  ['Complete (cyclic)', 'No — may loop forever', 'Yes (finite graphs)'],
                  ['Memory', 'Less (no explored set)', 'More (stores explored)'],
                  ['When to use', 'Trees/acyclic state spaces', 'Graphs with cycles'],
                ].map(([p,t,g]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-red-300 border border-slate-700 text-sm">{t}</td>
                    <td className="px-4 py-2 text-green-300 border border-slate-700 text-sm">{g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Algorithm Comparison',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead><tr className="bg-slate-800/50">
              {['Algorithm','Time','Space','Optimal','Complete'].map(h => (
                <th key={h} className="px-4 py-2 text-cyan-400 border border-slate-700">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-slate-700">
              {[
                ['BFS','O(b^d)','O(b^d)','Yes (unit cost)','Yes'],
                ['DFS','O(b^m)','O(bm)','No','No (infinite)'],
                ['UCS','O(b^(C*/ε))','O(b^(C*/ε))','Yes','Yes'],
                ['A*','O(b^d)','O(b^d)','Yes (admiss h)','Yes'],
                ['IDA*','O(b^d)','O(bd)','Yes (admiss h)','Yes'],
                ['Bidir BFS','O(b^(d/2))','O(b^(d/2))','Yes (unit cost)','Yes'],
              ].map(([alg,...rest]) => (
                <tr key={alg}>
                  <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{alg}</td>
                  {rest.map((v,i) => <td key={i} className="px-4 py-2 text-gray-300 border border-slate-700 text-xs">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Why does A* have high memory requirements?', solution: 'A* stores all generated nodes in the frontier and explored set. In the worst case this is O(b^d) nodes — exponential in the solution depth. For large state spaces this exceeds available RAM.' },
    { question: 'How does IDA* reduce memory usage compared to A*?', solution: 'IDA* uses DFS with an f-threshold, only storing the current path (O(bd) space). It re-expands nodes on each threshold iteration instead of storing them, trading time for space.' },
    { question: 'What is the key advantage of bidirectional search over forward search?', solution: 'Bidirectional search explores O(b^(d/2)) nodes in each direction, for a total of O(2·b^(d/2)). This is exponentially less than O(b^d) for one-directional search.' },
    { question: 'MCQ: IDA* uses which traversal strategy?\n A) BFS\n B) DFS\n C) UCS\n D) Best-first', solution: 'B) DFS — IDA* is a depth-first search with an f-value cutoff threshold that increases each iteration.' },
    { question: 'MCQ: What is the space complexity of IDA*?\n A) O(b^d)\n B) O(b^m)\n C) O(bd)\n D) O(d)', solution: 'C) O(bd) — IDA* stores only the current path from root to current node, which has at most d+1 nodes each with b choices remembered.' },
    { question: 'When would you prefer IDA* over A*?', solution: 'When memory is severely limited. IDA* is better for problems like the 15-puzzle where A* would need gigabytes of RAM. The cost is re-expanding nodes on each iteration (time overhead). Choose A* when memory allows, IDA* when it does not.' },
    { question: 'Interview: What makes bidirectional search difficult to implement correctly for optimal solutions in weighted graphs?', solution: 'Simply stopping when the two frontiers meet does not guarantee optimality. The meeting node may not be on the optimal path. Correct implementations must continue until the best path through any meeting point is confirmed optimal — this requires careful bookkeeping and comparison of path costs.' },
  ],
  exampleProblems: [],
}

export default function MemoryBoundedSearchPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
