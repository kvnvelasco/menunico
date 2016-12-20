import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Image } from 'menunico/src/components/media'

import splash from 'menunico/src/static/splash.jpg'
import { bootstrap } from 'menunico/src/actions/global'


export default class Splash extends Component {

  componentDidMount() {
    const route = { key: 'menunico' }
    this.props.dispatch(bootstrap())
  }
  render(){
    return (
      <Image source={splash} full/>
    )
  }
}
