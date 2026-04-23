'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'LTI Systems',
  subtitle: 'Linear Time-Invariant systems — impulse response, frequency response, distortion, and channel models',
  co: 'CO3 — LTI Systems & Matched Filters',

  overview: (
    <>
      <p>
        A <strong className="text-white">Linear Time-Invariant (LTI)</strong> system is completely characterised
        by its <strong className="text-white">impulse response h(t)</strong> — the output when the input is a
        Dirac delta δ(t). Any input x(t) produces output y(t) = x(t) * h(t) (convolution):
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        y(t) = ∫₋∞^∞ x(τ)·h(t−τ) dτ &nbsp;&nbsp;&nbsp; or equivalently &nbsp;&nbsp;&nbsp; Y(f) = H(f)·X(f)
      </p>
      <p>
        <strong className="text-white">Linearity</strong> means superposition holds: if x₁ → y₁ and x₂ → y₂,
        then ax₁ + bx₂ → ay₁ + by₂. <strong className="text-white">Time-invariance</strong> means a time shift
        in input produces the same time shift in output: x(t−t₀) → y(t−t₀).
      </p>
      <p>
        The <strong className="text-white">frequency response H(f) = F{'{'}h(t){'}'}</strong> tells us how the system
        scales each frequency component. A channel with H(f) ≠ constant causes{' '}
        <strong className="text-white">amplitude distortion</strong>; H(f) with non-linear phase causes{' '}
        <strong className="text-white">phase distortion</strong> (different delays at different frequencies).
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">LTI System Analysis</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          {[
            { label: 'Time Domain', desc: 'y(t) = x(t) * h(t)\nConvolution integral', color: 'blue' },
            { label: 'Frequency Domain', desc: 'Y(f) = X(f) · H(f)\nPointwise multiplication', color: 'violet' },
            { label: 'Distortion Condition', desc: 'Distortionless: H(f) = K·e^(−j2πft₀)\n|H|=const, linear phase', color: 'amber' },
          ].map(({ label, desc, color }) => (
            <div key={label} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-3`}>
              <p className={`text-${color}-300 font-bold mb-1`}>{label}</p>
              <p className="text-gray-300 font-mono text-[10px] whitespace-pre-line">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-cyan-400 font-semibold mb-2">Common Channel Models</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p><span className="text-blue-300">Ideal (AWGN):</span> h(t) = δ(t−t₀) → Y(f) = X(f)·e^(−j2πft₀). Just a delay, no distortion.</p>
          <p><span className="text-amber-300">Bandlimited:</span> H(f) = rect(f/2B) → h(t) = 2B·sinc(2Bt). Cuts all frequencies above B.</p>
          <p><span className="text-red-300">Multipath:</span> h(t) = δ(t) + α·δ(t−τ) → H(f) = 1 + α·e^(−j2πfτ). Frequency-selective fading.</p>
          <p><span className="text-green-300">RC lowpass:</span> H(f) = 1/(1+j2πfRC) → 3dB BW = 1/(2πRC).</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Linearity', definition: 'Superposition: a·x₁(t) + b·x₂(t) → a·y₁(t) + b·y₂(t). Implies: if you double the input, the output doubles. Non-linear systems (amplifier saturation, diodes) cannot be analysed with Fourier methods directly.' },
    { term: 'Time-invariance', definition: 'x(t−t₀) → y(t−t₀). The system\'s behaviour doesn\'t change with time. A channel that fades randomly over time is not time-invariant. For LTI channels, the impulse response h(t) fully describes the system for all time.' },
    { term: 'Impulse response h(t)', definition: 'h(t) = system output when input = δ(t). Since any signal can be written as x(t) = ∫x(τ)δ(t−τ)dτ, and the system is LTI, the output is y(t) = ∫x(τ)h(t−τ)dτ = (x*h)(t). h(t) completely describes the LTI system.' },
    { term: 'Frequency response H(f)', definition: 'H(f) = F{h(t)}. The Fourier Transform of the impulse response. |H(f)| is the amplitude response (gain at frequency f). ∠H(f) is the phase response. Y(f) = H(f)·X(f) — filter output = filter response × input spectrum.' },
    { term: 'Distortionless condition', definition: 'A system is distortionless if H(f) = K·e^(−j2πft₀). |H(f)| = K (flat amplitude) and ∠H(f) = −2πft₀ (linear phase). Output: y(t) = K·x(t−t₀) — scaled and delayed, but not distorted. Any deviation from flat amplitude or linear phase causes distortion.' },
    { term: 'Group delay', definition: 'τ_g(f) = −(1/2π)·d∠H(f)/df. The delay experienced by a narrowband signal at frequency f. For distortionless systems, τ_g is constant (linear phase → constant group delay). Non-constant group delay causes different frequency components to arrive at different times — phase distortion.' },
    { term: 'AWGN channel model', definition: 'Additive White Gaussian Noise: r(t) = s(t) + n(t) where n(t) is white Gaussian noise with power spectral density N₀/2. The channel itself is just addition of noise (no filtering). The receiver\'s matched filter is the optimal response to this channel model.' },
  ],

  code: {
    title: 'LTI System Response — Channel Distortion and Equalisation',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from numpy.fft import fft, ifft, fftfreq, fftshift
from scipy.signal import butter, freqz, lfilter

# ── BPSK-like test signal ─────────────────────────────────────
Rb = 1000; Tb = 1/Rb; fc = 5000
fs = 50_000; N = 4096
t = np.arange(N) / fs

# 8 random bits
np.random.seed(7)
n_bits = 8
bits = np.random.randint(0, 2, n_bits)
symbols = 2*bits - 1   # {-1, +1}
n_sps = int(Tb * fs)   # samples per symbol

x = np.zeros(N)
for i, sym in enumerate(symbols):
    x[i*n_sps:(i+1)*n_sps] = sym
bpsk = x * np.cos(2*np.pi*fc*t)

# ── Channel 1: Ideal AWGN (just noise, no distortion) ─────────
SNR_dB = 20
Ps = np.mean(bpsk[:n_bits*n_sps]**2)
Pn = Ps / (10**(SNR_dB/10))
noise = np.sqrt(Pn) * np.random.randn(N)
r_awgn = bpsk + noise

# ── Channel 2: Bandlimited channel (RC lowpass at 3 kHz) ──────
fc_cut = 3000  # Hz (3 kHz cutoff — less than 2×fc)
b, a = butter(2, fc_cut/(fs/2), btype='low')
r_bandlimited = lfilter(b, a, bpsk)

# ── Channel 3: Multipath (one echo at 0.1Tb delay, α=0.5) ─────
delay_samples = int(0.1 * n_sps)
echo_gain = 0.5
r_multipath = bpsk.copy()
r_multipath[delay_samples:] += echo_gain * bpsk[:-delay_samples]

# ── Frequency responses ────────────────────────────────────────
w, H_lp = freqz(b, a, worN=N//2, fs=fs)
# Multipath H(f) = 1 + α·e^(−j2πfτ)
f_all = np.linspace(0, fs/2, N//2)
tau = delay_samples / fs
H_mp = 1 + echo_gain * np.exp(-1j * 2*np.pi*f_all*tau)

print(f"Bandlimited channel 3dB BW: {fc_cut} Hz  (BPSK null-to-null: {2*Rb} Hz)")
print(f"Bandlimited: high freqs attenuated → pulse edges smoothed (ISI)")
print(f"Multipath delay: {delay_samples} samples = {delay_samples/fs*1e3:.2f} ms = {delay_samples/n_sps:.1f}×Tb")

# ── Plot ──────────────────────────────────────────────────────
fig, axes = plt.subplots(3, 2, figsize=(13, 10))

show = slice(0, n_bits*n_sps)

# Row 0: frequency responses
axes[0,0].plot(w, 20*np.log10(np.abs(H_lp)+1e-12), 'r', label='Bandlimited (Butterworth 2nd)')
axes[0,0].axvline(fc_cut, color='r', ls='--', alpha=0.5, label=f'3dB at {fc_cut} Hz')
axes[0,0].set_xlabel('Frequency (Hz)'); axes[0,0].set_ylabel('|H(f)| dB')
axes[0,0].set_title('Bandlimited Channel Frequency Response')
axes[0,0].legend(fontsize=7); axes[0,0].grid(True, alpha=0.3); axes[0,0].set_xlim(0, 15000)

axes[0,1].plot(f_all, 20*np.log10(np.abs(H_mp)+1e-12), 'g', label='Multipath (1 echo)')
axes[0,1].set_xlabel('Frequency (Hz)'); axes[0,1].set_ylabel('|H(f)| dB')
axes[0,1].set_title('Multipath Channel — Frequency-Selective Fading')
axes[0,1].legend(fontsize=7); axes[0,1].grid(True, alpha=0.3); axes[0,1].set_xlim(0, 15000)

# Row 1: transmitted vs received
axes[1,0].plot(t[show]*1e3, bpsk[show], 'b', lw=0.8, label='Transmitted BPSK')
axes[1,0].plot(t[show]*1e3, r_bandlimited[show], 'r', lw=1, alpha=0.8, label='After bandlimited channel')
axes[1,0].set_title('Transmitted vs Bandlimited Channel Output (ISI)')
axes[1,0].set_xlabel('Time (ms)'); axes[1,0].legend(fontsize=7); axes[1,0].grid(True, alpha=0.3)

axes[1,1].plot(t[show]*1e3, bpsk[show], 'b', lw=0.8, label='Transmitted BPSK')
axes[1,1].plot(t[show]*1e3, r_multipath[show], 'g', lw=1, alpha=0.8, label='After multipath channel')
axes[1,1].set_title('Transmitted vs Multipath Channel Output (echoes)')
axes[1,1].set_xlabel('Time (ms)'); axes[1,1].legend(fontsize=7); axes[1,1].grid(True, alpha=0.3)

# Row 2: AWGN channel
axes[2,0].plot(t[show]*1e3, bpsk[show], 'b', lw=0.8, label='Transmitted', alpha=0.6)
axes[2,0].plot(t[show]*1e3, r_awgn[show], 'orange', lw=0.8, alpha=0.8, label=f'AWGN (SNR={SNR_dB}dB)')
axes[2,0].set_title('AWGN Channel (no distortion, only noise)')
axes[2,0].set_xlabel('Time (ms)'); axes[2,0].legend(fontsize=7); axes[2,0].grid(True, alpha=0.3)

# Amplitude responses side by side
axes[2,1].plot(w/1000, np.abs(H_lp), 'r', label='Bandlimited')
axes[2,1].plot(f_all/1000, np.abs(H_mp), 'g', label='Multipath')
axes[2,1].axhline(1, color='b', ls='--', alpha=0.5, label='Ideal (flat)')
axes[2,1].set_xlabel('Frequency (kHz)'); axes[2,1].set_ylabel('|H(f)|')
axes[2,1].set_title('Amplitude Response Comparison'); axes[2,1].set_xlim(0, 15)
axes[2,1].legend(); axes[2,1].grid(True, alpha=0.3)

plt.suptitle('LTI Channel Models: Distortion Effects on BPSK')
plt.tight_layout(); plt.show()`,
    explanation: 'The bandlimited channel (Butterworth LPF) rounds the sharp bit transitions — inter-symbol interference (ISI). The multipath channel creates frequency-selective fading: at frequencies where the direct path and echo are 180° out of phase (constructive/destructive interference), signal power drops or rises. AWGN just adds noise without distortion. Real wireless channels combine all three effects.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Every physical communication channel is an LTI system</strong>{' '}
        (to first approximation). The telephone channel is a bandpass filter (300–3400 Hz). A coaxial cable
        has frequency-dependent loss (H(f) rolls off). Wireless multipath channels have H(f) that varies
        rapidly with frequency. Understanding LTI systems lets engineers model the channel, predict distortion,
        and design receivers that compensate for it.
      </p>
      <p>
        The matched filter (CO3's next topic) is the optimal LTI filter for detecting a known signal in AWGN.
        Its design comes directly from LTI theory: h(t) = s(Tb−t). The entire discipline of equalisation
        (compensating for channel distortion in WiFi, DSL, 5G) is applied LTI theory.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing impulse response and frequency response — h(t) is the time-domain output for δ(t) input. H(f) is its Fourier Transform. Both describe the same system in different domains. h(t) → convolution in time; H(f) → multiplication in frequency.',
    'Assuming all channels are LTI — time-varying channels (Doppler effect in fast-moving receivers) are NOT time-invariant. They require more advanced models (OFDM handles this by treating the channel as approximately constant within each short OFDM symbol). Non-linear amplifiers violate linearity.',
    'Distortionless ≠ no phase shift — a delay of t₀ seconds gives H(f) = e^(−j2πft₀), which has phase ∠H(f) = −2πft₀ (linear in f). This IS distortionless — all frequencies are delayed equally. Distortion occurs when phase is NOT linear (non-constant group delay).',
    'Applying LTI analysis to bandpass signals without care — a BPSK signal is bandpass (energy near fc). A complex baseband representation is often more convenient: multiply by e^(−j2πfct), lowpass filter. The baseband impulse response h_BB(t) ≠ h(t). Getting the baseband/passband conversion wrong causes factor-of-2 errors.',
  ],

  summary: [
    'LTI system: output y(t) = x(t)*h(t) where h(t) is the impulse response.',
    'Frequency domain: Y(f) = H(f)·X(f). Filter output = filter response × input spectrum.',
    'Distortionless: H(f) = K·e^(−j2πft₀). Flat amplitude, linear phase (constant group delay).',
    'AWGN channel: r(t) = s(t) + n(t). No filtering, only noise addition.',
    'Bandlimited channel: cuts high frequencies → rounds pulse edges → inter-symbol interference.',
    'Multipath channel: h(t) = Σαₖδ(t−τₖ). Frequency-selective fading in H(f).',
  ],

  practice: [
    {
      type: 'question',
      text: 'An LTI system has impulse response h(t) = e^(−3t)u(t). (a) Find H(f). (b) Is this system distortionless? (c) Find the output if x(t) = e^(−t)u(t).',
      hint: '(a) H(f) = ∫₀^∞ e^(−3t)e^(−j2πft)dt = 1/(3+j2πf). (b) Not distortionless — |H(f)| = 1/√(9+(2πf)²) is not flat (attenuates high frequencies). Phase ∠H(f) = −arctan(2πf/3) — not linear. (c) X(f) = 1/(1+j2πf). Y(f) = H(f)X(f) = 1/[(3+j2πf)(1+j2πf)]. Partial fractions: y(t) = (1/2)(e^(−t) − e^(−3t))u(t) — the system separates the two exponential rates.',
    },
    {
      type: 'question',
      text: 'A channel has frequency response H(f) = 1 for |f| ≤ 3 kHz, H(f) = 0 otherwise (ideal bandpass). If the input is a BPSK signal at Rb = 5 kbps (fc = 10 kHz), what happens to the output?',
      hint: 'BPSK at Rb=5kbps has null-to-null BW = 2Rb = 10kHz, centred at fc=10kHz. The signal band is roughly 5–15 kHz. The channel passes only DC to 3 kHz — the entire BPSK signal is outside the passband! Output ≈ 0 (complete signal blocking). This would be catastrophic ISI. To transmit 5kbps through a 3kHz channel, you need a more spectrally efficient scheme (e.g., QPSK sends 2 bits/symbol, so Rs=2.5ksps → BW≈5kHz — still doesn\'t fit). With root-raised-cosine shaping, BW ≈ Rb(1+rolloff)/2 ≈ 3kHz might work at Rb≈4kbps.',
    },
    {
      type: 'question',
      text: 'Explain why a multipath channel H(f) = 1 + α·e^(−j2πfτ) causes "frequency-selective fading". At which frequencies does the channel completely cancel the signal?',
      hint: '|H(f)| = |1 + α·e^(−j2πfτ)|. Complete cancellation when 1 + α·e^(−j2πfτ) = 0 → α·e^(−j2πfτ) = −1 → |α|=1 and e^(−j2πfτ) = −1 = e^(jπ). So 2πfτ = π(2k+1) → f = (2k+1)/(2τ) for integers k. At these frequencies, the direct path and echo are exactly 180° out of phase and equal amplitude — they cancel. The spacing between nulls is 1/τ Hz. If τ=0.1ms (100μs echo delay), nulls every 10kHz. The channel is "frequency selective" because it attenuates some frequencies more than others.',
    },
    {
      type: 'task',
      text: 'In Python, design a simple zero-forcing equaliser for a two-tap channel h = [1, 0.5] at Rb=1kbps. Apply the channel to a BPSK signal, then equalise by dividing by H(f) in the frequency domain. Plot before/after equalisation and compute BER improvement.',
      hint: 'h=[1, 0.5, 0, ...] (zero-padded to N). H=fft(h). x_bpsk=generated BPSK. Y_chan=fft(x_bpsk)*H. y_chan=ifft(Y_chan) (received). Zero-forcing: Y_eq=Y_chan/H (where |H|>eps). y_eq=real(ifft(Y_eq)). Demodulate both y_chan and y_eq. Count errors. ZF equaliser removes ISI but can amplify noise at frequencies where H≈0.',
    },
  ],
}

export default function LTISystemsPage() {
  return <FEDFTopicPage content={content} />
}
