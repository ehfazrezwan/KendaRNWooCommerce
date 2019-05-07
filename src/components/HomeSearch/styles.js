import { StyleSheet } from "react-native";
import { Header } from "react-navigation";
import { Colors } from "@common";

export default StyleSheet.create({
  container: {
    height: Header.HEIGHT,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10
  },
  iconNav: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: "#414552",
    marginTop: 15
  },
  iconSearch: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: Colors.Gray,
    marginHorizontal: 5
  },
  search: {
    height: 35,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 15,
    flex: 1
  },
  input: {
    flex: 1,
    color: "black"
  }
});
