'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCpu, FiLayers, FiZap, FiSearch, FiActivity, FiAlertTriangle, FiCode, FiSettings, FiBarChart2 } from 'react-icons/fi'

const content = {
  title: 'Hybrid AI Architectures',
  explanationSections: [
    {
      title: '1️⃣ Motivation: No Single AI Technique is Universal',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Every AI technique we have studied — rule-based reasoning, search, constraint satisfaction, game AI, and probabilistic inference — excels in <span className="text-cyan-400 font-semibold">different problem settings</span>. No single paradigm handles every real-world challenge well.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 font-semibold mb-1">Rule-Based Systems</p>
              <p className="text-gray-400 text-sm">Great for well-defined, structured knowledge. Brittle when the world is noisy or incomplete.</p>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/30">
              <p className="text-purple-300 font-semibold mb-1">Search-Based Systems</p>
              <p className="text-gray-400 text-sm">Great for planning and optimization. Slow and memory-hungry for very large state spaces.</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold mb-1">Probabilistic Systems</p>
              <p className="text-gray-400 text-sm">Great for uncertainty and noisy sensors. Cannot enforce hard logical constraints directly.</p>
            </div>
          </div>
          <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
            <p className="text-yellow-300 font-semibold mb-2">The Hybrid Insight:</p>
            <p className="text-gray-300 text-sm">
              Real intelligent systems — self-driving cars, medical diagnosis tools, intelligent assistants — face <em>all</em> these challenges simultaneously. A <span className="text-cyan-400 font-semibold">hybrid AI architecture</span> combines multiple paradigms so each handles the part of the problem it is best suited for.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ Component Paradigms Reviewed',
      icon: <FiSettings className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-blue-400 mb-2">2.1 Rule-Based Systems</h4>
            <p className="text-gray-300 text-sm mb-2">
              A <span className="text-cyan-400 font-semibold">knowledge base</span> stores facts and IF-THEN rules. An <span className="text-cyan-400 font-semibold">inference engine</span> applies forward chaining (data-driven) or backward chaining (goal-driven) to derive new conclusions.
            </p>
            <div className="bg-black/30 p-3 rounded-lg font-mono text-xs text-gray-300">
              <p className="text-blue-300 mb-1"># Knowledge Base (example rules)</p>
              <p>IF temperature &gt; 38.5 THEN fever = True</p>
              <p>IF fever AND cough THEN possible_flu = True</p>
              <p>IF possible_flu AND duration &gt; 3 THEN recommend_doctor = True</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="bg-green-900/10 p-3 rounded border border-green-500/20">
                <p className="text-green-300 font-semibold text-sm">Pros</p>
                <ul className="text-gray-400 text-xs space-y-1 mt-1 list-disc list-inside">
                  <li>Fully transparent and explainable</li>
                  <li>Easy to audit and modify</li>
                  <li>No training data required</li>
                </ul>
              </div>
              <div className="bg-red-900/10 p-3 rounded border border-red-500/20">
                <p className="text-red-300 font-semibold text-sm">Cons</p>
                <ul className="text-gray-400 text-xs space-y-1 mt-1 list-disc list-inside">
                  <li>Cannot handle uncertainty or noise</li>
                  <li>Rule explosion for complex domains</li>
                  <li>Brittle — one missing fact can fail the entire chain</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-purple-400 mb-2">2.2 Search-Based Systems</h4>
            <p className="text-gray-300 text-sm mb-2">
              Problems are modelled as a <span className="text-cyan-400 font-semibold">state space</span>: an initial state, goal state, and transition operators. Algorithms like A*, BFS, or IDDFS navigate the space to find a solution path.
            </p>
            <div className="bg-slate-800/50 p-3 rounded text-sm text-gray-300">
              <strong className="text-purple-300">Use cases in hybrids:</strong> Route planning, task scheduling, sequence generation, game-playing sub-components.
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-green-400 mb-2">2.3 Probabilistic Systems (Bayesian Networks, HMMs)</h4>
            <p className="text-gray-300 text-sm mb-2">
              Model the world with <span className="text-cyan-400 font-semibold">probability distributions</span>. Use evidence to update beliefs via Bayes' theorem. Handle sensor noise, partial observability, and uncertainty about the environment gracefully.
            </p>
            <div className="bg-slate-800/50 p-3 rounded text-sm text-gray-300">
              <strong className="text-green-300">Use cases in hybrids:</strong> Sensor fusion, obstacle detection, speech recognition, anomaly detection.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Hybrid Architecture: Combining All Three',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            A hybrid architecture assigns each sub-problem to the most appropriate AI paradigm and defines how the components <span className="text-cyan-400 font-semibold">communicate and share state</span>.
          </p>

          <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-semibold mb-3">Example 1: Self-Driving Car</p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3 items-start">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded shrink-0">Rules</span>
                <p className="text-gray-300">Hard constraints enforced via CSP: traffic lights, speed limits, lane rules, right-of-way laws. These <em>must</em> be obeyed — no uncertainty here.</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded shrink-0">Search</span>
                <p className="text-gray-300">A* / Dijkstra to plan the optimal route on the road network from current position to destination.</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded shrink-0">Probabilistic</span>
                <p className="text-gray-300">Bayesian Network / particle filter to fuse LIDAR, camera, and radar data for obstacle detection and pedestrian tracking under sensor noise.</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
            <p className="text-orange-300 font-semibold mb-3">Example 2: Medical Diagnosis System</p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3 items-start">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded shrink-0">Rules</span>
                <p className="text-gray-300">Clinical guidelines encoded as IF-THEN rules: "IF creatinine &gt; 1.2 THEN flag kidney stress."</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded shrink-0">Probabilistic</span>
                <p className="text-gray-300">Bayesian Network to compute P(disease | symptoms, test results), ranking differential diagnoses by posterior probability.</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded shrink-0">Search</span>
                <p className="text-gray-300">Best-first search over treatment plans to find the sequence of tests and interventions that maximises diagnostic confidence within cost/time constraints.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Architecture Patterns: Three Layers',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The most influential hybrid AI architecture is the <span className="text-cyan-400 font-semibold">Three-Layer Architecture</span>, which separates fast reactive behaviour from slow deliberative reasoning and uncertain world modelling.
          </p>

          <div className="space-y-3">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
              <div className="flex justify-between items-center mb-2">
                <p className="text-red-300 font-bold">Reactive Layer (Bottom)</p>
                <span className="text-xs bg-red-900 text-red-200 px-2 py-0.5 rounded">Fast — milliseconds</span>
              </div>
              <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                <li>Rule-based, hardwired stimulus → response mappings</li>
                <li>No reasoning, no search — just lookup and execute</li>
                <li>Example: "If obstacle closer than 0.5m → emergency brake"</li>
                <li>Handles real-time safety constraints and reflexes</li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
              <div className="flex justify-between items-center mb-2">
                <p className="text-yellow-300 font-bold">Deliberative Layer (Middle)</p>
                <span className="text-xs bg-yellow-900 text-yellow-200 px-2 py-0.5 rounded">Slow — seconds</span>
              </div>
              <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                <li>Search-based planning and goal achievement</li>
                <li>Maintains world model, generates action sequences</li>
                <li>Example: Plan a 3-turn manoeuvre to merge into traffic</li>
                <li>Can be pre-empted by the reactive layer if safety threats arise</li>
              </ul>
            </div>

            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <div className="flex justify-between items-center mb-2">
                <p className="text-green-300 font-bold">Probabilistic Layer (Top)</p>
                <span className="text-xs bg-green-900 text-green-200 px-2 py-0.5 rounded">Asynchronous</span>
              </div>
              <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                <li>Maintains probabilistic world model via sensor fusion</li>
                <li>Provides uncertainty-aware percepts to other layers</li>
                <li>Example: "Confidence that object at (x,y) is a pedestrian = 0.87"</li>
                <li>Updates continuously as new sensor data arrives</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/50 p-3 rounded text-sm text-gray-300">
            <strong className="text-cyan-300">Data Flow:</strong> Sensors → Probabilistic Layer → Deliberative Layer → Reactive Layer → Actuators. Higher layers can send goals downward; lower layers can interrupt with safety overrides.
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Performance Engineering: Profiling AI Systems',
      icon: <FiBarChart2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Hybrid AI systems are complex enough that <span className="text-cyan-400 font-semibold">performance bottlenecks</span> are not obvious. Profiling means measuring where time and memory are spent so engineering effort is applied correctly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-teal-300 font-semibold mb-2">What to Measure</p>
              <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                <li>Latency per layer (reactive must be &lt; 10 ms)</li>
                <li>Nodes expanded per search call</li>
                <li>Inference time for BN (variable elimination vs sampling)</li>
                <li>Rule engine firing frequency</li>
                <li>Memory for frontier / belief state</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-teal-300 font-semibold mb-2">Bottleneck Identification Strategy</p>
              <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                <li>Add timing wrappers around each component</li>
                <li>Log call frequency and average duration</li>
                <li>Look for components called in tight loops unnecessarily</li>
                <li>Compare wall-clock vs CPU time (detect I/O waits)</li>
                <li>Use Python <code className="text-cyan-400">cProfile</code> or <code className="text-cyan-400">line_profiler</code></li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-2">Common Performance Fixes</p>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Search too slow</span>
                <span className="text-cyan-400">→ Improve heuristic, add pruning, use bidirectional search</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">BN inference too slow</span>
                <span className="text-cyan-400">→ Switch to approximate inference (MCMC), reduce graph complexity</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Rule engine too slow</span>
                <span className="text-cyan-400">→ Use Rete algorithm, index facts, prune irrelevant rules</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ Failure Analysis: Why AI Systems Fail',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Understanding <span className="text-cyan-400 font-semibold">failure modes</span> is as important as understanding algorithms. Real AI deployments fail in characteristic ways.
          </p>

          <div className="space-y-3">
            <div className="bg-red-900/10 p-3 rounded border-l-4 border-red-500">
              <p className="text-red-300 font-semibold">Search Failures</p>
              <ul className="text-gray-400 text-sm mt-1 space-y-1 list-disc list-inside">
                <li><strong>Heuristic overestimation:</strong> A* finds suboptimal paths. Debug by verifying admissibility.</li>
                <li><strong>State explosion:</strong> Frontier grows beyond RAM. Debug by checking branching factor, adding pruning.</li>
                <li><strong>Goal not reachable:</strong> Missing edge in state graph. Debug with reachability analysis.</li>
              </ul>
            </div>
            <div className="bg-orange-900/10 p-3 rounded border-l-4 border-orange-500">
              <p className="text-orange-300 font-semibold">Rule-Based Failures</p>
              <ul className="text-gray-400 text-sm mt-1 space-y-1 list-disc list-inside">
                <li><strong>Rule conflicts:</strong> Two rules fire and contradict each other. Debug with conflict resolution strategy.</li>
                <li><strong>Missing rules:</strong> Novel situation not covered. Debug by checking uncovered test cases.</li>
                <li><strong>Circular inference:</strong> Rule A triggers rule B which triggers rule A. Debug with cycle detection.</li>
              </ul>
            </div>
            <div className="bg-yellow-900/10 p-3 rounded border-l-4 border-yellow-500">
              <p className="text-yellow-300 font-semibold">Probabilistic Failures</p>
              <ul className="text-gray-400 text-sm mt-1 space-y-1 list-disc list-inside">
                <li><strong>Miscalibrated priors:</strong> Prior probabilities don't match reality. Debug by recalibrating from data.</li>
                <li><strong>Conditional independence violations:</strong> BN assumes independence that doesn't hold. Debug with structure tests.</li>
                <li><strong>Probability collapse:</strong> Posterior becomes 0 or 1 incorrectly. Debug with Laplace smoothing.</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-300 font-semibold mb-2">General Debugging Strategy</p>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>Isolate the failing component (reproduce in unit test)</li>
              <li>Add trace logging to observe intermediate state</li>
              <li>Compare actual intermediate values to expected values</li>
              <li>Form a hypothesis and verify with a minimal failing example</li>
              <li>Fix and add regression test to prevent recurrence</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      title: '7️⃣ Python: Skeleton of a Hybrid Agent',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The following Python skeleton demonstrates how the three layers can be composed into a single <span className="text-cyan-400 font-semibold">HybridAgent</span> class. Each layer is replaceable with a full implementation.
          </p>
          <div className="bg-black/40 p-4 rounded-lg border border-gray-700 font-mono text-xs text-gray-300 overflow-x-auto">
            <p className="text-blue-300 mb-2"># hybrid_agent.py — Skeleton of a Three-Layer Hybrid AI Agent</p>
            <p className="text-gray-500">import time, logging</p>
            <p className="text-gray-500 mb-3">from dataclasses import dataclass, field</p>

            <p className="text-yellow-300">@dataclass</p>
            <p><span className="text-yellow-300">class</span> <span className="text-cyan-300">Percept</span>:</p>
            <p className="pl-4">sensor_data: dict = field(default_factory=dict)</p>
            <p className="pl-4 mb-3">timestamp: float = field(default_factory=time.time)</p>

            <p className="text-yellow-300">class</p>
            <p><span className="text-yellow-300">class</span> <span className="text-cyan-300">ProbabilisticLayer</span>:</p>
            <p className="pl-4 text-gray-500">"""Updates a belief state from sensor evidence."""</p>
            <p className="pl-4"><span className="text-yellow-300">def</span> <span className="text-green-300">update</span>(self, percept: Percept) -&gt; dict:</p>
            <p className="pl-8 text-gray-500"># TODO: run Bayesian Network / particle filter</p>
            <p className="pl-8">belief = {"{"}&#34;obstacle_prob&#34;: 0.12, &#34;road_clear&#34;: 0.88{"}"}</p>
            <p className="pl-8 mb-3">return belief</p>

            <p><span className="text-yellow-300">class</span> <span className="text-cyan-300">DeliberativeLayer</span>:</p>
            <p className="pl-4 text-gray-500">"""Plans a sequence of actions using search."""</p>
            <p className="pl-4"><span className="text-yellow-300">def</span> <span className="text-green-300">plan</span>(self, belief: dict, goal: str) -&gt; list:</p>
            <p className="pl-8 text-gray-500"># TODO: run A* / CSP over action space</p>
            <p className="pl-8">actions = [&#34;accelerate&#34;, &#34;steer_left&#34;, &#34;merge&#34;]</p>
            <p className="pl-8 mb-3">return actions</p>

            <p><span className="text-yellow-300">class</span> <span className="text-cyan-300">ReactiveLayer</span>:</p>
            <p className="pl-4 text-gray-500">"""Fast rule-based safety overrides."""</p>
            <p className="pl-4"><span className="text-yellow-300">def</span> <span className="text-green-300">check</span>(self, belief: dict) -&gt; str | None:</p>
            <p className="pl-8">if belief.get(&#34;obstacle_prob&#34;, 0) &gt; 0.8:</p>
            <p className="pl-12">return &#34;EMERGENCY_BRAKE&#34;  <span className="text-gray-500"># override everything</span></p>
            <p className="pl-8 mb-3">return None</p>

            <p><span className="text-yellow-300">class</span> <span className="text-cyan-300">HybridAgent</span>:</p>
            <p className="pl-4"><span className="text-yellow-300">def</span> <span className="text-green-300">__init__</span>(self, goal: str):</p>
            <p className="pl-8">self.goal = goal</p>
            <p className="pl-8">self.prob = ProbabilisticLayer()</p>
            <p className="pl-8">self.delib = DeliberativeLayer()</p>
            <p className="pl-8 mb-2">self.react = ReactiveLayer()</p>

            <p className="pl-4"><span className="text-yellow-300">def</span> <span className="text-green-300">act</span>(self, percept: Percept) -&gt; str:</p>
            <p className="pl-8 text-gray-500"># Step 1: Update world model</p>
            <p className="pl-8">belief = self.prob.update(percept)</p>
            <p className="pl-8 text-gray-500"># Step 2: Reactive check (fast, can override)</p>
            <p className="pl-8">override = self.react.check(belief)</p>
            <p className="pl-8">if override:</p>
            <p className="pl-12">logging.warning(f&#34;Reactive override: {"{"}override{"}"}&#34;)</p>
            <p className="pl-12">return override</p>
            <p className="pl-8 text-gray-500"># Step 3: Deliberate (slow, full plan)</p>
            <p className="pl-8">actions = self.delib.plan(belief, self.goal)</p>
            <p className="pl-8">return actions[0] if actions else &#34;IDLE&#34;</p>
          </div>
          <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30 text-sm">
            <p className="text-green-300 font-semibold mb-1">Key Design Points:</p>
            <ul className="text-gray-300 space-y-1 list-disc list-inside">
              <li>Reactive layer is always checked first — safety before plans</li>
              <li>Layers are loosely coupled via the <code className="text-cyan-400">belief</code> dictionary</li>
              <li>Each layer can be unit-tested and swapped independently</li>
              <li>Logging at every layer enables post-hoc failure analysis</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '8️⃣ Summary',
      icon: <FiActivity className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-300 font-semibold mb-2">Key Takeaways</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>No single AI paradigm is sufficient for complex real-world systems</li>
              <li>Hybrid architectures assign sub-problems to the best-suited technique</li>
              <li>Three-layer architecture: Reactive (fast/rules) → Deliberative (search) → Probabilistic (uncertainty)</li>
              <li>Self-driving cars and medical AI are canonical hybrid architecture examples</li>
              <li>Performance profiling reveals bottlenecks; each layer has characteristic failure modes</li>
              <li>Modular design enables independent testing and replacement of each layer</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: "Why is a purely rule-based system insufficient for a self-driving car?",
      solution: "Self-driving cars face sensor noise, ambiguous situations, and partial observability (e.g., occluded pedestrians). Rule-based systems cannot quantify uncertainty or handle cases not explicitly anticipated by the rule author. A probabilistic layer is required for robust perception.",
    },
    {
      question: "In the three-layer architecture, which layer has the lowest latency requirement and why?",
      solution: "The Reactive Layer. It must respond to safety-critical stimuli (like sudden obstacle detection) within milliseconds to prevent physical harm. Deliberation is too slow for emergency braking.",
    },
    {
      question: "MCQ: In a hybrid medical diagnosis system, which component would most appropriately handle 'IF creatinine > 1.2 THEN flag kidney stress'?\nA) Search layer\nB) Rule-based layer\nC) Probabilistic layer\nD) None of the above",
      solution: "B) Rule-based layer. This is a deterministic clinical guideline with no uncertainty — exactly what IF-THEN rules model well.",
    },
    {
      question: "A hybrid agent's search planner is taking 800ms per call on average. The reactive layer needs sub-10ms response. How would you fix this?",
      solution: "Decouple the deliberative layer from the reactive layer. Run the planner asynchronously in a separate thread/process. The reactive layer consumes the most recent available plan. The deliberative layer re-plans in the background without blocking real-time response.",
    },
    {
      question: "MCQ: Which of the following is a characteristic failure of a rule-based subsystem?\nA) Miscalibrated priors\nB) Horizon effect\nC) Circular inference / rule conflict\nD) State space explosion",
      solution: "C) Circular inference / rule conflict. A fires B fires A is a classic rule-engine failure. Option A is probabilistic, B is game search, D is general search.",
    },
    {
      question: "Explain how the self-driving car hybrid architecture handles the scenario: 'Plan a route but stop immediately for a child running into the road.'",
      solution: "The Deliberative Layer plans the route using search (A*). The Probabilistic Layer detects the child via camera/LIDAR fusion and updates belief: P(obstacle < 1m) = 0.95. The Reactive Layer's rule 'IF obstacle_prob > 0.8 THEN EMERGENCY_BRAKE' fires and overrides the deliberative plan immediately, regardless of the planned route.",
    },
    {
      question: "What is the Rete algorithm and why is it relevant to rule engine performance?",
      solution: "The Rete algorithm is a pattern-matching algorithm for implementing rule-based systems efficiently. Instead of re-evaluating all rules on every cycle, it maintains a network of partial matches and only re-evaluates rules whose conditions have changed. This reduces the rule-engine from O(rules × facts) per cycle to near O(changes) per cycle.",
    },
    {
      question: "A medical diagnosis hybrid AI keeps giving 'recommend_doctor = False' even when the patient has a fever and cough for 5 days. Describe your debugging approach.",
      solution: "Step 1: Add trace logging to the inference engine to see which rules fired. Step 2: Check if the 'fever' fact was actually asserted (verify threshold computation). Step 3: Check if 'possible_flu' was derived. Step 4: Check if the duration rule 'duration > 3' was evaluated correctly (data type issue?). This is a classic missing-fact / data pipeline bug traced via inference chain logging.",
    },
    {
      question: "MCQ: Which Python tool is most appropriate for finding which function in a hybrid AI agent consumes the most CPU time?\nA) unittest\nB) cProfile\nC) logging\nD) timeit",
      solution: "B) cProfile. It profiles the entire call graph and shows cumulative time per function, making it ideal for identifying bottlenecks across layers. timeit measures a single expression; logging measures developer-placed checkpoints.",
    },
    {
      question: "Why is loose coupling between layers (communicating via a shared 'belief' dictionary) a good design choice for a hybrid AI architecture?",
      solution: "Loose coupling means each layer depends only on the interface (the belief dictionary schema), not on the internal implementation of other layers. This allows: (1) independent unit testing of each layer, (2) swapping one layer's algorithm without modifying others (e.g., replace A* with MCTS in the deliberative layer), (3) easier debugging by inspecting the shared belief state at each step.",
    },
  ],
  exampleProblems: [],
}

export default function HybridAIArchitecturesPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
