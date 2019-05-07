import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { Config } from '@common'
import styles from './styles'


class TotalPrice extends React.PureComponent {
  render() {
    const { totalPrice, coupon, priceShipping } = this.props
    let couponValue = (coupon && coupon.discount) ? coupon.discount : 0
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.colHeader}>{__.t('Total price')}:</Text>
          <Text style={styles.colBody}>{Config.Currency.symbol}{totalPrice}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colHeader}>{__.t('Price shipping')}:</Text>
          <Text style={styles.colBody}>{Config.Currency.symbol}{priceShipping}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colHeader}>{__.t('Coupon')}:</Text>
          <Text style={styles.colBody}>{Config.Currency.symbol}{couponValue}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colHeader}>{__.t('Total')}:</Text>
          <Text style={styles.colBody}>{Config.Currency.symbol}{totalPrice + priceShipping - couponValue}</Text>
        </View>
      </View>
    )
  }
}

export default TotalPrice