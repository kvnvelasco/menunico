initialState = {
  hasInternet: false
}

export default function application(state = initialState, action) {
  const {type, payload} = action
  return state
}
