'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Why Frameworks Exist',
  subtitle: 'From manual DOM to declarative UI — the evolution of front-end architecture',
  co: 'CO1 — Front-End Foundations',

  overview: (
    <>
      <p>
        Before React, Angular, or Vue, developers built interactive UIs using raw JavaScript and direct{' '}
        <strong className="text-white">DOM manipulation</strong>. Every interaction required querying elements,
        reading values, computing new values, and writing them back — manually, for every affected node.
        As applications grew, this became unmanageable.
      </p>
      <p>
        Frameworks emerged from necessity. The key philosophical shift is from{' '}
        <strong className="text-white">imperative</strong> to <strong className="text-white">declarative</strong> UI.
        Imperative code tells the browser <em>how</em> to update the DOM step by step. Declarative code describes{' '}
        <em>what</em> the UI should look like given current state — and the framework handles every DOM update automatically.
      </p>
      <p>
        The mental model is <strong className="text-white">UI = f(state)</strong>. Your component is a pure function:
        given the same state, it always produces the same UI. State changes trigger re-renders; you never manually
        touch the DOM. This makes large applications predictable, testable, and maintainable.
      </p>
      <p className="text-gray-400 italic border-l-2 border-blue-500/40 pl-3">
        React was built by Facebook to solve a News Feed chat notification bug caused by inconsistent DOM state.
        Angular was built by Google for Gmail-scale complexity. The problems were universal — so were the solutions.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Imperative vs Declarative</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
            <p className="text-red-300 font-bold mb-2">Vanilla JS (Imperative)</p>
            <div className="font-mono text-gray-300 space-y-0.5">
              <p>{'1. querySelector("#count")'}</p>
              <p>{'2. parse .textContent → Number'}</p>
              <p>{'3. add 1, write back to DOM'}</p>
              <p>{'4. btn.disabled = count >= 10'}</p>
              <p>{'5. update badge, tooltip, aria…'}</p>
              <p className="text-red-400 mt-1">Repeat for every interaction.</p>
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
            <p className="text-green-300 font-bold mb-2">React (Declarative)</p>
            <div className="font-mono text-gray-300 space-y-0.5">
              <p>{'const [count, setCount] = useState(0)'}</p>
              <p className="mt-1">{'<p>{count}</p>'}</p>
              <p>{'<button disabled={count>=10}>'}</p>
              <p className="text-green-400 mt-1">Framework handles ALL DOM updates.</p>
              <p className="text-green-400">Always in sync. Zero querySelector.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-blue-400 font-semibold mb-2">Framework Landscape</p>
        <div className="space-y-1 text-gray-400">
          <p><span className="text-cyan-300 font-semibold">React</span> — Functional, VDOM, ~45 kB. Largest ecosystem. ~60% of job postings.</p>
          <p><span className="text-green-300 font-semibold">Vue 3</span> — Composition API, VDOM, ~34 kB. Low learning curve.</p>
          <p><span className="text-red-300 font-semibold">Angular</span> — Opinionated MVC, TypeScript-first, ~75 kB+. Enterprise-grade.</p>
          <p><span className="text-orange-300 font-semibold">Svelte</span> — Compile-time, no runtime VDOM, ~10 kB. Performance-critical apps.</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Imperative UI', definition: 'Code that tells the browser HOW to update the DOM step by step. You query elements, mutate them, and manage all side effects manually. Breaks down past ~1,000 lines of interactive code.' },
    { term: 'Declarative UI', definition: 'Code that describes WHAT the UI should look like given current state. The framework computes and applies all necessary DOM updates. React, Vue, and Svelte are all declarative.' },
    { term: 'UI = f(state)', definition: 'The defining equation of declarative frameworks. Your component is a pure function: same state → same UI. The framework re-runs your function whenever state changes and updates only what changed in the DOM.' },
    { term: 'Component', definition: 'A self-contained, reusable unit of UI that bundles markup, logic, and optionally styles. Components compose into larger trees — the same way functions compose into programs.' },
    { term: 'Virtual DOM', definition: 'A lightweight JS object tree that mirrors the real DOM. React diffs the new VDOM against the previous one after each state change, then applies only the minimal set of real DOM mutations needed.' },
    { term: 'Unidirectional data flow', definition: 'Data travels in one direction: from parent to child via props. Events travel up from child to parent via callbacks. This makes data flow predictable and debuggable — always trace state upward.' },
    { term: 'When NOT to use', definition: 'Frameworks add ~30–75 kB runtime, a build pipeline, and a learning curve. For static pages, single small widgets, or performance-critical landing pages, vanilla JS or lightweight tools (Alpine.js, htmx) may be better.' },
  ],

  code: {
    title: 'Declarative Counter in React',
    language: 'javascript',
    snippet: `import { useState } from 'react'

// Declarative: describe what UI should look like given state.
// React handles all DOM mutations automatically.
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(c => c + 1)}
        disabled={count >= 10}
      >
        Increment
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

// Contrast: imperative vanilla JS would require:
// 1. querySelector, 2. parse textContent, 3. write back,
// 4. check disabled, 5. update every dependent element —
// for EVERY interaction, manually.`,
    explanation: 'The entire counter — value display, button enabled state, reset — is driven by one state variable. React re-renders the component on every setCount call and applies only the specific DOM changes needed.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Frameworks are the standard for production front-end development.</strong>{' '}
        Every major web product — Facebook, Airbnb, Netflix, Google — is built on a component-based framework.
        Understanding why they exist (not just how to use them) is the difference between a developer who follows
        tutorials and one who can architect scalable UIs.
      </p>
      <p>
        The conceptual shift — from DOM manipulation to declarative state-driven rendering — underpins everything
        else in modern front-end: hooks, context, server components, testing, performance. Get this mental model
        right first and the rest follows logically.
      </p>
    </>
  ),

  commonMistakes: [
    'Using a framework for simple static pages — a marketing site with two buttons doesn\'t need React. The runtime JS delays page load with zero benefit.',
    'Forgetting that frameworks are trade-offs — they add bundle weight (~30–75 kB), a build pipeline, and a learning curve. The payback exceeds the cost at roughly 500+ lines of interactive UI code.',
    'Confusing declarative and imperative — writing useEffect to manually update DOM nodes defeats the purpose of React. Let state drive the UI.',
    'Treating the Virtual DOM as "always faster" — for a single targeted update, direct DOM is faster. VDOM\'s value is making declarative rendering practical without catastrophic performance.',
  ],

  summary: [
    'Frameworks emerged from the pain of manually syncing DOM with data at scale — not from preference.',
    'Declarative UI: describe WHAT the UI should be, not HOW to mutate the DOM. Framework handles the rest.',
    'UI = f(state): given the same state, a component always renders the same output. State changes trigger re-renders.',
    'Unidirectional data flow: data goes DOWN (props), events go UP (callbacks). Predictable and debuggable.',
    'Virtual DOM: React builds a cheap JS object tree, diffs it, and applies only the minimal real DOM changes.',
    'Don\'t use a framework for static/simple pages — evaluate vanilla JS below ~500 lines of interactive UI.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the difference between imperative and declarative UI programming? Give a concrete example of each.',
      hint: 'Imperative: document.getElementById("count").textContent = count + 1; document.getElementById("btn").disabled = count >= 10; — you tell the browser HOW. Declarative (React): <p>{count}</p><button disabled={count>=10}>+</button> — you describe WHAT the UI should look like given state; React handles all DOM mutations. Key insight: imperative tells HOW, declarative tells WHAT.',
    },
    {
      type: 'question',
      text: 'Why does manually syncing the DOM with application state become problematic at scale?',
      hint: 'Fan-out: one state change (user logs out) may require updating 30+ DOM elements — forget one and the UI is inconsistent. State drift: JS variables and DOM content diverge silently. Team conflicts: multiple engineers touching the same DOM nodes cause race conditions. No source of truth: to know "what is the current state?" you\'d have to query dozens of DOM nodes. Testability: can\'t unit test DOM logic without a full browser.',
    },
    {
      type: 'question',
      text: 'Compare React and Angular. When would you choose each?',
      hint: 'React: functional, small API surface, flexible (you choose routing/state/forms libraries). Medium learning curve. Best for SPAs where ecosystem flexibility matters, or when team prefers functional style. Angular: opinionated MVC, TypeScript-first, dependency injection, includes routing/HTTP/forms. High learning curve. Best for large enterprise apps where strict conventions help large teams stay consistent.',
    },
    {
      type: 'question',
      text: 'When is it appropriate to build a UI WITHOUT a framework? Describe three scenarios.',
      hint: '(1) Static marketing/documentation sites with no dynamic data — landing page with CSS animations needs no React. (2) Single small widget embedded in a server-rendered page — a date picker doesn\'t justify a 45 kB runtime; a 200-line vanilla script is faster. (3) Performance-critical micro-pages where Time-to-Interactive directly affects conversion — every kB of JS delays first interaction. Rule: evaluate vanilla JS below ~500 lines of interactive code.',
    },
  ],
}

export default function WhyFrameworksExistPage() {
  return <FEDFTopicPage content={content} />
}
