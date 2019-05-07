import React from 'react'
import {
  View,
  SafeAreaView
}from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

class WrapView extends React.PureComponent {

  render(){
    if (isIphoneX()) {
      return <SafeAreaView style={this.props.style}>{this.props.children}</SafeAreaView>
    }else{
      return <View style={this.props.style}>{this.props.children}</View>
    }
  }

}

export default WrapView
