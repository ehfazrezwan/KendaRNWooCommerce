import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {Icons} from '@common'
import {Text} from '@components'

class ShippingMethods extends React.PureComponent {
  state = {
    selected:''
  }
  render(){
    let {shippingMethods} = this.props
    return (
      <View style={styles.container}>
          {shippingMethods.map((item,index)=>this.renderItem(item,index))}
      </View>
    )
  }

  renderItem = (item,index) => {
    return (
      <TouchableOpacity key={index} onPress={()=>this.selectShippingMethod(item)} style={styles.item} activeOpacity={0.75}>
        <View style={{flex:1}}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <Image source={this.state.selected == item.id ? Icons.CheckCircle : Icons.UncheckCircle} style={[styles.icon,this.state.selected && styles.selectedIcon]} />
      </TouchableOpacity>
    )
  }

  selectShippingMethod = (item) => {
    this.setState({selected:item.id})
    this.props.onSelectShippingMethod(item)
  }
}

export default ShippingMethods
