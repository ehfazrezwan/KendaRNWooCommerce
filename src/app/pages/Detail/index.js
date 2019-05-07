import React from 'react'
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native'
import styles from './style'
import {
  Text, Products, Attributes,
  Divider, StockItem, VendorItem,
  SpecificationItem, ProductImageSlider,
  ProductRating, ModalAttributeOption
} from '@components'
import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Utils, Config, Global, Constants } from '@common'
import HTML from 'react-native-render-html'

class Detail extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      attributeOption: {}
    }
    this.firstLoadVariantions = false;
  }




  render() {
    let { products, navigation, showDetail, vendorInfo, showSpecification, showVendor } = this.props
    let product = navigation.state.params.product
    let vendor = {}
    if (vendorInfo && product) {
      vendor = vendorInfo
      if (product.store) {
        vendor.nameStore = product.store.name
      }
    }
    const { attributeOption } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ProductImageSlider images={product.images} />
          {/* <Image source={{ uri: Utils.getProductImageUrl(product, "image") }} style={styles.image} /> */}
          <View style={styles.separator} />
          <Text style={styles.name}>{product.name}</Text>
          <ProductRating ratingValue={product.average_rating} ratingCount={product.rating_count} />
          {
            Utils.isNotEmpty(product.price) &&
            <Text style={styles.price}>{Config.Currency.symbol}{product.price}</Text>
          }
          <View style={styles.productRow}>
            <StockItem product={product} />
            <SpecificationItem onPress={() => showSpecification(this._getObjSpecification())} />
          </View>
          <TouchableOpacity style={[styles.addCart, !product.in_stock && styles.disabledCart]} onPress={this.addToCart} disabled={!product.in_stock}>
            <Text style={styles.addCartText}>{__.t('Add to Cart')}</Text>
          </TouchableOpacity>
          {
            (product.attributes && product.attributes.length > 0) &&
            <View>
              <Divider />
              <View style={styles.attributes}>
                <Text style={styles.titleAttributes}>{__.t('Attributes')}</Text>
                <Attributes attributes={product.attributes} showOption={(item) => this.showAttributeOption(item)} />
              </View>
            </View>
          }
          {
            (Config.EnabledDoken && product) &&
            <View>
              <Divider />
              <View style={styles.attributes}>
                <VendorItem item={vendorInfo} name={product.store ? product.store.name : ''} onPress={() => showVendor(vendor)} />
              </View>
              <Divider />
            </View>
          }
          {products.length > 0 && <Products sectionTitle={__.t('Sponsored')} products={products} seeAll={false} onPress={showDetail} />}
          <HTML html={product.description} containerStyle={styles.description} imagesMaxWidth={Dimensions.get('window').width} />
        </ScrollView>
        <ModalAttributeOption ref="modalOption" item={attributeOption} onPressOk={(item) => this.onPressOption(item)} />
      </SafeAreaView>
    )
  }

  _getObjSpecification = () => {
    let product = this.props.navigation.state.params.product
    let metaData = product.meta_data
    for (let i = 0; i < metaData.length; i++) {
      let data = metaData[i]
      if (data.key === '_specifications') {
        return data.value
      }
    }
    return null
  }

  _getOptionSelected = (attributes) => {
    let options = [];
    for (let i = 0; i < attributes.length; i++) {
      let attr = attributes[i]
      if (typeof attr.selected != "undefined") {
        let obj = {
          name: attr.name,
          value: attr.options[attr.selected]
        }
        options.push(obj)
      }
    }
    return options;
  }

  addToCart = () => {
    let product = this.props.navigation.state.params.product
    let productAttributes = product.attributes;
    let obj = {}
    obj.product = product
    obj.price = product.price
    obj.variation = {}
    let options = this._getOptionSelected(productAttributes);
    obj.variation.options = options
    let variation = this.checkVariation(productAttributes, this.props.variations)
    if (variation) {
      obj.variation.variation_id = variation.id
      obj.price = variation.price ? variation.price : variation.regular_price
    }
    this.props.addToCart(obj);
    Global.EventEmitter.emit(Constants.EventEmitterName.showToast, __.t('An item has been added to the cart'))
  }

  componentDidMount() {
    let product = this.props.navigation.state.params.product
    let category_ids = Utils.getCustomAttribute(product.custom_attributes, "category_ids")
    if (category_ids && category_ids.length > 0) {
      this.props.getProductsByCategory(category_ids[0], "", 0)
    }
    if (Config.EnabledDoken) {
      this.props.getVendorInfo(product.store.id)
    }
    this.props.getVariations(product.id);
  }


  showAttributeOption = (item) => {
    this.setState({ attributeOption: item }, () => {
      this.refs.modalOption.show()
    })
  }

  onPressOption = (item) => {
    const { navigation } = this.props
    let product = navigation.state.params.product
    product.attributes.forEach((attr) => {
      if (attr.name === item.name) {
        attr.selected = item.selected
      }
    })
    this.forceUpdate()
  }

  _checkAttrExist = (vAttr, productAttributes) => {
    for (let i = 0; i < productAttributes.length; i++) {
      let pAttr = productAttributes[i];
      let value = pAttr.options[pAttr.selected ? pAttr.selected : 0];
      if (pAttr.name == vAttr.name && value == vAttr.option) {
        return true;
      }
    }
    return false;
  }

  _checkValiationExist = (variationAttributes, productAttributes) => {
    let result = false;
    for (let i = 0; i < variationAttributes.length; i++) {
      let vAttr = variationAttributes[i];
      if (this._checkAttrExist(vAttr, productAttributes)) {
        result = true;
      } else {
        return false;
      }
    }
    return result;
  }

  checkVariation = (productAttributes, variations) => {
    for (let i = 0; i < variations.length; i++) {
      let variationAttributes = variations[i].attributes;
      if (variationAttributes.length == productAttributes.length && this._checkValiationExist(variationAttributes, productAttributes)) {
        return variations[i];
      }
    }
    return null;
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.typeCart === ActionTypes.GET_VARIATIONS_SUCCESS && this.firstLoadVariantions === true) {
      let product = this.props.navigation.state.params.product;
      let productAttributes = product.attributes;
      let variation = this.checkVariation(productAttributes, nextProps.variations);
      if (variation) {
        product.variation_id = variation.id;
        product.price = variation.price ? variation.price : variation.regular_price
      }
      this.props.addToCart(product);
      Global.EventEmitter.emit(Constants.EventEmitterName.showToast, __.t('An item has been added to the cart'))
      this.firstLoadVariantions = false;
    }
  }

}

Detail.defaultProps = {
  products: [],
  vendorInfo: null,
  variations: [],
}

function mapStateToProps({ productsByCategoryReducers, vendorReducers, cartsReducers }) {
  return {
    products: typeof productsByCategoryReducers.productsByCategory != "undefined" ? productsByCategoryReducers.productsByCategory.products : [],
    vendorInfo: typeof vendorReducers.vendorInfo !== "undefined" ? vendorReducers.vendorInfo : null,
    typeVendor: vendorReducers.type,
    typeCart: cartsReducers.type,
    variations: cartsReducers.variations
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
