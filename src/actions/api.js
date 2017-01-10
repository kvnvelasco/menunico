import axios from 'axios'

let api = axios.create({
  baseURL: 'http://www.menunico.es:8080/',
  headers: {
    'Content-Type':'application/json;charset=UTF-8'
  },
  timeout: 4000
})

api.interceptors.response.use(response => {
  if(!response)
    return Promise.reject({...response, status: 204})
  if(response.data.result === 'fail')
    return Promise.reject({...response, status: 500})
  if(response.data.result && response.data.result !== 'success')
    return Promise.reject({...response, status: 503})
  return response
})


export async function fetchRestaurants(search={}) {
  try {
    const response = await api.post('search', search)
    if(response.data.size !== response.data.items.length)
      throw {status: 500}
    const validatedResponse = response.data.items.filter(restaurantValidator)
    const responseWithMainImages = validatedResponse.map(restaurantPrimaryImageFinder)
    return responseWithMainImages
  } catch (e) {
    console.logException(e)
    switch (e.status) {
      case undefined:
        throw {type: 204, message: 'No Response from Server', error: e}
        break
      case 500:
        throw {type: 500, message: 'Server could not process request', error: e}
        break
      case 503:
        throw {type: 503, message: 'Bad Response from Server'}
      default:
        throw new Error('Unknown error occured during fetch restaurants')
    }
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
