import data from '../data/restaurants.json'
const initialState = {
  list: data
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_RESTAURANT':
      return {...state, selected: action.payload}
    default:
      return state
  }
}
