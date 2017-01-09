import React, { Component } from 'react'
import { View as NativeView } from 'react-native'



export function View(props, state){
  const style = {
    position: 'relative',
    width: props.width,
    height: props.height,
    borderRadius: props.round,
    marginTop: (props.margin && props.margin[0]) || 0,
    marginRight: (props.margin && props.margin[1]) || 0,
    marginBottom: (props.margin && props.margin[2]) || 0,
    marginLeft: (props.margin && props.margin[3]) || 0,
    paddingTop: (props.padding && props.padding[0]) || 0,
    paddingRight: (props.padding && props.padding[1]) || 0,
    paddingBottom: (props.padding && props.padding[2]) || 0,
    paddingLeft: (props.padding && props.padding[3]) || 0,
    flex: props.flex || props.flex == 0 ? props.flex : 1,
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
    flexDirection: props.direction || 'column',
    justifyContent: props.justify || 'flex-start',
    alignItems: props.align || 'flex-start',
    alignSelf: props.self,
    backgroundColor: props.background || 'transparent',
    ...props.style
  }

  return <NativeView
    {...(props.pans || {})}
    elevation={props.elevation}
    pointerEvents={props.pointerEvents || 'auto'}
    style={style}>
    {props.children || null}
    </NativeView>
}
