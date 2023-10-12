import React, { useState } from 'react'
import { View, Image, Text, TextInput } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles/styles"
import { useDispatch } from 'react-redux';
import { Logout } from '../store/actions';

const mainpage = () => {
  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(Logout())
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={LogOut}>
        <Text style={{color: 'white'}}>Wyloguj się</Text>
      </TouchableOpacity>
    </View>
  )
}

export default mainpage