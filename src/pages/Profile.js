import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../config/State'
import { getAllGames } from '../config/Firebase'
import { Wrapper } from '../components/Layout'

export const Profile = () => {
  const { state } = useContext(AppContext)
  const [played, setPlayed] = useState(null)

  useEffect(() => {
    const games = getAllGames(state.user.id)
    games.then((ref) => {
      console.log(ref)
      setPlayed(ref)
    })
  }, [state.user.id])

  return (
    <Wrapper>
      <div className="flex flex-wrap space-x-4 space-y-4">
        {played &&
          played.map((game, index) => (
            <div key={index}>
              <Link to={`/game/${game.id}`}>
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover}.jpg`}
                  alt={game.name}
                  className="rounded-md"
                />
              </Link>
            </div>
          ))}
      </div>
    </Wrapper>
  )
}
