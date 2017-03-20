import {fetchRestaurants, getFilters, getMenusByRestaurantIds, getDishById} from './api'
import {getLocationInformation} from './device'
import { DeviceEventEmitter, InteractionManager } from 'react-native'


export function bootstrap() {
  return async dispatch => {
    try {
      const geo = await getLocationInformation()(dispatch)
      console.log('Bootstrapped Location', geo)
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
      const filters = await getFilters()
      const {restaurants, menusByRestaurantIdandDate, dishesByDishId} = await fetchRestaurants(request)
      await dispatch({type: 'LOAD_MENUS', payload: menusByRestaurantIdandDate})
      await dispatch({type: 'LOAD_DISHES', payload: dishesByDishId})
      await dispatch({type:'LOAD_RESTAURANTS', payload: restaurants})
      await dispatch({type: 'LOAD_FILTERS', payload: filters})
      const navigate = {
        id: 'main',
        route: { key: 'menunico'}
      }
      dispatch({type: 'NAVIGATE_REPLACE', payload: navigate})
    } catch (e) {
      console.logException('Bootstrap Error', e )
    }
  }
}

export function openFilters() {
  return async dispatch => {
    const navigate = {
      route: {
        key: 'filters',
        animation: 'FloatFromBottom'
      },
      id: 'menunico'
    }
    dispatch({type: 'NAVIGATE_PUSH', payload: navigate})
  }
}
