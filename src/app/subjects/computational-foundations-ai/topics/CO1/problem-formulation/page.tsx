'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiMap, FiBox, FiTarget, FiCheckCircle, FiAlertCircle, FiCode } from 'react-icons/fi'

const content = {
  title: 'Problem Formulation',
  explanationSections: [
    {
      title: '1️⃣ What is Problem Formulation?',
      icon: <FiMap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Before an AI agent can search for a solution, it must <span className="text-cyan-400 font-semibold">formulate the problem</span> precisely. Problem formulation is the process of deciding which actions and states to consider given a goal. A well-defined problem has five components.
          </p>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-3">The 5 Components of a Search Problem</p>
            <div className="space-y-2">
              {[
                ['Initial State', 'The state the agent starts in. e.g., Arad (in Romania routing problem)'],
                ['Actions', 'A(s) — the set of actions available in state s. e.g., Go(Sibiu), Go(Zerind)'],
                ['Transition Model', 'RESULT(s, a) → s′ — what state results from doing action a in state s'],
                ['Goal Test', 'Determines if a given state is a goal state. e.g., IsGoal(Bucharest)'],
                ['Path Cost', 'Assigns a numeric cost to each path. Typically sum of step costs c(s,a,s′)'],
              ].map(([name, desc]) => (
                <div key={name} className="flex gap-3 items-start">
                  <span className="text-cyan-400 font-bold font-mono text-sm w-36 shrink-0">{name}</span>
                  <span className="text-gray-300 text-sm">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-sm">Together, the initial state, actions, and transition model define the <span className="text-amber-300 font-semibold">state space</span> — a graph where nodes are states and edges are actions.</p>
        </div>
      ),
    },
    {
      title: '2️⃣ State Space as a Graph',
      icon: <FiBox className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The <span className="text-cyan-400 font-semibold">state space</span> is an abstract mathematical structure: a directed graph where each node represents a possible state, and each directed edge represents an action leading from one state to another with an associated cost.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">State Space Properties</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li><strong>Nodes:</strong> represent states (situations the agent can be in)</li>
                <li><strong>Edges:</strong> represent actions (transitions between states)</li>
                <li><strong>Edge weight:</strong> step cost c(s, a, s′)</li>
                <li><strong>Start node:</strong> initial state</li>
                <li><strong>Goal nodes:</strong> states satisfying goal test</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Complexity Parameters</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li><strong>b</strong> — branching factor (max actions per state)</li>
                <li><strong>d</strong> — depth of shallowest goal</li>
                <li><strong>m</strong> — maximum depth of the state space</li>
                <li><strong>C*</strong> — cost of optimal solution</li>
                <li><strong>ε</strong> — minimum step cost</li>
              </ul>
            </div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-2">State vs. World State</p>
            <p className="text-gray-300 text-sm">A <em>world state</em> includes every detail of the environment. A <em>state</em> is an abstract representation that captures only information relevant to the problem. Good abstraction is key: too much detail makes search intractable; too little makes it incorrect.</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Example: Romania Routing Problem',
      icon: <FiMap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The classic example from AIMA: find a route from <span className="text-cyan-400 font-semibold">Arad</span> to <span className="text-green-400 font-semibold">Bucharest</span> in Romania.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50"><th className="px-4 py-2 text-cyan-400 border border-slate-700">Component</th><th className="px-4 py-2 text-gray-300 border border-slate-700">Definition</th></tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['States', 'Being in a particular city in Romania'],
                  ['Initial state', 'In(Arad)'],
                  ['Actions', 'Go(Sibiu), Go(Timisoara), Go(Zerind) from Arad'],
                  ['Transition model', 'RESULT(In(Arad), Go(Sibiu)) = In(Sibiu)'],
                  ['Goal test', 'In(Bucharest)'],
                  ['Path cost', 'Sum of road distances in km'],
                ].map(([c, d]) => (
                  <tr key={c}><td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{c}</td><td className="px-4 py-2 text-gray-300 border border-slate-700">{d}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm">The optimal solution is Arad → Sibiu → Rimnicu Vilcea → Pitesti → Bucharest with cost 418 km.</p>
        </div>
      ),
    },
    {
      title: '4️⃣ Example: 8-Puzzle Problem',
      icon: <FiBox className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The 8-puzzle consists of a 3×3 board with 8 numbered tiles and one blank. The goal is to reach the goal configuration by sliding tiles.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="text-gray-400 text-xs mb-2">Initial State</p>
              <div className="grid grid-cols-3 gap-1 w-24">
                {['7','2','4','5','','6','8','3','1'].map((v,i) => (
                  <div key={i} className={`h-8 w-8 flex items-center justify-center rounded text-sm font-bold ${v ? 'bg-violet-500/30 text-violet-200' : 'bg-black/40'}`}>{v}</div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="text-gray-400 text-xs mb-2">Goal State</p>
              <div className="grid grid-cols-3 gap-1 w-24">
                {['','1','2','3','4','5','6','7','8'].map((v,i) => (
                  <div key={i} className={`h-8 w-8 flex items-center justify-center rounded text-sm font-bold ${v ? 'bg-green-500/30 text-green-200' : 'bg-black/40'}`}>{v}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50"><th className="px-4 py-2 text-cyan-400 border border-slate-700">Component</th><th className="px-4 py-2 text-gray-300 border border-slate-700">Definition</th></tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['States', 'All possible arrangements of 8 tiles + blank (9!/2 = 181,440 reachable)'],
                  ['Initial state', 'Any given arrangement'],
                  ['Actions', '{Left, Right, Up, Down} — slide blank tile'],
                  ['Transition model', 'Swap blank with adjacent tile in given direction'],
                  ['Goal test', 'Tiles in canonical order: 1,2,3,4,5,6,7,8,blank'],
                  ['Path cost', 'Number of moves (each step costs 1)'],
                ].map(([c, d]) => (
                  <tr key={c}><td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{c}</td><td className="px-4 py-2 text-gray-300 border border-slate-700">{d}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Example: Vacuum World',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A simple toy domain: a robot vacuum in a two-room house. Each room may be dirty or clean.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50"><th className="px-4 py-2 text-cyan-400 border border-slate-700">Component</th><th className="px-4 py-2 text-gray-300 border border-slate-700">Definition</th></tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['States', '8 states: position (L/R) × clean/dirty for each room = 2×2×2'],
                  ['Initial state', 'E.g., vacuum in Left room, both rooms dirty'],
                  ['Actions', '{Left, Right, Suck}'],
                  ['Transition model', 'Suck cleans current room; Left/Right moves vacuum'],
                  ['Goal test', 'Both rooms are clean'],
                  ['Path cost', 'Number of actions taken'],
                ].map(([c, d]) => (
                  <tr key={c}><td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{c}</td><td className="px-4 py-2 text-gray-300 border border-slate-700">{d}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ Solutions & Optimality',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">solution</span> is a sequence of actions that leads from the initial state to a goal state. An <span className="text-green-400 font-semibold">optimal solution</span> has the lowest path cost among all solutions.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Solution', 'Any action sequence reaching a goal state', 'blue'],
              ['Optimal Solution', 'Lowest cost solution', 'green'],
              ['No Solution', 'Goal is unreachable from initial state', 'red'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '7️⃣ Python: Node Class',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Search algorithms work with <span className="text-cyan-400 font-semibold">Node</span> objects that track state, parent, action, and path cost.</p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`from dataclasses import dataclass, field
from typing import Optional, Any

@dataclass
class Node:
    state: Any
    parent: Optional['Node'] = None
    action: Optional[str] = None
    path_cost: float = 0.0
    depth: int = 0

    def __lt__(self, other):
        return self.path_cost < other.path_cost  # for heapq

    def solution(self) -> list[str]:
        """Trace back actions from goal to root."""
        actions = []
        node = self
        while node.parent is not None:
            actions.append(node.action)
            node = node.parent
        return list(reversed(actions))

    def path(self) -> list['Node']:
        """Return list of nodes from root to this node."""
        node, path = self, []
        while node:
            path.append(node)
            node = node.parent
        return list(reversed(path))

# Example usage
start = Node(state='Arad')
child = Node(state='Sibiu', parent=start, action='Go(Sibiu)', path_cost=140, depth=1)
print(child.solution())  # ['Go(Sibiu)']
print(child.path_cost)   # 140`}</pre>
        </div>
      ),
    },
    {
      title: '8️⃣ Summary',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li>A <strong>problem</strong> is defined by: initial state, actions, transition model, goal test, path cost.</li>
            <li>The <strong>state space</strong> is a graph of all reachable states via actions.</li>
            <li><strong>b</strong> = branching factor, <strong>d</strong> = goal depth, <strong>m</strong> = max depth.</li>
            <li>A <strong>solution</strong> is a path; an <strong>optimal solution</strong> minimises path cost.</li>
            <li>Good abstraction: only include details relevant to solving the problem.</li>
            <li>The <strong>Node</strong> data structure tracks state, parent, action, and cost for search.</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What are the five components of a well-defined search problem?', solution: '1. Initial state, 2. Actions A(s), 3. Transition model RESULT(s,a), 4. Goal test, 5. Path cost function.' },
    { question: 'In the Romania routing problem, what is the initial state and the goal test?', solution: 'Initial state: In(Arad). Goal test: IsInState(Bucharest) — checks if the current city is Bucharest.' },
    { question: 'What is the difference between a state and a world state?', solution: 'A world state includes all details of the environment. A state is an abstract representation keeping only the information relevant to solving the problem. Abstraction is essential for tractability.' },
    { question: 'For the 8-puzzle, what is the size of the state space?', solution: 'There are 9! = 362,880 total arrangements of 9 tiles, but only 9!/2 = 181,440 are reachable from any given initial state (due to parity of permutations).' },
    { question: 'What is an optimal solution?', solution: 'An optimal solution is a solution (action sequence reaching a goal) with the lowest path cost among all possible solutions.' },
    { question: 'MCQ: The transition model RESULT(s, a) returns:\n A) The goal state\n B) The state resulting from doing action a in state s\n C) The cost of action a\n D) The set of available actions', solution: 'B) The state resulting from doing action a in state s.' },
    { question: 'MCQ: Which parameter represents the depth of the shallowest goal node?\n A) b\n B) m\n C) d\n D) C*', solution: 'C) d — depth of the shallowest goal node.' },
    { question: 'Why is abstraction important in problem formulation?', solution: 'Without abstraction, the state space is too large to search. Abstraction removes irrelevant details (e.g., ignoring the weather when planning a route) making the problem tractable while preserving solution validity.' },
    { question: 'Formulate the Vacuum World problem fully (all 5 components).', solution: 'States: 8 (position L/R × room1 dirty/clean × room2 dirty/clean). Initial: any of the 8 states. Actions: {Left, Right, Suck}. Transition: Suck cleans current room; Left/Right moves agent. Goal: both rooms clean. Cost: number of actions.' },
    { question: 'Interview: What is the difference between a solution and an optimal solution in AI search?', solution: 'A solution is any action sequence that leads from the initial state to a goal state. An optimal solution is the one with minimum total path cost. BFS finds optimal solutions when all step costs are equal; UCS and A* find them in the general case.' },
  ],
  exampleProblems: [],
}

export default function ProblemFormulationPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
