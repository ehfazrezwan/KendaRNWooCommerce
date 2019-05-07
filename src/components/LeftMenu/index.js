import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native'
import styles from './style'
import { Text } from '@components'
import { Icons, Constants, Colors } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { LeftMenuItem } from '@components'

class LeftMenu extends React.PureComponent {

  render() {
    let { categories, onOpenPage, onLogout, onLogin, customerInfo } = this.props
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
        <View style={styles.topView} >
          {
            name != "" ?
              <View style={styles.viewHeader}>
                <Image source={{uri: avatar}} style={styles.avatar} />
                <Text style={styles.txtEmail}>{name}</Text>
                {/*<TouchableOpacity activeOpacity={0.75} style={styles.btnHeader} onPress={onLogout}>
                  <Text style={styles.btnTextHeader}>{__.t('Sign Out')}</Text>
                </TouchableOpacity>*/}
              </View>
              :
              <View style={styles.viewHeader}>
                <Text style={styles.textWelcome}>{__.t('Welcome')}</Text>
                <TouchableOpacity activeOpacity={0.75} style={styles.btnHeader} onPress={onLogin}>
                  <Text style={styles.btnTextHeader}>{__.t('Sign In')} / {__.t('Sign Up')}</Text>
                </TouchableOpacity>
              </View>
          }
        </View>
        <View style={{ backgroundColor: '#f3f3f3' }}>
          <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, color: '#999999', fontWeight: 'bold' }}> CATEGORIES </Text>
        </View>

        <View style={styles.btmView} >
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item, index) => `${index}`}
            data={categories}
            renderItem={({ item, index }) => <LeftMenuItem item={item} onPress={onOpenPage} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    )
  }
}

LeftMenu.defaultProps = {
  categories: [],
  customerInfo: null
}

function mapStateToProps({ categoriesReducers, authReducers }) {
  return {
    categories: categoriesReducers.categories,
    customerInfo: authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu)
