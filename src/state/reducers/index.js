import { combineReducers } from 'redux'

import application from './application'
import navigation from './navigation'
import restaurants from './restaurants'
import staticAssets from './static'
import user from './user'

export default combineReducers({
  application,
  navigation,
  restaurants,
  static: staticAssets,
  user
})
