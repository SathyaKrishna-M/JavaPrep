'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiAlignLeft, FiTrendingUp, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import DPGrid from '@/components/visuals/DPGrid'

const content = {
  title: 'LCS & LIS',
  explanationSections: [
    {
      title: '1️⃣ Longest Common Subsequence (LCS)',
      icon: <FiAlignLeft className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Given strings X and Y, find the length of their longest common subsequence (characters in order, not necessarily contiguous). Example: LCS("ABCBDAB", "BDCAB") = 4 ("BCAB" or "BDAB").</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Recurrence:</p>
            <p className="text-gray-300">dp[i][j] = length of LCS of X[0..i-1] and Y[0..j-1]</p>
            <p className="text-gray-300">         = dp[i-1][j-1] + 1        if X[i-1] == Y[j-1]</p>
            <p className="text-gray-300">         = max(dp[i-1][j], dp[i][j-1])   otherwise</p>
          </div>
          <PyCode language="java">{`// LCS — O(mn) time, O(mn) space
int lcs(String X, String Y) {
    int m = X.length(), n = Y.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X.charAt(i - 1) == Y.charAt(j - 1))
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

// Reconstruct LCS string by backtracking through dp table
String reconstructLCS(int[][] dp, String X, String Y, int i, int j) {
    if (i == 0 || j == 0) return "";
    if (X.charAt(i - 1) == Y.charAt(j - 1))
        return reconstructLCS(dp, X, Y, i - 1, j - 1) + X.charAt(i - 1);
    else if (dp[i - 1][j] > dp[i][j - 1])
        return reconstructLCS(dp, X, Y, i - 1, j);
    else
        return reconstructLCS(dp, X, Y, i, j - 1);
}`}</PyCode>
          <DPGrid
            title="LCS DP table — X='ABCD', Y='ACBD' — result dp[4][4]=3"
            colHeaders={['dp', '""', 'A', 'C', 'B', 'D']}
            rowHeaders={['""', 'A', 'B', 'C', 'D']}
            data={[
              [{ value: '0', color: 'default' }, { value: '0', color: 'default' }, { value: '0', color: 'default' }, { value: '0', color: 'default' }, { value: '0', color: 'default' }],
              [{ value: '0', color: 'default' }, { value: '1', color: 'highlight' }, { value: '1', color: 'default' }, { value: '1', color: 'default' }, { value: '1', color: 'default' }],
              [{ value: '0', color: 'default' }, { value: '1', color: 'default' }, { value: '1', color: 'default' }, { value: '2', color: 'highlight' }, { value: '2', color: 'default' }],
              [{ value: '0', color: 'default' }, { value: '1', color: 'default' }, { value: '2', color: 'highlight' }, { value: '2', color: 'default' }, { value: '2', color: 'default' }],
              [{ value: '0', color: 'default' }, { value: '1', color: 'default' }, { value: '2', color: 'default' }, { value: '2', color: 'default' }, { value: '3', color: 'result' }],
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ LCS Table Trace',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">X = "ABCD", Y = "ACBD" — LCS = "ACD" or "ABD" (length 3)</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-mono">
              <thead><tr className="bg-slate-800/50">
                <th className="px-3 py-2 text-cyan-400 border border-slate-700">dp</th>
                <th className="px-3 py-2 text-cyan-400 border border-slate-700">""</th>
                <th className="px-3 py-2 text-cyan-400 border border-slate-700">A</th>
                <th className="px-3 py-2 text-cyan-400 border border-slate-700">C</th>
                <th className="px-3 py-2 text-cyan-400 border border-slate-700">B</th>
                <th className="px-3 py-2 text-cyan-400 border border-slate-700">D</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['""', '0','0','0','0','0'],
                  ['A',  '0','1','1','1','1'],
                  ['B',  '0','1','1','2','2'],
                  ['C',  '0','1','2','2','2'],
                  ['D',  '0','1','2','2','3'],
                ].map(([row, ...cells]) => (
                  <tr key={row}>
                    <td className="px-3 py-2 text-violet-300 border border-slate-700">{row}</td>
                    {cells.map((c, i) => (
                      <td key={i} className="px-3 py-2 text-amber-300 border border-slate-700 text-center">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Longest Increasing Subsequence (LIS)',
      icon: <FiTrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Find the length of the longest strictly increasing subsequence of an array. Example: [10,9,2,5,3,7,101,18] → LIS = [2,3,7,101], length 4.</p>
          <PyCode language="java">{`// LIS O(n²) DP — dp[i] = LIS ending at index i
int lisDP(int[] arr) {
    int n = arr.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);  // each element is a subsequence of length 1

    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (arr[j] < arr[i])
                dp[i] = Math.max(dp[i], dp[j] + 1);

    return Arrays.stream(dp).max().getAsInt();
}

// LIS O(n log n) — patience sorting with binary search
int lisOptimal(int[] arr) {
    List<Integer> tails = new ArrayList<>();
    // tails[i] = smallest tail element of all IS of length i+1

    for (int x : arr) {
        int pos = Collections.binarySearch(tails, x);
        if (pos < 0) pos = -(pos + 1);  // insertion point

        if (pos == tails.size())
            tails.add(x);      // extend longest IS
        else
            tails.set(pos, x); // replace to keep tails minimal
    }
    return tails.size();  // length of LIS (NOT the actual sequence)
}`}</PyCode>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">O(n log n) Insight</p>
            <p className="text-gray-300 text-sm">Maintain a "tails" array where tails[i] is the smallest possible tail for an increasing subsequence of length i+1. Binary search finds where to place each new element. The array length = LIS length. This is a classic patience sorting approach.</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>LCS:</strong> dp[i][j] = LCS of X[0..i-1], Y[0..j-1] — match → diagonal+1, else max of left/up</li>
            <li><strong>LCS complexity:</strong> O(mn) time, O(mn) space — reducible to O(min(m,n)) space</li>
            <li><strong>LCS application:</strong> diff tools (git diff), DNA sequence comparison, spell checkers</li>
            <li><strong>LIS O(n²):</strong> dp[i] = LIS ending at i — check all j &lt; i where arr[j] &lt; arr[i]</li>
            <li><strong>LIS O(n log n):</strong> patience sort + binary search on tails array</li>
            <li><strong>LIS application:</strong> stock trading, box stacking, Russian doll envelopes</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Write the LCS recurrence and explain each case.', solution: 'dp[i][j] = length of LCS of X[0..i-1] and Y[0..j-1]. Base: dp[0][j]=dp[i][0]=0. If X[i-1]==Y[j-1]: dp[i][j]=dp[i-1][j-1]+1 — the matching characters extend the LCS by 1. Else: dp[i][j]=max(dp[i-1][j], dp[i][j-1]) — either skip the last char of X (go up) or skip the last char of Y (go left), take the better result.' },
    { question: 'What is the time and space complexity of LCS and how can space be optimized?', solution: 'Time: O(mn) — two nested loops over string lengths m and n. Space: O(mn) for the full table. Optimization: since dp[i][j] only depends on dp[i-1][j], dp[i][j-1], and dp[i-1][j-1], we can use two 1D arrays (current row and previous row) → O(min(m,n)) space. Trade-off: reconstruction requires the full table or Hirschberg\'s O(mn) time O(min(m,n)) space algorithm.' },
    { question: 'Explain the O(n log n) LIS algorithm using the tails array.', solution: 'Maintain tails[] where tails[k] = smallest possible tail of an IS of length k+1. For each element x: binary search tails for the first value ≥ x (lower_bound). If found at position pos: replace tails[pos]=x (keeps tails minimal, enabling longer extensions). If not found (x > all tails): append x (extends LIS). Result: tails.size() = LIS length. The tails array is always sorted, enabling binary search. Note: tails is NOT the actual LIS — just a maintenance structure.' },
    { question: 'MCQ: LCS of "AGGTAB" and "GXTXAYB" has length:\n A) 3\n B) 4\n C) 5\n D) 6', solution: 'B) 4 — LCS = "GTAB". Verification: G matches at positions (1,0), T at (2,3), A at (4,5), B at (5,6). Length 4. The DP table fills to dp[6][7]=4.' },
    { question: 'MCQ: LIS of [3, 10, 2, 1, 20] is:\n A) 2\n B) 3\n C) 4\n D) 5', solution: 'B) 3 — [3,10,20] or [2,20] or [1,20]. Longest = [3,10,20] with length 3. Using O(n²): dp=[1,2,1,1,3]. Max=3.' },
    { question: 'Trace LCS dp table for X="ABAB", Y="BABA". What is the LCS?', solution: 'dp table (5×5, 0-indexed rows="",A,B,A,B; cols="",B,A,B,A):\ndp[1][1]=0(A≠B), dp[1][2]=1(A=A), dp[1][3]=1, dp[1][4]=1(A=A → max?... 1). dp[2][1]=1(B=B), dp[2][2]=1, dp[2][3]=2(B=B? No, B≠A)... Full trace: dp[4][4]=3. LCS = "BAB" or "ABA" (length 3).' },
    { question: 'Interview: How is LCS used in git diff and why is it important?', solution: 'Git diff computes the diff between two file versions by finding their LCS (treating lines as characters). Lines in the LCS appear in both versions unchanged (context). Lines only in version A are marked as deletions (−). Lines only in version B are marked as additions (+). Git uses the Myers diff algorithm — an O(nd) time, O(d) space variant optimized for minimal edit scripts where d = number of differences. For large files, it uses patience diff (a smarter line-matching heuristic). LCS-based diffing underlies merge conflict resolution, code review tools, and patch generation.' },
  ],
  exampleProblems: [],
}

export default function LCSLISPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
