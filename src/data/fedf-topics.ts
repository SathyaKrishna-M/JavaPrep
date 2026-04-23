export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  href: string
  co?: string
}

const base = '/subjects/front-end-development-frameworks/topics'

export const fedfTopics: Topic[] = [
  // ── CO1 — Front-End Engineering Foundations ──────────────────────────────
  {
    id: 'why-frameworks-exist',
    title: '1. Why Frameworks Exist',
    description: 'Problems frameworks solve, imperative vs declarative UI, DOM limitations, engineering constraints',
    icon: '🤔',
    href: `${base}/CO1/why-frameworks-exist`,
    co: 'CO1',
  },
  {
    id: 'rendering-virtual-dom',
    title: '2. Rendering & Virtual DOM',
    description: 'Virtual DOM, rendering pipeline, reconciliation, how frameworks abstract complexity',
    icon: '⚡',
    href: `${base}/CO1/rendering-virtual-dom`,
    co: 'CO1',
  },
  {
    id: 'core-architecture-thinking',
    title: '3. Core Architecture Thinking',
    description: 'Component-driven thinking, unidirectional data flow, immutability, reactive state, composition',
    icon: '🏗️',
    href: `${base}/CO1/core-architecture-thinking`,
    co: 'CO1',
  },

  // ── CO2 — JavaScript & TypeScript for Frameworks ─────────────────────────
  {
    id: 'modern-javascript-ui',
    title: '4. Modern JavaScript for UI',
    description: 'ES6+ essentials, closures, scope, functional programming, immutability & pure functions',
    icon: '📜',
    href: `${base}/CO2/modern-javascript-ui`,
    co: 'CO2',
  },
  {
    id: 'async-ui-behavior',
    title: '5. Async & UI Behavior',
    description: 'Promises, async/await, async pipelines, error handling in UI contexts',
    icon: '⏳',
    href: `${base}/CO2/async-ui-behavior`,
    co: 'CO2',
  },
  {
    id: 'modules-architecture',
    title: '6. Modules & Architecture',
    description: 'Import/export, codebase structure, services layer, separation of concerns',
    icon: '🧩',
    href: `${base}/CO2/modules-architecture`,
    co: 'CO2',
  },
  {
    id: 'typescript-for-ui',
    title: '7. TypeScript for UI',
    description: 'Types, interfaces, generics, advanced TS patterns for React components',
    icon: '🔷',
    href: `${base}/CO2/typescript-for-ui`,
    co: 'CO2',
  },

  // ── CO3 — React Component Model ──────────────────────────────────────────
  {
    id: 'component-model',
    title: '8. Component Model',
    description: 'Component as a function, props, state, JSX, the React component mental model',
    icon: '🧱',
    href: `${base}/CO3/component-model`,
    co: 'CO3',
  },
  {
    id: 'hooks-lifecycle',
    title: '9. Hooks & Lifecycle',
    description: 'useState, useEffect, the rules of hooks, hooks as reusable lifecycle abstraction',
    icon: '🪝',
    href: `${base}/CO3/hooks-lifecycle`,
    co: 'CO3',
  },
  {
    id: 'rendering-behavior',
    title: '10. Rendering Behavior',
    description: 'Reconciliation, when React re-renders, render optimization basics, keys',
    icon: '🔄',
    href: `${base}/CO3/rendering-behavior`,
    co: 'CO3',
  },
  {
    id: 'ui-patterns-styling',
    title: '11. UI Patterns & Styling',
    description: 'Controlled vs uncontrolled, useRef/useMemo/useCallback, composition patterns, Tailwind/CSS modules',
    icon: '🎨',
    href: `${base}/CO3/ui-patterns-styling`,
    co: 'CO3',
  },

  // ── CO4 — State Architecture & API Integration ────────────────────────────
  {
    id: 'state-architecture',
    title: '12. State Architecture',
    description: 'Lifting state, co-location, derived state, global vs local state decision framework',
    icon: '🗂️',
    href: `${base}/CO4/state-architecture`,
    co: 'CO4',
  },
  {
    id: 'context-sharing-state',
    title: '13. Context & Sharing State',
    description: 'React Context API, when to use context vs props, provider patterns',
    icon: '🌐',
    href: `${base}/CO4/context-sharing-state`,
    co: 'CO4',
  },
  {
    id: 'async-data-systems',
    title: '14. Async Data Systems',
    description: 'API calls in components, service layers, async flow, data fetching patterns',
    icon: '📡',
    href: `${base}/CO4/async-data-systems`,
    co: 'CO4',
  },
  {
    id: 'advanced-state-problems',
    title: '15. Advanced State Problems',
    description: 'Race conditions, stale state, caching, skeleton UI, container-presenter pattern',
    icon: '⚠️',
    href: `${base}/CO4/advanced-state-problems`,
    co: 'CO4',
  },

  // ── CO5 — Routing, Forms & Performance ───────────────────────────────────
  {
    id: 'routing-systems',
    title: '16. Routing Systems',
    description: 'SPA routing, dynamic & nested routes, protected routes, URL-driven UI',
    icon: '🗺️',
    href: `${base}/CO5/routing-systems`,
    co: 'CO5',
  },
  {
    id: 'forms-engineering',
    title: '17. Forms Engineering',
    description: 'Controlled forms, validation strategies, error handling, form UX patterns',
    icon: '📋',
    href: `${base}/CO5/forms-engineering`,
    co: 'CO5',
  },
  {
    id: 'accessibility',
    title: '18. Accessibility',
    description: 'ARIA roles, keyboard flow, semantic HTML, focus management, contrast requirements',
    icon: '♿',
    href: `${base}/CO5/accessibility`,
    co: 'CO5',
  },
  {
    id: 'performance-engineering',
    title: '19. Performance Engineering',
    description: 'Memoization, lazy loading, virtualization, keying, batching, performance tradeoffs',
    icon: '🚀',
    href: `${base}/CO5/performance-engineering`,
    co: 'CO5',
  },

  // ── CO6 — Build Systems, Testing & Deployment ────────────────────────────
  {
    id: 'build-systems',
    title: '20. Build Systems',
    description: 'Why bundlers exist, Vite vs Webpack, the bundling process, module graphs',
    icon: '🔧',
    href: `${base}/CO6/build-systems`,
    co: 'CO6',
  },
  {
    id: 'optimization-quality',
    title: '21. Optimization & Quality',
    description: 'Tree-shaking, minification, asset optimization, env configs, linting & formatting',
    icon: '✨',
    href: `${base}/CO6/optimization-quality`,
    co: 'CO6',
  },
  {
    id: 'testing-deployment',
    title: '22. Testing & Deployment',
    description: 'Jest & React Testing Library, CI/CD pipelines, Vercel/Netlify deployment, monitoring',
    icon: '🚢',
    href: `${base}/CO6/testing-deployment`,
    co: 'CO6',
  },
]
