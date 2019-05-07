import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

export const getCategories = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_CATEGORIES_PENDING })

    Services.getCategories()
      .then((categories) => {
        dispatch({ type: ActionTypes.GET_CATEGORIES_SUCCESS, categories })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_CATEGORIES_FAIL, message: errMsg })
      })
  }
}

export const setActiveCategory = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_CATEGORY, id })
  }
}

export const getSubCategories = (parentId) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_SUB_CATEGORIES_PENDING })
    Services.getSubCategories(parentId)
      .then((subCategories) => {
        dispatch({ type: ActionTypes.GET_SUB_CATEGORIES_SUCCESS, subCategories })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_SUB_CATEGORIES_FAIL, message: errMsg })
      })
  }
}

export const getCategoryById = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_CATEGORY_ID_PENDING })
    Services.getCategoryById(id)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_CATEGORY_ID_SUCCESS, categoryById: response })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_CATEGORY_ID_FAIL, message: errMsg })
      })
  }
}
