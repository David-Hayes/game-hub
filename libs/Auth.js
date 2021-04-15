import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './Firebase'
import { createUser } from './Firestore'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useFirebaseAuth() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser)
      createUser(user.uid, { name: user.name })
      setUser(user)
      setAuthLoading(false)
      return user
    } else {
      setUser(false)
      setAuthLoading(false)
      return false
    }
  }

  const signInWithGoogle = () => {
    setAuthLoading(true)
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user)
      })
  }

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser)
    return () => unsubscribe()
  }, [])

  return {
    user,
    authLoading,
    signInWithGoogle,
    signOut,
  }
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}
