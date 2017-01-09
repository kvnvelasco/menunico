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
    width: props.width,
    marginTop: (props.margin && props.margin[0]) || 0,
    marginRight: (props.margin && props.margin[1]) || 0,
    marginBottom: (props.margin && props.margin[2]) || 0,
    marginLeft: (props.margin && props.margin[3]) || 0,
    paddingTop: (props.padding && props.padding[0]) || 0,
    paddingRight: (props.padding && props.padding[1]) || 0,
    paddingBottom: (props.padding && props.padding[2]) || 0,
    paddingLeft: (props.padding && props.padding[3]) || 0,
    ...props.style
  }
  return <NativeText numberOfLines={props.lines || 3} style={style}>{props.content || props.children}</NativeText>
}
