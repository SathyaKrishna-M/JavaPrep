'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCode, FiCpu, FiLayers, FiZap, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Python Essentials for AI Algorithms',
  explanationSections: [
    {
      title: '1️⃣ Functions & Recursion',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Recursion is the backbone of many AI algorithms — DFS, minimax, backtracking all use it. A recursive function calls itself with a simpler subproblem until reaching a <span className="text-cyan-400 font-semibold">base case</span>.
          </p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`# Recursive DFS — trace with depth
def dfs(graph, node, goal, visited=None, depth=0):
    if visited is None:
        visited = set()
    indent = "  " * depth
    print(f"{indent}Visiting: {node}")

    if node == goal:
        print(f"{indent}✓ Goal found!")
        return [node]

    visited.add(node)
    for neighbor in graph.get(node, []):
        if neighbor not in visited:
            path = dfs(graph, neighbor, goal, visited, depth+1)
            if path:
                return [node] + path
    return None

# Call stack trace for dfs({A:[B,C], B:[D], C:[]}, 'A', 'D'):
# Visiting: A
#   Visiting: B
#     Visiting: D  ← Goal found!`}</pre>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Base Case Rule</p>
            <p className="text-gray-300 text-sm">Every recursive function must have a base case that stops recursion. Without it, you get a stack overflow (RecursionError in Python). Python's default recursion limit is 1000 — use <code className="text-green-300">sys.setrecursionlimit()</code> for deeper search.</p>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Classes for State Representation',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            AI search algorithms need to represent <span className="text-cyan-400 font-semibold">states</span> and <span className="text-cyan-400 font-semibold">nodes</span> as objects with well-defined attributes and methods.
          </p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`class Node:
    """A node in the search tree."""
    def __init__(self, state, parent=None, action=None, cost=0):
        self.state = state
        self.parent = parent
        self.action = action
        self.path_cost = cost
        self.depth = 0 if parent is None else parent.depth + 1

    def __repr__(self):
        return f"Node({self.state}, cost={self.path_cost})"

    def __eq__(self, other):
        return self.state == other.state

    def __hash__(self):
        return hash(self.state)

    def __lt__(self, other):
        return self.path_cost < other.path_cost  # for heapq

    def expand(self, problem):
        """Return list of child nodes."""
        return [
            Node(s, parent=self, action=a, cost=self.path_cost + c)
            for a, s, c in problem.successors(self.state)
        ]

    def solution(self):
        """Trace back to find action sequence."""
        actions = []
        node = self
        while node.parent:
            actions.append(node.action)
            node = node.parent
        return list(reversed(actions))`}</pre>
        </div>
      ),
    },
    {
      title: '3️⃣ Dataclasses',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Dataclasses</span> reduce boilerplate for classes that primarily hold data. They auto-generate <code className="text-green-300">__init__</code>, <code className="text-green-300">__repr__</code>, and <code className="text-green-300">__eq__</code>.
          </p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`from dataclasses import dataclass, field
from typing import Optional, Tuple

@dataclass(order=True)  # enables <, > comparisons
class SearchNode:
    path_cost: float           # sort key (must be first for order=True)
    state: str = field(compare=False)
    parent: Optional['SearchNode'] = field(default=None, compare=False)
    action: Optional[str] = field(default=None, compare=False)

    def __post_init__(self):
        self.depth = 0 if self.parent is None else self.parent.depth + 1

# Usage
root = SearchNode(path_cost=0, state='Arad')
child = SearchNode(path_cost=140, state='Sibiu', parent=root, action='Go(Sibiu)')
print(root < child)   # True — useful for heapq
print(child)          # SearchNode(path_cost=140, state='Sibiu', ...)`}</pre>
        </div>
      ),
    },
    {
      title: '4️⃣ Type Hints',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Type hints</span> make AI code more readable, help IDEs catch bugs, and serve as documentation.
          </p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`from typing import Optional, List, Dict, Tuple, Set, Callable, TypeVar

State = TypeVar('State')  # Generic state type

def bfs(
    initial: State,
    goal_test: Callable[[State], bool],
    successors: Callable[[State], List[Tuple[str, State, float]]]
) -> Optional[List[str]]:
    """
    Generic BFS that works for any state type.
    Returns list of actions, or None if no solution.
    """
    frontier: list[Node] = [Node(initial)]
    explored: Set[State] = set()

    while frontier:
        node = frontier.pop(0)  # FIFO
        if goal_test(node.state):
            return node.solution()
        explored.add(node.state)
        for action, next_state, cost in successors(node.state):
            if next_state not in explored:
                frontier.append(Node(next_state, node, action, node.path_cost + cost))
    return None`}</pre>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Common Type Hint Patterns in AI</p>
            <div className="space-y-1 text-sm font-mono">
              {[
                ['State', 'TypeVar for any hashable state'],
                ['List[Node]', 'Frontier / open list'],
                ['Set[State]', 'Explored / closed set'],
                ['Dict[State, float]', 'g-values in A*'],
                ['Optional[Node]', 'Return None if no path'],
                ['Callable[[State], bool]', 'Goal test function'],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <code className="text-green-300 w-40 shrink-0">{t}</code>
                  <span className="text-gray-400">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Complexity-Aware Coding',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">In AI algorithms, small implementation choices can change performance from exponential to polynomial.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50"><th className="px-4 py-2 text-cyan-400 border border-slate-700">Operation</th><th className="px-4 py-2 text-red-400 border border-slate-700">Slow (list)</th><th className="px-4 py-2 text-green-400 border border-slate-700">Fast (set/dict)</th></tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Membership check', 'if x in mylist  O(n)', 'if x in myset  O(1)'],
                  ['Visited lookup', 'visited.count(x) > 0', 'x in visited_set'],
                  ['Priority access', 'min(frontier)  O(n)', 'heappop()  O(log n)'],
                  ['g-value lookup', 'search through list', 'g[state]  O(1) dict'],
                ].map(([op, slow, fast]) => (
                  <tr key={op}><td className="px-4 py-2 text-gray-300 border border-slate-700">{op}</td><td className="px-4 py-2 text-red-300 border border-slate-700 font-mono text-xs">{slow}</td><td className="px-4 py-2 text-green-300 border border-slate-700 font-mono text-xs">{fast}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`# SLOW: O(n) membership check on list
explored_list = []
if state not in explored_list:  # O(n) each time!
    explored_list.append(state)

# FAST: O(1) membership check on set
explored_set = set()
if state not in explored_set:   # O(1) each time
    explored_set.add(state)`}</pre>
        </div>
      ),
    },
    {
      title: '6️⃣ Memoization & Useful Patterns',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Memoization</span> stores previously computed results to avoid redundant work — critical in dynamic programming and recursive search.</p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`# Manual memoization with dict
memo = {}
def minimax(state, is_max):
    if state in memo:
        return memo[state]
    if is_terminal(state):
        return utility(state)
    if is_max:
        val = max(minimax(s, False) for s in successors(state))
    else:
        val = min(minimax(s, True) for s in successors(state))
    memo[state] = val
    return val

# Python built-in: functools.lru_cache
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

# Generator for lazy successor generation
def successors(state):
    for action in all_actions:
        new_state = apply(state, action)
        if is_valid(new_state):
            yield action, new_state, cost(state, action)`}</pre>
        </div>
      ),
    },
    {
      title: '7️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Recursion:</strong> DFS, backtracking, minimax — always define base case first</li>
            <li><strong>Classes:</strong> Node with state, parent, action, cost, depth — reusable across algorithms</li>
            <li><strong>Dataclasses:</strong> Reduce boilerplate; use <code>order=True</code> for heapq compatibility</li>
            <li><strong>Type hints:</strong> Callable, Optional, TypeVar — make AI code self-documenting</li>
            <li><strong>Use set for explored:</strong> O(1) vs O(n) list lookup — massive speedup</li>
            <li><strong>Memoization:</strong> Cache repeated subproblems with dict or lru_cache</li>
            <li><strong>Generators:</strong> yield successors lazily to save memory</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Why is using a set instead of a list for the explored/visited collection critical in search algorithms?', solution: 'Set membership check is O(1) while list membership check is O(n). With millions of states explored, O(n) lookup per node would make the algorithm O(n²) overall, which is completely intractable.' },
    { question: 'What is the purpose of the __lt__ method in a Node class used with heapq?', solution: 'heapq requires elements to be comparable. __lt__ defines the < operator, allowing heapq to compare nodes by path_cost and maintain the min-heap property. Without it, heapq would fail when trying to break ties.' },
    { question: 'What is memoization and when should you use it in AI?', solution: 'Memoization stores the return values of function calls keyed by their arguments, so repeated calls with the same inputs return the cached result. Use it when a recursive function recomputes the same subproblems — e.g., minimax, dynamic programming.' },
    { question: 'MCQ: What is the time complexity of checking membership in a Python set?\n A) O(n)\n B) O(log n)\n C) O(1) average\n D) O(n log n)', solution: 'C) O(1) average — sets are implemented as hash tables.' },
    { question: 'MCQ: Which decorator provides built-in memoization in Python?\n A) @staticmethod\n B) @lru_cache\n C) @property\n D) @classmethod', solution: 'B) @lru_cache from functools. It caches up to maxsize recent calls.' },
    { question: 'Write a Node class method solution() that returns the list of actions from root to current node.', solution: 'actions = []; node = self; while node.parent: actions.append(node.action); node = node.parent; return list(reversed(actions))' },
    { question: 'What is the benefit of using @dataclass(order=True) for a Node class?', solution: 'order=True auto-generates __lt__, __le__, __gt__, __ge__ methods based on the fields in declaration order. This allows Node objects to be directly used in heapq (priority queue) without writing a custom comparator.' },
    { question: 'Interview: How would you make a recursive DFS resistant to infinite loops in a cyclic graph?', solution: 'Maintain a visited set passed through recursive calls. Before processing a node, check if it is in visited; if so, return immediately. Add each node to visited before recursing into its neighbors. This guarantees each state is explored at most once.' },
  ],
  exampleProblems: [],
}

export default function PythonAIEssentialsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
