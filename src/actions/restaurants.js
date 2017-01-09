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
      let post = {}
      if(filter) {
        post.origins = serialize(filter.cuisine)
        post.types = serialize(filter.preferences)
        post.services = serialize(filter.services)
        post.paymentmethods = serialize(filter.payment)
        post.geobox = {}
      }
      if(searchText) {
        post.address = {
          city: searchText
        }
      }
      const response = await fetchRestaurants(post)
      dispatch({type:'LOAD_RESTAURANTS', payload:response })
      dispatch({type: 'NAVIGATE_POP'})
    } catch (e) {
      console.logException(e)
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
      console.logException(e)
    }
  }
}

export function highLightResto(resto, index) {
  return async dispatch => {
    try {
      dispatch( {type: 'RESTAURANT_HIGHLIGHTED', payload: {id: resto.mainid, index}} )
    } catch (e) {
      console.logException(e)
    }
  }
}
