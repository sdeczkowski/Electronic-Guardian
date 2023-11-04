import React, { useEffect, useState } from "react";
import { View, Text, Image, Switch, TextInput, ScrollView,Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Logout } from "../store/actions";
import Ionicons from "react-native-vector-icons/EvilIcons";
import Ionicons1 from "react-native-vector-icons/AntDesign";
import Ionicons2 from "react-native-vector-icons/FontAwesome";
import Ionicons3 from "react-native-vector-icons/Feather";
import styles from "../styles/styles";
import Modal from "react-native-modal";

const Stack = createStackNavigator();

export default function ProfileScreen() {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  const dispatch = useDispatch();

  // wylogowywanie
  const LogOut = () => {
    dispatch(Logout());
  };

  // zmiana hasła
  const ChangePass = ({ navigation }) => {
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
          <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() => navigation.goBack()}>
            <Ionicons1 name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Zmiana hasła</Text>
          <TouchableOpacity style={{ margin: 5 }}>
            <Ionicons1 name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          style={[styles.img, { width: 200, height: 200 }]}
          source={require("../assets/uni.png")}
        />
        <Text style={styles.title}>Zmiana hasła</Text>
        <TextInput
          placeholder="Stare hasło"
          style={styles.textinput}></TextInput>
        <TextInput
          placeholder="Nowe hasło"
          style={styles.textinput}></TextInput>
        <TextInput
          placeholder="Powtórz nowe hasło"
          style={styles.textinput}></TextInput>
        <TouchableOpacity style={styles.button}>
          <Text>Zmień</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // zmiana emaila
  const ChangeEmail = ({ navigation }) => {
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
            <Ionicons1 name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Zmiana emaila</Text>
          <TouchableOpacity style={{ margin: 5 }}>
            <Ionicons1 name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          style={[styles.img, { width: 200, height: 200 }]}
          source={require("../assets/uni.png")}
        />
        <Text style={styles.title}>Zmiana e-maila</Text>
        <TextInput
          placeholder="Stary e-mail"
          style={styles.textinput}></TextInput>
        <TextInput
          placeholder="Nowy e-mail"
          style={styles.textinput}></TextInput>
        <TextInput
          placeholder="Powtórz nowy e-mail"
          style={styles.textinput}></TextInput>
        <TouchableOpacity style={styles.button}>
          <Text>Zmień</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ustawienia użytkownika
  const User = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
    const delete_acc = () =>{
        Alert.alert(
          'Dezaktywacja konta',
          'Czy na pewno chcesz usunąć swoje konto?',
          [
            {text: 'Nie', onPress: () => console.log('NO Pressed'),},
            {text: 'Tak', onPress: () => console.log('YES Pressed')},
          ]
        );
      
    }
    return (
      <ScrollView style={{ paddingTop: 25 }}>
        <View style={[styles.index]}>
          <Text>Nazwa uzytkownika</Text>
          <TouchableOpacity style={{ margin: 10 }}>
            <Ionicons1 name="infocirlceo" size={20} color="black"/>
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <TouchableOpacity style={{ alignItems: "center"}}>
              <Ionicons name="arrow-left" size={150} color="black" style={{height:150}}  />
            </TouchableOpacity>
          </View>
          <Divider />
          <Text style={[styles.acc_titles, { marginLeft: 10, marginTop: 10 }]}>
            Profile
          </Text>
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
          <Text style={[styles.acc_titles, { marginLeft: 10, marginTop: 10 }]}>
            Account
          </Text>
          <Divider />
          <View style={{ margin: 5 }}>
            <TouchableOpacity
              style={{ flexDirection: "row", padding: 10 }}
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}>
              <Text style={{ marginLeft: 5 }}>Zmień hasło</Text>
              <Ionicons1
                name="right"
                size={20}
                color="black"
                style={{ marginLeft: 70 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", padding: 10 }}
              onPress={() => {
                navigation.navigate("ChangeEmail");
              }}>
              <Text style={{ marginLeft: 5 }}>Zmień e-mail</Text>
              <Ionicons1
                name="right"
                size={20}
                color="black"
                style={{ marginLeft: 64 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#ff0000", alignItems: "center" },

            ]}
            //onPress={()=>delete_acc()}
            onPress={toggleModal}
          >
            <Modal isVisible={true}>
            <View style={[styles.box,{color:"white", height:"50%", flexDirection:"column"}]}>
              <Text style={[styles.title,{justifyContent:"center"}]}>Dezaktywacja konta użytkownika</Text>

                <Ionicons3 name="alert-triangle" size={130} color="#ff0000" style={{alignContent:"center", justifyContent:"center", alignItems:"center"}}/>

              <Text style={[styles.title,{justifyContent:"center", color:"grey", fontSize:15}]}>Czy na pewno chesz dezaktywować swoje konto?</Text>
              <View style={{flexDirection:"row",width: "80%",margin:10}}>
              <TouchableOpacity style={{margin:10}}>
                <Text>Nie</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:10, alignContent:"space-between"}}>
                <Text>Tak</Text>
              </TouchableOpacity>
              </View>
            </View>
            </Modal>
          <Text style={{ color: "white" }}>Dezaktywacja konta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#ff0000", alignItems: "center" },
            ]}
            onPress={() => {
              LogOut();
            }}>
            <Text style={{ color: "white" }}>Wyloguj się</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="ChangePassword" component={ChangePass} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
    </Stack.Navigator>
  );
}
