import { Constants } from '@common'
import WService from './helper/WService'
var wservice = new WService()

export const getPaymentMethods = () => {
  return new Promise((resolve, reject) => {

    wservice.getPaymentMethods()
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

export const createOrder = (params) => {
  return new Promise((resolve, reject) => {
    wservice.createOrder(params)
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

export const getMyOrders = (customer_id, page) => {
  return new Promise((resolve, reject) => {
    wservice.getMyOrders(customer_id, page, Constants.Api.Limit)
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

export const paymentStripe = (data) => {
  return new Promise((resolve, reject) => {
    wservice.paymentStripe(data)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response)
        } else {
          reject(response.body.message)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}


export const getCoupons = () => {
  return new Promise((resolve, reject) => {
    wservice.getCoupons()
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getVariations = (productId) => {
  return new Promise((resolve, reject) => {
    wservice.getVariations(productId)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getShippingMethods = async (countryCode) => {
  const response = await wservice.getShippingZones();
  if (response.statusCode == 200) {
    if (response.body.length > 1) {
      var found = false;
      for (var i = 0; i < response.body.length; i++) {
        var zone = response.body[i];
        if (zone.id == 0) continue;
        var locationRes = await wservice.getLocationsByZone(zone.id);
        if (locationRes.statusCode == 200) {
          for (var j = 0; j < locationRes.body.length; j++) {
            var location = locationRes.body[j];
            if (location.code == countryCode) {
              found = true;
              const responseMethods = await wservice.getPaymentMethodsByZone(zone.id);
              return responseMethods.body;
            }
          }
        } else {
          return locationRes.body.message;
        }
      }
      if (!found) {
        const responseMethod = await wservice.getPaymentMethodsByZone(0);
        return responseMethod.body;
      }
    } else {
      // for case default zone
      const responseMethod = await wservice.getPaymentMethodsByZone(0);
      return responseMethod.body;
    }
  } else {
    return response.body.message;
  }
}