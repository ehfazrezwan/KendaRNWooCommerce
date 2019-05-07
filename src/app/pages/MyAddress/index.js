import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import styles from './style'
import { Icons } from '@common'
import { Text, MyAddressItem } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class MyAddress extends React.PureComponent {

  render() {
    let { myAddresses } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {myAddresses.map((myAddress, index) => {
            const icon = myAddress.isDefault ? Icons.CheckCircle : Icons.UncheckCircle
            return (
              <TouchableOpacity key={index} style={[styles.row, (index === myAddresses.length - 1) && styles.rowBottom]} activeOpacity={0.75} onPress={() => this.setAddressDefault(myAddress)}>
                <View style={styles.content}>
                  <Text style={styles.name} >{myAddress.firstname} {myAddress.lastname}</Text>
                  <Text style={styles.text} >{myAddress.street}</Text>
                  <Text style={styles.text} >{myAddress.region}</Text>
                  <Text style={styles.text} >{myAddress.countryName}</Text>
                  <Text style={styles.text} >{myAddress.telephone}</Text>
                </View>
                <Image source={icon} style={[styles.icon, myAddress.isDefault && styles.selectedIcon]} />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </SafeAreaView>
    )
  }

  setAddressDefault = (myAddress) => {
    this.props.setMyAddress(myAddress)
  }
}

MyAddress.defaultProps = {
  myAddress: false,
  myAddresses: []
}

function mapStateToProps({ authReducers }) {
  return {
    myAddress: authReducers.myAddress,
    myAddresses: authReducers.myAddresses
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress)
