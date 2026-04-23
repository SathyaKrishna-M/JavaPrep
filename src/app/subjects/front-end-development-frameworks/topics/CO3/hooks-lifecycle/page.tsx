'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Hooks & Lifecycle',
  subtitle: 'useState, useEffect, custom hooks, and the Rules of Hooks — the complete model',
  co: 'CO3 — React Core Concepts',

  overview: (
    <>
      <p>
        Before React 16.8, managing state and lifecycle required{' '}
        <strong className="text-white">class components</strong> with methods like{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">componentDidMount</code>,{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">componentDidUpdate</code>, and{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">componentWillUnmount</code>.
        Logic for a single feature (fetch data → set up subscription → clean up) was split
        across three separate methods. Sharing stateful logic between components required awkward
        patterns like render props and higher-order components.
      </p>
      <p>
        <strong className="text-white">Hooks</strong> solve all three problems. They let
        functional components use state and side effects. Related logic stays together.
        Stateful logic can be extracted into reusable <strong className="text-white">custom hooks</strong>{' '}
        without changing component hierarchy. The two foundational hooks are{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">useState</code> and{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">useEffect</code> — every
        other built-in hook is a specialization of these two primitives.
      </p>
      <p>
        The <strong className="text-white">Rules of Hooks</strong> are non-negotiable: only call
        hooks at the top level of a component or custom hook — never inside loops, conditions,
        or nested functions. React identifies each hook by its call order; breaking this order
        causes state to be associated with the wrong hook on re-render.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Mental model: useState is a sticky note the component keeps between renders.
        useEffect is an event subscription — "run this after rendering, and let me clean up
        before the next run or when I'm removed."
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      {/* Lifecycle phases */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">Component Lifecycle with Hooks</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { phase: 'Mount',   desc: 'Component renders for the first time. useEffect(fn, []) runs after the first paint. DOM is ready.', color: 'green' },
            { phase: 'Update',  desc: 'Props or state changed. Component re-renders. useEffect(fn, [dep]) runs only if dep changed.', color: 'blue' },
            { phase: 'Unmount', desc: 'Component removed from the tree. Cleanup function returned from useEffect runs now.', color: 'red' },
          ].map(({ phase, desc, color }) => (
            <div key={phase} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-3`}>
              <p className={`font-bold text-${color}-300 mb-1`}>{phase}</p>
              <p className="text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dependency array behaviors */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-violet-400 text-xs font-semibold mb-3 uppercase tracking-wider">useEffect Dependency Array — 3 Behaviors</p>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-800/50">
              <th className="border border-slate-700 px-3 py-2 text-left text-gray-300">Signature</th>
              <th className="border border-slate-700 px-3 py-2 text-left text-gray-300">When it runs</th>
              <th className="border border-slate-700 px-3 py-2 text-left text-gray-300">Use case</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['useEffect(fn)', 'Every render', 'Rare — logging, debugging'],
              ['useEffect(fn, [])', 'Once after mount', 'Initial data fetch, event listener setup'],
              ['useEffect(fn, [dep])', 'Mount + when dep changes', 'Sync with external data based on a prop/state'],
            ].map(([sig, when, use]) => (
              <tr key={sig} className="border-t border-slate-700/50">
                <td className="border border-slate-700 px-3 py-1.5 font-mono text-pink-300 text-xs">{sig}</td>
                <td className="border border-slate-700 px-3 py-1.5 text-amber-300">{when}</td>
                <td className="border border-slate-700 px-3 py-1.5 text-gray-400">{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common hooks quick ref */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Common Hooks at a Glance</p>
        <div className="space-y-1.5">
          {[
            { hook: 'useState',    use: 'Local reactive state — schedules a re-render on update' },
            { hook: 'useEffect',   use: 'Side effects after render — fetch, timers, subscriptions' },
            { hook: 'useRef',      use: 'Mutable value without re-render; DOM element access' },
            { hook: 'useMemo',     use: 'Cache expensive computed value — skip recalculation' },
            { hook: 'useCallback', use: 'Stable function reference — prevents child re-renders' },
            { hook: 'useContext',  use: 'Read context value without prop drilling' },
          ].map(({ hook, use }) => (
            <div key={hook} className="flex gap-3 items-baseline">
              <code className="text-pink-300 w-28 shrink-0 font-mono">{hook}</code>
              <span className="text-gray-400">{use}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'useState',           definition: 'const [value, setValue] = useState(initial). Returns [current state, setter]. Calling setter enqueues a re-render with the new value. Lazy initialization: pass a function to avoid recomputing on every render.' },
    { term: 'useEffect',          definition: 'useEffect(fn, deps). Runs fn after the component renders. The returned function is the cleanup — it runs before the next effect and on unmount. Omit deps = every render; [] = once; [x] = when x changes.' },
    { term: 'Cleanup function',   definition: 'The optional function returned from a useEffect callback. Prevents memory leaks. Cancel AbortControllers, clearInterval, removeEventListener here.' },
    { term: 'Stale closure',      definition: 'A bug where an effect closes over an outdated variable. Example: setInterval inside useEffect with [] reads the initial state forever. Fix: include the variable in the dependency array.' },
    { term: 'Lazy initialization', definition: 'useState(() => expensiveComputation()) — the function is only called once on mount. Without the function wrapper, expensiveComputation() runs on every re-render.' },
    { term: 'Custom hook',        definition: 'A function whose name starts with "use" and which calls other hooks. Extracts reusable stateful logic. Can be tested independently. Examples: useDebounce, useLocalStorage, useWindowSize.' },
    { term: 'Rules of Hooks',     definition: 'Only call hooks at the top level — not inside loops, conditions, or nested functions. Only call from React function components or custom hooks. React enforces this via ESLint plugin react-hooks.' },
  ],

  code: {
    title: 'useState, useEffect, Custom Hooks — Complete Patterns',
    language: 'jsx',
    snippet: `import { useState, useEffect, useRef } from 'react';

// ── 1. useState: lazy initialization ─────────────────────────
function App() {
  // Function form: only called once on mount, not every render
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data') ?? 'null'));
  return <div>{data}</div>;
}

// ── 2. useEffect dependency behaviors ────────────────────────
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Runs when userId changes (or on first mount)
    setLoading(true);
    const controller = new AbortController();

    fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => { setUser(data); setLoading(false); })
      .catch(err => { if (err.name !== 'AbortError') setLoading(false); });

    // Cleanup: abort the fetch if userId changes before it resolves
    return () => controller.abort();
  }, [userId]); // re-runs when userId changes

  if (loading) return <p>Loading...</p>;
  return <p>{user?.name}</p>;
}

// ── 3. Stale closure trap + fix ───────────────────────────────
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // BAD: [] means this runs once — count is always 0 in the closure
    // const id = setInterval(() => console.log(count), 1000);

    // GOOD: functional update reads latest state, no closure needed
    const id = setInterval(() => setCount(prev => prev + 1), 1000);
    return () => clearInterval(id);   // cleanup
  }, []); // empty deps is fine because we use functional update

  return <p>Count: {count}</p>;
}

// ── 4. Custom hooks ───────────────────────────────────────────
// useDebounce: delays value update until user stops changing it
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);    // cancel on next value change
  }, [value, delay]);

  return debounced;
}

// useLocalStorage: persisted state
function useLocalStorage(key, initial) {
  const [stored, setStored] = useState(
    () => JSON.parse(localStorage.getItem(key) ?? JSON.stringify(initial))
  );
  const setValue = (val) => {
    setStored(val);
    localStorage.setItem(key, JSON.stringify(val));
  };
  return [stored, setValue];
}

// Usage in a search component
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetch(\`/search?q=\${debouncedQuery}\`);
  }, [debouncedQuery]); // only fires 300ms after user stops typing

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`,
    explanation: 'The useDebounce hook composes useState + useEffect to delay value propagation. The cleanup clears the previous timer on every keystroke, so the debounced value only updates after the user pauses for 300ms.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Hooks are the entire React programming model</strong>{' '}
        in modern applications. Every major React library exposes hooks: React Router gives you{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">useNavigate</code>, React
        Query gives you <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">useQuery</code>,
        Redux gives you <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">useSelector</code>.
        Understanding the hook model unlocks all of them.
      </p>
      <p>
        Custom hooks are the real power: they let you package complex stateful behavior into a
        single reusable function — useDebounce(), useFetch(), useWindowSize(), useLocalStorage().
        Code that would otherwise be duplicated across 10 components lives in one testable hook.
      </p>
      <p>
        The dependency array is the most misunderstood part of hooks. Missing a dependency causes
        stale closure bugs (the effect reads old values forever). Including too many causes
        unnecessary effect reruns or infinite loops. The ESLint{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded text-xs">react-hooks/exhaustive-deps</code>{' '}
        rule catches most mistakes automatically — enable it and follow its advice.
      </p>
    </>
  ),

  commonMistakes: [
    'Making the useEffect callback async: async functions return a Promise; useEffect expects undefined or a cleanup function. Define an inner async function instead: useEffect(() => { async function load() { ... } load(); }, []).',
    'Missing dependencies (stale closure): reading state or props inside useEffect but omitting them from deps means you always see the initial value. The linter will catch this.',
    'Infinite loop: calling setState inside useEffect with no deps array (or with the state itself as a dep). The update triggers a re-render, which reruns the effect, which updates state again.',
    'Using useEffect for data transformation: if you need to compute derived data from state, do it during render (or useMemo), not in useEffect + setState — that causes an extra render cycle.',
    'Not cleaning up subscriptions or timers: causes memory leaks and "state update on unmounted component" warnings. Always return a cleanup from effects that set up intervals, listeners, or subscriptions.',
    'Forgetting the lazy initialization pattern: useState(JSON.parse(localStorage.getItem(key))) runs JSON.parse on every render even though the result is only used once.',
  ],

  summary: [
    'Hooks let functional components use state and side effects — introduced in React 16.8 to replace class lifecycle methods.',
    'useState: local reactive state. Calling the setter schedules a re-render. Use lazy initialization for expensive initial values.',
    'useEffect: side effects after render. Three behaviors: no deps = every render, [] = once, [dep] = when dep changes.',
    'Cleanup function: returned from useEffect. Runs before the next effect and on unmount. Cancel fetches, clear timers, remove listeners.',
    'Stale closure: effect closes over old state. Fix with functional updates or by adding the variable to the deps array.',
    'Rules of Hooks: top level only, React functions only. Call order must be stable across renders.',
    'Custom hooks (useXxx): extract reusable stateful logic. Can call other hooks. Testable in isolation.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What are the three dependency array behaviors for useEffect? Give an example of when you\'d use each.',
      hint: '1. No array: runs after every render — rarely useful, maybe logging. 2. Empty []: runs once on mount — initial data fetch, event listener setup. 3. [dep]: runs on mount + when dep changes — syncing with a userId prop to re-fetch user data.',
    },
    {
      type: 'question',
      text: 'How do you prevent a memory leak when useEffect sets up a subscription or timer?',
      hint: 'Return a cleanup function from the useEffect callback. For intervals: return () => clearInterval(id). For event listeners: return () => el.removeEventListener(event, handler). For fetch: use AbortController and return () => controller.abort(). React calls cleanup before the next effect run and on unmount.',
    },
    {
      type: 'question',
      text: 'What is a custom hook? Write a useDebounce hook that delays updating a value.',
      hint: 'A custom hook is a function named with "use" that calls other hooks. useDebounce(value, delay): const [deb, setDeb] = useState(value); useEffect(() => { const t = setTimeout(() => setDeb(value), delay); return () => clearTimeout(t); }, [value, delay]); return deb;',
    },
    {
      type: 'question',
      text: 'What is lazy initialization in useState and when should you use it?',
      hint: 'useState(() => expensiveOp()) — passing a function instead of a value. The function is only called once on mount, not on every re-render. Use when the initial value is expensive to compute: JSON.parse, reading localStorage, complex array filtering.',
    },
    {
      type: 'question',
      text: 'Explain the "stale closure" problem in useEffect and how the dependency array solves it.',
      hint: 'A stale closure occurs when an effect closes over a variable (e.g., count) but never updates when count changes because count is not in the deps array. The effect always sees the initial value. Adding count to deps makes the effect re-run (and re-close over the new value) whenever count changes.',
    },
    {
      type: 'question',
      text: 'Why can\'t you call hooks inside a conditional statement?',
      hint: 'React identifies each hook by its call order within the component. If a hook is inside an if-statement, some renders call it and some don\'t — the order changes. React then assigns state from hook 3 to hook 2, corrupting all state. The linter rule react-hooks/rules-of-hooks enforces this.',
    },
    {
      type: 'question',
      text: 'MCQ: What happens if you forget to return a cleanup function from useEffect when setting up an event listener that calls setState?',
      hint: 'Answer: memory leak + "Cannot perform a React state update on an unmounted component" warning (React 17) or silent bug (React 18). The event listener keeps a reference to the component alive and calls setState after unmount. Fix: return () => window.removeEventListener(event, handler) to deregister on unmount.',
    },
  ],
}

export default function HooksLifecyclePage() {
  return <FEDFTopicPage content={content} />
}
