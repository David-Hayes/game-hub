import { useEffect, useContext } from 'react'
import { AppContext } from './config/State'
import { auth, createUserProfile } from './config/Firebase'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Header } from './components/Header'
import { Loader } from './components/Loader'
import { AddGame } from './components/AddGame'
import { Login } from './pages/Login'
import { Game } from './pages/Game'
import { Search } from './pages/Search'

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
      <BrowserRouter>
        <Header />
        {state.user === null && <Loader />}
        {state.user !== null && !state.user && <Login />}
        {state.user && (
          <Switch>
            <Route path={['/search/:query', '/search']} component={Search} />
            <Route path="/game/:id" component={Game} />
            <Redirect path="/game" to="/search" exact />
          </Switch>
        )}
        {state.adding && <AddGame />}
      </BrowserRouter>
    </div>
  )
}

export default App
