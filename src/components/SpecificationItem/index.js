import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { Text } from '@components'
import styles from './styles'

class SpecificationItem extends React.PureComponent {

  render() {
    const { onPress } = this.props
    return (
      <TouchableOpacity style={styles.container} activeOpacity={0.75} onPress={onPress}>
        <Text style={styles.text}>{__.t('Specification')}</Text>
      </TouchableOpacity>
    )
  }
}

export default SpecificationItem