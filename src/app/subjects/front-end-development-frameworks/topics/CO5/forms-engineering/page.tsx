'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Forms Engineering',
  subtitle: 'Controlled vs uncontrolled inputs, validation, React Hook Form, and accessible form patterns',
  co: 'CO5 — Advanced React Patterns',

  overview: (
    <>
      <p>
        A <strong className="text-white">controlled input</strong> is one where React owns the value. The input's
        value is stored in state; every keystroke fires an onChange handler that updates state; React re-renders
        with the new value. The input is always a reflection of React state — enabling real-time validation,
        conditional fields, and computed values.
      </p>
      <p>
        An <strong className="text-white">uncontrolled input</strong> stores its value in the DOM. You read it
        via a ref only when needed (on submit). Simpler for trivial forms, but you have no real-time access to
        the value. File inputs are always uncontrolled — you cannot set their value from React.
      </p>
      <p>
        <strong className="text-white">React Hook Form (RHF)</strong> is the industry standard for production forms.
        It uses uncontrolled inputs internally (registered via ref) and only syncs state when needed — dramatically
        fewer re-renders than fully controlled forms. It integrates with Zod for schema-based validation.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">Controlled vs Uncontrolled</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-300 font-bold mb-2">Controlled</p>
            <ul className="text-gray-400 space-y-1">
              <li>✓ Validate on every keystroke</li>
              <li>✓ Conditionally enable/disable fields</li>
              <li>✓ Derive computed values from input</li>
              <li>✓ Reset form: setState("")</li>
              <li>✗ Re-renders on every keystroke</li>
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
            <p className="text-amber-300 font-bold mb-2">Uncontrolled</p>
            <ul className="text-gray-400 space-y-1">
              <li>✓ No re-renders while typing</li>
              <li>✓ File inputs (always uncontrolled)</li>
              <li>✓ Third-party DOM widgets</li>
              <li>✗ No real-time value access</li>
              <li>✗ Hard to reset/prefill</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-violet-400 font-semibold mb-2">React Hook Form — Key Concepts</p>
        <div className="space-y-1 font-mono text-gray-400">
          <p><span className="text-cyan-300">register("name")</span> — connect input to RHF (via ref)</p>
          <p><span className="text-cyan-300">handleSubmit(fn)</span> — validate then call fn with data</p>
          <p><span className="text-cyan-300">formState.errors</span> — validation error messages</p>
          <p><span className="text-cyan-300">watch("field")</span> — subscribe to field value changes</p>
          <p><span className="text-cyan-300">reset()</span> — reset form to default values</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Controlled input', definition: 'value={state} + onChange={setState}. React owns the value. Enables real-time validation, conditional fields, computed values. Re-renders on every keystroke — acceptable for most forms.' },
    { term: 'Uncontrolled input', definition: 'No value prop. DOM owns the value. Read via ref.current.value on submit. Simpler, fewer re-renders. Cannot validate in real-time. File inputs are always uncontrolled.' },
    { term: 'ref (useRef)', definition: 'A mutable container whose .current property persists across renders without triggering re-renders. Used to access DOM nodes directly: const inputRef = useRef(null); inputRef.current.focus().' },
    { term: 'Validation', definition: 'HTML5 attributes (required, minLength, pattern) for basic validation. React: validate in onChange. RHF: register("email", { required: true, pattern: /email regex/ }). Zod: schema-based validation with type inference.' },
    { term: 'React Hook Form', definition: 'Performance-first form library. Uses uncontrolled inputs internally (refs). Only re-renders on errors and submit — not on every keystroke. API: register, handleSubmit, formState.errors, watch, reset.' },
    { term: 'Zod schema', definition: 'TypeScript-first validation library. z.object({ email: z.string().email(), age: z.number().min(18) }). Integrates with RHF via @hookform/resolvers. Provides TypeScript types from schema definition.' },
    { term: 'Form accessibility', definition: 'Every input needs a <label htmlFor={id}>. Error messages need aria-describedby pointing to the input. Disabled submit button should be aria-disabled. Focus management: focus first error field on submit failure.' },
  ],

  code: {
    title: 'React Hook Form + Zod Schema Validation',
    language: 'javascript',
    snippet: `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 1. Define schema — single source of truth for validation + TypeScript types
const schema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  email:    z.string().email('Invalid email address'),
  age:      z.number({ invalid_type_error: 'Age must be a number' }).min(18, 'Must be 18+'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm:  z.string(),
}).refine(data => data.password === data.confirm, {
  message: 'Passwords do not match',
  path: ['confirm'],
})

type FormData = z.infer<typeof schema>  // TypeScript type from schema

// 2. Component
export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* 3. Register each field — RHF uses ref internally, no re-renders while typing */}
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} aria-describedby="name-error" />
        {errors.name && (
          <p id="name-error" role="alert" className="text-red-400 text-sm">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register('age', { valueAsNumber: true })} />
        {errors.age && <p role="alert">{errors.age.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering…' : 'Register'}
      </button>
    </form>
  )
}`,
    explanation: 'RHF uses refs internally — the form only re-renders when errors change or on submit, not on every keystroke. Zod schema provides both validation logic and TypeScript types (z.infer) from a single definition. aria-describedby links the error message to the input for screen readers.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Forms are where most user input goes — and most UI bugs hide.</strong>{' '}
        Poorly built forms show errors at the wrong time, re-render on every keystroke (laggy typing experience),
        fail to communicate errors to screen readers, and don't handle submission errors gracefully. A production-quality
        form handles all of these.
      </p>
      <p>
        React Hook Form + Zod is the industry-standard stack for forms in 2024. RHF handles performance (minimal
        re-renders). Zod handles validation with TypeScript integration (one schema for both runtime validation
        and compile-time types). Together they eliminate an entire category of form-related bugs.
      </p>
    </>
  ),

  commonMistakes: [
    'Validating only on submit — show errors as soon as the user leaves a field (onBlur) or while typing (onChange mode). A good UX shows errors at the earliest helpful moment.',
    'Using a controlled input without a value prop — <input value={undefined}> is treated as uncontrolled by React. The moment you add a value prop, it must be a string (use "" not null/undefined).',
    'Not associating labels with inputs — <label>Email <input /></label> works but is fragile. Always use htmlFor on label + id on input, or aria-label/aria-labelledby for icon buttons.',
    'Blocking the submit button with disabled={!isValid} from the start — users haven\'t even tried to fill the form yet. Only show errors after the user has interacted with a field.',
  ],

  summary: [
    'Controlled: value={state} + onChange={setState}. React owns value. Real-time validation. Re-renders on keystrokes.',
    'Uncontrolled: DOM owns value. Read via ref on submit. File inputs are always uncontrolled.',
    'React Hook Form: register (via ref), handleSubmit, formState.errors. No re-renders while typing.',
    'Zod: schema-based validation + TypeScript types from one definition. z.object, z.string().email(), z.number().min().',
    'Accessibility: label htmlFor + input id, aria-describedby for errors, role="alert" for dynamic error messages.',
    'Validation timing: onBlur (when user leaves field) is usually better UX than onChange (while typing) or onSubmit (too late).',
  ],

  practice: [
    {
      type: 'question',
      text: 'What is the difference between a controlled and uncontrolled input? When would you use each?',
      hint: 'Controlled: value prop set from React state + onChange updates state. React owns the value at all times. Use when: real-time validation (check email format while typing), conditional logic (show next field only if current is valid), computed values derived from input. Uncontrolled: no value prop; DOM owns value; read via ref.current.value on submit. Use when: simple forms where you only need value on submit, file inputs (always uncontrolled — cannot programmatically set file input value), third-party DOM libraries that manage their own value.',
    },
    {
      type: 'question',
      text: 'Why is React Hook Form more performant than a fully controlled form for large forms?',
      hint: 'Controlled form: every keystroke fires onChange → setState → React re-renders the entire component. For a form with 20 fields, typing "hello" in one field = 5 re-renders of the entire form. RHF: inputs are uncontrolled internally (registered via refs). Values are stored in RHF\'s internal ref (not React state). The component only re-renders when: (a) validation errors change, (b) the form is submitted. Typing 100 characters in a field = 0 re-renders of the parent component. For large forms with expensive computations, this is significant.',
    },
    {
      type: 'question',
      text: 'What are the accessibility requirements for a form input?',
      hint: '(1) Label association: <label htmlFor="email">Email</label><input id="email" /> — links label to input via id. Screenreader announces label when input is focused. (2) Error association: <input aria-describedby="email-error" /><p id="email-error" role="alert">...</p> — screenreader announces error when input is focused, and role="alert" announces it immediately when it appears. (3) Required fields: required attribute or aria-required="true". (4) Invalid state: aria-invalid="true" when validation fails. (5) Focus management: on submit failure, focus the first invalid input.',
    },
    {
      type: 'task',
      text: 'Create a login form with email and password fields using React Hook Form. Validate: email must be valid format, password must be at least 8 characters. Show inline error messages. Disable the submit button while submitting.',
      hint: 'const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(); const onSubmit = async (data) => { await loginAPI(data); }; <form onSubmit={handleSubmit(onSubmit)}><input {...register("email", { required: true, pattern: /\\S+@\\S+\\.\\S+/ })} />{errors.email && <p>Valid email required</p>}<input type="password" {...register("password", { required: true, minLength: 8 })} />{errors.password && <p>Min 8 characters</p>}<button disabled={isSubmitting}>Login</button></form>',
    },
  ],
}

export default function FormsEngineeringPage() {
  return <FEDFTopicPage content={content} />
}
