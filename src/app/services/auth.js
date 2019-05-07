import { Constants } from '@common'
import WService from './helper/WService'
var wservice = new WService()
import NetworkHelper from './helper/NetworkHelper'

export const signUp = (first_name, last_name, email, password) => {
  return new Promise((resolve, reject) => {
    wservice.signUp({ email, first_name, last_name, password })
      .then((response) => {
        if (response.statusCode == 201) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    wservice.signIn(email, password)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body.token)
        } else if (response.statusCode == 403) {
          reject(__.t('Email or password is incorrect'))
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getCustomerInfo = (userId=null) => {
  return new Promise((resolve, reject) => {

    if (userId == null) {
      if (typeof global.userToken == "undefined" || global.userToken == null || global.userToken.length == 0) {
        return reject("invalid token")
      }
      wservice.getUserId(global.userToken)
        .then((response) => {
          if (response.statusCode == 200) {
            let userId = response.body.id
            wservice.getUserInfo(userId)
              .then(({ statusCode, body }) => {
                if (statusCode == 200) {
                  resolve(body)
                } else {
                  reject(body.message)
                }
              })
              .catch(reject)
          } else {
            reject(response.body.message)
          }
        })
        .catch(reject)
    }else{
      wservice.getUserInfo(userId)
      .then(({ statusCode, body }) => {
          if (statusCode == 200) {
            resolve(body)
          } else {
            reject(body.message)
          }
      })
      .catch(reject)
    }
  })
}

export const signInFacebook = (accessToken) => {
  return new Promise((resolve, reject) => {
    if (accessToken) {
      wservice.signInFacebook(accessToken).then((res) => {
        if(res.statusCode == 200) {
          resolve(res.body)
        }
      })
      .catch(reject)
    } else {
      reject('invalid token')
    }
  })
}

export const getAddressByLocation = (latitude, longitude) => {
  return new Promise((resolve, reject)=>{
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBn9HKfYM1hNKxwAmWPeC_-Dazb82sOUJ0`;
    NetworkHelper.requestGet(url)
    .then((response)=>{
      if(response.statusCode == 200){
        let results = response.body.results;
        var json = {}
        if (results && results.length > 0) {
          json.street = results[0].formatted_address

          let address_components = results[0].address_components
          address_components.forEach((item)=>{
            if(item.types.indexOf("postal_code") > -1){
              json.postcode = item.short_name
            }
            if(item.types.indexOf("country") > -1){
              json.country_id = item.short_name
              json.countryName = item.long_name
            }
            if(item.types.indexOf("administrative_area_level_1") > -1){
              json.region_code = item.short_name
              json.region = item.long_name
            }
            if(item.types.indexOf("locality") > -1 || item.types.indexOf("sublocality") > -1){
              json.city = item.long_name
            }
          })

        }
        resolve(json)
      }
    })
    .catch(reject)
  })
};