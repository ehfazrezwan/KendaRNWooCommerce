import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import styles from './styles'

class MethodItem extends React.PureComponent {

  render() {
    const { shipping, payment } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.colHeader}>{__.t('Shipping method')}:</Text>
          <Text style={styles.colBody}>{shipping.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colHeader}>{__.t('Payment method')}:</Text>
          <Text style={styles.colBody}>{payment.title}</Text>
        </View>
      </View>
    )
  }
}

export default MethodItem