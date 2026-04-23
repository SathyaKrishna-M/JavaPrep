'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Routing Systems',
  subtitle: 'SPA vs MPA, React Router, dynamic routes, protected routes, and Next.js file-based routing',
  co: 'CO5 — Advanced React Patterns',

  overview: (
    <>
      <p>
        A <strong className="text-white">Single-Page Application (SPA)</strong> loads one HTML shell once.
        All subsequent "page" changes are handled in JavaScript — the router intercepts link clicks, prevents
        the default browser navigation, updates the URL using the{' '}
        <strong className="text-white">History API</strong>{' '}
        (<code className="text-green-300 bg-slate-800 px-1 rounded text-xs">history.pushState</code>), and renders
        the matching React component. No server round-trip, no full page reload, no flash.
      </p>
      <p>
        <strong className="text-white">React Router v6</strong> is the dominant client-side routing solution.
        Routes are declared with <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">{'<Route path="/..." element={<Component />} />'}</code>.
        Dynamic segments (<code className="text-green-300 bg-slate-800 px-1 rounded text-xs">/users/:id</code>) are
        accessed via <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">useParams()</code>.
        Navigation uses <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">{'<Link>'}</code> (not {`<a>`}) and the <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">useNavigate()</code> hook.
      </p>
      <p>
        <strong className="text-white">Next.js</strong> uses file-based routing: files in{' '}
        <code className="text-green-300 bg-slate-800 px-1 rounded text-xs">app/</code> automatically become routes.
        Dynamic segments use bracket notation (<code className="text-green-300 bg-slate-800 px-1 rounded text-xs">app/users/[id]/page.tsx</code>).
        Layout files (<code className="text-green-300 bg-slate-800 px-1 rounded text-xs">layout.tsx</code>) wrap all child routes — eliminating manual layout composition.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">SPA vs MPA</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            { label: 'SPA (React Router)', items: ['Instant navigation (no server round-trip)', 'Heavy initial JS bundle', 'URL update: pushState', 'Requires server catch-all for direct URLs', 'Client state preserved across routes'], color: 'blue' },
            { label: 'MPA (Traditional)', items: ['Full page reload on every navigation', 'Smaller per-page payload', 'URL update: HTTP request', 'Works with any static server', 'State lost on every navigation'], color: 'amber' },
          ].map(({ label, items, color }) => (
            <div key={label} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-3`}>
              <p className={`text-${color}-300 font-bold mb-2`}>{label}</p>
              <ul className="text-gray-400 space-y-1">{items.map(i => <li key={i}>• {i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">React Router v6 Hooks</p>
        <div className="space-y-1 font-mono text-gray-400">
          <p><span className="text-cyan-300">useParams()</span> — {'{ id }'} from /users/:id</p>
          <p><span className="text-cyan-300">useNavigate()</span> — navigate("/path") programmatic navigation</p>
          <p><span className="text-cyan-300">useSearchParams()</span> — read/write URL query string</p>
          <p><span className="text-cyan-300">useLocation()</span> — current pathname, search, state</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'History API', definition: 'Browser API for changing the URL without a page reload. history.pushState(state, title, url) updates the address bar and adds an entry to the browser history. history.back()/forward() work as expected. React Router wraps this.' },
    { term: 'Hash routing', definition: 'URL hash (#/users/42) changes without any server request — the server never sees it. Works with any static file server. Drawback: ugly URLs. History routing requires server-side catch-all (serve index.html for all routes).' },
    { term: 'Dynamic route', definition: ':param syntax in React Router (/users/:id). useParams() returns { id } inside the matched component. Next.js equivalent: [id]/page.tsx folder → params.id.' },
    { term: 'Nested routes', definition: 'Routes inside other routes — child routes render inside the parent\'s <Outlet /> component. Enables shared layouts: a /dashboard layout wrapping /dashboard/users and /dashboard/settings.' },
    { term: 'Protected route', definition: 'A wrapper component that checks authentication before rendering the protected content. If unauthenticated, redirects to /login using <Navigate replace to="/login" />.' },
    { term: 'Lazy loading routes', definition: 'Code-split routes with React.lazy + Suspense: const UserPage = lazy(() => import("./UserPage")). The JS bundle for that route is loaded on first navigation to it, not on initial app load.' },
    { term: 'Next.js file routing', definition: 'Every file in app/ that exports a default component becomes a route. app/page.tsx → /. app/users/[id]/page.tsx → /users/:id. layout.tsx wraps all child routes. loading.tsx / error.tsx are built-in async states.' },
  ],

  code: {
    title: 'React Router v6 — Full Routing Setup with Protected Routes',
    language: 'javascript',
    snippet: `import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, Link, useParams, useNavigate } from 'react-router-dom'

// Code-split routes — loaded only when first visited
const Home      = lazy(() => import('./pages/Home'))
const UserList  = lazy(() => import('./pages/UserList'))
const UserDetail = lazy(() => import('./pages/UserDetail'))
const Login     = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

// Protected route — redirects to /login if not authenticated
function ProtectedRoute({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

// Shared layout with navigation
function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <main>
        <Outlet />  {/* child routes render here */}
      </main>
    </div>
  )
}

function App({ isAuthenticated }) {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page…</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="login" element={<Login />} />

            {/* Protected routes — all children require auth */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

// In UserDetail — read dynamic segment
function UserDetail() {
  const { id } = useParams()          // /users/42 → id = "42"
  const navigate = useNavigate()
  return (
    <div>
      <h1>User {id}</h1>
      <button onClick={() => navigate('/users')}>Back to Users</button>
    </div>
  )
}`,
    explanation: 'ProtectedRoute uses Outlet — if authenticated, it renders child routes; if not, it redirects. Lazy-loaded routes are split at the bundle level — the UserDetail bundle is only fetched when a user first navigates to /users/:id. Suspense provides a fallback during the load.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Routing is the backbone of any multi-page React application.</strong>{' '}
        Every feature — authentication guards, deep linking, back-button behaviour, code splitting — is implemented
        at the routing layer. Getting routing wrong (using regular {`<a>`} tags instead of {`<Link>`}, not handling
        direct URL access, not code-splitting routes) creates fundamental UX and performance problems.
      </p>
      <p>
        Next.js's file-based routing with layouts eliminates entire categories of routing boilerplate. loading.tsx
        and error.tsx files are built-in conventions for the async state pattern — no manual if (isLoading) return
        needed. Understanding the difference between React Router (client) and Next.js routing (full-stack) is
        essential for framework selection.
      </p>
    </>
  ),

  commonMistakes: [
    'Using <a href="..."> instead of <Link to="..."> — regular anchor tags trigger a full page reload, destroying React state and causing a network round-trip. Link prevents this.',
    'Not handling direct URL access with History routing — BrowserRouter requires the server to serve index.html for all paths (a catch-all). Without it, /users/42 returns 404 on page refresh.',
    'Loading all routes eagerly — importing all page components at the top of App.tsx bundles all page code into the initial JS bundle. Use React.lazy() to code-split by route.',
    'Nesting routes without <Outlet /> — child routes won\'t render if the parent component doesn\'t include <Outlet /> where children should appear.',
  ],

  summary: [
    'SPA routing: JavaScript intercepts link clicks, updates URL via pushState, renders matching component. No page reload.',
    'BrowserRouter vs HashRouter: BrowserRouter needs server catch-all; HashRouter works everywhere but has # in URL.',
    'Dynamic segments: /users/:id. Read with useParams() → { id }.',
    'Nested routes: parent renders <Outlet /> where children should appear. Shared layouts via nesting.',
    'Protected route: wrapper that checks auth; renders <Outlet /> if authenticated, <Navigate to="/login" /> if not.',
    'Code splitting: React.lazy() + Suspense — each route\'s bundle is fetched on first navigation, not on app load.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the difference between BrowserRouter and HashRouter? When would you use each?',
      hint: 'BrowserRouter: uses History API (pushState). URLs look clean: /users/42. Problem: the server must serve index.html for ALL routes — if someone visits /users/42 directly, the server must return the SPA, not a 404. Requires a catch-all server route. HashRouter: uses URL hash (#/users/42). The # and everything after it is never sent to the server — so any static file server works without configuration. URLs look ugly. Use BrowserRouter for production apps with a configurable server; HashRouter for GitHub Pages, simple static hosts, or electron apps.',
    },
    {
      type: 'question',
      text: 'How do you implement a protected route in React Router v6? Explain the pattern.',
      hint: 'Create a component that uses useContext (or takes isAuthenticated prop). If authenticated: return <Outlet /> — renders the child routes. If not: return <Navigate to="/login" replace />. Replace prevents the protected route from being in browser history. Wrap protected routes: <Route element={<ProtectedRoute />}><Route path="dashboard" element={<Dashboard />} /></Route>. The Outlet approach means you can nest any number of protected routes under one guard.',
    },
    {
      type: 'question',
      text: 'What is route-based code splitting and how does React.lazy() enable it?',
      hint: 'By default, Webpack/Vite bundle all imported modules together. For a 20-page app, all 20 page components are downloaded on first load — even if the user only visits the homepage. React.lazy(() => import("./PageComponent")) creates a dynamic import — a separate bundle chunk. The chunk is only downloaded when React first renders that component. Wrapped in Suspense with a fallback, the user sees the fallback (spinner) while the page bundle loads. Result: initial bundle is tiny; only the pages visited are downloaded.',
    },
    {
      type: 'task',
      text: 'Set up a React Router app with routes: / (Home), /products (ProductList), /products/:id (ProductDetail). Add a 404 fallback. Access the :id param in ProductDetail and display it.',
      hint: '<BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/products" element={<ProductList />} /><Route path="/products/:id" element={<ProductDetail />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></BrowserRouter>. In ProductDetail: const { id } = useParams(); return <h1>Product {id}</h1>. Navigate between routes with <Link to="/products">Back</Link> — never <a href>.',
    },
  ],
}

export default function RoutingSystemsPage() {
  return <FEDFTopicPage content={content} />
}
