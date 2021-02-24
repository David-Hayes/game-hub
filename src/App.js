import React, { useContext, useEffect } from 'react'
import { AppContext } from './state/Store'
import { auth, createUserProfileDocument } from './config/firebase.config'
import { LogIn } from './pages/LogIn'

const App = () => {
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log(userAuth)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot((snapShot) => {
          dispatch({
            type: 'SET_USER',
            payload: { id: snapShot.id, ...snapShot.data() },
          })
        })
      }
      dispatch({ type: 'SET_USER', payload: userAuth })
    })
    return () => unsubscribeFromAuth()
  }, [])

  return (
    <div className="App">
      <LogIn />
    </div>
  )
}

export default App
