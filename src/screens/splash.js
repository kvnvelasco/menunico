import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Image } from 'menunico/src/components/media'

import splash from 'menunico/src/static/splash.jpg'
import { bootstrap } from 'menunico/src/actions/application'
import {once} from 'lodash'
const one = once(bootstrap)

export default class Splash extends Component {
  componentWillMount() {
    const route = { key: 'menunico' }
    this.props.dispatch(one())
  }
  render(){
    return (
      <Image source={splash} full/>
    )
  }
}
