'use client'

import DSDTopicPage, { ExplanationSection, PracticeQuestion } from '@/components/DSDTopicPage'
import { FiBook, FiTarget, FiGitBranch } from 'react-icons/fi'

const content = {
  title: 'Reversible Gates',
  explanationSections: [
    {
      title: '🧠 Reversibility Concept',
      icon: <FiBook className="w-6 h-6" />,
      content: `A <span class="text-blue-400 font-semibold">reversible gate</span> is a logic gate where the output uniquely determines the input. This means there is no information loss during computation.

<span class="text-amber-300 font-semibold">Key Properties:</span>
• <span class="text-cyan-300">Bijective:</span> One-to-one mapping between inputs and outputs
• <span class="text-cyan-300">No information loss:</span> All input information is preserved
• <span class="text-cyan-300">Energy efficient:</span> Theoretical zero energy dissipation (Landauer's principle)
• <span class="text-cyan-300">Number of inputs = outputs:</span> Must have equal I/O count
• <span class="text-cyan-300">Invertible:</span> Can recover inputs from outputs

<span class="text-lime-300 font-semibold">Why Reversibility Matters:</span>
• <span class="text-cyan-300">Landauer's Principle:</span> Irreversible computation (information loss) requires minimum energy kT·ln(2) per bit erased
• <span class="text-cyan-300">Reversible computation:</span> Theoretically can operate with zero energy dissipation
• <span class="text-cyan-300">Quantum computing:</span> Quantum gates must be reversible
• <span class="text-cyan-300">Low-power design:</span> Important for energy-efficient systems

<span class="text-pink-300 font-semibold">Traditional Gates (NOT Reversible):</span>
• <span class="text-cyan-300">AND Gate:</span> Multiple inputs map to same output (information loss)
  - Example: (0,0), (0,1), (1,0) all map to output 0
• <span class="text-cyan-300">OR Gate:</span> Multiple inputs map to same output (information loss)
  - Example: (0,1), (1,0), (1,1) all map to output 1

<span class="text-cyan-300">Reversible gates preserve all information, enabling energy-efficient computation.`,
    },
    {
      title: '⚙️ Common Reversible Gates',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `Several reversible gates are fundamental in reversible logic design.

<span class="text-amber-300 font-semibold">1. NOT Gate:</span>
• <span class="text-cyan-300">Simplest reversible gate</span>
• 1 input (A), 1 output (P)
• P = A'
• <span class="text-cyan-300">Reversible:</span> A = P' (can recover input from output)

<span class="text-lime-300 font-semibold">2. CNOT (Controlled-NOT) / Feynman Gate:</span>
• <span class="text-cyan-300">2 inputs (A, B), 2 outputs (P, Q)</span>
• P = A (control passes through)
• Q = A ⊕ B (target is XORed with control)
• <span class="text-cyan-300">Truth Table:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
A | B | P | Q
--|---|----|----
0 | 0 | 0 | 0
0 | 1 | 0 | 1
1 | 0 | 1 | 1
1 | 1 | 1 | 0
</pre>
• <span class="text-cyan-300">Reversible:</span> A = P, B = P ⊕ Q

<span class="text-pink-300 font-semibold">3. Toffoli Gate (CCNOT):</span>
• <span class="text-cyan-300">3 inputs (A, B, C), 3 outputs (P, Q, R)</span>
• P = A (first control passes through)
• Q = B (second control passes through)
• R = (A · B) ⊕ C (target is XORed with AND of controls)
• <span class="text-cyan-300">Universal:</span> Can implement any reversible function
• <span class="text-cyan-300">Truth Table:</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
A | B | C | P | Q | R
--|---|----|----|----|----
0 | 0 | 0 | 0 | 0 | 0
0 | 0 | 1 | 0 | 0 | 1
0 | 1 | 0 | 0 | 1 | 0
0 | 1 | 1 | 0 | 1 | 1
1 | 0 | 0 | 1 | 0 | 0
1 | 0 | 1 | 1 | 0 | 1
1 | 1 | 0 | 1 | 1 | 1
1 | 1 | 1 | 1 | 1 | 0
</pre>

<span class="text-cyan-300 font-semibold">4. Fredkin Gate:</span>
• <span class="text-cyan-300">3 inputs, 3 outputs</span>
• Conditional swap gate
• Swaps two inputs if control is 1
• <span class="text-cyan-300">Also universal</span> for reversible logic`,
    },
    {
      title: '📊 Reversible Logic Design',
      icon: <FiTarget className="w-6 h-6" />,
      content: `Designing reversible circuits requires following specific principles and constraints.

<span class="text-amber-300 font-semibold">Design Requirements:</span>
• <span class="text-cyan-300">No fan-out:</span> Each gate output connects to only one input
  - Traditional circuits allow one output to drive multiple inputs
  - Reversible circuits require copying gates (CNOT) to create multiple copies
• <span class="text-cyan-300">No feedback:</span> Combinational circuits only (no loops)
  - Sequential logic requires special handling
• <span class="text-cyan-300">Garbage outputs:</span> Extra outputs needed to maintain reversibility
  - Required to preserve information
  - Minimizing garbage outputs is an optimization goal
• <span class="text-cyan-300">Ancilla inputs:</span> Constant inputs (usually 0) for initialization
  - Used to set initial state
  - Must be restored at end of computation

<span class="text-lime-300 font-semibold">Design Metrics:</span>
• <span class="text-cyan-300">Quantum cost:</span> Number of 1×1 and 2×2 gates required
  - Lower is better
  - CNOT = 1, Toffoli = 5, Fredkin = 5
• <span class="text-cyan-300">Garbage outputs:</span> Number of unused outputs
  - Lower is better
  - Represents wasted resources
• <span class="text-cyan-300">Ancilla inputs:</span> Number of constant inputs
  - Lower is better
  - Must be restored

<span class="text-pink-300 font-semibold">Example: Implementing AND using Toffoli Gate</span>
<pre class="bg-black/30 p-3 rounded-lg mt-2 text-sm text-gray-100 font-mono">
To implement F = A · B:
- Use Toffoli gate with A, B as controls, 0 as target
- Output: P = A, Q = B, R = A · B
- Garbage outputs: P, Q (not needed for function)
- Ancilla input: 0 (must be restored)
</pre>

<span class="text-cyan-300">Challenges:</span>
• Increased complexity (more gates needed)
• Garbage management
• No direct fan-out
• Optimization is more complex`,
    },
    {
      title: '🧩 Applications of Reversible Logic',
      icon: <FiGitBranch className="w-6 h-6" />,
      content: `Reversible logic has important applications in modern computing.

<span class="text-amber-300 font-semibold">Quantum Computing:</span>
• <span class="text-cyan-300">Quantum gates must be reversible</span>
• CNOT and Toffoli gates are fundamental quantum gates
• Quantum algorithms require reversible operations
• Enables quantum error correction

<span class="text-lime-300 font-semibold">Low-Power Design:</span>
• <span class="text-cyan-300">Energy-efficient computation</span>
• Important for battery-powered devices
• Reduces heat generation
• Enables adiabatic computing

<span class="text-pink-300 font-semibold">Optical Computing:</span>
• <span class="text-cyan-300">Optical gates are naturally reversible</span>
• Photonic computing benefits from reversibility
• Enables all-optical signal processing

<span class="text-cyan-300 font-semibold">Nanotechnology:</span>
• <span class="text-cyan-300">Molecular computing</span>
• Quantum-dot cellular automata
• Reversible operations at nanoscale

<span class="text-amber-300 font-semibold">Future Computing:</span>
• <span class="text-cyan-300">Beyond CMOS technologies</span>
• Novel computing paradigms
• Energy-efficient systems
• Sustainable computing`,
    },
    {
      title: '📘 Learning Outcome',
      icon: <FiBook className="w-6 h-6" />,
      content: `After studying this topic, students will be able to:

✓ <span class="text-cyan-300">Understand</span> the concept of reversibility in logic gates
✓ <span class="text-cyan-300">Explain</span> why traditional gates (AND, OR) are not reversible
✓ <span class="text-cyan-300">Identify</span> common reversible gates (NOT, CNOT, Toffoli, Fredkin)
✓ <span class="text-cyan-300">Verify</span> reversibility by showing input recovery from outputs
✓ <span class="text-cyan-300">Design</span> reversible circuits following design constraints
✓ <span class="text-cyan-300">Understand</span> garbage outputs and ancilla inputs
✓ <span class="text-cyan-300">Apply</span> design metrics (quantum cost, garbage, ancilla)
✓ <span class="text-cyan-300">Recognize</span> applications in quantum computing, low-power design, and future technologies

Reversible logic is important for energy-efficient and quantum computing applications.`,
    },
  ],
  practiceQuestions: [
    {
      question: 'Why are traditional AND and OR gates not reversible?',
      solution: 'AND and OR gates are not reversible because they lose information:\n\nProblem: Multiple inputs map to the same output\n- Information is lost\n- Cannot uniquely recover input from output\n\nReversible gates must have one-to-one mapping: each unique input combination maps to a unique output combination.',
      truthTable: {
        headers: ['A', 'B', 'AND (C)', 'OR (C)', 'Reversible?'],
        rows: [
          ['0', '0', '0', '0', 'No - multiple inputs → same output'],
          ['0', '1', '0', '1', 'No - AND: 3 inputs → 0'],
          ['1', '0', '0', '1', 'No - OR: 3 inputs → 1'],
          ['1', '1', '1', '1', 'No - multiple inputs → same output'],
        ],
        title: 'AND and OR Gates - Not Reversible (information loss)',
      },
    },
    {
      question: 'Show that the CNOT (Feynman) gate is reversible.',
      solution: 'CNOT Gate:\nInputs: A, B\nOutputs: P = A, Q = A ⊕ B\n\nTo show reversibility, we can recover A and B from P and Q:\n\nFrom outputs P and Q:\n- A = P (direct)\n- B = P ⊕ Q = A ⊕ (A ⊕ B) = (A ⊕ A) ⊕ B = 0 ⊕ B = B\n\nVerification:\nIf (P, Q) = (0, 0) → A = 0, B = 0 ⊕ 0 = 0 ✓\nIf (P, Q) = (0, 1) → A = 0, B = 0 ⊕ 1 = 1 ✓\nIf (P, Q) = (1, 1) → A = 1, B = 1 ⊕ 1 = 0 ✓\nIf (P, Q) = (1, 0) → A = 1, B = 1 ⊕ 0 = 1 ✓\n\nEach unique (P, Q) maps to unique (A, B) - therefore reversible!',
      truthTable: {
        headers: ['A', 'B', 'P = A', 'Q = A⊕B'],
        rows: [
          ['0', '0', '0', '0'],
          ['0', '1', '0', '1'],
          ['1', '0', '1', '1'],
          ['1', '1', '1', '0'],
        ],
        title: 'CNOT (Feynman) Gate Truth Table - Reversible (one-to-one mapping)',
      },
    },
    {
      question: 'What are garbage outputs and why are they needed in reversible circuits?',
      solution: 'Garbage outputs are extra outputs in reversible circuits that are not part of the desired function but are necessary to maintain reversibility.\n\nWhy needed:\n- Reversible gates must have equal number of inputs and outputs\n- If desired function has fewer outputs than inputs, extra outputs are needed\n- These outputs preserve information to make the circuit reversible\n\nExample:\nTo implement F = A · B (AND) reversibly:\n- Need 2 inputs (A, B)\n- But AND has only 1 output\n- Must add 1 garbage output to have 2 outputs total\n- Can use CNOT: P = A, Q = A ⊕ B\n- Then: F = A · B, Garbage = A ⊕ B\n\nMinimizing garbage outputs is an important optimization goal in reversible circuit design.',
    },
  ],
}

export default function ReversibleGatesPage() {
  return <DSDTopicPage content={content} />
}
