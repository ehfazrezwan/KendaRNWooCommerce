import React from 'react'
import { View, SafeAreaView, Image, ScrollView } from 'react-native'
import StarRating from 'react-native-star-rating'
import { Text, Products } from '@components'
import styles from './styles'
import { Icons, Colors } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import * as ActionTypes from '@actions/ActionTypes'
import { bindActionCreators } from 'redux'

class Vendor extends React.PureComponent {


  render() {
    let vendorInfo = this.props.navigation.state.params.vendor
    const { productVendor, showDetail } = this.props
    if (vendorInfo) {
      return (
        <SafeAreaView style={styles.container}>
          <Products hideSection={true} products={productVendor.items} seeAll={false} horizontal={false} onPress={showDetail} />
        </SafeAreaView>
      )
    } else {
      return <View />
    }
  }

  componentWillMount = () => {
    let vendorInfo = this.props.navigation.state.params.vendor
    this.props.getProductForVendor(vendorInfo.id);
  }

}

Vendor.defaultProps = {
  productVendor: { items: [], total_count: 0 }
}

function mapStateToProps({ productsReducers }) {
  return {
    type: productsReducers.type,
    productVendor: productsReducers.productVendor
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Vendor)
