import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../state/Store'
import { createGameDocument } from '../config/firebase.config'
import { EP_GAME } from '../config/Endpoints'
import { Loader } from '../components/Loader'
import { Button } from '../components/Button'
import { StarRating } from '../components/StarRating'

export const AddGame = () => {
  const { state, dispatch } = useContext(AppContext)
  const [data, setData] = useState(null)
  const [rating, setRating] = useState(5)

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
    }
    const gameRef = createGameDocument(gameData)
    gameRef.then((r) => {
      dispatch({ type: 'SET_ADDING', payload: null })
    })
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
            {!data && <Loader />}
            {data && (
              <>
                <h2>Add {data.name}</h2>
                <StarRating
                  preSet={rating}
                  onSetRating={(newRating) => setRating(newRating)}
                />
                <form onSubmit={submitForm}>
                  <Button type="submit">Save</Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
