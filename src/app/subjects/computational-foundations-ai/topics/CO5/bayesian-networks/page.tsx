'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiShare2, FiGrid, FiList, FiZap, FiCode, FiDatabase, FiLayers, FiCheckCircle } from 'react-icons/fi'

const content = {
  title: 'Bayesian Networks',
  explanationSections: [
    {
      title: '1️⃣ What is a Bayesian Network?',
      icon: <FiShare2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            A <span className="text-cyan-400 font-semibold">Bayesian Network (BN)</span> is a probabilistic graphical model that uses a <span className="text-yellow-300">Directed Acyclic Graph (DAG)</span> to represent a joint probability distribution over a set of random variables. Each node represents a random variable; each directed edge from X to Y represents that X is a direct cause or influence on Y.
          </p>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30 space-y-2 text-sm">
            <p className="text-cyan-300 font-semibold">Core Components:</p>
            <p className="text-gray-300"><span className="text-yellow-300">Nodes</span> — Random variables (discrete or continuous).</p>
            <p className="text-gray-300"><span className="text-yellow-300">Directed Edges</span> — Direct probabilistic dependencies. X → Y means "X directly influences Y."</p>
            <p className="text-gray-300"><span className="text-yellow-300">CPTs</span> — Each node has a Conditional Probability Table specifying P(node | parents).</p>
            <p className="text-gray-300"><span className="text-yellow-300">DAG constraint</span> — No directed cycles; this ensures the joint probability is well-defined.</p>
          </div>
          <p className="text-gray-300">
            The BN encodes the joint distribution as a product of local conditional distributions:
          </p>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <p className="text-purple-300 font-semibold mb-2">Joint Distribution Factorization:</p>
            <p className="text-gray-300 text-sm font-mono">P(X1, X2, ..., Xn) = Π P(Xi | Parents(Xi))</p>
          </div>
          <p className="text-gray-300">
            This factorization is the BN's fundamental advantage: instead of storing a full joint table of 2^n entries, we store only the CPTs — one per node — which is exponentially more compact for sparse dependency structures.
          </p>
        </div>
      ),
    },
    {
      title: '2️⃣ Conditional Independence & D-Separation',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The graph structure encodes <span className="text-cyan-400 font-semibold">conditional independence</span> relationships between variables. <span className="text-yellow-300 font-semibold">D-separation</span> (directed separation) is the graph-theoretic criterion for reading off these independences without doing any calculations.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500 space-y-3 text-sm">
            <p className="text-blue-300 font-semibold">Three canonical structures (triples):</p>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-yellow-300">Chain:</span> X → Y → Z — X and Z are independent given Y. Observing Y blocks the path.</p>
              <p><span className="text-yellow-300">Fork (Common Cause):</span> X ← Y → Z — X and Z are independent given Y. Y is a common cause.</p>
              <p><span className="text-yellow-300">Collider (V-structure):</span> X → Y ← Z — X and Z are independent. But observing Y (or its descendant) makes X and Z dependent — "explaining away."</p>
            </div>
          </div>
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">D-separation rule:</span> A set of nodes Z d-separates X from Y if every path between X and Y is blocked. A path is blocked if it contains a chain or fork where the middle node is in Z, or a collider where neither the collider nor any descendant is in Z.
          </p>
          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30 text-sm">
            <p className="text-emerald-300 font-semibold">Practical meaning:</p>
            <p className="text-gray-300">If X and Y are d-separated by Z, then X ⊥ Y | Z — they are conditionally independent given Z. This allows BNs to compactly represent complex probability distributions.</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ The Classic BN: Burglary-Alarm Network',
      icon: <FiShare2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The Burglary-Alarm network from Russell & Norvig's AIMA textbook is the canonical Bayesian Network example. It models a home alarm system that can be triggered by burglaries or earthquakes, and two neighbors (John, Mary) who may call if they hear the alarm.
          </p>
          <div className="bg-slate-800/60 p-4 rounded-lg border border-gray-600 font-mono text-sm text-gray-200">
            <p className="text-cyan-300 font-semibold mb-3">DAG Structure (arrows show causation):</p>
            <p className="text-gray-400">         [Burglary]    [Earthquake]</p>
            <p className="text-gray-400">              ↘           ↙</p>
            <p className="text-gray-400">              [Alarm]</p>
            <p className="text-gray-400">            ↙       ↘</p>
            <p className="text-gray-400">     [JohnCalls]  [MaryCalls]</p>
          </div>
          <p className="text-gray-300">
            Variables: B=Burglary, E=Earthquake, A=Alarm, J=JohnCalls, M=MaryCalls. All are Boolean (true/false).
          </p>
          <p className="text-gray-300">
            Dependencies encoded: Alarm depends on Burglary AND Earthquake. JohnCalls depends only on Alarm. MaryCalls depends only on Alarm. Burglary and Earthquake are independent root nodes (no parents).
          </p>
        </div>
      ),
    },
    {
      title: '4️⃣ Conditional Probability Tables (CPTs)',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Each node stores a <span className="text-cyan-400 font-semibold">Conditional Probability Table (CPT)</span> that lists P(node=true | all combinations of parent values). For root nodes (no parents), the CPT is just the prior probability.
          </p>
          <div className="bg-slate-800/60 p-5 rounded-lg border border-gray-600 space-y-4 text-sm font-mono text-gray-200">
            <div>
              <p className="text-yellow-300 font-semibold mb-1">Root nodes (priors):</p>
              <p>P(B=true) = 0.001    ← rare but possible</p>
              <p>P(E=true) = 0.002    ← earthquakes also rare</p>
            </div>
            <div>
              <p className="text-yellow-300 font-semibold mb-1">P(A=true | B, E):</p>
              <p className="text-gray-400">B=T, E=T → P(A) = 0.95</p>
              <p className="text-gray-400">B=T, E=F → P(A) = 0.94</p>
              <p className="text-gray-400">B=F, E=T → P(A) = 0.29</p>
              <p className="text-gray-400">B=F, E=F → P(A) = 0.001</p>
            </div>
            <div>
              <p className="text-yellow-300 font-semibold mb-1">P(J=true | A):</p>
              <p className="text-gray-400">A=T → P(J) = 0.90</p>
              <p className="text-gray-400">A=F → P(J) = 0.05</p>
            </div>
            <div>
              <p className="text-yellow-300 font-semibold mb-1">P(M=true | A):</p>
              <p className="text-gray-400">A=T → P(M) = 0.70</p>
              <p className="text-gray-400">A=F → P(M) = 0.01</p>
            </div>
          </div>
          <p className="text-gray-300">
            Total parameters stored: 1+1+4+2+2 = <span className="text-yellow-300">10 numbers</span>. A full joint table over 5 Boolean variables would need 2^5 - 1 = <span className="text-red-400">31 numbers</span>. The BN is more than 3× more compact here — and savings grow exponentially for larger networks.
          </p>
        </div>
      ),
    },
    {
      title: '5️⃣ Computing Joint Probabilities',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Using the factorization formula, we can compute any specific joint probability assignment by multiplying together the relevant CPT entries. Let's compute P(J=T, M=T, A=T, B=F, E=F):
          </p>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 space-y-2 text-sm font-mono">
            <p className="text-purple-300 font-semibold">Factorization:</p>
            <p className="text-gray-300">P(j,m,a,¬b,¬e)</p>
            <p className="text-gray-300">= P(¬b) · P(¬e) · P(a|¬b,¬e) · P(j|a) · P(m|a)</p>
            <p className="text-gray-400 mt-2">Substituting values:</p>
            <p className="text-gray-300">= (1-0.001) · (1-0.002) · 0.001 · 0.90 · 0.70</p>
            <p className="text-gray-300">= 0.999 × 0.998 × 0.001 × 0.90 × 0.70</p>
            <p className="text-gray-300">≈ 0.999 × 0.998 × 0.000630</p>
            <p className="text-gray-300">≈ 0.000628   (about 6.28 × 10⁻⁴)</p>
          </div>
          <p className="text-gray-300">
            This means there is roughly a 0.063% chance that John and Mary both call, the alarm is ringing, but neither a burglary nor earthquake caused it — it was a false alarm. This baseline is important: if John and Mary call, we need to update our beliefs about B and E via inference.
          </p>
        </div>
      ),
    },
    {
      title: '6️⃣ Compactness of Bayesian Networks',
      icon: <FiDatabase className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The power of BNs lies in their compact representation. Consider a network with n Boolean variables where each variable has at most k parents in the BN:
          </p>
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/30 space-y-2">
            <p className="text-indigo-300 font-semibold">Space Complexity Comparison:</p>
            <p className="text-gray-300 text-sm font-mono">Full joint table:      O(2^n)        entries</p>
            <p className="text-gray-300 text-sm font-mono">Bayesian Network:      O(n · 2^k)    entries</p>
            <p className="text-gray-400 text-sm mt-2">For n=30 variables, k=3 parents max:</p>
            <p className="text-gray-300 text-sm font-mono">Full joint:  2^30 ≈ 1 billion entries</p>
            <p className="text-gray-300 text-sm font-mono">BN:         30 × 8 = 240 entries</p>
          </div>
          <p className="text-gray-300">
            This exponential compression is possible because the BN only encodes <span className="text-cyan-400">local dependencies</span>. Each variable is conditionally independent of its non-descendants given its parents (the <span className="text-yellow-300">Markov blanket</span> property).
          </p>
          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30 text-sm">
            <p className="text-emerald-300 font-semibold">Markov Blanket of a node X:</p>
            <p className="text-gray-300">X is conditionally independent of all other nodes given: its parents, its children, and its children's other parents (co-parents). This set is the Markov Blanket of X.</p>
          </div>
        </div>
      ),
    },
    {
      title: '7️⃣ Building a Bayesian Network: Step-by-Step',
      icon: <FiList className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Building an effective BN requires domain knowledge to identify the correct causal structure. A poorly ordered BN is valid but may be unnecessarily complex (dense with extra edges). The process:
          </p>
          <div className="bg-slate-800/60 p-4 rounded-lg border border-gray-600 space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="text-cyan-400 font-bold min-w-6">1.</span>
              <div>
                <p className="text-yellow-300 font-semibold">Identify variables</p>
                <p className="text-gray-300">List all relevant random variables. Decide their domains (Boolean, discrete, continuous).</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-cyan-400 font-bold min-w-6">2.</span>
              <div>
                <p className="text-yellow-300 font-semibold">Order by causality</p>
                <p className="text-gray-300">Arrange variables so causes come before effects. This produces a sparse, natural graph.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-cyan-400 font-bold min-w-6">3.</span>
              <div>
                <p className="text-yellow-300 font-semibold">Draw edges</p>
                <p className="text-gray-300">For each variable Xi, select its minimal set of direct parents from earlier variables in the ordering.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-cyan-400 font-bold min-w-6">4.</span>
              <div>
                <p className="text-yellow-300 font-semibold">Specify CPTs</p>
                <p className="text-gray-300">Fill in P(Xi | Parents(Xi)) from domain experts, data, or both.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-cyan-400 font-bold min-w-6">5.</span>
              <div>
                <p className="text-yellow-300 font-semibold">Validate</p>
                <p className="text-gray-300">Check that the encoded independences match domain knowledge. Use data to refine parameter estimates.</p>
              </div>
            </div>
          </div>
          <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/30 text-sm">
            <p className="text-rose-300 font-semibold">Common Pitfall:</p>
            <p className="text-gray-300">Adding nodes in non-causal order (effects before causes) technically works but results in dense, hard-to-interpret networks with more parameters. Always follow causal ordering.</p>
          </div>
        </div>
      ),
    },
    {
      title: '8️⃣ Python: Simple BN Representation',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            We can represent the Burglary-Alarm BN using Python dictionaries to store CPTs and compute joint probabilities:
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm font-mono text-green-300 overflow-x-auto">
            <pre>{`# Bayesian Network: Burglary-Alarm example
# CPTs stored as nested dicts: node -> {parent_config: probability}

bn = {
    "Burglary":  {(): 0.001},          # P(B=T)
    "Earthquake": {(): 0.002},         # P(E=T)
    "Alarm": {
        (True,  True):  0.95,          # P(A=T | B=T, E=T)
        (True,  False): 0.94,          # P(A=T | B=T, E=F)
        (False, True):  0.29,          # P(A=T | B=F, E=T)
        (False, False): 0.001,         # P(A=T | B=F, E=F)
    },
    "JohnCalls": {(True,): 0.90, (False,): 0.05},
    "MaryCalls": {(True,): 0.70, (False,): 0.01},
}

def get_prob(cpt, parents_val, node_val):
    """Look up P(node=node_val | parents=parents_val)."""
    p_true = cpt[parents_val] if parents_val in cpt else cpt[()]
    return p_true if node_val else 1 - p_true

def joint_prob(b, e, a, j, m):
    """Compute P(B=b, E=e, A=a, J=j, M=m)."""
    p_b = get_prob(bn["Burglary"],  (),     b)
    p_e = get_prob(bn["Earthquake"], (),    e)
    p_a = get_prob(bn["Alarm"],     (b, e), a)
    p_j = get_prob(bn["JohnCalls"], (a,),   j)
    p_m = get_prob(bn["MaryCalls"], (a,),   m)
    return p_b * p_e * p_a * p_j * p_m

# Compute P(J=T, M=T, A=T, B=F, E=F)
result = joint_prob(b=False, e=False, a=True, j=True, m=True)
print(f"P(j,m,a,¬b,¬e) = {result:.6f}")
# Output: P(j,m,a,¬b,¬e) = 0.000628

# Compute all joint configurations (2^5 = 32 entries)
from itertools import product
total = 0
for config in product([True,False], repeat=5):
    b,e,a,j,m = config
    total += joint_prob(b,e,a,j,m)
print(f"Sum of all joint probs: {total:.6f}")  # Should be ~1.0`}</pre>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: "What is a Directed Acyclic Graph (DAG) and why must a Bayesian Network be acyclic?",
      solution: "A DAG is a graph with directed edges and no directed cycles. BNs must be acyclic so that the joint distribution factorization P(X1,...,Xn) = Π P(Xi|Parents(Xi)) is well-defined and consistent. Cycles would create circular dependencies where a variable is its own ancestor, making the distribution impossible to normalize.",
    },
    {
      question: "In the Burglary-Alarm network, are JohnCalls and MaryCalls independent? Are they conditionally independent given Alarm?",
      solution: "J and M are NOT marginally independent — both are influenced by Alarm (a common cause fork). However, J ⊥ M | A: given the state of Alarm, J and M become conditionally independent because Alarm d-separates them (fork structure: J ← A → M).",
    },
    {
      question: "How many parameters are needed to specify a BN with 10 Boolean variables, where each variable has at most 2 parents? Compare this to a full joint distribution.",
      solution: "BN: each node needs at most 2^2=4 CPT entries, so 10×4=40 parameters. Full joint: 2^10 - 1 = 1023 parameters. The BN requires roughly 25× fewer parameters.",
    },
    {
      question: "What is the Markov Blanket of the Alarm node in the Burglary-Alarm network? What does this mean for inference?",
      solution: "Alarm's Markov Blanket = {Burglary, Earthquake} (parents) ∪ {JohnCalls, MaryCalls} (children) ∪ {} (co-parents of its children, already listed). This means Alarm is conditionally independent of all other variables (there are none) given its blanket. For inference, knowing the blanket is sufficient to determine Alarm's distribution.",
    },
    {
      question: "Compute P(Alarm=false | Burglary=false, Earthquake=false) using the CPT given in the lecture.",
      solution: "P(A=F | B=F, E=F) = 1 - P(A=T | B=F, E=F) = 1 - 0.001 = 0.999.",
    },
    {
      question: "Describe what 'explaining away' means in a V-structure (collider) with an example from the Burglary-Alarm network.",
      solution: "In a V-structure X → Y ← Z, X and Z are independent a priori, but become dependent when Y is observed. Example: Burglary and Earthquake are independent root nodes. If we observe Alarm=true, learning that Earthquake=true 'explains away' the alarm, reducing our belief in Burglary. Formally P(B|A=T,E=T) < P(B|A=T).",
    },
    {
      question: "Why is ordering variables causally (causes before effects) important when constructing a Bayesian Network?",
      solution: "Causal ordering produces the most compact (fewest edges) BN because each variable's direct parents are exactly its immediate causes. Non-causal ordering requires adding extra edges to maintain the correct joint distribution — the network is valid but denser and harder to interpret or learn from data.",
    },
    {
      question: "Using the Burglary-Alarm network CPTs, calculate the prior probability P(Alarm=true).",
      solution: "P(A=T) = Σ_{b,e} P(A=T|b,e)·P(b)·P(e). = 0.95×0.001×0.002 + 0.94×0.001×0.998 + 0.29×0.999×0.002 + 0.001×0.999×0.998 ≈ 0.00190 + 0.000578 + 0.000999 ≈ 0.002516. About 0.25% chance of alarm going off at any moment.",
    },
    {
      question: "What is the difference between correlation and a directed edge in a Bayesian Network?",
      solution: "A directed edge A→B in a BN represents a direct causal/generative relationship: A is in B's CPT. Correlation is a statistical measure that does not imply direction or causation. Two nodes can be correlated without a direct edge (through a common ancestor). BNs encode causal structure, not just correlation — this is crucial for reasoning about interventions (do-calculus).",
    },
    {
      question: "A student network has three nodes: Difficulty → Grade ← Intelligence, and Grade → Letter. List all conditional independence relationships encoded by this BN.",
      solution: "1. Difficulty ⊥ Intelligence (no edge, no common ancestor). 2. Letter ⊥ Difficulty | Grade (chain: D→G→L, G blocks). 3. Letter ⊥ Intelligence | Grade (chain: I→G→L, G blocks). 4. Difficulty and Intelligence become dependent given Grade (collider D→G←I — observing G opens the path).",
    },
  ],
  exampleProblems: [
    {
      problem: "Using the Burglary-Alarm CPTs, compute the joint probability P(B=T, E=F, A=T, J=T, M=F).",
      solution: "≈ 0.000564",
      steps: [
        {
          step: "Write the factorization",
          explanation: "P(b,¬e,a,j,¬m) = P(b)·P(¬e)·P(a|b,¬e)·P(j|a)·P(¬m|a)",
        },
        {
          step: "Look up CPT values",
          explanation: "P(B=T)=0.001, P(E=F)=0.998, P(A=T|B=T,E=F)=0.94, P(J=T|A=T)=0.90, P(M=F|A=T)=1-0.70=0.30.",
        },
        {
          step: "Multiply",
          explanation: "0.001 × 0.998 × 0.94 × 0.90 × 0.30 = 0.001 × 0.998 × 0.2538 ≈ 0.000253.",
        },
      ],
    },
  ],
}

export default function BayesianNetworksPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
