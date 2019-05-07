import WService from './helper/WService'
var wservice = new WService()

export const getVendorInfo = (storeId) => {
  return new Promise((resolve, reject) => {
    wservice.getVendorInfo(storeId)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body);
        } else {
          reject(response.body.message);
        }
      })
      .catch(reject)
  })
}