import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Navigator } from 'menunico/src/composites/navigation'
import Restaurants from './restaurants'
import Restaurant from './restaurant'
import Menu from './menu'
import Filters from './filters'
import { TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {Text} from 'menunico/src/components/type'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { pop } from 'menunico/'

class Menunico extends Component {
  constructor(){
    super()
    this.menu = {}
  }
  _backHandler() {
    this.props.dispatch({type:'NAVIGATE_POP'})
  }

  render() {
    const navbarState = this.props.navigator
      && this.props.navigator.depth
    const navbarStyle = (this.props.navigator
      && this.props.navigator.currentRoute.navbar )|| {}
    const back = <TouchableOpacity onPress={this._backHandler.bind(this)}>
              <Icon name='arrow-back' size={24} color={navbarStyle.color || 'black'}/>
            </TouchableOpacity>
    return (
      <View align='stretch'>
        <Navigator
          id='menunico'
          data={this.props.navigator}
          dispatch={this.props.dispatch}>
          <Restaurants key='restaurants'
            restaurants={this.props.restaurants}
            static={this.props.static}/>
          <Restaurant key='restaurant'
            restaurants={this.props.restaurants}
            selected={this.props.selected}
            static={this.props.static}/>
          <Filters key='filters'/>
        </Navigator>
        <View style={{position: 'absolute', left: 0, right: 0}}
          flex={0} height={60} direction='row'
          align='center' justify={ this.props.navigator &&
            this.props.navigator.currentRoute.title
            ? 'flex-start' : 'space-between'}
          padding={[0,20,0,20]}
          background={navbarStyle.background}>
          {navbarState
            ? back
            : <TouchableOpacity onPress={this.menu._open}>
                <Icon name='menu' size={24} />
              </TouchableOpacity>
          }
            {navbarState
              ? <Text size={20} bold style={{marginLeft: 10}}>
                {this.props.navigator.currentRoute.title || ''}</Text>
              : <TextInput underlineColorAndroid='#F2504B'
                placeholder='Search Restaurants'
                style={{width: 200, fontSize: 14}}/>
            }
            {
              navbarState
              ? null
              : <Icon name='search' size={24} />
            }
        </View>
        <Menu ref={menu => this.menu = menu}/>
      </View>
    )
  }
}

export default connect( store => ({
  navigator: store.navigation.menunico,
  restaurants: store.restaurants.list,
  selected: store.restaurants.selected,
  static: store.static
}))(Menunico)
