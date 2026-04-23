'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Rendering Behavior',
  subtitle: 'Reconciliation, keys, memoization, and React 18 concurrent features',
  co: 'CO3 — React Core Concepts',

  overview: (
    <>
      <p>
        Understanding when and why React re-renders is what separates engineers who write working
        React from engineers who write <em>performant</em> React. The default behavior is
        deliberately simple and safe: whenever a component's state or props change, React re-renders
        it and all its descendants. This predictability is a feature, not a bug.
      </p>
      <p>
        React uses a <strong className="text-white">virtual DOM</strong> — an in-memory JavaScript
        object tree — and a process called <strong className="text-white">reconciliation</strong> to
        compute the minimal set of real DOM changes needed after each re-render. It never re-paints
        the whole page; it surgically updates only what changed. The reconciliation algorithm is
        O(n) rather than the theoretically optimal O(n³) by making two key heuristics.
      </p>
      <p>
        The <strong className="text-white">key</strong> prop is React's primary tool for list item
        identity. A stable key lets React tell "this item moved" from "this item was removed and a
        new one was inserted," enabling correct state preservation, animations, and efficient updates.
        The optimization hooks — <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">React.memo</code>,{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">useMemo</code>,{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">useCallback</code> — let
        you opt individual subtrees out of the default re-render cascade.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Mental model: reconciliation is like a diff tool comparing two versions of a file — it finds
        only the changed lines and applies a patch, rather than rewriting the whole file.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      {/* Re-render triggers */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">What Triggers a Re-render?</p>
        <div className="space-y-2 text-xs">
          {[
            { trigger: 'setState called',      result: 'That component + all descendants re-render', color: 'pink' },
            { trigger: 'New props received',   result: 'Component whose props changed re-renders', color: 'violet' },
            { trigger: 'Context value changes', result: 'All consumers of that context re-render', color: 'amber' },
            { trigger: 'Parent re-renders',    result: 'All children re-render (unless wrapped in React.memo)', color: 'blue' },
          ].map(({ trigger, result, color }) => (
            <div key={trigger} className="flex items-start gap-3">
              <span className={`text-${color}-300 font-mono bg-${color}-500/10 border border-${color}-500/30 rounded px-2 py-0.5 shrink-0 text-xs`}>{trigger}</span>
              <span className="text-gray-400">→ {result}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <p className="text-red-400 font-bold mb-2">Unstable key: array index</p>
          <code className="text-gray-400 block mb-1">{'items.map((item, i) => <li key={i}>'}</code>
          <ul className="text-red-300 space-y-1 mt-2 list-disc list-inside">
            <li>Delete item 0 → item 1 becomes key=0</li>
            <li>React reuses the DOM node with wrong state</li>
            <li>Inputs, checkboxes, animations all break</li>
          </ul>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
          <p className="text-green-400 font-bold mb-2">Stable key: database ID</p>
          <code className="text-gray-400 block mb-1">{'items.map(item => <li key={item.id}>'}</code>
          <ul className="text-green-300 space-y-1 mt-2 list-disc list-inside">
            <li>Delete item: React correctly unmounts it</li>
            <li>Reorder: React moves existing DOM nodes</li>
            <li>State stays with the right item always</li>
          </ul>
        </div>
      </div>

      {/* Optimization hooks comparison */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-violet-400 text-xs font-semibold mb-3 uppercase tracking-wider">Optimization Hooks Compared</p>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-800/50">
              <th className="border border-slate-700 px-3 py-2 text-left text-gray-300">Hook</th>
              <th className="border border-slate-700 px-3 py-2 text-left text-gray-300">What it memoizes</th>
              <th className="border border-slate-700 px-3 py-2 text-left text-gray-300">Use case</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['React.memo(Comp)', 'The component output', 'Skip re-render if props unchanged (shallow)'],
              ['useMemo(fn, deps)', 'A computed value', 'Expensive calculation (sort, filter large arrays)'],
              ['useCallback(fn, deps)', 'A function reference', 'Stable prop for memoized child component'],
            ].map(([hook, what, use]) => (
              <tr key={hook} className="border-t border-slate-700/50">
                <td className="border border-slate-700 px-3 py-1.5 font-mono text-pink-300">{hook}</td>
                <td className="border border-slate-700 px-3 py-1.5 text-amber-300">{what}</td>
                <td className="border border-slate-700 px-3 py-1.5 text-gray-400">{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Re-render',        definition: 'React calling your component function again to compute updated JSX. Does not necessarily mean the DOM changes — React may diff and decide nothing needs to update.' },
    { term: 'Virtual DOM',      definition: 'A plain JavaScript object tree representing the UI. React renders to the VDOM first, diffs new vs old, then applies only the changed nodes to the real DOM.' },
    { term: 'Reconciliation',   definition: 'React\'s O(n) diffing algorithm. Heuristics: (1) different element type → unmount old, mount new; (2) same type → update attributes. Keys help match list items across renders.' },
    { term: 'key prop',         definition: 'Gives React a stable identity for list items across renders. Stable key (database ID) = React tracks the same element. Unstable key (array index) = React confuses items on reorder/delete.' },
    { term: 'React.memo',       definition: 'HOC that wraps a component and memoizes its output. Skips re-render if all props are shallowly equal to previous render. Only an optimization — never changes correctness.' },
    { term: 'useMemo',          definition: 'useMemo(() => compute(), [deps]). Memoizes a computed value. Recomputes only when deps change. For expensive calculations; prevents recalculation on every render.' },
    { term: 'useCallback',      definition: 'useCallback(fn, [deps]). Returns a memoized function reference. Without it, fn is a new object every render, breaking React.memo on the child that receives it.' },
    { term: 'Automatic batching', definition: 'React 18 feature: multiple setState calls in the same async function/timeout/promise are batched into a single re-render. React 17 only batched within synchronous event handlers.' },
  ],

  code: {
    title: 'Reconciliation, Keys, React.memo, useMemo, useCallback',
    language: 'jsx',
    snippet: `import { useState, memo, useMemo, useCallback } from 'react';

// ── 1. Keys in lists — use stable IDs ────────────────────────
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}       // stable database ID — NOT the array index
          todo={todo}
          onToggle={handleToggle}
        />
      ))}
    </ul>
  );
}

// ── 2. React.memo — skip re-render if props unchanged ─────────
const TodoItem = memo(function TodoItem({ todo, onToggle }) {
  // Only re-renders when todo or onToggle reference changes
  return (
    <li onClick={() => onToggle(todo.id)}>
      {todo.done ? '✓' : '○'} {todo.text}
    </li>
  );
});

// ── 3. The parent — showing why useCallback is needed ─────────
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn hooks', done: false },
    { id: 2, text: 'Build something', done: false },
  ]);
  const [theme, setTheme] = useState('light');

  // WITHOUT useCallback: new function reference every render
  // → React.memo on TodoItem is useless, it re-renders anyway
  // WITH useCallback: stable reference — memo works correctly
  const handleToggle = useCallback((id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }, []); // no deps: setTodos is stable, functional update avoids stale closure

  // useMemo: expensive computation (e.g., sorting a large list)
  const sortedTodos = useMemo(
    () => [...todos].sort((a, b) => a.text.localeCompare(b.text)),
    [todos]    // re-sort only when todos actually changes
  );

  return (
    <>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle theme   {/* changing theme does NOT re-render memoized TodoItems */}
      </button>
      <TodoList todos={sortedTodos} handleToggle={handleToggle} />
    </>
  );
}

// ── 4. Automatic batching — React 18 ──────────────────────────
async function handleClick() {
  // React 17: two separate re-renders
  // React 18: batched into ONE re-render
  setLoading(true);
  setCount(c => c + 1);
  // Both state updates are applied in a single render pass
}`,
    explanation: 'The combination of React.memo + useCallback is the key pattern: memo prevents re-render when props are equal, but that only works if the function prop has a stable reference. useCallback provides that stability. useMemo is for expensive derived data, not for function memoization.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Incorrect keys cause real, silent bugs.</strong>{' '}
        A todo list using index keys will corrupt input state when items are removed — the input
        for todo B suddenly shows todo C's content because React matched them by position.
        This is impossible to debug by looking at React code; you must understand reconciliation.
      </p>
      <p>
        React.memo, useMemo, and useCallback are <em>optimizations</em>, not correctness tools.
        They add overhead (comparison cost). Don't add them everywhere — use React DevTools Profiler
        to identify actual bottlenecks first. Most React apps don't have a rendering bottleneck;
        they have a network or architecture problem.
      </p>
      <p>
        React 18's automatic batching is a significant performance win. Code that called setState
        twice in a setTimeout previously caused two re-renders; now it causes one. This is a
        non-breaking change that improves performance transparently for all React 18 apps.
      </p>
    </>
  ),

  commonMistakes: [
    'Using array index as key for lists that can reorder, insert, or delete items — causes state corruption, animation bugs, and accessibility issues.',
    'Wrapping every component in React.memo — it adds comparison overhead on every render. Only use after profiling confirms excessive re-renders.',
    'Assuming re-render = DOM update — React re-renders (calls your function) cheaply. The DOM update only happens if the diff detects actual changes.',
    'Creating new objects or functions in render as props to a memoized component: <Memo style={{ color: "red" }} /> creates a new object every render, breaking memo\'s shallow comparison.',
    'Using useMemo for non-expensive computations — the memoization itself has overhead. Only use for sorting/filtering large arrays or complex calculations.',
    'Forgetting useCallback when passing a function to a React.memo-wrapped child — new function reference every render defeats the memo.',
  ],

  summary: [
    'Re-render triggers: setState, new props, context update, or parent re-render. Re-render does not always mean a DOM change.',
    'Virtual DOM: React renders to a JS object tree first, diffs old vs new (reconciliation), then applies minimal real DOM changes.',
    'Reconciliation: O(n) using two heuristics — different element type means unmount+remount; same type means update attributes.',
    'key prop: gives list items stable identity. Use database IDs. Index as key breaks state on reorder or delete.',
    'React.memo: memoizes component output. Skips re-render if props are shallowly equal. Requires stable function props (useCallback).',
    'useMemo: caches expensive computed values. useCallback: caches function references. Both only useful when the child is wrapped in memo.',
    'React 18 automatic batching: multiple setState calls in async contexts now batch into one re-render — was previously React 17 sync-only.',
  ],

  practice: [
    {
      type: 'question',
      text: 'List all the things that can trigger a React component to re-render.',
      hint: '1. Its own state changes (setState called). 2. Its props change (parent passes new values). 3. A context it consumes updates. 4. Its parent re-renders (default — unless wrapped in React.memo). Note: re-render calls your function but may not update the DOM if the JSX diff is empty.',
    },
    {
      type: 'question',
      text: 'What is the difference between useMemo and useCallback? Give a use case for each.',
      hint: 'useMemo(() => compute(), deps) memoizes a VALUE — use for expensive calculations like sorting a large array. useCallback(fn, deps) memoizes a FUNCTION REFERENCE — use when passing a callback to a React.memo-wrapped child so the child doesn\'t re-render due to a new function object each render.',
    },
    {
      type: 'question',
      text: 'Explain React.memo. When should you use it and when is it counterproductive?',
      hint: 'React.memo wraps a component and skips re-render if all props are shallowly equal to the previous render. Use when: the component re-renders frequently with unchanged props and the render is expensive. Counterproductive when: props change every render anyway, or the component is cheap to render (the comparison cost exceeds the savings).',
    },
    {
      type: 'question',
      text: 'What is the reconciliation algorithm? How does it decide whether to update or replace a DOM node?',
      hint: 'React diffs old VDOM vs new VDOM. Two heuristics: (1) If element type changed (div → span), unmount old tree completely and mount fresh — React assumes different types mean structurally different UIs. (2) If same type, update only the changed attributes/children. Keys let React match list items across renders by identity rather than position.',
    },
    {
      type: 'question',
      text: 'Why do unstable keys (like array indices) cause problems? Show a specific scenario where this breaks.',
      hint: 'Scenario: list [A, B, C] with index keys. Delete A. New list [B, C]. React sees key=0 → B (was A), key=1 → C (was B). If A had an <input> with text "Hello", React reuses that DOM input node for B — B now shows "Hello". The same corruption happens with animations, focus state, and checkboxes.',
    },
    {
      type: 'question',
      text: 'What is automatic batching in React 18? How does it differ from React 17?',
      hint: 'React 18 batches ALL setState calls in the same task (including inside async functions, setTimeout, native event listeners) into a single re-render. React 17 only batched within synchronous React event handlers — async callbacks caused separate re-renders for each setState. React 18 is a silent perf improvement; no code changes needed.',
    },
    {
      type: 'question',
      text: 'MCQ: A parent component re-renders. What happens to a child wrapped in React.memo if the parent passes a new object literal { color: "red" } as a prop each time?',
      hint: 'Answer: The child RE-RENDERS every time, defeating memo. Each render creates a new object reference — { color: "red" } !== { color: "red" } in JS reference equality. React.memo does a shallow comparison and sees a "new" prop. Fix: useMemo(() => ({ color: "red" }), []) in the parent to stabilize the reference.',
    },
  ],
}

export default function RenderingBehaviorPage() {
  return <FEDFTopicPage content={content} />
}
