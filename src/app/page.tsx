'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  FiCpu, FiGitBranch, FiCode, FiBarChart2, FiRadio,
  FiBook, FiActivity, FiArrowRight, FiLayers, FiGlobe,
} from 'react-icons/fi'
import { FaJava, FaDatabase, FaCalculator } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'
import {
  subscribeActivity, subscribeLeaderboard, subscribeUserProgress,
  ActivityItem, LeaderItem, SUBJECT_TOTAL_TOPICS,
} from '@/lib/db'

// ─── Types ───────────────────────────────────────────────────────────────────

type AccentKey = 'violet' | 'rose' | 'emerald' | 'amber' | 'cyan' | 'blue' | 'purple'

interface Subject {
  id: string
  title: string
  desc: string
  Icon: React.ComponentType<{ className?: string }>
  href: string
  accent: AccentKey
  lessons: number
  hours: number
  progress: number
}

// ─── Accent palette ──────────────────────────────────────────────────────────

const ACCENTS: Record<AccentKey, { border: string; glow: string; text: string; progress: string; bg: string }> = {
  violet: { border: 'border-violet-500/30', glow: 'hover:shadow-violet-500/15', text: 'text-violet-400', progress: 'bg-violet-500', bg: 'bg-violet-500/10' },
  rose:   { border: 'border-rose-500/30',   glow: 'hover:shadow-rose-500/15',   text: 'text-rose-400',   progress: 'bg-rose-500',   bg: 'bg-rose-500/10'   },
  emerald:{ border: 'border-emerald-500/30',glow: 'hover:shadow-emerald-500/15',text: 'text-emerald-400',progress: 'bg-emerald-500',bg: 'bg-emerald-500/10' },
  amber:  { border: 'border-amber-500/30',  glow: 'hover:shadow-amber-500/15',  text: 'text-amber-400',  progress: 'bg-amber-500',  bg: 'bg-amber-500/10'  },
  cyan:   { border: 'border-cyan-500/30',   glow: 'hover:shadow-cyan-500/15',   text: 'text-cyan-400',   progress: 'bg-cyan-500',   bg: 'bg-cyan-500/10'   },
  blue:   { border: 'border-blue-500/30',   glow: 'hover:shadow-blue-500/15',   text: 'text-blue-400',   progress: 'bg-blue-500',   bg: 'bg-blue-500/10'   },
  purple: { border: 'border-purple-500/30', glow: 'hover:shadow-purple-500/15', text: 'text-purple-400', progress: 'bg-purple-500', bg: 'bg-purple-500/10'  },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SEMESTERS: { id: string; label: string; subjects: Subject[] }[] = [
  {
    id: 'third',
    label: '25-26 3rd Sem',
    subjects: [
      { id: 'computational-foundations-ai',     title: 'Computational Foundations for AI',     desc: 'AI agents, search algorithms, CSP, game trees, and Bayesian networks.',        Icon: FiCpu,       href: '/subjects/computational-foundations-ai',     accent: 'violet',  lessons: 32, hours: 24, progress: 28 },
      { id: 'data-structures-algorithms-2',     title: 'Data Structures & Algorithms 2',       desc: 'Trees, graphs, advanced sorting, greedy algorithms, and dynamic programming.', Icon: FiGitBranch, href: '/subjects/data-structures-algorithms-2',     accent: 'cyan',    lessons: 36, hours: 28, progress: 54 },
      { id: 'front-end-development-frameworks', title: 'Front-End Development Frameworks',      desc: 'React, TypeScript, state management, hooks, build systems, and routing.',      Icon: FiCode,      href: '/subjects/front-end-development-frameworks', accent: 'rose',    lessons: 30, hours: 22, progress: 67 },
      { id: 'mathematics-data-science',         title: 'Mathematics for Data Science',          desc: 'Statistics, probability, hypothesis testing, and distributions.',              Icon: FiBarChart2, href: '/subjects/mathematics-data-science',         accent: 'emerald', lessons: 26, hours: 20, progress: 33 },
      { id: 'mathematics-communication-systems',title: 'Mathematics for Communication Systems', desc: 'Signal representation, Fourier analysis, LTI systems, and Shannon capacity.',  Icon: FiRadio,     href: '/subjects/mathematics-communication-systems', accent: 'amber',   lessons: 24, hours: 18, progress: 8  },
    ],
  },
  {
    id: 'odd',
    label: '25-26 Odd Sem',
    subjects: [
      { id: 'data-structures',    title: 'Data Structures in Java',          desc: 'Arrays, linked lists, stacks, queues, trees, and algorithm complexity analysis.',       Icon: FaDatabase   as React.ComponentType<{ className?: string }>, href: '/subjects/data-structures',    accent: 'emerald', lessons: 28, hours: 22, progress: 55 },
      { id: 'web-development',    title: 'Fundamentals of Web Development',  desc: 'Build modern responsive websites with HTML, CSS, JavaScript, and React.',              Icon: FiGlobe,                                                      href: '/subjects/web-development',    accent: 'rose',    lessons: 26, hours: 18, progress: 70 },
      { id: 'mathematics-for-ai', title: 'Mathematics for AI',               desc: 'Vectors, calculus, optimization, and the mathematical foundations of neural networks.', Icon: FaCalculator as React.ComponentType<{ className?: string }>, href: '/subjects/mathematics-for-ai', accent: 'purple',  lessons: 22, hours: 16, progress: 30 },
    ],
  },
  {
    id: 'even',
    label: '25-26 Even Sem',
    subjects: [
      { id: 'java',                 title: 'Java Programming',                              desc: 'Master Java with interactive examples, visualizations, and exam-focused exercises.',    Icon: FaJava   as React.ComponentType<{ className?: string }>, href: '/subjects/java',                 accent: 'amber',  lessons: 30, hours: 24, progress: 62 },
      { id: 'digital-system-design',title: 'Digital Design & Computer Architecture',        desc: 'Digital logic design, circuit optimization, and programmable devices.',                Icon: FiCpu,                                                   href: '/subjects/digital-system-design', accent: 'blue',   lessons: 28, hours: 20, progress: 45 },
      { id: 'discrete-mathematics', title: 'Discrete Mathematics',                          desc: 'Sets, relations, functions, lattices, and discrete structures with visual aids.',      Icon: FiLayers,                                                href: '/subjects/discrete-mathematics',  accent: 'violet', lessons: 24, hours: 18, progress: 38 },
    ],
  },
]

// Avatar colours cycled by first char of name
const AVATAR_COLORS = [
  'bg-blue-500','bg-violet-500','bg-emerald-500','bg-amber-500',
  'bg-rose-500','bg-cyan-500','bg-pink-500','bg-orange-500',
]
function avatarColor(name: string) {
  const idx = (name.charCodeAt(0) || 0) % AVATAR_COLORS.length
  return AVATAR_COLORS[idx]
}

function timeAgo(ts: { seconds: number } | null): string {
  if (!ts) return 'just now'
  const diff = Math.floor(Date.now() / 1000 - ts.seconds)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

const CODE_LINES: { text: string; cls: string }[] = [
  { text: '// Binary search — find target in O(log n)', cls: 'text-gray-500' },
  { text: 'function search(arr, target) {',             cls: 'text-gray-200' },
  { text: '  let lo = 0, hi = arr.length - 1;',        cls: 'text-gray-200' },
  { text: '  while (lo <= hi) {',                       cls: 'text-gray-200' },
  { text: '    const mid = (lo + hi) >> 1;',            cls: 'text-gray-200' },
  { text: '    if (arr[mid] === target) return mid;',   cls: 'text-sky-300'  },
  { text: '    arr[mid] < target',                      cls: 'text-gray-200' },
  { text: '      ? lo = mid + 1 : hi = mid - 1;',      cls: 'text-gray-200' },
  { text: '  }',                                        cls: 'text-gray-200' },
  { text: '  return -1;',                               cls: 'text-gray-200' },
  { text: '}',                                          cls: 'text-gray-200' },
  { text: '',                                           cls: ''              },
  { text: '// ✓ 12 tests passing · 0.4ms avg',         cls: 'text-emerald-400' },
]

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    const step = (now: number) => {
      if (!startTime) startTime = now
      const t = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(target * ease))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroStats({ totalUsers, totalCompleted }: { totalUsers: number; totalCompleted: number }) {
  const [seen, setSeen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (totalUsers > 0 || totalCompleted > 0) setSeen(true)
  }, [totalUsers, totalCompleted])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setSeen(true)
    })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const uCount = useCountUp(totalUsers,    1400, seen)
  const cCount = useCountUp(totalCompleted,1800, seen)

  if (totalUsers === 0 && totalCompleted === 0) return null

  return (
    <div ref={ref} className="flex flex-wrap justify-center lg:justify-start gap-10 mt-12 pt-12 border-t border-white/10">
      {[
        { val: uCount.toLocaleString(), label: 'Learners on platform' },
        { val: cCount.toLocaleString(), label: 'Topics completed'     },
      ].map((s) => (
        <div key={s.label} className="text-center lg:text-left">
          <div className="text-3xl font-bold text-white font-mono tabular-nums">{s.val}</div>
          <div className="text-sm text-gray-400 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function CodeDemo() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= CODE_LINES.length) return
    const tid = setTimeout(() => setVisible(v => v + 1), 190)
    return () => clearTimeout(tid)
  }, [visible])

  return (
    <div className="w-full max-w-lg bg-[#141820] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-[#0f1218]">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-4 text-xs text-gray-600 font-mono">lessons/algorithms/binary-search.js</span>
      </div>
      <div className="p-5 font-mono text-sm leading-7 min-h-[260px]">
        {CODE_LINES.slice(0, visible).map((line, i) => (
          <div key={i} className={line.cls || 'text-gray-200'}>
            {line.text || ' '}
          </div>
        ))}
        {visible < CODE_LINES.length && (
          <span className="inline-block w-[2px] h-[1.1em] bg-blue-400 align-middle animate-pulse" />
        )}
      </div>
    </div>
  )
}

function SubjectCard({ subject, completedTopics }: { subject: Subject; completedTopics: string[] }) {
  const [animProgress, setAnimProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const accent = ACCENTS[subject.accent]

  const total = SUBJECT_TOTAL_TOPICS[subject.id] ?? 1
  const pct = Math.round((completedTopics.length / total) * 100)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setAnimProgress(pct), 200)
        io.disconnect()
      }
    }, { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [pct])

  return (
    <Link href={subject.href} className="block h-full">
      <div
        ref={ref}
        className={`group flex flex-col h-full p-6 rounded-2xl bg-white/[0.03] border ${accent.border} hover:shadow-xl ${accent.glow} transition-all duration-300 hover:-translate-y-1`}
      >
        <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center mb-4 flex-shrink-0`}>
          <subject.Icon className={`w-5 h-5 ${accent.text}`} />
        </div>

        <h3 className="font-semibold text-white text-[0.95rem] leading-snug mb-2">{subject.title}</h3>
        <p className="text-gray-400 text-sm flex-1 mb-4 leading-relaxed">{subject.desc}</p>

        <div className="text-xs text-gray-600 flex items-center gap-1.5 mb-3">
          <span>{subject.lessons} lessons</span>
          <span>·</span>
          <span>{subject.hours}h</span>
          <span>·</span>
          <span className={pct > 0 ? accent.text : 'text-gray-600'}>
            {completedTopics.length}/{total} completed
          </span>
        </div>

        <div className="h-1 rounded-full bg-white/8 mb-4 overflow-hidden">
          <div
            className={`h-full rounded-full ${accent.progress} transition-all duration-700 ease-out`}
            style={{ width: `${animProgress}%` }}
          />
        </div>

        <div className={`flex items-center gap-1 text-xs font-medium ${accent.text} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
          Explore Module <FiArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSem, setActiveSem] = useState('third')
  const activeSemester = SEMESTERS.find(s => s.id === activeSem)!
  const { currentUser } = useAuth()

  // Real-time activity feed
  const [activity, setActivity] = useState<ActivityItem[]>([])
  useEffect(() => subscribeActivity(setActivity), [])

  // Real-time leaderboard
  const [leaderboard, setLeaderboard] = useState<LeaderItem[]>([])
  useEffect(() => subscribeLeaderboard(setLeaderboard), [])

  // Real user progress (keyed by subjectId → completed topic slugs)
  const [userProgress, setUserProgress] = useState<Record<string, string[]>>({})
  useEffect(() => {
    if (!currentUser) { setUserProgress({}); return }
    return subscribeUserProgress(currentUser.uid, setUserProgress)
  }, [currentUser])

  // Aggregate stats from leaderboard (total users = leaderboard size, total completed from activity)
  const totalUsers = leaderboard.length
  const totalCompleted = leaderboard.reduce((sum, l) => sum + Math.round(l.pts / 10), 0)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex items-center gap-4 justify-center lg:justify-start mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-2xl scale-110" />
                  <Image
                    src="/logo.svg"
                    alt="BabuHub"
                    width={80}
                    height={80}
                    className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_24px_rgba(59,130,246,0.6)]"
                    priority
                  />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 via-blue-100 to-white bg-clip-text text-transparent tracking-wide">
                    BabuHub
                  </div>
                  <div className="text-xs text-gray-500 font-mono tracking-widest mt-0.5">LEARN · PRACTICE · MASTER</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 text-sm text-gray-400 font-mono mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                LIVE · 1,284 learning right now
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 tracking-tight"
              >
                <span className="text-white">Practice.</span>{' '}
                <br className="hidden lg:block" />
                <span className="text-white">Understand.</span>{' '}
                <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Master.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Learn programming and digital design through interactive visual lessons —
                built for how your brain actually learns.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                <a
                  href="#subjects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  Start Learning <FiArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://alootype.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium transition-all duration-200"
                >
                  Practice Typing
                </a>
              </motion.div>

              <HeroStats totalUsers={totalUsers} totalCompleted={totalCompleted} />
            </div>

            {/* Right: code demo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex-1 flex justify-center lg:justify-end w-full"
            >
              <CodeDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section id="subjects" className="py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-xs font-mono text-gray-600 tracking-widest uppercase mb-3">// Curriculum</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Subjects</h2>
            <p className="text-gray-400 max-w-md mx-auto">Choose a subject to start your learning journey.</p>
          </motion.div>

          {/* Semester tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-0 p-1 rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner">
              {SEMESTERS.map(sem => {
                const active = activeSem === sem.id
                return (
                  <button
                    key={sem.id}
                    onClick={() => setActiveSem(sem.id)}
                    className="relative px-7 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 focus:outline-none"
                  >
                    {/* Sliding background */}
                    {active && (
                      <motion.div
                        layoutId="semPill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {/* Label */}
                    <span className={`relative z-10 transition-colors duration-200 ${
                      active ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}>
                      {sem.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {activeSemester.subjects.map((subject, i) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="h-full"
                >
                  <SubjectCard
                    subject={subject}
                    completedTopics={userProgress[subject.id] ?? []}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Why BabuHub ── */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-xs font-mono text-gray-600 tracking-widest uppercase mb-3">// Why BabuHub</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Built for how you actually learn</h2>
            <p className="text-gray-400 max-w-md mx-auto">Everything you need to master programming and digital design — in one place.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', Icon: FiBook,     color: 'text-blue-400',    bg: 'bg-blue-500/10',    title: 'Read Concepts',     desc: 'Learn with clear, visual explanations and crisp, focused notes.' },
              { num: '02', Icon: FiCode,     color: 'text-violet-400',  bg: 'bg-violet-500/10',  title: 'Practice Examples', desc: 'Real coding exercises and interactive runtimes — no scratchpad required.' },
              { num: '03', Icon: FiActivity, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'Track Progress',    desc: 'See your learning curve, keep a streak, and celebrate each unit mastered.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="absolute top-6 right-6 font-mono text-xs text-gray-700">{item.num}</span>
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-6`}>
                  <item.Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Activity + Leaderboard ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Activity */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live activity
                </div>
              </div>

              {activity.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-8">
                  No activity yet — complete a topic to appear here!
                </p>
              ) : (
                <div className="space-y-4">
                  {activity.map((a) => (
                    <div key={a.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${avatarColor(a.userName)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {a.userInitials}
                      </div>
                      <div className="flex-1 min-w-0 text-sm text-gray-300">
                        <span className="text-white font-medium">{a.userName}</span>{' '}
                        {a.action}{' '}
                        <span className="text-xs font-mono bg-white/5 px-1.5 py-0.5 rounded text-blue-300">{a.topicTitle}</span>
                        {' '}in <span className="text-gray-400">{a.subjectTitle}</span>
                      </div>
                      <span className="text-xs text-gray-600 flex-shrink-0 whitespace-nowrap">
                        {timeAgo(a.timestamp as { seconds: number } | null)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="flex items-center gap-2 text-white font-semibold mb-6">
                🏆 This week&apos;s leaders
              </div>

              {leaderboard.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-8">
                  No rankings yet — complete topics to earn XP!
                </p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((l, i) => {
                    const isYou = currentUser?.uid === l.id
                    return (
                      <div
                        key={l.id}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          isYou
                            ? 'bg-blue-500/10 border border-blue-500/20'
                            : 'hover:bg-white/[0.04]'
                        }`}
                      >
                        <span className={`w-6 text-sm font-mono font-bold text-center tabular-nums ${i < 3 ? 'text-amber-400' : 'text-gray-600'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className={`w-8 h-8 rounded-full ${avatarColor(l.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {l.initials}
                        </div>
                        <span className="flex-1 text-sm text-gray-300">
                          {l.name}{isYou && <span className="text-gray-500"> (you)</span>}
                        </span>
                        <span className="text-sm font-mono text-gray-400 tabular-nums">{l.pts.toLocaleString()} XP</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-blue-600/15 via-cyan-600/10 to-blue-600/15 border border-blue-500/20"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Ready to start learning?</h3>
              <p className="text-gray-400 text-sm">Pick a subject, open a lesson, and start practicing in under a minute.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="#subjects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
              >
                Start Learning <FiArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#subjects"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium transition-all"
              >
                Browse subjects
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
