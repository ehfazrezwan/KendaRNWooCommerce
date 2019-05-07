import {StyleSheet} from 'react-native'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.LightGray
  },
  Group:{

    backgroundColor:'white',
    paddingHorizontal:10,
    marginTop:10
  },
  GroupItem:{
    flexDirection:'row'
  },
  bottomContainer:{
    backgroundColor:'white',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  bottomText:{
    fontSize:10,
    color:Colors.LighterGray

  },
  bottomImage:{
    tintColor:Colors.AppColor,
    alignItems:'center',
    justifyContent:'center',
    marginTop:15
  }
})
