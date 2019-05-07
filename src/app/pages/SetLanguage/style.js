import { StyleSheet } from "react-native";
import { Colors } from "@common";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: "contain",
    position: "absolute",
    top: 50,
    alignSelf: "center",
    tintColor: "black"
  },
  content: {
    backgroundColor: Colors.LighterGray,
    marginHorizontal: 10
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.LightGray
  },
  btnSubmit: {
    marginTop: 80,
    margin: 10,
    marginLeft: 10,
    bottom: 30,
    borderRadius: 5
  }
});
