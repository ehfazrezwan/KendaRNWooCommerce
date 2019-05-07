import { Config } from "@common";
var config = Config.WoocommerceConfig;
import NetworkHelper from "./NetworkHelper";

function WService() {
  this.url = config.endpoint + "/wp-json/wc/v2/";
}

WService.prototype.makeUrl = function (resource, params = null) {
  var url =
    this.url +
    resource +
    "?consumer_key=" +
    config.consumer_key +
    "&consumer_secret=" +
    config.consumer_secret;
  if (params) {
    url += "&" + params;
  }
  return url;
};

WService.prototype.getCategories = function () {
  return NetworkHelper.requestGet(
    this.makeUrl("products/categories", "hide_empty=true&parent=0")
  );
};

WService.prototype.getSubCategories = function (parentId) {
  return NetworkHelper.requestGet(
    this.makeUrl("products/categories", "hide_empty=true&parent=" + parentId)
  );
};

WService.prototype.getCategoryById = function (categoryId) {
  return NetworkHelper.requestGet(
    this.makeUrl("products/categories/" + categoryId)
  );
};

WService.prototype.getAllProducts = function (page, per_page) {
  return NetworkHelper.requestGet(
    this.makeUrl("products", "page=" + page + "&per_page=" + per_page)
  );
};

WService.prototype.getProductsByCategory = function (
  categoryId,
  page,
  per_page,
  filter
) {
  var url = this.makeUrl(
    "products",
    "page=" + page + "&per_page=" + per_page + "&category=" + categoryId
  );
  if (filter) {
    var subUrl = '';
    if (filter.sort) {
      var operatorSort = filter.sort === 0 ? 'desc' : 'asc';
      subUrl += '&order=' + operatorSort + '&orderby=date'
    }
    if (filter.maxPrice && filter.minPrice) {
      subUrl += '&min_price=' + filter.minPrice + '&max_price=' + filter.maxPrice;
    }
    if (filter.checkNow) {
      var checkNowValue = filter.checkNow ? 'true' : 'false';
      subUrl += '&on_sale=' + checkNowValue;
    }
    if(subUrl) {
      url += subUrl;
    }
  }
  return NetworkHelper.requestGet(
    url
  );
};

WService.prototype.getRelatedProducts = function (
  categoryId,
  productId,
  page,
  per_page
) {
  return NetworkHelper.requestGet(
    this.makeUrl(
      "products",
      "page=" +
      page +
      "&per_page=" +
      per_page +
      "&category=" +
      categoryId +
      "&exclude=[" +
      productId +
      "]"
    )
  );
};

WService.prototype.searchProducts = function (
  searchText,
  page,
  per_page,
  filter
) {
  let filterParams = "";
  if (filter) {
    if (filter.minValue) {
      filterParams += "&min_price=" + filter.minValue;
    }
    if (filter.maxValue) {
      filterParams += "&max_price=" + filter.maxValue;
    }
    if (filter.categoryId) {
      filterParams += "&category=" + filter.categoryId;
    }
    if (filter.tagId) {
      filterParams += "&tag=" + filter.tagId;
    }
  }
  const url = this.makeUrl(
    "products",
    "page=" +
    page +
    "&per_page=" +
    per_page +
    "&search=" +
    searchText +
    filterParams
  );
  return NetworkHelper.requestGet(url);
};

WService.prototype.getRecentProducts = function (per_page) {
  return NetworkHelper.requestGet(
    this.makeUrl("products", "page=1&per_page=" + per_page)
  );
};

WService.prototype.getRecentProducts = function (per_page) {
  return NetworkHelper.requestGet(
    this.makeUrl("products", "page=1&per_page=" + per_page)
  );
};

WService.prototype.getShippingMethods = function () {
  return NetworkHelper.requestGet(this.makeUrl("shipping_methods"));
};

WService.prototype.getPaymentMethods = function () {
  return NetworkHelper.requestGet(this.makeUrl("payment_gateways"));
};

WService.prototype.signUp = function ({
  email,
  first_name,
  last_name,
  password
}) {
  return NetworkHelper.requestPost(this.makeUrl("customers"), {
    email,
    first_name,
    last_name,
    password
  });
};

WService.prototype.signIn = function (email, password) {
  return NetworkHelper.requestPost(
    config.endpoint + "/wp-json/jwt-auth/v1/token",
    { username: email, password }
  );
};

WService.prototype.getUserId = function (token) {
  return NetworkHelper.requestGet(
    config.endpoint + "/wp-json/wp/v2/users/me",
    token
  );
};

WService.prototype.getUserInfo = function (userId) {
  return NetworkHelper.requestGet(this.makeUrl("customers/" + userId));
};

WService.prototype.createOrder = function (params) {
  return NetworkHelper.requestPost(this.makeUrl("orders"), params);
};

WService.prototype.getMyOrders = function (customer, page, per_page) {
  return NetworkHelper.requestGet(
    this.makeUrl(
      "orders",
      "page=" + page + "&per_page=" + per_page + "&customer=" + customer
    )
  );
};

WService.prototype.getTags = function () {
  return NetworkHelper.requestGet(this.makeUrl("products/tags"));
};

WService.prototype.getVendorInfo = function (storeId) {
  return NetworkHelper.requestGet(
    config.endpoint + "/wp-json/dokan/v1/stores/" + storeId
  );
};

WService.prototype.getProductVendor = function (storeId) {
  return NetworkHelper.requestGet(
    config.endpoint +
    "/wp-json/dokan/v1/stores/" +
    storeId +
    "/products?page=1&per_page=10"
  );
};

WService.prototype.signInFacebook = function (accessToken) {
  return NetworkHelper.requestGet(
    config.endpoint + "/api/user/fb_connect?access_token=" + accessToken
  );
};

WService.prototype.paymentStripe = function (data) {
  return NetworkHelper.requestPost(
    config.endpoint + "/wp-json/wc/v2/payment",
    data
  );
};

WService.prototype.getCoupons = function () {
  return NetworkHelper.requestGet(this.makeUrl("coupons"));
};

WService.prototype.getShippingZones = function () {
  var url = this.makeUrl("shipping/zones")
  return NetworkHelper.requestGet(url);
};

WService.prototype.getLocationsByZone = function (zoneId) {
  var url = this.makeUrl("shipping/zones/" + zoneId + "/locations");
  return NetworkHelper.requestGet(url);
};

WService.prototype.getPaymentMethodsByZone = function (zoneId) {
  var url = this.makeUrl("shipping/zones/" + zoneId + "/methods");
  return NetworkHelper.requestGet(url);
};

WService.prototype.getVariations = function (productId) {
  return NetworkHelper.requestGet(
    this.makeUrl("products/" + productId + "/variations")
  );
};
module.exports = WService;
