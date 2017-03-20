import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Image } from 'menunico/src/components/media'
import {Text} from 'menunico/src/components/type'

import { ListView, TouchableOpacity, RefreshControl } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Fa from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import {openFilters} from 'menunico/src/actions/application'
import { openRestaurant, filterRestaurants } from 'menunico/src/actions/restaurants'
import {tryToGetUserGeo} from 'menunico/src/actions/application'

export default class Restaurants extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: this._rowDiffHandler});
    this.state = {
       date: moment(),
       ds,
       refreshing: false,
       data: ds.cloneWithRows(props.restaurants)
     };
  }
  componentWillReceiveProps(newProps) {
    if(newProps.restaurants !== this.props.restaurants)
      this.setState({
        data: this.state.ds.cloneWithRows(newProps.restaurants)
    })
  }


  _rowDiffHandler(r1, r2) {
    return r1.mainid !== r2.mainid
  }

  _navigateToRestaurant(index, name) {
    this.props.dispatch(openRestaurant(index, name))
  }

  _getDistance(restaurantCoords) {
    if(!this.props.hasGeo) return false
    const user = this.props.location
    const dist = Math.sqrt(Math.pow(restaurantCoords.lon - user.longitude, 2) + Math.pow(restaurantCoords.lat - user.latitude, 2))
    let conversionFactor
    switch(true) {
      case Math.abs(user.latitude) > 67 :
        conversionFactor = 43.496
        break
      case Math.abs(user.latitude) > 45 :
        conversionFactor = 78.710
        break
      case Math.abs(user.latitude) > 23 :
        conversionFactor = 102.470
        break
      default:
        conversionFactor = 111.320
    }
    return (dist * conversionFactor).toFixed(2)
  }

  _renderRestaurant(row, section, index) {
    const {name, street, image} = row
    const menu = this.props.menus[row.mainid] || []
    const menuAvailable = menu[moment().format('MM/DD/YYYY')]
    const foodbyCategory = menuAvailable && menuAvailable.categories.reduce((acc, category, index) => {
      if(index > 2) return acc
      const food = category.foods.map(item => item.mainid)
      const object = {
        category: category.name,
        food
      }
      return acc.concat(object)
    }, [])
    const imageURL = 'https://s3.eu-central-1.amazonaws.com/menunico'
    let cover = row.mainImage
    const distance = this._getDistance({lat: row.lat, lon: row.lng})
    return (
      <View align='stretch' flex={0} padding={[0,10,0,10]}>
        <TouchableOpacity key='index' delayPressOut={0} delayPressIn={0} onPress={this._navigateToRestaurant.bind(this, index, name)}>
          <View margin={[15]} direction='row' flex={0} align='center'>
            <View align='stretch' width={150} height={170} flex={0}>
              {cover && <Image full resizeMode='cover' source={{uri: `${imageURL}/${cover.url}/128x128/${cover.name}`}}/>}
            </View>
            <View margin={[0,0,0,10]}>
              <Text size={16} lines={2} color='#F2504B'>{name}</Text>
              <Text size={12} lines={2} color='#ccc'>{`${street}`}</Text>
              <View>
                { menuAvailable
                  ? foodbyCategory.map( (category, index) => {
                      if(category.category == 'Appetizer') return null
                      return (
                        <Text size={12} lines={2}>
                          <Text size={12} bold>{category.category}:
                          </Text>
                          {category.food.reduce((acc, food, index, arr) => {
                            const dish = this.props.dishes[food]
                            const showComma = arr.length > 1 && index < arr.length - 1
                            return acc.concat(`${dish.name}${showComma ? ',' : ''} `)
                          }, '')}
                        </Text>
                      )
                    })
                  : <Text color='#666' lines={4} size={13}>Today, the menu of the day hasn't been updated.</Text>
                }
              </View>
            </View>
          </View>
          <View direction='row' flex={0} justify='space-between'>
            <Text color='#666' size={14}>{this.props.hasGeo ? `${distance}km away` : 'GPS not available'}</Text>
            <Text>{menuAvailable ? `${menuAvailable.fullmenu}€` : null}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _renderSeparator(section, row) {
    const style = {
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: '#ccc'
    }
    return <View flex={0} key={row} style={style} />
  }

  _openMap() {
    const navigate = {
      route: {
        key: 'map',
        animation: 'FloatFromBottom',
        title: 'Restaurant Map View',
        showSearch: true
      },
      id: 'menunico'
    }
    this.props.dispatch({type: 'NAVIGATE_PUSH', payload: navigate})
  }

  _onRefresh() {
    this.props.dispatch(tryToGetUserGeo())
    this.props.dispatch(filterRestaurants())
  }

  render(){
    return (
      <View padding={[20,0,0,0]}
        background='white'
        align='stretch' margin={[60]}>
        <View flex={0} direction='row'
          justify='center' align='center'
          margin={[20,0,20]}>
          <View background='#F2504B' round={40} align='center' padding={[5,15,5,15]} flex={0}>
            <Text size={14} white>{`Barcelona, ${this.state.date.format('dddd Do MMMM')}`}</Text>
          </View>
        </View>
        {this.props.restaurants.length ?
          <ListView
            contentContainerStyle={{
              overflow: 'hidden',
              paddingLeft: 20,
              paddingRight: 20
            }}
            enableEmptySections={false}
            showsVerticalScrollIndicator={false}
            initialListSize={3}
            pageSize={2}
            renderSeparator={this._renderSeparator}
            dataSource={this.state.data}
            renderRow={this._renderRestaurant.bind(this)}
            refreshControl={
              <RefreshControl
                refreshing={this.props.fetching}
                onRefresh={this._onRefresh.bind(this)}
              />
            }/>
          : <Text margin={[150, 30, 0, 30]} color='#666' align='center'>{ this.props.fetching ? "Loading Restaurants..." : "We couldn't find any restaurants with your selected filters"}</Text>
        }
        <View direction='row'
          justify='center'
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 60
          }}
          height={50}
          flex={0}>
          <View
            direction='row' height={40}
            flex={0} width={220} justify='space-between'
            style={{
              borderColor: 'rgb(220, 220, 220)',
              borderStyle: 'solid',
              borderWidth: 1.5,
              borderRadius: 15,
            }}
            background='rgba(255,255,255,0.97)'
            padding={[0,20,0,20]}>
            <TouchableOpacity delayPressOut={0}
              onPress={this._openMap.bind(this)}>
              <View align='center'
                padding={[5,0,5]}
                style={{
                  borderColor: 'rgb(220, 220, 220)',
                  borderStyle: 'solid',
                  borderRightWidth: 1
                }} width={90} direction='row'>
                <Text style={{
                  marginBottom: 3,
                  marginRight: 6
                }} size={14}>Map</Text>
                <Icon name='place' size={16}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity delayPressOut={0}
              onPress={e => this.props.dispatch(openFilters())}>
              <View align='center'
                width={90}
                 direction='row'
                justify='flex-end'>
                <Text style={{
                  marginBottom: 2,
                  marginRight: 6
                }} size={14}> Filters </Text>
                <Icon name='tune' size={16}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
