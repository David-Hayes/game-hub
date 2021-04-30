import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ep_game } from '../../libs/Endpoints'
import Wrapper from '../../components/Wrapper'

const Franchises = () => {
  const { query } = useRouter()

  useEffect(() => {
    if (query.id) {
      axios({
        url: ep_game,
        method: 'POST',
        data: {
          id: query.id,
        },
      }).then((response) => {
        setGame(response.data)
      })
    }
  }, [query])

  return <Wrapper></Wrapper>
}

export default Franchises
