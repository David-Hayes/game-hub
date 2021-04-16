import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ep_game } from '../../libs/Endpoints'
import Wrapper from '../../components/Wrapper'
import Loading from '../../components/Loading'
import Container from '../../components/Container'

const Game = () => {
  const { query } = useRouter()
  const [game, setGame] = useState(false)

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

  const bgImage =
    game && game.screenshots
      ? `https://images.igdb.com/igdb/image/upload/t_1080p/${
          game.screenshots[Math.floor(Math.random() * game.screenshots.length)]
            .image_id
        }.jpg`
      : ''

  return (
    <Wrapper fullWidth={true}>
      {game ? (
        <>
          <Head>
            <title>{game.name}</title>
          </Head>
          <div
            className="py-8"
            style={{
              backgroundImage: `linear-gradient(rgba(7, 18, 36, 0.5), rgba(31, 41, 55, 1)), url(${bgImage})`,
              backgroundPosition: `center center`,
              backgroundSize: `cover`,
            }}
          >
            <Container>
              <div className="flex gap-5">
                <div>
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                      game.cover ? game.cover.image_id : `nocover_qhhlj6`
                    }.jpg`}
                    alt={game.name}
                    className="shadow-md"
                  />
                </div>
                <div>
                  <h1 className="text-5xl text-white font-semibold">
                    {game.name}
                  </h1>
                </div>
              </div>
            </Container>
          </div>
        </>
      ) : (
        <div className="mt-5">
          <Loading />
        </div>
      )}
    </Wrapper>
  )
}

export default Game
