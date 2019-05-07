import { StyleSheet } from 'react-native'
import { Colors } from '@common'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.AppColor,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    flex: 1,
    width: null,
    height: null
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: 'white'
  },
  name: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10
  },
  btnSign: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 30,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 20
  },
  txtButton: {
    color: Colors.Header,
    fontWeight: '500'
  },
  textWelcome: {
    fontSize: 28,
    fontWeight:'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  }

})
