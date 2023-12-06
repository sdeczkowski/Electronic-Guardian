import React, { useState } from "react";
import { View, Image, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Login } from "../store/actions";
import styles from "../styles/styles";
import axios from "axios";

const login = ({ navigation }) => {
  // zmienne
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // walidatory
  const [check, setCheck] = useState(null);
  const [errEmail, setErrEmail] = useState(false);
  const [errPass, setErrPass] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setCheck(null);
    setErrEmail(false);
    setErrPass(false);
    if (email == "") {
      setErrEmail(true);
      setCheck("Wpisz email!");
    } else if (password == "") {
      setErrPass(true);
      setCheck("Wpisz hasło!");
    } else {
      try {
        const url = "http://10.0.2.2:3001/api/auth";
        const { data: res } = await axios.post(url, {
          email: email,
          password: password,
          platform: "mobile"
        });

        dispatch(Login(res.data));
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          if (error.response.status == 401) {
            if (error.response.data.message == "Błędny email") {
              setErrEmail(true);
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

  return (
    <View style={styles.container}>
      <Image style={[styles.img, { width: 200, height: 200 }]} source={require("../assets/uni.png")} />
      <Text style={{ color: "red" }}>{check}</Text>
      <TextInput
        style={[styles.textinput, errEmail ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
        placeholder="Email"
        placeholderTextColor="rgb(145, 145, 145)"
        label="email"
        value={email}
        onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput
        style={[styles.textinput, errPass ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
        secureTextEntry={true}
        placeholder="Hasło"
        placeholderTextColor="rgb(145, 145, 145)"
        label="password"
        value={password}
        onChangeText={(text) => setPassword(text)}></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "white" }}>Zaloguj się</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Role");
        }}>
        <Text style={{ color: "#28ACE2" }}>Nie masz konta?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;
