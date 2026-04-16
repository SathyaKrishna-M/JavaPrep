export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  href: string
  co?: string
}

export const topics: Topic[] = [
  // CO1 — AI Agents, Problem Formulation & Python
  {
    id: 'intro-ai-agents',
    title: '1. Introduction to AI & Intelligent Agents',
    description: 'What is AI, history, types of AI, rational agents, agent function vs agent program',
    icon: '🤖',
    href: '/subjects/computational-foundations-ai/topics/CO1/intro-ai-agents',
    co: 'CO1',
  },
  {
    id: 'peas-environments',
    title: '2. PEAS Framework & Environment Types',
    description: 'Performance, Environment, Actuators, Sensors; fully/partially observable, deterministic, stochastic, episodic, sequential, static, dynamic, discrete, continuous',
    icon: '🌍',
    href: '/subjects/computational-foundations-ai/topics/CO1/peas-environments',
    co: 'CO1',
  },
  {
    id: 'problem-formulation',
    title: '3. Problem Formulation',
    description: 'State space, initial state, actions, transition model, goal test, path cost; well-defined problems and examples',
    icon: '🧩',
    href: '/subjects/computational-foundations-ai/topics/CO1/problem-formulation',
    co: 'CO1',
  },
  {
    id: 'knowledge-representation',
    title: '4. Knowledge Representation',
    description: 'Graphs, trees, rule sets, constraints; representing world knowledge for AI reasoning',
    icon: '🗺️',
    href: '/subjects/computational-foundations-ai/topics/CO1/knowledge-representation',
    co: 'CO1',
  },
  {
    id: 'python-ai-essentials',
    title: '5. Python Essentials for AI',
    description: 'Functions, recursion, classes for state, dataclasses, typing hints, complexity-aware coding',
    icon: '🐍',
    href: '/subjects/computational-foundations-ai/topics/CO1/python-ai-essentials',
    co: 'CO1',
  },
  {
    id: 'python-ds-ai',
    title: '6. Core Data Structures in Python for AI',
    description: 'dict/set/list operations, heaps, priority queues (heapq), deque; choosing the right structure for AI algorithms',
    icon: '📦',
    href: '/subjects/computational-foundations-ai/topics/CO1/python-ds-ai',
    co: 'CO1',
  },

  // CO2 — Search Algorithms
  {
    id: 'uninformed-search',
    title: '7. Uninformed Search Strategies',
    description: 'BFS, DFS, UCS — algorithms, complexity (time/space/optimality/completeness), trace examples',
    icon: '🔍',
    href: '/subjects/computational-foundations-ai/topics/CO2/uninformed-search',
    co: 'CO2',
  },
  {
    id: 'informed-search',
    title: '8. Informed Search — A* & Greedy',
    description: 'Best-first search, Greedy BFS, A* algorithm, f(n)=g(n)+h(n), open/closed sets, tie-breaking',
    icon: '⭐',
    href: '/subjects/computational-foundations-ai/topics/CO2/informed-search',
    co: 'CO2',
  },
  {
    id: 'heuristic-design',
    title: '9. Heuristic Design & Evaluation',
    description: 'Admissibility, consistency (monotonicity), relaxed problems, dominant heuristics, empirical profiling',
    icon: '🎯',
    href: '/subjects/computational-foundations-ai/topics/CO2/heuristic-design',
    co: 'CO2',
  },
  {
    id: 'memory-bounded-search',
    title: '10. Memory-Bounded & Advanced Search',
    description: 'IDA*, bidirectional search, implicit state spaces (puzzles), graph search vs tree search',
    icon: '🧠',
    href: '/subjects/computational-foundations-ai/topics/CO2/memory-bounded-search',
    co: 'CO2',
  },

  // CO3 — Constraint Satisfaction Problems
  {
    id: 'csp-modeling',
    title: '11. CSP Modeling & Backtracking',
    description: 'Variables, domains, constraints; backtracking search, constraint graph, binary CSPs',
    icon: '🔒',
    href: '/subjects/computational-foundations-ai/topics/CO3/csp-modeling',
    co: 'CO3',
  },
  {
    id: 'constraint-propagation',
    title: '12. Constraint Propagation',
    description: 'Forward checking, arc consistency (AC-3), maintaining arc consistency (MAC), constraint networks',
    icon: '🔗',
    href: '/subjects/computational-foundations-ai/topics/CO3/constraint-propagation',
    co: 'CO3',
  },
  {
    id: 'csp-heuristics',
    title: '13. CSP Heuristics',
    description: 'Minimum Remaining Values (MRV), Degree heuristic, Least Constraining Value (LCV), ordering strategies',
    icon: '📊',
    href: '/subjects/computational-foundations-ai/topics/CO3/csp-heuristics',
    co: 'CO3',
  },
  {
    id: 'local-search-csp',
    title: '14. Local Search for CSP',
    description: 'Min-conflicts algorithm, hill climbing, simulated annealing for CSP, scheduling and timetabling problems',
    icon: '🏔️',
    href: '/subjects/computational-foundations-ai/topics/CO3/local-search-csp',
    co: 'CO3',
  },

  // CO4 — Adversarial Search & Game Theory
  {
    id: 'game-trees-minimax',
    title: '15. Game Trees & Minimax Algorithm',
    description: 'Two-player zero-sum games, game tree, MIN and MAX nodes, minimax decision, terminal states',
    icon: '♟️',
    href: '/subjects/computational-foundations-ai/topics/CO4/game-trees-minimax',
    co: 'CO4',
  },
  {
    id: 'alpha-beta-pruning',
    title: '16. Alpha-Beta Pruning',
    description: 'α and β values, pruning conditions, best-case and worst-case complexity, move ordering',
    icon: '✂️',
    href: '/subjects/computational-foundations-ai/topics/CO4/alpha-beta-pruning',
    co: 'CO4',
  },
  {
    id: 'evaluation-functions',
    title: '17. Evaluation Functions & Depth Limits',
    description: 'Heuristic evaluation, quiescence search, iterative deepening in games, horizon effect',
    icon: '📏',
    href: '/subjects/computational-foundations-ai/topics/CO4/evaluation-functions',
    co: 'CO4',
  },
  {
    id: 'stochastic-decisions',
    title: '18. Stochastic & Multi-Agent Decisions',
    description: 'Expectimax algorithm, chance nodes, bounded rationality, multi-agent reasoning basics',
    icon: '🎲',
    href: '/subjects/computational-foundations-ai/topics/CO4/stochastic-decisions',
    co: 'CO4',
  },

  // CO5 — Probabilistic Reasoning
  {
    id: 'probability-bayes',
    title: '19. Probability & Bayes Rule',
    description: 'Basic probability, conditional probability, Bayes theorem, prior and posterior, worked examples',
    icon: '🎰',
    href: '/subjects/computational-foundations-ai/topics/CO5/probability-bayes',
    co: 'CO5',
  },
  {
    id: 'bayesian-networks',
    title: '20. Bayesian Networks',
    description: 'Structure (DAG), CPTs, joint probability, D-separation, independence assertions, building a BN',
    icon: '🕸️',
    href: '/subjects/computational-foundations-ai/topics/CO5/bayesian-networks',
    co: 'CO5',
  },
  {
    id: 'inference-bn',
    title: '21. Inference in Bayesian Networks',
    description: 'Variable elimination, factor operations, belief propagation intuition, sampling (rejection, likelihood weighting)',
    icon: '🔬',
    href: '/subjects/computational-foundations-ai/topics/CO5/inference-bn',
    co: 'CO5',
  },
  {
    id: 'markov-hmm',
    title: '22. Markov Chains & Hidden Markov Models',
    description: 'Markov property, transition matrix, HMM structure, forward algorithm, Viterbi (intuition), sensor fusion',
    icon: '🔄',
    href: '/subjects/computational-foundations-ai/topics/CO5/markov-hmm',
    co: 'CO5',
  },

  // CO6 — Hybrid AI & Ethics
  {
    id: 'hybrid-ai-architectures',
    title: '23. Hybrid AI Architectures',
    description: 'Combining search + CSP + probabilistic inference + decision logic; rule-based + statistical AI',
    icon: '🏗️',
    href: '/subjects/computational-foundations-ai/topics/CO6/hybrid-ai-architectures',
    co: 'CO6',
  },
  {
    id: 'explainable-ai',
    title: '24. Explainable AI & Reasoning Traces',
    description: 'Why explainability matters, reasoning trace generation, failure analysis, performance engineering',
    icon: '💡',
    href: '/subjects/computational-foundations-ai/topics/CO6/explainable-ai',
    co: 'CO6',
  },
  {
    id: 'ai-ethics-limitations',
    title: '25. AI Ethics & Limitations',
    description: 'Bias in heuristics, uncertainty miscalibration, responsible AI, preparing for ML/DL/NLP/GenAI',
    icon: '⚖️',
    href: '/subjects/computational-foundations-ai/topics/CO6/ai-ethics-limitations',
    co: 'CO6',
  },
]
