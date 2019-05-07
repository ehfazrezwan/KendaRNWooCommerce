import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Share
} from "react-native";
import styles from "./style";
import { Icons, Utils, Constants, Config, Global } from "@common";

import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";

import { Text } from "@components";

const ItemWidth = (Constants.ScreenSize.width - 10) / 2 - 10;
const ItemHeight = ItemWidth + 140;

class ProductItem extends React.PureComponent {
  static defaultProps = {
    wishlist: [],
    isVertical: false
  };

  render() {
    let { item, onPress, wishlist, isVertical } = this.props;
    let percent = 1 - item.price / item.regular_price;

    var verticalStyle = {};
    if (isVertical) {
      verticalStyle = {
        width: ItemWidth,
        height: ItemHeight,
        marginLeft: 10,
        marginTop: 10
      };
    }

    let currentPrice = Utils.getCurrentPrice(item);
    return (
      <TouchableOpacity
        style={[styles.container, verticalStyle]}
        onPress={() => onPress(item)}
      >
        <ImageBackground
          source={{ uri: Utils.getProductImageUrl(item) }}
          style={[
            styles.image,
            isVertical && { width: ItemWidth - 1, height: ItemWidth - 1 }
          ]}
          resizeMode="contain"
        >
          {item.on_sale && (
            <View style={styles.nowView}>
              <Image source={Icons.Round} style={styles.iconNow} />
              <Text style={styles.textNow}>now</Text>
            </View>
          )}
        </ImageBackground>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        {item.on_sale && (
          <View style={styles.saleWrap}>
            <Text style={styles.regular_price}>${item.price}</Text>
            <View style={styles.percentWrap}>
              <Text style={styles.percentText}>
                {Math.ceil(percent * 100)}% OFF
              </Text>
            </View>
          </View>
        )}
        {Utils.isNotEmpty(item.price) && (
          <Text style={styles.price}>
            {Config.Currency.symbol}
            {currentPrice}{" "}
            {currentPrice != item.price && (
              <Text style={styles.regular_price}>${item.price}</Text>
            )}
          </Text>
        )}
        <View style={{ flex: 1 }} />
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={this.shareApp}>
            <Image source={Icons.Share} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addToCart}>
            <Image source={Icons.Cart} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addToWishList}>
            <Image
              source={
                wishlist.indexOf(item) > -1
                  ? Icons.FavoriteSelected
                  : Icons.Favorite
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  addToWishList = () => {
    if (this.props.wishlist.indexOf(this.props.item) > -1) {
      this.props.removeToWishList(this.props.item);
    } else {
      this.props.addToWishList(this.props.item);
    }
  };

  addToCart = () => {
    if (!this.props.item.in_stock) {
      Global.EventEmitter.emit(
        Constants.EventEmitterName.showToast,
        __.t("An item out stock not added")
      );
      return;
    }
    let obj = {};
    obj.product = this.props.item;
    obj.price = this.props.item.price;
    this.props.addToCart(obj);
    Global.EventEmitter.emit(
      Constants.EventEmitterName.showToast,
      __.t("An item has been added to the cart")
    );
  };

  shareApp = () => {
    Share.share({
      title: "Hubay",
      message: "Great App!!!",
      url: "https://www.hubay.net/"
    });
  };
}

function mapStateToProps({ productsReducers }) {
  return {
    wishlist: productsReducers.wishlist,
    reload: productsReducers.reload
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem);
