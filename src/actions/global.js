import {fetchRestaurants} from './api'
import {ToastAndroid} from 'react-native'

import { DeviceEventEmitter, InteractionManager } from 'react-native'
import ReactNativeHeading from 'react-native-heading'

const geoPromise = new Promise( (resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject)
})

export function bootstrap() {
  return async dispatch => {
    try {
      const geo = await geoPromise
      await dispatch({type: 'USER_GEO', payload: geo.coords})
      navigator.geolocation.watchPosition( (succ, err) => {
        if(succ) dispatch({type: 'USER_GEO', payload: succ.coords})
      }, {enableHighAccuracy: true})

      await dispatch({type:'LOADING_RESTAURANTS'})
      const request = {
        "geobox" : {
          "top_left_lat":     geo.coords.latitude   - 0.125,
          "top_left_lon":     geo.coords.longitude  - 0.125,
          "bottom_right_lat": geo.coords.latitude   + 0.125,
          "bottom_right_lon": geo.coords.longitude  + 0.125
        }
      }
      const response = await fetchRestaurants(request)
      if(!response.length)
        throw {type: 500}
      await dispatch({type:'LOAD_RESTAURANTS', payload: response})
      const navigate = {
        id: 'main',
        route: { key: 'menunico'}
      }
      dispatch({type: 'NAVIGATE_REPLACE', payload: navigate})
    } catch (e) {
      console.logException(e)
      switch(e.message) {
        case 'Location request timed out':
          ToastAndroid.show('Menunico Requires Location Information', ToastAndroid.LONG)
          throw new Error('Menunico Requires Location Information')
        default:
          throw new Error('An unknown exception occured during bootstrap')
      }
      if(e.type) {
        switch (e.type) {
          case 204:
            ToastAndroid.show('Please check your internet connection (204)', ToastAndroid.LONG)
            throw new Error('Please check your internet connection (204)')
            break;
          case 500:
              ToastAndroid.show('Server could not process your request (500)', ToastAndroid.LONG)
              throw new Error('Server could not process your request (500)')
            break
          case 503:
            ToastAndroid.show('Please check your internet connection (503)', ToastAndroid.LONG)
            throw new Error('Please check your internet connection (503)')
            break;
          default:
            ToastAndroid.show('Unexpected Error. Please make sure you are connected to the internet', ToastAndroid.LONG)
            throw new Error('An unknown exception occured during bootstrap')
        }
      }
    }
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
        title: 'Set Filters',
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
