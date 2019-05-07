import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'
import styles from './style'
import {Colors} from '@common'

class Input extends React.PureComponent {
  render(){
    let {style} = this.props
    return (
      <TextInput
        style={[styles.input,style]}
        placeholderTextColor={Colors.Gray}
        underlineColorAndroid='transparent'
        {...this.props}/>
    )
  }
}

export default Input
