import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import authReducers from './auth'
import categoriesReducers from './categories'
import productsReducers from './products'
import productsByCategoryReducers from './productsByCategory'
import cartsReducers from './carts'
import settingsReducers from './settings'
import tagsReducers from './tags'
import vendorReducers from './vendor'

const config = {
  key: 'root',
  storage,
  whitelist: ["categoriesReducers", "cartsReducers", "authReducers", "settingsReducers","productsReducers"]
}

const reducers = persistCombineReducers(config, {
  authReducers,
  categoriesReducers,
  productsReducers,
  productsByCategoryReducers,
  cartsReducers,
  settingsReducers,
  tagsReducers,
  vendorReducers
})

export default reducers
