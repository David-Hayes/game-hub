import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../config/State'
import { getAllGames } from '../config/Firebase'
import { Wrapper } from '../components/Layout'
import { Heading2 } from '../components/Headings'

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
    <Wrapper topSpace>
      <Heading2>Played games</Heading2>
      <div className="flex flex-wrap items-center justify-center">
        {played &&
          played.map((game, index) => (
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
      </div>
    </Wrapper>
  )
}
