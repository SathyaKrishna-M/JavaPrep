'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiPackage, FiZap, FiCode, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Core Python Data Structures for AI',
  explanationSections: [
    {
      title: '1️⃣ dict — The AI Swiss Army Knife',
      icon: <FiPackage className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Python <span className="text-cyan-400 font-semibold">dict</span> (hash map) is O(1) average for insert, lookup, and delete. In AI it is used for: graph adjacency lists, g-values in A*, memoization caches, and parent tracking in search.</p>
          <PyCode>{`# Graph as adjacency dict
graph = {
    'Arad':   [('Sibiu', 140), ('Zerind', 75)],
    'Sibiu':  [('Arad', 140), ('Fagaras', 99)],
    'Zerind': [('Arad', 75), ('Oradea', 71)],
}

# g-values in A*: cost to reach each state
g = {'Arad': 0}
g['Sibiu'] = g['Arad'] + 140   # 140

# Parent tracking for path reconstruction
parent = {'Arad': None, 'Sibiu': 'Arad'}

# Memoization cache
memo = {}
def h(state):
    if state not in memo:
        memo[state] = compute_heuristic(state)
    return memo[state]`}</PyCode>
        </div>
      ),
    },
    {
      title: '2️⃣ set — The Explored Set',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Python <span className="text-cyan-400 font-semibold">set</span> provides O(1) average membership test, add, and remove. Critical for the <em>explored/closed</em> set in graph search to avoid revisiting states.</p>
          <PyCode>{`explored = set()

# O(1) check — no matter how many states explored
if state not in explored:
    explored.add(state)
    # expand node ...

# Set operations useful in CSP
domain_A = {'red', 'green', 'blue'}
domain_B = {'green', 'blue'}
possible_for_both = domain_A & domain_B  # {'green', 'blue'}
only_in_A = domain_A - domain_B          # {'red'}

# Frozenset for hashable states (e.g., 8-puzzle board)
board = frozenset({(0,0,'blank'), (0,1,'1'), (1,0,'2')})
explored.add(board)  # ✓ frozenset is hashable`}</PyCode>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Hashability Requirement</p>
            <p className="text-gray-300 text-sm">States added to a set must be hashable. Use tuples (not lists) or frozensets to represent states: <code className="text-green-300">tuple(board)</code> instead of <code className="text-green-300">list(board)</code>.</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ collections.deque — BFS Queue',
      icon: <FiPackage className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">deque</span> (double-ended queue) provides O(1) append to right and popleft from left — perfect for BFS FIFO frontier. A plain list has O(n) pop(0).</p>
          <PyCode>{`from collections import deque

def bfs(graph, start, goal):
    frontier = deque([start])   # O(1) append/popleft
    explored = {start}
    parent = {start: None}

    while frontier:
        node = frontier.popleft()  # O(1) — FIFO
        if node == goal:
            return reconstruct_path(parent, start, goal)
        for neighbor, cost in graph.get(node, []):
            if neighbor not in explored:
                explored.add(neighbor)
                parent[neighbor] = node
                frontier.append(neighbor)   # O(1)
    return None

def reconstruct_path(parent, start, goal):
    path, node = [], goal
    while node is not None:
        path.append(node)
        node = parent[node]
    return list(reversed(path))

# Test
print(bfs(graph, 'Arad', 'Zerind'))  # ['Arad', 'Zerind']`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ heapq — Priority Queue for UCS & A*',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">heapq</span> implements a min-heap: the smallest element is always at index 0. Used as the frontier in UCS (sort by g) and A* (sort by f = g + h). heappush and heappop are O(log n).</p>
          <PyCode>{`import heapq

def ucs(graph, start, goal):
    # frontier: (cost, state)
    frontier = [(0, start)]
    heapq.heapify(frontier)
    explored = set()
    g = {start: 0}
    parent = {start: None}

    while frontier:
        cost, node = heapq.heappop(frontier)  # O(log n)
        if node == goal:
            return reconstruct_path(parent, start, goal), cost
        if node in explored:
            continue
        explored.add(node)
        for neighbor, step_cost in graph.get(node, []):
            new_cost = g[node] + step_cost
            if neighbor not in g or new_cost < g[neighbor]:
                g[neighbor] = new_cost
                parent[neighbor] = node
                heapq.heappush(frontier, (new_cost, neighbor))
    return None, float('inf')

def astar(graph, start, goal, h):
    frontier = [(h(start), 0, start)]  # (f, g, state)
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
                heapq.heappush(frontier, (f_val, new_g, neighbor))`}</PyCode>
        </div>
      ),
    },
    {
      title: '5️⃣ Comparison: Which DS for Which Algorithm?',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Algorithm</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Frontier DS</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Explored DS</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Other</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['BFS', 'deque (FIFO)', 'set', '—'],
                  ['DFS', 'list as stack (LIFO)', 'set', '—'],
                  ['UCS', 'heapq (min-cost)', 'set', 'dict for g-values'],
                  ['A*', 'heapq (min f=g+h)', 'set', 'dict for g-values'],
                  ['Backtracking', 'call stack (recursion)', 'set (if needed)', 'dict for assignment'],
                  ['Minimax', 'call stack (recursion)', 'dict (memo)', '—'],
                ].map(([alg, f, e, o]) => (
                  <tr key={alg}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{alg}</td>
                    <td className="px-4 py-2 text-green-300 border border-slate-700 font-mono text-xs">{f}</td>
                    <td className="px-4 py-2 text-green-300 border border-slate-700 font-mono text-xs">{e}</td>
                    <td className="px-4 py-2 text-gray-400 border border-slate-700 text-xs">{o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>dict:</strong> O(1) — graphs, g-values, parent pointers, memoization</li>
            <li><strong>set:</strong> O(1) membership — explored/closed set in all graph searches</li>
            <li><strong>list:</strong> O(1) append/pop → use as stack for DFS; O(n) pop(0) → avoid for BFS</li>
            <li><strong>deque:</strong> O(1) append + popleft → use as FIFO queue for BFS</li>
            <li><strong>heapq:</strong> O(log n) push/pop → use as priority queue for UCS and A*</li>
            <li>Always use tuples/frozensets (not lists) for hashable state representations in sets/dicts</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Why should you use deque instead of list for BFS frontier?', solution: 'list.pop(0) is O(n) because it shifts all elements. deque.popleft() is O(1). For BFS with thousands of nodes, this difference is critical.' },
    { question: 'Why are list states not directly hashable and cannot be added to a set?', solution: 'Lists are mutable, so their hash could change. Python requires hashable (immutable) objects in sets and dict keys. Convert lists to tuples: tuple(board) before adding to a set.' },
    { question: 'MCQ: What is the time complexity of heapq.heappush()?\n A) O(1)\n B) O(log n)\n C) O(n)\n D) O(n log n)', solution: 'B) O(log n) — it sifts the new element up the heap to maintain the heap property.' },
    { question: 'MCQ: Which data structure gives O(1) average-case lookup?\n A) list\n B) deque\n C) tuple\n D) dict', solution: 'D) dict — hash-table-based O(1) average lookup.' },
    { question: 'How would you implement a priority queue that supports decrease-key (update priority) for A*?', solution: 'Python heapq does not support decrease-key. The standard workaround is lazy deletion: add the updated (lower-cost) entry to the heap, and when popping, skip entries whose state is already in the explored set.' },
    { question: 'Write code to find the minimum-cost neighbor of a state using heapq.', solution: 'heap = [(cost, neighbor) for neighbor, cost in graph[state]]; heapq.heapify(heap); best_cost, best_neighbor = heapq.heappop(heap)' },
    { question: 'Interview: In UCS implementation, why do we add a state to explored only when it is popped from the heap (not when pushed)?', solution: 'A state may be pushed multiple times with different costs if a shorter path is found later. By marking explored only at pop time, we ensure the first pop always has the optimal (minimum) cost to that state, guaranteeing optimality.' },
  ],
  exampleProblems: [],
}

export default function PythonDSAIPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
