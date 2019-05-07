import React from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import { CProductItem, Text, AddressItem, MethodItem, TotalPrice, Button, Razorpay } from '@components'
import styles from './styles'
import { Config, Constants, Colors } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import PayPal from 'react-native-paypal-wrapper'
import stripe from 'tipsi-stripe'
PayPal.initialize(Config.PayPal.Environment, Config.PayPal.ClientId)
stripe.setOptions({
  publishableKey: Config.Stripe.publishKey,
  merchantId: Config.Stripe.mechantId,
  androidPayMode: 'test',
})
class Checkout extends React.PureComponent {
  render() {
    const { carts, shippingMethod, shippingAddress, payment, coupon, type } = this.props
    let totalPrice = this.getPriceTotal()
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={[styles.wrap]}>
              <Text style={styles.header}>{__.t('Products')}</Text>
              <FlatList
                contentContainerStyle={styles.listProduct}
                keyExtractor={(item, index) => `${index}`}
                data={carts}
                renderItem={({ item, index }) => <CProductItem key={index} item={item} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
            <View style={styles.wrap}>
              <Text style={styles.header}>{__.t('Address')}</Text>
              <AddressItem item={shippingAddress} />
            </View>
            <View style={styles.wrap}>
              <MethodItem shipping={shippingMethod} payment={payment} />
            </View>
            <View style={[styles.wrap, styles.mrBottom]}>
              <Text style={styles.header}>{__.t('Total')}</Text>
              <TotalPrice priceShipping={0} totalPrice={totalPrice} coupon={coupon} />
            </View>
          </ScrollView>
        </View>
        <Razorpay ref="razorpay" onPayment={this.onRazorpayPayment}/>
        <View style={styles.action}>
          <Button title={__.t('Cancel')} style={styles.btnCancel} onPress={() => this.onCancel()} />
          <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={() => this.onSubmit()} loading={type == ActionTypes.CREATE_ORDER_PENDING} />
        </View>
      </View>
    )
  }


  getPriceTotal = () => {
    let { carts } = this.props
    var total = 0
    carts.forEach((item) => {
      total += item.price * item.qty
    })
    return total
  }

  getTotal = () => {
    let { carts, coupon } = this.props
    var total = 0
    carts.forEach((item) => {
      total += item.price * item.qty
    })
    const discount = (coupon && coupon.discount) ? coupon.discount : 0
    return total - discount
  }

  onCancel = () => {
    this.props.showCarts()
  }

  onSubmit = () => {
    let { shippingAddress, carts, shippingMethod, customerInfo, coupon, payment } = this.props
    var line_items = []
    carts.forEach((item) => {
      let variantionId = item.variation ? item.variation.variation_id : null
      let obj = {}
      obj.product_id = item.product.id
      obj.quantity = item.qty
      if (variantionId) {
        obj.variation_id = variantionId
      }
      line_items.push(obj)
    })
    this.data = {
      payment_type: '',
      payment_method: payment.id,
      payment_method_title: payment.title,
      set_paid: false,
      billing: shippingAddress,
      shipping: shippingAddress,
      line_items: line_items,
      shipping_lines: [
        {
          method_id: shippingMethod.id,
          method_title: shippingMethod.title
        }
      ],
      ...(coupon != undefined && coupon.discount != undefined ? {
        coupon_lines: [
          coupon
        ]
      } : {}),
      customer_id: customerInfo.id
    };
    if (payment.id == "ppec_paypal") {
      PayPal.pay({
        price: `${this.getTotal()}`,
        currency: Config.Currency.code,
        description: 'Make payment from SOUK'
      })
        .then((confirm) => {
          this.data.set_paid = true
          this.props.createOrder(this.data)
        })
        .catch((error) => {
        })
    } else if (payment.id == 'razorpay') {
      let total = this.getTotal() * Constants.USD_TO_INR

      this.refs.razorpay.show({
        amount: parseInt(total),
        email: customerInfo.email,
        phone: customerInfo.billing.phone,
        name: customerInfo.first_name + " " + customerInfo.last_name
      })
      
      // let options = {
      //   description: 'Credits towards consultation',
      //   image: 'https://i.imgur.com/3g7nmJC.png',
      //   currency: 'INR',
      //   key: Config.RazorpayKey,
      //   amount: `${parseInt(total)}`,
      //   name: 'Payment with razorpay',
      //   prefill: {
      //     email: customerInfo.email,
      //   },
      //   theme: { color: Colors.AppColor }
      // }
      // RazorpayCheckout.open(options).then((response) => {
      //   //alert(`Success: ${response.razorpay_payment_id}`);
      //   this.data.set_paid = true
      //   this.props.createOrder(this.data)
      // }).catch((error) => {
      //   alert(error.description)
      //   //alert(`Error: ${error.code} | ${error.description}`);
      // });
    } else if (payment.id === 'stripe') {
      let objPay = {
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: customerInfo.last_name,
            line1: shippingAddress.address_1,
            city: shippingAddress.city,
            state: shippingAddress.state,
            country: shippingAddress.country,
            postalCode: shippingAddress.postcode,
            email: customerInfo.email,
          },
        },
      }
      stripe.paymentRequestWithCardForm(objPay).then((token) => {
        this.data.set_paid = false
        this.data.payment_type = 'stripe'
        this.data.stripe_token = token.tokenId
        this.data.status = 'pending'
        this.props.createOrder(this.data)
      })
        .catch((err) => {
          alert(err)
        })
    } else {
      this.props.createOrder(this.data)
    }
  }

  onRazorpayPayment = ()=>{
    this.data.set_paid = true
    this.props.createOrder(this.data)
  }

  componentWillReceiveProps(props) {
    if (props.type == ActionTypes.CREATE_ORDER_FAIL || props.type == ActionTypes.PAYMENT_STRIPE_FAIL) {
      alert(props.message)
    }

    if (props.type == ActionTypes.CREATE_ORDER_SUCCESS) {
      let orderInfo = props.orderInfo
      if (orderInfo.payment_type === 'stripe') {
        let dataStripe = {
          payment_method: 'stripe',
          order_id: orderInfo.id,
          payment_token: orderInfo.stripe_token
        }
        this.props.paymentStripe(dataStripe)
      } else {
        alert(__.t('Successfully'))
        this.props.showCarts()
      }
    }
    if (props.type == ActionTypes.PAYMENT_STRIPE_SUCCESS) {
      alert(__.t('Successfully'))
      this.props.showCarts()
    }
  }

}


function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    carts: cartsReducers.carts,
    type: cartsReducers.type,
    message: cartsReducers.message,
    shippingAddress: cartsReducers.shippingAddress,
    shippingMethod: cartsReducers.shippingMethod,
    customerInfo: authReducers.customerInfo,
    orderInfo: cartsReducers.orderInfo,
    coupon: cartsReducers.coupon,
    payment: cartsReducers.payment
  }
}

Checkout.defaultProps = {
  carts: [],
  shippingMethod: {},
  shippingAddress: {},
  payment: {},
  coupon: {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)