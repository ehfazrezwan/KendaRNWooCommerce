import { StyleSheet } from "react-native";
import { Colors } from "@common";

export default StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  text: {
    color: Colors.txtColor
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: "white"
  },
  textActive: {
    fontWeight: "500"
  }
});
