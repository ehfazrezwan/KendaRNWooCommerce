import { StyleSheet } from 'react-native'
import { Constants, Colors } from '@common'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  txtAvailability: {
    fontSize: Constants.FontSize.medium,
    color: Colors.Gray
  },
  txtOutOf: {
    color: Colors.Red
  },
  txtInStock: {
    color: Colors.Green
  }
})