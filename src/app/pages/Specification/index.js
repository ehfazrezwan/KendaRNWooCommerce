import React from 'react'
import { View, SafeAreaView, Platform, WebView } from 'react-native'
import styles from './styles'
import HTML from 'react-native-render-html'

class Specification extends React.PureComponent {

  render() {
    let specificationHtml = this.props.navigation.state.params.specification
    if (specificationHtml) {
      return (
        <SafeAreaView style={styles.container}>
          <WebView  source={{ html: specificationHtml }} scalesPageToFit={(Platform.OS === 'ios') ? false : true} />
        </SafeAreaView>
      )
    } else {
      return (
        <View />
      )
    }
  }
}

export default Specification