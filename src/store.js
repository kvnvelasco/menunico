import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const middleware = applyMiddleware( thunk )
import reducers from './reducers'


export default createStore(reducers, middleware)
