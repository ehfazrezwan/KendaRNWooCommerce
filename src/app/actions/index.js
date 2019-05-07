import * as AuthActions from './auth'
import * as CategoriesActions from './categories'
import * as ProductsActions from './products'
import * as CartsActions from './carts'
import * as SettingsActions from './settings'
import * as TagsActions from './tags'
import * as VendorActions from './vendor'

export const ActionCreators = Object.assign({},
  AuthActions,
  CategoriesActions,
  ProductsActions,
  CartsActions,
  SettingsActions,
  TagsActions,
  VendorActions
)
