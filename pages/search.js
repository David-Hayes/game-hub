import React, { useReducer } from 'react'
import Wrapper from '../components/Wrapper'
import Loading from '../components/Loading'
import ResultItem from '../components/ResultItem'
import { ep_search } from '../libs/Endpoints'
import axios from 'axios'

const Search = () => {
  const [localState, setLocalState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      query: '',
      results: false,
      loading: false,
      limit: 25,
      resultCount: 0,
      pages: 0,
      page: 1,
    }
  )

  const handleFormSubmit = (event) => {
    event.preventDefault()
    handleSearch()
  }

  const handleSearch = (offset = 0) => {
    setLocalState({ loading: true, results: false })
    axios({
      url: ep_search,
      method: 'POST',
      data: {
        query: localState.query,
        limit: localState.limit,
        offset,
      },
    }).then((response) => {
      if (parseInt(response.headers['x-count']) > 0) {
        setLocalState({
          results: response.data,
          loading: false,
          resultCount: parseInt(response.headers['x-count']),
          pages: Math.ceil(
            parseInt(response.headers['x-count']) / localState.limit
          ),
          page: offset / localState.limit + 1,
        })
      } else {
        setLocalState({
          results: [],
          loading: false,
        })
      }
    })
  }

  const Pagination = () => {
    if (localState.pages > 1) {
      return (
        <p className="text-center">
          Pages:{' '}
          {[...Array(localState.pages)].map((x, i) => (
            <button
              onClick={() => handleSearch(i * localState.limit)}
              className={`mr-1 ${
                i + 1 === localState.page ? `font-bold underline` : ``
              }`}
              key={i}
            >
              {i + 1}
            </button>
          ))}
        </p>
      )
    } else {
      return null
    }
  }

  return (
    <Wrapper title="Search">
      <form onSubmit={handleFormSubmit}>
        <div className="w-min mx-auto flex shadow-md bg-white rounded-md mb-5">
          <input
            type="text"
            className="rounded-tl-md rounded-bl-md w-56 px-3"
            placeholder="Search"
            onChange={(e) => setLocalState({ query: e.target.value })}
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-3 rounded-tr-md rounded-br-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
      <div>
        {localState.loading && <Loading />}
        {localState.results ? (
          <>
            {localState.results.length > 0 ? (
              <>
                <div className="grid grid-cols-12 mb-5 text-sm">
                  <div className="col-span-2">
                    Total results: {localState.resultCount}
                  </div>
                  <div className="col-span-8">
                    <Pagination />
                  </div>
                  <div className="col-span-2"></div>
                </div>
                <div className="grid justify-items-stretch grid-cols-3 md:grid-cols-5 gap-4">
                  {localState.results.map((game, index) => (
                    <ResultItem key={index} game={game} />
                  ))}
                </div>
                <div className="mt-5 text-sm">
                  <Pagination />
                </div>
              </>
            ) : (
              <>No results</>
            )}
          </>
        ) : null}
      </div>
    </Wrapper>
  )
}

export default Search
