import React, { useState } from 'react'
import { View, Image, Text, TextInput } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';

const mainpage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {AsyncStorage.setItem("token", ""); navigation.replace('Login')}}>
        <Text style={{color: 'white'}}>Wyloguj się</Text>
      </TouchableOpacity>
    </View>
  )
}

export default mainpage