import React, { Component } from 'react'
import Icon  from 'react-native-vector-icons/MaterialIcons'
import {TouchableWithoutFeedback} from 'react-native'
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
