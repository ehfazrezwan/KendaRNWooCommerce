import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_TAGS_PENDING:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: true,
          message: ""
        }
      }
    case ActionTypes.GET_TAGS_FAIL:
      {
        return {
          ...state,
          type: action.type,
          message: action.message
        }
      }
    case ActionTypes.GET_TAGS_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          message: "",
          tags: action.tags
        }
      }
    default:
      return state
  }
}