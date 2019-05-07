import { StyleSheet } from "react-native";
import { Constants, Colors } from "@common";

export default StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Colors.Gray,
    backgroundColor: "white",
    width: 170,
    height: 305
  },
  image: {
    justifyContent: "flex-start",
    padding: 10,
    marginTop: 5,
    width: 169,
    height: 169
  },
  percent: {
    height: 20,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Red
  },
  percentText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8B54F7"
  },
  name: {
    fontSize: 15,
    marginTop: 10,
    marginHorizontal: 7,
    color: Colors.DarkGray,
    fontWeight: "bold"
  },
  sale_price: {
    fontSize: 13,
    marginTop: 7,
    marginHorizontal: 10,
    color: Colors.Gray,
    textDecorationLine: "line-through"
  },
  price: {
    fontSize: 15,
    marginTop: 7,
    marginHorizontal: 10,
    color: "black"
  },
  freeShipping: {
    fontSize: 15,
    marginTop: 7,
    marginHorizontal: 10,
    color: "black"
  },
  bottomView: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10
  },
  icon: {
    width: 22,
    height: 22,
    margin: 4,
    resizeMode: "contain",
    tintColor: Colors.Gray
  },
  regular_price: {
    fontSize: 13,
    color: Colors.DarkGray,
    textDecorationLine: "line-through"
  },
  nowView: {
    backgroundColor: Colors.AppColor,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  textNow: {
    fontWeight: "500",
    fontSize: Constants.FontSize.small
  },
  iconNow: {
    tintColor: "#000",
    width: 16,
    height: 16,
    resizeMode: "contain"
  },
  saleWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10
  },
  percentWrap: {
    backgroundColor: "#E8DFFE",
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});
