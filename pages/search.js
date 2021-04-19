import React, { useReducer } from 'react'
import Wrapper from '../components/Wrapper'
import Loading from '../components/Loading'
import { ep_search } from '../libs/Endpoints'
import axios from 'axios'
import Link from 'next/link'

const Search = () => {
  const [localState, setLocalState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      query: '',
      results: false,
      loading: false,
    }
  )

  const handleFormSubmit = (event) => {
    event.preventDefault()
    handleSearch()
  }

  const handleSearch = (offset = 0, limit = 25) => {
    setLocalState({ loading: true, results: false })
    axios({
      url: ep_search,
      method: 'POST',
      data: {
        query: localState.query,
        limit,
        offset,
      },
    }).then((response) => {
      if (parseInt(response.headers['x-count']) > 0) {
        setLocalState({
          results: response.data,
          loading: false,
        })
      } else {
        setLocalState({
          results: [],
          loading: false,
        })
      }
    })
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
              <div className="grid justify-items-stretch grid-cols-3 md:grid-cols-5 gap-4">
                {localState.results.map((game, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 text-white hover:opacity-80 relative"
                  >
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                        game.cover ? game.cover.image_id : `nocover_qhhlj6`
                      }.jpg`}
                      alt={game.name}
                    />
                    <div className="pt-2 px-3 pb-4">
                      <p className="text-sm mb-2 leading-tight">{game.name}</p>
                      {game.first_release_date ? (
                        <p className="text-xs">
                          (
                          {new Date(
                            game.first_release_date * 1000
                          ).getFullYear()}
                          )
                        </p>
                      ) : null}
                    </div>
                    <Link href={`/game/${game.slug}`}>
                      <a
                        className="absolute top-0 left-0 w-full h-full"
                        title={game.name}
                      ></a>
                    </Link>
                  </div>
                ))}
              </div>
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
