import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native'
import styles from './style'
import { Colors } from '@common'
import { Text } from '@components'

class Button extends React.PureComponent {
  static defaultProps = {
    disabled: false,
    loading: false,
    isIcon: false
  }
  render() {
    let { title, loading, disabled, onPress, style, isIcon, icon } = this.props
    return (
      <TouchableOpacity style={[styles.button, style]} disabled={loading || disabled} onPress={onPress} activeOpacity={0.75}>
        {
          isIcon &&
          <Image source={icon} style={styles.icon} />
        }
        {!loading && <Text style={styles.title}>{title}</Text>}
        {loading && <ActivityIndicator color="white" />}
      </TouchableOpacity>
    )
  }
}

export default Button
