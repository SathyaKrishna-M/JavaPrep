'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiGrid, FiEdit, FiBarChart2, FiCheckCircle } from 'react-icons/fi'
import DPGrid from '@/components/visuals/DPGrid'
import AlgoStepper from '@/components/visuals/AlgoStepper'

const content = {
  title: 'Matrix Chain Multiplication & Edit Distance',
  explanationSections: [
    {
      title: '1️⃣ Matrix Chain Multiplication (MCM)',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Given a chain of n matrices A₁A₂...Aₙ, find the optimal parenthesization to minimize the number of scalar multiplications. Matrix multiplication is associative — the order of parenthesization affects cost but not result.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Cost formula & recurrence:</p>
            <p className="text-gray-300">Cost to multiply Aᵢ(p×q) × Aⱼ(q×r) = p × q × r scalar multiplications</p>
            <p className="text-gray-300">dp[i][j] = min cost to multiply Aᵢ through Aⱼ</p>
            <p className="text-gray-300">         = min over k in [i,j-1]: dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j]</p>
            <p className="text-gray-300">Base: dp[i][i] = 0 (single matrix, no multiplication)</p>
          </div>
          <PyCode language="java">{`// Matrix Chain Multiplication — O(n³) time, O(n²) space
// dims[i] = dimensions: matrix i has dims[i-1] rows, dims[i] cols
int mcm(int[] dims) {
    int n = dims.length - 1;  // number of matrices
    int[][] dp = new int[n + 1][n + 1];

    // Fill by chain length (l)
    for (int len = 2; len <= n; len++) {          // chain length
        for (int i = 1; i <= n - len + 1; i++) {  // starting matrix
            int j = i + len - 1;                   // ending matrix
            dp[i][j] = Integer.MAX_VALUE;

            for (int k = i; k < j; k++) {          // split point
                int cost = dp[i][k] + dp[k + 1][j]
                         + dims[i - 1] * dims[k] * dims[j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    return dp[1][n];
}`}</PyCode>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Example</p>
            <p className="text-gray-300 text-sm">A₁(10×30), A₂(30×5), A₃(5×60). Two orderings: (A₁A₂)A₃ = 10×30×5 + 10×5×60 = 1500+3000 = 4500. A₁(A₂A₃) = 30×5×60 + 10×30×60 = 9000+18000 = 27000. Optimal: (A₁A₂)A₃ at 4500 ops.</p>
          </div>
          <AlgoStepper
            title="MCM — solving A₁(10×30) × A₂(30×5) × A₃(5×60)"
            steps={[
              { title: 'Base case: single matrices cost 0', description: 'dp[i][i] = 0 for all i. A single matrix needs no multiplication.', code: 'dp[1][1]=0, dp[2][2]=0, dp[3][3]=0' },
              { title: 'Length 2: pairs of adjacent matrices', description: 'dp[1][2]: A₁(10×30)×A₂(30×5) = 10×30×5 = 1500. dp[2][3]: A₂(30×5)×A₃(5×60) = 30×5×60 = 9000.', code: 'dp[1][2]=1500, dp[2][3]=9000' },
              { title: 'Length 3: full chain (A₁A₂A₃)', description: 'Split at k=1: dp[1][1]+dp[2][3]+10×30×60 = 0+9000+18000=27000. Split at k=2: dp[1][2]+dp[3][3]+10×5×60 = 1500+0+3000=4500.', code: 'dp[1][3] = min(27000, 4500) = 4500' },
              { title: 'Optimal parenthesization: (A₁A₂)A₃', description: 'Minimum 4500 scalar multiplications achieved by computing A₁×A₂ first, then multiplying the result by A₃.', code: '→ (A₁A₂)A₃: 1500 + 3000 = 4500 ops ✓' },
            ]}
          />
          <DPGrid
            title="MCM dp table for A₁(10×30), A₂(30×5), A₃(5×60) — dims=[10,30,5,60]"
            colHeaders={['dp[i][j]', 'j=1', 'j=2', 'j=3']}
            rowHeaders={['i=1', 'i=2', 'i=3']}
            data={[
              [{ value: '0', color: 'default' }, { value: '1500', color: 'highlight' }, { value: '4500', color: 'result' }],
              [{ value: '-', color: 'header' }, { value: '0', color: 'default' }, { value: '9000', color: 'highlight' }],
              [{ value: '-', color: 'header' }, { value: '-', color: 'header' }, { value: '0', color: 'default' }],
            ]}
          />
        </div>
      ),
    },
    {
      title: '2️⃣ Edit Distance (Levenshtein)',
      icon: <FiEdit className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Find the minimum number of edit operations (insert, delete, substitute) to transform string X into string Y. Also called <span className="text-cyan-400 font-semibold">Levenshtein distance</span>.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Recurrence:</p>
            <p className="text-gray-300">dp[i][j] = edit distance between X[0..i-1] and Y[0..j-1]</p>
            <p className="text-gray-300">         = dp[i-1][j-1]                   if X[i-1] == Y[j-1]</p>
            <p className="text-gray-300">         = 1 + min(dp[i-1][j],            delete from X</p>
            <p className="text-gray-300">                   dp[i][j-1],            insert into X</p>
            <p className="text-gray-300">                   dp[i-1][j-1])          substitute</p>
          </div>
          <PyCode language="java">{`// Edit Distance — O(mn) time, O(mn) space
int editDistance(String X, String Y) {
    int m = X.length(), n = Y.length();
    int[][] dp = new int[m + 1][n + 1];

    // Base cases: convert empty string to Y (or X to empty)
    for (int i = 0; i <= m; i++) dp[i][0] = i;  // delete i chars
    for (int j = 0; j <= n; j++) dp[0][j] = j;  // insert j chars

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X.charAt(i - 1) == Y.charAt(j - 1))
                dp[i][j] = dp[i - 1][j - 1];    // no operation needed
            else
                dp[i][j] = 1 + Math.min(
                    Math.min(dp[i - 1][j],        // delete X[i-1]
                             dp[i][j - 1]),        // insert Y[j-1]
                    dp[i - 1][j - 1]);             // substitute
        }
    }
    return dp[m][n];
}`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Edit Distance Table Trace',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">X = "HORSE", Y = "ROS" — edit distance = 3</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-mono">
              <thead><tr className="bg-slate-800/50">
                <th className="px-3 py-2 text-cyan-400 border border-slate-700">dp</th>
                {['""','R','O','S'].map(c => <th key={c} className="px-3 py-2 text-cyan-400 border border-slate-700">{c}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['""','0','1','2','3'],
                  ['H', '1','1','2','3'],
                  ['O', '2','2','1','2'],
                  ['R', '3','2','2','2'],
                  ['S', '4','3','3','2'],
                  ['E', '5','4','4','3'],
                ].map(([row, ...cells]) => (
                  <tr key={row}>
                    <td className="px-3 py-2 text-violet-300 border border-slate-700">{row}</td>
                    {cells.map((c, i) => <td key={i} className="px-3 py-2 text-amber-300 border border-slate-700 text-center">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm">Edit distance = 3. Operations: H→R (substitute), delete O, delete R, S→S (match), delete E → actually: delete H, R stays, delete R... Backtrace for exact operations.</p>
        </div>
      ),
    },
    {
      title: '4️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>MCM:</strong> dp[i][j] = min multiplications for Aᵢ..Aⱼ — try all split points k</li>
            <li><strong>MCM complexity:</strong> O(n³) time, O(n²) space — 3 nested loops over i, j, k</li>
            <li><strong>Edit distance:</strong> dp[i][j] = min ops to transform X[0..i-1] to Y[0..j-1]</li>
            <li><strong>3 operations:</strong> insert (→ left), delete (↑ up), substitute (↗ diagonal)</li>
            <li><strong>Edit distance apps:</strong> spell check, DNA alignment, plagiarism detection</li>
            <li><strong>Both are interval/string DP:</strong> build solutions from smaller subproblems</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Write the MCM recurrence and explain the split point k.', solution: 'dp[i][j] = min cost to compute Aᵢ × Aᵢ₊₁ × ... × Aⱼ. The key insight: any parenthesization splits the chain at some point k: (Aᵢ...Aₖ)(Aₖ₊₁...Aⱼ). Cost = dp[i][k] + dp[k+1][j] + p[i-1]×p[k]×p[j] (cost of multiplying the two resulting matrices). Try all k from i to j-1, take the minimum. Base: dp[i][i]=0.' },
    { question: 'Compute MCM cost for dims=[10,30,5,60] (3 matrices: 10×30, 30×5, 5×60).', solution: 'dp[1][1]=dp[2][2]=dp[3][3]=0. dp[1][2]: k=1: 10×30×5=1500. dp[2][3]: k=2: 30×5×60=9000. dp[1][3]: k=1: dp[1][1]+dp[2][3]+10×30×60=0+9000+18000=27000. k=2: dp[1][2]+dp[3][3]+10×5×60=1500+0+3000=4500. min=4500. Optimal: ((A₁A₂)A₃) with cost 4500.' },
    { question: 'What are the three edit operations and how do they appear in the dp recurrence?', solution: 'Delete: remove X[i-1] → cost = dp[i-1][j]+1 (we process one more char of X without advancing in Y). Insert: add Y[j-1] to X → cost = dp[i][j-1]+1 (advance in Y without consuming X). Substitute: replace X[i-1] with Y[j-1] → cost = dp[i-1][j-1]+1. If X[i-1]==Y[j-1]: free match → dp[i-1][j-1]. Take minimum of all applicable operations.' },
    { question: 'MCQ: Edit distance between "KITTEN" and "SITTING" is:\n A) 2\n B) 3\n C) 4\n D) 5', solution: 'B) 3 — operations: K→S (substitute), E→I (substitute), insert G at end: KITTEN→SITTEN→SITTIN→SITTING. 3 operations. This is the classic Levenshtein example.' },
    { question: 'MCQ: The time complexity of the Matrix Chain Multiplication DP is:\n A) O(n²)\n B) O(n² log n)\n C) O(n³)\n D) O(2ⁿ)', solution: 'C) O(n³) — three nested loops: outer loop over chain lengths (n), middle over starting positions (n), inner over split points (n). Each iteration is O(1). Total O(n³). Space O(n²) for the dp table.' },
    { question: 'Trace edit distance for X="CAT", Y="CUT".', solution: 'dp[0][0..3]=[0,1,2,3]. dp[1][0]=1, dp[1][1]: C=C → dp[0][0]=0. dp[1][2]: C≠U → min(dp[0][2],dp[1][1],dp[0][1])+1=min(2,0,1)+1=1. dp[1][3]: C≠T → min(dp[0][3],dp[1][2],dp[0][2])+1=min(3,1,2)+1=2. dp[2][0]=2, dp[2][1]:A≠C→min(1,2,0)+1=1. dp[2][2]:A≠U→min(1,1,1)+1=2. dp[2][3]:A≠T→min(2,2,1)+1=2. dp[3][0]=3, dp[3][1]:T≠C→min(2,3,1)+1=2. dp[3][2]:T≠U→min(2,2,2)+1=3. dp[3][3]:T=T→dp[2][2]=2. Answer: 1. Operation: substitute A→U.' },
    { question: 'Interview: How is edit distance used in spell checkers?', solution: 'Spell checkers compute edit distance between the misspelled word and dictionary words. Words within distance 1 or 2 are suggested. Optimizations: (1) BK-trees index dictionary by edit distance for O(k) lookup instead of O(n); (2) prefix filtering — if the prefix edit distance already exceeds threshold, prune early; (3) phonetic algorithms (Soundex, Metaphone) pre-filter candidates. Modern autocorrect also weighs by keyboard layout proximity (adjacent keys are likely typos) and language model probability (most likely intended word in context).' },
  ],
  exampleProblems: [],
}

export default function MatrixChainEditPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Data Structures & Algorithms 2"
      subjectHref="/subjects/data-structures-algorithms-2"
    />
  )
}
