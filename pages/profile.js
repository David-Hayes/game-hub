import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { H1, H2 } from '../components/Headings'
import Button from '../components/Button'
import ResultItem from '../components/ResultItem'
import { useAuth } from '../libs/Auth'
import { getPlayed } from '../libs/Firestore'
import { ep_searchById } from '../libs/Endpoints'
import axios from 'axios'

const Profile = () => {
  const { user, signOut } = useAuth()
  const [played, setPlayed] = useState(false)
  const [playedData, setPlayedData] = useState(false)

  useEffect(() => {
    if (user && user.uid) {
      getPlayed(user.uid, 'rating').then((ids) => {
        axios({
          url: ep_searchById,
          method: 'POST',
          data: {
            id: ids.join(','),
          },
        }).then((response) => {
          setPlayedData(response.data)
          setPlayed(ids)
        })
      })
    }
  }, [user])

  return (
    <Wrapper>
      {user && (
        <div className="grid md:grid-cols-6 gap-5">
          <div className="md:col-span-1">
            <img
              src={user.photoUrl}
              alt={user.name}
              className="rounded-full mx-auto mb-5"
              referrerPolicy="no-referrer"
            />
            <Button onClick={signOut} variant="warning" className="w-full">
              Sign out
            </Button>
          </div>
          <div className="md:col-span-5">
            <H1>{user.name}</H1>

            {played && (
              <>
                <H2>Your games</H2>
                <div className="grid justify-items-stretch grid-cols-3 md:grid-cols-6 gap-4">
                  {played.map((game, index) => (
                    <ResultItem key={index} game={playedData[game]} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default Profile
