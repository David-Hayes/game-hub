import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../config/State'
import { getAllGames } from '../config/Firebase'
import { Wrapper } from '../components/Layout'
import { Heading2 } from '../components/Headings'
import { Button } from '../components/Button'

export const Profile = () => {
  const { state } = useContext(AppContext)
  const [played, setPlayed] = useState([])
  const [lastGame, setLastGame] = useState(false)

  const fetchGames = () => {
    const games = getAllGames(state.user.id, lastGame)
    games.then((ref) => {
      setPlayed(played.concat(ref))
      if (ref.length === 100) {
        setLastGame(ref[ref.length - 1].name)
      } else {
        setLastGame(false)
      }
    })
  }

  useEffect(() => {
    const games = getAllGames(state.user.id, '')
    games.then((ref) => {
      setPlayed(ref)
      if (ref.length === 100) {
        setLastGame(ref[ref.length - 1].name)
      } else {
        setLastGame(false)
      }
    })
  }, [state.user.id])

  return (
    <Wrapper topSpace>
      <Heading2>Played games</Heading2>
      <div className="flex flex-wrap items-center justify-center">
        {played && (
          <>
            {played.map((game, index) => (
              <div key={index} className="mr-3 mb-3">
                <Link to={`/game/${game.id}`}>
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover}.jpg`}
                    alt={game.name}
                    className="rounded-md"
                  />
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
      {lastGame && (
        <p className="text-center mt-5">
          <Button onClick={fetchGames}>Load more...</Button>
        </p>
      )}
    </Wrapper>
  )
}
