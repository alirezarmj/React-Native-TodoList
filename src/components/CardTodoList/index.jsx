import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import CardTodo from "../CardTodo";
import { TODO_LIST } from "../../../dummy_data";

const CardTodoList = ({ todoList, onPress, onRemoveTodo }) => {
  return (
    <FlatList
      data={todoList}
      style={{ marginTop: 10 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 20 }}>
          <CardTodo todo={item} onPress={onPress} onRemoveTodo={onRemoveTodo} />
        </View>
      )}
    />
  );
};

export default CardTodoList;
