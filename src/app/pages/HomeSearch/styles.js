import { StyleSheet, NativeModules, Platform } from "react-native";
const { StatusBarManager } = NativeModules;
import { Colors, Constants } from "@common";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;
export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.AppColor,
    borderBottomWidth: 0,
    paddingTop: STATUSBAR_HEIGHT
  },
  iconBack: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    tintColor: "#000"
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  content: {
    flex: 1
  },
  noResult: {
    color: Colors.Gray,
    fontSize: Constants.FontSize.big
  }
});
