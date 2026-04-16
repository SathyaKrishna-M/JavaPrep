'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiScissors, FiTrendingDown, FiCode, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Alpha-Beta Pruning',
  explanationSections: [
    {
      title: '1️⃣ Motivation',
      icon: <FiScissors className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Minimax is optimal but explores the entire game tree: O(b^m) nodes. For chess (b≈35, m≈100), this is impossible. <span className="text-cyan-400 font-semibold">Alpha-Beta pruning</span> eliminates branches that cannot possibly influence the final decision — same result as minimax, fewer nodes explored.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Key Insight</p>
            <p className="text-gray-300 text-sm">If you're playing as MAX and you already found a move giving value 5, you can ignore any MIN subtree where MIN can force a value ≤ 5 — MAX would never choose to go there.</p>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ α and β Values',
      icon: <FiTrendingDown className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-bold text-lg mb-1 font-mono">α (alpha)</p>
              <p className="text-gray-300 text-sm">The best value that <strong>MAX</strong> can guarantee so far along the current path. Initially −∞.</p>
              <p className="text-gray-400 text-xs mt-2">MAX updates α: α = max(α, child_value)</p>
            </div>
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <p className="text-red-300 font-bold text-lg mb-1 font-mono">β (beta)</p>
              <p className="text-gray-300 text-sm">The best value that <strong>MIN</strong> can guarantee so far along the current path. Initially +∞.</p>
              <p className="text-gray-400 text-xs mt-2">MIN updates β: β = min(β, child_value)</p>
            </div>
          </div>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-2">Pruning Condition</p>
            <p className="text-gray-300 font-mono text-center text-lg">α ≥ β → prune remaining children</p>
            <p className="text-gray-400 text-sm mt-2">At a MAX node: if current value ≥ β, MIN will never allow this branch. At a MIN node: if current value ≤ α, MAX will never choose this branch.</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Algorithm',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`def alpha_beta(state, depth, alpha, beta, is_max, game):
    if depth == 0 or game.is_terminal(state):
        return game.evaluate(state)

    if is_max:
        value = float('-inf')
        for action in game.actions(state):
            child = game.result(state, action)
            value = max(value, alpha_beta(child, depth-1, alpha, beta, False, game))
            alpha = max(alpha, value)
            if alpha >= beta:
                break  # β-cutoff: MIN won't allow this
        return value
    else:
        value = float('inf')
        for action in game.actions(state):
            child = game.result(state, action)
            value = min(value, alpha_beta(child, depth-1, alpha, beta, True, game))
            beta = min(beta, value)
            if beta <= alpha:
                break  # α-cutoff: MAX won't choose this
        return value

# Initial call
best = alpha_beta(initial_state, max_depth, float('-inf'), float('inf'), True, game)`}</pre>
        </div>
      ),
    },
    {
      title: '4️⃣ Complexity Analysis',
      icon: <FiTrendingDown className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Case</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Condition</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Complexity</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Effective depth</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Best case','Perfect move ordering','O(b^(m/2))','Doubles vs minimax'],
                  ['Average case','Random ordering','O(b^(3m/4))','~50% more depth'],
                  ['Worst case','Worst move ordering','O(b^m)','Same as minimax'],
                ].map(([c,cond,cx,eff]) => (
                  <tr key={c}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{c}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{cond}</td>
                    <td className="px-4 py-2 text-green-300 font-mono border border-slate-700">{cx}</td>
                    <td className="px-4 py-2 text-amber-300 border border-slate-700 text-sm">{eff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">What Doubling the Depth Means</p>
            <p className="text-gray-300 text-sm">For chess (b≈35): minimax at depth 6 examines 35⁶≈1.8B nodes. Alpha-beta with perfect ordering examines 35³≈42K nodes at depth 6, or equivalently reaches depth 12 in the same node budget. This is the difference between a weak and strong chess engine.</p>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Move Ordering Strategies',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Alpha-beta works best when the best moves are tried first. Practical move ordering techniques:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Killer Moves','Store moves that caused cutoffs at each depth. Try them first in sibling nodes.'],
              ['History Heuristic','Track how often each move caused a cutoff globally. Prefer frequently-effective moves.'],
              ['Transposition Table','Hash table of previously seen positions with their α-β values. Avoid re-evaluation.'],
              ['Static Evaluation','Sort children by quick evaluation before full search — expensive moves first.'],
            ].map(([t,d]) => (
              <div key={t} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <p className="text-cyan-300 font-semibold mb-1">{t}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What do α and β represent in alpha-beta pruning?', solution: 'α is the best (highest) value MAX can guarantee along the current path. β is the best (lowest) value MIN can guarantee along the current path. Initially α=−∞, β=+∞.' },
    { question: 'Under what condition does pruning occur in alpha-beta?', solution: 'When α ≥ β. At a MAX node, if the current value exceeds β, MIN will never let the game reach this state. At a MIN node, if the current value falls below α, MAX will never choose this branch.' },
    { question: 'What is the best-case time complexity of alpha-beta and what condition achieves it?', solution: 'O(b^(m/2)) with perfect move ordering (best moves tried first). This is equivalent to doubling the search depth compared to minimax.' },
    { question: 'MCQ: Alpha-beta pruning always produces:\n A) A different result than minimax\n B) The same result as minimax\n C) A faster but suboptimal result\n D) A result only when pruning occurs', solution: 'B) The same result as minimax — alpha-beta pruning is mathematically equivalent to minimax. Pruned branches cannot affect the result.' },
    { question: 'MCQ: What is the worst-case complexity of alpha-beta pruning?\n A) O(b^(m/2))\n B) O(b^m)\n C) O(m·b)\n D) O(b^(m/4))', solution: 'B) O(b^m) — same as minimax when moves are ordered worst-first (no pruning occurs).' },
    { question: 'Why is move ordering important for alpha-beta pruning?', solution: 'Alpha-beta prunes branches only when a better option is already found. If best moves are tried first, α (for MAX) or β (for MIN) tightens quickly, enabling more pruning. Worst ordering means no pruning — best ordering halves the effective search depth.' },
    { question: 'Interview: What is a transposition table and why is it useful in game tree search?', solution: 'A transposition table is a hash table mapping game positions (states) to their previously computed evaluation values and bounds. Many game positions can be reached by different move sequences (transpositions). By caching computed values, we avoid re-evaluating the same position multiple times, significantly reducing computation.' },
  ],
  exampleProblems: [],
}

export default function AlphaBetaPruningPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
