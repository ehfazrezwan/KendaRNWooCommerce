import { StyleSheet } from 'react-native'
import { Colors, Constants } from '@common'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  image: {
    marginTop: 10,
    height: 200,
    width: '100%',
    resizeMode: 'contain'
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.Gray
  },
  name: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  price: {
    marginHorizontal: 10,
    fontSize: 15,
    color: Colors.DrakGray
  },
  addCart: {
    height: 40,
    backgroundColor: Colors.Green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    margin: 10
  },
  disabledCart: {
    backgroundColor: Colors.Gray
  },
  addCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  description: {
    margin: 10,
  },
  attributes: {
    margin: 10,
    marginTop: 5,
    marginBottom: 5
  },
  titleAttributes: {
    fontSize: Constants.FontSize.medium,
    color: Colors.Gray
  },
  readMoreLink: {
    color: Colors.Blue,
    textDecorationLine: 'underline'
  },
  contentVendor: {
    paddingHorizontal: 10
  },
  productRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})
