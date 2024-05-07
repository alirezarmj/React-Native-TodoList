import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { styles } from "./CardTodo.style";

const CardTodo = ({ todo, onPress, onRemoveTodo }) => {
  return (
    <TouchableOpacity
      onLongPress={() =>
        Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          { text: "Delete", onPress: () => onRemoveTodo(todo) },
        ])
      }
      style={styles.card}
      onPress={() => onPress(todo)}
    >
      <Text style={[styles.title, todo.isCompleted && { textDecorationLine: "line-through" }]}>{todo.title}</Text>
      {todo.isCompleted && <Image style={styles.image} source={require("../../../assets/check.png")} />}
    </TouchableOpacity>
  );
};

export default CardTodo;
