import React, { Component } from 'react'

import {Image as NativeImage} from 'react-native'

export function Image(props){

  const style = {
    marginTop: (props.margin && props.margin[0]) || 0,
    marginRight: (props.margin && props.margin[1]) || 0,
    marginBottom: (props.margin && props.margin[2]) || 0,
    marginLeft: (props.margin && props.margin[3]) || 0,
    paddingTop: (props.padding && props.padding[0]) || 0,
    paddingRight: (props.padding && props.padding[1]) || 0,
    paddingBottom: (props.padding && props.padding[2]) || 0,
    paddingLeft: (props.padding && props.padding[3]) || 0,
    height: props.height || null,
    width: props.width || null,
    borderRadius: props.round ? props.width || props.height : 0,
    position: props.full && 'absolute',
    top: props.full && 0,
    left: props.full && 0,
    right: props.full && 0,
    bottom: props.full && 0,
    ...props.style
  }
  return <NativeImage style={style} resizeMode={props.resizeMode || 'contain'} source={props.source} />
}
