import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";
import { HomeSearch, Products, Text } from "@components";
import { Icons } from "@common";

import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";

class HomeSearchPage extends React.PureComponent {
  state = {
    index: 1
  };

  render() {
    const { searchProductsHome, type, showDetail } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HomeSearch
            icon={Icons.Left}
            autoFocus={true}
            onChangeText={text => this.search(text)}
            onPress={() => this.props.onBack()}
            iconStyle={styles.iconBack}
          />
        </View>
        <View style={styles.content}>
          {searchProductsHome.length > 0 &&
            type != ActionTypes.SEARCH_PRODUCT_HOME_PENDING && (
              <Products
                hideSection={true}
                products={searchProductsHome}
                onPress={showDetail}
                onLoadMore={this.onLoadMore}
                seeAll={false}
                horizontal={false}
              />
            )}
          {type == ActionTypes.SEARCH_PRODUCT_HOME_PENDING && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {searchProductsHome.length == 0 &&
            type != ActionTypes.SEARCH_PRODUCT_HOME_PENDING && (
              <View style={styles.loading}>
                <Text style={styles.noResult}>{__.t("No result")}</Text>
              </View>
            )}
        </View>
      </View>
    );
  }

  onLoadMore = () => {
    if (this.props.isMoreSearchHome) {
      let index = this.state.index + 1;
      this.setState({ index }, () => {
        this.props.searchProductsForHome(this.state.searchText, index);
      });
    }
  };

  search = text => {
    if (text) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.searchProductsForHome(text, 1);
      }, 500);
    }
  };
}

HomeSearchPage.defaultProps = {
  searchProductsHome: []
};

function mapStateToProps({ productsReducers }) {
  return {
    searchProductsHome: productsReducers.searchProductsHome,
    isMoreSearchHome: productsReducers.isMoreSearchHome,
    type: productsReducers.type
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeSearchPage);
