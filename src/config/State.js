import { createContext, useReducer } from 'react'
import { Reducer } from './Reducer'

const initialState = {
  user: null,
  adding: null,
}

const AppContext = createContext(initialState)

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
