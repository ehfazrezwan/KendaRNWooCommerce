import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import styles from './style'
import { Icons } from '@common'
import { BrandItem, HeaderSection } from '@components'

class Brands extends React.PureComponent {
  render() {
    let { brands, onPressItem } = this.props
    return (
      <View>
        <HeaderSection title={__.t('Top Deals')} seeAll={false} />
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => `${index}`}
          data={brands}
          renderItem={({ item }) => <BrandItem item={item} onPress={() => this.openProducts(item)} />}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    )
  }
  openProducts = (item) => {
    let category = {
      id: item.categoryId,
      name: '',
      children: ''
    }
    this.props.onPress(category)
  }
}

export default Brands
