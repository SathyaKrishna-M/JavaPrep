'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Optimization & Quality',
  subtitle: 'Asset optimization, linting, formatting, and production-ready configurations',
  co: 'CO6 — Build Systems, Testing & Deployment',

  overview: (
    <>
      <p>
        A high-quality frontend codebase isn't just one that works — it's one that's
        consistently formatted, catches errors before they reach review, and ships the
        smallest possible assets to users. These qualities are enforced automatically
        through tooling, not through code review discipline.
      </p>
      <p>
        <strong className="text-white">ESLint</strong> catches code quality issues: unused
        variables, missing dependencies, broken rules of hooks, accessibility violations.{' '}
        <strong className="text-white">Prettier</strong> handles formatting so no one ever
        argues about it again. Together, they run in pre-commit hooks to prevent bad code
        from entering the repo.
      </p>
      <p>
        On the asset side: <strong className="text-white">image optimization</strong> (WebP
        format, lazy loading, proper sizing) and{' '}
        <strong className="text-white">font optimization</strong> (font-display: swap, subset
        fonts) are the highest-ROI performance improvements that don't require code changes.
        They directly improve Core Web Vitals scores.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Real-world analogy: ESLint is the spell-checker that catches errors before publication.
        Prettier is the house style guide that everyone follows automatically. Asset optimization
        is like compressing images before uploading — same content, dramatically smaller file.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">Quality Enforcement Pipeline</p>
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {[
            { step: 'Write code', color: 'slate' },
            { step: '→', color: 'none' },
            { step: 'Save file', desc: 'Prettier formats', color: 'violet' },
            { step: '→', color: 'none' },
            { step: 'git commit', desc: 'Husky + lint-staged', color: 'amber' },
            { step: '→', color: 'none' },
            { step: 'ESLint + Type check', color: 'pink' },
            { step: '→', color: 'none' },
            { step: 'Commit succeeds', color: 'green' },
          ].map(({ step, desc, color }, i) => color === 'none'
            ? <span key={i} className="text-gray-500">{step}</span>
            : (
              <div key={i} className={`bg-${color}-500/10 border border-${color}-500/30 rounded px-2 py-1.5`}>
                <p className={`text-${color}-300 font-semibold text-center`}>{step}</p>
                {desc && <p className="text-gray-500 text-[10px] text-center">{desc}</p>}
              </div>
            )
          )}
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Asset Optimization: Impact</p>
        <div className="space-y-1.5">
          {[
            { opt: 'WebP images', impact: 'JPEG→WebP: 25-35% smaller with same visual quality' },
            { opt: 'Lazy load images', impact: 'Images below the fold don\'t block initial page load (LCP)' },
            { opt: 'Font subsetting', impact: 'Full font (200KB) vs subset (20KB) — only include used characters' },
            { opt: 'Gzip/Brotli', impact: 'Server compression: JS/CSS 60-80% smaller over network' },
          ].map(({ opt, impact }) => (
            <div key={opt} className="flex gap-3">
              <span className="text-pink-300 shrink-0 w-32">{opt}</span>
              <span className="text-gray-400">{impact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'ESLint',           definition: 'Static analysis tool for JavaScript/TypeScript. Catches code quality issues (unused vars, wrong patterns, hooks violations) without running code.' },
    { term: 'Prettier',         definition: 'Opinionated code formatter. One style, zero config debates. Formats on save (VS Code) or pre-commit. Works with ESLint.' },
    { term: 'Husky',            definition: 'Git hooks tool. Runs scripts before git commit/push. Combined with lint-staged to run linting only on changed files — fast pre-commit checks.' },
    { term: 'lint-staged',      definition: 'Runs linters on staged (changed) git files only. Makes pre-commit hooks fast — only lint what\'s about to be committed, not the whole codebase.' },
    { term: 'WebP',             definition: 'Modern image format. 25-35% smaller than JPEG/PNG at equivalent quality. Supported by all modern browsers. Convert with sharp or build-time tools.' },
    { term: 'font-display: swap', definition: 'CSS property that shows fallback font while the web font loads, then swaps when ready. Prevents invisible text during load (FOIT), improving LCP.' },
    { term: 'Content hash',     definition: 'Filename includes hash of content: main.a1b2c3.js. Enables aggressive caching — filename changes only when content changes, ensuring users always get fresh code.' },
  ],

  code: {
    title: 'ESLint + Prettier + Husky Setup',
    language: 'javascript',
    snippet: `// .eslintrc.json — ESLint configuration
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",    // enforces Rules of Hooks
    "plugin:jsx-a11y/recommended",        // accessibility linting
    "prettier"                            // disables ESLint formatting rules
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/exhaustive-deps": "error"  // missing deps are an error
  }
}

// .prettierrc — Prettier configuration
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}

// package.json — Git hooks via Husky + lint-staged
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": "prettier --write"
  }
}

// .husky/pre-commit
#!/bin/sh
npx lint-staged
npx tsc --noEmit    # type check without emitting files

// ── Image optimization in Next.js (built-in) ──────────────────
import Image from 'next/image';

function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority          // preload — above the fold
      // auto converts to WebP, serves correct size per device
    />
  );
}

// ── Lazy image loading in plain React ─────────────────────────
<img
  src="product.jpg"
  alt="Product"
  loading="lazy"      // native browser lazy loading
  decoding="async"
/>`,
    explanation: 'lint-staged only runs ESLint on changed files — a pre-commit hook that lints the whole project would take minutes. This setup runs in under 2 seconds on typical changes.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Automated quality enforcement is non-negotiable in team settings.</strong>{' '}
        Without pre-commit hooks, formatting debates waste code review time, bugs sneak through,
        and the codebase diverges in style. With them, every commit is consistently formatted
        and passes linting — without anyone having to police it.
      </p>
      <p>
        The react-hooks/exhaustive-deps ESLint rule has prevented millions of stale closure bugs.
        Making it an error (not a warning) means engineers can't ignore it. The same applies
        to jsx-a11y — catching accessibility issues at lint time is far cheaper than catching
        them in QA or from users.
      </p>
      <p>
        Content-hashed filenames enable aggressive browser caching. A file named
        {' '}<code className="text-pink-300 bg-slate-800 px-1 rounded">vendor.a1b2c3.js</code>{' '}
        can be cached forever — it will never change (content change = new hash = new filename).
        This is why React apps can feel instant on repeat visits.
      </p>
    </>
  ),

  commonMistakes: [
    'Treating linting warnings as acceptable — they accumulate until the output is too noisy to notice real issues. Treat all lint output as errors.',
    'Not running tsc --noEmit in CI — TypeScript errors can be hidden by "any" types or config issues. Explicit type checking in CI catches these.',
    'Shipping uncompressed images — a 4MB JPEG in a hero image is a common source of poor LCP scores. Always optimize and serve WebP.',
    'Not using content hashes in filenames — without them, you can\'t set long cache expiry without risking users seeing stale files after a deployment.',
    'Prettier and ESLint conflicts — running ESLint formatting rules alongside Prettier creates conflicts. Always use eslint-config-prettier to disable ESLint\'s formatting rules.',
  ],

  summary: [
    'ESLint: catches code quality issues. Configure react-hooks/recommended and jsx-a11y/recommended.',
    'Prettier: automated formatting. Zero debates. Runs on save or via pre-commit hook.',
    'Husky + lint-staged: run linting + formatting on staged files before every commit.',
    'WebP images: 25-35% smaller than JPEG/PNG. Use loading="lazy" for below-fold images.',
    'font-display: swap: show fallback font during load, swap when ready. Improves LCP.',
    'Content hash filenames: enable permanent browser caching. New content = new filename = fresh download.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What does lint-staged do and why is it more efficient than running ESLint on the entire codebase in a pre-commit hook?',
      hint: 'lint-staged runs linters only on files staged for the commit (changed files). Running ESLint on an entire codebase with hundreds of files takes minutes. lint-staged reduces this to seconds — only the files being committed are checked.',
    },
    {
      type: 'question',
      text: 'Why does eslint-config-prettier exist and what problem does it solve?',
      hint: 'ESLint has formatting rules (spacing, quotes, etc.) and Prettier also handles formatting — they conflict. When both try to enforce different styles, you get an infinite loop of auto-fixes. eslint-config-prettier disables all ESLint formatting rules, letting Prettier win exclusively.',
    },
    {
      type: 'question',
      text: 'What are content-hashed filenames and what caching strategy do they enable?',
      hint: 'Filenames include a hash of the file\'s content: main.a1b2c3.js. When the content changes, the hash changes and it\'s a new filename. This lets you set Cache-Control: max-age=31536000 (1 year) — the browser caches forever because if the file ever changes, it has a new URL.',
    },
    {
      type: 'task',
      text: 'Set up ESLint (with react-hooks and jsx-a11y plugins), Prettier, and a pre-commit hook with Husky + lint-staged in an existing React project. Verify the hook runs on git commit.',
      hint: 'npm install eslint prettier eslint-config-prettier eslint-plugin-react-hooks eslint-plugin-jsx-a11y husky lint-staged. npx husky install. Create .eslintrc.json and .prettierrc. Add lint-staged config to package.json. Create .husky/pre-commit.',
    },
  ],
}

export default function OptimizationQualityPage() {
  return <FEDFTopicPage content={content} />
}
