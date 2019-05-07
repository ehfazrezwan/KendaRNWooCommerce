import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  Share,
  Linking,
  Alert
} from 'react-native'
import styles from './style'
import { Icons, Global, Constants } from '@common'
import { UserInfo, SettingItem } from '@components'
import Mailer from 'react-native-mail';

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class MyProfile extends React.PureComponent {
  render() {
    let { showWishList, showLanguages, showMyAddress, showFeedback, showMyOrders, customerInfo, signIn } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <UserInfo signIn={signIn} />
          <View style={styles.Group}>
            {customerInfo && <SettingItem icon={Icons.Shipping} title={__.t('My Orders')} onPress={showMyOrders} />}
            {customerInfo && <SettingItem icon={Icons.Address} title={__.t('My Address Book')} onPress={showMyAddress} />}
            <SettingItem icon={Icons.FavoriteSelected} title={__.t('My WishList')} onPress={showWishList} />
          </View>
          <View style={styles.Group}>
            <SettingItem icon={Icons.Feedback} title={__.t('Feedback')} onPress={this.handleEmail} />
            <SettingItem icon={Icons.Language} title={__.t('Change Language')} onPress={showLanguages} />
          </View>
          <View style={styles.Group}>
            <SettingItem icon={Icons.Share} title={__.t('Share App')} onPress={this.shareApp} />
            <SettingItem icon={Icons.Star} title={__.t('Rate App')} onPress={this.rateApp} />
            {customerInfo && <SettingItem icon={Icons.SignOut} title={__.t('Sign Out')} onPress={this.signOut} />}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  handleEmail = () => {
    Mailer.mail({
      subject: 'need help',
      recipients: ['support@example.com'],
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
        ],
        { cancelable: true }
      )
    });
  }

  shareApp = () => {
    Share.share({
      title: "Hubay",
      message: "Great App!!!",
      url: "https://www.hubay.net/"
    })
  }

  rateApp = () => {
    Linking.openURL("https://www.hubay.net/")
  }

  signOut = () => {
    this.props.signOut()
  }

  componentDidMount = () => {
    this.onLogout = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogout, this.signOut)
  }

  componentWillUnmount = () => {
    this.onLogout.remove()
  }
}

MyProfile.defaultProps = {
  customerInfo: false
}

function mapStateToProps({ authReducers }) {
  return {
    customerInfo: authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)
