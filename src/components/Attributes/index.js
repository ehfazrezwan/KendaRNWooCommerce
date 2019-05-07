import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text, InputOptions } from '@components'
import styles from './styles'

class Attributes extends React.PureComponent {
  state={}
  preData = (attrs) => {
    let data = attrs.map((item, index) => {
      let obj = {}
      obj.name = item.name
      obj.value = item.options.length > 0 ? item.options[0] : 'No value'
      obj.options = item.options
      return obj
    })
    return data
  }

  render() {
    const { attributes, showOption } = this.props
    return (
      <View style={styles.container}>
        {
          attributes.map((item, index) => {
            return (
              <View style={[styles.content]} key={index} >
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.input}>
                  <InputOptions onPress={() => this.showOption(item)} placeholder={__.t("Choose an option")} value={item.options[item.selected ? item.selected : 0]} />
                </View>
                <View style={styles.empty} />
              </View>
            )
          })
        }
      </View>
    )
  }
  showOption = (item) => {
    this.props.showOption(item)
  }

}



export default Attributes