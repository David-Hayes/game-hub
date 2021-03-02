import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../config/State'
import { createGameDocument } from '../config/Firebase'
import { EP_GAME } from '../config/Endpoints'
import { Loader } from '../components/Loader'
import { Button } from '../components/Button'
import { StarRating } from '../components/Rating'

export const AddGame = () => {
  const { state, dispatch } = useContext(AppContext)
  const [data, setData] = useState(null)
  const [rating, setRating] = useState(0)
  const [platforms, setPlatforms] = useState([])

  useEffect(() => {
    if (state.adding) {
      axios({
        url: EP_GAME,
        method: 'POST',
        data: {
          id: state.adding,
        },
      }).then((response) => {
        setData(response.data)
      })
    }
  }, [state.adding])

  const submitForm = (event) => {
    event.preventDefault()
    const gameData = {
      id: state.adding,
      name: data.name,
      rating,
      platforms,
      cover: data.cover ? data.cover.image_id : 'nocover_qhhlj6',
    }
    const gameRef = createGameDocument(state.user.id, gameData)
    gameRef.then((r) => {
      dispatch({ type: 'SET_ADDING', payload: null })
    })
  }

  const updatePlatforms = (event) => {
    if (event.target.checked) {
      if (!platforms.includes(event.target.value)) {
        setPlatforms([...platforms, event.target.value])
      }
    } else {
      if (platforms.includes(event.target.value)) {
        const platformIndex = platforms.indexOf(event.target.value)
        const newPlatforms = platforms
        newPlatforms.splice(platformIndex, 1)
        setPlatforms(newPlatforms)
      }
    }
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white text-gray-900 px-4 pt-5 pb-5">
            {!data && <Loader dark />}
            {data && (
              <>
                <h2 className="mb-2">Add {data.name}</h2>
                <form onSubmit={submitForm}>
                  <div className="flex mb-2">
                    Rating:{' '}
                    <StarRating
                      preSet={rating}
                      onSetRating={(newRating) => setRating(newRating)}
                    />
                  </div>
                  <div className="flex mb-3">
                    Platform:
                    <div className="ml-2">
                      {data.platforms &&
                        data.platforms.map((platform, index) => (
                          <div key={index}>
                            <input
                              id={platform.abbreviation || platform.name}
                              type="checkbox"
                              value={platform.abbreviation || platform.name}
                              onChange={updatePlatforms}
                            />
                            <label
                              htmlFor={platform.abbreviation || platform.name}
                              className="ml-1 cursor-pointer"
                            >
                              {platform.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    styleType="secondary"
                    className="ml-2"
                    onClick={() =>
                      dispatch({ type: 'SET_ADDING', payload: null })
                    }
                  >
                    Cancel
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
