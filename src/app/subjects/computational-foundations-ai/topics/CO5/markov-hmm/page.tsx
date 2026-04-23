'use client'

import DMTopicPage from '@/components/DMTopicPage'
import PyCode from '@/components/PyCode'
import { FiRefreshCw, FiTrendingUp, FiCode, FiCheckCircle, FiActivity } from 'react-icons/fi'

const content = {
  title: 'Markov Models & Hidden Markov Models',
  explanationSections: [
    {
      title: '1️⃣ The Markov Property',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The <span className="text-cyan-400 font-semibold">Markov assumption</span> states that the future is independent of the past given the present. Formally:</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-center">
            <p className="text-cyan-300 text-lg">P(X_t | X_0, X_1, ..., X_t-1) = P(X_t | X_t-1)</p>
          </div>
          <p className="text-gray-300">This simplification makes temporal reasoning tractable — instead of conditioning on the entire history, we only need the most recent state.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['1st-Order Markov', 'Future depends only on current state', 'blue'],
              ['2nd-Order Markov', 'Future depends on last 2 states', 'violet'],
              ['Stationary', 'Transition probs same at all times', 'green'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Markov Chain & Transition Matrix',
      icon: <FiRefreshCw className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">A <span className="text-cyan-400 font-semibold">Markov chain</span> is a sequence of random variables X_1, X_2, ... satisfying the Markov property. It is fully described by the <em>transition matrix</em> T where T[i][j] = P(X_t=j | X_t-1=i).</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300 mb-2">Weather example (Sunny/Rainy):</p>
            <p className="text-gray-300">T = [[0.8, 0.2],   # from Sunny: P(Sunny)=0.8, P(Rainy)=0.2</p>
            <p className="text-gray-300 ml-4">[0.4, 0.6]]  # from Rainy: P(Sunny)=0.4, P(Rainy)=0.6</p>
          </div>
          <PyCode>{`import numpy as np

T = np.array([[0.8, 0.2],
              [0.4, 0.6]])  # transition matrix

# State after n steps: P(X_n) = P(X_0) @ T^n
initial = np.array([1.0, 0.0])  # starts Sunny

for n in [1, 5, 10, 50]:
    state = initial @ np.linalg.matrix_power(T, n)
    print(f"After {n} steps: Sunny={state[0]:.3f}, Rainy={state[1]:.3f}")

# Stationary distribution: solve π @ T = π, sum(π)=1
eigenvalues, eigenvectors = np.linalg.eig(T.T)
stationary = eigenvectors[:, np.argmax(eigenvalues)].real
stationary /= stationary.sum()
print(f"Stationary: Sunny={stationary[0]:.3f}, Rainy={stationary[1]:.3f}")`}</PyCode>
        </div>
      ),
    },
    {
      title: '3️⃣ Hidden Markov Model (HMM) Structure',
      icon: <FiActivity className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">In an <span className="text-cyan-400 font-semibold">HMM</span>, the true state sequence is hidden — we only observe noisy emissions. An HMM has 5 components:</p>
          <div className="space-y-2">
            {[
              ['States S', 'Set of hidden states {s_1, ..., s_N}', 'violet'],
              ['Initial distribution π', 'P(X_1 = s_i) — probability of starting in each state', 'blue'],
              ['Transition matrix A', 'A[i][j] = P(X_t=s_j | X_{t-1}=s_i)', 'green'],
              ['Emission matrix B', 'B[i][k] = P(O_t=o_k | X_t=s_i)', 'cyan'],
              ['Observations O', 'Sequence of observed symbols o_1, o_2, ..., o_T', 'amber'],
            ].map(([name, desc, c]) => (
              <div key={name} className={`bg-${c}-500/10 p-3 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold text-sm`}>{name}</p>
                <p className="text-gray-300 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-sm">
            <p className="text-cyan-300 font-semibold mb-2">Real-World HMM Examples</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ['Speech Recognition', 'Hidden: phonemes / words. Observed: audio frames (MFCCs).'],
                ['POS Tagging', 'Hidden: part-of-speech tags. Observed: words in sentence.'],
                ['Gene Finding', 'Hidden: gene/non-gene regions. Observed: DNA bases A/T/G/C.'],
                ['Robot Localisation', 'Hidden: robot position. Observed: sensor readings.'],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="text-violet-300 font-semibold text-sm">{t}</p>
                  <p className="text-gray-400 text-xs">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Forward Algorithm — Filtering',
      icon: <FiTrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The <span className="text-cyan-400 font-semibold">forward algorithm</span> computes the probability of the observation sequence efficiently using dynamic programming. It answers: P(O_1..O_T | model)?</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300">α_t(i) = P(O_1..O_t, X_t=s_i | model)</p>
            <p className="text-gray-400 text-xs mt-1">Forward variable: probability of partial observation up to t AND being in state i</p>
          </div>
          <PyCode>{`def forward_algorithm(observations, pi, A, B):
    """
    pi: initial distribution [N]
    A:  transition matrix [N x N]
    B:  emission matrix [N x M]
    observations: sequence of observed symbol indices
    Returns: alpha matrix [T x N], P(O|model)
    """
    T = len(observations)
    N = len(pi)
    alpha = np.zeros((T, N))

    # Initialisation
    alpha[0] = pi * B[:, observations[0]]

    # Recursion
    for t in range(1, T):
        for j in range(N):
            alpha[t, j] = np.sum(alpha[t-1] * A[:, j]) * B[j, observations[t]]

    # Total probability of observation sequence
    return alpha, alpha[-1].sum()

# Filtering: P(X_t | O_1..O_t) = alpha_t / sum(alpha_t)`}</PyCode>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Complexity</p>
            <p className="text-gray-300 text-sm">Forward algorithm: O(N²T) where N = number of states, T = sequence length. Far more efficient than brute-force O(N^T).</p>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Viterbi Algorithm — Most Likely State Sequence',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The <span className="text-cyan-400 font-semibold">Viterbi algorithm</span> finds the most probable hidden state sequence given observations — "decoding." It is identical to forward algorithm but uses <em>max</em> instead of <em>sum</em>.</p>
          <PyCode>{`def viterbi(observations, pi, A, B):
    T = len(observations)
    N = len(pi)
    delta = np.zeros((T, N))   # max probability
    psi = np.zeros((T, N), dtype=int)  # backpointer

    # Initialisation
    delta[0] = pi * B[:, observations[0]]

    # Recursion
    for t in range(1, T):
        for j in range(N):
            probs = delta[t-1] * A[:, j]
            psi[t, j] = np.argmax(probs)
            delta[t, j] = np.max(probs) * B[j, observations[t]]

    # Backtracking
    path = [np.argmax(delta[-1])]
    for t in range(T-1, 0, -1):
        path.insert(0, psi[t, path[0]])

    return path, delta[-1].max()  # best path and its probability`}</PyCode>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-300 font-semibold mb-1">Forward vs Viterbi</p>
            <p className="text-gray-300 text-sm">Forward (sum): P(O|model) — total probability, used for recognition. Viterbi (max + backtrack): argmax P(X|O) — best state sequence, used for decoding. Same complexity O(N²T).</p>
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Markov property:</strong> P(X_t | X_0..X_t-1) = P(X_t | X_t-1) — future ⊥ past | present</li>
            <li><strong>Markov chain:</strong> described by transition matrix T; converges to stationary distribution</li>
            <li><strong>HMM = (π, A, B):</strong> initial distribution, transition matrix, emission matrix</li>
            <li><strong>Forward algorithm:</strong> P(O|model) in O(N²T) via DP with sum over states</li>
            <li><strong>Viterbi:</strong> most likely state sequence in O(N²T) via DP with max over states + backtrack</li>
            <li><strong>Applications:</strong> speech recognition, POS tagging, gene finding, robot localisation</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the Markov property?', solution: 'The future state is conditionally independent of all past states given the present state: P(X_t | X_0,...,X_{t-1}) = P(X_t | X_{t-1}). This means the current state captures all information needed to predict the future.' },
    { question: 'What are the 5 components of an HMM?', solution: '(1) S: set of hidden states; (2) π: initial state distribution; (3) A: transition matrix P(X_t|X_{t-1}); (4) B: emission matrix P(O_t|X_t); (5) O: observed sequence. An HMM is fully specified by the triple (π, A, B).' },
    { question: 'What does the forward algorithm compute?', solution: 'The forward algorithm computes α_t(i) = P(O_1...O_t, X_t=s_i | model) — the joint probability of the partial observation sequence and being in state i at time t. The total observation probability P(O|model) = Σ_i α_T(i).' },
    { question: 'MCQ: The Viterbi algorithm differs from the forward algorithm by:\n A) Using multiplication instead of addition\n B) Using max instead of sum during the recursion\n C) Not requiring a transition matrix\n D) Running in O(NT) instead of O(N²T)', solution: 'B) Viterbi uses max (to find the single best path) instead of sum (which accumulates all path probabilities). Both have the same O(N²T) complexity.' },
    { question: 'MCQ: A stationary distribution of a Markov chain satisfies:\n A) π = T · π (right eigenvector)\n B) π = π · T and sum(π) = 1\n C) π[i] = 1/N for all i\n D) π changes every step by a constant', solution: 'B) π = π · T (left eigenvector of T with eigenvalue 1) and the entries sum to 1. It represents the long-run fraction of time spent in each state.' },
    { question: 'Why is the forward algorithm more efficient than brute force?', solution: 'Brute force enumerates all N^T state sequences: O(N^T). The forward algorithm uses dynamic programming — α_t reuses α_{t-1} so each step costs O(N²). Total: O(N²T) instead of O(N^T). For N=10, T=100: 10^100 vs 10,000 operations.' },
    { question: 'Give a real example of HMM decoding (Viterbi) in NLP.', solution: 'Part-of-speech tagging: hidden states = POS tags (Noun/Verb/Adjective/...); observed sequence = words in a sentence. Viterbi finds the most likely sequence of POS tags given the word sequence. E.g., "Time flies like an arrow" → [Noun Verb Preposition Det Noun]. The transition matrix captures grammar (Verb after Noun is common), emission matrix captures which words appear with each tag.' },
    { question: 'Interview: How does sensor fusion in robotics use HMMs?', solution: 'A robot\'s true position (hidden state) evolves by movement (transition model). Sensors (laser, camera) give noisy readings (emissions). The forward algorithm computes the probability distribution over positions given sensor history (belief state). Viterbi finds the most likely path taken. This is the basis of the Bayes filter and particle filters used in SLAM (Simultaneous Localisation and Mapping).' },
  ],
  exampleProblems: [],
}

export default function MarkovHMMPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
