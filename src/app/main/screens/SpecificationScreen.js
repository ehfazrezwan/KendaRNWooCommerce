import React from 'react'
import { Specification } from '@pages'

class SpecificationScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: __.t("Specification"),
  })

  render() {
    const { navigation } = this.props
    return <Specification navigation={navigation} />
  }
}

export default SpecificationScreen