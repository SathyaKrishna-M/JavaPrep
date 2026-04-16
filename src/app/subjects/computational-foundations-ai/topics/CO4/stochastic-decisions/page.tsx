'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiShuffle, FiUsers, FiCode, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Stochastic & Multi-Agent Decisions',
  explanationSections: [
    {
      title: '1️⃣ Stochastic Games',
      icon: <FiShuffle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Many real games involve <span className="text-cyan-400 font-semibold">chance</span> — dice rolls, card draws, random events. These are <em>stochastic games</em> and require a different framework than pure minimax.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['MAX nodes', 'Agent chooses action to maximise expected utility', 'green'],
              ['MIN nodes', 'Opponent chooses action to minimise expected utility', 'red'],
              ['CHANCE nodes', 'Nature randomly selects outcome with given probabilities', 'blue'],
            ].map(([t,d,c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm">Examples: Backgammon (dice determine available moves), Solitaire (random card order), Poker (hidden information + random deals).</p>
        </div>
      ),
    },
    {
      title: '2️⃣ Expectimax Algorithm',
      icon: <FiShuffle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Expectimax</span> extends minimax with chance nodes. At a chance node, compute the <em>expected value</em> — weighted average over all outcomes by their probabilities.</p>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30 font-mono text-center p-6">
            <p className="text-violet-300 text-lg">EXPECTIMAX(s) =</p>
            <p className="text-gray-300 text-sm mt-2">MAX: max over actions of EXPECTIMAX(child)</p>
            <p className="text-gray-300 text-sm">MIN: min over actions of EXPECTIMAX(child)</p>
            <p className="text-green-300 text-sm">CHANCE: Σ P(outcome) · EXPECTIMAX(child)</p>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`def expectimax(state, depth, player, game):
    if depth == 0 or game.is_terminal(state):
        return game.evaluate(state)

    if player == 'MAX':
        return max(expectimax(game.result(state, a), depth-1, 'CHANCE', game)
                   for a in game.actions(state))

    elif player == 'MIN':
        return min(expectimax(game.result(state, a), depth-1, 'CHANCE', game)
                   for a in game.actions(state))

    else:  # CHANCE node
        outcomes = game.chance_outcomes(state)  # [(prob, next_state), ...]
        return sum(p * expectimax(s, depth-1, game.next_player(state), game)
                   for p, s in outcomes)`}</pre>
        </div>
      ),
    },
    {
      title: '3️⃣ Minimax vs Expectimax',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Minimax</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Expectimax</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Game type','Deterministic','Stochastic (dice/chance)'],
                  ['Opponent model','Optimal adversary','Expected random outcomes'],
                  ['Chance nodes','None','Yes — weighted average'],
                  ['Pruning','Alpha-beta works','Alpha-beta does NOT apply'],
                  ['Example games','Chess, Go, Tic-tac-toe','Backgammon, Poker, Solitaire'],
                ].map(([p,m,e]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{m}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Why Alpha-Beta Fails for Expectimax</p>
            <p className="text-gray-300 text-sm">Alpha-beta requires bounds that propagate up the tree. At a chance node, we must compute ALL children's values to get the correct expected value — we cannot prune before seeing all outcomes.</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Bounded Rationality',
      icon: <FiUsers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Bounded rationality</span> (Herbert Simon) recognises that real agents do not have unlimited computation or information. They use <em>satisficing</em> — find a "good enough" solution rather than an optimal one.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Perfectly Rational Agent</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Optimises expected utility exactly</li>
                <li>Requires unlimited computation</li>
                <li>Theoretically ideal</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Bounded Rational Agent</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Limited time/memory/knowledge</li>
                <li>Uses heuristics and satisficing</li>
                <li>Realistic — all real AI systems</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Multi-Agent Reasoning Basics',
      icon: <FiUsers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Multi-agent environments involve multiple agents with possibly conflicting goals. Key concepts:</p>
          <div className="space-y-3">
            {[
              ['Zero-Sum Games', 'One agent\'s gain = other\'s loss. Minimax is optimal. Examples: chess, tic-tac-toe.'],
              ['General-Sum Games', 'Both agents can gain or lose. Requires game-theoretic analysis (Nash equilibria).'],
              ['Cooperative Games', 'Agents share goals and work together. Examples: multi-robot coordination.'],
              ['Nash Equilibrium', 'A set of strategies where no agent can improve by unilaterally changing its strategy.'],
              ["Prisoner's Dilemma", 'Both defect in Nash equilibrium, even though both cooperating gives better total outcome — illustrating conflict between individual and collective rationality.'],
            ].map(([t,d]) => (
              <div key={t} className="border-l-4 border-violet-500 pl-4">
                <p className="text-violet-300 font-semibold">{t}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
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
            <li><strong>Stochastic games:</strong> MAX + MIN + CHANCE nodes</li>
            <li><strong>Expectimax:</strong> Expected value at chance nodes = Σ P(outcome) × child_value</li>
            <li><strong>Alpha-beta does NOT apply</strong> to expectimax — must evaluate all outcomes</li>
            <li><strong>Bounded rationality:</strong> Real agents satisfice, not optimise</li>
            <li><strong>Zero-sum:</strong> minimax optimal. General-sum: needs Nash equilibrium analysis.</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the expectimax algorithm?', solution: 'Expectimax handles stochastic games with MAX nodes (choose max), MIN nodes (choose min), and CHANCE nodes (compute expected value = Σ P(outcome) × child value). It finds the optimal policy under uncertainty.' },
    { question: 'Why can\'t alpha-beta pruning be directly applied to expectimax?', solution: 'Alpha-beta pruning requires upper and lower bounds that propagate. At a chance node, all children must be evaluated to compute the correct expected value — pruning is not possible without knowing all outcomes.' },
    { question: 'What is bounded rationality?', solution: 'Bounded rationality (Simon 1957) is the idea that real agents have limited computation, memory, and information. Instead of optimising perfectly, they satisfice — find a solution that is "good enough" given their constraints.' },
    { question: 'MCQ: In expectimax, what is computed at a CHANCE node?\n A) Maximum of children\n B) Minimum of children\n C) Expected value Σ P(o)·V(o)\n D) Static evaluation', solution: 'C) Expected value — weighted average of children\'s values by outcome probabilities.' },
    { question: 'MCQ: In a Prisoner\'s Dilemma, the Nash equilibrium is:\n A) Both cooperate\n B) Both defect\n C) One cooperates, one defects\n D) Random mixed strategy', solution: 'B) Both defect — each agent defects regardless of the other\'s action, as defecting is the dominant strategy for each individually.' },
    { question: 'Give an example of a real-world stochastic game and explain its CHANCE nodes.', solution: 'Backgammon: After each player\'s move, dice are rolled. The dice outcome determines which moves are available on the next turn. The 36 possible dice combinations form the CHANCE node, each with probability 1/36 (or 2/36 for doubles).' },
    { question: 'Interview: How does expectimax differ from minimax when the opponent plays randomly instead of optimally?', solution: 'Minimax assumes the opponent plays optimally (worst case for us). If the opponent plays randomly, minimax is overly conservative — we avoid moves the opponent might make optimally, even if they are unlikely. Expectimax models actual behaviour correctly — chance nodes capture random opponents perfectly, leading to higher expected utility.' },
  ],
  exampleProblems: [],
}

export default function StochasticDecisionsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
