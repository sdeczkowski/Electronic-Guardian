import { View, Text, Image, Switch } from "react-native";
import React from "react";
import styles from "../styles/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/EvilIcons";
import Ionicons1 from "react-native-vector-icons/AntDesign";
import { Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Logout } from '../store/actions';

const ProfileScreen = (navigation) => {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(Logout())
  }

  return (
    <View> 
      <View style={[styles.index]}>
        <Text>Nazwa uzytkownika</Text>
        <TouchableOpacity>
          <Ionicons1 name="infocirlceo" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity style={{alignItems:"center"}}>
        <Ionicons name="user" size={200} color="black" />
      </TouchableOpacity>
      <Divider />
        <Text style={[styles.acc_titles,{marginLeft:10,marginTop:10}]}>Profile</Text>
      <Divider />
      <View style={{alignItems:"flex-start",margin:5}}>
      <View style={{flexDirection: "row",alignItems: "center",marginBottom: 10}}>
        <Text style={{marginLeft:10}}>Powiadomienia </Text>
        <TouchableOpacity style={{flexDirection: "row"}}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled1 ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
            style={{marginLeft:60,transform:[{ scaleX: 1 }, { scaleY: 1 }] }}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row",alignItems: "center", marginBottom: 10}}>
      <Text style={{marginLeft:10}}>Tryb ciemny </Text>
        <TouchableOpacity style={{flexDirection: "row"}}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled2 ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
            style={{marginLeft:80,transform:[{ scaleX: 1 }, { scaleY: 1 }]}}
          />
        </TouchableOpacity>
        </View>
      </View>
      <Divider />
        <Text style={[styles.acc_titles,{marginLeft:10,marginTop:10}]}>Account</Text>
      <Divider />
      <View style={{margin:5}}>
      <TouchableOpacity style={{flexDirection: 'row', padding:10}} onPress={{}}>
        <Text style={{marginLeft:5}}>Zmień hasło</Text>
        <Ionicons1 name="right" size={20} color="black" style={{marginLeft:70}}/>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection: 'row', padding:10}} onPress={{}}>
        <Text style={{marginLeft:5}}>Zmień e-mail</Text>
        <Ionicons1 name="right" size={20} color="black" style={{marginLeft:64}}/>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{alignItems:"center"}}>
        <TouchableOpacity style={[styles.button,{backgroundColor: '#ff0000', alignItems:'center'}]}>
          <Text style={{ color: "white" }}>Dezaktywacja konta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{backgroundColor: '#ff0000', alignItems:'center'}]} onPress={()=>{LogOut()}}>
          <Text style={{ color: "white" }}>Wyloguj się</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ProfileScreen;
