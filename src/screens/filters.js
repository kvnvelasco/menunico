import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Navigator } from 'menunico/src/composites/navigation'
import { Text } from 'menunico/src/components/type'
import {Button} from 'react-native'
import {connect} from 'react-redux'
import {CheckBox} from 'menunico/src/components/interactive'
import Slider from '@ptomasroos/react-native-multi-slider'
import {filterRestaurants} from 'menunico/src/actions/restaurants'

class Filters extends Component {

  render() {
    return (
      <View background='white' margin={[60]} align='stretch'>
        <Navigator
          id='filters'
          dispatch={this.props.dispatch}
          data={this.props.navigator} >
          <Home filters={this.props.filters} key='home'/>
          <Cuisine filters={this.props.filters.cuisine || {}} key='cuisine'/>
          <Preferences key='preferences' filters={this.props.filters.preferences || {}} />
          <Payment key='payment'
            cards={this.props.cards}
            filters={this.props.filters.payment || {}} />
        </Navigator>
      </View>
    )
  }
}

export default connect( store => ({
  navigator: store.navigation.filters,
  filters: store.restaurants.filters || {},
  cards: store.static.payment
}))(Filters)


class Home extends Component {
  _navigateToFilter(filter){
    const navigator = {
      id: 'filters',
      route: {
        key: filter
      }
    }
    this.props.dispatch({type: 'NAVIGATE_PUSH', payload: navigator})
  }

  _setPricePoint(point){
    this.props.dispatch({type: 'SET_PRICE_FILTER', payload: point})
  }

  _filter() {
    this.props.dispatch(filterRestaurants(this.props.filters))
  }
  render() {
    return <View align='stretch' justify='space-between'
      padding={[40,20,20,20]}>
      <View direction='row' flex={0}
        justify='space-between' align='center'>
        <View margin={[0,20]}>
          <Text>Cuisine</Text>
          <Text
            size={14}
            color='#aaa'>
            {Object.keys(this.props.filters.cuisine || {}).reduce((acc, item, index, arr) => {
            return acc + (this.props.filters.cuisine[item] ? `${item.charAt(0).toUpperCase() + item.slice(1)}  ` : '')
          }, '')}</Text>
        </View>

        <Button
          onPress={this._navigateToFilter.bind(this, 'cuisine')}
          title='Edit' color='#59B043'/>
      </View>
      <View direction='row' flex={0}
        justify='space-between' align='center'>
        <View margin={[0,20]}>
          <Text>Preferences</Text>
          <Text
            size={14}
            color='#aaa'>
            {Object.keys(this.props.filters.preferences || {}).reduce((acc, item, index, arr) => {
            return acc + (this.props.filters.preferences[item] ? `${item.charAt(0).toUpperCase() + item.slice(1)}  ` : '')
          }, '') || 'No Preferences Selected'}</Text>
        </View>
        <Button
          onPress={this._navigateToFilter.bind(this, 'preferences')}
          title='Edit' color='#59B043'/>
      </View>
      <View direction='row' flex={0}
        justify='space-between' align='center'>
        <View margin={[0,20]}>
          <Text>Payment Methods</Text>
          <Text
            size={14}
            color='#aaa'>
            {Object.keys(this.props.filters.payment || {}).reduce((acc, item, index, arr) => {
            return acc + (this.props.filters.payment[item] ? `${item.charAt(0).toUpperCase() + item.slice(1)}  ` : '')
          }, '') || 'All Payment Methods'}</Text>
        </View>
        <Button
          onPress={this._navigateToFilter.bind(this, 'payment')}
          title='Edit' color='#59B043'/>
      </View>

      <View flex={0}
        justify='space-between'>
        <Text >{`Price Range (€${this.props.filters.price[0]*5} - €${this.props.filters.price[1]*5})`}</Text>
        <View flex={0} height={60} padding={[30,20,30,20]} align='center'>
          <Slider values={this.props.filters.price} sliderLength={280}
            selectedStyle={{
              backgroundColor: '#F2504B'
            }}
            markerStyle={{
              backgroundColor: '#F2504B',
              height: 25,
              width: 25,
              borderRadius: 30
            }}
            pressedMarkerStyle={{
              height: 30,
              width: 30,
            }}
            onValuesChange={this._setPricePoint.bind(this)}/>
        </View>
      </View>
      <Button
        onPress={this._filter.bind(this)}
        title='Set Filters' color='#F2504B'/>
     </View>
  }
}

class Cuisine extends Component {
  filterSelector(name, value) {
    const payload = {
      group: 'cuisine',
      name,
      value: !value
    }
    this.props.dispatch({type:'TOGGLE_FILTER', payload})
  }
  render() {
    console.log(this.props)
    return (
      <View align='stretch' background='white' padding={[20,20,20,20]}>
        <Text
          align='center'
          size={24}
          color='#F2504B'>Choose your Origin Cuisine</Text>
        <View justify='space-between' align='stretch' padding={[20,0,60]}>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Italian</Text>
            <CheckBox
              checked={this.props.filters.italian}
              handler={this.filterSelector.bind(this, 'italian', this.props.filters.italian)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>French</Text>
            <CheckBox
              checked={this.props.filters.french}
              handler={this.filterSelector.bind(this, 'french', this.props.filters.french)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Chinese</Text>
            <CheckBox
              checked={this.props.filters.chinese}
              handler={this.filterSelector.bind(this, 'chinese', this.props.filters.chinese)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Mexican</Text>
            <CheckBox
              checked={this.props.filters.mexican}
              handler={this.filterSelector.bind(this, 'mexican', this.props.filters.mexican)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Japenese</Text>
            <CheckBox
              checked={this.props.filters.japanese}
              handler={this.filterSelector.bind(this, 'japanese', this.props.filters.japanese)} />
          </View>

          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Spanish</Text>
            <CheckBox
              checked={this.props.filters.spanish}
              handler={this.filterSelector.bind(this, 'spanish', this.props.filters.spanish)} />
          </View>
        </View>
        <Button
          onPress={this.props.navigator.pop}
          title='Save Cuisine Filters'/>
      </View>
    )
  }
}

class Preferences extends Component {
  filterSelector(name, value) {
    const payload = {
      group: 'preferences',
      name,
      value: !value
    }
    this.props.dispatch({type:'TOGGLE_FILTER', payload})
  }
  render() {
    return (
      <View align='stretch' padding={[20,20,20,20]} background='white'>
        <Text
          align='center'
          size={24}
          color='#F2504B'>Choose your preferences</Text>
        <View align='stretch' justify='space-between' padding={[20,0,60]}>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Vegetarian</Text>
            <CheckBox
              checked={this.props.filters.vegetarian}
              handler={this.filterSelector.bind(this, 'vegetarian', this.props.filters.vegetarian)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Bio</Text>
            <CheckBox
              checked={this.props.filters.bio}
              handler={this.filterSelector.bind(this, 'bio', this.props.filters.bio)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Lactose Free</Text>
            <CheckBox
              checked={this.props.filters.lactose}
              handler={this.filterSelector.bind(this, 'lactose', this.props.filters.lactose)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Ecologic</Text>
            <CheckBox
              checked={this.props.filters.ecologic}
              handler={this.filterSelector.bind(this, 'ecologic', this.props.filters.ecologic)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Vegan</Text>
            <CheckBox
              checked={this.props.filters.vegan}
              handler={this.filterSelector.bind(this, 'vegan', this.props.filters.vegan)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Gluten Free</Text>
            <CheckBox
              checked={this.props.filters.gluten}
              handler={this.filterSelector.bind(this, 'gluten', this.props.filters.gluten)} />
          </View>
        </View>
        <Button
          onPress={this.props.navigator.pop}
          title='Save Preference Filters'/>
      </View>
    )
  }
}

class Payment extends Component {
  filterSelector(name, value) {
    const payload = {
      group: 'payment',
      name,
      value: !value
    }
    this.props.dispatch({type:'TOGGLE_FILTER', payload})
  }
  render() {
    return (
      <View align='stretch' padding={[20,20,20,20]} background='white'>
        <Text
          align='center'
          size={24}
          color='#F2504B'>Choose your Payment Methods</Text>
        <View align='stretch' justify='space-between' padding={[20,0,60]}>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Cash</Text>
            <CheckBox
              checked={this.props.filters.cash}
              handler={this.filterSelector.bind(this, 'cash', this.props.filters.cash)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Visa</Text>
            <CheckBox
              checked={this.props.filters.visa}
              handler={this.filterSelector.bind(this, 'visa', this.props.filters.visa)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Master Card</Text>
            <CheckBox
              checked={this.props.filters.masterCard}
              handler={this.filterSelector.bind(this, 'masterCard', this.props.filters.masterCard)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Maestro</Text>
            <CheckBox
              checked={this.props.filters.maestro}
              handler={this.filterSelector.bind(this, 'maestro', this.props.filters.maestro)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>AMerican Express</Text>
            <CheckBox
              checked={this.props.filters.amex}
              handler={this.filterSelector.bind(this, 'amex', this.props.filters.amex)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Ticket Restaurant</Text>
            <CheckBox
              checked={this.props.filters.ticketRestaurant}
              handler={this.filterSelector.bind(this, 'ticketRestaurant', this.props.filters.ticketRestaurant)} />
          </View>
          <View direction='row' flex={0}
            justify='space-between' align='center'>
            <Text>Sodexo</Text>
            <CheckBox
              checked={this.props.filters.sodexo}
              handler={this.filterSelector.bind(this, 'sodexo', this.props.filters.sodexo)} />
          </View>
        </View>
        <Button
          onPress={this.props.navigator.pop}
          title='Save Preference Filters'/>
      </View>
    )
  }
}
