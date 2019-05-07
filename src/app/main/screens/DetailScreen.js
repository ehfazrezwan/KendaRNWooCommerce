import React from 'react'
import { Detail } from '@pages'
import { NavButton, NavTitle, HeaderSearch } from '@components'
import { Icons, Constants } from '@common'

class DetailScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.product.name}`
  })

  render() {
    const { navigation } = this.props
    return <Detail
      navigation={navigation}
      showAttributeDetail={(attributes) => navigation.navigate(Constants.Screen.AttributeDetail, { attributes })}
      showSpecification={(specification) => { navigation.navigate(Constants.Screen.Specification, { specification }) }}
      showVendor={(vendor) => { navigation.navigate(Constants.Screen.Vendor, { vendor }) }}
      showDetail={(product) => navigation.navigate(Constants.Screen.Detail, { product })} />
  }
}

export default DetailScreen
