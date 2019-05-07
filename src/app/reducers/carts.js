import * as ActionTypes from "@actions/ActionTypes";

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_SHIPPING_METHODS_PENDING:
    case ActionTypes.GET_PAYMENT_METHODS_PENDING:
    case ActionTypes.CREATE_ORDER_PENDING:
    case ActionTypes.GET_MY_ORDERS_PENDING:
    case ActionTypes.PAYMENT_STRIPE_PENDING:
    case ActionTypes.GET_COUPONS_PENDING:
    case ActionTypes.GET_VARIATIONS_PENDING: {
      return {
        ...state,
        type: action.type,
        isRequesting: true,
        message: ""
      };
    }
    case ActionTypes.GET_SHIPPING_METHODS_FAIL:
    case ActionTypes.GET_PAYMENT_METHODS_FAIL:
    case ActionTypes.CREATE_ORDER_FAIL:
    case ActionTypes.GET_MY_ORDERS_FAIL:
    case ActionTypes.PAYMENT_STRIPE_FAIL:
    case ActionTypes.GET_COUPONS_FAIL:
    case ActionTypes.GET_VARIATIONS_FAIL: {
      return {
        ...state,
        type: action.type,
        isRequesting: false,
        message: action.message
      };
    }
    case ActionTypes.ADD_PRODUCT_TO_CART: {
      var carts = typeof state.carts == "undefined" ? [] : state.carts;
      var obj = action.product;
      var cartIndex = -1;
      carts.forEach((item, index) => {
        if (item.product.id == obj.product.id) {
          cartIndex = index;
          return;
        }
      });
      if (cartIndex == -1) {
        obj.qty = 1;
        carts.push(obj);
      } else {
        var obj = carts[cartIndex];
        obj.qty += 1;
      }
      return {
        ...state,
        carts,
        reload: typeof state.reload == "undefined" ? false : !state.reload
      };
    }
    case ActionTypes.REMOVE_PRODUCT_TO_CART: {
      var carts = state.carts;
      var index = carts.indexOf(action.product);
      carts.splice(index, 1);
      return {
        ...state,
        carts,
        reload: !state.reload
      };
    }
    case ActionTypes.CHANGE_PRODUCT_QUANTITY: {
      var carts = state.carts ? state.carts.slice(0) : [];
      for (let i = 0; i < carts.length; i++) {
        let item = carts[i];
        if (item.product.id == action.product.product.id) {
          item.qty = action.qty;
          break;
        }
      }
      return {
        ...state,
        carts,
        reload: !state.reload
      };
    }
    case ActionTypes.GET_SHIPPING_METHODS_SUCCESS: {
      return {
        ...state,
        type: action.type,
        isRequesting: false,
        message: "",
        shippingMethods: action.shippingMethods
      };
    }
    case ActionTypes.SET_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: action.address
      };
    }
    case ActionTypes.SET_SHIPPING_INFO: {
      return {
        ...state,
        shippingMethod: action.shippingMethod
      };
    }
    case ActionTypes.GET_PAYMENT_METHODS_SUCCESS: {
      return {
        ...state,
        type: action.type,
        isRequesting: false,
        message: "",
        paymentMethods: action.paymentMethods
      };
    }
    case ActionTypes.CREATE_ORDER_SUCCESS: {
      return {
        type: action.type,
        isRequesting: false,
        message: "",
        orderInfo: action.orderInfo
      };
    }
    case ActionTypes.GET_MY_ORDERS_SUCCESS: {
      return {
        ...state,
        type: action.type,
        isRequesting: false,
        message: "",
        myOrders: action.orders
      };
    }
    case ActionTypes.PAYMENT_STRIPE_SUCCESS: {
      return {
        ...state,
        type: action.type,
        isRequesting: false,
        message: ""
      };
    }
    case ActionTypes.GET_COUPONS_SUCCESS: {
      return {
        ...state,
        type: action.type,
        isRequesting: false,
        coupons: action.coupons,
        message: ""
      };
    }
    case ActionTypes.SET_COUPONS: {
      return {
        ...state,
        type: action.type,
        isRequesting: false,
        coupon: action.coupon,
        message: ""
      };
    }
    case ActionTypes.GET_VARIATIONS_SUCCESS: {
      return {
        ...state,
        type: action.type,
        isRequesting: false,
        variations: action.variations,
        message: ""
      };
    }
    case ActionTypes.SET_PAYMENT_METHOD: {
      return {
        ...state,
        type: action.type,
        payment: action.payment
      };
    }
    default:
      return state;
  }
}
