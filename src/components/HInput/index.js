import React from 'react'
import {
  View,
  TextInput,
  Image
} from 'react-native'
import styles from './styles'
import { Colors } from '@common';

class HInput extends React.PureComponent {
  render() {
    let { onChangeText, value, placeholder, secureTextEntry, style } = this.props
    return (
      <View style={[styles.container, style]}>
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.textInput}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={Colors.TextInput}
          autoCapitalize="none" />
      </View>
    )
  }

  static defaultProps = {
    secureTextEntry: false
  }

}

export default HInput
