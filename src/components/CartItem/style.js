import { StyleSheet } from 'react-native'
import { Constants, Colors } from '@common'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 8,
    marginTop: 8,
    borderWidth: 0.5,
    borderColor: Colors.Gray,
    borderRadius: 5
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    marginLeft: 10
  },
  name: {
    fontSize: 15,
    color: Colors.DarkGray,
    fontWeight: 'bold'
  },
  sale_price: {
    fontSize: 14,
    marginTop: 7,
    color: Colors.DarkGray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  quantity: {
    fontSize: 15,
    color: Colors.DarkGray,
    marginRight: 10
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  btnDelete: {
    marginTop: 5,
    alignSelf: 'flex-end'
  },
  optionsWrap: {
    marginTop: 5
  },
  optionWrap: {
    flexDirection: 'row',
    paddingVertical: 5,
    flex: 1
  },
  optionValue: {
    flex: 7
  },
  optionName: {
    flex: 3
  }
})
