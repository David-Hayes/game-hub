import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { EP_GAME } from '../config/Endpoints'
import { getGameRating } from '../config/Firebase'
import { AppContext } from '../config/State'
import { Loader } from '../components/Loader'
import { Heading1 } from '../components/Headings'
import { Wrapper } from '../components/Layout'
import { StarRating } from '../components/Rating'

export const Game = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const [game, setGame] = useState(null)
  const [rating, setRating] = useState(null)

  useEffect(() => {
    axios({
      url: EP_GAME,
      method: 'POST',
      data: {
        id: props.match.params.id,
      },
    }).then((response) => {
      document.title = `${response.data.name} | Game Hub`
      getGameRating(state.user.id, response.data.id).then((data) => {
        if (!!data[props.match.params.id]) {
          setRating(data[props.match.params.id])
        }
        setGame(response.data)
      })
    })
  }, [props.match.params.id, state.user.id])

  const bgImage =
    game && game.screenshots
      ? `https://images.igdb.com/igdb/image/upload/t_1080p/${
          game.screenshots[Math.floor(Math.random() * game.screenshots.length)]
            .image_id
        }.jpg`
      : ''

  const releaseDate = game
    ? `${new Date(game.first_release_date * 1000).getDate()} ${new Date(
        game.first_release_date * 1000
      ).toLocaleString('default', { month: 'short' })} ${new Date(
        game.first_release_date * 1000
      ).getFullYear()}`
    : ''

  return (
    <>
      {!game && <Loader />}
      {game && (
        <>
          <div
            className="pt-32 pb-10 md:pt-10 flow-root"
            style={{
              backgroundImage: `linear-gradient(rgba(7, 18, 36, 0.5), rgba(31, 41, 55, 1)), url(${bgImage})`,
              backgroundPosition: `center center`,
              backgroundSize: `cover`,
            }}
          >
            <Wrapper>
              {game.cover && (
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                  alt={game.data}
                  className="rounded-lg shadow-xl mx-auto md:ml-0 md:mr-5 mb-5 md:mb-0 w-1/2 sm:w-1/3 md:w-auto md:float-left"
                />
              )}
              <Heading1 className="text-center md:text-left">
                {game.name}
              </Heading1>
              <p className="text-sm hidden md:block">
                <strong>Release date:</strong> {releaseDate}
              </p>
              <p className="text-sm hidden md:block">
                <strong>Platforms:</strong>
                {` `}
                {game.platforms.map((platform, index) => (
                  <span key={index}>
                    {index !== 0 && `, `}
                    {platform.name}
                  </span>
                ))}
              </p>
              {!rating && (
                <p className="text-center md:text-left">
                  <button
                    onClick={() =>
                      dispatch({ type: 'SET_ADDING', payload: game.id })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-10 hover:text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </p>
              )}
              {rating && <StarRating preSet={rating} readonly />}
            </Wrapper>
          </div>
          <Wrapper>{game.summary && <p>{game.summary}</p>}</Wrapper>
        </>
      )}
    </>
  )
}
