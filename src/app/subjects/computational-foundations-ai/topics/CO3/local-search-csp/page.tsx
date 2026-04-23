'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiActivity, FiTrendingUp, FiCode, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Local Search for CSP',
  explanationSections: [
    {
      title: '1️⃣ When to Use Local Search',
      icon: <FiActivity className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Systematic backtracking search guarantees a solution but can be slow. <span className="text-cyan-400 font-semibold">Local search</span> starts with a complete (possibly inconsistent) assignment and iteratively repairs constraint violations. It is the method of choice for large CSPs where approximate or fast solutions are acceptable.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Use Local Search When</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Problem is very large (millions of variables)</li>
                <li>Any solution is needed quickly</li>
                <li>Problem is over-constrained (near-solutions ok)</li>
                <li>Optimisation rather than constraint satisfaction</li>
              </ul>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-semibold mb-2">Use Backtracking When</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Need to prove no solution exists</li>
                <li>All solutions are required</li>
                <li>Small to medium problem size</li>
                <li>Hard constraints must all be satisfied</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Min-Conflicts Algorithm',
      icon: <FiTrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Min-conflicts</span>: start with a random complete assignment, then repeatedly pick a conflicted variable and reassign it to the value that minimises the number of constraint violations.</p>
          <PyCode>{`import random

def min_conflicts(variables, domains, constraints, max_steps=10000):
    # Random complete initial assignment
    assignment = {v: random.choice(list(domains[v])) for v in variables}

    for step in range(max_steps):
        # Find all conflicted variables
        conflicted = [v for v in variables if conflicts(v, assignment, constraints) > 0]

        if not conflicted:
            return assignment  # Solution found!

        # Pick a random conflicted variable
        var = random.choice(conflicted)

        # Assign value minimising conflicts
        best_val = min(domains[var],
                       key=lambda val: try_conflicts(var, val, assignment, constraints))
        assignment[var] = best_val

    return None  # No solution found in max_steps

def conflicts(var, assignment, constraints):
    return sum(1 for neighbor in constraints.get(var, [])
               if assignment.get(neighbor) == assignment[var])`}</PyCode>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-300 font-semibold mb-1">Performance on N-Queens</p>
            <p className="text-gray-300 text-sm">Min-conflicts solves the million-queens problem in an average of 50 steps! Systematic backtracking would take astronomical time. The sparse constraint structure of n-queens makes the landscape easy to navigate.</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Hill Climbing',
      icon: <FiTrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Hill climbing</span> iteratively moves to the best neighbouring state. The objective is to minimise constraint violations (h = number of conflicts).</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Local Maximum', 'All neighbours are worse — stuck, not at global optimum', 'red'],
              ['Plateau', 'Many neighbours have equal value — random walk needed', 'amber'],
              ['Ridge', 'Diagonal path; no single step improves — restart needed', 'blue'],
            ].map(([t,d,c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-300 text-sm"><strong className="text-cyan-400">Solutions:</strong> Random restarts (try many random starting points) and sideways moves (allow equal-cost moves to escape plateaus).</p>
        </div>
      ),
    },
    {
      title: '4️⃣ Simulated Annealing',
      icon: <FiActivity className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Simulated annealing</span> allows uphill moves (worsening) with a probability that decreases over time (temperature T). This allows escape from local optima while converging to a good solution.</p>
          <PyCode>{`import math, random

def simulated_annealing(problem, schedule):
    current = problem.initial_state()
    T = schedule(0)  # initial temperature

    for t in range(1, 100000):
        T = schedule(t)
        if T <= 0:
            return current  # frozen
        neighbor = problem.random_neighbor(current)
        delta_e = problem.value(neighbor) - problem.value(current)
        if delta_e > 0:
            current = neighbor  # always accept improvements
        else:
            # Accept worse move with probability e^(ΔE/T)
            if random.random() < math.exp(delta_e / T):
                current = neighbor
    return current

# Temperature schedule: exponential cooling
def schedule(t, T0=100, alpha=0.995):
    return T0 * (alpha ** t)`}</PyCode>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-1">Key Insight</p>
            <p className="text-gray-300 text-sm">At high T: almost any move is accepted (random walk — explores). At low T: almost only improvements accepted (hill climbing — exploits). The cooling schedule bridges exploration and exploitation.</p>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Real-World CSP Applications',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['University Timetabling', 'Variables: courses. Domains: time slots + rooms. Constraints: no room conflict, no professor double-booking, student overlap minimised.'],
              ['Job-Shop Scheduling', 'Variables: task-machine assignments. Domains: time windows. Constraints: machine capacity, precedence, deadlines.'],
              ['Frequency Assignment', 'Variables: transmitters. Domains: frequencies. Constraints: nearby transmitters must differ to avoid interference.'],
              ['Sudoku / Puzzle Solving', 'Variables: cells. Domains: 1-9. Constraints: row, column, box uniqueness (AllDiff global constraint).'],
            ].map(([t,d]) => (
              <div key={t} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <p className="text-cyan-300 font-semibold mb-1">{t}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the min-conflicts algorithm?', solution: 'Start with a random complete assignment. Repeat: (1) find all conflicted variables, (2) randomly pick one, (3) reassign it to the value that minimises the number of constraint violations. Stop when no conflicts remain or step limit reached.' },
    { question: 'Why does min-conflicts work so well on n-queens?', solution: 'The n-queens problem has many solutions and a well-structured landscape — from any random starting point, the constraint violation count can be reduced with a local repair. The density of solutions allows min-conflicts to find one in O(n) average steps.' },
    { question: 'What is a local maximum in hill climbing for CSP?', solution: 'A state where all neighbouring assignments have equal or more constraint violations. The algorithm is stuck and cannot improve — but this state is not a global optimum (solution). Solutions: random restarts, simulated annealing.' },
    { question: 'MCQ: Simulated annealing accepts a worse move with probability:\n A) 1 always\n B) 0 always\n C) e^(ΔE/T)\n D) 1/T', solution: 'C) e^(ΔE/T) — when ΔE < 0 (worse move) and T > 0, the acceptance probability is e^(ΔE/T), decreasing as T decreases or |ΔE| increases.' },
    { question: 'MCQ: Which local search technique is guaranteed to find a solution if the problem has one?\n A) Hill climbing\n B) Min-conflicts\n C) Simulated annealing with correct schedule\n D) None of the above', solution: 'D) None of the above — local search methods are not complete. They may get stuck in local optima. Only systematic backtracking guarantees completeness.' },
    { question: 'Compare backtracking and min-conflicts for a 1000-queens problem.', solution: 'Backtracking would take astronomical time — the search space is (1000!)/(constraint violations). Min-conflicts solves 1000-queens in about 50 steps on average by directly repairing violations. Local search is dramatically better for large, well-structured CSPs with many solutions.' },
    { question: 'Interview: Why is the cooling schedule critical in simulated annealing?', solution: 'Too fast cooling → freezes in a local optimum (not enough exploration). Too slow cooling → takes too long to converge. A good schedule (e.g., exponential decay T0·α^t) must balance exploration at high T with exploitation at low T. Theoretical convergence to global optimum requires logarithmically slow cooling — impractical, so empirical schedules are used.' },
  ],
  exampleProblems: [],
}

export default function LocalSearchCSPPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
