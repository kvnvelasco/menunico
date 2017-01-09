
const geoPromise = new Promise( (resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject)
})


export function pollGeo() {
  return async dispatch => {
    const geo = await geoPromise
    dispatch({type: 'USER_GEO', payload: geo.coords})
  }
}
