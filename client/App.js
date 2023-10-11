import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Homepage from "./screens/Homepage";
import LoginScreen from "./screens/Login";
import register from "./screens/Signup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createSharedElementStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Homepage" component={Homepage} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={register} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  let [token, setToken] = useState("");

  useEffect(() => {
    setTimeout(() => {
      handleToken();
    }, 500);
  });

  const handleToken = async () => {
    const dataToken = await AsyncStorage.getItem("token");
    if (dataToken) {
      setToken(dataToken);
    } else {
      setToken("");
    }
  };


  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {token === "" ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return <RootNavigation />;
}
