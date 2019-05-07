import { StyleSheet } from 'react-native'
import { Colors } from '@common'
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  logo: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: Colors.AppColor
  },
  content: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    flex: 8
  },
  separator: {
    paddingVertical: 12
  },
  btnSignUp: {
    backgroundColor: Colors.ButtonSuccess,
    height: 44,
    borderRadius: 22
  },
  btnClose: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20
  },
  closeIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#404040'
  }
})
