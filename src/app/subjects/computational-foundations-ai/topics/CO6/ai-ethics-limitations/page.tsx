'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiAlertTriangle, FiShield, FiTrendingUp, FiCheckCircle, FiUsers } from 'react-icons/fi'

const content = {
  title: 'AI Ethics, Limitations & The Road Ahead',
  explanationSections: [
    {
      title: '1️⃣ Technical Limitations of Classical AI',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The AI techniques studied in this course — search, CSP, game playing, probabilistic reasoning — are powerful but have fundamental technical limitations that motivate modern machine learning approaches.</p>
          <div className="space-y-3">
            {[
              ['Knowledge Bottleneck', 'Symbolic AI requires humans to manually encode knowledge (rules, heuristics, Bayesian network structure). This is expensive and brittle — real-world domains have millions of rules. Machine learning automates knowledge acquisition from data.'],
              ['Scalability', 'Exact search and inference are exponential in problem size. Even with pruning (alpha-beta) and efficient algorithms (AC-3, VE), real-world problems (millions of variables, high treewidth) exceed classical methods.'],
              ['Brittleness', 'A hand-crafted system that works perfectly in its design domain often fails completely outside it. Deep learning learns generalizable representations, trading interpretability for robustness.'],
              ['Feature Engineering', 'Classical AI requires humans to define good features (evaluation functions, heuristic functions). Bad features → bad AI. Neural networks learn features automatically from raw input (images, text).'],
              ['Uncertainty Handling', 'Probabilistic methods handle uncertainty well but scale poorly. MCMC and particle filters work for medium-scale problems; deep probabilistic models are needed for high-dimensional data.'],
            ].map(([t, d]) => (
              <div key={t} className="border-l-4 border-red-500 pl-4">
                <p className="text-red-300 font-semibold">{t}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Bias & Fairness',
      icon: <FiUsers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Algorithmic bias</span> occurs when AI systems produce systematically unfair outcomes for certain groups. Bias can enter at multiple stages:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Data Bias', 'Training data reflects historical injustices. A hiring model trained on past hires will perpetuate discrimination if minorities were historically excluded.', 'red'],
              ['Label Bias', 'Human annotators introduce subjective biases into labelled data. Sentiment analysis trained on biased labels will inherit those biases.', 'amber'],
              ['Feedback Bias', 'Deployed models create self-fulfilling prophecies. A predictive policing model sends police to certain areas → more arrests → confirms the model\'s predictions.', 'orange'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1`}>{t}</p>
                <p className="text-gray-300 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Fairness Metrics (often in conflict)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                ['Demographic Parity', 'Equal positive rate across groups'],
                ['Equal Opportunity', 'Equal true positive rate across groups'],
                ['Calibration', 'Predicted probabilities match actual outcomes'],
                ['Individual Fairness', 'Similar individuals get similar outcomes'],
              ].map(([m, d]) => (
                <div key={m} className="text-sm">
                  <span className="text-cyan-300 font-semibold">{m}:</span>
                  <span className="text-gray-300 ml-1">{d}</span>
                </div>
              ))}
            </div>
            <p className="text-amber-300 text-xs mt-2">Impossibility theorem: several fairness metrics cannot all be satisfied simultaneously when base rates differ between groups.</p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Privacy & Data Ethics',
      icon: <FiShield className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">AI systems require large datasets, often containing sensitive personal information. Privacy risks exist at every stage of the ML pipeline.</p>
          <div className="space-y-3">
            {[
              ['Membership Inference', 'Given a trained model, can we determine whether a specific person\'s data was in the training set? Yes — models memorise training data, exposing private records.'],
              ['Data Poisoning', 'Adversaries can corrupt training data to manipulate model behaviour (e.g., make spam classifier fail on specific patterns).'],
              ['Model Inversion', 'From model outputs, reconstruct approximate training examples — potentially revealing private images or records.'],
              ['Differential Privacy', 'Mathematical framework guaranteeing that a single individual\'s data cannot significantly affect model outputs. Used by Apple, Google in production ML.'],
              ['Federated Learning', 'Train models without centralising data — each device trains locally, only gradients are shared. Protects raw data while enabling collaborative learning.'],
            ].map(([t, d]) => (
              <div key={t} className="border-l-4 border-blue-500 pl-4">
                <p className="text-blue-300 font-semibold">{t}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ AI Safety',
      icon: <FiShield className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">AI safety</span> studies how to build AI systems that behave reliably, predictably, and aligned with human values — especially as systems become more capable.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <p className="text-red-300 font-semibold mb-2">Safety Problems</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li><strong>Specification gaming:</strong> achieves the reward in unintended ways</li>
                <li><strong>Reward hacking:</strong> maximises metric without goal</li>
                <li><strong>Distribution shift:</strong> fails on inputs outside training distribution</li>
                <li><strong>Adversarial examples:</strong> small perturbations cause misclassification</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">Safety Approaches</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li><strong>RLHF:</strong> reinforcement learning from human feedback</li>
                <li><strong>Constitutional AI:</strong> train with explicit principles</li>
                <li><strong>Red-teaming:</strong> actively try to break the system</li>
                <li><strong>Uncertainty quantification:</strong> know when to abstain</li>
              </ul>
            </div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Near-term vs Long-term Safety</p>
            <p className="text-gray-300 text-sm">Near-term: bias, privacy, robustness — real problems with today's deployed AI. Long-term: alignment of highly capable AI systems with human values — active research area with no consensus solutions yet.</p>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ The Road Ahead — From Classical AI to Modern ML',
      icon: <FiTrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Classical AI (this course) provides the foundational concepts. The field has evolved to address scalability and representation limitations through modern machine learning.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Area</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Classical AI</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Modern ML/DL</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Knowledge', 'Hand-encoded rules', 'Learned from data'],
                  ['Search', 'A*, minimax, CSP solvers', 'Monte Carlo Tree Search + NN (AlphaGo)'],
                  ['Vision', 'Feature detectors + classifiers', 'Convolutional Neural Networks (CNNs)'],
                  ['Language', 'Parse trees, grammar rules', 'Transformers, LLMs (GPT, BERT)'],
                  ['Reasoning', 'Logic, Bayesian networks', 'Neural Turing Machines, Graph NNs'],
                  ['Uncertainty', 'Probability tables (exact)', 'Variational Autoencoders, Diffusion Models'],
                ].map(([a, c, m]) => (
                  <tr key={a}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{a}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{c}</td>
                    <td className="px-4 py-2 text-cyan-300 border border-slate-700 text-sm">{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              ['Machine Learning', 'Supervised, unsupervised, reinforcement learning — algorithms that learn from data', 'blue'],
              ['Deep Learning', 'Neural networks with many layers — CNNs, RNNs, Transformers — learn hierarchical representations', 'violet'],
              ['NLP', 'Natural Language Processing — language models, machine translation, question answering', 'green'],
              ['Generative AI', 'Large Language Models, Diffusion Models — create text, images, code', 'amber'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-3 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold text-sm mb-1`}>{t}</p>
                <p className="text-gray-400 text-xs">{d}</p>
              </div>
            ))}
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
            <li><strong>Classical AI limitations:</strong> knowledge bottleneck, scalability, brittleness, manual feature engineering</li>
            <li><strong>Bias:</strong> data, label, and feedback bias — fairness metrics often conflict (impossibility theorem)</li>
            <li><strong>Privacy:</strong> membership inference, data poisoning, model inversion — countered by differential privacy and federated learning</li>
            <li><strong>AI safety:</strong> specification gaming, reward hacking, distribution shift, adversarial examples — RLHF and constitutional AI as mitigations</li>
            <li><strong>Next steps:</strong> Machine Learning → Deep Learning → NLP → Generative AI builds on classical AI foundations</li>
            <li><strong>Core insight:</strong> Classical AI (search, logic, probability) and modern ML are complementary — the best systems combine both (AlphaGo = MCTS + CNN)</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'What is the knowledge bottleneck in classical AI?', solution: 'Classical AI requires humans to manually encode all domain knowledge as rules, heuristics, or probability tables. This is expensive, slow, and brittle — the system cannot handle situations not explicitly programmed. Machine learning solves this by learning knowledge automatically from data.' },
    { question: 'What is algorithmic bias and how does it arise?', solution: 'Algorithmic bias is when AI systems produce systematically unfair outcomes for certain groups. It arises from: (1) Data bias — training data reflects historical injustices; (2) Label bias — human annotators introduce subjective biases; (3) Feedback bias — deployed models create self-reinforcing loops that amplify initial biases.' },
    { question: 'What is differential privacy?', solution: 'A mathematical framework that guarantees a single individual\'s data cannot significantly influence model outputs. Formally, the output distribution changes by at most ε when any one record is added or removed. Used by Apple (iOS keyboard) and Google (Chrome) to train models without exposing individual user data.' },
    { question: 'MCQ: Which of the following is a near-term AI safety concern?\n A) Superintelligence takeover\n B) Adversarial examples causing misclassification\n C) Consciousness in AI systems\n D) Robots developing emotions', solution: 'B) Adversarial examples — small, imperceptible perturbations to images or text that cause AI systems to make dangerous misclassifications. This is a real, documented problem in deployed systems today (autonomous vehicles, medical imaging).' },
    { question: 'MCQ: The Impossibility theorem in algorithmic fairness states:\n A) No fair AI system can be built\n B) Multiple fairness metrics cannot all be satisfied when base rates differ\n C) Accuracy and fairness can always be jointly optimised\n D) Neural networks cannot be made fair', solution: 'B) When base rates (proportion of positive outcomes) differ between groups, metrics like demographic parity, equal opportunity, and calibration mathematically cannot all be satisfied simultaneously. Fairness is multi-dimensional and choices involve tradeoffs.' },
    { question: 'How does AlphaGo combine classical AI and deep learning?', solution: 'AlphaGo uses Monte Carlo Tree Search (classical AI search algorithm) as the backbone. Instead of a hand-crafted evaluation function, it uses a deep neural network (CNN) to evaluate board positions and guide search. The combination achieves superhuman Go play — classical AI provides the framework, deep learning provides scalable pattern recognition that hand-coded evaluation functions cannot match.' },
    { question: 'Interview: What would you do to audit a hiring AI system for bias before deployment?', solution: 'Multi-stage audit: (1) Data audit — examine training data distribution across gender, race, age; check if protected characteristics correlate with labels; (2) Metric evaluation — measure demographic parity, equal opportunity, FPR across groups using a held-out test set stratified by group; (3) Counterfactual testing — flip protected attributes in test cases and check if predictions change; (4) Disparate impact analysis — compare positive rates across groups (US law: 4/5ths rule); (5) Ongoing monitoring — track real-world hiring rates post-deployment and compare to baseline. Involve domain experts and affected communities in the audit process.' },
  ],
  exampleProblems: [],
}

export default function AIEthicsLimitationsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
