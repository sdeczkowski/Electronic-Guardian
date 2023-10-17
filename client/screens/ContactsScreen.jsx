import React from "react";
import { View, Text, FlatList,TextInput } from "react-native";
import styles from "../styles/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/AntDesign";
import Ionicons1 from "react-native-vector-icons/EvilIcons";

const ChatScreen = () => {
  const data = [
    { id: 1, title: "Anna Nowak" },
    { id: 2, title: "Jan Kowalski" },
  ];
  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={[styles.box, {alignItems: "center"}]} onPress={{}}>
        <Ionicons1 name="user" size={30} color="black" />
        <Text style={{paddingLeft: 10, fontWeight: "bold",flex:1}}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{alignItems: "center", height:"100%"}}>
      <View style={styles.index}>
        <TouchableOpacity>
          
        </TouchableOpacity>
        <Text style={{ textAlign: "center" }}>Osoby</Text>
        <TouchableOpacity style={{margin:5}}>
        <Ionicons name="arrowleft" size={20} color="black" onPress={{}}/>
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%", height:"87%", margin: 5 }}>
        <TextInput placeholder="Search"  style={styles.box} />
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()}></FlatList>
      </View>
    </View>
  );
};

export default ChatScreen;