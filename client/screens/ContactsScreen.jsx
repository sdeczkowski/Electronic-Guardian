import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { GiftedChat, MessageContainer } from 'react-native-gifted-chat';
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
        <TouchableOpacity style={[styles.box, { alignItems: "center" }]} onPress={() => navigation.navigate("Chat")}>
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
  const Chat = ({navigation}) => {
    const [messages, setMessages] = useState([]);
    const [savedMsg, saveMsg] = useState([]);

    useEffect(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
      return () =>
        navigation.getParent()?.setOptions({
          tabBarStyle: styles.tab,
        });
    }, [navigation]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
        text: 'Hello developer',
          user: {
            _id: 2,
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
    }, [])

    const renderMessageItem = ({ item }) => {
      return (
        <View style={{ display: 'none' }}>
          {}
          <Text>{item.text}</Text>
          <Text style={{ color: 'gray', fontSize: 12 }}>{item.user._id === 1 ? 'You' : 'Other User'}</Text>
        </View>
      );
    };
  
    return (
      <>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item._id}
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }} // Bieżący użytkownik
      />
    </>
      
    )
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contacs" component={Contacts} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};
