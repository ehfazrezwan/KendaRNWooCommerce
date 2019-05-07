import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList
} from 'react-native'
import styles from './style'
import { Text, CartItem, Button, HInput } from '@components'
import { Config, Constants, Global } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class Carts extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      coupon: '',
      discount: 0,
      totalChanged: 0
    }
  }

  isRequestingCoupon = false

  render() {
    let { carts, isRequesting, typeCart } = this.props
    let total = this.getPriceTotal()

    return (
      <SafeAreaView style={styles.container}>
        {carts.length == 0 && this.renderEmptyList()}
        {carts.length > 0 && (
          <View style={styles.content}>
            <View style={styles.totalWrapper}>
              <Text style={styles.total}>{__.t('Total')}: </Text>
              <Text style={styles.total}>{Config.Currency.symbol}{total}</Text>
            </View>
            <FlatList
              contentContainerStyle={styles.list}
              keyExtractor={(item, index) => `${index}`}
              data={carts}
              extraData={this.props}
              renderItem={({ item }) => <CartItem item={item} changeProductQuantity={(product, qty) => this.props.changeProductQuantity(product, qty)} onRemove={this.removeToCart} />}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}
        {total > 0 && (
          <View style={styles.actionWrapper}>
            <View style={styles.couponWrapper}>
              <HInput
                style={{ flex: 1 }}
                placeholder={__.t('Coupon')}
                secureTextEntry={false}
                value={this.state.coupon}
                onChangeText={(coupon) => this.setState({ coupon })}
              />
              <Button title={__.t('Apply')} style={styles.btnCoupon} loading={typeCart === ActionTypes.GET_COUPONS_PENDING} onPress={() => this.getCoupons()} />
            </View>
            <Button title={__.t('Checkout')} loading={isRequesting} style={styles.btnCheckout} onPress={this.checkout} />
          </View>
        )}

      </SafeAreaView>
    )
  }

  renderEmptyList = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.message}>{__.t('Empty List')}</Text>
      </View>
    )
  }

  removeToCart = (item) => {
    this.props.removeToCart(item)
  }

  getPriceTotal = () => {
    const { discount } = this.state
    var total = 0
    this.props.carts.forEach((item) => {
      total += item.price * item.qty
    })
    return total - discount
  }

  componentWillMount = () => {
    this.setTotalPrice()
  }


  checkout = () => {
    if (this.props.customerInfo) {
      this.props.showShippingAddress()
    } else {
      this.isLogin = true
      this.props.signIn()
    }
  }

  _checkCodeCoupon = (coupons) => {
    this.isRequestingCoupon = false
    const { coupon } = this.state
    if (coupons && coupons.length > 0) {
      let objCoupon = null
      for (let i = 0; i < coupons.length; i++) {
        let c = coupons[i]
        if (coupon === c.code) {
          objCoupon = c
        }
      }
      if (objCoupon) {
        var discount = 0

        if (objCoupon.discount_type === 'fixed_product' || objCoupon.discount_type === 'fixed_cart') {
          discount = parseFloat(objCoupon.amount)
        } else if (objCoupon.discount_type === 'percent') {
          var total = 0
          this.props.carts.forEach((item) => {
            total += item.price * item.qty
          })
          discount = total * parseFloat(objCoupon.amount) / 100
        }
        this.setState({ discount })
        let coupon = {}
        // coupon.id = objCoupon.id
        coupon.code = objCoupon.code
        coupon.discount = discount.toString()
        this.props.setCoupons(coupon)
      } else {
        alert(__.t('Code coupon invalid'))
      }
    }
  }

  componentWillReceiveProps(props) {
    if (props.type == ActionTypes.SIGN_IN_SUCCESS && this.isLogin == true) {
      this.isLogin = false
      this.props.showShippingAddress()
    }
    if (props.typeCart == ActionTypes.GET_COUPONS_SUCCESS && this.isRequestingCoupon) {
      this._checkCodeCoupon(props.coupons)
    }
  }

  signOut = () => {
    this.props.signOut()
  }

  setTotalPrice = () => {
    let total = this.getPriceTotal()
    this.setState({ total })
  }

  componentDidMount = () => {
    this.onLogout = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogout, this.signOut)

  }

  componentWillUnmount = () => {
    this.onLogout.remove()
  }

  getCoupons = () => {
    this.isRequestingCoupon = true
    const { coupon } = this.state
    if (coupon) {
      this.props.getCoupons()
    }
  }

}

Carts.defaultProps = {
  carts: [],
  type: false,
  customerInfo: null,
  coupons: []
}

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    carts: cartsReducers.carts,
    reload: cartsReducers.reload,
    type: authReducers.type,
    customerInfo: authReducers.customerInfo,
    isRequesting: authReducers.type == ActionTypes.GET_CUSTOMER_INFO_PENDING,
    coupons: cartsReducers.coupons,
    typeCart: cartsReducers.type
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Carts)
