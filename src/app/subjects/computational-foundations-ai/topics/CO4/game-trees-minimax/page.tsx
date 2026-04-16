'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGrid, FiCpu, FiTarget, FiCode, FiAlertCircle, FiBarChart2, FiZap } from 'react-icons/fi'

const content = {
    title: 'Game Trees & Minimax Algorithm',
    explanationSections: [
        {
            title: '1️⃣ Two-Player Zero-Sum Games',
            icon: <FiGrid className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">two-player zero-sum game</span> is a competitive environment where exactly two agents take turns making moves, and one player&apos;s gain is precisely the other&apos;s loss. The total &quot;utility&quot; summed across both players is always zero — if MAX wins +1, MIN loses -1; net sum = 0.
                    </p>
                    <p className="text-gray-300">
                        Classic examples span from trivial to computationally intractable:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-800 border border-cyan-500/40 rounded-lg p-4">
                            <p className="text-cyan-400 font-semibold mb-2">Tic-Tac-Toe</p>
                            <p className="text-gray-300 text-sm">Branching factor b ≈ 9, depth m = 9. Roughly 9! = 362,880 terminal states. Completely solvable by exhaustive search. A solved game — perfect play always draws.</p>
                        </div>
                        <div className="bg-slate-800 border border-amber-500/40 rounded-lg p-4">
                            <p className="text-amber-400 font-semibold mb-2">Checkers</p>
                            <p className="text-gray-300 text-sm">Branching factor b ≈ 8, depth m ≈ 70. Solved computationally by Chinook (2007). ~5×10²¹ positions. Required alpha-beta + extensive endgame databases.</p>
                        </div>
                        <div className="bg-slate-800 border border-rose-500/40 rounded-lg p-4">
                            <p className="text-rose-400 font-semibold mb-2">Chess</p>
                            <p className="text-gray-300 text-sm">Branching factor b ≈ 35, depth m ≈ 100. Shannon number ≈ 10¹²³ nodes — more than atoms in the observable universe. Requires deep heuristics.</p>
                        </div>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-amber-300 font-semibold mb-2">Key Property — Zero-Sum:</p>
                        <p className="text-gray-300 text-sm">If utility(terminal, MAX) = +1, then utility(terminal, MIN) = -1. There is no outcome that benefits both players simultaneously. This adversarial structure means MAX always wants to maximize utility while MIN always wants to minimize it.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '2️⃣ Formal Game Formulation',
            icon: <FiTarget className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Like search problems, games are formally defined by a set of six components. This structure allows uniform algorithmic treatment regardless of the specific game.
                    </p>
                    <div className="space-y-3">
                        <div className="bg-slate-800/60 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                            <p className="text-cyan-400 font-mono font-semibold">S₀ — Initial State</p>
                            <p className="text-gray-300 text-sm mt-1">The starting configuration of the board. For chess: standard opening position. For tic-tac-toe: an empty 3×3 grid. Defines where the game begins.</p>
                        </div>
                        <div className="bg-slate-800/60 border-l-4 border-green-500 p-4 rounded-r-lg">
                            <p className="text-green-400 font-mono font-semibold">PLAYER(s) — Whose Turn?</p>
                            <p className="text-gray-300 text-sm mt-1">A function that returns which player (MAX or MIN) has the move in state s. In alternating games, this is simply determined by the move number parity (even → MAX, odd → MIN).</p>
                        </div>
                        <div className="bg-slate-800/60 border-l-4 border-violet-500 p-4 rounded-r-lg">
                            <p className="text-violet-400 font-mono font-semibold">ACTIONS(s) — Legal Moves</p>
                            <p className="text-gray-300 text-sm mt-1">The set of all legal moves in state s. The cardinality |ACTIONS(s)| is the branching factor at that node. In chess this includes captures, castling, en passant; in tic-tac-toe it&apos;s all unmarked cells.</p>
                        </div>
                        <div className="bg-slate-800/60 border-l-4 border-amber-500 p-4 rounded-r-lg">
                            <p className="text-amber-400 font-mono font-semibold">RESULT(s, a) — Transition</p>
                            <p className="text-gray-300 text-sm mt-1">The deterministic transition model. Given state s and action a, returns the resulting state s&apos;. Fully deterministic for chess and tic-tac-toe — no randomness involved.</p>
                        </div>
                        <div className="bg-slate-800/60 border-l-4 border-rose-500 p-4 rounded-r-lg">
                            <p className="text-rose-400 font-mono font-semibold">TERMINAL-TEST(s) — Is Game Over?</p>
                            <p className="text-gray-300 text-sm mt-1">Returns TRUE when the game has ended. For tic-tac-toe: a line of three identical marks or a full board. For chess: checkmate, stalemate, or draw by repetition/50-move rule.</p>
                        </div>
                        <div className="bg-slate-800/60 border-l-4 border-teal-500 p-4 rounded-r-lg">
                            <p className="text-teal-400 font-mono font-semibold">UTILITY(s, p) — Payoff</p>
                            <p className="text-gray-300 text-sm mt-1">The numerical payoff assigned to terminal state s for player p. For tic-tac-toe: +1 (X wins), 0 (draw), -1 (O wins). For chess: +1 (win), 0 (draw), -1 (loss). The minimax algorithm propagates these values upward through the tree.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '3️⃣ Game Tree Structure',
            icon: <FiBarChart2 className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A <span className="text-cyan-400 font-semibold">game tree</span> is a complete tree representation of all possible game states reachable from the initial state. Each node is a game state; each edge is a legal move. The tree alternates between MAX and MIN levels.
                    </p>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700">
                            <span className="text-sm font-bold text-gray-300">Game Tree Anatomy</span>
                        </div>
                        <div className="p-6 font-mono text-sm">
                            <div className="flex flex-col items-center space-y-2">
                                <div className="bg-cyan-500/20 border border-cyan-500 rounded-lg px-6 py-2 text-cyan-300 font-bold">
                                    MAX (△) — Root Node (S₀)
                                </div>
                                <div className="text-gray-500 text-xs">↙ ↓ ↘ &nbsp; legal actions from S₀</div>
                                <div className="flex gap-8">
                                    <div className="bg-rose-500/20 border border-rose-500 rounded-lg px-4 py-2 text-rose-300 font-bold">
                                        MIN (▽) S₁
                                    </div>
                                    <div className="bg-rose-500/20 border border-rose-500 rounded-lg px-4 py-2 text-rose-300 font-bold">
                                        MIN (▽) S₂
                                    </div>
                                    <div className="bg-rose-500/20 border border-rose-500 rounded-lg px-4 py-2 text-rose-300 font-bold">
                                        MIN (▽) S₃
                                    </div>
                                </div>
                                <div className="text-gray-500 text-xs">↙↓↘ &nbsp;↙↓↘ &nbsp;↙↓↘ &nbsp; MIN&apos;s responses</div>
                                <div className="flex gap-3">
                                    {[3, 5, 2, 4, 6, 1, 7, 3, 5].map((v, i) => (
                                        <div key={i} className="bg-green-500/20 border border-green-500/60 rounded px-2 py-1 text-green-300 text-xs font-bold">
                                            {v}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-green-400 text-xs">Terminal nodes with utility values</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-cyan-400 font-semibold mb-2">MAX Nodes (△)</p>
                            <p className="text-gray-300 text-sm">These are states where it is MAX&apos;s turn to move. MAX picks the child with the highest minimax value — the move that maximizes their own utility.</p>
                        </div>
                        <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                            <p className="text-rose-400 font-semibold mb-2">MIN Nodes (▽)</p>
                            <p className="text-gray-300 text-sm">States where MIN moves. MIN selects the child with the lowest minimax value — MIN acts as a rational adversary minimizing MAX&apos;s utility.</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-semibold mb-2">Terminal Nodes</p>
                            <p className="text-gray-300 text-sm">Leaf nodes where TERMINAL-TEST returns TRUE. They carry concrete UTILITY values. Minimax propagates these values upward via the backing-up procedure.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '4️⃣ Minimax Algorithm — Recursive Definition',
            icon: <FiCpu className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        The <span className="text-cyan-400 font-semibold">Minimax algorithm</span> computes the optimal decision for the current player by performing a depth-first search of the game tree and backing up values. It is defined recursively as follows:
                    </p>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700">
                            <span className="text-sm font-bold text-gray-300">Formal Recursive Definition</span>
                        </div>
                        <div className="p-5 font-mono text-sm space-y-2">
                            <div className="text-gray-200">
                                <span className="text-amber-400">MINIMAX</span><span className="text-gray-300">(s) =</span>
                            </div>
                            <div className="pl-4 space-y-1 text-sm">
                                <div><span className="text-cyan-400">UTILITY(s, MAX)</span><span className="text-gray-400">&nbsp;&nbsp;&nbsp;if TERMINAL-TEST(s)</span></div>
                                <div><span className="text-green-400">max</span><span className="text-gray-300"> MINIMAX(RESULT(s,a))&nbsp;&nbsp;</span><span className="text-gray-400">if PLAYER(s) = MAX</span></div>
                                <div><span className="text-rose-400">min</span><span className="text-gray-300"> MINIMAX(RESULT(s,a))&nbsp;&nbsp;</span><span className="text-gray-400">if PLAYER(s) = MIN</span></div>
                                <div className="text-gray-500 text-xs pt-1">where a ranges over all actions in ACTIONS(s)</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-300">
                        The algorithm proceeds by recursing all the way down to terminal nodes, then <span className="text-cyan-400 font-semibold">backing up</span> the values. MAX nodes take the maximum of their children&apos;s values; MIN nodes take the minimum. The value at the root is the minimax value of the game from the initial position.
                    </p>
                    <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                        <p className="text-violet-300 font-semibold mb-2">Optimality Guarantee:</p>
                        <p className="text-gray-300 text-sm">Minimax is <strong>optimal against an optimal opponent</strong>. Given that MIN also plays perfectly, MAX cannot do better than the minimax value. However, if MIN plays sub-optimally (makes mistakes), MAX may achieve a higher utility than the minimax value — but minimax guarantees at least the minimax value regardless.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '5️⃣ Full Worked Trace — 3-Level Game Tree',
            icon: <FiZap className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Consider a 3-level game tree with branching factor 3 (like a simplified tic-tac-toe position). Terminal utility values at depth 2 are assigned. We propagate upward using minimax.
                    </p>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700">
                            <span className="text-sm font-bold text-gray-300">Step-by-Step Minimax Trace</span>
                        </div>
                        <div className="p-5 font-mono text-xs space-y-4">
                            <div>
                                <p className="text-gray-400 mb-3">Terminal values (depth 2): A=[3,12,8], B=[2,4,6], C=[14,5,2]</p>
                                <div className="space-y-3">
                                    <div className="bg-slate-800 p-3 rounded border border-rose-500/40">
                                        <p className="text-rose-400 font-bold mb-1">MIN Layer (depth 1):</p>
                                        <p className="text-gray-300">Node D (parent of 3,12,8):  <span className="text-rose-300">MIN(3,12,8) = 3</span></p>
                                        <p className="text-gray-300">Node E (parent of 2,4,6):   <span className="text-rose-300">MIN(2,4,6) = 2</span></p>
                                        <p className="text-gray-300">Node F (parent of 14,5,2):  <span className="text-rose-300">MIN(14,5,2) = 2</span></p>
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded border border-cyan-500/40">
                                        <p className="text-cyan-400 font-bold mb-1">MAX Layer (depth 0 — ROOT):</p>
                                        <p className="text-gray-300">Root (parent of D=3, E=2, F=2):  <span className="text-cyan-300">MAX(3,2,2) = 3</span></p>
                                        <p className="text-green-400 mt-1">✓ Optimal action: choose child D (left branch, value=3)</p>
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded border border-green-500/40">
                                        <p className="text-green-400 font-bold mb-1">Interpretation:</p>
                                        <p className="text-gray-300">MAX selects the branch leading to MIN node D. Even though terminal node &quot;12&quot; exists under D, MIN will never allow MAX to reach it — MIN will pick the 3. But 3 is still better than the 2s under E and F. So MAX rationally picks D.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-amber-300 font-semibold mb-2">Key Insight — Pessimistic Reasoning:</p>
                        <p className="text-gray-300 text-sm">MAX always assumes MIN plays perfectly. This is a <em>pessimistic</em> world model. Minimax guarantees MAX will get at least utility=3 from this position, no matter what MIN does, as long as MAX always picks action D and then the subtree proceeds.</p>
                    </div>
                </div>
            ),
        },
        {
            title: '6️⃣ Complexity Analysis',
            icon: <FiAlertCircle className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Minimax performs a complete depth-first traversal of the game tree. Its complexity is analyzed in terms of branching factor <span className="text-cyan-400 font-mono">b</span> (average legal moves per state) and maximum depth <span className="text-cyan-400 font-mono">m</span> (game length in plies).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-rose-500/10 border border-rose-500/40 rounded-lg p-4">
                            <p className="text-rose-400 font-semibold mb-2">Time Complexity: O(b^m)</p>
                            <p className="text-gray-300 text-sm">Every node in the game tree is visited exactly once. With branching factor b and depth m, there are O(b^m) nodes total. For chess: 35^100 ≈ 10^154 — completely infeasible without pruning or cutoffs.</p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/40 rounded-lg p-4">
                            <p className="text-amber-400 font-semibold mb-2">Space Complexity: O(bm)</p>
                            <p className="text-gray-300 text-sm">Only the nodes along the current path from root to leaf need to be stored at any time (depth-first). At each depth level, b siblings are kept. Total space: O(bm) — linear in depth, polynomial in branching factor.</p>
                        </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                        <p className="text-gray-200 font-semibold mb-3">Complexity Table for Common Games</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-gray-300">
                                <thead>
                                    <tr className="border-b border-slate-600">
                                        <th className="text-left py-2 text-cyan-400">Game</th>
                                        <th className="text-center py-2 text-cyan-400">b (avg)</th>
                                        <th className="text-center py-2 text-cyan-400">m (depth)</th>
                                        <th className="text-center py-2 text-cyan-400">b^m nodes</th>
                                        <th className="text-center py-2 text-cyan-400">Feasible?</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    <tr>
                                        <td className="py-2">Tic-Tac-Toe</td>
                                        <td className="text-center">~5</td>
                                        <td className="text-center">9</td>
                                        <td className="text-center">~362K</td>
                                        <td className="text-center text-green-400">Yes</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">Checkers</td>
                                        <td className="text-center">~8</td>
                                        <td className="text-center">70</td>
                                        <td className="text-center">~10⁶³</td>
                                        <td className="text-center text-rose-400">No</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">Chess</td>
                                        <td className="text-center">~35</td>
                                        <td className="text-center">100</td>
                                        <td className="text-center">~10¹⁵⁴</td>
                                        <td className="text-center text-rose-400">No</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">Go</td>
                                        <td className="text-center">~250</td>
                                        <td className="text-center">150</td>
                                        <td className="text-center">~10³⁶⁰</td>
                                        <td className="text-center text-rose-400">No</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '7️⃣ Python Implementation — Minimax for Tic-Tac-Toe',
            icon: <FiCode className="w-6 h-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-gray-300">
                        A complete minimax implementation for tic-tac-toe. The board is a list of 9 cells. Player MAX = &apos;X&apos;, Player MIN = &apos;O&apos;. Returns the optimal score from a given board state.
                    </p>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-300">minimax_tictactoe.py</span>
                            <span className="text-xs text-gray-500">Python 3</span>
                        </div>
                        <div className="p-5 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed">
                            <pre>{`def check_winner(board):
    """Return 'X', 'O', 'draw', or None."""
    lines = [(0,1,2),(3,4,5),(6,7,8),   # rows
             (0,3,6),(1,4,7),(2,5,8),   # cols
             (0,4,8),(2,4,6)]           # diags
    for a, b, c in lines:
        if board[a] == board[b] == board[c] != ' ':
            return board[a]
    if ' ' not in board:
        return 'draw'
    return None

def minimax(board, is_max):
    """
    Recursively compute minimax value.
    is_max=True  → MAX's turn (X wants +1)
    is_max=False → MIN's turn (O wants -1)
    """
    result = check_winner(board)
    if result == 'X':   return +1    # MAX wins
    if result == 'O':   return -1    # MIN wins
    if result == 'draw': return 0   # Draw

    if is_max:
        best = -float('inf')
        for i in range(9):
            if board[i] == ' ':
                board[i] = 'X'                       # Try move
                score = minimax(board, False)        # Recurse for MIN
                board[i] = ' '                       # Undo move
                best = max(best, score)
        return best
    else:
        best = +float('inf')
        for i in range(9):
            if board[i] == ' ':
                board[i] = 'O'                       # Try move
                score = minimax(board, True)         # Recurse for MAX
                board[i] = ' '                       # Undo move
                best = min(best, score)
        return best

def best_move(board):
    """Return the index of the best move for MAX (X)."""
    best_val = -float('inf')
    best_idx = -1
    for i in range(9):
        if board[i] == ' ':
            board[i] = 'X'
            move_val = minimax(board, False)  # After X moves, it's O's turn
            board[i] = ' '
            if move_val > best_val:
                best_val = move_val
                best_idx = i
    return best_idx

# Example: X to move — board is nearly complete
board = ['X', 'O', 'X',
         'O', 'X', 'O',
         ' ', ' ', ' ']

idx = best_move(board)
print(f"Best move for X: position {idx}")
# Output: Best move for X: position 6  (wins immediately)
# Board after:
# X | O | X
# ---------
# O | X | O
# ---------
# X |   |   `}</pre>
                        </div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <p className="text-green-400 font-semibold mb-2">Code Analysis:</p>
                        <p className="text-gray-300 text-sm">The <code className="text-cyan-300">check_winner</code> function checks all 8 possible winning lines. <code className="text-cyan-300">minimax</code> recurses with alternating <code className="text-cyan-300">is_max</code> flags. The &quot;make-move / recurse / undo-move&quot; pattern is the standard in-place board manipulation technique. <code className="text-cyan-300">best_move</code> wraps minimax to return the actual move index rather than just the score.</p>
                    </div>
                </div>
            ),
        },
    ],
    practiceQuestions: [
        {
            question: "Define a two-player zero-sum game and explain why the 'zero-sum' property is critical to the minimax algorithm's correctness.",
            solution: "A two-player zero-sum game involves two agents where one player's gain exactly equals the other's loss (utility sums to zero). This is critical to minimax because it means MAX and MIN have perfectly opposed objectives — MAX maximizing their utility is identical to minimizing MIN's utility. Minimax exploits this by assuming MIN will always minimize MAX's utility, which is a valid rational assumption under zero-sum conditions. In non-zero-sum games, this assumption breaks down and minimax may be suboptimal."
        },
        {
            question: "MCQ: What is the time complexity of the Minimax algorithm for a game with branching factor b and maximum depth m?\n A) O(b × m)\n B) O(b^m)\n C) O(m^b)\n D) O(b + m)",
            solution: "B) O(b^m). Minimax performs a complete depth-first traversal of the game tree. At each of the m levels, there are up to b branches to explore, yielding b^m total leaf nodes to evaluate. This exponential growth is why minimax is impractical for real games like chess without enhancements like alpha-beta pruning."
        },
        {
            question: "Given the following game tree terminal values, compute the minimax value at the root:\n- Root is a MAX node\n- It has 2 children (MIN nodes)\n- Left MIN node has children: [3, 17, 2]\n- Right MIN node has children: [15, 3, 5]",
            solution: "Left MIN node: MIN(3, 17, 2) = 2. Right MIN node: MIN(15, 3, 5) = 3. Root MAX node: MAX(2, 3) = 3. The minimax value at the root is 3, and MAX should take the right branch."
        },
        {
            question: "What is the space complexity of Minimax, and why is it much better than the time complexity?",
            solution: "Space complexity is O(bm). Minimax uses depth-first search, so it only needs to store the current path from root to the current node being evaluated. At each depth level d, at most b sibling nodes are stored. Since depth is at most m, total space is O(b × m). This is dramatically better than the O(b^m) time because we do not need to store the entire tree in memory simultaneously — nodes are generated, evaluated, and discarded."
        },
        {
            question: "MCQ: In the minimax algorithm, if it is MIN's turn at a node, which value does MIN select?\n A) The maximum of children's minimax values\n B) The minimum of children's minimax values\n C) The average of children's minimax values\n D) The value of the leftmost child",
            solution: "B) The minimum of children's minimax values. MIN is a rational adversary whose goal is to minimize MAX's utility. Therefore MIN always selects the action leading to the state with the lowest minimax value, which is the worst outcome for MAX."
        },
        {
            question: "What does it mean to say minimax is 'optimal against an optimal opponent'? Does it guarantee winning?",
            solution: "Minimax is optimal in the sense that if both players play perfectly, minimax guarantees MAX will achieve at least the minimax value of the game — no strategy can do better against a perfect MIN. It does NOT guarantee winning: if the game's minimax value is 0 (draw) or -1 (loss from initial state), even perfect play by MAX cannot win. For example, tic-tac-toe from the start has minimax value 0 — perfect play on both sides always draws."
        },
        {
            question: "List the six formal components of a game formulation and give a concrete example of each for chess.",
            solution: "1. S₀ (Initial State): Standard 8×8 chessboard opening position with all 32 pieces. 2. PLAYER(s): White (MAX) moves on even plies, Black (MIN) on odd plies. 3. ACTIONS(s): All legal moves including pawn pushes, captures, castling, en passant. 4. RESULT(s,a): Deterministic board position after executing move a from state s. 5. TERMINAL-TEST(s): True on checkmate, stalemate, insufficient material, 50-move rule, threefold repetition. 6. UTILITY(s,p): +1 (win), 0 (draw), -1 (loss) for player p in terminal state s."
        },
        {
            question: "MCQ: Which of the following games can be completely solved by exhaustive minimax without any heuristics?\n A) Chess\n B) Go\n C) Tic-Tac-Toe\n D) Checkers",
            solution: "C) Tic-Tac-Toe. With only ~362,880 terminal states (9! arrangements minus early terminations), the full game tree can be explored exhaustively in milliseconds. Chess has ≈10^154 nodes and Go ≈10^360 nodes — both completely infeasible without heuristic cutoffs. Checkers has been solved but required specialized databases, not raw minimax."
        },
        {
            question: "Explain the 'backing up' procedure in minimax. How does a utility value at a terminal node eventually determine the action taken at the root?",
            solution: "The backing-up procedure is the return step of the recursive minimax function. Terminal nodes return their concrete UTILITY values. These propagate upward: each MIN node returns the minimum of its children's returned values; each MAX node returns the maximum. At the root (a MAX node), the child that produced the maximum returned value corresponds to the optimal action. The root then selects that action — it is the move that guarantees the highest achievable utility against a perfect opponent."
        },
        {
            question: "In a game tree where MAX has 3 actions, and after each MAX action MIN has 3 responses, and each MIN response leads to a terminal node, what is the total number of terminal nodes? If terminal values are [3,12,8], [2,4,6], [14,5,2], what move does MAX choose?",
            solution: "Total terminal nodes: 3 × 3 = 9. MIN node 1: MIN(3,12,8) = 3. MIN node 2: MIN(2,4,6) = 2. MIN node 3: MIN(14,5,2) = 2. Root MAX: MAX(3,2,2) = 3. MAX chooses Action 1 (leading to the first MIN node with backed-up value 3). Note that even though terminal value 14 exists, MIN would never allow MAX to reach it within that subtree."
        },
    ],
    exampleProblems: [
        {
            problem: 'A 2-level game tree has a MAX root with 3 children (MIN nodes). The terminal values under each MIN node are: Left=[8, 3, 9], Middle=[1, 7, 4], Right=[6, 10, 2]. Compute the minimax value at the root and identify the optimal move for MAX.',
            solution: "3",
            steps: [
                {
                    step: 'Evaluate each MIN node',
                    explanation: 'Left MIN node: MIN(8, 3, 9) = 3. Middle MIN node: MIN(1, 7, 4) = 1. Right MIN node: MIN(6, 10, 2) = 2.'
                },
                {
                    step: 'Evaluate the MAX root',
                    explanation: 'Root MAX: MAX(3, 1, 2) = 3. MAX selects the Left branch, achieving minimax value = 3.'
                },
                {
                    step: 'Verify the reasoning',
                    explanation: 'Even though terminal value 9 is under the Left MIN node, MIN will play to get utility 3 (not 9). MAX prefers this over the middle (MIN forces utility 1) or right (MIN forces utility 2). MAX rationally chooses Left.'
                }
            ]
        }
    ]
}

export default function GameTreesMinimaxPage() {
    return (
        <DMTopicPage
            content={content}
            subjectName="Computational Foundations for AI"
            subjectHref="/subjects/computational-foundations-ai"
        />
    )
}
