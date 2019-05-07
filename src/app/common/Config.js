import { Dimensions } from "react-native";
import Icons from "./Icons";
import PayPal from "react-native-paypal-wrapper";

const Config = {
  WoocommerceConfig: {
    endpoint: "https://hubay.net/wordpress",
    consumer_key: "ck_d90931dc4f8bd8257d84f1e395f18d38e5af9f90",
    consumer_secret: "cs_8e90ed7bf9d43a59ab4178cef4ea9dcb53e7aede"
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
    {
      url: "https://hubay.net/wordpress",
      image: "https://hubay.net/wordpress/img/brand3.gif",
      categoryId: 222
    },
    {
      url: "https://hubay.net/wordpress",
      image: "https://hubay.net/wordpress/img/brand2.gif",
      categoryId: 223
    },
    {
      url: "https://hubay.net/wordpress",
      image: "https://hubay.net/wordpress/img/Shop1.jpg",
      categoryId: 224
    },
    {
      url: "https://hubay.net/wordpress",
      image: "https://hubay.net/wordpress/img/brand1.gif",
      categoryId: 228
    }
  ],
  PayPal: {
    Environment: PayPal.SANDBOX, //PayPal.PRODUCTION
    ClientId:
      "AQMnlPwVOrcnwowKy_Xh6DCb7sLqNxumYcsG0YiBs0IMMOLD_1I-Ve7bs729H4LQSmW723BOl-qg40ba"
  },
  OneSignalAppId: "341a03aa-c95a-45b4-b2df-5be1d09583cc",
  EnabledDoken: true,
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
