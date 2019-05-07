import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { Icons, Utils } from '@common'

class BrandItem extends React.PureComponent {
  render() {
    let { item, onPress } = this.props
    return (
      <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
    )
  }
}

export default BrandItem
