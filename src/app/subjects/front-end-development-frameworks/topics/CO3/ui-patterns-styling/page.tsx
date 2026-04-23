'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'UI Patterns & Styling',
  subtitle: 'Controlled components, composition patterns, and styling in React',
  co: 'CO3 — React Component Model',

  overview: (
    <>
      <p>
        React's component model enables specific UI patterns that solve recurring problems.
        The most fundamental: <strong className="text-white">controlled vs uncontrolled</strong>{' '}
        inputs. A controlled input's value is driven by React state — React owns the truth.
        An uncontrolled input's value lives in the DOM — React reads it on demand via a ref.
      </p>
      <p>
        For styling, React applications have three main approaches:{' '}
        <strong className="text-white">Tailwind CSS</strong> (utility classes directly in JSX),{' '}
        <strong className="text-white">CSS Modules</strong> (scoped class names per file), and{' '}
        <strong className="text-white">CSS-in-JS</strong> (styles as JavaScript objects).
        Tailwind dominates new React projects for its speed and consistency.
      </p>
      <p>
        Composition patterns like <strong className="text-white">compound components</strong>,
        the <strong className="text-white">render prop</strong>, and{' '}
        <strong className="text-white">container/presenter</strong> solve the problem of
        sharing behavior while keeping control in the consumer's hands.
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Real-world analogy: A controlled input is like a smart lock where the app controls
        the combination. An uncontrolled input is like a physical lockbox — you only check
        the combination when you need it.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
          <p className="text-violet-400 font-bold mb-2">Controlled Input</p>
          <div className="font-mono text-gray-300 space-y-1">
            <p>{'const [val, setVal] = useState("")'}</p>
            <p className="text-pink-300">{'<input'}</p>
            <p className="pl-4 text-pink-300">{'value={val}'}</p>
            <p className="pl-4 text-pink-300">{'onChange={e => setVal(e.target.value)}'}</p>
            <p className="text-pink-300">{'/>'}</p>
          </div>
          <p className="text-violet-300 mt-2">React owns the value. Validated on every keystroke.</p>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
          <p className="text-cyan-400 font-bold mb-2">Uncontrolled Input</p>
          <div className="font-mono text-gray-300 space-y-1">
            <p>{'const ref = useRef(null)'}</p>
            <p className="text-cyan-300">{'<input ref={ref} />'}</p>
            <p className="text-gray-500 mt-2">{'// Read on submit:'}</p>
            <p className="text-cyan-300">{'ref.current.value'}</p>
          </div>
          <p className="text-cyan-300 mt-2">DOM owns the value. Read only when needed.</p>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Styling Approaches</p>
        <div className="space-y-1.5">
          {[
            { approach: 'Tailwind CSS',    example: 'className="flex gap-4 text-pink-400 rounded-lg"', note: 'Utility-first, no context switching' },
            { approach: 'CSS Modules',     example: 'import s from "./Card.module.css" → className={s.card}', note: 'Scoped, no collisions' },
            { approach: 'Inline styles',   example: 'style={{ color: "red", fontSize: 14 }}', note: 'Dynamic values only — no pseudo-classes' },
          ].map(({ approach, example, note }) => (
            <div key={approach}>
              <span className="text-white font-semibold">{approach}: </span>
              <code className="text-amber-300">{example}</code>
              <span className="text-gray-500 ml-1">— {note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Controlled component', definition: 'Form element whose value is driven by React state. value={state} + onChange={setter}. React is the single source of truth for the input\'s value.' },
    { term: 'Uncontrolled component', definition: 'Form element that manages its own state in the DOM. Use ref.current.value to read it. Simpler for one-time reads; harder to validate on every keystroke.' },
    { term: 'defaultValue',        definition: 'Sets the initial value for an uncontrolled input without making it controlled. Unlike value={}, doesn\'t keep the input in sync with state.' },
    { term: 'Tailwind CSS',        definition: 'Utility-first CSS framework. Apply pre-built utility classes directly in className. No CSS files to write. Compiled to minimal CSS by PurgeCSS.' },
    { term: 'CSS Modules',         definition: 'Locally scoped CSS. Class names in .module.css files are transformed to unique hashes, preventing name collisions across components.' },
    { term: 'Container/Presenter', definition: 'Pattern: Container component handles data and logic; Presenter component handles rendering. Makes presenters easily testable without data dependencies.' },
    { term: 'Compound component',  definition: 'A set of components designed to work together (e.g., <Select> + <Option>). Parent manages shared state, children access it via Context.' },
  ],

  code: {
    title: 'Controlled Forms + Container/Presenter Pattern',
    language: 'jsx',
    snippet: `// ── Controlled input: React owns the value ───────────────────
function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}                          // controlled: React owns value
        onChange={e => setEmail(e.target.value)}
        className="border rounded px-3 py-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

// ── Container / Presenter ──────────────────────────────────────
// Container: data + logic, no visual opinion
function UserListContainer() {
  const { users, loading } = useUsers();          // custom hook
  const handleDelete = (id) => deleteUser(id);
  return <UserListView users={users} loading={loading} onDelete={handleDelete} />;
}

// Presenter: pure UI, no data fetching — easily tested with mock props
function UserListView({ users, loading, onDelete }) {
  if (loading) return <Spinner />;
  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>
          {u.name}
          <button onClick={() => onDelete(u.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}`,
    explanation: 'The container/presenter split makes UserListView trivially testable: pass any users array and onDelete mock, and you can test all UI states without a real API.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Controlled inputs are the React way for forms.</strong>{' '}
        They enable instant validation (highlight an invalid email as the user types), conditional
        rendering based on input state, and easy form reset (just setState('')).
        Most form libraries (React Hook Form, Formik) are built on the controlled input model.
      </p>
      <p>
        Tailwind has become the dominant styling solution in new React projects because it
        eliminates the CSS naming problem, co-locates styles with markup, and produces
        minimal CSS bundles through tree-shaking. Understanding Tailwind's utility-first model
        is a practical skill for most React jobs.
      </p>
      <p>
        The container/presenter pattern makes components independently testable and reusable
        across different data sources — the presenter can render mock data in Storybook, real
        data from an API, or cached data from a state manager without modification.
      </p>
    </>
  ),

  commonMistakes: [
    'Mixing controlled and uncontrolled: an input with value={state} must have an onChange handler, otherwise it\'s read-only. React warns about this.',
    'Not calling e.preventDefault() in form onSubmit — without it, the form makes an HTTP GET request and reloads the page.',
    'Using inline styles for static values — inline styles bypass Tailwind\'s purging and can\'t use media queries or pseudo-classes. Reserve for truly dynamic values.',
    'Over-engineering with compound components — most UIs don\'t need this pattern. Use it when you have complex shared state between sibling components.',
    'Putting API calls directly in presenters — breaks the container/presenter pattern. Presenters should only receive and display data, not fetch it.',
  ],

  summary: [
    'Controlled input: value={state} + onChange — React owns the value, enables real-time validation.',
    'Uncontrolled input: ref.current.value — DOM owns the value, read on demand.',
    'Tailwind CSS: utility classes in className. Co-located, no CSS files, minimal bundle via purging.',
    'CSS Modules: .module.css files with scoped class names — prevents global style collisions.',
    'Container/Presenter: container handles data, presenter handles rendering. Testable in isolation.',
    'Compound components: parent manages state, children are coordinated UI pieces (like <Select>/<Option>).',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the difference between a controlled and uncontrolled input in React? When would you use each?',
      hint: 'Controlled: value tied to state, every change goes through setState — good for validation, dependent fields. Uncontrolled: value in the DOM, read via ref on demand — good for simple, one-shot form reads where you don\'t need to react to each keystroke.',
    },
    {
      type: 'question',
      text: 'What does e.preventDefault() do in a form\'s onSubmit handler, and what happens if you forget it?',
      hint: 'It prevents the browser\'s default form submission behavior (HTTP GET/POST request + page reload). Without it, the form submits traditionally, clearing React state and potentially losing the user\'s data.',
    },
    {
      type: 'question',
      text: 'What is the container/presenter pattern, and what problem does it solve?',
      hint: 'Container: owns data fetching and state. Presenter: receives props and renders UI. Solves testability — presenters can be tested with mock props without API setup. Also enables reuse: same presenter, different data sources.',
    },
    {
      type: 'task',
      text: 'Build a controlled signup form with email, password, and confirmPassword fields. Add validation: email must contain @, password must be 8+ chars, confirmPassword must match. Show inline errors.',
      hint: 'const [form, setForm] = useState({ email: \'\', password: \'\', confirm: \'\' }). On submit, validate all fields, collect errors, display them. Only call onSubmit if no errors.',
    },
  ],
}

export default function UIPatternsStylingsPage() {
  return <FEDFTopicPage content={content} />
}
