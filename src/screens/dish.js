import React, {Component} from 'react'
import { Image } from 'menunico/src/components/media'
import { Text } from 'menunico/src/components/type'
import { View } from 'menunico/src/components/layout'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextWithIcon } from 'menunico/src/composites/type'
import { SlideShow } from 'menunico/src/composites/media'
import { ScrollView, Dimensions } from 'react-native'
export default class Dish extends Component {
  constructor() {
    super()
    const {height, width} = Dimensions.get('window')
    this.width = width
  }

  _pop() {
    this.props.dispatch({type: 'NAVIGATE_POP'})
  }

  render() {
    const data = this.props.data
    const resto = data.restaurant
    const dish = data.dish
    return (
      <View background='white' align='stretch' padding={[60]}>
        <ScrollView removeClippedSubviews={false} showsVerticalScrollIndicator={false}>
          <View align='stretch' height={230} >
            {dish.images.length
              ? <SlideShow images={dish.images}/>
              : <Image full resizeMode='cover' source={this.props.static.noPhoto}/>
            }
          </View>
          <View flex={0} padding={[20,20,20,20]}>
            <Text size={28} bold color='#F2504B'>{dish.name}</Text>
            <Text size={16} bold onPress={this._pop.bind(this)} >{resto.name}</Text>
          </View>
          <View padding={[0,20,20,20]}>
            <Text size={16} lines={12}>
              {dish.foodlang[0].description}
            </Text>
          </View>
        </ScrollView>
        <View style={style.icons} direction='row' justify='flex-end' padding={[10,10,10,10]}>
          <View direction='row' justify='space-between' flex={0} width={60}>
            <Icon name='heart-o' size={24}/>
            <Icon name='share-alt' size={24}/>
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
