import React from 'react'
import { PaymentInfo } from '@pages'
import { Constants } from '@common'

class PaymentInfoScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: __.t('Payment Methods'),
  })

  render() {
    const { navigation } = this.props
    return <PaymentInfo navigation={navigation}
      showCheckout={() => navigation.navigate(Constants.Screen.Checkout)}
      showCarts={() => navigation.popToTop()} />
  }
}

export default PaymentInfoScreen
