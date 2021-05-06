import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { H1 } from '../components/Headings'
import Button from '../components/Button'
import { useAuth } from '../libs/Auth'
import { getPlayed } from '../libs/Firestore'
import { ep_searchById } from '../libs/Endpoints'
import axios from 'axios'

const Profile = () => {
  const { user, signOut } = useAuth()
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    if (user && user.uid) {
      getPlayed(user.uid, 'rating').then((a) => {
        console.log(a.ids.join(','))
        axios({
          url: ep_searchById,
          method: 'POST',
          data: {
            id: a.ids.join(','),
          },
        }).then((response) => {
          console.log(response)
          setPlayed(response.data)
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

            {played && <></>}
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default Profile
