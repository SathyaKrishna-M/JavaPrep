'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Modules & Architecture',
  subtitle: 'Organizing frontend codebases that scale with teams',
  co: 'CO2 — JavaScript & TypeScript for Frameworks',

  overview: (
    <>
      <p>
        A React component file works fine in isolation, but production applications have hundreds
        of files. Without structure, you end up with everything in one folder, circular dependencies,
        and no clear answer to "where does this code belong?" ES6 modules — the{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">import</code>/{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">export</code> system — are the
        foundation of modern JavaScript code organization.
      </p>
      <p>
        Beyond individual files, <strong className="text-white">codebase architecture</strong>{' '}
        defines how you group related code. The most common pattern in React projects is organizing
        by feature rather than by type. Instead of folders named{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">components/</code>,{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">hooks/</code>,{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">utils/</code>, you organize by
        domain: <code className="text-pink-300 bg-slate-800 px-1 rounded">features/auth/</code>,{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">features/cart/</code>.
      </p>
      <p>
        The <strong className="text-white">services layer</strong> is the most important
        architectural concept for API-integrated apps. It separates the "what data do we need"
        (components) from "how do we get it" (HTTP calls, transformations, caching). This makes
        both sides independently testable and swappable.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Real-world analogy: Modules are like rooms in a building — each has a purpose, a door
        (exports), and can be entered from the outside (imported). Architecture is the floor plan
        that decides which rooms are near each other and how hallways connect them.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <p className="text-red-400 font-bold text-xs uppercase mb-2">❌ Organize by type (doesn't scale)</p>
          <div className="font-mono text-xs text-gray-400 space-y-0.5">
            <p>src/</p>
            <p className="pl-4">components/   ← everything here</p>
            <p className="pl-4">hooks/        ← all hooks</p>
            <p className="pl-4">utils/        ← all utilities</p>
            <p className="pl-4">pages/        ← all pages</p>
          </div>
          <p className="text-red-400 text-xs mt-2">Adding a feature touches 4 folders. Hard to delete a feature.</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
          <p className="text-green-400 font-bold text-xs uppercase mb-2">✓ Organize by feature (scales well)</p>
          <div className="font-mono text-xs text-gray-400 space-y-0.5">
            <p>src/</p>
            <p className="pl-4">features/</p>
            <p className="pl-8">auth/  (components, hooks, services)</p>
            <p className="pl-8">cart/  (components, hooks, services)</p>
            <p className="pl-4">shared/   (reusable across features)</p>
            <p className="pl-4">pages/    (compose features together)</p>
          </div>
          <p className="text-green-400 text-xs mt-2">Adding a feature = new folder. Deleting = remove one folder.</p>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
        <p className="text-violet-400 text-xs font-semibold mb-2 uppercase tracking-wider">Services Layer Pattern</p>
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <div className="bg-pink-500/20 border border-pink-500/30 text-pink-300 rounded px-2 py-1">Component</div>
          <span className="text-gray-500">calls →</span>
          <div className="bg-violet-500/20 border border-violet-500/30 text-violet-300 rounded px-2 py-1">useCartData() hook</div>
          <span className="text-gray-500">calls →</span>
          <div className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded px-2 py-1">cartService.getItems()</div>
          <span className="text-gray-500">calls →</span>
          <div className="bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded px-2 py-1">fetch('/api/cart')</div>
        </div>
        <p className="text-gray-500 text-xs mt-2">Each layer has one responsibility. Swap the API without touching the component.</p>
      </div>
    </div>
  ),

  concepts: [
    { term: 'ES Module',        definition: 'The standard JS module system. Each file is its own scope. export makes things available; import brings them in. Tree-shaken by bundlers.' },
    { term: 'Named export',     definition: 'export const Foo = ... — imported with the exact name: import { Foo } from "./foo". A file can have many named exports.' },
    { term: 'Default export',   definition: 'export default ... — imported with any name: import Foo from "./foo". One per file. Common for React components.' },
    { term: 'Barrel file',      definition: 'An index.ts that re-exports from multiple files: export { Button } from "./Button". Simplifies imports for consumers of a module.' },
    { term: 'Services layer',   definition: 'A module responsible for all communication with external systems (APIs, localStorage). Keeps components ignorant of data-fetching details.' },
    { term: 'Separation of concerns', definition: 'UI logic (what to render), business logic (how to compute things), and data access (how to fetch) in separate modules.' },
    { term: 'Circular dependency', definition: 'A → imports B → imports A. Causes runtime errors or undefined values. Feature-based architecture prevents most circular deps.' },
  ],

  code: {
    title: 'Services Layer + Module Structure',
    language: 'javascript',
    snippet: `// src/features/cart/cartService.ts  ── Data layer ───────────────
export async function fetchCart(userId: string) {
  const res = await fetch(\`/api/users/\${userId}/cart\`);
  if (!res.ok) throw new Error('Cart fetch failed');
  return res.json();   // returns CartItem[]
}

export async function addToCart(userId: string, itemId: string) {
  return fetch(\`/api/cart\`, {
    method: 'POST',
    body: JSON.stringify({ userId, itemId }),
  });
}

// src/features/cart/useCart.ts  ── Hook layer (business logic) ──
import { fetchCart, addToCart } from './cartService';

export function useCart(userId: string) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart(userId).then(setItems).finally(() => setLoading(false));
  }, [userId]);

  const add = (itemId: string) =>
    addToCart(userId, itemId).then(() => fetchCart(userId).then(setItems));

  return { items, loading, add };
}

// src/features/cart/CartButton.tsx  ── UI layer ─────────────────
import { useCart } from './useCart';

export function CartButton({ userId }) {
  const { items, loading, add } = useCart(userId);
  return loading
    ? <span>Loading...</span>
    : <button>{items.length} items</button>;
}

// src/features/cart/index.ts  ── Barrel file ──────────────────────
export { CartButton } from './CartButton';
export type { CartItem } from './types';`,
    explanation: 'Three clean layers: cartService knows HTTP, useCart knows business logic, CartButton knows UI. To swap from REST to GraphQL, you only change cartService.ts.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Architecture is what separates junior from senior engineers.</strong>{' '}
        Any engineer can make a feature work. Senior engineers make it work in a way that a team
        of 10 can maintain and extend without breaking each other.
      </p>
      <p>
        The services layer is especially valuable: it makes your components testable without
        needing a real API (mock the service), it makes API migrations painless (change one file),
        and it centralizes error handling and response transformation.
      </p>
      <p>
        ES module tree-shaking — where bundlers remove unused exports — is only possible because
        modules declare their dependencies statically. This is why frameworks switched from
        CommonJS (require) to ES modules.
      </p>
    </>
  ),

  commonMistakes: [
    'Putting fetch calls directly inside components — it makes the component impossible to unit test without a real network and mixes concerns.',
    'Mixing default and named exports inconsistently — pick one convention per project and stick to it.',
    'Creating barrel files everywhere — deep barrel file chains slow down bundler performance and make tree-shaking less effective.',
    'Circular dependencies — if you find yourself needing A to import B and B to import A, extract the shared logic to a third module C.',
    'Organizing by type (components/, hooks/, utils/) instead of by feature — this creates friction for every feature addition.',
  ],

  summary: [
    'ES modules: each file is its own scope. export makes symbols available, import brings them in.',
    'Named exports (multiple per file) vs default export (one per file, importable with any name).',
    'Services layer: separate data fetching from UI. Components call hooks, hooks call services, services call APIs.',
    'Organize by feature, not by type. A feature\'s components, hooks, and services live together.',
    'Barrel files (index.ts) simplify public API of a module — consumers import from the folder, not specific files.',
    'Separation of concerns: UI logic, business logic, and data access in distinct modules.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the difference between a named export and a default export? When would you use each?',
      hint: 'Named: import { Button } — exact name required, multiple per file. Default: import Button — any name, one per file. Convention: default for React components, named for utilities/hooks/types.',
    },
    {
      type: 'question',
      text: 'Why is putting fetch() calls directly inside a component considered a bad practice?',
      hint: '(1) Untestable without network. (2) Couples UI to data access — changing the API URL means finding every component. (3) No reuse — multiple components needing the same data each repeat the fetch.',
    },
    {
      type: 'question',
      text: 'What is a circular dependency and what architectural pattern prevents it?',
      hint: 'A → B → A. Prevented by feature-based architecture where each feature is self-contained. Shared code goes in a shared/ directory that features import from, but never import from features.',
    },
    {
      type: 'task',
      text: 'Refactor a component that fetches user data directly (fetch inside useEffect) into a three-layer structure: userService.ts, useUser.ts hook, and UserCard.tsx component.',
      hint: 'userService.ts: async getUser(id). useUser.ts: calls getUser, manages loading/error state. UserCard.tsx: calls useUser(id), renders UI only.',
    },
  ],
}

export default function ModulesArchitecturePage() {
  return <FEDFTopicPage content={content} />
}
