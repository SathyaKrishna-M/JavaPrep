'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Signal Energy & Power',
  subtitle: 'Energy vs power signals, average power, RMS, and energy over a period',
  co: 'CO1 — Signal Representation',

  overview: (
    <>
      <p>
        Every signal can be classified as either an <strong className="text-white">energy signal</strong> (finite
        total energy, zero average power) or a <strong className="text-white">power signal</strong> (infinite total
        energy, finite non-zero average power). Sinusoids and periodic signals are power signals; finite-duration
        pulses are energy signals.
      </p>
      <p>
        The <strong className="text-white">instantaneous power</strong> delivered to a 1Ω resistor by voltage x(t)
        is p(t) = x²(t). The <strong className="text-white">average power</strong> of a periodic signal over one
        period T is:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        P = (1/T) ∫₀ᵀ x²(t) dt
      </p>
      <p>
        For x(t) = A·cos(2πft + φ), the average power is <strong className="text-white">P = A²/2</strong>.
        The <strong className="text-white">RMS (root-mean-square)</strong> value is X_rms = √P = A/√2, representing
        the equivalent DC voltage that delivers the same power. Energy of a signal over interval [t₁, t₂]:
        E = ∫ x²(t) dt.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Energy vs Power Signals</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-2">Energy Signal</p>
            <div className="text-gray-400 space-y-1">
              <p>Total energy E = ∫₋∞^∞ x²(t) dt &lt; ∞</p>
              <p>Average power P = 0</p>
              <p className="text-gray-500 text-[10px]">Examples: rectangular pulse, Gaussian pulse, decaying exponential</p>
            </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
            <p className="text-amber-300 font-bold mb-2">Power Signal</p>
            <div className="text-gray-400 space-y-1">
              <p>Total energy E = ∞</p>
              <p>Average power P = lim(T→∞) (1/T)∫₋ᵀᴵ²^ᵀᴵ² x²dt &lt; ∞</p>
              <p className="text-gray-500 text-[10px]">Examples: sinusoid, square wave, random process</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Key Power Formulas for x(t) = A·cos(ωt+φ)</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p>Average power:  P = A²/2</p>
          <p>RMS value:      X_rms = A/√2 ≈ 0.707A</p>
          <p>Power in R:     P = X_rms²/R = A²/(2R)</p>
          <p>Energy per period: E_T = P·T = A²T/2</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Instantaneous power', definition: 'p(t) = v(t)·i(t) = v²(t)/R (for 1Ω, p = x²(t)). The power delivered at a specific instant. Varies with time for AC signals.' },
    { term: 'Average power', definition: 'P = (1/T)∫₀ᵀ x²(t) dt over one period T. For sinusoid A·cos(ωt+φ): P = A²/2. Independent of phase. The time-averaged rate of energy delivery.' },
    { term: 'RMS value', definition: 'X_rms = √[(1/T)∫₀ᵀ x²(t) dt] = √P. For sinusoid: X_rms = A/√2. The DC value that delivers the same power. AC meters read RMS. Mains "230V" is RMS.' },
    { term: 'Signal energy', definition: 'E = ∫₋∞^∞ x²(t) dt (total energy, 1Ω reference). Finite for energy signals, infinite for power signals. For a pulse of amplitude A and duration τ: E = A²·τ.' },
    { term: 'Energy signal', definition: 'Finite total energy (E < ∞), zero average power. Typically finite-duration or decaying signals. Examples: a single BPSK symbol pulse, a Gaussian pulse.' },
    { term: 'Power signal', definition: 'Infinite total energy, finite non-zero average power. Exists for all time (or effectively so). Examples: continuous sinusoid, random noise process, periodic waveforms.' },
    { term: 'Parseval\'s energy theorem', definition: 'E = ∫ x²(t) dt = ∫ |X(f)|² df. Energy computed in time domain equals energy computed from frequency-domain spectrum. Links power/energy to bandwidth.' },
  ],

  code: {
    title: 'Computing Signal Power, RMS, and Energy in Python',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt

# ── Sinusoid power analysis ───────────────────────────────────
A, f = 4.0, 1000   # 4V amplitude, 1 kHz
T = 1/f            # period = 1 ms
t = np.linspace(0, T, 10000, endpoint=False)   # one full period

x = A * np.cos(2*np.pi*f*t)

# Numerical average power (1Ω reference)
P_numerical    = np.mean(x**2)
P_theoretical  = A**2 / 2
print(f"Average power (numerical):   {P_numerical:.4f} W")
print(f"Average power (A²/2):        {P_theoretical:.4f} W")

# RMS
X_rms_numerical   = np.sqrt(P_numerical)
X_rms_theoretical = A / np.sqrt(2)
print(f"RMS (numerical):  {X_rms_numerical:.4f} V")
print(f"RMS (A/√2):       {X_rms_theoretical:.4f} V")

# ── Energy of a rectangular pulse (energy signal) ────────────
A_pulse = 2.0
tau = 1e-3         # pulse width 1 ms
dt  = 1e-6         # time step
t_pulse = np.arange(0, 5*tau, dt)
pulse = np.where(t_pulse < tau, A_pulse, 0.0)

E_numerical   = np.sum(pulse**2) * dt
E_theoretical = A_pulse**2 * tau
print(f"\nPulse energy (numerical):   {E_numerical:.6f} J")
print(f"Pulse energy (A²·τ):        {E_theoretical:.6f} J")

# Average power of pulse over infinite time = 0 (energy signal)
long_T = 1.0   # 1 second observation
P_pulse = E_numerical / long_T
print(f"Pulse avg power over 1s:    {P_pulse:.6f} W → approaches 0")

# ── Power with different loads ────────────────────────────────
R_values = [1, 50, 600]
print(f"\nSinusoid {A}V peak, {f}Hz:")
for R in R_values:
    P = X_rms_theoretical**2 / R
    print(f"  R = {R:4d}Ω  →  P = {P:.4f} W  =  {P*1000:.2f} mW")

# ── Plot: instantaneous power vs average ─────────────────────
p_inst = x**2
fig, axes = plt.subplots(2, 1, figsize=(10, 6))
axes[0].plot(t*1e3, x, 'b', label=f'x(t): {A}·cos(2π·{f}t)')
axes[0].set_ylabel('Voltage (V)'); axes[0].legend(); axes[0].grid(True, alpha=0.3)
axes[1].plot(t*1e3, p_inst, 'r', label='Instantaneous power x²(t)')
axes[1].axhline(P_numerical, color='k', linestyle='--', label=f'Average P = {P_numerical:.2f} W')
axes[1].set_xlabel('Time (ms)'); axes[1].set_ylabel('Power (W)')
axes[1].legend(); axes[1].grid(True, alpha=0.3)
plt.suptitle('Sinusoid Power Analysis'); plt.tight_layout(); plt.show()`,
    explanation: 'Instantaneous power p(t) = x²(t) oscillates at 2f (twice the signal frequency). Its time average converges to A²/2. Notice the power is always non-negative (squared). For a 50Ω load (RF standard impedance), power = X_rms²/50 — this is why RF engineers work in dBm referenced to 1mW into 50Ω.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Signal power and energy are central to BER (Bit Error Rate) analysis.</strong>{' '}
        The bit error rate for BPSK is Pb = Q(√(2Eb/N₀)), where Eb is the <em>energy per bit</em> and N₀/2 is
        noise power spectral density. Knowing how to calculate signal energy from amplitude and pulse duration
        connects the physical signal to the information-theoretic performance metric.
      </p>
      <p>
        RMS voltage is what AC instruments measure. When a spectrum analyser shows signal power in dBm, it is
        measuring RMS-squared / 50Ω. Understanding the relationship between amplitude, RMS, and average power
        prevents factor-of-two errors that plague RF system link budgets.
      </p>
    </>
  ),

  commonMistakes: [
    'Using peak amplitude instead of RMS in power formulas — P ≠ A²/R. P = (A/√2)²/R = A²/(2R). A factor-of-2 error in power is a 3 dB error — significant in link budget calculations.',
    'Classifying a sinusoid as an energy signal — a continuous sinusoid has infinite total energy and is a power signal with P = A²/2. Only finite-duration signals are energy signals.',
    'Forgetting that average power is independent of phase — P = A²/2 for any phase φ. Phase shifts time, not energy.',
    'Computing energy per period as "infinite" — energy per period Eₜ = P·T = A²T/2 is finite and well-defined. Only total energy over all time (−∞ to +∞) is infinite for a sinusoid.',
  ],

  summary: [
    'Instantaneous power: p(t) = x²(t) (1Ω reference). Oscillates at twice the signal frequency.',
    'Average power of sinusoid A·cos(ωt+φ): P = A²/2. Independent of phase φ.',
    'RMS = A/√2 ≈ 0.707A. Equivalent DC value delivering same power. What AC meters read.',
    'Energy signal: E < ∞, P = 0. Example: rectangular pulse. Energy = A²·τ.',
    'Power signal: E = ∞, P finite. Example: continuous sinusoid, noise.',
    'Parseval\'s theorem: ∫x²(t)dt = ∫|X(f)|²df — energy computed in time or frequency domain gives the same result.',
  ],

  practice: [
    {
      type: 'question',
      text: 'Calculate the average power, RMS value, and peak-to-peak voltage of x(t) = 6·sin(2π·50t + π/4). Load R = 75Ω.',
      hint: 'A = 6V. Average power (1Ω): P = A²/2 = 36/2 = 18 W. RMS: X_rms = A/√2 = 6/√2 = 4.243 V. Peak-to-peak = 2A = 12 V. Power in 75Ω: P = X_rms²/R = (4.243)²/75 = 18/75 = 0.24 W = 240 mW. Note: phase φ = π/4 does NOT affect power.',
    },
    {
      type: 'question',
      text: 'Is x(t) = e^(−2t)·u(t) an energy signal or power signal? Compute its total energy.',
      hint: 'Energy signal — it decays to zero, so total energy is finite. E = ∫₀^∞ (e^(−2t))² dt = ∫₀^∞ e^(−4t) dt = [−(1/4)e^(−4t)]₀^∞ = 0 − (−1/4) = 0.25 J. Average power P = lim(T→∞) E/T = 0.25/∞ = 0. Confirmed energy signal: E = 0.25 J, P = 0.',
    },
    {
      type: 'question',
      text: 'A BPSK transmitter sends bit "1" as s₁(t) = A·cos(2πfct) for 0 ≤ t ≤ Tb. Express the energy per bit Eb in terms of A and Tb.',
      hint: 'Eb = ∫₀^Tb s₁²(t) dt = ∫₀^Tb A²·cos²(2πfct) dt. For many cycles in one bit period (fc >> 1/Tb): ∫cos²(2πfct) dt ≈ Tb/2. Therefore Eb = A²·Tb/2. This is the energy of a half-power signal over one bit duration. BER = Q(√(2Eb/N₀)) — as Eb increases (higher A or longer Tb), BER decreases.',
    },
    {
      type: 'task',
      text: 'In Python, verify that for x(t) = 3·cos(2π·200t), the numerical average power equals A²/2 = 4.5 W. Also compute the energy over exactly 5 periods and verify it equals P·(5T).',
      hint: 'f=200, T=1/f=5ms, A=3. t = np.linspace(0, 5*T, 50000, endpoint=False). x = 3*np.cos(2*np.pi*200*t). P_num = np.mean(x**2). E_5T_num = np.sum(x**2)*(5*T/len(t)). Theoretical: P=4.5, E=P*5T=4.5*0.025=0.1125 J. Both should match to 3+ decimal places.',
    },
  ],
}

export default function SignalEnergyAndPowerPage() {
  return <FEDFTopicPage content={content} />
}
