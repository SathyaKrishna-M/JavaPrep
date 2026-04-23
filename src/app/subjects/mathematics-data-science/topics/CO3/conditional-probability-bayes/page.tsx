'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: "Conditional Probability & Bayes' Theorem",
  subtitle: 'Updating beliefs with new evidence — the engine behind Bayesian data science',
  co: 'CO3 — Probability Theory',

  overview: (
    <>
      <p>
        <strong className="text-white">Conditional probability</strong> is the probability
        of event A occurring <em>given that</em> event B has already occurred:
        P(A|B) = P(A ∩ B) / P(B). Conditioning changes the sample space — we restrict
        attention to outcomes where B occurred and ask how many of those also have A.
      </p>
      <p>
        <strong className="text-white">Bayes' Theorem</strong> reverses the conditioning:
        it calculates P(A|B) from P(B|A), P(A), and P(B). In data science, this means
        we can compute "P(disease | positive test)" from "P(positive test | disease)"
        — the direction in which medical tests are characterized — and the base rate
        of the disease in the population.
      </p>
      <p>
        The <strong className="text-white">Law of Total Probability</strong> says that
        if events B₁, B₂, …, Bₙ partition the sample space, then
        P(A) = Σ P(A|Bᵢ)·P(Bᵢ). This is used in the denominator of Bayes' Theorem
        to compute P(B) — often called the "evidence."
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: A spam filter uses Bayes' Theorem. P(spam | "free money") is
        computed from P("free money" | spam), P(spam), and P("free money"). The prior belief
        (base rate of spam) is updated with evidence (the word "free money") to get the
        posterior probability.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Bayes' Theorem</p>
        <div className="font-mono text-sm text-center text-gray-300 py-2">
          <p className="text-lg text-white">P(A|B) = P(B|A) · P(A) / P(B)</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs text-center">
          {[
            { name: 'P(A|B)', label: 'Posterior', desc: 'What we want', color: 'emerald' },
            { name: 'P(B|A)', label: 'Likelihood', desc: 'How well B predicts A', color: 'violet' },
            { name: 'P(A)',   label: 'Prior',      desc: 'Belief before evidence', color: 'amber' },
            { name: 'P(B)',   label: 'Evidence',   desc: 'Normalising constant', color: 'pink' },
          ].map(({ name, label, desc, color }) => (
            <div key={name} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-2`}>
              <p className={`text-${color}-300 font-bold font-mono`}>{name}</p>
              <p className={`text-${color}-300 font-semibold text-[10px]`}>{label}</p>
              <p className="text-gray-500 text-[10px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Medical Test Example</p>
        <div className="space-y-1 text-gray-300">
          <p>Disease prevalence (prior): P(D) = 0.01 (1%)</p>
          <p>Test sensitivity: P(+|D) = 0.95 (95%)</p>
          <p>False positive rate: P(+|¬D) = 0.10 (10%)</p>
          <p className="text-amber-300 mt-2 font-semibold">P(D|+) = 0.95 × 0.01 / (0.95×0.01 + 0.10×0.99) ≈ 8.7%</p>
          <p className="text-gray-500">A positive test only means ~9% chance of disease — base rate dominates!</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Conditional probability', definition: 'P(A|B) = P(A ∩ B) / P(B). Probability of A given B has occurred. Restricts sample space to B.' },
    { term: "Bayes' Theorem",         definition: 'P(A|B) = P(B|A) · P(A) / P(B). Reverses conditioning. Core of Bayesian statistics and Naive Bayes classifiers.' },
    { term: 'Prior probability',       definition: 'P(A) — belief in A before observing evidence. In Bayesian terms, your starting belief before data.' },
    { term: 'Posterior probability',   definition: 'P(A|B) — updated belief after observing evidence B. The output of Bayes\' Theorem.' },
    { term: 'Likelihood',              definition: 'P(B|A) — probability of observing evidence B if A is true. How well the hypothesis explains the data.' },
    { term: 'Law of Total Probability', definition: 'P(A) = Σ P(A|Bᵢ)·P(Bᵢ) where B₁,...,Bₙ partition Ω. Used to compute the denominator in Bayes\' Theorem.' },
    { term: 'Base rate neglect',        definition: 'The cognitive error of ignoring prior probability (base rate) and over-weighting the likelihood. The medical test example illustrates this.' },
  ],

  code: {
    title: "Bayes' Theorem in Python — Medical Test & Naive Bayes",
    language: 'python',
    snippet: `import numpy as np
from sklearn.naive_bayes import GaussianNB, MultinomialNB

# ── Bayes' Theorem: medical test ──────────────────────────────
p_disease    = 0.01     # prior: 1% prevalence
p_pos_given_d   = 0.95  # sensitivity
p_pos_given_nd  = 0.10  # false positive rate

# Law of Total Probability for P(positive test)
p_positive = (p_pos_given_d * p_disease +
              p_pos_given_nd * (1 - p_disease))

# Bayes' Theorem: P(disease | positive test)
p_disease_given_pos = (p_pos_given_d * p_disease) / p_positive
print(f"P(disease | positive test) = {p_disease_given_pos:.4f}")
# 0.0876 — only 8.76%! Low base rate dominates.

# ── Effect of base rate on posterior ─────────────────────────
for prevalence in [0.001, 0.01, 0.05, 0.20, 0.50]:
    p_pos = p_pos_given_d * prevalence + p_pos_given_nd * (1 - prevalence)
    posterior = (p_pos_given_d * prevalence) / p_pos
    print(f"Prevalence {prevalence:.1%} → P(disease|+) = {posterior:.2%}")

# ── Conditional probability ───────────────────────────────────
# Drawing 2 cards WITHOUT replacement
# P(2nd ace | 1st is ace) = 3/51 (3 aces left in 51 cards)
p_2nd_ace_given_1st_ace = 3 / 51
p_1st_ace = 4 / 52
p_both_ace = p_1st_ace * p_2nd_ace_given_1st_ace
print(f"P(2 aces in a row) = {p_both_ace:.6f}")  # 0.004525

# ── Naive Bayes classifier (scikit-learn) ─────────────────────
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

nb = GaussianNB()
nb.fit(X_train, y_train)
preds = nb.predict(X_test)
probs = nb.predict_proba(X_test)   # posterior probabilities per class

print(f"Accuracy: {accuracy_score(y_test, preds):.4f}")
print(f"Class probabilities for first test sample: {probs[0]}")`,
    explanation: 'The medical test example demonstrates base rate neglect: even a 95% accurate test on a 1% prevalence disease gives only ~9% posterior probability of disease. Increasing prevalence (e.g. screening high-risk groups) dramatically increases the posterior.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Bayes' Theorem is the mathematical foundation of machine learning inference.</strong>{' '}
        Naive Bayes classifiers (email spam filtering, text classification) are direct
        applications. Bayesian neural networks quantify uncertainty in predictions.
        A/B testing uses Bayesian updating. Understanding Bayes is understanding how
        models "reason" about data.
      </p>
      <p>
        Base rate neglect is one of the most dangerous cognitive errors in decision-making.
        Medical professionals, legal juries, and financial analysts regularly commit it.
        A data scientist who understands Bayes' Theorem immediately recognises when someone
        is confusing P(evidence | hypothesis) with P(hypothesis | evidence).
      </p>
    </>
  ),

  commonMistakes: [
    "Confusing P(A|B) with P(B|A) — 'P(symptom|disease)' ≠ 'P(disease|symptom)'. This reversal is called the base rate fallacy.",
    'Forgetting the base rate (prior) — a test with 99% accuracy on a disease with 0.1% prevalence still gives mostly false positives.',
    'Assuming independence when applying Naive Bayes — the "naive" assumption (features are conditionally independent) is often violated but the classifier still works well in practice.',
    'Not updating priors — Bayesian updating means each new piece of evidence updates the posterior, which becomes the new prior for the next update.',
    "Using P(B) = P(B|A) instead of the law of total probability — P(B) = P(B|A)·P(A) + P(B|A')·P(A').",
  ],

  summary: [
    'P(A|B) = P(A∩B)/P(B). Conditioning restricts the sample space to outcomes where B occurred.',
    "Bayes' Theorem: P(A|B) = P(B|A) · P(A) / P(B). Reverses the direction of conditioning.",
    'Prior P(A): belief before evidence. Posterior P(A|B): updated belief after evidence.',
    'Law of Total Probability: P(A) = Σ P(A|Bᵢ)·P(Bᵢ). Used to compute the evidence denominator.',
    'Base rate neglect: ignoring the prior leads to wildly incorrect posterior estimates.',
    'Naive Bayes classifier: applies Bayes\' Theorem with the simplifying independence assumption.',
  ],

  practice: [
    {
      type: 'question',
      text: "State Bayes' Theorem and explain what each term represents in the context of a spam classifier.",
      hint: "P(spam | email) = P(email | spam) · P(spam) / P(email). P(spam) = prior (% of emails that are spam). P(email | spam) = likelihood (how often this type of email appears in spam). P(spam | email) = posterior (probability this specific email is spam). P(email) = normalising constant (overall frequency of this email type).",
    },
    {
      type: 'question',
      text: "A factory has two machines: Machine A produces 60% of parts (3% defect rate) and Machine B produces 40% (5% defect rate). A random part is defective. What's the probability it came from Machine A?",
      hint: "P(defect) = 0.03×0.6 + 0.05×0.4 = 0.018 + 0.020 = 0.038. P(A|defect) = P(defect|A)·P(A)/P(defect) = (0.03×0.6)/0.038 = 0.018/0.038 ≈ 0.474. Despite A producing more parts, its lower defect rate means a defective part is almost equally likely from either machine.",
    },
    {
      type: 'question',
      text: 'Why does a rare disease with a 95% accurate test still give mostly false positives?',
      hint: "With 1% prevalence: of 10,000 people, 100 have the disease. 95 test positive (true positive). 9,900 don't have it; 990 test positive (false positives). Total positives: 1,085. P(disease|positive) = 95/1,085 ≈ 8.8%. False positives dominate because there are so many more disease-free people.",
    },
    {
      type: 'task',
      text: "Implement Bayes' Theorem as a Python function that takes prior, likelihood, and false positive rate. Use it to create a table showing how posterior probability changes for priors ranging from 0.001 to 0.5, with 95% sensitivity and 10% false positive rate.",
      hint: "def bayes(prior, sens, fpr): p_pos = sens*prior + fpr*(1-prior); return (sens*prior)/p_pos. Loop over priors = [0.001, 0.01, 0.05, 0.1, 0.2, 0.5]. Notice how the posterior changes dramatically — the prior dominates at low prevalence.",
    },
  ],
}

export default function ConditionalProbabilityBayesPage() {
  return <FEDFTopicPage content={content} />
}
