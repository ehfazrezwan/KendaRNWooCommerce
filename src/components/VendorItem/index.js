import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import StarRating from 'react-native-star-rating'
import { Text } from '@components'
import { Colors, Icons, Utils } from '@common'
import styles from './styles'


class VendorItem extends React.PureComponent {
  render() {
    const { item, name, onPress } = this.props
    if (item) {
      return (
        <View style={styles.container}>
          <View style={{flex:1}}>
            <Text style={styles.title}>{__.t('Vendor Information')}</Text>
            <TouchableOpacity style={styles.info} activeOpacity={0.75} onPress={onPress}>
              <View style={styles.avatar}>
                <Image source={{ uri: item.gravatar }} style={styles.iconAvatar} />
              </View>
              <View style={styles.contentInfo}>
                <View style={styles.content}>
                  <Text style={styles.flex3}>{__.t('Name')}</Text>
                  <Text style={styles.flex1}>{':'}</Text>
                  <Text style={[styles.flex6, styles.txtName]}>{name}</Text>
                </View>
                {
                  Utils.isNotEmpty(item.store_name) &&
                  (
                    <View style={styles.content}>
                      <Text style={styles.flex3}>{__.t('Store name')}</Text>
                      <Text style={styles.flex1}>{':'}</Text>
                      <Text style={styles.flex6}>{item.store_name}</Text>
                    </View>
                  )
                }
                {
                  (item.show_email && Utils.isNotEmpty(item.show_email)) &&
                  <View style={styles.content} >
                    <Text style={styles.flex3}>{__.t('Email')}</Text>
                    <Text style={styles.flex1}>{':'}</Text>
                    <Text style={styles.flex6}>{item.email}</Text>
                  </View>
                }
                {
                  <View style={styles.content} >
                    <Text style={styles.flex3}>{__.t('Reviews')}</Text>
                    <Text style={styles.flex1}>{':'}</Text>
                    <Text style={styles.flex6}>{item.rating.count}</Text>
                  </View>
                }
                <View style={styles.content}>
                  <Text style={styles.flex3}>{__.t('Rating')}</Text>
                  <Text style={styles.flex1}>{':'}</Text>
                  <View style={styles.flex6}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      starSize={15}
                      rating={parseFloat(item.rating.rating)}
                      emptyStar={Icons.StarRating}
                      fullStar={Icons.StarRatingSelected}
                      emptyStarColor={Colors.Gray}
                      fullStarColor={Colors.AppColor}
                      containerStyle={{width: 100}}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Image source={Icons.RightIcon} style={styles.iconDetail} />
        </View>
      )
    } else {
      return <View />
    }
  }
}

export default VendorItem
