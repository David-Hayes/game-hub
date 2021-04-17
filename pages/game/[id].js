import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ep_game } from '../../libs/Endpoints'
import Wrapper from '../../components/Wrapper'
import Loading from '../../components/Loading'
import Container from '../../components/Container'
import { H2 } from '../../components/Headings'

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

  const releaseDate = (releaseDate) => {
    const rD = new Date(releaseDate * 1000)
    return (
      <>
        <strong>Released:</strong> {rD.getDate()}{' '}
        {rD.toLocaleString('default', {
          month: 'long',
        })}{' '}
        {rD.getFullYear()}
      </>
    )
  }

  return (
    <Wrapper fullWidth={true}>
      {game ? (
        <>
          <Head>
            <title>{game.name}</title>
          </Head>
          <div
            className="py-8 mb-5"
            style={{
              backgroundImage: `linear-gradient(rgba(7, 18, 36, 0.6), rgba(31, 41, 55, 1)), url(${bgImage})`,
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
                <div className="text-white">
                  <h1 className="text-5xl font-semibold mb-2">{game.name}</h1>
                  {game.first_release_date &&
                    releaseDate(game.first_release_date)}
                </div>
              </div>
            </Container>
          </div>
          <Container>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="col-span-2">
                {game.summary && (
                  <>
                    <H2>Overview</H2>
                    {game.summary.split('\n').map((item, key) => {
                      return (
                        <p key={key} className="mb-4">
                          {item}
                        </p>
                      )
                    })}
                  </>
                )}
              </div>
              <div>
                <div className="bg-gray-100 p-6 rounded-md shadow-md">
                  {game.platforms && (
                    <>
                      <H2>Platform(s)</H2>
                      {game.platforms.map((platform, index) => (
                        <span key={index}>
                          {index !== 0 && `, `}
                          {platform.name}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Container>
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
