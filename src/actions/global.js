import {fetchRestaurants} from './api'
import {ToastAndroid} from 'react-native'

const geoPromise = new Promise( (resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject)
})

export function bootstrap() {
  return async dispatch => {
    try {
      const geo = await geoPromise
      await dispatch({type:'LOADING_RESTAURANTS'})
      const request = {
        "geobox" : {
          "top_left_lat":     geo.coords.latitude   - 0.125,
          "top_left_lon":     geo.coords.longitude  - 0.125,
          "bottom_right_lat": geo.coords.latitude   + 0.125,
          "bottom_right_lon": geo.coords.longitude  + 0.125
        }
      }
      console.log(request)
      const response = await fetchRestaurants(request)
      if(!response.data.items || !response.data.items.length)
        throw {type: 500}
      await dispatch({type:'LOAD_RESTAURANTS', payload: response.data.items})
      const navigate = {
        id: 'main',
        route: { key: 'menunico'}
      }
      dispatch({type: 'NAVIGATE_REPLACE', payload: navigate})
    } catch (e) {
      console.log('bootstrap failed with ', e)
      switch (e.type) {
        case 204:
          ToastAndroid.show('Please check your internet connection (204)', ToastAndroid.LONG)
          break;
        case 500:
            ToastAndroid.show('Server could not process your request (500)', ToastAndroid.LONG)
          break
        case 503:
          ToastAndroid.show('Please check your internet connection (503)', ToastAndroid.LONG)
          break;
        default:
          ToastAndroid.show('Unexpected Error. Please make sure you are connected to the internet', ToastAndroid.LONG)
          console.log('Error!:', e)
      }
    }
  }
}
