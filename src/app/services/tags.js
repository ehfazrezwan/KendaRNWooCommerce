import { Constants } from '@common'
import WService from './helper/WService'
var wservice = new WService()

export const getTags = () => {
  return new Promise((resolve, reject) => {
    wservice.getTags()
      .then((response) => {
        if (response.statusCode == 200) {
          resolve({ tags: response.body })
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}