import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import { Text } from 'menunico/src/components/type'
import { Image } from 'menunico/src/components/media'
import MapView from 'react-native-maps'
import { StyleSheet, Button, ScrollView, InteractionManager, TouchableOpacity} from 'react-native'
import { debounce } from 'lodash'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Fa from 'react-native-vector-icons/FontAwesome'
// actions
import {geoSort, highLightResto} from 'menunico/src/actions/restaurants'

export default class Map extends Component {
  constructor() {
    super()
    this.map = {}
    this.state = {map: false}
    this.pins = {}
    this._sortRestaurants = this._sortRestaurants.bind(this)
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({map: true})
    });
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'RESTAURANT_CLEAR_HIGHLIGHTED'})
  }
  _sortRestaurants(coords) {
    // this.props.dispatch(geoSort(geoBox, this.props.restaurants))
    const closest = this.props.restaurants.reduce((acc, item, index) => {
      // compute distance of each one to geobox center manhattan distance is fine for now.
      const dist = Math.abs((coords.latitude - item.location.lat) + (coords.longitude - item.location.lon))
      if(index == 0)
        return {
            dist: dist,
            index: index,
            item: item
        }
      const replace = acc.dist > dist
      return {
          dist: replace ? dist : acc.dist,
          index: replace ? index : acc.index,
          item: replace ? item : acc.item
      }
    },{})
    this.props.dispatch(highLightResto(closest.item, closest.index))
    this.pins[closest.item.mainid].showCallout()
    this.restaurants.scrollTo({y: 0, x:closest.index*200})
  }

  _openRestaurant(name, index) {
    const route = {
      key: 'restaurant',
      index,
      animation: 'FloatFromBottom',
      navbar: {
        title: name,
        'color': 'black',
        background: 'rgba(0,0,0,0.0)'
      }
    }
    this.props.dispatch({type: 'SET_CURRENT_RESTAURANT', payload: index})
    this.props.dispatch(this.props.navigator.push('menunico', route))
  }

  _renderResto(resto, index) {
    const imageURL = 'https://s3.eu-central-1.amazonaws.com/menunico'
    const highlighted = resto.mainid === this.props.highlighted
    const handler = highlighted ? this._openRestaurant.bind(this, resto.name, index)
    : this._moveToMarker.bind(this, resto, index)
    return (
      <TouchableOpacity key={index} onPress={handler}>
        <View round={2} background={highlighted ? '#F2504B' : '#f7f7f7'} width={200} align='stretch' padding={[20,20,20,20]} margin={[5,5,5,5]}>
          {resto.image.length && <Image width={160} height={98} resizeMode='cover'
            source={{uri: `${imageURL}/${resto.image[0].url}/normal/${resto.image[0].name}`}} />}
          {highlighted &&
            <View background='rgba(242, 80, 75, 0.8)' align='center' justify='center' style={{position: 'absolute', top: 20, left: 20}} width={160} height={98}>
              <Icon name='arrow-upward' size={36} color='white'/>
              <Text size={12} color='white'>Tap to view</Text>
            </View>
          }
          <View direction='row' justify='space-between'>
            <Text color={highlighted && 'white'}>{resto.name}</Text>
            <Text color={highlighted && 'white'} bold>10€</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderPin(resto, index) {
    if(!resto.location) return null
    return   <MapView.Marker
        ref={pin => this.pins[resto.mainid] = pin}
        onPress={this._moveToMarker.bind(this, resto, index)}
        identifier={`${resto.mainid}`}
        key={index}
        title={resto.name}
        coordinate={{
        latitude: resto.location.lat,
        longitude: resto.location.lon,
      }} />
  }

  _moveToMarker(resto, index, event) {
    const region = {
      latitude: resto.location.lat,
      longitude: resto.location.lon,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003
    }
    this.map.animateToRegion(region, 500)
    this.pins[resto.mainid].showCallout()
    this.props.dispatch(highLightResto(resto, index))
    this.restaurants.scrollTo({y: 0, x:index*200})
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

  render(){
    return (
      <View align='stretch' justify='space-between' background='white'>
        <View align='stretch' margin={[60]}>
          { this.state.map &&
            <MapView
              onRegionChangeComplete={this._sortRestaurants}
              initialRegion={{
                latitude: 	41.390205,
                longitude: 2.154007,
                latitudeDelta: 0.125,
                longitudeDelta: 0.125
              }}
              ref={map => {
                // map.fitToElements(true)
                this.map = map
              }}
              style={StyleSheet.absoluteFillObject}
              showsUserLocation={true}
              loadingEnabled={true}
              loadingIndicatorColor='white'
              loadingBackgroundColor='#F2504B'
              showsTraffic={false}>
                {this.props.restaurants.map(this._renderPin.bind(this))}
            </MapView>
          }
          <View flex={0} justify='flex-end' align='center' height={30} margin={[0,0,40]} style={{bottom: 50, position: 'absolute', right:0, left:0}}>
            <TouchableOpacity delayPressOut={0}
              onPress={this._openFilters.bind(this)}>
              <View direction='row' justify='space-between' align='center' padding={[0,15,0,15]} flex={0} round={40} background='white' style={{
                height: 30,
                width: 90,
                borderWidth: 1,
                borderColor: '#ccc',
              }}>
                <Icon name='tune' size={16}/>
                <Text size={14}>Filters</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View height={170} align='stretch' flex={0}>
          <ScrollView
            ref={element => this.restaurants = element}
            horizontal={true}>
            {this.props.restaurants.map(this._renderResto.bind(this))}
          </ScrollView>
        </View>
      </View>
    )
  }
}
