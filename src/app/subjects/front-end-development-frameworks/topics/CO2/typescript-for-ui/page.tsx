'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'TypeScript for UI',
  subtitle: 'Static types that make React components self-documenting and bug-resistant',
  co: 'CO2 — JavaScript & TypeScript for Frameworks',

  overview: (
    <>
      <p>
        TypeScript is a superset of JavaScript that adds a static type system. It compiles to plain
        JavaScript, so browsers run the output — TypeScript only exists at development time. In
        React, TypeScript's killer feature is <strong className="text-white">typed props</strong>:
        the component itself becomes documentation that the editor enforces, preventing entire
        categories of bugs before code even runs.
      </p>
      <p>
        TypeScript doesn't slow you down once you know it — it speeds you up. Auto-complete becomes
        accurate, refactoring is safe (rename a prop, every usage updates), and reading unfamiliar
        code is easier because types document intent. Most large React codebases (at companies like
        Google, Microsoft, Airbnb, and Meta) use TypeScript.
      </p>
      <p>
        The key TypeScript concepts for React are: <strong className="text-white">interfaces</strong>{' '}
        for component props, <strong className="text-white">type aliases</strong> for unions and
        utility types, <strong className="text-white">generics</strong> for reusable typed hooks
        and utilities, and <strong className="text-white">React-specific types</strong> like{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">ReactNode</code>,{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">ChangeEvent</code>, and{' '}
        <code className="text-pink-300 bg-slate-800 px-1 rounded">FC</code>.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Real-world analogy: TypeScript is like building contracts between teams. Component A's
        "output type" (props) is a legal agreement that Component B must respect. Break the
        contract and the type system rejects your code at build time, not in production.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <p className="text-red-400 font-bold text-xs uppercase mb-2">❌ Without TypeScript</p>
          <div className="font-mono text-xs text-gray-300 space-y-1">
            <p>{'<UserCard user={null} />'}</p>
            <p className="text-red-400">// Runtime: Cannot read</p>
            <p className="text-red-400">// properties of null</p>
            <p className="mt-2">{'<Button size="LARGE" />'}</p>
            <p className="text-red-400">// Silently ignored</p>
            <p className="text-red-400">// Wrong size, no warning</p>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
          <p className="text-green-400 font-bold text-xs uppercase mb-2">✓ With TypeScript</p>
          <div className="font-mono text-xs text-gray-300 space-y-1">
            <p>{'<UserCard user={null} />'}</p>
            <p className="text-green-400">// Error at build time:</p>
            <p className="text-green-400">// "User" not assignable to "null"</p>
            <p className="mt-2">{'<Button size="LARGE" />'}</p>
            <p className="text-green-400">// Error: "LARGE" not in</p>
            <p className="text-green-400">// "sm" | "md" | "lg"</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">TypeScript Utility Types Used in React</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { type: 'Partial<T>',      use: 'All props optional — form state updates' },
            { type: 'Required<T>',     use: 'Make all optional props required' },
            { type: 'Pick<T, K>',      use: 'Select subset of props for a smaller component' },
            { type: 'Omit<T, K>',      use: 'Exclude props from a parent type' },
            { type: 'Record<K,V>',     use: 'Object with dynamic keys — e.g., translations' },
            { type: 'ReturnType<F>',   use: 'Type of a hook\'s return value' },
          ].map(({ type, use }) => (
            <div key={type} className="flex gap-2">
              <code className="text-amber-300 shrink-0">{type}</code>
              <span className="text-gray-500">{use}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Interface',      definition: 'Describes the shape of an object. Used for component props: interface ButtonProps { label: string; onClick: () => void }. Can be extended.' },
    { term: 'Type alias',     definition: 'type Size = "sm" | "md" | "lg". Flexible — can represent unions, intersections, primitives. Use for unions; prefer interface for object shapes.' },
    { term: 'Union type',     definition: '"sm" | "md" | "lg" constrains a value to specific literals. Makes invalid props a compile error. Essential for variants, statuses, sizes.' },
    { term: 'Generic',        definition: 'A type parameter: function useList<T>(initial: T[]). Makes a hook/function work with any type while preserving type safety.' },
    { term: 'ReactNode',      definition: 'The type for anything that can be rendered: JSX, string, number, null, array. Use for the children prop.' },
    { term: 'ChangeEvent',    definition: 'React.ChangeEvent<HTMLInputElement> — the type of the event object in an onChange handler. Provides e.target.value as string.' },
    { term: 'Type narrowing', definition: 'TypeScript reducing a broad type to a specific one inside a conditional. if (error instanceof Error) { error.message } — now TS knows it\'s an Error.' },
  ],

  code: {
    title: 'TypeScript in React — Props, Hooks, Events',
    language: 'typescript',
    snippet: `// ── Typed component props ────────────────────────────────────────
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger'; // union — only these values
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
  children?: React.ReactNode;   // anything renderable
}

function Button({ label, variant = 'primary', size = 'md', onClick }: ButtonProps) {
  return <button className={\`btn-\${variant} btn-\${size}\`} onClick={onClick}>{label}</button>;
}

// ── Typed event handler ───────────────────────────────────────
function SearchInput() {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);  // e.target.value is typed as string
  };

  return <input value={query} onChange={handleChange} />;
}

// ── Generic hook ──────────────────────────────────────────────
function useFetch<T>(url: string): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then((d: T) => setData(d))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage — T is inferred as User:
const { data } = useFetch<User>('/api/user/1');
// data is User | null  — TypeScript knows the shape!`,
    explanation: 'The generic useFetch<T> pattern is extremely common in real codebases. It gives you type safety on the response data without any runtime overhead.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">TypeScript is now the industry standard for React.</strong>{' '}
        Most job postings for React roles list TypeScript as required or strongly preferred.
        GitHub's own UI team, Vercel's Next.js, and virtually every major React library ships
        with TypeScript type definitions.
      </p>
      <p>
        Types as documentation: when you read a component that has typed props, you immediately
        know what it accepts, what's required vs optional, and what it renders. This replaces
        PropTypes and improves on JSDoc comments because types are checked — not just read.
      </p>
      <p>
        Generics make shared hooks and utilities that work across an entire codebase —
        one useFetch hook serves every data type, with full type safety for each use.
      </p>
    </>
  ),

  commonMistakes: [
    'Using "any" everywhere to escape type errors — this turns TypeScript into JavaScript and defeats the purpose. Use "unknown" instead and narrow it.',
    'Typing every useState with an explicit type annotation when TypeScript can infer it: useState<string>(\'\') is the same as useState(\'\') — the latter is cleaner.',
    'Not typing children: many components accept children but forget to add children?: React.ReactNode to props, causing confusing errors.',
    'Confusing interface and type — they\'re mostly interchangeable for object shapes. Use interface for component props (extendable), type for unions and computed types.',
    'Ignoring TypeScript errors with @ts-ignore instead of fixing them — these are often real bugs, not TS being overly strict.',
  ],

  summary: [
    'TypeScript adds static types to JavaScript — catches errors at build time, not runtime.',
    'interface for component props: describes shape, can be extended. type for unions and computed types.',
    'Union types ("sm" | "md" | "lg") make invalid prop values compile errors.',
    'Generics (function foo<T>) make reusable typed hooks — useFetch<User>() knows the response shape.',
    'React types: React.ReactNode (children), React.ChangeEvent<HTMLInputElement> (input events).',
    'TypeScript is standard in production React codebases — most job postings require it.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the difference between interface and type in TypeScript? When should you prefer one over the other?',
      hint: 'Both describe object shapes. interface is extendable (interface Admin extends User {}). type is more flexible for unions (type Status = "active" | "inactive"). Use interface for props, type for unions/computed types.',
    },
    {
      type: 'question',
      text: 'What does React.ChangeEvent<HTMLInputElement> represent and why do you need it?',
      hint: 'It\'s the TypeScript type for the event object passed to an onChange handler on an input element. Without it, e is typed as "any". With it, TypeScript knows e.target.value is a string.',
    },
    {
      type: 'question',
      text: 'Explain what a generic type parameter does with this hook: function useFetch<T>(url: string): { data: T | null }',
      hint: 'T is a placeholder type. When you call useFetch<User>("/api/user/1"), T becomes User. So data is User | null — TypeScript knows the exact shape of the fetched data.',
    },
    {
      type: 'task',
      text: 'Take an existing JavaScript React component and convert it to TypeScript: add an interface for props, type the useState calls, and type any event handlers.',
      hint: 'Start with the props interface. Then add explicit types to useState<string>() where inference isn\'t obvious. For event handlers: (e: React.ChangeEvent<HTMLInputElement>) => void.',
    },
  ],
}

export default function TypeScriptForUIPage() {
  return <FEDFTopicPage content={content} />
}
