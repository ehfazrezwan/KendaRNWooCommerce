import React from 'react'
import { View, FlatList } from 'react-native'
import { ProductItem } from '@components'
import styles from './styles'

class ProductVendor extends React.PureComponent {
  render() {
    const { products, onPress } = this.props
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => `${index}`}
          data={products}
          renderItem={({ item }) => <ProductItem item={item} onPress={onPress} />}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    )
  }
}

export default ProductVendor