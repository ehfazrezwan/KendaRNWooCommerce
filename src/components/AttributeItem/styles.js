import { StyleSheet } from 'react-native'
import { Colors } from '@common'


export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderColor: Colors.Gray
  },
  borderTop: {
    borderTopWidth: 0.5,
    borderColor: Colors.Gray
  }
})