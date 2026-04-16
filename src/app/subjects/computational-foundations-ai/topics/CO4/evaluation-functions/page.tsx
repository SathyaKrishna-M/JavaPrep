'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBarChart2, FiAlertCircle, FiCode, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Evaluation Functions & Depth Limits',
  explanationSections: [
    {
      title: '1️⃣ Why We Cannot Search to Terminal States',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Real games like chess have enormous game trees (b≈35, m≈100 → 35¹⁰⁰ nodes). Searching to terminal states is impossible. Instead we search to a <span className="text-cyan-400 font-semibold">cutoff depth</span> and apply an <span className="text-cyan-400 font-semibold">evaluation function</span> to estimate the value of non-terminal states.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Modified Minimax with Depth Cutoff</p>
            <pre className="text-green-300 text-sm font-mono">{`if depth == 0 or is_terminal(state):
    return evaluation(state)  # heuristic estimate`}</pre>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Properties of a Good Evaluation Function',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Consistent with utility', 'Must agree with the utility function on terminal states — wins always evaluate higher than draws, which beat losses.', 'green'],
              ['Fast to compute', 'Called millions of times per move — must be computed in microseconds. Cannot involve another search.', 'blue'],
              ['Correlated with winning', 'Higher values should genuinely correlate with better game positions and winning probability.', 'violet'],
            ].map(([t,d,c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-2`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Chess Evaluation Function',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A classic linear evaluation function for chess is a weighted sum of features:</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300">e(s) = w₁·f₁(s) + w₂·f₂(s) + ... + wₙ·fₙ(s)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Feature</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Weight</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Description</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Material count', '900/500/330/320/100', 'Queen/Rook/Bishop/Knight/Pawn (standard piece values)'],
                  ['Mobility', '+0.1', 'Number of legal moves available'],
                  ['King safety', '-0.5', 'Penalty for exposed king, bonus for castled king'],
                  ['Pawn structure', '-0.3', 'Penalty for doubled, isolated, or backward pawns'],
                  ['Center control', '+0.2', 'Bonus for controlling central squares'],
                ].map(([f,w,d]) => (
                  <tr key={f}><td className="px-4 py-2 text-violet-300 border border-slate-700">{f}</td><td className="px-4 py-2 text-green-300 border border-slate-700 font-mono">{w}</td><td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{d}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`# Simple evaluation for tic-tac-toe
def evaluate_tictactoe(board, player):
    winner = check_winner(board)
    if winner == player: return 10
    if winner == opponent(player): return -10
    return 0  # draw or game not over`}</pre>
        </div>
      ),
    },
    {
      title: '4️⃣ Quiescence Search & Horizon Effect',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            <p className="text-red-300 font-semibold mb-2">The Horizon Effect</p>
            <p className="text-gray-300 text-sm">A bad event (e.g., losing a queen) is inevitable but lies just beyond the search depth. The engine may make delaying moves that push the problem past the horizon, appearing to improve the evaluation while actually worsening the position.</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-300 font-semibold mb-2">Quiescence Search — The Fix</p>
            <p className="text-gray-300 text-sm">At the cutoff depth, instead of immediately applying the evaluation function, extend search only for <em>quiet positions</em> (no captures, checks, or tactical threats). For <em>noisy positions</em>, continue searching until the position is stable. This avoids evaluating a position mid-exchange.</p>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`def quiescence(state, alpha, beta, game):
    """Extend search until position is quiet."""
    stand_pat = game.evaluate(state)  # static eval
    if stand_pat >= beta:
        return beta
    alpha = max(alpha, stand_pat)

    for action in game.capture_moves(state):  # only captures
        child = game.result(state, action)
        score = -quiescence(child, -beta, -alpha, game)
        if score >= beta:
            return beta
        alpha = max(alpha, score)
    return alpha`}</pre>
        </div>
      ),
    },
    {
      title: '5️⃣ Iterative Deepening in Games',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Real game engines use <span className="text-cyan-400 font-semibold">iterative deepening with a time limit</span>: repeatedly search at depths 1, 2, 3, ... until time runs out, then return the best move found at the deepest completed search.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Benefits</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Always has an answer (depth-1 complete)</li>
                <li>Uses available time optimally</li>
                <li>Shallower results guide move ordering for deeper search</li>
              </ul>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-semibold mb-2">Overhead</p>
              <p className="text-gray-300 text-sm">Re-doing shallower searches costs very little: depth d dominates — re-doing depths 1..d-1 adds ≈ b/(b-1) factor, essentially negligible.</p>
            </div>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is an evaluation function in game search?', solution: 'A function that estimates the utility (value) of a non-terminal state, allowing search to be cut off before reaching terminal states. It must agree with utility on terminal states and be fast to compute.' },
    { question: 'What is the horizon effect?', solution: 'When an inevitable bad event lies just beyond the search depth, the engine makes delaying moves to push the event past its "horizon," appearing to improve the evaluation while actually making the position worse. Fixed by quiescence search.' },
    { question: 'What does quiescence search do?', solution: 'At the cutoff depth, instead of immediately evaluating, quiescence search continues searching only tactical moves (captures, checks) until the position is stable ("quiet"). This avoids evaluating mid-exchange positions that give misleading static values.' },
    { question: 'MCQ: Iterative deepening in game search:\n A) Always returns depth-1 result\n B) Can return a result even if time runs out early\n C) Is worse than fixed-depth search\n D) Cannot be combined with alpha-beta', solution: 'B) Always has a result from the last completed depth — if time runs out mid-search, it returns the best move from the deepest completed search.' },
    { question: 'MCQ: In chess evaluation, which piece has the highest standard material value?\n A) Rook (500)\n B) Bishop (330)\n C) Queen (900)\n D) Knight (320)', solution: 'C) Queen (900).' },
    { question: 'Why is a linear weighted sum used for chess evaluation rather than a more complex formula?', solution: 'Linear functions are simple, fast to compute, and easy to tune. Each feature\'s contribution is independent and interpretable. More complex (non-linear) combinations may be more accurate but are slower and harder to tune. Modern engines use neural networks instead.' },
    { question: 'Interview: What is the relationship between search depth and evaluation accuracy?', solution: 'Deeper search compensates for a less accurate evaluation function. A shallow search with a perfect evaluator is equivalent to a deep search with a weaker evaluator. In practice, engines achieve strong play by combining moderate-accuracy evaluations with deep alpha-beta search (iterative deepening + quiescence).' },
  ],
  exampleProblems: [],
}

export default function EvaluationFunctionsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
