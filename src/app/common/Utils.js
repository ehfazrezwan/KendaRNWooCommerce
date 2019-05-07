import { Linking } from 'react-native'
import Config from './Config'
import moment from 'moment'

export const getCustomAttribute = (customAttributes, attribute) => {
  var value = null
  if (typeof customAttributes != 'undefined' && customAttributes.length > 0) {
    customAttributes.forEach((item) => {
      if (item.attribute_code == attribute) {
        value = item.value
        return
      }
    })
  }
  return value
}

export const getProductImageUrl = (item, attribute = "thumbnail") => {
  if (item.images != undefined && item.images.length > 0) {
    return item.images[0].src
  }
  return "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
}

export const getCategoryImageUrl = (item) => {
  if (item.image != null) {
    return item.image.src
  }
  return "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
}

export const openUrl = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      alert('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.log('An error occurred', err));
}

export const getCurrentPrice = (product) => {
  if (product.on_sale) {
    return product.sale_price
  }
  return product.price
}


export const isNotEmpty = (str) => {
  return (str && str.length > 0) ? true : false 
}