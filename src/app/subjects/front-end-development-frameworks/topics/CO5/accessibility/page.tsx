'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Accessibility',
  subtitle: 'Building React UIs that work for everyone',
  co: 'CO5 — Routing, Forms & Performance',

  overview: (
    <>
      <p>
        Accessibility (a11y) is about building UIs that work for users with disabilities —
        those who use screen readers, keyboard-only navigation, voice control, or other
        assistive technologies. It's also about legal compliance: the WCAG 2.1 guidelines
        are referenced in accessibility laws in the US (ADA), UK, and EU.
      </p>
      <p>
        React's component model makes accessibility both easier and harder: easier because
        you can build accessible components once and reuse them everywhere; harder because
        React apps can be entirely JavaScript-rendered, losing the semantic HTML that
        assistive technologies depend on.
      </p>
      <p>
        The three pillars of accessible React: <strong className="text-white">semantic HTML</strong>{' '}
        (use the right elements), <strong className="text-white">ARIA attributes</strong>{' '}
        (add meaning when semantics aren't enough), and{' '}
        <strong className="text-white">keyboard/focus management</strong> (every interactive
        element reachable and operable via keyboard).
      </p>
      <p className="text-gray-400 italic border-l-2 border-pink-500/40 pl-3">
        Real-world analogy: Accessibility is like building with proper ramps and elevators.
        You don't build them just for wheelchair users — they benefit people pushing strollers,
        delivery workers with carts, and anyone with a temporary injury. Better design for everyone.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">Semantic HTML vs. Div Soup</p>
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 font-sans font-bold mb-1">❌ Inaccessible</p>
            <p className="text-gray-400">{'<div onClick={submit}>'}</p>
            <p className="pl-2 text-gray-400">{'Submit'}</p>
            <p className="text-gray-400">{'</div>'}</p>
            <p className="text-red-300 font-sans mt-1">Not focusable. Not announced as button. No keyboard support.</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 font-sans font-bold mb-1">✓ Accessible</p>
            <p className="text-gray-400">{'<button'}</p>
            <p className="pl-2 text-gray-400">{'type="submit"'}</p>
            <p className="pl-2 text-gray-400">{'onClick={submit}'}</p>
            <p className="text-gray-400">{'>'}</p>
            <p className="pl-2 text-gray-400">{'Submit'}</p>
            <p className="text-gray-400">{'</button>'}</p>
            <p className="text-green-300 font-sans mt-1">Focusable, keyboard operable, announced correctly.</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-amber-400 font-semibold mb-2">Key ARIA Attributes</p>
        <div className="space-y-1.5">
          {[
            { attr: 'aria-label',       use: 'Names an element without visible text: <button aria-label="Close modal">' },
            { attr: 'aria-describedby', use: 'Points to an element that describes this one: error messages for inputs' },
            { attr: 'aria-live',        use: '"polite" | "assertive" — announces dynamic content to screen readers' },
            { attr: 'aria-hidden',      use: 'Removes decorative elements from accessibility tree' },
            { attr: 'aria-expanded',    use: 'Indicates open/closed state of accordions, dropdowns, menus' },
          ].map(({ attr, use }) => (
            <div key={attr} className="flex gap-3">
              <code className="text-pink-300 shrink-0 w-36">{attr}</code>
              <span className="text-gray-400">{use}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'WCAG',             definition: 'Web Content Accessibility Guidelines. The international standard. WCAG 2.1 AA is the typical legal requirement. Covers perceivable, operable, understandable, robust.' },
    { term: 'Semantic HTML',    definition: 'Using HTML elements for their meaning: <button> for buttons, <nav> for navigation, <main> for main content. Screen readers use semantics to navigate and announce.' },
    { term: 'ARIA',             definition: 'Accessible Rich Internet Applications. Attributes (aria-*) that add accessibility semantics when HTML alone is insufficient. First rule: use semantic HTML instead if possible.' },
    { term: 'Focus management', definition: 'Controlling which element has keyboard focus, especially when content changes dynamically. After opening a modal: move focus in. After closing: return focus to the trigger.' },
    { term: 'Tab order',        definition: 'The sequence keyboard users navigate through interactive elements. Should follow the visual reading order. tabIndex="-1" removes from order; tabIndex="0" adds to it naturally.' },
    { term: 'aria-live',        definition: 'Makes a region announce dynamic content updates to screen readers. "polite": waits for user to be idle. "assertive": interrupts immediately. Use for status/error messages.' },
    { term: 'Color contrast',   definition: 'WCAG AA requires 4.5:1 contrast ratio for normal text, 3:1 for large text. Insufficient contrast fails users with low vision. Check with browser DevTools.' },
  ],

  code: {
    title: 'Accessible Modal + Form — React Patterns',
    language: 'jsx',
    snippet: `// ── Accessible form fields ───────────────────────────────────
function FormField({ id, label, error, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>   {/* always link label to input */}
      <input
        id={id}
        aria-describedby={error ? \`\${id}-error\` : undefined}
        aria-invalid={!!error}
        {...inputProps}
      />
      {error && (
        <p
          id={\`\${id}-error\`}
          role="alert"                       {/* screen reader announces immediately */}
          className="text-red-500 text-sm"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ── Accessible modal with focus trap ─────────────────────────
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;  // save current focus
      modalRef.current?.focus();                           // move focus into modal
    } else {
      previousFocusRef.current?.focus();                   // restore on close
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}                                        // make div focusable
      onKeyDown={e => e.key === 'Escape' && onClose()}    // Esc to close
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-lg p-6">
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close modal">✕</button>
      </div>
    </div>
  );
}

// ── Live region for async status ──────────────────────────────
function StatusMessage({ message }) {
  return (
    <div
      role="status"        // polite live region
      aria-live="polite"
      className="sr-only"  // visually hidden but announced by screen readers
    >
      {message}
    </div>
  );
}`,
    explanation: 'Focus management in the Modal is critical: without it, keyboard users who open the modal still interact with content behind it. The Escape key handler is expected behavior for all modal dialogs.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">15-20% of users have some form of disability.</strong>{' '}
        This isn't a niche concern — it's a significant portion of your users. Beyond ethics,
        inaccessible applications expose companies to legal risk (ADA lawsuits in the US are
        increasing) and result in lower SEO scores (Google considers accessibility signals).
      </p>
      <p>
        Accessibility skills are increasingly valued in frontend job postings. Companies
        like Apple, Google, and Microsoft have dedicated accessibility teams. Being able to
        build accessible components is a differentiator in interviews and on the job.
      </p>
      <p>
        Test with a keyboard: Tab through your UI. Can you reach every interactive element?
        Can you activate it? Then test with a screen reader: VoiceOver (Mac), NVDA (Windows),
        or the ChromeVox extension. Five minutes of testing reveals most issues.
      </p>
    </>
  ),

  commonMistakes: [
    'Using <div onClick> instead of <button> for interactive elements — divs are not focusable, not in tab order, not announced as interactive by screen readers.',
    'Missing label/htmlFor association — screen readers read the label when announcing the input. Placeholder text disappears on focus and is not a label substitute.',
    'Not managing focus when content changes dynamically — opening a modal without moving focus leaves keyboard users outside the modal, interacting with content behind it.',
    'Removing focus outlines with outline: none without providing an alternative — keyboard users have no visual indication of where they are.',
    'Using color alone to convey meaning — red text for errors fails users with color blindness. Always pair color with another indicator (icon, text, border).',
  ],

  summary: [
    'Semantic HTML first: <button>, <nav>, <main>, <form> communicate meaning without ARIA.',
    'ARIA fills the gaps: aria-label, aria-describedby, aria-live for dynamic content.',
    'Focus management: move focus into modals on open, return to trigger on close.',
    'Keyboard navigation: every interactive element reachable via Tab, operable via Enter/Space.',
    'aria-invalid + aria-describedby + role="alert": accessible form error pattern.',
    'Color contrast: 4.5:1 for normal text. Test with DevTools or axe browser extension.',
  ],

  practice: [
    {
      type: 'question',
      text: 'Why should you use <button> instead of <div onClick> for interactive elements?',
      hint: '<button> is in the tab order by default, triggers on Enter/Space, and is announced as "button" by screen readers. A <div> has none of these properties unless you manually add tabIndex="0", onKeyDown, and role="button" — recreating what <button> gives you for free.',
    },
    {
      type: 'question',
      text: 'What is focus management and why is it critical for modal dialogs?',
      hint: 'Focus management = controlling which element has keyboard focus when content changes. Without it, a keyboard user who opens a modal is still focused on the trigger behind it — Tab takes them into the page background, not the modal content. On close, return focus to the trigger so they can continue where they left off.',
    },
    {
      type: 'question',
      text: 'What is aria-live and when would you use it?',
      hint: 'An attribute that tells screen readers to announce changes to a region without the user navigating there. Use for: form submission status ("Saved"), notification toasts, search result counts, loading completion. "polite" waits for idle; "assertive" interrupts immediately (use sparingly).',
    },
    {
      type: 'task',
      text: 'Audit an existing form or component for accessibility: check for missing labels, wrong element types, focus management. Run the axe DevTools extension and fix the reported issues.',
      hint: 'Install axe DevTools Chrome extension. Run it on your page. Common issues: image missing alt, input missing label, insufficient color contrast, interactive non-button elements. Fix each one, re-run until clean.',
    },
  ],
}

export default function AccessibilityPage() {
  return <FEDFTopicPage content={content} />
}
