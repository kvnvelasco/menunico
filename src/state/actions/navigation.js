

export function push(navigator, route){
  return async dispatch => {
    dispatch({type: 'NAVIGATE_PUSH', payload: {id: navigator, route}})
  }
}

export function pop() {
  return async dispatch => {
    dispatch({type: 'NAVIGATE_POP'})
  }
}

export function replace(navigator, route) {
  return async dispatch => {
    dispatch({type: 'NAVIGATE_REPLACE', payload: {id: navigator, route}})
  }
}
