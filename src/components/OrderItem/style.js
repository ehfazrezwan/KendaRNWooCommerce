import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'

export default StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    width: 14,
    height: 14,
    tintColor: '#000'
  },
  item: {
    backgroundColor: '#21D366'
  },
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  item: {

  },
  titleItem: {
    color: '#B6B7BB'
  },
  contenItem: {
    color: '#000'
  },
  container: {
    backgroundColor: '#fff'
  },
  track: {
    color: Colors.AppColor
  },
  sperator: {
    borderBottomColor: '#B6B7BB',
    borderBottomWidth: 1,
    marginVertical: 15
  },
  orderWrap: {
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  titleOrder: {
    color: '#000',
    fontSize: Constants.FontSize.big,
    paddingVertical: 5
  }
})