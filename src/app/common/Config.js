import { Dimensions } from "react-native";
import Icons from "./Icons";
import PayPal from "react-native-paypal-wrapper";

const Config = {
  WoocommerceConfig: {
    endpoint: "https://kendachile.yuktiapps.com",
    consumer_key: "ck_a28f929796af0b062fd3a17526878eda6bd3dea2",
    consumer_secret: "cs_f6c3bbb46bef19ec69457a4bf7eb596ba4d154c4"
  },
  Promotions: [
    {
      image:
        "https://hubay.net/wordpress/wp-content/uploads/2018/07/slider3.jpg",
      categoryId: 89
    },
    {
      image:
        "https://hubay.net/wordpress/wp-content/uploads/2018/07/slider2.jpg",
      categoryId: 93
    },
    {
      image:
        "https://hubay.net/wordpress/wp-content/uploads/2018/07/slider1.jpg",
      categoryId: 126
    }
  ],
  Brands: [
  ],
  PayPal: {
    Environment: PayPal.SANDBOX, //PayPal.PRODUCTION
    ClientId:
      "AQMnlPwVOrcnwowKy_Xh6DCb7sLqNxumYcsG0YiBs0IMMOLD_1I-Ve7bs729H4LQSmW723BOl-qg40ba"
  },
  OneSignalAppId: "341a03aa-c95a-45b4-b2df-5be1d09583cc",
  EnabledDoken: false,
  RazorpayKey: "rzp_test_1oesWLG5iUkyFQ",
  Currency: {
    code: "USD",
    symbol: "$"
  },
  Stripe: {
    publishKey: "pk_test_EHYLrkLnAIRha2TMvk1EPjFm",
    secretKey: "sk_test_sIn4CfdCLQ8ywIFFD5z2I5QJ",
    mechantId: "123"
  }
};

export default Config;
