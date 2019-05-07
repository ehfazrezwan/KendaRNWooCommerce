import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'

export default StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.Gray,
    borderRadius: 18,
    height: 36,
    paddingHorizontal: 5,
    flex: 1
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: Constants.FontSize.medium
  },
  icon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: Colors.Gray,
    marginRight: 5
  },
})