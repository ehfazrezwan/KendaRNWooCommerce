import { StyleSheet } from "react-native";
import { Colors, Constants } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: 150,
    height: 100,
    marginTop: 25,
    resizeMode: "contain",
    tintColor: "white"
  },
  topView: {
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.AppColor
  },
  btmView: {
    backgroundColor: "white",
    flex: 1,
    opacity: 0.8
  },
  separator: {
    height: 0,
    backgroundColor: "white"
  },
  textWelcome: {
    fontSize: 24,
    color: "#414552"
  },
  btnHeader: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#414552",
    marginTop: 10
  },
  btnTextHeader: {
    color: "#ffffff"
  },
  viewHeader: {
    justifyContent: "center",
    alignItems: "center"
  },
  txtEmail: {
    color: "white",
    marginTop: 5,
    fontWeight: "bold"
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
});
