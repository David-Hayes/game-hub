import { useEffect, useContext } from 'react'
import { AppContext } from './config/State'
import { auth, createUserProfile } from './config/Firebase'
import { Header } from './components/Header'
import { Loader } from './components/Loader'
import { Login } from './pages/Login'

const App = () => {
  const { state, dispatch } = useContext(AppContext)

  // setup user
  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth)
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
      } else {
        dispatch({
          type: 'SET_USER',
          payload: false,
        })
      }
    })
    return () => unsubscribeFromAuth()
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      {state.user === null && <Loader />}
      {state.user !== null && !state.user && <Login />}
    </div>
  )
}

export default App
