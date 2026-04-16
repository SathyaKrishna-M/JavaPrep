'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCpu, FiGitMerge, FiCode, FiCheckCircle, FiActivity } from 'react-icons/fi'

const content = {
  title: 'Inference in Bayesian Networks',
  explanationSections: [
    {
      title: '1️⃣ Types of Inference',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Given a Bayesian network, <span className="text-cyan-400 font-semibold">inference</span> means computing a posterior probability P(Query | Evidence). There are two broad families: <em>exact inference</em> and <em>approximate inference</em>.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-2">Exact Inference</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Variable Elimination</li>
                <li>Belief Propagation (sum-product)</li>
                <li>Junction Tree Algorithm</li>
                <li>Exact but exponential in worst case</li>
              </ul>
            </div>
            <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
              <p className="text-violet-300 font-semibold mb-2">Approximate Inference</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Rejection Sampling</li>
                <li>Likelihood Weighting</li>
                <li>Gibbs Sampling (MCMC)</li>
                <li>Scalable — trades exactness for speed</li>
              </ul>
            </div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Complexity of Exact Inference</p>
            <p className="text-gray-300 text-sm">Exact inference in general Bayesian networks is NP-hard (it subsumes #P-complete counting problems). In practice, exact inference is feasible for sparse networks (small treewidth).</p>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Variable Elimination',
      icon: <FiGitMerge className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Variable Elimination (VE)</span> sums out hidden variables one at a time using the factored representation of the joint distribution. Each step produces a new factor over fewer variables.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">P(Q | e) = α · Σ_hidden P(Q, hidden, e)</p>
            <p className="text-gray-400 text-xs">α = normalisation constant so probabilities sum to 1</p>
          </div>
          <div className="space-y-2">
            <p className="text-violet-300 font-semibold">Steps:</p>
            {[
              ['1. Identify', 'Query variable Q, evidence E=e, hidden variables H'],
              ['2. Restrict', 'Instantiate all factors containing evidence variables'],
              ['3. Eliminate', 'For each hidden variable h: multiply all factors containing h, then sum out h → new factor'],
              ['4. Multiply', 'Multiply remaining factors together'],
              ['5. Normalise', 'Divide by sum to get posterior'],
            ].map(([s, d]) => (
              <div key={s} className="border-l-4 border-cyan-500 pl-4">
                <p className="text-cyan-300 font-semibold text-sm">{s}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`# Factor operations for Variable Elimination
import numpy as np
from itertools import product

class Factor:
    def __init__(self, variables, values):
        self.variables = variables  # list of variable names
        self.values = values        # numpy array indexed by variable assignments

    def restrict(self, var, val):
        """Fix variable to a given value."""
        idx = self.variables.index(var)
        new_vars = [v for v in self.variables if v != var]
        new_vals = np.take(self.values, val, axis=idx)
        return Factor(new_vars, new_vals)

    def multiply(self, other):
        """Pointwise multiply two factors."""
        all_vars = list(dict.fromkeys(self.variables + other.variables))
        # align shapes and broadcast
        shape = tuple(2 for _ in all_vars)
        a = self._expand(all_vars, shape)
        b = other._expand(all_vars, shape)
        return Factor(all_vars, a * b)

    def sum_out(self, var):
        """Marginalise over a variable."""
        idx = self.variables.index(var)
        new_vars = [v for v in self.variables if v != var]
        new_vals = self.values.sum(axis=idx)
        return Factor(new_vars, new_vals)

    def normalise(self):
        return Factor(self.variables, self.values / self.values.sum())`}</pre>
        </div>
      ),
    },
    {
      title: '3️⃣ Elimination Ordering',
      icon: <FiGitMerge className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The order in which hidden variables are eliminated dramatically affects the size of intermediate factors (and thus computational cost).</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Ordering Strategy</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Description</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Quality</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Min-Fill', 'Eliminate variable that adds fewest edges to induced graph', 'Best in practice'],
                  ['Min-Degree', 'Eliminate variable with fewest neighbours', 'Good heuristic'],
                  ['Random', 'No ordering strategy', 'Worst case exponential'],
                  ['Optimal', 'NP-hard to find exactly', 'Theoretical only'],
                ].map(([s, d, q]) => (
                  <tr key={s}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{s}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{d}</td>
                    <td className="px-4 py-2 text-amber-300 border border-slate-700 text-sm">{q}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Treewidth</p>
            <p className="text-gray-300 text-sm">The <em>treewidth</em> of a graph is the minimum, over all elimination orderings, of the maximum factor size minus 1. VE runs in O(n · d^(w+1)) where d = domain size, w = treewidth. For tree-structured BNs, w=1 — exact inference is linear!</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Rejection Sampling',
      icon: <FiActivity className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Rejection sampling</span> is the simplest approximate inference method. Generate samples from the prior joint distribution; <em>reject</em> any sample inconsistent with evidence; count query variable values among accepted samples.</p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`def rejection_sampling(query_var, evidence, bn, num_samples=10000):
    counts = {}
    accepted = 0

    for _ in range(num_samples):
        sample = prior_sample(bn)     # sample all vars from joint

        # Reject if inconsistent with evidence
        if all(sample[var] == val for var, val in evidence.items()):
            val = sample[query_var]
            counts[val] = counts.get(val, 0) + 1
            accepted += 1

    if accepted == 0:
        return None  # evidence too unlikely
    total = sum(counts.values())
    return {k: v / total for k, v in counts.items()}

# Limitation: if P(evidence) is very small, almost all samples are rejected`}</pre>
          <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            <p className="text-red-300 font-semibold mb-1">Problem with Rejection Sampling</p>
            <p className="text-gray-300 text-sm">When evidence is unlikely (e.g., rare disease = True), nearly all samples are rejected. Variance is high, convergence is slow. Likelihood weighting fixes this.</p>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Likelihood Weighting',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Likelihood weighting</span> fixes evidence variables to their observed values and weights each sample by the probability of the evidence given the sample. No samples are rejected — all contribute with different weights.</p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`def likelihood_weighting(query_var, evidence, bn, num_samples=10000):
    weighted_counts = {}

    for _ in range(num_samples):
        sample = {}
        weight = 1.0

        for var in bn.topological_order():
            if var in evidence:
                sample[var] = evidence[var]
                # Weight by P(evidence_var = observed | parents)
                weight *= bn.probability(var, evidence[var], sample)
            else:
                sample[var] = bn.sample(var, sample)

        val = sample[query_var]
        weighted_counts[val] = weighted_counts.get(val, 0) + weight

    total = sum(weighted_counts.values())
    return {k: v / total for k, v in weighted_counts.items()}`}</pre>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Advantages</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>No samples rejected — efficient</li>
                <li>Works even with unlikely evidence</li>
                <li>Consistent — converges to correct answer</li>
              </ul>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-semibold mb-2">Limitations</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Evidence downstream of query not used in sampling</li>
                <li>Weights can become very small (weight impoverishment)</li>
                <li>MCMC (Gibbs) better for complex evidence</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Variable Elimination:</strong> exact, sums out hidden variables one at a time using factor operations</li>
            <li><strong>Elimination ordering</strong> critically affects cost — min-fill heuristic works well in practice</li>
            <li><strong>Treewidth w:</strong> VE is O(d^w) — linear on tree-structured networks</li>
            <li><strong>Rejection sampling:</strong> simple but inefficient for unlikely evidence</li>
            <li><strong>Likelihood weighting:</strong> weights samples by P(evidence | sample) — no rejection, more efficient</li>
            <li><strong>Exact inference is NP-hard</strong> in general; approximate methods scale to large networks</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is Variable Elimination in a Bayesian Network?', solution: 'Variable Elimination is an exact inference algorithm that computes P(Q|E) by summing out hidden variables one at a time. For each hidden variable: collect all factors containing it, multiply them into a new factor, then sum out the variable. Remaining factors are multiplied and normalised.' },
    { question: 'What are factor operations used in Variable Elimination?', solution: 'Three key operations: (1) Restriction — fixing a variable to an observed value (e=true); (2) Multiplication — pointwise product of two factors to get a factor over all their variables; (3) Sum-out — marginalising over a variable by summing across its values.' },
    { question: 'Why does elimination ordering matter in VE?', solution: 'Ordering determines the size of intermediate factors created during elimination. A bad order can create exponentially large factors; a good order (e.g., min-fill heuristic) keeps factor sizes small. The optimal order is NP-hard to find exactly.' },
    { question: 'MCQ: Rejection sampling rejects a sample when:\n A) The query variable takes an unexpected value\n B) The sample is inconsistent with the evidence\n C) The weight is below a threshold\n D) The BN has more than 10 variables', solution: 'B) The sample is inconsistent with the evidence — any sample where evidence variables do not match observed values is discarded.' },
    { question: 'MCQ: Likelihood weighting improves over rejection sampling by:\n A) Using a better prior distribution\n B) Fixing evidence variables and weighting samples by P(evidence|sample)\n C) Rejecting fewer samples randomly\n D) Using exact variable elimination internally', solution: 'B) Fixing evidence variables to observed values and weighting each sample by the likelihood of the evidence given the sample. No samples are rejected.' },
    { question: 'What is treewidth and why does it matter for inference?', solution: 'Treewidth is the minimum over all elimination orderings of the maximum clique size in the induced graph minus 1. Variable Elimination runs in O(n·d^(w+1)) where w is treewidth. For tree-structured networks w=1 and inference is linear. High treewidth (dense graphs) makes exact inference exponential.' },
    { question: 'Interview: Compare rejection sampling and likelihood weighting for a rare disease network where P(Disease=True)=0.001.', solution: 'Rejection sampling: generates samples from prior P(Disease) — 99.9% are rejected (Disease=False). Very few accepted samples → high variance. Likelihood weighting: fixes Disease=True, weights sample by P(Disease=True|parents). All samples contribute. Much lower variance, converges faster. For rare evidence, likelihood weighting is dramatically superior.' },
    { question: 'When would you prefer approximate inference over exact inference?', solution: 'When the network has high treewidth (dense, many connections), exact inference is exponential. Approximate methods (likelihood weighting, MCMC) scale linearly in number of samples with controllable accuracy. Preferred for large real-world networks like medical diagnosis systems with hundreds of variables.' },
  ],
  exampleProblems: [],
}

export default function InferenceBNPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
