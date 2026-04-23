'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Sinusoids & Phasors',
  subtitle: 'The mathematics of sinusoidal signals — parameters, superposition, and phasor representation',
  co: 'CO1 — Signal Representation',

  overview: (
    <>
      <p>
        A <strong className="text-white">sinusoid</strong> is the fundamental building block of communication
        systems. Every periodic signal can be decomposed into sinusoids (Fourier). A sinusoid is fully described
        by three parameters: <strong className="text-white">amplitude A</strong> (peak value),{' '}
        <strong className="text-white">frequency f</strong> (cycles per second, Hz), and{' '}
        <strong className="text-white">phase φ</strong> (time shift relative to a reference):
      </p>
      <p className="font-mono text-center text-white text-lg py-2">
        x(t) = A·cos(2πft + φ)
      </p>
      <p>
        <strong className="text-white">Phasors</strong> use Euler's formula to represent sinusoids as rotating
        complex vectors, making analysis of sinusoidal circuits and systems algebraic instead of differential.
        Euler's formula: e<sup>jθ</sup> = cos θ + j·sin θ. A sinusoid is the real part of a rotating phasor:
        A·cos(2πft + φ) = Re[A·e<sup>j(2πft+φ)</sup>].
      </p>
      <p>
        <strong className="text-white">Superposition</strong> of two sinusoids at the same frequency with different
        amplitudes and phases produces a sinusoid at the same frequency — just with a new amplitude and phase.
        This is most easily computed by adding their phasors (complex addition).
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Sinusoid Parameters</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          {[
            { param: 'Amplitude A', unit: 'Volts (V)', desc: 'Peak value. Sets signal strength. RMS = A/√2 for sinusoid.', color: 'blue' },
            { param: 'Frequency f', unit: 'Hertz (Hz)', desc: 'Cycles per second. Angular frequency ω = 2πf rad/s. Period T = 1/f.', color: 'violet' },
            { param: 'Phase φ', unit: 'Radians (rad)', desc: 'Time offset relative to t=0. Positive φ → signal leads. Negative φ → lags.', color: 'amber' },
          ].map(({ param, unit, desc, color }) => (
            <div key={param} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-3`}>
              <p className={`text-${color}-300 font-bold`}>{param}</p>
              <p className={`text-${color}-400 text-[10px] mb-1`}>{unit}</p>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-cyan-400 font-semibold mb-2">Euler's Formula — The Bridge to Phasors</p>
        <div className="space-y-1 font-mono text-gray-300 text-center">
          <p className="text-white text-sm">e<sup>jθ</sup> = cos θ + j·sin θ</p>
          <p className="text-gray-400">cos θ = Re[e<sup>jθ</sup>]   &nbsp;|&nbsp;   sin θ = Im[e<sup>jθ</sup>]</p>
          <p className="text-amber-300 mt-1">A·cos(2πft + φ) = Re[ A·e<sup>jφ</sup> · e<sup>j2πft</sup> ]</p>
          <p className="text-gray-500">Phasor X = A·e<sup>jφ</sup> = A∠φ (drop the rotating factor e<sup>j2πft</sup>)</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Sinusoid x(t) = A·cos(2πft+φ)', definition: 'The fundamental signal form. A = amplitude (peak value), f = frequency in Hz, ω = 2πf in rad/s, φ = initial phase in radians, T = 1/f = period in seconds.' },
    { term: 'Angular frequency ω', definition: 'ω = 2πf (rad/s). Converts frequency in Hz to radians per second. Used in phasor and Fourier analysis. The sinusoid becomes A·cos(ωt + φ).' },
    { term: 'Euler\'s formula', definition: 'e^(jθ) = cos θ + j·sin θ. Connects exponential functions to trigonometry. Cosine is the real part; sine is the imaginary part. Foundation of phasor analysis.' },
    { term: 'Phasor', definition: 'A complex number representing a sinusoid: X = A∠φ = A·e^(jφ) = A·cos φ + jA·sin φ. The actual signal is Re[X·e^(j2πft)]. Phasors turn differential equations into algebraic ones.' },
    { term: 'Superposition', definition: 'Sum of sinusoids at the same frequency is a sinusoid at that frequency. Add phasors: X₁ + X₂ = (A₁cosφ₁ + A₂cosφ₂) + j(A₁sinφ₁ + A₂sinφ₂). Result magnitude and angle give new A and φ.' },
    { term: 'Phase lead/lag', definition: 'If x₁(t) = A·cos(ωt + π/4) and x₂(t) = A·cos(ωt), then x₁ leads x₂ by π/4 radians. x₁ reaches its peak earlier in time by T/8 seconds.' },
    { term: 'RMS (root mean square)', definition: 'For x(t) = A·cos(ωt+φ): X_rms = A/√2 ≈ 0.707A. Power = X_rms²/R. The RMS value is the DC equivalent that delivers the same power. Mains voltage "230V" is RMS, not peak.' },
  ],

  code: {
    title: 'Sinusoid Analysis and Phasor Superposition in Python',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt

# ── Define sinusoid parameters ────────────────────────────────
A1, f1, phi1 = 2.0, 100, np.pi/4   # x1(t) = 2·cos(2π·100·t + π/4)
A2, f2, phi2 = 1.5, 100, -np.pi/6  # x2(t) = 1.5·cos(2π·100·t − π/6)

t = np.linspace(0, 2/f1, 1000)     # two full periods

x1 = A1 * np.cos(2*np.pi*f1*t + phi1)
x2 = A2 * np.cos(2*np.pi*f2*t + phi2)
x_sum = x1 + x2

# ── Phasor addition (complex arithmetic) ─────────────────────
X1 = A1 * np.exp(1j * phi1)    # phasor X1 = A1·e^(jφ1)
X2 = A2 * np.exp(1j * phi2)    # phasor X2 = A2·e^(jφ2)
X_sum = X1 + X2                # complex addition

A_sum   = abs(X_sum)           # magnitude of resultant
phi_sum = np.angle(X_sum)      # phase of resultant

print(f"X1 = {X1:.4f} → |X1| = {abs(X1):.3f}, ∠X1 = {np.degrees(phi1):.1f}°")
print(f"X2 = {X2:.4f} → |X2| = {abs(X2):.3f}, ∠X2 = {np.degrees(phi2):.1f}°")
print(f"X_sum = {X_sum:.4f}")
print(f"Resultant: A = {A_sum:.4f}, φ = {np.degrees(phi_sum):.2f}°")

# Verify: direct sum matches phasor result
x_phasor = A_sum * np.cos(2*np.pi*f1*t + phi_sum)
print(f"Max error (phasor vs direct): {np.max(np.abs(x_sum - x_phasor)):.2e}")

# ── Plot ──────────────────────────────────────────────────────
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6))

ax1.plot(t*1e3, x1, label=f'x₁(t): {A1}·cos(2π·{f1}t + {np.degrees(phi1):.0f}°)', lw=1.5)
ax1.plot(t*1e3, x2, label=f'x₂(t): {A2}·cos(2π·{f2}t + {np.degrees(phi2):.0f}°)', lw=1.5)
ax1.plot(t*1e3, x_sum, 'k--', label=f'x₁+x₂ = {A_sum:.2f}·cos(2π·{f1}t + {np.degrees(phi_sum):.1f}°)', lw=2)
ax1.set_xlabel('Time (ms)'); ax1.set_ylabel('Amplitude')
ax1.set_title('Sinusoid Superposition'); ax1.legend(); ax1.grid(True, alpha=0.3)

# Phasor diagram
ax2 = plt.subplot(122, projection='polar')  # would need proper setup
ax1.set_title('Time-domain signals')
plt.tight_layout(); plt.show()

# ── RMS calculation ───────────────────────────────────────────
T = 1/f1
rms_x1 = np.sqrt(np.mean(x1**2))
theoretical_rms = A1 / np.sqrt(2)
print(f"x1 RMS (numerical): {rms_x1:.4f}")
print(f"x1 RMS (A/√2):      {theoretical_rms:.4f}")`,
    explanation: 'Phasor addition (complex addition) gives the exact same result as summing the time-domain signals. The key insight: adding two sinusoids of the same frequency is equivalent to adding two complex numbers — the magnitude and angle of the sum give the amplitude and phase of the resultant sinusoid.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Sinusoids are the native language of communication systems.</strong>{' '}
        Every carrier signal in AM, FM, BPSK, QAM is a sinusoid. The channel adds noise to this sinusoid.
        The receiver must recover the original bits from a noisy sinusoid. Every step of this process —
        modulation, transmission, demodulation — is described in terms of sinusoid parameters.
      </p>
      <p>
        Phasors reduce the complexity of analysing systems with multiple sinusoids from trigonometric identities
        to simple complex arithmetic. Adding voltages in AC circuits, computing filter responses, analysing
        multi-path propagation — all done with phasors. Euler's formula is arguably the most useful formula
        in all of electrical engineering.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing amplitude and RMS — A is peak amplitude; RMS = A/√2. Power calculations use RMS². The "240V" from a wall socket is RMS, not peak (peak ≈ 340V).',
    'Phase in degrees vs radians — most mathematical formulas use radians. np.cos() takes radians. φ = π/4 rad = 45°. Always convert when switching between them.',
    'Adding amplitudes of sinusoids at different phases — A₁cos(ωt) + A₂cos(ωt+φ) ≠ (A₁+A₂)cos(ωt). Use phasor addition (complex arithmetic) to find the correct resultant amplitude.',
    'Forgetting the "Re[...]" in phasor notation — the physical signal is the real part of the complex exponential. x(t) = Re[A·e^j(ωt+φ)] = A·cos(ωt+φ). The imaginary part has no physical meaning here.',
  ],

  summary: [
    'Sinusoid: x(t) = A·cos(2πft + φ). Three parameters: amplitude A, frequency f (Hz), phase φ (rad).',
    'Angular frequency: ω = 2πf (rad/s). Period: T = 1/f (s).',
    'Euler\'s formula: e^(jθ) = cosθ + j·sinθ. Phasor X = A·e^(jφ) = A∠φ.',
    'Superposition at same frequency: add phasors (complex addition). Resultant A = |X₁+X₂|, φ = ∠(X₁+X₂).',
    'RMS = A/√2 for sinusoid. Average power P = A²/(2R) = V_rms²/R.',
    'Phase lead: positive φ → signal reaches peak earlier (shifts left in time).',
  ],

  practice: [
    {
      type: 'question',
      text: 'A sinusoid x(t) = 5·cos(2π·1000·t − π/3). State its amplitude, frequency, period, and phase. Does it lead or lag cos(2π·1000·t)?',
      hint: 'Amplitude A = 5 V. Frequency f = 1000 Hz = 1 kHz. Period T = 1/f = 1 ms. Phase φ = −π/3 rad = −60°. Since φ is negative, x(t) LAGS the reference cos(2π·1000t) by π/3 radians, equivalently by T/6 = 1/6 ms in time.',
    },
    {
      type: 'question',
      text: 'Express x(t) = 3·cos(ωt + π/6) as a phasor. Then add it to y(t) = 4·cos(ωt + π/3) using phasor addition.',
      hint: 'X = 3∠(π/6) = 3·e^(jπ/6) = 3(cos30° + j·sin30°) = 2.598 + j1.5. Y = 4∠(π/3) = 4(cos60° + j·sin60°) = 2 + j3.464. Sum Z = X + Y = 4.598 + j4.964. |Z| = √(4.598² + 4.964²) = 6.77. ∠Z = arctan(4.964/4.598) = 47.2° = 0.824 rad. Result: z(t) = 6.77·cos(ωt + 0.824).',
    },
    {
      type: 'question',
      text: 'Why is Euler\'s formula useful in signal analysis? What does e^(j2πft) represent geometrically?',
      hint: 'e^(j2πft) = cos(2πft) + j·sin(2πft) — a unit-magnitude complex number rotating counterclockwise at f revolutions per second in the complex plane. At t=0, it is at angle 0 (pointing right). At t=T/4, it is at angle π/2 (pointing up). The real part traces out a cosine; the imaginary part traces a sine. This geometric view turns differential equations into algebraic ones — instead of solving d/dt[A·cos(ωt+φ)] = -Aω·sin(ωt+φ), multiply the phasor by jω.',
    },
    {
      type: 'task',
      text: 'In Python, create two sinusoids x₁(t) = 3·cos(2π·500t + π/4) and x₂(t) = 2·cos(2π·500t − π/6). Compute the resultant analytically using phasor addition, then verify by plotting all three signals.',
      hint: 'X1 = 3*np.exp(1j*np.pi/4), X2 = 2*np.exp(-1j*np.pi/6), X_sum = X1+X2. A_sum = abs(X_sum), phi_sum = np.angle(X_sum). t = np.linspace(0, 4e-3, 1000). x1 = 3*np.cos(2*np.pi*500*t + np.pi/4). x2 = 2*np.cos(2*np.pi*500*t - np.pi/6). x_sum = x1+x2. x_phasor = A_sum*np.cos(2*np.pi*500*t + phi_sum). Plot all four — x_sum and x_phasor should overlap perfectly.',
    },
  ],
}

export default function SinusoidsAndPhasorsPage() {
  return <FEDFTopicPage content={content} />
}
