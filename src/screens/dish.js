import React, {Component} from 'react'
import { Image } from 'menunico/src/components/media'
import { Text } from 'menunico/src/components/type'
import { View } from 'menunico/src/components/layout'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextWithIcon } from 'menunico/src/composites/type'
import { ScrollView } from 'react-native'
export default class Dish extends Component {

  render() {
    return (
      <View background='white' align='stretch' padding={[60]}>
        <ScrollView removeClippedSubviews={false} showsVerticalScrollIndicator={false}>
          <View align='stretch' background='white'>
            <View flex={0} height={230} align='stretch'>
              <Image resizeMode='cover' full
              source={this.props.static.sampleDish} />
            </View>
          </View>
          <View flex={0} padding={[20,20,20,20]}>
            <Text size={28} bold color='#F2504B'>Beef fillet with Foie & crystallized mushrooms</Text>
          </View>
          <View padding={[0,20,20,20]}>
            <Text size={16} lines={12}>
              This beef fillet has a real touch of luxury about it. The addition of foie gras, parsley puree and crystallized mushrooms beautifully compliments the succulent beef, which is cooked until nicely caramelised. This is a wonderful recipie to pull out for romantic occasions
            </Text>
          </View>
          <View padding={[0,20,20,20]}>
            <TextWithIcon icon='globe' text='www.antigua.com'/>
          </View>
          <View padding={[0, 40, 40, 40]}>
            <Text align='center' color='#F2504B' bold>" Check out other dishes by this restaurant "</Text>
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
