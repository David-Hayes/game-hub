import React, { useState } from 'react'

export const StarRating = ({ preSet = 0, onSetRating }) => {
  const [rating, setRating] = useState(preSet)
  const [tempRating, setTempRating] = useState(preSet)

  const handleMouseOver = (newRating) => {
    setTempRating(newRating)
  }

  const handleMouseOut = () => {
    setTempRating(rating)
  }

  const applyRating = (newRating) => {
    setRating(newRating)
    onSetRating(newRating)
  }

  const Stars = () => {
    const stars = []
    for (let i = 1; i < 11; i++) {
      const offset = i % 2 == 0 ? '-ml-3' : ''
      let icon = ''
      if (i <= tempRating) {
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-6 text-yellow-400 ${offset}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )
      } else {
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-6 text-yellow-400 ${offset}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )
      }
      stars.push(
        <div
          onMouseOver={() => handleMouseOver(i)}
          onMouseOut={() => handleMouseOut()}
          onClick={() => applyRating(i)}
          className="w-3 overflow-hidden cursor-pointer"
        >
          {icon}
        </div>
      )
    }
    return stars
  }

  return <div className="flex">{Stars()}</div>
}
