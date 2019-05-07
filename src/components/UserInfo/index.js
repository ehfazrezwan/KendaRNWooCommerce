import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Platform,
  findNodeHandle
} from 'react-native'
import styles from './style'
import { Utils } from '@common'
import { BlurView, VibrancyView } from 'react-native-blur';

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Text } from '@components'

class UserInfo extends React.PureComponent {
  state = { viewRef: null }
  render() {
    let { customerInfo, signOut, signIn } = this.props
    var avatar = "https://media-mmdb.nationalgeographic.com/static-media/images/css_images/nationalGeographic_default_avatar.jpg"
    if (customerInfo && customerInfo.avatar_url != undefined) {
      avatar = customerInfo.avatar_url
    }

    var name = ""
    if (customerInfo && customerInfo.first_name != undefined && customerInfo.first_name != "" && customerInfo.last_name != undefined && customerInfo.last_name != "") {
      name = customerInfo.first_name + " " + customerInfo.last_name
    } else if (customerInfo) {
      name = customerInfo.email
    }

    return (
      <View style={styles.container}>
        {
          Utils.isNotEmpty(name) ?
            <View style={styles.content}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <Text style={styles.name}>{name}</Text>
              <TouchableOpacity style={styles.btnSign} activeOpacity={0.75} onPress={signOut}>
                <Text style={styles.txtButton} >{__.t('Sign Out').toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={styles.content}>
              <Text style={styles.textWelcome}>{__.t('Welcome')}</Text>
              <TouchableOpacity style={styles.btnSign} activeOpacity={0.75} onPress={signIn}>
                <Text style={styles.txtButton} >{__.t('Sign In').toUpperCase()}{' / '}{__.t('Sign Up').toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }

}

UserInfo.defaultProps = {
  customerInfo: null
}

function mapStateToProps({ authReducers }) {
  return {
    customerInfo: authReducers.customerInfo,
    message: authReducers.message,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
