import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import { Products, Filter, CategoriesModal } from '@components'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Global, Constants, Icons } from '@common'

class Search extends React.PureComponent {
  state = {
    searchText: '',
    filter: {},
    showCategories: false,
    index: 1,
    isFilter: false
  }

  render() {
    let { searchedProducts, showDetail, categories, total_count } = this.props
    const { isFilter } = this.state
    if (this.state.searchText.length == 0) {
      return <View />
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {searchedProducts.length > 0 && <Products hideSection={true} products={searchedProducts} seeAll={false} horizontal={false} onPress={showDetail} onLoadMore={this.onLoadMore} />}
        </View>
        {
          (searchedProducts.length > 0 || isFilter) &&
          <TouchableOpacity style={styles.btnFilter} activeOpacity={0.75} onPress={this.pressFilter}>
            <Image source={Icons.Filter} style={styles.icon} />
          </TouchableOpacity>
        }
      </SafeAreaView>
    )
  }

  onShowCategories = () => {
    this.setState({ showCategories: true })
  }

  selectCategory = (item) => {
    var filter = this.state.filter
    filter.category_id = item.id
    this.setState({ showCategories: false, filter }, () => {
      this.props.searchProducts(this.state.searchText, filter, 1)
    })
  }

  onLoadMore = () => {
    if (this.props.isMore) {
      let index = this.state.index + 1
      var filter = this.state.filter
      this.setState({ index }, () => {
        this.props.searchProducts(this.state.searchText, filter, index)
      })
    }
  }

  componentDidMount = () => {
    this.onSearchListener = Global.EventEmitter.addListener(Constants.EventEmitterName.onSearch, this.onSearch)
    this.onFilterListner = Global.EventEmitter.addListener(Constants.EventEmitterName.onFilter, this.onFilter)
    this.onLogout = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogout, this.signOut)
  }

  componentWillUnmount() {
    this.onSearchListener.remove()
    this.onFilterListner.remove()
    this.onLogout.remove()
  }

  signOut = () => {
    this.props.signOut()
  }

  pressFilter = () => {
    this.props.onFilter()
  }

  onFilter = (filter) => {
    this.setState({ filter, isFilter: true })
    typeof this.timer != "undefined" && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.props.searchProducts(this.state.searchText, filter, 1)
    }, 500)
  }

  onSearch = (searchText) => {
    if (searchText) {
      this.setState({ searchText })
    } else {
      searchText = this.state.searchText
      this.setState({ filter: {}, isFilter: false })
      this.props.applyFilter({ minValue: Constants.MIN_PRICE, maxValue: Constants.MAX_PRICE })
    }
    typeof this.timer != "undefined" && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.props.searchProducts(searchText, this.state.filter, 1)
    }, 500)
  }
}

Search.defaultProps = {
  searchedProducts: [],
  categories: []
}

function mapStateToProps({ productsReducers, categoriesReducers }) {
  return {
    searchedProducts: productsReducers.searchedProducts,
    isMore: productsReducers.isMore,
    total_count: productsReducers.total_count,
    categories: categoriesReducers.categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
