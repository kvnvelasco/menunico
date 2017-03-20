import React, { Component } from 'react';
import { View } from 'menunico/src/components/layout'
import Splash from './screens/splash'
import Menunico from './screens/menunico'
import { Provider, connect } from 'react-redux'
import { Navigator } from 'menunico/src/composites/navigation'
import {AppState, NetInfo} from 'react-native'

import {exceptionHandlersInit} from 'menunico/src/actions/errors'

import store from './store'
const ConnectedNavigator = connect(store => ({
  data: store.navigation.main
}))(Navigator)




export default class menunico extends Component {

  componentDidMount() {
    exceptionHandlersInit()
    // check internet access
    NetInfo.fetch()
      .done( reach => {
        console.log('reach: ', reach)
      })
  }


  componentWillUnmount() {
  }

  render() {
    try {
      return (
        <Provider store={store}>
          <ConnectedNavigator id='main'>
            <Splash key='splash'/>
            <Menunico key='menunico'/>
          </ConnectedNavigator>
        </Provider>
      );
    } catch (e) {
      console.logException(e)
    }
  }
}
