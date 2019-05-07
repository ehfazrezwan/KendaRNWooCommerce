import { StyleSheet } from 'react-native'
import { Colors } from '@common'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    marginRight: 10
  },
  name:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    marginTop: 5
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.Gray
  },
  selectedIcon: {
    tintColor: Colors.AppColor
  },
  rowBottom: {
    marginBottom: 10
  }
})
