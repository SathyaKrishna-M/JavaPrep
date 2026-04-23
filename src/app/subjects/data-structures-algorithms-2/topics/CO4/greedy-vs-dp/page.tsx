'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiZap, FiGrid, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import AlgoStepper from '@/components/visuals/AlgoStepper'
import ArrayBars from '@/components/visuals/ArrayBars'

const content = {
  title: 'Greedy vs Dynamic Programming',
  explanationSections: [
    {
      title: '1️⃣ Key Differences',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Both Greedy and DP require <span className="text-cyan-400 font-semibold">optimal substructure</span>. The critical distinction is whether a <em>greedy choice</em> is provably safe — whether the local optimum always leads to the global optimum.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Dimension</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Greedy</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Dynamic Programming</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Optimal substructure', '✓ Required', '✓ Required'],
                  ['Overlapping subproblems', '✗ Not needed', '✓ Required'],
                  ['Greedy choice property', '✓ Required', '✗ Not needed'],
                  ['Subproblem exploration', 'Only 1 per step (commit)', 'All subproblems (memoized)'],
                  ['Direction', 'Top-down, commit and move on', 'All-subproblems, then combine'],
                  ['Time complexity', 'Typically O(n log n)', 'Typically O(n²) or O(n³)'],
                  ['Space complexity', 'O(1)–O(n)', 'O(n²) often'],
                  ['When correct', 'Provably local=global optimal', 'Always (with correct recurrence)'],
                ].map(([d, g, dp]) => (
                  <tr key={d}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{d}</td>
                    <td className="px-4 py-2 text-green-300 border border-slate-700 text-sm">{g}</td>
                    <td className="px-4 py-2 text-blue-300 border border-slate-700 text-sm">{dp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AlgoStepper
            title="Decision flowchart: Greedy or DP?"
            steps={[
              { title: 'Step 1 — Optimal substructure?', description: 'Does an optimal solution to the problem contain optimal solutions to its subproblems? If no → neither greedy nor DP applies (try brute force or heuristics).', code: 'Shortest path → yes  |  TSP (NP-hard) → no\nKnapsack → yes       |  Longest path → no' },
              { title: 'Step 2 — Can you prove greedy choice?', description: 'For the first choice you make, can you prove it is always safe (never rules out the optimal)? Use an exchange argument or find a counterexample.', code: 'Activity selection: earliest-finish safe → Greedy ✓\nCoin change {1,3,4}: 4+1+1=3 ≠ optimal 3+3=2 → Greedy ✗' },
              { title: 'Step 3 — Overlapping subproblems?', description: 'Are the same subproblems solved repeatedly? If yes → DP with memoization or tabulation avoids recomputation.', code: 'fib(5) calls fib(3) twice → overlapping → DP\n0/1 Knapsack: many (i,w) pairs reused → DP' },
              { title: 'Step 4 — Choose algorithm', description: 'Greedy if safe (fastest, O(n log n)). DP if overlapping subproblems (O(n²)–O(n³)). Divide & Conquer if subproblems are independent (merge sort, binary search).', code: 'Greedy: Dijkstra, Kruskal, Huffman, Activity Sel.\nDP: Knapsack, LCS, Edit Dist, Floyd-Warshall' },
            ]}
          />
          <ArrayBars
            title="Coin change {1,3,4} → amount=6: Greedy gives 3 coins, DP finds optimal 2 coins"
            bars={[
              { value: 4, label: '4¢',  color: 'pivot',   index: 0 },
              { value: 1, label: '1¢',  color: 'compare', index: 1 },
              { value: 1, label: '1¢',  color: 'compare', index: 2 },
              { value: 3, label: '3¢',  color: 'sorted',  index: 3 },
              { value: 3, label: '3¢',  color: 'sorted',  index: 4 },
            ]}
            caption="Red (pivot) = greedy picks 4 first → 3 coins total | Green (sorted) = DP optimal → 3+3 = 2 coins"
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Knapsack: Greedy (Fractional) vs DP (0/1)',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The same knapsack problem changes from greedy-solvable to DP-required just by changing whether items can be split.</p>
          <PyCode language="java">{`// FRACTIONAL Knapsack — Greedy works ✓
// Items can be broken: take the highest value/weight ratio first
// Greedy choice: always take the item (or fraction) with best ratio
double fractionalKnapsack(int[] w, int[] v, int W) {
    int n = w.length;
    Double[] ratios = new Double[n];
    for (int i = 0; i < n; i++) ratios[i] = (double) v[i] / w[i];
    Integer[] idx = IntStream.range(0, n).boxed()
        .sorted((a, b) -> Double.compare(ratios[b], ratios[a]))
        .toArray(Integer[]::new);

    double total = 0; int rem = W;
    for (int i : idx) {
        if (rem <= 0) break;
        int take = Math.min(w[i], rem);
        total += take * ratios[i];
        rem -= take;
    }
    return total;
}

// 0/1 Knapsack — Greedy FAILS, DP required ✗
// Each item must be taken entirely or left
// Greedy: [(4kg,$8 r=2), (3kg,$6 r=2), (2kg,$3 r=1.5)], W=5
// Greedy: 4kg→$8, can't fit 3kg → total $8
// DP optimal: 3kg+2kg = $9 ✓ (greedy missed it)
int knapsack01(int[] w, int[] v, int W) {
    int n = w.length;
    int[] dp = new int[W + 1];
    for (int i = 0; i < n; i++)
        for (int cap = W; cap >= w[i]; cap--)
            dp[cap] = Math.max(dp[cap], dp[cap - w[i]] + v[i]);
    return dp[W];
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Coin Change: When Greedy Fails',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Coin change is a classic example where greedy works for standard denominations but fails for arbitrary ones.</p>
          <PyCode language="java">{`// Coin Change — DP (works for all denominations)
// dp[i] = min coins to make amount i
int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);  // "infinity"
    dp[0] = 0;

    for (int i = 1; i <= amount; i++)
        for (int coin : coins)
            if (coin <= i)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);

    return dp[amount] > amount ? -1 : dp[amount];
}
// coins=[1,3,4], amount=6:
// Greedy (largest first): 4+1+1 = 3 coins
// DP optimal: 3+3      = 2 coins ← greedy is wrong!

// Greedy DOES work for US coins {1,5,10,25}:
// These denominations satisfy the "canonical" property.`}</PyCode>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">How to determine Greedy vs DP</p>
            <p className="text-gray-300 text-sm">Try to find a counterexample where the greedy choice leads to a suboptimal result. If you can — use DP. If you cannot and can prove it mathematically (exchange argument or matroid theory) — greedy is safe.</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Decision Framework & Summary',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              ['Step 1', 'Does the problem have optimal substructure? If not → neither greedy nor DP.'],
              ['Step 2', 'Can you prove the greedy choice property (local = global)? If yes → Greedy.'],
              ['Step 3', 'Do subproblems overlap? If yes → DP (memoization or tabulation).'],
              ['Step 4', 'If subproblems are independent → Divide and Conquer (merge sort, binary search).'],
            ].map(([step, desc]) => (
              <div key={step} className="border-l-4 border-cyan-500 pl-3">
                <span className="text-cyan-300 font-semibold text-sm">{step}: </span>
                <span className="text-gray-300 text-sm">{desc}</span>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Problem</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Greedy</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">DP</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Why</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Fractional Knapsack', '✓ O(n log n)', '✗', 'Ratio greedy is provably optimal'],
                  ['0/1 Knapsack', '✗', '✓ O(nW)', 'Greedy fails on counterexample'],
                  ['Activity Selection', '✓ O(n log n)', '✗', 'Earliest finish provably safe'],
                  ['Coin Change (US)', '✓ O(n)', 'possible', 'Canonical coins — greedy works'],
                  ['Coin Change (general)', '✗', '✓ O(nA)', 'Greedy fails for {1,3,4}'],
                  ['Huffman Coding', '✓ O(n log n)', '✗', 'Merge-lowest is optimal'],
                  ['LCS / Edit Distance', '✗', '✓ O(mn)', 'No greedy structure'],
                  ['MST (Kruskal/Prim)', '✓ O(E log V)', '✗', 'Cut property guarantees correctness'],
                ].map(([p, g, dp, why]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-green-300 border border-slate-700 text-sm">{g}</td>
                    <td className="px-4 py-2 text-blue-300 border border-slate-700 text-sm">{dp}</td>
                    <td className="px-4 py-2 text-gray-400 border border-slate-700 text-xs">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Both need optimal substructure:</strong> optimal solution uses optimal sub-solutions</li>
            <li><strong>Greedy additionally needs:</strong> greedy choice property — local optimal = global optimal</li>
            <li><strong>DP additionally needs:</strong> overlapping subproblems — avoids recomputation</li>
            <li><strong>Greedy is faster</strong> (usually O(n log n)) but only correct when provable</li>
            <li><strong>DP is always correct</strong> (with right recurrence) but slower (O(n²) or more)</li>
            <li><strong>Prove greedy with:</strong> exchange argument, matroid theory, or find counterexample</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the greedy choice property and why does it not apply to 0/1 knapsack?', solution: 'The greedy choice property states: a globally optimal solution can be reached by making the locally optimal choice at each step. For 0/1 knapsack, taking the highest value/weight ratio item can leave remaining capacity unused in a suboptimal way. Counterexample: capacity=5, items: (4kg,$8 r=2), (3kg,$6 r=2), (2kg,$3 r=1.5). Greedy takes 4kg→$8 (can\'t fit others). DP finds 3kg+2kg=$9. The local choice (4kg item, same ratio but larger) prevents a better global choice.' },
    { question: 'How do you decide between greedy and DP for a new problem?', solution: '1. Check optimal substructure — does the optimal solution include optimal subsolutions? 2. Try to find a greedy choice that is always safe. 3. Attempt an exchange argument: assume optimal differs from greedy at the first choice, show exchanging to greedy choice doesn\'t worsen the solution. 4. Search for a counterexample — if greedy fails on any input, use DP. 5. If neither subproblem property holds (e.g., shortest path with negative cycles), neither works.' },
    { question: 'Why does greedy work for activity selection but DP is not needed?', solution: 'Proof by exchange argument: let G be greedy\'s first pick (earliest finish), O be any optimal solution. O either picks the same activity or one with a later finish time. Replacing O\'s first pick with G\'s pick produces a valid schedule (G finishes no later, so remaining activities are unaffected) with the same number of activities. Repeating this exchange transforms any optimal solution into the greedy solution without decreasing the count. Therefore greedy is optimal.' },
    { question: 'MCQ: Which property distinguishes greedy from DP?\n A) Optimal substructure\n B) Overlapping subproblems  \n C) Greedy choice property\n D) Both B and C', solution: 'D) Both B and C — DP additionally requires overlapping subproblems (to justify memoization). Greedy additionally requires the greedy choice property (local = global optimal). Optimal substructure is required by both. Greedy does NOT require overlapping subproblems.' },
    { question: 'MCQ: Coin change with denominations {1,3,4} and amount 6 — greedy gives:\n A) 2 coins\n B) 3 coins\n C) 4 coins\n D) 6 coins', solution: 'B) 3 coins — greedy (largest first): 4, then 4 exceeds 2 remaining, so 1+1 = total 3 coins (4+1+1). DP optimal: 3+3 = 2 coins. Greedy is suboptimal here, giving 3 instead of 2.' },
    { question: 'Compare time and space complexity for the following: fractional knapsack, 0/1 knapsack, and activity selection.', solution: 'Activity selection: sort O(n log n), scan O(n) → O(n log n) time, O(1) extra space (greedy). Fractional knapsack: sort by ratio O(n log n), scan O(n) → O(n log n) time, O(1) extra space (greedy). 0/1 Knapsack: O(nW) time, O(nW) space for 2D table or O(W) with 1D optimization (DP). The O(nW) complexity is pseudo-polynomial — W can be large. All three have n items, but knapsack also depends on capacity W.' },
    { question: 'Interview: When would you pick DP over greedy in a real system?', solution: 'Use DP when: (1) You cannot prove the greedy choice is always safe — e.g., optimal route planning with arbitrary costs, flexible pricing models; (2) The problem has hard constraints that interact (0/1 choices, limited budgets); (3) You need to track multiple competing objectives simultaneously (multi-dimensional DP). Real examples: spell-check suggestions (edit distance DP vs simple heuristics), job scheduling with deadlines and profits (requires DP when items have dependencies), RNA secondary structure prediction (interval DP). Always prototype greedy first — if it passes all test cases including adversarial ones, it\'s likely correct. If not, convert to DP with the same subproblem structure.' },
  ],
  exampleProblems: [],
}

export default function GreedyVsDPPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
