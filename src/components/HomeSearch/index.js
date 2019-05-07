import React from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { Icons, Colors } from "@common";
import styles from "./styles";

class HomeSearch extends React.PureComponent {
  render() {
    const {
      onChangeText,
      onPress,
      icon,
      onFocus,
      iconStyle,
      autoFocus
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
          <Image source={icon} style={[styles.iconNav, iconStyle]} />
        </TouchableOpacity>
        <View style={styles.search}>
          <Image source={Icons.Search} style={[styles.iconSearch]} />
          <TextInput
            onFocus={onFocus}
            autoFocus={autoFocus}
            style={styles.input}
            placeholder={__.t("What are you looking for?")}
            placeholderTextColor={Colors.Gray}
            clearButtonMode="while-editing"
            onChangeText={onChangeText}
          />
        </View>
      </View>
    );
  }
}

HomeSearch.defaultProps = {
  autoFocus: false,
  editable: true
};

export default HomeSearch;
