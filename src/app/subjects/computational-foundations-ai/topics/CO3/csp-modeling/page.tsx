'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiGrid, FiShare2, FiCode, FiCpu, FiList, FiZap, FiLayers, FiTarget } from 'react-icons/fi'

const content = {
  title: 'CSP Modeling & Backtracking Search',
  explanationSections: [
    {
      title: '1️⃣ What is a Constraint Satisfaction Problem?',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            A <span className="text-cyan-400 font-semibold">Constraint Satisfaction Problem (CSP)</span> is a mathematical framework used to model combinatorial problems where you must find an assignment of values to variables such that all given constraints are satisfied. CSPs are a cornerstone of AI because many real-world problems — scheduling, planning, configuration, puzzle solving — fit naturally into this formulation.
          </p>
          <p className="text-gray-300">
            Formally, a CSP is defined as a triple <span className="text-yellow-400 font-mono">(X, D, C)</span>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
              <p className="text-cyan-300 font-bold mb-2">X — Variables</p>
              <p className="text-gray-300 text-sm">A set of <span className="text-cyan-400">n variables</span>: X = &#123;X₁, X₂, …, Xₙ&#125;. Each variable represents an unknown that must be assigned a value.</p>
            </div>
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
              <p className="text-violet-300 font-bold mb-2">D — Domains</p>
              <p className="text-gray-300 text-sm">A set of domains D = &#123;D₁, D₂, …, Dₙ&#125; where <span className="text-violet-400">Dᵢ</span> is the finite set of possible values for variable Xᵢ.</p>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 font-bold mb-2">C — Constraints</p>
              <p className="text-gray-300 text-sm">A set of constraints C = &#123;C₁, C₂, …, Cₘ&#125;. Each constraint <span className="text-emerald-400">Cᵢ</span> restricts the allowable combinations of values for a subset of variables.</p>
            </div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg border-l-4 border-yellow-500">
            <p className="text-yellow-300 font-semibold mb-1">Key Terminology</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
              <li><span className="text-yellow-400">Assignment:</span> A mapping of values to variables — partial if only some variables are assigned, complete if all are.</li>
              <li><span className="text-yellow-400">Consistent assignment:</span> No constraint is violated by the current (partial or complete) assignment.</li>
              <li><span className="text-yellow-400">Solution:</span> A complete and consistent assignment — every variable has a value and every constraint is satisfied.</li>
            </ul>
          </div>
          <p className="text-gray-300">
            The power of the CSP framework is <span className="text-cyan-400 font-semibold">problem-independent inference</span>: the same backtracking engine + constraint propagation machinery applies to map coloring, Sudoku, scheduling, and circuit layout without modification.
          </p>
        </div>
      ),
    },
    {
      title: '2️⃣ Types of Constraints',
      icon: <FiList className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Constraints are classified by the number of variables they involve (their <span className="text-cyan-400 font-semibold">arity</span>), and by their structure.
          </p>
          <div className="space-y-3">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-bold mb-1">Unary Constraints (arity 1)</p>
              <p className="text-gray-300 text-sm">Involve a single variable. Example: <span className="text-blue-400 font-mono">X₁ ≠ red</span>. These are the simplest — they directly restrict the domain of one variable. Enforcing them is called <span className="text-blue-400">node consistency</span>.</p>
            </div>
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
              <p className="text-violet-300 font-bold mb-1">Binary Constraints (arity 2)</p>
              <p className="text-gray-300 text-sm">Involve exactly two variables. Example: <span className="text-violet-400 font-mono">X₁ ≠ X₂</span>. They are the most common type, and can be represented as edges in a <span className="text-violet-400">constraint graph</span>. Algorithms like AC-3 specifically target binary constraints.</p>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-bold mb-1">Higher-Order Constraints (arity ≥ 3)</p>
              <p className="text-gray-300 text-sm">Involve three or more variables. Example: <span className="text-amber-400 font-mono">X + Y + Z = 10</span>. Can sometimes be decomposed into binary constraints by introducing auxiliary variables, but this increases problem size.</p>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 font-bold mb-1">Global Constraints</p>
              <p className="text-gray-300 text-sm">Involve an arbitrary number of variables and capture commonly occurring patterns. The most famous is <span className="text-emerald-400 font-mono">AllDifferent(X₁, X₂, …, Xₙ)</span> — all variables must take distinct values. Sudoku uses this extensively. Global constraints allow specialized, highly efficient propagation algorithms.</p>
            </div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg border-l-4 border-cyan-500">
            <p className="text-cyan-300 font-semibold mb-2">Constraint Representation Methods</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
              <li><span className="text-cyan-400">Extensional (table):</span> List all allowed (or forbidden) tuples explicitly. Works for small domains.</li>
              <li><span className="text-cyan-400">Intensional (formula):</span> A logical/arithmetic expression. E.g., <span className="font-mono">X₁ + X₂ ≤ 5</span>. More compact for large domains.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Constraint Graph',
      icon: <FiShare2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            A <span className="text-cyan-400 font-semibold">constraint graph</span> provides a visual and structural representation of a CSP. The structure of the graph fundamentally affects how hard the problem is to solve.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-600">
              <p className="text-gray-200 font-semibold mb-2">Binary CSP Graph</p>
              <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
                <li><span className="text-cyan-400">Nodes</span> = Variables (X₁ … Xₙ)</li>
                <li><span className="text-cyan-400">Edges</span> = Binary constraints between two variables</li>
                <li>An edge between Xᵢ and Xⱼ means there is at least one constraint involving both</li>
              </ul>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-600">
              <p className="text-gray-200 font-semibold mb-2">Hypergraph (for higher-order)</p>
              <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
                <li>Nodes = Variables</li>
                <li><span className="text-violet-400">Hyperedges</span> = Constraints involving 3+ variables</li>
                <li>Can be converted to binary via dual graph transformation</li>
              </ul>
            </div>
          </div>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-2">Graph Structure → Problem Difficulty</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
              <li><span className="text-violet-400">Tree-structured CSP:</span> Can be solved in O(n·d²) time — polynomial! No backtracking needed.</li>
              <li><span className="text-violet-400">Nearly tree-structured:</span> Cutset conditioning can reduce to tree form.</li>
              <li><span className="text-violet-400">Dense / cyclic graph:</span> Generally NP-complete; requires backtracking with intelligent heuristics.</li>
            </ul>
          </div>
          <p className="text-gray-300">
            The <span className="text-yellow-400 font-semibold">treewidth</span> of the constraint graph determines the worst-case complexity: problems with treewidth <em>w</em> can be solved in O(n·d^(w+1)) time. This motivates decomposition algorithms used in industrial CSP solvers.
          </p>
        </div>
      ),
    },
    {
      title: '4️⃣ Classic CSP Examples — Full Formulations',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-300">Understanding standard CSP formulations builds intuition for modeling new problems. Let's examine four canonical examples in full detail.</p>

          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-bold mb-3">🗺 Map Coloring — Australia</p>
            <p className="text-gray-300 text-sm mb-2">Assign colors to 7 regions (WA, NT, SA, Q, NSW, V, T) so no two adjacent regions share the same color.</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
              <li><span className="text-cyan-400">Variables:</span> X = &#123;WA, NT, SA, Q, NSW, V, T&#125;</li>
              <li><span className="text-cyan-400">Domains:</span> D = &#123;red, green, blue&#125; for each variable</li>
              <li><span className="text-cyan-400">Constraints:</span> WA≠NT, WA≠SA, NT≠SA, NT≠Q, SA≠Q, SA≠NSW, SA≠V, Q≠NSW, NSW≠V — 9 binary inequality constraints</li>
              <li><span className="text-cyan-400">Constraint graph:</span> 7 nodes, 9 edges</li>
            </ul>
          </div>

          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-bold mb-3">👑 8-Queens Problem</p>
            <p className="text-gray-300 text-sm mb-2">Place 8 queens on an 8×8 chessboard so no two queens attack each other.</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
              <li><span className="text-violet-400">Variables:</span> Q₁, Q₂, …, Q₈ where Qᵢ = row of queen in column i</li>
              <li><span className="text-violet-400">Domains:</span> &#123;1, 2, 3, 4, 5, 6, 7, 8&#125; for each Qᵢ</li>
              <li><span className="text-violet-400">Constraints:</span> For all i ≠ j: Qᵢ ≠ Qⱼ (no same row), |Qᵢ − Qⱼ| ≠ |i − j| (no same diagonal)</li>
              <li><span className="text-violet-400">Total:</span> C(8,2) = 28 binary constraints</li>
            </ul>
          </div>

          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
            <p className="text-emerald-300 font-bold mb-3">🔢 Sudoku</p>
            <p className="text-gray-300 text-sm mb-2">Fill a 9×9 grid with digits 1–9 respecting row, column, and box constraints.</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
              <li><span className="text-emerald-400">Variables:</span> 81 cells X[i][j] (i=row, j=col)</li>
              <li><span className="text-emerald-400">Domains:</span> Pre-filled cells have domain &#123;k&#125; (singleton), empty cells have domain &#123;1,…,9&#125;</li>
              <li><span className="text-emerald-400">Constraints:</span> AllDiff on each row (9), each column (9), each 3×3 box (9) → 27 AllDiff global constraints</li>
              <li><span className="text-emerald-400">Equivalent to:</span> C(9,2)×27 = 972 binary ≠ constraints</li>
            </ul>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-bold mb-3">📅 Job Scheduling</p>
            <p className="text-gray-300 text-sm mb-2">Schedule n jobs on m machines with deadlines and resource constraints.</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
              <li><span className="text-amber-400">Variables:</span> start[j] for each job j — the start time</li>
              <li><span className="text-amber-400">Domains:</span> &#123;0, 1, …, T_max&#125; time slots</li>
              <li><span className="text-amber-400">Constraints:</span> Precedence (job A before job B), resource (no two jobs sharing same machine overlap), deadline (start[j] + duration[j] ≤ deadline[j])</li>
              <li><span className="text-amber-400">Global:</span> Cumulative constraint: Σ resource[j] ≤ capacity for overlapping jobs</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Backtracking Search — Algorithm & Intuition',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Backtracking search</span> is depth-first search with <span className="text-yellow-400">constraint checking at each step</span>. It is the foundational algorithm for solving CSPs and is far more efficient than naive generate-and-test.
          </p>
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-600">
            <p className="text-gray-200 font-semibold mb-3">Algorithm Pseudocode</p>
            <pre className="text-green-300 text-sm font-mono overflow-x-auto whitespace-pre">{`function BACKTRACKING-SEARCH(csp):
    return BACKTRACK({}, csp)

function BACKTRACK(assignment, csp):
    if assignment is complete:
        return assignment                    # All variables assigned consistently

    var = SELECT-UNASSIGNED-VARIABLE(csp, assignment)

    for value in ORDER-DOMAIN-VALUES(var, assignment, csp):
        if value is consistent with assignment:
            add {var = value} to assignment
            inferences = INFERENCE(csp, var, value)   # e.g., forward checking

            if inferences ≠ failure:
                add inferences to assignment
                result = BACKTRACK(assignment, csp)
                if result ≠ failure:
                    return result

            remove {var = value} and inferences from assignment

    return failure   # All values tried — backtrack`}</pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
              <p className="text-cyan-300 font-semibold mb-2">Key Design Choices</p>
              <ul className="text-gray-300 text-sm space-y-1 list-disc ml-4">
                <li><span className="text-cyan-400">SELECT-UNASSIGNED-VARIABLE:</span> Which variable to assign next? (MRV, Degree)</li>
                <li><span className="text-cyan-400">ORDER-DOMAIN-VALUES:</span> Which value to try first? (LCV)</li>
                <li><span className="text-cyan-400">INFERENCE:</span> What can we deduce? (forward checking, AC-3)</li>
              </ul>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 font-semibold mb-2">Commutativity Property</p>
              <p className="text-gray-300 text-sm">The order in which we assign variables does <em>not</em> affect the final set of solutions — only efficiency. This means we can <span className="text-emerald-400">fix a variable ordering</span> and systematically try all values, avoiding redundant search paths that differ only in variable ordering.</p>
            </div>
          </div>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-2">Why Backtracking Beats Generate-and-Test</p>
            <p className="text-gray-300 text-sm">Generate-and-test tries <em>every complete assignment</em> and checks it — for n variables with domain size d, that's dⁿ candidates. For 8-Queens: 8⁸ = 16,777,216 candidates! Backtracking <span className="text-violet-400">prunes entire subtrees</span> as soon as a partial assignment violates a constraint. With good heuristics, 8-Queens is solved with only ~100 node expansions.</p>
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ Python: Backtracking Solver for Map Coloring',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Below is a complete, well-commented backtracking CSP solver applied to the Australia map-coloring problem.</p>
          <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
              <span className="text-sm font-bold text-gray-300">map_coloring_csp.py</span>
            </div>
            <pre className="text-green-300 text-sm font-mono p-4 overflow-x-auto whitespace-pre">{`# ===== CSP Backtracking Solver: Australia Map Coloring =====

# Define the CSP
variables = ['WA', 'NT', 'SA', 'Q', 'NSW', 'V', 'T']

domains = {var: ['red', 'green', 'blue'] for var in variables}

# Adjacency list: each pair must have different colors
neighbors = {
    'WA':  ['NT', 'SA'],
    'NT':  ['WA', 'SA', 'Q'],
    'SA':  ['WA', 'NT', 'Q', 'NSW', 'V'],
    'Q':   ['NT', 'SA', 'NSW'],
    'NSW': ['SA', 'Q', 'V'],
    'V':   ['SA', 'NSW'],
    'T':   []  # Tasmania is an island — no constraints
}

def is_consistent(var, value, assignment, neighbors):
    """Check if assigning 'value' to 'var' violates any constraint."""
    for neighbor in neighbors[var]:
        if neighbor in assignment and assignment[neighbor] == value:
            return False
    return True

def select_unassigned_variable(variables, assignment):
    """Simple: pick first unassigned variable (naive ordering)."""
    for var in variables:
        if var not in assignment:
            return var
    return None

def backtrack(assignment, variables, domains, neighbors):
    """Core recursive backtracking algorithm."""
    # Base case: all variables assigned
    if len(assignment) == len(variables):
        return assignment

    # Choose the next variable to assign
    var = select_unassigned_variable(variables, assignment)

    # Try each value in the domain
    for value in domains[var]:
        if is_consistent(var, value, assignment, neighbors):
            assignment[var] = value          # Make assignment
            result = backtrack(assignment, variables, domains, neighbors)
            if result is not None:
                return result                # Solution found!
            del assignment[var]              # Undo assignment (backtrack)

    return None  # No valid value found — trigger backtracking

# ===== Run the solver =====
solution = backtrack({}, variables, domains, neighbors)

if solution:
    print("Solution found!")
    for region, color in solution.items():
        print(f"  {region:4s} -> {color}")
else:
    print("No solution exists.")

# ===== Expected Output =====
# Solution found!
#   WA   -> red
#   NT   -> green
#   SA   -> blue
#   Q    -> red
#   NSW  -> green
#   V    -> red
#   T    -> red`}</pre>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-2">Trace of First Few Steps</p>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal ml-4">
              <li>Assign WA=red → consistent (no neighbors assigned yet)</li>
              <li>Assign NT=red → inconsistent! NT is adjacent to WA=red</li>
              <li>Assign NT=green → consistent</li>
              <li>Assign SA=red → inconsistent! SA adjacent to WA=red</li>
              <li>Assign SA=green → inconsistent! SA adjacent to NT=green</li>
              <li>Assign SA=blue → consistent → continue deeper…</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      title: '7️⃣ CSP Structure & Complexity',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The <span className="text-cyan-400 font-semibold">structure of the constraint graph</span> has a profound impact on how efficiently a CSP can be solved.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300 border-collapse">
              <thead>
                <tr className="bg-slate-700">
                  <th className="border border-slate-600 p-2 text-cyan-300">Graph Type</th>
                  <th className="border border-slate-600 p-2 text-cyan-300">Complexity</th>
                  <th className="border border-slate-600 p-2 text-cyan-300">Algorithm</th>
                  <th className="border border-slate-600 p-2 text-cyan-300">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-800/40">
                  <td className="border border-slate-600 p-2">Tree (no cycles)</td>
                  <td className="border border-slate-600 p-2 text-emerald-400">O(n·d²) — polynomial</td>
                  <td className="border border-slate-600 p-2">Arc consistency + topological order</td>
                  <td className="border border-slate-600 p-2">Tasmania in map coloring</td>
                </tr>
                <tr className="bg-slate-800/60">
                  <td className="border border-slate-600 p-2">Near-tree (small cutset)</td>
                  <td className="border border-slate-600 p-2 text-yellow-400">O(dᶜ · n·d²)</td>
                  <td className="border border-slate-600 p-2">Cutset conditioning</td>
                  <td className="border border-slate-600 p-2">Small scheduling problems</td>
                </tr>
                <tr className="bg-slate-800/40">
                  <td className="border border-slate-600 p-2">General (cyclic)</td>
                  <td className="border border-slate-600 p-2 text-red-400">NP-complete (worst case)</td>
                  <td className="border border-slate-600 p-2">Backtracking + heuristics</td>
                  <td className="border border-slate-600 p-2">Sudoku, n-Queens</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-2">Tree-Structured CSP Algorithm</p>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal ml-4">
              <li>Pick any variable as root; compute topological ordering of the constraint graph</li>
              <li>Run arc consistency from leaves to root (backward pass) to reduce domains</li>
              <li>Assign values from root to leaves (forward pass) — always a consistent choice exists if arc consistency passed</li>
            </ol>
            <p className="text-gray-400 text-sm mt-2 italic">This eliminates backtracking entirely for tree-structured problems!</p>
          </div>
        </div>
      ),
    },
    {
      title: '8️⃣ Commutativity & Variable Ordering',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            CSP search is <span className="text-cyan-400 font-semibold">commutative</span>: the set of solutions is the same regardless of the variable ordering. However, the <span className="text-yellow-400">size of the search tree explored</span> depends critically on the order.
          </p>
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-600">
            <p className="text-gray-200 font-semibold mb-2">Why Fix a Variable Ordering?</p>
            <p className="text-gray-300 text-sm">In standard backtracking, at each step we pick <em>one</em> variable and try all its values. By fixing a total ordering on variables, we ensure the search tree has depth exactly n (number of variables), and each level expands at most d branches (domain size). This gives worst-case O(dⁿ) nodes — still exponential, but organized and prunable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
              <p className="text-violet-300 font-semibold mb-2">Static Ordering</p>
              <p className="text-gray-300 text-sm">Decide variable order once before search begins. Simple but misses opportunities to adapt to what has been learned during search.</p>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
              <p className="text-emerald-300 font-semibold mb-2">Dynamic Ordering (Preferred)</p>
              <p className="text-gray-300 text-sm">Choose the next variable adaptively based on the current state of domains (e.g., MRV heuristic). Can reduce search by orders of magnitude on typical instances.</p>
            </div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-2">Analogy: Solving a Crossword Puzzle</p>
            <p className="text-gray-300 text-sm">If you try to fill in the hardest, most-constrained word first (fewest possible matches), you find problems early. If you start with easy words, you might spend hours before discovering the puzzle has no solution — a waste of effort. CSP heuristics encode this intuition formally.</p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: "Formally define a CSP and give the (X, D, C) formulation for the 4-Queens problem.",
      solution: "A CSP is a triple (X, D, C) where X = set of variables, D = set of domains (one per variable), C = set of constraints. For 4-Queens: X = {Q1, Q2, Q3, Q4} where Qi = row of queen in column i. D = {1,2,3,4} for each variable. C = for all i≠j: Qi≠Qj (no same row) AND |Qi−Qj|≠|i−j| (no same diagonal). Total: C(4,2)=6 pairs × 2 constraints = 12 binary constraints."
    },
    {
      question: "What is the difference between a unary, binary, and global constraint? Give one example of each in the context of university course scheduling.",
      solution: "Unary: restricts one variable. Example: Course CS101 must be in room R1 (Room[CS101] = R1). Binary: restricts two variables. Example: CS101 and CS102 cannot be in the same time slot (Time[CS101] ≠ Time[CS102]). Global: restricts an arbitrary number of variables. Example: AllDifferent(Time[CS101], Time[CS102], ..., Time[CSn]) — all courses have distinct time slots. Global constraints enable specialized propagation algorithms that are more efficient than decomposing into binary constraints."
    },
    {
      question: "How does backtracking search differ from generate-and-test? What is the computational advantage?",
      solution: "Generate-and-test: enumerate all dⁿ complete assignments, check each for constraint satisfaction. For n=8, d=8: 8⁸ = 16,777,216 candidates. Backtracking: build assignments incrementally (variable by variable) and check constraints on partial assignments. As soon as a partial assignment violates a constraint, the entire subtree below is pruned — none of those d^(n-k) completions are explored. On 8-Queens, backtracking with heuristics explores ~100 nodes vs 16M for generate-and-test — a speedup of ~160,000×."
    },
    {
      question: "What is the commutativity property of CSPs, and why does it allow us to fix a variable ordering without losing completeness?",
      solution: "Commutativity: the final solution set is identical regardless of the order in which variables are assigned. This is because constraints are symmetric — {X1=red, X2=blue} is the same assignment as {X2=blue, X1=red}. Therefore, fixing one canonical variable ordering does not miss any solutions — it just determines the shape of the search tree. Commutativity also means we don't need to consider permutations of variable assignments, reducing the search space from n!×dⁿ to dⁿ."
    },
    {
      question: "Describe the constraint graph for Australia map coloring. How many nodes and edges does it have? What does the structure tell us about difficulty?",
      solution: "Nodes: 7 (WA, NT, SA, Q, NSW, V, T). Edges: 9 (WA-NT, WA-SA, NT-SA, NT-Q, SA-Q, SA-NSW, SA-V, Q-NSW, NSW-V). Tasmania (T) has no edges — it is isolated and trivially satisfiable. SA is the most connected node (degree 5), making it the most constrained. The graph has cycles (WA-NT-SA-WA is a 3-cycle), so it is not a tree, making it NP-hard in general. However, with only 7 variables and 3 colors, it is small enough to solve instantly with backtracking."
    },
    {
      question: "Write the complete CSP formulation for Sudoku. How many variables, constraints, and what global constraint is used?",
      solution: "Variables: 81 cells X[i][j] for i,j ∈ {1,...,9}. Domains: pre-filled cells have domain {k} (singleton), empty cells have domain {1,...,9}. Constraints: 27 AllDifferent constraints — one for each row (9), each column (9), each 3×3 box (9). Equivalent binary decomposition: each AllDiff(9 vars) decomposes into C(9,2)=36 binary ≠ constraints, giving 27×36=972 binary constraints total. Global AllDiff allows stronger propagation (Hall's theorem) than binary ≠ constraints alone."
    },
    {
      question: "If a CSP has a tree-structured constraint graph with n variables each having domain size d, what is the time complexity to solve it, and what algorithm achieves this?",
      solution: "Time complexity: O(n·d²). Algorithm: (1) Root the tree and compute a topological ordering. (2) Backward pass — from leaves to root, apply arc consistency: for each arc (parent, child), remove values from parent's domain that have no consistent value in child's domain. After backward pass, all domains are arc-consistent. (3) Forward pass — assign values from root to leaves; at each step, at least one consistent value exists (guaranteed by backward pass). This eliminates backtracking entirely, giving O(n) arcs each processed in O(d²) time = O(n·d²) total."
    },
    {
      question: "In the backtracking algorithm, when does 'failure' propagate upward? Trace through what happens when no valid value exists for a variable.",
      solution: "Failure propagates when the inner loop over all domain values finds no consistent value (all values are inconsistent with the current assignment). The function returns 'None' (failure). The calling frame receives this failure, undoes its own assignment (removes the {var=value} entry), and continues to the next value in its own loop. If its loop is also exhausted, it returns failure to its parent frame. This cascade continues until either a frame finds a consistent value (search continues forward) or the root frame exhausts all values (no solution exists). This is exactly depth-first search with backtracking."
    },
    {
      question: "What is cutset conditioning, and how does it allow near-tree-structured CSPs to be solved more efficiently?",
      solution: "A cycle cutset is a set of variables S such that removing S from the constraint graph leaves a tree. Cutset conditioning: (1) Try all dˢ assignments to variables in S (where |S|=c). (2) For each assignment, remove inconsistent values from remaining variables' domains. (3) Solve the remaining tree-structured subproblem in O(n·d²). Total complexity: O(dᶜ · n·d²). If the cutset is small (c ≪ n), this is far better than O(dⁿ) backtracking. Finding a minimum cutset is NP-hard, but good heuristics exist."
    },
    {
      question: "Model a job-shop scheduling problem with 3 jobs (A, B, C) and 2 machines (M1, M2) as a CSP. Each job requires both machines in a specific order, and no two jobs can use the same machine simultaneously.",
      solution: "Variables: start_A_M1, start_A_M2, start_B_M1, start_B_M2, start_C_M1, start_C_M2 (start times on each machine). Domains: {0, 1, ..., T_max} integer time slots. Constraints: (1) Precedence within jobs: if job A needs M1 before M2, then start_A_M1 + dur_A_M1 ≤ start_A_M2 (and similarly for B, C). (2) No-overlap on each machine: for each pair of jobs using M1, their intervals must not overlap — e.g., start_A_M1 + dur_A_M1 ≤ start_B_M1 OR start_B_M1 + dur_B_M1 ≤ start_A_M1 (disjunctive constraint). These disjunctive constraints can be handled via auxiliary binary variables or the global Disjunctive/NoOverlap constraint in modern CSP solvers."
    },
  ],
  exampleProblems: [],
}

export default function CSPModelingPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
