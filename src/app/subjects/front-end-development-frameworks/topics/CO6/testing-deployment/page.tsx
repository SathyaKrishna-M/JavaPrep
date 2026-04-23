'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Testing & Deployment',
  subtitle: 'Jest, React Testing Library, CI/CD pipelines, and shipping to production',
  co: 'CO6 — Build Systems, Testing & Deployment',

  overview: (
    <>
      <p>
        Testing gives you confidence to change code without fear. In React,{' '}
        <strong className="text-white">React Testing Library (RTL)</strong> is the standard:
        it tests components from the user's perspective (what they see and can interact with)
        rather than implementation details (component state, internal methods). This makes
        tests resilient to refactoring.
      </p>
      <p>
        The testing pyramid applies to frontend too: many fast{' '}
        <strong className="text-white">unit tests</strong> (individual functions, hooks),
        fewer <strong className="text-white">integration tests</strong> (component + children
        + API mocks), and minimal{' '}
        <strong className="text-white">end-to-end tests</strong> (Playwright, Cypress —
        real browser, real API).
      </p>
      <p>
        <strong className="text-white">CI/CD</strong> (Continuous Integration / Continuous
        Deployment) automates the path from code push to live deployment. Every push runs
        tests and type checking; passing builds automatically deploy to staging or production.
        Platforms like Vercel and Netlify offer zero-config deployment for React apps.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Real-world analogy: CI/CD is like a factory quality control line. Every product
        (commit) goes through automated inspection (tests, type check, lint) before shipping.
        Anything that fails inspection is rejected before it reaches customers.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">CI/CD Pipeline</p>
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {[
            { step: 'git push', color: 'slate' },
            { step: '→', color: 'none' },
            { step: 'GitHub Actions', desc: 'Triggered', color: 'violet' },
            { step: '→', color: 'none' },
            { step: 'Install & Build', color: 'blue' },
            { step: '→', color: 'none' },
            { step: 'Lint + Type Check', color: 'amber' },
            { step: '→', color: 'none' },
            { step: 'Jest Tests', color: 'pink' },
            { step: '→', color: 'none' },
            { step: 'Deploy', desc: 'Vercel/Netlify', color: 'green' },
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
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">Testing Tools</p>
        <div className="space-y-1.5">
          {[
            { tool: 'Jest',           role: 'Test runner + assertion library. Runs in Node, fast, parallel.' },
            { tool: 'RTL',            role: 'React Testing Library. Renders components and queries by user-visible text/role.' },
            { tool: 'MSW',            role: 'Mock Service Worker. Intercepts real fetch() calls in tests with mock handlers.' },
            { tool: 'Playwright',     role: 'End-to-end: real Chrome/Firefox, real user interactions, full stack.' },
          ].map(({ tool, role }) => (
            <div key={tool} className="flex gap-3">
              <span className="text-pink-300 shrink-0 w-20">{tool}</span>
              <span className="text-gray-400">{role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Jest',             definition: 'JavaScript test runner. Finds test files (*.test.ts), runs them in parallel, reports results. Built-in mocking, coverage, snapshot testing.' },
    { term: 'React Testing Library', definition: 'Testing utilities focused on user behavior. Query by visible text, role, label — not by component internals. Promotes accessible patterns.' },
    { term: 'Queries',          definition: 'RTL\'s way to find elements: getByRole (most preferred), getByLabelText, getByText, getByTestId (last resort). Prefer role-based queries for accessibility alignment.' },
    { term: 'userEvent',        definition: 'RTL companion library for realistic user interactions (typing, clicking). More accurate than fireEvent — simulates real browser event sequences.' },
    { term: 'MSW',              definition: 'Mock Service Worker. Intercepts real HTTP requests at the network level in tests. Your component code is unchanged; MSW handles what the server would return.' },
    { term: 'CI',               definition: 'Continuous Integration. Automated pipeline that runs on every push: installs deps, builds, lints, runs tests. Prevents broken code from being merged.' },
    { term: 'Vercel',           definition: 'Deployment platform optimized for Next.js and frontend frameworks. Zero-config deployment from Git. Preview deployments for every PR.' },
  ],

  code: {
    title: 'React Testing Library + MSW + GitHub Actions',
    language: 'javascript',
    snippet: `// UserProfile.test.tsx — RTL + MSW pattern ──────────────────
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserProfile from './UserProfile';

// ── MSW server: intercept real fetch calls ────────────────────
const server = setupServer(
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(ctx.json({ id: '1', name: 'Alice Johnson', role: 'Admin' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ── Test: queries by what the user sees ──────────────────────
describe('UserProfile', () => {
  test('displays user name after loading', async () => {
    render(<UserProfile userId="1" />);

    // Verify loading state
    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);

    // Wait for async data to appear (waitFor retries until assertion passes)
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Alice Johnson' })).toBeInTheDocument();
    });

    // No spinner visible after load
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('shows error when API fails', async () => {
    // Override for this test only
    server.use(
      rest.get('/api/users/:id', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: 'Server error' }))
      )
    );

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/server error/i);
    });
  });

  test('edit button opens form', async () => {
    const user = userEvent.setup();
    render(<UserProfile userId="1" />);
    await screen.findByRole('heading', { name: 'Alice Johnson' });

    await user.click(screen.getByRole('button', { name: /edit/i }));
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
  });
});

// ── .github/workflows/ci.yml — GitHub Actions ────────────────
/*
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check     # tsc --noEmit
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build          # ensure production build doesn't break
*/`,
    explanation: 'MSW intercepts the actual fetch() calls your component makes — no need to mock the module. This tests the real data fetching code, not a mock version of it. That\'s why MSW catches more real-world bugs than module mocks.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Tests are what allow you to refactor confidently.</strong>{' '}
        Without tests, "I'll clean this up later" never happens because no one knows if the
        cleanup broke something. With tests that test behavior (not implementation), you can
        completely rewrite a component's internals and know it still works from the user's
        perspective.
      </p>
      <p>
        RTL's philosophy — "test like a user" — has a side effect: it naturally enforces
        accessibility. Querying by role (getByRole('button')) only works if the element is
        actually a button. If your tests use getByTestId everywhere, your components are
        probably not accessible.
      </p>
      <p>
        CI/CD is what makes deployment non-scary. Without it, deployments are manual, risky
        events. With it, every merge to main that passes CI is automatically deployed.
        Teams that deploy multiple times per day have CI/CD. Teams that deploy monthly don't.
      </p>
    </>
  ),

  commonMistakes: [
    'Testing implementation details: querying by component state, testing private methods, asserting on CSS class names. These tests break on refactoring even when behavior is unchanged.',
    'Using getByTestId everywhere instead of semantic queries — testId is the last resort. getByRole, getByLabelText, getByText are preferred and enforce accessibility.',
    'Not mocking at the network level — mocking fetch or axios as a module tests your mocking, not your component. MSW tests the real data fetching path.',
    'Not waiting for async operations in tests: asserting on UI before a fetch resolves. Use await waitFor() or await screen.findByRole() for async elements.',
    'Skipping CI to "deploy quickly" — this is how production bugs are introduced. The cost of one production incident far exceeds the time saved by skipping tests.',
  ],

  summary: [
    'RTL: render components, query by user-visible role/text/label, assert on visible output. Not implementation details.',
    'Queries priority: getByRole > getByLabelText > getByText > getByTestId.',
    'userEvent over fireEvent: more realistic browser event simulation.',
    'MSW: mock at network level. Real fetch() calls intercepted by mock handlers. More realistic than module mocks.',
    'CI/CD: every push → automated build, lint, type-check, tests → auto-deploy on success.',
    'Vercel/Netlify: zero-config deployment. Preview deployments per PR. Instant rollback.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What does "test like a user" mean in React Testing Library, and why is it better than testing implementation details?',
      hint: 'Test what users see and can do: click buttons by their visible label, assert on displayed text, find inputs by their label. Don\'t test: component state values, CSS classes, internal methods. Behavior tests survive refactoring; implementation tests break when you rename a state variable.',
    },
    {
      type: 'question',
      text: 'Why is MSW preferred over mocking fetch or axios directly in tests?',
      hint: 'Module mocks replace the entire fetch function — your test no longer runs the actual data fetching code (URL construction, headers, error handling). MSW intercepts at the network level, so your real fetch code runs. Bugs in how you construct URLs or handle headers are caught. You\'re testing actual behavior.',
    },
    {
      type: 'question',
      text: 'What is the difference between getByRole and getByTestId in RTL, and which should you prefer?',
      hint: 'getByRole queries by ARIA role (button, heading, textbox) — works only if the element has correct semantic HTML or ARIA roles. getByTestId queries by data-testid attribute — always works, but bypasses semantics. Prefer getByRole: if it fails because the element has no role, that\'s an accessibility bug to fix.',
    },
    {
      type: 'task',
      text: 'Write tests for a LoginForm component: (1) shows validation error if email is invalid, (2) shows loading state during submission, (3) shows server error if credentials are wrong (using MSW to mock the API).',
      hint: 'render(<LoginForm />). await user.type(screen.getByLabelText(/email/i), "invalid"). await user.click(submit button). expect error message. For server error: server.use(rest.post("/api/login", ...)) returning 401. Wait for error alert.',
    },
  ],
}

export default function TestingDeploymentPage() {
  return <FEDFTopicPage content={content} />
}
