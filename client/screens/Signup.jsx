import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../styles/styles";
import axios from "axios";

const register = ({ navigation }) => {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const username = firstname+lastname;
    try {
        const url = "http://localhost:3001/api/signup";
        await axios.post(url, {
            username:username,
            password: password,
            email: email,
            firstname: firstname,
            lastname: lastname,
            isActive: true,
        });
        navigation.replace('Login');
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
        }
    }
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image style={[styles.img, { width: 200, height: 200 }]} source={require("../assets/uni.png")} />
      <TextInput
        style={styles.textinput}
        label="firstname"
        placeholder="Imię"
        placeholderTextColor="rgb(145, 145, 145)"
        value={firstname}
        onChangeText={(text) => setFirst(text)}
      ></TextInput>
      <TextInput
        style={styles.textinput}
        label="lastname"
        placeholder="Nazwisko"
        placeholderTextColor="rgb(145, 145, 145)"
        value={lastname}
        onChangeText={(text) => setLast(text)}
      ></TextInput>
      <TextInput
        style={styles.textinput}
        label="email"
        placeholder="E-mail"
        placeholderTextColor="rgb(145, 145, 145)"
        value={email}
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        style={styles.textinput}
        label="password"
        placeholder="Hasło"
        placeholderTextColor="rgb(145, 145, 145)"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      ></TextInput>
      <TextInput secureTextEntry={true} style={styles.textinput} placeholder="Powtórz hasło" placeholderTextColor="rgb(145, 145, 145)"></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={{ color: "white" }}>Zarejestruj się</Text>
      </TouchableOpacity>
    </View>
  );
};
export default register;
