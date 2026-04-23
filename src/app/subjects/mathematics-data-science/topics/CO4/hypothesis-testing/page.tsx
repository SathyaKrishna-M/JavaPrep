'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Hypothesis Testing',
  subtitle: 'Null and alternative hypotheses, p-values, Type I/II errors, and the t-test',
  co: 'CO4 — Inferential Statistics',

  overview: (
    <>
      <p>
        <strong className="text-white">Hypothesis testing</strong> is a formal procedure for
        deciding whether sample data provides enough evidence to reject a specific claim about
        a population. We start with a <strong className="text-white">null hypothesis H₀</strong>{' '}
        (the default, "no effect" claim) and an{' '}
        <strong className="text-white">alternative hypothesis H₁</strong> (what we're trying
        to establish).
      </p>
      <p>
        The <strong className="text-white">p-value</strong> is the probability of observing
        data as extreme as (or more extreme than) what we got, assuming H₀ is true. A small
        p-value means the data is unlikely under H₀ — evidence to reject it. We compare p to
        a pre-specified <strong className="text-white">significance level α</strong> (typically
        0.05): if p &lt; α, we reject H₀.
      </p>
      <p>
        Two types of error: <strong className="text-white">Type I error</strong> (false positive
        — rejecting H₀ when it's true, probability = α) and{' '}
        <strong className="text-white">Type II error</strong> (false negative — failing to
        reject H₀ when it's false, probability = β). <strong className="text-white">Power</strong>{' '}
        = 1 − β = probability of correctly detecting a true effect.
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: A court trial. H₀ = "innocent." We only convict (reject H₀) if
        evidence is overwhelming. Type I error = wrongly convicting the innocent. Type II error
        = failing to convict the guilty. "Beyond reasonable doubt" is the significance level.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Decision Matrix</p>
        <div className="text-xs">
          <div className="grid grid-cols-3 gap-1 text-center mb-1">
            <div />
            <div className="text-gray-400 font-semibold">H₀ True</div>
            <div className="text-gray-400 font-semibold">H₀ False</div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="text-gray-400 font-semibold self-center">Reject H₀</div>
            <div className="bg-red-500/20 border border-red-500/40 rounded p-2">
              <p className="text-red-300 font-bold">Type I Error</p>
              <p className="text-gray-500">False Positive</p>
              <p className="text-red-400 font-mono">P = α</p>
            </div>
            <div className="bg-green-500/20 border border-green-500/40 rounded p-2">
              <p className="text-green-300 font-bold">Correct</p>
              <p className="text-gray-500">True Positive</p>
              <p className="text-green-400 font-mono">P = Power</p>
            </div>
            <div className="text-gray-400 font-semibold self-center">Fail to Reject</div>
            <div className="bg-green-500/20 border border-green-500/40 rounded p-2">
              <p className="text-green-300 font-bold">Correct</p>
              <p className="text-gray-500">True Negative</p>
              <p className="text-green-400 font-mono">P = 1−α</p>
            </div>
            <div className="bg-amber-500/20 border border-amber-500/40 rounded p-2">
              <p className="text-amber-300 font-bold">Type II Error</p>
              <p className="text-gray-500">False Negative</p>
              <p className="text-amber-400 font-mono">P = β</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs font-mono">
        <p className="text-cyan-400 font-sans font-semibold mb-2">t-test statistic</p>
        <p className="text-white text-sm">t = (x̄ − μ₀) / (s / √n)</p>
        <p className="text-gray-500 font-sans mt-1">Compare to t-distribution with df = n−1</p>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Null hypothesis H₀',    definition: 'The default claim — no effect, no difference, status quo. E.g., H₀: μ = 50. We assume H₀ is true and ask if the data gives enough evidence to reject it.' },
    { term: 'Alternative hypothesis H₁', definition: 'The claim we are trying to establish. Can be two-sided (H₁: μ ≠ 50), upper-tailed (H₁: μ > 50), or lower-tailed (H₁: μ < 50).' },
    { term: 'p-value',               definition: 'P(observing data this extreme | H₀ is true). NOT the probability that H₀ is true. If p < α, reject H₀. The smaller the p-value, the stronger the evidence against H₀.' },
    { term: 'Significance level α',  definition: 'Pre-specified threshold for rejection. α = 0.05 is conventional. The probability of committing a Type I error. Choose α before seeing data.' },
    { term: 'Type I error (α)',      definition: 'Rejecting H₀ when it is actually true — a false positive. P(Type I) = α. In medical testing: declaring an ineffective drug effective.' },
    { term: 'Type II error (β)',     definition: 'Failing to reject H₀ when it is actually false — a false negative. P(Type II) = β. In medical testing: declaring an effective drug ineffective.' },
    { term: 'Statistical power',     definition: 'Power = 1 − β. Probability of correctly rejecting a false H₀ (detecting a true effect). Increases with larger n, larger effect size, and larger α.' },
  ],

  code: {
    title: 'One-Sample and Two-Sample t-Tests in Python',
    language: 'python',
    snippet: `import numpy as np
from scipy import stats

np.random.seed(42)

# ── One-sample t-test ─────────────────────────────────────────
# Claim: average battery life = 10 hours. Sample says otherwise?
sample = np.array([9.8, 10.5, 9.2, 10.8, 9.6, 10.1, 8.9, 10.4, 9.7, 10.3])
mu_0 = 10.0   # null hypothesis: μ = 10

t_stat, p_value = stats.ttest_1samp(sample, popmean=mu_0)
print(f"t-statistic: {t_stat:.4f}")
print(f"p-value (two-sided): {p_value:.4f}")
print(f"Reject H₀ at α=0.05? {'Yes' if p_value < 0.05 else 'No'}")

# Manual calculation
x_bar = sample.mean()
s = sample.std(ddof=1)
n = len(sample)
t_manual = (x_bar - mu_0) / (s / np.sqrt(n))
print(f"Manual t: {t_manual:.4f} = ({x_bar:.3f} - {mu_0}) / ({s:.3f}/√{n})")

# ── Two-sample t-test (independent groups) ────────────────────
# Does a new teaching method improve scores?
control = np.random.normal(70, 12, 30)
treatment = np.random.normal(75, 12, 30)

t2, p2 = stats.ttest_ind(control, treatment)
print(f"\\nTwo-sample: t={t2:.4f}, p={p2:.4f}")
print(f"Control mean: {control.mean():.2f}, Treatment mean: {treatment.mean():.2f}")
print(f"Difference: {treatment.mean() - control.mean():.2f}")
print(f"Reject H₀ (μ₁=μ₂)? {'Yes' if p2 < 0.05 else 'No'}")

# ── Effect size: Cohen's d ────────────────────────────────────
pooled_std = np.sqrt((control.var(ddof=1) + treatment.var(ddof=1)) / 2)
cohens_d = (treatment.mean() - control.mean()) / pooled_std
print(f"Cohen's d = {cohens_d:.3f}")
# < 0.2 small, 0.5 medium, > 0.8 large effect

# ── One-tailed test ───────────────────────────────────────────
# H₁: μ > 10 (we only care if it's GREATER)
t_one, p_one = stats.ttest_1samp(sample, popmean=mu_0, alternative='greater')
print(f"\\nOne-tailed (greater): p={p_one:.4f}")

# ── Multiple comparisons: Bonferroni correction ───────────────
n_tests = 10
alpha_bonf = 0.05 / n_tests
print(f"\\nBonferroni-corrected α: {alpha_bonf:.4f}")`,
    explanation: 'Cohen\'s d is essential alongside p-values. A study with n=10,000 can detect a difference of 0.01 points as statistically significant (tiny p-value) even if the practical effect is negligible (d ≈ 0.001). Always report effect size alongside p-values.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Statistical significance ≠ practical significance.</strong>{' '}
        With a large enough sample, any trivial difference becomes statistically significant.
        A drug that improves outcomes by 0.001% might have p &lt; 0.001 in a million-person trial
        — statistically significant, clinically irrelevant. Always pair hypothesis tests with
        effect sizes (Cohen's d, relative risk) and confidence intervals.
      </p>
      <p>
        The p-value crisis in science is real: p-hacking (trying many tests until one reaches
        p &lt; 0.05), HARKing (hypothesising after results are known), and publication bias
        (only publishing significant results) inflate the false positive rate far above α. In
        data science, pre-register your hypothesis, correct for multiple comparisons, and report
        all tests run — not just the significant ones.
      </p>
    </>
  ),

  commonMistakes: [
    'Misinterpreting p-value: p is NOT "the probability that H₀ is true." It is the probability of data this extreme IF H₀ were true. These are very different.',
    'p < 0.05 does not mean the effect is large or practically important — report Cohen\'s d or a CI alongside the p-value.',
    'Failing to correct for multiple comparisons — running 20 tests at α=0.05 expects 1 false positive even if all H₀s are true. Use Bonferroni or FDR correction.',
    'One-tailed vs two-tailed confusion — only use one-tailed tests if you had a directional hypothesis BEFORE seeing the data. Post-hoc one-tailing is p-hacking.',
    'Assuming "fail to reject H₀" means "H₀ is true" — absence of evidence is not evidence of absence. A non-significant result may just mean the study was underpowered.',
  ],

  summary: [
    'H₀: null (no effect). H₁: alternative (what we test for). We reject H₀ if p < α.',
    'p-value = P(data this extreme | H₀ true). Small p → strong evidence against H₀.',
    'Type I error (α): false positive. Type II error (β): false negative. Power = 1 − β.',
    'One-sample t-test: t = (x̄ − μ₀) / (s/√n). Two-sample: tests if μ₁ = μ₂.',
    'Statistical significance ≠ practical significance. Always compute effect sizes (Cohen\'s d).',
    'Multiple comparisons inflate Type I errors. Bonferroni correction: α_adj = α / number of tests.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A manufacturer claims their bolts have mean diameter 10mm. A sample of 16 bolts has mean 9.8mm and std 0.4mm. Test H₀: μ = 10 at α = 0.05.',
      hint: 't = (9.8 − 10) / (0.4/√16) = −0.2 / 0.1 = −2.0. df=15. Critical t = ±2.131 (two-tailed, 5%). |−2.0| < 2.131 → Fail to reject H₀. Not enough evidence to say the mean differs from 10mm. Also: p ≈ 0.064 > 0.05.',
    },
    {
      type: 'question',
      text: 'Explain the difference between Type I and Type II errors in the context of a medical test for a disease.',
      hint: 'Type I (α): Telling a healthy person they have the disease (false positive). Causes unnecessary treatment, anxiety. Type II (β): Telling a sick person they are healthy (false negative). They go untreated — potentially fatal. For serious diseases, we minimize Type II (raise sensitivity), accepting more Type I errors.',
    },
    {
      type: 'question',
      text: 'A researcher runs 20 independent hypothesis tests at α=0.05. All null hypotheses are true. How many significant results do they expect? Why is this a problem?',
      hint: 'Expected false positives = 20 × 0.05 = 1. If they report only the "significant" one, it looks like a real finding but is just noise. This is why multiple comparison corrections (Bonferroni: α/20 = 0.0025) or false discovery rate methods are essential.',
    },
    {
      type: 'task',
      text: 'Using scipy.stats.ttest_ind, compare two groups from np.random.normal() with means 70 and 73, σ=10, n=30 each. Report: t-statistic, p-value, 95% CI for the difference, and Cohen\'s d. Is this practically significant?',
      hint: 'ttest_ind gives t and p. CI: use stats.t.interval() on the difference. Cohen\'s d = (mean_diff) / pooled_std. With d≈0.3 (small effect) and n=30, you may not get p<0.05. Increase n to 100 and watch p drop — same effect, more power.',
    },
  ],
}

export default function HypothesisTestingPage() {
  return <FEDFTopicPage content={content} />
}
