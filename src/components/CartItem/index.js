import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import { Icons, Utils, Config } from '@common'
import { Text, Quantity } from '@components'

class CartItem extends React.PureComponent {
  render() {
    let { item, onRemove } = this.props
    return (
      <View>
        <View style={styles.container}>
          <Image source={{ uri: Utils.getProductImageUrl(item.product) }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.name} >{item.product.name}</Text>
            <View style={styles.row}>
              <Text style={styles.quantity} >{__.t('Quantity')}:</Text>
              <Quantity qty={item.qty} onChangeQuantity={this.onChangeQuantity} />
            </View>
            <Text style={styles.sale_price}>{Config.Currency.symbol}{item.price}</Text>
            {item.free_ship && <Text style={styles.freeShipping}>{__.t('Free Shipping')}</Text>}
            <View style={styles.optionsWrap}>
              {
                item.variation && item.variation.options && item.variation.options.length > 0 &&
                item.variation.options.map((option) => {
                  return this.renderOption(option)
                })
              }
            </View>
            <TouchableOpacity onPress={() => onRemove(item)} style={styles.btnDelete}>
              <Image source={Icons.Delete} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderOption = (option) => {
    return (
      <View style={styles.optionWrap}>
        <Text style={styles.optionName}>{option.name}:</Text>
        <Text style={styles.optionValue}>{option.value}</Text>
      </View>
    )
  }

  onChangeQuantity = (qty) => {
    this.props.changeProductQuantity(this.props.item, qty)
  }
}

export default CartItem
