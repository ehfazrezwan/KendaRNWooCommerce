import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 5
  },
  startView: {
    width: 120
  },
  review: {
    paddingLeft: 10
  },
  textCount: {
    color: Colors.AppColor,
    fontSize: Constants.FontSize.medium
  }
})