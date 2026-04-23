'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiSearch, FiGitBranch, FiLayers, FiClock, FiAlignLeft, FiTrendingDown, FiGrid, FiBarChart2 } from 'react-icons/fi'

const content = {
  title: 'Uninformed Search Strategies',
  explanationSections: [
    {
      title: '1️⃣ The Search Problem — Recap',
      icon: <FiSearch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Every search algorithm operates on a <span className="text-cyan-400 font-semibold">search problem</span> that is formally defined by five components. Understanding these components is essential before comparing algorithms.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Five Components of a Search Problem:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-400 font-semibold">Initial State:</span> Where the agent starts (e.g., city "Arad").</li>
              <li><span className="text-cyan-400 font-semibold">Actions:</span> The set of possible moves from any given state.</li>
              <li><span className="text-cyan-400 font-semibold">Transition Model:</span> RESULT(s, a) → s′ — what state results from taking action a in state s.</li>
              <li><span className="text-cyan-400 font-semibold">Goal Test:</span> A function that checks whether a given state is the goal.</li>
              <li><span className="text-cyan-400 font-semibold">Path Cost:</span> A numeric cost assigned to each path (sum of step costs).</li>
            </ul>
          </div>
          <p className="text-gray-300">
            The <span className="text-purple-400 font-semibold">frontier</span> (also called the open list) is the collection of nodes that have been generated but not yet expanded. Its data structure — queue, stack, or priority queue — defines the algorithm's behaviour.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
            <p className="text-green-400 font-semibold mb-2">Tree Search vs Graph Search:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-yellow-300">Tree Search:</span> Never tracks visited states. Can revisit the same state — may loop forever in cyclic graphs.</li>
              <li><span className="text-yellow-300">Graph Search:</span> Maintains an <span className="text-cyan-400">explored set</span> (closed list). Skips any node already expanded — guarantees each state is processed at most once.</li>
            </ul>
          </div>
          <p className="text-gray-300">
            Four performance dimensions are used to evaluate any search algorithm:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2">
            <li><span className="text-pink-400">Completeness:</span> Does it always find a solution if one exists?</li>
            <li><span className="text-pink-400">Optimality:</span> Does it find the least-cost solution?</li>
            <li><span className="text-pink-400">Time Complexity:</span> Number of nodes generated/expanded.</li>
            <li><span className="text-pink-400">Space Complexity:</span> Maximum nodes held in memory at once.</li>
          </ul>
          <p className="text-gray-300 text-sm">
            Key notation: <span className="text-cyan-400">b</span> = branching factor (max successors per node), <span className="text-cyan-400">d</span> = depth of shallowest goal, <span className="text-cyan-400">m</span> = maximum depth of the search tree, <span className="text-cyan-400">C*</span> = optimal path cost, <span className="text-cyan-400">ε</span> = minimum step cost.
          </p>
        </div>
      ),
    },
    {
      title: '2️⃣ Breadth-First Search (BFS)',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            BFS explores the search tree <span className="text-cyan-400 font-semibold">level by level</span>. It uses a <span className="text-yellow-300">FIFO queue</span> as its frontier, so shallower nodes are always expanded before deeper ones.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">BFS Algorithm (Graph Search version):</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              <li>Add the initial node to the FIFO frontier.</li>
              <li>If the frontier is empty, return FAILURE.</li>
              <li>Pop the front node from the queue.</li>
              <li>If it passes the <em>goal test</em>, return the solution path.</li>
              <li>Add it to the explored set.</li>
              <li>For each successor not in the frontier or explored set, add it to the frontier.</li>
              <li>Repeat from step 2.</li>
            </ol>
          </div>
          <p className="text-gray-300">
            Because BFS always expands the shallowest unexpanded node, it is <span className="text-green-400">complete</span> (finds a solution if one exists in a finite branching factor graph) and <span className="text-green-400">optimal</span> when all step costs are equal (unit cost). With step costs that vary, BFS is NOT optimal — it finds the shallowest goal, not the cheapest.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
            <p className="text-pink-400 font-semibold mb-1">Complexity Analysis:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-cyan-400">Time:</span> O(b<sup>d</sup>) — every node up to depth d is generated.</li>
              <li><span className="text-cyan-400">Space:</span> O(b<sup>d</sup>) — the frontier holds all nodes at depth d simultaneously. <em>This is BFS's critical weakness.</em></li>
            </ul>
            <p className="text-gray-400 text-sm mt-2">Example: b=10, d=10 → over 10 billion nodes in memory. BFS is impractical for large d.</p>
          </div>
          <PyCode>{`from collections import deque

def bfs(graph, start, goal):
    """
    BFS graph search — finds shortest path in terms of steps.
    graph: dict mapping node -> list of (neighbour, cost) tuples
    """
    frontier = deque()          # FIFO queue
    frontier.append((start, [start]))   # (current_node, path_so_far)
    explored = set()

    while frontier:
        node, path = frontier.popleft()  # Dequeue from front

        if node == goal:
            return path          # Solution found

        if node in explored:
            continue
        explored.add(node)

        for neighbour, _ in graph.get(node, []):
            if neighbour not in explored:
                frontier.append((neighbour, path + [neighbour]))

    return None  # No solution

# --- Romania map (partial) ---
romania = {
    'Arad':     [('Zerind', 75), ('Sibiu', 140), ('Timisoara', 118)],
    'Zerind':   [('Arad', 75), ('Oradea', 71)],
    'Oradea':   [('Zerind', 71), ('Sibiu', 151)],
    'Sibiu':    [('Arad', 140), ('Oradea', 151), ('Fagaras', 99), ('Rimnicu', 80)],
    'Fagaras':  [('Sibiu', 99), ('Bucharest', 211)],
    'Rimnicu':  [('Sibiu', 80), ('Pitesti', 97), ('Craiova', 146)],
    'Pitesti':  [('Rimnicu', 97), ('Bucharest', 101), ('Craiova', 138)],
    'Bucharest':[('Fagaras', 211), ('Pitesti', 101), ('Giurgiu', 90)],
    'Timisoara':[('Arad', 118), ('Lugoj', 111)],
}

path = bfs(romania, 'Arad', 'Bucharest')
print("BFS path:", path)
# Output: BFS path: ['Arad', 'Sibiu', 'Fagaras', 'Bucharest']`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Depth-First Search (DFS)',
      icon: <FiTrendingDown className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            DFS always expands the <span className="text-cyan-400 font-semibold">deepest node</span> in the current frontier. It uses a <span className="text-yellow-300">LIFO stack</span> (or simple recursion) as its frontier, diving as deep as possible along each branch before backtracking.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">DFS Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-red-400">Not complete</span> in infinite-depth or cyclic spaces (can loop forever). Complete only in finite acyclic graphs.</li>
              <li><span className="text-red-400">Not optimal</span> — may find a deep, expensive solution when a shallow cheap one exists.</li>
              <li><span className="text-cyan-400">Time:</span> O(b<sup>m</sup>) — may explore the entire tree to depth m.</li>
              <li><span className="text-green-400">Space:</span> O(b·m) — only stores the current path and its siblings. <em>This is DFS's key advantage.</em></li>
            </ul>
          </div>
          <p className="text-gray-300">
            The space advantage is dramatic: where BFS would need O(b<sup>d</sup>) memory, DFS only needs O(b·m). For b=10, m=20, DFS needs just 200 nodes vs BFS's 10<sup>20</sup>. This makes DFS the preferred base for memory-sensitive algorithms.
          </p>
          <PyCode>{`def dfs(graph, start, goal):
    """
    DFS graph search using an explicit stack.
    """
    stack = [(start, [start])]   # LIFO stack: (node, path)
    explored = set()

    while stack:
        node, path = stack.pop()    # Pop from TOP (LIFO)

        if node == goal:
            return path

        if node in explored:
            continue
        explored.add(node)

        # Push neighbours — last pushed = first explored (LIFO)
        for neighbour, _ in graph.get(node, []):
            if neighbour not in explored:
                stack.append((neighbour, path + [neighbour]))

    return None

# Recursive version (cleaner, uses call stack implicitly)
def dfs_recursive(graph, node, goal, path=None, explored=None):
    if path is None: path = [node]
    if explored is None: explored = set()

    if node == goal:
        return path
    explored.add(node)

    for neighbour, _ in graph.get(node, []):
        if neighbour not in explored:
            result = dfs_recursive(graph, neighbour, goal,
                                   path + [neighbour], explored)
            if result:
                return result
    return None`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Uniform-Cost Search (UCS)',
      icon: <FiAlignLeft className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            UCS is the <span className="text-cyan-400 font-semibold">generalisation of BFS to non-uniform step costs</span>. Instead of a FIFO queue, it uses a <span className="text-yellow-300">min-priority queue</span> ordered by the cumulative path cost g(n). This makes it essentially Dijkstra's algorithm applied to AI search.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">UCS Key Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-green-400">Complete:</span> Yes — as long as every step cost ≥ ε {'>'} 0.</li>
              <li><span className="text-green-400">Optimal:</span> Yes — always finds the least-cost path.</li>
              <li><span className="text-cyan-400">Time &amp; Space:</span> O(b<sup>⌈C*/ε⌉</sup>) — may be much larger than BFS if the solution is cheap but deep, or vice versa.</li>
            </ul>
          </div>
          <p className="text-gray-300">
            A critical subtlety: UCS expands nodes in order of path cost. The goal test is applied when a node is <em>popped from the frontier</em>, not when it is first generated. This guarantees optimality — by the time we pop the goal, we have found the cheapest route to it.
          </p>
          <PyCode>{`import heapq

def ucs(graph, start, goal):
    """
    Uniform-Cost Search — always expands lowest cost path first.
    Uses heapq (min-heap) as the priority queue.
    """
    # (cost, node, path)
    frontier = [(0, start, [start])]
    explored = set()

    while frontier:
        cost, node, path = heapq.heappop(frontier)  # Lowest cost first

        if node == goal:
            return path, cost     # Optimal path and its cost

        if node in explored:
            continue
        explored.add(node)

        for neighbour, step_cost in graph.get(node, []):
            if neighbour not in explored:
                new_cost = cost + step_cost
                heapq.heappush(frontier, (new_cost, neighbour,
                                          path + [neighbour]))

    return None, float('inf')

path, cost = ucs(romania, 'Arad', 'Bucharest')
print(f"UCS path: {path}")
print(f"Total cost: {cost}")
# Optimal: Arad -> Sibiu -> Rimnicu -> Pitesti -> Bucharest, cost = 418`}</PyCode>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
            <p className="text-green-400 font-semibold mb-2">Trace on Romania (Arad → Bucharest):</p>
            <ol className="list-decimal list-inside text-gray-300 space-y-1 text-sm">
              <li>Pop Arad (g=0). Expand: Zerind(75), Sibiu(140), Timisoara(118).</li>
              <li>Pop Zerind (g=75). Expand: Oradea(146).</li>
              <li>Pop Timisoara (g=118). Expand: Lugoj(229).</li>
              <li>Pop Sibiu (g=140). Expand: Fagaras(239), Rimnicu(220), Oradea(291).</li>
              <li>Pop Rimnicu (g=220). Expand: Pitesti(317), Craiova(366).</li>
              <li>Pop Fagaras (g=239). Expand: Bucharest(450).</li>
              <li>Pop Pitesti (g=317). Expand: Bucharest(418) — replaces 450 in frontier.</li>
              <li>Pop Bucharest (g=418). <span className="text-green-400">Goal reached! Cost = 418.</span></li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Depth-Limited Search & Iterative Deepening (IDS)',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Depth-Limited Search (DLS)</span> is DFS with a hard cutoff at depth limit <em>L</em>. Nodes at depth L are not expanded. It solves DFS's incompleteness in infinite spaces — but only if L ≥ d (depth of shallowest solution). If L {'<'} d, it returns failure even when a solution exists.
          </p>
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Iterative Deepening Search (IDS)</span> is the elegant fix: run DLS repeatedly, incrementing L from 0, 1, 2, … until a solution is found. This combines the <span className="text-green-400">space efficiency of DFS</span> with the <span className="text-green-400">completeness and optimality (unit cost) of BFS</span>.
          </p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">IDS Properties:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="text-green-400">Complete:</span> Yes — will eventually reach depth d.</li>
              <li><span className="text-green-400">Optimal:</span> Yes for unit step costs.</li>
              <li><span className="text-cyan-400">Time:</span> O(b<sup>d</sup>) — despite repetition, the overhead is small (see analysis below).</li>
              <li><span className="text-cyan-400">Space:</span> O(b·d) — only stores the current DFS branch.</li>
            </ul>
          </div>
          <p className="text-gray-300">
            <span className="text-yellow-300">Why is the repetition overhead small?</span> In a tree with branching factor b, the number of nodes at depth d is b<sup>d</sup>, while all previous levels combined are b<sup>d-1</sup> + b<sup>d-2</sup> + … ≈ b<sup>d</sup>/(b-1). So the total extra work of re-generating is at most a constant factor (b/(b-1)), e.g., for b=10 it is only 11% overhead. IDS is the <em>preferred uninformed algorithm</em> for large search spaces.
          </p>
          <PyCode>{`def depth_limited_search(graph, node, goal, limit, path=None, explored=None):
    """DLS: DFS with a depth cutoff."""
    if path is None: path = [node]
    if explored is None: explored = set([node])

    if node == goal:
        return path
    if limit == 0:
        return 'cutoff'     # Depth limit reached, not failure

    cutoff_occurred = False
    for neighbour, _ in graph.get(node, []):
        if neighbour not in explored:
            explored.add(neighbour)
            result = depth_limited_search(
                graph, neighbour, goal, limit - 1,
                path + [neighbour], explored
            )
            if result == 'cutoff':
                cutoff_occurred = True
            elif result is not None:
                return result   # Solution found
    return 'cutoff' if cutoff_occurred else None


def iterative_deepening_search(graph, start, goal, max_depth=50):
    """IDS: Try DLS with increasing depth limits."""
    for limit in range(max_depth + 1):
        print(f"  Trying depth limit: {limit}")
        result = depth_limited_search(graph, start, goal, limit)
        if result != 'cutoff':
            return result   # Either None (failure) or path (success)
    return None

path = iterative_deepening_search(romania, 'Arad', 'Bucharest')
print("IDS path:", path)`}</PyCode>
        </div>
      ),
    },
    {
      title: '6️⃣ BFS Trace — Arad to Bucharest',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Let us walk through BFS step-by-step on the Romania map. The frontier starts with just Arad and grows level by level.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300 border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-cyan-400">
                  <th className="border border-slate-600 px-3 py-2">Step</th>
                  <th className="border border-slate-600 px-3 py-2">Node Expanded</th>
                  <th className="border border-slate-600 px-3 py-2">Depth</th>
                  <th className="border border-slate-600 px-3 py-2">Frontier (after expansion)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1', 'Arad', '0', 'Zerind, Sibiu, Timisoara'],
                  ['2', 'Zerind', '1', 'Sibiu, Timisoara, Oradea'],
                  ['3', 'Sibiu', '1', 'Timisoara, Oradea, Fagaras, Rimnicu'],
                  ['4', 'Timisoara', '1', 'Oradea, Fagaras, Rimnicu, Lugoj'],
                  ['5', 'Oradea', '2', 'Fagaras, Rimnicu, Lugoj'],
                  ['6', 'Fagaras', '2', 'Rimnicu, Lugoj, Bucharest'],
                  ['7', 'Rimnicu', '2', 'Lugoj, Bucharest, Pitesti, Craiova'],
                  ['8', 'Lugoj', '2', 'Bucharest, Pitesti, Craiova, Mehadia'],
                  ['9', 'Bucharest', '3', '✅ GOAL FOUND'],
                ].map(([step, node, depth, frontier]) => (
                  <tr key={step} className={node === 'Bucharest' ? 'bg-green-500/10' : 'hover:bg-slate-800/30'}>
                    <td className="border border-slate-600 px-3 py-2 text-center">{step}</td>
                    <td className="border border-slate-600 px-3 py-2 text-yellow-300 font-semibold">{node}</td>
                    <td className="border border-slate-600 px-3 py-2 text-center">{depth}</td>
                    <td className="border border-slate-600 px-3 py-2 text-gray-400">{frontier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-300">
            BFS finds the path <span className="text-cyan-400">Arad → Sibiu → Fagaras → Bucharest</span> at depth 3. This is the shortest in terms of number of steps, but NOT the cheapest in total cost (450 vs UCS's optimal 418).
          </p>
        </div>
      ),
    },
    {
      title: '7️⃣ Comparison Table — All Uninformed Search Algorithms',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            This table summarises the four key performance metrics across all major uninformed strategies. Use this as your go-to reference during exams.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300 border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-cyan-400">
                  <th className="border border-slate-600 px-3 py-2">Algorithm</th>
                  <th className="border border-slate-600 px-3 py-2">Complete?</th>
                  <th className="border border-slate-600 px-3 py-2">Optimal?</th>
                  <th className="border border-slate-600 px-3 py-2">Time</th>
                  <th className="border border-slate-600 px-3 py-2">Space</th>
                  <th className="border border-slate-600 px-3 py-2">Frontier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['BFS', '✅ Yes (finite b)', '✅ Yes (unit cost)', 'O(bᵈ)', 'O(bᵈ)', 'FIFO Queue'],
                  ['DFS', '❌ No (infinite/cyclic)', '❌ No', 'O(bᵐ)', 'O(b·m)', 'LIFO Stack'],
                  ['DLS', '❌ No (if L < d)', '❌ No', 'O(bᴸ)', 'O(b·L)', 'Stack + cutoff'],
                  ['IDS', '✅ Yes', '✅ Yes (unit cost)', 'O(bᵈ)', 'O(b·d)', 'Stack (repeated)'],
                  ['UCS', '✅ Yes (ε > 0)', '✅ Yes', 'O(b^⌈C*/ε⌉)', 'O(b^⌈C*/ε⌉)', 'Min-Priority Queue'],
                ].map(([alg, comp, opt, time, space, frontier]) => (
                  <tr key={alg} className="hover:bg-slate-800/30">
                    <td className="border border-slate-600 px-3 py-2 text-yellow-300 font-semibold">{alg}</td>
                    <td className="border border-slate-600 px-3 py-2 text-center">{comp}</td>
                    <td className="border border-slate-600 px-3 py-2 text-center">{opt}</td>
                    <td className="border border-slate-600 px-3 py-2 text-pink-400 font-mono">{time}</td>
                    <td className="border border-slate-600 px-3 py-2 text-pink-400 font-mono">{space}</td>
                    <td className="border border-slate-600 px-3 py-2 text-gray-400">{frontier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Practical Rule of Thumb:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Use <span className="text-cyan-400">IDS</span> as the default uninformed algorithm — best of BFS and DFS.</li>
              <li>Use <span className="text-cyan-400">UCS</span> when step costs are non-uniform and you need optimality.</li>
              <li>Use <span className="text-cyan-400">DFS</span> only when memory is extremely limited and you can tolerate non-optimal/incomplete behaviour.</li>
              <li>Avoid <span className="text-cyan-400">BFS</span> when d is large — the exponential memory requirement is prohibitive.</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: 'What data structure does BFS use for its frontier, and how does it guarantee the shallowest solution is found first?',
      solution: 'BFS uses a FIFO (First-In, First-Out) queue. Because nodes are dequeued in the order they were enqueued, all nodes at depth d are expanded before any node at depth d+1. This level-by-level expansion guarantees the shallowest (fewest-step) path is found first.',
    },
    {
      question: 'MCQ: Which algorithm is both complete and optimal for uniform step costs AND uses only O(b·d) memory?\n A) BFS\n B) DFS\n C) UCS\n D) IDS',
      solution: 'D) IDS — Iterative Deepening Search is complete and optimal (unit costs) like BFS, but uses only O(b·d) memory like DFS, because it only stores the current path on the stack.',
    },
    {
      question: 'Why is DFS not complete in infinite-depth spaces? Give a concrete example.',
      solution: 'DFS follows a single branch as deep as possible before backtracking. If the graph has cycles or infinite branches, DFS can get trapped going deeper and deeper on a branch that never reaches the goal, looping forever. Example: in a grid graph where DFS always prefers "go right", it will never backtrack to explore "go down" paths.',
    },
    {
      question: 'UCS expands nodes in order of path cost. Why must the goal test be applied when a node is POPPED, not when it is generated?',
      solution: 'When a node is first generated (added to the frontier), we may later find a cheaper path to it. Applying the goal test at generation time could return a suboptimal path. By deferring the test to when a node is popped (i.e., it has the lowest cost in the frontier), we guarantee that the first time we extract the goal, it must be via the cheapest path — since any other path to it would cost at least as much and would still be in the queue.',
    },
    {
      question: 'Calculate the number of nodes generated by BFS vs IDS on a tree with branching factor b=5 and solution depth d=4.',
      solution: 'BFS generates all nodes up to depth d: 1 + 5 + 25 + 125 + 625 = 781 nodes.\nIDS generates nodes repeatedly for each iteration:\n  L=0: 1, L=1: 1+5=6, L=2: 1+5+25=31, L=3: 1+5+25+125=156, L=4: 781\n  Total = 1+6+31+156+781 = 975 nodes.\nDespite re-generation, IDS is only 25% more expensive than BFS, while using O(b·d)=O(20) space vs BFS\'s O(625).',
    },
    {
      question: 'What is the difference between tree search and graph search? Which is safer to use and why?',
      solution: 'Tree search does not track visited states and may revisit the same state multiple times, leading to infinite loops in cyclic graphs. Graph search maintains an explored set and never re-expands a state that has already been processed. Graph search is safer because it guarantees termination on finite graphs and avoids redundant work, at the cost of additional memory for the explored set.',
    },
    {
      question: 'MCQ: What is the time complexity of UCS when the optimal path cost is C* = 10 and the minimum step cost is ε = 1?\n A) O(b¹⁰)\n B) O(b⁵)\n C) O(b²⁰)\n D) O(b^⌈C*/ε⌉) = O(b¹⁰)',
      solution: 'D) O(b^⌈C*/ε⌉) = O(b^⌈10/1⌉) = O(b¹⁰). The formula is O(b^⌈C*/ε⌉). With C*=10 and ε=1, the exponent is 10. If ε were 0.5, the exponent would be 20, showing that small step costs dramatically increase UCS\'s complexity.',
    },
    {
      question: 'Explain the "cutoff" return value in Depth-Limited Search. How does IDS use it to avoid declaring failure prematurely?',
      solution: '"Cutoff" means the depth limit was reached before finding a goal — it is NOT the same as failure (no solution exists). Failure means all paths were exhausted. IDS distinguishes these: if DLS returns "cutoff", IDS knows the solution might be deeper and increments the limit. If DLS returns None (failure), IDS knows no solution exists at any depth. Without this distinction, IDS could incorrectly stop when the solution is just beyond the current depth limit.',
    },
    {
      question: 'A search tree has b=3 and the goal is at depth d=6. Compare the space requirements of BFS, DFS, and IDS.',
      solution: 'BFS space: O(bᵈ) = O(3⁶) = 729 nodes in the frontier at depth 6.\nDFS space: O(b·m) — for m=6, O(3·6) = 18 nodes (just the current path and siblings).\nIDS space: O(b·d) = O(3·6) = 18 nodes — same as DFS.\nBFS requires 40× more memory than IDS/DFS for this example. As d grows the gap becomes astronomical.',
    },
    {
      question: 'MCQ: In the Romania problem, BFS finds the path Arad→Sibiu→Fagaras→Bucharest (cost 450). UCS finds Arad→Sibiu→Rimnicu→Pitesti→Bucharest (cost 418). Why does BFS miss the optimal path?\n A) BFS has a bug\n B) BFS optimises for fewest steps, not least cost\n C) UCS uses a better heuristic\n D) BFS does not explore Rimnicu',
      solution: 'B) BFS optimises for fewest steps, not least cost. BFS finds the shallowest solution (depth 3 via Fagaras), which happens to cost 450. The optimal cost path (418 via Rimnicu→Pitesti) is at depth 4 — BFS never reaches it because it already returned the depth-3 solution. BFS is only optimal when all step costs are equal.',
    },
  ],
  exampleProblems: [],
}

export default function UninformedSearchPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
