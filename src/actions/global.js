import {fetchRestaurants} from './api'

export function bootstrap() {
  return async dispatch => {
    try {
      const {data} = await fetchRestaurants()
      dispatch({type:'LOAD_RESTAURANTS', payload: data.items})
      const navigate = {
        id: 'main',
        route: { key: 'menunico'}
      }
      dispatch({type: 'NAVIGATE_REPLACE', payload: navigate})
    } catch (e) {
      console.error('Bootstrap error', e)
    }
  }
}
