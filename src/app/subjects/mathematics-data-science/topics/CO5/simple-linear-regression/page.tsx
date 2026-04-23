'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Simple Linear Regression',
  subtitle: 'Fitting a line to data — least squares, interpretation, and model evaluation',
  co: 'CO5 — Regression & Correlation',

  overview: (
    <>
      <p>
        <strong className="text-white">Simple linear regression</strong> models the relationship
        between one predictor variable X and one response variable Y as a straight line:
        Ŷ = β₀ + β₁X. β₀ is the intercept (Y when X=0) and β₁ is the slope (change in Y
        per unit change in X).
      </p>
      <p>
        The coefficients β₀ and β₁ are estimated by{' '}
        <strong className="text-white">ordinary least squares (OLS)</strong> — minimising the
        sum of squared residuals (SSR = Σ(yᵢ − ŷᵢ)²). This produces the unique line that
        minimises prediction error across all data points.
      </p>
      <p>
        <strong className="text-white">R²</strong> (coefficient of determination) measures
        how much of Y's variance is explained by the model: R² = 1 − SSres/SStot. R² = 1
        is perfect fit; R² = 0 means the line is no better than predicting the mean.
        A model can have high R² but still violate regression assumptions — always check residuals.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: Predicting house price from square footage. The regression line
        gives the best-fitting rule: "Each additional sqft adds £250 to the price." The
        intercept is the baseline price for a theoretical 0-sqft house — often not interpretable directly.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">OLS Formulas</p>
        <div className="space-y-2 font-mono text-sm text-gray-300">
          <p><span className="text-white">β₁</span> = Σ(xᵢ−x̄)(yᵢ−ȳ) / Σ(xᵢ−x̄)² = Cov(X,Y) / Var(X)</p>
          <p><span className="text-white">β₀</span> = ȳ − β₁x̄</p>
          <p className="text-gray-500 font-sans text-xs mt-1">The regression line always passes through (x̄, ȳ)</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
          <p className="text-cyan-400 font-semibold mb-2">Goodness of Fit</p>
          <div className="space-y-1 font-mono text-gray-300 text-[10px]">
            <p>SStot = Σ(yᵢ − ȳ)²  <span className="text-gray-500 font-sans">total variance</span></p>
            <p>SSres = Σ(yᵢ − ŷᵢ)² <span className="text-gray-500 font-sans">unexplained</span></p>
            <p className="text-white">R² = 1 − SSres/SStot</p>
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
          <p className="text-amber-400 font-semibold mb-2">Assumptions (LINE)</p>
          <div className="space-y-1 text-gray-400 text-[10px]">
            <p><span className="text-amber-300">L</span>inearity: Y|X is linear</p>
            <p><span className="text-amber-300">I</span>ndependence: residuals independent</p>
            <p><span className="text-amber-300">N</span>ormality: residuals ~ Normal</p>
            <p><span className="text-amber-300">E</span>qual variance: homoscedastic</p>
          </div>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Regression line Ŷ',     definition: 'Ŷ = β₀ + β₁X. The predicted value of Y given X. The actual value Y = β₀ + β₁X + ε, where ε is the residual (error).' },
    { term: 'Slope β₁',              definition: 'Change in Y per unit increase in X. β₁ = Cov(X,Y)/Var(X). Positive: Y increases with X. Negative: Y decreases. Statistically tested: is β₁ ≠ 0?' },
    { term: 'Intercept β₀',          definition: 'Predicted Y when X = 0. Often not directly interpretable (e.g. house price at 0 sqft). The regression line always passes through (x̄, ȳ).' },
    { term: 'Residual',              definition: 'eᵢ = yᵢ − ŷᵢ. The difference between observed and predicted value. OLS minimises Σeᵢ². Residuals should be random, with mean 0 and constant variance.' },
    { term: 'R² (coefficient of determination)', definition: 'Proportion of variance in Y explained by the regression. R² = 1 − SSres/SStot. In simple linear regression, R² = r² (squared Pearson correlation).' },
    { term: 'Ordinary Least Squares', definition: 'Method of estimating β₀ and β₁ by minimising the sum of squared residuals. Produces the BLUE (Best Linear Unbiased Estimator) under the Gauss-Markov assumptions.' },
    { term: 'Residual plot',          definition: 'Plot of residuals vs fitted values. Should show no pattern (random scatter around 0) if assumptions hold. Patterns indicate non-linearity, heteroscedasticity, or omitted variables.' },
  ],

  code: {
    title: 'Simple Linear Regression with Statsmodels and Scikit-Learn',
    language: 'python',
    snippet: `import numpy as np
import pandas as pd
import statsmodels.formula.api as smf
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import matplotlib.pyplot as plt

np.random.seed(42)
n = 100

# ── Generate data ─────────────────────────────────────────────
x = np.random.uniform(0, 10, n)
y = 3 + 2.5 * x + np.random.normal(0, 2, n)   # true: β₀=3, β₁=2.5

df = pd.DataFrame({'x': x, 'y': y})

# ── Manual OLS formulas ───────────────────────────────────────
b1 = np.cov(x, y, ddof=1)[0, 1] / np.var(x, ddof=1)
b0 = y.mean() - b1 * x.mean()
print(f"Manual: β₀={b0:.3f}, β₁={b1:.3f}")

# ── Statsmodels (full statistical output) ─────────────────────
model = smf.ols('y ~ x', data=df).fit()
print(model.summary())
# Gives: coefficients, standard errors, t-stats, p-values, R², F-stat

# ── Scikit-learn (ML pipeline style) ─────────────────────────
lr = LinearRegression()
lr.fit(x.reshape(-1, 1), y)
print(f"sklearn: intercept={lr.intercept_:.3f}, slope={lr.coef_[0]:.3f}")

y_pred = lr.predict(x.reshape(-1, 1))
print(f"R²: {r2_score(y, y_pred):.4f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y, y_pred)):.4f}")

# ── Residual analysis ─────────────────────────────────────────
residuals = y - y_pred
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# Scatter with regression line
axes[0].scatter(x, y, alpha=0.5)
axes[0].plot(sorted(x), lr.predict(np.sort(x).reshape(-1,1)), color='red')
axes[0].set_xlabel('X'); axes[0].set_ylabel('Y')
axes[0].set_title(f'Regression Line (R²={r2_score(y, y_pred):.3f})')

# Residual plot
axes[1].scatter(y_pred, residuals, alpha=0.5)
axes[1].axhline(0, color='red', linestyle='--')
axes[1].set_xlabel('Fitted Values'); axes[1].set_ylabel('Residuals')
axes[1].set_title('Residual Plot (should be random)')

plt.tight_layout()
plt.show()`,
    explanation: 'Statsmodels gives full inferential output (p-values for coefficients, confidence intervals, F-test). Scikit-learn focuses on prediction. Use statsmodels for statistical analysis, sklearn for machine learning pipelines.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Linear regression is the foundation of predictive modelling.</strong>{' '}
        Understanding OLS — how coefficients are estimated, what R² means, and how to check
        residuals — is prerequisite knowledge for regularised regression (Ridge, Lasso),
        generalised linear models (logistic regression), and neural networks (which are just
        compositions of linear transformations with non-linear activations).
      </p>
      <p>
        The residual plot is the single most important diagnostic. If residuals fan out
        (heteroscedasticity), curve (non-linearity), or cluster (autocorrelation), the model
        is misspecified. A high R² does not guarantee a valid model — Anscombe's Quartet has
        four datasets with identical R² but completely different structures. Always plot.
      </p>
    </>
  ),

  commonMistakes: [
    'Extrapolating beyond the data range — the model is only valid where you have data. A regression fit on house sizes 50–500 sqft cannot reliably predict 5,000 sqft houses.',
    'Ignoring residual plots — R² can look good even when assumptions are violated. A curved residual plot means you need a non-linear model or transformation.',
    'Confusing statistical significance (p < 0.05 for β₁) with practical significance — a tiny slope can be statistically significant with large n but practically useless.',
    'Treating R² as the only metric — R² always increases when you add variables. Use adjusted R² or out-of-sample RMSE for model comparison.',
    'Forgetting the LINE assumptions — if errors are not normally distributed and homoscedastic, standard errors (and therefore p-values and CIs) are unreliable.',
  ],

  summary: [
    'Ŷ = β₀ + β₁X. OLS minimises Σ(yᵢ − ŷᵢ)². The line always passes through (x̄, ȳ).',
    'β₁ = Cov(X,Y)/Var(X). β₀ = ȳ − β₁x̄. β₁ is the change in Y per unit X.',
    'R² = 1 − SSres/SStot. Proportion of Y\'s variance explained. In SLR, R² = r².',
    'Residuals eᵢ = yᵢ − ŷᵢ. Must check: random, mean 0, constant variance, approximately normal.',
    'Assumptions (LINE): Linearity, Independence, Normality of residuals, Equal variance.',
    'Statsmodels for statistical inference; sklearn for ML pipelines. Both give same β estimates.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A regression of salary (Y, $k) on years of experience (X) gives: Ŷ = 45 + 3.2X. Interpret the slope and intercept.',
      hint: 'Slope (β₁ = 3.2): Each additional year of experience is associated with $3,200 higher salary on average. Intercept (β₀ = 45): A person with 0 years of experience is predicted to earn $45,000. The intercept is interpretable here (starting salary); not always the case.',
    },
    {
      type: 'question',
      text: 'A model has R² = 0.82. What does this mean? Is this a "good" model?',
      hint: 'R² = 0.82 means 82% of the variance in Y is explained by the linear relationship with X. Whether this is "good" depends on the domain — 82% is excellent for social science data, mediocre for physics measurements. Always compare to a baseline and check residuals.',
    },
    {
      type: 'question',
      text: 'Describe what a "fan-shaped" residual plot indicates and how to fix it.',
      hint: 'Fan shape (residuals increase with fitted values) = heteroscedasticity: variance is non-constant. Fixes: log-transform Y, use weighted least squares (WLS), or use robust standard errors. Heteroscedasticity doesn\'t bias coefficients but makes standard errors (and p-values) unreliable.',
    },
    {
      type: 'task',
      text: 'Using seaborn\'s "tips" dataset, fit a linear regression of tip on total_bill using both manual OLS formulas AND sklearn. Compute R² and RMSE. Plot the scatter with the regression line and the residual plot.',
      hint: 'b1 = np.cov(X,Y)[0,1]/np.var(X). b0 = Y.mean()-b1*X.mean(). sklearn: LinearRegression().fit(X.reshape(-1,1), Y). R²: r2_score. RMSE: sqrt(mean_squared_error). Residuals: Y - Y_pred. Check: does the residual plot show any pattern?',
    },
  ],
}

export default function SimpleLinearRegressionPage() {
  return <FEDFTopicPage content={content} />
}
