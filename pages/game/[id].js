import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuth } from '../../libs/Auth'
import {
  addPlayed,
  addWanted,
  getRating,
  isWanted,
  removeWanted,
} from '../../libs/Firestore'
import { ep_game } from '../../libs/Endpoints'
import Wrapper from '../../components/Wrapper'
import Loading from '../../components/Loading'
import Container from '../../components/Container'
import { H2 } from '../../components/Headings'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Rating from '../../components/Rating'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Game = () => {
  const { user } = useAuth()
  const { query } = useRouter()
  const [loading, setLoading] = useState(true)
  const [game, setGame] = useState(false)
  const [rating, setRating] = useState(false)
  const [wanted, setWanted] = useState(false)

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
          if (rating) {
            setRating(rating)
            setLoading(false)
          } else {
            isWanted(user.uid, response.data.id).then((wanted) => {
              setWanted(wanted)
              setLoading(false)
            })
          }
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

  const setOwnerRating = (event) => {
    setRating(event)
    addPlayed(user.uid, { id: game.id, name: game.name, rating: event })
  }

  const wantedAddition = (id) => {
    addWanted(user.uid, { id: id })
    setWanted(true)
  }

  const wantedRemoval = (id) => {
    removeWanted(user.uid, id)
    setWanted(false)
  }

  return (
    <>
      <Wrapper fullWidth={true}>
        {game && !loading ? (
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
                <div className="flex flex-col md:flex-row gap-5 relative">
                  <div>
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                        game.cover ? game.cover.image_id : `nocover_qhhlj6`
                      }.jpg`}
                      alt={game.name}
                      className="shadow-md mx-auto md:mx-0"
                    />
                  </div>
                  <div className="text-white">
                    <h1 className="text-5xl font-semibold mb-2">{game.name}</h1>
                    {game.first_release_date && (
                      <div>{releaseDate(game.first_release_date)}</div>
                    )}
                  </div>
                </div>
              </Container>
            </div>
            <Container>
              <div className="grid md:grid-cols-3 gap-5">
                <main className="col-span-3 md:col-span-2">
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
                <aside className="col-span-3 md:col-span-1">
                  <Card className="bg-gray-100 p-6 rounded-md shadow-md text-sm relative">
                    {game.aggregated_rating && (
                      <div className="w-40 mx-auto md:-mt-24 text-center mb-5">
                        <div className="bg-gray-100 rounded-full p-3">
                          <CircularProgressbar
                            value={Math.floor(game.aggregated_rating)}
                            maxValue={100}
                            text={`${Math.floor(game.aggregated_rating)}%`}
                            strokeWidth={12}
                            styles={{
                              path: {
                                stroke: '#f97316',
                              },
                              text: {
                                fill: '#111827',
                                fontWeight: 'semi-bold',
                              },
                            }}
                          />
                        </div>
                        <p className="mt-2">
                          Average rating from {game.aggregated_rating_count}{' '}
                          critics
                        </p>
                      </div>
                    )}
                    <p className="font-semibold mb-1">
                      {!rating
                        ? 'Played this game? Rate it to add to your list'
                        : 'Your rating'}
                    </p>
                    <Rating preSet={rating} onSetRating={setOwnerRating} />
                    {!rating && (
                      <p className="mt-5">
                        {wanted ? (
                          <Button
                            variant="warning"
                            className="w-full"
                            onClick={() => wantedRemoval(game.id)}
                          >
                            Remove from wanted list
                          </Button>
                        ) : (
                          <Button
                            className="w-full"
                            onClick={() => wantedAddition(game.id)}
                          >
                            Add to wanted list
                          </Button>
                        )}
                      </p>
                    )}
                    <table className="table-fixed mt-5">
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
                              <Link
                                href={`/franchises/${game.collection.slug}`}
                              >
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
      <div className="absolute top-0">s</div>
    </>
  )
}

export default Game
