'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Advanced State Problems',
  subtitle: 'Race conditions, stale closures, caching, and patterns for complex data flows',
  co: 'CO4 — State Architecture & API Integration',

  overview: (
    <>
      <p>
        Production React applications encounter state problems that don't appear in tutorials:
        a search-as-you-type that shows results from a previous query, a form that submits
        twice on a slow connection, a list that flickers to empty during navigation, or a
        component that tries to update state after it's been removed from the page.
      </p>
      <p>
        These are <strong className="text-white">async state problems</strong> — caused by
        the mismatch between the time a request was made and the time the response arrives.
        The solutions are specific patterns: AbortController for cancellation,{' '}
        <strong className="text-white">optimistic updates</strong> for perceived speed,{' '}
        <strong className="text-white">skeleton UIs</strong> for perceived loading,
        and the <strong className="text-white">error boundary</strong> for catastrophic failures.
      </p>
      <p>
        The <strong className="text-white">stale closure</strong> is the most subtle bug in
        React: a callback that captured a value at render time and uses the captured (stale)
        version instead of the current one. Understanding it prevents dozens of hard-to-debug issues.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Real-world analogy: Race conditions are like two delivery drivers going to the same
        address. The one who left last might arrive first, and the second arrival overrides
        the first — even though the first contains more relevant information.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">Race Condition: Search as You Type</p>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex gap-2 items-center">
            <span className="text-gray-400 w-16">User types</span>
            <span className="bg-blue-500/20 text-blue-300 rounded px-2">"re"</span>
            <span className="text-gray-500">→ Request 1 starts</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-gray-400 w-16">User types</span>
            <span className="bg-violet-500/20 text-violet-300 rounded px-2">"react"</span>
            <span className="text-gray-500">→ Request 2 starts</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-16" />
            <span className="bg-violet-500/20 text-violet-300 rounded px-2">Request 2 resolves first</span>
            <span className="text-gray-500">→ Shows "react" results</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="w-16" />
            <span className="bg-red-500/20 text-red-300 rounded px-2">Request 1 resolves late</span>
            <span className="text-red-400">→ ❌ Overwrites with "re" results!</span>
          </div>
          <p className="text-green-400 mt-1">Fix: AbortController — cancel Request 1 when Request 2 starts.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
          <p className="text-amber-400 font-bold mb-1">Skeleton UI</p>
          <p className="text-gray-400">Show placeholder shapes that match the content layout while loading. Better UX than a spinner — reduces perceived load time.</p>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
          <p className="text-pink-400 font-bold mb-1">Optimistic Update</p>
          <p className="text-gray-400">Update the UI instantly as if the action succeeded. Roll back if the server rejects it. Feels instant; handles network latency gracefully.</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Race condition',     definition: 'When two async operations complete out of order, causing stale or incorrect data to overwrite fresh data. Common in search-as-you-type and rapid navigation.' },
    { term: 'Stale closure',      definition: 'A function that captured a variable from an older render. Inside useEffect, reading state without including it in deps reads the initial value forever.' },
    { term: 'AbortController',    definition: 'Web API to cancel in-flight fetch requests. Create one per effect, pass its signal to fetch, call .abort() in the cleanup function.' },
    { term: 'Optimistic update',  definition: 'Updating local UI state immediately (as if success), then correcting/rolling back if the server responds with an error. Creates perceived instant response.' },
    { term: 'Skeleton UI',        definition: 'Placeholder layout that matches the shape of the expected content. Shows while loading. Reduces layout shift and perceived wait time vs. a spinner.' },
    { term: 'Error boundary',     definition: 'A React class component that catches JavaScript errors in its child tree during render, lifecycle, or constructors. Shows fallback UI instead of a blank page.' },
    { term: 'Debounce',           definition: 'Delay executing a function until N ms have passed since the last invocation. Prevents firing a request on every keystroke in search inputs.' },
  ],

  code: {
    title: 'Race Condition Fix + Optimistic Update Pattern',
    language: 'jsx',
    snippet: `// ── Fix race condition with AbortController ─────────────────
function useSearch(query) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) { setResults([]); return; }

    const controller = new AbortController();

    fetch(\`/api/search?q=\${query}\`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => setResults(data))      // only runs if not aborted
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();       // cancel on next query change
  }, [query]);

  return results;
}

// ── Fix stale closure in useEffect ───────────────────────────
function Timer({ step }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // ✕ Stale: count is always 0 (captured at mount)
      // setCount(count + step);

      // ✓ Correct: functional update always has current value
      setCount(c => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [step]);   // only step in deps — count not needed with functional form

  return <p>{count}</p>;
}

// ── Optimistic update: like immediately ──────────────────────
function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [pending, setPending] = useState(false);

  const handleLike = async () => {
    setLikes(l => l + 1);                  // optimistic: update immediately
    setPending(true);
    try {
      await likePost(postId);              // confirm with server
    } catch {
      setLikes(l => l - 1);               // rollback on failure
    } finally {
      setPending(false);
    }
  };

  return <button onClick={handleLike} disabled={pending}>{likes} ❤</button>;
}`,
    explanation: 'The functional setState form (c => c + step) is the standard fix for stale closures in intervals — it receives the actual current value, not the captured snapshot from render time.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">These bugs only appear under real-world conditions.</strong>{' '}
        Race conditions require slow networks or rapid user interaction. Stale closures appear
        with complex timing. This is why senior engineers with production experience catch
        them and junior engineers don't.
      </p>
      <p>
        Optimistic updates transform the perceived performance of write-heavy UIs. GitHub's
        star button, Twitter's like, Notion's drag-to-reorder — all optimistic. The user
        never waits for the server; the UI is always instant.
      </p>
      <p>
        Error boundaries are essential for production: without them, a JavaScript error in
        one component unmounts the entire React tree, giving the user a blank page. With them,
        only the affected subtree shows an error fallback — everything else keeps working.
      </p>
    </>
  ),

  commonMistakes: [
    'Not cancelling fetches in useEffect cleanup — leaving orphaned requests that update state after unmount. Always return () => controller.abort().',
    'Using state directly in setInterval callbacks — always use functional setState (prev => prev + 1) in timers to avoid stale closure bugs.',
    'No rollback logic in optimistic updates — if the server rejects the action, the UI shows incorrect data permanently.',
    'Using a spinner for every loading state — skeleton UIs significantly improve perceived performance and should be preferred for content-heavy layouts.',
    'No error boundaries in production — one unhandled render error unmounts the entire app. Add at route level at minimum.',
  ],

  summary: [
    'Race condition: later request resolves first, overwriting fresh data. Fix: AbortController in cleanup.',
    'Stale closure: useEffect captures state at render time. Fix: functional setState (prev => ...) or include in deps.',
    'Debounce search inputs + cancel previous requests to prevent excessive API calls.',
    'Optimistic update: update UI immediately, roll back on error. Creates perceived instant response.',
    'Skeleton UI: shaped placeholders during load. Better than spinners for content-heavy UIs.',
    'Error boundary: catches render errors in a subtree, shows fallback. Required for production React apps.',
  ],

  practice: [
    {
      type: 'question',
      text: 'Explain the race condition problem in a search-as-you-type feature and describe the fix.',
      hint: 'User types fast → multiple requests in-flight. If request 1 (older query) resolves after request 2 (newer query), the stale results overwrite fresh ones. Fix: cancel request 1 when request 2 starts, via AbortController in the useEffect cleanup function.',
    },
    {
      type: 'question',
      text: 'What is a stale closure in useEffect, and how does functional setState solve it?',
      hint: 'The effect captures the value of count at the time it runs. If count later changes, the closure still sees the old value. Functional setState (setCount(c => c + 1)) receives the actual current state from React — bypasses the stale closure entirely.',
    },
    {
      type: 'question',
      text: 'What is an optimistic update and what must you implement to make it safe?',
      hint: 'Update the UI immediately (assume success), then call the API. If the API fails, roll back the UI to its pre-update state. Must have a catch block that reverses the optimistic change, and ideally a disabled state during the in-flight request to prevent double-clicking.',
    },
    {
      type: 'task',
      text: 'Build a debounced search component: input delays API call by 300ms, cancels previous request on new keystroke, shows skeleton while loading. Handle both the race condition and stale state.',
      hint: 'useDebounce(query, 300) → debouncedQuery in useEffect deps. AbortController inside effect → abort in cleanup. Skeleton: array of div elements with animate-pulse class while isLoading.',
    },
  ],
}

export default function AdvancedStateProblemsPage() {
  return <FEDFTopicPage content={content} />
}
