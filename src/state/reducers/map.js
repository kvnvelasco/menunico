// reducer with dependencies
import {Animated} from 'react-native'
const initialState = {
  show: false,
  watchID: undefined,
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.125,
    longitudeDelta: 0.125
  },
  pins: {},
  rotation: new Animated.Value(0),
  highlighted: undefined,
  controlMode: 'ribbon',
}

export default function reducer(state=initialState, action) {
  const {type, payload} = action
  switch(type) {
    case 'START_MAP_VIEW':
      return {...state, show: true}
    case 'NAVIGATE_TO_REGION':
      return {...state, region: payload}
    case 'CHANGE_CONTROL_MODE':
      return {...state, controlMode: payload}
    case 'HIGHLIGHT_RESTAURANT':
      return {...state, highlighted: payload}
    case 'NEW_PIN':
      return {...state, pins: {
        ...state.pins,
        [payload.id]: payload.pin
      }}
    case 'GEOLOCATON_WATCH_ID':
      return {...state, watchID: payload}
    default:
      return state
  }
}
