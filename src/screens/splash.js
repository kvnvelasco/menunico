import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Image } from 'menunico/src/components/media'

import splash from 'menunico/src/static/splash.jpg'

export default class Splash extends Component {

  componentDidMount() {
    const route = { key: 'menunico' }
    setTimeout(this.props.dispatch.bind(this, this.props.navigator.replace('main', route)), 1200)
  }
  render(){
    return (
      <Image source={splash} full/>
    )
  }
}
