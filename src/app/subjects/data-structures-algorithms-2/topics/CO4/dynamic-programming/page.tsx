'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiGrid, FiCode, FiLayers, FiCheckCircle } from 'react-icons/fi'
import DPGrid from '@/components/visuals/DPGrid'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Dynamic Programming',
  explanationSections: [
    {
      title: '1️⃣ DP Foundations',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Dynamic Programming</span> solves problems by breaking them into overlapping subproblems and storing solutions to avoid redundant computation. Two key properties are required:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Optimal Substructure</p>
              <p className="text-gray-300 text-sm">The optimal solution to the problem contains optimal solutions to its subproblems. Example: shortest path A→C through B requires the optimal A→B and B→C paths.</p>
            </div>
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
              <p className="text-violet-300 font-semibold mb-2">Overlapping Subproblems</p>
              <p className="text-gray-300 text-sm">The same subproblems are solved multiple times in naive recursion. DP avoids recomputation by storing results in a table (memoization or tabulation).</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-1">Top-Down (Memoization)</p>
              <p className="text-gray-300 text-sm">Recursive with caching. Natural to write. Only computes needed subproblems. Stack overflow risk for deep recursion.</p>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-semibold mb-1">Bottom-Up (Tabulation)</p>
              <p className="text-gray-300 text-sm">Iterative, fills table from base cases. No recursion overhead. Must define correct fill order. Usually faster in practice.</p>
            </div>
          </div>
          <AlgoStepper
            title="DP approach: from naive recursion to optimal tabulation"
            steps={[
              { title: 'Identify overlapping subproblems', description: 'Draw the recursion tree. If the same call appears more than once (e.g., fib(3) computed 5× for fib(6)), subproblems overlap.', code: 'fib(4)→fib(3)→fib(2)→fib(1)\n              ↘fib(2)  ↘fib(1) ← recomputed!' },
              { title: 'Verify optimal substructure', description: 'The optimal solution to the full problem includes optimal solutions to sub-problems. For 0/1 knapsack: best(n items, W) = best choice including/excluding item n.', code: 'dp[i][w] = max(dp[i-1][w],          // exclude item i\n               dp[i-1][w-wt[i]] + val[i])  // include it' },
              { title: 'Choose memoization or tabulation', description: 'Memoization = top-down recursive + cache. Tabulation = bottom-up iterative table. Tabulation avoids stack overflow and is usually faster due to no function call overhead.', code: 'Memo: if (cache[n] != -1) return cache[n];\nTab:  for i in 1..n: dp[i] = dp[i-1]+...' },
              { title: 'Optimize space if possible', description: 'Many 2D DP tables can be compressed to 1D. 0/1 knapsack: iterate capacity right-to-left so dp[w] = dp[i-1][w] (not yet overwritten for row i).', code: 'for (int w = W; w >= wt[i]; w--)\n    dp[w] = max(dp[w], dp[w-wt[i]]+val[i]);' },
            ]}
          />
          <DPGrid
            title="0/1 Knapsack DP table — items: (w=1,v=1), (w=3,v=4), (w=4,v=5), W=4"
            colHeaders={['cap→', '0', '1', '2', '3', '4']}
            rowHeaders={['base', 'item1(1,1)', 'item2(3,4)', 'item3(4,5)']}
            data={[
              [{ value: '0', color: 'header' }, { value: '0', color: 'default' }, { value: '0', color: 'default' }, { value: '0', color: 'default' }, { value: '0', color: 'default' }],
              [{ value: '0', color: 'default' }, { value: '1', color: 'highlight' }, { value: '1', color: 'highlight' }, { value: '1', color: 'highlight' }, { value: '1', color: 'highlight' }],
              [{ value: '0', color: 'default' }, { value: '1', color: 'default' }, { value: '1', color: 'default' }, { value: '4', color: 'source' }, { value: '5', color: 'source' }],
              [{ value: '0', color: 'default' }, { value: '1', color: 'default' }, { value: '1', color: 'default' }, { value: '4', color: 'default' }, { value: '5', color: 'result' }],
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Fibonacci — Overlapping Subproblems',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The canonical example of overlapping subproblems — naive recursion is O(2ⁿ); DP is O(n).</p>
          <PyCode language="java">{`// Naive recursion — O(2^n), recomputes same fib(k) many times
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// Top-Down: Memoization — O(n) time, O(n) space
int[] memo = new int[100];
int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    return memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
}

// Bottom-Up: Tabulation — O(n) time, O(n) space
int fibTab(int n) {
    if (n <= 1) return n;
    int[] dp = new int[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}

// Space-Optimized: O(n) time, O(1) space
int fibOpt(int n) {
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
    return b;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ 0/1 Knapsack',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">0/1 Knapsack:</span> given n items each with weight wᵢ and value vᵢ and a knapsack of capacity W, maximize total value. Each item is taken or left (0 or 1 — no fractions).</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-1">Recurrence:</p>
            <p className="text-gray-300">dp[i][w] = max value using items 1..i with capacity w</p>
            <p className="text-gray-300">         = dp[i-1][w]               if w[i] {'>'} w (skip item i)</p>
            <p className="text-gray-300">         = max(dp[i-1][w],           otherwise</p>
            <p className="text-gray-300">               dp[i-1][w-w[i]] + v[i])</p>
          </div>
          <PyCode language="java">{`// 0/1 Knapsack — O(nW) time, O(nW) space
int knapsack(int[] weights, int[] values, int W) {
    int n = weights.length;
    int[][] dp = new int[n + 1][W + 1];

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            // Don't include item i
            dp[i][w] = dp[i - 1][w];
            // Include item i (if it fits)
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    return dp[n][W];
}
// Space optimization: 1D array (fill right→left for 0/1 variant)
int knapsack1D(int[] weights, int[] values, int W) {
    int[] dp = new int[W + 1];
    for (int i = 0; i < weights.length; i++)
        for (int w = W; w >= weights[i]; w--)  // right→left avoids reuse
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    return dp[W];
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ DP Problem-Solving Framework',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              ['1. Define state', 'What does dp[i] or dp[i][j] represent? State must capture all information needed.'],
              ['2. Recurrence', 'Express dp[i][j] in terms of smaller subproblems. This is the core logic.'],
              ['3. Base cases', 'Identify the simplest inputs (empty array, size 0/1) and their values.'],
              ['4. Fill order', 'Ensure each dp[i][j] is computed before it is needed (for tabulation).'],
              ['5. Extract answer', 'Return dp[n], dp[n][W], or scan for the maximum.'],
            ].map(([step, desc]) => (
              <div key={step} className="border-l-4 border-cyan-500 pl-3">
                <span className="text-cyan-300 font-semibold text-sm">{step}: </span>
                <span className="text-gray-300 text-sm">{desc}</span>
              </div>
            ))}
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li>DP vs Greedy: DP explores all subproblems; greedy picks one per step</li>
              <li>DP vs Divide-Conquer: D&C subproblems don't overlap; DP subproblems do</li>
              <li>Common DP patterns: sequence, grid paths, interval, subset, tree DP</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What are the two key properties required for dynamic programming?', solution: '(1) Optimal Substructure: the optimal solution to the problem can be constructed from optimal solutions to its subproblems. (2) Overlapping Subproblems: the recursive algorithm revisits the same subproblems multiple times. Without overlapping subproblems, simple recursion or divide-and-conquer works fine without memoization.' },
    { question: 'What is the difference between memoization and tabulation?', solution: 'Memoization (top-down): write the recursive solution, add a cache (HashMap or array) to store computed results. Only computes needed subproblems. Natural to write from the recurrence. Tabulation (bottom-up): fill a table iteratively from base cases up. No recursion overhead, no stack overflow risk, often better cache performance. Both are O(n) for Fibonacci — tabulation usually has lower constant factor.' },
    { question: 'Write the recurrence for 0/1 Knapsack and explain the two cases.', solution: 'dp[i][w] = max value using items 1..i with weight capacity w. Base: dp[0][w]=0 (no items), dp[i][0]=0 (no capacity). Recurrence: if weights[i] > w: dp[i][w] = dp[i-1][w] (can\'t fit item i — skip it). Else: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weights[i]] + values[i]) — either skip item i (first term) or include it (remove its weight from capacity, add its value).' },
    { question: 'MCQ: 0/1 Knapsack has time complexity:\n A) O(n log W)\n B) O(nW)\n C) O(n²)\n D) O(2ⁿ)', solution: 'B) O(nW) — two nested loops: n items × W+1 capacities. Space is also O(nW), reducible to O(W) with 1D array. This is pseudo-polynomial — polynomial in n and W, but W can be exponential in the number of input bits. (Naive brute force is O(2ⁿ) — check all subsets.)' },
    { question: 'MCQ: Which of the following CANNOT be solved with DP?\n A) Fibonacci\n B) 0/1 Knapsack\n C) Finding a cycle in a graph\n D) LCS', solution: 'C) Finding a cycle in a graph — this is a graph traversal problem (DFS/BFS), not an optimization or counting problem with overlapping subproblems. Fibonacci, 0/1 Knapsack, and LCS all have well-known DP formulations.' },
    { question: 'Trace 0/1 Knapsack: items [(w=1,v=1), (w=3,v=4), (w=4,v=5)], W=4.', solution: 'dp[i][w] table (rows=items 0-3, cols=capacity 0-4):\ndp[0][*]=0. Item 1 (w=1,v=1): dp[1][w]=0,1,1,1,1. Item 2 (w=3,v=4): dp[2][0..2]=0,1,1; dp[2][3]=max(1,dp[1][0]+4)=4; dp[2][4]=max(1,dp[1][1]+4)=5. Item 3 (w=4,v=5): dp[3][0..3]=0,1,1,4; dp[3][4]=max(5,dp[2][0]+5)=5. Answer: dp[3][4]=5. Optimal: item 2 (v=4) + item 1 (v=1) = 5.' },
    { question: 'Interview: Explain when to use DP vs greedy vs divide-and-conquer.', solution: 'Use Divide-and-Conquer when subproblems are independent (merge sort, binary search) — no memoization needed. Use Greedy when local optimum = global optimum (activity selection, Huffman, Dijkstra) — O(n log n) and simple. Use DP when: (1) subproblems overlap AND (2) optimal substructure holds but greedy fails (0/1 knapsack, LCS, edit distance, matrix chain). Decision: try greedy first (simpler, faster) — if it fails on a counterexample, use DP. Key test: can you prove the greedy choice is always safe? If not, DP.' },
  ],
  exampleProblems: [],
}

export default function DynamicProgrammingPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
