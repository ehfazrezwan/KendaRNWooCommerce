import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flexDirection:'row',
    borderColor:Colors.LighterGray,
    borderWidth:0,
    borderLeftWidth:0,
    height:40
  },
  RightIcon:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'flex-end',
  },
  LeftIconStyle:{
    tintColor:Colors.AppColor,
    width:25,
    height:25,
    resizeMode:'contain',
    marginVertical:8

  },
  textItem:{
    fontSize:12,
    marginHorizontal:15,
    marginVertical:12


  },
  RightIconStyle:{
    tintColor:Colors.AppColor,
    width:25,
    height:25,
    resizeMode:'contain',
    marginVertical:8


  }
})
