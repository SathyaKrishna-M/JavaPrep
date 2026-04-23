'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'State Architecture',
  subtitle: 'State co-location, lifting state, useReducer, and choosing the right state management strategy',
  co: 'CO4 — State Management',

  overview: (
    <>
      <p>
        <strong className="text-white">State co-location</strong> means keeping state as close as possible to the
        component that uses it. If only one component needs a piece of state, that component should own it —
        not a parent, grandparent, or global store. Only the owning component re-renders on state change;
        co-location minimises unnecessary renders.
      </p>
      <p>
        When multiple components need the same state, you <strong className="text-white">lift state up</strong> to
        the nearest common ancestor. The ancestor owns the state; children receive it via props and communicate
        changes via callbacks. This preserves unidirectional data flow while enabling sharing.
      </p>
      <p>
        <strong className="text-white">useReducer</strong> is preferable to useState when state transitions are
        complex: multiple sub-values updated together, or next state that depends on the previous in non-trivial ways.
        It centralises all update logic in one pure function, making the component easier to test.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">State Ownership Decision Tree</p>
        <div className="space-y-2 text-xs text-gray-400">
          <p>1. Does only one component need this state? → <span className="text-green-300">Co-locate inside that component</span></p>
          <p>2. Do several sibling components need it? → <span className="text-amber-300">Lift to nearest common ancestor</span></p>
          <p>3. Do distant components need it (many levels apart)? → <span className="text-violet-300">React Context or global store</span></p>
          <p>4. Is it server data (cached, async)? → <span className="text-blue-300">React Query / SWR</span></p>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-cyan-400 font-semibold mb-2">useState vs useReducer</p>
        <div className="space-y-1 text-gray-400">
          <p><span className="text-green-300">useState</span> — single value, independent updates, simple boolean/string/number</p>
          <p><span className="text-blue-300">useReducer</span> — multiple related values, updates that depend on previous state, complex transitions (form state, wizard steps, shopping cart)</p>
          <p className="text-gray-500 mt-1">Rule of thumb: if you have 3+ related useState calls that update together, switch to useReducer.</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'State co-location', definition: 'Own state in the component that uses it. Reduces re-renders (siblings unaffected), reduces prop surface area, makes the component self-contained and deletable.' },
    { term: 'Lifting state up', definition: 'Move shared state to the nearest common ancestor of all components that need it. The ancestor owns it; children receive it via props and communicate changes via callback props.' },
    { term: 'Derived state', definition: 'Values computed from existing state rather than stored separately. const fullName = `${firstName} ${lastName}` is derived — no useState needed. Redundant state causes sync bugs.' },
    { term: 'useReducer', definition: 'Hook for complex state. Takes (state, action) => newState. Centralises all state transitions in one pure function. Preferred when: multiple sub-values updated together, next state depends on previous in complex ways.' },
    { term: 'Action / Dispatch', definition: 'In useReducer, dispatch({ type: "INCREMENT", payload: 1 }) sends an action to the reducer. The reducer is a pure function that returns new state based on the action type.' },
    { term: 'State normalization', definition: 'Storing items by ID in an object (entityMap) rather than as an array. Enables O(1) lookup by ID instead of O(n) array scan. Essential for large lists where items update frequently.' },
    { term: 'Server state vs client state', definition: 'Server state (API data): async, cached, stale. Use React Query/SWR. Client state (UI state, form state): local, synchronous. Use useState/useReducer/Zustand.' },
  ],

  code: {
    title: 'Shopping Cart with useReducer',
    language: 'javascript',
    snippet: `import { useReducer } from 'react'

const initialState = { items: {}, total: 0 }

// Pure reducer — all state transitions in one place
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, name, price } = action.payload
      const existing = state.items[id]
      return {
        ...state,
        items: {
          ...state.items,
          [id]: existing
            ? { ...existing, qty: existing.qty + 1 }
            : { id, name, price, qty: 1 },
        },
        total: state.total + price,
      }
    }
    case 'REMOVE_ITEM': {
      const item = state.items[action.payload.id]
      if (!item) return state
      const newItems = { ...state.items }
      delete newItems[action.payload.id]
      return { ...state, items: newItems, total: state.total - item.price * item.qty }
    }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (product) =>
    dispatch({ type: 'ADD_ITEM', payload: product })

  // Derived state — computed, not stored
  const itemCount = Object.values(state.items).reduce((sum, i) => sum + i.qty, 0)

  return (
    <div>
      <p>{itemCount} items · £{state.total.toFixed(2)}</p>
      <button onClick={() => addItem({ id: 'p1', name: 'Pen', price: 1.5 })}>
        Add Pen
      </button>
      <button onClick={() => dispatch({ type: 'CLEAR' })}>Clear</button>
    </div>
  )
}`,
    explanation: 'State is normalised by ID (object map) for O(1) lookup instead of array scanning. itemCount is derived — computed from state, not stored separately. The reducer is a pure function: same inputs always produce the same output, making it trivially testable without mounting a component.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Poor state architecture is the leading cause of React performance problems.</strong>{' '}
        Over-lifted state (putting everything in App) causes the entire tree to re-render on every change.
        Redundant state (storing derived values in useState) causes synchronisation bugs.
        Understanding the state ownership decision tree prevents both.
      </p>
      <p>
        useReducer's reducer function is a pure function — the same inputs always produce the same output.
        This makes all state transitions unit-testable without a React component, browser, or enzyme.
        Just call reducer(state, action) and assert the result.
      </p>
    </>
  ),

  commonMistakes: [
    'Over-lifting state — putting all state in App means every state change re-renders the entire component tree. Keep state in the lowest component that needs it.',
    'Redundant state — storing derived values like fullName = firstName + " " + lastName in useState. When firstName changes, you must manually sync fullName. Compute it inline instead.',
    'Using useState for complex related state — 4 separate useStates that always update together is a signal to switch to useReducer with one object.',
    'Mutating state in the reducer — state.items[id] = newItem in a reducer is a direct mutation. Reducers must return new references: { ...state, items: { ...state.items, [id]: newItem } }.',
  ],

  summary: [
    'Co-locate state: own it in the component that uses it. Only that component re-renders on change.',
    'Lift state up when siblings need to share: move to nearest common ancestor, pass down via props.',
    'Derived state: compute from existing state rather than storing. Prevents sync bugs.',
    'useReducer: preferred over useState for complex state — centralises transitions in a pure reducer function.',
    'State normalization: store by ID in an object map for O(1) access; don\'t scan arrays for items.',
    'Server state (React Query/SWR) vs client state (useState/useReducer/Zustand) — different tools for different problems.',
  ],

  practice: [
    {
      type: 'question',
      text: 'A component stores firstName, lastName, and fullName in separate useState calls. What is the problem and how do you fix it?',
      hint: 'fullName is derived state — it can always be computed as `${firstName} ${lastName}`. Storing it separately means you must update it every time firstName or lastName changes. If you forget one update, fullName is stale. Fix: remove const [fullName, setFullName] = useState(""). Compute it inline: const fullName = `${firstName} ${lastName}`. No synchronization needed — derived state is always consistent by definition.',
    },
    {
      type: 'question',
      text: 'When would you use useReducer instead of useState? Give a concrete example.',
      hint: 'useReducer is preferred when: (1) multiple state values that update together (form state: value, error, touched, isSubmitting — 4 related fields), (2) next state depends on previous in complex ways, (3) same update logic is needed in multiple places. Example: a multi-step form wizard. dispatch({ type: "NEXT_STEP", payload: formValues }) transitions through states cleanly. With useState you\'d need setStep, setFormValues, setErrors all called together — easy to forget one.',
    },
    {
      type: 'question',
      text: 'Explain state normalization. Why is storing items by ID better than an array for frequently-updated lists?',
      hint: 'Array: to find an item, scan from index 0 → O(n). To update an item, arr.map(item => item.id === id ? updated : item) → O(n). For 10,000 items updated frequently, this is expensive. Normalized (object map): { [id]: item }. Find: items[id] → O(1). Update: { ...items, [id]: updated } → O(1). Delete: remove one key → O(1). Trade-off: harder to render in order (need Object.values() or maintain a separate ids array). Redux recommends normalization for any entity that is frequently looked up by ID.',
    },
    {
      type: 'task',
      text: 'Convert this to use useReducer: const [count, setCount] = useState(0); const [step, setStep] = useState(1); const [max, setMax] = useState(10). Increment/decrement by step, don\'t exceed max.',
      hint: 'const initialState = { count: 0, step: 1, max: 10 }; function reducer(state, action) { switch(action.type) { case "INCREMENT": return { ...state, count: Math.min(state.count + state.step, state.max) }; case "DECREMENT": return { ...state, count: Math.max(state.count - state.step, 0) }; case "SET_STEP": return { ...state, step: action.payload }; } } const [state, dispatch] = useReducer(reducer, initialState);',
    },
  ],
}

export default function StateArchitecturePage() {
  return <FEDFTopicPage content={content} />
}
