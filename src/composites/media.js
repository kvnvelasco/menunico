import React, {Component} from 'react'
import { Image } from 'menunico/src/components/media'
import { View } from 'menunico/src/components/layout'
import { StyleSheet, Dimensions, TouchableOpacity, ScrollView, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export class SlideShow extends Component {
  constructor() {
    super()
    this.state = {
      imageIndex: 0
    }
    const {height, width} = Dimensions.get('window')
    this.width = width
    this.height = height
  }

  _renderBanner(image, index) {
    const imageURL = 'https://s3.eu-central-1.amazonaws.com/menunico'
    return <View width={this.width} key={index}>
      <Image resizeMode='cover' full
      source={{uri: `${imageURL}/${image.url}/normal/${image.name}`}} />
    </View>
  }

  _renderImageControls(length) {
    const canBack = this.state.imageIndex > 0
    const canForward = this.state.imageIndex < length - 1
    return (
      <View direction='row' align='stretch' justify='space-between'
        style={{
        position: 'absolute',
        opacity: 0.3,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0}} >
          <TouchableOpacity onPress={ e =>
            this.setState({imageIndex: this.state.imageIndex - 1})}>
            <View width={canBack ? 50 : 0} align='center' justify='center' background='black'>
              <Icon name='chevron-left' size={32} color='white'/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ e =>
            this.setState({imageIndex: this.state.imageIndex + 1})}>
          <View width={canForward ? 50 : 0} align='center' justify='center' background='black'>
            <Icon name='chevron-right' size={32} color='white'/>
          </View>
          </TouchableOpacity>
      </View>
    )
  }

  componentWillUpdate(nextProps, nextState) {
    if(!this.banner) return true
    this.banner.scrollTo({x: this.width*nextState.imageIndex}, true)
  }

  render() {
    const images = this.props.images
    return (
      <View flex={0} height={230} align='stretch'>
        <ScrollView
          ref={banner => this.banner = banner}
          horizontal={true}
          pagingEnabled={true}>
          {images.map(this._renderBanner.bind(this))}
        </ScrollView>
        {images.length > 1 ? this._renderImageControls.call(this, images.length) : null}
      </View>
    )
  }
}
