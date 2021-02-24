import React, { useContext, useEffect } from 'react'
import { AppContext } from './state/Store'
import { auth, createUserProfileDocument } from './config/firebase.config'
import { LogIn } from './pages/LogIn'
import { Header } from './components/Header'

const App = () => {
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log(userAuth)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot((snapShot) => {
          dispatch({
            type: 'SET_USER',
            payload: {
              id: snapShot.id,
              ...snapShot.data(),
              photo: userAuth.photoURL,
            },
          })
        })
      }
      //dispatch({ type: 'SET_USER', payload: userAuth })
    })
    return () => unsubscribeFromAuth()
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <LogIn />
    </div>
  )
}

export default App
