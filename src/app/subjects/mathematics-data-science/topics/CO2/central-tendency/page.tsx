'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Central Tendency',
  subtitle: 'Mean, median, and mode — summarising where data clusters',
  co: 'CO2 — Descriptive Statistics',

  overview: (
    <>
      <p>
        Measures of central tendency answer the question: <em>"What is the typical value?"</em>{' '}
        The three main measures are the <strong className="text-white">mean</strong> (arithmetic
        average), the <strong className="text-white">median</strong> (middle value), and the{' '}
        <strong className="text-white">mode</strong> (most frequent value). Each captures
        "centre" differently and is appropriate for different data types and distributions.
      </p>
      <p>
        The <strong className="text-white">arithmetic mean</strong> is the sum of all values
        divided by the count: x̄ = Σxᵢ / n. It uses every data point, making it sensitive to
        outliers. The <strong className="text-white">median</strong> is the middle value when
        data is sorted — unaffected by extremes. When mean ≠ median, the distribution is skewed
        and the median is often the better "typical" descriptor.
      </p>
      <p>
        Beyond the arithmetic mean, the{' '}
        <strong className="text-white">geometric mean</strong> (for growth rates and ratios)
        and <strong className="text-white">weighted mean</strong> (when observations have
        different importance) are important in data science contexts.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: The mean salary at a company might be $150,000 because the CEO
        earns $5M. The median salary — $65,000 — is a far more honest answer to "what does
        a typical employee earn?" Bill Gates walking into a bar raises the mean wealth of
        everyone there; the median barely changes.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Effect of Outliers on Mean vs Median</p>
        <div className="space-y-3 text-xs font-mono">
          <div>
            <p className="text-gray-400 font-sans mb-1">Dataset without outlier:</p>
            <p className="text-gray-300">[10, 12, 13, 14, 15, 16, 18]</p>
            <p className="text-cyan-300">Mean = 14.0 &nbsp;&nbsp; Median = 14 &nbsp;&nbsp; ← same, symmetric</p>
          </div>
          <div>
            <p className="text-gray-400 font-sans mb-1">Dataset with outlier added:</p>
            <p className="text-gray-300">[10, 12, 13, 14, 15, 16, 18, <span className="text-red-400">200</span>]</p>
            <p className="text-red-300">Mean = 37.25 &nbsp;&nbsp; Median = 14.5 &nbsp;&nbsp; ← mean pulled far from centre</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Which measure to use?</p>
        <div className="space-y-1.5">
          {[
            { measure: 'Mean',     use: 'Symmetric distributions, no outliers, interval/ratio data' },
            { measure: 'Median',   use: 'Skewed distributions (income, house prices), ordinal data' },
            { measure: 'Mode',     use: 'Nominal data, finding most common category, bimodal check' },
            { measure: 'Geometric mean', use: 'Growth rates, investment returns, ratios across time' },
          ].map(({ measure, use }) => (
            <div key={measure} className="flex gap-3">
              <span className="text-amber-300 shrink-0 w-28 font-semibold">{measure}</span>
              <span className="text-gray-400">{use}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Arithmetic mean',   definition: 'x̄ = Σxᵢ / n. Sum of all values divided by count. Uses every data point. Sensitive to outliers. Valid for interval and ratio scales.' },
    { term: 'Median',            definition: 'The middle value when data is sorted. For even n, average of two middle values. Resistant to outliers. Valid for ordinal, interval, ratio.' },
    { term: 'Mode',              definition: 'The most frequently occurring value. Can be used for any scale, including nominal. A dataset can be unimodal, bimodal, or multimodal.' },
    { term: 'Weighted mean',     definition: 'x̄w = Σ(wᵢxᵢ) / Σwᵢ. Each value contributes proportionally to its weight. Used for GPA (credit-weighted), portfolio returns.' },
    { term: 'Geometric mean',    definition: 'GM = (x₁ × x₂ × … × xₙ)^(1/n). Used for multiplicative quantities: growth rates, investment returns. Always ≤ arithmetic mean.' },
    { term: 'Skewness effect',   definition: 'Right skew (positive): mean > median > mode. Left skew (negative): mean < median < mode. The direction of skew pulls the mean toward the tail.' },
    { term: 'Trimmed mean',      definition: 'Mean after removing a percentage of extreme values (e.g. top and bottom 5%). Balance between mean\'s efficiency and median\'s robustness.' },
  ],

  code: {
    title: 'Computing Central Tendency Measures in Python',
    language: 'python',
    snippet: `import pandas as pd
import numpy as np
from scipy import stats

salaries = pd.Series([45000, 48000, 52000, 55000, 60000, 65000, 70000, 500000])

# ── Arithmetic mean ───────────────────────────────────────────
mean = salaries.mean()
print(f"Mean:   {mean:,.0f}")      # 111,875 — pulled by outlier

# ── Median ────────────────────────────────────────────────────
median = salaries.median()
print(f"Median: {median:,.0f}")    # 57,500 — representative of typical worker

# ── Mode ──────────────────────────────────────────────────────
mode_result = salaries.mode()
print(f"Mode:   {mode_result.values}")  # [45000, 48000, ...] — all unique here

# ── For categorical data: mode is the only valid measure ──────
grades = pd.Series(['B', 'A', 'A', 'C', 'B', 'A', 'B'])
print(grades.mode()[0])            # 'A' — most frequent

# ── Weighted mean ─────────────────────────────────────────────
marks    = np.array([85, 72, 90])    # scores in subjects
credits  = np.array([4, 3, 5])       # credit hours
weighted_mean = np.average(marks, weights=credits)
print(f"Weighted GPA: {weighted_mean:.2f}")   # 83.58

# ── Geometric mean (for growth rates) ────────────────────────
growth_rates = np.array([1.10, 1.25, 0.95, 1.30])  # 10%, 25%, -5%, 30%
geo_mean = stats.gmean(growth_rates)
print(f"Avg growth factor: {geo_mean:.4f}")   # 1.1468 → ~14.7% average growth

# ── Trimmed mean ──────────────────────────────────────────────
trimmed = stats.trim_mean(salaries, 0.1)   # trim 10% from each end
print(f"Trimmed mean: {trimmed:,.0f}")`,
    explanation: 'The salary example shows why median is reported in economic contexts: the mean ($111,875) is driven by the $500,000 outlier and does not represent any typical employee. The median ($57,500) is a far more honest central value.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Central tendency statistics are routinely misused to mislead.</strong>{' '}
        "Average income grew by 15%" sounds good — but if the growth went entirely to the
        top 1%, the median income may have fallen. Always ask which measure of centre is
        being reported and why.
      </p>
      <p>
        In machine learning, the mean is used in many algorithms — linear regression
        minimises mean squared error; feature scaling uses mean and standard deviation.
        Understanding when the mean is misleading (outliers, skewed data) helps you choose
        robust alternatives (median imputation, log transformation before modelling).
      </p>
      <p>
        The geometric mean is essential for averaging rates and ratios. A portfolio that
        gains 100% one year and loses 50% the next has an arithmetic mean return of 25% —
        but actually ends up back at break-even. The geometric mean correctly gives 0%.
      </p>
    </>
  ),

  commonMistakes: [
    'Reporting the mean for skewed distributions (income, house prices) — the median is almost always more representative in these cases.',
    'Computing the mean of categorical or ordinal data without encoding — the mean of ["A", "B", "C"] is undefined.',
    'Ignoring bimodality — a single mean or median can hide a bimodal distribution (e.g. two distinct groups in the data).',
    'Using arithmetic mean for growth rates — average of +100% and -50% is +25%, but you end up with the same money you started with. Use geometric mean.',
    'Not checking the skewness before choosing mean vs median — always plot the distribution first.',
  ],

  summary: [
    'Arithmetic mean: Σxᵢ/n. Uses every point; sensitive to outliers. Best for symmetric data.',
    'Median: middle value. Robust to outliers. Best for skewed distributions (income, prices).',
    'Mode: most frequent value. Only valid measure for nominal data.',
    'Weighted mean: Σ(wᵢxᵢ)/Σwᵢ. Used for GPA, portfolio returns where values have different importance.',
    'Geometric mean: (x₁ × x₂ × … × xₙ)^(1/n). Used for averaging growth rates and ratios.',
    'Right skew: mean > median. Left skew: mean < median. Skew direction = direction outliers pull the mean.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A company reports the "average salary" is $95,000, but most employees earn between $40,000 and $70,000. What is likely happening, and what would be a better statistic to report?',
      hint: 'The mean is being pulled by a few very high executive salaries. The median would better represent the typical employee\'s salary. The shape of the distribution is right-skewed — the mean > median because the tail pulls the mean up.',
    },
    {
      type: 'question',
      text: 'An investment grows by 50% in year 1 and falls by 50% in year 2. What is the arithmetic mean return? The geometric mean return? Which is correct?',
      hint: 'Arithmetic mean: (50% + (-50%)) / 2 = 0%. Geometric mean: √(1.5 × 0.5) = √0.75 ≈ 0.866, so -13.4% per year. Start with $100 → $150 → $75. You lost money. The geometric mean (-13.4%) is correct; the arithmetic mean (0%) is misleading for growth rates.',
    },
    {
      type: 'question',
      text: 'You have a dataset of daily website visits: [500, 480, 510, 490, 520, 495, 50000]. Which measure of centre should you report and why?',
      hint: 'The median (495) — the 50,000 value (possibly a bot attack or viral day) is an extreme outlier that pulls the mean to ~7,577, which is not representative of a typical day. Report both: median for typical behaviour, and note the outlier separately as a special event.',
    },
    {
      type: 'task',
      text: 'Load a dataset with a numeric column that has outliers (e.g. the "fare" column in Titanic). Compute the mean, median, and trimmed mean (10%). Plot a histogram. Explain which measure best represents the typical value.',
      hint: 'sns.histplot(df["fare"]) will show right skew. Mean will be much higher than median because of high first-class fares. Trimmed mean will fall between them. The median is most representative of "typical" fare.',
    },
  ],
}

export default function CentralTendencyPage() {
  return <FEDFTopicPage content={content} />
}
