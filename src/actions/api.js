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


export async function fetchRestaurants() {
  try {
    console.log('Starting Restaurant Fetch')
    return await api.post('search', {})
  } catch (e) {
    console.log(e.status)
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
        console.error('Fetch Restaurants Error', e)
    }
  }
}
