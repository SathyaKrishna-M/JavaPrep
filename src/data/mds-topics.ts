export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  href: string
  co?: string
}

const base = '/subjects/mathematics-data-science/topics'

export const mdsTopics: Topic[] = [
  // ── CO1 — Introduction to Data Science ───────────────────────────────────────
  {
    id: 'data-science-foundations',
    title: '1. Data Science Foundations',
    description: 'What is data science, types of data (structured/unstructured), data sources, the data science lifecycle',
    icon: '🔭',
    href: `${base}/CO1/data-science-foundations`,
    co: 'CO1',
  },
  {
    id: 'data-preprocessing',
    title: '2. Data Preprocessing',
    description: 'Handling missing values, removing duplicates, detecting and treating outliers, data cleaning strategies',
    icon: '🧹',
    href: `${base}/CO1/data-preprocessing`,
    co: 'CO1',
  },
  {
    id: 'feature-engineering',
    title: '3. Feature Engineering',
    description: 'Encoding categorical variables, feature scaling (normalization, standardization), transformation techniques',
    icon: '⚙️',
    href: `${base}/CO1/feature-engineering`,
    co: 'CO1',
  },

  // ── CO2 — Descriptive Statistics ─────────────────────────────────────────────
  {
    id: 'measurement-scales',
    title: '4. Measurement Scales & Data Types',
    description: 'Nominal, ordinal, interval, ratio scales; qualitative vs quantitative; discrete vs continuous',
    icon: '📏',
    href: `${base}/CO2/measurement-scales`,
    co: 'CO2',
  },
  {
    id: 'central-tendency',
    title: '5. Central Tendency',
    description: 'Mean (arithmetic, weighted, geometric, harmonic), median, mode — when to use each',
    icon: '📊',
    href: `${base}/CO2/central-tendency`,
    co: 'CO2',
  },
  {
    id: 'dispersion-shape',
    title: '6. Dispersion & Shape',
    description: 'Variance, standard deviation, IQR, percentiles, skewness, kurtosis — measuring spread and distribution shape',
    icon: '📉',
    href: `${base}/CO2/dispersion-shape`,
    co: 'CO2',
  },

  // ── CO3 — Probability Theory ──────────────────────────────────────────────────
  {
    id: 'probability-fundamentals',
    title: '7. Probability Fundamentals',
    description: 'Sample space, events, axioms of probability, addition rule, complement rule, mutually exclusive events',
    icon: '🎲',
    href: `${base}/CO3/probability-fundamentals`,
    co: 'CO3',
  },
  {
    id: 'conditional-probability-bayes',
    title: '8. Conditional Probability & Bayes\' Theorem',
    description: 'Conditional probability, independence, multiplication rule, law of total probability, Bayes\' theorem',
    icon: '🔀',
    href: `${base}/CO3/conditional-probability-bayes`,
    co: 'CO3',
  },
  {
    id: 'probability-distributions',
    title: '9. Probability Distributions',
    description: 'Random variables, Bernoulli, Binomial, Poisson, Normal distribution — PMF, PDF, CDF, expectation, variance',
    icon: '🔔',
    href: `${base}/CO3/probability-distributions`,
    co: 'CO3',
  },

  // ── CO4 — Inferential Statistics ──────────────────────────────────────────────
  {
    id: 'sampling-estimation',
    title: '10. Sampling & Estimation',
    description: 'Sampling methods, Central Limit Theorem, point estimates, unbiasedness, consistency',
    icon: '🎯',
    href: `${base}/CO4/sampling-estimation`,
    co: 'CO4',
  },
  {
    id: 'confidence-intervals',
    title: '11. Confidence Intervals',
    description: 'Construction and interpretation of CIs, margin of error, t-distribution, CI for proportions',
    icon: '📐',
    href: `${base}/CO4/confidence-intervals`,
    co: 'CO4',
  },
  {
    id: 'hypothesis-testing',
    title: '12. Hypothesis Testing',
    description: 'Null & alternative hypotheses, Type I & II errors, z-test, t-test, chi-square test, p-values',
    icon: '🧪',
    href: `${base}/CO4/hypothesis-testing`,
    co: 'CO4',
  },

  // ── CO5 — Regression Analysis ─────────────────────────────────────────────────
  {
    id: 'correlation',
    title: '13. Correlation',
    description: 'Pearson and Spearman correlation, scatter plots, correlation vs causation, covariance',
    icon: '🔗',
    href: `${base}/CO5/correlation`,
    co: 'CO5',
  },
  {
    id: 'simple-linear-regression',
    title: '14. Simple Linear Regression',
    description: 'OLS method, slope & intercept, R², residual analysis, assumptions of linear regression',
    icon: '📈',
    href: `${base}/CO5/simple-linear-regression`,
    co: 'CO5',
  },
  {
    id: 'multiple-regression',
    title: '15. Multiple Linear Regression',
    description: 'Multiple predictors, multicollinearity, adjusted R², model selection, overfitting vs underfitting',
    icon: '🧩',
    href: `${base}/CO5/multiple-regression`,
    co: 'CO5',
  },

  // ── CO6 — Visualization & Decision Making ─────────────────────────────────────
  {
    id: 'data-visualization',
    title: '16. Data Visualization',
    description: 'Histograms, box plots, scatter plots, heat maps, pair plots — choosing the right chart for the data',
    icon: '🎨',
    href: `${base}/CO6/data-visualization`,
    co: 'CO6',
  },
  {
    id: 'model-evaluation',
    title: '17. Model Evaluation Metrics',
    description: 'MSE, RMSE, MAE, R², adjusted R², cross-validation, bias-variance tradeoff',
    icon: '📋',
    href: `${base}/CO6/model-evaluation`,
    co: 'CO6',
  },
  {
    id: 'ethics-decision-making',
    title: '18. Ethics & Data Storytelling',
    description: 'Bias in data and models, fairness, privacy, misleading visualizations, communicating insights',
    icon: '⚖️',
    href: `${base}/CO6/ethics-decision-making`,
    co: 'CO6',
  },
]
