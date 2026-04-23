'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Feature Engineering',
  subtitle: 'Encoding, scaling, and transforming raw variables into model-ready features',
  co: 'CO1 — Introduction to Data Science',

  overview: (
    <>
      <p>
        Machine learning models don't understand raw data — they understand numbers.{' '}
        <strong className="text-white">Feature engineering</strong> is the process of
        transforming raw variables into a form that models can learn from effectively.
        It includes encoding categorical variables into numbers, scaling numeric variables
        so they're on comparable scales, and applying transformations to fix skewed distributions.
      </p>
      <p>
        <strong className="text-white">Categorical encoding</strong> converts text categories
        into numbers. <strong className="text-white">Label encoding</strong> maps each category
        to an integer (Red→0, Green→1, Blue→2) — fine for ordinal data but implies an ordering
        that may not exist. <strong className="text-white">One-hot encoding</strong> creates
        a binary column per category — no false ordering, but adds many columns for high-cardinality
        features.
      </p>
      <p>
        <strong className="text-white">Feature scaling</strong> brings numeric features onto
        a similar scale. <strong className="text-white">Min-Max normalization</strong> maps
        to [0, 1]. <strong className="text-white">Standardization (Z-score scaling)</strong>{' '}
        maps to mean=0, std=1. Distance-based models (KNN, SVM, K-Means) and gradient descent
        algorithms require scaling; tree-based models (Decision Tree, Random Forest) do not.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: Feature engineering is like converting currencies before comparing
        prices. A $10 item and a ¥10 item are not the same. Similarly, age (0–100) and income
        (0–1,000,000) on the same scale would let income dominate any distance calculation.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Encoding Strategies</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { name: 'Label Encoding', example: 'Low→0, Med→1, High→2', use: 'Ordinal data with natural order', warn: 'Implies numeric distance between categories', color: 'violet' },
            { name: 'One-Hot Encoding', example: 'Red→[1,0,0] Green→[0,1,0]', use: 'Nominal data, few categories', warn: 'Curse of dimensionality for many categories', color: 'pink' },
            { name: 'Target Encoding', example: 'Replace category with mean of target', use: 'High-cardinality nominal features', warn: 'Risk of target leakage; use cross-val', color: 'amber' },
          ].map(({ name, example, use, warn, color }) => (
            <div key={name} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-3`}>
              <p className={`text-${color}-300 font-bold mb-1`}>{name}</p>
              <p className="text-gray-300 font-mono text-[10px] mb-1">{example}</p>
              <p className="text-gray-400 text-[10px]">✓ {use}</p>
              <p className="text-gray-500 text-[10px]">⚠ {warn}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-cyan-400 font-semibold mb-2">Scaling Formulas</p>
        <div className="grid grid-cols-2 gap-3 font-mono text-gray-300">
          <div>
            <p className="text-cyan-300 font-sans font-semibold mb-1">Min-Max Normalization</p>
            <p>x′ = (x − min) / (max − min)</p>
            <p className="text-gray-500 font-sans mt-1">Range: [0, 1]</p>
          </div>
          <div>
            <p className="text-violet-300 font-sans font-semibold mb-1">Standardization (Z-score)</p>
            <p>x′ = (x − μ) / σ</p>
            <p className="text-gray-500 font-sans mt-1">Range: mean=0, std=1</p>
          </div>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Feature engineering', definition: 'Creating, transforming, and selecting variables to improve model performance. The most impactful step in the ML pipeline — better features beat better algorithms.' },
    { term: 'Label encoding',      definition: 'Mapping each category to an integer. Suitable for ordinal features (Low/Med/High). Problematic for nominal features — implies a false ordering.' },
    { term: 'One-hot encoding',    definition: 'Creating a binary indicator column for each category. Avoids false ordering. Adds k columns for k categories. Drop one column (drop_first=True) to avoid multicollinearity.' },
    { term: 'Min-Max normalization', definition: 'Scales to [0, 1]: x′ = (x − min) / (max − min). Sensitive to outliers — one extreme value compresses everything else near 0.' },
    { term: 'Standardization',     definition: 'Z-score scaling: x′ = (x − μ) / σ. Output has mean=0, std=1. More robust to outliers than min-max. Required by algorithms that assume Gaussian features.' },
    { term: 'Log transformation',  definition: 'Applying log(x) to right-skewed data (incomes, populations). Compresses the tail and brings the distribution closer to symmetric/normal.' },
    { term: 'Feature importance',  definition: 'How much each feature contributes to model predictions. Tree-based models provide built-in importance scores. High-importance features are worth engineering further.' },
  ],

  code: {
    title: 'Encoding & Scaling with Pandas and Scikit-learn',
    language: 'python',
    snippet: `import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split

df = pd.read_csv('employees.csv')
# Columns: age, salary, department (nominal), grade (ordinal: A/B/C/D/F)

# ── Label Encoding: ordinal columns ──────────────────────────
grade_map = {'F': 0, 'D': 1, 'C': 2, 'B': 3, 'A': 4}
df['grade_encoded'] = df['grade'].map(grade_map)

# ── One-Hot Encoding: nominal columns ────────────────────────
df = pd.get_dummies(df, columns=['department'], drop_first=True)
# drop_first=True prevents multicollinearity
# Creates: dept_Engineering, dept_HR, dept_Sales (Marketing dropped as reference)

# ── Train-test split BEFORE scaling ──────────────────────────
X = df.drop('salary', axis=1)
y = df['salary']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ── Min-Max Normalization ─────────────────────────────────────
scaler = MinMaxScaler()
X_train[['age']] = scaler.fit_transform(X_train[['age']])   # fit on train only
X_test[['age']]  = scaler.transform(X_test[['age']])        # transform test

# ── Standardization ───────────────────────────────────────────
std_scaler = StandardScaler()
X_train[['salary_prev']] = std_scaler.fit_transform(X_train[['salary_prev']])
X_test[['salary_prev']]  = std_scaler.transform(X_test[['salary_prev']])

# ── Log transformation for skewed features ────────────────────
df['income_log'] = np.log1p(df['income'])   # log1p handles zero values: log(1+x)`,
    explanation: 'Critical rule: fit the scaler only on training data, then transform both train and test. Fitting on all data leaks test statistics (mean, std) into training — inflating performance metrics.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Feature engineering determines model performance more than algorithm choice.</strong>{' '}
        A well-engineered feature dataset with logistic regression often outperforms a poorly
        prepared dataset with a deep neural network. This is why experienced data scientists
        invest heavily in understanding and transforming their features.
      </p>
      <p>
        Scaling is critical for algorithms that compute distances or use gradient descent:
        KNN, SVM, K-Means, neural networks, and linear/logistic regression all require
        features on similar scales. Without it, a feature with large values (income: 0–100,000)
        dominates features with small values (age: 0–100).
      </p>
      <p>
        The fit-on-train, transform-on-test rule prevents data leakage — one of the most
        common sources of over-optimistic model evaluation in practice. The test set must
        be treated as completely unseen data throughout the entire preprocessing pipeline.
      </p>
    </>
  ),

  commonMistakes: [
    'Using label encoding for nominal categories — assigning Red=0, Green=1, Blue=2 implies Red < Green < Blue, which is meaningless and misleads distance-based models.',
    'Fitting scalers on the full dataset before splitting — leaks test mean/std into training, making evaluation metrics look better than they actually are.',
    'One-hot encoding without dropping one column — creates perfect multicollinearity (the dummy variable trap), which breaks linear models.',
    'Applying log transformation to columns with zero or negative values — log(0) = -∞. Use log1p (log(1+x)) instead.',
    'Scaling tree-based models — Decision Trees and Random Forests are scale-invariant; scaling adds overhead with no benefit.',
  ],

  summary: [
    'Label encoding: categories → integers. Use only for ordinal (ordered) features.',
    'One-hot encoding: one binary column per category. Use for nominal features; drop one column to avoid multicollinearity.',
    'Min-Max: scales to [0,1]. Sensitive to outliers. StandardScaler: mean=0, std=1. More robust.',
    'Distance-based and gradient descent models need scaling. Tree-based models do not.',
    'Log transformation compresses right-skewed distributions. Use log1p() for data with zeros.',
    'Always fit scalers/encoders on train data only, then transform test — prevents data leakage.',
  ],

  practice: [
    {
      type: 'question',
      text: 'Why is label encoding inappropriate for a nominal feature like "color" (Red, Green, Blue)?',
      hint: 'Label encoding assigns Red=0, Green=1, Blue=2. This implies Green is twice Red and Blue is three times Red — a numeric ordering that doesn\'t exist. Distance-based models will treat "Blue" as farther from "Red" than "Green" is, which is wrong. Use one-hot encoding instead.',
    },
    {
      type: 'question',
      text: 'What is the "dummy variable trap" and how does drop_first=True prevent it?',
      hint: 'If a nominal feature has k categories and you create k binary columns, any one column is perfectly predictable from the others (they always sum to 1). This causes perfect multicollinearity, which breaks linear regression. drop_first=True drops one reference category, leaving k-1 columns — sufficient information with no collinearity.',
    },
    {
      type: 'question',
      text: 'When should you use Min-Max normalization vs. Standardization?',
      hint: 'Min-Max: when you need a bounded [0,1] range (neural networks, image pixel values) and there are no extreme outliers. Standardization: when the algorithm assumes Gaussian features (linear regression, SVM, PCA), or when outliers are present (mean/std are more robust than min/max). In most cases, standardization is the safer default.',
    },
    {
      type: 'task',
      text: 'Take a dataset with at least one nominal column, one ordinal column, and two numeric columns. Apply appropriate encoding and scaling. Print the first 5 rows before and after transformation to verify the changes.',
      hint: 'pd.get_dummies() for nominal. Map dict for ordinal. StandardScaler for numeric. Remember: split first, then fit scaler on X_train only. Verify dtypes with df.dtypes and check for any remaining object columns.',
    },
  ],
}

export default function FeatureEngineeringPage() {
  return <FEDFTopicPage content={content} />
}
