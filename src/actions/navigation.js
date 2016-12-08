
export function push(navigator, route){
  return async dispatch => {
    dispatch({type: 'NAVIGATE_PUSH', payload: {id: navigator, route}})
  }
}

export function pop(navigator) {
  return async dispatch => {
    dispatch({type: 'NAVIGATE_PUSH', payload: navigator})
  }
}

export function replace(navigator, route) {
  return async dispatch => {
    dispatch({type: 'NAVIGATE_REPLACE', payload: {id: navigator, route}})
  }
}
