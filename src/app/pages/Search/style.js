import { StyleSheet } from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 5
  },
  btnFilter: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.AppColor,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems:'center',
    justifyContent: 'center'
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: 'white'
  },
})
