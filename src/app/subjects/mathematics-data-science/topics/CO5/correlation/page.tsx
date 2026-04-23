'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Correlation',
  subtitle: "Pearson's r, Spearman's ρ, and the difference between correlation and causation",
  co: 'CO5 — Regression & Correlation',

  overview: (
    <>
      <p>
        <strong className="text-white">Correlation</strong> measures the strength and direction
        of the linear relationship between two variables. The{' '}
        <strong className="text-white">Pearson correlation coefficient r</strong> ranges from
        −1 (perfect negative linear relationship) to +1 (perfect positive linear relationship),
        with 0 indicating no linear relationship.
      </p>
      <p>
        Pearson's r requires both variables to be continuous and roughly normally distributed,
        and it only captures <em>linear</em> relationships. For ordinal data or
        non-linear-but-monotonic relationships,{' '}
        <strong className="text-white">Spearman's ρ (rho)</strong> is preferred — it correlates
        the ranks of the values rather than the values themselves and is more robust to outliers.
      </p>
      <p>
        The most important warning in all of statistics:{' '}
        <strong className="text-white">correlation ≠ causation</strong>. Two variables can be
        strongly correlated due to a common cause (confounding), coincidence, or reverse causality.
        Establishing causation requires experimental design or causal inference methods.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: Ice cream sales and drowning rates are positively correlated.
        Cause? Neither causes the other — hot weather (confounder) causes both. This is
        exactly why correlation alone never implies causation.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Interpreting r</p>
        <div className="space-y-2 text-xs">
          {[
            { range: '|r| = 1.0', label: 'Perfect', desc: 'All points on a straight line', color: 'emerald' },
            { range: '0.7–1.0', label: 'Strong', desc: 'Clear linear trend, low scatter', color: 'green' },
            { range: '0.4–0.7', label: 'Moderate', desc: 'Visible trend with notable scatter', color: 'amber' },
            { range: '0.1–0.4', label: 'Weak', desc: 'Faint trend, lots of scatter', color: 'orange' },
            { range: '|r| ≈ 0', label: 'None', desc: 'No linear relationship (may be non-linear)', color: 'red' },
          ].map(({ range, label, desc, color }) => (
            <div key={label} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-2 flex gap-3 items-center`}>
              <span className={`text-${color}-300 font-mono w-20 shrink-0`}>{range}</span>
              <span className={`text-${color}-300 font-semibold w-16 shrink-0`}>{label}</span>
              <span className="text-gray-400">{desc}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs font-mono">
        <p className="text-cyan-400 font-sans font-semibold mb-2">Pearson formula</p>
        <p className="text-white">r = Σ(xᵢ−x̄)(yᵢ−ȳ) / [√Σ(xᵢ−x̄)² · √Σ(yᵢ−ȳ)²]</p>
        <p className="text-gray-500 font-sans mt-1">= covariance(X,Y) / (σₓ · σᵧ)</p>
      </div>
    </div>
  ),

  concepts: [
    { term: "Pearson's r",           definition: 'Measures linear correlation between two continuous variables. r = Cov(X,Y) / (σₓ σᵧ). Range: −1 to +1. Only detects linear relationships. Sensitive to outliers.' },
    { term: "Spearman's ρ",          definition: 'Correlation of ranks. Works for ordinal data and non-linear-but-monotonic relationships. Robust to outliers. Computed as Pearson r on the ranked data.' },
    { term: 'Covariance',            definition: 'Cov(X,Y) = Σ(xᵢ−x̄)(yᵢ−ȳ)/n. Measures joint variation. Positive: X and Y move together. Negative: move opposite. Units are the product of X and Y units — hard to interpret.' },
    { term: 'Coefficient of determination (r²)', definition: 'r² = proportion of variance in Y explained by X. r=0.8 → r²=0.64 → 64% of Y\'s variance is explained by the linear relationship with X.' },
    { term: 'Correlation vs causation', definition: 'Correlation measures association, not cause and effect. Confounding variables, coincidence, and reverse causality can all produce correlations without any causal link.' },
    { term: 'Confounding variable',  definition: 'A third variable that causes both X and Y, creating a spurious correlation between them. Example: exercise (X), weight (Y), both caused by lifestyle (confounder).' },
    { term: 'Correlation matrix',    definition: 'A symmetric matrix showing pairwise correlations between all numeric variables in a dataset. Diagonal = 1.0. Used for feature selection in machine learning.' },
  ],

  code: {
    title: 'Computing and Visualising Correlations in Python',
    language: 'python',
    snippet: `import numpy as np
import pandas as pd
from scipy import stats
import seaborn as sns
import matplotlib.pyplot as plt

np.random.seed(42)
n = 100

# ── Generate related data ─────────────────────────────────────
x = np.random.normal(50, 10, n)
y_strong = 2 * x + np.random.normal(0, 5, n)     # strong linear
y_weak   = 0.5 * x + np.random.normal(0, 20, n)  # weak linear
y_nonlin = np.sin(x / 10) + np.random.normal(0, 0.2, n)  # non-linear

# ── Pearson correlation ───────────────────────────────────────
r_strong, p_strong = stats.pearsonr(x, y_strong)
r_weak,   p_weak   = stats.pearsonr(x, y_weak)
r_nonlin, p_nonlin = stats.pearsonr(x, y_nonlin)

print(f"Strong: r={r_strong:.3f}, p={p_strong:.4f}")
print(f"Weak:   r={r_weak:.3f}, p={p_weak:.4f}")
print(f"Non-linear (Pearson): r={r_nonlin:.3f}")  # misleadingly low!

# ── Spearman correlation (ranks) ──────────────────────────────
rho_nonlin, p_rho = stats.spearmanr(x, y_nonlin)
print(f"Non-linear (Spearman): ρ={rho_nonlin:.3f}")  # may differ from Pearson

# ── Correlation matrix ────────────────────────────────────────
df = pd.DataFrame({
    'study_hours': np.random.normal(5, 2, n),
    'sleep_hours': np.random.normal(7, 1, n),
    'exam_score':  None,
    'stress':      np.random.normal(5, 2, n),
})
df['exam_score'] = 8 * df['study_hours'] - 3 * df['stress'] + np.random.normal(0, 5, n)

corr_matrix = df.corr()
print("\\nCorrelation matrix:")
print(corr_matrix.round(3))

# ── Visualise ─────────────────────────────────────────────────
plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0,
            vmin=-1, vmax=1, fmt='.2f')
plt.title('Correlation Matrix')
plt.tight_layout()
plt.show()

# ── r² interpretation ────────────────────────────────────────
print(f"\\nr² (strong): {r_strong**2:.3f}")  # ~fraction of variance explained
print(f"r² (weak):   {r_weak**2:.3f}")`,
    explanation: 'The non-linear example is critical: Pearson r may be low for a clear non-linear pattern (like a sine wave), falsely suggesting no relationship. Always plot your data (scatter plot) before relying on r. Spearman\'s ρ is more robust for non-linear-but-monotonic relationships.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Correlation matrices are the entry point for feature selection in ML.</strong>{' '}
        Highly correlated features (r &gt; 0.9) add redundancy and can harm some models
        (linear regression has multicollinearity issues). Dropping one of two highly
        correlated features often improves model interpretability without hurting performance.
      </p>
      <p>
        r² from a correlation is directly interpretable as "variance explained." A model feature
        with r = 0.7 with the target explains 49% of the target's variance — a strong signal.
        Features with |r| &lt; 0.1 against the target contribute almost nothing and are candidates
        for removal. This is the simplest form of feature importance for linear relationships.
      </p>
    </>
  ),

  commonMistakes: [
    'Concluding causation from correlation — the most common statistical error. Always ask "what confounders might explain this?"',
    'Ignoring non-linear relationships — Pearson r only measures linear correlation. A U-shaped relationship has r≈0 even though there is a strong relationship. Always plot first.',
    'Not testing significance of r — r=0.4 in a sample of n=10 may not be statistically significant. Use scipy.stats.pearsonr to get the p-value.',
    'Using Pearson r for ordinal data (e.g. Likert scales) — use Spearman\'s ρ instead.',
    'Confusing correlation with slope — r tells you the strength and direction, not the magnitude of change. r=0.9 does not mean "1 unit increase in X causes 0.9 unit increase in Y."',
  ],

  summary: [
    'Pearson r: linear correlation, −1 to +1. r=0 means no linear relationship (not no relationship).',
    'Spearman ρ: rank-based, robust to outliers and non-linear-but-monotonic relationships.',
    'r² = proportion of variance in Y explained by the linear relationship with X.',
    'Covariance = unstandardised version of correlation. Units depend on X and Y — not interpretable across datasets.',
    'Correlation matrix: pairwise correlations for all features. Used for feature selection and multicollinearity detection.',
    'Correlation ≠ causation. Always ask about confounders, reverse causality, and spurious correlations.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What does r = −0.85 tell you? What does r² = 0.72 tell you?',
      hint: 'r = −0.85: strong negative linear relationship — as X increases, Y tends to decrease, and the points cluster closely around a downward-sloping line. r² = 0.72: 72% of the variance in Y is explained by the linear relationship with X. The remaining 28% is due to other factors or noise.',
    },
    {
      type: 'question',
      text: 'Countries with more TVs per capita have higher life expectancy. Does this mean TVs cause longer life? Identify the confound.',
      hint: 'Confound: wealth/development. Wealthier countries both have more TVs AND better healthcare, nutrition, and sanitation (leading to longer life). TVs don\'t cause longer life — both are caused by economic development. This is a classic spurious correlation through a confounder.',
    },
    {
      type: 'question',
      text: 'When should you use Spearman\'s ρ instead of Pearson\'s r?',
      hint: '(1) Ordinal data (ratings, rankings, Likert scales). (2) Non-normal distributions or heavy outliers — Spearman is more robust. (3) Non-linear but monotonic relationships (both increase/decrease together, but not at constant rate). (4) When rank-ordering matters more than exact values.',
    },
    {
      type: 'task',
      text: 'Load the seaborn "tips" dataset. Compute the full correlation matrix. Identify the strongest and weakest correlations. Plot a heatmap. Then create a scatter plot of total_bill vs tip and compute both Pearson r and Spearman ρ.',
      hint: 'import seaborn as sns; tips = sns.load_dataset("tips"). tips.select_dtypes(include=float).corr(). sns.heatmap(corr, annot=True). scipy.stats.pearsonr(tips.total_bill, tips.tip) and spearmanr(). Compare the two correlation coefficients.',
    },
  ],
}

export default function CorrelationPage() {
  return <FEDFTopicPage content={content} />
}
