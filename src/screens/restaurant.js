import React, { Component } from 'react'
import { ListView, Dimensions } from 'react-native'
import { View } from 'menunico/src/components/layout'

import RestaurantSingle from './restaurantSingle'

export default class Restaurant extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: this._rowDiffHandler});
    this.dimensions = Dimensions.get('window')
    this.state = {
      ds,
      data: ds.cloneWithRows(props.restaurants)
    }
  }

  _rowDiffHandler(r1, r2) {
    return r1mainid !== r2.mainid
  }


  _renderRestaurant(restaurant, secIndex, rowIndex) {
    const index = this.props.route.index
    const offset = index * this.dimensions.width

    function offsetList(offset) {
      this.restaurant.scrollTo({x: offset, animated: false})
    }

    return (
      <RestaurantSingle dispatch={this.props.dispatch} navigator={this.props.navigator}
        offsetList={offsetList.bind(this, offset)}
        restaurant={restaurant}
        dishes = {this.props.dishes}
        menus = {this.props.menus}
        static={this.props.static}/>
    )
  }

  render() {
    const {width} = Dimensions.get('window')
    const index = this.props.route.index
    return(
        <ListView horizontal={true}
          ref={restaurant => this.restaurant = restaurant}
          enableEmptySections={true}
          pageSize={1}
          initialListSize={(index + 1)}
          pagingEnabled={true}
          dataSource={this.state.data}
          renderRow={this._renderRestaurant.bind(this)}>
        </ListView>
    )
  }
}
