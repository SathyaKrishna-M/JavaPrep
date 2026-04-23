'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Multiple Regression',
  subtitle: 'Predicting with multiple predictors — interpretation, multicollinearity, and model selection',
  co: 'CO5 — Regression & Correlation',

  overview: (
    <>
      <p>
        <strong className="text-white">Multiple linear regression</strong> extends simple
        regression to multiple predictors: Ŷ = β₀ + β₁X₁ + β₂X₂ + … + βₚXₚ. Each
        coefficient βᵢ represents the change in Y per unit increase in Xᵢ{' '}
        <em>holding all other predictors constant</em> — this ceteris paribus interpretation
        is what makes multiple regression powerful for isolating individual effects.
      </p>
      <p>
        <strong className="text-white">Multicollinearity</strong> occurs when predictors are
        highly correlated with each other. It doesn't affect R² or predictions but inflates
        standard errors, making individual coefficient estimates unreliable. The{' '}
        <strong className="text-white">Variance Inflation Factor (VIF)</strong> detects it:
        VIF &gt; 10 (or even 5) suggests problematic collinearity.
      </p>
      <p>
        <strong className="text-white">Adjusted R²</strong> penalises adding predictors that
        don't improve the model, unlike plain R² which always increases. For model selection,
        also use <strong className="text-white">AIC/BIC</strong> (information criteria that
        balance fit vs complexity) or out-of-sample cross-validation.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: Predicting house price using size AND location AND number of
        rooms simultaneously. Each coefficient tells you the effect of that one feature
        while keeping the others fixed — isolating each variable's independent contribution.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Multiple Regression Model</p>
        <div className="font-mono text-sm text-gray-300 text-center py-2">
          <p className="text-white text-base">Ŷ = β₀ + β₁X₁ + β₂X₂ + … + βₚXₚ</p>
          <p className="text-gray-500 text-xs font-sans mt-1">p predictors, p+1 parameters (including intercept)</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          {[
            { metric: 'Adjusted R²', formula: '1 − (1−R²)(n−1)/(n−p−1)', note: 'Penalises extra predictors', color: 'emerald' },
            { metric: 'VIF', formula: '1 / (1 − Rⱼ²)', note: 'Rⱼ² = R² of Xⱼ on others. VIF>10 = problem', color: 'red' },
            { metric: 'AIC', formula: '2p − 2ln(L)', note: 'Lower is better. Rewards fit, penalises complexity', color: 'violet' },
            { metric: 'F-statistic', formula: 'Tests H₀: all βᵢ=0', note: 'Overall model significance', color: 'amber' },
          ].map(({ metric, formula, note, color }) => (
            <div key={metric} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-2`}>
              <p className={`text-${color}-300 font-semibold text-[11px]`}>{metric}</p>
              <p className="text-gray-300 font-mono text-[10px]">{formula}</p>
              <p className="text-gray-500 text-[10px]">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Multiple regression',   definition: 'Ŷ = β₀ + β₁X₁ + … + βₚXₚ. Each βᵢ is the effect of Xᵢ on Y holding all other predictors constant (partial effect). Estimated by OLS — same principle as simple regression.' },
    { term: 'Partial effect',        definition: 'The change in Y per unit increase in Xᵢ, holding all other predictors constant. This is how βᵢ is interpreted in multiple regression — it removes the effect of other predictors.' },
    { term: 'Adjusted R²',          definition: 'R²_adj = 1 − (1−R²)(n−1)/(n−p−1). Penalises adding predictors. Unlike R², it can decrease if an added variable adds noise. Preferred over R² for model comparison.' },
    { term: 'Multicollinearity',     definition: 'High correlation among predictors. Doesn\'t bias coefficients but inflates standard errors, making coefficient estimates unstable and significance tests unreliable.' },
    { term: 'VIF (Variance Inflation Factor)', definition: 'Measures how much variance of βⱼ is inflated by collinearity. VIFⱼ = 1/(1−Rⱼ²), where Rⱼ² is R² from regressing Xⱼ on all other predictors. VIF>10 is a red flag.' },
    { term: 'Dummy variables',       definition: 'Binary (0/1) variables encoding categorical predictors. A categorical variable with k levels needs k−1 dummies (the omitted category is the reference/baseline).' },
    { term: 'Model selection',       definition: 'Choosing which predictors to include. Methods: forward/backward stepwise, AIC/BIC minimisation, regularisation (Ridge/Lasso), or cross-validated RMSE.' },
  ],

  code: {
    title: 'Multiple Regression with Statsmodels and Diagnostics',
    language: 'python',
    snippet: `import numpy as np
import pandas as pd
import statsmodels.formula.api as smf
from statsmodels.stats.outliers_influence import variance_inflation_factor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

np.random.seed(42)
n = 200

# ── Generate data with multiple predictors ────────────────────
df = pd.DataFrame({
    'size_sqft':  np.random.normal(1500, 300, n),
    'bedrooms':   np.random.randint(1, 6, n).astype(float),
    'age_years':  np.random.uniform(0, 50, n),
    'location':   np.random.choice(['urban', 'suburban', 'rural'], n),
})
# True model: price depends on size, location, age
df['price'] = (
    100 + 0.2 * df['size_sqft']
    + 20 * (df['location'] == 'urban')
    - 1.5 * df['age_years']
    + np.random.normal(0, 30, n)
)

# ── Statsmodels with categorical (C() syntax auto-creates dummies)
model = smf.ols('price ~ size_sqft + bedrooms + age_years + C(location)', data=df).fit()
print(model.summary())

# ── VIF: detect multicollinearity ─────────────────────────────
X_num = df[['size_sqft', 'bedrooms', 'age_years']].assign(intercept=1)
vif_data = pd.DataFrame({
    'Feature': X_num.columns,
    'VIF':     [variance_inflation_factor(X_num.values, i) for i in range(X_num.shape[1])]
})
print("\\nVIF values:")
print(vif_data[vif_data['Feature'] != 'intercept'])

# ── Adjusted R² vs plain R² ───────────────────────────────────
print(f"\\nR²:          {model.rsquared:.4f}")
print(f"Adjusted R²: {model.rsquared_adj:.4f}")
print(f"AIC:         {model.aic:.2f}")

# ── Scikit-learn with cross-validation ────────────────────────
# Get dummies for sklearn
df_encoded = pd.get_dummies(df.drop('price', axis=1), drop_first=True)
X = df_encoded.values
y = df['price'].values

lr = LinearRegression()
cv_scores = cross_val_score(lr, X, y, cv=5, scoring='r2')
print(f"\\n5-fold CV R²: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")`,
    explanation: 'Statsmodels\' C(location) automatically creates dummy variables for categorical predictors. VIF > 10 signals problematic multicollinearity. Always compare train R² with cross-validated R² — a large gap indicates overfitting.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Multiple regression is the workhorse of empirical data science.</strong>{' '}
        It lets you control for confounders — the same logic that makes A/B test analysis
        richer when you include covariates. Including relevant predictors reduces residual
        variance, tightens confidence intervals, and gives more precise estimates of the
        effect you care about.
      </p>
      <p>
        Understanding multiple regression unlocks regularised models (Ridge adds L2 penalty to
        OLS, Lasso adds L1 and performs variable selection), generalised linear models (logistic
        regression is the same structure with a logit link), and eventually neural networks.
        The β = (XᵀX)⁻¹Xᵀy formula is the matrix version of OLS — the same idea, just in
        higher dimensions.
      </p>
    </>
  ),

  commonMistakes: [
    'Using R² instead of adjusted R² for model comparison — R² always increases when you add a predictor, even a random one. Adjusted R² rewards only predictors that genuinely help.',
    'Ignoring multicollinearity — when VIF is high, individual coefficients are unstable (sign can flip with slightly different data) even if R² is good. Drop or combine collinear predictors.',
    'Including too many dummies — for a categorical variable with k levels, include only k−1 dummies. The omitted level is the reference category. Including all k causes perfect multicollinearity.',
    'Not scaling predictors for interpretation — coefficients are in the units of each predictor. Standardising (z-score) all predictors makes coefficients comparable: "which predictor has more influence?"',
    'Overfitting with many predictors — always validate on held-out data. A model with 50 predictors and n=60 will fit training data perfectly but generalise poorly.',
  ],

  summary: [
    'Ŷ = β₀ + β₁X₁ + … + βₚXₚ. Each βᵢ = partial effect of Xᵢ holding others constant.',
    'Adjusted R² penalises extra predictors. Use instead of plain R² when comparing models.',
    'VIF detects multicollinearity: VIFⱼ = 1/(1−Rⱼ²). VIF > 10 = problematic collinearity.',
    'Categorical predictors: encode as k−1 dummy variables. Use C() in statsmodels or pd.get_dummies().',
    'AIC/BIC: information criteria for model selection. Lower is better. Balance fit vs complexity.',
    'Cross-validation (CV) is more reliable than in-sample R² for assessing predictive performance.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A regression of salary on experience (β₁=3.2) and education level (β₂=8.5) gives: Ŷ = 30 + 3.2×experience + 8.5×education. Interpret β₂.',
      hint: 'β₂ = 8.5: holding years of experience constant, each additional unit of education level is associated with $8,500 higher salary on average. The key phrase is "holding experience constant" — this is the partial effect, controlling for experience.',
    },
    {
      type: 'question',
      text: 'You have two models: Model A (R²=0.82, adj-R²=0.79, 5 predictors) and Model B (R²=0.81, adj-R²=0.80, 3 predictors). Which is better?',
      hint: 'Model B is better. Despite lower R², it has higher adjusted R², meaning its 3 predictors explain variance more efficiently than Model A\'s 5. The 2 extra predictors in A likely add noise (they raise R² but lower adj-R²). Prefer the simpler model (Occam\'s razor) when adjusted R² supports it.',
    },
    {
      type: 'question',
      text: 'A dataset has predictors X₁ and X₂ with r=0.95. What problem does this cause, and what are two ways to fix it?',
      hint: 'Multicollinearity: X₁ and X₂ carry nearly identical information. Effects: large standard errors for β₁ and β₂ (unstable estimates), coefficients may have wrong signs. Fixes: (1) Drop one of the two predictors. (2) Create a composite (PCA) — use the first principal component instead of both. (3) Use Ridge regression (handles multicollinearity via regularisation).',
    },
    {
      type: 'task',
      text: 'Load the seaborn "tips" dataset. Fit a multiple regression of tip on total_bill + size + day (categorical). Use statsmodels. Report: adjusted R², coefficient for size, p-values, and VIF for numeric predictors.',
      hint: 'smf.ols("tip ~ total_bill + size + C(day)", data=tips).fit(). model.rsquared_adj, model.pvalues. VIF: variance_inflation_factor on the numeric columns. Is day a significant predictor after controlling for total_bill and size?',
    },
  ],
}

export default function MultipleRegressionPage() {
  return <FEDFTopicPage content={content} />
}
