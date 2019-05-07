import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  animatedToastView: {
    marginHorizontal: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    zIndex: 9999,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  toastBoxInsideText: {
    fontSize: 15,
    alignSelf: 'stretch',
    textAlign: 'center'
  }
})