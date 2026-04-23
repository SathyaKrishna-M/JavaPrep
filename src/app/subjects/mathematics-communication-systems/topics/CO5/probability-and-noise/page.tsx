'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Probability & Noise',
  subtitle: 'AWGN channel model, Gaussian distribution, Q-function, and noise in communication systems',
  co: 'CO5 — Probability & BER Analysis',

  overview: (
    <>
      <p>
        Noise in communication systems is modelled as a <strong className="text-white">random process</strong>.
        The standard model is <strong className="text-white">Additive White Gaussian Noise (AWGN)</strong>:
        the received signal r(t) = s(t) + n(t) where n(t) is a Gaussian random process with:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        E[n(t)] = 0 &nbsp;&nbsp;&nbsp; E[n(t)²] = σ² &nbsp;&nbsp;&nbsp; PSD: Sₙ(f) = N₀/2 (flat — "white")
      </p>
      <p>
        The noise samples after the matched filter are <strong className="text-white">Gaussian distributed</strong>.
        A Gaussian random variable X ~ N(μ, σ²) has PDF:
        f(x) = (1/σ√(2π))·e^(−(x−μ)²/(2σ²)).
        The probability of error is the area under this curve beyond the decision threshold — computed using
        the <strong className="text-white">Q-function</strong>: Q(x) = P[Z {'>'} x] for Z~N(0,1).
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Gaussian PDF and Q-function</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-2">X ~ N(0, σ²)</p>
            <p className="font-mono text-gray-300">f(x) = (1/σ√(2π)) e^(−x²/2σ²)</p>
            <p className="text-gray-400 mt-1">68% within ±σ</p>
            <p className="text-gray-400">95% within ±2σ</p>
            <p className="text-gray-400">99.7% within ±3σ</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
            <p className="text-red-300 font-bold mb-2">Q-function values</p>
            <p className="font-mono text-gray-300">Q(1) = 0.1587 (15.9%)</p>
            <p className="font-mono text-gray-300">Q(2) = 0.0228 (2.3%)</p>
            <p className="font-mono text-gray-300">Q(3) = 1.35×10⁻³</p>
            <p className="font-mono text-gray-300">Q(4) = 3.17×10⁻⁵</p>
            <p className="font-mono text-gray-300">Q(6) ≈ 1×10⁻⁹</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">AWGN Channel Model</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p>Received: r(t) = s(t) + n(t)</p>
          <p>Noise PSD: Sₙ(f) = N₀/2 &nbsp; [W/Hz, two-sided]</p>
          <p>Noise power in bandwidth B: Pₙ = N₀·B &nbsp; (one-sided B)</p>
          <p className="text-cyan-300 mt-1">White = flat PSD (all frequencies equally). Gaussian = amplitude distribution.</p>
          <p className="text-cyan-300">These are independent properties — thermal noise is both.</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Random variable', definition: 'A variable whose value is determined by a random experiment. Described by its probability distribution (PDF for continuous, PMF for discrete). Key statistics: mean E[X] (average), variance Var[X] = E[(X−μ)²] (spread), standard deviation σ = √Var[X].' },
    { term: 'Gaussian distribution N(μ, σ²)', definition: 'PDF: f(x) = (1/(σ√(2π))) exp(−(x−μ)²/(2σ²)). Fully specified by mean μ and variance σ². Bell-shaped, symmetric about μ. The sum of many independent random variables → Gaussian (Central Limit Theorem). Thermal noise is Gaussian due to the sum of many independent electron contributions.' },
    { term: 'AWGN', definition: 'Additive White Gaussian Noise. Additive: adds to the signal r=s+n. White: flat power spectral density N₀/2 — equal power at all frequencies. Gaussian: amplitude at each time instant is Gaussian distributed. The standard model for thermal noise in receivers. N₀ = kT (Boltzmann constant × temperature in Kelvin).' },
    { term: 'Q-function', definition: 'Q(x) = (1/√(2π))∫ₓ^∞ exp(−t²/2) dt = P[Z>x] for Z~N(0,1). Tail probability of standard normal. Related to complementary error function: Q(x) = erfc(x/√2)/2. No closed form — computed numerically. Q(x) decreases rapidly: Q(3.09) ≈ 10⁻³, Q(4.26) ≈ 10⁻⁵, Q(4.75) ≈ 10⁻⁶.' },
    { term: 'Noise figure and temperature', definition: 'Noise figure F = SNR_in/SNR_out (ratio ≥ 1). In dB: NF = 10log₁₀(F). Equivalent noise temperature: Tₑ = (F−1)·T₀ where T₀=290K. N₀ = k(T_system + Tₑ). A low-noise amplifier (LNA) at the receiver input minimises NF and hence N₀.' },
    { term: 'Central Limit Theorem', definition: 'The sum of N independent identically distributed random variables → Gaussian distribution as N→∞, regardless of the original distribution. Thermal noise = sum of billions of electron movements → Gaussian. This justifies the AWGN model for virtually all practical noise sources.' },
    { term: 'Noise bandwidth', definition: 'B_N = (1/H_max²)∫|H(f)|²df — the bandwidth of an equivalent ideal filter with the same noise output power. For a matched filter, noise bandwidth = 1/(2Tb) = Rb/2. The noise power at the matched filter output = N₀/2 × 2B_N × Eb/N₀ ... This connects noise PSD N₀ to the decision noise variance σ² = N₀Eb/2.' },
  ],

  code: {
    title: 'AWGN Noise Simulation and Q-function Verification',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from scipy.special import erfc
from scipy.stats import norm

# ── Q-function implementations ────────────────────────────────
def Q(x):
    """Q-function: tail probability of standard normal"""
    return 0.5 * erfc(x / np.sqrt(2))

# Verify: Q(x) = P[Z > x] for Z ~ N(0,1)
x_vals = np.array([1, 2, 3, 4])
print("Q-function values:")
for x in x_vals:
    # Method 1: erfc formula
    q1 = Q(x)
    # Method 2: 1 - CDF
    q2 = 1 - norm.cdf(x)
    # Method 3: Monte Carlo
    samples = np.random.randn(1_000_000)
    q3 = np.mean(samples > x)
    print(f"  Q({x}) = {q1:.6f}  (CDF: {q2:.6f}, MC: {q3:.6f})")

# ── AWGN noise: verify Gaussian distribution ─────────────────
N_samples = 100_000
N0_over2 = 0.5    # one-sided noise PSD N₀/2 [W/Hz]
fs = 10_000       # 10 kHz sampling rate
noise_variance = N0_over2 * fs   # total noise power = N₀/2 × fs (Nyquist BW)
noise_std = np.sqrt(noise_variance)

noise = np.random.randn(N_samples) * noise_std

print(f"\nAWGN verification:")
print(f"  Expected std σ = {noise_std:.4f}")
print(f"  Measured  std  = {np.std(noise):.4f}")
print(f"  Expected mean  = 0.0000")
print(f"  Measured  mean = {np.mean(noise):.4f}")

# Fraction within ±σ, ±2σ, ±3σ
for k in [1, 2, 3]:
    frac = np.mean(np.abs(noise) < k * noise_std)
    theory = 1 - 2*Q(k)
    print(f"  |n| < {k}σ:  measured {frac:.4f}  theory {theory:.4f}")

# ── Effect of noise on BPSK signal ───────────────────────────
Rb = 1000; Tb = 1/Rb; fc = 3000
fs2 = 20_000; sps = int(Tb * fs2)
A = 1.0
t_bit = np.arange(sps) / fs2
carrier = np.cos(2*np.pi*fc*t_bit)
Eb = A**2 * Tb / 2

SNR_dB_vals = [0, 5, 10]
n_bits = 1000

fig, axes = plt.subplots(2, 3, figsize=(14, 8))

for col, snr_db in enumerate(SNR_dB_vals):
    Eb_N0 = 10**(snr_db/10)
    N0 = Eb / Eb_N0
    # Noise variance per sample: σ² = N₀/2 × fs
    sigma = np.sqrt(N0/2 * fs2)

    # Generate bits and received signal (5 bits for display)
    bits = np.array([1,0,1,0,1])
    s_tx = np.concatenate([((2*b-1) * A * carrier) for b in bits])
    noise_sig = sigma * np.random.randn(len(s_tx))
    r = s_tx + noise_sig

    # Correlator output distribution (1000 bits)
    bits_long = np.random.randint(0,2,n_bits)
    z_outputs = np.zeros(n_bits)
    for i,b in enumerate(bits_long):
        s_i = (2*b-1) * A * carrier
        n_i = sigma * np.random.randn(sps)
        r_i = s_i + n_i
        z_outputs[i] = np.sum(r_i * carrier) / fs2

    # Plot received waveform (top row)
    t_show = np.arange(5*sps) / fs2 * 1e3
    axes[0,col].plot(t_show, s_tx, 'b', lw=0.8, alpha=0.5, label='Transmitted')
    axes[0,col].plot(t_show, r,    'orange', lw=0.8, alpha=0.7, label='Received')
    axes[0,col].set_title(f'AWGN Channel: SNR = {snr_db} dB')
    axes[0,col].set_xlabel('Time (ms)'); axes[0,col].grid(True, alpha=0.3)
    if col == 0: axes[0,col].legend(fontsize=7)

    # Plot correlator output histogram (bottom row)
    axes[1,col].hist(z_outputs[bits_long==1], bins=40, alpha=0.6, color='blue',
                     density=True, label='bit "1" (z~N(+Eb,σ_z²))')
    axes[1,col].hist(z_outputs[bits_long==0], bins=40, alpha=0.6, color='red',
                     density=True, label='bit "0" (z~N(-Eb,σ_z²))')
    # Overlay Gaussian fits
    z_range = np.linspace(z_outputs.min(), z_outputs.max(), 200)
    sigma_z = np.std(z_outputs)
    axes[1,col].plot(z_range, norm.pdf(z_range,  Eb, sigma_z), 'b--', lw=1.5)
    axes[1,col].plot(z_range, norm.pdf(z_range, -Eb, sigma_z), 'r--', lw=1.5)
    axes[1,col].axvline(0, color='k', ls='--', lw=1.5, label='Decision threshold')
    axes[1,col].set_title(f'Correlator Output PDF  (BER≈{Q(np.sqrt(2*Eb_N0)):.1e})')
    axes[1,col].set_xlabel('Correlator output z'); axes[1,col].legend(fontsize=6)
    axes[1,col].grid(True, alpha=0.3)

plt.suptitle('AWGN Noise Effect on BPSK — Correlator Output Distributions')
plt.tight_layout(); plt.show()`,
    explanation: 'The correlator output for bit "1" is Gaussian with mean +Eb and variance σ_z² = N₀Eb/2. For bit "0", the mean is −Eb. At low SNR (0 dB), the two distributions heavily overlap — many errors. At high SNR (10 dB), they barely overlap — very few errors. The BER equals the area of each Gaussian that crosses the decision threshold at 0 — this is exactly Q(√(2Eb/N₀)).',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Probability theory converts physics into performance metrics.</strong>{' '}
        The noise is physical (thermal agitation of electrons). Probability converts it to a number engineers
        can design against: BER = Q(√(2Eb/N₀)). A target BER of 10⁻⁶ for a cellular link or 10⁻¹² for a
        fibre optic system directly specifies the required Eb/N₀, which drives the link budget (transmit power,
        antenna gain, cable loss).
      </p>
      <p>
        The Q-function is the "error budget" of digital communications. Every dB of Eb/N₀ improvement translates
        directly to orders of magnitude of BER improvement. Understanding the Gaussian noise model and Q-function
        is what separates signal processing engineers from those who just use black-box simulations.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing N₀ and N₀/2 — the AWGN PSD is N₀/2 (two-sided, for both positive and negative frequencies). The one-sided noise PSD is N₀. Noise power in bandwidth B Hz (one-sided) = N₀·B. The BER formula uses Eb/N₀ (one-sided N₀). Missing the factor of 2 causes 3 dB errors in noise calculations.',
    'Adding noise with wrong variance — to simulate AWGN with PSD N₀/2 at sample rate fs: noise variance = N₀/2 × fs (noise power = PSD × bandwidth = N₀/2 × fs). Python code: sigma = np.sqrt(N0/2 * fs); noise = sigma * np.random.randn(N). Using sigma = sqrt(N0) without the fs factor gives wrong SNR.',
    'Q(x) vs erfc(x) — Q(x) = erfc(x/√2)/2. These are related but not equal. BER = Q(√(2Eb/N₀)) = erfc(√(Eb/N₀))/2. Both are correct — just different expressions of the same thing. scipy.special.erfc is numerically more stable for very small probabilities (10⁻¹⁵ and below).',
    'Thermal noise temperature — N₀ = kT where k=1.38×10⁻²³ J/K and T is the system noise temperature (not necessarily room temperature). At T=290K: N₀ = kT = 4.0×10⁻²¹ W/Hz = −174 dBm/Hz. This is the noise floor of any receiver at room temperature.',
  ],

  summary: [
    'AWGN: r(t) = s(t) + n(t). White PSD N₀/2. Gaussian amplitude distribution.',
    'Gaussian X~N(μ,σ²): PDF = (1/σ√2π)exp(−(x−μ)²/2σ²). 68/95/99.7% within ±1/2/3σ.',
    'Q(x) = P[Z>x] for Z~N(0,1) = erfc(x/√2)/2. Rapidly decreasing with x.',
    'Noise power in bandwidth B: Pₙ = N₀·B (one-sided B, PSD = N₀/2).',
    'Correlator output for BPSK: N(+Eb, N₀Eb/2) for bit "1", N(−Eb, N₀Eb/2) for bit "0".',
    'Central Limit Theorem: thermal noise is Gaussian due to superposition of many independent sources.',
  ],

  practice: [
    {
      type: 'question',
      text: 'AWGN noise has N₀/2 = 10⁻⁶ W/Hz. The receiver has a bandpass filter of bandwidth 10 kHz (one-sided). Find the total noise power at the filter output in mW and dBm.',
      hint: 'Noise power = N₀/2 × 2B (two-sided bandwidth) = N₀ × B = 2×10⁻⁶ × 10×10³ = 2×10⁻² W = 20 mW. Wait — check units: N₀/2 = 10⁻⁶ W/Hz is the two-sided PSD. One-sided PSD = N₀ = 2×10⁻⁶ W/Hz. One-sided BW = 10 kHz. Power = N₀ × B = 2×10⁻⁶ × 10000 = 0.02 W = 20 mW. In dBm: 10log₁₀(20mW/1mW) = 10log₁₀(20) = 13 dBm. That\'s quite high — N₀/2=10⁻⁶ W/Hz corresponds to a very noisy system (room temp is ~10⁻²¹ W/Hz).',
    },
    {
      type: 'question',
      text: 'A Gaussian random variable has mean μ=3 and standard deviation σ=2. Find (a) P[X>5], (b) P[1<X<5], (c) P[X<−1].',
      hint: 'Standardise: Z = (X−3)/2. (a) P[X>5] = P[Z>(5−3)/2] = P[Z>1] = Q(1) = 0.1587. (b) P[1<X<5] = P[(1−3)/2 < Z < (5−3)/2] = P[−1<Z<1] = 1 − 2Q(1) = 1 − 2(0.1587) = 0.6827 ≈ 68.3%. (c) P[X<−1] = P[Z<(−1−3)/2] = P[Z<−2] = Q(2) = 0.0228 ≈ 2.3%.',
    },
    {
      type: 'question',
      text: 'A BPSK receiver uses a correlator. The noise at the correlator output has variance σ_z² = N₀·Eb/2. If Eb=10⁻³ J and N₀=10⁻⁴ W/Hz, find σ_z, the decision SNR, and BER.',
      hint: 'σ_z² = N₀·Eb/2 = 10⁻⁴ × 10⁻³/2 = 5×10⁻⁸. σ_z = √(5×10⁻⁸) = 2.24×10⁻⁴. Bit "1" mean = +Eb = 10⁻³. SNR = Eb/σ_z = 10⁻³/(2.24×10⁻⁴) = 4.47. But BER = Q(Eb/σ_z) = Q(√(2Eb/N₀)). Eb/N₀ = 10⁻³/10⁻⁴ = 10 (10 dB). BER = Q(√20) = Q(4.47) ≈ 3.9×10⁻⁶. Fewer than 4 errors per million bits.',
    },
    {
      type: 'task',
      text: 'In Python, generate 10⁶ samples of N(0,1) noise. Numerically verify Q(1), Q(2), Q(3) by counting samples above the threshold. Compare to scipy Q-function values. Plot a histogram with the theoretical Gaussian PDF overlay.',
      hint: 'z = np.random.randn(1_000_000). Q1_mc = np.mean(z > 1), Q2_mc = np.mean(z > 2), Q3_mc = np.mean(z > 3). Theory: from scipy.special import erfc; Q = lambda x: 0.5*erfc(x/np.sqrt(2)). Histogram: plt.hist(z, bins=100, density=True). Overlay: x=np.linspace(-4,4,200); plt.plot(x, norm.pdf(x), "r--"). Q(3) needs ~1M samples to get a reliable estimate (~1350 expected above 3σ).',
    },
  ],
}

export default function ProbabilityAndNoisePage() {
  return <FEDFTopicPage content={content} />
}
