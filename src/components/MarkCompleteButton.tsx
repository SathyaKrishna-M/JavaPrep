'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiCheck, FiLock } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { completeTopic, isTopicCompleted } from '@/lib/db'

interface Props {
  topicTitle: string
  subjectId?: string  // override; falls back to URL segment
}

export default function MarkCompleteButton({ topicTitle, subjectId: subjectIdProp }: Props) {
  const { currentUser } = useAuth()
  const pathname = usePathname() ?? ''

  // Derive subjectId and topicSlug from URL
  // e.g. /subjects/computational-foundations-ai/topics/CO1/intro-ai-agents
  const segments = pathname.split('/').filter(Boolean)
  const subjectId = subjectIdProp ?? segments[1] ?? ''
  const topicSlug = segments[segments.length - 1] ?? ''

  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!currentUser || !subjectId || !topicSlug) { setChecked(true); return }
    isTopicCompleted(currentUser.uid, subjectId, topicSlug)
      .then(v => { setDone(v); setChecked(true) })
      .catch(() => setChecked(true))
  }, [currentUser, subjectId, topicSlug])

  if (!checked) return null

  if (!currentUser) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:border-white/20 hover:text-white transition-all"
      >
        <FiLock className="w-4 h-4" />
        Sign in to track progress
      </Link>
    )
  }

  if (done) {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
        <FiCheck className="w-4 h-4" />
        Completed · +10 XP earned
      </div>
    )
  }

  return (
    <button
      onClick={async () => {
        if (loading || !currentUser) return
        setLoading(true)
        try {
          await completeTopic(
            currentUser.uid,
            subjectId,
            topicSlug,
            topicTitle,
            { displayName: currentUser.displayName, email: currentUser.email }
          )
          setDone(true)
        } finally {
          setLoading(false)
        }
      }}
      disabled={loading}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <FiCheck className="w-4 h-4" />
      {loading ? 'Saving…' : 'Mark as Complete · +10 XP'}
    </button>
  )
}
