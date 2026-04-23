'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Measurement Scales & Data Types',
  subtitle: 'Nominal, ordinal, interval, and ratio — the four levels that determine which statistics apply',
  co: 'CO2 — Descriptive Statistics',

  overview: (
    <>
      <p>
        Before computing any statistic, you must understand what type of data you have.
        Applying the wrong statistic to the wrong data type produces meaningless results —
        calculating the "average" of zip codes or the "mode" of continuous temperatures
        are classic examples of this error.
      </p>
      <p>
        Stevens' <strong className="text-white">four levels of measurement</strong> form a
        hierarchy. At the bottom, <strong className="text-white">nominal</strong> data
        (categories with no order). Above that, <strong className="text-white">ordinal</strong>{' '}
        (ordered categories but unequal intervals). Then <strong className="text-white">interval</strong>{' '}
        (equal intervals, no true zero). Finally <strong className="text-white">ratio</strong>{' '}
        (equal intervals with a true zero — the highest level).
      </p>
      <p>
        The level of measurement determines which operations and statistics are valid.
        Higher levels support more operations: ratios can be added, subtracted, multiplied,
        and divided meaningfully; nominal data can only be counted and compared for equality.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: Measurement levels are like the types of comparisons you can make.
        For jersey numbers (nominal) you can only say "same or different." For race finishing
        position (ordinal) you can say "faster or slower." For temperature in Celsius (interval)
        you can say "10° hotter." For height in cm (ratio) you can say "twice as tall."
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">The Four Measurement Scales</p>
        <div className="space-y-2 text-xs">
          {[
            { level: 'Nominal', example: 'Blood type, zip code, color, gender', ops: 'Count, mode, frequency', color: 'blue' },
            { level: 'Ordinal', example: 'Satisfaction (1–5 stars), education level, rankings', ops: '+ Median, percentiles, comparisons (>, <)', color: 'violet' },
            { level: 'Interval', example: 'Temperature (°C), IQ scores, calendar year', ops: '+ Mean, standard deviation, addition/subtraction', color: 'amber' },
            { level: 'Ratio',   example: 'Height, weight, income, time, age', ops: '+ All above + multiplication/division, geometric mean', color: 'green' },
          ].map(({ level, example, ops, color }) => (
            <div key={level} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-3`}>
              <div className="flex items-start gap-3">
                <span className={`text-${color}-300 font-bold w-16 shrink-0`}>{level}</span>
                <div>
                  <p className="text-gray-300"><span className="text-gray-500">e.g. </span>{example}</p>
                  <p className={`text-${color}-300 text-[10px] mt-1`}>{ops}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Nominal scale',   definition: 'Categories with no meaningful order. Only valid operations: =, ≠, count, mode. Examples: blood type (A/B/AB/O), country, product category.' },
    { term: 'Ordinal scale',   definition: 'Ordered categories, but intervals between ranks are not necessarily equal. Valid: >, <, =, median. Invalid: mean (assumes equal spacing). Example: satisfaction ratings (poor/fair/good/excellent).' },
    { term: 'Interval scale',  definition: 'Equal intervals between values but no true zero. Zero is arbitrary. Ratios are meaningless: 20°C is not "twice as hot" as 10°C. Valid: mean, std. Example: Celsius, Fahrenheit, IQ.' },
    { term: 'Ratio scale',     definition: 'Equal intervals AND a true zero (zero means absence). Ratios are meaningful: 100kg is twice 50kg. All statistics valid. Examples: height, weight, income, age.' },
    { term: 'Discrete',        definition: 'Can only take countable values (usually integers). Examples: number of children, count of transactions. No values exist between 2 and 3.' },
    { term: 'Continuous',      definition: 'Can take any value within a range. Examples: height, temperature, time. In theory, infinite precision possible.' },
    { term: 'Qualitative',     definition: 'Non-numeric data describing categories or qualities. Includes nominal and ordinal. Summarised with counts and proportions, not means.' },
  ],

  code: {
    title: 'Identifying and Handling Data Types in Pandas',
    language: 'python',
    snippet: `import pandas as pd

df = pd.DataFrame({
    'blood_type':  ['A', 'B', 'AB', 'O', 'A'],         # Nominal
    'satisfaction': ['Poor', 'Good', 'Good', 'Excellent', 'Fair'],  # Ordinal
    'temp_celsius': [36.6, 37.2, 36.8, 38.5, 36.9],    # Interval
    'height_cm':   [165, 178, 155, 190, 172],            # Ratio
})

# ── Nominal: only counts and mode make sense ──────────────────
print(df['blood_type'].value_counts())        # frequency
print(df['blood_type'].mode()[0])             # mode
# ✕ df['blood_type'].mean()  → meaningless

# ── Ordinal: encode order before computing median ─────────────
order = {'Poor': 1, 'Fair': 2, 'Good': 3, 'Excellent': 4}
df['satisfaction_num'] = df['satisfaction'].map(order)

print(df['satisfaction_num'].median())        # valid: 3.0
# ✕ df['satisfaction_num'].mean()  → technically possible but debated

# ── Interval: mean and std valid, but NOT ratios ──────────────
print(df['temp_celsius'].mean())              # 37.2
print(df['temp_celsius'].std())              # valid
# ✕ "38.5°C is twice 19.25°C" → meaningless (no true zero)

# ── Ratio: all operations valid ───────────────────────────────
print(df['height_cm'].mean())                # 172.0
print(df['height_cm'].max() / df['height_cm'].min())  # 1.226x taller (meaningful)

# ── Practical: check and convert dtypes ──────────────────────
print(df.dtypes)

# Convert to category dtype to save memory for nominal/ordinal
df['blood_type'] = df['blood_type'].astype('category')
df['satisfaction'] = pd.Categorical(
    df['satisfaction'],
    categories=['Poor', 'Fair', 'Good', 'Excellent'],
    ordered=True   # tells pandas it's ordinal
)
print(df['satisfaction'].min())   # 'Poor' — ordering works!`,
    explanation: 'Pandas\' Categorical dtype with ordered=True models ordinal data correctly — min(), max(), and comparisons respect the defined order rather than alphabetical order.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Choosing the wrong statistic for your data type is a fundamental error.</strong>{' '}
        Computing the mean of ordinal satisfaction scores (1–5 stars) assumes equal spacing
        between categories — that "going from 1 to 2 stars" is the same improvement as
        "going from 4 to 5 stars." This is often false and misleads decisions.
      </p>
      <p>
        Measurement scales also determine which machine learning algorithms apply.
        Linear regression requires the target to be ratio-scale (interval is acceptable).
        Logistic regression targets are nominal (binary). Classification algorithms output
        nominal predictions.
      </p>
      <p>
        The interval vs. ratio distinction has a practical consequence: you can compute
        meaningful percentage changes only with ratio data. "Revenue increased 20%" is
        meaningful (ratio). "Temperature increased 20%" in Celsius is less so (interval —
        no true zero means the percentage depends on where you start).
      </p>
    </>
  ),

  commonMistakes: [
    'Averaging nominal data — computing the "average" gender or zip code is meaningless.',
    'Treating ordinal scales as ratio — averaging "satisfaction" scores assumes equal intervals between categories, which is rarely true.',
    'Confusing interval and ratio — saying "0°C means no temperature" is wrong (0°C is just the freezing point of water, not absence of heat).',
    'Ignoring data types when choosing visualizations — bar charts for nominal, box plots for continuous, histograms for distributions.',
    'Not converting strings to categorical dtype — pandas stores nominal columns as object, which is slower and doesn\'t preserve ordinal ordering.',
  ],

  summary: [
    'Nominal: unordered categories. Only: count, mode, =, ≠. Examples: blood type, country.',
    'Ordinal: ordered categories, unequal intervals. Add: median, percentiles, >, <. Example: ratings.',
    'Interval: equal intervals, no true zero. Add: mean, std. Ratios meaningless. Example: °C, IQ.',
    'Ratio: equal intervals + true zero. All operations valid. Examples: height, weight, income.',
    'Discrete: countable integer values. Continuous: any value in a range.',
    'Use pd.Categorical(ordered=True) for ordinal data to preserve ordering in Pandas.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A survey asks students to rate a course 1–5. What measurement scale is this, and what statistics are appropriate?',
      hint: 'Ordinal — the categories have order (1 < 2 < 3 < 4 < 5) but the intervals may not be equal ("going from 1 to 2" might not represent the same improvement as "going from 4 to 5"). Safe statistics: median, mode, percentiles, frequency counts. The mean is debated — commonly used but technically assumes equal intervals.',
    },
    {
      type: 'question',
      text: 'Why can\'t you say "40°C is twice as hot as 20°C"?',
      hint: 'Celsius is an interval scale — zero is arbitrary (the freezing point of water), not the absence of heat. For ratios to be meaningful, you need a true zero. In Kelvin (ratio scale), 0K is absolute zero. 40K is twice 20K. In Celsius, 40°C = 313K and 20°C = 293K — not a 2:1 ratio.',
    },
    {
      type: 'question',
      text: 'Classify each of these variables: (a) zip code, (b) Likert scale 1–7, (c) time in seconds, (d) calendar year.',
      hint: '(a) zip code → Nominal (numbers are labels, no ordering). (b) Likert 1–7 → Ordinal (ordered, unequal intervals). (c) time in seconds → Ratio (true zero = no time elapsed). (d) calendar year → Interval (no true zero — year 0 doesn\'t mean "no time").',
    },
    {
      type: 'task',
      text: 'Create a DataFrame with one column of each measurement type. Apply the appropriate summary statistic to each (mode for nominal, median for ordinal, mean for interval/ratio) and explain why each choice is correct.',
      hint: 'Nominal: df["category"].mode(). Ordinal: encode to numbers first, then .median(). Interval/Ratio: .mean(). Also verify with .value_counts() for nominal, .describe() for numeric.',
    },
  ],
}

export default function MeasurementScalesPage() {
  return <FEDFTopicPage content={content} />
}
