import React, { Component, PropTypes } from 'react'
import { BackAndroid,
          TouchableOpacity,
          StyleSheet,
          Navigator as NativeNavigator,
          InteractionManager } from 'react-native'
let Back = BackAndroid

import { View } from 'menunico/src/components/layout'
import { push, pop, replace } from 'menunico/src/actions/navigation'

import Icon from 'react-native-vector-icons'

export class Header extends Component {
  render() {
    return <View />
  }
}

export class Navigator extends Component {
  constructor(props) {
    super(props)
    this._configureScene = this._configureScene.bind(this)
    this._renderScene = this._renderScene.bind(this)
    this._assembleRoute = this._assembleRoute.bind(this)
    this.id = props.id
    this._handleBack = this._handleBack.bind(this)
    this.initialRoute = props.initialRoute || { key: props.children[0].key }
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object
  }

  componentDidMount(){
    this.props.dispatch({type: 'NAVIGATION_INIT', payload: {id: this.props.id, initialRoute: this.initialRoute}})
    Back.addEventListener(`hardwareBackPress`, this._handleBack)
  }

  componentWillUnmount(){
    Back.removeEventListener(`hardwareBackPress`, this._handleBack)
  }

  _handleBack() {
    if(this.props.data.final){return false}
    this.props.dispatch({type: 'NAVIGATE_POP'})
    return true
  }

  componentWillReceiveProps(newProps) {
    if(newProps.data === this.props.data) {return false}
    switch (newProps.data.navigateAction) {
      case 'PUSH':
        setTimeout(() => {
          this.nav.push(newProps.data.currentRoute)
        }, 0)
        break
      case 'POP':
        if(this.props.data.final){
          BackAndroid.exitApp()
        }
        setTimeout(() => {
          this.nav.pop()
        }, 0)
        break
      case 'RESET_TO':
        this.nav.resetTo(newProps.data.currentRoute)
        // this.nav.immediatelyResetRouteStack([newProps.data.currentRoute])
      case 'REPLACE':
        this.nav.replace(newProps.data.currentRoute)
        break
      default:
        break
    }
  }

  _assembleRoute(route, nav){
    const element = this.props.children.find( item => {
                      return item.key === route.key
                    })
    if(!element){
      console.error(`no route found for ${route.key}`)
      return false
    }

    const boundPop = this.props.dispatch.bind(element, pop())

    const component = {...element, props: {...element.props, dispatch: this.props.dispatch,
      route, navigator: {push, pop: boundPop, replace}}}

    return {
      ...route,
      key: route.key,
      component: component,
      animation: element.props.animateIn || 'PushFromRight'
    }
  }

  _configureScene(route) {
    return NativeNavigator.SceneConfigs[route.animation || 'PushFromRight']
  }

  _renderScene(nav, route, navigator) {
    const scene = this._assembleRoute(route, nav)
    return scene.component
  }

  render() {
    return <NativeNavigator
      configureScene={this._configureScene}
      initialRoute={this.initialRoute}
      renderScene={this._renderScene.bind(this, this.nav)}
      ref={ nav => this.nav = nav}
    />
  }
}
