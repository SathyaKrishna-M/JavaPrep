'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiLink, FiZap, FiCode, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Constraint Propagation',
  explanationSections: [
    {
      title: '1️⃣ The Idea: Reduce Before You Search',
      icon: <FiLink className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Constraint propagation</span> uses constraints to reduce the domains of variables <em>before</em> or <em>during</em> search. The key insight: if a value is impossible, remove it from the domain now — saving exponential backtracking later.</p>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Types of Consistency</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li><strong>Node consistency:</strong> Every value in a variable's domain satisfies its unary constraints</li>
              <li><strong>Arc consistency:</strong> For every value of X, there exists at least one compatible value for Y</li>
              <li><strong>Path consistency:</strong> Extends arc consistency to triples of variables</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Arc Consistency — AC-3',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">An arc (X, Y) is <span className="text-cyan-400 font-semibold">arc-consistent</span> if for every value x in domain(X), there exists some value y in domain(Y) such that the constraint between X and Y is satisfied.</p>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-2">AC-3 Algorithm</p>
            <pre className="text-green-300 text-sm font-mono">{`Initialize queue with all arcs (Xi, Xj)
While queue is not empty:
  (Xi, Xj) = REMOVE-FIRST(queue)
  if REVISE(Xi, Xj):
    if domain(Xi) is empty: return FAILURE
    for each Xk neighbor of Xi (except Xj):
      add (Xk, Xi) to queue

REVISE(Xi, Xj):
  removed = False
  for x in domain(Xi):
    if no value y in domain(Xj) satisfies constraint(Xi=x, Xj=y):
      remove x from domain(Xi)
      removed = True
  return removed`}</pre>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Complexity</p>
            <p className="text-gray-300 text-sm">AC-3 runs in O(cd³) where c = number of constraints, d = max domain size. Each arc (Xi, Xj) can be added to queue at most d times (once per Xi value removed). Each REVISE call is O(d²).</p>
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`from collections import deque

def ac3(variables, domains, constraints):
    queue = deque([(xi, xj) for xi in variables for xj in constraints.get(xi,[])])

    while queue:
        xi, xj = queue.popleft()
        if revise(domains, xi, xj, constraints):
            if not domains[xi]:
                return False  # domain wiped out
            for xk in constraints.get(xi, []):
                if xk != xj:
                    queue.append((xk, xi))
    return True

def revise(domains, xi, xj, constraints):
    removed = False
    for x in list(domains[xi]):
        if not any(satisfies(xi, x, xj, y, constraints)
                   for y in domains[xj]):
            domains[xi].remove(x)
            removed = True
    return removed`}</pre>
        </div>
      ),
    },
    {
      title: '3️⃣ Forward Checking',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Forward checking</span> is a simpler form of constraint propagation used during search. When a value is assigned to variable Xi, check all unassigned neighbors Xj and remove values from domain(Xj) that are inconsistent with Xi's assignment.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Forward Checking</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Check only arcs (neighbor, assigned_var)</li>
                <li>Detects failure one step ahead</li>
                <li>Lightweight and fast</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">MAC (Maintaining Arc Consistency)</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Run full AC-3 after each assignment</li>
                <li>Detects failures further in advance</li>
                <li>More computation per node</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-400 text-sm">In practice, MAC is the strongest and usually most efficient for hard problems. Forward checking is a good balance for easier problems.</p>
        </div>
      ),
    },
    {
      title: '4️⃣ Trace: Map Coloring with AC-3',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Australia map coloring: WA, NT, SA must all have different colors. Initial domains: all = {'{R,G,B}'}.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Step</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Arc Processed</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Action</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['1','Assign WA=Red','domain(WA) = {R}'],
                  ['2','Forward check NT','Remove R from domain(NT) → {G,B}'],
                  ['3','Forward check SA','Remove R from domain(SA) → {G,B}'],
                  ['4','Assign NT=Green','domain(NT) = {G}'],
                  ['5','Forward check SA re: NT','Remove G from domain(SA) → {B}'],
                  ['6','SA = Blue (forced!)','No backtracking needed'],
                ].map(([s,a,r]) => (
                  <tr key={s}><td className="px-4 py-2 text-gray-400 border border-slate-700">{s}</td><td className="px-4 py-2 text-violet-300 border border-slate-700">{a}</td><td className="px-4 py-2 text-green-300 border border-slate-700">{r}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm">Constraint propagation solved SA without ever explicitly searching its values!</p>
        </div>
      ),
    },
    {
      title: '5️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Node consistency:</strong> Remove values violating unary constraints</li>
            <li><strong>Arc consistency (AC-3):</strong> For each arc, remove values with no support in neighbor's domain</li>
            <li><strong>Forward checking:</strong> Lightweight — check neighbors of newly assigned variable</li>
            <li><strong>MAC:</strong> Full AC-3 after each assignment — strongest propagation</li>
            <li>Domain wipeout (empty domain) signals failure early → prune search tree</li>
            <li>AC-3 complexity: O(cd³)</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is arc consistency?', solution: 'Arc (Xi, Xj) is arc-consistent if for every value x in domain(Xi), there exists at least one value y in domain(Xj) that satisfies the constraint between Xi and Xj. AC-3 enforces this for all arcs.' },
    { question: 'What is the difference between forward checking and MAC?', solution: 'Forward checking only checks arcs from newly assigned variable to its unassigned neighbors (one hop). MAC runs full AC-3 propagation which cascades through all affected arcs, detecting failures much farther in advance.' },
    { question: 'What happens in AC-3 when a domain becomes empty?', solution: 'If removing values makes domain(Xi) empty, AC-3 returns FAILURE immediately — no assignment exists that satisfies all constraints. This triggers backtracking in the search.' },
    { question: 'MCQ: AC-3 runs in time:\n A) O(n²)\n B) O(cd³)\n C) O(d^n)\n D) O(n!)', solution: 'B) O(cd³) — c constraints, each arc revisited at most d times (once per removed value), each REVISE is O(d²).' },
    { question: 'MCQ: Forward checking is a special case of:\n A) Arc consistency\n B) Path consistency\n C) Node consistency\n D) Global consistency', solution: 'A) Arc consistency — it enforces arc consistency only on arcs involving the most recently assigned variable (not all arcs).' },
    { question: 'Why is constraint propagation important even when backtracking is available?', solution: 'Constraint propagation detects failures early — before fully committing to an assignment — avoiding exponential wasted search. Without propagation, backtracking only detects failures after full assignments are made, exploring many more nodes.' },
    { question: 'Interview: In Sudoku solving, how does constraint propagation reduce the problem?', solution: 'When a cell is assigned a digit, that digit is removed from all row, column, and 3×3-box neighbors\' domains. If any neighbor\'s domain shrinks to one value, that value is forced and triggers further propagation. Often, hard Sudoku puzzles can be solved entirely by propagation without any search.' },
  ],
  exampleProblems: [],
}

export default function ConstraintPropagationPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
