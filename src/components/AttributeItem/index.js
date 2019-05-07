import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import styles from './styles'


class AttributeItem extends React.PureComponent {
  render() {
    const { item, isBorderTop } = this.props
    return (
      <View style={[styles.container, styles.borderBottom, isBorderTop && styles.borderTop]}>
        <Text>{item.name}</Text>
        <Text>{item.value}</Text>
      </View>
    )
  }
}

export default AttributeItem