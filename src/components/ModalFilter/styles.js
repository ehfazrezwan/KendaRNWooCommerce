import { StyleSheet } from 'react-native'
import { Constants, Colors } from '@common'
import { Header } from 'react-navigation'


export default StyleSheet.create({
  backgroundColor: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent:'center',
    paddingHorizontal: 30
  },
  content: {
    width: Constants.ScreenSize.width - 40,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    margin: 5
  },
  title:{
    fontSize: Constants.FontSize.small,
    fontWeight:'bold'
  },
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
    flex: 1,
    height: 35,
    borderRadius: 5
  },
  p5: {
    padding: 5
  },
  btnCancel: {
    backgroundColor: Colors.Gray
  }
})