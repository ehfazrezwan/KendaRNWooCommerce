import React from "react";
import { MyProfile } from "@pages";
import { NavButton, NavTitle, TabBarItem } from "@components";
import { Icons, Constants, Global } from "@common";

class MyProfileScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavTitle />
  });

  componentDidMount = () => {
    this.onLogin = Global.EventEmitter.addListener(
      Constants.EventEmitterName.onLogin,
      this.onLogin
    );
  };

  componentWillUnmount = () => {
    this.onLogin.remove();
  };

  onLogin = () => {
    this.props.navigation.navigate(Constants.Screen.SignIn);
  };

  render() {
    const { navigation } = this.props;
    return (
      <MyProfile
        navigation={navigation}
        signIn={() => navigation.navigate(Constants.Screen.SignIn)}
        showWishList={() => navigation.navigate(Constants.Screen.MyWishList)}
        showLanguages={() => navigation.navigate(Constants.Screen.Languages)}
        showMyAddress={() => navigation.navigate(Constants.Screen.MyAddress)}
        showFeedback={() => navigation.navigate(Constants.Screen.Feedback)}
        showMyOrders={() => navigation.navigate(Constants.Screen.MyOrders)}
      />
    );
  }
}

export default MyProfileScreen;
