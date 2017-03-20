import { combineReducers } from 'redux'

import application from './application'
import navigation from './navigation'
import restaurants from './restaurants'
import staticAssets from './static'
import user from './user'
import map from './map'

export default combineReducers({
  application,
  navigation,
  restaurants,
  static: staticAssets,
  user,
  map
})
