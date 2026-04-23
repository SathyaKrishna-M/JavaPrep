'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Shannon Capacity',
  subtitle: 'Channel capacity theorem, bandwidth-power trade-off, and the gap between BPSK and Shannon limit',
  co: 'CO6 — Shannon Capacity & Information Theory',

  overview: (
    <>
      <p>
        <strong className="text-white">Shannon's channel capacity theorem</strong> (1948) establishes the
        maximum rate at which information can be transmitted over a noisy channel with arbitrarily small error
        probability:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        C = B · log₂(1 + SNR) &nbsp;&nbsp;&nbsp; [bits per second]
      </p>
      <p>
        where B is the channel bandwidth (Hz) and SNR = S/N is the signal-to-noise power ratio (linear, not dB).
        This is the <strong className="text-white">Shannon-Hartley theorem</strong> for AWGN channels. It
        defines an absolute upper bound — no modulation or coding scheme can exceed C bits/second at reliable
        communication.
      </p>
      <p>
        The <strong className="text-white">Shannon limit in terms of Eb/N₀</strong> sets the minimum energy
        per bit for reliable communication at any spectral efficiency:
        Eb/N₀ {'>'} ln(2) = −1.59 dB. At −1.59 dB, capacity equals zero spectral efficiency — an information-theoretic
        minimum that no system can cross.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Shannon Capacity Formula</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          {[
            { label: 'Channel Capacity', val: 'C = B·log₂(1 + SNR)', sub: 'bits/second', color: 'blue' },
            { label: 'Spectral Efficiency', val: 'η = C/B = log₂(1+SNR)', sub: 'bits/s/Hz', color: 'green' },
            { label: 'Shannon Limit', val: 'Eb/N₀ > ln(2) = −1.59 dB', sub: 'absolute minimum', color: 'amber' },
          ].map(({ label, val, sub, color }) => (
            <div key={label} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-3`}>
              <p className={`text-${color}-300 font-bold text-[10px] mb-1 uppercase`}>{label}</p>
              <p className="font-mono text-white text-[10px]">{val}</p>
              <p className="text-gray-400 text-[10px] mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Gap from Shannon Limit — BPSK vs Capacity</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p>BPSK BER=10⁻⁵ at Eb/N₀ ≈ 9.6 dB</p>
          <p>Shannon limit: −1.59 dB</p>
          <p className="text-red-400">Gap = 9.6 − (−1.59) = 11.2 dB  (uncoded BPSK)</p>
          <p className="text-green-400 mt-1">Turbo codes / LDPC: within 0.5–1 dB of Shannon limit</p>
          <p className="text-cyan-300">This gap motivates channel coding — FEC reduces the gap.</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Channel capacity C', definition: 'C = B·log₂(1 + SNR) bits/second. The maximum reliable information rate for an AWGN channel with bandwidth B and SNR = signal power / noise power. Shannon proved: (1) C is achievable with ideal coding, (2) reliable communication is impossible above C. It is the most important result in information theory.' },
    { term: 'Spectral efficiency η', definition: 'η = C/B = log₂(1 + SNR) bits/s/Hz. Measures how efficiently bandwidth is used. BPSK: η=1 bit/s/Hz (uncoded). Actual Shannon limit for η=1: SNR = 2¹−1 = 1 (0 dB). BPSK at BER=10⁻⁵ needs Eb/N₀≈9.6dB → SNR=Eb/N₀=9.6dB — operating well above the limit needed for η=1.' },
    { term: 'Bandwidth-power trade-off', definition: 'C = B·log₂(1 + P/(N₀B)). For fixed power P and fixed rate R: can either use more bandwidth B (less power per Hz, each Hz carries less) or more power. Doubling bandwidth at same power: C increases but by less than double (log is sub-linear). Doubling power: C increases by approximately 1 bit/s/Hz for high SNR.' },
    { term: 'Shannon limit (−1.59 dB)', definition: 'As spectral efficiency η → 0 (infinite bandwidth, very low rate), the minimum Eb/N₀ for reliable communication → ln(2) ≈ 0.693 = −1.59 dB. This is the absolute minimum energy per information bit, achievable with infinite bandwidth. No physical system can operate below −1.59 dB with reliable communication.' },
    { term: 'Coding gain vs Shannon limit', definition: 'The gap between an actual modulation scheme\'s required Eb/N₀ and the Shannon limit. Uncoded BPSK at BER=10⁻⁵: gap ≈ 11 dB. With rate-1/2 convolutional code: ≈5 dB. Turbo codes: ≈1–2 dB. LDPC codes: ≈0.5 dB. Modern 5G uses LDPC and polar codes operating very close to Shannon capacity.' },
    { term: 'Shannon entropy', definition: 'H(X) = −Σ P(x)·log₂P(x) bits. The average information content per symbol. For equally likely symbols: H = log₂(M) bits. Shannon capacity is the maximum rate at which entropy can be reliably transmitted through a noisy channel. At capacity, each transmitted bit carries exactly 1 bit of information (entropy = 1).' },
    { term: 'Nyquist limit vs Shannon limit', definition: 'Nyquist: C_max = 2B·log₂(M) (noiseless, M amplitude levels). Shannon: C = B·log₂(1+SNR) (noisy). Nyquist ignores noise; Shannon includes it. For high M, noise prevents reliable level discrimination — Shannon sets the achievable limit accounting for this. Shannon capacity << Nyquist capacity in the presence of noise.' },
  ],

  code: {
    title: 'Shannon Capacity — Curves, Gap Analysis, and Bandwidth-Power Trade-off',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from scipy.special import erfc

Q = lambda x: 0.5 * erfc(x / np.sqrt(2))

# ── Shannon capacity vs SNR ───────────────────────────────────
SNR_dB  = np.linspace(-10, 30, 500)
SNR_lin = 10**(SNR_dB / 10)
C_per_B = np.log2(1 + SNR_lin)   # spectral efficiency [bits/s/Hz]

# ── BPSK and QPSK operating points ───────────────────────────
# For BPSK: SNR = Eb/N0 (when B = Rb, i.e., 1 bit/s/Hz)
# For QPSK: 2 bits/symbol, same BER formula at same Eb/N0
Eb_N0_dB_range = np.linspace(0, 14, 200)
Eb_N0_range    = 10**(Eb_N0_dB_range/10)
BER_BPSK = Q(np.sqrt(2 * Eb_N0_range))

# Find Eb/N0 at specific BER targets
from scipy.optimize import brentq
print("Required Eb/N0 for target BER (BPSK, uncoded):")
targets = {'BER=10⁻³': 1e-3, 'BER=10⁻⁵': 1e-5, 'BER=10⁻⁹': 1e-9}
req_snr = {}
for label, ber in targets.items():
    snr = brentq(lambda x: Q(np.sqrt(2*10**(x/10))) - ber, -5, 20)
    req_snr[label] = snr
    print(f"  {label}: Eb/N0 = {snr:.2f} dB")

print(f"\nShannon limit: Eb/N0 > ln(2) = {10*np.log10(np.log(2)):.3f} dB")

# ── Capacity vs bandwidth (fixed power, fixed noise PSD) ──────
P   = 1.0    # transmit power [W]
N0  = 1e-3   # noise PSD [W/Hz]

B_vals = np.logspace(3, 7, 500)   # 1 kHz to 10 MHz
C_vals = B_vals * np.log2(1 + P/(N0 * B_vals))

# C as B → ∞: C → (P/N0)/ln(2) [bits/s]
C_inf = P / (N0 * np.log(2))
print(f"\nCapacity limit as B→∞ (fixed power): C_∞ = P/(N0·ln2) = {C_inf:.1f} bits/s")
print(f"  At B = 1 kHz: C = {B_vals[0]*np.log2(1+P/(N0*B_vals[0])):.1f} bits/s")
print(f"  At B = 1 MHz: C ≈ {B_vals[-200]*np.log2(1+P/(N0*B_vals[-200])):.1f} bits/s")

# ── Gap analysis ──────────────────────────────────────────────
print("\n=== Gap from Shannon Limit (η = 1 bit/s/Hz) ===")
# Shannon: SNR_required = 2^η - 1 = 2^1 - 1 = 1 → Eb/N0 = 1 → 0 dB
shannon_required_dB = 10*np.log10(2**1 - 1)   # for η=1
print(f"Shannon minimum SNR for η=1: {shannon_required_dB:.2f} dB")
print(f"BPSK at BER=10⁻⁵:           {req_snr['BER=10⁻⁵']:.2f} dB")
print(f"Gap:                        {req_snr['BER=10⁻⁵'] - shannon_required_dB:.2f} dB")

# ── Plots ─────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Plot 1: Shannon capacity vs SNR
ax1 = axes[0]
ax1.plot(SNR_dB, C_per_B, 'b-', lw=2, label='Shannon: C/B = log₂(1+SNR)')
# Mark actual modulation operating points (at BER=10⁻⁵)
mods = [
    ('BPSK (1 b/s/Hz)',  req_snr['BER=10⁻⁵'],        1),
    ('QPSK (2 b/s/Hz)',  req_snr['BER=10⁻⁵'],        2),   # same Eb/N0, 2x efficiency
    ('16-QAM (4 b/s/Hz)',14.4,                        4),
    ('64-QAM (6 b/s/Hz)',20.5,                        6),
]
for name, snr_op, eta_op in mods:
    snr_shannon = 10*np.log10(2**eta_op - 1)
    ax1.annotate('', xy=(snr_shannon, eta_op), xytext=(snr_op, eta_op),
                arrowprops=dict(arrowstyle='<->', color='red', lw=1.2))
    ax1.plot(snr_op, eta_op, 'rs', ms=8)
    ax1.plot(snr_shannon, eta_op, 'g^', ms=8)
    ax1.text(snr_op+0.3, eta_op+0.1, name, fontsize=7)

ax1.plot([], [], 'rs', ms=8, label='Actual operating point')
ax1.plot([], [], 'g^', ms=8, label='Shannon limit for same η')
ax1.plot([], [], 'r-', label='← Gap to Shannon')
ax1.axvline(10*np.log10(np.log(2)), color='gray', ls='--', alpha=0.7, label='Shannon min: −1.59dB')
ax1.set_xlabel('SNR (dB)'); ax1.set_ylabel('Spectral efficiency η (bits/s/Hz)')
ax1.set_title('Shannon Capacity Curve and Operating Points')
ax1.set_xlim(-5, 25); ax1.set_ylim(0, 7)
ax1.legend(fontsize=6); ax1.grid(True, alpha=0.3)

# Plot 2: Capacity vs bandwidth (fixed power)
ax2 = axes[1]
ax2.semilogx(B_vals/1e3, C_vals/1e6, 'b', lw=2)
ax2.axhline(C_inf/1e6, color='r', ls='--', lw=1.5, label=f'C_∞ = P/(N₀ln2) = {C_inf/1e6:.1f} Mbps')
ax2.set_xlabel('Bandwidth B (kHz)'); ax2.set_ylabel('Capacity C (Mbps)')
ax2.set_title('C vs Bandwidth (Fixed Power P=1W, N₀=10⁻³ W/Hz)')
ax2.legend(); ax2.grid(True, which='both', alpha=0.3)
ax2.text(1000, C_inf/1e6*0.7, 'Increasing bandwidth\neventually gives diminishing returns',
         fontsize=8, ha='center', color='gray')

# Plot 3: BER curve with Shannon limit marked
ax3 = axes[2]
ax3.semilogy(Eb_N0_dB_range, BER_BPSK, 'b-', lw=2, label='BPSK uncoded')
ax3.axvline(-1.59, color='r', ls='--', lw=1.5, label='Shannon limit: −1.59 dB')
for label, ber in targets.items():
    snr = req_snr[label]
    ax3.annotate('', xy=(-1.59, ber), xytext=(snr, ber),
                arrowprops=dict(arrowstyle='<->', color='red', lw=1))
    ax3.text((snr-1.59)/2 + -1.59 - 1, ber*1.5,
             f'{snr+1.59:.1f} dB gap', fontsize=7, color='red', ha='center')
ax3.set_xlabel('Eb/N₀ (dB)'); ax3.set_ylabel('BER')
ax3.set_title('BPSK Gap from Shannon Limit')
ax3.set_xlim(-5, 15); ax3.set_ylim(1e-10, 0.6)
ax3.legend(); ax3.grid(True, which='both', alpha=0.3)

plt.suptitle('Shannon Channel Capacity — The Ultimate Limit of Digital Communication')
plt.tight_layout(); plt.show()`,
    explanation: 'The Shannon capacity curve shows the maximum spectral efficiency achievable at each SNR. Actual modulation schemes (BPSK, 16-QAM) operate to the right of the curve — the "gap" represents room for improvement with better coding. The capacity vs bandwidth plot shows diminishing returns: doubling bandwidth from a large value gives little capacity increase. The −1.59 dB Shannon limit is the absolute floor — no physical system can go below it.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Shannon's theorem is the most important theorem in communications
        engineering.</strong>{' '}
        Before Shannon (1948), engineers didn't know if reliable communication over a noisy channel was even
        possible. Shannon proved it is — but only up to a finite rate. This gave engineers a target: close
        the gap between their systems and the Shannon limit. From 1948 to today, coding has progressed from
        simple parity bits (6 dB gap) to turbo codes (0.5 dB gap) to polar codes used in 5G (0.1 dB gap).
      </p>
      <p>
        The bandwidth-power trade-off is central to every wireless system design. Spread spectrum (GPS,
        CDMA) trades bandwidth for robustness. OFDM (WiFi, 4G) tiles many narrow carriers to approach
        capacity. The Shannon limit is the compass that guides all of this development.
      </p>
    </>
  ),

  commonMistakes: [
    'Using SNR in dB in the capacity formula — C = B·log₂(1 + SNR) requires SNR in linear scale (power ratio, not dB). A common error: C = B·log₂(1 + SNR_dB). To convert: SNR_linear = 10^(SNR_dB/10). At SNR=10dB, SNR_linear=10, C/B = log₂(11) ≈ 3.46 bits/s/Hz.',
    'Confusing the Shannon limit with a specific BER — the Shannon limit says reliable communication is possible (BER → 0 with increasing code length) below capacity C. It doesn\'t say at what BER — it guarantees arbitrarily small BER is achievable for any rate R < C with sufficiently long codes.',
    'Treating capacity as achievable with BPSK — Shannon capacity requires optimal coding, not necessarily BPSK. BPSK without coding operates far from capacity. To approach Shannon capacity, you need long codes (turbo, LDPC, polar) that span many BPSK symbols and spread redundancy across the codeword.',
    'Thinking more bandwidth always helps — the capacity vs bandwidth formula shows diminishing returns. Doubling bandwidth at fixed power nearly doubles capacity at low SNR (power limited regime) but gives diminishing gains at high SNR (bandwidth limited regime). Many systems are bandwidth-limited — throwing more bandwidth at them doesn\'t help much.',
  ],

  summary: [
    'Shannon capacity: C = B·log₂(1+SNR) bits/s. Absolute maximum reliable rate for AWGN channel.',
    'Spectral efficiency: η = C/B = log₂(1+SNR) bits/s/Hz. SNR must be linear, not dB.',
    'Shannon limit: Eb/N₀ > ln(2) = −1.59 dB. Minimum energy per bit for any reliable communication.',
    'BPSK gap: uncoded BPSK at BER=10⁻⁵ needs Eb/N₀≈9.6 dB — 11 dB from Shannon limit.',
    'FEC codes close the gap: turbo/LDPC within 0.5–1 dB. Modern 5G polar codes within 0.1 dB.',
    'Bandwidth-power trade-off: C→P/(N₀ln2) as B→∞ (fixed power). More bandwidth has diminishing returns.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A telephone channel has bandwidth B=3.4kHz and SNR=35dB. Find the Shannon capacity in bits/s and compare with BPSK at BER=10⁻³ over the same channel.',
      hint: 'SNR = 10^(35/10) = 3162. C = 3400 × log₂(1+3162) = 3400 × log₂(3163) ≈ 3400 × 11.63 ≈ 39.5 kbps. BPSK at BER=10⁻³ needs Eb/N₀ ≈ 6.8 dB. With B=3.4 kHz and SNR=35dB: 1 symbol/s/Hz for BPSK → Rs=3.4 ksps → Rb=3.4 kbps. Shannon allows 39.5 kbps vs BPSK\'s 3.4 kbps — a 10× gap. This is why modems use QAM-1024 or higher with FEC to approach capacity on telephone lines (V.34 modem: 33.6 kbps on 3.4 kHz channel).',
    },
    {
      type: 'question',
      text: 'A satellite link has B=10MHz, transmit power P=10W, path loss L=10¹⁰, receiver noise N₀=10⁻²³ W/Hz. Find the received SNR and Shannon capacity.',
      hint: 'Received power Pr = P/L = 10/10¹⁰ = 10⁻⁹ W. Noise power Pn = N₀ × B = 10⁻²³ × 10⁷ = 10⁻¹⁶ W. SNR = Pr/Pn = 10⁻⁹/10⁻¹⁶ = 10⁷ = 70 dB. C = 10⁷ × log₂(1+10⁷) ≈ 10⁷ × 23.25 ≈ 232.5 Mbps. That\'s enormous — real satellite links are much lower because the link budget includes antenna gain, noise figure, etc. A Ku-band satellite downlink might achieve 100 Mbps in 500 MHz bandwidth.',
    },
    {
      type: 'question',
      text: 'Explain why C → P/(N₀·ln2) as bandwidth B → ∞. What does this tell us about the benefit of spreading a signal over very large bandwidth?',
      hint: 'C = B·log₂(1 + SNR) = B·log₂(1 + P/(N₀B)). As B→∞, P/(N₀B) → 0. Use lim(x→0) log₂(1+x) ≈ x/ln(2). So C ≈ B × P/(N₀B·ln2) = P/(N₀·ln2). This is finite! Meaning: infinite bandwidth does not give infinite capacity. With fixed power P, spreading over infinitely wide band gives SNR→0 at each Hz but capacity converges to P/(N₀ln2). The gain from more bandwidth saturates — this is fundamental to spread spectrum: you can trade bandwidth for SNR per Hz but you can\'t exceed the power-limited capacity.',
    },
    {
      type: 'task',
      text: 'In Python, plot the Shannon capacity curve (η vs Eb/N₀ in dB) from −2dB to 20dB. On the same plot, mark the actual operating points of BPSK, QPSK, 16-QAM, and 64-QAM at BER=10⁻⁵. Show the gap for each.',
      hint: 'Eb_N0_dB = np.linspace(-2, 20, 500). Eb_N0 = 10**(Eb_N0_dB/10). For Shannon curve: η = C/B = log₂(1+SNR). Relation: SNR = η × Eb/N₀ (at symbol rate=bandwidth). Actually at spectral efficiency η: SNR = η × Eb/N₀. So: C/B = log₂(1 + η × Eb/N₀) — implicit relation. Better: sweep η and solve for Eb/N₀: Eb/N₀_shannon = (2^η - 1)/η. Plot Eb/N₀_shannon_dB vs η. Operating points from the table: BPSK η=1@9.6dB, QPSK η=2@9.6dB, 16-QAM η=4@14.4dB, 64-QAM η=6@20.5dB.',
    },
  ],
}

export default function ShannonCapacityPage() {
  return <FEDFTopicPage content={content} />
}
