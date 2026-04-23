'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Z-Transform',
  subtitle: 'Discrete-time signal analysis — Z-transform, region of convergence, poles & zeros, and inverse',
  co: 'CO4 — Z-Transform & FIR Filters',

  overview: (
    <>
      <p>
        The <strong className="text-white">Z-Transform</strong> is the discrete-time counterpart of the Laplace
        Transform (and via the unit circle, equivalent to the DTFT). For a discrete sequence x[n]:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        X(z) = Σₙ x[n]·z^(−n) &nbsp;&nbsp;&nbsp; z ∈ ℂ
      </p>
      <p>
        The <strong className="text-white">Region of Convergence (ROC)</strong> is the set of complex z values
        for which the series converges. Stability requires the ROC to include the unit circle |z| = 1.
        Causality requires the ROC to be outside a circle (|z| {'>'} r).
      </p>
      <p>
        The <strong className="text-white">poles and zeros</strong> of X(z) completely characterise the
        frequency response of a discrete LTI system. Poles close to the unit circle create peaks in the
        frequency response; zeros on or near the unit circle create notches. FIR filters have all poles at
        the origin (z = 0) — they are always stable.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Key Z-Transform Pairs</p>
        <div className="space-y-1 text-xs font-mono">
          {[
            { seq: 'δ[n]', z: '1', roc: 'all z' },
            { seq: 'u[n]', z: 'z/(z−1) = 1/(1−z⁻¹)', roc: '|z| > 1' },
            { seq: 'aⁿu[n]', z: 'z/(z−a) = 1/(1−az⁻¹)', roc: '|z| > |a|' },
            { seq: 'n·aⁿu[n]', z: 'az⁻¹/(1−az⁻¹)²', roc: '|z| > |a|' },
            { seq: 'cos(ω₀n)u[n]', z: '[1 − cos(ω₀)z⁻¹] / [1 − 2cos(ω₀)z⁻¹ + z⁻²]', roc: '|z| > 1' },
          ].map(({ seq, z, roc }) => (
            <div key={seq} className="grid grid-cols-7 gap-1 items-center border-b border-slate-700/50 pb-1">
              <span className="col-span-2 text-blue-300">{seq}</span>
              <span className="text-amber-400 text-center">⟷</span>
              <span className="col-span-3 text-green-300">{z}</span>
              <span className="text-gray-500 text-[10px]">{roc}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Z-Transform Properties</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-gray-300">
          <p><span className="text-cyan-400">Linearity:</span> ax[n]+by[n] ↔ aX+bY</p>
          <p><span className="text-cyan-400">Time shift:</span> x[n−k] ↔ z⁻ᵏX(z)</p>
          <p><span className="text-cyan-400">Convolution:</span> x[n]*h[n] ↔ X(z)·H(z)</p>
          <p><span className="text-cyan-400">Initial value:</span> x[0] = lim(z→∞) X(z)</p>
          <p><span className="text-cyan-400">Scaling:</span> aⁿx[n] ↔ X(z/a)</p>
          <p><span className="text-cyan-400">DTFT link:</span> X(e^(jω)) = X(z)|_{'{'}z=e^(jω){'}'}</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Z-Transform definition', definition: 'X(z) = Σₙ₌₋∞^∞ x[n]z^(−n). The bilateral Z-transform. For causal sequences (x[n]=0 for n<0): X(z) = Σₙ₌₀^∞ x[n]z^(−n) (unilateral). z is a complex variable. On the unit circle z=e^(jω), the Z-transform becomes the DTFT X(e^(jω)).' },
    { term: 'Region of Convergence (ROC)', definition: 'The set of z values for which |X(z)| < ∞. For right-sided sequences: ROC is |z| > r₁ (outside a circle). For left-sided: |z| < r₂. For finite-length sequences: everywhere except z=0 or z=∞. The ROC determines whether the system is causal, anti-causal, or two-sided.' },
    { term: 'Poles and zeros', definition: 'X(z) = B(z)/A(z). Zeros: values where X(z)=0 (roots of B(z)). Poles: values where X(z)=∞ (roots of A(z)). The pole-zero plot on the complex z-plane visualises the frequency response. Poles INSIDE unit circle → stable causal system.' },
    { term: 'System function H(z)', definition: 'For an LTI system: H(z) = Y(z)/X(z) = Z{h[n]}. The transfer function in z-domain. Applying to difference equation: y[n] + Σaₖy[n−k] = Σbₖx[n−k] → H(z) = Σbₖz^(−k) / (1 + Σaₖz^(−k)). FIR: denominator = 1. IIR: non-trivial denominator.' },
    { term: 'Stability condition', definition: 'A causal LTI system is BIBO stable iff all poles lie strictly inside the unit circle (|pₖ| < 1). If any pole is on or outside the unit circle, the system is unstable. The ROC must include the unit circle for the DTFT (frequency response) to exist.' },
    { term: 'Inverse Z-transform', definition: 'x[n] = (1/2πj)∮ X(z)z^(n−1)dz. Practical methods: (1) Partial fraction expansion — expand X(z)/z in partial fractions, then look up table pairs. (2) Long division — for polynomial X(z), divide to get coefficients directly. (3) Power series expansion.' },
    { term: 'DTFT from Z-transform', definition: 'DTFT: X(e^(jω)) = X(z)|_{z=e^(jω)} = Σx[n]e^(−jωn). This is the Z-transform evaluated on the unit circle. Valid only if the unit circle is inside the ROC. The frequency response of a digital filter H(e^(jω)) is H(z) evaluated on the unit circle.' },
  ],

  code: {
    title: 'Z-Transform Analysis — Poles, Zeros, and Frequency Response',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from numpy.fft import fft, fftshift, fftfreq

# ── Example: Moving average filter (FIR, N=4) ─────────────────
# y[n] = (x[n] + x[n-1] + x[n-2] + x[n-3]) / 4
# H(z) = (1 + z⁻¹ + z⁻² + z⁻³) / 4 = (z⁴ - 1) / (4z³(z - 1))

N = 4   # filter length
h_ma = np.ones(N) / N   # impulse response: [0.25, 0.25, 0.25, 0.25]
b_ma = h_ma              # numerator coefficients
a_ma = [1.0]             # denominator = 1 (FIR)

# ── Example: First-order IIR (leaky integrator) ──────────────
# y[n] = α·y[n-1] + (1-α)·x[n]  (leaky integrator / lowpass)
# H(z) = (1-α) / (1 - α·z⁻¹) = (1-α)·z / (z - α)
alpha = 0.85
b_iir = [1 - alpha]         # numerator
a_iir = [1, -alpha]         # denominator: 1 - α·z⁻¹

# ── Frequency response (evaluate H(z) on unit circle) ────────
N_fft = 1024
# For FIR: just take FFT of h[n] zero-padded
H_ma = fft(b_ma, n=N_fft)
omega = np.linspace(0, 2*np.pi, N_fft, endpoint=False)
f_norm = omega / (2*np.pi)   # normalised frequency [0, 1)

# For IIR: use scipy.signal.freqz
from scipy.signal import freqz, tf2zpk
w_ma, H_ma_fz = freqz(b_ma, a_ma, worN=N_fft)
w_iir, H_iir  = freqz(b_iir, a_iir, worN=N_fft)

# ── Poles and Zeros ───────────────────────────────────────────
z_ma, p_ma, k_ma = tf2zpk(b_ma, a_ma)
z_iir, p_iir, k_iir = tf2zpk(b_iir, a_iir)

print("=== Moving Average Filter (FIR N=4) ===")
print(f"Zeros: {z_ma}")
print(f"Poles: {p_ma}  (all at origin → always stable)")
print(f"h[n] = {b_ma}")

print("\n=== IIR Leaky Integrator (α=0.85) ===")
print(f"Zeros: {z_iir}")
print(f"Poles: {p_iir}  (|p| = {abs(p_iir[0]):.2f} < 1 → stable)")
print(f"DC gain: |H(e^j0)| = {abs(H_iir[0]):.4f}")

# ── Verify Z-transform inverse for IIR ───────────────────────
# Impulse response via difference equation
n_samples = 20
x = np.zeros(n_samples); x[0] = 1.0   # unit impulse input
y_iir = np.zeros(n_samples)
for n in range(n_samples):
    y_iir[n] = (1-alpha)*x[n] + (alpha*y_iir[n-1] if n>0 else 0)

# Theoretical: h[n] = (1-α)·αⁿ·u[n]  (inverse Z-transform)
n_vec = np.arange(n_samples)
h_iir_theory = (1-alpha) * alpha**n_vec
print(f"\nMax error (simulation vs theory): {np.max(np.abs(y_iir - h_iir_theory)):.2e}")

# ── Plot ──────────────────────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(14, 8))

# Pole-zero plots
for ax, z_pts, p_pts, title in [
    (axes[0,0], z_ma, p_ma, 'MA Filter Pole-Zero'),
    (axes[1,0], z_iir, p_iir, 'IIR Integrator Pole-Zero'),
]:
    unit_circle = Circle((0,0), 1, fill=False, color='gray', ls='--', lw=0.8)
    ax.add_patch(unit_circle)
    ax.scatter(z_pts.real, z_pts.imag, marker='o', s=100, facecolors='none', edgecolors='blue', lw=2, label='Zeros')
    ax.scatter(p_pts.real, p_pts.imag, marker='x', s=100, c='red', lw=2, label='Poles')
    ax.axhline(0, color='k', lw=0.5); ax.axvline(0, color='k', lw=0.5)
    ax.set_xlim(-1.5, 1.5); ax.set_ylim(-1.5, 1.5)
    ax.set_aspect('equal'); ax.set_title(title)
    ax.legend(fontsize=7); ax.grid(True, alpha=0.3)

# Frequency responses
axes[0,1].plot(w_ma/np.pi, 20*np.log10(np.abs(H_ma_fz)+1e-12), 'b')
axes[0,1].set_title('MA Filter |H(e^jω)| (dB)')
axes[0,1].set_xlabel('Normalised frequency (×π rad/sample)')
axes[0,1].set_ylabel('Magnitude (dB)'); axes[0,1].grid(True, alpha=0.3)

axes[1,1].plot(w_iir/np.pi, 20*np.log10(np.abs(H_iir)+1e-12), 'r')
axes[1,1].set_title('IIR Integrator |H(e^jω)| (dB)')
axes[1,1].set_xlabel('Normalised frequency (×π rad/sample)')
axes[1,1].set_ylabel('Magnitude (dB)'); axes[1,1].grid(True, alpha=0.3)

# Impulse responses
axes[0,2].stem(np.arange(N), b_ma, basefmt=' ')
axes[0,2].set_title('MA Filter Impulse Response h[n]')
axes[0,2].set_xlabel('n (samples)'); axes[0,2].set_ylabel('h[n]')
axes[0,2].grid(True, alpha=0.3)

axes[1,2].stem(n_vec, y_iir, basefmt=' ', markerfmt='bo', linefmt='b-', label='Computed')
axes[1,2].plot(n_vec, h_iir_theory, 'r--', lw=1.5, label='Theory: (1−α)αⁿ')
axes[1,2].set_title('IIR Impulse Response h[n] = (1−α)αⁿ')
axes[1,2].set_xlabel('n'); axes[1,2].legend(fontsize=8); axes[1,2].grid(True, alpha=0.3)

plt.suptitle('Z-Transform: Pole-Zero Analysis and Frequency Response')
plt.tight_layout(); plt.show()`,
    explanation: 'The pole-zero plot reveals everything about a filter\'s frequency response. The MA filter has zeros equally spaced on the unit circle at ω = 2πk/N — these create notches at those frequencies. The IIR integrator has a pole at z=α inside the unit circle — close to z=1 (DC), creating a lowpass response. The impulse response of the IIR filter is (1−α)αⁿ — a decaying geometric sequence matching the inverse Z-transform.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">The Z-transform is the design tool for all digital filters.</strong>{' '}
        When a matched filter must be implemented digitally (DSP chip, FPGA, software-defined radio), the
        continuous-time h(t) is discretised and the resulting difference equation is analysed via Z-transform.
        The poles and zeros determine whether the discrete filter is stable and what its frequency response looks like.
      </p>
      <p>
        Every smartphone, smart speaker, and software radio uses Z-transform-based filter design. The FIR filters
        in audio processing, the IIR filters in equalizers, the correlators in GPS receivers — all are specified,
        analysed, and implemented using Z-transform theory. The connection to the DTFT via the unit circle makes
        frequency-domain design intuitive.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing Z-transform with DTFT — the DTFT is X(e^(jω)), evaluated on the unit circle only. The Z-transform X(z) is defined over the entire complex plane (within the ROC). The DTFT exists only if the unit circle is in the ROC (i.e., the system is stable).',
    'Forgetting the ROC — two different sequences can have the same algebraic expression for X(z) but different ROCs. E.g., aⁿu[n] and −aⁿu[−n−1] both have Z-transform z/(z−a), but different ROCs (|z|>|a| vs |z|<|a|). The ROC determines which sequence corresponds to X(z).',
    'Stability: poles inside unit circle needed for causal systems — if a causal system has any pole with |p| ≥ 1, it is unstable (bounded input → unbounded output). For anti-causal systems, poles must be OUTSIDE the unit circle. Never confuse the two.',
    'Using z⁻¹ vs positive powers — in the delay convention, z⁻¹ represents a one-sample delay. H(z) = 1 + z⁻¹ + z⁻² means "sum current and 2 previous samples." Don\'t accidentally write H(z) = 1 + z + z² (that\'s a different, non-causal filter).',
  ],

  summary: [
    'Z-transform: X(z) = Σx[n]z^(−n). Discrete counterpart of Laplace transform.',
    'ROC determines causality and stability. Unit circle in ROC → stable (DTFT exists).',
    'Causal stable systems: all poles inside unit circle |z| < 1.',
    'System function: H(z) = Y(z)/X(z). FIR: finite impulse response, all poles at origin.',
    'Frequency response: H(e^(jω)) = H(z)|_{z=e^(jω)}. Evaluate H(z) on unit circle.',
    'Convolution in time ↔ multiplication in Z-domain: Y(z) = H(z)·X(z).',
  ],

  practice: [
    {
      type: 'question',
      text: 'Find the Z-transform of x[n] = (0.5)ⁿu[n] − (0.8)ⁿu[n]. Find the ROC and poles/zeros.',
      hint: 'Z{(0.5)ⁿu[n]} = z/(z−0.5), ROC |z|>0.5. Z{(0.8)ⁿu[n]} = z/(z−0.8), ROC |z|>0.8. X(z) = z/(z−0.5) − z/(z−0.8) = z[(z−0.8)−(z−0.5)] / [(z−0.5)(z−0.8)] = z(−0.3) / [(z−0.5)(z−0.8)] = −0.3z / [(z−0.5)(z−0.8)]. ROC: intersection = |z|>0.8. Zeros: z=0. Poles: z=0.5, z=0.8. Both inside unit circle → stable.',
    },
    {
      type: 'question',
      text: 'A causal IIR filter has H(z) = 1/(1 − 0.9z⁻¹). (a) Find the impulse response h[n]. (b) Is it stable? (c) Find |H(e^(jω))| at ω=0 and ω=π.',
      hint: '(a) H(z) = z/(z−0.9) ↔ h[n] = (0.9)ⁿu[n]. The impulse response is a decaying geometric sequence. (b) Stable — pole at z=0.9, |0.9|<1, inside unit circle. (c) At ω=0: z=e^(j0)=1. H(1) = 1/(1−0.9) = 10 (gain=10 at DC). At ω=π: z=e^(jπ)=−1. H(−1) = 1/(1−0.9×(−1)) = 1/(1+0.9) = 1/1.9 ≈ 0.526. Ratio 10/0.526 ≈ 19 — strong lowpass characteristic.',
    },
    {
      type: 'question',
      text: 'The difference equation y[n] = 0.5y[n−1] + x[n] + 0.5x[n−1]. Find H(z), poles, zeros, and ROC.',
      hint: 'Take Z-transform both sides: Y(z) = 0.5z⁻¹Y(z) + X(z) + 0.5z⁻¹X(z). Collect: Y(z)[1 − 0.5z⁻¹] = X(z)[1 + 0.5z⁻¹]. H(z) = Y(z)/X(z) = (1 + 0.5z⁻¹)/(1 − 0.5z⁻¹) = (z + 0.5)/(z − 0.5). Zero at z = −0.5 (on negative real axis). Pole at z = 0.5 (inside unit circle → stable). ROC: |z|>0.5 (causal). At DC (z=1): H(1) = 1.5/0.5 = 3. At ω=π (z=−1): H(−1) = −0.5/(−1.5) = 1/3. This is a highpass-ish all-pass-ish filter.',
    },
    {
      type: 'task',
      text: 'In Python, use scipy.signal to design a 3-tap moving average FIR filter. Plot its (a) pole-zero diagram, (b) frequency response |H(e^jω)| in dB, (c) impulse response. Verify that all poles are at z=0.',
      hint: 'b = np.ones(3)/3; a = [1.0]. from scipy.signal import freqz, tf2zpk. zeros, poles, gain = tf2zpk(b, a). print(poles) → all zeros (at origin). freqz(b, a, worN=512) → frequency response. Plot: stem(n, b) for impulse response; zplane with unit_circle patch. |H|_max at ω=0 (DC), |H|_min at ω=2π/3 (first null of 3-tap MA). Nulls at ω = 2πk/N for k=1,2 → k=1: ω=2π/3 (0.667π); k=2: ω=4π/3 (outside [0,π], maps to 2π/3 by symmetry).',
    },
  ],
}

export default function ZTransformPage() {
  return <FEDFTopicPage content={content} />
}
