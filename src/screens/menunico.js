import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Navigator } from 'menunico/src/composites/navigation'
import Restaurants from './restaurants'
import Restaurant from './restaurant'
import { TextInput } from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

class Menunico extends Component {

  render() {
    const navbarState = this.props.navigator && this.props.navigator.depth
    const navbarStyle = (this.props.navigator && this.props.navigator.currentRoute.navbar )|| {}
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
        </Navigator>
        <View style={{position: 'absolute', left: 0, right: 0}}
          flex={0} height={60} direction='row'
          align='center' justify='space-between'
          padding={[0,20,0,20]}
          background={navbarStyle.background}>
          {navbarState
            ? <Icon name='arrow-back' size={24} color={navbarStyle.color || 'black'}/>
            : <Icon name='menu' size={24} />}
            {navbarState
              ? null
              : <TextInput underlineColorAndroid='#F2504B' placeholder='Search Restaurants' style={{width: 200, fontSize: 14}}/>
            }
            {
              navbarState
              ? null
              : <Icon name='search' size={24} />
            }
        </View>
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
