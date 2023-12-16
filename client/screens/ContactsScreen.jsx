import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TextInput, ActivityIndicator, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Bubble, GiftedChat, MessageContainer, MessageText } from "react-native-gifted-chat";
import { Divider } from "react-native-paper";
import Modal from "react-native-modal";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import styles from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Stack = createStackNavigator();

export default function ChatScreen() {
  const Chat = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    const [savedMsg, saveMsg] = useState([]);
    const [loading, setLoading] = useState(true);
    const _id1 = route.params._id1;
    const _id2 = route.params._id2;

    const Setup = async () => {
      try {
        const url = "http://10.0.2.2:3001/api/chat/set/" + _id1 + "/" + _id2;
        await axios.get(url).then((response) => {
          if (response && response.data) {
            setMessages(response.data.reverse());
            setLoading(false);
          }
        });
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const Send = async (messages) => {
      //console.log(messages);
      try {
        const url = "http://10.0.2.2:3001/api/chat/send";
        await axios.post(url, {
          _id1: _id1,
          _id2: _id2,
          _id: messages[0]._id,
          text: messages[0].text,
          createdAt: messages[0].createdAt,
          user: messages[0].user,
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    useEffect(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
      //setLoading(false);
      return () =>
        navigation.getParent()?.setOptions({
          tabBarStyle: styles.tab,
        });
    }, [navigation]);

    useEffect(() => {
      Setup();
    }, []);

    const renderBubble = (props) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#007AFF",
            },
            left: {
              backgroundColor: "#e0e0e0",
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
              color: "#FFFFFF",
            },
            left: {
              color: "#000000",
            },
          }}
        />
      );
    };

    useEffect(() => {
      const intId = setInterval(() => {
        Setup();
      }, 5000);
      return () => {
        clearInterval(intId);
      };
    }, [messages]);

    const onSend = useCallback((messages = []) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    }, []);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={[styles.index, { paddingTop: 25 }]}>
            <TouchableOpacity>
              <AntIcon name="arrowleft" size={20} color="black" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={{ textAlign: "center", margin: 5 }}>{route.params.title}</Text>
            <View></View>
          </View>
          <GiftedChat
            messages={messages}
            onSend={(messages) => {
              onSend(messages);
              Send(messages);
            }}
            user={{ _id: _id1 }} // Bieżący użytkownik
            renderBubble={renderBubble}
            renderMessageText={renderMessageText}
          />
        </View>
      );
    }
  };

  const DeletePod = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [_id, setId] = useState();
    const [_podid, setPodid] = useState();
    const [podname, setPodname] = useState();
    const [isModalVisible, setModalVisible] = useState(false);

    const Setup = async () => {
      const id = await AsyncStorage.getItem("_id");
      const type = await AsyncStorage.getItem("type");
      setId(id);
      try {
        const url = "http://10.0.2.2:3001/api/chat/getpods/" + id + "/" + type;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setData(response.data);
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const DeletePod = async () => {
      const id = await AsyncStorage.getItem("_id");
      try {
        const url = "http://10.0.2.2:3001/api/user/deletepod/" + id + "/" + _podid;
        await axios.put(url).then((response) => {
          if (response && response.data) {
            navigation.goBack();
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    useEffect(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
      //setLoading(false);
      return () =>
        navigation.getParent()?.setOptions({
          tabBarStyle: styles.tab,
        });
    }, [navigation]);

    useEffect(() => {
      Setup();
    }, []);

    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity
          style={[styles.box, { justifyContent: "space-between" }]}
          onPress={() => {
            setPodid(item._id);
            setPodname(item.firstname + " " + item.lastname);
            setModalVisible(true);
          }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <EvilIcon name="user" size={30} color="black" />
            <Text style={{ paddingLeft: 10, fontWeight: "bold", flex: 1 }}>{item.firstname + " " + item.lastname}</Text>
          </View>
          <EvilIcon name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={{ alignItems: "center", height: "100%", paddingTop: 25 }}>
          <View style={[styles.index, { justifyContent: "space-between" }]}>
            <TouchableOpacity>
              <AntIcon name="arrowleft" size={20} color="black" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={{ textAlign: "center", margin: 5 }}>Usuwanie podopiecznego</Text>
            <View></View>
          </View>
          <View style={{ width: "90%", height: "87%", margin: 5 }}>
            <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id.toString()}></FlatList>
          </View>
          <Modal
            isVisible={isModalVisible}
            transparent={true}
            onRequestClose={() => {
              setModalVisible(!isModalVisible);
            }}>
            <View
              style={[
                styles.box,
                {
                  color: "white",
                  height: "50%",
                  flexDirection: "column",
                  alignItem: "center",
                  margin: 0,
                  padding: 0,
                },
              ]}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  height: "70%",
                }}>
                <Text style={[styles.title, { justifyContent: "center" }]}>Usuwanie podopiecznego</Text>
                <Text style={[styles.title, { justifyContent: "center" }]}>{podname}</Text>
                <MaterialIcon
                  name="progress-alert"
                  size={130}
                  color="rgb(212, 43, 43)"
                  style={{
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
                <Text style={[styles.title, { justifyContent: "center", color: "grey", fontSize: 15 }]}>
                  Czy na pewno chesz usunąć tego podopiecznego?
                </Text>
              </View>
              <View style={{ height: "20%" }}>
                <Divider bold={true} />
                <View style={{ flexDirection: "row", justifyContent: "space-around", height: "100%" }}>
                  <Pressable
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                    }}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text style={{ fontSize: 20 }}>Nie</Text>
                  </Pressable>
                  <Divider style={{ width: 1, height: "99%" }} />
                  <Pressable
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                    }}
                    onPress={() => {
                      DeletePod();
                    }}>
                    <Text style={{ fontSize: 20 }}>Tak</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  };

  const Contacts = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [_id, setId] = useState();
    const [type, setType] = useState();

    const Setup = async () => {
      const id = await AsyncStorage.getItem("_id");
      const type = await AsyncStorage.getItem("type");
      setId(id);
      setType(type);
      try {
        const url = "http://10.0.2.2:3001/api/chat/getpods/" + id + "/" + type;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setData(response.data);
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    useEffect(() => {
      Setup();
    }, []);

    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity
          style={[styles.box, { alignItems: "center" }]}
          onPress={() =>
            navigation.navigate("Chat", { _id1: _id, _id2: item._id, title: item.firstname + " " + item.lastname })
          }>
          <EvilIcon name="user" size={30} color="black" />
          <Text style={{ paddingLeft: 10, fontWeight: "bold", flex: 1 }}>{item.firstname + " " + item.lastname}</Text>
        </TouchableOpacity>
      </View>
    );

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={{ alignItems: "center", height: "100%", paddingTop: 25 }}>
          <View style={[styles.index, { justifyContent: "space-between" }]}>
            <View></View>
            <Text style={{ textAlign: "center", margin: 5 }}>Osoby</Text>
            {type == "op" ? (
              <TouchableOpacity
                style={{ margin: 5 }}
                onPress={() => {
                  navigation.navigate("Delete");
                }}>
                <AntIcon name="bars" size={20} color="black" />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
          <View style={{ width: "90%", height: "87%", margin: 5 }}>
            <TextInput placeholder="Search" style={styles.box} />
            <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id.toString()}></FlatList>
          </View>
        </View>
      );
    }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contacs" component={Contacts} />
      <Stack.Screen name="Delete" component={DeletePod} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
