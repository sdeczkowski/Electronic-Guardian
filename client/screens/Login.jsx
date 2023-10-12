import React, { useState } from 'react'
import { View, Image, Text, TextInput } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler"
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/styles"
import axios from 'axios'

const login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const url = "http://localhost:3001/api/auth";
      const { data: res } = await axios.post(url, {
        email: email,
        password: password,
      });
      console.log(res.data)
      AsyncStorage.setItem("token", res.data.token);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };
  
  const pressHandler = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <Image style={[styles.img, {width: 200, height: 200}]} source={require("../assets/uni.png")} />
      <TextInput style={styles.textinput} placeholder="Email" placeholderTextColor="rgb(145, 145, 145)" label="email" value={email} onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput style={styles.textinput} secureTextEntry={true} placeholder="Hasło" placeholderTextColor="rgb(145, 145, 145)" label="password" value={password} onChangeText={(text) => setPassword(text)}></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{color: 'white'}}>Zaloguj się</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pressHandler}>
        <Text style={{color: '#28ACE2'}}>Nie masz konta?</Text>
      </TouchableOpacity>
    </View>
  )
}

export default login