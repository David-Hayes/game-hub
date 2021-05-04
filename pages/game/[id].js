import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuth } from '../../libs/Auth'
import { createPlayed, createWant, getRating } from '../../libs/Firestore'
import { ep_game } from '../../libs/Endpoints'
import Wrapper from '../../components/Wrapper'
import Loading from '../../components/Loading'
import Container from '../../components/Container'
import { H2 } from '../../components/Headings'
import Card from '../../components/Card'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Game = () => {
  const { user } = useAuth()
  const { query } = useRouter()
  const [game, setGame] = useState(false)
  const [rating, setRating] = useState(false)

  useEffect(() => {
    if (query.id && user) {
      axios({
        url: ep_game,
        method: 'POST',
        data: {
          id: query.id,
        },
      }).then((response) => {
        setGame(response.data)
        getRating(user.uid, response.data.id).then((rating) => {
          setRating(rating)
        })
      })
    }
  }, [query, user])

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

  const tableCellClasses = 'w-1/2 align-top py-2'

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
                  {game.first_release_date && (
                    <div>{releaseDate(game.first_release_date)}</div>
                  )}
                  {rating ? (
                    <div className="w-20">
                      <CircularProgressbar
                        value={rating}
                        maxValue={10}
                        text={rating}
                        styles={buildStyles({
                          pathColor: '#f97316',
                          textColor: '#f97316',
                        })}
                      />
                    </div>
                  ) : (
                    <>
                      <p>
                        <button
                          type="button"
                          onClick={() =>
                            createPlayed(user.uid, { id: game.id, rating: 9 })
                          }
                        >
                          Add to played
                        </button>
                      </p>
                      <p>
                        <button
                          type="button"
                          onClick={() => createWant(user.uid, { id: game.id })}
                        >
                          Add to want
                        </button>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Container>
          </div>
          <Container>
            <div className="grid md:grid-cols-3 gap-5">
              <main className="col-span-2">
                {(game.summary || game.storyline) && (
                  <>
                    <H2>Overview</H2>
                    {game.summary &&
                      game.summary.split('\n').map((item, key) => {
                        return (
                          <p key={key} className="mb-4">
                            {item}
                          </p>
                        )
                      })}
                    {game.storyline &&
                      game.storyline.split('\n').map((item, key) => {
                        return (
                          <p key={key} className="mb-4">
                            {item}
                          </p>
                        )
                      })}
                  </>
                )}
              </main>
              <aside>
                <Card className="bg-gray-100 p-6 rounded-md shadow-md text-sm">
                  <table className="table-fixed">
                    <tbody>
                      {game.platforms && (
                        <tr>
                          <td className={tableCellClasses}>Platforms</td>
                          <td className={tableCellClasses}>
                            {game.platforms.map((platform, index) => (
                              <span key={index} className="block">
                                {platform.name}
                              </span>
                            ))}
                          </td>
                        </tr>
                      )}
                      {game.collection && (
                        <tr>
                          <td className={tableCellClasses}>Franchises</td>
                          <td className={tableCellClasses}>
                            <Link href={`/franchises/${game.collection.slug}`}>
                              <a className="text-yellow-700 hover:underline">
                                {game.collection.name}
                              </a>
                            </Link>
                          </td>
                        </tr>
                      )}
                      {game.genres && (
                        <tr>
                          <td className={tableCellClasses}>Genres</td>
                          <td className={tableCellClasses}>
                            {game.genres.map((genre, index) => (
                              <span key={index} className="block">
                                {genre.name}
                              </span>
                            ))}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Card>
              </aside>
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
