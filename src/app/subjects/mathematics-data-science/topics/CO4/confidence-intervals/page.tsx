'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Confidence Intervals',
  subtitle: 'Estimating population parameters with quantified uncertainty — the interval estimate',
  co: 'CO4 — Inferential Statistics',

  overview: (
    <>
      <p>
        A <strong className="text-white">confidence interval (CI)</strong> is a range of values
        that likely contains the true population parameter. Instead of a single point estimate
        (x̄ = 5.2), a 95% CI gives an interval: (4.7, 5.7). This quantifies the uncertainty
        inherent in estimating from a sample.
      </p>
      <p>
        The correct interpretation: "If we repeated this sampling procedure many times, 95% of
        the resulting intervals would contain the true population mean." A 95% CI does{' '}
        <em>not</em> mean "there's a 95% probability the true mean is in this specific interval"
        — the true mean is fixed; the interval is random.
      </p>
      <p>
        The <strong className="text-white">margin of error</strong> is half the interval width:
        ME = z* × SE = z* × σ/√n. Wider intervals = more confidence but less precision.
        The <strong className="text-white">t-distribution</strong> is used when σ is unknown
        (almost always) — it has heavier tails than Normal and adjusts for sample size via
        degrees of freedom (n−1).
      </p>
      <p className="text-gray-400 italic border-l-2 border-emerald-500/40 pl-3">
        Real-world analogy: A political poll reports "48% ± 3%" — that ±3% is the margin of
        error, and 48% is the point estimate. The confidence interval is (45%, 51%). You can't
        declare a winner because the interval spans 50%.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">CI Formula</p>
        <div className="font-mono text-sm text-center space-y-2 text-gray-300 py-2">
          <p className="text-white text-base">x̄ ± z* · (σ/√n)  &nbsp; <span className="text-gray-500 text-sm font-sans">(σ known)</span></p>
          <p className="text-white text-base">x̄ ± t* · (s/√n)  &nbsp; <span className="text-gray-500 text-sm font-sans">(σ unknown, use t)</span></p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-center">
          {[
            { conf: '90%', z: '1.645', color: 'amber' },
            { conf: '95%', z: '1.960', color: 'emerald' },
            { conf: '99%', z: '2.576', color: 'violet' },
          ].map(({ conf, z, color }) => (
            <div key={conf} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-2`}>
              <p className={`text-${color}-300 font-bold font-mono`}>{conf} CI</p>
              <p className={`text-${color}-300 text-[10px]`}>z* = {z}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-cyan-400 font-semibold mb-2">What affects CI width?</p>
        <div className="space-y-1 text-gray-400">
          <p>↑ Confidence level → <span className="text-red-400">wider</span> interval (more certain, less precise)</p>
          <p>↑ Sample size n → <span className="text-green-400">narrower</span> interval (more data, more precise)</p>
          <p>↑ Variability σ → <span className="text-red-400">wider</span> interval (more spread, less precise)</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Confidence interval',   definition: 'A range (lower, upper) estimated from sample data that contains the true population parameter with a specified probability (confidence level) in repeated sampling.' },
    { term: 'Confidence level',      definition: 'The proportion of intervals (from repeated sampling) that would contain the true parameter. Common choices: 90%, 95%, 99%. Higher confidence → wider interval.' },
    { term: 'Margin of error',       definition: 'ME = z* × SE. Half the interval width. Determines how far the estimate might be from the true value. Shrinks as n grows (SE = σ/√n).' },
    { term: 'Critical value (z*)',   definition: 'The z-score corresponding to the desired confidence level. z*=1.96 for 95%. Comes from the Normal (or t) distribution.' },
    { term: 't-distribution',        definition: 'Used instead of Normal when σ is unknown. Heavier tails than Normal, controlled by degrees of freedom df = n−1. Approaches Normal as n→∞.' },
    { term: 'Degrees of freedom',    definition: 'df = n−1 for a one-sample t-interval. Represents the number of independent values that can vary. Affects the critical t* value — larger df gives critical values closer to z*.' },
    { term: 'Width vs precision',    definition: 'Narrower CI = more precise but less confident. To halve the margin of error, quadruple the sample size (ME ∝ 1/√n). There is always a tradeoff between confidence and precision.' },
  ],

  code: {
    title: 'Computing Confidence Intervals in Python',
    language: 'python',
    snippet: `import numpy as np
from scipy import stats

np.random.seed(42)

# ── Example: sample of 36 students' exam scores ───────────────
sample = np.random.normal(72, 12, 36)   # population: μ=72, σ=12
n = len(sample)
x_bar = sample.mean()
s = sample.std(ddof=1)   # sample std

print(f"n={n}, x̄={x_bar:.2f}, s={s:.2f}")

# ── Z-interval (σ known) ──────────────────────────────────────
sigma_known = 12   # suppose we know population σ
se_z = sigma_known / np.sqrt(n)
z_star = stats.norm.ppf(0.975)   # 97.5th percentile = 1.96 for 95%

ci_z = (x_bar - z_star * se_z, x_bar + z_star * se_z)
print(f"95% Z-interval: ({ci_z[0]:.2f}, {ci_z[1]:.2f})")
print(f"Margin of error: ±{z_star * se_z:.2f}")

# ── T-interval (σ unknown — the usual case) ───────────────────
ci_t = stats.t.interval(confidence=0.95, df=n-1, loc=x_bar, scale=s/np.sqrt(n))
print(f"95% T-interval: ({ci_t[0]:.2f}, {ci_t[1]:.2f})")

# Compare t* vs z* for different sample sizes
print("\\ndf    t*(95%)   z*(95%)")
for df in [4, 9, 19, 29, 99]:
    t_star = stats.t.ppf(0.975, df=df)
    print(f"{df+1:4d}   {t_star:.4f}    1.9600")

# ── Effect of confidence level on width ───────────────────────
print("\\nConf Level   z*      CI width")
for conf in [0.90, 0.95, 0.99]:
    z = stats.norm.ppf((1 + conf) / 2)
    width = 2 * z * se_z
    print(f"{conf:.0%}         {z:.3f}   {width:.2f}")

# ── Required sample size for target margin of error ───────────
target_me = 2.0   # want ±2 points
required_n = (z_star * sigma_known / target_me) ** 2
print(f"\\nRequired n for ME≤{target_me}: {np.ceil(required_n):.0f}")`,
    explanation: 'The t-interval is almost always used in practice (σ is rarely known). Notice how t* converges to z*=1.96 as sample size grows. For small samples (n<30), the t-distribution is noticeably wider, reflecting greater uncertainty.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Confidence intervals are more informative than p-values alone.</strong>{' '}
        A 95% CI tells you the plausible range of the true effect size — not just whether an
        effect exists. Two studies can both be "statistically significant" but one CI spans
        (0.001, 0.002) while another spans (5, 50) — completely different practical implications.
      </p>
      <p>
        In A/B testing, reporting "conversion rate increased by 2.3% (95% CI: 0.8%, 3.8%)"
        is actionable. If the lower bound is practically meaningful, ship the change.
        If the CI includes zero or the lower bound is too small to matter, don't.
        The interval drives decisions; the p-value alone doesn't.
      </p>
    </>
  ),

  commonMistakes: [
    'Misinterpreting the CI: "95% probability the parameter is in this interval" is WRONG. The parameter is fixed — the interval is what\'s random. Correct: "95% of such intervals contain the true parameter."',
    'Using z* when you should use t* — always use t when σ is unknown (almost always). For n>100, z and t are nearly identical, but for small samples the difference matters.',
    'Wider CI ≠ better analysis — wider CIs mean less precision, not more confidence in the result. Always report both the CI and the sample size.',
    'Forgetting that CI width ∝ 1/√n — to halve the margin of error, you need 4x the data, not 2x.',
    'Treating overlapping CIs as "not significantly different" — this is not equivalent to a two-sample t-test. Two CIs can overlap yet be statistically significantly different.',
  ],

  summary: [
    'CI = x̄ ± ME, where ME = z* × σ/√n (known σ) or t* × s/√n (unknown σ — use almost always).',
    '95% CI uses z*=1.96; 99% CI uses z*=2.576. Higher confidence → wider interval.',
    't-distribution used when σ unknown. df = n−1. Converges to Normal as n→∞.',
    'CI width decreases as n increases (∝ 1/√n) and increases with variability (∝ σ).',
    'Correct interpretation: "95% of such intervals contain the true parameter" — not "95% chance the parameter is here."',
    'To achieve target margin of error ME: required n = (z* × σ / ME)².',
  ],

  practice: [
    {
      type: 'question',
      text: 'A sample of 25 measurements has mean 48 and std 10. Compute the 95% confidence interval for the population mean.',
      hint: 'Use t-interval (σ unknown). df=24. t*(0.975, 24) ≈ 2.064. SE = 10/√25 = 2. ME = 2.064 × 2 = 4.128. CI = (48 − 4.13, 48 + 4.13) = (43.87, 52.13).',
    },
    {
      type: 'question',
      text: 'How many observations are needed to estimate a population mean within ±3 units with 95% confidence, assuming σ=15?',
      hint: 'n = (z* × σ / ME)² = (1.96 × 15 / 3)² = (9.8)² = 96.04. Round up to n = 97.',
    },
    {
      type: 'question',
      text: 'Explain why the t-distribution has heavier tails than the Normal distribution and when they converge.',
      hint: 'When σ is estimated from a small sample, there is additional uncertainty. The t-distribution accounts for this by putting more probability in the tails (wider CIs). As n increases, s becomes a more reliable estimate of σ, and t* → z*. For df>100, the difference is negligible.',
    },
    {
      type: 'task',
      text: 'Simulate the "95% confidence" claim: generate 1,000 samples of size n=30 from N(μ=50, σ=10). For each, compute a 95% t-interval. Count what fraction contain μ=50. It should be approximately 95%.',
      hint: 'for _ in range(1000): s=np.random.normal(50,10,30); lo,hi=stats.t.interval(0.95,df=29,loc=s.mean(),scale=s.std(ddof=1)/np.sqrt(30)); contains.append(lo<50<hi). np.mean(contains) ≈ 0.95.',
    },
  ],
}

export default function ConfidenceIntervalsPage() {
  return <FEDFTopicPage content={content} />
}
