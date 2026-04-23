'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'BER Analysis',
  subtitle: 'Bit Error Rate derivation, SNR vs BER curves, Monte Carlo simulation, and modulation comparison',
  co: 'CO5 — Probability & BER Analysis',

  overview: (
    <>
      <p>
        The <strong className="text-white">Bit Error Rate (BER)</strong> is the probability that a transmitted
        bit is incorrectly decoded. For BPSK over an AWGN channel with an optimal matched filter receiver:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        BER = Q(√(2Eb/N₀)) = (1/2)·erfc(√(Eb/N₀))
      </p>
      <p>
        where Eb is energy per bit and N₀/2 is the noise power spectral density. This is the{' '}
        <strong className="text-white">theoretical minimum BER</strong> achievable for BPSK — no receiver can
        do better on an AWGN channel. The BER decreases rapidly with Eb/N₀ and is plotted on a
        semi-logarithmic scale (BER vs Eb/N₀ in dB).
      </p>
      <p>
        <strong className="text-white">Monte Carlo simulation</strong> verifies the theoretical BER by
        simulating millions of bits, adding AWGN, detecting with a correlator, and counting errors. The
        simulated BER should match Q(√(2Eb/N₀)) — if not, there is a bug in the implementation.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">BER Derivation Steps</p>
        <div className="space-y-2 text-xs">
          {[
            { step: '1', text: 'Transmit s₁(t)=+Acos(2πfct) for bit "1", s₀(t)=−Acos for bit "0"' },
            { step: '2', text: 'Received: r(t) = sᵢ(t) + n(t), n(t) ~ AWGN with PSD N₀/2' },
            { step: '3', text: 'Correlator: z = ∫₀^Tb r(t)·cos(2πfct)dt = ±Eb + noise_component' },
            { step: '4', text: 'Noise at output: Gaussian N(0, σ_z²) where σ_z² = N₀·Eb/2' },
            { step: '5', text: 'Error if z < 0 when bit="1": P_e = P[Eb + N(0,σ_z²) < 0] = Q(Eb/σ_z) = Q(√(2Eb/N₀))' },
          ].map(({ step, text }) => (
            <div key={step} className="flex gap-3 items-start">
              <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] flex items-center justify-center font-bold">{step}</span>
              <span className="text-gray-300">{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">BER Comparison — Modulation Schemes</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p><span className="text-blue-300">BPSK:</span> BER = Q(√(2Eb/N₀)) — baseline reference</p>
          <p><span className="text-green-300">QPSK:</span> BER = Q(√(2Eb/N₀)) — same BER, 2× spectral efficiency</p>
          <p><span className="text-amber-300">8-PSK:</span> BER ≈ (2/3)Q(√(2·3·Eb/N₀·sin²(π/8))) — needs ~4 dB more</p>
          <p><span className="text-red-300">QAM-16:</span> BER ≈ (3/8)erfc(√(Eb/(5N₀))) — needs ~4 dB more than QPSK</p>
          <p><span className="text-gray-400 text-[10px]">Higher-order QAM: more bits/symbol but needs more Eb/N₀ for same BER.</span></p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Bit Error Rate (BER)', definition: 'BER = (number of erroneously received bits) / (total bits transmitted). A probability, so 0 ≤ BER ≤ 0.5. BER=0.5 means random guessing. Practical systems target BER=10⁻³ (voice), 10⁻⁶ (data), 10⁻⁹ (fibre). BER depends on modulation scheme, channel, and Eb/N₀.' },
    { term: 'BPSK BER formula', definition: 'BER = Q(√(2Eb/N₀)) = erfc(√(Eb/N₀))/2. Derived from the matched filter output distribution. The argument √(2Eb/N₀) is the "distance" from the decision threshold in units of noise standard deviations. Larger Eb/N₀ → larger argument → smaller Q → lower BER.' },
    { term: 'Eb/N₀ (energy per bit to noise density)', definition: 'The fundamental SNR metric for digital communications. Eb = energy per bit (Joules). N₀ = one-sided noise power spectral density (W/Hz = J). Eb/N₀ is dimensionless. In dB: Eb/N₀ [dB] = 10log₁₀(Eb/N₀). Related to received SNR: Eb/N₀ = SNR × (B/Rb) where B is noise bandwidth.' },
    { term: 'Monte Carlo BER simulation', definition: 'Generate N random bits, modulate, add AWGN, detect with correlator or matched filter, count errors. BER_sim = errors/N. For reliable estimates at BER=10⁻⁶, need ~100/BER = 10⁸ bits. Use variance reduction techniques (importance sampling) for very low BER. Always verify simulation against theory at high BER (low Eb/N₀) first.' },
    { term: 'Waterfall curve', definition: 'The BER vs Eb/N₀ plot on a semi-log scale looks like a "waterfall" — BER falls steeply from 0.5 at low SNR to near 0 at high SNR. The transition happens rapidly over a few dB. The "knee" of the curve is typically where BER transitions from 10⁻² to 10⁻⁵.' },
    { term: 'Coding gain', definition: 'Forward Error Correction (FEC) codes reduce BER at the cost of redundancy. The coding gain is the reduction in required Eb/N₀ (in dB) for the same BER. Turbo codes and LDPC codes operate within 1–2 dB of the Shannon limit. The BER curve for coded BPSK shifts left by the coding gain.' },
    { term: 'Link budget', definition: 'A spreadsheet accounting for all gains and losses in a communication link: transmit power, antenna gains, path loss, noise figure, required Eb/N₀ for target BER, and margin. If received Eb/N₀ > required Eb/N₀ + margin, the link closes (works reliably). BER analysis determines the required Eb/N₀.' },
  ],

  code: {
    title: 'Complete BER Analysis — Theory, Simulation, and Modulation Comparison',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from scipy.special import erfc

# ── Q-function ────────────────────────────────────────────────
Q = lambda x: 0.5 * erfc(x / np.sqrt(2))

# ── System parameters ─────────────────────────────────────────
Rb = 1000; Tb = 1/Rb; fc = 5000
fs = 50_000; sps = int(Tb * fs)
A = 1.0
t_bit = np.arange(sps) / fs
carrier = np.cos(2*np.pi*fc*t_bit)
Eb = A**2 * Tb / 2
print(f"Eb = {Eb:.6f} J  |  sps = {sps}  |  fc = {fc} Hz")

# ── Theoretical BER curves ────────────────────────────────────
Eb_N0_dB = np.linspace(0, 14, 200)
Eb_N0    = 10**(Eb_N0_dB / 10)

BER_BPSK  = Q(np.sqrt(2 * Eb_N0))                    # BPSK = QPSK (same Eb/N0 efficiency)
BER_8PSK  = (2/3) * Q(np.sqrt(6 * Eb_N0 * np.sin(np.pi/8)**2))  # 8-PSK approx
BER_QAM16 = (3/8) * erfc(np.sqrt(Eb_N0 / 5))         # 16-QAM approx

# ── Monte Carlo simulation for BPSK ──────────────────────────
n_bits = 10_000
Eb_N0_sim_dB = np.arange(0, 13, 1)
BER_sim = []
np.random.seed(0)

for snr_db in Eb_N0_sim_dB:
    Eb_N0_val = 10**(snr_db/10)
    N0 = Eb / Eb_N0_val
    noise_std = np.sqrt(N0/2 * fs)  # per-sample std

    # Transmit
    bits = np.random.randint(0, 2, n_bits)
    syms = 2*bits - 1  # {-1, +1}

    # Correlator detection (vectorised for speed)
    z = np.array([
        np.sum((syms[i] * carrier + noise_std * np.random.randn(sps)) * carrier) / fs
        for i in range(n_bits)
    ])
    bits_hat = (z > 0).astype(int)
    ber_val = np.mean(bits != bits_hat)
    BER_sim.append(max(ber_val, 1/n_bits))

BER_sim = np.array(BER_sim)

# ── Error floor demo: phase offset degradation ────────────────
phase_errors = [0, 5, 15, 30]   # degrees
BER_phase = {}
for phi_deg in phase_errors:
    phi = np.deg2rad(phi_deg)
    # With phase error: correlator output = Eb·cos(φ) ± noise
    # Effective Eb_eff = Eb·cos²(φ)
    Eb_eff = Eb_N0 * np.cos(phi)**2   # effective SNR after phase error
    BER_phase[phi_deg] = Q(np.sqrt(2 * Eb_eff))

# ── Required Eb/N0 for target BERs ───────────────────────────
from scipy.optimize import brentq
target_BERs = [1e-3, 1e-5, 1e-7]
print("\nRequired Eb/N0 for BPSK:")
for ber_target in target_BERs:
    f = lambda x: Q(np.sqrt(2*10**(x/10))) - ber_target
    snr_req = brentq(f, -5, 20)
    print(f"  BER = {ber_target:.0e}: Eb/N0 = {snr_req:.2f} dB")

# ── PLOT 1: BER waterfall curves ──────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(13, 5))

ax = axes[0]
ax.semilogy(Eb_N0_dB, BER_BPSK,  'b-',  lw=2, label='BPSK/QPSK (theory)')
ax.semilogy(Eb_N0_dB, BER_8PSK,  'g--', lw=2, label='8-PSK (theory)')
ax.semilogy(Eb_N0_dB, BER_QAM16, 'r:',  lw=2, label='16-QAM (theory)')
ax.semilogy(Eb_N0_sim_dB, BER_sim, 'bs', markersize=6, label='BPSK Monte Carlo')
ax.set_xlabel('Eb/N₀ (dB)'); ax.set_ylabel('BER')
ax.set_title('BER vs Eb/N₀: Modulation Comparison')
ax.set_xlim(0, 14); ax.set_ylim(1e-6, 0.6)
ax.legend(); ax.grid(True, which='both', alpha=0.3)
# Target BER lines
for ber_t, ls in zip([1e-3, 1e-6], ['--', ':']):
    ax.axhline(ber_t, color='gray', ls=ls, alpha=0.5)

# ── PLOT 2: Phase error degradation ──────────────────────────
ax2 = axes[1]
colors2 = ['b', 'g', 'orange', 'r']
for (phi_deg, ber_curve), col in zip(BER_phase.items(), colors2):
    ax2.semilogy(Eb_N0_dB, ber_curve, color=col, lw=1.8,
                 label=f'φ = {phi_deg}° error')
ax2.set_xlabel('Eb/N₀ (dB)'); ax2.set_ylabel('BER')
ax2.set_title('Phase Error Degradation in BPSK')
ax2.set_xlim(0, 14); ax2.set_ylim(1e-6, 0.6)
ax2.legend(); ax2.grid(True, which='both', alpha=0.3)
ax2.axhline(1e-3, color='gray', ls='--', alpha=0.5)

plt.suptitle('BPSK BER Analysis — Theory, Simulation, and Impairments')
plt.tight_layout(); plt.show()

# ── Spectral efficiency comparison ───────────────────────────
print("\n=== Spectral Efficiency Summary ===")
modulations = [
    ('BPSK',  1, 6.8),
    ('QPSK',  2, 6.8),
    ('8-PSK', 3, 10.5),
    ('16-QAM',4, 14.4),
    ('64-QAM',6, 20.5),
]
print(f"{'Modulation':10} {'bits/symbol':12} {'Eb/N0 for 10⁻⁵ BER':20} {'Spectral eff.'}")
for name, bps, snr_req in modulations:
    print(f"{name:10} {bps:12d} {snr_req:20.1f} dB  {bps:.1f} bits/s/Hz")`,
    explanation: 'The Monte Carlo simulation matches the theoretical Q(√(2Eb/N₀)) curve — validating the simulation. QPSK achieves the same BER as BPSK at the same Eb/N₀ but transmits 2 bits per symbol (double spectral efficiency). 16-QAM and higher-order modulations need more Eb/N₀ for the same BER — the "cost" of packing more bits per symbol. Phase errors create an irreducible error floor even at high SNR.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">BER analysis is the performance specification of a digital
        communication system.</strong>{' '}
        Before a mobile network is deployed, link budgets compute whether the received Eb/N₀ exceeds the
        required Eb/N₀ for target BER at the cell edge. A 1 dB deficit means edge users experience 10× more
        errors. The BER formula Q(√(2Eb/N₀)) is the mathematical bridge between physics (transmit power,
        propagation) and user experience (dropped calls, corrupted data).
      </p>
      <p>
        Modern 5G uses adaptive modulation and coding (AMC): select the highest-order QAM the channel can
        support based on measured SNR. The BER curves for each modulation scheme determine the switching
        thresholds. Without BER analysis, AMC cannot be designed.
      </p>
    </>
  ),

  commonMistakes: [
    'Insufficient bits in Monte Carlo — to measure BER=10⁻⁵ accurately, need at least 100 errors → 10⁷ bits. With only 10⁴ bits, the estimate has high variance. Rule: simulate at least 100/BER_target bits. Use the erfc formula for BER below 10⁻⁵ rather than pure Monte Carlo.',
    'Confusing SNR per bit and SNR per symbol — for QPSK with 2 bits/symbol: SNR_symbol/symbol = 2 × Eb/N₀. QPSK and BPSK have the same BER formula in terms of Eb/N₀ but different per-symbol SNR. The distinction matters when comparing modulations at a fixed transmit power.',
    'Treating BER as a fixed number — BER depends on the channel. The formula BER=Q(√(2Eb/N₀)) is only valid for AWGN. For fading channels (Rayleigh), BER = 1/(4Eb/N₀) at high SNR — much worse. Multipath, Doppler, synchronisation errors all degrade BER beyond the AWGN curve.',
    'Ignoring implementation losses — real systems have phase noise, timing jitter, quantisation errors, adjacent-channel interference. These add 1–5 dB to the required Eb/N₀. The theoretical BER curve is a lower bound; real systems operate 3–6 dB to the right of it.',
  ],

  summary: [
    'BPSK BER = Q(√(2Eb/N₀)) = erfc(√(Eb/N₀))/2 — theoretical minimum for AWGN channel.',
    'Q(x): rapidly decreasing. Q(3.09)≈10⁻³, Q(4.26)≈10⁻⁵, Q(4.75)≈10⁻⁶.',
    'QPSK: same BER as BPSK at same Eb/N₀, but 2 bits/symbol (2× spectral efficiency).',
    'Higher modulation (16-QAM, 64-QAM): more bits/symbol but needs more Eb/N₀.',
    'Monte Carlo: simulate ≥100/BER_target bits. BER_sim = errors/total_bits.',
    'Link budget: received Eb/N₀ must exceed required Eb/N₀ + margin for target BER.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A BPSK link has Eb/N₀ = 8 dB. Find the theoretical BER. How many dB more Eb/N₀ is needed to improve BER by a factor of 100 (two decades)?',
      hint: 'Eb/N₀ = 8 dB → 10^(0.8) = 6.31. BER = Q(√(12.62)) = Q(3.55) ≈ 1.9×10⁻⁴. For BER×100 lower (≈1.9×10⁻⁶): need Q(x) = 1.9×10⁻⁶ → x ≈ 4.65 → 2Eb/N₀ = 21.6 → Eb/N₀ = 10.8 → 10.35 dB. ΔEb/N₀ ≈ 10.35 − 8 = 2.35 dB. Note: each decade of BER improvement costs roughly 1–2 dB in Eb/N₀ in the steep part of the curve.',
    },
    {
      type: 'question',
      text: 'Compare BPSK and QPSK at the same spectral efficiency (bits/Hz). Which gives better BER at the same transmit power and bandwidth?',
      hint: 'At same bandwidth B: BPSK supports Rb=B bps (1 bit/symbol, symbol rate=B). QPSK supports Rb=2B bps (2 bits/symbol, same bandwidth). At same Rb (same data rate): QPSK needs half the bandwidth of BPSK. At same Eb/N₀: both have identical BER (Q(√(2Eb/N₀))). At same transmit power P and same bit rate Rb: Eb=P/Rb is the same for both → same Eb/N₀ → same BER. QPSK is strictly superior: same BER but half the bandwidth. This is why QPSK replaced BPSK as the baseline for modern systems.',
    },
    {
      type: 'question',
      text: 'What is the minimum Eb/N₀ required for BPSK to achieve BER = 10⁻⁶? Compare this to the Shannon limit for BPSK\'s spectral efficiency of 1 bit/s/Hz.',
      hint: 'BER=10⁻⁶: Q(√(2Eb/N₀)) = 10⁻⁶ → √(2Eb/N₀) ≈ 4.75 → Eb/N₀ = 4.75²/2 = 11.28 → 10.52 dB. Shannon limit: C=B·log₂(1+SNR). For η=1 bit/s/Hz: SNR = 2¹−1 = 1 → SNR=0 dB. Eb/N₀ = SNR × B/Rb = 1 × 1 = 1 (0 dB). But Shannon limit assumes ideal coding. BPSK uncoded needs 10.52 dB vs Shannon limit 0 dB — a gap of 10.52 dB. FEC codes reduce this gap to 1–2 dB.',
    },
    {
      type: 'task',
      text: 'Simulate BPSK BER from 0 to 12 dB Eb/N₀ using n_bits=20000. Also simulate QPSK (2 bits/symbol) at the same Eb/N₀. Verify both fall on the same curve Q(√(2Eb/N₀)). Plot on a semilogy graph with the theoretical curve.',
      hint: 'BPSK: 1 bit/correlator. QPSK: 2 bits by I and Q channels. QPSK: s_I = ±A/√2, s_Q = ±A/√2 (Gray coded). Correlate I with cos, Q with sin. Decide each independently. BER_QPSK = 0.5*(I_errors + Q_errors)/n_bits. Theoretical: same Q(√(2Eb/N₀)). Verify they match. Eb is per bit, so for QPSK symbol energy Es = 2Eb. Noise variance σ² = N₀/2 per component, where N₀ = Eb/(Eb_N0).',
    },
  ],
}

export default function BERAnalysisPage() {
  return <FEDFTopicPage content={content} />
}
