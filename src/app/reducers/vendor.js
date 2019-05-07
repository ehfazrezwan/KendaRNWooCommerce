import * as ActionTypes from '@actions/ActionTypes'


export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_VENDOR_INFO_PENDING:
      {
        return {
          ...state,
          type: action.type,
          message: ""
        }
      }
    case ActionTypes.GET_VENDOR_INFO_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          message: "",
          vendorInfo: action.vendorInfo
        }
      }
    case ActionTypes.GET_VENDOR_INFO_FAIL:
      {
        return {
          ...state,
          type: action.type,
          message: action.message,
        }
      }
    default:
      return state
  }
}