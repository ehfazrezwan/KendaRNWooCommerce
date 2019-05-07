import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import { Text } from '@components'
import { Config } from '@common'


class CProductItem extends React.PureComponent {
  render() {
    const { item } = this.props
    return (
      <View style={styles.container}>
        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.name}>{item.product.name}</Text>
        <View style={styles.price}>
          <View style={styles.rowPrice}>
            <Text style={styles.label}>{__.t('Quantity')}:</Text>
            <Text> {item.qty}</Text>
          </View>
          <View style={styles.rowPrice}>
            <Text style={styles.label}>{__.t('Price')}: </Text>
            <Text>{Config.Currency.symbol}{item.price}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default CProductItem