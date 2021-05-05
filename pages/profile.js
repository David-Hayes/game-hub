import React, { useEffect } from 'react'
import Wrapper from '../components/Wrapper'
import { useAuth } from '../libs/Auth'
import { getPlayed } from '../libs/Firestore'
import { ep_searchById } from '../libs/Endpoints'
import axios from 'axios'

const Profile = () => {
  const { user, signOut } = useAuth()

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
        })
      })
    }
  }, [user])

  return (
    <Wrapper>
      <button onClick={signOut}>Sign out</button>
    </Wrapper>
  )
}

export default Profile
