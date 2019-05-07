import * as ActionTypes from './ActionTypes'
import * as Services from '@services'
import { AsyncStorage } from 'react-native'

export const signUpCustomer = (firstname, lastname, email, password) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SIGN_UP_PENDING })
    Services.signUp(firstname, lastname, email, password)
      .then((response) => {
        dispatch({ type: ActionTypes.SIGN_UP_SUCCESS })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.SIGN_UP_FAIL, message: errMsg })
      })
  }
}

export const getCustomerInfo = (userToken) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_CUSTOMER_INFO_PENDING })
    if (typeof userToken != 'undefined' && userToken != null && userToken.length > 0) {
      global.userToken = userToken
    }
    Services.getCustomerInfo()
      .then((customerInfo) => {
        dispatch({ type: ActionTypes.GET_CUSTOMER_INFO_SUCCESS, customerInfo })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_CUSTOMER_INFO_FAIL, message: errMsg })
      })
  }
}

export const signInCustomer = (email, password) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SIGN_IN_PENDING })
    Services.signIn(email, password)
      .then((token) => {
        global.userToken = token

        //get customerInfo
        Services.getCustomerInfo()
          .then((customerInfo) => {
            dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, customerInfo, email, userToken: token })
          })
          .catch((errMsg) => {
            dispatch({ type: ActionTypes.SIGN_IN_FAIL, message: errMsg })
          })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.SIGN_IN_FAIL, message: errMsg })
      })
  }
}

export const signOut = () => {
  return { type: ActionTypes.SIGN_OUT }
}

export const signInFacebook = (accessToken) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SIGN_IN_PENDING })
    Services.signInFacebook(accessToken).then((response) => {
      //get customerInfo
      Services.getCustomerInfo(response.wp_user_id)
        .then((customerInfo) => {
          dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, customerInfo })
        })
        .catch((errMsg) => {
          dispatch({ type: ActionTypes.SIGN_IN_FAIL, message: errMsg })
        })
    })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.SIGN_IN_FAIL, message: errMsg })
      })
  }
}

export const setMyAddress = (myAddress) => {
  return { type: ActionTypes.SET_MY_ADDRESS, myAddress }
}

export const addAddress = (address) => {
  return { type: ActionTypes.ADD_MY_ADDRESS, address }
}

export const storeSignIn = (loginData) => {
  return { type: ActionTypes.REMEMBER_LOGIN, loginData: loginData }
}