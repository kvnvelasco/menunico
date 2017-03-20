import React, { Component } from 'react'
import { View, Image, Text } from 'menunico/src/components/layout'
import MapView from 'react-native-maps'
import { StyleSheet, Button, ScrollView, InteractionManager, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Fa from 'react-native-vector-icons/FontAwesome'
// actions
import {geoSort, highLightResto} from 'menunico/src/state/actions/restaurants'
import {openFilters} from 'menunico/src/state/actions/application'
import {tryToGetUserGeo, monitorGeo, stopMonitorGeo} from 'menunico/src/state/actions/device'

export default class Map extends Component {
  constructor() {
    super()
    this.map = {}
    this._sortRestaurants = this._sortRestaurants.bind(this)
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(tryToGetUserGeo())
      this.props.dispatch(monitorGeo())
      this.props.dispatch(logHeading())
    });
  }

  componentWillUnmount() {
    this.props.dispatch(stopLogHeading())
    this.props.dispatch({type: 'RESTAURANT_CLEAR_HIGHLIGHTED'})
  }

  _getDistanceAndDirectionObject(restaurantCoords) {
    // get distance in degrees
    const user = this.props.location
    if(!user) return {}
    const dist = Math.sqrt(Math.pow(restaurantCoords.lon - user.longitude, 2) + Math.pow(restaurantCoords.lat - user.latitude, 2))
    let conversionFactor
    switch(true) {
      case Math.abs(user.latitude) > 67 :
        conversionFactor = 43496
        break
      case Math.abs(user.latitude) > 45 :
        conversionFactor = 78710
        break
      case Math.abs(user.latitude) > 23 :
        conversionFactor = 102470
        break
      default:
        conversionFactor = 111320
    }
    const distance = dist * conversionFactor
    const dLong = restaurantCoords.lon - user.longitude

    const x = Math.cos(restaurantCoords.lat) * Math.sin(dLong)

    const y = Math.cos(user.latitude) * Math.sin(restaurantCoords.lat) - Math.sin(user.latitude) * Math.cos(restaurantCoords.lat) * Math.cos(restaurantCoords.lon - user.longitude)

    let angle = Math.atan2(y, x) * (180 / Math.PI)
    angle = (angle - 90) % 360
    return {angle: angle - this.props.heading, distance: distance|0}
  }



  _sortRestaurants(coords) {
    console.info('Sorting Restaurants by', coords)
    this.props.dispatch(geoSort(geoBox, this.props.restaurants))
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
    const {distance, angle} = this._getDistanceAndDirectionObject(resto.location)
    let showVectors = true
    if(!distance || !angle)  showVectors = false
    const rotator = {
      flex: 0,
      transform: [
        {rotate: `${angle || 0}deg`}
      ]
    }
    return (
      <TouchableOpacity key={index} onPress={handler}>
        <View round={2} background={highlighted ? '#F2504B' : '#f7f7f7'} width={200} align='stretch' padding={[20,20,20,20]} margin={[5,5,5,5]}>
          {resto.image.length
            ? <Image width={160} height={98} resizeMode='cover'
              source={{uri: `${imageURL}/${resto.image[0].url}/normal/${resto.image[0].name}`}} />
            : null}
          {highlighted &&
            <View background='rgba(242, 80, 75, 0.8)' align='center' justify='center' style={{position: 'absolute', top: 20, left: 20}} width={160} height={98}>
              <View style={rotator}>
                <Icon name='arrow-upward' size={36} color='white'/>
              </View>
              <Text size={12} color='white'>{showVectors ? `${distance}m` : 'Open Restaurant'}</Text>
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
        onCalloutPress={this._openRestaurant.bind(this, resto.name, index)}
        coordinate={{
        latitude: resto.location.lat,
        longitude: resto.location.lon,
      }} />
  }

  _moveToMarker(resto, index, event) {
    console.info('moving to marker', resto.location)
    this.setState({controlMode: 'ribbon'})
    const region = {
      latitude: resto.location.lat,
      longitude: resto.location.lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }
    this.map.animateToRegion(region, 500)
    this.pins[resto.mainid].showCallout()
    this.props.dispatch(highLightResto(resto, index))
    this.restaurants.scrollTo({y: 0, x:index*200})
  }


  render(){
    const location = this.props.location || {}

    return (
      <View align='stretch' justify='space-between' background='white'>
        <View align='stretch' margin={[60]}>
          { this.state.map && this.props.hasGeo &&
            <MapView
              onRegionChangeComplete={this.state.controlMode === 'map' ? this._sortRestaurants : undefined}
              initialRegion={{
                latitude: 	location.latitude || 41.3851,
                longitude: location.longitude || 2.1734,
                latitudeDelta: 0.125,
                longitudeDelta: 0.125
              }}
              onPanDrag={ _ => {
                this.setState({controlMode: 'map'})
              }}
              scrollEnabled={ this.state.controlMode === 'map' ? true : false}
              ref={map => {
                // map.fitToElements(true)
                this.map = map
              }}
              style={StyleSheet.absoluteFillObject}
              showsUserLocation={this.props.location ? true : false}
              loadingEnabled={true}
              loadingIndicatorColor='white'
              loadingBackgroundColor='#F2504B'
              showsTraffic={false}>
                {this.props.restaurants.map(this._renderPin.bind(this))}
            </MapView>
          }

          <View flex={0} justify='flex-end' align='center' height={30} margin={[0,0,40]} style={{bottom: 50, position: 'absolute', right:0, left:0}}>
            <TouchableOpacity delayPressOut={0}
              onPress={e => this.props.dispatch(openFilters())}>
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
        <View flex={0}>
            <Text size={16}>{this.state.controlMode}</Text>
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
