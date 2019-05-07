import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import styles from './style'
import { Text, Products, ModalFilter, SubCategories, FilterControl } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Constants } from '@common'
import { subcategories } from '@dummyData'

class ProductsByCategory extends React.PureComponent {
  state = {
    index: 1,
    checkNow: false,
    minPrice: Constants.MIN_PRICE,
    maxPrice: Constants.MAX_PRICE,
    sort: 0,
  }
  isSelectedFilter = false

  renderList = () => {

  }

  render() {
    let { isFetching, productsByCategory, selectedCategory, openProductsByCategory, showDetail, subCategories } = this.props
    let products = productsByCategory.products
    return (
      <SafeAreaView style={styles.container}>
        <SubCategories items={subCategories} onPress={this.onSelectSubcategory} />
        <FilterControl
          onSort={() => this.onSort()}
          onCheck={(checked) => this.onCheckNow(checked)}
          onFilter={() => this.onFilter()} />
        {
          (isFetching && this.state.index == 1) &&
          <View style={styles.wrapper}>
            <ActivityIndicator size="large" />
          </View>
        }
        {
          (products.length == 0 && !isFetching) &&
          <View style={styles.wrapper}>
            <Text style={styles.message}>{__.t('Empty List')}</Text>
          </View>
        }
        {
          (!isFetching && products.length > 0) &&
          <ScrollView contentContainerStyle={styles.content}>
            <Products products={products} horizontal={false} hideSection={true} onPress={showDetail} onLoadMore={this.onLoadMore} />
          </ScrollView>
        }
        <ModalFilter ref="filter" onOK={(data) => this.onFilterPrice(data)} />
      </SafeAreaView>
    )
  }

  componentDidMount() {
    let category = this.props.navigation.state.params.category
    this.fetchData(category)
    this.fetchSubCategories(category)
  }

  fetchData = (category) => {
    //get child categories
    this.props.getProductsByCategory(category.id, category.name, 1)
  }

  fetchDataFilter = (filter) => {
    let category = this.props.navigation.state.params.category
    this.isSelectedFilter = true
    this.props.getProductsByCategory(category.id, category.name, 1, filter)
  }

  fetchSubCategories = (category) => {
    this.props.getSubCategories(category.id)
  }

  onLoadMore = () => {
    if (this.props.isMore) {
      let index = this.state.index + 1
      let category = this.props.navigation.state.params.category

      this.setState({ index }, () => {
        if (this.isSelectedFilter) {
          const { minPrice, maxPrice, checkNow, sort } = this.state
          let filter = {
            minPrice,
            maxPrice,
            checkNow,
            sort
          }
          this.props.getProductsByCategory(category.id, category.name, index, filter)
        } else {
          this.props.getProductsByCategory(category.id, category.name, index)
        }
      })
    }
  }

  onSelectSubcategory = (category) => {
    if (category.active) {
      return;
    } else {
      this.props.setActiveCategory(category.id)
      if (category.id === 0) {
        let c = this.props.navigation.state.params.category
        this.fetchData(c)
      } else {
        this.fetchData(category)
      }
    }
  }

  onCheckNow = (checked) => {
    let checkNow = checked ? 1 : 0;
    const { minPrice, maxPrice, sort } = this.state
    this.setState({ checkNow: checkNow })
    let filter = {
      minPrice,
      maxPrice,
      checkNow,
      sort
    }
    this.fetchDataFilter(filter)
  }

  onFilter = () => {
    this.refs.filter.show()
  }

  onFilterPrice = (data) => {
    const minPrice = data.min
    const maxPrice = data.max
    this.setState({ minPrice, maxPrice })
    const { checkNow, sort } = this.state
    let filter = {
      minPrice,
      maxPrice,
      checkNow,
      sort
    }
    this.fetchDataFilter(filter)
  }

  onSort = () => {
    const { minPrice, maxPrice, sort, checkNow } = this.state
    this.setState({ sort: !sort })
    let filter = {
      minPrice,
      maxPrice,
      checkNow,
      sort: !sort
    }
    this.fetchDataFilter(filter)
  }


  componentWillReceiveProps(nextProps) {
    let currentCategory = this.props.navigation.state.params.category
    let nextCategory = nextProps.navigation.state.params.category
    if (currentCategory.id != nextCategory.id) {
      this.fetchData(nextCategory)
      this.fetchSubCategories(nextCategory)
    }
  }
}

ProductsByCategory.defaultProps = {
  productsByCategory: {
    products: []
  },
  subCategories: [],
  isFetching: true,
  selectedCategory: null
}

function mapStateToProps({ productsByCategoryReducers, categoriesReducers }) {
  return {
    productsByCategory: productsByCategoryReducers.productsByCategory,
    isMore: productsByCategoryReducers.isMore,
    isFetching: productsByCategoryReducers.isFetching,
    selectedCategory: categoriesReducers.selectedCategory,
    subCategories: categoriesReducers.subCategories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsByCategory)
