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
    // search deconstruction
    const { restaurantid, date } = search

    const { items, result } = await api.post('search/restaurant', search)
    if(result !== 'success') throw new ApiError('Failed to fetch restaurants')

    // Validate the response
    const validatedResponse = items.filter(restaurantValidator)

    // Get primary image of restaurants
    const restaurants = validatedResponse.map(restaurantPrimaryImageFinder)

    // Build an array of menu promises
    const menuPromises = validatedResponse.map( item => {
      return getMenuByRestaurantId(item.mainid)
    })

    // Get all the menus back
    const returnedMenus = await Promise.all(menuPromises)

    // coerce promises into single array and filter them
    const menus = returnedMenus.reduce((acc, item) => {
      return [...acc, ...(item.items || [])]
    }, [])
    .filter( menu => {
      // remove the menus that come before today
      return !(moment(menu.menudate, 'MM/DD/YYYY').isBefore(moment(), 'day'))
    })

    // create an index of all the menus by restaurantID
    const menusByRestaurantId = menus.reduce( (acc, item) => {
      const menus = [...(acc[item.restaurantid] || []), item].sort((l,r) => {
        const left = moment(l.menudate, 'MM/DD/YYYY')
        const right = moment(r.menudate, 'MM/DD/YYYY')
        return left.diff(right, 'days')
      })
      .map( item => {
        // sort the categories
        const categories = item.categories.sort( (a,b) => {
          return a.categoryid - b.categoryid
        })
        return {...item, categories}
      })
      return {...acc, [item.restaurantid]: menus}
    }, {})


    const menusByRestaurantIdandDate = Object.keys(menusByRestaurantId || [])
      .reduce( (acc, item) => {
        const menu = menusByRestaurantId[item] || []
        const menusByDate = menu.reduce((acc, item) => {
          return {...acc, [item.menudate]: item}
        }, {})
        return {...acc, [item]: menusByDate}
      }, {})

    // final object:
    // "<id>" : {
    //  "<DD/MM/YYYY": {
    //    Menu proper
    //  }
    // }

    // Get the dish IDs
    const dishIds = menus.reduce( (acc, item) => {
      const categories = item.categories.reduce( (acc, category) => {
        const food = category.foods.map(item => item.mainid)
        return acc.concat(food)
      }, [])
      return acc.concat(categories)
    }, [])

    const dishes = await getDishesByIds(dishIds)

    const dishesByDishId = dishes.reduce( (acc, item) => {
      return {...acc, [item.foodid]: item}
    }, {})

    return {restaurants, menusByRestaurantIdandDate, dishesByDishId}
    
  } catch (e) {
    return []
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
    // DD/MM/YYYY
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
