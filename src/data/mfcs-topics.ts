export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  href: string
  co?: string
}

const base = '/subjects/mathematics-communication-systems/topics'

export const mfcsTopics: Topic[] = [
  // ── CO1 — Signal Representation ──────────────────────────────────────────────
  {
    id: 'sinusoids-and-phasors',
    title: '1. Sinusoids & Phasors',
    description: 'Sinusoid parameters (amplitude, frequency, phase), superposition of sinusoids, phasor notation, Euler\'s formula',
    icon: '〰️',
    href: `${base}/CO1/sinusoids-and-phasors`,
    co: 'CO1',
  },
  {
    id: 'signal-energy-and-power',
    title: '2. Signal Energy & Power',
    description: 'Energy vs power signals, instantaneous and average power, RMS value, energy of a sinusoid over a period',
    icon: '⚡',
    href: `${base}/CO1/signal-energy-and-power`,
    co: 'CO1',
  },
  {
    id: 'bpsk-waveform-math',
    title: '3. BPSK Waveform Mathematics',
    description: 'Binary Phase Shift Keying, mathematical representation s(t) = A·cos(2πfct + φ), constellation diagram, bit mapping',
    icon: '📡',
    href: `${base}/CO1/bpsk-waveform-math`,
    co: 'CO1',
  },

  // ── CO2 — Fourier Analysis ────────────────────────────────────────────────────
  {
    id: 'fourier-series',
    title: '4. Fourier Series',
    description: 'Fourier series representation of periodic signals, computing Fourier coefficients (aₙ, bₙ, cₙ), line spectrum, symmetry conditions',
    icon: '🌊',
    href: `${base}/CO2/fourier-series`,
    co: 'CO2',
  },
  {
    id: 'fourier-transform',
    title: '5. Fourier Transform',
    description: 'Fourier Transform definition and inverse, transform pairs, spectrum magnitude and phase, spectrum of a BPSK signal',
    icon: '🔁',
    href: `${base}/CO2/fourier-transform`,
    co: 'CO2',
  },
  {
    id: 'convolution-and-parsevals',
    title: '6. Convolution & Parseval\'s Theorem',
    description: 'Convolution theorem (multiplication in frequency ↔ convolution in time), Parseval\'s theorem, energy spectral density',
    icon: '✳️',
    href: `${base}/CO2/convolution-and-parsevals`,
    co: 'CO2',
  },

  // ── CO3 — LTI Systems & Matched Filters ──────────────────────────────────────
  {
    id: 'lti-systems',
    title: '7. LTI Systems & Impulse Response',
    description: 'Linearity and time-invariance, impulse response h(t), output via convolution y(t) = x(t)*h(t), frequency response H(f)',
    icon: '🔧',
    href: `${base}/CO3/lti-systems`,
    co: 'CO3',
  },
  {
    id: 'matched-filters',
    title: '8. Matched Filters',
    description: 'Matched filter derivation, SNR maximisation, correlation receiver, channel distortion and equalization',
    icon: '🎯',
    href: `${base}/CO3/matched-filters`,
    co: 'CO3',
  },

  // ── CO4 — Z-Transform & FIR Filters ──────────────────────────────────────────
  {
    id: 'z-transform',
    title: '9. Z-Transform',
    description: 'Z-transform definition, region of convergence, common transform pairs, poles & zeros, relationship to DTFT',
    icon: '🔢',
    href: `${base}/CO4/z-transform`,
    co: 'CO4',
  },
  {
    id: 'fir-filter-design',
    title: '10. FIR Filter Design',
    description: 'FIR filter structure, discrete matched filter, windowing methods (rectangular, Hamming, Hann), frequency response',
    icon: '🏗️',
    href: `${base}/CO4/fir-filter-design`,
    co: 'CO4',
  },

  // ── CO5 — Probability & BER Analysis ─────────────────────────────────────────
  {
    id: 'probability-and-noise',
    title: '11. Probability & Noise Models',
    description: 'Gaussian (AWGN) noise model, noise power spectral density N₀/2, Q-function definition and properties',
    icon: '📊',
    href: `${base}/CO5/probability-and-noise`,
    co: 'CO5',
  },
  {
    id: 'ber-analysis',
    title: '12. BER Analysis & Monte Carlo',
    description: 'Bit Error Rate derivation for BPSK: Pb = Q(√(2Eb/N₀)), SNR vs BER curves, Monte Carlo simulation',
    icon: '🎲',
    href: `${base}/CO5/ber-analysis`,
    co: 'CO5',
  },

  // ── CO6 — Shannon Capacity & Information Theory ───────────────────────────────
  {
    id: 'shannon-capacity',
    title: '13. Shannon Channel Capacity',
    description: 'Shannon\'s theorem C = B·log₂(1 + SNR), bandwidth-power tradeoff, capacity of AWGN channel, BPSK vs Shannon limit',
    icon: '📶',
    href: `${base}/CO6/shannon-capacity`,
    co: 'CO6',
  },
  {
    id: 'information-theory',
    title: '14. Information Theory Fundamentals',
    description: 'Entropy H(X) = −Σ pᵢ log₂ pᵢ, mutual information, channel coding theorem, spectral efficiency, gap to capacity',
    icon: '💡',
    href: `${base}/CO6/information-theory`,
    co: 'CO6',
  },
]
