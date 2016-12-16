import React, { Component } from 'react'
import {InteractionManager} from 'react-native'
import { Image } from 'menunico/src/components/media'
import { Text } from 'menunico/src/components/type'
import { View } from 'menunico/src/components/layout'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { TextWithIcon } from 'menunico/src/composites/type'
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class Restaurant extends Component {
  constructor() {
    super()
    this.state = {
      map: false,
      images: true
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({map: true})
    });
  }

  render() {
    const resto = this.props.restaurants[this.props.selected]
    const imageURL = 'https://s3.eu-central-1.amazonaws.com/menunico'
    return(
        <View align='stretch' padding={[60]}>
          <ScrollView removeClippedSubviews={false} showsVerticalScrollIndicator={false}>
              <View align='stretch' background='white'>
                <View flex={0} height={200} align='stretch'>
                  {this.state.images && resto.image &&<Image full resizeMode='cover'
                    source={{uri: `${imageURL}/${resto.image[0].url}/normal/${resto.image[0].name}`}} />}
                </View>
                <View flex={0} align='center' direction='row' justify='space-between' padding={[20,20,20,20]}>
                  <Text size={24} bold color='#F2504B'>{resto.name}</Text>
                  <Text size={14} bold> 10 € </Text>
                </View>
                <View align='center'>
                  <Text bold color='#5C5E5D'>Menu of the Day</Text>
                  <View flex={0} padding={[0,20,0,20]} margin={[20,0,10]}>
                    <Text style={{marginBottom: 20}} color='#F2504B'>First Dish</Text>
                    {this.state.images && <Image source={this.props.static.swoosh} full />}
                  </View>
                  <View flex={0} width={250} align='center'>
                    <Text align='center'>
                      Duck dragee with sauteed kiwi and Japanese miso sauce.
                    </Text>
                  </View>
                  <View flex={0} padding={[0,20,0,20]} margin={[20,0,10]}>
                    <Text style={{marginBottom: 20}} color='#F2504B'>Second Dish</Text>
                    {this.state.images && <Image source={this.props.static.swoosh} full />}
                  </View>
                  <View flex={0} width={250} align='center'>
                    <Text align='center'>
                      Beef fillet with foie, crystallized mushrooms.
                    </Text>
                  </View>
                  <View flex={0} padding={[0,20,0,20]} margin={[20,0,10]}>
                    <Text style={{marginBottom: 20}} color='#F2504B'>Dessert</Text>
                    {this.state.images && <Image source={this.props.static.swoosh} full />}
                  </View>
                  <View flex={0} width={250} align='center'>
                    <Text align='center'>
                      Tiramisu with salted caramel
                    </Text>
                  </View>
                </View>
                <View direction='row' justify='flex-end' padding={[20,20,0,20]}>
                  <View flex={0}>
                    <Text size={16}>Half Menu: 5€</Text>
                    <Text size={16}>Take Away: 5€</Text>
                  </View>
                </View>
                <View padding={[20,20,20,20]}>
                  {resto.contact && <View>
                    <TextWithIcon icon='phone' text={resto.contact[0].telephone} />
                    <TextWithIcon icon='globe' text={resto.contact[0].webpage} />
                    <TextWithIcon icon='facebook' text={resto.contact[0].facebook} />
                    <TextWithIcon icon='twitter' text={resto.contact[0].twitter} />
                  </View>}
                </View>
                {this.state.map && resto.address &&
                <View align='stretch' flex={0} height={200}>

                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude: resto.address[0].location.lat,
                        longitude: resto.address[0].location.lon,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                      }}>
                        <MapView.Marker coordinate={{
                          latitude: resto.address[0].location.lat,
                          longitude: resto.address[0].location.lon,
                        }} />
                    </MapView>
                </View>
              }
             </View>
          </ScrollView>
          <View style={style.icons} direction='row' justify='flex-end' padding={[10,10,10,10]}>
            <View direction='row' justify='space-between' flex={0} width={60}>
              <Icon name='heart-o'  size={24}/>
              <Icon name='share-alt'  size={24}/>
            </View>
          </View>
        </View>

    )
  }
}

const style = {
  icons: {
    position: 'absolute',
    top: 10,
    right: 10
  }
}