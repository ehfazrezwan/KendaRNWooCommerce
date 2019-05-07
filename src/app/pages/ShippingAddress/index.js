import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import { Icons } from '@common'
import { Input, Button, CountriesModal, RegionsModal } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import countries from '@dummyData/countries'

class ShippingInfo extends React.PureComponent {
  constructor(props) {
    super(props)

    if (props.customerInfo == null) {
      return
    }
    let myAddress= props.shippingAddress;
    if (myAddress) {
      this.state = {
        email: props.customerInfo.email,
        firstname: myAddress.first_name,
        lastname: myAddress.last_name,
        telephone: myAddress.phone,
        street: myAddress.address_1,
        country_id: myAddress.country,
        region_code: myAddress.state,
        city: myAddress.city,
        postcode: myAddress.postcode,
        regions: this.getRegionsByCountry(myAddress.country),
        region: myAddress.region
      }
    } else {
      this.state = {
        email: props.customerInfo.email,
        firstname: props.customerInfo.first_name,
        lastname: props.customerInfo.last_name,
        telephone: '',
        street: '',
        country_id: '',
        region_code: '',
        city: '',
        postcode: '',
        regions: [],
        region: ''
      }
    }
  }

  getRegionsByCountry = (country_id)=>{
    var regions = []
    if (country_id != undefined) {
      countries.forEach((item)=>{
        if(item.countryShortCode == country_id){
          regions = item.regions
        }
      })
    }

    return regions
  }

  _getMyAdressDefault = (myAddresses) => {
    for (let i = 0; i < myAddresses.length; i++) {
      let address = myAddresses[i]
      if (address.isDefault === true) {
        return address
      }
    }
  }


  render() {
    let { type } = this.props

    if (this.props.customerInfo == null) {
      return <View />
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Input
            placeholder={__.t('First Name')}
            value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <View style={styles.separator} />
          <Input
            placeholder={__.t('Last Name')}
            value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })}
          />
          <View style={styles.separator} />
          <Input
            placeholder={__.t('Email')}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize="none"
          />
          <View style={styles.separator} />
          <Input
            placeholder={__.t('Telephone')}
            value={this.state.telephone}
            onChangeText={(telephone) => this.setState({ telephone })}
          />
          <View style={styles.separator} />
          <Input
            placeholder={__.t('Street')}
            value={this.state.street}
            onChangeText={(street) => this.setState({ street })}
          />

          <CountriesModal onSelectCountry={this.onSelectCountry} selectCountry={this.state.country_id} />
          <RegionsModal regions={this.state.regions} selectRegion={this.state.region_code} onSelectRegion={this.onSelectRegion} />

          <Input
            placeholder={__.t('City')}
            value={this.state.city}
            onChangeText={(city) => this.setState({ city })}
          />
          <Input
            placeholder={__.t('Postcode')}
            value={this.state.postcode}
            onChangeText={(postcode) => this.setState({ postcode })}
          />
        </View>
        <Button title={__.t('Submit')} style={styles.btnSubmit} onPress={this.onSubmit} loading={type == ActionTypes.GET_SHIPPING_METHODS_PENDING} />
      </SafeAreaView>
    )
  }

  onSelectCountry = (item) => {
    this.setState({ country_id: item.countryShortCode, regions: item.regions })
  }

  onSelectRegion = (item) => {
    this.setState({ region: item.name, region_code: item.shortCode })
  }

  onSubmit = () => {
    let { firstname, lastname, email, telephone, street, country_id, region_code, region, city, postcode } = this.state

    if (firstname == "" || lastname == "" || email == "" || telephone == "" || street == "" || country_id == "" || region_code == "" || city == "" || postcode == "") {
      return alert(__.t('Please input all fields'))
    }

    const address = {
      first_name: firstname,
      last_name: lastname,
      phone: telephone,
      email,
      address_1: street,
      state: region_code,
      country: country_id,
      city,
      postcode
    }

    this.props.setShippingAddress(address)
    this.props.getShippingMethods(country_id)
  }

  componentWillReceiveProps(props) {
    if (props.type == ActionTypes.GET_SHIPPING_METHODS_FAIL) {
      alert(props.message)
    }
    if (props.type == ActionTypes.GET_SHIPPING_METHODS_SUCCESS) {
      this.props.showShippingInfo()
    }
  }
}

ShippingInfo.defaultProps = {
  myAddress: false,
  customerInfo: {},
  myAddresses: []
}

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    type: cartsReducers.type,
    message: cartsReducers.message,
    customerInfo: authReducers.customerInfo,
    myAddress: authReducers.myAddress,
    myAddresses: authReducers.myAddresses,
    shippingAddress: cartsReducers.shippingAddress
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingInfo)
