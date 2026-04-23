'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
    User,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    GoogleAuthProvider
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'
import { ensureUserDoc } from '@/lib/db'

interface AuthContextType {
    currentUser: User | null
    loading: boolean
    googleSignIn: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
            if (user) ensureUserDoc(user).catch(console.error)
        })
        return unsubscribe
    }, [])

    // Must be called directly inside a click handler with no awaits before it
    // so the browser recognises it as a trusted user gesture (prevents popup-blocked)
    const googleSignIn = () => signInWithPopup(auth, googleProvider).then(() => {})

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Error signing out', error)
            throw error
        }
    }

    const value = {
        currentUser,
        loading,
        googleSignIn,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
