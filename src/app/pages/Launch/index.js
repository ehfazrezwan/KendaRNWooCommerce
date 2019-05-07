import React from "react";
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  I18nManager,
  Platform,
  Image
} from "react-native";
import styles from "./style";
import { Text, SafeAreaView } from "@components";

import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";

import OneSignal from "react-native-onesignal";
import { Config } from "@common";

class Launch extends React.PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require("@assets/icons/splash.png")}
          style={styles.image}
        />
      </SafeAreaView>
    );
  }

  componentDidMount() {
    OneSignal.init(Config.OneSignalAppId);

    setTimeout(
      () => {
        let lang = this.props.lang;
        if (lang) {
          __.locale = lang;
          this.props.showHome();
        } else {
          this.props.setLanguage();
        }
      },
      Platform.OS == "ios" ? 0 : 1000
    );
  }
}

Launch.defaultProps = {
  lang: false
};

function mapStateToProps({ authReducers, settingsReducers }) {
  return {
    type: authReducers.type,
    message: authReducers.message,
    lang: settingsReducers.lang
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Launch);
