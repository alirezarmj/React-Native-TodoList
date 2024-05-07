import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  image: {
    height: 60,
    width: width * 0.45,
  },
  text1: {
    fontSize: 16,
    color: "#ababab",
  },
  text2: {
    fontSize: 14,
    color: "#ababab",
  },
  text3: {
    fontSize: 22,
    color: "#ababab",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
  },
});
