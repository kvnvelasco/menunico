import {ToastAndroid, PermissionsAndroid, DeviceEventEmitter, InteractionManager} from 'react-native'
import ReactNativeHeading from 'react-native-heading'

export function getLocationInformation(dispatch) {
  return async dispatch => {
    try {
      const geoPromise = new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      const geo = await geoPromise
      dispatch({type: 'USER_GEO', payload: geo.coords})
      return geo.coords
    } catch (e) {
      ToastAndroid.show('To get the most out of Menunico, enable the GPS', ToastAndroid.LONG)
      dispatch({type: 'NO_GEOLOCATION_AVAILABLE'})
    }
  }
}

export function monitorGeo() {
  return async dispatch => {
    try {
      const watchID = await navigator.geolocation.watchPosition( pos => {
        dispatch({type: 'UPDATE_GEOLOCATION', payload: pos.coords})
      }, err => {
        dispatch({type: 'NO_GEOLOCATION_AVAILABLE'})
      }, {
        // OPTIONS
        enableHighAccuracy: true
      })
      dispatch({type: 'GEOLOCATON_WATCH_ID', payload: watchID})
    } catch (e) {
      dispatch({type: 'NO_GEOLOCATION_AVAILABLE'})
    }
  }
}

export function stopMonitorGeo(ID) {
  return async dispatch => {
    try {
      return await navigator.geolocation.clearWatch(ID)
    } catch (e) {
      console.error(e)
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

export function stopLogHeading() {
  return async dispatch => {
    ReactNativeHeading.stop();
    DeviceEventEmitter.removeAllListeners('headingUpdated');
  }
}
