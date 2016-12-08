import React, { Component } from 'react';

import { View } from 'menunico/src/components/layout'
import Splash from './screens/splash'
import Menunico from './screens/menunico'

import { Provider, connect } from 'react-redux'

import { Navigator } from 'menunico/src/composites/navigation'

import store from './store'
const ConnectedNavigator = connect(store => ({
  data: store.navigation.main
}))(Navigator)

export default class menunico extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedNavigator id='main'>
          <Splash key='splash'/>
          <Menunico key='menunico'/>
          <View key='restaurants' />
        </ConnectedNavigator>
      </Provider>
    );
  }
}
