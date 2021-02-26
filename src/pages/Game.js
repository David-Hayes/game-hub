import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { EP_GAME } from '../config/Endpoints'
import { Loader } from '../components/Loader'
import { WrapperStandard } from '../components/Layout'
import { AppContext } from '../state/Store'

export const Game = (props) => {
  const { dispatch } = useContext(AppContext)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios({
      url: EP_GAME,
      method: 'POST',
      data: {
        id: props.match.params.id,
      },
    }).then((response) => {
      setData(response.data)
    })
  }, [props.match.params.id])

  const bgImage =
    data && data.screenshots
      ? `https://images.igdb.com/igdb/image/upload/t_1080p/${
          data.screenshots[Math.floor(Math.random() * data.screenshots.length)]
            .image_id
        }.jpg`
      : ''

  const releaseDate = data
    ? `${new Date(data.first_release_date * 1000).getDate()} ${new Date(
        data.first_release_date * 1000
      ).toLocaleString('default', { month: 'short' })} ${new Date(
        data.first_release_date * 1000
      ).getFullYear()}`
    : ''

  return (
    <div>
      {!data && <Loader />}
      {data && (
        <>
          <div
            className="pt-32 md:pt-10"
            style={{
              backgroundImage: `linear-gradient(rgba(7, 18, 36, 0.5), rgba(31, 41, 55, 1)), url(${bgImage})`,
              backgroundPosition: `center center`,
              backgroundSize: `cover`,
            }}
          >
            <WrapperStandard>
              <div className="flow-root">
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${data.cover.image_id}.jpg`}
                  alt={data.name}
                  className="rounded-lg shadow-xl w-3/5 mx-auto mb-4 sm:w-1/3 md:mx-0 md:w-auto md:float-left md:mr-6 md:mb-0"
                />
                <h1 className="text-4xl font-bold text-center md:text-left mb-3">
                  {data.name}
                </h1>
                <p className="text-sm hidden md:block">
                  <strong>Release date:</strong> {releaseDate}
                </p>
                <p className="text-sm hidden md:block mb-2">
                  <strong>Platforms:</strong>{' '}
                  {data.platforms.map((platform, index) => (
                    <span key={index}>
                      {index !== 0 && `, `}
                      {platform.name}
                    </span>
                  ))}
                </p>
                <p className="text-center md:text-left">
                  <button
                    onClick={() =>
                      dispatch({ type: 'SET_ADDING', payload: data.id })
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
              </div>
            </WrapperStandard>
          </div>
          <WrapperStandard>
            <div className="bg-gray-900 p-4 rounded-lg md:hidden">
              <p className="text-sm">
                <strong>Release date:</strong> {releaseDate}
              </p>
              <p className="text-sm">
                <strong>Platforms:</strong>{' '}
                {data.platforms.map((platform, index) => (
                  <span key={index}>
                    {index !== 0 && `, `}
                    {platform.name}
                  </span>
                ))}
              </p>
            </div>
            <div className="mb-4">{data.summary}</div>
            {data.screenshots && (
              <div className="grid grid-cols-6">
                {data.screenshots.map((shot, index) => (
                  <div key={index}>
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_720p/${shot.image_id}.jpg`}
                      alt={data.name}
                    />
                  </div>
                ))}
              </div>
            )}
          </WrapperStandard>
        </>
      )}
    </div>
  )
}
