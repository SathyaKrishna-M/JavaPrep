'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Core Architecture Thinking',
  subtitle: 'Component-driven development, unidirectional data flow, immutability, and composition',
  co: 'CO1 — Front-End Foundations',

  overview: (
    <>
      <p>
        The foundational mental model of modern front-end development is that{' '}
        <strong className="text-white">everything is a component</strong>. A component is a self-contained,
        reusable unit of UI that bundles its markup, logic, and optionally its styles. You think in a tree of
        components — each owning a piece of the interface and the state it needs.
      </p>
      <p>
        React enforces <strong className="text-white">unidirectional data flow</strong>: data travels DOWN
        from parent to child via props; events travel UP from child to parent via callbacks. This deliberate
        constraint means the source of every state change is always a setter call that you can trace upward.
      </p>
      <p>
        React detects state changes by <strong className="text-white">reference equality</strong> (===), not
        deep comparison. This O(1) check is what makes React fast — but it requires{' '}
        <strong className="text-white">immutable updates</strong>: always produce a new reference when updating
        state. Mutating state directly is a silent failure — React sees the same reference and skips the render.
      </p>
      <p className="text-gray-400 italic border-l-2 border-blue-500/40 pl-3">
        Redux DevTools time-travel works because of UI = f(state): store state snapshots, replay them, and the UI
        deterministically reconstructs itself. This is impossible with imperative DOM manipulation.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Atomic Design Hierarchy</p>
        <div className="space-y-1 text-xs">
          {[
            { level: 'Atoms', desc: 'Button, Input, Label, Icon — smallest unit, one responsibility', color: 'blue' },
            { level: 'Molecules', desc: 'SearchBar (Input + Button), FormField (Label + Input + Error)', color: 'violet' },
            { level: 'Organisms', desc: 'NavBar (Logo + Search + UserMenu), ProductCard', color: 'cyan' },
            { level: 'Templates', desc: 'Page layouts with placeholder content — no real data yet', color: 'amber' },
            { level: 'Pages', desc: 'Templates filled with real data — the actual route endpoint', color: 'green' },
          ].map(({ level, desc, color }) => (
            <div key={level} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-2 flex gap-3`}>
              <span className={`text-${color}-300 font-bold shrink-0 w-20`}>{level}</span>
              <span className="text-gray-400">{desc}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-red-400 font-semibold mb-2">Immutable Updates — Pattern Reference</p>
        <div className="space-y-1 font-mono text-gray-300">
          <p><span className="text-red-400">✗ arr.push(x)</span>  →  <span className="text-green-400">✓ [...arr, x]</span></p>
          <p><span className="text-red-400">✗ arr.splice(i,1)</span>  →  <span className="text-green-400">✓ arr.filter((_,j)=&gt;j!==i)</span></p>
          <p><span className="text-red-400">✗ obj.key = x</span>  →  <span className="text-green-400">✓ {'{ ...obj, key: x }'}</span></p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Component-driven', definition: 'Build UIs as a tree of self-contained components, each owning its markup, logic, and state slice. Brad Frost\'s Atomic Design formalises the hierarchy: Atoms → Molecules → Organisms → Templates → Pages.' },
    { term: 'UI = f(state)', definition: 'Your component is a pure function: same state → same UI. State changes trigger re-renders. You never touch the DOM directly — React computes all necessary changes and applies them.' },
    { term: 'Unidirectional flow', definition: 'Data flows DOWN (parent → child via props). Events flow UP (child → parent via callback props). Every state change is traceable — follow the callback upward to the setter.' },
    { term: 'Reference equality', definition: 'React compares state using === (O(1)) not deep equality (O(n)). This is why immutable updates are required: a new reference signals a change; the same reference signals no change.' },
    { term: 'Immutable update', definition: 'Never mutate state directly. Always return a new reference: [...arr, item] instead of arr.push(item). Direct mutation is a silent failure — React skips the re-render entirely.' },
    { term: 'Composition over inheritance', definition: 'React components compose via children, render props, and named component slots — not class inheritance. The React team found no good use case for inheritance hierarchies in UI components.' },
    { term: 'Two-way binding (anti-pattern)', definition: 'Older AngularJS allowed child components to mutate parent state directly via bindings. This makes data flow bidirectional and unpredictable — React\'s unidirectional model eliminates this.' },
  ],

  code: {
    title: 'Unidirectional Flow & Immutable State Updates',
    language: 'javascript',
    snippet: `import { useState } from 'react'

// Parent OWNS state — single source of truth
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
  ])

  // Immutable add — new array reference
  const addTodo = (text) =>
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }])

  // Immutable toggle — map produces new array + new object
  const toggle = (id) =>
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    )

  // Immutable remove — filter produces new array
  const remove = (id) =>
    setTodos(prev => prev.filter(t => t.id !== id))

  // Data goes DOWN via props; events go UP via callbacks
  return (
    <div>
      <AddForm onAdd={addTodo} />           {/* ← event goes UP */}
      {todos.map(t => (
        <TodoItem
          key={t.id}
          todo={t}                           {/* ← data goes DOWN */}
          onToggle={toggle}                  {/* ← callback goes DOWN */}
          onRemove={remove}
        />
      ))}
    </div>
  )
}

// ✗ WRONG — direct mutation (silent failure):
// setTodos(prev => { prev.push(newTodo); return prev })
// React sees same reference → skips re-render`,
    explanation: 'Every state update produces a new reference (spread creates new arrays/objects). Parent owns state; child receives data via props and communicates changes via callback props. This is the complete unidirectional data flow pattern.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Component-driven architecture is how production teams scale.</strong>{' '}
        Clear component boundaries mean Team A owns {'<CheckoutForm />'},  Team B owns {'<ProductCard />'}. Each
        component is testable in isolation with mock props — no browser required. Moving a component moves its
        state and logic too, making refactoring safe.
      </p>
      <p>
        Immutability is not just a React requirement — it enables every performance optimisation React offers:
        React.memo, useMemo, useCallback, and shouldComponentUpdate all rely on reference equality checks.
        Understanding why immutability is required explains when and why to use these optimisations.
      </p>
    </>
  ),

  commonMistakes: [
    'Mutating state directly — arr.push(item); setState(arr) produces the same reference; React skips the re-render. Always use [...arr, item] or arr.filter(...) to create new references.',
    'Over-lifting state — putting all state in App when it\'s only needed by one child. Only the owning component re-renders when state changes; lifting unnecessarily re-renders the entire tree.',
    'Two-way binding patterns (setting DOM values directly) — defeats React\'s unidirectional model. Use controlled inputs where value={state} and onChange={setState}.',
    'Inheritance for component extension — React\'s own docs say there is no good use case for UI component inheritance. Compose with children props or named slot props instead.',
  ],

  summary: [
    'Everything is a component: Atoms → Molecules → Organisms → Templates → Pages (Atomic Design).',
    'UI = f(state): pure function, same state → same UI. No direct DOM manipulation.',
    'Unidirectional flow: data DOWN via props, events UP via callbacks. Always traceable.',
    'Immutable updates required: React uses === (O(1)) to detect changes. Same ref → no re-render.',
    'Immutable patterns: [...arr, item], arr.filter(), arr.map(), { ...obj, key: val }.',
    'Composition over inheritance: nest, wrap, and pass components as props instead of extending classes.',
  ],

  practice: [
    {
      type: 'question',
      text: 'Explain "UI = f(state)". Why is this powerful for debugging and testing?',
      hint: 'UI = f(state) means the component is a pure function: given the same state and props, it always renders the same output — no hidden DOM mutation history, no timing dependence. For debugging: inspect state in DevTools → you know exactly what the UI looks like. For testing: call the component function with props/state, assert the returned JSX — no browser needed. Redux time-travel: store state snapshots → replay them → UI deterministically reconstructs itself. Impossible with imperative DOM.',
    },
    {
      type: 'question',
      text: 'What is unidirectional data flow and what problem does it solve vs two-way binding?',
      hint: 'Unidirectional: data flows DOWN (parent→child via props), events UP (child→parent via callbacks). Source of every state change is always a setter call you can trace upward. Two-way binding (AngularJS ng-model): child could mutate parent state directly via hidden binding mechanism — "who changed this?" becomes very hard to trace in 50+ component trees. Unidirectional creates a predictable, searchable data graph.',
    },
    {
      type: 'question',
      text: 'Why does React require immutable state updates? What happens if you mutate state directly?',
      hint: 'React uses === (reference equality) to detect changes — O(1) vs deep equality O(n). If you mutate directly (state.items.push(x); setState(state.items)), React sees same reference → skips re-render → UI is stale. Worse: all memoisation (React.memo, useMemo, useCallback) is reference-equality-based — direct mutation breaks all of these. Correct: setState([...state.items, x]) creates new array reference → React re-renders.',
    },
    {
      type: 'task',
      text: 'Write a parent component that owns a list of items. Create a child component that displays one item and has a Delete button. Wire up the delete using correct unidirectional flow and immutable state update.',
      hint: 'Parent: const [items, setItems] = useState([...]). Delete handler: setItems(prev => prev.filter(item => item.id !== id)). Pass to child: <Item key={item.id} item={item} onDelete={handleDelete} />. Child: <button onClick={() => onDelete(item.id)}>Delete</button>. Data goes DOWN (item prop), event goes UP (onDelete callback). New array reference created by filter().',
    },
  ],
}

export default function CoreArchitectureThinkingPage() {
  return <FEDFTopicPage content={content} />
}
