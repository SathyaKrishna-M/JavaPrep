'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'The React Component Model',
  subtitle: 'Functions, props, state, JSX, and composition — the complete mental model',
  co: 'CO3 — React Core Concepts',

  overview: (
    <>
      <p>
        A React component is simply a <strong className="text-white">JavaScript function</strong> that
        accepts an object of inputs called <strong className="text-white">props</strong> and returns{' '}
        <strong className="text-white">JSX</strong> — a description of what should appear on screen.
        That single idea powers everything: composition, reuse, testing, and the declarative UI model.
      </p>
      <p>
        <strong className="text-white">Props</strong> flow down from parent to child and are
        read-only — a child never modifies its own props. <strong className="text-white">State</strong>{' '}
        is private internal data managed by the component via{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">useState</code>. When either
        changes, React re-renders the component: it calls the function again with the new inputs and
        reconciles the returned JSX with the previous output.
      </p>
      <p>
        <strong className="text-white">JSX</strong> is syntactic sugar for{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">React.createElement(type, props, ...children)</code>.
        Babel transforms every JSX tag at build time — browsers never see JSX directly. This means
        JSX differences from HTML (like <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">className</code>{' '}
        instead of <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">class</code>) are
        not quirks but necessary distinctions between JavaScript and HTML.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Mental model: a component is a stamp. Define it once, press it anywhere. Change the
        stamp design and every impression updates automatically on the next render.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      {/* Component anatomy */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">Component Anatomy</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { label: 'Props', color: 'violet', desc: 'Read-only inputs from the parent. Drive how the component looks and behaves. Never mutate them.' },
            { label: 'State', color: 'pink',   desc: 'Private mutable data via useState. Calling the setter schedules a re-render with the new value.' },
            { label: 'JSX Output', color: 'cyan', desc: 'What React renders. Recomputed every render from current props + state. Pure description, no DOM calls.' },
          ].map(({ label, color, desc }) => (
            <div key={label} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-3`}>
              <p className={`text-${color}-300 font-bold mb-1`}>{label}</p>
              <p className="text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* JSX vs HTML table */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-amber-400 text-xs font-semibold mb-3 uppercase tracking-wider">JSX vs HTML — Key Differences</p>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-800/50">
              <th className="border border-slate-700 px-3 py-2 text-left text-gray-300">HTML</th>
              <th className="border border-slate-700 px-3 py-2 text-left text-gray-300">JSX Equivalent</th>
              <th className="border border-slate-700 px-3 py-2 text-left text-gray-300">Reason</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['class="btn"',        'className="btn"',          'class is a reserved JS keyword'],
              ['for="email"',        'htmlFor="email"',          'for is a reserved JS keyword'],
              ['onclick="fn()"',     'onClick={fn}',             'camelCase events; value is JS, not a string'],
              ['style="color:red"',  'style={{ color: "red" }}', 'style takes a JS object, not a CSS string'],
              ['<br>',               '<br />',                   'JSX requires all tags to be self-closing'],
            ].map(([html, jsx, reason]) => (
              <tr key={html} className="border-t border-slate-700/50">
                <td className="border border-slate-700 px-3 py-1.5 font-mono text-red-300">{html}</td>
                <td className="border border-slate-700 px-3 py-1.5 font-mono text-green-300">{jsx}</td>
                <td className="border border-slate-700 px-3 py-1.5 text-gray-400">{reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Prop drilling intro */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Prop Drilling Problem</p>
        <div className="flex items-center gap-2 flex-wrap font-mono text-gray-300">
          <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 rounded px-2 py-1">{'<App user={user} />'}</span>
          <span className="text-gray-500">→</span>
          <span className="bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded px-2 py-1">{'<Layout user={user} />'}</span>
          <span className="text-gray-500">→</span>
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded px-2 py-1">{'<Header user={user} />'}</span>
          <span className="text-gray-500">→</span>
          <span className="bg-green-500/20 text-green-300 border border-green-500/30 rounded px-2 py-1">{'<Avatar user={user} />'}</span>
        </div>
        <p className="text-amber-300 mt-2">user is passed through 3 layers that don't use it — solved by Context or state managers.</p>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Component',     definition: 'A JavaScript function that accepts props and returns JSX. Must be named with PascalCase — lowercase names are treated as native DOM elements.' },
    { term: 'Props',         definition: 'Read-only inputs from the parent. Passed as JSX attributes: <Card title="Hello" />. Received as an object in the function signature. Never mutate them.' },
    { term: 'State',         definition: 'Internal mutable data via useState(initial). Returns [currentValue, setter]. Calling setter schedules a re-render. State is private to the component.' },
    { term: 'JSX',           definition: 'HTML-like syntax inside JS files. Compiled to React.createElement() by Babel. Not valid JS — requires a build step. Expressions in {} are evaluated as JS.' },
    { term: 'Functional update', definition: 'setState(prev => prev + 1) — safer than setState(count + 1) when the new state depends on the previous, because React may batch multiple updates.' },
    { term: 'Fragment',      definition: '<> ... </> — wraps multiple elements without adding a DOM node. Needed because JSX must have exactly one root element.' },
    { term: 'children prop', definition: 'Special prop containing nested JSX: <Card>content</Card> — "content" is children. Enables the slot/wrapper pattern for flexible layout components.' },
    { term: 'Prop drilling', definition: 'Passing a prop through multiple intermediate components that don\'t use it, just to reach a deeply nested child. Solved by Context API or state managers.' },
  ],

  code: {
    title: 'Props, State, JSX Patterns — Complete Reference',
    language: 'jsx',
    snippet: `import { useState } from 'react';

// ── 1. Basic component with props ─────────────────────────────
function Badge({ count, color = 'pink', label }) {    // default prop: color
  return (
    <span className={\`badge badge-\${color}\`}>
      {label}: {count}                                  {/* JS expression in JSX */}
    </span>
  );
}

// ── 2. State + functional update ──────────────────────────────
function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);

  // Functional update: safe when new state depends on previous
  const handleClick = () => setLikes(prev => prev + 1);

  return (
    <button onClick={handleClick}>
      ❤ <Badge count={likes} label="Likes" />          {/* composition */}
    </button>
  );
}

// ── 3. Conditional rendering — 3 approaches ───────────────────
function Alert({ type, message }) {
  // Approach 1: ternary
  const icon = type === 'error' ? '❌' : '✓';

  return (
    <div>
      {/* Approach 2: && operator (only renders if truthy) */}
      {type === 'error' && <p className="text-red-500">Error!</p>}

      {/* Approach 3: stored variable */}
      <p>{icon} {message}</p>
    </div>
  );
}

// ── 4. List rendering with key ────────────────────────────────
function TodoList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>                              {/* stable key required */}
          {item.text}
        </li>
      ))}
    </ul>
  );
}

// ── 5. children prop — layout/wrapper component ───────────────
function Card({ title, children }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-body">{children}</div>       {/* slot pattern */}
    </div>
  );
}

// Usage: anything inside <Card> tags becomes children
<Card title="Post">
  <p>This becomes children</p>
  <LikeButton postId={42} />
</Card>

// ── 6. JSX compiles to: ───────────────────────────────────────
// <Badge count={5} color="pink" />
// React.createElement(Badge, { count: 5, color: "pink" })`,
    explanation: 'The functional update pattern (prev => prev + 1) is critical when React batches multiple setState calls in one event — using setState(count + 1) three times still only increments by 1 because all three closures capture the same stale count value.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Everything in React is a component.</strong>{' '}
        Pages, buttons, modals, form fields — all components. The component model is why React
        apps are testable (each component is a pure function), maintainable (change one component,
        affect only where it's used), and composable (nest components like HTML elements).
      </p>
      <p>
        Props enforce the parent-child contract. State gives components autonomy. Together they
        implement unidirectional data flow: parents control children via props, children report
        events upward via callback props. This predictable one-way flow is what makes large React
        codebases debuggable — you always know where data comes from.
      </p>
      <p>
        The functional update form of setState matters at scale. In concurrent React 18, the
        scheduler may delay or batch state updates. If you write{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">setCount(count + 1)</code>{' '}
        in an async context, count may be stale by the time the update runs. The function form
        always receives the latest committed state.
      </p>
    </>
  ),

  commonMistakes: [
    'Mutating props directly (props.count++ or props.user.name = "x"). Props are read-only. Create local state from them if you need to mutate.',
    'Returning multiple root JSX elements without a Fragment wrapper: <p>A</p><p>B</p> is a syntax error. Use <> ... </> or <React.Fragment>.',
    'Using lowercase for component names: <card> is treated as a native DOM element "card", not your Card component. Always PascalCase.',
    'Calling a component as a function — MyComponent() — instead of JSX <MyComponent />. Hooks break when a component is called directly rather than rendered by React.',
    'Using setState(count + 1) when multiple updates happen in one event. The closure captures a stale count. Use setState(prev => prev + 1) instead.',
    'Forgetting that state updates are asynchronous: console.log(count) immediately after setCount(5) logs the old value. The new value is available on the next render.',
    'Missing the key prop in list rendering — React warns, and list items get mismatched state on reorder.',
  ],

  summary: [
    'A component is a JS function: (props) => JSX. Named with PascalCase. One root element returned.',
    'Props are read-only inputs from the parent. State is private mutable data via useState.',
    'JSX = syntactic sugar over React.createElement(). Babel compiles it. Not valid browser JS.',
    'Conditional rendering: ternary (a ? b : c), short-circuit (condition && <Comp />), or variable.',
    'List rendering: .map() + key prop. Key must be stable, unique within the list — not the array index.',
    'children is a special prop for nested JSX — enables layout wrappers and slot patterns.',
    'Functional update: setState(prev => next) is safer than setState(derivedFromCurrentVar) when batching occurs.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the difference between props and state in React?',
      hint: 'Props come from the parent — read-only inputs. State is internal data managed by useState — private and mutable. Both trigger a re-render when they change. Props belong to the parent; state belongs to the component itself.',
    },
    {
      type: 'question',
      text: 'Explain why setState(prev => prev + 1) is safer than setState(count + 1) in some scenarios.',
      hint: 'React may batch multiple setState calls in a single event. All three calls in one handler close over the same stale count. Using a functional update always receives the latest committed state, so three calls correctly increment by 3.',
    },
    {
      type: 'question',
      text: 'What is JSX and how does it compile to JavaScript?',
      hint: 'JSX is syntactic sugar that Babel transforms into React.createElement(type, props, children) calls. <Badge count={5} /> becomes React.createElement(Badge, { count: 5 }). Browsers never see JSX.',
    },
    {
      type: 'question',
      text: 'Why is the key prop required when rendering lists? What problems occur without it?',
      hint: 'Key gives React a stable identity for each list item. Without it, React re-renders by position — if you remove item 0, React thinks item 1 became item 0, corrupting state. Inputs, checkboxes, and animations all break with missing or unstable keys.',
    },
    {
      type: 'question',
      text: 'How do you conditionally render a component in React? Show 3 different approaches.',
      hint: '1. Ternary: condition ? <A /> : <B />. 2. Short-circuit: condition && <A /> (renders nothing when false). 3. Variable: const el = condition ? <A /> : null; return <div>{el}</div>. Never use if inside JSX return directly.',
    },
    {
      type: 'question',
      text: 'What is the children prop and how is it used? Show an example of a layout component that uses children.',
      hint: 'children is whatever JSX is nested inside a component\'s tags. function Card({ title, children }) { return <div><h2>{title}</h2>{children}</div>; } — used as <Card title="Post"><p>body</p></Card>. Enables wrapper/slot patterns.',
    },
    {
      type: 'question',
      text: 'MCQ: What is the output when you call setState three times in the same event handler in React 18 — setCount(count+1); setCount(count+1); setCount(count+1) — if count starts at 0?',
      hint: 'Answer: count becomes 1, not 3. All three closures capture the same stale count = 0. React batches the updates and applies the last one. Fix: use setCount(prev => prev + 1) three times — then count becomes 3 because each functional update receives the already-incremented value.',
    },
  ],
}

export default function ComponentModelPage() {
  return <FEDFTopicPage content={content} />
}
