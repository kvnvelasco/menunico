import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Navigator } from 'menunico/src/composites/navigation'
import Restaurants from './restaurants'
import Restaurant from './restaurant'
import Dish from './dish'
import Menu from './menu'
import Filters from './filters'
import Map from './map'
import FAQ from './faq'
import Settings from './settings'
import { TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {Text} from 'menunico/src/components/type'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { filterRestaurants } from 'menunico/src/actions/restaurants'

class Menunico extends Component {
  constructor(){
    super()
    this.menu = {},
    this.state =  {
    searchText: ''
    }
  }
  _backHandler() {
    this.props.dispatch({type:'NAVIGATE_POP'})
  }

  _searchTextHandler(event) {
    this.setState({searchText: event.nativeEvent.text})
  }

  _search() {
    this.props.dispatch(filterRestaurants(null, this.state.searchText))
  }

  render() {
    const allNavigators = this.props.allNavigators
    const navStack = allNavigators.navigatorStack
    const navigator = allNavigators[navStack[navStack.length - 1]] || {}
    const currentRoute = navigator.currentRoute || {}
    const navbarStyle = currentRoute.navbar || {}
    const showSearch = currentRoute.showSearch

    const thisNavigator = this.props.navigator || {}
    const navbarState = thisNavigator.depth
    return (
      <View align='stretch'>
        <Navigator
          id='menunico'
          data={this.props.navigator}
          dispatch={this.props.dispatch}>
          <Restaurants key='restaurants'
            restaurants={this.props.restaurants.list}
            fetching={this.props.restaurants.fetching}
            static={this.props.static}/>
          <Restaurant key='restaurant'
            restaurants={this.props.restaurants.list}
            static={this.props.static}/>
          <Dish key='dish' static={this.props.static} data={this.props.restaurants.selectedDish} static={this.props.static}/>
          <Filters key='filters'/>
          <Map restaurants={this.props.restaurants.list}
            location={this.props.user.geo}
            heading={this.props.user.heading}
            highlighted={this.props.restaurants.highlighted}
            key='map' />
          <FAQ key='faq'/>,
          <Settings key='settings' />
        </Navigator>
        <View style={{position: 'absolute', left: 0, right: 0}}
          flex={0} height={60} direction='row'
          align='center'
          justify={currentRoute.title && !showSearch
          ? 'flex-start' : 'space-between'}
          padding={[10,20,0,20]}
          background={navbarStyle.background || 'white'}>
          {navbarState
            ? <TouchableOpacity
                hitSlop={ {top: 10, left: 10, bottom: 10, right: 10}}
                onPress={this._backHandler.bind(this)}>
                <Icon name='arrow-back' size={24} color={navbarStyle.color || 'black'}/>
              </TouchableOpacity>
            : <TouchableOpacity
                hitSlop={ {top: 10, left: 10, bottom: 10, right: 10}}
               onPress={this.menu._open}>
                <Icon name='menu' size={24} />
              </TouchableOpacity>
          }
            {navbarState && !showSearch
              ? <Text size={20} bold style={{marginLeft: 10}}>
                {this.props.navigator.currentRoute.title || ''}</Text>
              : <TextInput
                onChange={this._searchTextHandler.bind(this)}
                underlineColorAndroid='#F2504B'
                placeholder='(Address, Restaurant, Dish)'
                style={{width: 240, fontSize: 14}}/>
            }
            {
              navbarState && !showSearch
              ? null
              : <TouchableOpacity onPress={this._search.bind(this)}>
                  <Icon name='search' size={24} />
                </TouchableOpacity>
            }
            {
              currentRoute.extra
              ? currentRoute.extra
              : null
            }
        </View>
        <Menu icons={this.props.static.menu}
          dispatch={this.props.dispatch}
          ref={menu => this.menu = menu}/>
      </View>
    )
  }
}

export default connect( store => ({
  navigator: store.navigation.menunico,
  allNavigators: store.navigation,
  restaurants: store.restaurants,
  selected: store.restaurants.selected,
  static: store.static,
  user: store.user
}))(Menunico)
