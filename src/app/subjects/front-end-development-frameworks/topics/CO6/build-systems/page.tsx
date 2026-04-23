'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Build Systems',
  subtitle: 'How modern bundlers transform and optimize your React code for production',
  co: 'CO6 — Build Systems, Testing & Deployment',

  overview: (
    <>
      <p>
        A <strong className="text-white">bundler</strong> is a tool that takes your source
        code — dozens or hundreds of modules across files — and packages them into optimized
        files browsers can efficiently load. This process handles JSX compilation, TypeScript
        transpilation, CSS processing, asset optimization, and code splitting.
      </p>
      <p>
        <strong className="text-white">Vite</strong> is the modern choice for new React
        projects: it uses native ES modules for near-instant development server startup and
        Rollup for production builds. <strong className="text-white">Webpack</strong> is
        the veteran: battle-tested, extremely configurable, used by most large production
        applications.
      </p>
      <p>
        Understanding the build pipeline — what happens when you run{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">npm run build</code> — helps
        you configure it correctly, debug mysterious errors, and make informed choices about
        dependencies that affect bundle size.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Real-world analogy: A bundler is like a factory that takes raw materials (source files)
        and assembles them into a finished product (optimized JavaScript bundles) ready for
        shipping (deployment). Different factories (Vite, Webpack) have different assembly lines
        but produce the same output.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">Build Pipeline</p>
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {[
            { step: 'Source Files', desc: '.tsx .ts .css', color: 'pink' },
            { step: '→', color: 'none' },
            { step: 'Transform', desc: 'Babel/SWC: JSX → JS, TS → JS', color: 'violet' },
            { step: '→', color: 'none' },
            { step: 'Bundle', desc: 'Resolve imports, tree-shake', color: 'blue' },
            { step: '→', color: 'none' },
            { step: 'Optimize', desc: 'Minify, split, compress', color: 'amber' },
            { step: '→', color: 'none' },
            { step: 'Output', desc: 'dist/ chunks + assets', color: 'green' },
          ].map(({ step, desc, color }, i) => color === 'none'
            ? <span key={i} className="text-gray-500">{step}</span>
            : (
              <div key={i} className={`bg-${color}-500/10 border border-${color}-500/30 rounded px-2 py-1.5 text-center`}>
                <p className={`text-${color}-300 font-semibold`}>{step}</p>
                {desc && <p className="text-gray-500 text-[10px]">{desc}</p>}
              </div>
            )
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
          <p className="text-violet-400 font-bold mb-2">Vite</p>
          <ul className="text-gray-400 space-y-1">
            <li>• Dev: native ESM, instant start</li>
            <li>• Build: Rollup under the hood</li>
            <li>• Config: vite.config.ts</li>
            <li>• Best for: new projects</li>
          </ul>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
          <p className="text-pink-400 font-bold mb-2">Webpack</p>
          <ul className="text-gray-400 space-y-1">
            <li>• Dev: webpack-dev-server</li>
            <li>• Highly configurable loaders</li>
            <li>• Config: webpack.config.js</li>
            <li>• Best for: existing large apps</li>
          </ul>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Bundler',          definition: 'Tool that resolves module dependencies and combines source files into browser-ready output. Handles transforms, optimization, and code splitting.' },
    { term: 'Entry point',      definition: 'The file the bundler starts from (usually src/main.tsx). It follows all import chains from here to build the full dependency graph.' },
    { term: 'Module graph',     definition: 'The dependency tree the bundler builds: which files import which. Tree-shaking removes unused nodes from this graph.' },
    { term: 'Tree-shaking',     definition: 'Dead code elimination. Removes exports that are never imported. Only works with ES modules (static import/export). CommonJS (require) can\'t be tree-shaken.' },
    { term: 'Chunk',            definition: 'A separate output file. Route-level code splitting creates one chunk per route. Reduces initial bundle — users download only what they need.' },
    { term: 'Source map',       definition: 'A file that maps minified production code back to original source. Enables debugging production errors with readable stack traces.' },
    { term: 'HMR',              definition: 'Hot Module Replacement. Updates modules in the running dev server without a full page reload. Vite\'s dev HMR is near-instant.' },
  ],

  code: {
    title: 'Vite Configuration + Environment Variables',
    language: 'typescript',
    snippet: `// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',
    sourcemap: true,             // generate source maps for debugging

    rollupOptions: {
      output: {
        // ── Manual chunking: vendor bundle ─────────────────────
        manualChunks: {
          vendor: ['react', 'react-dom'],      // separate chunk for React
          router: ['react-router-dom'],
        },
      },
    },
  },

  resolve: {
    alias: { '@': '/src' },      // enables import from '@/components/...'
  },

  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',  // proxy API calls during dev
    },
  },
});

// ── Environment variables ─────────────────────────────────────
// .env.local (never commit to git)
// VITE_API_URL=https://api.example.com
// VITE_STRIPE_KEY=pk_test_...

// Access in code — only VITE_ prefix vars are exposed to client:
const apiUrl = import.meta.env.VITE_API_URL;

// Type-safe env vars (env.d.ts):
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_STRIPE_KEY: string;
}

// ── Build output analysis ─────────────────────────────────────
// npm install --save-dev rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),  // opens bundle size report in browser
  ],
});`,
    explanation: 'Manual chunking separates stable vendor code (React, react-router) into a separate chunk that browsers cache independently. When you update your app code, users redownload only your chunk, not the vendors.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">The build system is the foundation of your deployment.</strong>{' '}
        A misconfigured build can ship unminified code (10x larger), missing source maps
        (impossible to debug), or leaked environment variables (security vulnerability).
        Understanding the build pipeline lets you configure it intentionally.
      </p>
      <p>
        Bundle size directly affects performance. A 2MB JavaScript bundle takes ~10 seconds
        on a 3G connection. Tree-shaking, code splitting, and vendor chunking together can
        reduce initial load by 60-80%. The Vite visualizer tool makes bundle analysis visual
        and immediate.
      </p>
      <p>
        Vite vs. Webpack: for new projects, Vite is the clear choice — faster dev server
        (10-100x), simpler config, and modern defaults. For large existing Webpack projects,
        migration is non-trivial and often not worth the risk. Know both.
      </p>
    </>
  ),

  commonMistakes: [
    'Committing .env files to version control — environment variables often contain API keys and secrets. Always add .env* to .gitignore (keep .env.example for documentation).',
    'Not using VITE_ prefix for client-side variables in Vite — variables without the prefix are not injected into the bundle (security by default).',
    'Importing entire libraries when you only need one function: import _ from "lodash" (71KB) vs import debounce from "lodash/debounce" (2KB).',
    'Ignoring bundle size in development — development bundles skip minification and tree-shaking. Always check production bundle size with the visualizer.',
    'No source maps in production — makes debugging production errors essentially impossible. Enable them (sourcemap: true) but restrict access.',
  ],

  summary: [
    'Bundlers resolve imports, transform source (JSX/TS), and output optimized browser-ready files.',
    'Vite: native ESM dev server (instant start), Rollup for production. Best for new projects.',
    'Webpack: configurable loaders pipeline. Used in most large existing React apps.',
    'Tree-shaking: unused exports removed at build time. Requires static ES module syntax.',
    'Code splitting: separate chunks per route/feature — users download only needed code.',
    'Environment variables: VITE_ prefix in Vite. Never commit .env files. Type-safe via ImportMetaEnv.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is tree-shaking and why does it only work with ES module syntax (import/export) and not CommonJS (require)?',
      hint: 'Tree-shaking removes unused exports. ES module imports are static (resolved at build time) — bundlers can analyze the dependency graph without running code. CommonJS require() is dynamic (can be called anywhere, with any string) — the bundler can\'t know at build time which exports are actually used.',
    },
    {
      type: 'question',
      text: 'What is the difference between Vite\'s dev server and its production build?',
      hint: 'Dev server: native ES modules served directly to the browser, no bundling (just-in-time transforms), near-instant startup, HMR. Production build: uses Rollup to bundle, minify, tree-shake, and split code into optimized chunks for deployment. Different tools, different goals.',
    },
    {
      type: 'question',
      text: 'Why should you never commit .env files to version control, and how do you document required environment variables for other developers?',
      hint: '.env files contain secrets (API keys, database URLs). Git history is permanent — a committed secret stays in history even if later removed. Document required variables in a .env.example file with placeholder values: VITE_API_URL=https://your-api-url-here. Other devs copy this and fill in real values locally.',
    },
    {
      type: 'task',
      text: 'Create a new React app with Vite. Install rollup-plugin-visualizer, build the app, and analyze the bundle. Add manual chunking to separate React and react-dom from your app code. Compare bundle sizes before and after.',
      hint: 'npm create vite@latest. Install visualizer. Add to vite.config.ts plugins. npm run build → stats.html opens automatically. Add manualChunks: { vendor: [\'react\', \'react-dom\'] }. Rebuild and compare the chunk sizes.',
    },
  ],
}

export default function BuildSystemsPage() {
  return <FEDFTopicPage content={content} />
}
