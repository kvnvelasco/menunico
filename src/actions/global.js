import {fetchRestaurants} from './api'
import {ToastAndroid, PermissionsAndroid} from 'react-native'

import { DeviceEventEmitter, InteractionManager } from 'react-native'
import ReactNativeHeading from 'react-native-heading'



export function bootstrap() {
  return async dispatch => {
    try {
      // Check geo permissions
      // const geoPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      // console.warn(geoPermission)
      const geo = await getLocationInformation(dispatch)
      await dispatch({type:'LOADING_RESTAURANTS'})
      let request = {}
      if(geo) {
        request = {
          "geobox" : {
            "top_left_lat":     geo.latitude   - 0.125,
            "top_left_lon":     geo.longitude  - 0.125,
            "bottom_right_lat": geo.latitude   + 0.125,
            "bottom_right_lon": geo.longitude  + 0.125
          }
        }
      }
      const response = await fetchRestaurants(request)
      await dispatch({type:'LOAD_RESTAURANTS', payload: response})
      const navigate = {
        id: 'main',
        route: { key: 'menunico'}
      }
      dispatch({type: 'NAVIGATE_REPLACE', payload: navigate})
    } catch (e) {
      console.logException('Bootstrap Error', e)
    }
  }
}

async function getLocationInformation(dispatch) {
  try {
    const geoPromise = new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    const geo = await geoPromise
    dispatch({type: 'USER_GEO', payload: geo.coords})
    navigator.geolocation.watchPosition( (succ, err) => {
      if(succ) dispatch({type: 'USER_GEO', payload: succ.coords})
    }, {enableHighAccuracy: true})
    return geo.coords
  } catch (e) {
    dispatch({type: 'NO_GEOLOCATION_AVAILABLE'})
  }
}

export function logHeading() {
  return async dispatch => {
    const heading = await ReactNativeHeading.start(5)
    DeviceEventEmitter.addListener('headingUpdated', data => {
      InteractionManager.runAfterInteractions(x => {
        dispatch({type: 'USER_HEADING', payload: data.heading})
      })
    })
  }
}

export function openFilters() {
  return async dispatch => {
    const navigate = {
      route: {
        key: 'filters',
        animation: 'FloatFromBottom',
        showSearch: false
      },
      id: 'menunico'
    }
    dispatch({type: 'NAVIGATE_PUSH', payload: navigate})
  }
}
export function stopLogHeading() {
  ReactNativeHeading.stop();
  DeviceEventEmitter.removeAllListeners('headingUpdated');
}
