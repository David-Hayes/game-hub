import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './Firebase'
import { createUser } from './DB'
import { ep_token } from './Endpoints'

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
      await fetchToken()
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

  const signinWithGoogle = () => {
    setAuthLoading(true)
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user)
      })
  }

  const signout = () => {
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
    signinWithGoogle,
    signout,
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

const fetchToken = async () => {
  if (document.cookie.indexOf('gDBTF') < 0) {
    await fetch(ep_token).then((res) => {
      if (res.status === 200) {
        return true
      } else {
        return false
      }
    })
  } else {
    return true
  }
}
