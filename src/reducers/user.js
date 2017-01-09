const initialState = {}

export default function user(state=initialState, action) {
  const {type, payload} = action
  switch (type) {
    case 'USER_GEO':
      return {...state, geo: payload}
    case 'USER_HEADING':
      return {...state, heading: payload}
    default:
      return state
  }
}
