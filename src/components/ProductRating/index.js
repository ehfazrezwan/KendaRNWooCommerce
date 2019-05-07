import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './styles'
import { Icons, Colors } from '@common'
import { Text } from '@components'
import StarRating from 'react-native-star-rating'

class ProductRating extends React.PureComponent {
  render() {
    const { onPress, ratingValue, ratingCount } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.75}>
        <StarRating
          disabled={false}
          maxStars={5}
          starSize={20}
          rating={parseFloat(ratingValue)}
          emptyStar={Icons.StarRating}
          fullStar={Icons.StarRatingSelected}
          halfStar={Icons.HalfStarRating}
          halfStarColor={Colors.Star}
          emptyStarColor={Colors.Star}
          fullStarColor={Colors.Star}
          containerStyle={styles.startView}
        />
        <View style={styles.review}>
          <Text style={styles.textCount}>{ratingCount} {__.t('Reviews')}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default ProductRating
