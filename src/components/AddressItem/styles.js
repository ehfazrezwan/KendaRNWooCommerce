import { StyleSheet } from 'react-native'


export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
  },
  row: {
    flexDirection: 'row',
    marginTop: 3
  },
  colHeader: {
    flex: 1,
    fontWeight: '500'
  },
  colBody: {
    flex: 3
  }
})