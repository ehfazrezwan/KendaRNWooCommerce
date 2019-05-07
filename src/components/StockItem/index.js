import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import styles from './styles'

class StockItem extends React.PureComponent {
  render() {
    const { product } = this.props;
    const quantity = product.stock_quantity ? product.stock_quantity : 0
    return (
      <View style={styles.container}>
        <Text style={styles.txtAvailability}>{__.t('Availability')}</Text>
        {
          product.in_stock ?
            <Text style={styles.txtInStock}>{" " + quantity} {" " + __.t('in stock')}</Text> :
            <Text style={styles.txtOutOf}>{" " + __.t('Out of stock')}</Text>
        }
      </View>
    )
  }
}

export default StockItem