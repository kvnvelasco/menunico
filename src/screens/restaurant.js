import React, { Component } from 'react'
import { ListView, Dimensions } from 'react-native'
import { View } from 'menunico/src/components/layout'

import RestaurantSingle from './restaurantSingle'

export default class Restaurant extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: this._rowDiffHandler});
    this.state = {
      ds,
      data: ds.cloneWithRows(props.restaurants)
    }
  }

  componentDidMount() {
    const {width} = Dimensions.get('window')
    const index = this.props.route.index
    this.restaurant.scrollTo({x: width*index}, false)
  }
  _rowDiffHandler(r1, r2) {
    return r1.descriptions.mainid !== r2.descriptions.mainid
  }


  _renderRestaurant(restaurant) {
    return (
      <RestaurantSingle dispatch={this.props.dispatch} navigator={this.props.navigator} restaurant={restaurant}
        static={this.props.static}/>
    )
  }

  render() {
    const {width} = Dimensions.get('window')
    return(
        <ListView horizontal={true}
          ref={restaurant => this.restaurant = restaurant}
          onStartShouldSetResponder={e => false}
          enableEmptySections={false}
          pageSize={1}
          initialListSize={2}
          pagingEnabled={true}
          dataSource={this.state.data}
          renderRow={this._renderRestaurant.bind(this)}>
        </ListView>
    )
  }
}
