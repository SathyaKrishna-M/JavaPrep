'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'BPSK Waveform Mathematics',
  subtitle: 'Binary Phase Shift Keying — mathematical representation, constellation, bit mapping, and signal space',
  co: 'CO1 — Signal Representation',

  overview: (
    <>
      <p>
        <strong className="text-white">BPSK (Binary Phase Shift Keying)</strong> encodes digital bits by shifting
        the phase of a carrier sinusoid. Bit "1" maps to phase 0 (cos(2πfct)); bit "0" maps to phase π
        (−cos(2πfct)). The amplitude and frequency are unchanged — only the phase carries information:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        s(t) = b(t) · √(2Eb/Tb) · cos(2πfct) &nbsp;where b(t) ∈ {'{+1, −1}'}
      </p>
      <p>
        The <strong className="text-white">constellation diagram</strong> represents BPSK as two points on
        the real axis of a 2D signal space: +√Eb at +1 (bit "1") and −√Eb at −1 (bit "0"). The distance
        between constellation points is 2√Eb — the Euclidean distance determines noise immunity.
      </p>
      <p>
        BPSK has <strong className="text-white">bandwidth efficiency</strong> of 1 bit/s/Hz — it transmits
        one bit per symbol. The null-to-null bandwidth is 2/Tb = 2Rb (twice the bit rate). It is the simplest
        and most robust digital modulation scheme, used in deep-space communications and GPS.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">BPSK Signal Space</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-2">Bit "1" → phase 0°</p>
            <p className="font-mono text-gray-300">s₁(t) = √(2Eb/Tb)·cos(2πfct)</p>
            <p className="text-gray-400 mt-1">Constellation point: +√Eb on I-axis</p>
            <p className="text-green-400 mt-1">● &nbsp; +√Eb ←→ 0 &nbsp; (origin)</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
            <p className="text-red-300 font-bold mb-2">Bit "0" → phase 180°</p>
            <p className="font-mono text-gray-300">s₀(t) = −√(2Eb/Tb)·cos(2πfct)</p>
            <p className="text-gray-400 mt-1">Constellation point: −√Eb on I-axis</p>
            <p className="text-red-400 mt-1">0 &nbsp;←→ −√Eb &nbsp; ●</p>
          </div>
        </div>
        <div className="mt-2 bg-amber-500/10 border border-amber-500/30 rounded p-2 text-xs text-center">
          <p className="text-amber-300">Distance between points: d = 2√Eb. BER = Q(d/(2σ)) = Q(√(2Eb/N₀))</p>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">BPSK Key Parameters</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p>Carrier frequency: fc &nbsp; (must satisfy fc &gt;&gt; 1/Tb)</p>
          <p>Bit period: Tb = 1/Rb &nbsp; (Rb = bit rate in bps)</p>
          <p>Energy per bit: Eb = A²·Tb/2 = (signal power) × Tb</p>
          <p>Null-to-null BW: B_null = 2Rb = 2/Tb</p>
          <p>BER: Pb = Q(√(2Eb/N₀))</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Phase Shift Keying (PSK)', definition: 'Digital modulation where information is encoded in the phase of a carrier. BPSK uses 2 phases (0°, 180°). QPSK uses 4 phases (0°, 90°, 180°, 270°) for 2 bits/symbol.' },
    { term: 'BPSK signal model', definition: 's(t) = b(t)·A·cos(2πfct) where b(t) ∈ {+1, −1} for bits {1, 0}. Equivalently s₁(t) = +A·cos(2πfct) for bit "1" and s₀(t) = −A·cos(2πfct) for bit "0".' },
    { term: 'Constellation diagram', definition: 'A 2D plot showing the signal points in the IQ (in-phase/quadrature) plane. For BPSK: two points on the I-axis at ±√Eb. AWGN noise scatters received points around these locations.' },
    { term: 'Energy per bit (Eb)', definition: 'Eb = ∫₀^Tb s²(t) dt = A²·Tb/2. The energy contained in one transmitted bit period. BER performance depends on Eb/N₀ — the signal-to-noise ratio per bit.' },
    { term: 'Bit rate and bandwidth', definition: 'Rb = 1/Tb (bits per second). Null-to-null bandwidth B = 2Rb (Hz). Spectral efficiency η = Rb/B = 0.5 bps/Hz for BPSK (by null-to-null definition). Better: η = 1 bit/s/Hz by 3dB bandwidth.' },
    { term: 'Anti-podal signals', definition: 'BPSK signals s₁ and s₀ = −s₁ are called antipodal. Antipodal signalling maximises the distance between signal points for a given energy budget — optimal for AWGN channels.' },
    { term: 'Coherent detection', definition: 'BPSK requires the receiver to know the carrier phase exactly. The receiver multiplies by a locally generated cos(2πfct) and integrates over one bit period. This is a matched filter or correlation receiver.' },
  ],

  code: {
    title: 'BPSK Modulation, Transmission, and Demodulation',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt

# ── BPSK System Parameters ────────────────────────────────────
Rb = 1000        # bit rate (1 kbps)
fc = 10000       # carrier frequency (10 kHz >> Rb)
Tb = 1/Rb        # bit period (1 ms)
A  = 1.0         # amplitude (normalise later by Eb)

# Number of samples per bit (oversampling factor)
sps = 100        # 100 samples per symbol
fs  = sps * Rb   # sampling frequency
t_bit = np.arange(0, Tb, 1/fs)   # time vector for one bit

# ── Generate random bits and modulate ─────────────────────────
np.random.seed(42)
n_bits = 10
bits = np.random.randint(0, 2, n_bits)   # random 0s and 1s

# Map bits to BPSK symbols: 1 → +1, 0 → −1
symbols = 2*bits - 1   # {0,1} → {-1,+1}

# Modulate: s(t) = symbol × A × cos(2πfc·t) per bit
s_bpsk = np.concatenate([
    sym * A * np.cos(2*np.pi*fc*t_bit) for sym in symbols
])
t_total = np.arange(len(s_bpsk)) / fs

# ── Energy per bit ────────────────────────────────────────────
Eb = A**2 * Tb / 2
print(f"Theoretical Eb = {Eb:.6f} J")
# Verify numerically for one bit
s_one_bit = A * np.cos(2*np.pi*fc*t_bit)
Eb_num = np.sum(s_one_bit**2) / fs
print(f"Numerical  Eb = {Eb_num:.6f} J")

# ── Coherent demodulator (correlator / matched filter) ────────
received = s_bpsk.copy()   # no noise for now

detected_bits = []
for i in range(n_bits):
    segment = received[i*sps:(i+1)*sps]
    ref = np.cos(2*np.pi*fc*t_bit)
    # Correlate: integrate product over one bit period
    correlation = np.sum(segment * ref) / fs
    detected_bits.append(1 if correlation > 0 else 0)

detected_bits = np.array(detected_bits)
errors = np.sum(bits != detected_bits)
print(f"\nTransmitted: {bits}")
print(f"Detected:    {detected_bits}")
print(f"Errors: {errors}/{n_bits}")

# ── Plot 3 bits of BPSK waveform ─────────────────────────────
n_show = 3 * sps
plt.figure(figsize=(12, 4))
plt.plot(t_total[:n_show]*1e3, s_bpsk[:n_show])
plt.xlabel('Time (ms)'); plt.ylabel('Amplitude')
plt.title(f'BPSK: bits {bits[:3]} → {["180°","0°"][bits[0]]}, ...')
plt.axvline(Tb*1e3, color='r', linestyle='--', alpha=0.5)
plt.axvline(2*Tb*1e3, color='r', linestyle='--', alpha=0.5)
plt.grid(True, alpha=0.3); plt.show()`,
    explanation: 'The correlator receiver multiplies the received signal by the reference carrier and integrates over one bit period. A positive result → bit "1", negative → bit "0". This is mathematically equivalent to a matched filter and maximises SNR at the decision instant.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">BPSK is the thread that connects the entire MFCS course.</strong>{' '}
        Signal representation (CO1) defines the waveform. Fourier analysis (CO2) gives its spectrum.
        LTI systems (CO3) model the channel. Matched filters (CO3) implement the optimal receiver.
        The Z-transform (CO4) discretises the filter. BER analysis (CO5) quantifies performance.
        Shannon capacity (CO6) establishes the theoretical limit. Every CO builds on BPSK as the working example.
      </p>
      <p>
        BPSK is used in GPS L1 C/A and L2 signals (satellites to receivers), deep-space communications (Voyager,
        Mars rovers), and IEEE 802.11b Wi-Fi at 1 Mbps. Its simplicity and robustness make it the benchmark
        against which all other modulation schemes are compared.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing symbol rate and bit rate — for BPSK, 1 bit per symbol so Rb = Rs. For QPSK, 2 bits per symbol so Rb = 2Rs. The bandwidth depends on symbol rate, not bit rate.',
    'Setting fc too low relative to Rb — BPSK assumes many carrier cycles per bit (fc >> Rb). If fc = 2Rb, only 2 cycles per bit — the signal is barely sinusoidal and coherent detection fails.',
    'Treating BPSK amplitude as the same as Eb — A is voltage amplitude; Eb = A²·Tb/2 is energy. They have different units. The BER formula uses Eb/N₀, not A/N₀.',
    'Forgetting that the correlator output has units of energy — the integral of s(t)·cos(2πfct) over [0,Tb] has units of V²·s, not V. The decision threshold is 0 (antipodal signals are symmetric about 0).',
  ],

  summary: [
    'BPSK: bit "1" → cos(2πfct), bit "0" → −cos(2πfct). Phase encodes the bit; amplitude unchanged.',
    'Signal model: s(t) = b(t)·A·cos(2πfct), b(t) ∈ {+1, −1}.',
    'Energy per bit: Eb = A²·Tb/2. BER = Q(√(2Eb/N₀)).',
    'Constellation: two points at ±√Eb on I-axis. Distance = 2√Eb.',
    'Null-to-null bandwidth = 2Rb. Spectral efficiency = 1 bit/s/Hz.',
    'Antipodal signals: s₀ = −s₁. Maximises distance for given energy — optimal for AWGN.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A BPSK system transmits at Rb = 10 kbps with carrier fc = 100 kHz and amplitude A = 2V. Find: (a) bit period Tb, (b) energy per bit Eb, (c) null-to-null bandwidth.',
      hint: '(a) Tb = 1/Rb = 1/10000 = 0.1 ms = 100 μs. (b) Eb = A²·Tb/2 = 4 × 100×10⁻⁶ / 2 = 2×10⁻⁴ J = 0.2 mJ. (c) Null-to-null BW = 2Rb = 2×10000 = 20 kHz. Note: fc = 100 kHz >> Rb = 10 kHz ✓ (10x ratio — acceptable).',
    },
    {
      type: 'question',
      text: 'Explain the BPSK constellation diagram. How does the distance between constellation points affect BER?',
      hint: 'Constellation: 2D plot (I vs Q axes). BPSK places bit "1" at (√Eb, 0) and bit "0" at (−√Eb, 0) on the I-axis. Distance d = 2√Eb. AWGN noise scatters received points as Gaussian clouds around each ideal point. An error occurs when noise pushes a received point past the decision boundary (at 0). BER = Q(d/2σ) = Q(√Eb / σ) = Q(√(2Eb/N₀)) where σ² = N₀/2. Larger d → farther from boundary → lower BER for same noise.',
    },
    {
      type: 'question',
      text: 'Why is BPSK called "coherent" modulation? What does the receiver need to know?',
      hint: 'Coherent detection requires the receiver to know the exact phase and frequency of the transmitted carrier. The receiver generates a local reference cos(2πfct) that is phase-synchronized with the received carrier. It multiplies the received signal by this reference and integrates over one bit period. If the reference is offset by phase error θ, the correlation = Eb·cos(θ) — a phase error of 90° means zero output (complete loss of signal). Carrier synchronization (carrier recovery) is one of the key engineering challenges in BPSK receivers.',
    },
    {
      type: 'task',
      text: 'In Python, generate 1000 random BPSK bits at Rb = 1kbps, fc = 10kHz, A = 1V. Add AWGN noise at SNR = 10 dB. Demodulate with a correlator and compute the empirical BER. Compare to theoretical Q(√(2Eb/N₀)).',
      hint: 'Eb = A²*Tb/2. N0 = Eb / (10**(SNR_dB/10)). Noise std = sqrt(N0/2 * fs/2) per sample (double-sided). Add noise to s_bpsk. Correlate each bit: sum(segment * ref)/fs. Compare to 0. Count errors/n_bits. Theoretical: from scipy.special import erfc; BER_theory = 0.5*erfc(np.sqrt(Eb/N0)). Both should be around 0.39% for 10dB SNR.',
    },
  ],
}

export default function BPSKWaveformMathPage() {
  return <FEDFTopicPage content={content} />
}
