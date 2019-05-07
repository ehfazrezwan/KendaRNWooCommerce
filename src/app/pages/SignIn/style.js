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
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: Colors.AppColor
  },
  content: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3
  },
  separator: {
    paddingVertical: 10
  },
  btnSignIn: {
    backgroundColor: Colors.ButtonSuccess,
    height: 44,
    borderRadius: 22
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: Colors.TextInput
  },
  signUp: {
    color: '#252525'
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
  },
  viewOr: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  btnFace: {
    borderRadius: 5,
    backgroundColor: '#435fa5',
    height: 44
  },
  check: {
    paddingVertical: 20
  }
})
