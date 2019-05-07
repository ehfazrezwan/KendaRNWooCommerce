import React from 'react'
import { View, Image } from 'react-native'
import styles from './style'
import StepIndicator from 'react-native-step-indicator'
import { Icons } from '@common'
import { Text } from '@components'
import moment from 'moment'

const styleStep = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#FF6163',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#21D366',
  stepStrokeUnFinishedColor: '#FF6163',
  separatorFinishedColor: '#21D366',
  separatorUnFinishedColor: '#FF6163',
  stepIndicatorFinishedColor: '#21D366',
  stepIndicatorUnFinishedColor: '#FF6163',
  stepIndicatorCurrentColor: '#FF6163',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#FF6163',
  stepIndicatorLabelFinishedColor: '#21D366',
  stepIndicatorLabelUnFinishedColor: '#FF6163',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#FF6163',
}


class OrderItem extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      currentPosition: 2
    }
  }

  render() {
    const labels = ["In processing", "Delivered", "Returned"];
    const { style, item } = this.props
    const currentPosition = item.status === 'pending' ? 0 : (item.status === 'processing' ? 1 : 2);
    return (
      <View style={[styles.container, style]}>
        <View style={styles.headerWrap}>
          <View style={styles.item}>
            <Text style={styles.titleItem}>{__.t('SHIPMENT NO')}.</Text>
            <Text style={styles.contenItem}>{item.number}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.titleItem}>{__.t('ORDER DATE')}.</Text>
            <Text style={styles.contenItem}>{moment(item.date_created).format('DD MMM YYYY')}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.track}>{__.t("Track Shipment")}</Text>
          </View>
        </View>
        <StepIndicator
          customStyles={styleStep}
          stepCount={labels.length}
          renderStepIndicator={({ position, stepStatus }) =>
            stepStatus === 'finished' ? <Image source={Icons.CheckLigtht} style={styles.icon} /> : <Image source={Icons.Close} style={styles.icon} />
          }
          currentPosition={currentPosition}
          labels={labels}
        />
        <View style={styles.sperator} />
        <View style={styles.orderWrap}>
          <Text style={styles.titleOrder} numberOfLines={2} ellipsizeMode='tail'>{item.line_items[0].name}</Text>
          <Text>{__.t('Status').toUpperCase()}: {item.status}</Text>
        </View>
      </View>
    )
  }

  onPageChange(position) {
    this.setState({ currentPosition: position });
  }
}

export default OrderItem