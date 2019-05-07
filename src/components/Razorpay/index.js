import React, {Component} from 'react';
import {Modal, Text, StyleSheet, View, TouchableOpacity, WebView, Platform} from 'react-native';
import {Config} from '@common'
import qs from 'qs'
import _ from 'lodash'

class PayPalWebview extends Component {
  state = {
    isVisible: false,
    data: {}
  };

  show = (data)=>{
      this.setState({isVisible: true, data})
  }

  hide = ()=>{
    this.setState({isVisible: false})
  }

  handleNavigationStateChange = navState => {
    const { url } = navState

    if (url && url.startsWith("https://api.razorpay.com/v1/payments")) {
      const match = url.match(/(#|\?)(.*)/)
      const results = qs.parse(match[2])
      if (results && results.status != undefined) {
          this.paymentStatus = results.status
          this.paymentId = _.find(url.split("/"), (o)=>o.startsWith("pay_"))
      }
    }

    if (url && url.startsWith("http://example.com")) {
      this.hide()
      if (this.paymentStatus == "authorized") {
        this.props.onPayment(this.paymentId)
      }
    }
  };

  render() {
    let {amount, email, phone, name} = this.state.data

    return (
      <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={this.hide}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this.hide}>
                <Text>Close</Text>
            </TouchableOpacity>
          </View>
          <WebView 
            style={styles.flex1} 
            source={{html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </head>
            <body>
            <script>
            var options = {
                "key": "${Config.RazorpayKey}",
                "amount": ${amount*100}, // 2000 paise = INR 20
                "prefill": {
                  "name": "${name}",
                  "email": "${email}",
                  "contact": "${phone}"
                },
                "theme": {
                    "color": "#0094EC"
                },
                callback_url: "http://example.com"
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
            </script>
            </body>
            </html>
            `}} 
            javaScriptEnabled={true}
            scalesPageToFit 
            onNavigationStateChange={this.handleNavigationStateChange}
            />
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    flex1:{
        flex: 1
    },
    header: {
      height: 64,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingTop: Platform.OS == "ios" ? 20 : 0
    },
  });

export default PayPalWebview