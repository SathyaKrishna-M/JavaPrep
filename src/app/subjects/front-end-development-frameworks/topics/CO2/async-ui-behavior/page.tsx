'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Async & UI Behavior',
  subtitle: 'Event loop, Promises, async/await, and handling async state in React',
  co: 'CO2 — JavaScript Foundations',

  overview: (
    <>
      <p>
        JavaScript is <strong className="text-white">single-threaded</strong> — one call stack, one thing at a time.
        Yet it handles network requests, timers, and user input without freezing. This is possible through the{' '}
        <strong className="text-white">event loop</strong>: async callbacks queue up and run when the call stack empties.
        Promise callbacks go into the high-priority <em>microtask queue</em>; setTimeout/DOM events go into the
        lower-priority <em>task queue</em>.
      </p>
      <p>
        <strong className="text-white">async/await</strong> is syntactic sugar over Promises that makes asynchronous
        code read like synchronous code. Under the hood, <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">await</code> suspends
        the function and schedules a microtask for resumption — without blocking the call stack.
      </p>
      <p>
        Every async operation in React — data fetching, form submission, polling — must be modeled with three states:{' '}
        <strong className="text-white">loading</strong>, <strong className="text-white">success</strong>, and{' '}
        <strong className="text-white">error</strong>. Omitting any of these leaves users with a frozen or confusing UI.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Event Loop Architecture</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-1">Call Stack</p>
            <p className="text-gray-400">Synchronous code. LIFO. If blocked, UI freezes.</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
            <p className="text-amber-300 font-bold mb-1">Microtask Queue</p>
            <p className="text-gray-400">Promises (.then, await). Drained FULLY before next task.</p>
          </div>
          <div className="bg-violet-500/10 border border-violet-500/30 rounded p-3">
            <p className="text-violet-300 font-bold mb-1">Task Queue</p>
            <p className="text-gray-400">setTimeout, DOM events. One per loop iteration.</p>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-2 text-center">Priority: Call Stack → Microtasks (all) → One Task → Repaint → Next iteration</p>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-red-400 font-semibold mb-2">Async State — Three States Always Required</p>
        <div className="grid grid-cols-3 gap-2 text-center text-gray-400">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2"><p className="text-amber-300 font-bold">Loading</p><p>Spinner/skeleton. Disable actions.</p></div>
          <div className="bg-green-500/10 border border-green-500/30 rounded p-2"><p className="text-green-300 font-bold">Success</p><p>Render data. Cache result.</p></div>
          <div className="bg-red-500/10 border border-red-500/30 rounded p-2"><p className="text-red-300 font-bold">Error</p><p>Meaningful message. Offer retry.</p></div>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Event loop', definition: 'JavaScript\'s concurrency mechanism. When the call stack is empty, the event loop picks the next item from a queue and pushes it onto the stack. This is how async callbacks run without blocking.' },
    { term: 'Microtask queue', definition: 'High-priority queue for Promise callbacks (.then, .catch, async/await continuations). Drained completely before the next task runs. This means a chain of .then() callbacks runs before any setTimeout callback.' },
    { term: 'Task queue (macrotask)', definition: 'Lower-priority queue for setTimeout, setInterval, DOM events, and I/O callbacks. One task per event loop iteration — allowing the browser to repaint between tasks.' },
    { term: 'Promise', definition: 'An object representing an eventual value. Three states: pending → fulfilled (with value) or rejected (with reason). Chainable with .then() and .catch(). The foundation of async/await.' },
    { term: 'async/await', definition: 'Syntactic sugar over Promises. async marks a function as returning a Promise. await suspends the function at that point and schedules a microtask to resume when the Promise resolves — without blocking the call stack.' },
    { term: 'Race condition (async)', definition: 'When a userId changes rapidly and two fetch calls are in-flight, the slower earlier response can arrive after the faster later one, overwriting correct data with stale data. Fix: use an AbortController or a cleanup flag.' },
    { term: 'Abort controller', definition: 'Browser API for cancelling fetch requests. Pass signal to fetch(); call controller.abort() in useEffect cleanup. Prevents state updates on unmounted components and eliminates race conditions from rapid prop changes.' },
  ],

  code: {
    title: 'Data Fetching in React — Async State with Race Condition Fix',
    language: 'javascript',
    snippet: `import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    // AbortController prevents stale responses from overwriting fresh data
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    async function fetchUser() {
      try {
        const res = await fetch(\`/api/users/\${userId}\`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        const data = await res.json()
        setUser(data)
      } catch (err) {
        // AbortError is not a real error — ignore it
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Cleanup: abort in-flight request when userId changes or component unmounts
    return () => controller.abort()
  }, [userId])

  if (loading) return <p>Loading…</p>
  if (error)   return <p className="text-red-400">Error: {error} <button onClick={retry}>Retry</button></p>
  return <h1>{user.name}</h1>
}

// Promise execution order insight:
console.log('1 — sync')
Promise.resolve().then(() => console.log('3 — microtask'))
setTimeout(() => console.log('4 — task'), 0)
console.log('2 — sync')
// Output order: 1, 2, 3, 4`,
    explanation: 'AbortController cancels the in-flight fetch when userId changes rapidly — preventing the classic race condition where an older slow response arrives after a newer fast one. The cleanup function returned from useEffect is called before each new effect run and on unmount.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Async bugs are among the hardest to debug in React.</strong>{' '}
        "setState called on unmounted component" warnings, stale data appearing briefly, or loading spinners
        that never disappear — all trace back to mismanaged async state. Understanding the event loop tells
        you exactly when your callbacks run and why order matters.
      </p>
      <p>
        React Query and SWR exist because the naive useEffect + useState pattern has so many edge cases:
        no caching, no deduplication, race conditions, no background refetch. Understanding why these problems
        exist (event loop + async lifecycle) makes it clear why dedicated data-fetching libraries are essential
        for production React apps.
      </p>
    </>
  ),

  commonMistakes: [
    'Not modeling loading and error states — calling setUser(data) but never handling the case where fetch throws. Users see a blank screen or an unhandled runtime error.',
    'Race condition from rapid prop changes — userId changes from 1 to 2 quickly; both fetches are in-flight; the slower /users/1 response arrives last and overwrites correct /users/2 data. Fix with AbortController.',
    'Calling setState after unmount — component unmounts while fetch is in-flight; response arrives and calls setUser → "Can\'t perform a React state update on an unmounted component". Fix: AbortController or a mounted flag.',
    'Forgetting that async/await doesn\'t block — code after an await continues on the microtask queue, not immediately. UI stays responsive because the call stack is not blocked.',
  ],

  summary: [
    'Event loop: Call stack → Microtasks (all Promise .then callbacks, fully drained) → One task (setTimeout) → Repaint.',
    'async/await: sugar over Promises. await suspends function, schedules microtask for resumption. Call stack not blocked.',
    'Three async states in React: loading, success, error. Always handle all three.',
    'Race condition: rapid prop changes cause stale responses to overwrite fresh data. Fix: AbortController in useEffect cleanup.',
    'useEffect cleanup: return () => controller.abort() — runs before next effect and on unmount.',
    'Production pattern: React Query/SWR handles caching, deduplication, background refetch — built on these same primitives.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the JavaScript event loop? Explain the difference between the microtask queue and the task queue with an example.',
      hint: 'Event loop: when call stack is empty, pulls next item from a queue. Microtask queue (high priority): Promise .then/await callbacks. Drained completely before next task. Task queue (low priority): setTimeout, DOM events. One per iteration. Example: console.log("1"); Promise.resolve().then(() => console.log("3")); setTimeout(() => console.log("4"), 0); console.log("2"); Output: 1, 2, 3, 4. Sync runs first (1,2), then microtask (3), then task (4) — even though setTimeout(fn, 0) appears to fire immediately.',
    },
    {
      type: 'question',
      text: 'What is a race condition in React data fetching and how do you fix it?',
      hint: 'Race condition: userId prop changes from 1 to 2 quickly. Two fetches are in-flight simultaneously (/users/1 and /users/2). If /users/1 resolves last (slower network), setUser is called with stale data for user 1 — even though userId is now 2. Fix: AbortController. Create it in useEffect, pass signal to fetch. In cleanup function (returned from useEffect), call controller.abort(). On userId change, React runs cleanup → aborts old fetch → starts new fetch. AbortError is caught and ignored.',
    },
    {
      type: 'question',
      text: 'Explain async/await. Does it block the call stack? What queue do continuations run in?',
      hint: 'async/await is syntactic sugar over Promises. async marks a function as returning a Promise. await SUSPENDS the async function at that point — it does NOT block the call stack. The JavaScript engine puts the function aside and continues executing the rest of the synchronous code. When the awaited Promise resolves, the continuation (code after await) is queued as a MICROTASK and runs when the call stack is empty. This is why JS can handle async I/O without freezing the UI — the call stack is never blocked.',
    },
    {
      type: 'task',
      text: 'Write a useEffect that fetches data from /api/posts when a `postId` prop changes. Handle loading, error, and success states. Prevent race conditions and state updates after unmount.',
      hint: 'const [post, setPost] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState(null); useEffect(() => { const ctrl = new AbortController(); setLoading(true); setError(null); fetch(`/api/posts/${postId}`, { signal: ctrl.signal }).then(r => r.json()).then(data => { setPost(data); setLoading(false); }).catch(err => { if (err.name !== "AbortError") { setError(err.message); setLoading(false); } }); return () => ctrl.abort(); }, [postId]);',
    },
  ],
}

export default function AsyncUIBehaviorPage() {
  return <FEDFTopicPage content={content} />
}
