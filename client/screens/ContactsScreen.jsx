import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/AntDesign";
import Ionicons1 from "react-native-vector-icons/EvilIcons";
import styles from "../styles/styles";

const Stack = createStackNavigator();

export default function ChatScreen() {
  const Contacts = ({ navigation }) => {
    const data = [
      { id: 1, title: "Anna Nowak" },
      { id: 2, title: "Jan Kowalski" },
    ];
    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity style={[styles.box, { alignItems: "center" }]} onPress={{}}>
          <Ionicons1 name="user" size={30} color="black" />
          <Text style={{ paddingLeft: 10, fontWeight: "bold", flex: 1 }}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{ alignItems: "center", height: "100%", paddingTop: 25 }}>
        <View style={[styles.index, { justifyContent: "center" }]}>
          <Text style={{ textAlign: "center", margin: 5 }}>Osoby</Text>
        </View>
        <View style={{ width: "90%", height: "87%", margin: 5 }}>
          <TextInput placeholder="Search" style={styles.box} />
          <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()}></FlatList>
        </View>
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contacs" component={Contacts} />
    </Stack.Navigator>
  );
}
