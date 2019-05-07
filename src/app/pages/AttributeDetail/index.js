import React from 'react'
import { View, ScrollView } from 'react-native'
import { AttributeItem } from '@components'
import styles from './styles'

class AttributeDetail extends React.PureComponent {

  preData = (attrs) => {
    const data = attrs.map((item, index) => {
      let obj = {}
      obj.name = item.name
      obj.value = item.options.toString()
      return obj
    })
    return data
  }

  render() {
    let attributes = this.props.navigation.state.params.attributes
    if (attributes && attributes.length > 0) {
      const data = this.preData(attributes)
      return (
        <ScrollView>
          <View style={styles.separator} />
          {
            data.map((item, index) => {
              return (
                <AttributeItem isBorderTop={index === 0} item={item} />
              )
            })
          }
        </ScrollView>
      )
    } else {
      return (
        <View />
      )
    }
  }
}

export default AttributeDetail