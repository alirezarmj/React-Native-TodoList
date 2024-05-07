import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import Header from "./src/components/Header";
import CardTodo from "./src/components/CardTodo";
import CardTodoList from "./src/components/CardTodoList";
import TabBottomMenu from "./src/components/TabBottomMenu";
import { useEffect, useState } from "react";
// import { TODO_LIST } from "./dummy_data";
import ButtonAdd from "./src/components/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const [selectedName, setSelectedName] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (!isLoadUpdate) {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    } else {
      isLoadUpdate = false;
    }
  }, [todoList]);

  async function loadTodoList() {
    console.log("LOAD");
    try {
      const todoListString = await AsyncStorage.getItem("@todoList");
      const parsedTodoList = JSON.parse(todoListString);
      isLoadUpdate = true;
      if (parsedTodoList !== null) {
        setTodoList(parsedTodoList);
      }
    } catch (err) {
      alert(err);
    }
  }
  async function saveTodoList() {
    console.log("SAVE");
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (err) {
      alert(err);
    }
  }
  console.log("todoList", todoList);

  const handleUpdateTodoList = (todo) => {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const updatedTodoList = [...todoList];
    const todoIndex = updatedTodoList.findIndex((t) => t.id === updatedTodo.id);
    updatedTodoList[todoIndex] = updatedTodo;
    setTodoList(updatedTodoList);
  };

  const getFilteredList = () => {
    switch (selectedName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
    }
  };
  const handleRemoveTodo = (todo) => {
    const deletedTodoList = todoList.filter((t) => t.id !== todo.id);
    setTodoList(deletedTodoList);
  };

  const addTodo = () => {
    const newTodo = {
      id: uuid.v4(),
      title: inputText,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setShowDialog(false);
    setInputText("");
  };
  const renderAddDialog = () => {
    return (
      <View>
        <Dialog.Container visible={showDialog} onBackdropPress={() => setShowDialog(false)}>
          <Dialog.Title>Add todo</Dialog.Title>
          <Dialog.Description>Choose a name for your todo</Dialog.Description>
          <Dialog.Input
            style={{ color: "black", fontSize: 18 }}
            placeholderTextColor="#999999"
            underlineColorAndroid="#bcbcbc"
            onChangeText={(text) => setInputText(text)}
            placeholder="Ex : Go to gym"
          />
          <Dialog.Button label="Cancel" color="grey" onPress={() => setShowDialog(false)} />
          <Dialog.Button label="Save" disabled={inputText.length === 0} onPress={addTodo} />
        </Dialog.Container>
      </View>
    );
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Header todoListCount={todoList.length} />
          </View>
          <View style={styles.body}>
            <CardTodoList todoList={getFilteredList()} onPress={handleUpdateTodoList} onRemoveTodo={handleRemoveTodo} />
          </View>
          <ButtonAdd onPress={() => setShowDialog(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={styles.footer}>
        <TabBottomMenu todoList={todoList} selectedName={selectedName} onPress={setSelectedName} />
      </View>
      {renderAddDialog()}
    </>
  );
}
