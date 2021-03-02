import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../config/State'
import { Link } from 'react-router-dom'
import { EP_SEARCH } from '../config/Endpoints'
import { Wrapper } from '../components/Layout'
import { Loader } from '../components/Loader'

export const Search = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const [localState, setLocalState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      query: props.match.params.query,
      loading: false,
      results: false,
      resultsCount: 0,
      pages: 0,
      page: 1,
      error: false,
    }
  )

  const resultLimit = 20

  const handleForm = (e) => {
    e.preventDefault()
    window.history.pushState(false, false, '/search/' + localState.query)
    makeSearch()
  }

  const makeSearch = (offset = 0) => {
    setLocalState({ results: false, error: false, loading: true })
    axios({
      url: EP_SEARCH,
      method: 'POST',
      data: {
        query: localState.query,
        limit: resultLimit,
        offset,
      },
    })
      .then((response) => {
        if (
          response.status === 200 &&
          parseInt(response.headers['x-count']) > 0
        ) {
          const pages = Math.ceil(
            parseInt(response.headers['x-count']) / resultLimit
          )
          setLocalState({
            results: response.data,
            resultsCount: response.headers['x-count'],
            pages: pages,
            page: offset / 20 + 1,
            loading: false,
          })
        } else {
          setLocalState({
            results: [],
            resultsCount: 0,
            loading: false,
            pages: 0,
          })
        }
      })
      .catch((err) => {
        setLocalState({
          results: [],
          resultsCount: 0,
          error: true,
          loading: false,
          pages: 0,
        })
      })
  }

  return (
    <Wrapper topSpace>
      <form onSubmit={handleForm} className="mb-4">
        <div className="bg-gray-700 rounded-md flex items-center relative px-3 mx-auto w-min">
          <button type="submit" className="mr-2 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search"
            value={localState.query || ''}
            onChange={(e) => setLocalState({ query: e.target.value })}
            className="bg-transparent h-10 focus:outline-none"
          />
          {localState.query && (
            <button
              type="reset"
              className="absolute right-3 top-3 z-10 focus:outline-none"
              onClick={() => setLocalState({ query: '' })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
      {localState.error && <div>Error making search</div>}
      {localState.loading && <Loader />}
      {localState.results && (
        <>
          {localState.pages > 1 && (
            <div className="grid md:grid-cols-3 mb-4">
              <div className="text-center md:text-left">
                {localState.resultsCount} results
              </div>
              <div className="text-center">
                Pages:{' '}
                {[...Array(localState.pages)].map((x, i) => (
                  <button
                    onClick={() => makeSearch(i * resultLimit)}
                    className={`pr-1 focus:outline-none ${
                      i + 1 === localState.page ? `font-bold underline` : ``
                    }`}
                    key={i}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div></div>
            </div>
          )}
          {localState.results.map((game, index) => (
            <div
              className="bg-gray-700 p-4 mb-4 rounded-md flow-root"
              key={index}
            >
              {state.user.type === 'admin' && (
                <button
                  onClick={() =>
                    dispatch({ type: 'SET_ADDING', payload: game.id })
                  }
                  className="float-right"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-10 hover:text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              )}

              <Link to={`/game/${game.id}`}>
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${
                    game.cover ? game.cover.image_id : `nocover_qhhlj6`
                  }.jpg`}
                  alt={game.name}
                  className="float-left mr-4 rounded-md"
                />
              </Link>

              <h2>
                <Link to={`/game/${game.id}`}>{game.name}</Link>
              </h2>
              <p>
                {game.first_release_date
                  ? `(${new Date(
                      game.first_release_date * 1000
                    ).getFullYear()})`
                  : ``}
              </p>
            </div>
          ))}
        </>
      )}
    </Wrapper>
  )
}
