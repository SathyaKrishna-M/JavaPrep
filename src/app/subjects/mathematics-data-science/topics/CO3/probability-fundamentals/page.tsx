'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Probability Fundamentals',
  subtitle: 'Axioms, sample spaces, joint & conditional probability, independence, and Bayes\' theorem',
  co: 'CO3 — Probability & Distributions',

  overview: (
    <>
      <p>
        Probability quantifies uncertainty on a scale from <strong className="text-white">0 (impossible)</strong> to{' '}
        <strong className="text-white">1 (certain)</strong>. It is the mathematical foundation for every predictive
        model — from spam filters to neural networks. Kolmogorov's three axioms define probability rigorously:
        non-negativity, total probability = 1, and additivity for mutually exclusive events.
      </p>
      <p>
        <strong className="text-white">Conditional probability</strong> P(A|B) is the probability of A{' '}
        <em>given</em> that B has occurred: P(A|B) = P(A ∩ B) / P(B). This captures how new information
        updates our beliefs. When P(A|B) = P(A), knowing B tells us nothing about A — the events are{' '}
        <strong className="text-white">independent</strong>.
      </p>
      <p>
        <strong className="text-white">Bayes' theorem</strong> is the most important formula in data science:
        P(A|B) = P(B|A) × P(A) / P(B). It formalises how to update a prior belief P(A) with evidence B to
        produce a posterior P(A|B). It underlies Naive Bayes, Bayesian inference, spam filtering, and the
        philosophical basis of machine learning.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Key Probability Rules</p>
        <div className="space-y-2 text-xs">
          {[
            { name: 'Complement', formula: 'P(Aᶜ) = 1 − P(A)', note: 'Probability of NOT A', color: 'blue' },
            { name: 'Addition (OR)', formula: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', note: 'Subtract overlap to avoid double-counting', color: 'violet' },
            { name: 'Multiplication', formula: 'P(A ∩ B) = P(A|B) × P(B)', note: 'Joint probability via conditional', color: 'cyan' },
            { name: 'Bayes\' Theorem', formula: 'P(A|B) = P(B|A)P(A) / P(B)', note: 'Update prior with evidence', color: 'emerald' },
            { name: 'Independence', formula: 'P(A ∩ B) = P(A) × P(B)', note: 'Only if A and B are independent', color: 'amber' },
          ].map(({ name, formula, note, color }) => (
            <div key={name} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-2 flex gap-3 items-center`}>
              <span className={`text-${color}-300 font-semibold shrink-0 w-28`}>{name}</span>
              <span className="text-white font-mono text-[11px] flex-1">{formula}</span>
              <span className="text-gray-500 text-[10px] shrink-0">{note}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Frequentist vs Bayesian</p>
        <div className="grid grid-cols-2 gap-2 text-gray-400">
          <div><p className="text-blue-300 font-semibold">Frequentist</p><p>Probability = long-run relative frequency. Parameters are fixed unknowns. Hypothesis testing, confidence intervals.</p></div>
          <div><p className="text-amber-300 font-semibold">Bayesian</p><p>Probability = degree of belief. Update prior with evidence using Bayes' theorem. Bayesian classifiers, credible intervals.</p></div>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Sample space (Ω)', definition: 'The set of all possible outcomes of an experiment. Rolling a die: Ω = {1, 2, 3, 4, 5, 6}. An event A is any subset of Ω. P(Ω) = 1 — something must happen.' },
    { term: 'Kolmogorov axioms', definition: 'Three axioms that define probability: (1) P(A) ≥ 0 for all events. (2) P(Ω) = 1. (3) Countable additivity: if A and B are mutually exclusive (A ∩ B = ∅), then P(A ∪ B) = P(A) + P(B).' },
    { term: 'Conditional probability', definition: 'P(A|B) = P(A ∩ B) / P(B). The probability of A given B has occurred. Denominator P(B) renormalises the probability space to the subset where B is true.' },
    { term: 'Independence', definition: 'A and B are independent if P(A ∩ B) = P(A) × P(B), equivalently P(A|B) = P(A). Knowing B provides no information about A. Important: mutually exclusive ≠ independent.' },
    { term: 'Bayes\' theorem', definition: 'P(A|B) = P(B|A) × P(A) / P(B). Prior P(A) × likelihood P(B|A) ÷ marginal P(B) = posterior P(A|B). Formalises updating beliefs with evidence.' },
    { term: 'Law of Total Probability', definition: 'P(B) = Σᵢ P(B|Aᵢ) × P(Aᵢ) where {Aᵢ} partition the sample space. Used to compute the marginal P(B) in Bayes\' theorem when only conditionals are known.' },
    { term: 'Mutually exclusive vs independent', definition: 'Mutually exclusive: A ∩ B = ∅ (cannot both occur). Independent: P(A ∩ B) = P(A)P(B) (occurrence of one doesn\'t affect the other). Mutually exclusive events with P(A) > 0 are NEVER independent.' },
  ],

  code: {
    title: 'Bayes\' Theorem — Medical Test Example',
    language: 'python',
    snippet: `# ── Classic Bayes' theorem application ───────────────────────
# Medical test: disease prevalence = 1%, test sensitivity = 95%,
# test specificity = 90%

P_disease   = 0.01          # prior: P(Disease)
P_no_disease = 1 - P_disease  # P(No Disease)

sensitivity  = 0.95         # P(Positive | Disease)  — true positive rate
specificity  = 0.90         # P(Negative | No Disease) → false positive = 1 - 0.90

false_positive = 1 - specificity  # P(Positive | No Disease) = 0.10

# Law of Total Probability: P(Positive) — the denominator in Bayes'
P_positive = (sensitivity * P_disease) + (false_positive * P_no_disease)
print(f"P(Test positive): {P_positive:.4f}")   # ≈ 0.1085

# Bayes' theorem: P(Disease | Positive)
P_disease_given_pos = (sensitivity * P_disease) / P_positive
print(f"P(Disease | Positive test): {P_disease_given_pos:.4f}")  # ≈ 0.087 = 8.7%

# ── Counterintuitive result ───────────────────────────────────
# Despite a 95% sensitive test, a positive result means only ~8.7% chance
# of actually having the disease — because the disease is rare (1% prevalence)
# and false positives from the 99% healthy population dominate.

# ── Simulation to verify ─────────────────────────────────────
import numpy as np
np.random.seed(42)
n = 100_000

has_disease = np.random.binomial(1, P_disease, n)
# Positive if diseased (sensitivity) OR if healthy (false positive rate)
test_positive = np.where(
    has_disease == 1,
    np.random.binomial(1, sensitivity, n),
    np.random.binomial(1, false_positive, n)
)

# Empirical: P(Disease | Positive)
positives = test_positive == 1
empirical = has_disease[positives].mean()
print(f"Simulated P(Disease | Positive): {empirical:.4f}")  # should ≈ 0.087

# ── Independence check ────────────────────────────────────────
# Two fair coin flips
p_heads_1 = 0.5
p_heads_2 = 0.5
p_both_heads = 0.25  # P(H1 ∩ H2)
# Independence check: P(H1) × P(H2) == P(H1 ∩ H2)
print(f"Independent? {p_both_heads == p_heads_1 * p_heads_2}")  # True`,
    explanation: 'The base rate fallacy: with 1% disease prevalence and a 95% accurate test, a positive result means only ~8.7% chance of actually having the disease. The healthy 99% produce many false positives that swamp the true positives. This is why medical tests are repeated before diagnosis.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Probability is the foundation of all machine learning models.</strong>{' '}
        Logistic regression outputs P(class | features). Naive Bayes classifiers are direct applications of
        Bayes' theorem. Random forests aggregate probabilistic votes. Neural networks are trained by minimising
        cross-entropy — a probability-based loss function. Without probability, you cannot reason about model
        outputs or interpret uncertainty.
      </p>
      <p>
        The medical test example illustrates the <em>base rate fallacy</em> — a cognitive bias that causes
        people to ignore prior probability when interpreting new information. Data scientists who understand
        Bayes' theorem can design better tests, interpret model confidence correctly, and communicate risk
        honestly to stakeholders.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing P(A|B) with P(B|A) — the prosecutor\'s fallacy. P(DNA match | innocent) ≠ P(innocent | DNA match). These can be wildly different when base rates differ.',
    'Assuming mutual exclusivity implies independence — mutually exclusive events with positive probability are NEVER independent. If A ∩ B = ∅ and P(A) > 0, then knowing A occurred makes B impossible — they are maximally dependent.',
    'Ignoring base rates — computing P(Disease | Positive) using only test accuracy without accounting for disease prevalence. Low prevalence can make a positive test mostly false positives.',
    'Confusing "independent" with "uncorrelated" — independence implies zero correlation, but zero correlation does not imply independence (only true for normal distributions).',
  ],

  summary: [
    'Probability: 0 (impossible) to 1 (certain). Kolmogorov axioms: P ≥ 0, P(Ω) = 1, additivity for disjoint events.',
    'P(A ∪ B) = P(A) + P(B) − P(A ∩ B). For mutually exclusive events: P(A ∩ B) = 0.',
    'Conditional probability: P(A|B) = P(A ∩ B) / P(B). Renormalises to the subspace where B is true.',
    'Independence: P(A ∩ B) = P(A) × P(B). Knowing B gives no information about A.',
    'Bayes\' theorem: P(A|B) = P(B|A) × P(A) / P(B). Update prior with evidence to get posterior.',
    'Base rate fallacy: rare diseases with accurate tests still produce mostly false positives — prevalence matters.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A test for disease has 95% sensitivity and 90% specificity. Disease prevalence is 1%. What is P(disease | positive test)?',
      hint: 'Use Bayes: P(D|+) = P(+|D)×P(D) / P(+). P(+|D) = 0.95 (sensitivity). P(D) = 0.01. P(+|¬D) = 0.10 (false positive = 1 − specificity). P(+) = P(+|D)×P(D) + P(+|¬D)×P(¬D) = 0.95×0.01 + 0.10×0.99 = 0.0095 + 0.099 = 0.1085. P(D|+) = 0.0095 / 0.1085 ≈ 0.0876 = 8.8%. Despite 95% sensitivity, only ~9% of positives actually have the disease — because 99% healthy people generate many false positives.',
    },
    {
      type: 'question',
      text: 'Explain the difference between mutually exclusive events and independent events. Can they be both?',
      hint: 'Mutually exclusive: A ∩ B = ∅ — if A occurs, B cannot (rolling a 3 and rolling a 4 on one die). Independent: P(A ∩ B) = P(A)P(B) — occurrence of A gives no information about B (flipping H on coin 1 vs coin 2). Can they be both? Only if P(A) = 0 or P(B) = 0. If A and B are mutually exclusive and both have positive probability: knowing A occurred makes B impossible → P(B|A) = 0 ≠ P(B). They are maximally DEPENDENT. Common confusion: "they have nothing to do with each other" → independent. But mutually exclusive means they are maximally related (one rules out the other).',
    },
    {
      type: 'question',
      text: 'State Bayes\' theorem and explain each term. Why is it important in data science?',
      hint: 'P(A|B) = P(B|A) × P(A) / P(B). P(A) = prior: our belief about A before seeing evidence B. P(B|A) = likelihood: how probable is the evidence if A is true? P(B) = marginal/normalising constant (computed via law of total probability). P(A|B) = posterior: updated belief after seeing B. Important in data science: Naive Bayes classifier is a direct application. All Bayesian ML models update priors with data. Interpreting model confidence requires understanding posterior probability. The spam filter asks P(spam | this email) — that\'s a posterior.',
    },
    {
      type: 'task',
      text: 'Simulate Bayes\' theorem in Python: disease prevalence = 2%, sensitivity = 90%, specificity = 85%. Compute P(disease | positive) analytically, then verify with simulation of 100,000 people.',
      hint: 'P_disease = 0.02, sensitivity = 0.90, false_positive = 0.15. Analytic: P_pos = 0.90×0.02 + 0.15×0.98 = 0.018 + 0.147 = 0.165. P(D|+) = 0.018/0.165 ≈ 0.109. Simulation: has_disease = np.random.binomial(1, 0.02, 100000). test_pos = np.where(has_disease==1, np.random.binomial(1, 0.90, 100000), np.random.binomial(1, 0.15, 100000)). Empirical: has_disease[test_pos==1].mean().',
    },
  ],
}

export default function ProbabilityFundamentalsPage() {
  return <FEDFTopicPage content={content} />
}
