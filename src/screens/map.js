import React, { Component } from 'react'
import { View } from 'menunico/src/components/layout'
import MapView from 'react-native-maps'
import { StyleSheet, Button} from 'react-native'

export default class Map extends Component {
  constructor() {
    super()
    this.map = {}
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.map.fitToElements(true)
  //   }, 1000)
  // }

  _renderPin(resto, index) {
    if(!resto.location) return null
    return   <MapView.Marker key={resto.descriptions.mainid} coordinate={{
        latitude: resto.location.lat,
        longitude: resto.location.lon,
      }} />
  }
  render(){
    return (
      <View align='stretch'>
        <View background='green' align='stretch' margin={[60]}>
          <MapView
            initialRegion={{
              latitude: 	41.390205,
              longitude: 2.154007,
              latitudeDelta: 0.125,
              longitudeDelta: 0.125
            }}
            ref={map => this.map = map}
            style={StyleSheet.absoluteFillObject}
            showsUserLocation={true}
            showsTraffic={false}>
            {this.props.restaurants.map(this._renderPin)}
          </MapView>
        </View>
        <View height={120} flex={0}>

        </View>
      </View>
    )
  }
}
