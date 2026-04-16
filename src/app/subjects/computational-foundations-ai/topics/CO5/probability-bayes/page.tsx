'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiHelpCircle, FiFilter, FiLink, FiZap, FiCode, FiBarChart2, FiCheckSquare, FiCpu } from 'react-icons/fi'

const content = {
  title: 'Probability & Bayes Rule',
  explanationSections: [
    {
      title: '1️⃣ Why Probability in AI?',
      icon: <FiHelpCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Real-world AI systems operate under <span className="text-cyan-400 font-semibold">uncertainty</span>. A self-driving car's camera may misread a sign in fog. A medical diagnosis system only has partial test results. A robot arm cannot know the exact weight of an object before picking it up.
          </p>
          <p className="text-gray-300">
            Probability theory gives us a mathematically rigorous language to represent, reason about, and act under uncertainty. Rather than claiming "the traffic light is red," an AI agent says "there is a 92% chance the traffic light is red" — and its decision-making framework is built to handle that uncertainty gracefully.
          </p>
          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-2">Three Sources of Uncertainty in AI:</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li><span className="text-yellow-300">Perception uncertainty</span> — sensors are noisy; images are blurry; speech has background noise.</li>
              <li><span className="text-yellow-300">Action uncertainty</span> — a motor command "move 5 cm" may produce 4.7 cm or 5.3 cm.</li>
              <li><span className="text-yellow-300">Outcome uncertainty</span> — the world has hidden variables the agent cannot directly observe.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Basic Probability Theory',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            A <span className="text-cyan-400 font-semibold">sample space</span> Ω is the set of all possible outcomes of an experiment. An <span className="text-cyan-400 font-semibold">event</span> A is any subset of Ω. A probability measure P assigns a real number to each event satisfying the Kolmogorov axioms:
          </p>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 space-y-2">
            <p className="text-purple-300 font-semibold">Kolmogorov Axioms:</p>
            <p className="text-gray-300 text-sm font-mono">Axiom 1 (Non-negativity):  P(A) ≥ 0  for all events A</p>
            <p className="text-gray-300 text-sm font-mono">Axiom 2 (Normalization): P(Ω) = 1</p>
            <p className="text-gray-300 text-sm font-mono">Axiom 3 (Additivity):    P(A∪B) = P(A) + P(B) - P(A∩B)</p>
          </div>
          <p className="text-gray-300">
            From these three axioms alone, all of probability theory can be derived. For example:
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-indigo-500 space-y-1 font-mono text-sm text-gray-200">
            <p>P(¬A) = 1 - P(A)              (complement rule)</p>
            <p>P(∅) = 0                       (impossible event)</p>
            <p>If A⊆B then P(A) ≤ P(B)        (monotonicity)</p>
          </div>
          <p className="text-gray-300">
            A <span className="text-cyan-400 font-semibold">probability distribution</span> over a discrete random variable X lists P(X=x) for every possible value x, with all values summing to 1. For a continuous variable, a probability density function (PDF) f(x) satisfies ∫f(x)dx = 1.
          </p>
        </div>
      ),
    },
    {
      title: '3️⃣ Conditional Probability',
      icon: <FiFilter className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Conditional probability</span> P(A|B) is the probability of event A given that we already know event B has occurred. Knowing B changes our belief about A by restricting the sample space to only those outcomes where B is true.
          </p>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <p className="text-purple-300 font-semibold mb-2">Definition:</p>
            <p className="text-gray-300 text-sm font-mono">P(A|B) = P(A∩B) / P(B),   provided P(B) &gt; 0</p>
          </div>
          <p className="text-gray-300">
            Rearranging gives the <span className="text-yellow-300 font-semibold">product rule</span> (also called the chain rule for two events):
          </p>
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/30">
            <p className="text-indigo-300 font-semibold mb-2">Product / Chain Rule:</p>
            <p className="text-gray-300 text-sm font-mono">P(A∩B) = P(A|B) · P(B)  =  P(B|A) · P(A)</p>
            <p className="text-gray-400 text-sm mt-2">Extended to n events:</p>
            <p className="text-gray-300 text-sm font-mono">P(X1,X2,...,Xn) = P(X1) · P(X2|X1) · P(X3|X1,X2) · ... · P(Xn|X1,...,Xn-1)</p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Independence',
      icon: <FiLink className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Two events A and B are <span className="text-cyan-400 font-semibold">independent</span> if knowing that B occurred gives no information about whether A occurred. Formally:
          </p>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 space-y-2">
            <p className="text-purple-300 font-semibold">Independence Condition (all three are equivalent):</p>
            <p className="text-gray-300 text-sm font-mono">A ⊥ B  ⟺  P(A|B) = P(A)</p>
            <p className="text-gray-300 text-sm font-mono">        ⟺  P(B|A) = P(B)</p>
            <p className="text-gray-300 text-sm font-mono">        ⟺  P(A∩B) = P(A) · P(B)</p>
          </div>
          <p className="text-gray-300">
            <span className="text-yellow-300 font-semibold">Conditional independence</span> is more nuanced: A and B may be dependent in general, but independent once we know C. Written A ⊥ B | C. This is the key concept behind Naive Bayes and Bayesian Networks.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-emerald-500 font-mono text-sm text-gray-200">
            <p>A ⊥ B | C  ⟺  P(A,B|C) = P(A|C) · P(B|C)</p>
            <p className="text-gray-400 mt-1">Example: Shoe size and reading ability are correlated, but independent given age (C).</p>
          </div>
        </div>
      ),
    },
    {
      title: "5️⃣ Bayes' Theorem",
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Bayes' theorem</span> is the engine of probabilistic reasoning. It lets us update our beliefs about a hypothesis H after observing evidence E. It is derived directly from the definition of conditional probability.
          </p>
          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30 space-y-2">
            <p className="text-yellow-300 font-semibold mb-1">Bayes' Theorem:</p>
            <p className="text-gray-300 text-sm font-mono text-center">P(H|E) = P(E|H) · P(H) / P(E)</p>
            <div className="mt-3 space-y-1 text-sm">
              <p className="text-gray-300"><span className="text-cyan-400">P(H)</span> — <strong>Prior</strong>: our belief in H before seeing evidence.</p>
              <p className="text-gray-300"><span className="text-cyan-400">P(E|H)</span> — <strong>Likelihood</strong>: how probable is E if H were true?</p>
              <p className="text-gray-300"><span className="text-cyan-400">P(H|E)</span> — <strong>Posterior</strong>: updated belief in H after seeing E.</p>
              <p className="text-gray-300"><span className="text-cyan-400">P(E)</span> — <strong>Evidence</strong> (normalizing constant): total probability of observing E.</p>
            </div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500 font-mono text-sm text-gray-200">
            <p className="text-blue-300 font-semibold mb-1">Law of Total Probability (to compute P(E)):</p>
            <p>P(E) = P(E|H)·P(H) + P(E|¬H)·P(¬H)</p>
            <p className="text-gray-400 mt-1">More generally: P(E) = Σ_h P(E|H=h) · P(H=h)</p>
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ Worked Example: Medical Diagnosis',
      icon: <FiCheckSquare className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            This classic example shows why Bayes' theorem is counterintuitive but essential. Suppose:
          </p>
          <div className="bg-slate-800/60 p-4 rounded-lg border border-gray-600 space-y-1 text-sm text-gray-300">
            <p><span className="text-cyan-400">Disease prevalence</span>: P(Disease) = 0.01  (1 in 100 people have it)</p>
            <p><span className="text-cyan-400">Test sensitivity</span>: P(+Test | Disease) = 0.99  (99% true positive rate)</p>
            <p><span className="text-cyan-400">Test specificity</span>: P(-Test | ¬Disease) = 0.99  (99% true negative rate)</p>
            <p className="mt-2 text-yellow-300">Question: If a patient tests positive, what is P(Disease | +Test)?</p>
          </div>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 space-y-2 text-sm">
            <p className="text-purple-300 font-semibold">Step-by-step calculation:</p>
            <p className="text-gray-300 font-mono">P(+Test | Disease)  = 0.99  (given: sensitivity)</p>
            <p className="text-gray-300 font-mono">P(Disease)          = 0.01  (given: prevalence)</p>
            <p className="text-gray-300 font-mono">P(+Test | ¬Disease) = 1 - 0.99 = 0.01  (false positive rate)</p>
            <p className="text-gray-300 font-mono">P(¬Disease)         = 1 - 0.01 = 0.99</p>
            <p className="text-gray-400 mt-2">Compute evidence P(+Test) using total probability:</p>
            <p className="text-gray-300 font-mono">P(+Test) = 0.99 × 0.01 + 0.01 × 0.99</p>
            <p className="text-gray-300 font-mono">         = 0.0099 + 0.0099 = 0.0198</p>
            <p className="text-gray-400 mt-2">Apply Bayes' theorem:</p>
            <p className="text-gray-300 font-mono">P(Disease | +Test) = (0.99 × 0.01) / 0.0198</p>
            <p className="text-gray-300 font-mono">                   = 0.0099 / 0.0198 ≈ 0.50</p>
          </div>
          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
            <p className="text-emerald-300 font-semibold">Key insight:</p>
            <p className="text-gray-300 text-sm">Even with a 99% accurate test, a positive result only means a 50% chance of actually having the disease — because the disease is rare. This is why screening programs must account for base rates, and why Bayes' theorem is indispensable in medical AI.</p>
          </div>
        </div>
      ),
    },
    {
      title: '7️⃣ Naive Bayes Classification',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            <span className="text-cyan-400 font-semibold">Naive Bayes</span> is a classification algorithm that applies Bayes' theorem with a strong (naive) conditional independence assumption: given the class label C, all features X1, X2, ..., Xn are assumed independent of each other.
          </p>
          <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/30 space-y-2">
            <p className="text-indigo-300 font-semibold">Naive Bayes Classifier:</p>
            <p className="text-gray-300 text-sm font-mono">P(C | X1,...,Xn) ∝ P(C) · Π P(Xi | C)</p>
            <p className="text-gray-400 text-sm mt-1">The class with the highest posterior probability wins.</p>
          </div>
          <p className="text-gray-300">
            <span className="text-yellow-300 font-semibold">Example — Spam filtering:</span> Given an email with words {"{"}"free", "prize", "click"{"}"}, estimate P(Spam | words). The naive assumption is that each word is independently generated given the spam/ham label. Despite being "naive," this works remarkably well in practice.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-yellow-500 text-sm font-mono text-gray-200">
            <p>P(Spam | free, prize, click)</p>
            <p>  ∝ P(Spam) · P(free|Spam) · P(prize|Spam) · P(click|Spam)</p>
            <p className="text-gray-400 mt-1">Compare vs P(Ham) · P(free|Ham) · P(prize|Ham) · P(click|Ham)</p>
            <p className="text-gray-400 mt-1">Pick the class with the larger value.</p>
          </div>
          <p className="text-gray-300">
            Training Naive Bayes means estimating P(C) from class frequencies and P(Xi|C) from feature frequencies within each class. Inference is O(n) per prediction — extremely fast.
          </p>
        </div>
      ),
    },
    {
      title: '8️⃣ Python: Bayes Calculator',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Here is a compact Python implementation of Bayes' theorem and the Naive Bayes classifier concept:
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm font-mono text-green-300 overflow-x-auto">
            <pre>{`def bayes(prior, likelihood, evidence):
    """
    Compute posterior probability using Bayes' theorem.
    P(H|E) = P(E|H) * P(H) / P(E)
    """
    return (likelihood * prior) / evidence

def total_probability(likelihood_h, prior_h, likelihood_not_h):
    """Compute P(E) via law of total probability."""
    prior_not_h = 1 - prior_h
    return likelihood_h * prior_h + likelihood_not_h * prior_not_h

# Medical diagnosis example
prior_disease     = 0.01   # P(Disease)
sensitivity       = 0.99   # P(+Test | Disease)
false_pos_rate    = 0.01   # P(+Test | No Disease)

p_positive_test = total_probability(sensitivity, prior_disease, false_pos_rate)
posterior = bayes(prior_disease, sensitivity, p_positive_test)

print(f"P(+Test)           = {p_positive_test:.4f}")
print(f"P(Disease | +Test) = {posterior:.4f}")
# Output: P(Disease | +Test) = 0.5000

# Naive Bayes: spam classification (log-probabilities to avoid underflow)
import math

# Training data (counts from corpus)
spam_probs = {"free": 0.8, "prize": 0.7, "click": 0.6, "hello": 0.1}
ham_probs  = {"free": 0.1, "prize": 0.05, "click": 0.1, "hello": 0.6}
p_spam = 0.3   # 30% of emails are spam

def naive_bayes_classify(words, p_spam, spam_dict, ham_dict):
    log_spam = math.log(p_spam)
    log_ham  = math.log(1 - p_spam)
    for w in words:
        log_spam += math.log(spam_dict.get(w, 0.01))
        log_ham  += math.log(ham_dict.get(w, 0.01))
    return "Spam" if log_spam > log_ham else "Ham"

email = ["free", "prize", "click"]
print(naive_bayes_classify(email, p_spam, spam_probs, ham_probs))
# Output: Spam`}</pre>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: "A fair die is rolled. What is P(even | greater than 3)?",
      solution: "Sample space given >3 is {4,5,6}. Even numbers in this set: {4,6}. P(even | >3) = 2/3 ≈ 0.667.",
    },
    {
      question: "State the three Kolmogorov axioms of probability and derive the complement rule P(¬A) = 1 - P(A) from them.",
      solution: "Axioms: (1) P(A)≥0, (2) P(Ω)=1, (3) P(A∪B)=P(A)+P(B) when A∩B=∅. Derivation: A and ¬A are mutually exclusive and A∪¬A=Ω. By axiom 3: P(A)+P(¬A)=P(Ω)=1, so P(¬A)=1-P(A).",
    },
    {
      question: "A bag has 3 red and 2 blue balls. Two balls are drawn without replacement. What is P(both red)?",
      solution: "P(first red) = 3/5. Given first is red, P(second red) = 2/4 = 1/2. By the product rule: P(both red) = 3/5 × 1/2 = 3/10 = 0.30.",
    },
    {
      question: "Define conditional independence A ⊥ B | C. Give a real-world example where two variables are marginally dependent but conditionally independent given a third.",
      solution: "A ⊥ B | C means P(A,B|C) = P(A|C)·P(B|C). Example: Ice cream sales (A) and drowning incidents (B) are correlated, but both are caused by hot weather (C). Given temperature, they are conditionally independent.",
    },
    {
      question: "Using Bayes' theorem, compute P(H|E) given P(E|H)=0.90, P(H)=0.05, P(E|¬H)=0.20.",
      solution: "P(E) = 0.90×0.05 + 0.20×0.95 = 0.045 + 0.19 = 0.235. P(H|E) = (0.90×0.05)/0.235 = 0.045/0.235 ≈ 0.191.",
    },
    {
      question: "In the medical diagnosis example (prevalence 1%, test accuracy 99%), what happens to the posterior P(Disease|+Test) if the disease prevalence increases to 10%? Recalculate.",
      solution: "P(+Test) = 0.99×0.10 + 0.01×0.90 = 0.099 + 0.009 = 0.108. P(Disease|+Test) = (0.99×0.10)/0.108 = 0.099/0.108 ≈ 0.917. Posterior jumps from 50% to ~92% — prior matters enormously.",
    },
    {
      question: "Explain the 'base rate fallacy' in the context of Bayes' theorem. Why do people often overestimate the probability of a rare event after a positive test?",
      solution: "People ignore the prior P(H) and focus only on the likelihood P(E|H). When a disease is rare (low prior), even an accurate test produces many false positives relative to true positives, making the posterior much lower than intuition suggests. Bayesian reasoning corrects this by explicitly incorporating the base rate.",
    },
    {
      question: "Write the Naive Bayes decision rule for classifying a document into class C given features X1,...,Xn. What is the key independence assumption being made?",
      solution: "Decision: argmax_C P(C) · Π P(Xi|C). The key assumption is conditional independence: P(X1,...,Xn|C) = Π P(Xi|C). Given the class label, all features are assumed independent of each other — this is 'naive' because it ignores word order and feature correlations.",
    },
    {
      question: "Why are log probabilities used in Naive Bayes classifiers instead of raw probabilities?",
      solution: "Multiplying many small probabilities together causes numerical underflow (the product becomes too small for floating-point representation). Taking logarithms converts products into sums: log(Π P(Xi|C)) = Σ log P(Xi|C), which is numerically stable. The argmax is unchanged because log is monotonically increasing.",
    },
    {
      question: "Prove that if A and B are independent, then A and ¬B are also independent.",
      solution: "P(A∩¬B) = P(A) - P(A∩B) = P(A) - P(A)P(B) [by independence] = P(A)(1-P(B)) = P(A)P(¬B). Since P(A∩¬B) = P(A)P(¬B), A and ¬B are independent by definition.",
    },
  ],
  exampleProblems: [
    {
      problem: "A factory has two machines: Machine A produces 60% of widgets, Machine B produces 40%. Machine A has a 2% defect rate; Machine B has a 5% defect rate. A widget is selected at random and found defective. What is the probability it came from Machine B?",
      solution: "P(B|Defective) ≈ 0.625",
      steps: [
        {
          step: "Identify the priors",
          explanation: "P(A) = 0.60, P(B) = 0.40. These are the base rates for each machine.",
        },
        {
          step: "Identify the likelihoods",
          explanation: "P(Defective|A) = 0.02, P(Defective|B) = 0.05.",
        },
        {
          step: "Compute evidence using total probability",
          explanation: "P(Defective) = P(Defective|A)·P(A) + P(Defective|B)·P(B) = 0.02×0.60 + 0.05×0.40 = 0.012 + 0.020 = 0.032.",
        },
        {
          step: "Apply Bayes' theorem",
          explanation: "P(B|Defective) = P(Defective|B)·P(B) / P(Defective) = (0.05×0.40)/0.032 = 0.020/0.032 = 0.625.",
        },
      ],
    },
  ],
}

export default function ProbabilityBayesPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
