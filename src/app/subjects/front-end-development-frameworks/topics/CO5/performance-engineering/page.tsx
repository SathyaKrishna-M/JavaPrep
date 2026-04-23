'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Performance Engineering',
  subtitle: 'Memoization, lazy loading, and render optimization in React',
  co: 'CO5 — Routing, Forms & Performance',

  overview: (
    <>
      <p>
        Performance engineering in React is about knowing when to optimize — and when not to.
        The default React rendering behavior is fast enough for most applications. Premature
        optimization adds complexity without benefit. The process is: measure first, identify
        the bottleneck, apply the right tool.
      </p>
      <p>
        Three categories of performance tools:{' '}
        <strong className="text-white">render optimization</strong> (React.memo, useMemo,
        useCallback — avoid re-computing or re-rendering when nothing changed),{' '}
        <strong className="text-white">code splitting</strong> (lazy loading — ship only
        the code needed for the current page), and{' '}
        <strong className="text-white">list virtualization</strong> (render only the visible
        items in a long list, not all 10,000).
      </p>
      <p>
        <strong className="text-white">Core Web Vitals</strong> — LCP, CLS, INP — are Google's
        metrics for user-perceived performance. They directly affect SEO ranking and are
        measurable in Lighthouse, PageSpeed Insights, and Chrome DevTools.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Real-world analogy: React re-renders are like a kitchen staff redoing their mise en
        place on every order. Memoization is like pre-prepping ingredients that rarely change.
        Lazy loading is like not stocking ingredients for a dish that's rarely ordered.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">Core Web Vitals</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          {[
            { metric: 'LCP', full: 'Largest Contentful Paint', target: '< 2.5s', desc: 'How fast the main content loads', color: 'green' },
            { metric: 'CLS', full: 'Cumulative Layout Shift', target: '< 0.1', desc: 'How much the page jumps around', color: 'blue' },
            { metric: 'INP', full: 'Interaction to Next Paint', target: '< 200ms', desc: 'How fast interactions respond', color: 'violet' },
          ].map(({ metric, full, target, desc, color }) => (
            <div key={metric} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-2`}>
              <p className={`font-bold text-${color}-300 text-base`}>{metric}</p>
              <p className="text-gray-400 text-[10px]">{full}</p>
              <p className={`text-${color}-300 font-mono mt-1`}>{target}</p>
              <p className="text-gray-500 text-[10px] mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Optimization Tools: When to Use Each</p>
        <div className="space-y-1.5">
          {[
            { tool: 'React.memo',    when: 'Component re-renders with same props when parent re-renders' },
            { tool: 'useMemo',       when: 'Expensive calculation (sorting, filtering) runs on every render' },
            { tool: 'useCallback',   when: 'A function is passed as prop to a memoized child component' },
            { tool: 'lazy()',        when: 'Route/component is rarely visited — skip it from initial bundle' },
            { tool: 'Virtualization', when: 'Rendering 100+ items causes visible scroll lag' },
          ].map(({ tool, when }) => (
            <div key={tool} className="flex gap-3">
              <code className="text-pink-300 shrink-0 w-28">{tool}</code>
              <span className="text-gray-400">{when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'React.memo',       definition: 'Wraps a component to memoize its output. Only re-renders if props change (shallow comparison). Optimization — profile before applying.' },
    { term: 'useMemo',          definition: 'Memoizes a computed value: const sorted = useMemo(() => [...items].sort(...), [items]). Recomputes only when deps change.' },
    { term: 'useCallback',      definition: 'Returns a memoized function reference. Needed when passing callbacks as props to React.memo components — prevents props from changing on every parent render.' },
    { term: 'Code splitting',   definition: 'Breaking the JavaScript bundle into chunks loaded on demand. React.lazy() + Suspense enables component-level splitting. Reduces initial bundle size.' },
    { term: 'React.lazy',       definition: 'const Dashboard = lazy(() => import(\'./Dashboard\')). Dashboard\'s code is only downloaded when the component is first rendered.' },
    { term: 'Virtualization',   definition: 'Render only visible list items (e.g., 20 items in a window of 10,000). Libraries: react-virtual, react-window. Eliminates "1000 DOM nodes" slowdown.' },
    { term: 'Core Web Vitals',  definition: 'Google\'s metrics: LCP (loads fast), CLS (no layout shift), INP (responds to interaction fast). Affect SEO. Measurable with Lighthouse.' },
  ],

  code: {
    title: 'Code Splitting + Memoization Patterns',
    language: 'jsx',
    snippet: `import { lazy, Suspense, memo, useMemo, useCallback } from 'react';

// ── Code splitting: only load Dashboard when navigating to it ─
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings  = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<PageSkeleton />}>   {/* show while loading */}
        <Routes>
          <Route path="/" element={<Home />} />           {/* always loaded */}
          <Route path="/dashboard" element={<Dashboard />} />  {/* lazy */}
          <Route path="/settings"  element={<Settings />} />   {/* lazy */}
        </Routes>
      </Suspense>
    </Router>
  );
}

// ── useMemo: expensive sort runs only when data changes ───────
function SortedProductList({ products, sortField }) {
  const sorted = useMemo(
    () => [...products].sort((a, b) => a[sortField] > b[sortField] ? 1 : -1),
    [products, sortField]   // only resort when these change
  );

  return sorted.map(p => <ProductCard key={p.id} product={p} />);
}

// ── useCallback + React.memo: prevent child re-renders ────────
function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['a', 'b', 'c']);

  // Without useCallback: new function reference on every render → Child re-renders
  // With useCallback: same reference → Child skips re-render
  const handleDelete = useCallback((item) => {
    setItems(prev => prev.filter(i => i !== item));
  }, []);  // stable — setItems from useState is guaranteed stable

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ItemList items={items} onDelete={handleDelete} />
    </>
  );
}

const ItemList = memo(function ItemList({ items, onDelete }) {
  // Only re-renders when items or onDelete change
  return items.map(item => (
    <button key={item} onClick={() => onDelete(item)}>{item}</button>
  ));
});`,
    explanation: 'Without useCallback, handleDelete is a new function reference on every Parent render (even when count changes). That defeats React.memo on ItemList — it sees a new onDelete prop and re-renders anyway.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Performance is a feature.</strong>{' '}
        Google research shows a 100ms delay in page load reduces conversion rates by 7%.
        Mobile users on slow networks are disproportionately affected. Core Web Vitals directly
        affect Google search ranking — a slow app ranks lower than a fast competitor.
      </p>
      <p>
        Code splitting is one of the highest-ROI optimizations: splitting by route typically
        reduces initial bundle size by 40-60%. Users on the Home page don't need to download
        the Dashboard code until they navigate there. This is automatic in Next.js (per-page
        splitting) but requires manual setup in Vite/CRA.
      </p>
      <p>
        Virtualization is essential for data-heavy UIs: admin dashboards, data grids, infinite
        scroll feeds. Without it, rendering 10,000 list items creates 10,000 DOM nodes —
        scrolling becomes janky and memory usage balloons.
      </p>
    </>
  ),

  commonMistakes: [
    'Wrapping everything in React.memo/useMemo/useCallback without profiling — adds comparison overhead without benefit. Measure first.',
    'Forgetting that useMemo and useCallback have costs — the dependency comparison itself takes time. Only worth it if the computation is more expensive than the comparison.',
    'Using useMemo for values that change on every render — if the deps change every render, you pay the memoization overhead with no benefit.',
    'Not wrapping lazy() routes in Suspense — lazy components must have a Suspense ancestor, otherwise React throws an error.',
    'Optimizing the wrong thing — fixing re-renders when the actual bottleneck is a network request or a slow API response.',
  ],

  summary: [
    'Measure before optimizing: use React DevTools Profiler and Lighthouse to identify real bottlenecks.',
    'React.memo: skip re-render if props unchanged. useMemo: memoize expensive computations. useCallback: stable function references.',
    'useCallback is only useful when passing to a React.memo child — otherwise it\'s overhead for no benefit.',
    'Code splitting with lazy() + Suspense: defer loading of rarely-visited routes until needed.',
    'Virtualization (react-virtual, react-window): only render visible list items for 100+ item lists.',
    'Core Web Vitals: LCP (load), CLS (stability), INP (interaction). Measurable with Lighthouse/PageSpeed.',
  ],

  practice: [
    {
      type: 'question',
      text: 'Why do you need both useCallback and React.memo to prevent child re-renders?',
      hint: 'React.memo does a shallow props comparison. If the parent passes () => {} as a prop, each render creates a new function reference — memo thinks props changed and re-renders the child. useCallback keeps the same reference between renders, so memo\'s comparison correctly detects "unchanged" and skips.',
    },
    {
      type: 'question',
      text: 'What is code splitting and how does React.lazy() implement it?',
      hint: 'Code splitting breaks the JS bundle into smaller chunks loaded on demand. lazy(() => import(\'./Component\')) makes Webpack/Vite put that component in a separate chunk. It\'s only downloaded when the component first renders. Suspense shows a fallback while loading.',
    },
    {
      type: 'question',
      text: 'When should you use list virtualization? What libraries implement it?',
      hint: 'When you\'re rendering 100+ items and users experience scroll lag or slowness. Without virtualization, all items create DOM nodes — even ones outside the viewport. react-window and @tanstack/react-virtual only render visible items. The DOM stays small regardless of list length.',
    },
    {
      type: 'task',
      text: 'Take an app with 5 routes and add code splitting: use React.lazy for all routes except the homepage. Add a Suspense fallback. Use Webpack Bundle Analyzer (or Vite\'s rollup-plugin-visualizer) to verify the routes are in separate chunks.',
      hint: 'const About = lazy(() => import(\'./pages/About\')). Wrap <Routes> in <Suspense fallback={<Loading />}>. After building, check the dist/ folder — you should see separate chunk files for each lazy route.',
    },
  ],
}

export default function PerformanceEngineeringPage() {
  return <FEDFTopicPage content={content} />
}
