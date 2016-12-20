import React, { Component } from 'react'
import { Text } from 'menunico/src/components/type'
import { View } from 'menunico/src/components/layout'

import Icon from 'react-native-vector-icons/FontAwesome'

export function TextWithIcon(props, state) {
  return (
    <View direction='row' align='center' flex={0}>
      <View flex={0} margin={[0,20]} width={(props.size || 16) + 2}>
        <Icon name={props.icon} size={props.size || 16}/>
      </View>
      <Text size={props.size || 16}>{props.text}</Text>
    </View>
  )
}
