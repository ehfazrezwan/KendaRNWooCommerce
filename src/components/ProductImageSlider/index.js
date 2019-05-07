import React from 'react'
import { View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import styles from './styles'


class ProductImageSlider extends React.PureComponent {

  render() {
    const { images } = this.props
    return (
      <View style={styles.container}>
        <Swiper showsPagination={false} autoplay={true}>
          {images.map((item, index) => (
            <Image key={index} source={{ uri: item.src }} style={styles.image} />
          ))}
        </Swiper>
      </View>
    )
  }
}

export default ProductImageSlider
