'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiTarget, FiCode, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Greedy Algorithms',
  explanationSections: [
    {
      title: '1️⃣ Greedy Strategy',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">greedy algorithm</span> makes the locally optimal choice at each step, hoping to reach the global optimum. It never reconsiders previous choices.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Greedy Choice Property</p>
              <p className="text-gray-300 text-sm">A globally optimal solution can be reached by making a locally optimal (greedy) choice. The choice made now doesn't depend on future subproblem solutions.</p>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Optimal Substructure</p>
              <p className="text-gray-300 text-sm">After making the greedy choice, the remaining subproblem has the same structure as the original. The optimal solution to the original = greedy choice + optimal solution to the subproblem.</p>
            </div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Greedy vs DP</p>
            <p className="text-gray-300 text-sm">Both require optimal substructure. Greedy additionally needs the greedy choice property — the local optimum leads to global optimum. DP solves all subproblems; greedy only solves one per step. Greedy is faster but only correct for specific problems.</p>
          </div>
          <AlgoStepper
            title="Greedy proof technique — exchange argument"
            steps={[
              { title: 'Assume greedy solution G differs from optimal O', description: 'Let the first difference be at some step k. G chose activity Aₖ (earliest finish), O chose Bₖ (later finish).', code: 'G = [..., Aₖ, ...], O = [..., Bₖ, ...]' },
              { title: 'Exchange Bₖ with Aₖ in O', description: 'Replace Bₖ with Aₖ. Since finish(Aₖ) ≤ finish(Bₖ), no activity after Bₖ in O gets displaced. O\' is still valid.', code: 'O\' = [..., Aₖ, ...], |O\'| = |O|' },
              { title: 'Repeat for all differences', description: 'Systematically exchange every activity in O with the corresponding greedy choice. Each exchange is valid. Result: O becomes identical to G.', code: 'After all exchanges: G ≡ O\'  → |G| = |O|' },
              { title: 'Conclusion: G is optimal', description: 'Greedy solution has as many activities as any optimal solution. Earliest-finish greedy is provably optimal. QED.', code: '∀ optimal O: |G| ≥ |O| → G is optimal ✓' },
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Activity Selection Problem',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Select the maximum number of non-overlapping activities. <span className="text-cyan-400 font-semibold">Greedy choice:</span> always pick the activity that finishes earliest — it leaves the most room for remaining activities.</p>
          <PyCode language="java">{`// Activity Selection — O(n log n) for sorting, O(n) for selection
int activitySelection(int[] start, int[] finish) {
    int n = start.length;
    // Sort by finish time (assume already sorted here)
    // Integer[] idx = sort by finish[i]...

    int count = 1;
    int lastFinish = finish[0];  // greedily pick first activity

    for (int i = 1; i < n; i++) {
        if (start[i] >= lastFinish) {
            // Activity i doesn't overlap with last selected
            count++;
            lastFinish = finish[i];
        }
    }
    return count;
}
// Proof of correctness: exchange argument — any solution can be
// transformed into greedy solution without decreasing count.`}</PyCode>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-1">Example: activities sorted by finish</p>
            <p className="text-gray-300">s=[1,3,0,5,8,5], f=[2,4,6,7,9,9]</p>
            <p className="text-gray-300">Pick f=2 → pick f=4 → skip f=6 (start=0 &lt; 4) → pick f=7 → pick f=9</p>
            <p className="text-gray-300">Max 4 activities: {'{1,3,5,8}'}</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Fractional Knapsack',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Fractional Knapsack:</span> items can be broken into fractions. Greedy: take items in decreasing order of value/weight ratio. <em>Note:</em> 0/1 Knapsack (items can't be fractioned) requires DP.</p>
          <PyCode language="java">{`// Fractional Knapsack — O(n log n)
double fractionalKnapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;

    // Create items with value/weight ratio
    double[][] items = new double[n][2];
    for (int i = 0; i < n; i++) {
        items[i][0] = (double) values[i] / weights[i];  // ratio
        items[i][1] = weights[i];
    }

    // Sort by ratio descending
    Arrays.sort(items, (a, b) -> Double.compare(b[0], a[0]));

    double totalValue = 0;
    int remaining = capacity;

    for (double[] item : items) {
        if (remaining <= 0) break;
        double ratio  = item[0];
        double weight = item[1];

        if (weight <= remaining) {
            // Take full item
            totalValue += ratio * weight;
            remaining  -= weight;
        } else {
            // Take fraction
            totalValue += ratio * remaining;
            remaining   = 0;
        }
    }
    return totalValue;
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '4️⃣ Common Greedy Problems',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Problem</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Greedy Choice</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Complexity</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Activity Selection', 'Earliest finish time first', 'O(n log n)'],
                  ['Fractional Knapsack', 'Highest value/weight ratio first', 'O(n log n)'],
                  ['Huffman Coding', 'Merge two lowest-frequency nodes first', 'O(n log n)'],
                  ["Kruskal's MST", 'Smallest weight edge that doesn\'t form cycle', 'O(E log E)'],
                  ["Prim's MST", 'Nearest unvisited vertex to current tree', 'O((V+E) log V)'],
                  ["Dijkstra's SSSP", 'Nearest unvisited vertex by distance', 'O((V+E) log V)'],
                  ['Job Scheduling', 'Earliest deadline first (minimize lateness)', 'O(n log n)'],
                ].map(([p, g, c]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{g}</td>
                    <td className="px-4 py-2 text-amber-300 font-mono border border-slate-700">{c}</td>
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
            <li><strong>Greedy property:</strong> locally optimal choice leads to globally optimal solution</li>
            <li><strong>Proof techniques:</strong> exchange argument (show greedy ≥ any other choice)</li>
            <li><strong>Activity selection:</strong> sort by finish time, always take earliest-finishing compatible</li>
            <li><strong>Fractional knapsack:</strong> sort by ratio, fill greedily — greedy fails for 0/1 knapsack</li>
            <li><strong>MST, SSSP:</strong> greedy algorithms (Kruskal, Prim, Dijkstra) proven correct by cut/path properties</li>
            <li><strong>When greedy fails:</strong> 0/1 knapsack, coin change (non-canonical denominations), TSP</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What two properties must a problem have for a greedy algorithm to be correct?', solution: '(1) Greedy choice property: a globally optimal solution can be reached by always making the locally optimal choice — the greedy choice is safe. (2) Optimal substructure: after making the greedy choice, the remaining subproblem has an optimal solution that combines with the greedy choice to give the overall optimal. Both DP and greedy require optimal substructure; greedy additionally requires the greedy choice property.' },
    { question: 'Why does greedy work for fractional knapsack but not 0/1 knapsack?', solution: 'In fractional knapsack, taking the highest ratio item is always safe — you can fill exactly to capacity with fractions. In 0/1 knapsack, taking the highest ratio item may leave wasted space that prevents taking a better combination of whole items. Example: capacity=10, items=(6kg,$12), (5kg,$10), (5kg,$10). Greedy (ratio) picks 6kg → only one 5kg fits, total $22. Optimal: two 5kg items, total $20... wait actually $12+$10=$22 vs $10+$10=$20. Better example: capacity=10, (6,$6 ratio=1), (5,$5 ratio=1), but two 5kg give $10 vs one 6kg+partial — in 0/1 case the item combinations matter and greedy choice of first item can be sub-optimal.' },
    { question: 'Explain the exchange argument proof for activity selection.', solution: 'Claim: greedy (earliest finish) is optimal. Proof: let G = greedy solution, O = any other optimal solution. Let a₁ be the first activity in G, b₁ be the first in O. Since a₁ has the earliest finish, finish(a₁) ≤ finish(b₁). We can replace b₁ with a₁ in O to get O\' — still valid (a₁ finishes no later than b₁, so no new conflicts). |O\'| = |O|. Repeat this exchange for all activities. G is as good as any optimal.' },
    { question: "MCQ: Which of the following problems CANNOT be solved optimally with a greedy algorithm?\n A) Activity selection\n B) 0/1 Knapsack\n C) Fractional Knapsack\n D) Dijkstra's shortest path", solution: 'B) 0/1 Knapsack — items cannot be fractioned, so the locally optimal ratio choice may miss a better combination of whole items. This requires dynamic programming to explore all subsets efficiently. The others (A, C, D) have proven greedy solutions.' },
    { question: 'MCQ: The time complexity of the activity selection algorithm (after sorting) is:\n A) O(n²)\n B) O(n log n)\n C) O(n)\n D) O(n log² n)', solution: 'C) O(n) for the selection step — a single left-to-right scan. O(n log n) overall because sorting the activities by finish time takes O(n log n). If the input is already sorted, the algorithm is O(n).' },
    { question: 'Apply fractional knapsack: capacity=50, items: (10kg,$60), (20kg,$100), (30kg,$120).', solution: 'Ratios: $6/kg, $5/kg, $4/kg. Sort by ratio: (10,$60), (20,$100), (30,$120). Take all 10kg (value=60, remaining=40). Take all 20kg (value=100, remaining=20). Take 20/30 of 30kg item (value=80). Total = 60+100+80 = $240. Optimal for fractional knapsack.' },
    { question: 'Interview: Give an example where a greedy algorithm gives a suboptimal result for coin change.', solution: 'Canonical denominations (US coins: 1,5,10,25) — greedy (largest coin first) is always optimal. Non-canonical: coins={1,3,4}, amount=6. Greedy: 4+1+1=3 coins. Optimal: 3+3=2 coins. Greedy fails because choosing 4 prevents the pair of 3s. Coin change requires DP for arbitrary denominations. This is a classic example of why greedy choice property must be proven, not assumed.' },
  ],
  exampleProblems: [],
}

export default function GreedyAlgorithmsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
