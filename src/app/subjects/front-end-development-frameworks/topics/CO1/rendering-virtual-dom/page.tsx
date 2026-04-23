'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Rendering & Virtual DOM',
  subtitle: 'The browser\'s rendering pipeline, VDOM diffing, and React\'s reconciliation algorithm',
  co: 'CO1 — Front-End Foundations',

  overview: (
    <>
      <p>
        The browser renders a page through the <strong className="text-white">Critical Rendering Path</strong>:
        HTML → DOM tree, CSS → CSSOM, combined into a Render tree, then Layout (reflow), Paint, and Composite.
        Layout is the most expensive step — any geometry change (width, margin, padding) can cascade through
        an entire subtree. Reading a geometry property after writing one forces a{' '}
        <strong className="text-white">forced synchronous layout</strong>, which blocks JS for milliseconds.
      </p>
      <p>
        React's <strong className="text-white">Virtual DOM (VDOM)</strong> is a lightweight JS object tree
        mirroring the real DOM — but living entirely in memory with no connection to the rendering engine.
        When state changes, React re-runs your component function, builds a new VDOM tree, <em>diffs</em> it
        against the previous one, and applies only the computed minimal set of real DOM mutations in one batch.
        This process is called <strong className="text-white">reconciliation</strong>.
      </p>
      <p>
        React 16 introduced <strong className="text-white">Fiber</strong> — rewriting reconciliation from a
        synchronous recursive call into an interruptible, priority-based work loop. Fiber enables Concurrent Mode,
        Suspense, and transitions: React can pause low-priority renders to let the browser handle urgent input events.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Critical Rendering Path</p>
        <div className="space-y-1 text-xs">
          {[
            { step: '1', label: 'HTML Parse → DOM Tree', cost: 'Low', color: 'blue' },
            { step: '2', label: 'CSS Parse → CSSOM (render-blocking)', cost: 'Medium', color: 'violet' },
            { step: '3', label: 'DOM + CSSOM → Render Tree', cost: 'Low', color: 'cyan' },
            { step: '4', label: 'Layout / Reflow (geometry)', cost: 'HIGH', color: 'red' },
            { step: '5', label: 'Paint (colors, borders, shadows)', cost: 'Medium', color: 'orange' },
            { step: '6', label: 'Composite (transform, opacity → GPU)', cost: 'Cheap', color: 'green' },
          ].map(({ step, label, cost, color }) => (
            <div key={step} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-2 flex gap-3 items-center`}>
              <span className={`text-${color}-300 font-bold w-4 shrink-0`}>{step}</span>
              <span className={`text-${color}-200 flex-1`}>{label}</span>
              <span className={`text-${color}-400 text-[10px] font-bold`}>{cost}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">React Reconciliation: 3 Phases</p>
        <div className="grid grid-cols-3 gap-2 text-center text-gray-400">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2"><p className="text-blue-300 font-bold">Render</p><p>Component fn runs → new VDOM tree (pure JS, no DOM)</p></div>
          <div className="bg-violet-500/10 border border-violet-500/30 rounded p-2"><p className="text-violet-300 font-bold">Diff</p><p>New vs old VDOM → minimal change list (still no DOM)</p></div>
          <div className="bg-green-500/10 border border-green-500/30 rounded p-2"><p className="text-green-300 font-bold">Commit</p><p>Apply patches to real DOM in one batch → minimal reflow</p></div>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Critical Rendering Path', definition: 'The sequence: HTML → DOM, CSS → CSSOM, Render Tree, Layout, Paint, Composite. Layout (reflow) is the most expensive — any geometry change cascades through the affected subtree.' },
    { term: 'Forced Sync Layout', definition: 'Reading a geometry property (offsetHeight) after writing a style property forces the browser to flush all pending layout calculations synchronously. In a loop, this causes layout thrashing — frame rate drops from 60fps to <10fps.' },
    { term: 'Virtual DOM', definition: 'A lightweight JS object tree mirroring the real DOM structure. Creating and mutating VDOM nodes is orders of magnitude cheaper than real DOM — no rendering engine involvement.' },
    { term: 'Reconciliation', definition: 'React\'s process of computing the minimal set of real DOM changes after a state update. Render phase (VDOM creation) → Diff phase (comparison) → Commit phase (batched DOM updates).' },
    { term: 'Element Type Heuristic', definition: 'If two nodes at the same position have the same type (both <div>), React updates props on the existing node. If the type changes (<div>→<span>), React destroys the old subtree and mounts a new one.' },
    { term: 'Key Prop', definition: 'A stable identity signal for list items. Without keys, React diffs by index — reordering a 1000-item list updates all 1000 DOM nodes. With stable keys (unique IDs), React identifies moved items and only patches the displacement.' },
    { term: 'React Fiber', definition: 'The reconciler architecture since React 16. Restructures reconciliation as a linked list of interruptible "fiber" units. React can yield to the browser between fibers, enabling Concurrent Mode, Suspense, and transitions.' },
  ],

  code: {
    title: 'Keys in Lists — The Most Common Reconciliation Bug',
    language: 'javascript',
    snippet: `// ✗ WRONG: using array index as key
// If you prepend an item, React updates ALL existing items
// (it thinks item at index 0 changed, index 1 changed, etc.)
const WrongList = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item.name}</li>  // index as key = broken reorder
    ))}
  </ul>
)

// ✓ CORRECT: stable unique ID as key
// React identifies which items moved → only patches the change
const CorrectList = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.name}</li>  // database ID = stable identity
    ))}
  </ul>
)

// ✗ Layout thrashing antipattern (forces synchronous layout):
elements.forEach(el => {
  el.style.width = '100px'     // write
  const h = el.offsetHeight    // read → forces layout flush!
  el.style.height = h + 'px'   // write again
})

// ✓ Batch reads then writes:
const heights = elements.map(el => el.offsetHeight)  // read all
elements.forEach((el, i) => { el.style.height = heights[i] + 'px' })  // write all`,
    explanation: 'Keys are React\'s identity signal for list reconciliation. Using array index as key causes React to re-render all items on reorder/prepend. Use stable database IDs. Layout thrashing is caused by interleaving DOM reads and writes — batch reads first, then writes.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Understanding what triggers layout reflow is the foundation of frontend performance.</strong>{' '}
        A single layout-thrashing loop inside a scroll handler can drop a smooth 60fps experience to a janky 5fps.
        Knowing which CSS properties trigger layout (geometry), paint (visual), or just compositing (transform/opacity)
        lets you design animations that never drop a frame.
      </p>
      <p>
        VDOM and Fiber explain why React can handle complex UIs without freezing. Concurrent Mode (enabled by Fiber)
        allows React to render low-priority updates in the background while keeping the UI responsive to user input.
        This is why React 18's <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">startTransition</code> exists.
      </p>
    </>
  ),

  commonMistakes: [
    'Using array index as the key prop — if the list can reorder, index keys cause React to re-render all items instead of moving them. Always use stable unique IDs.',
    'Changing element types to toggle visibility — swapping <div> to <span> destroys and recreates the entire subtree (expensive). Use CSS display/opacity for toggling instead.',
    'Layout thrashing: reading offsetHeight after setting style.width in a loop — forces synchronous layout on every iteration. Batch all reads first, then all writes.',
    'Thinking VDOM is always faster than direct DOM — for a single targeted update, direct DOM is faster. VDOM\'s value is making declarative rendering practical at scale without catastrophic performance.',
  ],

  summary: [
    'Critical Rendering Path: HTML → DOM, CSS → CSSOM, Render Tree, Layout (expensive!), Paint, Composite.',
    'Layout thrashing: interleaving DOM reads and writes forces synchronous layout on every iteration — batch them.',
    'Virtual DOM: lightweight JS object tree; React diffs it to compute minimal real DOM changes.',
    'Reconciliation: Render (new VDOM) → Diff → Commit (batched DOM mutations). All in one pass.',
    'Key prop: stable unique ID lets React identify moved list items. Index as key breaks reorder.',
    'Fiber: interruptible reconciler. React can yield to the browser mid-render, enabling Concurrent Mode.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the Critical Rendering Path? Name each step and explain which is most expensive.',
      hint: 'HTML → DOM tree, CSS → CSSOM (render-blocking), DOM + CSSOM → Render tree, Layout/Reflow (most expensive — computes position/size of every element; any geometry change cascades), Paint (rasterizes colors/borders), Composite (GPU composites layers). Layout is most expensive because a single width change can cascade through an entire subtree. Reading geometry properties after a write forces a synchronous layout flush.',
    },
    {
      type: 'question',
      text: 'Explain React\'s reconciliation algorithm. What two heuristics does it use to achieve O(n) performance?',
      hint: 'Naive tree diff is O(n³). React uses two heuristics: (1) Element Type: same type at same position → update props on existing node; different type → destroy old subtree and mount new one. (2) Key Prop: for lists, key provides stable identity. Without keys → diff by index (reorder = O(n) updates). With stable keys → React identifies moved items and patches only displacement. Result: O(n) reconciliation for typical UI trees.',
    },
    {
      type: 'question',
      text: 'What is React Fiber and what specific problem does it solve?',
      hint: 'Before Fiber (React < 16): reconciler was a single recursive synchronous function. If a large tree took 50ms to reconcile, the browser thread was blocked for 50ms — inputs ignored, no animation frames, visible jank. Fiber rewrites reconciliation as a linked list of "fiber" units (one per component). React can process one fiber, check if higher-priority work exists (user input, animation frame), yield, then resume. This enables Concurrent Mode (background renders), Suspense (pause for data), and startTransition (mark non-urgent updates).',
    },
    {
      type: 'task',
      text: 'Explain what happens to DOM performance when you do: elements.forEach(el => { el.style.width = "100px"; let h = el.offsetHeight; el.style.height = h + "px"; }). Then write the correct version.',
      hint: 'Each iteration: writing style.width (queues layout), then reading offsetHeight (forces synchronous layout flush to return accurate value) — the browser must recalculate layout on every iteration. For 100 elements = 100 forced synchronous layouts = layout thrashing, potentially <10fps. Correct: const heights = elements.map(el => el.offsetHeight); elements.forEach((el, i) => { el.style.width = "100px"; el.style.height = heights[i] + "px"; }); — read all first, then write all.',
    },
  ],
}

export default function RenderingVirtualDOMPage() {
  return <FEDFTopicPage content={content} />
}
