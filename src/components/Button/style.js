import { StyleSheet } from 'react-native'
import { Colors } from '@common'

export default StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.AppColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    color: 'white'
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: 'white',
    marginRight: 5
  }
})
