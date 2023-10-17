import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import styles from "../styles/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/EvilIcons';

const AreaScreen = () => {
  const data = [{ id: 1, title: "Obszar1" },{id: 2, title: "Obszar2"}];
  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: "rgb(221, 222, 223)", flexDirection: "row", justifyContent: "space-between", borderRadius: 20, padding: 10, margin: 10 }}>
      <View style={{ flexDirection: "column", justifyContent:"space-between" }}>
        <Text style={{flex: 1, fontSize: 16,fontWeight: "bold", marginLeft: 8, }}>{item.title}</Text>
        <Icon name="user" size={50} color="black" style={{}} />
      </View>
      <Image style={{ width: 175, height: 150, borderRadius: 5 ,}} source={require("../assets/map.jpg")} />
    </View>
  );

  return (
    <View style={{ alignItems: "center", height: "100%" }}>
      <View style={styles.index}>
        <View></View>
        <Text style={{ textAlign: "center" }}>Obszary</Text>
        <TouchableOpacity style={{margin:5}} onPress={{}} >
          <Ionicons name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%", height: "87%", margin: 5 }}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
};

export default AreaScreen;
  