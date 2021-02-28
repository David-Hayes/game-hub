export const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'SET_ADDING':
      return {
        ...state,
        adding: action.payload,
      }
    default:
      return { ...state }
  }
}
