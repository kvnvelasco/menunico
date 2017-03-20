import { fetchRestaurants } from './api'

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function serialize(obj={}) {
  let arr=[]
  for(item in obj) {
    if(obj[item])
      arr.push(capitalize(item))
  }
  return arr
}
export function filterRestaurants(filter, searchText){
  return async dispatch => {
    try {
      dispatch({type: 'FETCHING_RESTAURANTS'})
      let post = filter
      if(searchText) {
        post.address = {
          city: searchText
        }
      }
      const {restaurants, menusByRestaurantIdandDate, dishesByDishId} = await fetchRestaurants(post)
      dispatch({type: 'LOAD_MENUS', payload: menusByRestaurantIdandDate})
      dispatch({type: 'LOAD_DISHES', payload: dishesByDishId})
      dispatch({type:'LOAD_RESTAURANTS', payload: restaurants})
    } catch (e) {
      console.logException('Filter Restaurant Error', e)
      dispatch({type:'FETCH_RESTAURANTS_FAIL'})
    }
  }
}

export function geoSort(restaurants, coords) {
  return async dispatch => {

  }
}

export function openRestaurant(index, name) {
  return async dispatch => {
    try {

      const navigation = {
        route: {
          key: 'restaurant',
          index: index,
          navbar: {
            title: name,
            'color': 'black',
            background: 'rgba(0,0,0,0.0)'
          }
        },
        id: 'menunico'
      }
      dispatch({type: 'NAVIGATE_PUSH', payload: navigation})
    } catch (e) {
      console.logException('Open Restaurant Error', e)
    }
  }
}

export function highLightResto(resto, index) {
  return async dispatch => {
    try {
      dispatch( {type: 'RESTAURANT_HIGHLIGHTED', payload: {id: resto.mainid, index}} )
    } catch (e) {
      console.logException('Highlight Restaurant Error', e)
    }
  }
}

export function selectNeighborhood(name) {
  return async dispatch => {
    try {
      dispatch({type: 'SELECT_NEIGHBORHOOD', payload: name})

    } catch (e) {
      console.logException('Select Neighborhood Error', e)
    }
  }
}
