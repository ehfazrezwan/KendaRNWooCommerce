import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'


export default StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomColor: Colors.LighterGray,
    borderBottomWidth: 0.5
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
  iconCheck: {
    width: 8,
    height: 8, 
    resizeMode: 'contain'
  },
  controlWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  nowCheck: {
    marginLeft: 5
  },
  iconFilter: {
    width: 20,
    height: 20, 
    marginLeft: 5,
    resizeMode: 'contain',
    tintColor: Colors.txtColor
  },
  textFilter: {
    fontSize: Constants.FontSize.small,
    color: Colors.txtColor,
    fontWeight: '500'
  },
  sperator: {
    borderLeftColor: Colors.LighterGray,
    borderLeftWidth: 3,
    height: 20
  }
})