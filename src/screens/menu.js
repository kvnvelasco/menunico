import React, {Component} from 'react'
import { Animated, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View } from 'menunico/src/components/layout'
import {Text} from 'menunico/src/components/type'
import {TextWithImage} from 'menunico/src/composites/type'

export default class Menu extends Component {
  constructor(){
    super()
    this.state = {
      position:  new Animated.Value(-250),
      opacity: new Animated.Value(0)
    }
    this._open = this._open.bind(this)
  }

  _open(){
    this.setState({noTouch: true})
    Animated.sequence([
      Animated.timing(this.state.position, {
        duration: 150,
        toValue: 0
      }),
      Animated.timing(this.state.opacity, {
        duration: 150,
        toValue: 1
      }),
    ]).start()
  }

  _close() {
    this.setState({noTouch: false})
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        duration: 150,
        toValue: 0
      }),
      Animated.timing(this.state.position, {
        duration: 150,
        toValue: -250
      }),
    ]).start()
  }

  _navigateTo(location) {
    const navigate = {
      id: 'menunico',
      route: {key: location}
    }
    this.props.dispatch({type: 'NAVIGATE_PUSH', payload: navigate})
    this._close()
  }

  render(){
    const container = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
    const sidebar = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: Dimensions.get('window').width - 250,
      backgroundColor: 'rgba(0,0,0,0.4)',
      opacity: this.state.opacity
    }
    const menu = {
      alignItems: 'stretch',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      transform: [
        {translateX: (this.state.position)}
      ]
    }
    return (
        <Animated.View  style={container} pointerEvents='box-none'>
          <View pointerEvents={this.state.noTouch ? 'auto' : 'none'}>
            <TouchableWithoutFeedback onPress={this._close.bind(this)} style={container}>
              <Animated.View  style={sidebar}/>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View style={menu}>
            <View background='white' padding={[20,20,20,20]} width={250}>
              <View direction='row' flex={0}>
                <TouchableOpacity
                  onPress={this._close.bind(this)}>
                  <Icon name='close' size={24}/>
                </TouchableOpacity>
              </View>
              <View padding={[30]} flex={0} height={300} justify='space-between'>
                <TouchableOpacity onPress={this._close.bind(this)}>
                  <TextWithImage
                    size={24}
                    scale={2}
                    color='#F44E3F'
                    image={this.props.icons.home}>
                    Home
                  </TextWithImage>
                </TouchableOpacity>
                <TouchableOpacity>
                  <TextWithImage
                    size={24}
                    scale={1}
                    color='#F44E3F'
                    image={this.props.icons.heart}>
                    Favorites
                  </TextWithImage>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._navigateTo.bind(this, 'settings')}>
                  <TextWithImage
                    size={24}
                    scale={1}
                    color='#F44E3F'
                    image={this.props.icons.setting}>
                    Settings
                  </TextWithImage>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._navigateTo.bind(this, 'faq')}>
                  <TextWithImage
                    size={24}
                    scale={1}
                    color='#F44E3F'
                    image={this.props.icons.faq}>
                    FAQ
                  </TextWithImage>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._close.bind(this)}>
                  <TextWithImage
                    size={24}
                    scale={1}
                    color='#F44E3F'
                    image={this.props.icons.logout}>
                    Logout
                  </TextWithImage>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
    )
  }
}
