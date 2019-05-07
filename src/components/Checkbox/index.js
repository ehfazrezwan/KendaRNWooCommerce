import React from 'react'
import {
  View,
  TouchableHighlight,
  Image
} from 'react-native'
import styles from './styles'
import { Text } from '@components'
import { Colors, Icons } from '@common';

class Checkbox extends React.PureComponent {

  render() {
    let { onClick, isChecked, rightText, style } = this.props
    let icon = isChecked ? Icons.Checked : Icons.UnCheck
    let iconStyle = isChecked ? styles.iconChecked : styles.iconUnCheck
    return (
      <TouchableHighlight style={style} onPress={onClick} underlayColor='transparent'>
        <View style={styles.container}>
          <Image source={icon} style={[styles.icon, iconStyle]} />
          {
            rightText && <Text style={styles.rightText}>{rightText}</Text>
          }
        </View>
      </TouchableHighlight>
    )
  }

  static defaultProps = {
    isChecked: false
  }

}

export default Checkbox
