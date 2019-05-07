import React from 'react'
import { TouchableHighlight, View, Image } from 'react-native'
import { Text } from '@components'
import { Icons } from '@common'
import styles from './styles'

class RadioItem extends React.PureComponent {
  render() {
    let { onClick, isChecked, leftText, style, textStyle } = this.props
    let icon = isChecked ? Icons.Select : Icons.UnSelect
    return (
      <TouchableHighlight style={style} onPress={onClick} underlayColor='transparent'>
        <View style={styles.container}>
          {
            leftText && <Text style={[styles.rightText, textStyle]}>{leftText}</Text>
          }
          <Image source={icon} style={[styles.icon]} />
        </View>
      </TouchableHighlight>
    )
  }
}

export default RadioItem