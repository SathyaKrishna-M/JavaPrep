'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Probability Distributions',
  subtitle: 'Bernoulli, Binomial, Poisson, and the Normal distribution — modelling randomness',
  co: 'CO3 — Probability Theory',

  overview: (
    <>
      <p>
        A <strong className="text-white">probability distribution</strong> describes all
        possible values of a random variable and their associated probabilities. Discrete
        distributions (PMF — probability mass function) assign probabilities to specific
        values. Continuous distributions (PDF — probability density function) describe
        probability over intervals via area under the curve.
      </p>
      <p>
        The most important distributions for data science:{' '}
        <strong className="text-white">Bernoulli</strong> (single trial, success/failure),{' '}
        <strong className="text-white">Binomial</strong> (k successes in n trials),{' '}
        <strong className="text-white">Poisson</strong> (count of events in fixed time/space),
        and the <strong className="text-white">Normal</strong> (the bell curve — models many
        natural phenomena and underlies the Central Limit Theorem).
      </p>
      <p>
        Two key properties of any distribution:{' '}
        <strong className="text-white">expected value E[X]</strong> (the mean of the distribution
        — the long-run average) and{' '}
        <strong className="text-white">variance Var(X)</strong> (how spread out the distribution is).
        These are computed analytically from the distribution's parameters.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: Choosing a distribution is like choosing a model for a physical
        process. Binomial for "how many emails are spam?" Poisson for "how many server
        requests per second?" Normal for "what's the measurement error?" Match the model to
        the generating process.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Key Distributions Summary</p>
        <div className="space-y-2 text-xs">
          {[
            { name: 'Bernoulli(p)',     type: 'Discrete', params: 'p = success prob', ev: 'p', var: 'p(1−p)', ex: 'Coin flip, email is spam', color: 'blue' },
            { name: 'Binomial(n,p)',    type: 'Discrete', params: 'n trials, p prob',  ev: 'np', var: 'np(1−p)', ex: 'Defects in n items', color: 'violet' },
            { name: 'Poisson(λ)',       type: 'Discrete', params: 'λ = avg rate',       ev: 'λ', var: 'λ', ex: 'Calls/hour, typos/page', color: 'amber' },
            { name: 'Normal(μ,σ²)',     type: 'Continuous', params: 'μ mean, σ² var',  ev: 'μ', var: 'σ²', ex: 'Heights, errors, test scores', color: 'pink' },
          ].map(({ name, type, params, ev, var: v, ex, color }) => (
            <div key={name} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-2`}>
              <div className="grid grid-cols-[120px_60px_100px_30px_30px_1fr] gap-2 items-center font-mono text-[10px]">
                <span className={`text-${color}-300 font-bold font-sans`}>{name}</span>
                <span className="text-gray-500 font-sans">{type}</span>
                <span className="text-gray-400">{params}</span>
                <span className="text-cyan-300">E={ev}</span>
                <span className="text-amber-300">V={v}</span>
                <span className="text-gray-500 font-sans">{ex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-pink-400 font-semibold mb-2">Normal Distribution — 68-95-99.7 Rule</p>
        <div className="flex items-center justify-center gap-4 font-mono text-gray-300">
          <span>μ ± σ → <span className="text-blue-300">68%</span></span>
          <span>μ ± 2σ → <span className="text-violet-300">95%</span></span>
          <span>μ ± 3σ → <span className="text-pink-300">99.7%</span></span>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'PMF',              definition: 'Probability Mass Function. For discrete distributions: P(X = x). Must sum to 1 over all values. Example: P(X=2) for a Binomial.' },
    { term: 'PDF',              definition: 'Probability Density Function. For continuous distributions: P(a ≤ X ≤ b) = ∫f(x)dx from a to b. Area under the curve = 1. P(X = exact value) = 0.' },
    { term: 'CDF',              definition: 'Cumulative Distribution Function. F(x) = P(X ≤ x). Gives the probability of being at or below x. Used for percentiles and p-values.' },
    { term: 'Expected value',   definition: 'E[X] = Σ x·P(X=x) for discrete, ∫ x·f(x)dx for continuous. The long-run average value of the random variable.' },
    { term: 'Bernoulli',        definition: 'Single trial with P(success)=p. E[X]=p, Var(X)=p(1-p). Foundation for Binomial.' },
    { term: 'Binomial(n,p)',    definition: 'Number of successes in n independent Bernoulli trials. P(X=k) = C(n,k)·p^k·(1-p)^(n-k). E[X]=np, Var(X)=np(1-p).' },
    { term: 'Normal(μ,σ²)',     definition: 'Symmetric bell curve. Defined by mean μ and variance σ². 68-95-99.7 rule. Central Limit Theorem states sample means approach Normal as n→∞.' },
  ],

  code: {
    title: 'Working with Distributions in SciPy and NumPy',
    language: 'python',
    snippet: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# ── Binomial distribution ─────────────────────────────────────
# n=10 trials, p=0.3 success probability
n, p = 10, 0.3
binom = stats.binom(n, p)

print(f"E[X] = {binom.mean():.2f}")      # np = 3.0
print(f"Var(X) = {binom.var():.2f}")     # np(1-p) = 2.1
print(f"P(X=4) = {binom.pmf(4):.4f}")   # P exactly 4 successes
print(f"P(X≤4) = {binom.cdf(4):.4f}")   # P at most 4 successes

# ── Poisson distribution ──────────────────────────────────────
lam = 3   # average 3 emails per hour
poisson = stats.poisson(lam)

print(f"P(0 emails) = {poisson.pmf(0):.4f}")   # 0.0498
print(f"P(≥5 emails) = {1 - poisson.cdf(4):.4f}")

# ── Normal distribution ───────────────────────────────────────
mu, sigma = 170, 10   # heights in cm: mean 170, std 10
normal = stats.norm(mu, sigma)

print(f"P(height < 180) = {normal.cdf(180):.4f}")   # 0.8413 → 84.13%
print(f"P(160 < h < 180) = {normal.cdf(180) - normal.cdf(160):.4f}")  # 0.6827 ≈ 68%
print(f"90th percentile = {normal.ppf(0.90):.2f} cm")  # inverse CDF

# ── Z-score ───────────────────────────────────────────────────
height = 185
z = (height - mu) / sigma
print(f"Z-score of {height}cm = {z:.2f}")   # 1.5 standard deviations above mean
print(f"P(height > 185) = {1 - normal.cdf(185):.4f}")  # 0.0668 → top 6.7%

# ── Simulate and check Central Limit Theorem ──────────────────
sample_means = [np.mean(np.random.exponential(5, 30)) for _ in range(5000)]
print(f"Mean of sample means: {np.mean(sample_means):.3f}")  # ≈ 5.0
print(f"Std of sample means:  {np.std(sample_means):.3f}")   # ≈ 5/√30 ≈ 0.913
# Even though the population is exponential, sample means look Normal!`,
    explanation: 'The Central Limit Theorem simulation shows that even for an exponential population (highly skewed), the distribution of sample means is approximately Normal for n=30. This is why so many statistical tests assume normality.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Choosing the right distribution for your data determines model validity.</strong>{' '}
        Fitting a Normal distribution to count data (which can't be negative) or to
        heavily skewed data produces wrong predictions and incorrect confidence intervals.
        Poisson for counts, Binomial for binary events, Normal for symmetric continuous data.
      </p>
      <p>
        The Normal distribution is central to almost all classical statistics and many
        ML algorithms. The Central Limit Theorem ensures that sample means are approximately
        Normal regardless of the underlying distribution — this is why hypothesis tests
        (t-tests, z-tests) work even for non-normal data with large enough samples.
      </p>
    </>
  ),

  commonMistakes: [
    'Fitting a Normal distribution to data that has a hard lower bound (0) — use Poisson, Log-Normal, or Gamma for non-negative data.',
    'Confusing PDF and PMF — you can\'t evaluate P(X = 1.5) for a continuous distribution using a PMF formula. Use CDF for continuous distributions.',
    'Forgetting the "independence" assumption in Binomial — Binomial requires independent trials. Sampling without replacement from a small population violates this.',
    'Using the Normal approximation for Binomial when n is small or p is extreme — the approximation is valid only for n large and p not close to 0 or 1.',
    'Confusing standard deviation with variance — many distribution formulas give variance σ². Take the square root to get σ, which is in the original units.',
  ],

  summary: [
    'PMF (discrete): P(X=x). PDF (continuous): area gives probability. CDF: P(X≤x).',
    'Bernoulli(p): one trial. E=p, Var=p(1-p). Building block of Binomial.',
    'Binomial(n,p): k successes in n trials. E=np, Var=np(1-p).',
    'Poisson(λ): count in fixed time/space. E=λ, Var=λ. Use when events are rare and independent.',
    'Normal(μ,σ²): bell curve. 68-95-99.7 rule. Z = (x−μ)/σ for standardisation.',
    'Central Limit Theorem: sample means → Normal as n→∞, regardless of population distribution.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A call centre receives an average of 8 calls per hour. Using the Poisson distribution, what is the probability of receiving exactly 5 calls in an hour?',
      hint: 'P(X=k) = (λ^k × e^-λ) / k! = (8^5 × e^-8) / 5! = (32768 × 0.000335) / 120 = 10.986/120 ≈ 0.0916. About 9.2% chance of exactly 5 calls.',
    },
    {
      type: 'question',
      text: 'Heights are Normally distributed with mean 170cm and std 8cm. What percentage of people are taller than 186cm? What height is at the 95th percentile?',
      hint: 'Z = (186-170)/8 = 2.0. P(Z > 2) = 1 - 0.9772 = 0.0228 → about 2.3%. For 95th percentile: z = 1.645. Height = μ + z×σ = 170 + 1.645×8 = 183.2cm.',
    },
    {
      type: 'question',
      text: 'A factory produces items with a 5% defect rate. In a batch of 20 items, what is the probability that at most 2 are defective?',
      hint: 'Binomial(n=20, p=0.05). P(X≤2) = P(X=0) + P(X=1) + P(X=2). P(0) = 0.95^20 ≈ 0.358. P(1) = 20×0.05×0.95^19 ≈ 0.377. P(2) = C(20,2)×0.05²×0.95^18 ≈ 0.189. Total ≈ 0.924.',
    },
    {
      type: 'task',
      text: 'Using scipy.stats, plot the PMF of a Binomial(20, 0.3) and the PDF of a Normal(6, √(4.2)²). Compute and label the mean and variance of each. Then simulate 10,000 draws from each and compare the histogram to the theoretical distribution.',
      hint: 'binom_rv = stats.binom(20, 0.3). plt.bar(range(21), binom_rv.pmf(range(21))). For Normal: x=np.linspace(0,15,200), plt.plot(x, stats.norm(6, np.sqrt(4.2)).pdf(x)). Simulation: binom_rv.rvs(10000) and np.random.normal(6, np.sqrt(4.2), 10000).',
    },
  ],
}

export default function ProbabilityDistributionsPage() {
  return <FEDFTopicPage content={content} />
}
