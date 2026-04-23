'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Data Science Foundations',
  subtitle: 'What data science is, the data ecosystem roles, the CRISP-DM process, and types of data',
  co: 'CO1 — Introduction to Data Science',

  overview: (
    <>
      <p>
        Data Science is an interdisciplinary field that extracts knowledge and insights from structured and
        unstructured data. It sits at the intersection of three pillars:{' '}
        <strong className="text-white">Statistics & Mathematics</strong> (probability, inference, linear algebra),{' '}
        <strong className="text-white">Programming</strong> (Python, SQL, data wrangling), and{' '}
        <strong className="text-white">Domain Knowledge</strong> (understanding what makes a finding actionable
        in a specific industry). All three are required; two without the third produces a different role.
      </p>
      <p>
        The <strong className="text-white">data science workflow</strong> is iterative, not linear. The
        CRISP-DM (Cross-Industry Standard Process for Data Mining) model formalises it: Business Understanding
        → Data Understanding → Data Preparation → Modeling → Evaluation → Deployment. You will often cycle
        back several steps after discovering data quality issues or poor model performance.
      </p>
      <p>
        Data comes in <strong className="text-white">four measurement scales</strong>: nominal (categories, no
        order), ordinal (ordered categories), interval (equal spacing, no true zero), and ratio (equal spacing,
        true zero). The scale determines which statistical operations are valid.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">The Three-Pillar Venn</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2"><p className="text-blue-300 font-bold">Stats & Math</p><p className="text-gray-400">Probability, inference, linear algebra, calculus</p></div>
          <div className="bg-green-500/10 border border-green-500/30 rounded p-2"><p className="text-green-300 font-bold">Programming</p><p className="text-gray-400">Python, R, SQL, pipelines</p></div>
          <div className="bg-violet-500/10 border border-violet-500/30 rounded p-2"><p className="text-violet-300 font-bold">Domain Knowledge</p><p className="text-gray-400">Business context, actionable insight</p></div>
        </div>
        <div className="mt-2 text-xs text-center text-gray-500">
          Stats + Programming = ML Engineer &nbsp;|&nbsp; Stats + Domain = Researcher &nbsp;|&nbsp;
          <span className="text-amber-300">All three = Data Scientist</span>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">CRISP-DM Phases</p>
        <div className="flex flex-wrap gap-1">
          {['Business Understanding', 'Data Understanding', 'Data Preparation', 'Modeling', 'Evaluation', 'Deployment'].map((phase, i) => (
            <span key={phase} className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded">
              {i + 1}. {phase}
            </span>
          ))}
        </div>
        <p className="text-gray-500 mt-1">Process is iterative — expect to cycle back from Modeling to Data Preparation multiple times.</p>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Data Science', definition: 'Interdisciplinary field extracting knowledge from data. Requires statistics (inference, probability), programming (Python, SQL, pipelines), and domain knowledge (what makes a finding actionable). All three together constitute a data scientist.' },
    { term: 'CRISP-DM', definition: 'Cross-Industry Standard Process for Data Mining. Six iterative phases: Business Understanding → Data Understanding → Data Preparation → Modeling → Evaluation → Deployment. Not linear — expect backtracking, especially from Modeling to Data Preparation.' },
    { term: 'Structured data', definition: 'Data organised into rows and columns with a defined schema. Examples: SQL tables, CSV files, Excel spreadsheets. Easy to query and model. ~20% of real-world data.' },
    { term: 'Unstructured data', definition: 'Data without a predefined schema. Examples: text documents, images, audio, video, social media posts. Requires NLP, computer vision, or deep learning to extract structure. ~80% of real-world data.' },
    { term: 'Nominal scale', definition: 'Categories with no inherent order. Examples: country, color, blood type. Only valid operations: count, mode, chi-square test. Cannot compute mean or median.' },
    { term: 'Ordinal scale', definition: 'Categories with a meaningful order but unknown/unequal intervals. Examples: satisfaction rating (1–5), education level, military rank. Valid: median, mode, rank correlation. Mean is debatable.' },
    { term: 'Ratio scale', definition: 'Numeric data with equal intervals AND a true zero (zero means none of the quantity). Examples: height, weight, income, age. All arithmetic operations valid: mean, standard deviation, ratios ("twice as heavy").' },
  ],

  code: {
    title: 'Exploring Data Types and Structure with Pandas',
    language: 'python',
    snippet: `import pandas as pd
import numpy as np

# ── Load and inspect data ─────────────────────────────────────
df = pd.read_csv('customers.csv')

print(df.shape)        # (rows, columns)
print(df.dtypes)       # data type of each column
print(df.head())       # first 5 rows
print(df.info())       # non-null counts + dtype
print(df.describe())   # summary statistics for numeric columns

# ── Identify measurement scales ───────────────────────────────
# Nominal — use value_counts(), no mean
print(df['country'].value_counts())
print(df['gender'].nunique())

# Ordinal — encode with Categorical for correct ordering
df['satisfaction'] = pd.Categorical(
    df['satisfaction'],
    categories=['poor', 'fair', 'good', 'excellent'],
    ordered=True
)
print(df['satisfaction'].median())  # valid for ordinal

# Ratio — full arithmetic is valid
print(df['age'].mean())
print(df['income'].describe())

# ── Detect missing values ─────────────────────────────────────
missing = df.isnull().sum()
missing_pct = df.isnull().mean() * 100
print(missing_pct[missing_pct > 0])  # only columns with gaps

# ── Structured vs semi-structured data ───────────────────────
# JSON (semi-structured) nested in a column → flatten
import json
df['metadata'] = df['metadata'].apply(json.loads)
metadata_df = pd.json_normalize(df['metadata'])
df = pd.concat([df.drop('metadata', axis=1), metadata_df], axis=1)`,
    explanation: 'df.info() is the first command to run on any new dataset — it shows nulls, dtypes, and memory usage in one call. Encoding ordinal columns as pd.Categorical with ordered=True lets pandas use the correct ordering for comparisons and sorting.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Misidentifying measurement scales leads to meaningless statistics.</strong>{' '}
        Computing the mean of a Likert scale (ordinal) produces a number like 3.7 — but the difference between
        "neutral" and "agree" is not the same as between "agree" and "strongly agree". Computing the mean of a
        postcode (nominal) is numerically possible but statistically nonsense.
      </p>
      <p>
        CRISP-DM exists because data science projects fail most often at the beginning (wrong business question)
        and in the middle (poor data quality not caught until evaluation). Spending more time on Business
        Understanding and Data Preparation — typically 60–80% of project time — is not waste; it is the reason
        models work in production.
      </p>
    </>
  ),

  commonMistakes: [
    'Computing mean on ordinal data — a satisfaction rating of 3.7 sounds precise but the interval assumption (equal spacing between categories) is usually invalid. Use median for ordinal data.',
    'Treating all numeric columns as ratio scale — postcode numbers, phone numbers, and ID columns are nominal despite being numbers. Never compute mean/std on identifiers.',
    'Skipping CRISP-DM phases — jumping from "we have data" to "let\'s build a model" without business understanding. The model will answer the wrong question or be impossible to deploy.',
    'Ignoring unstructured data — assuming only CSV/SQL data exists. Text, images, and logs often contain the richest signals but require NLP/CV preprocessing before modelling.',
  ],

  summary: [
    'Data Science = Statistics + Programming + Domain Knowledge. All three required; missing one produces a different role.',
    'CRISP-DM: 6 iterative phases. Business Understanding → Data Understanding → Preparation → Modeling → Evaluation → Deployment.',
    'Structured (~20%): rows & columns, SQL/CSV. Unstructured (~80%): text, images, audio — requires NLP/CV.',
    'Nominal: no order (country, color). Ordinal: order, unequal intervals (rating 1–5). Interval: equal spacing, no true zero (°C). Ratio: equal spacing + true zero (height, income).',
    'Only ratio/interval data support arithmetic mean. Ordinal → median. Nominal → mode/count.',
    'df.info(), df.describe(), df.isnull().mean() — the three essential first commands on any new dataset.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What are the three pillars of data science? What happens if you have only two?',
      hint: 'Statistics & Math + Programming + Domain Knowledge. Missing one: Stats + Programming (no domain knowledge) = Machine Learning Engineer — can build models but may answer the wrong business question. Stats + Domain (no programming) = Researcher/Analyst — can analyse but can\'t build scalable pipelines. Programming + Domain (no stats) = Domain Expert Coder — can automate but can\'t make statistically valid inferences. All three together = Data Scientist who can turn raw data into actionable business decisions.',
    },
    {
      type: 'question',
      text: 'Classify each of these as nominal, ordinal, interval, or ratio: (a) temperature in Celsius, (b) customer satisfaction (1–5), (c) country of birth, (d) salary, (e) class rank (1st, 2nd, 3rd).',
      hint: '(a) Interval — equal spacing (10°C difference is always same), but 0°C is not "no temperature"; 20°C is NOT "twice as warm" as 10°C. (b) Ordinal — ordered categories but intervals may not be equal (5 is better than 4, but by how much?). (c) Nominal — categories, no order. (d) Ratio — equal spacing AND true zero (£0 = no income); £50k IS twice £25k. (e) Ordinal — ordered (1st > 2nd > 3rd) but we don\'t know the gap in points between ranks.',
    },
    {
      type: 'question',
      text: 'Describe the CRISP-DM process. Why is it described as iterative rather than linear?',
      hint: 'CRISP-DM: (1) Business Understanding — define the problem and success criteria. (2) Data Understanding — collect, explore, identify quality issues. (3) Data Preparation — clean, transform, engineer features — typically 60–80% of total project time. (4) Modeling — choose algorithm, train, tune. (5) Evaluation — does the model meet business criteria? (6) Deployment — serve predictions in production. Iterative because: you often discover in (4) Modeling that features need redesign → back to (3). Or evaluation shows the model answers the wrong question → back to (1). Linear execution is a common project failure pattern.',
    },
    {
      type: 'task',
      text: 'Using pandas, load any CSV dataset and: (1) print shape and dtypes, (2) identify which columns are nominal/ordinal/ratio, (3) compute appropriate summary statistics for each type, (4) find columns with missing values and their percentages.',
      hint: 'df = pd.read_csv("file.csv"). print(df.shape, df.dtypes). Nominal: df["country"].value_counts(). Ordinal: pd.Categorical with ordered=True, then .median(). Ratio: df.describe(). Missing: df.isnull().mean()*100 → only show columns where result > 0. Also df.info() shows non-null counts.',
    },
  ],
}

export default function DataScienceFoundationsPage() {
  return <FEDFTopicPage content={content} />
}
