import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { OrderItem } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'

class MyOrders extends React.PureComponent {
  render() {
    let { myOrders } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={myOrders}
          renderItem={({ item }) => <OrderItem style={styles.step} item={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    )
  }

  componentDidMount() {
    this.props.getMyOrders(this.props.customerInfo.id, 1)
  }
}


MyOrders.defaultProps = {
  myOrders: [],
}

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    myOrders: cartsReducers.myOrders,
    customerInfo: authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders)
