import * as ActionTypes from './ActionTypes'
import * as Services from '@services'


export const getTags = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_TAGS_PENDING })
    Services.getTags()
      .then((tags) => {
        dispatch({ type: ActionTypes.GET_TAGS_SUCCESS, tags: tags.tags })
      })
      .catch((errMsg) => {
        dispatch({ type: ActionTypes.GET_TAGS_FAIL, message: errMsg })
      })
  }
}