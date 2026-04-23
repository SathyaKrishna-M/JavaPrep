'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Fourier Transform',
  subtitle: 'From periodic to aperiodic — continuous spectrum, transform pairs, and the spectrum of BPSK',
  co: 'CO2 — Fourier Analysis',

  overview: (
    <>
      <p>
        The <strong className="text-white">Fourier Transform</strong> extends Fourier Series to aperiodic
        (non-periodic) signals. As the period T → ∞, the discrete line spectrum becomes a continuous spectrum:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        X(f) = ∫₋∞^∞ x(t)·e^(−j2πft) dt &nbsp;&nbsp;&nbsp; x(t) = ∫₋∞^∞ X(f)·e^(j2πft) df
      </p>
      <p>
        X(f) is the <strong className="text-white">spectrum</strong> of x(t) — a complex-valued function of
        frequency. |X(f)| is the amplitude spectrum; ∠X(f) is the phase spectrum. X(f) tells us how much of
        each frequency is present in the signal.
      </p>
      <p>
        The <strong className="text-white">spectrum of a BPSK signal</strong> (a rectangular pulse of duration
        Tb) is a sinc function: X(f) = A·Tb·sinc(f·Tb). The main lobe has bandwidth 1/Tb = Rb, and nulls occur
        at multiples of 1/Tb. This is the mathematical basis for the null-to-null bandwidth = 2Rb.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Key Transform Pairs</p>
        <div className="space-y-2 text-xs font-mono">
          {[
            { signal: 'Rectangular pulse: rect(t/τ)', transform: 'τ·sinc(fτ)', note: 'BPSK symbol shape' },
            { signal: 'δ(t) — Dirac delta', transform: '1 (flat spectrum)', note: 'Impulse → all freqs equal' },
            { signal: 'e^(−at)u(t), a>0', transform: '1/(a+j2πf)', note: 'Decaying exponential' },
            { signal: 'cos(2πf₀t)', transform: '[δ(f−f₀)+δ(f+f₀)]/2', note: 'Sinusoid → two impulses' },
            { signal: 'Gaussian: e^(−πt²)', transform: 'e^(−πf²)', note: 'Self-dual: same shape' },
          ].map(({ signal, transform, note }) => (
            <div key={signal} className="grid grid-cols-5 gap-2 items-center border-b border-slate-700/50 pb-1">
              <span className="col-span-2 text-blue-300">{signal}</span>
              <span className="text-amber-400 text-center">⟷</span>
              <span className="col-span-2 text-green-300">{transform} <span className="text-gray-500">({note})</span></span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Fourier Transform Properties</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-gray-300">
          <p><span className="text-cyan-400">Linearity:</span> ax+by ⟷ aX+bY</p>
          <p><span className="text-cyan-400">Time shift:</span> x(t−t₀) ⟷ X(f)e^(−j2πft₀)</p>
          <p><span className="text-cyan-400">Freq shift:</span> x(t)e^(j2πf₀t) ⟷ X(f−f₀)</p>
          <p><span className="text-cyan-400">Scaling:</span> x(at) ⟷ |1/a|X(f/a)</p>
          <p><span className="text-cyan-400">Duality:</span> X(t) ⟷ x(−f)</p>
          <p><span className="text-cyan-400">Convolution:</span> x*h ⟷ X·H</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Fourier Transform X(f)', definition: 'X(f) = ∫₋∞^∞ x(t)e^(−j2πft)dt. A complex-valued function representing the continuous spectrum of an aperiodic signal. X(f) at frequency f gives the amplitude and phase of the sinusoidal component at that frequency.' },
    { term: 'Inverse Fourier Transform', definition: 'x(t) = ∫₋∞^∞ X(f)e^(j2πft)df. Reconstructs the time-domain signal from its spectrum. The transform pair is a lossless representation — all information is preserved in either domain.' },
    { term: 'sinc function', definition: 'sinc(x) = sin(πx)/(πx). The Fourier Transform of a rectangular pulse rect(t/τ) is τ·sinc(fτ). First null at |f| = 1/τ. The spectrum of a BPSK bit pulse (duration Tb) is A·Tb·sinc(f·Tb) — first null at f = 1/Tb = Rb.' },
    { term: 'Bandwidth', definition: 'A signal\'s bandwidth is the range of frequencies where significant spectral content exists. Null-to-null BW of a sinc: 2/τ = 2Rb for BPSK. 3dB bandwidth: 0.886/τ. Absolute bandwidth is infinite (sinc never reaches zero permanently).' },
    { term: 'Frequency shifting property', definition: 'Multiplying x(t) by e^(j2πf₀t) shifts its spectrum by f₀: F{x(t)e^(j2πf₀t)} = X(f−f₀). This is the mathematical description of modulation: multiplying a baseband pulse by a carrier cos(2πfct) shifts its spectrum to ±fc.' },
    { term: 'BPSK spectrum', definition: 'A BPSK signal is a rectangular pulse multiplied by ±cos(2πfct). Spectrum: X_BPSK(f) = (A·Tb/2)[sinc((f−fc)Tb) + sinc((f+fc)Tb)]. Two sinc lobes centred at ±fc. Main lobe width = 2/Tb = 2Rb. This is why bandwidth ≈ 2×bit rate.' },
    { term: 'Duality property', definition: 'If x(t) ↔ X(f), then X(t) ↔ x(−f). A Gaussian pulse is its own Fourier Transform. The sinc function in time has a rectangular spectrum — this leads to the ideal "brick wall" bandpass filter concept.' },
  ],

  code: {
    title: 'Fourier Transform of BPSK Pulse — Spectrum and Bandwidth',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from numpy.fft import fft, fftfreq, fftshift

# ── BPSK bit pulse parameters ─────────────────────────────────
Rb = 1000        # bit rate (1 kbps)
Tb = 1/Rb        # bit period = 1 ms
fc = 5000        # carrier (5 kHz)
A  = 1.0

# High-resolution time vector (zero-padded for fine freq resolution)
fs = 100_000     # 100 kHz sample rate
N  = 8192        # FFT size (power of 2 for speed)
t  = np.arange(N) / fs

# ── Baseband rectangular pulse (one BPSK "1" bit) ────────────
pulse = np.zeros(N)
n_bit = int(Tb * fs)           # samples per bit
pulse[:n_bit] = A              # rectangular pulse from t=0 to Tb

# BPSK signal: pulse × carrier
bpsk = pulse * np.cos(2*np.pi*fc*t)

# ── Fourier Transform ─────────────────────────────────────────
# Baseband pulse
P = fftshift(fft(pulse)) / fs         # scale by 1/fs → units of V/Hz
f = fftshift(fftfreq(N, 1/fs))

# BPSK signal spectrum
S = fftshift(fft(bpsk)) / fs
P_magnitude = np.abs(P)
S_magnitude = np.abs(S)

# Theoretical sinc for baseband pulse
f_pos = f[f >= 0]
sinc_theory = A * Tb * np.abs(np.sinc(f_pos * Tb))   # np.sinc = sin(πx)/(πx)

print(f"Bit rate Rb = {Rb} Hz")
print(f"Theoretical first null of baseband sinc: ±{1/Tb:.0f} Hz")
print(f"Theoretical null-to-null BW of BPSK: {2/Tb:.0f} Hz")
print(f"BPSK main lobe centered at ±{fc} Hz")

# ── Locate first null in numerical spectrum ────────────────────
# Baseband: first null near 1/Tb = 1000 Hz
pos_mask = f > 10   # avoid DC
P_pos = P_magnitude[f > 10]
f_pos_all = f[f > 10]
# Find first local minimum (null crossing)
diff_P = np.diff(P_pos)
sign_changes = np.where(np.diff(np.sign(diff_P)))[0]
if len(sign_changes) > 0:
    first_null_idx = sign_changes[0]
    print(f"Numerical first null (baseband): {f_pos_all[first_null_idx]:.1f} Hz  (expect {1/Tb} Hz)")

# ── Plot ──────────────────────────────────────────────────────
fig, axes = plt.subplots(2, 2, figsize=(13, 8))

# Time: baseband pulse
axes[0,0].plot(t[:2*n_bit]*1e3, pulse[:2*n_bit], 'b')
axes[0,0].set_title('Baseband Pulse x(t)')
axes[0,0].set_xlabel('Time (ms)'); axes[0,0].set_ylabel('Amplitude')
axes[0,0].axvline(Tb*1e3, color='r', ls='--', alpha=0.5, label='t=Tb')
axes[0,0].legend(); axes[0,0].grid(True, alpha=0.3)

# Spectrum: baseband
f_show = (f >= 0) & (f < 5000)
axes[0,1].plot(f[f_show], P_magnitude[f_show], 'b', label='|X(f)| numerical')
f_th_mask = (f_pos >= 0) & (f_pos < 5000)
axes[0,1].plot(f_pos[f_th_mask], sinc_theory[f_th_mask], 'r--', alpha=0.7, label='A·Tb·|sinc(fTb)| theory')
axes[0,1].axvline(1/Tb, color='g', ls=':', label=f'Null at {1/Tb:.0f} Hz')
axes[0,1].set_title('Baseband Spectrum |X(f)|')
axes[0,1].set_xlabel('Frequency (Hz)'); axes[0,1].legend(fontsize=7); axes[0,1].grid(True, alpha=0.3)

# Time: BPSK signal
axes[1,0].plot(t[:2*n_bit]*1e3, bpsk[:2*n_bit], 'b')
axes[1,0].set_title('BPSK Signal s(t) = x(t)·cos(2πfct)')
axes[1,0].set_xlabel('Time (ms)'); axes[1,0].set_ylabel('Amplitude')
axes[1,0].grid(True, alpha=0.3)

# Spectrum: BPSK
f_bpsk_show = (f > 0) & (f < 10000)
axes[1,1].plot(f[f_bpsk_show], S_magnitude[f_bpsk_show], 'b')
axes[1,1].axvline(fc - 1/Tb, color='r', ls=':', alpha=0.7, label=f'Null at fc−1/Tb={fc-int(1/Tb)} Hz')
axes[1,1].axvline(fc + 1/Tb, color='r', ls=':', alpha=0.7, label=f'Null at fc+1/Tb={fc+int(1/Tb)} Hz')
axes[1,1].set_title('BPSK Spectrum |S(f)| — sinc lobe centred at fc')
axes[1,1].set_xlabel('Frequency (Hz)'); axes[1,1].legend(fontsize=7); axes[1,1].grid(True, alpha=0.3)

plt.suptitle(f'Fourier Transform: BPSK Pulse Spectrum (Rb={Rb}bps, fc={fc}Hz)')
plt.tight_layout(); plt.show()`,
    explanation: 'The rectangular pulse spectrum is a sinc — first null at f=1/Tb=Rb. Modulating by cos(2πfct) shifts the sinc to ±fc (frequency shifting property). The BPSK spectrum has two sinc lobes centred at ±fc with null-to-null bandwidth 2Rb. NumPy\'s fftshift centres zero-frequency in the middle of the array for a two-sided spectrum plot.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">The Fourier Transform is the bridge between time-domain signals and frequency-domain design.</strong>{' '}
        Channel bandwidth is specified in frequency (Hz), but data is transmitted in time (bits/second).
        The sinc spectrum of BPSK directly shows why a 1 Mbps BPSK signal needs approximately 2 MHz of bandwidth
        (null-to-null). Every filter, every channel model, every BER derivation involves the Fourier Transform.
      </p>
      <p>
        The frequency-shifting property mathematically explains modulation: multiplying by a carrier shifts the
        baseband spectrum to the carrier frequency. The convolution-multiplication duality (CO2) then explains
        why passing through a filter multiplies the spectrum by the filter's frequency response H(f).
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing the sinc function definitions — np.sinc(x) = sin(πx)/(πx) (normalised sinc). Math textbooks sometimes define sinc(x) = sin(x)/x (unnormalised). The normalised sinc has nulls at integer x; unnormalised has nulls at x = nπ. Always check which convention is being used.',
    'Forgetting the scaling in the FFT — np.fft.fft() returns a sum (discrete approximation), not an integral. To get physical units (V/Hz), divide by the sample rate fs. To compare with the continuous Fourier Transform, scale by dt = 1/fs.',
    'Treating bandwidth as null-to-null — null-to-null bandwidth (2Rb for BPSK) is common in textbooks but includes only the main lobe. Actual systems must also handle sidelobes. 3dB bandwidth (0.886Rb) and 99% power bandwidth (10.2Rb) are more useful for system design.',
    'Applying the time-shift property wrongly — a time delay of t₀ multiplies the spectrum by e^(−j2πft₀), not e^(+j2πft₀). The sign matters: negative exponent for time delay (causal), positive for time advance.',
  ],

  summary: [
    'Fourier Transform: X(f) = ∫x(t)e^(−j2πft)dt. Maps time → frequency continuously.',
    'Rectangular pulse ↔ sinc: rect(t/τ) ↔ τ·sinc(fτ). First null at f = 1/τ.',
    'BPSK spectrum: sinc lobe at ±fc, null-to-null BW = 2Rb = 2/Tb.',
    'Frequency shift: multiplying by carrier e^(j2πf₀t) shifts spectrum by f₀.',
    'Convolution in time ↔ multiplication in frequency (and vice versa).',
    'Time compression → spectral expansion: x(at) ↔ (1/|a|)X(f/a).',
  ],

  practice: [
    {
      type: 'question',
      text: 'A rectangular pulse has amplitude A=2V and duration τ=0.5ms. Find (a) the Fourier Transform X(f), (b) the first null frequency, (c) the null-to-null bandwidth.',
      hint: '(a) X(f) = A·τ·sinc(fτ) = 2 × 0.5×10⁻³ × sinc(f × 0.5×10⁻³) = 10⁻³·sinc(f/2000). (b) First null: fτ = 1 → f_null = 1/τ = 1/0.5ms = 2000 Hz = 2 kHz. (c) Null-to-null BW = 2 × f_null = 2 × 2000 = 4 kHz (double-sided, or 2 kHz one-sided). If this were a BPSK bit at Rb = 1/τ = 2 kbps, the null-to-null BW = 2Rb = 4 kHz ✓.',
    },
    {
      type: 'question',
      text: 'Prove using the frequency shifting property that the BPSK signal s(t) = x(t)·cos(2πfct) has spectrum S(f) = [X(f−fc) + X(f+fc)]/2, where X(f) is the spectrum of the baseband pulse x(t).',
      hint: 'cos(2πfct) = [e^(j2πfct) + e^(−j2πfct)]/2 (Euler\'s formula). So s(t) = x(t)·[e^(j2πfct) + e^(−j2πfct)]/2. Take Fourier Transform of each term: F{x(t)e^(j2πfct)} = X(f−fc) (frequency shift property, shift right). F{x(t)e^(−j2πfct)} = X(f+fc) (shift left). Therefore S(f) = [X(f−fc) + X(f+fc)]/2. The factor 1/2 halves the amplitude — the energy splits between the two sidebands.',
    },
    {
      type: 'question',
      text: 'A signal x(t) has bandwidth B Hz (all energy within [−B, B]). If you compress x(t) to x(2t) (half the duration), what happens to the bandwidth?',
      hint: 'Scaling property: x(at) ↔ (1/|a|)X(f/a). For x(2t): a=2, so transform is (1/2)X(f/2). The argument f/2 means the spectrum is stretched by 2 — bandwidth doubles to 2B Hz. Compressed in time → expanded in frequency. This is the time-bandwidth duality: if you transmit bits faster (compress Tb → Tb/2, so Rb doubles), the bandwidth requirement doubles too. You cannot cheat — faster data rate always needs more bandwidth.',
    },
    {
      type: 'task',
      text: 'In Python, compute and plot the magnitude spectrum of a Gaussian pulse x(t) = e^(−t²/(2σ²)) for σ=1ms using FFT. Overlay the theoretical Fourier Transform (which is also Gaussian). Verify the time-bandwidth product σ_t × σ_f = 1/(4π).',
      hint: 'fs=100kHz, N=8192. t=np.arange(N)/fs - N/(2*fs) (centre at 0). sigma=1e-3. x=np.exp(-t**2/(2*sigma**2)). X=fftshift(fft(ifftshift(x)))/fs. f=fftshift(fftfreq(N,1/fs)). Theoretical: X_th=sigma*np.sqrt(2*np.pi)*np.exp(-2*np.pi**2*f**2*sigma**2). Plot |X| vs X_th. Time std = sigma, frequency std sigma_f = 1/(2*pi*sigma). Product = 1/(2*pi) ≈ 0.159.',
    },
  ],
}

export default function FourierTransformPage() {
  return <FEDFTopicPage content={content} />
}
