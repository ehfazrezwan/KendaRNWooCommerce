import React from 'react'
import { ShippingMaps } from '@pages'
import { Constants } from '@common'

class ShippingMapsScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: __.t('My Address Book'),
  })

  render() {
    const { navigation } = this.props
    return <ShippingMaps navigation={navigation} onAddAddress={(address) => navigation.navigate(Constants.Screen.AddAddress, {address})} />
  }
}

export default ShippingMapsScreen