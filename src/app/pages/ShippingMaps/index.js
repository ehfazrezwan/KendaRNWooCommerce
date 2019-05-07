import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Button } from '@components'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import * as Services from '@services'

class ShippingMaps extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }
  render() {
    const { region } = this.state
    const { onAddAddress } = this.props
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={this.onPressMap}
          onRegionChangeComplete={this.onRegionChangeComplete}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
          </Marker>
        </MapView>
        <View style={styles.nextWrapper}>
          <Button title={__.t('Next')} style={styles.btnNext} onPress={()=>onAddAddress(this.address)} />
        </View>
      </View>
    )
  }

  onPressMap = (e)=>{
    var coordinate = e.nativeEvent.coordinate;
    this.setState({region: {latitude: coordinate.latitude, longitude: coordinate.longitude, latitudeDelta: this.region.latitudeDelta, longitudeDelta: this.region.longitudeDelta}})

    Services.getAddressByLocation(coordinate.latitude, coordinate.longitude)
    .then((json)=>{
      this.address = json
    })
    .catch((error)=>{

    })
  }

  onRegionChangeComplete = (region)=>{
    this.region = region
  }
}

export default ShippingMaps