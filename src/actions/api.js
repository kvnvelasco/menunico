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
  return response.data
})


export async function fetchRestaurants(search={}) {
  try {
    const {items} = await api.post('search/restaurant', search)
    if(!items) return []
    const validatedResponse = items.filter(restaurantValidator)
    const menuPromises = validatedResponse.map( item => {
      return getMenuByRestaurantId(item.mainid)
    })
    const returnedMenus = await Promise.all(menuPromises)
    const menus = returnedMenus.reduce((acc, item) => {
      return [...acc, ...(item.items || [])]
    }, [])

    const menusByRestaurantId = menus.reduce( (acc, item) => {
      return {...acc, [item.restaurantid]: item}
    }, {})
    const responseWithMainImages = validatedResponse.map(restaurantPrimaryImageFinder)

    const restaurantsWithMenus = responseWithMainImages.map( restaurant => {
      if(!menusByRestaurantId[restaurant.mainid]) return null
      const rawMenu = menusByRestaurantId[restaurant.mainid]
      const menu = rawMenu.categories.sort( (a, b) => a.categoryid - b.categoryid).reduce( (acc, item) => {
        return {...acc, [item.name]: item.foods.map(item => item.mainid)}
      }, {})
      const dishes = Object.keys(menu).reduce((acc, item) => {
        return [...acc, ...menu[item]]
      },[])
      return {...restaurant, menu, dishes, rawMenu}
    })

    const dishIds = restaurantsWithMenus.reduce( (acc, item) => {
      if(!item) return acc
      return [...acc, ...item.dishes]
    }, [])
    const dishes = await getDishesByIds(dishIds)
    const dishesByDishId = dishes.reduce( (acc, item) => {
      return {...acc, [item.foodid]: item}
    }, {})

    const completeRestaurants = restaurantsWithMenus.map( item => {
      if(!item) return null
      let menu = {}
      for (var key in item.menu) {
        menu[key] = item.menu[key].map( item => {
          const dish = dishesByDishId[item]
          return {
            name: dish.name,
            descriptions: dish.foodlang.reduce( (acc, item) => {
              return {...acc, [item.lang]: item}
            }, {}),
            images: dish.images
          }
        })
      }
      return {...item, menu}
    })
    const restaurants = completeRestaurants.filter( item => item)
    return restaurants
  } catch (e) {
    console.logException('Api error',e)
    throw new ApiError(e)
  }
}

export async function getFilters() {
  const filters =  await api.get('search/restaurant/parameters')
  // transform filters to <key> : true
  const transformed = Object.keys(filters).reduce( (acc, item) => {
    const trueFilters = filters[item].reduce( (acc,filterItem) => {
      return {...acc, [filterItem]: false}
    }, {})
    return {...acc, [item]: trueFilters}
  }, {})
  return transformed
}

export async function getMenuByRestaurantId(id, fromDate, toDate) {
  try {
    const dateFormat = /[0-9]{2}\/[0-1][0-9]\/[0-9]{4}/
    if(fromDate && fromDate.match(dateFormat) && toDate&& toDate.match(dateFormat)) {
      const data = {
        rsetaurantid: id,
        date: {
          from: fromDate,
          to: toDate
        }
      }
      return await api.post('search/menu', data)
    }
    return await api.post('search/menu', {restaurantid: id.toString()})
  } catch (e) {
    console.logException('Api error',e)
    throw new ApiError(e)
  }
}

export async function getMenusByRestaurantIds(ids) {
  const menus = await api.post('search/menu/multiple', {ids: ids})
  return menus || []
}

export async function getDishById(id) {
  try {
    return await api.post('search/food', {id})
  } catch (e) {
    console.logException('Api error',e)
    throw new ApiError(e)
  }
}

export async function getDishesByIds(ids) {
  try {
    return await api.post('search/food/multiple', {ids: ids})
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
