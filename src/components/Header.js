import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Wrapper } from '../components/Layout'
import { AppContext } from '../config/State'

export const Header = () => {
  const { state } = useContext(AppContext)
  return (
    <div className="bg-gray-900 py-2">
      <Wrapper className="flex items-center justify-between">
        <div>Game hub</div>
        {state.user && (
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
            <Link to="/">
              <img
                src={state.user.photo}
                alt={state.user.displayName}
                className="rounded-full w-7 ml-3"
              />
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  )
}
