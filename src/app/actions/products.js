import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

export const getProductsForHome = (categories) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_PRODUCTS_FOR_HOME_PENDING })

    var list = []
    categories.forEach((item) => {
      if (item.count > 0) {
        list.push(item)
      }
    })
    Services.getProductsForHome(list)
      .then((products) => {
        dispatch({ type: ActionTypes.GET_PRODUCTS_FOR_HOME_SUCCESS, products })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_PRODUCTS_FOR_HOME_FAIL, message: errMsg })
      })
  }
}

export const getProductsByCategory = (categoryId, categoryName, page, filter) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_PRODUCTS_BY_CATEGORY_PENDING })

    Services.getProductsByCategory(categoryId, categoryName, page, null, filter)
      .then((products) => {
        if (page == 1) {
          dispatch({ type: ActionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS, products })
        } else {
          dispatch({ type: ActionTypes.GET_PRODUCTS_BY_CATEGORY_MORE, products })
        }
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_PRODUCTS_BY_CATEGORY_FAIL, message: errMsg })
      })
  }
}


export const searchProducts = (text, filter, page) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SEARCH_PRODUCTS_PENDING })

    Services.searchProducts(text, filter, page)
      .then(({ items, total_count }) => {
        if (page == 1) {
          dispatch({ type: ActionTypes.SEARCH_PRODUCTS_SUCCESS, products: items, total_count })
        } else {
          dispatch({ type: ActionTypes.SEARCH_PRODUCTS_MORE, products: items, total_count })
        }
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.SEARCH_PRODUCTS_FAIL, message: errMsg })
      })
  }
}

export const searchProductsForHome = (text, page) => {
  return dispatch => {
    if (page == 1) {
      dispatch({ type: ActionTypes.SEARCH_PRODUCT_HOME_PENDING })
    }
    Services.searchProducts(text, null, page)
      .then(({ items, total_count }) => {
        if (page == 1) {
          dispatch({ type: ActionTypes.SEARCH_PRODUCT_HOME_SUCCESS, products: items, total_count })
        } else {
          dispatch({ type: ActionTypes.SEARCH_PRODUCT_HOME_LOAD_MORE, products: items, total_count })
        }
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.SEARCH_PRODUCT_HOME_FAIL, message: errMsg })
      })
  }
}

export const clearSearchProductHome = () => {
  return { type: ActionTypes.CLEAR_SEARCH_PRODUCT_HOME }
}

export const addToWishList = (product) => {
  return { type: ActionTypes.ADD_PRODUCT_TO_WISHLIST, product }
}

export const removeToWishList = (product) => {
  return { type: ActionTypes.REMOVE_PRODUCT_TO_WISHLIST, product }
}

export const getProductForVendor = (storeId) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_PRODUCT_VENDOR_PENDING })
    Services.getProductForVendor(storeId)
      .then((productVendor) => {
        dispatch({ type: ActionTypes.GET_PRODUCT_VENDOR_SUCCESS, productVendor })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_PRODUCT_VENDOR_FAIL, message: errMsg })
      })
  }
}