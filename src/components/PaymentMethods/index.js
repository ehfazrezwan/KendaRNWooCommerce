import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { Icons } from '@common'
import { Text } from '@components'

class PaymentMethods extends React.PureComponent {
  state = {
    selected: ''
  }
  render() {
    let { paymentMethods } = this.props
    return (
      <View style={styles.container}>
        {paymentMethods.map((item, index) => item.enabled && this.renderItem(item, index))}
      </View>
    )
  }

  renderItem = (item, index) => {
    let icon = null
    if (item.id == 'ppec_paypal') {
      icon = Icons.Paypal
    } else if (item.id == 'razorpay') {
      icon = Icons.RazorPay
    } else if (item.id == 'stripe') {
      icon = Icons.Stripe
    } else {
      icon = Icons.Cash
    }
    return (
      <TouchableOpacity key={index} onPress={() => this.selectPaymentMethod(item)} style={styles.item} activeOpacity={0.75}>
        <Image source={icon} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.title}</Text>
        </View>
        <Image source={this.state.selected == item.id ? Icons.CheckCircle : Icons.UncheckCircle} style={[styles.icon, this.state.selected && styles.selectedIcon]} />
      </TouchableOpacity>
    )
  }

  selectPaymentMethod = (item) => {
    this.setState({ selected: item.id })
    this.props.onSelectPaymentMethod(item)
  }
}

export default PaymentMethods
