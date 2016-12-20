import React, {Component} from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View } from 'menunico/src/components/layout'
import {Text} from 'menunico/src/components/type'

export default class Menu extends Component {
  constructor(){
    super()
    this.state = {
      position:  new Animated.Value(-250)
    }
    this._open = this._open.bind(this)
  }

  _open(){
    Animated.timing(this.state.position, {
      duration: 300,
      toValue: 0
    }).start()
  }

  _close() {
    Animated.timing(this.state.position, {
      duration: 300,
      toValue: -250
    }).start()
  }

  render(){
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      width: 250,
      transform: [
        {translateX: this.state.position}
      ]
    }
    return <Animated.View style={style}>
      <View align='stretch' padding={[20,20,20,20]}>
        <View direction='row' flex={0}>
          <TouchableOpacity
            onPress={this._close.bind(this)}>
            <Icon name='close' size={24}/>
          </TouchableOpacity>
        </View>
        <View padding={[30]} flex={0} height={250} justify='space-between'>
          <Text size={24} bold>Home</Text>
          <Text size={24} bold>Favorites</Text>
          <Text size={24} bold>Settings</Text>
          <Text size={24} bold>FAQ</Text>
        </View>
      </View>
    </Animated.View>
  }
}
