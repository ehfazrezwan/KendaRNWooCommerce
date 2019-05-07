import React from 'react'
import {AddAddress} from '@pages'
import {NavButton,NavTitle,TabBarItem} from '@components'
import {Icons, Constants} from '@common'

class AddAddressScreen extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
    title: __.t('Add Address'),
  })

  render(){
    const {navigation} = this.props
    return <AddAddress navigation={navigation} goBack={()=>navigation.navigate(Constants.Screen.MyAddress)}/>
  }
}

export default AddAddressScreen
