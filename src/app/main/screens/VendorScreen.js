import React from 'react'
import { Vendor } from '@pages'
import { Constants } from '@common'


class VendorScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: __.t("Vendor Information"),
  })

  render() {
    const { navigation } = this.props
    return (
      <Vendor
        showDetail={(product) => navigation.navigate(Constants.Screen.Detail, { product })}
        navigation={navigation} />
    )
  }
}

export default VendorScreen