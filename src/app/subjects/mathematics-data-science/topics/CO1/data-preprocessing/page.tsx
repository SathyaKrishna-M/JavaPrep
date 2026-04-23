'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Data Preprocessing',
  subtitle: 'Handling missing values, duplicates, and outliers before analysis',
  co: 'CO1 — Introduction to Data Science',

  overview: (
    <>
      <p>
        Real-world data is always messy. Sensors fail, users skip fields, systems have bugs,
        and data gets entered inconsistently. Before any analysis or modelling, raw data must
        be cleaned. The three most common problems are:{' '}
        <strong className="text-white">missing values</strong> (NaN entries),{' '}
        <strong className="text-white">duplicate rows</strong> (the same record entered twice),
        and <strong className="text-white">outliers</strong> (values so extreme they may
        represent errors or exceptional cases).
      </p>
      <p>
        Missing values can be handled three ways: <strong className="text-white">deletion</strong>{' '}
        (drop rows/columns with missing data — simple but loses information),{' '}
        <strong className="text-white">imputation</strong> (fill with mean, median, mode, or
        a model-predicted value — preserves data but introduces assumptions), or{' '}
        <strong className="text-white">flagging</strong> (add an indicator column marking
        missingness as a feature itself).
      </p>
      <p>
        Outlier detection uses the{' '}
        <strong className="text-white">IQR method</strong> (values below Q1 − 1.5×IQR or
        above Q3 + 1.5×IQR) or the{' '}
        <strong className="text-white">Z-score method</strong> (values more than 3 standard
        deviations from the mean). Whether to remove, cap, or keep outliers depends on
        whether they represent errors or genuine extreme cases.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: Data preprocessing is like quality control in a factory.
        You inspect each unit (row) for defects (missing, duplicate, extreme values) and
        decide whether to fix, discard, or flag it — before it enters production.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Missing Value Strategies</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { method: 'Delete', when: 'Missing < 5% of rows, or entire column is mostly missing', risk: 'Loses data; may bias if not missing at random', color: 'red' },
            { method: 'Impute', when: 'Missing 5–30%, data roughly symmetric', risk: 'Adds assumption; underestimates variance', color: 'amber' },
            { method: 'Flag', when: 'Missingness itself is informative (e.g. income not reported)', risk: 'Adds columns; may leak target info', color: 'green' },
          ].map(({ method, when, risk, color }) => (
            <div key={method} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-3`}>
              <p className={`text-${color}-300 font-bold mb-1`}>{method}</p>
              <p className="text-gray-300 mb-1"><span className="text-gray-500">When: </span>{when}</p>
              <p className="text-gray-400"><span className="text-gray-500">Risk: </span>{risk}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">IQR Outlier Rule</p>
        <div className="font-mono text-gray-300 space-y-1">
          <p>Q1 = 25th percentile &nbsp;&nbsp; Q3 = 75th percentile</p>
          <p>IQR = Q3 − Q1</p>
          <p className="text-red-400">Lower fence = Q1 − 1.5 × IQR</p>
          <p className="text-red-400">Upper fence = Q3 + 1.5 × IQR</p>
          <p className="text-gray-500 mt-1">Values outside fences → potential outliers</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Missing value',      definition: 'A NaN/None/null entry in the dataset. Can be MCAR (missing completely at random), MAR (missing at random, depends on other cols), or MNAR (missing not at random — the value itself predicts missingness).' },
    { term: 'Imputation',         definition: 'Replacing missing values with estimated values. Mean imputation for symmetric numeric data; median for skewed; mode for categorical; model-based for complex patterns.' },
    { term: 'Duplicate row',      definition: 'Two or more rows with identical (or near-identical) values. Caused by data entry errors or joining tables multiple times. Skews counts and averages.' },
    { term: 'Outlier',            definition: 'A value significantly different from most observations. May be a data error (sensor malfunction) or a genuine extreme case (a billionaire in an income dataset).' },
    { term: 'IQR method',         definition: 'Interquartile Range method for outlier detection. Fences at Q1 − 1.5×IQR and Q3 + 1.5×IQR. Non-parametric — doesn\'t assume normality.' },
    { term: 'Z-score method',     definition: 'Outlier detection using z = (x − μ) / σ. Values with |z| > 3 are flagged. Assumes the data is approximately normally distributed.' },
    { term: 'Data type coercion', definition: 'Converting columns to the correct data type (e.g. "2023-01-01" string → datetime, "42" string → int). Required for correct analysis and modelling.' },
  ],

  code: {
    title: 'Handling Missing Values, Duplicates & Outliers in Python',
    language: 'python',
    snippet: `import pandas as pd
import numpy as np

df = pd.read_csv('data.csv')

# ── Missing values ────────────────────────────────────────────
print(df.isnull().sum())              # count per column
print(df.isnull().mean() * 100)       # % missing per column

# Drop rows where >50% of values are missing
df = df.dropna(thresh=len(df.columns) * 0.5)

# Impute numeric columns with median (robust to skew)
df['age'].fillna(df['age'].median(), inplace=True)

# Impute categorical columns with mode
df['city'].fillna(df['city'].mode()[0], inplace=True)

# Flag missingness as a feature
df['income_missing'] = df['income'].isnull().astype(int)

# ── Duplicates ────────────────────────────────────────────────
print(df.duplicated().sum())          # count duplicate rows
df = df.drop_duplicates()            # remove them

# ── Outliers: IQR method ──────────────────────────────────────
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

# Option 1: Remove outliers
df_clean = df[(df['salary'] >= lower) & (df['salary'] <= upper)]

# Option 2: Cap (Winsorize) — keeps rows, limits extreme values
df['salary'] = df['salary'].clip(lower=lower, upper=upper)

# ── Outliers: Z-score method ──────────────────────────────────
from scipy import stats
z_scores = np.abs(stats.zscore(df[['salary', 'age']]))
df_clean = df[(z_scores < 3).all(axis=1)]`,
    explanation: 'Capping (clipping) is usually preferred over deleting outlier rows — it keeps the data point while limiting its influence. Use deletion only when you\'re confident the value is a data error.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Dirty data is the #1 cause of incorrect analyses.</strong>{' '}
        A model trained on data with 20% missing values imputed naively will learn
        the imputed value as a real pattern. Outliers in the target variable can pull
        regression lines significantly, making predictions unreliable for typical cases.
      </p>
      <p>
        Missing value analysis itself reveals information: if income is missing more often
        for lower-income respondents (MNAR), deleting those rows introduces survivorship bias.
        Understanding the mechanism of missingness is as important as choosing how to handle it.
      </p>
      <p>
        In practice, data scientists spend 60-80% of their time on data cleaning.
        This isn't glamorous, but it's where the real value is created. A clean, well-understood
        dataset with a simple model beats a complex model on dirty data every time.
      </p>
    </>
  ),

  commonMistakes: [
    'Imputing with the mean on skewed data — the mean is pulled by outliers. Use median for skewed distributions.',
    'Dropping rows with any missing value — if 10 columns each have 5% missing, you lose nearly half the dataset. Drop only if missingness is concentrated.',
    'Not checking for duplicates after a join — merging tables often creates duplicate rows if keys aren\'t unique.',
    'Removing all outliers automatically — some outliers are real (a celebrity\'s salary in a salary dataset). Always investigate before removing.',
    'Imputing before splitting train/test data — imputing on the full dataset leaks test statistics into training, causing overoptimistic evaluation.',
  ],

  summary: [
    'Missing values: check with isnull().sum(). Handle by deletion, imputation (mean/median/mode), or flagging.',
    'Use median imputation for numeric (robust to outliers), mode for categorical.',
    'Duplicates: drop_duplicates(). Always check after data merges.',
    'IQR method: outliers outside Q1 − 1.5×IQR or Q3 + 1.5×IQR. Non-parametric, robust.',
    'Z-score method: |z| > 3 flags outliers. Assumes approximate normality.',
    'Always split train/test before imputing — leaking test statistics inflates model performance metrics.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the difference between MCAR, MAR, and MNAR missing data? Why does it matter which type you have?',
      hint: 'MCAR: missing randomly (safe to delete). MAR: missingness depends on other observed columns (impute using those columns). MNAR: the missing value itself predicts missingness (e.g. sick patients skip health questions — deletion biases results). The type determines the correct treatment.',
    },
    {
      type: 'question',
      text: 'Why is median imputation preferred over mean imputation for skewed data?',
      hint: 'The mean is sensitive to outliers and pulled toward the tail in skewed distributions. If salary has a few billionaires, the mean is much higher than the "typical" salary. Median is the 50th percentile — unaffected by extreme values — so it\'s a more representative fill value.',
    },
    {
      type: 'question',
      text: 'Walk through the IQR outlier detection method. What are Q1, Q3, IQR, and the fence values?',
      hint: 'Q1 = 25th percentile, Q3 = 75th percentile, IQR = Q3 − Q1. Lower fence = Q1 − 1.5×IQR, upper fence = Q3 + 1.5×IQR. Values outside these fences are flagged as outliers. The 1.5 multiplier covers ~99.3% of a normal distribution.',
    },
    {
      type: 'task',
      text: 'Take the Titanic dataset (available on Kaggle or seaborn.load_dataset("titanic")). Find all columns with missing values, choose an appropriate imputation strategy for each, handle duplicates, and detect outliers in the "fare" column using both IQR and Z-score methods.',
      hint: 'age → median imputation (numeric, skewed). embarked → mode (categorical, few missing). cabin → too many missing, drop or flag. For fare: compute Q1, Q3, IQR, set fences. Z-score: from scipy.stats import zscore, flag |z| > 3.',
    },
  ],
}

export default function DataPreprocessingPage() {
  return <FEDFTopicPage content={content} />
}
