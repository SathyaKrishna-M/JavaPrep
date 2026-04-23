'use client'

import FEDFTopicPage, { FEDFContent } from '@/components/FEDFTopicPage'

const content: FEDFContent = {
  title: 'Async Data Systems',
  subtitle: 'Data fetching lifecycle, React Query, caching, optimistic updates, and server state management',
  co: 'CO4 — State Management',

  overview: (
    <>
      <p>
        Every async operation must be modeled with three states:{' '}
        <strong className="text-white">loading</strong>, <strong className="text-white">success</strong>, and{' '}
        <strong className="text-white">error</strong>. The naive pattern — useEffect + useState — works for simple
        cases but has critical production problems: no caching (re-fetches on every mount), no deduplication
        (three components mounting simultaneously = three requests), no background refetch (data goes stale),
        and race conditions from rapid prop changes.
      </p>
      <p>
        <strong className="text-white">React Query</strong> and <strong className="text-white">SWR</strong> solve
        all of these. They treat server data as a cache with invalidation: data is fetched once, cached by key,
        and refetched in the background. Components subscribe to the cache key — not to the network request itself.
      </p>
      <p>
        <strong className="text-white">Optimistic updates</strong> apply changes immediately to the UI before the
        server confirms, then either keep the change (on success) or roll back (on error). This makes UIs feel
        instant while maintaining correctness.
      </p>
    </>
  ),

  visual: (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
        <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wider">React Query Cache Lifecycle</p>
        <div className="space-y-1 text-xs text-gray-400">
          <p><span className="text-blue-300 font-semibold">1. Mount</span> — component calls useQuery("users"). Cache miss → fetch. Cache hit → return stale data immediately + background refetch.</p>
          <p><span className="text-green-300 font-semibold">2. Success</span> — data stored in cache under key "users". All components with same key share one response.</p>
          <p><span className="text-amber-300 font-semibold">3. Stale</span> — after staleTime (default 0ms), data is stale. Refetch on window focus, network reconnect, manual invalidation.</p>
          <p><span className="text-red-300 font-semibold">4. Garbage collected</span> — after gcTime (5 min default), unused cache entries are removed.</p>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-xs">
        <p className="text-red-400 font-semibold mb-2">Naive useEffect Problems</p>
        <div className="space-y-1 text-gray-400">
          <p>✗ No caching — re-fetches on every component mount</p>
          <p>✗ No deduplication — 3 components = 3 identical requests</p>
          <p>✗ Race conditions — stale response overwrites fresh data</p>
          <p>✗ No background refetch — data goes stale after tab switch</p>
          <p>✗ No retry — a transient failure = permanent error state</p>
        </div>
      </div>
    </div>
  ),

  concepts: [
    { term: 'Server state', definition: 'Data that lives on the server, fetched asynchronously, cached, and potentially stale. Different from client state (UI toggles, form values). React Query/SWR are built specifically for server state.' },
    { term: 'Query key', definition: 'The cache key in React Query: useQuery({ queryKey: ["user", userId] }). Every unique key gets its own cache entry. Changing userId changes the key → new fetch. Same key across components → one shared cache entry.' },
    { term: 'Stale-while-revalidate', definition: 'Cache strategy: immediately return stale cached data (fast render), then fetch fresh data in the background and update. User sees data instantly; fresh data replaces it without a loading state.' },
    { term: 'Mutation', definition: 'In React Query, useMutation handles write operations (POST/PUT/DELETE). On success, call queryClient.invalidateQueries(["users"]) to mark that cache as stale → automatic background refetch.' },
    { term: 'Optimistic update', definition: 'Update the UI immediately before the server responds. If the request succeeds, confirm. If it fails, roll back to the previous state. Makes writes feel instant. Requires careful error handling.' },
    { term: 'Query invalidation', definition: 'Mark a cache entry as stale: queryClient.invalidateQueries(["users"]). Triggers an automatic background refetch for all active subscribers. The standard pattern after a mutation.' },
    { term: 'Infinite queries', definition: 'Pagination pattern for "load more" UIs. useInfiniteQuery manages multiple pages. Each page fetch adds to the cache. getNextPageParam tells React Query when to stop.' },
  ],

  code: {
    title: 'React Query — Fetch, Mutate, Optimistic Update',
    language: 'javascript',
    snippet: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Fetcher function — plain async function, no React dependency
const fetchTodos = () => fetch('/api/todos').then(r => r.json())
const createTodo  = (text) =>
  fetch('/api/todos', { method: 'POST', body: JSON.stringify({ text }) }).then(r => r.json())

function TodoApp() {
  const queryClient = useQueryClient()

  // 1. Query — automatic loading/error/success states + caching
  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],            // cache key
    queryFn: fetchTodos,
    staleTime: 30_000,              // consider fresh for 30s
  })

  // 2. Mutation — POST with optimistic update + rollback on error
  const mutation = useMutation({
    mutationFn: createTodo,
    onMutate: async (text) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      // Snapshot previous value for rollback
      const prev = queryClient.getQueryData(['todos'])
      // Optimistically update cache
      queryClient.setQueryData(['todos'], old => [
        ...old,
        { id: Date.now(), text, done: false },
      ])
      return { prev }  // return context for onError
    },
    onError: (err, text, context) => {
      // Roll back to snapshot on failure
      queryClient.setQueryData(['todos'], context.prev)
    },
    onSettled: () => {
      // Always refetch to sync with server
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  if (isLoading) return <p>Loading…</p>
  if (error)     return <p>Error: {error.message}</p>

  return (
    <div>
      {todos.map(t => <p key={t.id}>{t.text}</p>)}
      <button
        onClick={() => mutation.mutate('New task')}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Adding…' : 'Add'}
      </button>
    </div>
  )
}`,
    explanation: 'onMutate, onError, onSettled is the canonical optimistic update pattern. Snapshot before update (prev), apply optimistically, roll back if server rejects, then invalidate to sync truth from server. React Query handles deduplication — 10 components with the same queryKey make one network request.',
  },

  whyItMatters: (
    <>
      <p>
        <strong className="text-orange-300">Most React performance problems trace back to poor data fetching architecture.</strong>{' '}
        Multiple components making the same network request, refetching on every mount, showing stale data —
        these are common issues that React Query solves automatically. The queryKey cache means your data layer
        is automatically shared and deduplicated across the entire component tree.
      </p>
      <p>
        Optimistic updates are what make great UIs feel instant. Twitter's like button doesn't wait for the server —
        it increments the count immediately, makes the request in the background, and rolls back only if the server
        says no. Understanding this pattern is the difference between a "good enough" UI and a polished one.
      </p>
    </>
  ),

  commonMistakes: [
    'Fetching in useEffect without caching — every mount triggers a network request, no deduplication. 10 components with the same data = 10 requests. Use React Query.',
    'Not handling all three states — code that renders before data arrives throws "Cannot read properties of undefined". Always handle isLoading and error before accessing data.',
    'Forgetting to invalidate after mutation — after a POST/PUT/DELETE, the cache still holds stale data. Call queryClient.invalidateQueries(["resource"]) in onSettled to trigger a refetch.',
    'Optimistic update without rollback — if you apply the optimistic change but don\'t restore on error, a failed request leaves the UI in an incorrect permanent state.',
  ],

  summary: [
    'Three async states: loading, success, error. Handle all three in every component that fetches data.',
    'Naive useEffect: no caching, no deduplication, race conditions, no retry, no background refetch.',
    'React Query: cache by queryKey, one request per key regardless of how many components subscribe.',
    'Stale-while-revalidate: show cached data immediately + refetch in background → no loading flicker.',
    'useMutation: onMutate (optimistic update) → onError (rollback) → onSettled (invalidate + refetch).',
    'Invalidation: queryClient.invalidateQueries(["resource"]) after mutation marks cache stale → auto-refetch.',
  ],

  practice: [
    {
      type: 'question',
      text: 'What are the four main problems with the naive useEffect + fetch pattern that React Query solves?',
      hint: '(1) No caching — every mount re-fetches even if data was just loaded; React Query caches by queryKey and only re-fetches when stale. (2) No deduplication — 3 components fetching the same resource = 3 network requests; React Query makes 1. (3) Race conditions — rapid userId changes cause old responses to overwrite new data; React Query cancels stale requests. (4) No background refetch — data goes stale after tab switch; React Query re-fetches on window focus, network reconnect, and on a configurable staleTime.',
    },
    {
      type: 'question',
      text: 'Explain the optimistic update pattern. What are the three callbacks and what does each do?',
      hint: 'onMutate (before request fires): snapshot current cache data (for rollback), apply optimistic change to cache immediately → UI updates instantly. onError (if request fails): receive context.prev from onMutate, restore cache to snapshot → UI rolls back. onSettled (always, after success or error): call invalidateQueries → React Query refetches from server to sync truth. Full pattern: show fake fast UI → if server agrees, real data replaces it seamlessly; if server rejects, rollback to previous state.',
    },
    {
      type: 'question',
      text: 'What does stale-while-revalidate mean and why is it better than showing a loading spinner?',
      hint: 'Stale-while-revalidate: when a cached (but stale) response exists, return it immediately AND fetch a fresh version in the background. User sees data instantly (no blank loading state), and the UI updates silently when fresh data arrives. Better than spinner because: loading spinner = blank screen for network round-trip time on every navigation. SWR = instant render + silent background sync. Only show a loading state on the very first fetch when no cache exists yet.',
    },
    {
      type: 'task',
      text: 'Using React Query, write a component that fetches a list of users from /api/users and a delete button. Clicking delete should use useMutation to call DELETE /api/users/:id and automatically refetch the list.',
      hint: 'const { data: users } = useQuery({ queryKey: ["users"], queryFn: () => fetch("/api/users").then(r=>r.json()) }); const deleteUser = useMutation({ mutationFn: (id) => fetch(`/api/users/${id}`, { method: "DELETE" }), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }) }); In JSX: users?.map(u => <div key={u.id}>{u.name}<button onClick={() => deleteUser.mutate(u.id)}>Delete</button></div>)',
    },
  ],
}

export default function AsyncDataSystemsPage() {
  return <FEDFTopicPage content={content} />
}
