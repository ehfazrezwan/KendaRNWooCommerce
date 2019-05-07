import React from 'react'
import { View, Modal, TouchableOpacity, Image } from 'react-native'
import { Text, MultiSlider, Button } from '@components'
import styles from './styles'
import { Icons, Constants } from '@common'
import style from '../../app/pages/SignIn/style';


class ModalFilter extends React.PureComponent {
  state = {
    isVisible: false,
    minValue: Constants.MIN_PRICE,
    maxValue: Constants.MAX_PRICE,
  }

  hide = () => {
    this.setState({ isVisible: false })
  }

  show = () => {
    this.setState({ isVisible: true })
  }

  changeSlider = (data) => {
    this.setState({ minValue: data[0] ? data[0] : 0, maxValue: data[1] ? data[1] : 0 });
  }

  onOK = () => {
    const { minValue, maxValue } = this.state
    let data = {
      min: minValue,
      max: maxValue
    }
    this.props.onOK(data)
    this.hide()
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isVisible}
        onRequestClose={this.hide}>
        <View style={styles.backgroundColor}>
          <View style={styles.content}>
            <MultiSlider
              min={Constants.MIN_PRICE}
              max={Constants.MAX_PRICE}
              onValuesChange={(e) => this.changeSlider(e)}
              minValue={this.state.minValue}
              maxValue={this.state.maxValue} />
            <View style={styles.actionWrapper}>
              <Button title={__.t('Cancel')} style={[styles.btn, styles.btnCancel]} onPress={this.hide} />
              <View style={styles.p5} />
              <Button title="OK" style={[styles.btn]} onPress={() => this.onOK()} />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ModalFilter