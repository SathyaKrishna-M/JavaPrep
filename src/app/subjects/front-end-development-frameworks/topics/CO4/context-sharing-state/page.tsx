'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Context & Sharing State',
  subtitle: 'Solving prop drilling with React Context, when to use it, and its performance implications',
  co: 'CO4 — State Management',

  overview: (
    <>
      <p>
        <strong className="text-white">Prop drilling</strong> occurs when you pass props through intermediate
        components that do not use them — just to reach a deeply nested child. Each intermediate component must
        declare the prop in its signature; any shape change requires touching every layer. This creates unnecessary
        coupling and maintenance burden.
      </p>
      <p>
        <strong className="text-white">React Context</strong> creates a broadcast channel for data. A{' '}
        <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">Provider</code> makes a value available
        to all descendants. Any descendant reads it with{' '}
        <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">useContext</code> — skipping all
        intermediate layers. The three steps: (1) createContext, (2) wrap with Provider, (3) useContext to consume.
      </p>
      <p>
        <strong className="text-white">Context is not a general-purpose state manager.</strong>{' '}
        Every consumer re-renders when the context value changes — even if they only use one property from a large
        object. For frequently-changing values (form fields, scroll position), split contexts or use a dedicated
        library like Zustand or Redux Toolkit.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Prop Drilling vs Context</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
            <p className="text-red-400 font-bold mb-2">Prop Drilling (4 levels)</p>
            <div className="font-mono text-gray-400 space-y-0.5">
              <p className="text-white">{'<App user={user}>'}</p>
              <p className="pl-3 text-amber-300">{'<Layout user={user}> ← unused'}</p>
              <p className="pl-6 text-amber-300">{'<Sidebar user={user}> ← unused'}</p>
              <p className="pl-9 text-green-300">{'<Avatar user={user} />'}</p>
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
            <p className="text-green-400 font-bold mb-2">Context (skip layers)</p>
            <div className="font-mono text-gray-400 space-y-0.5">
              <p className="text-white">{'<UserProvider user={user}>'}</p>
              <p className="pl-3">{'<Layout>    ← no user prop!'}</p>
              <p className="pl-6">{'<Sidebar>   ← no user prop!'}</p>
              <p className="pl-9 text-green-300">{'<Avatar />  ← useContext()'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">When to Use Context</p>
        <div className="space-y-1 text-gray-400">
          <p><span className="text-green-300">✓ Good fit</span> — auth user, theme, locale, feature flags (rarely changes)</p>
          <p><span className="text-red-300">✗ Bad fit</span> — form field values, filter state, scroll position (changes often → re-renders all consumers)</p>
          <p><span className="text-blue-300">Better alternatives</span> — Zustand, Redux Toolkit, Jotai for frequently-updated shared state</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Prop drilling', definition: 'Passing props through intermediate components that don\'t use them, just to reach a deeply nested child. Creates unnecessary coupling — every intermediate must declare the prop.' },
    { term: 'React Context', definition: 'A broadcast mechanism. createContext() creates a context object. Provider wraps a subtree and supplies a value. useContext(MyContext) reads that value in any descendant — no intermediate passing needed.' },
    { term: 'Context re-renders', definition: 'Every component that calls useContext(Ctx) re-renders when the Ctx value changes — even if it only uses one field of a large object. This is the key performance caveat of Context.' },
    { term: 'Context splitting', definition: 'Split a large context into multiple smaller contexts by concern (UserContext, ThemeContext, CartContext). Consumers only subscribe to the contexts they need, reducing unnecessary re-renders.' },
    { term: 'Custom hook pattern', definition: 'Wrap useContext in a custom hook: function useUser() { const ctx = useContext(UserContext); if (!ctx) throw new Error("Must be inside UserProvider"); return ctx; }. Provides better error messages and encapsulates context logic.' },
    { term: 'Provider composition', definition: 'Nest multiple providers to supply multiple contexts: <ThemeProvider><AuthProvider><CartProvider>...</CartProvider></AuthProvider></ThemeProvider>. Extract to a single <AppProviders> component to avoid nesting.' },
    { term: 'Zustand / Redux', definition: 'External state managers for frequently-updated shared state. Unlike Context, they use subscriptions — components only re-render when the specific slice they subscribed to changes, not on any value change.' },
  ],

  code: {
    title: 'Auth Context — Create, Provide, Consume',
    language: 'javascript',
    snippet: `import { createContext, useContext, useState, useCallback } from 'react'

// 1. Create context (null as default — will be overridden by Provider)
const AuthContext = createContext(null)

// 2. Provider component — owns the state, provides it to all descendants
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = useCallback(async (credentials) => {
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify(credentials) })
    const data = await res.json()
    setUser(data.user)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    fetch('/api/logout', { method: 'POST' })
  }, [])

  // Stable value object — only changes when user changes
  const value = { user, login, logout, isAuthenticated: !!user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 3. Custom hook — encapsulates useContext + error boundary
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

// 4. Consume anywhere in the tree — no prop drilling
function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  return (
    <nav>
      {isAuthenticated ? (
        <><span>Welcome, {user.name}</span><button onClick={logout}>Logout</button></>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  )
}

// Usage: wrap app once
// <AuthProvider><App /></AuthProvider>`,
    explanation: 'useCallback on login/logout prevents new function references on every render — important because functions in context values trigger re-renders in all consumers. The custom useAuth hook provides a better error message when used outside the Provider than a raw null check.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Context is the standard solution for cross-cutting concerns</strong>{' '}
        like authentication, theming, and internationalisation. Every major React app uses it for these. But it is
        also frequently misused — developers reach for Context for any shared state, then wonder why their app
        feels sluggish. Knowing when to use Context vs when to use Zustand/Redux is a senior-level skill.
      </p>
      <p>
        The mental model: Context is a wormhole — it skips levels of the component tree. It is not a store,
        not a cache, not a reactive system. Values passed through Context are just props that don't need explicit
        forwarding. For anything that changes frequently, use a subscription-based solution.
      </p>
    </>
  ),

  commonMistakes: [
    'Putting frequently-changing values in Context — every consumer re-renders on any value change. Form field values, filter state, and animation values should not be in Context.',
    'Not memoizing the context value — if the Provider renders and creates a new object {} each time, all consumers re-render even when the underlying data didn\'t change. Wrap the value object in useMemo.',
    'One giant context object — ThemeContext containing user + cart + settings means a cart change re-renders the user avatar. Split into focused, single-concern contexts.',
    'Skipping the custom hook wrapper — calling useContext(MyContext) directly in components gives confusing errors if the Provider is missing. Wrap in a custom hook with a helpful throw.',
  ],

  summary: [
    'Prop drilling: intermediate components declare props they don\'t use just to pass them down.',
    'Context: createContext → Provider (supplies value) → useContext (reads value in any descendant).',
    'All consumers re-render on ANY context value change — even if they use only one field.',
    'Split contexts by concern: UserContext, ThemeContext, CartContext — consumers subscribe only to what they need.',
    'Good fit: auth user, theme, locale (rarely changes). Bad fit: form values, scroll position (changes often).',
    'Use Zustand/Redux for frequently-updated shared state — subscription-based, only re-renders subscribers of changed slice.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is prop drilling and why is it a problem at scale?',
      hint: 'Prop drilling: passing data through intermediate components that don\'t use it. Problems at scale: (1) Coupling — Layout, Sidebar, Nav must all declare a user prop they never render; if user shape changes, update all 4 files. (2) Rename propagation — renaming a prop touches every layer. (3) Readability — component signatures are cluttered with props they just forward. (4) Testing — you must provide the prop at every level even in tests for components that don\'t use it.',
    },
    {
      type: 'question',
      text: 'Why should you NOT put frequently changing state (like form field values) in React Context?',
      hint: 'Every component that calls useContext(Ctx) re-renders when the context value changes — regardless of which part of the value changed. If AuthContext contains { user, theme, cartItems } and cartItems updates on every add-to-cart, the Avatar (which only uses user) also re-renders. For frequently-changing values, use Zustand or Jotai which are subscription-based: each component subscribes to exactly the slice it needs, and only re-renders when that slice changes.',
    },
    {
      type: 'question',
      text: 'What is the custom hook pattern for Context and why is it recommended?',
      hint: 'Instead of calling useContext(AuthContext) directly in components, create: function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error("useAuth must be inside <AuthProvider>"); return ctx; }. Benefits: (1) Better error message — without the check, you get cryptic "Cannot destructure property \'user\' of null" instead of a clear message. (2) Encapsulation — the context object is an implementation detail; the custom hook is the public API. (3) Single import — components import useAuth, not AuthContext.',
    },
    {
      type: 'task',
      text: 'Create a ThemeContext with values "light" and "dark". Provide it at the App level. Consume it in a Button component that applies different CSS classes based on theme. Include a toggle button.',
      hint: 'const ThemeContext = createContext("light"); function ThemeProvider({ children }) { const [theme, setTheme] = useState("light"); const toggle = () => setTheme(t => t === "light" ? "dark" : "light"); return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>; } function useTheme() { return useContext(ThemeContext); } function Button({ children }) { const { theme } = useTheme(); return <button className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}>{children}</button>; }',
    },
  ],
}

export default function ContextSharingStatePage() {
  return <FEDFTopicPage content={content} />
}
