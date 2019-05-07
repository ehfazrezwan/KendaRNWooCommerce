import { StyleSheet } from 'react-native'
import { Colors } from '@common'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.BorderInput
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    color: '#000',
    height: 44
  }
})