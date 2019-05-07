import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'


export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 10
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  borderTop: {
    borderTopColor: Colors.Gray,
    borderTopWidth: 0.5
  },  
  itemIcon: {
    flexDirection: 'row'
  },
  iconDetail: {
    width: 22,
    height: 22,
    tintColor: Colors.Gray,
    resizeMode: 'contain'
  },
  value: {
    marginRight: 5,
    fontSize: Constants.FontSize.small
  },
  name: {
    fontWeight: '500',
    flex: 2,
    fontSize: Constants.FontSize.medium
  },
  input: {
    flex: 5
  },
  empty: {
    flex: 3
  }
})