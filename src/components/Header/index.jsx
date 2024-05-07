import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./Header.style";

const Header = ({ todoListCount }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "flex-start", columnGap: 6 }}>
      <Image style={styles.image} resizeMode="contain" source={require("../../../assets/logo.png")} />
      {todoListCount === 0 ? (
        <Text style={styles.text3}>Add New Todo</Text>
      ) : (
        <View>
          <Text style={styles.text1}>You probably have something to do😄</Text>
          <Text style={styles.text2}> &#x2768; long press on item to delete &#x2769;</Text>
        </View>
      )}
    </View>
  );
};

export default Header;
