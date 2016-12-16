import axios from 'axios'

let api = axios.create({
  baseURL: 'http://www.menunico.es:8080/',
  headers: {
    'Content-Type':'application/json;charset=UTF-8'
  }
})

export async function fetchRestaurants() {
  return await api.post('search', {})
}
