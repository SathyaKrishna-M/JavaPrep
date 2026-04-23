'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Data Visualization',
  subtitle: 'Choosing the right chart, Matplotlib & Seaborn, and the principles of effective visualisation',
  co: 'CO6 — Visualization & Decision Making',

  overview: (
    <>
      <p>
        <strong className="text-white">Data visualisation</strong> is the graphical representation
        of data to communicate patterns, trends, and insights. The right chart makes a complex
        dataset instantly understandable; the wrong chart — or a misleading one — can distort
        the truth as badly as incorrect analysis.
      </p>
      <p>
        Chart choice depends on what you want to show:{' '}
        <strong className="text-white">distribution</strong> (histogram, box plot, violin plot),{' '}
        <strong className="text-white">relationship</strong> (scatter plot, heatmap),{' '}
        <strong className="text-white">composition</strong> (stacked bar, pie chart),{' '}
        <strong className="text-white">comparison</strong> (bar chart, grouped bars),{' '}
        <strong className="text-white">trend over time</strong> (line chart).
      </p>
      <p>
        Python's <strong className="text-white">Matplotlib</strong> is the foundation —
        full control, verbose syntax. <strong className="text-white">Seaborn</strong> builds
        on Matplotlib with a statistical focus: built-in grouping, automatic confidence
        intervals, and elegant defaults. <strong className="text-white">Plotly</strong> adds
        interactivity for dashboards and web apps.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Edward Tufte's principle: maximise the data-to-ink ratio. Every element of a chart
        should serve the data. Remove gridlines, borders, and decorations that don't add
        information — they are "chartjunk" that competes with the actual insight.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Chart Selection Guide</p>
        <div className="space-y-2 text-xs">
          {[
            { goal: 'Distribution (1 var)', charts: 'Histogram, KDE, Box plot, Violin plot', color: 'blue' },
            { goal: 'Relationship (2 vars)', charts: 'Scatter plot, Regression plot, Heatmap', color: 'violet' },
            { goal: 'Comparison (categories)', charts: 'Bar chart, Grouped bars, Box plots by group', color: 'emerald' },
            { goal: 'Trend over time', charts: 'Line chart, Area chart', color: 'amber' },
            { goal: 'Composition', charts: 'Stacked bar, Treemap (NOT pie for >4 segments)', color: 'pink' },
          ].map(({ goal, charts, color }) => (
            <div key={goal} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-2 flex gap-3`}>
              <span className={`text-${color}-300 font-semibold shrink-0 w-36`}>{goal}</span>
              <span className="text-gray-400">{charts}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-cyan-400 font-semibold mb-2">Common Visualisation Mistakes</p>
        <div className="space-y-1 text-gray-400">
          <p>• Truncated y-axis (starting at non-zero to exaggerate differences)</p>
          <p>• 3D charts that distort proportions</p>
          <p>• Pie charts with many segments (use bar chart)</p>
          <p>• Dual y-axes with misleading scale alignment</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Histogram',        definition: 'Shows the distribution of a single continuous variable. Bars represent frequency (or density) within value ranges (bins). Reveals shape, skewness, and modality. Bin width choice matters.' },
    { term: 'Box plot',         definition: 'Shows median, Q1, Q3 (the box), whiskers (±1.5×IQR), and outliers (dots). Excellent for comparing distributions across groups. More compact than histograms.' },
    { term: 'Scatter plot',     definition: 'Shows the relationship between two continuous variables. Each point = one observation. Reveals correlations, clusters, outliers, and non-linear patterns.' },
    { term: 'Heatmap',          definition: 'Colour-encodes values in a matrix. Used for correlation matrices, confusion matrices, and pivot tables. Diverging colormaps for data with a meaningful centre (e.g. correlation).' },
    { term: 'Seaborn pairplot', definition: 'Grid of scatter plots for all pairs of numeric variables, with distributions on the diagonal. Best for initial multivariate EDA — reveals correlations and variable shapes at a glance.' },
    { term: 'Facet/small multiples', definition: 'Same chart repeated for different subgroups side by side. Allows visual comparison without overloading one plot. seaborn.FacetGrid or catplot(col=...).' },
    { term: 'Data-ink ratio',   definition: 'Tufte\'s principle: every drop of ink should convey data. Remove chart borders, gridlines, tick marks, and backgrounds that don\'t add information. Maximise clarity.' },
  ],

  code: {
    title: 'Essential Visualisations with Matplotlib and Seaborn',
    language: 'python',
    snippet: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Use seaborn's clean style
sns.set_theme(style='whitegrid', palette='muted')

# ── Load example data ─────────────────────────────────────────
tips = sns.load_dataset('tips')
iris = sns.load_dataset('iris')

# ── Distribution: histogram + KDE ────────────────────────────
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

sns.histplot(tips['total_bill'], kde=True, ax=axes[0])
axes[0].set_title('Distribution: Total Bill')

# Box plots by group
sns.boxplot(data=tips, x='day', y='total_bill', ax=axes[1])
axes[1].set_title('Comparison by Day')

# Violin plot (combines box + distribution)
sns.violinplot(data=tips, x='sex', y='tip', hue='smoker', split=True, ax=axes[2])
axes[2].set_title('Violin: Tip by Sex & Smoking')
plt.tight_layout(); plt.show()

# ── Relationship: scatter + regression line ────────────────────
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

sns.scatterplot(data=tips, x='total_bill', y='tip', hue='size', size='size',
                sizes=(20, 200), ax=axes[0])
axes[0].set_title('Scatter: Bill vs Tip (coloured by size)')

sns.regplot(data=tips, x='total_bill', y='tip', ax=axes[1])
axes[1].set_title('Regression: Bill vs Tip with CI')
plt.tight_layout(); plt.show()

# ── Correlation heatmap ───────────────────────────────────────
corr = iris.drop('species', axis=1).corr()
plt.figure(figsize=(6, 5))
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0, fmt='.2f',
            square=True, linewidths=0.5)
plt.title('Iris Feature Correlations')
plt.show()

# ── Pairplot: multivariate EDA ────────────────────────────────
sns.pairplot(iris, hue='species', diag_kind='kde')
plt.suptitle('Pairplot: Iris Dataset', y=1.02)
plt.show()

# ── Facet: same chart per category ───────────────────────────
g = sns.FacetGrid(tips, col='day', row='sex', height=3)
g.map_dataframe(sns.scatterplot, x='total_bill', y='tip', alpha=0.5)
g.set_titles(col_template='{col_name}', row_template='{row_name}')
plt.show()`,
    explanation: 'seaborn.regplot automatically adds a regression line with confidence interval shading. pairplot is the fastest way to explore relationships between all numeric variables in a new dataset — always run this early in EDA.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Exploratory Data Analysis (EDA) via visualisation is the first step in any data science project.</strong>{' '}
        A histogram might reveal unexpected bimodality. A scatter plot might show the
        "linear" relationship is actually exponential. A box plot might reveal that
        "outliers" are actually a separate subpopulation. No statistical test replaces
        looking at the data.
      </p>
      <p>
        Visualisations also communicate results to stakeholders who don't read model outputs.
        A well-designed chart makes a finding undeniable — a poorly designed one gets ignored
        or misunderstood. Data scientists who can visualise clearly are significantly more
        impactful than those who can only model.
      </p>
    </>
  ),

  commonMistakes: [
    'Using bar charts for continuous data — use histograms instead. Bar charts are for categorical comparisons.',
    'Using pie charts with more than 4–5 segments — humans can\'t compare angles accurately. Use a sorted bar chart instead.',
    'Not labelling axes and titles — a chart without context is useless. Always include units on axes.',
    'Using rainbow colourmaps (jet) — perceptually non-uniform and inaccessible to colourblind readers. Use viridis, plasma, or coolwarm.',
    'Not checking outliers before plotting — one extreme outlier can compress the rest of the data into an unreadable strip. Use boxplots to detect outliers first, then decide whether to clip or note them.',
  ],

  summary: [
    'Match chart type to question: distribution → histogram/boxplot; relationship → scatter; comparison → bar; trend → line.',
    'Seaborn builds on Matplotlib for statistical plots. sns.histplot(), boxplot(), scatterplot(), heatmap(), pairplot().',
    'Pairplot: the fastest multivariate EDA tool — one call to see all pairwise scatter plots and distributions.',
    'Correlation heatmap: use cmap="coolwarm", center=0, annot=True for readable correlation matrices.',
    'Data-ink ratio: remove chart borders, heavy gridlines, and decorations. Every element should serve the data.',
    'Always label axes with units, add a meaningful title, and use colourblind-safe palettes.',
  ],

  practice: [
    {
      type: 'question',
      text: 'You have sales data by product category over 12 months. What chart type would you use to show (a) how total sales are distributed across categories and (b) the trend for each category over time?',
      hint: '(a) Bar chart (sorted descending) for comparing total sales across categories. Pie chart is poor for >4 categories. (b) Line chart with one line per category — shows trends over time, with each month on the x-axis. If many categories overlap, consider a small multiples/facet approach.',
    },
    {
      type: 'question',
      text: 'What does a "truncated y-axis" mean in a bar chart, and why is it deceptive?',
      hint: 'A truncated y-axis starts at a value above 0. In a bar chart, the visual impression of bar height represents magnitude — if the axis starts at 90 instead of 0, a bar going from 90 to 95 looks 5× taller relative to one going 90 to 91, even though the actual difference is small. This makes trivial differences look dramatic. Always start bar chart y-axes at 0.',
    },
    {
      type: 'question',
      text: 'When would you use a violin plot instead of a box plot?',
      hint: 'Violin plots show the full distribution shape (like a KDE sideways), not just quartiles. Use violin plots when: (1) the distribution is multimodal (two humps) — a box plot hides this. (2) You want to compare distribution shapes across groups. Box plots are more compact and better for outlier identification; violin plots show the full shape at the cost of being harder to read precisely.',
    },
    {
      type: 'task',
      text: 'Load the seaborn "penguins" dataset. Create: (1) A histogram of flipper_length_mm, (2) A box plot of body_mass_g by species, (3) A scatter plot of flipper_length vs body_mass coloured by species, (4) A correlation heatmap. What patterns do you notice?',
      hint: 'penguins = sns.load_dataset("penguins"). sns.histplot(penguins.flipper_length_mm, kde=True). sns.boxplot(data=penguins, x="species", y="body_mass_g"). sns.scatterplot(data=penguins, x="flipper_length_mm", y="body_mass_g", hue="species"). penguins.select_dtypes(float).corr() + sns.heatmap.',
    },
  ],
}

export default function DataVisualizationPage() {
  return <FEDFTopicPage content={content} />
}
