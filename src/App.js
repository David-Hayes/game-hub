import React, { useContext, useEffect } from 'react'
import { AppContext } from './state/Store'
import { auth, createUserProfileDocument } from './config/firebase.config'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LogIn } from './pages/LogIn'
import { Search } from './pages/Search'
import { Header } from './components/Header'

const App = () => {
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
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
      } else {
        dispatch({
          type: 'SET_USER',
          payload: null,
        })
      }
    })
    return () => unsubscribeFromAuth()
  }, [dispatch])

  return (
    <div className="App">
      {!state.user && <LogIn />}
      {state.user && (
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path={['/search/:query', '/search']} component={Search} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
