import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text} from '@components'

class SettingItem extends React.PureComponent {
  render(){
    let {icon,title,onPress} = this.props
    return (

      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <View >
                <Image source={icon} style={styles.LeftIconStyle}/>
            </View>
            <View >
                <Text style={styles.textItem}> {title} </Text>
            </View>
            <View style={styles.RightIcon}>
                <Image source={Icons.RightIcon} style={styles.RightIconStyle} />
            </View>
          </View>
      </TouchableOpacity>
    )
  }
}

export default SettingItem
