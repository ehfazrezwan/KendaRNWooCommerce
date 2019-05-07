import { StyleSheet, NativeModules, Platform } from "react-native";
const { StatusBarManager } = NativeModules;
import { Colors } from "@common";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;
export default StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  content: {
    paddingBottom: 10
  },
  contentWrapper: {
    flex: 1
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.AppColor,
    borderBottomWidth: 0,
    paddingTop: STATUSBAR_HEIGHT
  }
});
