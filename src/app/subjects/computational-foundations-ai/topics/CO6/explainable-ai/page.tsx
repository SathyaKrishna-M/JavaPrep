'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiEye, FiMessageSquare, FiSliders, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const content = {
  title: 'Explainable AI (XAI)',
  explanationSections: [
    {
      title: '1️⃣ Why Explainability Matters',
      icon: <FiEye className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Explainable AI (XAI)</span> refers to methods and techniques that make AI decisions understandable to humans. As AI systems are deployed in high-stakes domains, the need to explain decisions becomes critical.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Trust & Adoption', 'Users and stakeholders must trust decisions before acting on them. Unexplained predictions from black-box models create resistance.', 'blue'],
              ['Debugging & Improvement', 'Understanding why a model makes errors allows engineers to fix training data, features, or architecture — not just retrain blindly.', 'green'],
              ['Legal Compliance', 'GDPR (EU) grants a "right to explanation" for automated decisions. Medical, financial, and hiring AI must be auditable.', 'amber'],
              ['Safety-Critical Domains', 'In medicine, autonomous vehicles, and criminal justice, understanding AI reasoning is essential to catch dangerous errors before deployment.', 'red'],
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
      title: '2️⃣ Interpretable vs Explainable Models',
      icon: <FiEye className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr className="bg-slate-800/50">
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Property</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Interpretable Models</th>
                <th className="px-4 py-2 text-cyan-400 border border-slate-700">Black-Box + XAI</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Examples', 'Decision trees, linear models, rule lists', 'Deep NNs, gradient boosting + LIME/SHAP'],
                  ['Accuracy', 'Often lower (simpler models)', 'State-of-the-art performance'],
                  ['Explanation', 'Built-in — model IS the explanation', 'Post-hoc — separate explanation layer'],
                  ['Faithfulness', 'Always faithful to model logic', 'Approximation — may not be perfectly faithful'],
                  ['Use when', 'Regulatory requirements, small data', 'Complex tasks, large data, accuracy critical'],
                ].map(([p, i, b]) => (
                  <tr key={p}>
                    <td className="px-4 py-2 text-violet-300 font-semibold border border-slate-700">{p}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{i}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ LIME — Local Interpretable Model-agnostic Explanations',
      icon: <FiSliders className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">LIME</span> explains any classifier locally by approximating it with a simple interpretable model (linear regression) in the neighbourhood of a specific prediction.</p>
          <div className="space-y-2">
            {[
              ['1. Pick instance', 'Choose the prediction to explain (e.g., "why was this loan denied?")'],
              ['2. Perturb', 'Generate many perturbed versions of the input (e.g., mask words/pixels)'],
              ['3. Query', 'Get the black-box model\'s prediction for each perturbed instance'],
              ['4. Weight', 'Weight perturbed instances by distance from original (nearby = more weight)'],
              ['5. Fit', 'Train a simple linear model on weighted perturbed instances'],
              ['6. Explain', 'Report feature coefficients of the linear model as the explanation'],
            ].map(([s, d]) => (
              <div key={s} className="border-l-4 border-cyan-500 pl-4">
                <p className="text-cyan-300 font-semibold text-sm">{s}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Example — Spam Detection</p>
            <p className="text-gray-300 text-sm">LIME might reveal: "This email is 91% spam because it contains 'FREE' (+0.42), 'Click Here' (+0.38), but 'Unsubscribe' reduced the score (-0.15)." These are the most influential features locally.</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ SHAP — SHapley Additive exPlanations',
      icon: <FiSliders className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">SHAP</span> uses Shapley values from cooperative game theory to fairly distribute the prediction among features. Each feature's SHAP value represents its marginal contribution across all possible feature coalitions.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 font-mono text-sm">
            <p className="text-cyan-300">φ_i = Σ_{S ⊆ F\{i}} [|S|!(|F|-|S|-1)!/|F|!] · [f(S∪{i}) - f(S)]</p>
            <p className="text-gray-400 text-xs mt-1">φ_i = Shapley value for feature i; F = all features; S = feature subsets</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-2">SHAP Advantages</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Theoretically grounded (Shapley axioms)</li>
                <li>Globally consistent feature importance</li>
                <li>Works for any model (TreeSHAP for trees)</li>
                <li>Additive: sum of SHAP = prediction - base</li>
              </ul>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-semibold mb-2">SHAP vs LIME</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>SHAP: global + local, theoretically optimal</li>
                <li>LIME: local only, simpler to implement</li>
                <li>SHAP computationally heavier (all coalitions)</li>
                <li>TreeSHAP: O(TLD²) — fast for tree models</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Counterfactual Explanations',
      icon: <FiMessageSquare className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300"><span className="text-cyan-400 font-semibold">Counterfactual explanations</span> answer: "What is the smallest change to the input that would flip the decision?" They are actionable — they tell users what they can do differently.</p>
          <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/30">
            <p className="text-violet-300 font-semibold mb-2">Example — Loan Denial</p>
            <p className="text-gray-300 text-sm">Decision: "Loan denied." Explanation: "If your income were $42,000 instead of $35,000, OR your credit score were 680 instead of 620, the loan would be approved." This is actionable — the applicant knows what to change.</p>
          </div>
          <div className="space-y-2">
            <p className="text-cyan-300 font-semibold">Properties of Good Counterfactuals:</p>
            {[
              ['Proximity', 'Minimal changes from original input'],
              ['Plausibility', 'The new input should be realistic (not negative income)'],
              ['Actionability', 'Changes must be achievable (cannot change age, birth country)'],
              ['Sparsity', 'Change as few features as possible'],
            ].map(([p, d]) => (
              <div key={p} className="flex gap-3 text-sm">
                <span className="text-violet-300 font-semibold min-w-28">{p}:</span>
                <span className="text-gray-300">{d}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ AI Reasoning Traces (for Symbolic AI)',
      icon: <FiAlertCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Unlike black-box neural networks, <span className="text-cyan-400 font-semibold">symbolic AI systems</span> (rule-based, logic, search-based) naturally produce reasoning traces — step-by-step justifications that are human-readable.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Expert Systems', 'Rule firing chains: "IF fever AND cough THEN flu (0.8) because rule R47 matched."', 'blue'],
              ['Search-Based AI', 'Path through state space: "Moved North → East → picked object → solved in 4 steps."', 'green'],
              ['Constraint Solvers', 'Propagation trace: "Variable X eliminated value 3 because constraint C_5 with Y=2 violated."', 'violet'],
              ['Planning Systems', 'Action sequence: "Step 1: pickup(A). Step 2: stack(A,B). Preconditions checked at each step."', 'cyan'],
            ].map(([t, d, c]) => (
              <div key={t} className={`bg-${c}-500/10 p-4 rounded-lg border border-${c}-500/30`}>
                <p className={`text-${c}-300 font-semibold mb-1 text-sm`}>{t}</p>
                <p className="text-gray-300 text-xs">{d}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
            <p className="text-amber-300 font-semibold mb-1">Hybrid Approach</p>
            <p className="text-gray-300 text-sm">Modern XAI combines neural networks (high accuracy) with symbolic reasoning (interpretability). Neural networks learn patterns; symbolic layer provides explanations. This is the motivation for neuro-symbolic AI.</p>
          </div>
        </div>
      ),
    },
    {
      title: '7️⃣ Summary',
      icon: <FiCheckCircle className="w-6 h-6" />,
      content: (
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>XAI:</strong> methods to make AI decisions understandable — required for trust, debugging, compliance</li>
            <li><strong>Interpretable models:</strong> decision trees, linear models — explanation is built-in</li>
            <li><strong>LIME:</strong> locally approximate any model with a linear model around a prediction</li>
            <li><strong>SHAP:</strong> Shapley values fairly distribute prediction among features — theoretically grounded</li>
            <li><strong>Counterfactuals:</strong> "what minimal change would flip the decision?" — actionable explanations</li>
            <li><strong>Symbolic AI:</strong> naturally produces reasoning traces — basis for neuro-symbolic XAI</li>
          </ul>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    { question: 'Why is explainability important in AI?', solution: 'Explainability builds user trust, enables debugging, satisfies legal requirements (GDPR right to explanation), and is essential for safety-critical domains (medicine, autonomous vehicles, criminal justice). Without explanation, errors in high-stakes decisions may go undetected and uncorrected.' },
    { question: 'What is the difference between interpretable models and explainable models?', solution: 'Interpretable models (decision trees, linear models) are inherently transparent — the model structure IS the explanation. Explainable AI uses post-hoc methods (LIME, SHAP) to explain black-box models after training. Interpretable models guarantee faithfulness; post-hoc explanations are approximations.' },
    { question: 'How does LIME generate explanations?', solution: 'LIME perturbs the input instance, queries the black-box model on perturbed instances, weights them by proximity to the original, then fits a simple linear model on the weighted dataset. The linear model\'s feature coefficients serve as the local explanation — which features most influenced this specific prediction.' },
    { question: 'MCQ: SHAP values are based on:\n A) Gradient of the loss with respect to inputs\n B) Shapley values from cooperative game theory\n C) Linear approximation in local neighbourhood\n D) Decision tree feature importances', solution: 'B) Shapley values from cooperative game theory — each feature\'s value is its average marginal contribution across all possible feature coalitions, satisfying efficiency, symmetry, dummy, and additivity axioms.' },
    { question: 'MCQ: A counterfactual explanation for a loan denial would look like:\n A) "Your income is $35,000"\n B) "The model is 73% confident you will default"\n C) "If your income were $42,000, the loan would be approved"\n D) "Feature 7 has importance 0.31"', solution: 'C) Counterfactuals are actionable "what-if" statements showing the minimal change needed to flip the decision, making them directly useful to the person affected.' },
    { question: 'What are four properties of a good counterfactual explanation?', solution: 'Proximity (minimal change from original), Plausibility (the counterfactual input must be realistic), Actionability (changes must be achievable by the person, e.g., not "change your age"), and Sparsity (change as few features as possible). These make counterfactuals both informative and practically useful.' },
    { question: 'Interview: Compare LIME and SHAP for explaining a gradient boosted tree\'s prediction.', solution: 'LIME: fast, model-agnostic, generates local approximation by perturbation and linear fitting. Results vary with random seed and may be inconsistent across runs. SHAP with TreeSHAP: exact Shapley values for tree models in O(TLD²) — consistent, additive, globally coherent. For gradient boosted trees, SHAP/TreeSHAP is preferred: faster, theoretically sound, and the feature importances are globally consistent (same feature always gets same importance in identical situations). LIME is preferred when the model is not a tree and speed is critical.' },
  ],
  exampleProblems: [],
}

export default function ExplainableAIPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
