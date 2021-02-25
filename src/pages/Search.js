import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../state/Store'
import { WrapperStandard } from '../components/Layout'
import { Loader } from '../components/Loader'
import { EP_SEARCH } from '../config/Endpoints'
import { Link } from 'react-router-dom'

export const Search = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const [localState, setLocalState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      query: props.match.params.query,
      loading: false,
      results: false,
      pages: 0,
    }
  )

  const resultLimit = 20

  const handleSubmit = (event) => {
    event.preventDefault()
    window.history.pushState(false, false, '/search/' + localState.query)
    makeSearch()
  }

  const makeSearch = (offset = 0) => {
    setLocalState({ loading: true, results: false })
    axios({
      url: EP_SEARCH,
      method: 'POST',
      data: {
        query: localState.query,
        limit: resultLimit,
        offset,
      },
    }).then((response) => {
      if (
        response.status === 200 &&
        parseInt(response.headers['x-count']) > 0
      ) {
        const pages = Math.ceil(
          parseInt(response.headers['x-count']) / resultLimit
        )
        setLocalState({ results: response.data, pages: pages, loading: false })
      } else {
        setLocalState({ results: [], loading: false, pages: 0 })
      }
    })
  }

  return (
    <WrapperStandard topSpace={true}>
      <div className="mb-4">
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-700 rounded-md relative mx-auto w-min">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setLocalState({ query: e.target.value })}
              defaultValue={localState.query}
              className="bg-transparent h-10 px-5 pr-16 focus:outline-none"
            />
            <button className="absolute right-0 top-0 mt-3 mr-4">
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
          </div>
        </form>
      </div>
      {localState.loading && <Loader />}
      {localState.results.length < 1 && <>No results</>}
      {localState.results && (
        <>
          {localState.pages > 1 && (
            <p className="text-center mb-4">
              {[...Array(localState.pages)].map((x, i) => (
                <button
                  onClick={() => makeSearch(i * resultLimit)}
                  className="pr-1"
                  key={i}
                >
                  {i + 1}
                </button>
              ))}
            </p>
          )}
          {localState.results.map((data, index) => (
            <div key={index} className="bg-gray-700 mb-4 rounded p-4 flow-root">
              {state.user.type === 'admin' && (
                <button
                  onClick={() =>
                    dispatch({ type: 'SET_ADDING', payload: data.id })
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
              {data.cover && (
                <Link to={`/game/${data.id}`}>
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${data.cover.image_id}.jpg`}
                    alt={data.name}
                    className="float-left mr-4 rounded-md"
                  />
                </Link>
              )}
              <h2 className="text-lg leading-6 mb-1">
                <Link to={`/game/${data.id}`} className="hover:underline">
                  {data.name}
                </Link>
              </h2>
              {data.first_release_date
                ? `(${new Date(data.first_release_date * 1000).getFullYear()})`
                : ``}
            </div>
          ))}
        </>
      )}
    </WrapperStandard>
  )
}
