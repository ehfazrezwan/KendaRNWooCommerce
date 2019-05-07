import React from "react";
import { ProductsByCategory } from "@pages";
import { NavButton, NavTitle, HeaderSearch } from "@components";
import { Icons, Constants, Colors } from "@common";

class ProductsByCategoryScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.category.name}`,
    headerStyle: {
      backgroundColor: Colors.AppColor,
      elevation: 0,
      borderBottomWidth: 0
    }
  });

  render() {
    const { navigation } = this.props;
    return (
      <ProductsByCategory
        navigation={navigation}
        showDetail={product =>
          navigation.navigate(Constants.Screen.Detail, { product })
        }
        openProductsByCategory={category =>
          navigation.navigate(Constants.Screen.ProductsByCategory, { category })
        }
      />
    );
  }
}

export default ProductsByCategoryScreen;
