import * as ActionTypes from './ActionTypes'
import * as Services from '@services'
import { AsyncStorage } from 'react-native'

export const addToCart = (product) => {
  return { type: ActionTypes.ADD_PRODUCT_TO_CART, product }
}

export const removeToCart = (product) => {
  return { type: ActionTypes.REMOVE_PRODUCT_TO_CART, product }
}

export const changeProductQuantity = (product, qty) => {
  return { type: ActionTypes.CHANGE_PRODUCT_QUANTITY, product, qty }
}


export const setShippingAddress = (address) => {
  return { type: ActionTypes.SET_SHIPPING_ADDRESS, address }
}

export const getShippingMethods = (countryCode) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_SHIPPING_METHODS_PENDING })

    Services.getShippingMethods(countryCode)
      .then((shippingMethods) => {
        dispatch({ type: ActionTypes.GET_SHIPPING_METHODS_SUCCESS, shippingMethods })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_SHIPPING_METHODS_FAIL, message: errMsg })
      })
  }
}

export const setShippingMethod = (shippingMethod) => {
  return { type: ActionTypes.SET_SHIPPING_INFO, shippingMethod }
}

export const getPaymentMethods = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_PAYMENT_METHODS_PENDING })
    Services.getPaymentMethods()
      .then((paymentMethods) => {
        dispatch({ type: ActionTypes.GET_PAYMENT_METHODS_SUCCESS, paymentMethods })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_PAYMENT_METHODS_FAIL, message: errMsg })
      })
  }
}

export const createOrder = (params) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.CREATE_ORDER_PENDING })

    Services.createOrder(params)
      .then((response) => {
        let orderInfo = response
        orderInfo.payment_type = params.payment_type
        orderInfo.stripe_token = params.stripe_token
        dispatch({ type: ActionTypes.CREATE_ORDER_SUCCESS, orderInfo })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.CREATE_ORDER_FAIL, message: errMsg })
      })
  }
}

export const getMyOrders = (customer_id, page) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_MY_ORDERS_PENDING })

    Services.getMyOrders(customer_id, page)
      .then((orders) => {
        dispatch({ type: ActionTypes.GET_MY_ORDERS_SUCCESS, orders })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_MY_ORDERS_FAIL, message: errMsg })
      })
  }
}

export const paymentStripe = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.PAYMENT_STRIPE_PENDING })
    Services.paymentStripe(data)
      .then((stripeInfo) => {
        dispatch({ type: ActionTypes.PAYMENT_STRIPE_SUCCESS })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.PAYMENT_STRIPE_FAIL, message: errMsg })
      })
  }
}

export const getCoupons = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_COUPONS_PENDING })
    Services.getCoupons()
      .then((response) => {
        dispatch({ type: ActionTypes.GET_COUPONS_SUCCESS, coupons: response })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_COUPONS_FAIL, message: errMsg })
      })
  }
}

export const setCoupons = (coupon) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SET_COUPONS, coupon })
  }
}

export const getVariations = (productId) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_VARIATIONS_PENDING })
    Services.getVariations(productId)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_VARIATIONS_SUCCESS, variations: response })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_VARIATIONS_FAIL, message: errMsg })
      })
  }
}

export const setPaymentMethod = (payment) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SET_PAYMENT_METHOD, payment })
  }
}
