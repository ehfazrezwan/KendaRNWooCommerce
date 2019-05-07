import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import styles from './style'
import { Icons } from '@common'
import { Text, Checkbox } from '@components'


class FilterControl extends React.PureComponent {
  state = {
    checkNow: false
  }

  onCheck = () => {
    const { checkNow } = this.state
    this.props.onCheck(!checkNow);
    this.setState({ checkNow: !checkNow })
  }

  render() {
    const { checkNow } = this.state
    const { onFilter, onSort } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.controlWrapper}>
          <View style={styles.nowView}>
            <Image source={Icons.Round} style={styles.iconNow} />
            <Text style={styles.textNow}>now</Text>
          </View>
          <Checkbox isChecked={checkNow} onClick={() => this.onCheck()} iconStyle={styles.iconCheck} style={styles.nowCheck} />
        </View>
        <View style={styles.controlWrapper}>
          <View style={styles.sperator} />
          <TouchableOpacity style={styles.controlWrapper} onPress={onFilter}>
            <Text style={styles.textFilter}>{__.t('Filter').toUpperCase()}</Text>
            <Image source={Icons.Filter} style={styles.iconFilter} />
          </TouchableOpacity>
          <View style={styles.sperator} />
        </View>
        <View style={styles.controlWrapper}>
          <TouchableOpacity style={styles.controlWrapper} onPress={onSort}>
            <Text style={styles.textFilter}>{__.t('Sort').toUpperCase()}</Text>
            <Image source={Icons.Sort} style={styles.iconFilter} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default FilterControl