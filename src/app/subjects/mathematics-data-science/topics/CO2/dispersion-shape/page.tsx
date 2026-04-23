'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Dispersion & Shape',
  subtitle: 'Variance, standard deviation, IQR, skewness, and kurtosis — measuring spread and distribution shape',
  co: 'CO2 — Descriptive Statistics',

  overview: (
    <>
      <p>
        Central tendency tells you where data clusters, but two datasets with the same mean
        can look completely different. <strong className="text-white">Measures of dispersion</strong>{' '}
        describe how spread out the data is. The most common are{' '}
        <strong className="text-white">variance</strong> (average squared deviation from mean),{' '}
        <strong className="text-white">standard deviation</strong> (square root of variance,
        in original units), and <strong className="text-white">IQR</strong> (Q3 − Q1,
        the middle 50% spread).
      </p>
      <p>
        <strong className="text-white">Skewness</strong> measures the symmetry of a distribution.
        A right-skewed (positive) distribution has a long right tail — the mean is pulled to
        the right of the median. A left-skewed (negative) distribution has a long left tail.
        Symmetric distributions have skewness ≈ 0.
      </p>
      <p>
        <strong className="text-white">Kurtosis</strong> measures the "tail heaviness" of a
        distribution. High kurtosis (leptokurtic) means more data in the tails — more extreme
        events than a normal distribution would predict. This is critical in finance and risk
        management where "fat tails" can be catastrophic.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: Two archery sessions both average a bullseye, but one session
        has all arrows clustered tightly (low variance) while the other is scattered across
        the target (high variance). Same mean, completely different spread.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Dispersion Formulas</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
            <p className="text-violet-300 font-sans font-semibold mb-1">Variance</p>
            <p>σ² = Σ(xᵢ − x̄)² / n</p>
            <p className="text-gray-500 font-sans mt-1">Units: squared. Hard to interpret directly.</p>
          </div>
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
            <p className="text-pink-300 font-sans font-semibold mb-1">Std Deviation</p>
            <p>σ = √(σ²)</p>
            <p className="text-gray-500 font-sans mt-1">Same units as data. Most interpretable spread.</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <p className="text-amber-300 font-sans font-semibold mb-1">IQR</p>
            <p>IQR = Q3 − Q1</p>
            <p className="text-gray-500 font-sans mt-1">Middle 50% range. Robust to outliers.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
          <p className="text-cyan-400 font-semibold mb-2">Skewness</p>
          <div className="space-y-1 text-gray-400">
            <p>Positive (right): long right tail → mean &gt; median</p>
            <p>Negative (left): long left tail → mean &lt; median</p>
            <p>Zero: symmetric (e.g. normal distribution)</p>
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
          <p className="text-green-400 font-semibold mb-2">Kurtosis</p>
          <div className="space-y-1 text-gray-400">
            <p>Normal: excess kurtosis = 0</p>
            <p>Leptokurtic (&gt;0): fat tails, more outliers</p>
            <p>Platykurtic (&lt;0): thin tails, fewer outliers</p>
          </div>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Variance (σ²)',     definition: 'Average of squared deviations from the mean: σ² = Σ(xᵢ − x̄)² / n. Squaring penalises large deviations. Units are squared, making it hard to interpret directly.' },
    { term: 'Standard deviation', definition: 'Square root of variance: σ = √σ². Same units as the original data. In a normal distribution: 68% of data within 1σ, 95% within 2σ, 99.7% within 3σ (68-95-99.7 rule).' },
    { term: 'IQR',               definition: 'Interquartile Range = Q3 − Q1. The spread of the middle 50% of data. Robust to outliers. Used in box plots. Outlier fences: Q1 − 1.5×IQR and Q3 + 1.5×IQR.' },
    { term: 'Population vs sample', definition: 'Population variance divides by n. Sample variance divides by n−1 (Bessel\'s correction) to get an unbiased estimate. Pandas uses n−1 by default (ddof=1).' },
    { term: 'Skewness',          definition: 'Measures asymmetry. Positive = right tail. Negative = left tail. |skewness| > 1 is considered highly skewed. Computed as the standardised third moment.' },
    { term: 'Kurtosis',          definition: 'Measures tail weight relative to a normal distribution. Excess kurtosis = 0 for normal. Positive = heavier tails (more outliers). Negative = lighter tails.' },
    { term: 'Coefficient of variation (CV)', definition: 'CV = (σ / x̄) × 100%. Relative dispersion as a percentage of the mean. Allows comparing spread across datasets with different units or scales.' },
  ],

  code: {
    title: 'Measuring Spread and Distribution Shape in Python',
    language: 'python',
    snippet: `import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns

scores = pd.Series([72, 68, 85, 90, 74, 66, 95, 78, 82, 71, 88, 200])

# ── Dispersion ────────────────────────────────────────────────
print(f"Variance (sample): {scores.var():.2f}")   # ddof=1 by default
print(f"Std dev:           {scores.std():.2f}")
print(f"Range:             {scores.max() - scores.min()}")

# IQR
Q1 = scores.quantile(0.25)
Q3 = scores.quantile(0.75)
IQR = Q3 - Q1
print(f"IQR: {IQR:.2f}   Q1: {Q1}   Q3: {Q3}")

# ── Skewness & Kurtosis ───────────────────────────────────────
print(f"Skewness: {scores.skew():.4f}")       # > 0 → right skew (200 pulls it right)
print(f"Kurtosis: {scores.kurtosis():.4f}")   # excess kurtosis (vs normal)

# ── Scipy for detailed stats ──────────────────────────────────
desc = stats.describe(scores)
print(f"N: {desc.nobs}, Mean: {desc.mean:.2f}, Variance: {desc.variance:.2f}")
print(f"Skewness: {desc.skewness:.4f}, Kurtosis: {desc.kurtosis:.4f}")

# ── Coefficient of Variation ──────────────────────────────────
cv = (scores.std() / scores.mean()) * 100
print(f"CV: {cv:.2f}%")   # relative spread as % of mean

# ── Visualisation ─────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
sns.histplot(scores, kde=True, ax=axes[0])
axes[0].axvline(scores.mean(), color='red', label='Mean')
axes[0].axvline(scores.median(), color='blue', label='Median')
axes[0].legend()

sns.boxplot(y=scores, ax=axes[1])   # visualises Q1, Q3, IQR, outliers
plt.tight_layout()
plt.show()`,
    explanation: 'The box plot directly visualises IQR (the box), median (middle line), whiskers (up to 1.5×IQR), and outliers (individual dots). It\'s the most efficient single plot for understanding dispersion.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Two datasets with identical means and standard deviations can have very different shapes.</strong>{' '}
        This is Anscombe's Quartet — always visualise your data before computing statistics.
        Skewness and kurtosis reveal distribution features that mean and variance hide.
      </p>
      <p>
        Standard deviation is the backbone of statistical inference. Confidence intervals,
        Z-scores, t-tests, and normal distribution calculations all require σ. Understanding
        the 68-95-99.7 rule lets you immediately interpret how unusual a value is: a score
        3σ above the mean is in the top 0.15% of the distribution.
      </p>
      <p>
        The IQR's robustness makes it essential for outlier detection and non-parametric
        statistics. When data is skewed or contains outliers, IQR is a better spread measure
        than standard deviation, which is sensitive to extreme values.
      </p>
    </>
  ),

  commonMistakes: [
    'Using population variance (÷n) when you have a sample — use sample variance (÷n−1) for unbiased estimation. Pandas .var() uses n−1 by default.',
    'Reporting standard deviation without context — σ=10 means nothing alone. Report as "mean ± σ" or as the coefficient of variation for context.',
    'Ignoring skewness before modelling — many algorithms assume normality. Right-skewed features often need log transformation before being fed to linear models.',
    'Confusing kurtosis with variance — kurtosis measures tail weight, not spread. A leptokurtic distribution can have the same variance as a platykurtic one.',
    'Not visualising the distribution — two datasets can have identical mean, variance, and even skewness but look completely different in shape.',
  ],

  summary: [
    'Variance σ²: average squared deviation from mean. Units are squared — not directly interpretable.',
    'Standard deviation σ = √σ². Same units as data. 68-95-99.7 rule for normal distributions.',
    'IQR = Q3 − Q1: spread of the middle 50%. Robust to outliers. Used in box plots.',
    'Sample variance uses n−1 (Bessel\'s correction). Pandas .var() and .std() default to this.',
    'Skewness: > 0 = right tail (mean > median). < 0 = left tail. |skewness| > 1 = highly skewed.',
    'Kurtosis: excess > 0 = fatter tails than normal (more extreme events). < 0 = thinner tails.',
  ],

  practice: [
    {
      type: 'question',
      text: 'Why does sample variance divide by n−1 instead of n?',
      hint: 'Dividing by n underestimates the true population variance because we\'re estimating the mean from the same sample (losing one degree of freedom). Dividing by n−1 (Bessel\'s correction) produces an unbiased estimator — on average, it equals the true population variance.',
    },
    {
      type: 'question',
      text: 'A distribution has skewness = 1.8. What does this tell you about the mean, median, and the shape of the distribution?',
      hint: 'Skewness of 1.8 is highly positive — strong right skew. Long tail extends to the right. Mean > median (mean is pulled toward the tail). Mode < median < mean is the typical order. Examples: income distribution, house prices, social media followers.',
    },
    {
      type: 'question',
      text: 'Two investment strategies have the same mean return and standard deviation, but Strategy A has kurtosis = 3 and Strategy B has kurtosis = 8. Which is riskier and why?',
      hint: 'Strategy B (excess kurtosis = 8) has fatter tails — more probability mass in the extremes. This means more frequent large gains AND large losses than the normal distribution would predict. Even though σ is the same, B carries more extreme event (black swan) risk. In finance, high kurtosis is called "fat-tail risk."',
    },
    {
      type: 'task',
      text: 'Load a dataset (e.g. Titanic "age" or any numeric column). Compute variance, std, IQR, skewness, and kurtosis. Plot a histogram with mean and median lines, and a box plot. Write 2 sentences describing the distribution\'s shape and spread.',
      hint: 'df["age"].var(), .std(), .skew(), .kurtosis(). Q1/Q3 via .quantile(). Plot: sns.histplot() + axvline for mean/median. Box plot: sns.boxplot(y=df["age"]). Look for: is it right-skewed (age skews right)? Are there outliers (dots beyond whiskers)?',
    },
  ],
}

export default function DispersionShapePage() {
  return <FEDFTopicPage content={content} />
}
