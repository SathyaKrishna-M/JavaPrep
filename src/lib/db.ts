import { db } from './firebase'
import {
  doc, getDoc, setDoc, updateDoc, addDoc,
  collection, query, orderBy, limit, onSnapshot,
  serverTimestamp, increment, arrayUnion, Timestamp,
  DocumentData,
} from 'firebase/firestore'

// ─── Constants ────────────────────────────────────────────────────────────────

export const SUBJECT_TOTAL_TOPICS: Record<string, number> = {
  'computational-foundations-ai':     25,
  'data-structures-algorithms-2':     25,
  'front-end-development-frameworks': 22,
  'mathematics-data-science':         18,
  'mathematics-communication-systems':14,
  'data-structures':                  29,
  'web-development':                  36,
  'mathematics-for-ai':               24,
  'java':                             69,
  'digital-system-design':            34,
  'discrete-mathematics':             24,
}

export const SUBJECT_TITLES: Record<string, string> = {
  'computational-foundations-ai':     'Computational Foundations for AI',
  'data-structures-algorithms-2':     'Data Structures & Algorithms 2',
  'front-end-development-frameworks': 'Front-End Development Frameworks',
  'mathematics-data-science':         'Mathematics for Data Science',
  'mathematics-communication-systems':'Mathematics for Comm. Systems',
  'data-structures':                  'Data Structures in Java',
  'web-development':                  'Web Development',
  'mathematics-for-ai':               'Mathematics for AI',
  'java':                             'Java Programming',
  'digital-system-design':            'Digital System Design',
  'discrete-mathematics':             'Discrete Mathematics',
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ActivityItem {
  id: string
  userId: string
  userName: string
  userInitials: string
  action: string
  topicTitle: string
  subjectTitle: string
  subjectId: string
  timestamp: Timestamp | null
}

export interface LeaderItem {
  id: string
  name: string
  initials: string
  pts: number
  photoURL?: string | null
}

// ─── Week key ─────────────────────────────────────────────────────────────────

function getWeekKey(): string {
  const d = new Date()
  const jan1 = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U'
}

// ─── User bootstrap ───────────────────────────────────────────────────────────

export async function ensureUserDoc(user: {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
}) {
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)
  const weekKey = getWeekKey()

  if (!snap.exists()) {
    const displayName = user.displayName || user.email?.split('@')[0] || 'User'
    await setDoc(ref, {
      displayName,
      email: user.email,
      photoURL: user.photoURL,
      totalXp: 0,
      weeklyXp: 0,
      weekKey,
      createdAt: serverTimestamp(),
    })
  } else {
    const data = snap.data()
    if (data.weekKey !== weekKey) {
      await updateDoc(ref, { weeklyXp: 0, weekKey })
    }
    // Keep photoURL / displayName fresh from auth
    const updates: DocumentData = {}
    if (user.displayName && user.displayName !== data.displayName) updates.displayName = user.displayName
    if (user.photoURL && user.photoURL !== data.photoURL) updates.photoURL = user.photoURL
    if (Object.keys(updates).length) await updateDoc(ref, updates)
  }
}

// ─── Topic completion ─────────────────────────────────────────────────────────

export async function completeTopic(
  userId: string,
  subjectId: string,
  topicSlug: string,
  topicTitle: string,
  userInfo: { displayName: string | null; email: string | null }
) {
  const progressRef = doc(db, 'users', userId, 'progress', subjectId)
  const snap = await getDoc(progressRef)
  const already = snap.exists() && (snap.data().completedTopics as string[] ?? []).includes(topicSlug)

  if (already) return false

  const name = userInfo.displayName || userInfo.email?.split('@')[0] || 'User'
  const initials = getInitials(name)

  // Record progress
  await setDoc(progressRef, {
    subjectId,
    completedTopics: arrayUnion(topicSlug),
    updatedAt: serverTimestamp(),
  }, { merge: true })

  // Award XP
  await updateDoc(doc(db, 'users', userId), {
    totalXp: increment(10),
    weeklyXp: increment(10),
  })

  // Activity feed entry
  await addDoc(collection(db, 'activity'), {
    userId,
    userName: name,
    userInitials: initials,
    action: 'completed',
    topicTitle,
    subjectTitle: SUBJECT_TITLES[subjectId] ?? subjectId,
    subjectId,
    timestamp: serverTimestamp(),
  })

  return true
}

// ─── Real-time subscriptions ──────────────────────────────────────────────────

export function subscribeActivity(callback: (items: ActivityItem[]) => void): () => void {
  const q = query(collection(db, 'activity'), orderBy('timestamp', 'desc'), limit(8))
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() } as ActivityItem)))
  }, () => callback([]))
}

export function subscribeLeaderboard(callback: (items: LeaderItem[]) => void): () => void {
  const q = query(collection(db, 'users'), orderBy('weeklyXp', 'desc'), limit(5))
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => {
      const data = d.data()
      const name = data.displayName || 'User'
      return {
        id: d.id,
        name,
        initials: getInitials(name),
        pts: data.weeklyXp ?? 0,
        photoURL: data.photoURL ?? null,
      }
    }))
  }, () => callback([]))
}

export function subscribeUserProgress(
  userId: string,
  callback: (progress: Record<string, string[]>) => void
): () => void {
  return onSnapshot(
    collection(db, 'users', userId, 'progress'),
    snap => {
      const map: Record<string, string[]> = {}
      snap.docs.forEach(d => {
        map[d.id] = d.data().completedTopics ?? []
      })
      callback(map)
    },
    () => callback({})
  )
}

export async function isTopicCompleted(
  userId: string,
  subjectId: string,
  topicSlug: string
): Promise<boolean> {
  const snap = await getDoc(doc(db, 'users', userId, 'progress', subjectId))
  return snap.exists() && (snap.data().completedTopics as string[] ?? []).includes(topicSlug)
}
