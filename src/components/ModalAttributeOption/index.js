import React from 'react'
import { View, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Text, RadioItem, Button } from '@components'
import styles from './styles'


class ModalAttributeOption extends React.PureComponent {
  state = {
    isVisible: false,
    selected: 0
  }

  hide = () => {
    this.setState({ isVisible: false })
  }

  show = () => {
    this.setState({ isVisible: true, selected: 0 })
  }

  _getStyleColor = (item, value) => {
    if (item.name === 'color') {
      return { color: value.toLowerCase() }
    } else {
      return null
    }
  }

  render() {
    const { item } = this.props
    const { selected } = this.state
    return (
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => this.setState({ isVisible: false })}
        visible={this.state.isVisible}>
        <TouchableWithoutFeedback onPress={() => this.setState({ isVisible: false })}>
          <View style={styles.container}>
            <View style={styles.content}>
              {
                item && item.options && item.options.length > 0 &&
                item.options.map((value, index) => {
                  let textStyles = this._getStyleColor(item, value)
                  return <RadioItem key={index} style={[styles.item]} textStyle={textStyles}
                    onClick={() => this.setState({ selected: index })}
                    isChecked={index == selected} leftText={value} />
                })
              }
              <TouchableOpacity style={styles.btn} activeOpacity={0.75} onPress={() => this.onPressOk(item)}>
                <Text style={styles.textBtn}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  onPressOk = (item) => {
    const { selected } = this.state
    item.selected = selected
    this.props.onPressOk(item);
    this.hide();
  }
}

ModalAttributeOption.defaultProps = {
  showAttributeOption: {}
}

export default ModalAttributeOption