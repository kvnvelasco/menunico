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
    return (
      <View align='stretch'>
        <View flex={0} direction='row' align='center' justify='space-between' padding={[0,20,0,20]}>
          <Icon name='menu' size={24} />
          <TextInput underlineColorAndroid='#F2504B' placeholder='Search Restaurants' style={{width: 200, fontSize: 14}}/>
          <Icon name='search' size={24} />
        </View>
        <Navigator
          id='menunico'
          data={this.props.navigator}
          dispatch={this.props.dispatch}>
          <Restaurants key='restaurants'/>
          <Restaurant key='restaurant'/>
        </Navigator>
      </View>
    )
  }
}

export default connect( store => ({
  navigator: store.navigation.menunico
}))(Menunico)
