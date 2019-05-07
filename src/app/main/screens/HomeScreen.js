import React from "react";
import { StatusBar } from "react-native";
import { Home } from "@pages";
import { NavButton, NavTitle, HeaderSearch } from "@components";
import { Colors, Constants, Global } from "@common";

class HomeScreen extends React.PureComponent {
  
  static navigationOptions = ({ navigation }) => ({
    // headerTitle: <HeaderSearch style={{ width: Constants.ScreenSize.width - 60 }} />,
    // headerLeft: <NavButton icon={Icons.Drawer} style={{ marginLeft: 10 }} onPress={() => Global.EventEmitter.emit(Constants.EventEmitterName.OpenDrawer)} />,
    header: null
  });

  render() {
    const { navigation } = this.props;
    return (
      <Home
        onSearchHome={() => navigation.navigate(Constants.Screen.HomeSearch)}
        openDrawer={() =>
          Global.EventEmitter.emit(Constants.EventEmitterName.OpenDrawer)
        }
        navigation={navigation}
        showDetail={product =>
          navigation.navigate(Constants.Screen.Detail, { product })
        }
        openProductsByCategory={category =>
          navigation.navigate(Constants.Screen.ProductsByCategory, { category })
        }
      />
    );
  }

  componentDidMount() {
    this.openPageListener = Global.EventEmitter.addListener(
      Constants.EventEmitterName.OpenPage,
      this.openProductsByCategory
    );
    this.onLogin = Global.EventEmitter.addListener(
      Constants.EventEmitterName.onLogin,
      this.onLogin
    );
  }

  componentWillUnmount() {
    this.openPageListener.remove();
    this.onLogin.remove();
  }

  onLogin = () => {
    this.props.navigation.navigate(Constants.Screen.SignIn);
  };

  openProductsByCategory = category => {
    this.props.navigation.navigate(Constants.Screen.ProductsByCategory, {
      category
    });
  };
}

export default HomeScreen;
