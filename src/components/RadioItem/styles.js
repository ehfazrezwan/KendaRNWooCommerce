import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24
  },
  rightText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16
  },
  iconChecked: {
    tintColor: Colors.ButtonSuccess
  },
  iconUnCheck: {
    tintColor: Colors.Gray
  }
})