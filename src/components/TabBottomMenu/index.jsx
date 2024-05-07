import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./TabBottomMenu.style";

const TabBottomMenu = ({ selectedName, onPress, todoList }) => {
  const countbyStatus = todoList.reduce(
    (acc, todo) => {
      todo.isCompleted ? acc.done++ : acc.inProgress++;
      return acc;
    },
    {
      all: todoList.length,
      inProgress: 0,
      done: 0,
    }
  );

  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: selectedName === tabName ? "#2f76e5" : "black",
    };
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress("all")}>
        <Text style={getTextStyle("all")}>All ({countbyStatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("inProgress")}>
        <Text style={getTextStyle("inProgress")}>In progress ({countbyStatus.inProgress})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("done")}>
        <Text style={getTextStyle("done")}>Done ({countbyStatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBottomMenu;
