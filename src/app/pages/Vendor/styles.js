import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'


export default StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  contentWrap: {
    paddingHorizontal: 10
  },
  info: {
    justifyContent: 'center'
  },
  avatarWrap: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  avatar: {
    width: 100,
    height: 100
  },
  contentInfo: {

  },
  nameStore: {
    fontSize: Constants.FontSize.big,
    color: Colors.Gray,
    fontWeight: '500',
    paddingTop: 5
  },
  itemInfo: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray,
    justifyContent: 'space-between'
  },
  viewProduct: {
    paddingVertical: 5
  },
  title: {
    color: Colors.Gray,
    fontSize: Constants.FontSize.medium,
    paddingVertical: 10,
    fontWeight: '500',
    paddingHorizontal: 10
  }

})