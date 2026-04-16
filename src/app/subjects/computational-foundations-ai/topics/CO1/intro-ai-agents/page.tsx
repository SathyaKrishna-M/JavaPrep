'use client'

import DMTopicPage from '@/components/DMTopicPage'
import { FiCpu, FiClock, FiLayers, FiUser, FiZap, FiCode } from 'react-icons/fi'

const content = {
  title: 'Introduction to AI & Intelligent Agents',
  explanationSections: [
    {
      title: '1️⃣ What is Artificial Intelligence?',
      icon: <FiCpu className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Artificial Intelligence (AI) is the field of computer science concerned with building systems that can perform tasks that normally require{' '}
            <span className="text-cyan-400 font-semibold">human intelligence</span>. However, different researchers have defined AI differently depending on what they consider
            the goal of the field to be. Russell and Norvig's classic textbook organizes these definitions into a{' '}
            <span className="text-violet-400 font-semibold">2×2 matrix</span>:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="px-4 py-2 text-gray-300 font-semibold border border-slate-700"></th>
                  <th className="px-4 py-2 text-cyan-400 font-semibold border border-slate-700">Human-like</th>
                  <th className="px-4 py-2 text-green-400 font-semibold border border-slate-700">Rational (Ideal)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr>
                  <td className="px-4 py-3 text-amber-300 font-semibold border border-slate-700">Thinking</td>
                  <td className="px-4 py-3 text-gray-300 border border-slate-700">
                    <strong className="text-cyan-400">Thinking humanly</strong> — Cognitive modelling approach. The system reasons and makes decisions the way a human brain does. Requires understanding human cognition via psychology, neuroscience.
                    <br /><span className="text-gray-500 text-xs">Example: General Problem Solver (GPS), cognitive architectures like ACT-R.</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300 border border-slate-700">
                    <strong className="text-green-400">Thinking rationally</strong> — Laws of thought approach. The system reasons correctly using formal logic (syllogisms, inference rules).
                    <br /><span className="text-gray-500 text-xs">Example: Prolog programs, theorem provers.</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-amber-300 font-semibold border border-slate-700">Acting</td>
                  <td className="px-4 py-3 text-gray-300 border border-slate-700">
                    <strong className="text-cyan-400">Acting humanly</strong> — Turing Test approach. The system behaves indistinguishably from a human when interacting with people.
                    <br /><span className="text-gray-500 text-xs">Example: ChatGPT passing casual conversation, ELIZA chatbot.</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300 border border-slate-700">
                    <strong className="text-green-400">Acting rationally</strong> — Rational agent approach. The system takes actions that achieve the best expected outcome given available information.
                    <br /><span className="text-gray-500 text-xs">Example: AlphaGo, self-driving cars, recommendation engines.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-400 font-semibold mb-2">Modern AI adopts the "Acting Rationally" viewpoint because:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Humans are not always rational — we have cognitive biases, make errors.</li>
              <li>Laws of thought (logic alone) cannot handle uncertainty and incomplete information.</li>
              <li>Rational behavior can be mathematically defined and optimized.</li>
              <li>It is more general: a rational agent may or may not think like a human, but it achieves goals efficiently.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '2️⃣ History of AI — Key Milestones',
      icon: <FiClock className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            AI has a rich history spanning nearly 80 years. Understanding the milestones helps you appreciate why certain approaches dominate today.
          </p>
          <div className="space-y-3">
            {[
              { year: '1943', event: 'McCulloch & Pitts publish the first mathematical model of a neuron — the foundation of neural networks.' },
              { year: '1950', event: 'Alan Turing publishes "Computing Machinery and Intelligence" — proposes the Turing Test as a criterion for machine intelligence.' },
              { year: '1956', event: 'Dartmouth Conference — John McCarthy coins the term "Artificial Intelligence". This is considered the birth of AI as a field.' },
              { year: '1957–69', event: 'Early enthusiasm: General Problem Solver (Newell & Simon), early chess programs, first neural network hardware (Perceptron by Rosenblatt).' },
              { year: '1966–73', event: 'First AI Winter — Funding cuts after the Lighthill Report; NLP, machine translation fail to scale.' },
              { year: '1969–79', event: 'Knowledge-based systems rise: DENDRAL (chemistry), MYCIN (medical diagnosis), PROLOG language.' },
              { year: '1980–88', event: 'Expert systems boom — $1B industry. R1/XCON configures DEC computers. Then the second AI Winter (1987–93).' },
              { year: '1997', event: 'IBM Deep Blue defeats world chess champion Garry Kasparov — search + evaluation beats human intuition.' },
              { year: '2011', event: 'IBM Watson wins Jeopardy! — combines NLP, knowledge bases, and statistical reasoning.' },
              { year: '2012', event: 'AlexNet wins ImageNet — deep learning revolution begins. Error rate drops from 26% to 15%.' },
              { year: '2016', event: "DeepMind AlphaGo defeats world Go champion Lee Sedol — reinforcement learning + deep neural networks conquer Go's vast search space." },
              { year: '2017', event: 'Transformer architecture introduced (Vaswani et al.) — powers all modern LLMs (GPT, BERT, LLaMA).' },
              { year: '2022–present', event: 'ChatGPT, GPT-4, Gemini, LLaMA — large language models become widely accessible. Generative AI transforms industries.' },
            ].map(({ year, event }) => (
              <div key={year} className="flex gap-3">
                <span className="text-cyan-400 font-mono font-semibold min-w-[60px] text-sm pt-0.5">{year}</span>
                <p className="text-gray-300 text-sm">{event}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">The Turing Test (1950):</p>
            <p className="text-gray-300 text-sm">
              A human judge conducts a text-based conversation with two entities — one human, one machine. If the judge cannot reliably distinguish the machine from the human,
              the machine is said to pass the Turing Test. It tests <span className="text-cyan-400 font-semibold">natural language processing</span>,{' '}
              <span className="text-cyan-400 font-semibold">knowledge representation</span>, <span className="text-cyan-400 font-semibold">automated reasoning</span>, and{' '}
              <span className="text-cyan-400 font-semibold">learning</span>. The Total Turing Test also requires vision and motor skills.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '3️⃣ Types of AI — Narrow, General, Superintelligence',
      icon: <FiLayers className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            AI systems are classified by their <span className="text-violet-400 font-semibold">capability breadth</span> — how many different tasks they can handle compared to humans.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-cyan-400 font-bold mb-2">Narrow AI (ANI)</p>
              <p className="text-gray-300 text-sm mb-2">Artificial Narrow Intelligence. Designed for a <strong>single specific task</strong>. Cannot transfer learning to other domains.</p>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                <li>ChatGPT (text generation)</li>
                <li>AlphaGo (board game)</li>
                <li>Face recognition systems</li>
                <li>Spam filters</li>
                <li>All current AI systems</li>
              </ul>
            </div>
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <p className="text-violet-400 font-bold mb-2">General AI (AGI)</p>
              <p className="text-gray-300 text-sm mb-2">Artificial General Intelligence. Can perform <strong>any intellectual task</strong> a human can, with the same flexibility and context-switching ability.</p>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                <li>Does not yet exist</li>
                <li>Would understand context, transfer knowledge</li>
                <li>Active research area</li>
                <li>Timeline: disputed (2030–2100+)</li>
              </ul>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-bold mb-2">Superintelligence (ASI)</p>
              <p className="text-gray-300 text-sm mb-2">Artificial Superintelligence. Surpasses human intelligence in <strong>every domain</strong> — creativity, social intelligence, science, etc.</p>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                <li>Purely theoretical</li>
                <li>Nick Bostrom's "Superintelligence" (2014)</li>
                <li>Major alignment/safety concern</li>
                <li>Would trigger the "singularity"</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="text-gray-400 text-sm">
              <span className="text-pink-400 font-semibold">Also noted:</span> Weak AI = systems that simulate intelligence (current AI). Strong AI = systems that truly possess
              understanding and consciousness (philosophical concept tied to "mind"). AGI ≠ Strong AI necessarily — an AGI could still be a "zombie" without genuine understanding.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '4️⃣ Rational Agents — The Core Model',
      icon: <FiUser className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            An <span className="text-cyan-400 font-semibold">agent</span> is anything that can be viewed as perceiving its{' '}
            <span className="text-violet-400 font-semibold">environment</span> through{' '}
            <span className="text-amber-300 font-semibold">sensors</span> and acting upon that environment through{' '}
            <span className="text-green-400 font-semibold">actuators</span>.
          </p>
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-cyan-500/20 border border-cyan-500/40 px-6 py-3 rounded-lg text-cyan-300 font-bold text-center">
                ENVIRONMENT
              </div>
              <div className="flex gap-8 text-center text-sm">
                <div>
                  <p className="text-amber-300 font-semibold">Sensors</p>
                  <p className="text-gray-500 text-xs">(Percepts ↓)</p>
                </div>
                <div>
                  <p className="text-green-400 font-semibold">Actuators</p>
                  <p className="text-gray-500 text-xs">(Actions ↑)</p>
                </div>
              </div>
              <div className="bg-violet-500/20 border border-violet-500/40 px-6 py-3 rounded-lg text-violet-300 font-bold text-center">
                AGENT (Perception → Decision → Action)
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
              <p className="text-cyan-400 font-semibold mb-1">Percept:</p>
              <p className="text-gray-300 text-sm">The agent's current perceptual input from the environment at any given instant. A <strong>percept sequence</strong> is the complete history of all percepts received so far.</p>
            </div>
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <p className="text-violet-400 font-semibold mb-1">Agent Function:</p>
              <p className="text-gray-300 text-sm">A mathematical mapping from the complete percept sequence to an action: <code className="text-green-300 text-xs">f: P* → A</code>. It describes what the agent does in every possible situation — an abstract, external description. This function can be represented as a table (for simple agents) but is infinite in general.</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-400 font-semibold mb-1">Agent Program:</p>
              <p className="text-gray-300 text-sm">A concrete <strong>implementation</strong> of the agent function that runs on a physical agent architecture (hardware + software). It takes the current percept as input (not the full history — history may be stored internally if needed) and returns an action.</p>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 font-semibold mb-1">Performance Measure:</p>
              <p className="text-gray-300 text-sm">A criterion that evaluates the agent's behavior in the environment — how successful is the agent at achieving its goals? It is defined from the <strong>outside</strong> (by the environment designer), not the agent itself. Example: for a vacuum cleaner agent, it might be "amount of dirt cleaned per unit time minus energy used".</p>
            </div>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-green-400 font-semibold mb-2">Rationality Definition (Russell & Norvig):</p>
            <p className="text-gray-300 text-sm">
              For each possible percept sequence, a rational agent selects the action that is expected to <strong>maximize its performance measure</strong>, given the evidence
              provided by the percept sequence and any built-in knowledge the agent has. Key word: <span className="text-amber-300 font-semibold">expected</span> — agents operate
              under uncertainty.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <p className="text-pink-400 font-semibold mb-2">Rationality ≠ Omniscience:</p>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li><span className="text-cyan-400">Omniscient agent</span>: knows the actual outcome of every action — impossible in reality.</li>
              <li><span className="text-cyan-400">Rational agent</span>: maximizes <em>expected</em> performance based on available information.</li>
              <li>Rationality requires <strong>information gathering</strong> (exploration) and <strong>learning</strong> from experience.</li>
              <li>An agent that ignores percepts and acts randomly is not rational even if it occasionally succeeds.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: '5️⃣ Agent vs. Environment',
      icon: <FiZap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The distinction between the <span className="text-cyan-400 font-semibold">agent</span> and the{' '}
            <span className="text-violet-400 font-semibold">environment</span> is crucial for designing AI systems.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="px-4 py-2 text-gray-300 font-semibold border border-slate-700">Aspect</th>
                  <th className="px-4 py-2 text-cyan-400 font-semibold border border-slate-700">Agent</th>
                  <th className="px-4 py-2 text-violet-400 font-semibold border border-slate-700">Environment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  ['Definition', 'The decision-making entity that acts', 'Everything outside the agent (the world)'],
                  ['Perception', 'Receives percepts via sensors', 'Generates percepts; responds to actions'],
                  ['Action', 'Sends actions via actuators', 'Affected by actions (state changes)'],
                  ['Goal', 'Maximize performance measure', 'Not goal-directed (passively changes)'],
                  ['Examples (human)', 'Eyes, ears (sensors); hands, voice (actuators)', 'Physical world, other people, objects'],
                  ['Examples (robot)', 'Cameras, sonar (sensors); wheels, arm (actuators)', 'Factory floor, obstacles, conveyor belt'],
                  ['Examples (software)', 'Web scraper reading URLs', 'The internet, web servers'],
                ].map(([aspect, agent, env]) => (
                  <tr key={aspect} className="hover:bg-slate-800/30">
                    <td className="px-4 py-2 text-amber-300 font-semibold border border-slate-700">{aspect}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700">{agent}</td>
                    <td className="px-4 py-2 text-gray-300 border border-slate-700">{env}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
            <p className="text-amber-300 font-semibold mb-2">Important Insight — Agent Boundary:</p>
            <p className="text-gray-300 text-sm">
              The agent boundary is not always the physical skin. In a self-driving car, the car body, sensors, and computers are all "agent". The road, other cars, traffic lights, and
              pedestrians are "environment". The agent's <strong>percept sequence</strong> is everything the sensors have ever detected; the agent's <strong>actions</strong> change
              steering, braking, acceleration (actuators).
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '6️⃣ Python: Simple Reflex Agent',
      icon: <FiCode className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            A <span className="text-cyan-400 font-semibold">simple reflex agent</span> acts only on the <strong>current percept</strong>, ignoring history. It uses condition-action
            rules (if-then rules). While simple, it illustrates the core agent-loop structure used in all AI agents.
          </p>
          <pre className="bg-black/40 p-4 rounded-lg text-green-300 text-sm font-mono overflow-x-auto">{`# Simple Reflex Agent — Vacuum World Example
# Environment: Two rooms (A, B), each can be Clean or Dirty
# Sensors: current location + dirt status
# Actuators: Suck, Move Left, Move Right

from typing import Tuple

# Environment state: (location, status_A, status_B)
Environment = Tuple[str, str, str]

def interpret_input(percept: Tuple[str, str]) -> dict:
    """Translate raw percept into structured observation."""
    location, status = percept
    return {'location': location, 'status': status}

def rule_match(obs: dict) -> str:
    """Condition-action rules — the agent's 'knowledge'."""
    if obs['status'] == 'Dirty':
        return 'Suck'
    elif obs['location'] == 'A':
        return 'Move_Right'
    elif obs['location'] == 'B':
        return 'Move_Left'
    else:
        return 'NoOp'  # Do nothing

def simple_reflex_agent(percept: Tuple[str, str]) -> str:
    """
    Agent function: maps current percept → action.
    Does NOT use history — pure reflex.
    """
    obs = interpret_input(percept)
    action = rule_match(obs)
    return action

# Simulate the vacuum world
def simulate(steps: int = 6):
    # Initial state: location=A, room A dirty, room B dirty
    state = {'location': 'A', 'A': 'Dirty', 'B': 'Dirty'}

    print(f"{'Step':<5} {'Location':<10} {'Percept':<20} {'Action':<15} {'Room A':<10} {'Room B'}")
    print("-" * 70)

    for step in range(1, steps + 1):
        loc = state['location']
        status = state[loc]  # Dirt status at current location
        percept = (loc, status)

        action = simple_reflex_agent(percept)

        # Apply action to environment
        if action == 'Suck':
            state[loc] = 'Clean'
        elif action == 'Move_Right':
            state['location'] = 'B'
        elif action == 'Move_Left':
            state['location'] = 'A'

        print(f"{step:<5} {loc:<10} {str(percept):<20} {action:<15} {state['A']:<10} {state['B']}")

        # Stop early if fully clean
        if state['A'] == 'Clean' and state['B'] == 'Clean':
            print("\\nAll rooms clean! Agent goal achieved.")
            break

simulate()

# Output:
# Step  Location   Percept              Action          Room A     Room B
# ----------------------------------------------------------------------
# 1     A          ('A', 'Dirty')       Suck            Clean      Dirty
# 2     A          ('A', 'Clean')       Move_Right      Clean      Dirty
# 3     B          ('B', 'Dirty')       Suck            Clean      Clean
# All rooms clean! Agent goal achieved.`}</pre>
          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
            <p className="text-violet-400 font-semibold mb-2">Limitations of Simple Reflex Agents:</p>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Works only in <strong>fully observable</strong> environments — agent must see the complete state.</li>
              <li>Cannot handle sequences: if room A was clean but agent moved away and cannot re-check, it may loop.</li>
              <li>No memory → cannot learn or improve over time.</li>
              <li>Solution: <span className="text-cyan-400">Model-based reflex agents</span> maintain internal state to handle partial observability.</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],
  practiceQuestions: [
    {
      question: 'Define a rational agent. How does rationality differ from omniscience?',
      solution:
        'A rational agent selects the action expected to maximize its performance measure given its percept sequence and built-in knowledge. Omniscience means knowing the actual outcome of every action — impossible in reality. Rationality only requires choosing the best action given available information. A rational agent can be wrong (due to uncertainty) but it is doing the best it can with what it knows.',
    },
    {
      question: 'What is the difference between an agent function and an agent program?',
      solution:
        'The agent function is an abstract mathematical mapping f: P* → A from the entire percept history to actions — it describes the ideal behavior completely and is often infinite in size. The agent program is a concrete implementation running on real hardware/software that approximates this function. The agent program takes only the current percept as explicit input (and may maintain internal state for history).',
    },
    {
      question: 'MCQ: Which of the following AI definitions forms the basis of modern AI design?\n A) Thinking humanly\n B) Acting humanly (Turing Test)\n C) Thinking rationally\n D) Acting rationally',
      solution:
        'D) Acting rationally — because it allows mathematical formalization of goals, handles uncertainty through expected utility maximization, and does not require human-like reasoning (which is often suboptimal). Modern AI systems (recommendation engines, game-playing agents, self-driving cars) are all designed around rational action.',
    },
    {
      question: 'MCQ: The Turing Test was proposed in which year and by whom?\n A) 1956, John McCarthy\n B) 1943, McCulloch & Pitts\n C) 1950, Alan Turing\n D) 1997, IBM Research',
      solution:
        "C) 1950, Alan Turing — in his paper 'Computing Machinery and Intelligence' where he proposed replacing the question 'Can machines think?' with an imitation game where a judge cannot distinguish machine from human in text conversation.",
    },
    {
      question: 'Name and describe the three types of AI based on capability breadth. Which type encompasses all currently deployed AI systems?',
      solution:
        'ANI (Artificial Narrow Intelligence): performs one specific task — all current AI. AGI (Artificial General Intelligence): can perform any intellectual task a human can, flexibly — does not exist yet. ASI (Artificial Superintelligence): surpasses human intelligence in all domains — purely theoretical. All deployed AI (ChatGPT, AlphaGo, face recognition) is ANI.',
    },
    {
      question: 'In the vacuum world, define: (a) the percept, (b) the actions, (c) a suitable performance measure.',
      solution:
        '(a) Percept: a pair [location, dirt_status] — the agent observes its current room (A or B) and whether that room is dirty or clean. (b) Actions: {Suck, Move_Left, Move_Right, NoOp}. (c) Performance measure: number of clean squares per unit time, minus energy consumed and minus penalties for moving when already clean.',
    },
    {
      question: 'MCQ: A simple reflex agent fails in partially observable environments because:\n A) It uses too much memory\n B) It only acts on the current percept with no history\n C) It cannot compute expected utility\n D) It has no actuators',
      solution:
        'B) It only acts on the current percept with no history — in a partially observable environment, the current percept does not fully reveal the environment state, so the agent cannot make correct decisions without maintaining internal state (memory of past percepts).',
    },
    {
      question: 'What is the "agent boundary" and why does it matter for AI system design?',
      solution:
        'The agent boundary separates the agent (the decision-making system) from the environment (everything else). It determines what counts as a sensor (input to the agent), what counts as an actuator (output), and what is part of the world being acted upon. Correct boundary definition prevents circular reasoning (e.g., treating the agent\'s own CPU as part of the environment) and clarifies design responsibilities.',
    },
    {
      question: 'Interview: Explain why "acting rationally" is a more useful definition of AI than "acting humanly" for engineering purposes.',
      solution:
        'Acting humanly (Turing Test) requires mimicking human behavior — including human mistakes, biases, and inconsistencies. For engineering, we want systems that achieve goals reliably and optimally. Acting rationally provides a mathematical framework: maximize expected utility given a model. This is measurable, optimizable, and provably analyzable. It also allows AI to exceed human performance (e.g., superhuman chess, Go) rather than merely mimicking it.',
    },
    {
      question: 'Trace through the simple reflex vacuum agent code. Starting in location B with both rooms dirty, list each percept and action for 3 steps.',
      solution:
        'Step 1: Percept=(B, Dirty) → rule: status==Dirty → Action=Suck. Room B becomes Clean. Step 2: Percept=(B, Clean) → rule: location==B → Action=Move_Left. Location becomes A. Step 3: Percept=(A, Dirty) → rule: status==Dirty → Action=Suck. Room A becomes Clean. Both rooms now clean.',
    },
  ],
  exampleProblems: [],
}

export default function IntroAIAgentsPage() {
  return (
    <DMTopicPage
      content={content}
      subjectName="Computational Foundations for AI"
      subjectHref="/subjects/computational-foundations-ai"
    />
  )
}
