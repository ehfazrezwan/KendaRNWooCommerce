import React from 'react'
import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import { Colors, Icons } from '@common'
import {Text} from '@components'

class InputOptions extends React.PureComponent {
  render() {
    const { onChangeText, placeholder, value, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.inputWrap} activeOpacity={0.75} onPress={onPress}>
        <Text style={styles.input}>{value && value.length > 0 ? value : placeholder}</Text>
        <Image source={Icons.UpDown} style={styles.icon} />
      </TouchableOpacity>
    )
  }
}

export default InputOptions