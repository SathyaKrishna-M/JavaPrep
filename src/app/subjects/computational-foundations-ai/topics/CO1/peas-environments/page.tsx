'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiTarget, FiGrid, FiSliders, FiCpu } from 'react-icons/fi'

const content = {
  title: 'PEAS Framework & Environment Types',
  explanationSections: [
    {
      title: '1️⃣ PEAS Framework — Specifying an Agent',
      icon: <FiTarget className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Before designing an AI agent, you must precisely specify the <span className="text-cyan-400 font-semibold">task environment</span>. The{' '}
            <span className="text-violet-400 font-semibold">PEAS</span> framework provides a structured way to do this. PEAS stands for:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { letter: 'P', word: 'Performance Measure', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', desc: 'How do we evaluate success? What is the agent trying to optimize?' },
              { letter: 'E', word: 'Environment', color: 'text-violet-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', desc: 'What external world does the agent operate in?' },
              { letter: 'A', word: 'Actuators', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', desc: 'What actions can the agent take to affect the environment?' },
              { letter: 'S', word: 'Sensors', color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/30', desc: 'How does the agent perceive the environment?' },
            ].map(({ letter, word, color, bg, border, desc }) => (
              <div key={letter} className={`${bg} border ${border} p-4 rounded-lg`}>
                <p className={`text-4xl font-black ${color} mb-1`}>{letter}</p>
                <p className={`font-bold ${color} text-sm mb-2`}>{word}</p>
                <p className="text-gray-400 text-xs">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Why PEAS?</p>
            <p className="text-gray-300 text-sm">
              PEAS forces the designer to think through what the agent must achieve (P), what world it lives in (E), how it can act (A), and what information it has access to (S).
              Skipping any of these leads to poorly designed agents. For example, a robot with powerful actuators but weak sensors will act blindly.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ PEAS Examples — Taxi Driver, Chess, Medical Diagnosis',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-300">Let's apply PEAS to three classic AI agent examples to see how the framework works in practice.</p>

          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-cyan-400 font-bold text-base mb-3">Example 1: Automated Taxi Driver</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-amber-300 font-semibold mb-1">Performance Measure:</p>
                <p className="text-gray-300">Safe trip completion, journey time minimization, fuel efficiency, passenger comfort, legal compliance (traffic laws), profit maximization per trip, minimal accidents or traffic violations.</p>
              </div>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Environment:</p>
                <p className="text-gray-300">Road network, other vehicles (cars, trucks, bikes, pedestrians), traffic signals, road signs, weather conditions, speed bumps, construction zones, passengers, GPS map data.</p>
              </div>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Actuators:</p>
                <p className="text-gray-300">Steering wheel control, accelerator, brake, gear shifting, turn signals, horn, windows, doors, air conditioning, display screen (for passenger communication).</p>
              </div>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Sensors:</p>
                <p className="text-gray-300">Cameras (front/rear/side), LIDAR (3D point cloud), RADAR (speed/distance), GPS receiver, speedometer, engine sensors, microphone (passenger voice), sonar (parking proximity).</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <p className="text-violet-400 font-bold text-base mb-3">Example 2: Chess-Playing Agent</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-amber-300 font-semibold mb-1">Performance Measure:</p>
                <p className="text-gray-300">Win the game (checkmate opponent); minimize losses; maximize ELO rating over many games; make moves within time limit.</p>
              </div>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Environment:</p>
                <p className="text-gray-300">8×8 chess board, 32 pieces (16 per side), the opponent player (human or AI), chess clock, FIDE rules (castling, en passant, promotion, stalemate).</p>
              </div>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Actuators:</p>
                <p className="text-gray-300">Chess move output (software: transmit move coordinates; hardware robot: robotic arm to physically move piece on board).</p>
              </div>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Sensors:</p>
                <p className="text-gray-300">Current board state (software: direct state access; hardware: camera + image recognition to detect piece positions).</p>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-400 font-bold text-base mb-3">Example 3: Medical Diagnosis Agent</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-amber-300 font-semibold mb-1">Performance Measure:</p>
                <p className="text-gray-300">Diagnostic accuracy (sensitivity + specificity), minimize false negatives (missed diseases), minimize false positives (unnecessary treatment), cost-effectiveness, patient safety, speed of diagnosis.</p>
              </div>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Environment:</p>
                <p className="text-gray-300">Patient's body and medical history, symptoms, lab results (blood tests, MRI, X-ray), prior diagnoses, drug interaction databases, current medical knowledge base.</p>
              </div>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Actuators:</p>
                <p className="text-gray-300">Diagnosis report output, treatment recommendation, prescription generation, order for additional tests, patient alert system, electronic health record update.</p>
              </div>
              <div>
                <p className="text-amber-300 font-semibold mb-1">Sensors:</p>
                <p className="text-gray-300">Patient symptom questionnaire (NLP), lab test results (structured data), medical imaging (CNN-based analysis), vital signs monitors, electronic health records database queries.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Environment Types — Definitions & Properties',
      icon: <FiSliders className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Task environments vary along several key dimensions. Each dimension affects how complex the agent must be and what techniques are needed.
          </p>
          <div className="space-y-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-cyan-400 font-bold mb-2">1. Fully Observable vs. Partially Observable</p>
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-cyan-400 font-semibold">Fully observable:</span> The agent's sensors give complete access to the full environment state at all times. No need to maintain internal state — the current percept is sufficient.
                <br /><span className="text-gray-500">Example: Chess (complete board visible), simple vacuum world.</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-violet-400 font-semibold">Partially observable:</span> Sensors are noisy, limited, or the state is inherently hidden. Agent must maintain an internal <strong>belief state</strong> (probability distribution over possible states).
                <br /><span className="text-gray-500">Example: Self-driving car (blind spots), poker (hidden opponent cards), real-world robot navigation.</span>
              </p>
            </div>

            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <p className="text-violet-400 font-bold mb-2">2. Deterministic vs. Stochastic</p>
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-cyan-400 font-semibold">Deterministic:</span> The next state is completely determined by the current state and the agent's action. No randomness.
                <br /><span className="text-gray-500">Example: Solving a Rubik's cube (same move → same result always).</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-violet-400 font-semibold">Stochastic:</span> The next state is not fully determined — there is randomness or uncertainty.
                <br /><span className="text-gray-500">Example: Taxi driving (random pedestrian behavior), stock trading, weather.</span>
                <br /><span className="text-amber-300 text-xs">Note: "Strategic" = deterministic but with other agents acting (e.g., chess vs. a deterministic opponent).</span>
              </p>
            </div>

            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-400 font-bold mb-2">3. Episodic vs. Sequential</p>
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-cyan-400 font-semibold">Episodic:</span> Each episode (percept → action) is independent. Current action does not affect future episodes. Simpler to design — no need to plan ahead.
                <br /><span className="text-gray-500">Example: Spam classifier (each email is independent), defect inspection on assembly line.</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-violet-400 font-semibold">Sequential:</span> Current decisions affect future situations. Requires long-term planning.
                <br /><span className="text-gray-500">Example: Chess (every move affects future), robot navigation, medical treatment planning.</span>
              </p>
            </div>

            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-bold mb-2">4. Static vs. Dynamic</p>
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-cyan-400 font-semibold">Static:</span> Environment does not change while the agent is deliberating. Agent can take its time to think.
                <br /><span className="text-gray-500">Example: Crossword puzzle, offline game solving.</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-violet-400 font-semibold">Dynamic:</span> Environment changes while the agent thinks. Agent must respond in real-time.
                <br /><span className="text-gray-500">Example: Driving, stock trading, real-time strategy games.</span>
                <br /><span className="text-pink-400 text-xs">Semi-dynamic: Environment unchanged but agent's performance score changes with time (e.g., chess with clock).</span>
              </p>
            </div>

            <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
              <p className="text-cyan-400 font-bold mb-2">5. Discrete vs. Continuous</p>
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-cyan-400 font-semibold">Discrete:</span> Finite number of distinct states, percepts, and actions. Clear boundaries.
                <br /><span className="text-gray-500">Example: Chess (finite board positions), grid-world navigation.</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-violet-400 font-semibold">Continuous:</span> States, actions, or time are real-valued (infinite possible values).
                <br /><span className="text-gray-500">Example: Robot arm control (continuous joint angles), autonomous driving (continuous speed/steering).</span>
              </p>
            </div>

            <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
              <p className="text-pink-400 font-bold mb-2">6. Single-Agent vs. Multi-Agent</p>
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-cyan-400 font-semibold">Single-agent:</span> Only one agent in the environment. No strategic reasoning about other agents.
                <br /><span className="text-gray-500">Example: Crossword solver, maze runner.</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-violet-400 font-semibold">Multi-agent:</span> Multiple agents, each with their own performance measures. Can be cooperative (work together) or competitive (adversarial — one's gain is another's loss).
                <br /><span className="text-gray-500">Cooperative: multi-robot warehouse team. Competitive: chess, poker.</span>
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Environment Types Summary Table',
      icon: <FiGrid className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">This table classifies well-known AI task environments by type — a common exam/interview question.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-800/50">
                  {['Environment', 'Observable', 'Deterministic', 'Episodic', 'Static', 'Discrete', 'Agents'].map(h => (
                    <th key={h} className="px-3 py-2 text-gray-300 font-semibold border border-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Chess (no clock)', 'Full', 'Deterministic', 'Sequential', 'Static', 'Discrete', 'Multi'],
                  ['Chess (with clock)', 'Full', 'Deterministic', 'Sequential', 'Semi-dynamic', 'Discrete', 'Multi'],
                  ['Poker', 'Partial', 'Stochastic', 'Sequential', 'Static', 'Discrete', 'Multi'],
                  ['Backgammon', 'Full', 'Stochastic', 'Sequential', 'Static', 'Discrete', 'Multi'],
                  ['Taxi driving', 'Partial', 'Stochastic', 'Sequential', 'Dynamic', 'Continuous', 'Multi'],
                  ['Medical diagnosis', 'Partial', 'Stochastic', 'Sequential', 'Dynamic', 'Continuous', 'Single'],
                  ['Image classification', 'Full', 'Deterministic', 'Episodic', 'Static', 'Continuous', 'Single'],
                  ['Spam filter', 'Full', 'Deterministic', 'Episodic', 'Static', 'Discrete', 'Single'],
                  ['Internet shopping', 'Partial', 'Stochastic', 'Sequential', 'Dynamic', 'Discrete', 'Multi'],
                  ['Robot soccer', 'Partial', 'Stochastic', 'Sequential', 'Dynamic', 'Continuous', 'Multi'],
                ].map(([env, ...vals]) => (
                  <tr key={env} className="hover:bg-slate-800/30">
                    <td className="px-3 py-2 text-cyan-300 font-semibold border border-slate-700">{env}</td>
                    {vals.map((v, i) => {
                      const isGood = ['Full', 'Deterministic', 'Episodic', 'Static', 'Discrete', 'Single'].includes(v)
                      return (
                        <td key={i} className={`px-3 py-2 border border-slate-700 ${isGood ? 'text-green-400' : 'text-orange-400'}`}>{v}</td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs">Green = simpler property; Orange = more complex property requiring more sophisticated agent design.</p>
        </div>
      ),
    },
    {
      title: '5️⃣ How Environment Type Determines Agent Design',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The environment type directly dictates what kind of agent architecture is needed. Here is how each dimension drives design decisions:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="px-4 py-2 text-gray-300 font-semibold border border-slate-700">Environment Property</th>
                  <th className="px-4 py-2 text-cyan-400 font-semibold border border-slate-700">Agent Implication</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Partially observable', 'Must maintain an internal belief state (memory of past percepts). Requires state estimation, filtering (e.g., Kalman filter, particle filter).'],
                  ['Stochastic', 'Must reason probabilistically. Uses probability distributions, Markov Decision Processes (MDPs), expected utility calculations.'],
                  ['Sequential', 'Must plan ahead. Needs search algorithms (BFS, A*, MCTS) or reinforcement learning policies to handle long-term consequences.'],
                  ['Dynamic', 'Must act in real-time. Requires fast decision-making, possibly interleaving search with execution, reactive architectures.'],
                  ['Continuous', 'Cannot enumerate all states. Needs function approximation (neural networks), continuous optimization (gradient descent), sampling-based methods.'],
                  ['Multi-agent', 'Must model other agents. Needs game theory (minimax for adversarial, Nash equilibrium for competitive), communication protocols for cooperative agents.'],
                  ['Episodic', 'Can use simpler, stateless classification/regression models. No need for planning or memory.'],
                  ['Fully observable + Deterministic + Discrete', 'Simplest case — classical search algorithms (BFS, DFS, A*) are sufficient. No need for probability or memory.'],
                ].map(([prop, implication]) => (
                  <tr key={prop} className="hover:bg-slate-800/30">
                    <td className="px-4 py-2 text-amber-300 font-semibold border border-slate-700 text-sm">{prop}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700 text-sm">{implication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Agent Architecture Ladder:</p>
            <p className="text-gray-300 text-sm">
              Simple Reflex Agent → Model-based Reflex Agent → Goal-based Agent → Utility-based Agent → Learning Agent.
              As the environment becomes more complex (partial, stochastic, sequential, dynamic), we climb the ladder to more sophisticated architectures.
            </p>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: 'Write the full PEAS description for a personal email assistant AI that reads, prioritizes, and drafts replies to emails.',
      solution:
        'P: Number of correctly prioritized emails, user satisfaction rating, response relevance score, time saved vs. manual handling. E: Email inbox (messages, attachments, metadata), user calendar, contact book, organizational hierarchy, email threads, spam patterns. A: Priority tagging, email categorization, draft composition, auto-reply sending, calendar invite creation, folder organization. S: Email content (NLP reader), email metadata (sender, time, subject), user feedback (accepted/rejected drafts), calendar data API.',
    },
    {
      question: 'Classify the game of Poker across all 6 environment dimensions and justify each classification.',
      solution:
        'Partially observable (hidden opponent cards), Stochastic (random card dealing), Sequential (bet decisions affect future rounds), Static (environment does not change while you think between turns), Discrete (finite card combinations, discrete bet amounts), Multi-agent (multiple players with opposing goals). The partial observability and stochastic nature make poker one of the hardest AI environments.',
    },
    {
      question: 'MCQ: Which environment dimension would require an agent to maintain a "belief state"?\n A) Deterministic\n B) Fully observable\n C) Partially observable\n D) Episodic',
      solution:
        'C) Partially observable — when the agent cannot see the full environment state, it must maintain a belief state: an internal probability distribution over all possible states consistent with the percept sequence. In fully observable environments, the current percept reveals the full state.',
    },
    {
      question: 'MCQ: A spam filter that classifies each email independently, with no memory of past emails, is operating in which type of environment?\n A) Sequential, Stochastic\n B) Episodic, Deterministic\n C) Sequential, Dynamic\n D) Episodic, Continuous',
      solution:
        'B) Episodic, Deterministic — each email is a separate episode (independent of past emails), and given the same email content the same classification is always made (deterministic). The feature space is discrete (word counts, etc.).',
    },
    {
      question: 'What is the difference between a deterministic and stochastic environment? Give one AI algorithm suited to each.',
      solution:
        'Deterministic: same action in same state always leads to the same next state. Algorithm: A* search (assumes predictable transitions). Stochastic: actions have uncertain outcomes modeled by probability distributions. Algorithm: Markov Decision Processes (MDPs) with value iteration or Q-learning (handles probabilistic transitions explicitly).',
    },
    {
      question: 'Explain why a chess-playing agent does NOT need a belief state even though it plays against an opponent.',
      solution:
        "Chess is fully observable — both players see the entire board at all times. There are no hidden pieces. The opponent's moves are unexpected (strategic) but not hidden. The environment is deterministic (same move always produces the same board position). Therefore no belief state is needed — the current board state is the complete state. Compare to poker where opponent's hand is hidden, requiring belief states.",
    },
    {
      question: 'MCQ: Semi-dynamic environments differ from dynamic environments in that:\n A) They have stochastic transitions\n B) The environment itself does not change but the performance score changes with time\n C) They have multiple agents\n D) They are partially observable',
      solution:
        "B) The environment itself does not change but the performance score changes with time — the classic example is chess with a clock. The board doesn't move while you think, but your time is running out, affecting your score. This is unlike a fully dynamic environment (like driving) where the physical state changes even when you are deliberating.",
    },
    {
      question: 'Interview: A robotics company asks you to design an AI for a warehouse picking robot. Walk through the PEAS analysis and identify the 3 most challenging environment properties.',
      solution:
        'PEAS — P: items picked per hour, pick accuracy, collision-free navigation, energy efficiency. E: warehouse floor (shelves, aisles, obstacles, other robots, humans). A: robotic arm (grasp), mobile base (navigate), conveyor belt interface, display screen. S: cameras (vision), LIDAR (obstacle detection), weight sensors (grip force), GPS/SLAM (localization). Challenging properties: (1) Partially observable — shelves may block camera view. (2) Dynamic — humans and other robots move unpredictably. (3) Continuous — arm kinematics and navigation are continuous, requiring function approximation.',
    },
    {
      question: 'Why are multi-agent environments more complex to design for than single-agent environments?',
      solution:
        "In multi-agent environments, other agents are also acting to maximize their own performance measures. This means: (1) The environment is effectively non-stationary from each agent's perspective (other agents change the environment). (2) Adversarial agents may try to actively interfere with the agent's goals (minimax needed). (3) Cooperative agents require communication protocols and shared coordination. (4) Classical search (which assumes a fixed environment) breaks down — game theory and multi-agent planning are needed.",
    },
    {
      question: 'Compare and contrast episodic vs. sequential environments. Why does sequential nature make AI harder?',
      solution:
        'Episodic: each action decision is independent. Current action has no bearing on future episodes. Simpler — can use stateless classifiers or regression models. Sequential: current actions have long-term consequences. A greedy short-term action may lead to catastrophic long-term outcomes (e.g., in chess, sacrificing a piece for positional advantage). Requires planning, lookahead search, or reinforcement learning to optimize cumulative reward rather than immediate reward. Significantly harder due to exponential state space growth with depth.',
    },
  ],
  exampleProblems: [],
}

export default function PeasEnvironmentsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
