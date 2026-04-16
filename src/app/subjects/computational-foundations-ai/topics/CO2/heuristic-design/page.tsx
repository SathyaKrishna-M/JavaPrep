'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTarget, FiTrendingUp, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const content = {
  title: 'Heuristic Design & Evaluation',
  explanationSections: [
    {
      title: '1️⃣ What Makes a Good Heuristic?',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">heuristic h(n)</span> estimates the cost from node n to the goal. A perfect heuristic h*(n) would make A* expand only optimal-path nodes. In practice we need h to be: fast to compute, admissible, and as close to h* as possible.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Fast', 'h(n) must be computable in constant or polynomial time — not another search', 'blue'],
              ['Admissible', 'h(n) ≤ h*(n) — never overestimates true cost', 'green'],
              ['Informative', 'h(n) close to h*(n) — reduces nodes expanded', 'violet'],
            ].map(([t,d,c]) => (
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
      title: '2️⃣ Admissibility',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A heuristic is <span className="text-cyan-400 font-semibold">admissible</span> if it never overestimates the true cost to reach the goal:</p>
          <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/30 text-center">
            <p className="text-green-300 font-bold text-xl font-mono">h(n) ≤ h*(n)  for all n</p>
            <p className="text-gray-400 text-sm mt-2">where h*(n) is the true optimal cost from n to goal</p>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-2">Intuition</p>
            <p className="text-gray-300 text-sm">An admissible heuristic is an optimist — it always thinks the goal is at least as close as it really is. This prevents A* from giving up on promising paths too early.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold text-sm">Admissible ✓</p>
              <p className="text-gray-300 text-sm">Straight-line distance (never longer than road distance)</p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/30">
              <p className="text-red-300 font-semibold text-sm">Not Admissible ✗</p>
              <p className="text-gray-300 text-sm">Twice the straight-line distance (may overestimate)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Consistency (Monotonicity)',
      icon: <FiTrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A heuristic is <span className="text-cyan-400 font-semibold">consistent</span> (monotone) if for every node n and successor n′ via action a:</p>
          <div className="bg-violet-500/10 p-6 rounded-lg border border-violet-500/30 text-center">
            <p className="text-violet-300 font-bold text-lg font-mono">h(n) ≤ c(n, a, n′) + h(n′)</p>
            <p className="text-gray-400 text-sm mt-2">Triangle inequality: estimated cost from n ≤ step cost + estimated cost from n′</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Relationship: Consistent → Admissible</p>
            <p className="text-gray-300 text-sm">Every consistent heuristic is admissible (but not vice versa). Consistency ensures f-values are non-decreasing along any path, which means A* with a consistent heuristic never needs to re-expand a node — making it more efficient.</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ 8-Puzzle Heuristics',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Two classic heuristics for the 8-puzzle, both admissible:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">h₁ — Misplaced Tiles</p>
              <p className="text-gray-300 text-sm mb-2">Count tiles not in their goal position. Each misplaced tile needs at least 1 move.</p>
              <p className="text-gray-400 text-xs">Example: if 3 tiles are misplaced, h₁ = 3</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">h₂ — Manhattan Distance</p>
              <p className="text-gray-300 text-sm mb-2">Sum of |row_curr - row_goal| + |col_curr - col_goal| for each tile.</p>
              <p className="text-gray-400 text-xs">Example: tile at (2,0) needs to go to (0,2) → distance = 4</p>
            </div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-2">h₂ Dominates h₁</p>
            <p className="text-gray-300 text-sm">h₂(n) ≥ h₁(n) for all n. Manhattan distance is always ≥ misplaced tile count, because each misplaced tile contributes at least 1 to Manhattan distance. A more informative (larger) admissible heuristic is always preferred.</p>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`def h1_misplaced(state, goal):
    """Count misplaced tiles (excluding blank)."""
    return sum(1 for i in range(9) if state[i] != 0 and state[i] != goal[i])

def h2_manhattan(state, goal):
    """Sum of Manhattan distances for each tile."""
    total = 0
    for tile in range(1, 9):  # exclude blank
        i = state.index(tile)
        j = goal.index(tile)
        total += abs(i//3 - j//3) + abs(i%3 - j%3)
    return total

# h2 ≥ h1 always
state = (7,2,4,5,0,6,8,3,1)
goal  = (0,1,2,3,4,5,6,7,8)
print(h1_misplaced(state, goal))  # 6
print(h2_manhattan(state, goal))  # 18`}</pre>
        </div>
      ),
    },
    {
      title: '5️⃣ Relaxed Problems Method',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The most principled way to derive admissible heuristics: <span className="text-cyan-400 font-semibold">solve a relaxed version</span> of the problem (with fewer constraints). The optimal cost of the relaxed problem ≤ optimal cost of the real problem.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Relaxation</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Allowed moves</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Gives heuristic</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                <tr>
                  <td className="px-4 py-2 text-gray-300 border border-slate-700">Tile can move anywhere</td>
                  <td className="px-4 py-2 text-gray-300 border border-slate-700">Teleport to goal position</td>
                  <td className="px-4 py-2 text-violet-300 border border-slate-700">h₁ (misplaced tiles)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-300 border border-slate-700">Tile can move through others</td>
                  <td className="px-4 py-2 text-gray-300 border border-slate-700">Slide ignoring blocking</td>
                  <td className="px-4 py-2 text-violet-300 border border-slate-700">h₂ (Manhattan distance)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-300 border border-slate-700">Normal rules</td>
                  <td className="px-4 py-2 text-gray-300 border border-slate-700">Slide + blank constraint</td>
                  <td className="px-4 py-2 text-violet-300 border border-slate-700">h* (exact — too slow)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ Effective Branching Factor',
      icon: <FiTrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The <span className="text-cyan-400 font-semibold">effective branching factor b*</span> measures heuristic quality empirically. If A* generates N nodes to find depth-d solution, b* satisfies: <code className="text-green-300">N = 1 + b* + b*² + ... + b*^d</code>. A perfect heuristic gives b*=1.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Heuristic</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Nodes (d=14)</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">b*</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[['No heuristic (BFS)','3,473,941','2.87'],['h₁ (misplaced)','539,300','1.92'],['h₂ (Manhattan)','113,339','1.45']].map(([h,n,b]) => (
                  <tr key={h}><td className="px-4 py-2 text-violet-300 border border-slate-700">{h}</td><td className="px-4 py-2 text-gray-300 border border-slate-700">{n}</td><td className="px-4 py-2 text-green-300 font-bold border border-slate-700">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm">h₂ (Manhattan distance) dramatically outperforms h₁ and blind search. Closer b* is to 1.0, the better.</p>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Define admissibility. Give one example of an admissible heuristic for the 8-puzzle.', solution: 'Admissible: h(n) ≤ h*(n) for all n — never overestimates the true cost. Example: Manhattan distance — each tile needs at least as many moves as its grid distance to goal, so it never overestimates.' },
    { question: 'What is the difference between admissibility and consistency?', solution: 'Admissibility: h(n) ≤ h*(n). Consistency (monotonicity): h(n) ≤ c(n,a,n′) + h(n′). Every consistent heuristic is admissible, but not vice versa. Consistency is a stronger property that ensures A* never re-expands nodes.' },
    { question: 'Why does h₂ (Manhattan distance) dominate h₁ (misplaced tiles) for the 8-puzzle?', solution: 'h₂(n) ≥ h₁(n) for all states — each misplaced tile contributes at least 1 to Manhattan distance, often more. A larger admissible heuristic is always at least as good (requires fewer node expansions) and is called dominant.' },
    { question: 'Explain the relaxed problem method for deriving heuristics.', solution: 'Remove one or more constraints from the original problem. The optimal cost of the relaxed problem (easier to solve) is always ≤ optimal cost of the real problem, giving an admissible heuristic. E.g., removing the "tile cannot jump" constraint gives Manhattan distance.' },
    { question: 'What is the effective branching factor b* and why is it useful?', solution: 'b* is the branching factor of a hypothetical uniform tree with same nodes N at depth d. It measures heuristic quality: b*=1 (perfect), b*≈2.87 (no heuristic). Lower b* → exponentially fewer nodes explored.' },
    { question: 'MCQ: A heuristic that is consistent is:\n A) Necessarily inadmissible\n B) Necessarily admissible\n C) Independent of admissibility\n D) Always equal to h*', solution: 'B) Necessarily admissible — consistency is a stronger condition that implies admissibility.' },
    { question: 'MCQ: For the 8-puzzle, compute h₂ for a tile at position (2,1) that should be at (0,2).\n A) 1\n B) 2\n C) 3\n D) 4', solution: 'C) 3 — Manhattan distance = |2-0| + |1-2| = 2 + 1 = 3.' },
    { question: 'Interview: How would you design a heuristic for the Travelling Salesman Problem?', solution: 'A classic admissible heuristic: minimum spanning tree (MST) of unvisited cities. The MST cost is ≤ optimal tour cost among unvisited cities. This is admissible because any tour must connect all cities, and a tour cannot be cheaper than the MST of those cities.' },
  ],
  exampleProblems: [],
}

export default function HeuristicDesignPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
