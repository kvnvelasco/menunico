import React, { Component } from 'react'
import { Text } from 'menunico/src/components/type'
import { View } from 'menunico/src/components/layout'
import { Image } from 'menunico/src/components/media'

import Icon from 'react-native-vector-icons/FontAwesome'

export function TextWithIcon(props, state) {
  if(!props.text) return <View flex={0} />
  return (
    <View direction='row' align='center' flex={0}>
      <View flex={0} margin={[0,20]} width={(props.size || 16) + 2}>
        <Icon onPress={props.onPress}  name={props.icon} size={props.size || 16}/>
      </View>
      <Text onPress={props.onPress} size={props.size || 16}>{props.text}</Text>
    </View>
  )
}

export function TextWithImage(props, state){
  const size = props.size || 16
  const scale = props.scale || 1
  return(
    <View direction='row' align='center' flex={0}>
      <View flex={0} margin={[0,20]}>
        <Image height={size*scale}
          width={60} source={props.image}/>
      </View>
      <Text

        bold={props.bold}
        color={props.color}
        size={size} >
        {props.text || props.children}
      </Text>
    </View>
  )
}

export function ParagraphText(props, state) {
  return(
    <View flex={0} margin={[0,0,15]}>
      <Text size={16} bold>{props.heading}</Text>
      <Text size={props.size} lines={20}>{props.children || props.content}</Text>
    </View>
  )
}
