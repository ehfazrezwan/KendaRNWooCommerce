import React from 'react'
import { HomeSearchPage } from '@pages'
import { Constants } from '@common'


class HomeSearchScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  render() {
    const { navigation } = this.props
    return (
      <HomeSearchPage
        showDetail={(product) => navigation.navigate(Constants.Screen.Detail, { product })}
        onBack={() => navigation.goBack()} />
    )
  }
}

export default HomeSearchScreen