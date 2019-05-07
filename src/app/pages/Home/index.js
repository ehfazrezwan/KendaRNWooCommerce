import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar
} from "react-native";
import styles from "./style";
import {
  SearchBar,
  Promotions,
  BrowserByCategory,
  Brands,
  Products,
  HomeSearch
} from "@components";

import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";

import { Config, Constants, Global, Icons, Colors } from "@common";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    let {
      categories,
      homeProducts,
      showDetail,
      openProductsByCategory,
      openDrawer
    } = this.props;

    if (this.state.loading && homeProducts.length == 0) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HomeSearch
            icon={Icons.Drawer}
            value={""}
            onFocus={() => this.onSearchHome()}
            onPress={() => openDrawer()}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.content}
          style={styles.contentWrapper}
        >
          <Promotions
            promotions={Config.Promotions}
            onPress={openProductsByCategory}
          />
          {/* <Brands brands={Config.Brands} onPress={item => this.onBrand(item)} /> */}
          {categories.length > 0 && (
            <BrowserByCategory
              categories={categories}
              onPress={openProductsByCategory}
            />
          )}
          {homeProducts.length > 0 &&
            homeProducts.map((item, index) => (
              <Products
                key={index}
                seeAll={item.products.length == Constants.Api.Limit}
                sectionTitle={item.categoryName}
                category={item.category}
                products={item.products}
                onPress={showDetail}
                onClickSeeAll={openProductsByCategory}
              />
            ))}
        </ScrollView>
      </View>
    );
  }

  onBrand = item => {
    this.props.getCategoryById(item.id);
  };

  componentDidMount() {
    if (this.props.categories.length > 0) {
      this.props.getProductsForHome(this.props.categories);
    } else {
      this.syncing = false;
    }
    this.props.getCategories();
    this.onLogout = Global.EventEmitter.addListener(
      Constants.EventEmitterName.onLogout,
      this.signOut
    );
  }

  signOut = () => {
    this.props.signOut();
  };

  onSearchHome = () => {
    this.props.clearSearchProductHome();
    this.props.onSearchHome();
  };

  componentWillUnmount = () => {
    this.onLogout.remove();
  };

  // componentWillUpdate() {
  //     LayoutAnimation.spring();
  // }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.homeProducts.length == 0 &&
      nextProps.categoriesType == ActionTypes.GET_CATEGORIES_SUCCESS &&
      this.syncing == false
    ) {
      this.syncing = true;
      this.props.getProductsForHome(nextProps.categories);
    }

    if (nextProps.productsType == ActionTypes.GET_PRODUCTS_FOR_HOME_SUCCESS) {
      this.setState({ loading: false });

      if (this.syncing != true) {
        this.syncing = true;
        this.props.getCategories();
      }
    }

    if (nextProps.categoriesType == ActionTypes.GET_CATEGORY_ID_SUCCESS) {
      this.props.openProductsByCategory(nextProps.categoryById);
    }
  }
}

Home.defaultProps = {
  categories: [],
  products: [],
  homeProducts: [],
  categoryById: {}
};

function mapStateToProps({ categoriesReducers, productsReducers }) {
  return {
    categories: categoriesReducers.categories,
    products: productsReducers.products,
    categoriesType: categoriesReducers.type,
    homeProducts: productsReducers.homeProducts,
    productsType: productsReducers.type,
    categoryById: categoriesReducers.categoryById
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
