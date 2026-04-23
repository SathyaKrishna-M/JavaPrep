'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Matched Filters',
  subtitle: 'Optimal receiver design — maximising SNR at the sampling instant for BPSK detection',
  co: 'CO3 — LTI Systems & Matched Filters',

  overview: (
    <>
      <p>
        The <strong className="text-white">matched filter</strong> is the optimal LTI filter for detecting a
        known signal s(t) corrupted by Additive White Gaussian Noise (AWGN). It maximises the output
        signal-to-noise ratio (SNR) at the sampling instant t = Tb:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        h(t) = s(Tb − t) &nbsp;&nbsp;&nbsp; H(f) = S*(f)·e^(−j2πfTb)
      </p>
      <p>
        The matched filter impulse response is the <strong className="text-white">time-reverse</strong> of the
        signal, delayed by Tb to make it causal. Its output at t=Tb equals the cross-correlation of the
        received signal with s(t), which peaks at the optimal SNR = 2Eb/N₀.
      </p>
      <p>
        For BPSK, s(t) = ±A·cos(2πfct) over [0, Tb]. The matched filter output at t=Tb is
        ±Eb (proportional to bit energy). The BER = Q(√(2Eb/N₀)) follows directly from the distribution
        of the noise component at the filter output.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Matched Filter vs Correlator</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-2">Matched Filter (LTI filter)</p>
            <p className="font-mono text-gray-300">h(t) = s(Tb − t)</p>
            <p className="text-gray-400 mt-1">Convolve received r(t) with h(t). Sample at t=Tb.</p>
            <p className="text-green-400 mt-1">Output at Tb: y(Tb) = ∫₀^Tb r(t)·s(t)dt = Eb ± noise</p>
          </div>
          <div className="bg-violet-500/10 border border-violet-500/30 rounded p-3">
            <p className="text-violet-300 font-bold mb-2">Correlator (equivalent)</p>
            <p className="font-mono text-gray-300">z = ∫₀^Tb r(t)·s(t) dt</p>
            <p className="text-gray-400 mt-1">Multiply received signal by reference s(t), integrate over Tb.</p>
            <p className="text-green-400 mt-1">Identical output to matched filter at t=Tb.</p>
          </div>
        </div>
        <div className="mt-2 bg-amber-500/10 border border-amber-500/30 rounded p-2 text-xs text-center">
          <p className="text-amber-300">Peak SNR (output at t=Tb) = 2Eb/N₀ — depends only on Eb, not on signal shape!</p>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-red-400 font-semibold mb-2">BPSK Matched Filter Output</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p>Signal s₁(t) = +A·cos(2πfct), s₀(t) = −A·cos(2πfct)</p>
          <p>MF output for s₁: z = ∫r(t)·cos(2πfct)dt = +Eb + noise component</p>
          <p>MF output for s₀: z = −Eb + noise component</p>
          <p className="text-cyan-300 mt-1">Decision: z &gt; 0 → bit "1",  z &lt; 0 → bit "0"</p>
          <p className="text-amber-300">BER = Q(√(2Eb/N₀)) — theoretical optimum for AWGN</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Matched filter h(t) = s(Tb−t)', definition: 'The time-reversed and delayed version of the signal s(t). Maximises SNR at the sampling instant t=Tb over all possible LTI filters. The frequency domain equivalent: H(f) = S*(f)·e^(−j2πfTb), where S*(f) is the complex conjugate of the signal spectrum.' },
    { term: 'Output SNR = 2Eb/N₀', definition: 'The maximum achievable SNR at the matched filter output is 2Eb/N₀, regardless of signal shape. Eb = ∫|s(t)|²dt (bit energy) and N₀/2 is AWGN power spectral density. This is why all BPSK BER curves are expressed in terms of Eb/N₀.' },
    { term: 'Correlator receiver', definition: 'z = ∫₀^Tb r(t)·s(t)dt. Multiplies received signal r(t) by the reference template s(t) and integrates over one bit period. Mathematically identical to matched filter output at t=Tb. Easier to implement in hardware for known signal shapes.' },
    { term: 'Decision rule', definition: 'For BPSK (antipodal signals): if z > 0 → decide bit "1"; if z < 0 → decide bit "0". The threshold is 0 because the signals are symmetric (s₀ = −s₁). For non-antipodal signals, the optimal threshold depends on the signal energies and noise variance.' },
    { term: 'Noise at MF output', definition: 'The noise term at the correlator output is n_out = ∫₀^Tb n(t)·s(t)dt. For AWGN n(t) with PSD N₀/2, this noise is Gaussian with mean 0 and variance σ² = N₀·Eb/2. The SNR = (Eb)²/σ² = 2Eb/N₀. Error occurs when noise exceeds Eb (pushes output across 0).' },
    { term: 'Q-function', definition: 'Q(x) = P[Z > x] = (1/√(2π))∫ₓ^∞ e^(−u²/2)du where Z~N(0,1). The tail probability of the standard normal distribution. BER for BPSK = Q(√(2Eb/N₀)). Q(3) ≈ 1.35×10⁻³, Q(4) ≈ 3.17×10⁻⁵. Decreasing fast as Eb/N₀ increases.' },
    { term: 'Coherent vs non-coherent detection', definition: 'Coherent detection uses a phase-locked reference s(t) — requires carrier phase synchronisation. The matched filter assumes perfect phase knowledge. Non-coherent detection (e.g., envelope detection) avoids phase synchronisation but pays a 3 dB SNR penalty (worse BER).' },
  ],

  code: {
    title: 'BPSK Matched Filter Receiver — BER vs Eb/N₀',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from scipy.special import erfc

# ── System parameters ─────────────────────────────────────────
Rb = 1000; Tb = 1/Rb; fc = 5000
fs = 50_000
sps = int(Tb * fs)   # samples per symbol (50)
n_bits = 5000        # bits to simulate
np.random.seed(42)

# Time vector for one bit period
t_bit = np.arange(sps) / fs

# ── Signal templates ──────────────────────────────────────────
# BPSK: s₁ = +A·cos, s₀ = −A·cos
A = 1.0
carrier = np.cos(2*np.pi*fc*t_bit)
s1 =  A * carrier   # bit "1"
s0 = -A * carrier   # bit "0"

# Energy per bit
Eb = np.sum(s1**2) / fs
print(f"Eb = {Eb:.6f} J  (theoretical A²Tb/2 = {A**2*Tb/2:.6f})")

# ── Matched filter template ───────────────────────────────────
# h(t) = s(Tb - t) = time-reverse of s₁(t)
# Since s₁(t) = A·cos(2πfct), and cos is even: s₁(Tb-t) ≈ A·cos(2πfc(Tb-t))
# Numerically: just reverse the array
h_mf = carrier[::-1]   # time-reversed carrier

# ── Monte Carlo BER simulation ────────────────────────────────
Eb_N0_dB_range = np.arange(0, 13, 1)   # 0 to 12 dB
BER_simulated = []
BER_theoretical = []

for Eb_N0_dB in Eb_N0_dB_range:
    Eb_N0 = 10**(Eb_N0_dB/10)
    N0 = Eb / Eb_N0              # noise PSD
    noise_var = N0 * fs / 2      # variance per sample (two-sided PSD N0/2)
    noise_std  = np.sqrt(noise_var)

    # Generate bits and modulate
    bits = np.random.randint(0, 2, n_bits)
    symbols = 2*bits - 1   # {-1, +1}

    # Transmit signal
    s_tx = np.concatenate([sym * carrier for sym in symbols])

    # Add AWGN
    noise = noise_std * np.random.randn(len(s_tx))
    r = s_tx + noise

    # ── Matched filter (correlator implementation) ────────────
    decisions = []
    for i in range(n_bits):
        segment = r[i*sps:(i+1)*sps]
        # Correlate: z = ∫r(t)·s(t)dt ≈ sum(r·carrier)/fs
        z = np.sum(segment * carrier) / fs
        decisions.append(1 if z > 0 else 0)

    decisions = np.array(decisions)
    ber = np.mean(bits != decisions)
    BER_simulated.append(max(ber, 1/n_bits))   # avoid log(0)

    # Theoretical BER = Q(√(2Eb/N₀)) = erfc(√(Eb/N₀))/2
    ber_theory = 0.5 * erfc(np.sqrt(Eb_N0))
    BER_theoretical.append(ber_theory)

    print(f"Eb/N₀ = {Eb_N0_dB:2d} dB  |  BER simulated: {ber:.4f}  |  theory: {ber_theory:.4f}")

# ── Plot BER curve ────────────────────────────────────────────
plt.figure(figsize=(8, 5))
plt.semilogy(Eb_N0_dB_range, BER_simulated, 'bo-', label='Monte Carlo (5000 bits)', markersize=5)
plt.semilogy(Eb_N0_dB_range, BER_theoretical, 'r--', label='Theory: Q(√(2Eb/N₀))', lw=2)
plt.xlabel('Eb/N₀ (dB)'); plt.ylabel('Bit Error Rate (BER)')
plt.title('BPSK BER Performance — Matched Filter Receiver')
plt.legend(); plt.grid(True, which='both', alpha=0.3)
plt.ylim(1e-5, 1)
plt.axhline(1e-3, color='gray', ls=':', alpha=0.5, label='BER = 10⁻³')
plt.tight_layout(); plt.show()

# ── Show matched filter output for one bit ────────────────────
r_one_bit = s1 + noise_std * np.random.randn(sps)
mf_output = np.zeros(sps)
for n in range(sps):
    # Running correlator: integrate up to each sample
    mf_output[n] = np.sum(r_one_bit[:n+1] * carrier[:n+1]) / fs

plt.figure(figsize=(8, 4))
plt.plot(t_bit*1e3, r_one_bit, 'gray', alpha=0.5, label='Received (noisy bit "1")')
plt.plot(t_bit*1e3, mf_output, 'b', lw=2, label='MF output (running integral)')
plt.axhline(Eb, color='r', ls='--', label=f'Expected peak = Eb = {Eb:.4f}')
plt.axhline(0, color='k', alpha=0.3)
plt.xlabel('Time (ms)'); plt.ylabel('Amplitude / Correlation')
plt.title('Matched Filter: Running Correlation for One BPSK Bit')
plt.legend(fontsize=8); plt.grid(True, alpha=0.3); plt.show()`,
    explanation: 'The correlator multiplies the received signal by the carrier reference and integrates. The output at t=Tb is proportional to Eb for correct detection. The BER curve shows the simulated Monte Carlo result matching the theoretical Q(√(2Eb/N₀)) curve — validating that the correlator is indeed the matched filter. At Eb/N₀ = 10 dB, BER ≈ 4×10⁻⁶ (very reliable).',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">The matched filter is the mathematical proof that BPSK achieves
        the best possible BER for a given Eb/N₀ over AWGN.</strong>{' '}
        No other receiver structure can do better under this channel model — the matched filter is optimal by
        definition (the Neyman-Pearson theorem). Every practical digital receiver (GPS, Wi-Fi, 4G/5G, satellite)
        implements either a matched filter or its correlator equivalent.
      </p>
      <p>
        The BER = Q(√(2Eb/N₀)) formula is the benchmark for all modulation schemes. QPSK achieves the same
        BER at the same Eb/N₀ but doubles the spectral efficiency. QAM-16 needs 4 dB more Eb/N₀ for the same
        BER. Shannon capacity (CO6) sets the ultimate lower bound that no receiver can cross.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing Eb/N₀ with SNR — SNR = signal power / noise power. Eb/N₀ = energy per bit / noise PSD. They differ by the bandwidth: Eb/N₀ = SNR × B/Rb. For BPSK (B=Rb), Eb/N₀ = SNR in linear scale — but this coincidence does not hold for other modulation schemes.',
    'Forgetting the integration factor in the correlator — the correlator output z = ∫r(t)·s(t)dt has units of V²·s (not V). In code, remember to divide by fs (multiply by dt) when computing np.sum(r*s): z = np.sum(r*s)/fs. Missing 1/fs shifts the effective decision threshold.',
    'Using a noisy reference in the correlator — the correlator reference must be a clean, locally generated s(t), not the received signal. Using the received signal as reference adds noise-squared terms that degrade performance significantly.',
    'Sampling the matched filter at the wrong time — the MF output peaks at t=Tb (for a bit pulse from 0 to Tb). Sampling earlier or later (timing error) reduces the peak value and degrades BER. Symbol timing synchronisation is a critical practical challenge.',
  ],

  summary: [
    'Matched filter: h(t) = s(Tb−t). Time-reverse of the signal, delayed by Tb.',
    'Frequency domain: H(f) = S*(f)·e^(−j2πfTb). Conjugate of signal spectrum.',
    'Peak output SNR = 2Eb/N₀ — maximum achievable over all LTI filters.',
    'Correlator equivalent: z = ∫₀^Tb r(t)·s(t)dt. Sample at t=Tb for optimal decision.',
    'BPSK decision: z > 0 → bit "1", z < 0 → bit "0". Threshold = 0 (antipodal symmetry).',
    'BER = Q(√(2Eb/N₀)) = erfc(√(Eb/N₀))/2. Optimal performance over AWGN channel.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A BPSK system uses A=2V, Tb=0.5ms, fc=10kHz. (a) Find Eb. (b) If N₀ = 10⁻⁶ W/Hz, find Eb/N₀ in dB. (c) Find the BER using BER = Q(√(2Eb/N₀)).',
      hint: '(a) Eb = A²Tb/2 = 4×0.5×10⁻³/2 = 10⁻³ J. (b) Eb/N₀ = 10⁻³/10⁻⁶ = 1000. In dB: 10log₁₀(1000) = 30 dB. (c) Q(√(2×1000)) = Q(√2000) = Q(44.7). Q(x) for x>>3 approaches 0 extremely fast. Using Q(x)≈(1/x√(2π))e^(−x²/2) for large x: Q(44.7) ≈ 10^(−435) — essentially zero. A 30 dB Eb/N₀ is massive overkill for BPSK.',
    },
    {
      type: 'question',
      text: 'Derive the variance of the noise at the correlator output. If n(t) is AWGN with PSD N₀/2, show that var(z) = N₀·Eb/2 where z = ∫₀^Tb n(t)·s(t)dt.',
      hint: 'var(z) = E[z²] = E[(∫n(t)s(t)dt)²] = ∫∫E[n(t)n(τ)]s(t)s(τ)dtdτ. AWGN autocorrelation: E[n(t)n(τ)] = (N₀/2)δ(t−τ). Therefore: var(z) = ∫∫(N₀/2)δ(t−τ)s(t)s(τ)dtdτ = (N₀/2)∫s²(t)dt = (N₀/2)·Eb. SNR at output: (Eb)²/var(z) = (Eb)²/(N₀Eb/2) = 2Eb/N₀ ✓. Error probability P(error|s₁) = P(z<0|s₁) = P(Eb+noise<0) = P(noise<−Eb) = Q(Eb/√var(z)) = Q(√(2Eb/N₀)).',
    },
    {
      type: 'question',
      text: 'What is the BER at Eb/N₀ = 6 dB for BPSK? How many dB of Eb/N₀ are needed to achieve BER = 10⁻⁵?',
      hint: '6 dB → Eb/N₀ = 10^(6/10) = 3.981. BER = Q(√(2×3.981)) = Q(√7.962) = Q(2.82). Q(2.82) ≈ 0.0024 (about 0.24%). To find Eb/N₀ for BER=10⁻⁵: Q(x)=10⁻⁵ → x≈4.42 (from Q-function table or erfinv). 2Eb/N₀ = 4.42² = 19.5 → Eb/N₀ = 9.76 → 10log₁₀(9.76) ≈ 9.9 dB ≈ 10 dB.',
    },
    {
      type: 'task',
      text: 'Implement a BPSK BER simulation in Python for Eb/N₀ from 0 to 12 dB. Plot simulated BER vs theoretical Q(√(2Eb/N₀)) on a semilogy plot. Use n_bits=10000. Identify the Eb/N₀ at which simulated and theoretical BER cross 10⁻³.',
      hint: 'Eb = A²*Tb/2. For each Eb_N0_dB: N0 = Eb/10**(Eb_N0_dB/10). noise_std=sqrt(N0/2*fs). Generate bits, modulate: bpsk_tx = (2*bits-1)*A*carrier repeated. Add noise. Correlate each bit: z[i]=np.sum(r[i*sps:(i+1)*sps]*carrier)/fs. Decision: bit_hat = (z>0).astype(int). BER=mean(bits!=bit_hat). Theory: 0.5*erfc(sqrt(10**(Eb_N0_dB/10))). Crossing 10⁻³ should be near Eb/N₀ ≈ 6.8 dB.',
    },
  ],
}

export default function MatchedFiltersPage() {
  return <FEDFTopicPage content={content} />
}
