import {fetchRestaurants} from './api'
import {ToastAndroid} from 'react-native'
export function bootstrap() {
  return async dispatch => {
    try {
      const date = new Date()
      await dispatch({type:'LOADING_RESTAURANTS'})
      const response = await fetchRestaurants()
      if(!response.data.items || !response.data.items.length)
        throw {type: 500}
      await dispatch({type:'LOAD_RESTAURANTS', payload: response.data.items})
      const navigate = {
        id: 'main',
        route: { key: 'menunico'}
      }
      dispatch({type: 'NAVIGATE_REPLACE', payload: navigate})
      console.log(`Finished bootstrap in ${new Date() - date}ms`)
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
