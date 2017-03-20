import React, { Component } from 'react'
import { Image } from 'menunico/src/components/media'
import { Text } from 'menunico/src/components/type'
import { View } from 'menunico/src/components/layout'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextWithIcon } from 'menunico/src/composites/type'
import { SlideShow } from 'menunico/src/composites/media'
import MapView from 'react-native-maps'
import moment from 'moment'
import { StyleSheet, Dimensions, TouchableOpacity, ScrollView, InteractionManager } from 'react-native'

import { web, phonecall, share } from 'menunico/src/actions/comms'

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default class RestaurantSingle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: false,
      images: false,
      dishIndex: 0,
    }

    const resto = this.props.restaurant
    const menus = this.props.menus
    const menu = menus[resto.mainid] || []
    this.menu = menu

    const format = {
    sameDay: "[Today]",
    nextDay: "dddd, Do",
    nextWeek: "dddd, Do",
    sameElse: 'dddd, MMM Do'
    }

    this.menuDates = new Array(7).fill(0).map((item, index) => {
      const date = moment()
      return {
        match: date.add(index, 'days').format('MM/DD/YYYY'),
        text: date.calendar(null, format)
      }
    })

    const {height, width} = Dimensions.get('window')
    this.width = width
    this.height = height
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.offsetList()
      this.setState({map: true, images: true})
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if(!this.banner) return true
    this.banner.scrollTo({x: this.width*nextState.imageIndex}, true)
  }

  _renderDish(category, index) {
    return (
        <View height={null} key={index} flex={0} align='center'>
          <View flex={0} padding={[0,20,0,20]} margin={[20,0,10]}>
            <Text style={{marginBottom: 20}} color='#F2504B'>{category.name}</Text>
            <Image source={this.props.static.swoosh} full />
          </View>
          <View flex={0} width={250} align='center'>
            {category.foods.map((item, index) => {
              const food = this.props.dishes[item.mainid]
              return (
                <Text onPress={ e => this._openDish(food)} padding={[0,0,10]} key={index} align='center'>
                  {food.name}
                </Text>
              )
            })}
          </View>
        </View>
    )
  }

  _renderDishes(date, index) {
    if(!this.menu[date.match]) return (
      <View flex={0} key={index} padding={[50,20,0,20]}  align='center' width={this.width}>
        <Text align='center' size={16} color='#5D5d5d'>Today, the menu of the day hasn't been updated.</Text>
      </View>
    )
    const menu = this.menu[date.match]
    // parse the fucking dishes because they don't come in order.
    const categories = menu.categories.reduce((acc, category) => {
      if(category.categoryid == 4) return [category, ...acc]
      return [...acc, category]
    }, [])
    return (
      <View flex={0} key={index} align='center' width={this.width}>
        {categories.map(this._renderDish.bind(this))}
      </View>
    )
  }

  _renderDishDate(date, index) {
    return (
      <TouchableOpacity key={index}
        onPress={this._focusDishDate.bind(this, index)}>
        <View flex={0} width={150} align='center'>
          <Text size={16} bold
            color={this.state.dishIndex === index ? '#5C5E5D' : '#ccc'}>{date.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _focusDishDate(index) {
    this.setState({dishIndex: index})
    this.dishLabels.scrollTo({x: 150*index}, true)
    this.dishes.scrollTo({x: this.width*index}, true)
  }

  _handleDishScroll(event) {
    if(event.nativeEvent.contentOffset.x % this.width !== 0) return false
    const indexOffset = event.nativeEvent.contentOffset.x / this.width
    this.dishLabels.scrollTo({x: (150*indexOffset), y: 0}, true)
    this.setState({dishIndex: indexOffset})
  }

  _checkIfEmpty() {
    const activeDate = this.menuDates[this.state.dishIndex]
    if(!activeDate) return {height: undefined}
    const menu = this.menu[activeDate.match]
    if(!menu) return {
      height: 150
    }
    return {}
  }

  _share(restaurant) {
    InteractionManager.runAfterInteractions( () => {
      const url = restaurant.webpage || restaurant.facebook || restaurant.twitter
      this.props.dispatch(share(`Check out ${restaurant.name}! (shared via Menunico)`, url))
    })
  }

  _openDish(dish, day) {
    const route = {
      key: 'dish',
      animation: 'FloatFromBottom',
      navbar: {
        'color': 'black',
        background: 'rgba(0,0,0,0.0)'
      }
    }
    const restaurant = this.props.restaurant
    this.props.dispatch({
      type: 'SELECT_DISH',
      payload: {restaurant: restaurant.mainid, dish
    }})
    this.props.dispatch(this.props.navigator.push('menunico', route))
  }



  render(){
    const resto = this.props.restaurant
    const activeMenu = this.menu && this.menu[this.menuDates[this.state.dishIndex].match]
    if(!this.state.images) return <View width={this.width} background='white' />
    return (
      <View key={resto.mainid} width={this.width} align='stretch' padding={[60]} style={{overflow: 'hidden'}}>
        <ScrollView removeClippedSubviews={false} showsVerticalScrollIndicator={false}>
            <View align='stretch' background='white'>
              { resto.image
                ? <SlideShow images={resto.image}/>
                : null }
              <View flex={0} align='center' direction='row' justify='space-between' padding={[20,20,20,20]}>
                <Text size={24} bold color='#F2504B'>{resto.name}</Text>
                {activeMenu
                  ? <Text size={24}>{`${activeMenu.fullmenu}€`}</Text>
                  : null
                }
              </View>
              <View align='stretch' flex={0}>
                <ScrollView scrollEnabled={false} horizontal={true}
                  contentContainerStyle={{marginLeft: (this.width/2)-75,
                    width: this.width*3}}
                  showsHorizontalScrollIndicator={false}
                  ref={dishLabels => this.dishLabels = dishLabels}>
                  {this.menuDates.map(this._renderDishDate.bind(this))}
                </ScrollView>
                <View flex={0} align='stretch' margin={[10]}>
                  <Text align='center' bold color='#5D5d5d'>Menu of the day</Text>
                </View>
                <ScrollView
                  contentContainerStyle={this._checkIfEmpty.call(this)}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ref={dishes => this.dishes = dishes}
                  onScroll={this._handleDishScroll.bind(this)}
                  pagingEnabled={true}
                  style={{backgroundColor: '#FCFCFC',marginTop: 7}}>
                  {this.menuDates.map(this._renderDishes.bind(this))}
                </ScrollView>
              </View>
              { activeMenu
                ? <View direction='row' justify='flex-end' padding={[20,20,0,20]}>
                   <View flex={0}>
                     {activeMenu.halfmenufirstdish
                       ? <Text size={16}>Half Menu (first): {activeMenu.halfmenufirstdish}€</Text>
                       : null
                     }
                     {activeMenu.halfmenuseconddish
                       ? <Text size={16}>Half Menu (second): {activeMenu.halfmenuseconddish}€</Text>
                       : null
                     }
                     {activeMenu.takeaway
                       ? <Text size={16}>Take Away: {activeMenu.takeaway}€</Text>
                       : null
                     }
                     {activeMenu.terrace
                       ? <Text size={16}>Terrace: +{activeMenu.terrace }€</Text>
                       : null
                     }
                   </View>
                 </View>
                : null
              }

              <View padding={[20,20,20,20]}>
                 <View padding={[0,20]} justify='space-between'>
                  <TextWithIcon onPress={ e => phonecall(resto.telephone, true)} icon='phone' text={resto.telephone} />
                  <TextWithIcon onPress={ e => web(resto.webpage)} icon='globe' text={resto.webpage} />
                  <TextWithIcon onPress={ e => web(resto.facebook)}  icon='facebook' text={resto.facebook} />
                  <TextWithIcon onPress={ e => web(resto.twitter)}  icon='twitter' text={resto.twitter} />
                </View>
              </View>
              {this.state.map && resto.location &&
              <View align='stretch' flex={0} height={200}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: resto.location.lat,
                      longitude: resto.location.lon,
                      latitudeDelta: 0.00922,
                      longitudeDelta: 0.00421,
                    }}>
                      <MapView.Marker coordinate={{
                        latitude: resto.location.lat,
                        longitude: resto.location.lon,
                      }} />
                  </MapView>
              </View>
            }
            <View align='stretch' margin={[10]} padding={[0, 20, 40 , 20]}>
              <Text size={15} bold>Payment Methods</Text>
              <View direction='row' margin={[10]}>
                  <Image margin={[0,10]} source={this.props.static.payment.cash} height={40} width={66}/>
                  {resto.paymentmethods.map( item => {
                    switch (item.mainid) {
                      case 3:
                        return   <Image margin={[0,10]} key={item.mainid} source={this.props.static.payment.diners} height={40} width={66}/>
                      default:
                        return null
                    }})}
              </View>
            </View>
           </View>
        </ScrollView>
        <View style={style.icons} direction='row' justify='flex-end' padding={[10,10,10,10]}>
          <View direction='row' justify='space-between' flex={0} width={60}>
            <TouchableOpacity>
              <Icon name='heart-o' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={e => this._share(resto)}>
              <Icon name='share-alt'  size={24}/>
            </TouchableOpacity>
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
