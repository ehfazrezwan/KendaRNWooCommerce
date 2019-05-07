import { StyleSheet } from 'react-native'
import { Colors } from '@common'


export default StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btnNext: {
    backgroundColor: Colors.Green,
    borderRadius: 3,
    margin: 10
  },
  nextWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: 100
  }
})