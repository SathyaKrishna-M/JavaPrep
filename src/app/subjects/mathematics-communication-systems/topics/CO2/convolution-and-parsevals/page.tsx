'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Convolution & Parseval\'s Theorem',
  subtitle: 'Convolution in time, multiplication in frequency, energy spectral density, and bandwidth calculations',
  co: 'CO2 — Fourier Analysis',

  overview: (
    <>
      <p>
        <strong className="text-white">Convolution</strong> of two signals x(t) and h(t) produces the output
        of an LTI system with impulse response h(t) when driven by input x(t):
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        y(t) = (x * h)(t) = ∫₋∞^∞ x(τ)·h(t−τ) dτ
      </p>
      <p>
        The <strong className="text-white">convolution theorem</strong> states that convolution in the time
        domain is equivalent to multiplication in the frequency domain: Y(f) = X(f)·H(f). This is the most
        important property for designing filters — instead of computing integrals, just multiply spectra.
      </p>
      <p>
        <strong className="text-white">Parseval's theorem</strong> connects signal energy in time and frequency:
        E = ∫|x(t)|²dt = ∫|X(f)|²df. The integrand |X(f)|² is the{' '}
        <strong className="text-white">energy spectral density (ESD)</strong> — energy per unit bandwidth.
        For periodic signals, the power version is P = Σ|cₙ|².
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Convolution Theorem — Duality</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-2">Time ↔ Frequency</p>
            <p className="font-mono text-gray-300">x(t) * h(t)  ↔  X(f) · H(f)</p>
            <p className="font-mono text-gray-300 mt-1">x(t) · h(t)  ↔  X(f) * H(f)</p>
            <p className="text-gray-400 mt-2">Convolution in one domain = multiplication in the other</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
            <p className="text-amber-300 font-bold mb-2">System Output</p>
            <p className="font-mono text-gray-300">Y(f) = X(f) · H(f)</p>
            <p className="text-gray-400 mt-1">Filter design: choose H(f) to shape the output spectrum. Lowpass filter: H(f)=1 for |f|≤B, 0 otherwise.</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Parseval's Theorem — Energy in Time = Energy in Frequency</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p>E = ∫₋∞^∞ |x(t)|² dt = ∫₋∞^∞ |X(f)|² df</p>
          <p className="text-amber-300">Energy spectral density: Ψ(f) = |X(f)|² &nbsp; [units: J/Hz = V²·s/Hz]</p>
          <p>Energy in band [f₁, f₂]: E_band = ∫_f₁^f₂ |X(f)|² df</p>
          <p className="text-cyan-300 mt-1">BPSK Eb = ∫₋∞^∞ |X_BPSK(f)|² df = A²·Tb/2 ✓</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Convolution (x * h)(t)', definition: '(x * h)(t) = ∫x(τ)h(t−τ)dτ. Slides h(t) across x(t), computing overlap integrals. Commutative: x*h = h*x. Associative: (x*h)*g = x*(h*g). Distributive over addition. The output of an LTI system to any input x(t) is the convolution of x(t) with the system\'s impulse response h(t).' },
    { term: 'Convolution theorem', definition: 'F{x(t) * h(t)} = X(f) · H(f). Convolution in time → pointwise multiplication in frequency. This transforms the integral computation into simple algebra in frequency domain. The dual: F{x(t) · h(t)} = X(f) * H(f) (multiplication in time → convolution in frequency).' },
    { term: 'Impulse response h(t)', definition: 'The output of an LTI system when the input is a Dirac delta δ(t). Since F{δ(t)} = 1, the system output for delta input is F{h(t)} = H(f). H(f) is the frequency response (transfer function). The system multiplies the input spectrum by H(f): Y(f) = H(f)·X(f).' },
    { term: 'Energy spectral density Ψ(f)', definition: 'Ψ(f) = |X(f)|² [J/Hz]. The distribution of signal energy across frequency. The area under Ψ(f) from −∞ to ∞ equals total signal energy E. The area from f₁ to f₂ gives energy in that band. Used to define meaningful bandwidth (e.g., 90% energy bandwidth).' },
    { term: 'Parseval\'s theorem', definition: 'E = ∫|x(t)|²dt = ∫|X(f)|²df. Powerful check: compute energy in time domain, then verify it equals the integral of the ESD in frequency domain. For BPSK: Eb = A²Tb/2 (time domain) = ∫(ATb)²sinc²(fTb)df/2 (frequency domain).' },
    { term: 'Bandwidth via energy', definition: 'B_90% bandwidth: smallest band [−B, B] containing 90% of signal energy. B_90% for sinc spectrum ≈ 0.85/Tb. Better than null-to-null bandwidth for comparing modulation schemes under the same power constraint.' },
    { term: 'Cross-correlation vs convolution', definition: 'Convolution: (x*h)(t) = ∫x(τ)h(t−τ)dτ — h is flipped and shifted. Cross-correlation: R_xh(t) = ∫x(τ)h(τ+t)dτ — h is only shifted, not flipped. For the matched filter (CO3), we need cross-correlation with the template signal. R_xx(t) = auto-correlation.' },
  ],

  code: {
    title: 'Convolution, Channel Filtering, and Parseval Verification',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from numpy.fft import fft, ifft, fftfreq, fftshift

# ── BPSK pulse ────────────────────────────────────────────────
Rb = 1000; Tb = 1/Rb
fs = 50_000; N = 4096
t = np.arange(N) / fs
dt = 1/fs

# Baseband rectangular bit pulse (one bit "1")
n_bit = int(Tb * fs)
x = np.zeros(N)
x[:n_bit] = 1.0

# ── Energy via Parseval's theorem ────────────────────────────
E_time = np.sum(x**2) * dt
X = fft(x) / fs                  # scale for physical units
f = fftfreq(N, 1/fs)
E_freq = np.sum(np.abs(X)**2) * (fs/N)   # df = fs/N
print(f"Energy (time domain):  E = {E_time:.8f} J")
print(f"Energy (Parseval):     E = {E_freq:.8f} J")
print(f"Theoretical A²Tb/2:    E = {1.0**2 * Tb / 2:.8f} J")

# ── Channel filter: ideal lowpass with BW = 1.5*Rb ───────────
BW = 1.5 * Rb    # filter passes DC to 1.5*Rb Hz
H = np.where(np.abs(f) <= BW, 1.0, 0.0)   # brick-wall LPF

Y = fft(x) * (H * fs)   # multiply spectra: Y(f) = H(f)·X(f)*fs (undo scaling)
# Actually, let's work cleanly:
X_raw = fft(x)                   # raw FFT (no physical scaling)
Y_raw = X_raw * H                # apply filter in frequency domain
y = np.real(ifft(Y_raw))        # back to time domain (= convolution in time)

# ── Convolution via direct integral ──────────────────────────
# Matched filter (correlate with template)
template = np.zeros(N)
template[:n_bit] = 1.0   # same shape as input bit
# Cross-correlation = convolution with time-reversed template
# For matched filter: h(t) = s(Tb - t) — time reverse of signal
h_mf = template[::-1]           # time-reverse
H_mf = fft(h_mf)
Y_mf_raw = fft(x) * H_mf
y_mf = np.real(ifft(Y_mf_raw))  # matched filter output (triangular peak)

print(f"\nFiltered pulse peak at: {np.argmax(y_mf)/fs*1e3:.2f} ms (expect {Tb*1e3:.1f} ms)")
print(f"Matched filter peak value: {np.max(y_mf):.4f} (expect {n_bit/fs:.6f} = Tb/{int(fs/n_bit)} ... ≈ energy)")

# ── Plot ──────────────────────────────────────────────────────
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# Original pulse
axes[0,0].plot(t[:3*n_bit]*1e3, x[:3*n_bit], 'b', lw=2)
axes[0,0].set_title('Input: Rectangular Bit Pulse')
axes[0,0].set_xlabel('Time (ms)'); axes[0,0].set_ylabel('Amplitude')
axes[0,0].axvline(Tb*1e3, color='r', ls='--', alpha=0.5, label='t=Tb')
axes[0,0].legend(); axes[0,0].grid(True, alpha=0.3)

# Filtered output
axes[0,1].plot(t[:3*n_bit]*1e3, x[:3*n_bit], 'b', alpha=0.4, label='Original')
axes[0,1].plot(t[:3*n_bit]*1e3, y[:3*n_bit], 'r', lw=2, label=f'After LPF (BW={BW}Hz)')
axes[0,1].set_title(f'Lowpass Filtered: BW = 1.5Rb = {BW} Hz')
axes[0,1].set_xlabel('Time (ms)'); axes[0,1].legend(); axes[0,1].grid(True, alpha=0.3)

# Energy spectral density
f_show = fftshift(f)
ESD = fftshift(np.abs(fft(x)/fs)**2)   # |X(f)|²
axes[1,0].plot(f_show, ESD, 'b')
axes[1,0].set_xlim(-5*Rb, 5*Rb)
axes[1,0].axvline(1/Tb, color='r', ls='--', alpha=0.7, label=f'Null at {int(1/Tb)} Hz')
axes[1,0].set_title('Energy Spectral Density |X(f)|²')
axes[1,0].set_xlabel('Frequency (Hz)'); axes[1,0].legend(); axes[1,0].grid(True, alpha=0.3)

# Matched filter output
axes[1,1].plot(t[:3*n_bit]*1e3, y_mf[:3*n_bit], 'g', lw=2)
axes[1,1].set_title('Matched Filter Output (cross-correlation)')
axes[1,1].set_xlabel('Time (ms)'); axes[1,1].set_ylabel('Amplitude')
axes[1,1].axvline(Tb*1e3, color='r', ls='--', alpha=0.7, label='Peak at t=Tb')
axes[1,1].legend(); axes[1,1].grid(True, alpha=0.3)

plt.suptitle("Convolution, Filtering, and Energy Spectral Density")
plt.tight_layout(); plt.show()`,
    explanation: 'Parseval\'s theorem is verified numerically: energy computed via time-domain sum equals energy computed via frequency-domain integral of |X(f)|². The lowpass filter (brick-wall in frequency domain = multiplication by H(f)) is equivalent to convolution with a sinc in the time domain. The matched filter output is a triangular peak — maximum SNR at the sampling instant t=Tb.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">The convolution theorem makes filter design tractable.</strong>{' '}
        Without it, filtering requires computing the integral (x*h)(t) = ∫x(τ)h(t−τ)dτ for every output
        sample — quadratic complexity. With it, just compute FFT(x), multiply by H(f), and IFFT — linearithmic
        complexity. Every real-time digital filter (audio EQ, channel equaliser, radar processor) uses this principle.
      </p>
      <p>
        Parseval's theorem connects the physical (energy, power) to the mathematical (spectral coefficients).
        When a system design specifies "99% of signal energy within 10 kHz bandwidth," engineers use the
        energy spectral density to find that bandwidth. The BPSK energy per bit Eb appears directly in the BER
        formula — Parseval connects Eb to the signal's spectral shape.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing convolution and cross-correlation — convolution flips h before sliding: ∫x(τ)h(t−τ)dτ. Cross-correlation does not flip: ∫x(τ)h(τ+t)dτ. The matched filter uses cross-correlation (template slides over signal). In numpy: np.convolve flips; np.correlate does not. For matched filtering, use correlate or convolve with time-reversed template.',
    'FFT scaling errors — np.fft.fft() does not divide by N or scale by dt. To approximate the continuous Fourier Transform integral ∫x(t)e^(−j2πft)dt ≈ Σx[n]e^(−j2πfnΔt)·Δt, you must multiply the FFT output by dt = 1/fs. Missing this scaling factor gives wrong energy calculations.',
    'Applying the convolution theorem to periodic signals — the standard convolution theorem assumes aperiodic signals. For periodic DFTs, use circular convolution (which is what FFT-based multiplication gives). For linear (aperiodic) convolution via FFT, zero-pad both signals to length ≥ N₁+N₂−1 before taking FFT.',
    'Energy bandwidth vs null-to-null bandwidth — students often quote null-to-null BW = 2Rb for BPSK and stop there. In practice, the 99% energy bandwidth of BPSK is ≈10Rb (because sinc sidelobes carry significant energy). This is why practical systems use pulse shaping (raised cosine) to confine energy.',
  ],

  summary: [
    'Convolution: y(t) = (x*h)(t) = ∫x(τ)h(t−τ)dτ. LTI system output for input x(t) with impulse response h(t).',
    'Convolution theorem: x(t)*h(t) ↔ X(f)·H(f). Time convolution = frequency multiplication.',
    'Filter output in frequency: Y(f) = H(f)·X(f). Design filter by shaping H(f).',
    'Parseval\'s theorem: E = ∫|x(t)|²dt = ∫|X(f)|²df. Energy is the same in both domains.',
    'Energy spectral density: Ψ(f) = |X(f)|² [J/Hz]. Integral over band = energy in that band.',
    'Matched filter: h(t) = s(Tb−t). Maximises SNR at sampling instant. Output is autocorrelation of s(t).',
  ],

  practice: [
    {
      type: 'question',
      text: 'Two signals: x(t) = e^(−2t)u(t) and h(t) = e^(−3t)u(t). Find the convolution y(t) = x(t)*h(t) using the Fourier Transform approach.',
      hint: 'X(f) = 1/(2+j2πf). H(f) = 1/(3+j2πf). Y(f) = X(f)·H(f) = 1/[(2+j2πf)(3+j2πf)]. Partial fractions: 1/[(2+j2πf)(3+j2πf)] = A/(2+j2πf) + B/(3+j2πf). Solve: A(3+j2πf)+B(2+j2πf)=1. Set j2πf=−2: A(1)=1→A=1. Set j2πf=−3: B(−1)=1→B=−1. So Y(f)=1/(2+j2πf)−1/(3+j2πf). IFFT: y(t) = (e^(−2t)−e^(−3t))u(t). Check: at t=0: y=0 ✓. At t→∞: y→0 ✓.',
    },
    {
      type: 'question',
      text: 'A BPSK signal has bit period Tb=1ms, amplitude A=2V. Using Parseval\'s theorem, verify that Eb = A²Tb/2 = 2×10⁻³ J.',
      hint: 'X(f) = A·Tb·sinc(f·Tb) for the baseband pulse. ESD: |X(f)|² = A²Tb²·sinc²(fTb). E = ∫₋∞^∞ |X(f)|²df = A²Tb²∫sinc²(fTb)df. Substitution u=fTb, du=Tbdf: E = A²Tb²·(1/Tb)∫sinc²(u)du = A²Tb·∫sinc²(u)du. Known integral: ∫₋∞^∞ sinc²(u)du = 1. Therefore E = A²Tb = 4×10⁻³ J. But wait — this is the full pulse energy. For BPSK s(t)=A·cos(2πfct) over [0,Tb]: Eb = A²Tb/2 = 2×10⁻³ J. The 1/2 comes from the carrier: ∫cos²dt = Tb/2.',
    },
    {
      type: 'question',
      text: 'What is the output of a matched filter for a BPSK rectangular pulse? Describe the shape and the optimal sampling time.',
      hint: 'Matched filter h(t) = s(Tb−t) — time-reverse of the signal s(t) = A·cos(2πfc(Tb−t)) reversed = A·cos(2πfct) (cosine is even, so time-reverse of cosine = cosine — same signal!). Output y(t) = s(t)*h(t) = autocorrelation of s(t). For a rectangular pulse convolved with itself: output is a triangular shape in the envelope, oscillating at fc, peaking at t=Tb. The peak value is the bit energy Eb. Sample at t=Tb: maximum SNR. Decision: if y(Tb) > 0 → bit "1", < 0 → bit "0".',
    },
    {
      type: 'task',
      text: 'In Python, use FFT-based convolution (multiply in frequency domain) to compute the output of a 3rd-order Butterworth lowpass filter (cutoff 2kHz) applied to a BPSK signal at 1kbps. Compare with scipy.signal.lfilter result.',
      hint: 'from scipy.signal import butter, freqz, lfilter. b, a = butter(3, 2000/(fs/2), btype="low"). w, H = freqz(b, a, worN=N, fs=fs). Pad BPSK signal and H to same length. Y_fft = fft(bpsk) * H. y_fft = np.real(ifft(Y_fft)). y_scipy = lfilter(b, a, bpsk). Plot both — they should nearly match (FFT method gives linear convolution if zero-padded correctly; lfilter uses IIR which may have edge effects).',
    },
  ],
}

export default function ConvolutionAndParsevalPage() {
  return <FEDFTopicPage content={content} />
}
