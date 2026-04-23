'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Modern JavaScript for UI',
  subtitle: 'ES6+ syntax React requires — destructuring, spread, arrow functions, optional chaining, and modules',
  co: 'CO2 — JavaScript Foundations',

  overview: (
    <>
      <p>
        React code is written in modern JavaScript. Mastering ES6+ syntax is not optional — it is the language
        React speaks. Destructuring, spread/rest, template literals, optional chaining, and arrow functions appear
        in virtually every React component you will read or write.
      </p>
      <p>
        <strong className="text-white">Destructuring</strong> extracts values from arrays or objects into named
        variables in one statement. React uses it constantly: <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">const [count, setCount] = useState(0)</code> is
        array destructuring; <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">function Card({'{ title, body }'})</code> is object destructuring in props.
      </p>
      <p>
        <strong className="text-white">Spread operator</strong> creates new references — the foundation of
        immutable state updates in React. <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">{'{ ...obj, key: val }'}</code> produces
        a new object with all properties of obj plus the updated key, without mutating the original.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">ES5 → ES6+ Transformation</p>
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
            <p className="text-red-400 font-bold mb-2 font-sans">ES5 (Old)</p>
            <div className="text-gray-300 space-y-1">
              <p>{'var name = user.name;'}</p>
              <p>{'var age = user.age;'}</p>
              <p>{'var city = user.address'}</p>
              <p>{'  ? user.address.city : "?";'}</p>
              <p>{"var label = name + ' (' + age + ')'"}</p>
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
            <p className="text-green-400 font-bold mb-2 font-sans">ES6+ (Modern)</p>
            <div className="text-gray-300 space-y-1">
              <p>{'const { name, age } = user;'}</p>
              <p>{'const city = user.address?.city ?? "?";'}</p>
              <p>{'const label = `${name} (${age})`;'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Most-Used Features in React Code</p>
        <div className="space-y-1 text-gray-400">
          <p><span className="text-cyan-300">Destructuring</span> — const [state, setter] = useState(); {'function Comp({ prop })'}</p>
          <p><span className="text-cyan-300">Spread</span> — {'{ ...obj, key: newVal }'} for immutable updates</p>
          <p><span className="text-cyan-300">Arrow fn</span> — onClick={'{() => setState(x)}'} for inline handlers</p>
          <p><span className="text-cyan-300">Optional chain</span> — user?.profile?.avatar for safe null access</p>
          <p><span className="text-cyan-300">Nullish coalescing</span> — count ?? 0 for default values</p>
          <p><span className="text-cyan-300">Template literals</span> — {"`Hello, ${name}!`"} for string interpolation</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Destructuring', definition: 'Extract values from arrays/objects into named variables. Array: const [a, b] = [1,2]. Object: const { name, age } = user. With defaults: const { role = "guest" } = user. Used in props: function Card({ title, body }).' },
    { term: 'Spread operator (...)', definition: 'Expands an iterable into individual elements. Array spread: [...arr, newItem] (immutable add). Object spread: { ...obj, key: val } (immutable update). Creates new references — essential for React state updates.' },
    { term: 'Rest parameters', definition: 'Collects remaining elements into an array/object. In function params: function f(a, ...rest). In destructuring: const { id, ...remaining } = props. Useful for forwarding unknown props.' },
    { term: 'Arrow functions', definition: 'Concise function syntax: (x) => x * 2. Lexically binds `this` — no more that = this hacks. Enables inline event handlers in JSX: onClick={() => setState(x)}. Implicit return for expression bodies.' },
    { term: 'Optional chaining (?. )', definition: 'Safely accesses nested properties. user?.address?.city returns undefined instead of throwing if any intermediate value is null/undefined. Essential for handling API responses with optional fields.' },
    { term: 'Nullish coalescing (??)', definition: 'Returns right-hand side only when left is null or undefined. count ?? 0 gives 0 for null/undefined but preserves 0 and "" (unlike || which also catches falsy values). Use for default values.' },
    { term: 'ES Modules (import/export)', definition: 'Static, tree-shakeable module system. Named exports: export const fn. Default export: export default Component. Import: import Component, { helper } from "./module". Bundlers (Vite, Webpack) use this for code splitting.' },
  ],

  code: {
    title: 'ES6+ Patterns in React Components',
    language: 'javascript',
    snippet: `import { useState } from 'react'

// Destructuring in props + default values
function UserCard({ name, role = 'viewer', address, onEdit }) {
  // Optional chaining for nullable nested data
  const city = address?.city ?? 'Unknown'
  const country = address?.country ?? '—'

  // Template literal
  const title = \`\${name} · \${role}\`

  return (
    <div>
      <h2>{title}</h2>
      <p>{city}, {country}</p>
      {/* Arrow function inline handler */}
      <button onClick={() => onEdit(name)}>Edit</button>
    </div>
  )
}

// Spread for immutable state updates
function ProfileEditor() {
  const [user, setUser] = useState({ name: 'Alice', role: 'viewer', age: 28 })

  const updateName = (name) =>
    setUser(prev => ({ ...prev, name }))           // new object reference ✓

  const updateNested = (city) =>
    setUser(prev => ({
      ...prev,
      address: { ...prev.address, city },           // spread at each level ✓
    }))

  // Rest — forward unknown props to DOM element
  function Input({ label, className, ...rest }) {
    return (
      <label>
        {label}
        <input className={\`base-input \${className}\`} {...rest} />
      </label>
    )
  }
}`,
    explanation: 'Optional chaining (?.) prevents crashes when API data has null intermediate properties. Spread (...) at each nesting level produces new references — required for React to detect the change. Rest (...rest) in props collects all remaining props for forwarding to the underlying element.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">You cannot write idiomatic React without ES6+.</strong>{' '}
        useState returns an array — you destructure it. Component props are objects — you destructure them.
        Immutable state updates require spread. Event handlers are arrow functions. Optional chaining is used
        in every component that renders API data that might be partially loaded.
      </p>
      <p>
        ES Modules (import/export) are the foundation of how modern bundlers like Vite and Webpack perform
        tree-shaking — eliminating unused code from the final bundle. Understanding named vs default exports
        matters for code splitting, lazy loading, and keeping bundle sizes optimal.
      </p>
    </>
  ),

  commonMistakes: [
    'Confusing spread and rest — spread expands (...arr creates copy); rest collects (...rest in params gathers remaining args). They use the same syntax in different positions.',
    'Using || instead of ?? for defaults — 0 || 5 returns 5 (0 is falsy!). Use 0 ?? 5 to correctly use 0 as a value. ?? only checks null/undefined.',
    'Optional chaining on function calls: obj?.method() — if obj.method is undefined, this returns undefined (safe). Without ?. it throws TypeError. Important for event callbacks.',
    'Default export vs named export confusion — default exports can be imported as any name; named exports must match. Mixing these up causes "is not a function" errors.',
  ],

  summary: [
    'Destructuring: const [a, b] = arr; const { name, age = 0 } = obj; function Comp({ prop }) — core React syntax.',
    'Spread: [...arr, item] (immutable array add); { ...obj, key: val } (immutable object update).',
    'Rest: function f(a, ...rest) collects remaining params; const { id, ...rest } = props forwards remaining props.',
    'Arrow functions: (x) => x * 2. Lexical this. Implicit return. Used in every inline JSX handler.',
    'Optional chaining: user?.address?.city returns undefined instead of throwing. Essential for API data.',
    'Nullish coalescing: value ?? default — only triggers on null/undefined, not 0 or "".',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the difference between || and ?? for providing default values? When does this matter in React?',
      hint: '|| returns right-hand side when left is ANY falsy value (0, "", false, null, undefined). ?? returns right-hand side ONLY when left is null or undefined. Matters in React: count || 0 returns 0 even when count is 0 (count is falsy). But if count should be 0, you want count ?? 0 which only substitutes when count is null/undefined. Common bug: rating || "No rating" — this incorrectly shows "No rating" when rating is 0 (a valid rating).',
    },
    {
      type: 'question',
      text: 'Explain the spread operator. How is it used in React to update state immutably?',
      hint: 'Spread expands an iterable into individual elements. Array: [...arr, item] creates a new array with all arr elements plus item — new reference, original unchanged. Object: { ...obj, key: val } creates new object with all obj properties plus overridden key — new reference. In React: setUser(prev => ({ ...prev, name: newName })) creates a new object reference → React detects change → re-renders. Direct mutation (prev.name = newName; setUser(prev)) produces same reference → React skips re-render → stale UI.',
    },
    {
      type: 'task',
      text: 'Refactor this component to use ES6+ syntax: function Profile(props) { var name = props.user.name; var city = props.user.address && props.user.address.city ? props.user.address.city : "Unknown"; return React.createElement("p", null, name + " - " + city); }',
      hint: 'function Profile({ user }) { const { name, address } = user; const city = address?.city ?? "Unknown"; return <p>{`${name} - ${city}`}</p>; } — Destructure user from props directly in parameters. Destructure name and address from user. Optional chain for nested address. Nullish coalescing for default. Template literal for string. JSX instead of createElement.',
    },
    {
      type: 'question',
      text: 'What is the difference between spread and rest? Give an example of each in a React component.',
      hint: 'Same syntax (...) but different positions/purposes. Spread EXPANDS: <input {...rest} /> passes all rest properties as separate props to input. Also: { ...obj, key: val } creates new object. Rest COLLECTS: function Input({ label, ...rest }) — label is extracted, everything else collected into rest. Example: <Input label="Email" type="email" placeholder="..." required />. Inside Input, type/placeholder/required are in rest, label is separate.',
    },
  ],
}

export default function ModernJavaScriptUIPage() {
  return <FEDFTopicPage content={content} />
}
