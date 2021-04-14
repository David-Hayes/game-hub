import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PageShell from '../../components/PageShell'

const Game = (props) => {
  const { query } = useRouter()

  useEffect(() => {
    if (query.id) {
      console.log('yay!')
    }
  }, [query])

  return <PageShell></PageShell>
}

export default Game
