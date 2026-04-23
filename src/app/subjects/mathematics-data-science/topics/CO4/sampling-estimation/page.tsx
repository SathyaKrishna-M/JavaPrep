'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Sampling & Estimation',
  subtitle: 'The Central Limit Theorem, sampling methods, and point estimation',
  co: 'CO4 — Inferential Statistics',

  overview: (
    <>
      <p>
        <strong className="text-white">Inferential statistics</strong> draws conclusions
        about a <strong className="text-white">population</strong> from a{' '}
        <strong className="text-white">sample</strong>. We almost never have data on every
        member of a population — we study a representative subset and infer properties of
        the whole. The validity of this inference depends critically on how the sample was collected.
      </p>
      <p>
        The <strong className="text-white">Central Limit Theorem (CLT)</strong> is the most
        important result in statistics: regardless of the population's distribution, the
        sampling distribution of the mean approaches Normal as sample size increases (n ≥ 30
        is a common rule of thumb). The standard error of the mean is σ/√n — as sample
        size grows, our estimates become more precise.
      </p>
      <p>
        A <strong className="text-white">point estimate</strong> is a single number used
        to estimate a population parameter. The sample mean x̄ estimates population mean μ.
        A good estimator is <strong className="text-white">unbiased</strong> (expected value
        equals the true parameter) and <strong className="text-white">consistent</strong>
        (converges to the true value as n → ∞).
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: A political poll samples 1,000 voters to estimate how 150 million
        will vote. The CLT guarantees that with a random sample of 1,000, the poll's margin
        of error is about ±3% — a remarkably precise estimate from 0.00067% of the population.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Sampling Methods</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { method: 'Simple Random', desc: 'Every individual equally likely to be selected. Gold standard for unbiasedness.', color: 'green' },
            { method: 'Stratified', desc: 'Divide into subgroups (strata), sample proportionally from each. Ensures representation.', color: 'blue' },
            { method: 'Cluster', desc: 'Divide into clusters, randomly select whole clusters. Cost-effective for geographically spread populations.', color: 'violet' },
            { method: 'Systematic', desc: 'Every kth element. Simple but can introduce bias if the population has periodic patterns.', color: 'amber' },
          ].map(({ method, desc, color }) => (
            <div key={method} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-2`}>
              <p className={`text-${color}-300 font-bold mb-1`}>{method}</p>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-cyan-400 font-semibold mb-2">Central Limit Theorem</p>
        <div className="font-mono text-gray-300 space-y-1">
          <p>x̄ ~ N(μ, σ²/n) &nbsp;&nbsp; <span className="text-gray-500 font-sans">as n → ∞</span></p>
          <p>SE = σ/√n &nbsp;&nbsp; <span className="text-gray-500 font-sans">(standard error of mean)</span></p>
          <p className="text-cyan-300 font-sans mt-1">n=4: SE = σ/2 &nbsp; n=100: SE = σ/10 &nbsp; n=400: SE = σ/20</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Population',        definition: 'The entire group of interest. Parameters (μ, σ) describe it. Usually too large to measure directly.' },
    { term: 'Sample',            definition: 'A subset drawn from the population. Statistics (x̄, s) describe it. Used to infer population parameters.' },
    { term: 'Sampling distribution', definition: 'The probability distribution of a statistic (e.g. x̄) computed over all possible samples of size n. Describes how the statistic varies.' },
    { term: 'Central Limit Theorem', definition: 'The sampling distribution of x̄ is approximately N(μ, σ²/n) for large n, regardless of the population distribution.' },
    { term: 'Standard error (SE)', definition: 'The standard deviation of the sampling distribution: SE = σ/√n. Measures precision of the point estimate. Decreases as n increases.' },
    { term: 'Unbiased estimator', definition: 'E[estimator] = true parameter. Sample mean is unbiased for population mean. Sample variance with n−1 is unbiased.' },
    { term: 'Point estimate',    definition: 'A single value used to estimate a population parameter. x̄ estimates μ. s estimates σ. p̂ estimates p (proportion).' },
  ],

  code: {
    title: 'Demonstrating the CLT and Sampling in Python',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)

# ── Population: highly skewed (exponential) ───────────────────
population = np.random.exponential(scale=5, size=100_000)
print(f"Population mean: {population.mean():.3f}")  # ≈ 5.0
print(f"Population std:  {population.std():.3f}")   # ≈ 5.0

# ── Central Limit Theorem: sample means → Normal ──────────────
for n in [1, 5, 30, 100]:
    sample_means = [np.mean(np.random.choice(population, n)) for _ in range(3000)]
    print(f"n={n:3d}: mean of means={np.mean(sample_means):.3f}  "
          f"std={np.std(sample_means):.3f}  (theory: {5/np.sqrt(n):.3f})")

# n=  1: mean≈5.0, std≈5.0    (matches population — very spread)
# n= 30: mean≈5.0, std≈0.91   (≈ 5/√30 — CLT kicks in)
# n=100: mean≈5.0, std≈0.50   (≈ 5/√100 = 0.5 — precise!)

# ── Sampling methods ──────────────────────────────────────────
import pandas as pd
df = pd.DataFrame({'score': np.random.normal(70, 15, 1000),
                   'grade': np.random.choice(['A','B','C'], 1000, p=[0.2,0.5,0.3])})

# Simple random sample
srs = df.sample(n=100, random_state=42)

# Stratified sample (proportional)
stratified = df.groupby('grade', group_keys=False).apply(
    lambda g: g.sample(frac=0.1, random_state=42)
)

print(f"SRS grade dist:        {srs['grade'].value_counts(normalize=True).to_dict()}")
print(f"Stratified grade dist: {stratified['grade'].value_counts(normalize=True).to_dict()}")

# ── Standard error ────────────────────────────────────────────
sample = np.random.normal(70, 15, 50)
se = sample.std(ddof=1) / np.sqrt(len(sample))
print(f"Point estimate (x̄): {sample.mean():.2f}")
print(f"Standard error:      {se:.2f}")`,
    explanation: 'The CLT simulation shows that even for an exponential population (highly skewed), the distribution of sample means becomes approximately Normal for n=30. This is why t-tests and z-tests work for many non-normal populations.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">The CLT is why statistics works in practice.</strong>{' '}
        We don't need to know the exact population distribution — as long as n is large
        enough, sample means are approximately Normal and we can use Normal-based inference
        (confidence intervals, t-tests, z-tests). This theoretical result underlies virtually
        all of classical statistics.
      </p>
      <p>
        Sampling method determines whether conclusions generalize. A convenience sample
        (surveying people at a mall) or a voluntary response sample (online polls) are
        systematically biased. The gold standard — simple random sampling — gives every
        unit an equal chance of selection, producing unbiased estimates.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing population parameter (μ, σ) with sample statistic (x̄, s) — Greek letters for parameters, Roman letters for statistics.',
    'Applying CLT with too small a sample from a very skewed distribution — n≥30 is a guideline, not a law. Heavily skewed distributions may need n>100.',
    'Non-random sampling then treating it as random — surveying friends, using voluntary responses, or convenience samples all introduce bias that no statistical technique can fix.',
    'Confusing standard deviation (σ) with standard error (SE=σ/√n) — SD describes spread in the population; SE describes precision of the estimate.',
    'Forgetting that SE decreases as √n, not n — quadrupling sample size only halves the SE. Returns to precision are diminishing.',
  ],

  summary: [
    'Population parameters (μ,σ) vs sample statistics (x̄,s). Inference uses samples to estimate parameters.',
    'CLT: x̄ ~ N(μ, σ²/n) for large n. Works regardless of population distribution.',
    'Standard error SE = σ/√n. Precision of the estimate. Doubles sample size → SE/√2.',
    'Unbiased estimator: E[estimator] = true parameter. x̄ is unbiased for μ; s² with n−1 is unbiased for σ².',
    'Sampling methods: SRS (gold standard), stratified (ensures subgroup representation), cluster (cost-effective), systematic.',
    'Non-random sampling introduces bias that statistical adjustments cannot fix.',
  ],

  practice: [
    {
      type: 'question',
      text: 'State the Central Limit Theorem in plain English and explain what "sampling distribution of the mean" means.',
      hint: 'If you repeatedly draw random samples of size n from any population and compute the mean each time, the distribution of those means will be approximately Normal with mean=μ and std=σ/√n, provided n is large enough. "Sampling distribution of the mean" = the probability distribution of x̄ across all possible samples.',
    },
    {
      type: 'question',
      text: 'A population has mean 50 and std 20. For samples of size n=100, what is the standard error? What is P(x̄ > 53)?',
      hint: 'SE = σ/√n = 20/√100 = 2. By CLT, x̄ ~ N(50, 2²). Z = (53-50)/2 = 1.5. P(x̄ > 53) = P(Z > 1.5) = 1 - 0.9332 = 0.0668 ≈ 6.7%.',
    },
    {
      type: 'question',
      text: 'Why is stratified sampling sometimes preferred over simple random sampling?',
      hint: 'If the population has distinct subgroups (strata) that differ in the outcome of interest, SRS might by chance over- or under-sample some strata. Stratified sampling guarantees proportional representation of each subgroup, reducing sampling variability and ensuring subgroup-level estimates are reliable.',
    },
    {
      type: 'task',
      text: 'Simulate the CLT: create a highly skewed population (e.g., np.random.exponential or np.random.chisquare). Draw 5,000 samples of size n=5, 30, and 100. Plot the distribution of sample means for each. Verify that the mean and std of each sampling distribution match μ and σ/√n.',
      hint: 'population = np.random.chisquare(2, 100000). For each n: [np.mean(np.random.choice(population, n)) for _ in range(5000)]. Plot with plt.hist(). Check: np.mean(sample_means) ≈ 2 and np.std(sample_means) ≈ 2/np.sqrt(n).',
    },
  ],
}

export default function SamplingEstimationPage() {
  return <FEDFTopicPage content={content} />
}
