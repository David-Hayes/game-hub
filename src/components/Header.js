import React, { useContext } from 'react'
import { AppContext } from '../state/Store'

export const Header = () => {
  const { state } = useContext(AppContext)

  return (
    <header className="bg-gray-900">
      <div className="max-w-screen-lg mx-auto px-4 py-2 flex justify-between">
        <div>Game Hub</div>
        <div>
          {state.user && (
            <img
              src={state.user.photo}
              alt={state.user.displayName}
              className="rounded-full w-7"
            />
          )}
        </div>
      </div>
    </header>
  )
}
