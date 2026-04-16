'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiBarChart2, FiTarget, FiCheckCircle, FiCode } from 'react-icons/fi'

const content = {
  title: 'CSP Heuristics — Variable & Value Ordering',
  explanationSections: [
    {
      title: '1️⃣ Why Ordering Matters',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Backtracking is complete — given enough time it will find a solution. But the <span className="text-cyan-400 font-semibold">order</span> in which variables and values are tried can reduce the search tree size by orders of magnitude. The algorithm itself doesn't change — only the ordering.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Two Ordering Decisions</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li><strong>Which variable to assign next?</strong> → Variable ordering heuristics (MRV, Degree)</li>
              <li><strong>Which value to try first?</strong> → Value ordering heuristics (LCV)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ MRV — Minimum Remaining Values (Fail-First)',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">MRV</span> (also called "fail-first"): choose the variable with the <em>fewest legal values remaining</em> in its domain. Rationale: a variable with few options is most likely to fail — find that out first to prune the search tree early.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">MRV Example</p>
              <p className="text-gray-300 text-sm">After some assignments in map coloring:</p>
              <ul className="text-gray-300 text-sm space-y-1 mt-2 font-mono">
                <li>WA: domain = {'{R}'} ← size 1</li>
                <li>NT: domain = {'{G,B}'} ← size 2</li>
                <li>SA: domain = {'{B}'} ← size 1</li>
              </ul>
              <p className="text-gray-400 text-xs mt-2">MRV picks WA or SA first (both size 1)</p>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-semibold mb-2">Why Fail-First Works</p>
              <p className="text-gray-300 text-sm">By exploring variables most likely to fail first, we prune failed branches at the top of the tree (large subtrees) rather than deep (small subtrees). This minimises the total number of nodes explored.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Degree Heuristic (Tie-Breaking)',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">When multiple variables tie on MRV, <span className="text-cyan-400 font-semibold">Degree heuristic</span> breaks the tie: choose the variable involved in the most constraints with <em>unassigned</em> variables.</p>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-2">Rationale</p>
            <p className="text-gray-300 text-sm">A high-degree variable constrains many others. Assigning it first reduces the domains of the most neighbors, giving the most information about remaining variables early.</p>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`def select_variable(variables, assignment, domains, constraints):
    unassigned = [v for v in variables if v not in assignment]

    # MRV: fewest remaining values
    min_domain = min(len(domains[v]) for v in unassigned)
    mrv_vars = [v for v in unassigned if len(domains[v]) == min_domain]

    if len(mrv_vars) == 1:
        return mrv_vars[0]

    # Tie-break with Degree heuristic
    def degree(v):
        return sum(1 for n in constraints[v] if n not in assignment)
    return max(mrv_vars, key=degree)`}</pre>
        </div>
      ),
    },
    {
      title: '4️⃣ LCV — Least Constraining Value (Succeed-First)',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">LCV</span> (Least Constraining Value): when choosing a value for a variable, pick the value that <em>rules out the fewest choices</em> for neighboring variables. Try the most permissive value first.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Why Succeed-First for Values?</p>
            <p className="text-gray-300 text-sm">For variables, we want to fail fast (MRV). For values, once we've chosen a variable, we want to find a solution, so we try the value most likely to lead to a complete solution. LCV gives the best chance of succeeding without backtracking.</p>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`def order_values(var, assignment, domains, constraints):
    def conflicts(value):
        # Count values ruled out in all neighbors
        count = 0
        for neighbor in constraints.get(var, []):
            if neighbor not in assignment:
                count += sum(
                    1 for v in domains[neighbor]
                    if not is_consistent(neighbor, v, var, value)
                )
        return count

    # Sort by fewest conflicts (ascending)
    return sorted(domains[var], key=conflicts)`}</pre>
        </div>
      ),
    },
    {
      title: '5️⃣ Combined Strategy & Comparison',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The recommended combined strategy: <span className="text-cyan-400 font-semibold">MRV + Degree heuristic</span> for variable ordering, <span className="text-violet-400 font-semibold">LCV</span> for value ordering.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Heuristic</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Applies to</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Strategy</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Reason</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['MRV','Variable','Fail-first (min domain)','Prune failures early at top of tree'],
                  ['Degree','Variable (tie-break)','Max constraints','Propagates most information'],
                  ['LCV','Value','Succeed-first (min conflicts)','Best chance of completing solution'],
                ].map(([h,a,s,r]) => (
                  <tr key={h}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{h}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700">{a}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700">{s}</td>
                    <td className="px-4 py-2 text-gray-400 text-xs border border-slate-700">{r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the MRV heuristic and why is it called "fail-first"?', solution: 'MRV (Minimum Remaining Values) selects the variable with the fewest legal values in its domain. It\'s called fail-first because variables with few values are most likely to fail — detecting this early prunes large subtrees at the top of the search tree.' },
    { question: 'When is the Degree heuristic applied in CSP?', solution: 'As a tie-breaker when two or more variables have the same MRV (equal domain sizes). It selects the variable involved in the most constraints with unassigned variables, maximising the information gained from the assignment.' },
    { question: 'Why does LCV use "succeed-first" while MRV uses "fail-first"?', solution: 'For variables: we want to detect impossible subproblems early (fail-first). For values: once a variable is selected, we want to find an assignment that allows the rest of the problem to be solved (succeed-first). LCV tries the value that leaves the most options for neighbors.' },
    { question: 'MCQ: MRV stands for:\n A) Maximum Remaining Variables\n B) Minimum Remaining Values\n C) Maximum Relevant Variables\n D) Minimum Relevant Values', solution: 'B) Minimum Remaining Values.' },
    { question: 'MCQ: LCV selects the value that:\n A) Is smallest numerically\n B) Is largest numerically\n C) Rules out fewest choices for neighboring variables\n D) Rules out most choices for neighboring variables', solution: 'C) Rules out fewest choices for neighboring variables — it is the least constraining value.' },
    { question: 'In the 4-Queens problem, if row 1 has queen placed, and rows 2,3,4 have domains {2,4}, {1,3}, {2,4} respectively, which variable does MRV select?', solution: 'Row 3 (domain {1,3}) and rows 2,4 all have domain size 2 — MRV tie. Apply degree heuristic: whichever row has constraints with the most unassigned rows wins the tie-break.' },
    { question: 'Interview: Can MRV and LCV conflict? How do you handle it?', solution: 'They apply to different decisions: MRV chooses which variable, LCV chooses which value for that variable. They don\'t conflict — they are applied sequentially: first MRV selects the variable, then LCV orders the values to try for that variable.' },
  ],
  exampleProblems: [],
}

export default function CSPHeuristicsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
