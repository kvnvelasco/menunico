import React, { Component } from 'react'
import Icon  from 'react-native-vector-icons/MaterialIcons'
import {TouchableWithoutFeedback, Image, StyleSheet ,View} from 'react-native'

export function CheckBox(props) {
  return  (
    <TouchableWithoutFeedback
      onPress={props.handler}>
      <Icon size={26}
                name={props.checked
                        ? 'check-box'
                        : 'check-box-outline-blank'}
                color={props.checked
                        ? '#F2504B'
                        : undefined}/>
    </TouchableWithoutFeedback>
  )
}

const style = {
  base: {
    height: 34,
    width: 54,
    borderColor: 'white',
    borderWidth: 2,
    flex: 0,
    borderRadius: 3
  },
  checked: {
    borderColor: '#F2504B'
  }
}
export function CheckImage(props) {
  const style = {
    base: {
      height: (props.height || 30 ) + 4,
      width: (props.width || 50) + 4,
      borderColor: 'white',
      borderWidth: 2,
      flex: 0,
      borderRadius: 3
    },
    checked: {
      borderColor: '#F2504B'
    }
  }
  return (
    <TouchableWithoutFeedback
      onPress={props.handler}>
      <View style={[style.base, (props.checked && style.checked)]} >
        <Image resizeMode={props.resize || 'center'}
          style={StyleSheet.absoluteFillObject}
          width={props.width || 50}
          height={props.height || 30}
          source={props.image} />
      </View>
    </TouchableWithoutFeedback>
  )
}
