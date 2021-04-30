import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ep_franchises } from '../../libs/Endpoints'
import Wrapper from '../../components/Wrapper'
import ResultItem from '../../components/ResultItem'

const Franchises = () => {
  const { query } = useRouter()
  const [collection, setCollection] = useState(false)

  useEffect(() => {
    if (query.id) {
      axios({
        url: ep_franchises,
        method: 'POST',
        data: {
          id: query.id,
        },
      }).then((response) => {
        console.log(response)
        setCollection(response.data[0])
      })
    }
  }, [query])

  return (
    <Wrapper>
      {collection ? (
        <>
          <h1 className="text-2xl mb-5">{collection.name}</h1>
          <div className="grid justify-items-stretch grid-cols-3 md:grid-cols-5 gap-4">
            {collection.games.map((game, index) => (
              <ResultItem key={index} game={game} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  )
}

export default Franchises
