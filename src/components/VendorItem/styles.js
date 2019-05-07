import { StyleSheet } from 'react-native'
import { Constants, Colors } from '@common'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection:'row',
    alignItems: 'center'
  },
  title: {
    fontSize: Constants.FontSize.medium,
    color: Colors.Gray,
    marginBottom: 10
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 5,
    flex: 1
  },
  txtName: {
    color: Colors.Blue
  },
  flex3: {
    flex: 3
  },
  flex6: {
    flex: 6
  },
  flex1: {
    flex: 1
  },
  star: {
    width: 20,
    height: 20
  },
  avatar: {
    flex: 2,
    paddingVertical: 5,
  },
  contentInfo: {
    flex: 8
  },
  info: {
    flexDirection: 'row'
  },
  iconAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  iconDetail: {
    width: 20,
    height: 20,
    tintColor: Colors.Gray,
    resizeMode: 'contain'
  }

})
