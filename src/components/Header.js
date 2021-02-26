import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../state/Store'

export const Header = () => {
  const { state } = useContext(AppContext)

  return (
    <header className="bg-gray-900">
      <div className="max-w-screen-lg mx-auto px-4 py-2 flex items-center justify-between">
        <div>
          <Link to="/">Game Hub</Link>
        </div>
        <div className="flex items-center">
          <Link to="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>
          {state.user && (
            <Link to="/profile">
              <img
                src={state.user.photo}
                alt={state.user.displayName}
                className="rounded-full w-7 ml-3"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
