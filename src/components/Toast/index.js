import React from 'react'
import { Animated } from 'react-native'
import { Text } from '@components'
import PropTypes from 'prop-types'
import styles from './styles'

class Toast extends React.PureComponent {
  constructor() {
    super();
    this.animateOpacityValue = new Animated.Value(0);
    this.state = {
      showToast: false
    }
    this.toastMessage = '';
  }

  componentWillUnmount = () => {
    this.timerID && clearTimeout(this.timerID);
  }

  showMessage = (message = "", duration = 4000) => {
    this.toastMessage = message;
    this.setState({ showToast: true }, () => {
      Animated.timing(this.animateOpacityValue, {
        toValue: 1,
        duration: 500
      }).start(this.hide(duration))
    });

  }

  hide = (duration) => {
    this.timerID = setTimeout(() => {
      Animated.timing(
        this.animateOpacityValue, {
          toValue: 0,
          duration: 500
        }
      ).start(() => {
        this.setState({ showToast: false });
        clearTimeout(this.timerID);
      })
    }, duration);
  }

  render() {
    const { showToast } = this.state
    const { backgroundColor, position, textColor } = this.props
    if (showToast) {
      return (
        <Animated.View style={[styles.animatedToastView, { opacity: this.animateOpacityValue, top: (position == 'top') ? '10%' : '85%', backgroundColor }]}>
          <Text numberOfLines={1} style={[styles.toastBoxInsideText, { color: textColor }]}>{this.toastMessage}</Text>
        </Animated.View>
      );
    }
    else {
      return null;
    }
  }
}

Toast.propTypes = {
  backgroundColor: PropTypes.string,
  position: PropTypes.oneOf([
    'top',
    'bottom'
  ]),
  textColor: PropTypes.string
};

Toast.defaultProps = {
  backgroundColor: '#666666',
  textColor: '#fff'
}

export default Toast