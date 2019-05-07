import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import styles from './styles'


class AddressItem extends React.PureComponent {
  render() {
    const { item } = this.props
    let name = null;
    if (item.first_name || item.last_name) {
      name = item.first_name + ' ' + item.last_name
    } else {
      name = 'No name'
    }
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.colHeader}>{__.t('Name')}:</Text>
          <Text style={styles.colBody}>{name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colHeader}>{__.t('Phone')}:</Text>
          <Text style={styles.colBody}>{item.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.colHeader}>{__.t('Address')}:</Text>
          <Text style={styles.colBody}>{item.address_1}</Text>
        </View>
      </View>
    )
  }
}

export default AddressItem