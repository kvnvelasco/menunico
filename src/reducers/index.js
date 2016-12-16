import { combineReducers } from 'redux'

import navigation from './navigation'
import restaurants from './restaurants'
import staticAssets from './static'

export default combineReducers({
  navigation,
  restaurants,
  static: staticAssets
})
