const initialState = {
  navigatorStack: []
}

export default function(state=initialState, action){
  switch (action.type) {
    case 'STARTUP_SEQUENCE':
      return {...initialState}
    case 'NAVIGATION_INIT':
      return {...state,
          navigatorStack: [...state.navigatorStack, action.payload.id],
          [action.payload.id]: {
            ...state[action.payload.id],
            depth: 0,
            routeStack: [action.payload.initialRoute],
            currentRoute: action.payload.initialRoute,
            navigateAction: '',
            final: (state.navigatorStack.length == 0)
          }}
    case 'NAVIGATE_PUSH':
      return {...state, [action.payload.id]: {
        ...state[action.payload.id],
        currentRoute: action.payload.route,
        navigateAction: 'PUSH',
        depth: state[action.payload.id].depth + 1,
        routeStack: [...state[action.payload.id].routeStack, action.payload.route],
        final: false
      }}
    case 'NAVIGATE_REPLACE':
      let newStack = state[action.payload.id].routeStack
      newStack.pop()
      newStack.push(action.payload.route)
      return {...state, [action.payload.id]: {
        ...state[action.payload.id],
        currentRoute: action.payload.route,
        navigateAction: 'REPLACE',
        routeStack: [...newStack]
      }}
    case 'NAVIGATE_RESET_TO':
      return {...state, [action.payload.id]: {
        ...state[action.payload.id],
        currentRoute: action.payload.route,
        navigateAction: 'RESET_TO',
        depth: 0,
        routeStack: []
      }}
    case 'NAVIGATOR_CLEAR_ACTION':
      return {...state, [action.payload.id]: {
        ...state[action.payload.id],
        navigateAction: ''
      }}

    case 'NAVIGATE_POP_SPECIFIC':
      // check where the selected navigator is and slice it
      let stack = state.navigatorStack.slice(0, state.navigatorStack.indexOf(action.payload.id)+1)
      let targetNavigator = state[action.payload.id]
      targetNavigator.final = !targetNavigator.depth
      targetNavigator.depth = targetNavigator.depth - 1
      targetNavigator.routeStack.pop()
      targetNavigator.currentRoute = targetNavigator.routeStack[targetNavigator.routeStack.length - 1]
      return {...state, [action.payload.id]: {
        ...targetNavigator,
        navigateAction: 'POP'
      }, navigatorStack: stack }
    case 'NAVIGATE_POP':
      // check if the current route will underflow
      // then if it will, delegate the back event to the previous navigtor in the route stack
      // then deactivate the original route
      targetNavigator = {
        key: state.navigatorStack[state.navigatorStack.length - 1],
        values: state[state.navigatorStack[state.navigatorStack.length - 1]]
      }
      let navStack = state.navigatorStack
      let releasedNavigator = {}
      if(targetNavigator.values.depth == 0 && state.navigatorStack.length >= 2) {
        releasedNavigator = targetNavigator
        releasedNavigator.values = state[releasedNavigator.key]
        releasedNavigator.values.active = false
        navStack.pop()
        targetNavigator = { key: navStack[navStack.length - 1] }
      } else {
        releasedNavigator = targetNavigator
      }

      targetNavigator.values = state[targetNavigator.key]
      targetNavigator.values.depth = targetNavigator.values.depth ? targetNavigator.values.depth - 1 : 0
      targetNavigator.values.final = (!targetNavigator.values.depth && state.navigatorStack.length <= 1)
      targetNavigator.values.currentRoute = targetNavigator.values.routeStack[targetNavigator.values.depth]
      targetNavigator.values.routeStack.pop()
      targetNavigator.values.active = true
      targetNavigator.values.navigateAction = 'POP'

      return { ...state,
        navigatorStack: [...navStack],
        [targetNavigator.key]: {
        ...targetNavigator.values
      }, [releasedNavigator.key || targetNavigator.key]: {
        ...targetNavigator.values,
        ...releasedNavigator.values
      }}
    default:
      return state
  }
}
