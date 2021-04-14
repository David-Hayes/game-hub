import React, { useReducer } from 'react'
import { useRouter } from 'next/router'
import { ep_search } from '../libs/Endpoints'
import PageShell from '../components/PageShell'
import queryString from 'query-string'

const Search = () => {
  const router = useRouter()
  const [localState, setLocalState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      query: queryString.parse(router.asPath.split('?')[1]).query || '',
      results: false,
    }
  )

  const handleForm = (event) => {
    event.preventDefault()
    handleSearch()
  }

  const handleSearch = async () => {
    const searchCall = await fetch(ep_search, {
      method: 'POST',
      body: JSON.stringify({ query: localState.query }),
    })
    const results = await searchCall.json()
    setLocalState({ results: results })
  }

  return (
    <PageShell title="Search">
      <form onSubmit={handleForm}>
        <div>
          <input
            name="query"
            defaultValue={localState.query}
            placeholder="Search"
            autoComplete="off"
            onChange={(e) => setLocalState({ query: e.target.value })}
          />
          <button>
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
      {localState.results ? (
        <div className="grid justify-items-stretch grid-cols-4 gap-4">
          {localState.results.map((game, index) => (
            <div key={index} className="bg-gray-900">
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                  game.cover ? game.cover.image_id : `nocover_qhhlj6`
                }.jpg`}
                alt={game.name}
              />
              <div className="py-4 px-5 text-white">{game.name}</div>
            </div>
          ))}
        </div>
      ) : null}
    </PageShell>
  )
}

export default Search
