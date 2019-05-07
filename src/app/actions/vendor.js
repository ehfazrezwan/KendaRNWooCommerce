import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

export const getVendorInfo = (storeId) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_VENDOR_INFO_PENDING })
    Services.getVendorInfo(storeId)
      .then((vendorInfo) => {
        dispatch({ type: ActionTypes.GET_VENDOR_INFO_SUCCESS, vendorInfo })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_VENDOR_INFO_FAIL, message: errMsg })
      })
  }
}