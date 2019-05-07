import React from "react";
import { Image } from "react-native";
import { TabBarItem } from "@components";

import { createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Constants, Colors, Icons, Styles } from "@common";
import HomeScreen from "./screens/HomeScreen";
import DealsScreen from "./screens/DealsScreen";
import SearchScreen from "./screens/SearchScreen";
import CartsScreen from "./screens/CartsScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import MyWishListScreen from "./screens/MyWishListScreen";
import LanguagesScreen from "./screens/LanguagesScreen";
import MyAddressScreen from "./screens/MyAddressScreen";
import LaunchScreen from "./screens/LaunchScreen";
import DetailScreen from "./screens/DetailScreen";
import ProductsByCategoryScreen from "./screens/ProductsByCategoryScreen";
import SetLanguageScreen from "./screens/SetLanguageScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import ShippingInfoScreen from "./screens/ShippingInfoScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentInfoScreen from "./screens/PaymentInfoScreen";
import AddAddressScreen from "./screens/AddAddressScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import FilterScreen from "./screens/FilterScreen";
import AttributeDetailScreen from "./screens/AttributeDetailScreen";
import SpecificationScreen from "./screens/SpecificationScreen";
import VendorScreen from "./screens/VendorScreen";
import ShippingMapsScreen from "./screens/ShippingMapsScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import HomeSearchScreen from "./screens/HomeSearchScreen";

const stackNavigatorConfiguration = {
  mode: "card",
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: Colors.AppColor, borderBottomWidth: 0 },
    headerTintColor: "#414552",
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: Constants.FontFamily,
      fontWeight: "bold"
    },
    headerBackTitle: null,
    barStyle: { backgroundColor: Colors.AppColor }
  }
};

const homeTabScreens = {};
homeTabScreens[Constants.Screen.Home] = { screen: HomeScreen };
homeTabScreens[Constants.Screen.Detail] = { screen: DetailScreen };
homeTabScreens[Constants.Screen.ProductsByCategory] = {
  screen: ProductsByCategoryScreen
};
homeTabScreens[Constants.Screen.Specification] = {
  screen: SpecificationScreen
};
homeTabScreens[Constants.Screen.Vendor] = { screen: VendorScreen };
homeTabScreens[Constants.Screen.HomeSearch] = { screen: HomeSearchScreen };
const homeStack = createStackNavigator(
  homeTabScreens,
  stackNavigatorConfiguration
);
homeStack.navigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ tintColor }) => (
    <TabBarItem
      icon={Icons.Home}
      tintColor={tintColor}
      routeName={navigation.state.routeName}
    />
  ),
  title: __.t("Home"),
  heeader: null
});

const dealsTabScreens = {};
dealsTabScreens[Constants.Screen.Deals] = { screen: DealsScreen };
dealsTabScreens[Constants.Screen.Detail] = { screen: DetailScreen };
dealsTabScreens[Constants.Screen.ProductsByCategory] = {
  screen: ProductsByCategoryScreen
};
dealsTabScreens[Constants.Screen.Specification] = {
  screen: SpecificationScreen
};
dealsTabScreens[Constants.Screen.AttributeDetail] = {
  screen: AttributeDetailScreen
};
dealsTabScreens[Constants.Screen.Vendor] = { screen: VendorScreen };
const dealsStack = createStackNavigator(
  dealsTabScreens,
  stackNavigatorConfiguration
);

dealsStack.navigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ tintColor }) => (
    <TabBarItem
      icon={Icons.Deals}
      tintColor={tintColor}
      routeName={navigation.state.routeName}
    />
  ),
  title: __.t("Deals")
});

const searchTabScreens = {};
searchTabScreens[Constants.Screen.Search] = { screen: SearchScreen };
searchTabScreens[Constants.Screen.Detail] = { screen: DetailScreen };
searchTabScreens[Constants.Screen.Filter] = { screen: FilterScreen };
searchTabScreens[Constants.Screen.Specification] = {
  screen: SpecificationScreen
};
searchTabScreens[Constants.Screen.AttributeDetail] = {
  screen: AttributeDetailScreen
};
searchTabScreens[Constants.Screen.Vendor] = { screen: VendorScreen };
const searchStack = createStackNavigator(
  searchTabScreens,
  stackNavigatorConfiguration
);
searchStack.navigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ tintColor }) => (
    <TabBarItem
      icon={Icons.Search}
      tintColor={tintColor}
      routeName={navigation.state.routeName}
    />
  ),
  title: __.t("Search")
});

const cartsTabScreens = {};
cartsTabScreens[Constants.Screen.Carts] = { screen: CartsScreen };
cartsTabScreens[Constants.Screen.ShippingAddress] = {
  screen: ShippingAddressScreen
};
cartsTabScreens[Constants.Screen.ShippingInfo] = { screen: ShippingInfoScreen };
cartsTabScreens[Constants.Screen.PaymentInfo] = { screen: PaymentInfoScreen };
cartsTabScreens[Constants.Screen.Checkout] = { screen: CheckoutScreen };
const cartsStack = createStackNavigator(
  cartsTabScreens,
  stackNavigatorConfiguration
);

cartsStack.navigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ tintColor }) => (
    <TabBarItem
      icon={Icons.Cart}
      tintColor={tintColor}
      routeName={navigation.state.routeName}
    />
  ),
  title: __.t("Carts")
});

const profileTabScreens = {};
profileTabScreens[Constants.Screen.MyProfile] = { screen: MyProfileScreen };
profileTabScreens[Constants.Screen.MyWishList] = { screen: MyWishListScreen };
profileTabScreens[Constants.Screen.Languages] = { screen: LanguagesScreen };
profileTabScreens[Constants.Screen.MyAddress] = { screen: MyAddressScreen };
profileTabScreens[Constants.Screen.Feedback] = { screen: FeedbackScreen };
profileTabScreens[Constants.Screen.AddAddress] = { screen: AddAddressScreen };
profileTabScreens[Constants.Screen.MyOrders] = { screen: MyOrdersScreen };
profileTabScreens[Constants.Screen.ShippingMaps] = {
  screen: ShippingMapsScreen
};
const profileStack = createStackNavigator(
  profileTabScreens,
  stackNavigatorConfiguration
);
profileStack.navigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ tintColor }) => (
    <TabBarItem
      icon={Icons.User}
      tintColor={tintColor}
      routeName={navigation.state.routeName}
    />
  ),
  title: __.t("User")
});

const tabScreens = {};
tabScreens[Constants.Screen.Home] = { screen: homeStack };
tabScreens[Constants.Screen.Deals] = { screen: dealsStack };
tabScreens[Constants.Screen.Search] = { screen: searchStack };
tabScreens[Constants.Screen.Carts] = { screen: cartsStack };
tabScreens[Constants.Screen.MyProfile] = { screen: profileStack };

const mainTab = createMaterialBottomTabNavigator(tabScreens, {
  initialRouteName: Constants.Screen.Home,
  activeColor: Colors.AppColor,
  inactiveColor: Colors.Gray,
  barStyle: { backgroundColor: "#fff" }
});

const screens = {};
screens[Constants.Screen.Launch] = { screen: LaunchScreen };
screens[Constants.Screen.SignIn] = { screen: SignInScreen };
screens[Constants.Screen.SignUp] = { screen: SignUpScreen };
screens[Constants.Screen.SetLanguage] = { screen: SetLanguageScreen };
screens[Constants.Screen.Home] = { screen: mainTab };

const mainStack = createStackNavigator(screens, {
  initialRouteName: Constants.Screen.Launch,
  activeColor: Colors.AppColor,
  inactiveColor: Colors.Gray,
  labelStyle: Styles.TabbarLabel,
  headerMode: "none"
});

export default createAppContainer(mainStack);
