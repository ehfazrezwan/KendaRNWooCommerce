import React from 'react'
import {
  View,
  SafeAreaView
} from 'react-native'
import styles from './style'
import { Config, Colors, Constants } from '@common'
import { PaymentMethods, Button } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class PaymentInfo extends React.PureComponent {
  state = {
    paymentMethod: null
  }

  render() {
    let { paymentMethods, type } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <PaymentMethods paymentMethods={paymentMethods} onSelectPaymentMethod={this.onSelectPaymentMethod} />
        </View>
        <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={this.onSubmit} loading={type == ActionTypes.CREATE_ORDER_PENDING} />
      </SafeAreaView>
    )
  }

  onSelectPaymentMethod = (item) => {
    this.setState({ paymentMethod: item })
  }

  onSubmit = () => {
    let { paymentMethod } = this.state
    if (paymentMethod == null) {
      alert("Please choose payment method.")
      return
    }
    this.props.setPaymentMethod(paymentMethod)
    this.props.showCheckout()
  }

  getPriceTotal = () => {
    let { carts, coupon } = this.props
    var total = 0
    carts.forEach((item) => {
      total += item.price * item.qty
    })
    const discount = (coupon && coupon.discount) ? coupon.discount : 0
    return total - discount
  }
}

PaymentInfo.defaultProps = {
  paymentMethods: []
}

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    carts: cartsReducers.carts,
    type: cartsReducers.type,
    message: cartsReducers.message,
    paymentMethods: cartsReducers.paymentMethods,
    shippingAddress: cartsReducers.shippingAddress,
    shippingMethod: cartsReducers.shippingMethod,
    customerInfo: authReducers.customerInfo,
    orderInfo: cartsReducers.orderInfo,
    coupon: cartsReducers.coupon
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo)
