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
  pins: [],
  rotation: new Animated.Value(0),
  heading: undefined,
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
    default:
      return state
  }
}
