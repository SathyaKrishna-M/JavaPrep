'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Information Theory',
  subtitle: 'Entropy, mutual information, channel capacity, and source coding fundamentals',
  co: 'CO6 — Shannon Capacity & Information Theory',

  overview: (
    <>
      <p>
        <strong className="text-white">Information theory</strong>, founded by Claude Shannon in 1948,
        quantifies information mathematically. The <strong className="text-white">entropy</strong> of a
        discrete random variable X with probabilities {'{P(xᵢ)}'} measures the average uncertainty (information
        content) in bits:
      </p>
      <p className="font-mono text-center text-white text-base py-2">
        H(X) = −Σᵢ P(xᵢ) · log₂P(xᵢ) &nbsp;&nbsp;&nbsp; [bits]
      </p>
      <p>
        <strong className="text-white">Mutual information</strong> I(X;Y) measures how much knowing Y reduces
        uncertainty about X: I(X;Y) = H(X) − H(X|Y). Channel capacity C = max I(X;Y) over all input
        distributions — the maximum mutual information between channel input X and output Y.
      </p>
      <p>
        <strong className="text-white">Source coding</strong> (data compression) removes redundancy from the
        source to approach the entropy limit. <strong className="text-white">Channel coding</strong> (FEC)
        adds controlled redundancy to protect against noise. Together, they achieve reliable communication
        at rates approaching Shannon capacity.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Entropy Properties</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-2">Maximum entropy</p>
            <p className="text-gray-300">H(X) ≤ log₂(M) for M-symbol alphabet</p>
            <p className="text-gray-400 mt-1">Maximum achieved when all symbols equally likely P = 1/M.</p>
            <p className="font-mono text-amber-300 mt-1">H_max = log₂(M) bits</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
            <p className="text-amber-300 font-bold mb-2">Entropy examples</p>
            <p className="font-mono text-gray-300 text-[10px]">Fair coin: H = 1 bit</p>
            <p className="font-mono text-gray-300 text-[10px]">Biased p=0.9: H = 0.469 bits</p>
            <p className="font-mono text-gray-300 text-[10px]">Certain event p=1: H = 0</p>
            <p className="font-mono text-gray-300 text-[10px]">4 equal symbols: H = 2 bits</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Key Information Measures</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p><span className="text-cyan-300">Entropy:</span> H(X) = −ΣP(x)log₂P(x) &nbsp; [avg uncertainty in X]</p>
          <p><span className="text-cyan-300">Joint entropy:</span> H(X,Y) = −ΣΣP(x,y)log₂P(x,y)</p>
          <p><span className="text-cyan-300">Conditional entropy:</span> H(Y|X) = H(X,Y) − H(X) &nbsp; [uncertainty in Y given X]</p>
          <p><span className="text-cyan-300">Mutual info:</span> I(X;Y) = H(X) − H(X|Y) = H(Y) − H(Y|X)</p>
          <p><span className="text-cyan-300">KL divergence:</span> D_KL(P||Q) = ΣP(x)log₂(P(x)/Q(x)) ≥ 0</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Shannon entropy H(X)', definition: 'H(X) = −ΣP(xᵢ)log₂P(xᵢ) bits. Measures the average information content (or uncertainty) in a random variable X. 0 ≤ H ≤ log₂(M). H=0 means the outcome is certain (no information). H=log₂(M) means all M outcomes are equally likely (maximum uncertainty).' },
    { term: 'Self-information (surprisal)', definition: 'I(xᵢ) = −log₂P(xᵢ) bits. The information content of a specific outcome xᵢ. Rare events (small P) have high self-information — they are "surprising." Common events have low self-information. Entropy H(X) = E[I(X)] = expected self-information.' },
    { term: 'Conditional entropy H(Y|X)', definition: 'H(Y|X) = −ΣΣP(x,y)log₂P(y|x). Average uncertainty in Y given X. H(Y|X) ≤ H(Y) — knowing X reduces uncertainty in Y. Equality holds when X and Y are independent (X provides no information about Y).' },
    { term: 'Mutual information I(X;Y)', definition: 'I(X;Y) = H(X) − H(X|Y) = H(Y) − H(Y|X) = H(X)+H(Y)−H(X,Y). Measures how much X and Y share — the reduction in uncertainty about X when Y is known. I(X;Y) ≥ 0. I(X;Y) = 0 iff X,Y independent. I(X;X) = H(X). Channel capacity C = max_{P(X)} I(X;Y).' },
    { term: 'Source coding theorem', definition: 'Shannon\'s first theorem: the minimum average code length per symbol for lossless compression of source X is H(X) bits/symbol. No compression scheme can do better than H(X) on average. Huffman coding achieves H(X) ≤ L_avg < H(X)+1. Arithmetic coding approaches H(X) arbitrarily closely.' },
    { term: 'Channel coding theorem', definition: 'Shannon\'s second theorem: for any rate R < C (channel capacity), there exists a code of rate R such that the probability of error can be made arbitrarily small with sufficiently long codes. For R > C, reliable communication is impossible. This is the fundamental theorem of information theory.' },
    { term: 'Differential entropy (continuous)', definition: 'h(X) = −∫f(x)log₂f(x)dx for continuous X with PDF f(x). Not a direct measure of uncertainty (can be negative). For Gaussian X~N(μ,σ²): h(X) = (1/2)log₂(2πeσ²) bits. The Gaussian distribution maximises differential entropy for a given variance — this is why AWGN is the worst-case noise model.' },
  ],

  code: {
    title: 'Entropy, Mutual Information, and Source Coding',
    language: 'python',
    snippet: `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import entropy as scipy_entropy

# ── Shannon entropy ───────────────────────────────────────────
def H(probs):
    """Shannon entropy in bits"""
    probs = np.array(probs)
    probs = probs[probs > 0]   # ignore zero-probability events
    return -np.sum(probs * np.log2(probs))

# Examples
print("Shannon entropy examples:")
print(f"  Fair coin [0.5, 0.5]:     H = {H([0.5, 0.5]):.4f} bits  (max for binary)")
print(f"  Biased [0.9, 0.1]:        H = {H([0.9, 0.1]):.4f} bits")
print(f"  Certain event [1.0, 0.0]: H = {H([1.0, 0.0]):.4f} bits  (no info)")
print(f"  4 equal symbols [0.25×4]: H = {H([0.25]*4):.4f} bits  = log₂(4)")
print(f"  English text (approx):    H ≈ 1.5 bits/letter (high redundancy)")

# ── Entropy as function of p (binary source) ─────────────────
p = np.linspace(0.001, 0.999, 1000)
H_binary = -p*np.log2(p) - (1-p)*np.log2(1-p)

# ── Huffman coding example ────────────────────────────────────
# Source symbols with given probabilities
symbols = ['A', 'B', 'C', 'D', 'E']
probs   = [0.35, 0.25, 0.20, 0.12, 0.08]
H_source = H(probs)

# Huffman codes (manually computed for this example)
huffman_codes = {'A': '0', 'B': '10', 'C': '110', 'D': '1110', 'E': '1111'}
code_lengths  = {s: len(c) for s, c in huffman_codes.items()}
avg_length    = sum(probs[i]*code_lengths[symbols[i]] for i in range(len(symbols)))

print(f"\nSource coding example:")
print(f"  Source entropy:    H = {H_source:.4f} bits/symbol")
print(f"  Huffman avg len:   L = {avg_length:.4f} bits/symbol")
print(f"  Coding efficiency: η = H/L = {H_source/avg_length:.4f}")
print(f"  Redundancy:        {avg_length - H_source:.4f} bits/symbol above entropy")
for s, p_s, code in zip(symbols, probs, huffman_codes.values()):
    print(f"    {s}: p={p_s:.2f}, code='{code}' (len={len(code)}, p×len={p_s*len(code):.4f})")

# ── Mutual information: BPSK channel ─────────────────────────
# Input X: {0,1} equally likely. Output Y = X ⊕ N (BSC model)
# Binary Symmetric Channel with crossover probability p_e
p_e_vals = np.linspace(0, 0.5, 500)
# I(X;Y) = H(Y) - H(Y|X) = H(p_e × 1 + (1-p_e) × 1) ...
# For BSC with input p(0)=p(1)=0.5:
# H(Y) = 1 bit (Y is also 50-50 when X balanced)
# H(Y|X) = H(p_e) (binary entropy of crossover prob)
# I(X;Y) = 1 - H(p_e)  [bits per channel use]
H_pe  = -p_e_vals*np.log2(np.where(p_e_vals>0, p_e_vals, 1)) - \
         (1-p_e_vals)*np.log2(np.where((1-p_e_vals)>0, (1-p_e_vals), 1))
C_BSC = 1 - H_pe

print(f"\nBSC capacity at p_e = 0.01:  C = {1 - H([0.01,0.99]):.4f} bits/channel use")
print(f"BSC capacity at p_e = 0.10:  C = {1 - H([0.10,0.90]):.4f} bits/channel use")
print(f"BSC capacity at p_e = 0.50:  C = {1 - H([0.50,0.50]):.4f} bits/channel use (useless channel)")

# ── Gaussian differential entropy ────────────────────────────
sigmas = [0.5, 1.0, 2.0]
print("\nGaussian differential entropy h(X) = 0.5·log₂(2πeσ²):")
for sig in sigmas:
    h = 0.5 * np.log2(2 * np.pi * np.e * sig**2)
    print(f"  σ = {sig:.1f}: h(X) = {h:.4f} bits")

# ── Plots ─────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 3, figsize=(14, 5))

# Binary entropy function
axes[0].plot(p, H_binary, 'b', lw=2)
axes[0].axhline(1.0, color='r', ls='--', alpha=0.5, label='H_max = 1 bit')
axes[0].axvline(0.5, color='g', ls='--', alpha=0.5, label='p=0.5 → H=1 bit')
axes[0].set_xlabel('Probability p'); axes[0].set_ylabel('H(p) [bits]')
axes[0].set_title('Binary Entropy Function H(p) = −p·log₂p − (1−p)·log₂(1−p)')
axes[0].legend(); axes[0].grid(True, alpha=0.3)

# Huffman code lengths vs probabilities
bar_colors = ['blue', 'green', 'orange', 'red', 'purple']
x_pos = np.arange(len(symbols))
axes[1].bar(x_pos, [code_lengths[s] for s in symbols], alpha=0.7,
            color=bar_colors, label='Huffman code length')
axes[1].bar(x_pos, [-np.log2(probs[i]) for i in range(len(symbols))],
            alpha=0.4, color='gray', label='-log₂(p) = optimal length')
axes[1].set_xticks(x_pos)
axes[1].set_xticklabels([f'{s}\np={p:.2f}' for s,p in zip(symbols,probs)], fontsize=8)
axes[1].set_ylabel('Code length (bits)'); axes[1].set_title('Huffman vs Optimal Code Lengths')
axes[1].legend(fontsize=8); axes[1].grid(True, alpha=0.3)
axes[1].axhline(H_source, color='r', ls='--', lw=1.5, label=f'H={H_source:.3f}')

# BSC capacity
axes[2].plot(p_e_vals, C_BSC, 'b', lw=2, label='BSC capacity: 1 − H(p_e)')
axes[2].fill_between(p_e_vals, 0, C_BSC, alpha=0.1, color='blue')
axes[2].set_xlabel('Crossover probability p_e')
axes[2].set_ylabel('Capacity C [bits/channel use]')
axes[2].set_title('Binary Symmetric Channel Capacity')
axes[2].grid(True, alpha=0.3); axes[2].legend()
axes[2].text(0.25, 0.5, 'Rate R < C:\nReliable communication\npossible', fontsize=8,
             ha='center', bbox=dict(boxstyle='round', facecolor='green', alpha=0.2))

plt.suptitle('Information Theory: Entropy, Source Coding, and Channel Capacity')
plt.tight_layout(); plt.show()`,
    explanation: 'The binary entropy function peaks at 1 bit when p=0.5 (equal uncertainty). Huffman codes assign shorter codes to frequent symbols — average length approaches but never beats H(X). The BSC capacity shows that even noisy channels (p_e>0) have positive capacity as long as p_e < 0.5. With turbo/LDPC codes, systems operate very close to the channel capacity limit.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Information theory provides the theoretical foundation for
        all data compression and error correction.</strong>{' '}
        ZIP, MP3, JPEG — all exploit the source entropy bound to compress data. LTE, 5G, WiFi —
        all use channel codes (turbo, LDPC, polar) designed to approach channel capacity. The entropy
        of the English language (≈1.5 bits/letter) explains why English text compresses 4:1 in ZIP
        (8 bits/letter → 2 bits/letter). Without entropy theory, we wouldn't know if further compression
        is theoretically possible.
      </p>
      <p>
        Mutual information I(X;Y) is the measure of "how much information the received signal Y contains
        about the transmitted X." This is exactly what a communication system tries to maximise. Shannon's
        capacity theorem tells us the maximum achievable mutual information — the ultimate performance bound
        that every communication engineer strives to approach.
      </p>
    </>
  ),

  commonMistakes: [
    'Using natural log instead of log₂ — entropy in bits uses log base 2. Using ln gives entropy in nats (1 nat = 1/ln2 ≈ 1.443 bits). The choice of base is a convention — always state the units. Most communication textbooks use bits (log₂). Python\'s scipy.stats.entropy uses natural log by default; pass base=2 for bits.',
    'Negative differential entropy — differential entropy h(X) = −∫f(x)log₂f(x)dx CAN be negative (unlike discrete entropy H(X) which is always ≥0). For example, a uniform distribution on [0, 0.5] has h = log₂(0.5) = −1 bit. This is not a contradiction — differential entropy lacks the physical interpretation of discrete entropy.',
    'Entropy is not the same as information of a specific message — H(X) is the average information over all possible outcomes. The information of a specific outcome xᵢ is I(xᵢ) = −log₂P(xᵢ). A rare event has high information; a common event has low information. H(X) = E[I(X)] = their weighted average.',
    'Channel capacity is not achievable without coding — Shannon\'s theorem says reliable communication at rate R < C is POSSIBLE, but requires long codes. Uncoded BPSK at rate R does NOT achieve capacity even if R < C. You need codes (Turbo, LDPC, Polar) to approach capacity. The BER formula Q(√(2Eb/N₀)) describes uncoded performance, not capacity-achieving performance.',
  ],

  summary: [
    'Entropy: H(X) = −ΣP(x)log₂P(x) bits. Average uncertainty. 0 ≤ H ≤ log₂(M).',
    'Maximum entropy: H = log₂(M) when all M symbols equally likely. Minimum H=0 when outcome is certain.',
    'Mutual information: I(X;Y) = H(X) − H(X|Y). Measures shared information between X and Y.',
    'Channel capacity: C = max I(X;Y). For AWGN: C = B·log₂(1+SNR) bits/s.',
    'Source coding theorem: min code length = H(X). Huffman and arithmetic coding approach this.',
    'Channel coding theorem: reliable comm possible for R<C. Impossible for R>C.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A source has 4 symbols with probabilities [0.5, 0.25, 0.125, 0.125]. (a) Find the entropy. (b) Design a Huffman code. (c) Find the average code length and coding efficiency.',
      hint: '(a) H = −(0.5log₂0.5 + 0.25log₂0.25 + 0.125log₂0.125 + 0.125log₂0.125) = 0.5×1 + 0.25×2 + 0.125×3 + 0.125×3 = 0.5+0.5+0.375+0.375 = 1.75 bits. (b) Huffman: merge 0.125+0.125=0.25, then 0.25+0.25=0.5, then 0.5+0.5=1. Codes: A→"0"(len1), B→"10"(len2), C→"110"(len3), D→"111"(len3). (c) L_avg = 0.5×1+0.25×2+0.125×3+0.125×3 = 0.5+0.5+0.375+0.375 = 1.75 bits. Efficiency = H/L = 1.75/1.75 = 100%! This source is perfectly matched to Huffman (probabilities are powers of 2).',
    },
    {
      type: 'question',
      text: 'For BPSK with BER = p_e, model the channel as a Binary Symmetric Channel (BSC). Find the channel capacity C in bits/channel use. At Eb/N₀ = 6 dB, find p_e and then C.',
      hint: 'BSC capacity: C = 1 − H(p_e) = 1 − [−p_e·log₂(p_e) − (1−p_e)·log₂(1−p_e)]. Eb/N₀=6dB → 4 (linear). p_e = Q(√(2×4)) = Q(2.83) ≈ 0.0023. H(p_e) = H(0.0023) = −0.0023×log₂(0.0023) − 0.9977×log₂(0.9977) ≈ 0.0023×8.77 + 0.9977×0.0033 ≈ 0.0202+0.0033 ≈ 0.0235 bits. C = 1 − 0.0235 = 0.9765 bits/channel use. At 6dB SNR, BPSK achieves 97.65% of the maximum 1 bit/channel use — close to capacity for this BSC model.',
    },
    {
      type: 'question',
      text: 'The English language has approximately H ≈ 1.5 bits/letter. ASCII encodes each letter with 8 bits. What is the maximum compression ratio theoretically achievable? What does this mean for ZIP?',
      hint: 'ASCII: 8 bits/letter. Entropy: 1.5 bits/letter. Theoretical compression ratio: 8/1.5 = 5.33:1. This is the Shannon limit — no lossless compression can beat this. ZIP achieves approximately 3-4:1 for typical English text — below the theoretical maximum but practical. The remaining gap exists because ZIP uses LZ77 with limited context (it doesn\'t use arbitrarily long dependencies in text) and finite block lengths. Arithmetic coding with a language model can approach 1.5 bits/letter more closely.',
    },
    {
      type: 'task',
      text: 'In Python, compute the entropy of BPSK-modulated text (1s and 0s from ASCII encoding of "Hello World"). Then compute the capacity of a BSC channel with p_e = Q(√(2×Eb_N0)) for Eb/N₀ from 0 to 10 dB. Plot C vs Eb/N₀.',
      hint: 'text = "Hello World". bits = "".join(format(ord(c),"08b") for c in text). bit_probs = [bits.count("0")/len(bits), bits.count("1")/len(bits)]. H_bits = entropy(bit_probs, base=2). For BSC: for each Eb_N0_dB: p_e = Q(sqrt(2*10**(Eb_N0_dB/10))). C = 1 - (−p_e*log2(p_e+eps) − (1−p_e)*log2(1−p_e+eps)). Plot C vs Eb_N0_dB. At high SNR: C→1 bit/channel use. At SNR=0dB: p_e≈Q(√2)≈0.079 → C≈0.61.',
    },
  ],
}

export default function InformationTheoryPage() {
  return <FEDFTopicPage content={content} />
}
