import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./ButtonAdd.style";

const ButtonAdd = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>+ New Todo</Text>
    </TouchableOpacity>
  );
};

export default ButtonAdd;
