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
export function filterRestaurants(filter){
  return async dispatch => {
    try {
      let post = {}
      post.origins = serialize(filter.cuisine)
      post.types = serialize(filter.preferences)
      post.services = serialize(filter.services)
      post.paymentmethods = serialize(filter.payment)
      post.address = {}
      post.geobox = {}
      const response = await fetchRestaurants(post)
      dispatch({type:'LOAD_RESTAURANTS', payload:response.data.items})
      dispatch({type: 'NAVIGATE_POP'})

    } catch (e) {
      console.error(e)
    }
  }
}
