import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Image } from 'menunico/src/components/media'
import {Text} from 'menunico/src/components/type'

import { ListView, TouchableOpacity } from 'react-native'


import Icon from 'react-native-vector-icons/MaterialIcons'
import Fa from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'

export default class Restaurants extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: this._rowDiffHandler});
    this.state = {
       date: moment(),
       ds,
       data: ds.cloneWithRows(props.restaurants)
     };
  }
  _rowDiffHandler(r1, r2) {
    return r1.descriptions.mainid !== r2.descriptions.mainid
  }

  _navigateToRestaurant(index, name) {
    const route = {
      key: 'restaurant',
      navbar: {
        title: name,
        'color': 'black',
        background: 'rgba(0,0,0,0.0)'
      }
    }
    this.props.dispatch({type: 'SET_CURRENT_RESTAURANT', payload: index})
    this.props.dispatch(this.props.navigator.push('menunico', route))
  }

  _renderRestaurant(row, section, index) {
    const {name, address, image} = row
    const imageURL = 'https://s3.eu-central-1.amazonaws.com/menunico'
    let cover = image && image[0] || null
    return (
      <View align='stretch' flex={0} padding={[0,10,0,10]}>
        <TouchableOpacity key='index' delayPressOut={0} delayPressIn={0} onPress={this._navigateToRestaurant.bind(this, index, name)}>
          <View margin={[15]} direction='row' flex={0} align='center'>
            <View align='stretch' width={150} height={150} flex={0}>
              {cover && <Image full resizeMode='cover' source={{uri: `${imageURL}/${cover.url}/128x128/${cover.name}`}}/>}
            </View>
            <View margin={[0,0,0,10]}>
              <Text size={16} color='#F2504B'>{name}</Text>
              <Text size={14} color='#ccc'>{`${address && address[0].street}`}</Text>
              <View>
                <Text size={12}>
                  1 Dish: Mushrooms croquettes. Truffled Eggs with ham...
                </Text>
                <Text size={12}>
                  2 Dish: Iberian Pork Slice, Veal Tenderloin, Hamuburger...
                </Text>
              </View>
            </View>
          </View>
          <View direction='row' flex={0} justify='flex-end'>
            <Text>10€</Text>
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
  _openFilters() {
    const navigate = {
      route: {
        key: 'filters',
        animation: 'FloatFromBottom',
        title: 'Set Filters',
        showSearch: true
      },
      id: 'menunico'
    }
    this.props.dispatch({type: 'NAVIGATE_PUSH', payload: navigate})
  }

  _openMap() {
    const navigate = {
      route: {
        key: 'map',
        animation: 'FloatFromBottom',
        title: 'Restaurant Map View'
      },
      id: 'menunico'
    }
    this.props.dispatch({type: 'NAVIGATE_PUSH', payload: navigate})
  }

  render(){
    return (
      <View padding={[20,20,0,20]}
        background='white'
        align='stretch' margin={[60]}>
        <View flex={0} direction='row'
          justify='center' align='center'
          margin={[20,0,20]}>
          <View background='#F2504B' round={40} align='center' padding={[5,15,5,15]} flex={0}>
            <Text size={14} white>{`Barcelona, ${this.state.date.format('dddd Do MMMM')}`}</Text>
          </View>
        </View>
        {this.props.restaurants.length &&
          <ListView
            enableEmptySections={false}
            showsVerticalScrollIndicator={false}
            initialListSize={3}
            pageSize={2}
            renderSeparator={this._renderSeparator}
            dataSource={this.state.data}
            renderRow={this._renderRestaurant.bind(this)} />
        }
        <View direction='row'
          justify='center'
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 40
          }}
             flex={0}>
          <View
            direction='row'
            flex={0}
            width={220}
            justify='space-between'
            style={{
              borderColor: '#ccc',
              borderStyle: 'solid',
              borderWidth: 1.5,
              borderRadius: 15,
            }}
            background='white'
            padding={[0,20,0,20]}>
            <TouchableOpacity delayPressOut={0}
              onPress={this._openMap.bind(this)}>
              <View align='center'
                padding={[5,0,5]}
                style={{
                  borderColor: '#ccc',
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
              onPress={this._openFilters.bind(this)}>
              <View align='center'
                width={90}
                 direction='row'
                justify='flex-end'>
                <Text style={{
                  marginBottom: 2,
                  marginRight: 6
                }} size={14}> Filters </Text>
                <Fa name='filter' size={16}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
