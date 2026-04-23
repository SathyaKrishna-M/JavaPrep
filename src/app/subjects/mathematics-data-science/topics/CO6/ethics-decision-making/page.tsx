'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Ethics & Decision Making',
  subtitle: 'Bias in data, fairness in models, and responsible data science practice',
  co: 'CO6 — Visualization & Decision Making',

  overview: (
    <>
      <p>
        <strong className="text-white">Data ethics</strong> is not optional — it is a core
        competency of every data scientist. Models are not neutral: they inherit biases from
        the data they are trained on, amplify existing inequalities, and can cause real harm
        when deployed without careful consideration of their impact on people.
      </p>
      <p>
        <strong className="text-white">Bias</strong> in data science has two faces: statistical
        bias (systematic error in estimation) and societal bias (unfair treatment of groups based
        on protected characteristics like race, gender, or age). A model trained on historically
        biased data will produce biased predictions — even if "protected" features are excluded,
        proxy variables can reintroduce discrimination.
      </p>
      <p>
        <strong className="text-white">Fairness</strong> is mathematically hard to achieve
        across multiple criteria simultaneously — demographic parity, equalised odds, and
        individual fairness are often mutually incompatible. Choosing which fairness criterion
        to optimise is a value judgement, not a technical decision.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        COMPAS case study: A recidivism prediction algorithm used in US courts was found to
        have higher false positive rates for Black defendants than white defendants — predicting
        re-offending for people who wouldn't re-offend. Optimising overall accuracy missed this
        critical disparity.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Sources of Bias in the ML Pipeline</p>
        <div className="space-y-2 text-xs">
          {[
            { stage: 'Data collection', bias: 'Sampling bias, historical bias, measurement bias', color: 'red' },
            { stage: 'Feature engineering', bias: 'Proxy discrimination (zip code → race), label bias', color: 'orange' },
            { stage: 'Model training', bias: 'Optimising accuracy ignores subgroup disparities', color: 'amber' },
            { stage: 'Evaluation', bias: 'Aggregate metrics hide per-group failures', color: 'yellow' },
            { stage: 'Deployment', bias: 'Feedback loops amplify initial bias over time', color: 'pink' },
          ].map(({ stage, bias, color }) => (
            <div key={stage} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-2 flex gap-3`}>
              <span className={`text-${color}-300 font-semibold shrink-0 w-32`}>{stage}</span>
              <span className="text-gray-400">{bias}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Fairness Criteria (often mutually exclusive)</p>
        <div className="space-y-1 text-gray-400">
          <p><span className="text-violet-300">Demographic parity:</span> equal positive prediction rates across groups</p>
          <p><span className="text-violet-300">Equalised odds:</span> equal TPR and FPR across groups</p>
          <p><span className="text-violet-300">Calibration:</span> predicted probabilities match actual rates in each group</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Sampling bias',       definition: 'Training data does not represent the deployment population. A facial recognition system trained mostly on lighter-skinned faces will perform worse on darker-skinned faces — not because of a design choice, but because of who was in the training data.' },
    { term: 'Historical bias',     definition: 'Past human decisions encoded in data perpetuate historical inequalities. If past hiring decisions were biased against women, a model trained on those decisions will replicate that bias — even without using gender as a feature.' },
    { term: 'Proxy discrimination', definition: 'Using a seemingly neutral variable that is correlated with a protected attribute. Zip code correlates with race; browser type correlates with socioeconomic status. Removing protected features doesn\'t eliminate the bias if proxies remain.' },
    { term: 'Demographic parity',  definition: 'A fairness criterion: P(ŷ=1 | group A) = P(ŷ=1 | group B). Equal positive prediction rates across groups regardless of actual base rates. May conflict with accuracy if base rates differ.' },
    { term: 'Equalised odds',      definition: 'Both TPR and FPR are equal across groups. Ensures the model is equally good AND equally bad for all groups. Generally considered a stronger fairness criterion than demographic parity.' },
    { term: 'Feedback loop',       definition: 'Model predictions affect future data, reinforcing existing patterns. Predictive policing sends more officers to predicted crime areas → more arrests there → data shows more crime there → model reinforces the prediction.' },
    { term: 'Model transparency',  definition: 'The ability to explain model decisions. Required by GDPR (right to explanation), essential for trust, and legally mandated in high-stakes domains (credit, employment, healthcare). Simpler models are inherently more explainable.' },
  ],

  code: {
    title: 'Detecting and Measuring Bias in Model Predictions',
    language: 'python',
    snippet: `import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, classification_report

np.random.seed(42)
n = 1000

# ── Simulate biased dataset ───────────────────────────────────
# Scenario: loan approval model. Historical data reflects past discrimination.
group = np.random.choice(['A', 'B'], n, p=[0.6, 0.4])
# Group B historically disadvantaged → lower "credit scores" in data
credit_score = np.where(
    group == 'A',
    np.random.normal(650, 80, n),
    np.random.normal(580, 90, n)   # lower mean due to historical bias
)

# True probability of repayment (should be same for same credit score)
true_prob = 1 / (1 + np.exp(-(credit_score - 600) / 80))
repays = (np.random.rand(n) < true_prob).astype(int)

df = pd.DataFrame({'group': group, 'credit_score': credit_score, 'repays': repays})

# ── Train model (using only credit score, not group) ──────────
X = df[['credit_score']]
y = df['repays']

model = LogisticRegression().fit(X, y)
df['pred'] = model.predict(X)
df['prob'] = model.predict_proba(X)[:, 1]

# ── Fairness audit: per-group metrics ─────────────────────────
print("=== Per-Group Fairness Analysis ===")
for g in ['A', 'B']:
    subset = df[df['group'] == g]
    cm = confusion_matrix(subset['repays'], subset['pred'])
    tn, fp, fn, tp = cm.ravel()
    tpr = tp / (tp + fn)   # recall / sensitivity
    fpr = fp / (fp + tn)   # false positive rate
    approval_rate = subset['pred'].mean()
    print(f"Group {g}: Approval rate={approval_rate:.2%}, TPR={tpr:.3f}, FPR={fpr:.3f}")

# ── Demographic parity gap ────────────────────────────────────
rate_A = df[df['group']=='A']['pred'].mean()
rate_B = df[df['group']=='B']['pred'].mean()
print(f"\\nDemographic parity gap: {rate_A - rate_B:.3f}")
print(f"(Group A approved {rate_A:.1%} vs Group B {rate_B:.1%})")

# ── Average predicted probability by group ────────────────────
print("\\nMean predicted probability:")
print(df.groupby('group')['prob'].mean())

# ── What if we had used protected attribute? ──────────────────
X_with_group = pd.get_dummies(df[['credit_score', 'group']], drop_first=True)
model2 = LogisticRegression().fit(X_with_group, y)
print("\\nCoefficients with group included:")
for feat, coef in zip(X_with_group.columns, model2.coef_[0]):
    print(f"  {feat}: {coef:.4f}")`,
    explanation: 'Even without using the protected attribute (group), the model learns to discriminate because credit_score is correlated with group (due to historical bias). Removing the protected feature is necessary but not sufficient to achieve fairness.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Data scientists make decisions that affect millions of people.</strong>{' '}
        Credit scoring, hiring screening, predictive policing, medical diagnosis — these
        models have life-altering consequences. A data scientist who only optimises
        accuracy without auditing for fairness is not doing their job completely.
      </p>
      <p>
        Regulations are catching up: GDPR (EU) requires explainability for automated
        decisions affecting individuals. The EU AI Act classifies high-risk AI systems
        (hiring, credit, law enforcement) with strict fairness and transparency requirements.
        Understanding ethics is not just the right thing to do — it is increasingly a legal
        and professional necessity.
      </p>
    </>
  ),

  commonMistakes: [
    'Assuming removing protected features eliminates bias — proxy variables (zip code, name, browser) can reintroduce discrimination. Use fairness audits, not just feature removal.',
    'Optimising only aggregate accuracy — a model can be 95% accurate overall while systematically failing for minority groups. Always evaluate performance disaggregated by sensitive attributes.',
    'Ignoring feedback loops — if your model affects the data generated in the future (policing, recommendation systems), its initial biases will compound over time.',
    'Treating fairness as purely technical — the choice of which fairness criterion to optimise (demographic parity vs equalised odds) encodes a value judgement. Involve stakeholders and domain experts.',
    'Deploying without ongoing monitoring — model performance and fairness can degrade as populations and behaviours change. Build monitoring pipelines from the start.',
  ],

  summary: [
    'Bias sources: sampling bias, historical bias, proxy discrimination, feedback loops. Present throughout the ML pipeline.',
    'Fairness criteria: demographic parity (equal approval rates), equalised odds (equal TPR and FPR), calibration. Often mutually exclusive.',
    'Removing protected features is insufficient — proxies reintroduce bias. Conduct per-group fairness audits.',
    'GDPR and EU AI Act mandate explainability and fairness for high-stakes automated decisions.',
    'Aggregate metrics hide per-group failures — always disaggregate evaluation by sensitive attributes.',
    'Data scientists have an ethical obligation to consider the real-world impact of their models, not just optimise a metric.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A hiring model achieves 88% accuracy overall, with 90% accuracy for male candidates and 72% for female candidates. What does this tell you, and what should you do?',
      hint: 'The model systematically underperforms for female candidates — it is less reliable at predicting their job success. This likely reflects historical bias in training data (e.g. past hiring decisions that discriminated). Actions: audit feature correlations with gender, check for proxy variables, consider equalised odds as a fairness constraint, potentially retrain with fairness-aware techniques or collect more representative data.',
    },
    {
      type: 'question',
      text: 'Explain the concept of a feedback loop in predictive policing and why it is problematic.',
      hint: 'Predictive policing sends police to areas predicted to have high crime. More police presence → more arrests in those areas → that area\'s crime rate in data increases → model continues/amplifies predictions for the same area. The model creates a self-fulfilling prophecy. It cannot distinguish areas with genuinely high crime from areas that were over-policed. The system compounds its own biases over time.',
    },
    {
      type: 'question',
      text: 'Why can demographic parity and equalised odds be mutually incompatible? Give an example.',
      hint: 'If base rates differ between groups (e.g. Group A has 30% actual positive rate, Group B has 50%), then achieving equal TPR (equalised odds) will produce different approval rates (violating demographic parity), because the same TPR applied to different base rates produces different numbers. You cannot simultaneously have equal approval rates AND equal true positive rates when the underlying rates differ. This is the fundamental tension in algorithmic fairness.',
    },
    {
      type: 'task',
      text: 'Using the simulated loan dataset from the code example, compute: (1) approval rate gap between groups, (2) TPR gap, (3) FPR gap. Then add the group feature directly and retrain. Does fairness improve? Discuss the ethical implications.',
      hint: 'For each group: approval_rate = (pred==1).mean(). TPR = TP/(TP+FN). FPR = FP/(FP+TN). Adding group feature may improve per-group TPR/FPR if the historical bias in credit_score is then adjusted for. But is using group membership to make financial decisions legal? (In many jurisdictions it is not — this is the core tension of the fairness paradox.)',
    },
  ],
}

export default function EthicsDecisionMakingPage() {
  return <FEDFTopicPage content={content} />
}
