'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Fourier Series',
  subtitle: 'Decomposing periodic signals into sinusoids — coefficients, line spectrum, power distribution',
  co: 'CO2 — Fourier Analysis',

  overview: (
    <>
      <p>
        The <strong className="text-white">Fourier Series</strong> states that any periodic signal x(t) with
        period T can be expressed as an infinite sum of harmonically related sinusoids:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        x(t) = a₀ + Σₙ [aₙ·cos(2πnf₀t) + bₙ·sin(2πnf₀t)]
      </p>
      <p>
        where f₀ = 1/T is the <strong className="text-white">fundamental frequency</strong> and n = 1, 2, 3, …
        are harmonics. The coefficients aₙ, bₙ quantify how much of each harmonic is present.
        In complex exponential form (more compact): x(t) = Σₙ cₙ·e<sup>j2πnf₀t</sup>
        where cₙ = (1/T)∫₀ᵀ x(t)·e<sup>−j2πnf₀t</sup> dt.
      </p>
      <p>
        The <strong className="text-white">line spectrum</strong> plots |cₙ| vs frequency — it shows the
        amplitude of each harmonic as a vertical line at multiples of f₀. Symmetric for real signals:
        |c₋ₙ| = |cₙ|. The DC component c₀ = a₀ = average value of x(t).
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Fourier Coefficient Formulas</p>
        <div className="grid grid-cols-1 gap-2 text-xs font-mono text-gray-300">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-1">Trigonometric form</p>
            <p>a₀ = (1/T)∫₀ᵀ x(t) dt &nbsp;&nbsp;&nbsp; (DC / average)</p>
            <p>aₙ = (2/T)∫₀ᵀ x(t)·cos(2πnf₀t) dt</p>
            <p>bₙ = (2/T)∫₀ᵀ x(t)·sin(2πnf₀t) dt</p>
          </div>
          <div className="bg-violet-500/10 border border-violet-500/30 rounded p-3">
            <p className="text-violet-300 font-bold mb-1">Complex exponential form (compact)</p>
            <p>cₙ = (1/T)∫₀ᵀ x(t)·e^(−j2πnf₀t) dt</p>
            <p>Relation: c₀ = a₀, cₙ = (aₙ − jbₙ)/2, c₋ₙ = cₙ*</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Square Wave Fourier Series (duty cycle 50%)</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p>x(t) = (4/π)[sin(2πf₀t) + (1/3)sin(6πf₀t) + (1/5)sin(10πf₀t) + …]</p>
          <p className="text-gray-400 text-[10px]">Only odd harmonics. Amplitude ∝ 1/n. Infinite sum → perfect square wave.</p>
          <p className="text-cyan-300 mt-1">Gibbs phenomenon: ~9% overshoot near discontinuities — never disappears.</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Fundamental frequency f₀', definition: 'f₀ = 1/T where T is the period. The lowest frequency component. All other harmonics are integer multiples: 2f₀, 3f₀, … Determines the spacing of lines in the spectrum.' },
    { term: 'DC coefficient a₀ (c₀)', definition: 'a₀ = (1/T)∫₀ᵀ x(t)dt — the average value of the signal over one period. The "DC offset". A symmetric signal (equal positive and negative areas) has a₀ = 0.' },
    { term: 'Harmonics', definition: 'The nth harmonic has frequency n·f₀. n=1 is the fundamental; n=2 is second harmonic; etc. A square wave contains only odd harmonics (n=1,3,5,…). A full-wave rectified sine contains only even harmonics.' },
    { term: 'Line spectrum', definition: 'A plot of |cₙ| (amplitude spectrum) vs frequency n·f₀. Each harmonic appears as a vertical line. The spectrum is discrete (countably many lines) for periodic signals — contrasts with the continuous spectrum of aperiodic signals.' },
    { term: 'Symmetry shortcuts', definition: 'Even symmetry [x(t)=x(−t)]: only cosines survive (bₙ=0). Odd symmetry [x(t)=−x(−t)]: only sines survive (aₙ=0, a₀=0). Half-wave symmetry [x(t+T/2)=−x(t)]: only odd harmonics (n=1,3,5,…) have non-zero coefficients.' },
    { term: 'Parseval\'s theorem (periodic)', definition: 'Average power P = (1/T)∫|x(t)|²dt = Σₙ |cₙ|² = a₀² + (1/2)Σₙ≥1(aₙ²+bₙ²). Total signal power equals the sum of powers in all harmonics. Used to verify coefficient calculations.' },
    { term: 'Gibbs phenomenon', definition: 'Near a jump discontinuity, the partial Fourier sum overshoots by ~9% of the jump, regardless of how many terms are included. It doesn\'t disappear with more terms — it just becomes narrower. A fundamental limitation of Fourier Series for discontinuous signals.' },
  ],

  code: {
    title: 'Fourier Series Computation and Spectrum Plot',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt

# ── Square wave definition ────────────────────────────────────
f0   = 100      # fundamental frequency (100 Hz)
T    = 1/f0     # period
A    = 1.0      # amplitude

# Time vector (3 periods, high resolution)
t = np.linspace(0, 3*T, 6000, endpoint=False)
x = A * np.sign(np.sin(2*np.pi*f0*t))   # square wave ±1

# ── Compute Fourier coefficients numerically ─────────────────
N_harmonics = 10   # compute up to 10th harmonic
dt = t[1] - t[0]

# One period only for integration
t_period = np.linspace(0, T, 2000, endpoint=False)
x_period = A * np.sign(np.sin(2*np.pi*f0*t_period))

harmonics = np.arange(-N_harmonics, N_harmonics+1)
c_n = {}
for n in harmonics:
    integrand = x_period * np.exp(-1j * 2*np.pi*n*f0*t_period)
    c_n[n] = np.trapz(integrand, t_period) / T

print("Complex Fourier coefficients (first few odd harmonics):")
for n in [0, 1, 3, 5, 7, 9]:
    print(f"  c_{n:2d} = {c_n[n].real:+.5f} {c_n[n].imag:+.5f}j   |c| = {abs(c_n[n]):.5f}")

# Theoretical: c_n = 2A/(jnπ) for odd n, 0 for even n
print("\nTheoretical values (|c_n| = 2A/(nπ) for odd n):")
for n in [1, 3, 5, 7, 9]:
    print(f"  |c_{n}| = {2*A/(n*np.pi):.5f}")

# ── Reconstruct signal from partial series ───────────────────
N_terms_list = [1, 3, 7, 21]
reconstructions = {}
for N in N_terms_list:
    x_recon = np.zeros_like(t)
    for n in range(-N, N+1):
        x_recon += c_n.get(n, 0) * np.exp(1j * 2*np.pi*n*f0*t)
    reconstructions[N] = x_recon.real

# ── Plot ──────────────────────────────────────────────────────
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

for ax, N in zip(axes.flat, N_terms_list):
    ax.plot(t*1e3, x, 'gray', alpha=0.4, lw=1, label='Original')
    ax.plot(t*1e3, reconstructions[N], 'b', lw=1.5, label=f'{2*N+1} terms')
    ax.set_title(f'Fourier Series: N={N} harmonics')
    ax.set_xlabel('Time (ms)'); ax.set_ylabel('Amplitude')
    ax.legend(fontsize=8); ax.grid(True, alpha=0.3)
    ax.set_ylim(-1.4, 1.4)

plt.suptitle('Square Wave Fourier Series Reconstruction (Gibbs Phenomenon)')
plt.tight_layout(); plt.show()

# ── Line spectrum ─────────────────────────────────────────────
freqs = harmonics * f0
amplitudes = [abs(c_n[n]) for n in harmonics]

plt.figure(figsize=(10, 4))
plt.stem(freqs, amplitudes, basefmt=' ', markerfmt='bo', linefmt='b-')
plt.xlabel('Frequency (Hz)'); plt.ylabel('|cₙ|')
plt.title('Two-sided Amplitude Spectrum of Square Wave')
plt.grid(True, alpha=0.3); plt.show()`,
    explanation: 'The complex Fourier coefficients cₙ are computed by numerical integration over one period. For a square wave, only odd harmonics survive (even cₙ ≈ 0). The Gibbs overshoot (~9%) is visible near discontinuities and remains even with 21 harmonics — it just narrows. The line spectrum shows amplitude decreasing as 1/n for odd harmonics.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Fourier Series is the foundation for understanding signal bandwidth.</strong>{' '}
        A square wave BPSK signal has harmonics at f₀, 3f₀, 5f₀, … extending to infinity. Passing this through
        a bandlimited channel (e.g., telephone line cut off at 3.4 kHz) truncates high harmonics, causing the
        received waveform to look like the N=3 or N=7 reconstruction above — distorted edges. This is
        inter-symbol interference (ISI), the central challenge of digital communications.
      </p>
      <p>
        Parseval's theorem connects the time-domain signal to its spectrum: total power equals sum of harmonic
        powers. This lets engineers compute what fraction of signal power lies within a given bandwidth — essential
        for choosing filter cutoff frequencies and understanding spectral efficiency.
      </p>
    </>
  ),

  commonMistakes: [
    'Using the wrong factor in coefficient formulas — aₙ uses (2/T) but a₀ uses (1/T). The factor-of-2 difference exists because cosines and sines pair up for n and −n, but the DC term is unpaired.',
    'Assuming all harmonics are present — symmetry properties eliminate many. Even symmetry → no bₙ. Odd symmetry → no aₙ, no a₀. Half-wave symmetry → no even harmonics. Check symmetry first.',
    'Confusing the period used for integration — you can integrate over any full period [t₁, t₁+T], not just [0, T]. But the period T in the denominator must match the integration interval.',
    'Expecting Fourier Series to converge to the value at a discontinuity — at a jump discontinuity at t₀, the Fourier Series converges to the average: [x(t₀⁺) + x(t₀⁻)]/2, not to either side value.',
  ],

  summary: [
    'Fourier Series: x(t) = Σₙ cₙ·e^(j2πnf₀t) where cₙ = (1/T)∫₀ᵀ x(t)e^(−j2πnf₀t)dt.',
    'DC component c₀ = average value. Harmonics at n·f₀ for n=±1,±2,…',
    'Line spectrum: |cₙ| vs frequency. Discrete lines at multiples of f₀.',
    'Square wave: only odd harmonics, amplitudes ∝ 1/n. |cₙ| = 2A/(nπ) for odd n.',
    'Parseval\'s theorem: P = Σ|cₙ|² — power equals sum of squared harmonic amplitudes.',
    'Gibbs phenomenon: ~9% overshoot near discontinuities, regardless of number of terms.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A periodic signal x(t) = 2 + 3·cos(2π·100t) + cos(2π·300t) (period T=10ms). Find a₀, a₁, a₃, and the DC power, fundamental power, and third harmonic power. Verify Parseval\'s theorem.',
      hint: 'This is already in Fourier Series form (inspection). a₀ = 2 (DC). a₁ = 3 (100Hz), b₁ = 0. a₃ = 1 (300Hz), b₃ = 0. Note: 300Hz = 3×100Hz = 3rd harmonic. DC power = a₀² = 4. Fundamental power = a₁²/2 = 9/2 = 4.5. 3rd harmonic power = a₃²/2 = 0.5. Total = 4+4.5+0.5 = 9 W. Parseval: P = (1/T)∫x²(t)dt — compute numerically to verify = 9.',
    },
    {
      type: 'question',
      text: 'A square wave has amplitude ±V₀, period T, 50% duty cycle. Derive the Fourier coefficients bₙ.',
      hint: 'Odd symmetry (a₀=aₙ=0). bₙ = (2/T)∫₀ᵀ x(t)sin(2πnf₀t)dt = (2/T)[∫₀^(T/2) V₀·sin(nωt)dt + ∫_(T/2)^T (−V₀)·sin(nωt)dt]. = (2V₀/T)·[−cos(nωt)/(nω)]₀^(T/2) − (2V₀/T)·[−cos(nωt)/(nω)]_(T/2)^T. For odd n: bₙ = 4V₀/(nπ). For even n: bₙ = 0. So x(t) = (4V₀/π)[sin(ωt) + (1/3)sin(3ωt) + (1/5)sin(5ωt) + …]',
    },
    {
      type: 'question',
      text: 'Why does a square wave have a line spectrum that extends to infinity? What does this imply for digital communication channels?',
      hint: 'A square wave has ideal vertical edges (instantaneous transitions). Creating such a transition requires infinitely many harmonics — the higher harmonics shape the sharp edges. Any bandlimited channel (finite bandwidth) will cut off high harmonics, rounding the transitions. This causes inter-symbol interference (ISI): bits bleed into adjacent bit periods. The solution is pulse shaping — replace the ideal square pulse with a bandlimited pulse (e.g., raised cosine) that fits within the channel bandwidth.',
    },
    {
      type: 'task',
      text: 'In Python, compute and plot the first 5 non-zero Fourier coefficients for a triangular wave (amplitude ±1, period T=1s). Verify using Parseval\'s theorem that the sum of |cₙ|² equals the average power.',
      hint: 'Triangular wave: x(t) = (4A/π²)Σ (−1)^((n−1)/2)/n² · sin(2πnf₀t) for odd n. Coefficients |cₙ| = 2A/(n²π²/2) for odd n, 0 for even. Average power P = A²/3 (triangular wave). np.trapz for numerical integration. Sum |c_n|^2 for n=-N to N should ≈ A²/3 as N→∞.',
    },
  ],
}

export default function FourierSeriesPage() {
  return <FEDFTopicPage content={content} />
}
