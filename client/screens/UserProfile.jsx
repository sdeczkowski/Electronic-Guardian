import React, { useEffect, useState } from "react";
import { View, Text, Image, Switch, TextInput, ScrollView, Alert, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Logout } from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styles/styles";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const Stack = createStackNavigator();

export default function ProfileScreen() {
  // zmiana hasła
  const ChangePass = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("");
    const [check, setCheck] = useState(null);
    const [errPass, setErrPass] = useState(false);
    const [errNewPass, setErrNewPass] = useState(false);
    const [errRepeatPass, setErrRepeatPass] = useState(false);

    const handlePass = async () => {
      setCheck(null);
      setErrRepeatPass(false);
      setErrNewPass(false);
      setErrPass(false);
      if (password == "") {
        setErrPass(true);
        setCheck("Wpisz hasło!");
      } else if (newpassword == "") {
        setErrNewPass(true);
        setCheck("Wpisz nowe hasło!");
      } else if (repeatpassword == "") {
        setErrRepeatPass(true);
        setCheck("Wpisz ponownie nowe hasło!");
      } else if (repeatpassword != newpassword) {
        setErrNewPass(true);
        setErrRepeatPass(true);
        setCheck("Hasła nie są identyczne!");
      } else if (password == newpassword) {
        setErrPass(true);
        setErrNewPass(true);
        setErrRepeatPass(true);
        setCheck("Nowe i stare hasło są identyczne!");
      } else {
        const _id = await AsyncStorage.getItem("_id");
        try {
          const url = "http://10.0.2.2:3001/api/user/updatepass";
          await axios.post(url, {
            _id: _id,
            password: password,
            new_password: newpassword,
          });
          navigation.navigate("User");
        } catch (error) {
          if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            if (error.response.status == 401) {
              if (
                error.response.data.message == "Nowe hasło powinno mieć min. 8 znaków, cyfrę, dużą litere oraz symbol"
              ) {
                setErrNewPass(true);
                setErrRepeatPass(true);
              }
              if (error.response.data.message == "Błędne hasło") {
                setErrPass(true);
              }
              setCheck(error.response.data.message);
            }
          }
        }
      }
    };

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

    return (
      <View style={{ alignItems: "center", height: "100%", paddingTop: 25 }}>
        <View style={styles.index}>
          <TouchableOpacity style={{ margin: 5 }} onPress={() => navigation.goBack()}>
            <AntIcon name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Zmiana hasła</Text>
          <TouchableOpacity style={{ margin: 5 }}>
            <AntIcon name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Image style={[styles.img, { width: 200, height: 200 }]} source={require("../assets/uni.png")} />
        <Text style={styles.title}>Zmiana hasła</Text>
        <Text style={{ color: "red" }}>{check}</Text>
        <TextInput
          placeholder="Stare hasło"
          style={[styles.textinput, errPass ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}></TextInput>
        <TextInput
          placeholder="Nowe hasło"
          style={[styles.textinput, errNewPass ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
          value={newpassword}
          secureTextEntry={true}
          onChangeText={(text) => setNewPassword(text)}></TextInput>
        <TextInput
          placeholder="Powtórz nowe hasło"
          style={[styles.textinput, errRepeatPass ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
          value={repeatpassword}
          secureTextEntry={true}
          onChangeText={(text) => setRepeatPassword(text)}></TextInput>
        <TouchableOpacity style={styles.button} onPress={() => handlePass()}>
          <Text style={{ color: "white" }}>Zmień</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // zmiana emaila
  const ChangeEmail = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [newemail, setNewEmail] = useState("");
    const [repeatemail, setRepeatEmail] = useState("");
    const [check, setCheck] = useState(null);
    const [errEmail, setErrEmail] = useState(false);
    const [errNewEmail, setErrNewEmail] = useState(false);
    const [errRepeatEmail, setErrRepeatEmail] = useState(false);

    const handleEmail = async () => {
      setCheck(null);
      setErrRepeatEmail(false);
      setErrNewEmail(false);
      setErrEmail(false);
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email == "") {
        setErrEmail(true);
        setCheck("Wpisz email!");
      } else if (newemail == "") {
        setErrNewEmail(true);
        setCheck("Wpisz nowy email!");
      } else if (repeatemail == "") {
        setErrRepeatEmail(true);
        setCheck("Wpisz ponownie nowy email!");
      } else if (repeatemail != newemail) {
        setErrNewEmail(true);
        setErrRepeatEmail(true);
        setCheck("Emaile nie są identyczne!");
      } else if (!emailRegex.test(newemail)) {
        setErrNewEmail(true);
        setErrRepeatEmail(true);
        setCheck("Niepoprawny email!");
      } else if (email == newemail) {
        setErrEmail(true);
        setErrNewEmail(true);
        setErrRepeatEmail(true);
        setCheck("Nowy i stary email są identyczne!");
      } else {
        const _id = await AsyncStorage.getItem("_id");
        try {
          const url = "http://10.0.2.2:3001/api/user/updatemail";
          await axios.post(url, {
            _id: _id,
            email: email,
            new_email: newemail,
          });
          navigation.navigate("User");
        } catch (error) {
          if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            if (error.response.status == 401) {
              if (error.response.data.message == "Inny użytkownik przypisał już ten email") {
                setErrNewEmail(true);
                setErrRepeatEmail(true);
              }
              if (error.response.data.message == "Błędny email") {
                setErrEmail(true);
              }
              setCheck(error.response.data.message);
            }
          }
        }
      }
    };

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

    return (
      <View style={[styles.container, { paddingTop: 25 }]}>
        <View style={styles.index}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntIcon name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Zmiana emaila</Text>
          <TouchableOpacity style={{ margin: 5 }}>
            <AntIcon name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Image style={[styles.img, { width: 200, height: 200 }]} source={require("../assets/uni.png")} />
        <Text style={styles.title}>Zmiana e-maila</Text>
        <Text style={{ color: "red" }}>{check}</Text>
        <TextInput
          placeholder="Stary e-mail"
          style={[styles.textinput, errEmail ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
          value={email}
          onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput
          placeholder="Nowy e-mail"
          style={[styles.textinput, errNewEmail ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
          value={newemail}
          onChangeText={(text) => setNewEmail(text)}></TextInput>
        <TextInput
          placeholder="Powtórz nowy e-mail"
          style={[styles.textinput, errRepeatEmail ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
          value={repeatemail}
          onChangeText={(text) => setRepeatEmail(text)}></TextInput>
        <TouchableOpacity style={styles.button} onPress={() => handleEmail()}>
          <Text style={{ color: "white" }}>Zmień</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ustawienia użytkownika
  const User = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
    const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

    const dispatch = useDispatch();

    // wylogowywanie
    const LogOut = () => {
      dispatch(Logout());
    };

    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const Setup = async () => {
      const id = localStorage.getItem("_id");
      try {
        const url = "http://10.0.2.2:3001/api/user/getuser/" + id;
        await axios.get(url).then((response) => {
          setName(response.data.firstname + " " + response.data.lastname);
          setLoading(false);
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const Deactivate = async () => {
      const id = await AsyncStorage.getItem("_id");
      try {
        const url = "http://10.0.2.2:3001/api/user/deactivate/" + id;
        await axios.put(url).then(() => {
          Logout();
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const delete_acc = () => {
      Alert.alert("Dezaktywacja konta", "Czy na pewno chcesz usunąć swoje konto?", [
        { text: "Nie", onPress: () => console.log("NO Pressed") },
        { text: "Tak", onPress: () => console.log("YES Pressed") },
      ]);
    };

    useEffect(() => {
      Setup();
    }, []);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View>
          <View style={[styles.index, { marginTop: 20 }]}>
            <Text>{name}</Text>
            <TouchableOpacity style={{ margin: 10 }}>
              <AntIcon name="infocirlceo" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{}}>
            <View>
              <View style={{ padding: 5 }}>
                <TouchableOpacity style={{ alignItems: "center" }} onPress={pickImage}>
                  {image ? (
                    <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 60 }} />
                  ) : (
                    <FontIcon name="user-circle-o" size={120} color="black" style={{ height: 120 }} />
                  )}
                </TouchableOpacity>
              </View>
              <Divider />
              <Text style={[styles.acc_titles, { marginLeft: 10, marginTop: 10 }]}>Profile</Text>
              <Divider />
              <View style={{ alignItems: "flex-start", margin: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}>
                  <Text style={{ marginLeft: 10 }}>Powiadomienia </Text>
                  <TouchableOpacity style={{ flexDirection: "row" }}>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isEnabled1 ? "#f4f3f4" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch1}
                      value={isEnabled1}
                      style={{
                        marginLeft: 60,
                        transform: [{ scaleX: 1 }, { scaleY: 1 }],
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}>
                  <Text style={{ marginLeft: 10 }}>Tryb ciemny </Text>
                  <TouchableOpacity style={{ flexDirection: "row" }}>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isEnabled2 ? "#f4f3f4" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch2}
                      value={isEnabled2}
                      style={{
                        marginLeft: 80,
                        transform: [{ scaleX: 1 }, { scaleY: 1 }],
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Divider />
              <Text style={[styles.acc_titles, { marginLeft: 10, marginTop: 10 }]}>Account</Text>
              <Divider />
              <View style={{ margin: 5 }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", padding: 10 }}
                  onPress={() => {
                    navigation.navigate("ChangePassword");
                  }}>
                  <Text style={{ marginLeft: 5 }}>Zmień hasło</Text>
                  <AntIcon name="right" size={20} color="black" style={{ marginLeft: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row", padding: 10 }}
                  onPress={() => {
                    navigation.navigate("ChangeEmail");
                  }}>
                  <Text style={{ marginLeft: 5 }}>Zmień e-mail</Text>
                  <AntIcon name="right" size={20} color="black" style={{ marginLeft: 64 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
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
                    <Text style={[styles.title, { justifyContent: "center" }]}>Dezaktywacja konta użytkownika</Text>
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
                      Czy na pewno chesz dezaktywować swoje konto?
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
                          Deactivate();
                        }}>
                        <Text style={{ fontSize: 20 }}>Tak</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
              <Pressable
                style={[styles.button, { backgroundColor: "rgb(212, 43, 43)", alignItems: "center" }]}
                //onPress={()=>delete_acc()}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={{ color: "white" }}>Dezaktywacja konta</Text>
              </Pressable>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "rgb(212, 43, 43)", alignItems: "center" }]}
                onPress={() => {
                  LogOut();
                }}>
                <Text style={{ color: "white" }}>Wyloguj się</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 150 }} />
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="ChangePassword" component={ChangePass} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
    </Stack.Navigator>
  );
}
