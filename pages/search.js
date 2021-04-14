import React, { useReducer } from 'react'
import Link from 'next/link'
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
        <div className="w-min bg-white rounded-md mx-auto flex mb-5">
          <input
            name="query"
            defaultValue={localState.query}
            placeholder="Search"
            autoComplete="off"
            onChange={(e) => setLocalState({ query: e.target.value })}
            className="py-2 px-3"
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
        <div className="grid justify-items-stretch grid-cols-2 md:grid-cols-4 gap-4">
          {localState.results.map((game, index) => (
            <div key={index} className="bg-gray-900">
              <Link href={`/game/${game.id}`}>
                <a>
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                      game.cover ? game.cover.image_id : `nocover_qhhlj6`
                    }.jpg`}
                    alt={game.name}
                  />
                </a>
              </Link>
              <div className="pt-4 pb-5 px-5 text-white">
                <p className="mb-2">
                  <Link href={`/game/${game.id}`}>{game.name}</Link>
                </p>
                {game.first_release_date ? (
                  <p className="text-xs">
                    ({new Date(game.first_release_date * 1000).getFullYear()})
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </PageShell>
  )
}

export default Search
