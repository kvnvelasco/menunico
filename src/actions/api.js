import axios from 'axios'
import moment from 'moment'
import {error, ApiError} from './errors'

let api = axios.create({
  baseURL: 'http://www.menunico.es:8080/',
  headers: {
    'Content-Type':'application/json;charset=UTF-8'
  },
  timeout: 4000
})

api.interceptors.response.use(response => {
  // check header type
  if(response.headers['content-type'] !== 'application/json;charset=utf-8')
    return Promise.reject(response)
  if(!response)
    return Promise.reject(response)
  if(response.data.result === 'fail')
    return Promise.reject(response)
  if(response.data.result && response.data.result !== 'success')
    return Promise.reject(response)
  return response
})


export async function fetchRestaurants(search={}) {
  try {
    const response = await api.post('search/restaurant', search)
    const validatedResponse = response.data.items.filter(restaurantValidator)
    const responseWithMainImages = validatedResponse.map(restaurantPrimaryImageFinder)
    return responseWithMainImages
  } catch (e) {
    console.logException('Api error',e)
    throw new ApiError(e)
  }
}

export async function getFilters() {
  return await api.get('search/restaurant/parameters')
}

export async function getMenuByRestaurantId(id, fromDate, toDate) {
  try {
    const dateFormat = /[0-9]{2}\/[0-1][0-9]\/[0-9]{4}/
    if(fromDate.match(dateFormat) && toDate.match(dateFormat)) {
      const data = {
        rsetaurantid: id,
        date: {
          from: fromDate,
          to: toDate
        }
      }
      return await api.post('search/menu', data)
    }
    return await api.post('search/menu', {restaurantid: id})
  } catch (e) {
    console.logException('Api error',e)
    throw new ApiError(e)
  }
}

export async function getDishById(id) {
  try {
    return await api.post('search/food', {id})
  } catch (e) {
    console.logException('Api error',e)
    throw new ApiError(e)
  }
}

function restaurantValidator(item) {
  try {
    const name = item.hasOwnProperty('name')
    const id = item.hasOwnProperty('mainid')
    const location = item.hasOwnProperty('location') && typeof item.location === 'object'
    const latlng = typeof item.location.lat === 'number' && typeof item.location.lon === 'number'
    return (name && id && location && latlng)
  } catch (e) {
    return false
  }
}

function restaurantPrimaryImageFinder(item) {
  if(!item.image.length) return item
  const images = item.image.sort((a,b) => a.type - b.type)
  if(images[0].type === 1) {
    return {...item, mainImage: images[0], image: images}
  } else {
    return {...item, image: images}
  }
}



// Search Parameters
// {
//    "origins" : ["African", "Mexican"],
//    "types" : ["Vegeterian","Vegan"],
//    "services" : ["Wifi", "Terrace"],
//    "paymentmethods" : ["Cash", "Mastercard"],
//    "address" : { "city" : "Barcelona",
//                  "address" : "Rambla",
//     "geobox" : { "top_left_lat" : 50.0,
//                            "top_left_lon" : 5.0,
//                               "bottom_rightlat"  :0.0,
//                               "bottom_right_lon" : 50.0}
//                   }
//  }
