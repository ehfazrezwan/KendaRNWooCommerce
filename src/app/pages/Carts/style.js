import { StyleSheet } from 'react-native'
import { Colors } from '@common'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  list: {
    paddingBottom: 10
  },
  content: {
    flex: 1,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10
  },
  totalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.Gray
  },
  actionWrapper: {
    backgroundColor: 'white'
  },
  btnCheckout: {
    borderRadius: 3,
    backgroundColor: Colors.Green,
    marginBottom: 10,
    marginHorizontal: 10
  },
  btnCoupon: {
    width: 120
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    fontWeight: 'bold',
    color: Colors.Gray
  },
  couponWrapper: {
    padding: 10,
    flexDirection: 'row'
  }
})
