import React from 'react'
import { Checkout } from '@pages'
import { Constants } from '@common'

class CheckoutScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: __.t("Checkout")
  })

  render() {
    const { navigation } = this.props
    return <Checkout navigation={navigation}
      showCarts={() => navigation.navigate(Constants.Screen.Carts)} />
  }
}

export default CheckoutScreen