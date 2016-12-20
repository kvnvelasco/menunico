import React, { Component } from 'react'
import { Text as NativeText } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export function Text(props, state) {
  const style = {
    color: props.white ? 'white' : (props.color || '#212121'),
    fontSize: props.size || 18,
    lineHeight: Math.round(props.size*1.5) || 25,
    textAlign: props.align || 'left',
    fontWeight: props.bold && 'bold',
    ...props.style
  }
  return <NativeText numberOfLines={props.lines || 3} style={style}>{props.content || props.children}</NativeText>
}
