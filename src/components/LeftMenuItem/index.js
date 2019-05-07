import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons,Constants,Utils} from '@common'
import {Text} from '@components'

class LeftMenuItem extends React.PureComponent {

  render(){
    let {item,onPress} = this.props
    return (
      <TouchableOpacity style={styles.container} onPress={()=>onPress(item)}>
        <Text style={styles.name}>{item.name.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}

export default LeftMenuItem
