import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import {NetworkInfo} from 'react-native-network-info';
import React, { useState } from "react";
import styles from "../styles/styles";
import axios from "axios";

const register = ({ navigation }) => {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordrepeat, setPasswordRepeat] = useState("");
  const [check, setCheck] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [ip, setIp] = useState("");

  const handleSignUp = async () => {
    if(firstname == "" || lastname == "" || email == "" || password == ""){
      setCheck("Wypełnij wszystkie pola!")
    }
    else if(password != passwordrepeat){
      setCheckPassword("Hasła nie są identyczne!");
    }
    else{
      try {
        setCheckPassword("");
        setCheck("");
        const url = "http://localhost:3001/api/signup";
        await axios.post(url, {
          password: password,
          email: email,
          firstname: firstname,
          lastname: lastname,
          isActive: true,
        });
        navigation.navigate("Login");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          if(error.response.status == 409){
            setCheck(error.response.data.message);
          }
          setError(error.response.data.message);
        }
      }
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        style={[styles.img, { width: 200, height: 200 }]}
        source={require("../assets/uni.png")}
      />
      <Text style={{color: 'red'}}>{check}</Text>
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
      <TextInput
        style={styles.textinput}
        placeholder="Powtórz hasło"
        placeholderTextColor="rgb(145, 145, 145)"
        value={passwordrepeat}
        onChangeText={(text) => setPasswordRepeat(text)}
        secureTextEntry={true}
      >
      </TextInput>
      <Text style={{color: 'red'}}>{checkPassword}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={{ color: "white" }}>Zarejestruj się</Text>
      </TouchableOpacity>
    </View>
  );
};
export default register;
