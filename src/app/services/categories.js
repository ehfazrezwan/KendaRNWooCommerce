import { Constants } from '@common'
import WService from './helper/WService'
var wservice = new WService()

export const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    wservice.getCategoryById(id)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    wservice.getCategories()
      .then(({ statusCode, body }) => {
        if (statusCode == 200) {
          var items = []
          body.forEach((item) => {
            if (item.name != "Uncategorized") {
              items.push(item)
            }
          })
          resolve(items)
        }
      })
      .catch(reject)
  })
}


export const getSubCategories = (parentId) => {
  return new Promise((resolve, reject) => {
    wservice.getSubCategories(parentId)
      .then(({ statusCode, body }) => {
        if (statusCode == 200) {
          var items = []
          body.forEach((item) => {
            if (item.name != "Uncategorized") {
              item.active = false
              items.push(item)
            }
          })
          if (items.length > 0) {
            items.unshift({ id: 0, name: 'All', active: true })
          }
          resolve(items)
        } else {
          reject(body.message)
        }
      })
      .catch(reject)
  })

}
