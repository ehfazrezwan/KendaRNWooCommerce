import React from 'react'
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import { Text, Checkbox, Button, HInput } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import { Icons, Global, Constants } from '@common'

const FBSDK = require('react-native-fbsdk')
const {
  AccessToken,
  LoginManager,
} = FBSDK

class SignIn extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isRememberMe: false
    }
  }



  render() {
    let { signUp, goBack, type } = this.props
    const { isRememberMe } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Image source={Icons.Logo} style={styles.logo} />

        <View style={styles.content}>
          <HInput
            placeholder={__.t('Email')}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <View style={styles.separator} />
          <HInput
            placeholder={__.t('Password')}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <Checkbox isChecked={isRememberMe} onClick={() => this.setState({ isRememberMe: !isRememberMe })} rightText={__.t("Remember me")} style={styles.check} />
          <Button title={__.t('Sign In')} style={styles.btnSignIn} loading={type == ActionTypes.SIGN_IN_PENDING} onPress={this.signIn} />
          <View style={styles.viewOr}>
            <Text>OR</Text>
          </View>
          <Button isIcon={true} icon={Icons.FaceBook} title={__.t('Login With Facebook')} style={styles.btnFace} onPress={() => this.loginFacebook()} />
          <Text style={styles.text}>{__.t('Do you have account with Hubay?')} <Text style={styles.signUp} onPress={signUp}>{__.t('Sign Up')}</Text></Text>
        </View>
        <TouchableOpacity style={styles.btnClose} onPress={goBack}>
          <Image source={Icons.Close} style={styles.closeIcon} />
        </TouchableOpacity>

      </SafeAreaView>
    )
  }

  signIn = () => {
    let { email, password } = this.state
    this.isLogging = true
    this.props.signInCustomer(email, password)
  }

  loginFacebook = () => {
    var self = this
    LoginManager.logOut()
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          //alert('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              self.isLogging = true
              self.props.signInFacebook(data.accessToken);
            }
          )
        }
      }, function (error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  componentWillMount = () => {
    const { loginData } = this.props
    if (loginData) {
      this.setState({
        email: loginData.email,
        password: loginData.password,
        isRememberMe: loginData.isRememberMe
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type == ActionTypes.SIGN_IN_FAIL && this.isLogging == true) {
      this.isLogging = false
      alert(nextProps.message)
    }

    if (nextProps.type == ActionTypes.SIGN_IN_SUCCESS && this.isLogging == true) {
      this.isLogging = false
      var name = ""
      let customerInfo = nextProps.customerInfo
      if (customerInfo && customerInfo.first_name != undefined && customerInfo.first_name != "" && customerInfo.last_name != undefined && customerInfo.last_name != "") {
        name = customerInfo.first_name + " " + customerInfo.last_name
      } else if (customerInfo) {
        name = customerInfo.email
      }
      Global.EventEmitter.emit(Constants.EventEmitterName.showToast, __.t('Welcome back') + ' ' + name)
      const { isRememberMe, email, password } = this.state
      let loginData = {
        email: isRememberMe ? email : '',
        password: isRememberMe ? password : '',
        isRememberMe
      }
      this.props.storeSignIn(loginData)
      this.props.goBack()
    }
  }

}

function mapStateToProps({ authReducers }) {
  return {
    type: authReducers.type,
    message: authReducers.message,
    loginData: authReducers.loginData,
    customerInfo: authReducers.customerInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
