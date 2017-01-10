import React, { Component } from 'react';
import raven from 'raven-js'
import raven_rn from 'raven-js/plugins/react-native'
raven_rn(raven)

raven
  .config('https://29553d0f5989462d9cbd4656a2838fa6@sentry.io/127539', { release: "0.2.2" })
  .install()

import { View } from 'menunico/src/components/layout'
import Splash from './screens/splash'
import Menunico from './screens/menunico'

import { Provider, connect } from 'react-redux'

import { Navigator } from 'menunico/src/composites/navigation'

import store from './store'
const ConnectedNavigator = connect(store => ({
  data: store.navigation.main
}))(Navigator)

console.logException = function(ex) {
  raven.captureException(ex, {
    extra: store.getState()
  });
  /*eslint no-console:0*/
  window.console && console.error && console.error(ex);
}

export default class menunico extends Component {
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
