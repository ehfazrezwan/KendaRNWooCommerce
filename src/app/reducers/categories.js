import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_CATEGORIES_PENDING:
    case ActionTypes.GET_CHILD_CATEGORIES_INFO_PENDING:
    case ActionTypes.GET_SUB_CATEGORIES_PENDING:
    case ActionTypes.GET_CATEGORY_ID_PENDING:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: true,
          message: ""
        }
      }
    case ActionTypes.GET_SUB_CATEGORIES_FAIL:
    case ActionTypes.GET_CATEGORIES_FAIL:
    case ActionTypes.GET_CATEGORY_ID_FAIL:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: action.message
        }
      }
    case ActionTypes.GET_CATEGORIES_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: "",
          categories: action.categories
        }
      }
    case ActionTypes.GET_CHILD_CATEGORIES_INFO_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: "",
          selectedCategory: action.category
        }
      }
    case ActionTypes.GET_SUB_CATEGORIES_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          message: "",
          subCategories: action.subCategories
        }
      }
    case ActionTypes.SET_ACTIVE_CATEGORY:
      {
        return {
          ...state,
          type: action.type,
          subCategories: state.subCategories.map((item) => {
            if (item.id === action.id) {
              item.active = true
            } else {
              item.active = false
            }
            return item
          })
        }
      }
    case ActionTypes.GET_CATEGORY_ID_SUCCESS:
      {
        return {
          ...state,
          type: action.type,
          isRequesting: false,
          categoryById: action.categoryById
        }
      }
    default:
      return state
  }
}
