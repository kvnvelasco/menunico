import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Image } from 'menunico/src/components/media'
import {Text} from 'menunico/src/components/type'

import { ListView, TouchableOpacity } from 'react-native'

import data from '../data/restaurants.json'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Fa from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'

export default class Restaurants extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: this._rowDiffHandler});
     this.state = {
       data: ds.cloneWithRows([...data, ...data]),
       date: moment()
     };
  }

  _rowDiffHandler() {

  }

  _navigateToRestaurant(restaurant) {
    const route = {
      key: 'restaurant',
      data: restaurant
    }
    this.props.dispatch(this.props.navigator.push('menunico', route))
  }

  _renderRestaurant(row) {
    const {name, address} = row.source
    const style = {
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: '#ccc'
    }
    return (
      <TouchableOpacity onPress={this._navigateToRestaurant.bind(this, row)}>
        <View style={style} align='stretch' padding={[20,20,5,20]} flex={0}>
          <View direction='row' align='center'>
            <View align='stretch'>
              <View height={150}>
                <Image full resizeMode='cover' source={require('../static/resto.png')}/>
              </View>
            </View>
            <View margin={[0,0,0,10]}>
              <Text size={16} color='#F2504B'>{name}</Text>
              <Text size={14} color='#ccc'>{`${address[0].street}`}</Text>
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
          <View direction='row' justify='flex-end'>
            <Text>10€</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  render(){
    return (
      <View align='stretch' padding={[0,20,0,20]}>
        <View flex={0} direction='row' justify='space-between' align='center' margin={[20,0,20]}>
          <View background='#F2504B' round={40} align='center' padding={[5,15,5,15]} flex={0}>
            <Text size={14} white>{`Barcelona, ${this.state.date.format('dddd Do MMMM')}`}</Text>
          </View>
          <View direction='row' align='center' justify='space-between' width={60} flex={0}>
            <Icon name='place' size={24}/>
            <Fa name='filter' size={24}/>
          </View>
        </View>
        <ListView
          showsVerticalScrollIndicator={false}
          dataSource={this.state.data}
          renderRow={this._renderRestaurant.bind(this)} />
      </View>
    )
  }
}
