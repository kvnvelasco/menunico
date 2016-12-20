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
     this.state = {
       date: moment()
     };
  }
  _rowDiffHandler() {

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
    const style = {
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderColor: '#ccc'
    }
    return (
      <TouchableOpacity delayPressOut={0} delayPressIn={0} onPress={this._navigateToRestaurant.bind(this, index, name)}>
        <View style={style} align='stretch' padding={[20,0,5,0]} flex={0}>
          <View direction='row' align='center'>
            <View align='stretch'>
              <View height={150}>
                {cover && <Image full resizeMode='cover' source={{uri: `${imageURL}/${cover.url}/128x128/${cover.name}`}}/>}
              </View>
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
          <View direction='row' justify='flex-end'>
            <Text>10€</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  render(){
    const ds = new ListView.DataSource({rowHasChanged: this._rowDiffHandler});
    const data = this.props.restaurants.length && ds.cloneWithRows(this.props.restaurants)
    return (
      <View align='stretch' padding={[0,20,0,20]} margin={[60]}>
        <View flex={0} direction='row' justify='center' align='center' margin={[20,0,20]}>
          <View background='#F2504B' round={40} align='center' padding={[5,15,5,15]} flex={0}>
            <Text size={14} white>{`Barcelona, ${this.state.date.format('dddd Do MMMM')}`}</Text>
          </View>
        </View>
        {this.props.restaurants.length &&
          <ListView
            showsVerticalScrollIndicator={false}
            initialListSize={this.props.restaurants.length}
            dataSource={data}
            renderRow={this._renderRestaurant.bind(this)} />
        }
        <View direction='row' align='center' justify='center' height={60} flex={0}>
          <View flex={0} justify='space-between' width={200} direction='row'>
            <View direction='row'>
              <Icon name='place' size={24}/>
              <Text size={14}>Map View</Text>
            </View>
            <View direction='row' justify='flex-end'>
              <Fa name='filter' size={24}/>
              <Text size={14}> Filters </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
