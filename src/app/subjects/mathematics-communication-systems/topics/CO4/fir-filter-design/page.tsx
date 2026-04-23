'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'FIR Filter Design',
  subtitle: 'Finite Impulse Response filters — windowing, linear phase, and discrete matched filter implementation',
  co: 'CO4 — Z-Transform & FIR Filters',

  overview: (
    <>
      <p>
        A <strong className="text-white">Finite Impulse Response (FIR)</strong> filter has an impulse response
        h[n] that is non-zero for only a finite number of samples. The output is a weighted sum of current and
        past inputs:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        y[n] = Σₖ₌₀^(M) b_k · x[n−k] &nbsp;&nbsp;&nbsp; (M+1 taps, no feedback)
      </p>
      <p>
        FIR filters are <strong className="text-white">always stable</strong> (all poles at z=0) and can be
        designed to have <strong className="text-white">exactly linear phase</strong> — all frequencies are
        delayed by the same amount (M/2 samples), causing no phase distortion. This makes them ideal for
        communication systems where waveform fidelity matters.
      </p>
      <p>
        The <strong className="text-white">discrete matched filter</strong> for BPSK is an FIR filter with
        coefficients h[n] = s[M−n] (time-reversed signal samples). It maximises SNR at the sampling instant,
        exactly as the continuous matched filter does in CO3.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">FIR vs IIR Comparison</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-2">FIR (Finite IR)</p>
            <div className="text-gray-300 space-y-1">
              <p>✓ Always stable (poles at z=0)</p>
              <p>✓ Exactly linear phase possible</p>
              <p>✓ No feedback — no limit cycles</p>
              <p>✗ High order needed for sharp cutoff</p>
              <p>✗ More multiplications than IIR</p>
              <p className="text-blue-400 mt-1">Use for: matched filters, pulse shaping, audio</p>
            </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
            <p className="text-amber-300 font-bold mb-2">IIR (Infinite IR)</p>
            <div className="text-gray-300 space-y-1">
              <p>✓ Sharp cutoff with low order</p>
              <p>✓ Efficient (fewer multiplications)</p>
              <p>✗ Stability not guaranteed</p>
              <p>✗ Non-linear phase (phase distortion)</p>
              <p>✗ Quantisation can cause oscillations</p>
              <p className="text-amber-400 mt-1">Use for: anti-aliasing, equalisation</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Window Functions for FIR Design</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p><span className="text-cyan-300">Rectangular:</span> Sharpest cutoff, worst sidelobe (−13 dB). Gibbs effect.</p>
          <p><span className="text-cyan-300">Hann:</span> Sidelobe −44 dB. Good general purpose. w[n] = 0.5(1−cos(2πn/M)).</p>
          <p><span className="text-cyan-300">Hamming:</span> Sidelobe −53 dB. w[n] = 0.54−0.46cos(2πn/M).</p>
          <p><span className="text-cyan-300">Blackman:</span> Sidelobe −74 dB. Widest main lobe. Best stopband.</p>
          <p><span className="text-cyan-300">Kaiser:</span> Tunable β parameter — trades main-lobe width vs sidelobe level.</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'FIR filter structure', definition: 'y[n] = Σbₖx[n−k] for k=0..M. The M+1 coefficients bₖ are the impulse response values h[k]. No feedback (no aₖ terms). Implemented as a tapped delay line (shift register). The Z-transform is H(z) = Σbₖz^(−k) — a polynomial in z^(−1).' },
    { term: 'Linear phase condition', definition: 'An FIR filter has linear phase if h[n] = ±h[M−n] (symmetric or anti-symmetric coefficients). The group delay is constant: τ_g = M/2 samples. All frequencies are delayed by the same M/2 samples — no phase distortion. Types I (symmetric, M even) and II (symmetric, M odd) are most common.' },
    { term: 'Window method', definition: 'Start with the ideal (infinite) impulse response h_ideal[n] = sinc(2fcn/fs) for a lowpass filter. Truncate to M+1 points and multiply by a window w[n]: h[n] = h_ideal[n]·w[n]. The window shapes the transition band and sidelobe levels. A longer filter (larger M) gives sharper cutoff.' },
    { term: 'Windowed sinc filter', definition: 'The ideal lowpass filter in discrete time has h_ideal[n] = (2fc/fs)·sinc(2fcn/fs). This is infinite and non-causal. Truncating to M samples and adding delay M/2 gives: h[n] = (2fc/fs)·sinc(2fc(n−M/2)/fs)·w[n]. The cutoff frequency fc determines where |H| drops by half.' },
    { term: 'Discrete matched filter', definition: 'For a BPSK signal sampled at fs with sps samples per bit, the discrete matched filter coefficients are h[n] = s[sps−1−n] for n=0..sps−1 (time-reversed signal). Output peaks at n=sps−1 with value Σs²[k]/fs ≈ Eb. This is the digital implementation of the continuous matched filter h(t) = s(Tb−t).' },
    { term: 'Raised cosine pulse shaping', definition: 'The ideal pulse for bandlimited channels. Spectrum: H_RC(f) = 1 for |f|≤(1−β)/(2Tb), cosine rolloff for (1−β)/(2Tb)≤|f|≤(1+β)/(2Tb), 0 otherwise. β=rolloff factor (0≤β≤1). At β=0: sinc pulse (minimum BW = 1/(2Tb)). At β=1: doubled BW, smoother pulse. Eliminates ISI at sampling instants.' },
    { term: 'Parks-McClellan (Remez) algorithm', definition: 'Optimal equiripple FIR filter design. Minimises the maximum error between desired and actual frequency response (minimax). Produces filters with equal ripple in passband and stopband. More efficient than window method for achieving given specifications. Implemented in scipy.signal.remez.' },
  ],

  code: {
    title: 'FIR Filter Design — Windowed Sinc and Discrete Matched Filter',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import firwin, freqz, lfilter, kaiserord
from numpy.fft import fft, fftshift, fftfreq

# ──────────────────────────────────────────────────────────────
# Part 1: FIR Lowpass Filter via Window Method
# ──────────────────────────────────────────────────────────────
fs = 10_000      # 10 kHz sample rate
fc = 1_500       # cutoff at 1.5 kHz
M  = 64          # filter order (65 taps)

# Design using different windows
h_rect = firwin(M+1, fc, window='boxcar', fs=fs)
h_hann = firwin(M+1, fc, window='hann',   fs=fs)
h_hamm = firwin(M+1, fc, window='hamming',fs=fs)
h_blkm = firwin(M+1, fc, window='blackman',fs=fs)

filters = {
    'Rectangular (−13dB sidelobe)': h_rect,
    'Hann (−44dB sidelobe)':        h_hann,
    'Hamming (−53dB sidelobe)':     h_hamm,
    'Blackman (−74dB sidelobe)':    h_blkm,
}

# Verify linear phase: check symmetry
print("Linear phase check (max asymmetry):")
for name, h in filters.items():
    asymmetry = np.max(np.abs(h - h[::-1]))
    print(f"  {name[:20]}: {asymmetry:.2e}  {'✓' if asymmetry < 1e-12 else '✗'}")

# ──────────────────────────────────────────────────────────────
# Part 2: Discrete Matched Filter for BPSK
# ──────────────────────────────────────────────────────────────
Rb  = 1000; Tb = 1/Rb; fc_bpsk = 3000
fs2 = 20_000; sps = int(Tb * fs2)

# One bit carrier template
t_bit = np.arange(sps) / fs2
carrier = np.cos(2*np.pi*fc_bpsk*t_bit)

# Discrete matched filter: h[n] = s[sps-1-n] = time-reversed carrier
h_mf = carrier[::-1]
print(f"\nMatched filter: {len(h_mf)} taps (= sps = {sps})")

# Generate 5 BPSK bits: [1, 0, 1, 1, 0]
bits  = np.array([1, 0, 1, 1, 0])
syms  = 2*bits - 1
n_total = len(bits) * sps
t_total = np.arange(n_total) / fs2

s_tx = np.zeros(n_total)
for i, sym in enumerate(syms):
    s_tx[i*sps:(i+1)*sps] = sym * carrier

# Add noise (Eb/N0 = 10 dB)
Eb = np.sum(carrier**2) / fs2
N0 = Eb / 10**(10/10)
noise = np.sqrt(N0 * fs2 / 2) * np.random.randn(n_total)
r = s_tx + noise

# Apply matched filter (convolve received with h_mf)
y_mf = lfilter(h_mf, [1.0], r)   # FIR filtering = convolution

# Sample at end of each bit (index i*sps + sps - 1)
sample_idx = np.arange(sps-1, n_total, sps)
z_samples  = y_mf[sample_idx]
bits_hat   = (z_samples > 0).astype(int)
print(f"Transmitted: {bits}")
print(f"Detected:    {bits_hat}")
print(f"Errors:      {np.sum(bits != bits_hat)}/{len(bits)}")

# ──────────────────────────────────────────────────────────────
# Part 3: Plots
# ──────────────────────────────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(15, 8))

# FIR frequency responses
for name, h in filters.items():
    w, H = freqz(h, worN=2048, fs=fs)
    axes[0,0].plot(w, 20*np.log10(np.abs(H)+1e-12), label=name.split('(')[0].strip(), lw=1.2)
axes[0,0].axvline(fc, color='k', ls='--', alpha=0.5)
axes[0,0].set_xlabel('Frequency (Hz)'); axes[0,0].set_ylabel('dB')
axes[0,0].set_title('FIR LPF: Window Comparison')
axes[0,0].legend(fontsize=7); axes[0,0].grid(True, alpha=0.3)
axes[0,0].set_ylim(-100, 5); axes[0,0].set_xlim(0, fs/2)

# Impulse responses
for name, h in list(filters.items())[:2]:
    axes[0,1].plot(h, label=name.split('(')[0].strip(), lw=1.2)
axes[0,1].set_title('Impulse Responses (Rectangular & Hann)')
axes[0,1].set_xlabel('Tap index'); axes[0,1].set_ylabel('h[n]')
axes[0,1].legend(fontsize=8); axes[0,1].grid(True, alpha=0.3)

# Pole-zero of Hamming filter (FIR → all poles at origin)
from scipy.signal import tf2zpk
z_pts, p_pts, _ = tf2zpk(h_hamm, [1.0])
from matplotlib.patches import Circle
ax_pz = axes[0,2]
uc = Circle((0,0), 1, fill=False, color='gray', ls='--', lw=0.8)
ax_pz.add_patch(uc)
ax_pz.scatter(z_pts.real, z_pts.imag, marker='o', s=30, facecolors='none', edgecolors='blue', lw=1.5, label='Zeros')
ax_pz.scatter(p_pts.real, p_pts.imag, marker='x', s=80, c='red', lw=2, label='Poles (at origin)')
ax_pz.set_xlim(-1.5,1.5); ax_pz.set_ylim(-1.5,1.5); ax_pz.set_aspect('equal')
ax_pz.set_title('Pole-Zero: Hamming FIR LPF')
ax_pz.legend(fontsize=7); ax_pz.grid(True, alpha=0.3)

# Matched filter impulse response
axes[1,0].stem(np.arange(len(h_mf)), h_mf, basefmt=' ', markerfmt='b.', linefmt='b-')
axes[1,0].set_title(f'Discrete Matched Filter h[n] ({sps} taps)')
axes[1,0].set_xlabel('n'); axes[1,0].set_ylabel('h[n]')
axes[1,0].grid(True, alpha=0.3)

# BPSK received + MF output
axes[1,1].plot(t_total*1e3, r, 'gray', alpha=0.4, lw=0.5, label='Received (noisy)')
axes[1,1].plot(t_total*1e3, y_mf, 'b', lw=1.2, label='MF output')
for idx in sample_idx:
    axes[1,1].axvline(idx/fs2*1e3, color='r', ls=':', alpha=0.4)
axes[1,1].set_title('Received Signal and Matched Filter Output')
axes[1,1].set_xlabel('Time (ms)'); axes[1,1].legend(fontsize=8); axes[1,1].grid(True, alpha=0.3)

# Sampled MF outputs
colors = ['green' if b==bh else 'red' for b, bh in zip(bits, bits_hat)]
axes[1,2].bar(range(len(bits)), z_samples, color=colors, alpha=0.7)
axes[1,2].axhline(0, color='k', lw=1.5, ls='--')
axes[1,2].set_title('MF Samples at Decision Instants')
axes[1,2].set_xlabel('Bit index'); axes[1,2].set_ylabel('z (correlator output)')
bits_str = [f'b={b}\\ndet={bh}' for b,bh in zip(bits, bits_hat)]
axes[1,2].set_xticks(range(len(bits))); axes[1,2].set_xticklabels(bits_str, fontsize=7)
axes[1,2].grid(True, alpha=0.3)

plt.suptitle('FIR Filter Design and Discrete Matched Filter for BPSK')
plt.tight_layout(); plt.show()`,
    explanation: 'The FIR filter frequency response shows the trade-off between window type and sidelobe rejection. The Blackman window achieves −74 dB sidelobes at the cost of a wider transition band. The discrete matched filter (time-reversed carrier) produces peaks at the sampling instants — positive for bit "1", negative for bit "0". All FIR filters have poles only at z=0 (visible in the pole-zero plot), guaranteeing stability.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">FIR filters are the workhorse of digital communications.</strong>{' '}
        The BPSK matched filter, raised-cosine pulse shaping, anti-aliasing filters in ADCs, and channel
        equalizers are all FIR filters. The guaranteed stability and exact linear phase make FIR the preferred
        choice wherever waveform integrity matters — degrading the pulse shape degrades the BER.
      </p>
      <p>
        In a software-defined radio (SDR), the entire receiver chain — carrier recovery, timing recovery,
        matched filtering, equalisation — is implemented as a cascade of FIR and IIR filters operating on
        digitised samples. Understanding FIR design and the Z-transform connects the mathematical theory to
        practical hardware implementation.
      </p>
    </>
  ),

  commonMistakes: [
    'Off-by-one in filter length — firwin(N, fc) designs N taps (order M=N−1). The group delay is (N−1)/2 samples. Always use odd N for Type I (integer group delay). With even N (Type II), there\'s a zero at f=fs/2, which may not be desired for lowpass.',
    'Forgetting the group delay in matched filter sampling — a causal FIR matched filter with sps taps introduces a delay of sps−1 samples. Sample at n = sps−1 + i×sps (not at n = i×sps). Sampling at the wrong instant loses SNR.',
    'Conflating filter order and number of taps — a filter of order M has M+1 taps (coefficients). MATLAB\'s fir1(M, fc) uses order M → M+1 taps. Python\'s firwin(numtaps, fc) uses the total number of taps → order = numtaps−1. Consistent confusion causes wrong filter lengths.',
    'Using firwin cutoff in Hz without specifying fs — firwin(N, fc) by default expects fc in normalised frequency (0 to 1, where 1=Nyquist). Pass fs=sample_rate to use Hz. Forgetting fs makes the filter cutoff completely wrong.',
  ],

  summary: [
    'FIR: y[n] = Σbₖx[n−k]. No feedback. Impulse response is the coefficient array h[n]=bₙ.',
    'Always stable: all poles at z=0. No risk of instability regardless of coefficients.',
    'Linear phase: symmetric h[n]=h[M−n]. Group delay = M/2 samples (constant — no phase distortion).',
    'Window design: truncate ideal sinc × window function. Longer filter → sharper cutoff.',
    'Discrete matched filter: h[n] = s[M−n] (time-reverse). Peaks at n=M with value ≈Eb.',
    'Window trade-off: sharp cutoff needs wider main lobe (longer filter) for low sidelobes.',
  ],

  practice: [
    {
      type: 'question',
      text: 'Design a 21-tap Hamming-windowed FIR lowpass filter with fs=8kHz, fc=1kHz. (a) State the group delay. (b) Write the formula for the ideal h[n] before windowing. (c) Is this filter linear phase?',
      hint: '(a) Group delay = (M)/2 = 20/2 = 10 samples = 10/8000 = 1.25 ms. (b) h_ideal[n] = (2fc/fs)·sinc(2fc(n−10)/fs) = (2000/8000)·sinc(0.25(n−10)) = 0.25·sinc(0.25(n−10)) for n=0..20. (c) Yes — Hamming window is symmetric w[n]=w[M−n]. Multiplying symmetric h_ideal (centred at M/2=10) by symmetric window preserves symmetry h[n]=h[M−n]. Type I FIR, exactly linear phase.',
    },
    {
      type: 'question',
      text: 'A BPSK system samples at fs=20kHz with Rb=1kHz (sps=20 samples/bit). Design the discrete matched filter. How many taps does it have? At what sample index does the output peak?',
      hint: 'Discrete matched filter has sps=20 taps, with h[n]=s[19−n] for n=0..19 where s[n]=A·cos(2πfc·n/fs) is the sampled carrier. Number of taps = sps = 20. The filter is causal — it must "see" the entire bit before computing the output. For bit i, the output peaks at sample index n = i×sps + (sps−1) = i×20 + 19. The delay is sps−1 = 19 samples. Sample there for the optimal decision.',
    },
    {
      type: 'question',
      text: 'Why do FIR filters require higher order than IIR to achieve the same stopband attenuation? Give a numerical example.',
      hint: 'IIR filters (Butterworth, Chebyshev) use feedback — poles CAN be placed close to the unit circle to create a sharp transition. A 4th-order Butterworth IIR gives −80dB at 2fc. An FIR filter needs approximately order M ≈ (Aₛ − 7.95)/(14.36 × Δf/fs) (Kaiser formula) where Aₛ is stopband attenuation in dB and Δf is transition bandwidth. For Aₛ=80dB, Δf=500Hz, fs=10kHz: M ≈ (80−7.95)/(14.36×0.05) ≈ 72/0.718 ≈ 100 taps. Compared to IIR\'s 4 taps — factor 25× more taps. Trade-off: FIR is always stable and linear phase, IIR is efficient but non-linear phase.',
    },
    {
      type: 'task',
      text: 'In Python, use scipy.signal.firwin to design a 51-tap Hamming FIR lowpass filter at fc=2kHz, fs=10kHz. Plot its impulse response and frequency response. Verify (a) symmetry h[n]=h[50-n], (b) group delay = 25 samples, (c) attenuation at 3kHz > 40dB.',
      hint: 'h = firwin(51, 2000, window="hamming", fs=10000). Symmetry: np.allclose(h, h[::-1]). Group delay: constant 25 for all ω (use scipy.signal.group_delay). Freq response: freqz(h, worN=2048, fs=10000). At 3kHz: 20*log10(|H[3kHz]|). Hamming window gives ~−53dB first sidelobe, so at 3kHz (outside main lobe) attenuation should be > 40dB.',
    },
  ],
}

export default function FIRFilterDesignPage() {
  return <FEDFTopicPage content={content} />
}
