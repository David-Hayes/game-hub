import React, { useEffect, useContext, useState } from 'react'
import { getAllGames } from '../config/firebase.config'
import { AppContext } from '../state/Store'
import { WrapperStandard } from '../components/Layout'

export const Profile = () => {
  const { state, dispatch } = useContext(AppContext)
  const [played, setPlayed] = useState([])
  useEffect(() => {
    console.log(1)
    const games = getAllGames(state.user.id)
    games.then((ref) => {
      setPlayed(...played, ref)
    })
  }, [])

  return (
    <WrapperStandard topSpace={true}>
      <div className="flex flex-wrap space-x-4 space-y-4">
        {played.length > 0 &&
          played.map((item) => (
            <>
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${item.cover}.jpg`}
                alt={item.name}
                className="rounded-md"
              />
            </>
          ))}
      </div>
    </WrapperStandard>
  )
}
