initialState = {
  hasInternet: false,
  geoStatus: false
}

export default function application(state = initialState, action) {
  const {type, payload} = action
  switch(type) {
    case 'USER_GEO':
      return {...state, geoStatus: true}
    case 'NO_GEOLOCATION_AVAILABLE':
      return {...state, geoStatus: false}
    default:
    return state
  }
}
