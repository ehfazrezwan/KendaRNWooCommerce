import { StyleSheet } from 'react-native'
import { Colors } from '@common'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent:'center',
    paddingHorizontal: 30
  },
  content: {
    borderRadius: 5,
    backgroundColor: 'white',
    paddingTop: 15
  },
  item: {
    padding: 10
  },
  btn: {
    backgroundColor: Colors.AppColor,
    paddingVertical: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  textBtn: {
    color: 'white'
  }
})