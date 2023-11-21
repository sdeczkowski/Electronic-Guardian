import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Bubble ,GiftedChat, MessageContainer,MessageText } from "react-native-gifted-chat";
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
  const Chat = ({ navigation }) => {
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
          text: "Hello developer",
          user: {
            _id: 2,
          },
        },
      ]);
    }, []);

    const onSend = useCallback((messages = []) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    }, []);

    const renderMessageItem = ({ item }) => {
      return (
        <View style={{ display: "none" }}>
          <Text>{item.text}</Text>
          <Text style={{ color: "gray", fontSize: 12 }}>{item.user._id === 1 ? "You" : "Other User"}</Text>
        </View>
      );
    };
    const renderBubble = (props) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#007AFF', 
            },
            left: {
              backgroundColor: '#CECED2', 
            },
          }}
        />
      );
    };
  
    const renderMessageText = (props) => {
      return (
        <MessageText
          {...props}
          textStyle={{
            right: {
              color: '#FFFFFF', 
            },
            left: {
              color: '#000000', 
            },
          }}
        />
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.index, { paddingTop: 25 }]}>
          <TouchableOpacity>
            <Ionicons name="arrowleft" size={20} color="black" onPress={() => navigation.goBack()} />
          </TouchableOpacity>
          <Text style={{ textAlign: "center", margin: 5 }}>Osoba</Text>
          <View></View>
        </View>
        <FlatList nestedScrollEnabled data={messages} renderItem={renderMessageItem} keyExtractor={(item) => item._id} />
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: 1 }} // Bieżący użytkownik
          renderBubble={renderBubble} 
          renderMessageText={renderMessageText} 
        />
      </View>
    );
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contacs" component={Contacts} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
