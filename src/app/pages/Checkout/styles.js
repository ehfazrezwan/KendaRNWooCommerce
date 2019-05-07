import { StyleSheet } from 'react-native'
import { Constants, Colors } from '@common'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    marginHorizontal: 10,
    marginTop: 5
  },
  header: {
    fontSize: Constants.FontSize.medium,
    fontWeight: '500',
    marginBottom: 5
  },
  listProduct: {
    backgroundColor: 'white',
    borderRadius: 5
  },
  separator: {
    borderBottomColor: Colors.Gray,
    borderBottomWidth: 0.5
  },
  action: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10
  },
  mrBottom: {
    marginBottom: 10
  },  
  btnCancel: {
    backgroundColor: Colors.Gray,
    flex: 2,
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 5
  },
  btnSubmit: {
    backgroundColor: Colors.Green,
    flex: 2,
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 10
  }
})